import React from 'react';
import { Card, List } from 'semantic-ui-react';

import { PageTitle } from '../index';

const AboutPage = () => (
  <React.Fragment>
    <PageTitle title="Words Trainer Tech" />

    <Card.Group centered>
      <Card>
        <Card.Content>
          <Card.Header>Backend</Card.Header>
          <Card.Meta>Node.js environment</Card.Meta>
          <Card.Description>
            <List>
              <List.Item as="a" href="https://expressjs.com/" target="_blank">
                Express
              </List.Item>
              <List.Item as="a" href="https://mongoosejs.com/" target="_blank">
                MongoDB / Mongoose
              </List.Item>
              <List.Item
                as="a"
                href="https://en.wikipedia.org/wiki/Representational_state_transfer"
                target="_blank"
              >
                RESTful API
              </List.Item>
              <List.Item as="a" href="http://www.passportjs.org/docs/google/" target="_blank">
                Passport (Google)
              </List.Item>
              <List.Item as="a" href="https://mochajs.org/" target="_blank">
                Mocha
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Card.Header>Frontend</Card.Header>
          <Card.Meta>React JS library</Card.Meta>
          <Card.Description>
            <List>
              <List.Item as="a" href="https://redux.js.org/" target="_blank">
                Redux
              </List.Item>
              <List.Item as="a" href="https://reacttraining.com/react-router/" target="_blank">
                React Router
              </List.Item>
              <List.Item as="a" href="https://webpack.js.org/" target="_blank">
                Webpack
              </List.Item>
              <List.Item as="a" href="https://babeljs.io/" target="_blank">
                Babel
              </List.Item>
              <List.Item
                as="a"
                href="https://reactjs.org/docs/typechecking-with-proptypes.html"
                target="_blank"
              >
                Prop Types
              </List.Item>
              <List.Item as="a" href="https://github.com/axios/axios" target="_blank">
                Axios
              </List.Item>
              <List.Item as="a" href="https://react.semantic-ui.com/" target="_blank">
                Semantic UI React
              </List.Item>
              <List.Item as="a" href="https://jaredpalmer.com/formik/docs/overview" target="_blank">
                Formik
              </List.Item>
              <List.Item as="a" href="https://www.w3schools.com/js/js_es6.asp" target="_blank">
                ES6
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <Card.Header>Tools</Card.Header>
          <Card.Meta />
          <Card.Description>
            <List>
              <List.Item as="a" href="https://code.visualstudio.com/" target="_blank">
                Visual Studio Code
              </List.Item>
              <List.Item as="a" href="https://eslint.org/" target="_blank">
                ESLint (Airbnb config)
              </List.Item>
              <List.Item as="a" href="https://prettier.io/" target="_blank">
                Prettier
              </List.Item>
              <List.Item as="a" href="https://robomongo.org/" target="_blank">
                Robo 3T
              </List.Item>
              <List.Item as="a" href="https://www.getpostman.com/" target="_blank">
                Postman
              </List.Item>
              <List.Item as="a" href="https://github.com/danwebnl/words-trainer" target="_blank">
                GitHub Repository source code
              </List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  </React.Fragment>
);

export default AboutPage;
