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
  authors: Map<number, WPAuthor>
}

export default class Blog extends React.PureComponent<BlogProps, BlogState> {
  constructor(props: BlogProps) {
    super(props);
    const store = window.localStorage;
    const site = store.getItem('site');
    const posts = store.getItem('posts');
    const authors = store.getItem('authors');
    this.state = {
      site: site ? Object.assign(new WPSite(), JSON.parse(site)) : new WPSite(),
      posts: posts ? Object.assign(new Array<WPPost>(), JSON.parse(posts)) : new Array<WPPost>(),
      authors: authors ? Object.assign(new Map<string, WPAuthor>(), JSON.parse(authors)): new Map<string, WPAuthor>(),
    };
  }

  getSite = () => {
    const {baseUri} = this.props;
    return fetch(baseUri)
             .then(res => res.json())
             .then(data => Object.assign(new WPSite(), data))
             .catch(err => console.error(err));
  }
  
  getPosts = () => {
    const store = window.localStorage;
    const {baseUri} = this.props;
    return fetch(baseUri + 'wp/v2/posts?per_page=5')
            .then(res => res.json())
            .then(data => Object.assign(new Array<WPPost>(), data))
            .catch(err => console.error(err));
  }

  getUsers = () => {
    const {baseUri} = this.props;
    return fetch(baseUri + 'wp/v2/users')
             .then(res => res.json())
             .then(data => Object.assign(new Array<WPAuthor>(), data))
             .catch(err => console.error(err));
  }

  async componentDidMount() {
    const store = window.localStorage;
    this.getSite()
      .then(site => {
        store.setItem('site', JSON.stringify(site));
        this.setState({site}); 
      });
    this.getPosts()
      .then(posts => {
        store.setItem('posts', JSON.stringify(posts));
        this.setState({posts});
      });
    this.getUsers()
      .then(users => {
        const authors = new Map<number, WPAuthor>();
        (users as Array<WPAuthor>).forEach(user => authors.set(user.id, user));
        store.setItem('authors', JSON.stringify(authors));
        this.setState({authors});
      });
  }

  render() {
    const {site, posts, authors} = this.state;
    return (<Home site={site} posts={posts} authors={authors} />);
  }
}
