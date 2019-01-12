import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Blog from './Blog/blog'

const baseUri = 'http://isouth.org/wp-json/';
ReactDOM.render(
  (<Blog baseUri={baseUri} />),
  document.getElementById('app')
);
