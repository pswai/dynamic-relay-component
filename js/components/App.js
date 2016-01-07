import React from 'react';
import Relay from 'react-relay';
import Widget from './Widget';

class App extends React.Component {
  renderWidgets = (widgets) => {
    return widgets.map((widget, index) => {
      return <Widget key={index} {...widget} />
    });
  };

  render() {
    const widgets = [{
      widget: 'VISITOR_COUNT',
      visitorCount: 10
    }, {
      widget: 'POST_COUNT',
      postCount: 123
    }];

    return (
      <div>
        {this.renderWidgets(widgets)}
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
