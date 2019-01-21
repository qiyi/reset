import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { number } from 'prop-types';
import {WPSite, WPPost, WPAuthor } from './WordPress/wordpress';
import Header from './Header/header';
import Footer from './Footer/footer';
import './blog.css'
import Home from './Home/home';

export interface BlogProps {
  baseUri: string
}

export interface BlogState {
  site: WPSite
  posts: WPPost[]
  users: Array<WPAuthor>
}

export default class Blog extends React.PureComponent<BlogProps, BlogState> {
  constructor(props: BlogProps) {
    super(props);
    const store = window.localStorage;
    const site = store.getItem('site');
    const posts = store.getItem('posts');
    const users = store.getItem('users');
    this.state = {
      site: site ? Object.assign(new WPSite(), JSON.parse(site)) : new WPSite(),
      posts: posts ? Object.assign(new Array<WPPost>(), JSON.parse(posts)) : new Array<WPPost>(),
      users: users ? Object.assign(new Array<WPAuthor>(), JSON.parse(users)): new Array<WPAuthor>(),
    };
  }

  getSite = () => {
    const {baseUri} = this.props;
    return fetch(baseUri)
             .then(res => res.json())
             .then(data => Object.assign(new WPSite(), data))
  }
  
  getPosts = () => {
    const store = window.localStorage;
    const {baseUri} = this.props;
    return fetch(baseUri + 'wp/v2/posts?per_page=5')
            .then(res => res.json())
            .then(data => Object.assign(new Array<WPPost>(), data))
  }

  getUsers = () => {
    const {baseUri} = this.props;
    return fetch(baseUri + 'wp/v2/users')
             .then(res => res.json())
             .then(data => Object.assign(new Array<WPAuthor>(), data))
  }
  
  async componentDidMount() {
    const store = window.localStorage;
    this.getSite()
      .then(site => {
        if (!site) {
          console.error('get site failed.', site);
          return;
        }
        store.setItem('site', JSON.stringify(site));
        this.setState({site}); 
      })
      .catch(err => console.error(err));
    this.getPosts()
      .then(posts => {
        if (!posts) {
          console.error('get posts failed.', posts);
          return;
        }
        store.setItem('posts', JSON.stringify(posts));
        this.setState({posts});
      })
      .catch(err => console.error(err));
    this.getUsers()
      .then(users => {
        store.setItem('users', JSON.stringify(users));
        this.setState({users});
      })
      .catch(err => console.error(err));
  }

  render() {
    const {site, posts, users} = this.state;
    return (<Home site={site} posts={posts} users={users} />);
  }
}
