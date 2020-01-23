'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'

/**
 * @augments {React.PureComponent<{}>}
 * @param {string | JSX.Element} graphic 列表项的最后一列 (小文本，图标,或图像)仅支持mdc-react下 props 包含 className的Component
 * @param {React.CSSProperties} style 
 * @param {string} className
 */
class ListItemGraphic extends React.PureComponent {
  constructor(props) {
    super(props);

  }

  static propTypes = {
    graphic: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    style: PropTypes.object,
    className: PropTypes.string
  }
  static defaultProps = {
    graphic: ''
  }
  render() {
    const {
      graphic,
      style,
      className,
      ...otherProps
    } = this.props;
    var graphicElement;
    if (typeof graphic === 'string') {
      graphicElement = <span>{graphic}</span>;
    } else {
      graphicElement = graphic;
    }

    const graphicProps = {
      className: classNames(
        'mdc-list-item__graphic',
        className
      ),
      style: style,
      ...otherProps
    }
    return (React.cloneElement(graphicElement, graphicProps));
  }
}


export default ListItemGraphic;