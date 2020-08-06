import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { IBlog } from '../utils/interfaces';

export default class Edit extends Component<IEditProps, IEditState> {

  constructor(props: IEditProps) {
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

  componentDidMount() {
    fetch(`/api/blogs/${this.props.match.params.id}`)
      .then(res => res.json())
      .then((blog: IBlog) => this.setState({ title: blog.title, content: blog.content }));
  }

  editBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = { title: this.state.title, content: this.state.content }
    fetch(`/api/blogs/${this.props.match.params.id}`, {
      method: 'PUT',
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

  deleteBlog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch(`/api/blogs/${this.props.match.params.id}`, {
      method: 'delete'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.props.history.push('/');
      })
  }

  render() {
    return (
      <div>
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
                        id="editBlog"
                        className="btn"
                        onClick={this.editBlog}  //updates Blog when clicked
                      >Edit Blog</button>
                      <button
                        id="deleteBlog"
                        className="btn"
                        onClick={this.deleteBlog}  //deletes Blog when clicked
                      >Delete Blog</button>
                    </form>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </section>
      </div>


    );
  }

}

interface IEditProps extends RouteComponentProps<{ id: string }> { }
interface IEditState {
  title: string,
  content: string
}