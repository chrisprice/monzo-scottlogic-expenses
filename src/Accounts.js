import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAccounts } from './monzo';
import { selectAccount } from './other';

const AccountType = ({ type }) => {
  switch (type) {
    case 'uk_prepaid': {
      return <span>prepaid</span>;
    }
    case 'uk_retail': {
      return <span>current account</span>;
    }
  }
}

const Account = ({ id, description, type, selected, onClick }) =>
  <li style={{ background: selected ? '#dedede' : 'none' }} onClick={onClick}>
    {description} (<AccountType type={type} />)
  </li>;

class Accounts extends Component {
  componentWillMount() {
    this.props.fetchAccounts();
  }

  render() {
    const { accounts, selectedAccountId, selectAccount } = this.props;
    return (
      accounts == null ?
        <p>Loading</p> :
        accounts.length === 0 ?
          <p>No accounts found</p> :
          <ul>
            {
              accounts.map(({ id, description, type }) =>
                <Account
                  key={id}
                  id={id}
                  description={description}
                  type={type}
                  selected={selectedAccountId === id}
                  onClick={() => selectAccount({ accountId: id })}
                />
              )
            }
          </ul>
    );
  }
}

export default connect(
  ({
    accounts,
    selectedAccountId
  }) => ({
      accounts,
      selectedAccountId
    }),
  { fetchAccounts, selectAccount }
)(Accounts);
