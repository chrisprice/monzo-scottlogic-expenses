import React from 'react';
import { formatAmount, formatDate } from './format';

export default ({ index, merchant, category, created, notes, attachments, currency, amount, localCurrency, localAmount, excludeDisabled, onExclude }) => <tr>
  <td>{index}.</td>
  <td><input className="input col-12 mb0" defaultValue={merchant}/></td>
  <td>
    <select className="select col-12 mb0" defaultValue={category}>
      <option>Travel</option>
      <option>Accomodation</option>
      <option>Refreshments</option>
      <option>Parking</option>
      <option>Other</option>
    </select>
  </td>
  <td><input className="input col-12 mb0" defaultValue={formatDate(created)}/></td>
  <td><input className="input col-12 mb0" defaultValue={notes}/></td>
  <td className="center">
    <input type="checkbox" defaultChecked={attachments.length > 0} />
  </td>
  <td><input className="input col-12 mb0 right-align" defaultValue={formatAmount(currency, amount)}/></td>
  <td><input className="input col-12 mb0 right-align" defaultValue={localCurrency != null ? formatAmount(localCurrency, localAmount) : ''} /></td>
  <td><input className="input col-12 mb0" disabled /></td>
  <td><button className="btn btn-outline" onClick={onExclude}>Exclude</button></td>
</tr>;