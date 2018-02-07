import React from 'react';
import withTicks from '../provider/withTicks';
import './loading.css';

const MonzoIcon = () =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 68.61">
    <path d="M76,49.94a3.52,3.52,0,0,1-1,2.49L59.24,68.2a1.41,1.41,0,0,1-2.4-1V31.87L75.82,13H76Z" fill="#e34b5f" />
    <path d="M63.46.41a1.41,1.41,0,0,0-2,0L38,23.86h-.33V50.32L38,51,56.84,32.2,76,13Z" fill="#e7ce9c" />
    <path d="M0,49.94a3.52,3.52,0,0,0,1,2.49L16.8,68.2a1.41,1.41,0,0,0,2.4-1V31.87L.22,13H0Z" fill="#1e7889" />
    <path d="M14.57.41a1.41,1.41,0,0,0-2,0L0,13,19.2,32.2,38,51V23.86Z" fill="#97baa6" />
  </svg>;

const phrases = [
  ``,
  'Connecting To Monzo...',
  ``,
  `We're no strangers to love`,
  `You know the rules and so do I`,
  `A full commitment's what I'm thinking of`,
  `You wouldn't get this from any other guy`,
  ``,
  `I just want to tell you how I'm feeling`,
  `Gotta make you understand`,
  ``,
  `Never gonna give you up, never gonna let you down`,
  `Never gonna run around and desert you`,
  `Never gonna make you cry, never gonna say goodbye`,
  `Never gonna tell a lie and hurt you`,
  ``,
  `We've known each other for so long`,
  `Your heart's been aching but you're too shy to say it`,
  `Inside we both know what's been going on`,
  `We know the game and we're gonna play it`,
  ``,
  `And if you ask me how I'm feeling`,
  `Don't tell me you're too blind to see`,
  ``,
  `Never gonna give you up, never gonna let you down`,
  `Never gonna run around and desert you`,
  `Never gonna make you cry, never gonna say goodbye`,
  `Never gonna tell a lie and hurt you`,
  ``,
  `Never gonna give you up, never gonna let you down`,
  `Never gonna run around and desert you`,
  `Never gonna make you cry, never gonna say goodbye`,
  `Never gonna tell a lie and hurt you`,
  ``,
  `We've known each other for so long`,
  `Your heart's been aching but you're too shy to say it`,
  `Inside we both know what's been going on`,
  `We know the game and we're gonna play it`,
  ``,
  `I just want to tell you how I'm feeling`,
  `Gotta make you understand`,
  ``,
  `Never gonna give you up, never gonna let you down`,
  `Never gonna run around and desert you`,
  `Never gonna make you cry, never gonna say goodbye`,
  `Never gonna tell a lie and hurt you`,
  ``
];

const Loading = ({ tick }) =>
  <div className="loading overflow-hidden">
    <MonzoIcon />
    <MonzoIcon />
    <MonzoIcon />
    <MonzoIcon />
    <MonzoIcon />
    <MonzoIcon />
    <div>
      Fetching Transaction Data.
      <span style={{ visibility: tick % 3 > 0 ? 'visible' : 'hidden' }}>.</span>
      <span style={{ visibility: tick % 3 > 1 ? 'visible' : 'hidden' }}>.</span>
      <p className="h6 regular italic">
        {phrases[tick % phrases.length]}
      </p>
    </div>
  </div>

export default withTicks('2s')(Loading);