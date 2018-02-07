import React from 'react';

export default ({ index, id, url }) =>
  <div className="receipt">
    <small>{index}. {id}</small>
    <img src={url} alt={`Receipt for ${id}`}/>
  </div>;