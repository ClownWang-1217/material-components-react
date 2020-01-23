'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCMenu, Corner } from '@material/menu';
import {
  ListDivider as MenuListDivider,
  ListItemGraphic as MenuListItemGraphic,
  ListItemMeta as MenuListItemMeta,
  ListItemText as MenuListItemText,
} from '@third_party/mdc-react/List';
import MenuList from './MenuList';
import MenuListItem from './MenuListItem';
import classNames from 'classnames'


/**
 * @augments {React.PureComponent<{}>}
 * @param {string} className
 * @param {React.CSSProperties} style
 * @param {boolean} open
 * @param {Corner} corner
 * @param {boolean} quickOpen
 * @param {Object} position 绝对定位{x：number,y:number}  其相对于 static 定位以外的第一个父元素进行定位
 * @param {boolean} fixed 为true 时 position 相对于屏幕视口
 * @param {Function} selected
 * @param {React.CSSProperties} style
 */
class Menu extends React.PureComponent {

  constructor(props) {
    super(props);
    this._menuRef = React.createRef();
  }


  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    style: PropTypes.object,
    corner: PropTypes.arrayOf(Object.values(Corner)),
    fixed: PropTypes.bool,
    open: PropTypes.bool,
    position: PropTypes.object,
    quickOpen: PropTypes.bool,
    selected: PropTypes.func,
  }
  static defaultProps = {
    fixed: false,
    quickOpen: false,
    open:false
  }

  componentDidMount() {
    const {selected} = this.otherProps;
    if (this._menuRef.current) {
      this._menu = new MDCMenu(this._menuRef.current);
      if (this._menu) {     
        selected && this._menu.listen('MDCMenu:selected',
          selected
        );
      }
      this._setState()
    }
  }
  componentWillUnmount() {
    const {selected} = this.otherProps;
    if (this._menu) {
      selected && this._menu.unlisten('MDCMenu:selected',
        selected
      );
      this._menu.destroy();
      this._menu = undefined;
    }
  }
  componentDidUpdate() {
    this._setState();
  }
  _setState() {
    const { corner, quickOpen, open, position, fixed } = this.otherProps;
    if (this._menu) {
      this._menu.setAnchorCorner(corner);
      this._menu.setFixedPosition(fixed);
      position && this._menu.setAbsolutePosition(position.x, position.y);
      this._menu.quickOpen = quickOpen;
      this._menu.open = open;
    }
  }
  render() {
    const {
      style,
      children,
      className,
      corner,
      fixed,
      open,
      position,
      quickOpen,
      selected,
      ...otherProps
    } = this.props;
    this.otherProps = {selected, corner, quickOpen, open, position, fixed };
    return (
      <div
        ref={this._menuRef}
        className={classNames('mdc-menu mdc-menu-surface', className)}
        style={style}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}


export {
  MenuListDivider,
  MenuListItemGraphic,
  MenuListItemMeta,
  MenuListItemText,
  MenuList,
  MenuListItem,
  Corner
}

export default Menu;

