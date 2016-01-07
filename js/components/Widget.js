import React from 'react';
import VisitorCountWidget from './VisitorCountWidget';
import PostCountWidget from './PostCountWidget';

const widgets = new Map([
  ['VISITOR_COUNT', VisitorCountWidget],
  ['POST_COUNT', PostCountWidget]
]);

class Widget extends React.Component {
  render() {
    const {widget, ...others} = this.props;
    const Component = widgets.get(widget);

    // We need to pass the rest props down to `Component'
    return Component ? <Component {...others} /> : <div>Unknown widget</div>;
  }
}

export default Widget;
