import React from 'react';

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
        <div style={styles.visitorCount}>{this.props.visitorCount}</div>
        <div style={styles.descriptionLine}>visitors</div>
      </div>
    );
  }
}

export default VisitorCountWidget;
