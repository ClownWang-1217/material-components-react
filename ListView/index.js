'use strict';

import assert from 'assert';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import Checkbox from '../Checkbox';
import observe from '@third_party/observe';

export const ItemSelectionMode = {
  None: 'none',
  Single: 'single',
  Multiple: 'mutiple',
}

/* eslint react/no-direct-mutation-state: "off" */
/* eslint react/prop-types: "off" */

export class ListViewItem extends React.PureComponent {
  constructor(props) {
    super(props);

    const { mode } = props;
    this.state = {
      mode
    };
    if (mode == ItemSelectionMode.Multiple) {
      const checked = observe(this.props.selected);
      checked.on('change', (val) => {
        this.props.changeSelection(val);
      });
      this._checked = checked;
    }
  }

  static propTypes = {
    className: PropTypes.string,
    mode: PropTypes.oneOf(Object.values(ItemSelectionMode)).isRequired,
    selected: PropTypes.bool,
    item: PropTypes.shape({
      // _key: PropTypes.string.isRequired,
      primaryText: PropTypes.string,
      secondaryText: PropTypes.string,
    }),
    changeSelection: PropTypes.func.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    item: {},
    selected: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   super.shouldComponentUpdate(nextProps, nextState);
  // }

  // componentDidMount() {
  //   this.props = fromJS(this.props);
  // }

  componentDidUpdate(prevProps) {
    this._checked.$v = prevProps.selected;
  }

  /* eslint no-unused-vars: "off" */
  render() {
    const {
      className,
      mode,
      selected,
      item: {
        primaryText,
        secondaryText
      },
      changeSelection,
      onClick,
      ...otherProps } = this.props;

    return (
      <div
        {...otherProps}
        className={classNames(
          "mdc-list-item",
          (this.state.mode == ItemSelectionMode.Single && selected) && 'mdc-list-item--selected',
          className,
        )}
        onClick={() => {
          if (this.state.mode != ItemSelectionMode.None) {
            changeSelection(!selected);
          }
          if (onClick) {
            onClick();
          }
        }}>
        {this.state.mode == ItemSelectionMode.Multiple &&
          <Checkbox
            input={{ checked: this._checked }}
          />}
        <span className="mdc-list-item__text">
          <span className="mdc-list-item__primary-text">{primaryText}</span>
          <span className="mdc-list-item__secondary-text">{secondaryText}</span>
        </span>
      </div>
    );
  }
}

export class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.mode
    };
    const allowNoneSelection = this.props.allowNoneSelection;
    if (typeof allowNoneSelection == 'boolean') {
      this.state.allowNoneSelection = allowNoneSelection;
    } else {
      switch (this.state.mode) {
        case ItemSelectionMode.Single:
          this.state.allowNoneSelection = false;
          break;
        case ItemSelectionMode.Multiple:
        default:
          this.state.allowNoneSelection = true;
          break;
      }
    }
  }

  static propTypes = {
    items: PropTypes.array,
    mode: PropTypes.oneOf(Object.values(ItemSelectionMode)),
    //itemTemplate: PropTypes.element,
    onSelectionChange: PropTypes.func,
    onItemClick: PropTypes.func,
    selectedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(Set)]),
    allowNoneSelection: PropTypes.bool,
  };

  static defaultProps = {
    mode: ItemSelectionMode.None,
    items: [],
  };

  _handleSelectionChange = (index, newval) => {
    if (this.props.mode == ItemSelectionMode.Single) {
      if (index == this.state.selectedIndex) {
        if (newval || !this.state.allowNoneSelection) {
          return;
        }
        this.state.selectedIndex = undefined;
      } else {
        if (!newval) {
          return;
        }
        this.state.selectedIndex = index;
      }
    } else if (this.props.mode == ItemSelectionMode.Multiple) {
      if (newval) {
        this.state.selectedIndex.add(index);
      } else {
        if ((this.state.selectedIndex.size() == 1) && !this.state.allowNoneSelection) {
          return;
        }
        this.state.selectedIndex.delete(index);
      }
    } else {
      throw new Error();
    }
    this.forceUpdate();
    const changeEvent = this.props.onSelectionChange;
    if (changeEvent) {
      changeEvent(index, newval);
    }
  };

  _isItemSelected(index) {
    if (this.props.mode == ItemSelectionMode.Single) {
      return index === this.state.selectedIndex;
    } else if (this.props.mode == ItemSelectionMode.Multiple) {
      return this.state.selectedIndex.has(index);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { mode, items, itemTemplate, onItemClick } = this.props;
    return (
      <div className="mdc-list mdc-list--two-line">
        {items.map((item, index) => {
          return React.createElement(itemTemplate, {
            key: item._key,
            item,
            mode,
            selected: this._isItemSelected(index),
            changeSelection: (newval) => this._handleSelectionChange(index, newval),
            onClick: onItemClick ? (() => onItemClick(index)) : undefined
          })
        })}
      </div>
    );
  }
}