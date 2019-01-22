import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Container } from 'semantic-ui-react';

import { ButtonActionHeader, PageTitle, WordForm } from '..';
import { editWord } from '../../actions/wordsActions';

class EditWordPage extends React.Component {
  static propTypes = {
    editWordAction: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    word: PropTypes.shape({
      _id: PropTypes.string,
      foreignWord: PropTypes.string,
      translation: PropTypes.string
    })
  };

  static defaultProps = {
    word: {
      _id: null,
      foreignWord: null,
      translation: null
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { history } = this.props;
    history.push('/admin');
  }

  submitEditWord = (word) => {
    const { editWordAction } = this.props;
    editWordAction(word);
  };

  render() {
    const { word, match } = this.props;
    return (
      <React.Fragment>
        <PageTitle title="Edit Word" />
        <ButtonActionHeader text="Words List" to="/admin" icon="arrow left" />
        <Container text>
          <WordForm
            onSubmit={updatedWord => this.submitEditWord(updatedWord)}
            wordId={match.params.id}
            word={word}
          />
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ wordsReducer }, { match }) => ({
  word: wordsReducer.words.find(word => word._id === match.params.id)
});

const mapDispatchToProps = dispatch => ({
  editWordAction: word => dispatch(editWord(word))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWordPage);
