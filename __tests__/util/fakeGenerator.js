import faker from 'faker';

faker.locale = "es";

export const generateRandomNumber = () => {
    return faker.random.number();
}
export const generateResponseUserAuth = (authenticated) => ({
    auth: authenticated,
    token: authenticated?faker.internet.password():null
});

export const generateResponseUserMe = (token) => {
    return token!=null?faker.internet.password():null;
};

export const generateResponseUserRegister = (user, userCreated) => ({
    auth: userCreated,
    token: userCreated?faker.internet.password():null,
    username: user.username,
    nickname: user.nickname
});

export const generateUserLogin = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password()
});
export const generateUserRegister = () => ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
    nickname: faker.name.firstName()
});
export const generateUserLoggedIn = () => ({
    username: faker.internet.userName(),
    token: generateToken(),
    nickname: faker.name.firstName()
});
export const generateToken = () => {
    let token = faker.internet.password();
    for (let i=0;i<5;i++) {
        token += faker.random.uuid().replace(new RegExp("-", 'g'), '');
    }
    return token;
};


export const generateResponseMessage = (message, nResponses) => {
    if (nResponses > 0) {
        let messages = [];
        for (let i = 0; i < nResponses; i++) {
            messages.push({
                type: i,
                speech: generateMessage()
            });
        }
        messages.push({
            type: nResponses,
            speech: message
        })
        return ret = {
            "speech": generateWord(),
            "messages": messages
        }
    } else {
        return null;
    }
}


export const generateWord = () => {
    return faker.lorem.word();
}

export const generateMessage = () => {
    return faker.lorem.sentence();
}

export const generateMessageArray = (nSentences) => {
    let sentences = [];
    for (let i = 0; i < nSentences; i++) {
        sentences.push(generateMessage());
    }
    return sentences;
}
/*
    let message = "";
    for (let i = 0; i < nWords; i++) {
        if (i > 0) {
            message += " ";
        }
        message += message + faker.random.word();
    }
    return message;
};
*/