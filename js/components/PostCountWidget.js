import React from 'react';

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
        <div style={styles.postCount}>{this.props.postCount}</div>
        <div style={styles.descriptionLine}>posts</div>
      </div>
    );
  }
}

export default PostCountWidget;
