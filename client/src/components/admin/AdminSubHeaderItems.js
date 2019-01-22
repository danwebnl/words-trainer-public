import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Responsive } from 'semantic-ui-react';

import { ButtonActionHeader, AdminSearchBar } from '../index';

const SubHeaderItems = (filterList, cancelSearch, searchValue) => (
  <Grid container stackable verticalAlign="middle" columns={16}>
    <Grid.Row reversed="computer">
      <Grid.Column textAlign="right" mobile={16} tablet={8} computer={4}>
        <ButtonActionHeader text="New Word" to="/admin/word" icon="plus" />
      </Grid.Column>
      <Responsive {...Responsive.onlyComputer} as={React.Fragment}>
        <Grid.Column computer={8} />
      </Responsive>
      <Grid.Column textAlign="left" mobile={16} tablet={8} computer={4}>
        <AdminSearchBar
          filterList={filterList}
          cancelSearch={cancelSearch}
          searchValue={searchValue}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default SubHeaderItems;
