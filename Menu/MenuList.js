'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


/**
* @augments {React.PureComponent<{}>}
* @param {string} className
* @param {boolean} twoLine 俩行文本
* @param {boolean} singleSelection 单行选择
* @param {boolean} nonInteractive 互动 
* @param {boolean} dense 紧凑密集型布局
* @param {boolean} avatarList 宽泛型布局
* @param {boolean} checkboxList 复选框
* @param {Array<number>} selectedIndex 搭配复选框 初始选中列表
* @param {string} tag
* @param {string} role
* @param {React.CSSProperties} style
*/
class MenuList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.any,
    role: PropTypes.string,
    style: PropTypes.object,
    ariaHidden: PropTypes.string,
    ariaOrientation: PropTypes.string,
    className: PropTypes.string,
    twoLine: PropTypes.bool,
    singleSelection: PropTypes.bool,
    nonInteractive: PropTypes.bool,
    dense: PropTypes.bool,
    avatarList: PropTypes.bool,
    checkboxList: PropTypes.bool,
    radioList: PropTypes.bool,
    selectedIndex: PropTypes.arrayOf(PropTypes.number),
    tag: PropTypes.string
  }
  static defaultProps = {

  }


  render() {
    const {
      ariaHidden,
      children,
      role,
      nonInteractive,
      dense,
      avatarList,
      twoLine,
      className,
      ...otherProps
    } = this.props;
    return (
      <ul
        className={classNames(
          'mdc-list',
          (nonInteractive && 'mdc-list--non-interactive'),
          (dense && 'mdc-list--dense'),
          (avatarList && 'mdc-list--avatar-list'),
          (twoLine && 'mdc-list--two-line'),
          className
        )}
        aria-hidden={ariaHidden !== undefined ? ariaHidden : 'true'}
        aria-orientation={ariaHidden !== undefined ? ariaHidden : 'vertical'}
        tabIndex="-1"
        role={role || 'menu'}
        {...otherProps}
      >
        {children}
      </ul>
    );
  }
}


export default MenuList;