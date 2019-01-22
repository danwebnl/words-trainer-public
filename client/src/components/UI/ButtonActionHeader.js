import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ButtonActionHeader = ({ text, to, icon }) => (
  <Grid container stackable verticalAlign="middle">
    <Grid.Row>
      <Grid.Column textAlign="right">
        <Button as={Link} to={to} primary tabIndex="0">
          <Icon name={icon} />
          {text}
        </Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

ButtonActionHeader.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default ButtonActionHeader;
