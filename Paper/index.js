'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * @augments {React.PureComponent<{} & React.HTMLProps<HTMLDivElement>, {}>}
 */
class Paper extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
  }

  static defaultProps = {
  }

  render() {
    const {
      className,
      style,
      children,
      ...others } = this.props;

    return (
      <div
        {...others}
        className={classNames('mdc-paper', className)}
        style={style}>
        {children}
      </div>
    );
  }
}

export default Paper;