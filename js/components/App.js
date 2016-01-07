import React from 'react';
import Relay from 'react-relay';
import Widget from './Widget';

class App extends React.Component {
  render() {
    return (
      <div>
        <Widget widget="VISITOR_COUNT" visitorCount="10" />
        <Widget widget="POST_COUNT" postCount="123" />
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
});
