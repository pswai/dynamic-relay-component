import React from 'react';
import Relay from 'react-relay';
import VisitorCountWidget from './VisitorCountWidget';
import PostCountWidget from './PostCountWidget';

const widgets = new Map([
  ['VisitorCountWidget', VisitorCountWidget],
  ['PostCountWidget', PostCountWidget]
]);

class Widget extends React.Component {
  render() {
    const {widget, ...others} = this.props;
    const Component = widgets.get(widget.__typename);

    // We need to pass the rest props down to `Component'
    return Component ? <Component {...others} widget={widget} /> : <div>Unknown widget</div>;
  }
}

export default Relay.createContainer(Widget, {
  fragments: {
    widget: () => Relay.QL`
      fragment on Widget {
        __typename,
        ${VisitorCountWidget.getFragment('widget')}
        ${PostCountWidget.getFragment('widget')}
      }
    `
  }
});
