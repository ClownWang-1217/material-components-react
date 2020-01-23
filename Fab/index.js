import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';
import style from './fab.scss';

const FABTYPE = {
    mdc_fab: 'mdc-fab',
    mdc_fab__icon: 'mdc-fab__icon',
    fab__ripple: 'mdc-fab__ripple',
    mdc_fab__label: 'mdc-fab__label',
    mdc_fab__mini: 'mdc-fab--mini',
    mdc_fab__extended: 'mdc-fab--extended',
    mdc_fab__exited: 'mdc-fab--exited',

}


/**
 * @param ButtonType 类型
 * @param Normal_Btn 通用按钮
 * @param Extended_Btn 扩展按钮
 */
export const ButtonType = {
    Normal_Btn: FABTYPE.mdc_fab,
    MiniBtn: FABTYPE.mdc_fab + ' ' + FABTYPE.mdc_fab__mini,
    Extended_Btn: FABTYPE.mdc_fab + ' ' + FABTYPE.mdc_fab__extended,

}



/**
 * @augments {Component<{handleOnClick:function, ripple:boolean,buttonType:string,visible:boolean,label:string,icon:string,left:boolean }>}
 */
class Fab extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    /**
     * @param handleOnClick 按钮点击事件
     * @param ripple 是否添加水印
     * @param buttonType 按钮类别
     * @param visible 显示/隐藏
     * @param label 按钮文字
     * @param icon 图片资源
     * @param left true ? icon + label : label + icon
     */
    static propTypes =
        {
            handleOnClick: PropTypes.func,
            ripple: PropTypes.bool,
            buttonType: PropTypes.oneOf([ButtonType.Normal_Btn,ButtonType.MiniBtn,ButtonType.Extended_Btn]),
            visible: PropTypes.bool,
            label: PropTypes.string,
            icon: PropTypes.string,
            left: PropTypes.bool,

        }

    static defaultProps =
        {
            ripple: true,
            buttonType: ButtonType.Normal_Btn,
            visible: true,
            left: false,
            label: 'Create',
            icon: 'add'
        }

    componentDidMount() {
        if (this.props.ripple) {
            this.rootRipple = new MDCRipple(this.ref.current);
        }
    }
    componentWillUnmount() {
        if (this.rootRipple) {
            this.rootRipple.destroy();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.visible !== nextProps.visible);
    }

    componentDidUpdate(nextProps) {

    }
    render() {
        return (
            <div>
                <text className = 'mdc-fab-extended-fluid'>mdc-fab-extended-fluid</text>
                <button
                    ref={this.ref}
                    className={(this.props.visible ? this.props.buttonType : this.props.buttonType + ' ' + FABTYPE.mdc_fab__exited) + (this.props.ripple ? ('  mdc-ripple-upgraded') : '')}
                    onClick={this.props.handleOnClick}>
                    <div className='mdc-fab__ripple'></div>
                    {this.props.left ?
                        <div>
                            <span style={{ verticalAlign: 'middle' }} className='mdc-fab__label'>{this.props.buttonType == ButtonType.Extended_Btn ? this.props.label : null}</span>
                            <span style={{ verticalAlign: 'middle' }} className='material-icons mdc-fab__icon'>{this.props.icon}</span>
                        </div>
                        :
                        <div>
                            <span style={{ verticalAlign: 'middle' }} className='material-icons mdc-fab__icon'>{this.props.icon}</span>
                            <span style={{ verticalAlign: 'middle' }} className='mdc-fab__label'>{this.props.buttonType == ButtonType.Extended_Btn ? this.props.label : null}</span>
                        </div>}
                </button>
            </div>
        );
    }
}

export default Fab;