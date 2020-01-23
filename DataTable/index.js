'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCDataTable } from '@material/data-table';
import { events } from '@material/data-table/constants';
import Checkbox from '@third_party/mdc-react/Checkbox';
import assert from 'assert';
import classNames from 'classnames'


/**
 * @augments {React.PureComponent<{}>}
 * @param {boolean} checkboxList 复选框
 * @param {Array<any>} columns 表头内容
 * @param {Array<Array<any>} data 表格内容
 * @param {string} className
 * @param {React.CSSProperties} style
 * @param {Function} selected 
 */
class DataTable extends React.PureComponent {

  constructor(props) {
    super(props);
    this._rootRef = React.createRef();
    const columns = this.props.columns;
    const data = this.props.data;
    assert(columns == undefined || Object.prototype.toString.call(columns) === '[object Array]');
    assert(data == undefined || Object.prototype.toString.call(data) === '[object Array]');
  }

  static propTypes = {
    checkboxList: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.any),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
    className: PropTypes.string,
    style: PropTypes.object,
    selected: PropTypes.func,

  }
  static defaultProps = {
  }

  renderHeader(columns, checkboxList) {
    if (columns) {
      return (
        <thead>
          <tr
            className='mdc-data-table__header-row'>
            {checkboxList && this.renderHeaderCell(checkboxList)}
            {columns.map((content, key) => (
              this.renderHeaderCell(false, content, key)
            ))}
          </tr>
        </thead>
      );
    }
    return null;
  }

  renderHeaderCell(checkboxList, content, key) {
    return (
      <th
        className={classNames(
          'mdc-data-table__header-cell',
          'custom-thead',
          checkboxList && 'mdc-data-table__header-cell--checkbox',
          (!isNaN(Number(content))) && 'mdc-data-table__header-cell--numeric'
        )}
        role='columnheader'
        scope='col'
        key={key}>
        {checkboxList && <Checkbox className='mdc-data-table__header-row-checkbox' input={{ checked: undefined }} />}
        {content}
      </th>
    );
  }


  renderBody(data, checkboxList) {
    if (data) {
      return (
        <tbody className='mdc-data-table__content'>
          {data.map((content, key) => (
            <tr key={key} className='mdc-data-table__row' data-row-id={key}>
              {checkboxList && this.renderBodyCell(checkboxList)}
              {content.map((content, key) =>
                this.renderBodyCell(false, content, key)
              )}
            </tr>
          ))}
        </tbody>)
    }
    return null;
  }

  renderBodyCell(checkboxList, content, key) {
    return (
      <td
        className={classNames(
          'mdc-data-table__cell',
          checkboxList && 'mdc-data-table__cell--checkbox',
          (!isNaN(Number(content))) && 'mdc-data-table__cell--numeric'
        )}
        role='columnheader'
        scope='col'
        key={key}
      >
        {checkboxList && <Checkbox className='mdc-data-table__row-checkbox' input={{ checked: undefined }} />}
        {content}
      </td>
    );
  }

  componentDidMount() {
    const {
      columns,
      data,
      selected,
      checkboxList
    } = this.props;
    if (this._rootRef.current && columns && columns.length > 0 && data && data.length > 0) {
      this._table = new MDCDataTable(this._rootRef.current);
      if (this._table) {
        this._foundation = this._table.getDefaultFoundation();
        if (selected && checkboxList) {
          this._table.listen(events.ROW_SELECTION_CHANGED,
            () => { selected(this._foundation.getSelectedRowIds(), events.ROW_SELECTION_CHANGED) }
          );
          this._table.listen(events.SELECTED_ALL,
            () => { selected(this._foundation.getSelectedRowIds(), events.SELECTED_ALL) }
          );
          this._table.listen(events.UNSELECTED_ALL,
            () => { selected(this._foundation.getSelectedRowIds(), events.UNSELECTED_ALL) }
          );
        }
      }
    }
  }
  componentDidUpdate() {
    if (this._foundation) {
      this._foundation.layout()
    }
  }
  componentWillUnmount() {
    const {
      selected,
      checkboxList
    } = this.props;
    if (this._foundation) {
      this._foundation.destroy();
      this._foundation = undefined;
    }
    if (this._table) {
      if (selected && checkboxList) {
        this._table.unlisten(events.ROW_SELECTION_CHANGED,
          () => { selected(this._foundation.getSelectedRowIds(), events.ROW_SELECTION_CHANGED) }
        );
        this._table.unlisten(events.SELECTED_ALL,
          () => { selected(this._foundation.getSelectedRowIds(), events.SELECTED_ALL) }
        );
        this._table.unlisten(events.UNSELECTED_ALL,
          () => { selected(this._foundation.getSelectedRowIds(), events.UNSELECTED_ALL) }
        );
      }
      this._table.destroy();
      this._table = undefined;
    }
  }
  render() {
    const {
      className,
      data,
      columns,
      checkboxList,
      style,
    } = this.props;
    return (
      <div
        ref={this._rootRef}
        className={classNames(
          'mdc-data-table',
          className
        )}
        style={style}>
        <table className='mdc-data-table__table' aria-label='Dessert calories'>
          {this.renderHeader(columns, checkboxList)}
          {this.renderBody(data, checkboxList)}
        </table>
      </div>

      /* <div className='mdc-data-table'>
      <table className='mdc-data-table__table' aria-label='Dessert calories'>
        <thead>
          <tr className='mdc-data-table__header-row'>
            <th className='mdc-data-table__header-cell' role='columnheader' scope='col'>Dessert</th>
            <th className='mdc-data-table__header-cell mdc-data-table__header-cell--numeric' role='columnheader' scope='col'>Carbs (g)</th>
            <th className='mdc-data-table__header-cell mdc-data-table__header-cell--numeric' role='columnheader' scope='col'>Protein (g)</th>
            <th className='mdc-data-table__header-cell' role='columnheader' scope='col'>Comments</th>
          </tr>
        </thead>
        <tbody className='mdc-data-table__content'>
          <tr className='mdc-data-table__row'>
            <td className='mdc-data-table__cell'>Frozen yogurt</td>
            <td className='mdc-data-table__cell mdc-data-table__cell--numeric'>24</td>
            <td className='mdc-data-table__cell mdc-data-table__cell--numeric'>4.0</td>
            <td className='mdc-data-table__cell'>Super tasty</td>
          </tr>
          <tr className='mdc-data-table__row'>
            <td className='mdc-data-table__cell'>Ice cream sandwich</td>
            <td className='mdc-data-table__cell mdc-data-table__cell--numeric'>37</td>
            <td className='mdc-data-table__cell mdc-data-table__cell--numeric'>4.33333333333</td>
            <td className='mdc-data-table__cell'>I like ice cream more</td>
          </tr>
          <tr className='mdc-data-table__row'>
            <td className='mdc-data-table__cell'>Eclair</td>
            <td className='mdc-data-table__cell mdc-data-table__cell--numeric'>24</td>
            <td className='mdc-data-table__cell mdc-data-table__cell--numeric'>6.0</td>
            <td className='mdc-data-table__cell'>New filing flavor</td>
          </tr>
        </tbody>
      </table>
      </div> */
    );
  }
}

export default DataTable;