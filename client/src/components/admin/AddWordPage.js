import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Container } from 'semantic-ui-react';

import { ButtonActionHeader, PageTitle, WordForm } from '..';
import { addWord } from '../../actions/wordsActions';

class WordPage extends React.Component {
  static propTypes = {
    addWordAction: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { history } = this.props;
    history.push('/admin');
  }

  submitAddWord = (word) => {
    const { addWordAction } = this.props;
    addWordAction(word);
  };

  render() {
    return (
      <React.Fragment>
        <PageTitle title="Add New Word" />
        <ButtonActionHeader text="Words List" to="/admin" icon="arrow left" />
        <Container text>
          <WordForm onSubmit={word => this.submitAddWord(word)} />
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  words: state.wordsReducer.words
});

const mapDispatchToProps = dispatch => ({
  addWordAction: word => dispatch(addWord(word))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordPage);
