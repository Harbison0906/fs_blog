import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export default class NewBlog extends Component<INewBlogProps, INewBlogState> {

  constructor(props: INewBlogProps) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
  }

  handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: event.target.value });
  }

  addBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {title: this.state.title, content: this.state.content}
    fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <section className="newBlog">
        <div className="container">
          <section className="row justify-content-center">
            <article className="col-md-7">
              <div className="card shadow-sm">
                <div className="card-body">
                  <form className="form-group">
                    <input value={this.state.title} onChange={this.handleUserChange} id="title" type="text" className="form-control shadow-sm" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1" />
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
      </section>
    );
  }

}

interface INewBlogProps extends RouteComponentProps {}

interface INewBlogState {
  title: string;
  content: string;
}