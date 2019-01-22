import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Menu, Container, Image, Icon, Responsive, Sidebar
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import MainMenuList from './MainMenuList';

const fixedMenuStyle = {
  backgroundColor: '#0288D1',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
};

const sideBarStyle = {
  backgroundColor: '#0288D1',
  fontSize: '27px'
};

class PageHeader extends React.Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        _id: PropTypes.string,
        googleId: PropTypes.string
      })
    ])
  };

  static defaultProps = {
    user: null
  };

  state = { visible: false };

  handleButtonClick = () => this.setState(prevState => ({ visible: !prevState.visible }));

  handleSidebarHide = () => this.setState({ visible: false });

  renderUserMenu() {
    switch (this.props.user) {
      case null:
        return null;
      case false:
        return (
          <Menu.Item position="right" as="a" href="/auth/google">
            Login
          </Menu.Item>
        );
      default:
        return (
          <div className="right menu">
            <Menu.Item>{this.props.user.userFirstName}</Menu.Item>
            <Menu.Item as="a" href="/api/logout">
              Logout
            </Menu.Item>
          </div>
        );
    }
  }

  // handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Menu style={fixedMenuStyle}>
          <Container>
            <Responsive {...Responsive.onlyMobile} as={Menu.Item}>
              <Icon name="sidebar" onClick={this.handleButtonClick} />
            </Responsive>

            <Menu.Item>
              <Image as={Link} to="/" src="./images/words-trainer-logo.png" size="small" />
            </Menu.Item>

            <Responsive {...Responsive.onlyComputer} as={React.Fragment}>
              <MainMenuList />
            </Responsive>

            {this.renderUserMenu()}
          </Container>
        </Menu>

        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={visible}
          width="wide"
          direction="left"
          onClick={this.handleButtonClick}
          style={sideBarStyle}
        >
          <MainMenuList />
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

export default connect(mapStateToProps)(PageHeader);
