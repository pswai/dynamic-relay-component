import React from 'react';
import Relay from 'react-relay';

const styles = {
  postCount: {
    fontSize: 30,
    textAlign: 'center'
  },
  descriptionLine: {
    textAlign: 'center'
  }
};

class PostCountWidget extends React.Component {
  render() {
    return (
      <div>
        <div style={styles.postCount}>{this.props.widget.postCount}</div>
        <div style={styles.descriptionLine}>posts</div>
      </div>
    );
  }
}

export default Relay.createContainer(PostCountWidget, {
  fragments: {
    widget: () => Relay.QL`
      fragment on PostCountWidget {
        postCount
      }
    `
  }
});
