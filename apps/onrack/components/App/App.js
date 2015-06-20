'use strict';

/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react';
import decorate from 'common-web-ui/lib/decorate';
/* eslint-enable no-unused-vars */

import { RouteHandler } from 'react-router';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import { AppCanvas, Styles } from 'material-ui';

import AppHeader from './AppHeader';
import './App.less';

const ThemeManager = new Styles.ThemeManager();

@decorate({
  propTypes: {
    headerOverride: PropTypes.any,
    currentView: PropTypes.any,
    initialViewport: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  },
  defaultProps: {
    headerOverride: null,
    // NOTE: Current view for server-side rendering, or you can use props.children.
    currentView: null,
    // NOTE: Default size for server-side rendering
    initialViewport: {width: 1024, height: 768}
  },
  childContextTypes: {
    muiTheme: PropTypes.object
  }
})
export default class App extends Component {

  state = {
    viewport: this.props.initialViewport
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentDidMount() {
    this.updateViewport();
    var resizeTimer = null;
    this.handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(this.updateViewport.bind(this), 300);
    };
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
    this.handleResize = null;
  }

  render() {
    var viewport = this.state && this.state.viewport || {};

    return (
      <div className="App">
        <AppCanvas predefinedLayout={1}>
          {this.props.headerOverride || <AppHeader />}

          <div className="content">
            {this.props.currentView || this.props.children || <RouteHandler />}
          </div>

          <div className="footer">
            <div>
              <span>© 2015 EMC<sup>2</sup></span>
              <span className="right">{'Viewport: ' + viewport.width + 'x' + viewport.height}</span>
            </div>
          </div>
        </AppCanvas>
      </div>
    );
  }

  updateViewport() {
    if (!canUseDOM) { return; }
    let viewport = {width: window.innerWidth, height: window.innerHeight};
    if (this.state.viewport.width !== viewport.width ||
      this.state.viewport.height !== viewport.height) {
      this.setState({viewport: viewport});
    }
  }

}