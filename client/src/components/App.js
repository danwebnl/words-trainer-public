import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppRouter from '../routers/AppRouter';
import { fetchUser } from '../actions/userActions';

class App extends React.Component {
  static propTypes = {
    fetchUserAction: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { fetchUserAction } = this.props;
    fetchUserAction();
  }

  render() {
    return <AppRouter />;
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserAction: () => dispatch(fetchUser())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
