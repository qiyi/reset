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
    this.state = null;
  }

  componentDidMount() {
    const {baseUri} = this.props;
    fetch(baseUri)
    .then(res => res.json())
    .then(data => {
      const site = Object.assign(new WPSite(), data);
      fetch(baseUri + 'wp/v2/posts?per_page=5')
        .then(res => res.json())
        .then( data => {
          let ids = new Set<number>();
          let posts: WPPost[] = [];
          for (let postData of data) {
            const post = Object.assign(new WPPost(), postData);
            posts.push(post);
            ids.add(post.author);
          }
          let authors = new Map<number, WPAuthor>();
          let promises: Array<Promise<any>> = [];
          ids.forEach(id=>{
            promises.push(fetch(baseUri + 'wp/v2/users/' + id)
              .then(res => res.json())
              .then(data => {
                const author = Object.assign(new WPAuthor(), data);
                authors.set(id, author);
              })
              .catch(err=>console.error(err))
            );
          });
          Promise.all(promises)
            .then(()=> this.setState({site, posts, authors}));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  render() {
    if(!this.state) {
      return '';
    } 
    const {site, posts, authors} = this.state;
    return (<Home site={site} posts={posts} authors={authors} />);
  }
}
