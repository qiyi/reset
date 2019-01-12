import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from '../Header/header';
import { WPSite, WPPost, WPAuthor } from '../WordPress/wordpress';
import Footer from '../Footer/footer';
import Post from '../Post/post';
import './home.css';

export interface HomeProps {
  site: WPSite
  posts: WPPost[]
  authors: Map<number, WPAuthor>
}

const Home = ({site, posts, authors}: HomeProps) => (
  <div className="page">
    <Header site={site} />
    <div className="posts">
    {
      posts ? posts.map(post => <Post post={post} authors={authors} />) : ''
    }
    </div>
    <Footer />
  </div>
);

export default Home;