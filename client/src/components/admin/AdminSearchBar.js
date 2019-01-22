import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Input, Icon } from 'semantic-ui-react';

import style from '../style/style';

const AdminSearchBar = ({ filterList, cancelSearch, searchValue }) => (
  <Grid columns={1}>
    <Grid.Column mobile={16} tablet={8} computer={4}>
      <Input
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="Quick Search..."
        // icon="search"
        icon={
          searchValue !== '' ? (
            <Icon name="trash" onClick={cancelSearch} link />
          ) : (
            <Icon name="search" />
          )
        }
        onChange={filterList}
        style={style.maxWidth}
        value={searchValue}
      />
    </Grid.Column>
  </Grid>
);

AdminSearchBar.propTypes = {
  filterList: PropTypes.func.isRequired,
  cancelSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired
};

export default AdminSearchBar;
