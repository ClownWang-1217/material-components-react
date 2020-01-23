'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import classNames from 'classnames'

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
class ListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();
  }

  static propTypes = {
    children: PropTypes.any,
    checkboxList: PropTypes.bool,
    // radioList: PropTypes.bool,
    tag: PropTypes.string,
    role: PropTypes.string,
    activated: PropTypes.bool,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    ripple: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    role: 'separator',
    tag: 'li',
  }

  componentDidMount() {
    if (this.otherProps.ripple) {
      if (this._rootRef.current) {
        this._listItem = new MDCRipple(this._rootRef.current)
      }
    }
  }

  componentWillUnmount(){
    if(this._listItem){
      this._listItem.destroy();
      this._listItem = undefined;
    }
  }

  // get _role() {
  //   const { 
  //     checkboxList, 
  //     // radioList, 
  //     role } = this.props;
  //   if (role) {
  //     return role;
  //   } else if (checkboxList) {
  //     return 'checkbox';
  //   } 
  //   // else if (radioList) {
  //   //   return 'radio';
  //   // }
  //   return null;
  // }


  render() {
    const {
      className,
      children,
      ripple,
      selected,
      activated,
      disabled,
      style,
      role,
      checkboxList,
      tag: Tag,
      ...otherProps
    } = this.props;

    this.otherProps = {ripple};
    return (
      <Tag
        ref={this._rootRef}
        className={classNames(
          'mdc-list-item',
          (selected && 'mdc-list-item--selected'),
          (disabled && 'mdc-list-item--disabled'),
          (activated && 'mdc-list-item--activated'),
          className
        )}
        tabIndex={selected ? '0' : '-1'}
        aria-checked={selected ? 'true' : 'false'}
        role={role || checkboxList && 'checkbox'}
        style={style}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
}

export default ListItem;