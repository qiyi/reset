import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { number } from 'prop-types';
import './blog.css'

export interface BlogProps {
  baseUri: string
}

export class BlogInfo {
  name: string
  description: string
}

export class Reply {

}
export class Author {
  id: number
  name: string
}

export class PostContent {
  protected: boolean
  rendered: string
}

export class TitleContent {
  rendered: string
}

export class Post {
  id: number
  author: number
  tags: number[]
  date: string
  status: string
  link: string
  title: TitleContent
  content: PostContent
  replies: Reply[]
}

export interface BlogState {
  blog: BlogInfo
  posts: Post[]
  authors: Map<number, Author>
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
      const blog = Object.assign(new BlogInfo(), data);
      fetch(baseUri + 'wp/v2/posts')
        .then(res => res.json())
        .then( data => {
          let ids = new Set<number>();
          let posts: Post[] = [];
          for (let postData of data) {
            const post = Object.assign(new Post(), postData);
            posts.push(post);
            ids.add(post.author);
          }
          let authors = new Map<number, Author>();
          let promises: Array<Promise<any>> = [];
          ids.forEach(id=>{
            promises.push(fetch(baseUri + 'wp/v2/users/' + id)
              .then(res => res.json())
              .then(data => {
                const author = Object.assign(new Author(), data);
                authors.set(id, author);
              })
              .catch(err=>console.error(err))
            );
          });
          Promise.all(promises)
            .then(()=> this.setState({blog, posts, authors}));
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  render() {
    if(!this.state) {
      return '';
    }
    const {blog, posts, authors} = this.state;
    return (
      <div className="page">
        <div className="header">
          <h1 className="blog-title">{blog ? blog.name : ''}</h1>
        </div>
        <div className="posts">
        {
          posts ? posts.map(post => 
            (
              <div key={post.id} className="post" id={String(post.id)}>
                <h2 className="post-title">{post.title.rendered}</h2>
                <div className="post-meta">{new Date(post.date).toLocaleString() + ' by ' + authors.get(post.author).name}</div>
                <div className="post-content" dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
              </div>
            )
          ) : ''
        }
        </div>
      </div>
    );
  }
}