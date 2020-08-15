import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import * as moment from 'moment';
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

  async componentDidMount() {
    let id = this.props.match.params.id;
    const resBlogtags = await fetch(`/api/blogtags/${id}`);
    const blogtags = await resBlogtags.json();
    const resBlogs = await fetch(`/api/blogs/${id}`);
    const blogs = await resBlogs.json();
    this.setState({ tags: blogtags, blogs });
  }

  render() {
    return (
      <section className="row justify-content-center">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title">{this.state.blogs.title}</h4>
            {this.state.tags.map(tag => (
              <span className="badge badge-pill badge-primary mx-2" key={tag.name}>{tag.name}</span>
            ))}
            <h6 className="card-author">By Seth Harbison</h6>
            <p className="card-date">{moment(this.state.blogs._created).format('MMMM Do, YYYY')}</p>
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