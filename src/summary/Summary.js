import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../other';
import withClaims from '../provider/withClaims';

const dateFormat = new Intl.DateTimeFormat('en-UK', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

const date = date => dateFormat.format(new Date(date));

const MultipleAccountMessage = () =>
  <p className="italic">Monzo is reporting that you have multiple accounts (check you out!). For now, I've assumed you'd like to pool your transactions across all of these accounts.</p>;

const PendingClaim = ({ start, end, description, emoji, transactions }) =>
  <li className="m2">
    <Link to={`/claim/${transactions.map(({ id }) => id).join(',')}`} className="text-decoration-none">
      <span className="inline-block mr2">{emoji}</span>{description}
    </Link>
    <br />
    <small className="inline-block ml4">{date(start)} - {date(end)}</small>
  </li>;

const Summary = ({ multipleAccounts, transactionCount = 0, expenseCount = 0, claims = [], archivedClaims = [], loadMore, clearAuth }) =>
  <section>
    <h1>Transactions Crunched</h1>
    {multipleAccounts && <MultipleAccountMessage />}
    <p>After looking over your last {transactionCount} transactions I've found {expenseCount} categorised as expenses which I've taken the liberty of grouping into the following potential claims -</p>
    <ul className="list-reset m3">
      {
        claims.sort((a, b) => new Date(b.start) - new Date(a.start))
          .map((claim, index) => <PendingClaim key={index} {...claim} />)
      }
    </ul>
    {/* <p>In case my algorithms are on the fritz, I can also <Link to={`/claim/monster`}>generate a monster claim</Link> containing all of the above. You can then exclude irrelevant transactions to create a bespoke claim.</p> */}
    {/* <p>Just in case you need them, here are your previously claims -</p>
    <ul>
      <li><Link to={`/claim/id`}>A fitting description, submitted Saturday 16th March 2016</Link></li>
      <li><Link to={`/claim/id`}>Another great description, submitted Friday 25th June 2016</Link></li>
    </ul> */}
    <p className="">If you'd like, I can always go further back through your transactions to find more claims?</p>
    <p className="my3">
      <button className="btn btn-outline" onClick={loadMore}>Load More Transactions</button>
      <button className="btn btn-outline ml3" onClick={clearAuth}>Sign-out</button>
    </p>
  </section>;


export default connect(
  ({ accounts = [], selectedAccountId, transactions = [], expenses = [] }) => ({
    multipleAccounts: accounts.length > 1,
    selectedAccountId,
    transactionCount: transactions.length,
    expenseCount: expenses.length
  }),
  { clearAuth }
)(withClaims(Summary));

