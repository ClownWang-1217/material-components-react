'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import assert from 'assert';
import classNames from 'classnames';
import { is, fromJS } from 'immutable';
import { MDCMenuSurface } from '@material/menu-surface';
import { Corner } from '@material/menu-surface';


/**
 * @augments {React.Component<{}>}
 * @param {string} className
 * @param {React.CSSProperties} style
 * @param {Object} open
 * @param {Corner} corner
 * @param {boolean} quickOpen
 * @param {Object} position 绝对定位{x：number,y:number}  其相对于 static 定位以外的第一个父元素进行定位
 * @param {boolean} fixed 为true 时 position 相对于屏幕视口
 */
class MenuSurface extends React.Component {

  constructor(props) {
    super(props);
    this._surfaceRef = React.createRef();
    this.state = { ...props };
    const open = this.state.open;
    assert(open == undefined || open.type == 'boolean');
  }

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    corner: PropTypes.oneOf(Object.values(Corner)),
    fixed: PropTypes.bool,
    open: PropTypes.object,
    position: PropTypes.object,
    quickOpen: PropTypes.bool,
    closed: PropTypes.func,
    opened: PropTypes.func
  }
  static defaultProps = {
  }

  shouldComponentUpdate(nextProps) {
    return !is(fromJS(this.props.children),nextProps.children);
  }

  componentDidMount() {

    const { opened, closed, open, corner, quickOpen, position, fixed } = this.otherState;
    if (this._surfaceRef.current) {
      this._surface = new MDCMenuSurface(this._surfaceRef.current);
      if (this._surface) {
        if (open) {
          this._onclose = () => {
            open.$v = false;
            closed && closed();
          };
          this._onopen = () => {
            open.$v = true;
            opened && opened();
          };
          this._surface.listen('MDCMenuSurface:closed', this._onclose);
          this._surface.listen('MDCMenuSurface:opened', this._onopen);
          this._openonchange = (val) => { val&& this._surface.open() }
          open.on('change', this._openonchange);
        }
        this._surface.setAnchorCorner(corner);
        this._surface.setFixedPosition(fixed);
        position && this._surface.setAbsolutePosition(position.x, position.y);
        this._surface.quickOpen = quickOpen;
      }
    }
  }
  componentWillUnmount() {
    if (this._surface) {
      const { open } = this.otherState
      if (open) {
        open.off('change', this._openonchange);
        this._surface.unlisten('MDCMenuSurface:closed', this._onclose);
        this._surface.unlisten('MDCMenuSurface:opened', this._onopen);
      }
      this._surface.destroy();
      this._surface = undefined;
    }
  }

  render() {
    const {
      corner,
      quickOpen,
      open,
      position,
      fixed,
      closed,
      opened,
      className,
      ...otherState
    } = this.state;
    const { children } = this.props;
    this.otherState = { opened, closed, corner, quickOpen, open, position, fixed };
    return (
      <div
        {...otherState}
        ref={this._surfaceRef}
        className={classNames(
          'mdc-menu-surface',
          className
        )}
      >
        {children}
      </div>
    );
  }
}

export { Corner };
export default MenuSurface;