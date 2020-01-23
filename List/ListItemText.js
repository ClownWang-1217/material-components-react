'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

/**
 * @augments {React.PureComponent<{}>}
 * @param {string} primaryText
 * @param {string} secondaryText
 * @param {string} className
 * @param {React.CSSProperties} style
 */
class ListItemText extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    className: PropTypes.string
  }

  _renderText(text, className) {
    if (text === undefined) return null;
    return <span
      className={className}>
      {text}
    </span>
  }


  render() {
    const {
      className,
      primaryText,
      secondaryText,
      style,
      children,
      ...otherProps
    } = this.props;
    return (
      <span
        className={classNames(
          'mdc-list-item__text',
          className
        )}
        style={style}
        {...otherProps}>
        {this._renderText(primaryText, 'mdc-list-item__primary-text')}
        {this._renderText(secondaryText, 'mdc-list-item__secondary-text')}
        {children}
      </span>
    );
  }
}

export default ListItemText;