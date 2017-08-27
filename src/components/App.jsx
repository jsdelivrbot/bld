import React, {
  Component as Comp
} from 'react';

import {
  Route,
  Switch
} from 'react-router-dom';


import PostsIndex from './posts_index';
import PostsNew from './posts_new';
import PostsShow from './posts_show';

export default class extends Comp {
  render() {
    return (
      <div className="App">
              <Switch>
                <Route path="/posts/new" component={PostsNew} />
                <Route path="/posts/:id" component={PostsShow} />
                <Route path="/"   component={PostsIndex}/>
              </Switch>
            </div>
    )
  }
};
