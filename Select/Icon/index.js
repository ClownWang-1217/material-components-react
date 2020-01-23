'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelectIcon } from '@material/select/icon';
import classNames from 'classnames';

/**
 * @augments {React.Component<{}>}
 * @param {string} className
 * @param {string} tag
 * @param {bool} click 
 */
class SelectIcon extends React.Component {

  constructor(props) {
    super(props);

    this._rootRef = React.createRef();
  }

  static propTypes = {
    className: PropTypes.string,
    tag: PropTypes.string,
    click: PropTypes.bool,
    icon:PropTypes.string
  }

  static defaultProps = {
    tag: 'i'
  }


  componentDidMount() {
    if (this._rootRef) {
      this._icon = this._rootRef.current && new MDCSelectIcon(this._rootRef.current);
    }
  }

  componentWillUnmount(){
    if(this._icon){
      this._icon.destroy();
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      tag: Tag,
      className,
      click,
      icon,
      ...otherProps
    } = this.props;
    return (
      <Tag
        ref={this._rootRef}
        className={classNames('material-icons mdc-select__icon',
          className
        )}
        {...otherProps}
        tabIndex={click && '0'}
        role={click && 'button'}
      >
        {icon}
      </Tag>
    );
  }
}

export default SelectIcon;