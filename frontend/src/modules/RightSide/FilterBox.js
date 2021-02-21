import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FilterBoxItem from './FilterBoxItem';
import FilterBoxQuestion from './FilterBoxQuestion';

class FilterBox extends Component {
  render() {
    return (
      <div id="filterBox">
        <Switch>
          <Route path="/" exact component={FilterBoxItem}></Route>
          <Route path="/blog" component={FilterBoxQuestion}></Route>
        </Switch>
      </div>
    )
  }
}

export default FilterBox