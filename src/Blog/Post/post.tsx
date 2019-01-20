import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { WPPost, WPAuthor } from '../WordPress/wordpress';
import './post.css';

export interface PostProps {
  post: WPPost
  author: WPAuthor
}

const Post = ({post, author}: PostProps) => (
  <div key={post.id} className="post" id={String(post.id)}>
    <h2 className="post-title">
      {post.title.rendered}
    </h2>
    <div className="post-meta">
      {new Date(post.date).toLocaleString() + ' by ' + (author ? author.name : '')}  
    </div>
    <div className="post-content" dangerouslySetInnerHTML={ {__html: post.content.rendered}} />
  </div>
);

export default Post;


