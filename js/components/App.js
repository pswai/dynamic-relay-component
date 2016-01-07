import React from 'react';
import Relay from 'react-relay';
import Widget from './Widget';

class App extends React.Component {
  renderWidgets = () => {
    return this.props.viewer.widgets.edges.map(({cursor, node}) => {
      return <Widget key={cursor} widget={node} />;
    });
  };

  render() {
    return (
      <div>
        {this.renderWidgets()}
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
            cursor,
            node {
              __typename,
              ${Widget.getFragment('widget')}
            }
          }
        }
      }
    `
  }
});
