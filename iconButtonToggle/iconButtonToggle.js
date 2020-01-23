import React from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import styles from './iconButtonToggle.scss';


/**
 * 开关按钮组件
 * @augments {React.PureComponent<{}>}
 * @param {string} toggleOnIcon 按钮打开后的图标
 * @param {string} toggleOffIcon 按钮关闭后的图标
 * @param {Object} params 携带参数
 * @param {boolean} isOn 开关状态
 * @param {Function} handleButtonToggleOnChange 按钮开关点击回调事件
 */
class IconButtonToggle extends React.PureComponent {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.onButton = React.createRef();
        this.offButton = React.createRef();
        this.handldButtonOnClick = this._handldButtonOnClick.bind(this);
    }

    static propTypes = {

        handleButtonToggleOnChange: PropTypes.func,
        toggleOnIcon: PropTypes.string,
        toggleOffIcon: PropTypes.string,
        params: PropTypes.object,
        isOn: PropTypes.bool
    }
    static defaultProps = {
        toggleOnIcon: 'arrow_drop_down',
        toggleOffIcon: 'arrow_right',
        params: {},
        isOn: false
    }

    componentDidMount() {
        this.onButtonRipple = new MDCRipple(this.ref.current);
        this.onButtonRipple.unbounded = true;
    }

    // shouldComponentUpdate() {
    //     return true;
    // }
    componentDidUpdate() {

    }
    componentWillUnmount() {

        if (this.onButtonRipple) {
            this.onButtonRipple.destroy();
        }
    }

    _handldButtonOnClick() {
        if (this.props.handleButtonToggleOnChange) {
            this.props.handleButtonToggleOnChange(this.props.isOn, this.props.params);
        }
    }

    render() {
        return (
            <>
                <span style={{ marginRight: `${this.props.params.level * 40}px` }}></span>
                {this.props.isOn ? <button onClick={this.handldButtonOnClick} ref={this.ref} className={"mdc-icon-button material-icons " + styles['custom-button']}>{this.props.toggleOnIcon}</button> :
                    <button onClick={this.handldButtonOnClick} ref={this.ref} className={"mdc-icon-button material-icons " + styles['custom-button']}>{this.props.toggleOffIcon}</button>}
                <span className={"mdc-tab__text-label " + styles['custom-label']}>{this.props.params.name}</span>
            </>
        )
    }
}

export default IconButtonToggle;