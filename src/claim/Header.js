import React from 'react';
import { Link } from 'react-router-dom';

export default () =>
  <div className="flex justify-between">
    <h1 className="">
      Employee Scott Logic Claim for Reimbursement
  </h1>
    <div className="mt3">
      <Link to="/" className="btn btn-big btn-outline ml3">Back</Link>
      <button className="btn btn-big btn-outline ml3" onClick={() => window.print()}>Print</button>
      {/* <button className="btn btn-big btn-outline ml3">Mark as Claimed</button> */}
    </div>
  </div>;