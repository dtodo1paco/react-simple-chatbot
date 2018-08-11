import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }
    handleChange(event) {
        this.props.Change(this.props.ID, event.target.value);
    }
    handleFocus(event) {
        this.props.Focus(this.props.ID);
    }
    handleBlur(event) {
        this.props.Blur(this.props.ID);
    }
    render() {
        return (
            <span className={(this.props.Value.length > 0 || this.props.Focused) ? 'input filled' : 'input'}>
                <input id={this.props.ID} value={this.props.Value} onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange} className="field" type={this.props.Type} />
                <label className={(this.props.Error) ? 'label error' : 'label'}>
                    <span className="content">{this.props.Placeholder}</span>
                </label>
                <span className={(this.props.Error) ? 'errorMessage visible' : 'errorMessage'}>This field cannot be empty.</span>
            </span>
        );
    }
}

export default Input;
