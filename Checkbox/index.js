'use strict';

import assert from 'assert';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { MDCCheckbox } from '@material/checkbox';


/**
 * @augments {React.Component<{
    input: React.HTMLProps<HTMLInputElement>,
    ripple: boolean
    } & React.HTMLProps<HTMLDivElement>, {}>}
 */
class CheckBox extends React.Component {
  state = { ...this.props };

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();

    const input = this.props.input;
    assert(input.checked == undefined || input.checked.type == 'boolean');
  }

  static propTypes = {
    className: PropTypes.string,
    input: PropTypes.shape({
      className: PropTypes.string,
      checked: PropTypes.object,
      disabled: PropTypes.bool,
    }),
    ripple: PropTypes.bool,
  };

  static defaultProps = {
    ripple: false,
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.input.disabled != this._checkbox.disabled) {
      this._checkbox.disabled = nextProps.input.disabled;
    }
    return false;
  }

  componentDidMount() {
    if (this._rootRef.current) {
      this._checkbox = new MDCCheckbox(this._rootRef.current);
      const checked = this.state.input.checked;
      if (checked) {
        this._onchange = (event) => checked.$v = event.target.checked;
        this._checkbox.listen('change', this._onchange);
        this._$oncheckedchange = (val) => this._checkbox.checked = val;
        checked.on('change', this._$oncheckedchange);
      }
    }
  }

  componentWillUnmount() {
    if (this._checkbox) {
      const checked = this.state.input.checked;
      if (checked) {
        checked.off('change', this._$oncheckedchange);
        this._checkbox.unlisten('change', this._onchange);
      }
      this._checkbox.destroy();
      this._checkbox = undefined;
    }
  }

  render() {
    const {
      className,
      input,
      ripple,
      ...otherProps } = this.state;

    const {
      checked,
      ...inputOtherProps } = input || {};
      
    return (
      <div
        {...otherProps}
        ref={this._rootRef}
        className={classNames(
          'mdc-checkbox',
          className
        )}>
        <input
          {...inputOtherProps}
          type='checkbox'
          defaultChecked={checked ? checked.$v : undefined}
          className={classNames('mdc-checkbox__native-control', inputOtherProps.className)} />
        <div className='mdc-checkbox__background'>
          <svg className='mdc-checkbox__checkmark' viewBox='0 0 24 24'>
            <path className='mdc-checkbox__checkmark-path' fill='none' d='M1.73,12.91 8.1,19.28 22.79,4.59' ></path>
          </svg>
          <div className='mdc-checkbox__mixedmark'></div>
        </div>
        {ripple && <div className="mdc-checkbox__ripple"></div>}
      </div>
    );
  }
}
export default CheckBox;