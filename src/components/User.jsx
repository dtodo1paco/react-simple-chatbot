import React from 'react';
import LoginForm from 'components/LoginForm.jsx';
import SignupForm from 'components/SignupForm.jsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';

const User = ( props ) => {

    let toRender = null;
    if (props.user != null) {
        toRender = (
            <div key="wellcome-page" >
                Bienvenido al chatbot veterinario donde podrás plantear tus dudas acerca de tus mascotas.
                <br/><br/>
                Entrarás en el chat con el nombre: {props.user.nickname}
                <br/><br/>
                <button type="submit" className='iconButton' onClick={props.logoutHandler}>
                    <span className="label">Abandonar</span>
                </button>
            </div>
        )
    } else {
        toRender = (
            <Tabs key="tabs-menu">
                <TabList>
                    <Tab>Login</Tab>
                    <Tab>Registro</Tab>
                </TabList>
                <TabPanel>
                    <LoginForm handler={props.loginHandler} />
                </TabPanel>
                <TabPanel>
                    <SignupForm handler={props.signupHandler} />
                </TabPanel>
            </Tabs>
        )
    }
    return (<div className="user">{toRender}</div>);
}
export default User;
