'use strict';

/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import mixin from 'react-mixin';
import PageHelpers from '../mixins/PageHelpers';
/* eslint-enable no-unused-vars */

import EditNode from './EditNode';
import CreateNode from './CreateNode';
export { CreateNode, EditNode };

import {} from 'material-ui';
import NodeActions from '../../actions/NodeActions';
import './Node.less';

@mixin.decorate(PageHelpers)
export default class Node extends Component {

  state = {
    node: null
  };

  componentDidMount() {
    NodeActions.getNode(this.props.params.nodeId)
      .then(node => this.setState({node: node}))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="Node">
        {this.renderBreadcrumbs(
          {href: 'dash', label: 'Dashboard'},
          {href: 'nodes', label: 'Nodes'},
          this.props.params.nodeId
        )}
        <EditNode nodeRef={this.state.node} />
      </div>
    );
  }

}
