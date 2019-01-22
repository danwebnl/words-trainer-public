import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import {
  Button, Icon, Grid, Header, Image, Segment, Divider
} from 'semantic-ui-react';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';

import demoUser from '../../utils/demoUser';
import { fetchUserDemo } from '../../actions/userActions';

const SignInPage = (props) => {
  if (props.user) {
    return <Redirect to="/" />;
  }

  const signInDemo = () => {
    const token = jwt.sign(demoUser, 'rrfrgrwgreg');

    const cookies = new Cookies();
    cookies.set('jwtToken', token, { path: '/' });

    const { fetchUserDemoAction } = props;
    fetchUserDemoAction();

    const { history } = props;
    history.push('/');
  };

  return (
    <div className="login-form">
      {
        /*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */
        <style>
          {`
          body {
            background-color: #0b81c1
          }
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
          h3 {
            color: #fff
          }
        `}
        </style>
      }
      <style />
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="green" textAlign="center">
            <Image src="./images/words-trainer-logo.png" style={{ width: '200px' }} />
          </Header>
          <h3>A simple method to memorize new foreign words</h3>

          <Segment stacked>
            <Button icon labelPosition="left" fluid size="large" color="red" as="a" href="/auth/google">
              <Icon name="google" />
              Login with Google
            </Button>
            <Divider />
            <Button color="green" icon fluid size="large" as="button" labelPosition="left" onClick={() => signInDemo()}>
              <Icon name="check circle" />
             Login with Demo Account
            </Button>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

SignInPage.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      _id: PropTypes.string,
      googleId: PropTypes.string
    })
  ]),
  fetchUserDemoAction: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

SignInPage.defaultProps = {
  user: null
};

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  fetchUserDemoAction: () => dispatch(fetchUserDemo())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
