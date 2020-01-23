'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCRipple } from '@material/ripple';
import { Colors } from '../Theme';
import safeAppend from '@third_party/safe-append';

/**
 * @augments {React.Component<{
    className:string,
    style:React.CSSProperties,
    text:string,
    variant:string,
    icon:string,
    color:string,
    ripple:boolean, 
    children:any} & React.HTMLProps<HTMLButtonElement>, {}>}
 */
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.ripple) {
      this._rootRef = React.createRef();
    }
  }

  static Variants = {
    Raised: 'raised',
    Unelevated: 'unelevated',
    Outlined: 'outlined',
  };

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string, // 按钮文字
    variant: PropTypes.oneOf(Object.values(Button.Variants)), // 按钮的变体，参考Button.Variants枚举
    icon: PropTypes.string, // 填写material-icon的id就会在文字前面生成一个图标
    color: PropTypes.oneOf([Colors.Primary, Colors.Secondary, Colors.Error]), // 受支持的几种颜色
    ripple: PropTypes.bool, // 是否启用动态波纹效果，不能改变
    children: PropTypes.any
  };

  static defaultProps = {
    color: Colors.Primary,
    ripple: true,
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    if (this._rootRef && this._rootRef.current) {
      this._root = new MDCRipple(this._rootRef.current);
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
      text,
      variant,
      icon,
      color,
      ripple,
      children,
      ...others } = this.props;

    return (
      <button
        {...others}
        ref={this._rootRef}
        className={classNames(
          'mdc-button',
          safeAppend('mdc-button--', variant),
          safeAppend('--', color),
          className
        )}>
        <div className="mdc-button__ripple"></div>
        {typeof icon == 'string' && <i className="material-icons mdc-button__icon" aria-hidden="true">{icon}</i>}
        <span className="mdc-button__label">{typeof text == 'string' ? text : children}</span>
      </button>
    );
  }
}