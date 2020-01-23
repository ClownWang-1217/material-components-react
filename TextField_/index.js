'use strict';

import assert from 'assert';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCTextField } from '@material/textfield';

/**
 * @augments {React.Component<{
    input: {tag:string, value:object} & React.HTMLProps<HTMLInputElement> & React.HTMLProps<HTMLTextareaElement>,
    outlined:boolean,
    label:string,
    helper:{text:string, persistent:boolean},
    leadingIcon:string,
    trailingIcon:string
    } & React.HTMLProps<HTMLDivElement>, {}>}
 */
class TextField extends React.Component {
  state = { ...this.props };

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();

    const input = this.props.input;
    assert(input.value == undefined || input.value.type == 'string');
  }

  static propTypes = {
    input: PropTypes.shape({
      tag: PropTypes.oneOf(['input', 'textarea']),
      value: PropTypes.object,
      disabled: PropTypes.bool, // 设置是否禁用
      //vbind: PropTypes.object,
    }),
    outlined: PropTypes.bool, // 设置是否是边框样式
    label: PropTypes.string, // 漂浮的文字提示
    helper: PropTypes.shape({
      text: PropTypes.string, // 文本框下方的帮助文字
      persistent: PropTypes.bool, // 是否常驻显示的帮助文字，只有当helperText存在时生效
    }),
    leadingIcon: PropTypes.string,
    trailingIcon: PropTypes.string
  };

  static defaultProps = {
  };

  componentDidMount() {
    if (this._rootRef.current) {
      this._textField = new MDCTextField(this._rootRef.current);
      const value = this.state.input.value;
      if (value) {
        this._oninput = (event) => value.$v = event.target.value;
        this._textField.listen('input', this._oninput);
        this._$onvaluechange = (val) => this._textField.value = val;
        value.on('change', this._$onvaluechange);
      }
    }
  }

  componentWillUnmount() {
    if (this._textField) {
      const value = this.state.input.value;
      if (value) {
        value.off('change', this._$onvaluechange);
        this._textField.unlisten('input', this._oninput);
      }
      this._textField.destroy();
      this._textField = undefined;
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.input.disabled != this._textField.disabled) {
      this._textField.disabled = nextProps.input.disabled;
    }
    return false;
  }

  renderHelperLine(helperText, persistent) {
    return (
      <div className="mdc-text-field-helper-line">
        <p className={classNames(
          'mdc-text-field-helper-text',
          persistent && 'mdc-text-field-helper-text--persistent'
        )}>
          {helperText}
        </p>
      </div>
    );
  }

  renderFloatingLabel(label, initialFloat) {
    return (
      <label
        className={classNames(
          'mdc-floating-label',
          initialFloat && 'mdc-floating-label--float-above'
        )}>
        {label}
      </label>
    );
  }

  renderNotchedOutline(label, initialFloat) {
    return (
      <div className='mdc-notched-outline'>
        <div className='mdc-notched-outline__leading'></div>
        {label && <div className='mdc-notched-outline__notch'>{this.renderFloatingLabel(label, initialFloat)}</div>}
        <div className='mdc-notched-outline__trailing'></div>
      </div>
    );
  }

  /* eslint no-unused-vars: "off" */
  render() {
    const {
      input,
      outlined,
      label,
      helper: helper_,
      leadingIcon,
      trailingIcon,
      ...others } = this.state;

    const helper = helper_ || {};
    const {
      tag,
      value,
      disabled,
      ...inputOtherProps } = input || {};
    
    return (
      <div {...others}>
        <div
          ref={this._rootRef}
          className={classNames(
            'mdc-text-field',
            (tag == 'textarea') && 'mdc-text-field--textarea',
            outlined && 'mdc-text-field--outlined',
            (!label) && 'mdc-text-field--no-label',
            disabled && 'mdc-text-field--disabled',
            leadingIcon && 'mdc-text-field--with-leading-icon',
            trailingIcon && 'mdc-text-field--with-trailing-icon'
          )}>
          {leadingIcon && <i className="material-icons mdc-text-field__icon">{leadingIcon}</i>}
          {React.createElement(tag || 'input', {
            ...inputOtherProps,
            disabled,
            defaultValue: value ? value.$v : undefined,
            className: classNames('mdc-text-field__input', inputOtherProps.className),
          })}
          {trailingIcon && <i className="material-icons mdc-text-field__icon">{trailingIcon}</i>}
          {outlined ? (this.renderNotchedOutline(label, value && value.$v)) : (label ? this.renderFloatingLabel(label, value && value.$v) : undefined)}
          {!outlined && <div className='mdc-line-ripple'></div>}
        </div>
        {helper.text && this.renderHelperLine(helper.text, helper.persistent)}
      </div>
    );
  }
}

export default TextField;