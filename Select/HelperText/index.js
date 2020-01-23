'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import {MDCSelectHelperText} from '@material/select/helper-text';
import classNames from 'classnames';

/**
 * @augments {React.Component<{}>}
 * @param {bool} persistent
 * @param {string} className
 * @param {string} text
 */
class HelperText extends React.Component{


  constructor(props){
    super(props);
    this._rootRef = React.createRef();
  }

  static propTypes = {
    persistent:PropTypes.bool,
    className:PropTypes.string,
    text:PropTypes.string,
    children:PropTypes.any
  }
  static defaultProps = {
    persistent:true
  }

  shouldComponentUpdate(){
    return false;
  }
  componentDidMount(){
    if (this._rootRef) {
      this._helperText = this._rootRef.current && new MDCSelectHelperText(this._rootRef.current);
    }
  }
  componentWillUnmount(){
    if(this._helperText){
      this._helperText.destroy();
    }
  }
  render(){
    console.log('dddddddddddddddddddddddd')
    const{
      children,
      persistent,
      className,
      text,
      ...otherProps
    } = this.props;
    return(
      <p
      ref = {this._rootRef}
      className = {classNames('mdc-select-helper-text',
      persistent && 'mdc-select-helper-text--persistent',
      className
      )}
      {...otherProps}
      >
        {text}
      </p>
    );
  }
}


export default HelperText;