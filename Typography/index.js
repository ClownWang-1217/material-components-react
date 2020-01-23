'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classjoin from '@third_party/class-join';
import safeAppend from '@third_party/safe-append';

/**
 * @augments {React.PureComponent<{
    className:string,
    style:React.CSSProperties,
    text:string,
    variant:string,
    tag:string,
    children:any}, {}>}
 */
export default class Typography extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static _variants = {
    h1: { className: 'headline1', component: 'span' },
    h2: { className: 'headline2', component: 'span' },
    h3: { className: 'headline3', component: 'span' },
    h4: { className: 'headline4', component: 'span' },
    h5: { className: 'headline5', component: 'span' },
    h6: { className: 'headline6', component: 'span' },
    subtitle1: { className: 'subtitle1', component: 'span' },
    subtitle2: { className: 'subtitle2', component: 'span' },
    body1: { className: 'body1', component: 'span' },
    body2: { className: 'body2', component: 'span' },
    caption: { className: 'caption', component: 'span' },
    button: { className: 'button', component: 'span' },
    overline: { className: 'overline', component: 'span' },
  };

  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
    variant: PropTypes.oneOf(Object.keys(Typography._variants)).isRequired,
    tag: PropTypes.string,
    children: PropTypes.any
  };

  static defaultProps = {
    tag: 'span',
  }

  render() {
    const {
      className,
      text,
      color,
      variant,
      tag,
      children,
      ...others } = this.props;

    const variant_ = Typography._variants[variant];
    return React.createElement(tag, {
        ...others,
        className: classjoin(
          safeAppend('mdc-typography--', variant_.className),
          safeAppend('mdc-theme--', color),
          className
        )
      },
      typeof text == 'string' ? text : children);
  }
}