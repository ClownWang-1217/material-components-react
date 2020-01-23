import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';
import { MDCSelectIcon } from '@material/select/icon';
import {is,fromJS} from 'immutable';


/**
* @augments {Component<{}>}
*/
class Select extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  /**
   * @param handleOnChange 选择改变事件
   * @param outLine bool 是否需要边框
   * @param noLabel bool 是否需要文字说明
   * @param fullWidth bool 是否宽度填充
   * @param label 选择框文字说明
   * @param width 宽度(只有当 fullWidth == false 有效)
   * @param leadingIcon 图片资源(默认为空)
   * @param options 下拉选项数组
   */
  static propTypes = {
    handleOnChange: PropTypes.func,
    noLabel: PropTypes.bool,
    outLine: PropTypes.bool,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    width: PropTypes.string,
    leadingIcon: PropTypes.string,
    options: PropTypes.array
  }
  static defaultProps = {
    outLine: true,
    noLabel: false,
    fullWidth: false,
    label: 'label',
    width: '200px',
    leadingIcon: '',
    options: []
  }


  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props.options),fromJS(nextProps.options));
  }
  componentDidMount() {
    this.select = new MDCSelect(this.ref.current);
    this.select.listen('MDCSelect:change',
      () => { this.props.handleOnChange(this.select.value, this.select.selectedIndex) }
    );
  }

  componentDidUpdate() {


  }
  componentWillUnmount() {
    if (this.select) {
      this.select.destroy();
    }
    if (this.icon) {
      this.icon.destroy();
    }
  }

  render() {
    return (
      <div ref={this.ref} className={(this.props.outLine ? 'mdc-select mdc-select--outlined' : 'mdc-select') + (this.props.noLabel ? ' mdc-select--no-label' : '') + (this.props.leadingIcon === '' ? '' : ' mdc-select--with-leading-icon')}>
        <i className="material-icons mdc-select__icon" tabIndex="0" role="button">{this.props.leadingIcon}</i>
        <div className='mdc-select__anchor' style={this.props.fullWidth ? { width: '100%' } : { width: this.props.width }}>
          {this.props.outLine
            ?
            <div className='mdc-notched-outline'>
              <div className='mdc-notched-outline__leading'></div>
              <div className='mdc-notched-outline__notch'>
                {this.props.noLabel ? null : <label className='mdc-floating-label'>{this.props.label}</label>}

              </div>
              <div className='mdc-notched-outline__trailing'></div>
            </div>
            :
            <div>
              {this.props.noLabel ? null : <span className='mdc-floating-label mdc-floating-label--float-above'>{this.props.label}</span>}
              <div className='mdc-line-ripple'></div>
            </div>
          }
          <i className='mdc-select__dropdown-icon'></i>
          <div className='mdc-select__selected-text'></div>
        </div>

        <div className='mdc-select__menu  mdc-menu mdc-menu-surface' style={this.props.fullWidth ? { width: '100%' } : { width: this.props.width }}>
          <ul className='mdc-list'>
            {this.props.options.map((value, index) => (<li key={index} className='mdc-list-item' data-value={value}>{value}</li>))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Select;