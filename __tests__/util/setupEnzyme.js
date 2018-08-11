import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

export const doConfig = () => {
    //console.log("Configuring Enzyme");
    configure({ adapter: new Adapter() });
    global.shallow = shallow;
    global.render = render;
    global.mount = mount;
    global.toJson = toJson;
}





