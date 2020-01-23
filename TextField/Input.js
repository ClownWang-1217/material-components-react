
'use strict';

import React from 'react';
import PropTypes from 'prop-types';


class Input extends React.PureComponent {

  constructor(props) {
    super(props);
  }
  static propTypes = {
    isTextarea: PropTypes.bool
  }

  static defaultProps = {
    isTextarea: false
  };

  render() {
    const {
      isTextarea,
      ...otherProps
    } = this.props;
    console.log('isTextarea' + isTextarea)
    if (!isTextarea) {
      return (<input className='mdc-text-field__input' id='my-text-field' {...otherProps}></input>);
    } else {
      return (<textarea className='mdc-text-field__input' id='my-text-field' {...otherProps}></textarea>);
    }
  }
}

export default Input;