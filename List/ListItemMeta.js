'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

/**
 * @augments {React.PureComponent<{}>}
 * @param {string | JSX.Element} meta 列表项的最后一列 (小文本，图标,或图像)  仅支持mdc-react下 props 包含 className的Component
 * @param {React.CSSProperties} style 
 * @param {string} className
 */
class ListItemMeta extends React.PureComponent {
  constructor(props) {
    super(props);

  }


  static propTypes = {
    meta: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    meta: ''
  }
  render() {
    const {
      meta,
      style,
      className,
      ...otherProps
    } = this.props;
    var metaElement;
    if (typeof meta === 'string') {
      metaElement = <span>{meta}</span>;
    } else {
      metaElement = meta;
    }

    const metaProps = {
      className: classNames(
        'mdc-list-item__meta',
        className
      ),
      style: style,
      ...otherProps
    }
    return (React.cloneElement(metaElement, metaProps));
  }
}


export default ListItemMeta;