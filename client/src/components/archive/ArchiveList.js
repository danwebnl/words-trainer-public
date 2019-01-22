import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { ArchiveListItem } from '../index';

const ArchiveList = ({ words, activateWordHandler }) => (
  <Table selectable unstackable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Foreign Word</Table.HeaderCell>
        <Table.HeaderCell>Translation</Table.HeaderCell>
        <Table.HeaderCell />
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {words.map((word, index) => (
        <ArchiveListItem
          index={index}
          word={word}
          key={`ArchiveListItem${index}`}
          activateWordHandler={activateWordHandler}
        />
      ))}
    </Table.Body>
  </Table>
);

ArchiveList.propTypes = {
  words: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      foreignWord: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired
    })
  ),
  activateWordHandler: PropTypes.func.isRequired
};

ArchiveList.defaultProps = {
  words: []
};

export default ArchiveList;
