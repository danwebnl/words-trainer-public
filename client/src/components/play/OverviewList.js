import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import style from '../style/style';

const OverviewList = ({
  correctAnswers, wrongAnswers, masteredWords, totalWords
}) => (
  <React.Fragment>
    <Table attached unstackable>
      <Table.Body>
        <Table.Row style={style.bold}>
          <Table.Cell>Results</Table.Cell>
          <Table.Cell>#</Table.Cell>
        </Table.Row>
        <Table.Row style={style.green}>
          <Table.Cell>Correct Answers</Table.Cell>
          <Table.Cell>{correctAnswers}</Table.Cell>
        </Table.Row>
        <Table.Row style={style.blue}>
          <Table.Cell>Incorrect Answers</Table.Cell>
          <Table.Cell>{wrongAnswers}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Mastered Words*</Table.Cell>
          <Table.Cell>{masteredWords}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Total Words</Table.Cell>
          <Table.Cell>{totalWords}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <div style={style.overviewLegend}>
      * Mastered Words are words that have been translated correctly for 4 times.
    </div>
  </React.Fragment>
);

OverviewList.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  wrongAnswers: PropTypes.number.isRequired,
  masteredWords: PropTypes.number.isRequired,
  totalWords: PropTypes.number.isRequired
};

export default OverviewList;
