/*
* @Author: inksmallfrog
* @Date:   2017-04-28 15:13:33
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 23:20:00
*/

'use strict';
import React from 'react';
import { withRouter } from 'react-router';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop)
