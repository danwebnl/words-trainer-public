import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'semantic-ui-react';

import AnswerButtons from './AnswerButtons';
import style from '../style/style';

const Answer = ({ answer, feedbackHandler }) => (
  <React.Fragment>
    <Divider as="h4" className="header" horizontal style={style.answer}>
      {answer}
    </Divider>

    <AnswerButtons feedbackHandler={feedbackHandler} />
  </React.Fragment>
);

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  feedbackHandler: PropTypes.func.isRequired
};

export default Answer;
