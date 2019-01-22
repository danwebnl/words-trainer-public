import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { WordsListItem } from '../index';

const WordsList = ({ words, deleteWordOnClick }) => (
  <Table selectable unstackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Foreign Word</Table.HeaderCell>
        <Table.HeaderCell>Translation</Table.HeaderCell>
        <Table.HeaderCell />
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {words.map((word, index) => (
        <WordsListItem
          index={index}
          word={word}
          deleteWordOnClick={deleteWordOnClick}
          key={`wordListItem${index}`}
        />
      ))}
    </Table.Body>
  </Table>
);

WordsList.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      foreignWord: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired
    })
  ),
  deleteWordOnClick: PropTypes.func.isRequired
};

WordsList.defaultProps = {
  words: []
};

export default WordsList;
