'use strict';

import assert from 'assert';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCDrawer } from '@material/drawer';

export default class Drawer extends React.Component {
  state = { ...this.props };

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();

    const open = this.props.open;
    assert(open == undefined || open.type == 'boolean');
  }

  static propTypes = {
    open: PropTypes.object,
    children: PropTypes.any,
  };

  static defaultProps = {
    open: false,
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    if (this._rootRef.current) {
      this._drawer = new MDCDrawer(this._rootRef.current);

      const open = this.state.open;
      if (open) {
        this._onclose = () => {
          open.$v = false;
        };
        this._drawer.listen('MDCDrawer:closed', this._onclose);
        this._openonchange = (val) => this._drawer.open = val;
        open.on('change', this._openonchange);
      }
    }
  }

  componentWillUnmount() {
    if (this._drawer) {
      const open = this.state.open;
      if (open) {
        open.off('change', this._openonchange);
        this._drawer.unlisten('MDCDrawer:closed', this._onclose);
      }

      this._drawer.destroy();
      this._drawer = undefined;
    }
  }

  render() {
    const {
      className,
      open, 
      children,
      ...otherProps } = this.state;
    return <>
      <aside
        {...otherProps}
        ref={this._rootRef} 
        className={classNames(
          "mdc-drawer", 
          "mdc-drawer--modal", 
          (open && open.$v) && "mdc-drawer--open",
          className
        )}>
        <div className="mdc-drawer__content">
          {children}
        </div>
      </aside>
      <div className="mdc-drawer-scrim"></div>
    </>
  }
}