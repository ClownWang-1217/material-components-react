'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';
import safeAppend from '@third_party/safe-append';

/**
 * @augments {React.Component<{
    className:string,
    icon:string,
    ripple:boolean} & React.HTMLProps<HTMLButtonElement>, {}>}
 */
export default class IconButton extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.ripple) {
      this._rootRef = React.createRef();
    }
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'on-primary', 'on-surface']),
    ripple: PropTypes.bool
  };

  static defaultProps = {
    ripple: false,
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    if (this._rootRef && this._rootRef.current) {
      this._root = new MDCRipple(this._rootRef.current);
      this._root.unbounded = true;
    }
  }

  componentWillUnmount() {
    if (this._root) {
      this._root.destroy();
      this._root = undefined;
    }
  }

  /* eslint no-unused-vars: "off" */
  render() {
    const {
      className,
      icon,
      color,
      ripple,
      ...others } = this.props;

    return (
      <button
        {...others}
        className={classNames(
          "mdc-icon-button",
          "material-icons",
          safeAppend('--', color),
          className,
        )}>
        {icon}
      </button>
    );
  }
}