import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Blog from './Blog/blog'
import './index.css';

const baseUri = 'http://isouth.org/wp-json/';
ReactDOM.render(
  (<Blog baseUri={baseUri} />),
  document.getElementById('app')
);