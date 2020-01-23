'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import assert from 'assert';
import { MDCSelect } from '@material/select';
import HelperText from './HelperText';
import Icon from './Icon';
import Option from './Option';
import { is, fromJS } from 'immutable';
import classNames from 'classnames';

import MenuSurface from '@third_party/mdc-react/MenuSurface';


/**
 * @augments {React.Component<{}>}
 * @param {string} className
 * @param {boolean} disabled
 * @param {boolean} outline
 * @param {string} label
 * @param {Function} changed
 * @param {Object} helper
 * @property {string} text
 * @property {boolean} persistent
 * @param {Object} leadingIcon
 * @property {string} tag
 * @property {boolean} click  
 * @property {string} icon
 */
class Select extends React.Component {

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();
    const { children, ...otherProps } = this.props;
    this.state = { ...otherProps };
    const selected = this.state.selected;
    assert(selected == undefined || selected.type == 'number');
  }


  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    disabled: PropTypes.bool,
    outlined: PropTypes.bool,
    label: PropTypes.string,
    helper: PropTypes.shape({
      text: PropTypes.string,
      persistent: PropTypes.bool,
      className:PropTypes.string
    }),
    leadingIcon: PropTypes.shape({
      className: PropTypes.string,
      click: PropTypes.bool,
      icon:PropTypes.string
    }),
    changed: PropTypes.func,
    selected: PropTypes.object
  }
  static defaultProps = {

  }


  shouldComponentUpdate(nextProps) {
    return !is(fromJS(this.props.children), fromJS(nextProps.children));
  }

  componentDidMount() {
    const { changed, selected } = this.otherState;
    if (this._rootRef) {
      if (this._rootRef.current) {
        this._select = new MDCSelect(this._rootRef.current);
        if (this._select) {
          if (selected) {
            this._onchange = () => {
              selected.$v = this._select.selectedIndex;
              changed && changed(selected.$v);
            }
            this._select.listen('MDCSelect:change', this._onchange);
            this._optionchange = (evt) => { this._select.selectedIndex = evt };
            selected.on('change', this._optionchange);
            console.log(selected.$v);
            selected.$v >= 0 && (this._select.selectedIndex = selected.$v);
          }
        }
      }
    }
  }

  componentWillUnmount() {
    if (this._select) {
      const { selected } = this.otherState;
      if (selected) {
        selected.off('change', this._optionchange)
        this._select.unlisten('MDCSelect:change', this._onchange);
        this._optionchange = (evt) => { this._select.selectedIndex = evt };
      }
      this._select.destroy();
      this._select = undefined;
    }
  }

  renderNotchedOutline() {
    const { outlined, label } = this.otherState;
    if (!outlined) return;
    return (
      <div className='mdc-notched-outline'>
        <div className='mdc-notched-outline__leading'></div>
        {label && <div className='mdc-notched-outline__notch'>{this.renderLabel()}</div>}
        <div className='mdc-notched-outline__trailing'></div>
      </div>
    );
  }

  renderLabel() {
    const { label } = this.otherState;
    if (!label) return;
    return (
      <label
        className='mdc-floating-label mdc-floating-label--float-above'>
        {label}
      </label>
    );
  }
  renderHelperText() {
    const { helper } = this.otherState;
    if (!helper) return;
    console.log('dddddddddddddddddddddddd')
    return <HelperText {...helper} />;
  }

  renderIcon() {
    const { leadingIcon } = this.otherState;
    if (!leadingIcon) return;
    return <Icon {...leadingIcon} />;
  }
  render() {
    const {
      disabled,
      className,
      outlined,
      helper,
      changed,
      label,
      selected,
      leadingIcon,
      ...otherState
    } = this.state;
    const { children } = this.props;
    this.otherState = {helper, selected, changed, leadingIcon, label, outlined };
    return (
      <React.Fragment>
        <div
          {...otherState}
          ref={this._rootRef}
          className={classNames(
            'mdc-select',
            disabled && 'mdc-select--disabled',
            outlined && 'mdc-select--outlined',
            leadingIcon && 'mdc-select--with-leading-icon',
            className
          )}

        >
          {this.renderIcon()}
          <div className="mdc-select__anchor"> 
            <i className='mdc-select__dropdown-icon' />
            <div
              className='mdc-select__selected-text'
              tabIndex={disabled ? -1 : 0}

            >
            </div>
            {!outlined && this.renderLabel()}
            {outlined ? this.renderNotchedOutline() : <div className="mdc-line-ripple"></div>}
          </div>
          <MenuSurface style = {{minWidth:'200px'}} className='mdc-select__menu mdc-menu'>
            <ul className="mdc-list">
              {children}
            </ul>
          </MenuSurface>
        </div>
        {helper && this.renderHelperText()}
      </React.Fragment>
    );
  }
}

export {
  Option
}

export default Select;