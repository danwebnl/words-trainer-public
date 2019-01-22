import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Segment, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import {
  PageTitle, TranslateForm, PlayOptions, Overview
} from '../index';
import { getWords } from '../../actions/wordsActions';

class PlayPage extends React.Component {
  static propTypes = {
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        foreignWord: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    getWordsAction: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  constructor() {
    super();

    this.state = {
      displayPlayOptions: true,
      displayTranslateForm: false,
      displayOverview: false,
      displayNoWordsMessage: false,
      playOption: false,
      wordsTotal: 0,
      correctAnswers: 0,
      masteredWords: 0
    };
  }

  componentDidMount() {
    const { words } = this.props;
    if (words.length === 0) {
      const { getWordsAction } = this.props;
      getWordsAction();
    } else {
      this.setState({ wordsTotal: this.props.words.length });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.words !== prevProps.words) {
      this.setState({ wordsTotal: this.props.words.length });
      if (this.props.words.length === 0) {
        // console.log('REDIRECT');
        const { history } = this.props;
        history.push('/admin');
      }
    }
  }

  optionHandler = (option) => {
    if (this.state.wordsTotal === 0) {
      // no words avaialble
      this.setState({
        displayPlayOptions: false,
        displayTranslateForm: false,
        displayOverview: false,
        displayNoWordsMessage: true
      });
      return;
    }

    this.setState({
      playOption: option,
      displayPlayOptions: false,
      displayTranslateForm: true
    });
  };

  playEndsHandler = (correctAnswers, masteredWords) => {
    this.setState({
      correctAnswers,
      masteredWords,
      displayTranslateForm: false,
      displayOverview: true
    });
  };

  playAgainHandler = () => {
    const { getWordsAction } = this.props;
    getWordsAction();

    this.setState({
      displayPlayOptions: true,
      displayOverview: false
    });
  };

  render() {
    const {
      displayPlayOptions,
      displayTranslateForm,
      playOption,
      displayOverview,
      displayNoWordsMessage,
      words
    } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Play & Learn" />

        {displayPlayOptions && <PlayOptions optionOnClick={this.optionHandler} />}

        {displayTranslateForm && (
          <TranslateForm playOption={playOption} playEndsHandler={this.playEndsHandler} />
        )}

        {displayOverview && (
          <Overview
            playAgainHandler={this.playAgainHandler}
            totalWords={this.state.wordsTotal}
            correctAnswers={this.state.correctAnswers}
            masteredWords={this.state.masteredWords}
          />
        )}

        {displayNoWordsMessage && (
          <Segment textAlign="center" style={{ marginTop: '100px' }}>
            <p>There are no words available for the quiz.</p>
            <p>
              Please start inserting a few words in the
              {' '}
              <Link to="/admin">Admin area</Link>
.
            </p>
          </Segment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  words: state.wordsReducer.words
});

const mapDispatchToProps = dispatch => ({
  getWordsAction: () => dispatch(getWords())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayPage);
