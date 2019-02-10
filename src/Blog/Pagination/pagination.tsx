import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from '../Header/header';
import { WPSite, WPPost, WPAuthor } from '../WordPress/wordpress';
import Footer from '../Footer/footer';
import Post from '../Post/post';
import './home.css';

export interface PaginationProp {
  selected: number,
}

const Pagination = (props: PaginationProp) => (
  <div className="pagination">
    
  </div>
);

export default Pagination;
