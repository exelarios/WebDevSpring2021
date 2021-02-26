import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FilterBoxItem from './FilterBoxItem';
import FilterBoxQuestion from './FilterBoxQuestion';

class FilterBox extends Component {
  render() {
    return (
      <div id="filterBox">
        <Route path="/home/store" component={FilterBoxItem}/>
        <Route path="/home/blog" component={FilterBoxQuestion}/>
      </div>
    )
  }
}

export default FilterBox