import React from 'react';
import Relay from 'react-relay';

const styles = {
  visitorCount: {
    fontSize: 30,
    textAlign: 'center'
  },
  descriptionLine: {
    textAlign: 'center'
  }
};

class VisitorCountWidget extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.visitorCount}>{this.props.widget.visitorCount}</div>
        <div style={styles.descriptionLine}>visitors</div>
      </div>
    );
  }
}

export default Relay.createContainer(VisitorCountWidget, {
  fragments: {
    widget: () => Relay.QL`
      fragment on VisitorCountWidget   {
        visitorCount
      }
    `
  }
});
