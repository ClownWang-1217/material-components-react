'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '@third_party/mdc-react/List'


/**
 * @augments {React.PureComponent<{}>}
 * @param {boolean} checkboxList
 * @param {string} tag
 * @param {string} role
 * @param {boolean} activated
 * @param {boolean} selected
 * @param {boolean} disabled
 * @param {boolean} ripple
 * @param {React.CSSProperties} style
 * @param {string} className
 * 
 */
class MenuListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {

    children: PropTypes.any,
    style: PropTypes.object,
    checkboxList: PropTypes.bool,
    radioList: PropTypes.bool,
    tag: PropTypes.string,
    role: PropTypes.string,
    activated: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    ripple: PropTypes.bool,
    className: PropTypes.string
  }
  static defaultProps = {
  }

  render() {
    const {
      children,
      role,
      ...otherProps
    } = this.props;

    return (
      <ListItem 
      role = {role || 'menuitem'} 
      {...otherProps}>
        {children}
      </ListItem>
    );
  }
}


export default MenuListItem;