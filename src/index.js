import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

// import AppGame from './AppGame';
import AppGame2048 from './AppGame2048';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppGame2048 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();