import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
import TestUtils from 'react-dom/test-utils';

export const getRenderedContent = (comp) => {
    let renderer = new ShallowRenderer();
    let component = renderer.render(comp);
    let output = renderer.getRenderOutput();
    return output.props.children;
}
export const getComposite = (comp) => {
    return TestUtils.renderIntoDocument(comp);
}