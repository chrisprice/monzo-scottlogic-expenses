import MonzoApi from 'monzo-api';
import { promiseWrapper } from './util';

const PAGE_LIMIT = 100;

const {
  REACT_APP_MONZO_CLIENT_ID: clientId,
  REACT_APP_MONZO_CLIENT_SECRET: clientSecret
} = process.env;
const monzo = new MonzoApi(clientId, clientSecret);
monzo.redirectUrl = new URL('/auth', window.location).toString();

export const PERFORM_AUTH = 'PERFORM_AUTH';
export const AUTH_COMPLETE = 'AUTH_COMPLETE';
export const AUTH_ERROR = 'AUTH_ERROR';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const ACCOUNTS_COMPLETE = 'ACCOUNTS_COMPLETE';
export const ACCOUNTS_ERROR = 'ACCOUNTS_ERROR';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';
export const TRANSACTIONS_COMPLETE = 'TRANSACTIONS_COMPLETE';
export const TRANSACTIONS_ERROR = 'TRANSACTIONS_ERROR';
export const ANNOTATE_TRANSACTIONS = 'ANNOTATE_TRANSACTIONS';
export const ANNOTATE_COMPLETE = 'ANNOTATE_COMPLETE';
export const ANNOTATE_ERROR = 'ANNOTATE_ERROR';


export const performAuth = () =>
  dispatch => {
    const authorizationUrl = monzo.authorizationUrl;
    dispatch({
      type: PERFORM_AUTH,
      stateToken: monzo.stateToken
    });
    window.location = authorizationUrl;
  };

export const authCallback = ({ code, state }) =>
  promiseWrapper(async (dispatch, getState) => {
    const { stateToken } = getState();
    try {
      const { access_token: accessToken } = await monzo.authenticate(code, state, stateToken);
      dispatch({
        type: AUTH_COMPLETE,
        accessToken
      });
    } catch (e) {
      dispatch({
        type: AUTH_COMPLETE
      });
      throw e;
    }
  });

const fetchAccounts = async (dispatch, getState) => {
  const { accessToken, accounts } = getState();
  if (accounts != null) {
    return accounts;
  }
  dispatch({
    type: FETCH_ACCOUNTS
  });
  try {
    const { accounts } = await monzo.accounts(accessToken);
    dispatch({
      type: ACCOUNTS_COMPLETE,
      accounts
    });
    return accounts;
  } catch (e) {
    dispatch({
      type: ACCOUNTS_ERROR
    });
    throw e;
  }
};

export const fetchPagedTransactions = async ({
  limit = PAGE_LIMIT,
  since,
  before,
  accountId,
  accessToken
}) => {
  const query = { limit, since, before };
  const { transactions: page } = await monzo.transactions(accountId, true, query, accessToken);
  const next = page.length === 0 ? null : () => fetchPagedTransactions({
    limit,
    since: page[page.length - 1].id,
    before,
    accessToken,
    accountId
  });
  return { page, next };
};

export const fetchTransactions = (since) =>
  promiseWrapper(async (dispatch, getState) => {
    const {
      accessToken,
      transactions: previousTransactions = [],
      since: previousSince = new Date()
    } = getState();
    dispatch({
      type: FETCH_TRANSACTIONS
    });
    const transactions = [];
    for (const account of await fetchAccounts(dispatch, getState)) {
      const options = {
        since,
        before: previousSince,
        accountId: account.id,
        accessToken
      };
      try {
        for (let { page, next } = await fetchPagedTransactions(options); next != null; { page, next } = await next()) {
          transactions.push(...page);
        }
      } catch (e) {
        dispatch({
          type: TRANSACTIONS_ERROR
        });
        throw e;
      }
    }
    transactions.sort((a, b) => new Date(b) - new Date(a));
    dispatch({
      type: TRANSACTIONS_COMPLETE,
      since: since.toISOString(),
      transactions: transactions.concat(previousTransactions)
    });
  });

export const annotateTransactions = (transactionIds, metadata) =>
  promiseWrapper(async (dispatch, getState) => {
    const {
      accessToken
    } = getState();
    dispatch({
      type: ANNOTATE_TRANSACTIONS
    });
    try {
      for (const transactionId of transactionIds) {
        await monzo.annotate(transactionId, metadata, accessToken);
      }
      dispatch({
        type: ANNOTATE_COMPLETE
      });
    }
    catch (e) {
      dispatch({
        type: ANNOTATE_ERROR
      });
      throw e;
    }
  })