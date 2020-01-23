'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { MDCRipple } from '@material/ripple';
// import { Colors } from '../Theme';
// import safeAppend from '@third_party/safe-append';


export default class TopAppBar extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
            <span class="mdc-top-app-bar__title">Title</span>
          </section>
        </div>
      </header>
    );
  }
}