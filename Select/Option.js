'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import assert from 'assert';
import { MenuListItem } from '@third_party/mdc-react/Menu';

/**
 * @augments {React.Component<{}>}
 * @param {string} value 
 * @param {string} className
 * @param {boolean} selected
 */
class Option extends React.Component {
  constructor(props) {
    super(props);
    assert(this.props.value != undefined)
  }

  static propTypes = {
    children: PropTypes.any,
    value: PropTypes.string,
    selected:PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
  }

  shouldComponentUpdate(){
    return false;
  }
  render() {
    const {
      children,
      value,
      className,
      selected,
      ...otherProps
    } = this.props;
    return (
      <MenuListItem
      {...otherProps}
        className={className}
        selected = {selected}
        data-value={value}
        >
        {children}
      </MenuListItem>
    );
  }
}

export default Option;