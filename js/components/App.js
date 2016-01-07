import React from 'react';
import Relay from 'react-relay';
import VisitorCountWidget from './VisitorCountWidget';
import PostCountWidget from './PostCountWidget';

class App extends React.Component {
  render() {
    return (
      <div>
        <VisitorCountWidget visitorCount="10" />
        <PostCountWidget postCount="123" />
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
