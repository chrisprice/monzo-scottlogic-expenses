import {
  PERFORM_AUTH,
  AUTH_COMPLETE,
  AUTH_ERROR,
  FETCH_ACCOUNTS,
  ACCOUNTS_COMPLETE,
  ACCOUNTS_ERROR,
  FETCH_TRANSACTIONS,
  TRANSACTIONS_COMPLETE,
  TRANSACTIONS_ERROR,
} from './monzo';
import {
  CLEAR_AUTH
} from './other';
import {
  ERROR
} from './util';
import parseTransactions from './analysis/parseTransactions';
import batchTransactions from './analysis/batchTransactions';

export const loadState = () => {
  const defaultState = { loading: [] };
  try {
    const loadedState = JSON.parse(localStorage.state);
    return {
      ...defaultState,
      ...loadedState
    };
  } catch (e) {
    return defaultState;
  }
};

export const saveState = ({ accessToken, stateToken }) => {
  localStorage.state = JSON.stringify({ accessToken, stateToken });
};

export default (state, action) => {
  switch (action.type) {
    case PERFORM_AUTH: {
      const { stateToken } = action;
      return {
        ...state,
        loading: [...state.loading, 'auth'],
        accessToken: null,
        stateToken: stateToken
      };
    }
    case AUTH_COMPLETE: {
      const { accessToken } = action;
      return {
        ...state,
        loading: state.loading.filter(item => item !== 'auth'),
        accessToken,
        stateToken: null
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        loading: state.loading.filter(item => item !== 'auth'),
        stateToken: null
      };
    }
    case CLEAR_AUTH: {
      return {
        ...state,
        accessToken: null,
        stateToken: null
      };
    }
    case FETCH_ACCOUNTS: {
      return {
        ...state,
        loading: [...state.loading, 'accounts']
      };
    }
    case ACCOUNTS_COMPLETE: {
      const { accounts } = action;
      return {
        ...state,
        loading: state.loading.filter(item => item !== 'accounts'),
        accounts
      };
    }
    case ACCOUNTS_ERROR: {
      return {
        ...state,
        loading: state.loading.filter(item => item !== 'accounts')
      };
    }
    case FETCH_TRANSACTIONS: {
      return {
        ...state,
        loading: [...state.loading, 'transactions']
      };
    }
    case TRANSACTIONS_COMPLETE: {
      const { transactions, since } = action;
      const expenses = parseTransactions(transactions);
      const claims = [...batchTransactions(expenses)];
      return {
        ...state,
        loading: state.loading.filter(item => item !== 'transactions'),
        transactions,
        since,
        expenses,
        claims
      };
    }
    case TRANSACTIONS_ERROR: {
      return {
        ...state,
        loading: state.loading.filter(item => item !== 'transactions')
      };
    }
    case ERROR: {
      const { error } = action;
      if (error.status === 401) {
        console.log('logout');
        return {
          ...state,
          accessToken: null
        };
      }
      return {
        ...state,
        error
      };
    }
    default:
      return state;
  }
};
