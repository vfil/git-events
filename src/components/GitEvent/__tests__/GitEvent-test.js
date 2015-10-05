jest.dontMock('../GitEvent');

describe('GitEvent Tests', function() {
    it('onMouseOver should behave properly', function() {
        var event = {
            id:"3208460619",
            type:"CommitCommentEvent",
            actor: {
                id:3907295,
                login:"edoardocavazza",
                gravatar_id:"",
                url:"https://api.github.com/users/edoardocavazza",
                avatar_url:"https://avatars.githubusercontent.com/u/3907295?"
            },
            repo: {
                id:37659586,
                name:"euvl/page.js"
            }
        };
        var React = require('react/addons');
        var ReactDOM = require('react-dom');
        var TestUtils = React.addons.TestUtils;
        var GitEvent = require('../GitEvent');
        var gitEvent = TestUtils.renderIntoDocument(
            <GitEvent dataEvent={event} />
        );

        var item = ReactDOM.findDOMNode(gitEvent.refs.item);

        expect(gitEvent.state.hover).toBe(false);

        TestUtils.SimulateNative.mouseOver(item);
        expect(gitEvent.state.hover).toBe(true);

        TestUtils.SimulateNative.mouseOut(item);
        expect(gitEvent.state.hover).toBe(false);

        var tooltip = ReactDOM.findDOMNode(gitEvent.refs.tooltip);
        expect(tooltip.textContent).toEqual(event.repo.name);

    });
});
