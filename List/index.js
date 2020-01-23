'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCList } from '@material/list';
import ListItem from './ListItem';
import ListDivider from './ListDivider';
import ListItemText from './ListItemText';
import ListItemMeta from './ListItemMeta';
import ListItemGraphic from './ListItemGraphic';
import classNames from 'classnames'




/**
 * @example 俩行文本列表
 * 
  <List twoLine = {true}>
    <ListItem>
      <ListItemText
        primaryText='Photos'
        secondaryText='Jan 9, 2018' />
    </ListItem>
  </List>

  @example 单行文本列表
  <List>
    <ListItem>
      <ListItemText primaryText='Photos' />
    </ListItem>
  </List>
  @example 普通列表带分割线
  <List>
    <ListItem value = {0} onClick = {(e)=>console.log(e.target.value)}>
      Recipes
    </ListItem>
    <ListDivider tag="div" />
     <ListItem value = {1} onClick = {(e)=>console.log(e.target.value)}>
      Work
    </ListItem>
  </List>

  @example 复选框列表
    <List checkboxList = {true} selectedIndex={[0]}>
      <ListItem>
        <Checkbox />
        <ListItemMeta meta='info' />
      </ListItem>
      <ListItem> 
        <ListItemMeta meta={<Checkbox />} />
      </ListItem>
    </List>
    @example 单行选择列表
    <List
        singleSelection
        selectedIndex={0}
      >
        <ListItem>
          <ListItemText primaryText='Photos'/>
        </ListItem>
        <ListItem>
          <ListItemText primaryText='Recipes'/>
        </ListItem>
        <ListItem>
          <ListItemText primaryText='Work'/>
        </ListItem>
      </List>
 * 
 * @augments {React.PureComponent<{}>}
 * @param {string} className
 * @param {boolean} twoLine 俩行文本
 * @param {boolean} singleSelection 单行选择
 * @param {boolean} nonInteractive 互动 
 * @param {boolean} dense 紧凑密集型布局
 * @param {boolean} avatarList 宽泛型布局
 * @param {boolean} checkboxList 复选框
 * @param {Array<number> | number} selectedIndex 非 array：列表中不能包含checkbox     array: 搭配复选框 初始选中列表
 * @param {string} tag
 * @param {string} role
 * @param {React.CSSProperties} style
 */

class List extends React.PureComponent {

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();
  }


  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    twoLine: PropTypes.bool,
    singleSelection: PropTypes.bool,
    nonInteractive: PropTypes.bool,
    dense: PropTypes.bool,
    avatarList: PropTypes.bool,
    checkboxList: PropTypes.bool,
    // radioList: PropTypes.bool,
    selectedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
    tag: PropTypes.string,
    role: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
    tag: 'ul'
  }

  _setState() {
    const { singleSelection, selectedIndex } = this.otherProps;
    if (this._list) {
      this._list.singleSelection = singleSelection;
      this._list.layout();
      this._list.selectedIndex = selectedIndex;
      this._list.wrapFocus = true;
    }
  }
  componentDidMount() {
    if (this._rootRef.current) {
      this._list = new MDCList(this._rootRef.current);
    }
    this._setState();
  }

  componentDidUpdate() {
    this._setState();
  }
  componentWillUnmount() {
    if (this._list) {
      this._list.destroy();
    }
  }
  render() {
    const {
      className,
      children,
      checkboxList,
      // radioList,
      nonInteractive,
      dense,
      avatarList,
      twoLine,
      singleSelection,
      role,
      selectedIndex,
      tag: Tag,
      style,
      ...otherProps
    } = this.props;
    this.otherProps = {singleSelection,selectedIndex};
    return (
      <Tag
        ref={this._rootRef}
        className={classNames(
          'mdc-list',
          (nonInteractive && 'mdc-list--non-interactive'),
          (dense && 'mdc-list--dense'),
          (avatarList && 'mdc-list--avatar-list'),
          (twoLine && 'mdc-list--two-line'),
          className
        )}
        aria-label={checkboxList && 'List with checkbox items'}
        role={role || checkboxList && 'group'}
        style={style}
        {...otherProps}
      >
        {children}
      </Tag>
    );
  }
}

export {
  ListItem,
  ListDivider,
  ListItemText,
  ListItemMeta,
  ListItemGraphic
};
export default List;