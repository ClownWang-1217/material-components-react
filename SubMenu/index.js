'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuList, MenuListItem } from '@third_party/mdc-react/Menu';

/**
 * @example
 * <Menu open>
    <MenuList key='MenuList1'>
      <SubMenu>
        <MenuListItem>没有作用的1</MenuListItem>
        <SubMenu>
          <MenuListItem>没有作用的1</MenuListItem>
        </SubMenu>
        <MenuListItem>没有作用的2</MenuListItem>
        <MenuListItem>没有作用的3</MenuListItem>
        <SubMenu>
          <MenuListItem>没有作用的1</MenuListItem>
          <MenuListItem>没有作用的2</MenuListItem>
          <MenuListItem>没有作用的3</MenuListItem>
        </SubMenu>
      </SubMenu>
      <MenuListItem>没有作用的1</MenuListItem>
      <MenuListItem>没有作用的2</MenuListItem>
      <MenuListItem>没有作用的3</MenuListItem>
    </MenuList>
   </Menu>
 * 
 * 下级菜单
 * @augments {React.PureComponent<{}>}
 */

class SubMenu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onMouseOver = this._onMouseOver.bind(this);
    this.onMouseLeave = this._onMouseLeave.bind(this);
  }

  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.any
  }

  static defaultProps = {
    title:'SubMenu'
  }

  _onMouseOver(e) {
    const { x, y, width } = e.target.getBoundingClientRect();
    var props = {
      position: { x: x + width, y: y - 8 },
      children: this.props.children
    }
    this._blackComponent(props);
    this.forceUpdate();
  }

  _onMouseLeave() {
    this._comp = null;
    this.forceUpdate()
  }

  _comp = null;
  _blackComponent(props) {
    const {
      children,
      ...otherProps
    } = props;
    this._comp = (
      <Menu {...otherProps} quickOpen open>
        <MenuList>
          {React.Children.map(children, (child) => {
            return child;
          })}
        </MenuList>
      </Menu>
    );
  }
  render() {
    const {
      title,
    } = this.props;
    return (<div onMouseLeave={this.onMouseLeave}>
      <MenuListItem onMouseOver={this.onMouseOver}>
        {title}
      </MenuListItem>
      {this._comp}
    </div>);
  }
}


export default SubMenu;