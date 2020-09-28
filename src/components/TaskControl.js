import React, { Component } from 'react';
import SortControl from './SortControl';
import SearchControl from './SearchControl';

export default class TaskControl extends Component {
    render() {
        return (
            <div className="row mt-3">
              <div className="col-xs-6 ml-3 mr-4">
                <SearchControl/>
              </div>
              <div className="col-xs-6">
                <SortControl/>
              </div>
            </div>
        )
    }
}
