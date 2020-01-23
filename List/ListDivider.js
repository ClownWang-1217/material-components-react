'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

/**
 * @augments {React.PureComponent<{}>}
 * @param {string} tag
 * @param {string} role
 * @param {string} className
 * @param {React.CSSProperties} style
 * 
 */
class ListDivider extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  static propTypes = {

    tag: PropTypes.string,
    role: PropTypes.string,
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    role: 'separator',
    tag: 'li'
  }

  render() {
    const {
      tag: Tag,
      role,
      style,
      className,
      ...otherProps
    } = this.props;
    return (
      <Tag
        className={classNames(
          'mdc-list-divider',
          className
        )}
        role={role}
        style={style}
        {...otherProps} />
    );
  }
}
export default ListDivider;