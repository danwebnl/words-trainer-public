import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';
import style from '../style/style';

const PageTitle = ({ title }) => (
  <Header as="h1" content={title} style={style.h1} textAlign="center" />
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitle;
