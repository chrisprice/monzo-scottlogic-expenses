import React from 'react';

export default ({ onSignIn }) =>
  <section>
    <h1>Monzo/SL Expenses Bot</h1>
    <p className="italic">Fed up with expense forms? Sick of carrying around receipts? Trying to find something (anything!) to procrastinate on rather than just getting on with it?</p>
    <p>Unrelatedly, I'm MSEB! I exist to -</p>
    <ul>
      <li>Connect to the Monzo API (direct from your browser, nothing is sent via or stored on my server)</li>
      <li>Pull through all of your transactions categorised as expenses (along with any attached receipt photos)</li>
      <li>Format them into an SL expense form ready for you to print off, sign and hand-in</li>
    </ul>
    <p className="my3">To get started, click below to sign-in using your Monzo account - </p>
    <p className="my3 center"><button className="btn btn-primary not-rounded" onClick={onSignIn}>Sign-in Using Monzo</button></p>
  </section>;