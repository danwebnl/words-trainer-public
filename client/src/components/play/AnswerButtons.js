import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const AnswerButtons = ({ feedbackHandler }) => (
  <div>
    <Button inverted color="red" onClick={() => feedbackHandler('no')}>
      <Icon name="times" />
I was wrong
    </Button>
    <Button inverted color="green" onClick={() => feedbackHandler('yes')}>
      <Icon name="check" />
I was right
    </Button>
  </div>
);

AnswerButtons.propTypes = {
  feedbackHandler: PropTypes.func.isRequired
};

export default AnswerButtons;
