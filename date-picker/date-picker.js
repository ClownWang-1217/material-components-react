'use strict';

import React from 'react';
import { getDayCount, getDateFormat, getOneDay } from './utils';
import { MDCTextField } from '@material/textfield';
import { MDCMenu, Corner } from '@material/menu';
import { MDCChipSet } from '@material/chips';
import styles from './date-pick.scss';

/**
 * 日期选择器
 */
class DatePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.menuRef = React.createRef();
    this.chipSetRef = React.createRef();
    var date = new Date();
    this.state = {
      curYear: date.getFullYear(),
      curMonth: date.getMonth(),
      curDay: date.getDate(),
      years: [],
      onYearPage: false
    }
    this.handeleOnFocus = this._handeleOnFocus.bind(this);
  }

  _handeleOnFocus() {
    this.menu.open = true;
    this.menu.setAnchorCorner(Corner.BOTTOM_LEFT)
  }
  componentDidMount() {
    this.textField = new MDCTextField(this.ref.current);
    this.menu = new MDCMenu(this.menuRef.current);
    this.chipSet = new MDCChipSet(this.chipSetRef.current);
  }
  componentWillUnmount() {
    if (this.textField) {
      this.textField.destroy();
    }
    if (this.menu) {
      this.menu.destroy();
    }
    if (this.chipSet) {
      this.chipSet.destroy();
    }
  }

  render() {
    var list = [];
    let weekNum = getOneDay(this.state.curYear, this.state.curMonth + 1, 1);
    let rowCount = 6;
    let colCount = 7;
    let cellCount = rowCount * colCount;
    for (let index = 1; index <= cellCount; index++) {
      let chipAttribute = {
        visable: false,
        isCurDay: false,
        isCurDate: false,
        value: null
      }
      if (index < weekNum) {
        list.push(chipAttribute);
      }
      else if (index >= weekNum && index < getDayCount(this.state.curYear, this.state.curMonth + 1) + weekNum) {
        chipAttribute.visable = true;
        chipAttribute.value = index - weekNum + 1;
        let date = new Date();
        if (date.getDate() == index - weekNum + 1 && this.state.curYear == date.getFullYear() && this.state.curMonth == date.getMonth()) {
          chipAttribute.isCurDate = true;
        }
        else {
          chipAttribute.isCurDate = false;
        }
        if (this.state.curDay == index - weekNum + 1) {
          chipAttribute.isCurDay = true;
        }
        else {
          chipAttribute.isCurDay = false;
        }
        list.push(chipAttribute);
      }
      else {
        chipAttribute.visable = false;
        chipAttribute.value = index - weekNum + 1;
        list.push(chipAttribute);
      }
    }
    return (
      <div className='mdc-menu-surface--anchor'>
        <div ref={this.ref} className='mdc-text-field mdc-text-field--with-trailing-icon '>
          <input type='text' id='my-input' className='mdc-text-field__input ' value={getDateFormat(this.state.curYear, this.state.curMonth, this.state.curDay)} onFocus={this.handeleOnFocus} readOnly='readOnly' />
          <label htmlFor='my-input' className='mdc-floating-label'>日期</label>
          <i className='material-icons mdc-text-field__icon' tabIndex='0' role='button'>today</i>
          <div className='mdc-line-ripple'></div>
        </div>
        <div ref={this.menuRef} className={'mdc-menu mdc-menu-surface ' + styles['menu-suface-root']} >
          <div className={'mdc-list ' + styles['list']}>
            <div className={styles['list-div']}>
              <div className={styles['list-div-title']}>
                <button className={'mdc-button ' + styles['button']} onClick={() => {
                  var yearArr = [];
                  for (let index = this.state.curYear - 10; index < this.state.curYear + 18; index++) {
                    yearArr.push(index);
                  }
                  this.setState({ years: yearArr, onYearPage: !this.state.onYearPage });

                }}>{this.state.curYear + '年' + (this.state.curMonth + 1) + '月'}</button>
                <div style={{ float: 'right', right: '15px' }}>
                  <button className={'mdc-icon-button material-icons ' + styles['custom-icon-button']} onClick={() => { this.setState(this.state.curMonth - 1 >= 0 ? { curMonth: this.state.curMonth - 1 } : { curYear: this.state.curYear - 1, curMonth: 11 }) }}>keyboard_arrow_left</button>

                  <button className={'mdc-icon-button material-icons ' + styles['custom-icon-button']} onClick={() => { this.setState(this.state.curMonth + 1 < 12 ? { curMonth: this.state.curMonth + 1 } : { curYear: this.state.curYear + 1, curMonth: 0 }) }}>keyboard_arrow_right</button>
                </div>
              </div>
            </div>

            <div className={styles['menu-body-container']}>
              {this.state.onYearPage ? <>
                <section ref={this.chipSetRef} className={'mdc-chip-set mdc-chip-set--choice ' + styles['years-chip-set']} role='grid'>
                  {this.state.years.map((value, index) => {
                    return (
                      <div className={'mdc-chip ' + styles['chip-year-container'] + ' ' + ((value == this.state.curYear) ? styles['custom-selected'] : styles['custom-chip'])}
                        key={index}
                        onClick={() => { this.setState({ curYear: value, onYearPage: false }) }}>
                        <div className='mdc-chip__ripple '></div>
                        <span role='button' style={{ fontSize: '13px' }} className='mdc-chip__text' value={value} >{value}</span>
                      </div>);
                  })}
                </section>
              </> : <>
                  <div className={styles['week-container']}>
                    <div className={styles['week-label']}>一</div>
                    <div className={styles['week-label']}>二</div>
                    <div className={styles['week-label']}>三</div>
                    <div className={styles['week-label']}>四</div>
                    <div className={styles['week-label']}>五</div>
                    <div className={styles['week-label']}>六</div>
                    <div className={styles['week-label']}>日</div>
                  </div>
                  <section ref={this.chipSetRef} className={'mdc-chip-set mdc-chip-set--choice ' + styles['days-chip-set']} role='grid'>
                    {list.map((value, index) => {
                      return (
                        <div className={value.visable ? 'mdc-chip ' + (value.isCurDay ? styles['custom-selected'] : styles['custom-chip']) + ' ' + (value.isCurDate ? styles['custom-outline'] : '') : ' ' + styles['custom-hidden']}
                          key={index}
                          style={{ margin: '0px', padding: '0px', display: 'inline-block', lineHeight: '32px', width: '32px', textAlign: 'center', fontSize: '13px' }}
                          onClick={() => { this.setState({ curDay: value.value }, () => { this.menu.open = false; }) }}>
                          <div className='mdc-chip__ripple '></div>
                          <span role='button' className='mdc-chip__text' value={value.value} >{value.value}</span>
                        </div>);
                    })}
                  </section>
                </>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;