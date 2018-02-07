import React from 'react';

export default () => <div className="flex justify-between mxn1 mt2">
  <div className="col-6 px1">
    <p>I certify that these expenses were necessarily incurred</p>
    <div className="flex mxn1">
      <p className="px1 col-6">
        <label className="label">Signed: </label>
        <input className="input" disabled />
      </p>
      <p className="px1 col-3">
        <label className="label">Date: </label>
        <input className="input" disabled />
      </p>
    </div>
  </div>
  <div className="col-6 px1">
    <div className="border border-silver rounded px3">
      <p><label className="label">Admin Use Only</label></p>
      <div className="flex mxn1">
        <p className="px1 col-3">
          <label className="label">PL Number: </label>
          <input className="input" disabled />
        </p>
        <p className="px1 col-6">
          <label className="label">Auth Signature: </label>
          <input className="input" disabled />
        </p>
        <p className="px1 col-3">
          <label className="label">Date: </label>
          <input className="input" disabled />
        </p>
      </div>
    </div>
  </div>
</div>;