import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactions } from './monzo';

const categoryLookup = {
  'eating_out': 'Food',
  'entertainment': 'Drinks',
  'general': 'Other',
  'groceries': 'Food',
  'holidays': 'Other',
  'transport': 'Transport'
};

const currencyLookup = {
  'GBP': '£',
  'EUR': '€',
  'USD': '$'
};

const date = date => date.toISOString().substr(0, 10);
const currencyAmount = (currency, amount) => `${currencyLookup[currency] || currency}${(-amount / 100).toFixed(2)}`;

const Transaction = ({ id, created, merchant, category, notes, amount, currency, localAmount, localCurrency, attachments }) =>
  <tr dataId={id}>
    <td><span className="ref" /></td>
    <td><input className="name" value={merchant} /></td>
    <td><input className="category" value={categoryLookup[category] || category} /></td>
    <td><input className="date" value={date(created)} /></td>
    <td><input className="notes" value={notes} /></td>
    <td><input className="client-name" /></td>
    <td><input className="project-name" /></td>
    <td><input className="account-code" /></td>
    <td><input className="office-code" /></td>
    <td><input className="receipt" type="checkbox" checked={attachments.length > 0} /></td>
    <td><input className="amount" value={currencyAmount(currency, amount)} /></td>
    <td><input className="amount" value={localCurrency != null ? currencyAmount(localCurrency, localAmount) : ''} /></td>
    <td><input className="vat" /></td>
  </tr>;

const Transactions = ({ account, transactions }) => (
  transactions == null ?
    <p>Loading</p> :
    transactions.length === 0 ?
      <p>No transactions found</p> :
      <div>
        <h1>Employee Scott Logic Claim for Reimbursement</h1>
        <table style={{ float: 'right' }}>
          <tr>
            <td><i>Admin Use Only</i></td>
          </tr>
          <tr>
            <td><b>PL Number:</b></td>
            <td><input /></td>
          </tr>
        </table>
        <table>
          <tr>
            <td>Name:</td>
            <td><input value={account.description} /></td>
          </tr>
          <tr>
            <td>Team List (If Applic):</td>
            <td><input className="team-list" /></td>
          </tr>
          <tr>
            <td>Trip/Activity Date Range:</td>
            <td><input value={date(new Date(transactions[0].created))} /> - <input value={date(new Date(transactions[transactions.length - 1].created))} /></td>
          </tr>
          <tr>
            <td>Form Submission Date:</td>
            <td><input value={date(new Date())} /></td>
          </tr>
          <tr>
            <td>Brief Overall Description <br /> of Trip/Activity:</td>
            <td><input className="trip-description" /></td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Ref</th>
            <th>Receipt From <br />(Name of Establishment)</th>
            <th>Purchase</th>
            <th>Date</th>
            <th>Notes</th>
            <th>Client Name <br />(If Applicable)</th>
            <th>Project Name <br />(If Applicable)</th>
            <th>Acc <br />Code</th>
            <th>Office <br />Code</th>
            <th>Receipt</th>
            <th>Amount</th>
            <th>Local Amount</th>
            <th>VAT</th>
          </tr>
          {
            transactions.map((transaction, index) =>
              <Transaction
                key={transaction.id}
                {...transaction}
              />
            )
          }
          <tr>
            <td colSpan="10">TOTAL</td>
            <td><input className="amount" value={currencyAmount("GBP", transactions.reduce((sum, { amount }) => sum + amount, 0))} /></td>
          </tr>
        </table>
        <p>I certify that these expenses were necessarily incurred</p>
        <p>Signed: <input /> Date: <input value={date(new Date())} /></p>
        <p><i>Admin Use Only</i></p>
        <p>Auth Signature: <input /> Date: <input /></p>
        {
          transactions.map(({ attachments }, index) =>
            attachments.map(({ id, url }, index) =>
              <div key={id} className="receipt-image">
                <img src={url} />
              </div>
            )
          )
        }
      </div>
);

export default connect(
  ({
    selectedAccountId,
    accounts,
    transactions
  }) => ({
      account: accounts.find(({ id }) => id === selectedAccountId),
      transactions
    }),
  { fetchTransactions }
)(Transactions);
