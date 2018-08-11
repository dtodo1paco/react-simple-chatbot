import fs from 'fs';

const ROOT_DATA = "__tests__/__mocks__/__data__";

export default class FileSystem {
    parseJSONResponse(model) {
        // TODO: add error responses using random number
        let response = this.parseJSONFile(ROOT_DATA + '/genericResponse.json');
        let data = this.parseJSONFile(ROOT_DATA + '/' + model + ".json");
        response.data = data;
        response.status = 200;
        return response;
    }

    parseJSONFile(file) {
        const content = String(fs.readFileSync(file));
        return JSON.parse(content);
    }
}