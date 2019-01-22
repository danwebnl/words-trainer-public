import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  PageHeader,
  AboutPage,
  AdminPage,
  AddWordPage,
  EditWordPage,
  PlayPage,
  ArchivePage,
  SignInPage
} from '../components/index';

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location }
          }}
        />
      ))
      }
    />
  );
}

class AppRouter extends React.Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        _id: PropTypes.string,
        googleId: PropTypes.string
      })
    ])
  };

  static defaultProps = {
    user: null
  };

  state = {};

  render() {
    const { user } = this.props;

    return (
      <BrowserRouter>
        <React.Fragment>
          {user && <PageHeader />}
          <Container style={{ paddingBottom: '50px' }}>
            <Switch>
              <PrivateRoute exact path="/" component={PlayPage} user={user} />
              <PrivateRoute exact path="/admin" component={AdminPage} user={user} />
              <PrivateRoute exact path="/admin/word" component={AddWordPage} user={user} />
              <PrivateRoute exact path="/admin/word/:id" component={EditWordPage} user={user} />
              <Route exact path="/tech" component={AboutPage} />
              <PrivateRoute exact path="/archive" component={ArchivePage} user={user} />
              <Route exact path="/signin" component={SignInPage} />
            </Switch>
          </Container>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(AppRouter);
