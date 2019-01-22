import React from 'react';
import PropTypes from 'prop-types';
import { Table, Label } from 'semantic-ui-react';
import style from '../style/style';

const ArchiveListItem = ({ index, word, activateWordHandler }) => (
  <Table.Row>
    <Table.Cell>{index + 1}</Table.Cell>
    <Table.Cell>{word.foreignWord}</Table.Cell>
    <Table.Cell>{word.translation}</Table.Cell>
    <Table.Cell>
      <Label as="a" onClick={() => activateWordHandler(word._id)}>
        Activate
      </Label>
    </Table.Cell>
  </Table.Row>
);

ArchiveListItem.propTypes = {
  index: PropTypes.number.isRequired,
  word: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    foreignWord: PropTypes.string.isRequired,
    translation: PropTypes.string.isRequired
  }).isRequired,
  activateWordHandler: PropTypes.func.isRequired
};

export default ArchiveListItem;
