import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Metadata from './Metadata';
import LineItem from './LineItem';
import Footer from './Footer';
import Receipt from './Receipt';
import { formatAmount } from './format';
import withClaims from '../provider/withClaims';
import './claim.css';

export const Claim = ({ id, name, transactions, total, excludeTransaction }) =>
  <section>
    <Header />
    <Metadata name={name} startDate={transactions[0].created} endDate={transactions[transactions.length - 1].created} />
    <div className="">
      <table className="table col-12">
        <tbody>
          <tr>
            <td><label className="label center">Ref.</label></td>
            <td className="col-3"><label className="label center">Receipt From</label></td>
            <td className="col-2"><label className="label center">Purchase</label></td>
            <td className="col-1"><label className="label center">Date</label></td>
            <td className="col-3"><label className="label center">Notes</label></td>
            <td className=""><label className="label center">Receipt</label></td>
            <td className="col-1"><label className="label center">Amount</label></td>
            <td className="col-1"><label className="label center">Local Amount</label></td>
            <td className="col-1"><label className="label center">VAT</label></td>
          </tr>
          {
            transactions.map((transaction, index) =>
              <LineItem
                {...transaction}
                key={transaction.id}
                index={index}
                onExclude={() => excludeTransaction(transaction.id)}
              />
            )
          }
          <tr>
            <td colSpan="5" className="right-align bold pr1">
              Total
            </td>
            <td colSpan="2">
              <input className="input col-12 mb0 right-align" disabled value={formatAmount('GBP', total)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer />
    {
      transactions.filter(({ attachments }) => attachments.length > 0)
        .map(({ id, attachments: [{ url }] }, index) =>
          <Receipt
            key={id}
            id={id}
            index={index}
            url={url}
          />
        )
    }
  </section>;

export default withClaims(withRouter(connect(
  (state, { match: { params: { id } }, accounts, claims, expenses, history }) => {
    const transactionIds = id.split(',');
    const transactions = expenses.filter(({ id }) => transactionIds.includes(id));
    return ({
      id,
      name: accounts[0].description,
      transactions,
      total: transactions.reduce((total, { amount }) => total + amount, 0),
      excludeTransaction: (transactionId) => {
        history.push(`/claim/${id.split(',').filter(id => id !== transactionId).join(',')}`);
      }
    });
  }
)(Claim)));