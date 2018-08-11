import axios from 'axios';
import { decrypt } from 'actions/crypt-util.js';

import { API_ROOT } from 'config/api-config';

async function doLogin (user) {
    let ret = null;
    const response = await axios.post(API_ROOT + "/auth/login", user)
        .then((result) => {
            if (result.status === 200 && result.data.auth) {
                ret = result.data;
            } else {
                //console.log("Error response: " + JSON.stringify(result));
            }
        }).catch(result => {
            //console.log("Network error: " + JSON.stringify(result));
        });
    return ret;
}
async function doLogout () {
    let ret = null;
    const response = await axios.get(API_ROOT + "/auth/logout")
        .then((result) => {
            if (result.status === 200 && result.data.auth === false) {
                ret = result.data;
            } else {
                console.log("Error response: " + JSON.stringify(result));
            }
        }).catch(result => {
            //console.log("Network error: " + JSON.stringify(result));
        });
    return ret;
}

async function doAuth (token) {
    let ret = null;
    if (token) {
        axios.defaults.headers.common['x-access-token'] = token;
    }
    const response = await axios.get(API_ROOT + "/auth/me").then((result) => {
        if (result.status === 200 && result.data.password != null) {
            ret = decrypt(result.data.password);
        } else {
            console.log("ERROR: doing auth");
        }
    }).catch(result => {
        console.log("Error on network call", JSON.stringify(result));
    });
    return ret;
}

async function doRegister (user) {
    let ret = null;
    const response = await axios.post(API_ROOT + "/auth/register", user).then((result) => {
        if (result.status === 200 && result.data.auth) {
            ret = result.data;
        } else {
            console.log("ERROR: doing register");
        }
    }).catch(result => {
        console.log("Error on network call", JSON.stringify(result));
    });
    return ret;
}



module.exports = {
    "doLogin": doLogin,
    "doAuth": doAuth,
    "doRegister": doRegister,
    "doLogout": doLogout
};