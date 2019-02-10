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
  users: Array<WPAuthor>
  page?: number
}

const Home = ({site, posts, users, page = 1}: HomeProps) => (
  <div className="page">
    <Header site={site} />
    <div className="posts">
    {
      posts.map(post => <Post post={post} author={users.find(user=>user.id === post.author)} />)
    }
    </div>
    <Footer />
  </div>
);

export default Home;
