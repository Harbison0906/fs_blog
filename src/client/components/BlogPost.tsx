import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { IBlog } from '../utils/interfaces';
import { ITags } from '../utils/interfaces';

export default class BlogPost extends Component<IBlogPostProps, IBlogPostState> {

  constructor(props: IBlogPostProps) {
    super(props);
    this.state = {
      tags: [],
      blogs: {
        id: null,
        title: null,
        content: null,
        _created: null
      }
    };
  }

  componentDidMount() {
    let blogDetails: any = null,
      id = this.props.match.params.id,
      tagFetch = fetch(`/api/tags/${id}`).then(res => res.json());

    fetch(`/api/blogs/${id}`)
      .then(res => res.json())
      .then((blog: IBlog) => {
        return tagFetch;
      })
      .then(blogtags => this.setState({ tags: blogtags, blogs: blogDetails }))
  }

  render() {
    return (
      <section className="row justify-content-center">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title">{this.state.blogs.title}</h4>
            <h6 className="card-author">By Seth Harbison</h6>
            <p className="card-date">{this.state.blogs._created}</p>
            <p className="card-text">{this.state.blogs.content}</p>
          </div>
        </div>
      </section>
    );
  }

}

interface IBlogPostProps extends RouteComponentProps<{ id: string }> { }
interface IBlogPostState {
  tags: ITags[],
  blogs: {
    id: string,
    title: string,
    content: string,
    _created: number
  }
}

// this.setState(prevState => {
//   const blogs = Object.assign({}, prevState.blogs);
//   blogs.title = blog.title;
//   blogs._created = blog._created;
//   blogs.content = blog.content;