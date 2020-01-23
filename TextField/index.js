
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextField } from '@material/textfield';
import { MDCTextFieldIcon } from '@material/textfield/icon';
import classjoin from '@third_party/class-join'
import Input from './Input';


/**
 * @example
  <TextField
    helperText='help text'
    valid={false}
    onLeadingIconSelect={() => {}}
    type={TextField.Types.Filled_with_leading_trailing_icon}
    outlined={true}
    label='test'
    trailingIcon='event'
    leadingIcon='add'>
    <Input type='password' inputType='input' />
  </TextField>
 * 
 * @augments {React.PureComponent<{}>}
 * @param {JSX.Element} helperText 帮助文字
 * @param {boolean} outlined 外边框
 * @param {string} leadingIcon 前图标
 * @param {string} trailingIcon 后图标
 * @param {string} label 文字
 * @param {string} type 
 * @param {bool} valid 是否无效 为 false 时会出现红色警示效果
 * @param {JSX.Element} children
 * @param {Function} onLeadingIconClick 
 * @param {Function} onTrailingIconClick
 * @param {React.CSSProperties} style
 * @param {string} className
 */
class TextField extends React.PureComponent {

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();
    this._leadingIconRef = React.createRef();
    this._trailingIconRef = React.createRef();
  }
  static Types = {
    Filled: 'mdc-text-field',
    Filled_with_leading_icon: 'mdc-text-field mdc-text-field--with-leading-icon',
    Filled_with_trailing_icon: 'mdc-text-field mdc-text-field--with-trailing-icon',
    Filled_with_leading_trailing_icon: 'mdc-text-field mdc-text-field--with-trailing-icon mdc-text-field--with-leading-icon',
    Textarea: 'mdc-text-field mdc-text-field--textarea',
  }

  static propTypes = {
    type: PropTypes.oneOf(Object.values(TextField.Types)),
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.element,
    outlined: PropTypes.bool,
    label: PropTypes.string,
    valid: PropTypes.bool,
    isHelpText: PropTypes.bool,
    helperText: PropTypes.string,
    leadingIcon: PropTypes.string,
    trailingIcon: PropTypes.string,
    onLeadingIconSelect: PropTypes.func,
    onTrailingIconSelect: PropTypes.func

  }
  static defaultProps = {
    type: TextField.Types.Filled,
    outlined: false,
    label: '',
    valid: false
  };

  componentDidMount() {
    if (this._rootRef.current) {
      this._textField = new MDCTextField(this._rootRef.current);
    }
    if (this._leadingIconRef.current) {
      this._leadingIcon = new MDCTextFieldIcon(this._trailingIconRef.current);
    }
    if (this._trailingIconRef.current) {
      this._trailingIcon = new MDCTextFieldIcon(this._trailingIconRef.current);
    }
  }

  componentWillUnmount() {
    if (this._textField) {
      this._textField.destroy();
    }
    if (this._leadingIcon) {
      this._leadingIcon.destroy();
    }
    if (this._trailingIcon) {
      this._trailingIcon.destroy();
    }
  }
  componentDidUpdate() {
    if (this._textField) {
      this._textField.valid = this.props.valid;
    }
  }
  renderHelperLine(helperText) {
    return (<div className='mdc-text-field-helper-line'>
      <div className='mdc-text-field-helper-text mdc-text-field-helper-text--persistent'>{helperText}</div>
    </div>);
  }

  renderIcon(icon, onClick, ref) {
    return (<i ref={ref} className="material-icons mdc-text-field__icon" tabIndex="0" role="button" onClick={onClick}> {icon}</i>);
  }

  renderFloatingLabel(label) {
    return (<label className='mdc-floating-label' htmlFor='my-text-field'>{label}</label>);
  }
  renderNotchedOutline(label) {
    return (
      <div className='mdc-notched-outline'>
        <div className='mdc-notched-outline__leading'></div>
        <div className='mdc-notched-outline__notch'>
          {label ? this.renderFloatingLabel(label) : null}
        </div>
        <div className='mdc-notched-outline__trailing'></div>
      </div>
    );
  }

  renderInput(textFieldType) {
    const child = React.Children.only(
      this.props.children
    );
    return React.cloneElement(child, { isTextarea: textFieldType === TextField.Types.Textarea });
  }

  render() {
    const {
      className,
      helperText,
      outlined,
      leadingIcon,
      trailingIcon,
      label,
      style,
      type,
      onLeadingIconSelect,
      onTrailingIconSelect
    } = this.props;
    return (
      <>
        <div
          ref={this._rootRef}
          className = {classjoin(
            type,
            (label ? 'mdc-text-field--no-label' : ''),
            (outlined ? 'mdc-text-field--outlined' : ''),
            className
          )}
          // className={type + (label ? ' mdc-text-field--no-label ' : '') + (outlined ? ' mdc-text-field--outlined ' : '') + ' ' + className}
          style={style}>
          {leadingIcon ? this.renderIcon(leadingIcon, onLeadingIconSelect, this._leadingIconRef) : null}
          {this.renderInput(type)}
          {trailingIcon ? this.renderIcon(trailingIcon, onTrailingIconSelect, this._trailingIconRef) : null}
          {outlined ? this.renderNotchedOutline(label) :
            <div>{label ? this.renderFloatingLabel(label) : null}
              <div className='mdc-line-ripple'></div>
            </div>
          }
        </div>
        {helperText ? this.renderHelperLine(helperText) : null}
      </>
    )
  }
}

export { Input };
export default TextField;