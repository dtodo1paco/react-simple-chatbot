import React from 'react';

import 'styles/messages.scss';

const Message = ( props ) => {

    const autohide = props.autohide?'autohide':'';

    const showSuccess = (summary, messages) => {
        return <div className="message-success">{summary}
        {
            messages.map(function(item, i) {
                return <li key={i}>{item}</li>
            })
            }
        </div>

    }
    const showErrors = (summary, errors) => {
        return <div className="message-error">{summary}
        {
            errors.map(function(item, i) {
                return <li key={i}>{item}</li>
            })
            }
        </div>
    }
    let messages = null;
    if (props.success) {
        messages = showSuccess(props.summary, props.messages);
    } else {
        messages = showErrors(props.summary, props.messages);
    }
    return (
        <div className={"message " + autohide}>
        {messages}
        </div>
    )
}

export default Message;