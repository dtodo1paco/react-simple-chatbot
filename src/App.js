import React, { Component } from 'react';

// UTIL
import { is_link } from 'actions/util.js';

// RENDER
import User from 'components/User';
import Message from 'components/Message';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage, toggleInputDisabled } from 'react-chat-widget';
import 'styles/app.scss';
import 'styles/chatbot.scss';

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            counter: 0,
            user: props.user?props.user:null,
            thinking: false,
            errors: null
        };
        this.loginHandler = this.loginHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
        this.openWidget = this.openWidget.bind(this);
        this.handleNewUserMessage = this.handleNewUserMessage.bind(this);
    }

    componentDidMount() {
    }

    handleNewUserMessage (newMessage) {
        this.setState({
            thinking: true
        }, async() => {
            let errors = null;
            if (is_link(newMessage) > 0) {
                addLinkSnippet({
                    title: newMessage,
                    link: newMessage,
                    target: '_blank'
                });
            } else {
                let message = null;
                try {
                    const token = await this.props.userAPI.doAuth(this.state.user.token);
                    if (token != null) {
                        // Now send the message throught the backend API
                        let result = await this.props.chatbotAPI.doSendMessage(newMessage, token);
                        if (result === null) {
                            throw "disconnected";
                        } else {
                            let items = result.messages;
                            message = result.speech;
                            if (items.length > 1) {
                                let item = items[Math.floor(Math.random() * items.length)];
                                message = item.speech;
                            }
                            message = JSON.stringify(message).replace(new RegExp('"', 'g'), '');
                        }
                        if (is_link(message) > 0) {
                            addLinkSnippet({
                                title: "Prueba este enlace",
                                link: message,
                                target: '_blank'
                            });
                        } else {
                            addResponseMessage(message);
                        }
                    } else {
                        throw "disconnected";
                    }
                } catch (err) {
                    message = "Bzzz Zziiiiiihhh Pffff... creo que necesito un descanso.";
                    if (window.location.toString().indexOf('9999') < 0) {
                        addLinkSnippet({
                            title: "Pulsa aquí para continuar",
                            link: window.location.toString(),
                            target: '_self'
                        });
                    }
                    errors = ["Se ha perdido la conexión :("]
                    toggleInputDisabled();
                }
                this.setState({
                    thinking: false,
                    errors: errors
                });
            }
        });
    }

    logoutHandler() {
        this.setState({
            thinking: true
        });
        this.props.userAPI.doLogout().then((result) => {
            let err = null;
            if (result != null) {
                err = null;
            } else {
                err = ["No hemos podido abandonar la sesión. Pero no pasa nada, estamos en ello :)"];
            }
            this.setState({
                user: null,
                errors: err,
                thinking: false
            });
        });
    }

    loginHandler (user) {
        this.setState({
            thinking: true
        }, async() =>  {
            try {
                const authUser = await this.props.userAPI.doLogin(user);
                if(authUser != null && authUser.auth) {
                    this.setUser(user, authUser);
                } else {
                    throw new "Login error";
                }
            } catch(err){
                this.setState({
                    user: null,
                    errors: ["Credenciales no válidas. Prueba de nuevo."],
                    thinking: false
                });
            }
        });
    }
    setUser(user, result) {
        let storedUser = {}
        storedUser['username'] = user.username;
        storedUser['nickname'] = result.nickname;
        storedUser['token'] = result.token;
        addResponseMessage("Hola " + result.nickname + ", ¿en qué puedo ayudarte?");
        this.setState({
            user: storedUser,
            counter: 0,
            thinking: false
        });
    }
    signupHandler (user) {
        this.setState({
            thinking: true
        }, async() => {
            let result = await this.props.userAPI.doRegister(user);
            if (result != null && result.auth) {
                this.setUser(user, result);
            } else {
                user = null;
                errors = ["No podemos darte de alta. Consulta en @dtodo1paco"];
                this.setState({user: user, errors: errors, thinking: false});
            }
        });
    }

    openWidget() {
        let button = document.getElementsByClassName('rcw-launcher')[0];
        if (button) {
            this.setState({
                counter: this.state.counter + 1
            });
            button.click();
        }
    }

    render() {
        const { user, thinking } = this.state;
        if (!user && thinking === true) {
            return <div className="loading-icon" />
        }
        let messages = null;
        if (this.state.errors != null && this.state.errors.length > 0) {
            messages = <Message success={false} summary="No hemos podido identificarte" messages={this.state.errors} autohide={true} />
        }
        if (user && this.state.counter === 0) {
            let ow = this.openWidget;
            setTimeout(function () {
                ow();
            }, 2000);
        }

        return (
            <div id="theApp">
                <h1>Chatbot veterinario</h1>
                {messages}
                <User user={user} loading={this.state.thinking}
                    loginHandler={this.loginHandler}
                    signupHandler={this.signupHandler}
                    logoutHandler={this.logoutHandler}/>

            {user && <div>
                Pulsa en el botón de chat para comenzar a hacer preguntas o espera 2 segundos...
            </div>}

            {user && <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                senderPlaceHolder='Escribe tu texto aquí...'
                title={this.state.user ? this.state.user.nickname : ''}
                subtitle={this.state.thinking ? "Pensando..." : "Formula tus preguntas al asistente veterinario"}
            />}
            </div>
        );
    }
}
export default App;
