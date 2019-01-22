import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import style from '../style/style';

const WordsListItem = ({ index, word, deleteWordOnClick }) => (
  <Table.Row>
    <Table.Cell>{index + 1}</Table.Cell>
    <Table.Cell>{word.foreignWord}</Table.Cell>
    <Table.Cell>{word.translation}</Table.Cell>
    <Table.Cell>
      <Link to={`/admin/word/${word._id}`}>
        <Icon link name="edit" />
      </Link>
    </Table.Cell>
    <Table.Cell>
      <Icon
        link
        name="trash alternate outline"
        style={style.linka}
        onClick={() => deleteWordOnClick(word._id, word.foreignWord)}
      />
    </Table.Cell>
  </Table.Row>
);

WordsListItem.propTypes = {
  index: PropTypes.number.isRequired,
  word: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    foreignWord: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired
  }).isRequired,
  deleteWordOnClick: PropTypes.func.isRequired
};

export default WordsListItem;
