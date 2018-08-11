import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/Input.jsx';
import 'styles/login.scss';


class SignForm extends React.Component {
    constructor() {
        super();
        this.state = {
            submitting: false,
            error: false,
            inputs: [
                {
                    name: 'username',
                    focused: false,
                    value: '',
                    error: false
                },
                {
                    name: 'password',
                    focused: false,
                    value: '',
                    error: false
                },
                {
                    name: 'nickname',
                    focused: false,
                    value: '',
                    error: false
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(id, value) {
        // immutable array
        let newInputs = this.state.inputs.concat();
        newInputs[id].value = value;
        newInputs[id].error = false;
        this.setState({inputs: newInputs});
    }
    handleSubmit(event) {
        let errors = false;
        let newInputs = this.state.inputs.concat();
        for(let i = 0; i < this.state.inputs.length; i++) {
            if (this.state.inputs[i].value.length === 0) {
                errors = true;
                newInputs[i].error = true;
            }
        }
        this.setState({
            error: errors,
            inputs: newInputs
        });
        if (!errors) {
            this.setState({submitting: true});

            let user = {};
            this.state.inputs.map(function (item, i) {
                user[item.name] = item.value;
            });
            this.props.handler(user);
            this.reset();
            /*
            setTimeout(() => {
                this.reset();
            }, 2000);
            */
        }
        event.preventDefault();
    }

    reset () {
        let newInputs = this.state.inputs.concat();
        for(let i = 0; i < this.state.inputs.length; i++) {
            newInputs[i].value = '';
        }
        this.setState({
            submitting: false,
            inputs: newInputs
        });
    }

    handleFocus(id) {
        // immutable array
        let newInputs = this.state.inputs.concat();
        newInputs[id].focused = true;
        this.setState({inputs: newInputs});
    }
    handleBlur(id) {
        // immutable array
        let newInputs = this.state.inputs.concat();
        newInputs[id].focused = false;
        this.setState({inputs: newInputs});
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit} className="form">
                <Input ID="0" name="username" Placeholder="Username" Type="text" Focus={this.handleFocus} Blur={this.handleBlur} Change={this.handleChange} Value={this.state.inputs[0].value} Focused={this.state.inputs[0].focused} Error={this.state.inputs[0].error} />
                <Input ID="1" name="password" Placeholder="Password" Type="password" Focus={this.handleFocus} Blur={this.handleBlur} Change={this.handleChange} Value={this.state.inputs[1].value} Focused={this.state.inputs[1].focused} Error={this.state.inputs[1].error} />
                <Input ID="2" name="nickname" Placeholder="nickname" Type="text" Focus={this.handleFocus} Blur={this.handleBlur} Change={this.handleChange} Value={this.state.inputs[2].value} Focused={this.state.inputs[2].focused} Error={this.state.inputs[2].error} />
                <button type="submit" className={(this.state.inputs[1].error || this.state.inputs[0].error) ? 'iconButton error' : 'iconButton'} disabled={this.state.submitting}>
                    <span className="label">Register</span>
                </button>
            </form>
        )
    }
}
export default SignForm;