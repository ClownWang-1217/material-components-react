'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * @augments {React.Component<{
    className:string,
    icon:string} & React.HTMLProps<HTMLElement>, {}>}
 */
export default class Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      className,
      icon,
      ...others } = this.props;

    return (
      <i
        {...others}
        className={classNames("material-icons", className)}>
        {icon}
      </i>
    );
  }
}