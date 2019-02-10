import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Blog from './Blog/blog'

const baseUri = 'http://isouth.org/wp-json/';
const params = new URLSearchParams(window.location.search);
if (params.has('page')) {
  const pageId = params.get('page');
  
} else if (params.has('tag')) {

} else if (params.has('category')) {

} else if (params.has('author')) {

} else if (params.has('search')) {

} else if (params.has('post')) {

} else {
  const offset =  params.has('offset') ? params.get('offset') : 1;
  const limit = params.has('limit') ? params.get('limit') : 5;
  ReactDOM.render(
    (<Blog baseUri={baseUri} />),
    document.getElementById('app')
  );
}
