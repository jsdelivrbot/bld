import React, {
  Component as Comp
} from 'react';

import {
  connect
} from 'react-redux';

import {
  Link
} from 'react-router-dom';

import {
  fetchPost,
  deletePost
} from '../actions';

function mapStateToProps({
  posts
}, ownProps) {
  return {
    post: posts[ownProps.match.params.id]
  }
}

@connect(mapStateToProps, {
  fetchPost,
  deletePost
})
export default class extends Comp {
  componentDidMount() {
    // this.props.match.params.id IS :id from the Route
    // router provides us with that automatically
    if (!this.props.post) { // if we haven't this post already!
      const {
        id
      } = this.props.match.params
      this.props.fetchPost(id);
    }

  }
  onDeleteClick() {
    const {
      id
    } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });

  }

  render() {
    const {
      post
    } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <Link className="btn btn-primary" to="/">All posts</Link>
        <button className="btn btn-danger pull-xs-right"
                onClick={this.onDeleteClick.bind(this)}
          >
          Delete Post
        </button>
      </div>

    )
  }

}
