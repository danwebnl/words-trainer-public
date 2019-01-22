import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Button, Container, Divider, Segment, Header, Table
} from 'semantic-ui-react';
import _ from 'lodash';
import PieChart from 'react-svg-piechart';

import { OverviewList } from '../index';
import style from '../style/style';

const Overview = ({
  playAgainHandler, totalWords, correctAnswers, masteredWords
}) => {
  const wrongAnswers = totalWords - correctAnswers;
  const data = [
    { title: 'Wrong Answers', value: wrongAnswers, color: '#4183C4' },
    { title: 'Correct Answers', value: correctAnswers, color: 'green' }
  ];

  let correctAnswersPercentage = (correctAnswers / totalWords) * 100;
  correctAnswersPercentage = _.round(correctAnswersPercentage, 2);

  return (
    <Segment style={{ padding: '0em' }} vertical>
      <Container text>
        <Header as="h2" style={style.blue} textAlign="center">
          You have finished for now!
        </Header>

        <Grid container columns={2} stackable reversed="mobile" style={{ paddingTop: '3em' }}>
          <Grid.Column>
            <PieChart data={data} expandOnHover />
            <div style={style.pieLegend}>{`${correctAnswersPercentage}% Correct Answers `}</div>
          </Grid.Column>
          <Grid.Column>
            <OverviewList
              totalWords={totalWords}
              correctAnswers={correctAnswers}
              masteredWords={masteredWords}
              wrongAnswers={wrongAnswers}
            />
          </Grid.Column>
        </Grid>

        <Divider
          as="h4"
          className="header"
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <Button as="a" size="large" color="green" onClick={playAgainHandler}>
            Play Again
          </Button>
        </Divider>
      </Container>
    </Segment>
  );
};

Overview.propTypes = {
  playAgainHandler: PropTypes.func.isRequired,
  totalWords: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  masteredWords: PropTypes.number.isRequired
};

export default Overview;
