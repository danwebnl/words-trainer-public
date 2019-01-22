import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default () => (
  <React.Fragment>
    <Menu.Item as={Link} to="/">
      Play
    </Menu.Item>

    <Menu.Item as={Link} to="/admin">
      Admin
    </Menu.Item>

    <Menu.Item as={Link} to="/archive">
      Archive
    </Menu.Item>

    <Menu.Item as={Link} to="/tech">
      Tech
    </Menu.Item>
  </React.Fragment>
);
