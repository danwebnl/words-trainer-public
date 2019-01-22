import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Container } from 'semantic-ui-react';

const PlayOptions = ({ optionOnClick }) => (
  <Container text style={{ width: '60%', paddingTop: '4em' }}>
    <Grid columns={2} stackable textAlign="center">
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Button color="blue" size="big" onClick={() => optionOnClick('fromForeignWords')}>
            Translate From Foreign Words
          </Button>
        </Grid.Column>

        <Grid.Column>
          <Button color="green" size="big" onClick={() => optionOnClick('toForeignWords')}>
            Translate To Foreign Words
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

PlayOptions.propTypes = {
  optionOnClick: PropTypes.func.isRequired
};

export default PlayOptions;
