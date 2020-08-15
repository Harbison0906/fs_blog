import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export default class NewBlog extends Component<INewBlogProps, INewBlogState> {

  constructor(props: INewBlogProps) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tagid: ''
    };
  }

  handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: event.target.value });
  }

  handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ tagid: event.target.value });
  }

  addBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { title: this.state.title, content: this.state.content }
    fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if (this.state.tagid) {
          fetch('/api/blogtags', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ blogid: data.insertId, tagid: this.state.tagid })
          }).then(res => res.json())
            .then(created => {
              console.log(created);
              this.props.history.push('/');
            })
        } else {
          this.props.history.push('/');
        }
      })

  }

  render() {
    return (

      <div className="container">
        <section className="row justify-content-center">
          <article className="col-md-7">
            <div className="card shadow-sm">
              <div className="card-body">
                <form className="form-group">
                  <input value={this.state.title} onChange={this.handleUserChange} id="title" type="text" className="form-control shadow-sm" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" />
                  
                  <select className="form-control" value={this.state.tagid} onChange={this.handleTagChange}>
                    <option value="">Choose a tag ..</option>
                    <option value="1">Traveling</option>
                    <option value="2">Coding</option>
                    <option value="3">Cooking</option>
                  </select>

                  <textarea
                    className="shadow-sm form-control mb-3"
                    aria-label="With textarea"
                    placeholder="Start bloggin'!"
                    value={this.state.content}
                    onChange={this.handleChange}
                  />
                  <button
                    id="addBlog"
                    className="btn"
                    onClick={this.addBlog}  //adds new blog post when "Post" is clicked
                  >Post</button>
                </form>
              </div>
            </div>
          </article>
        </section>
      </div>

    );
  }

}

interface INewBlogProps extends RouteComponentProps { }

interface INewBlogState {
  title: string;
  content: string;
  tagid: string;
}