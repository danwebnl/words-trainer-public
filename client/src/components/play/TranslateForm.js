import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Header, Segment, Container, Button
} from 'semantic-ui-react';

import { TopSlider, Answer } from '../index';
import { feedbackWord } from '../../actions/wordsActions';
import style from '../style/style';

class TranslateForm extends React.Component {
  static propTypes = {
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        foreignWord: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    playOption: PropTypes.string.isRequired,
    feedbackWordAction: PropTypes.func.isRequired,
    playEndsHandler: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      showAnswer: false,
      words: [],
      wordToTranslate: null,
      translation: '',
      wordIndex: 0,
      wordToTranslateProperty: null,
      translationProperty: null,
      correctAnswers: 0,
      masteredWords: 0
    };
  }

  componentDidMount() {
    const { words, playOption } = this.props;

    if (playOption === 'fromForeignWords') {
      this.setState({
        wordToTranslateProperty: 'foreignWord',
        translationProperty: 'translation'
      });
    } else {
      this.setState({
        wordToTranslateProperty: 'translation',
        translationProperty: 'foreignWord'
      });
    }

    this.setState(prevState => ({
      words,
      wordToTranslate: words[0][prevState.wordToTranslateProperty],
      translation: words[0][prevState.translationProperty]
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    // the last word was just translated
    if (this.state.wordIndex === this.state.words.length) {
      const { playEndsHandler } = this.props;
      playEndsHandler(this.state.correctAnswers, this.state.masteredWords);
    }
  }

  showAnswerHandler = () => {
    this.setState({
      showAnswer: true
    });
  };

  feedbackHandler = (answer) => {
    const { feedbackWordAction } = this.props;
    feedbackWordAction(this.state.words[this.state.wordIndex]._id, answer);

    this.setState((prevState) => {
      const { words } = this.props;
      const oldIndex = prevState.wordIndex;
      let { masteredWords } = prevState;

      let wordToTranslate = null;
      let translation = null;
      if (oldIndex + 1 < words.length) {
        wordToTranslate = words[oldIndex + 1][prevState.wordToTranslateProperty];
        translation = words[oldIndex + 1][prevState.translationProperty];
      }

      let { correctAnswers } = prevState;
      if (answer === 'yes') {
        correctAnswers += 1;
        if (words[oldIndex].score === 3) {
          masteredWords += 1;
        }
      }

      return {
        correctAnswers,
        masteredWords,
        showAnswer: false,
        wordIndex: oldIndex + 1,
        wordToTranslate,
        translation
      };
    });
  };

  render() {
    const {
      showAnswer, wordToTranslate, translation, words, wordIndex
    } = this.state;

    return (
      <React.Fragment>
        <TopSlider maxValue={words.length} currentValue={wordIndex} />

        <Segment style={{ padding: '1em 0em' }} vertical>
          <Container text textAlign="center">
            <Header as="h2">
              Please translate
              {' '}
              <span style={style.blue}>{wordToTranslate}</span>
            </Header>
            <Button
              as="a"
              size="large"
              style={{ marginTop: '2em' }}
              onClick={this.showAnswerHandler}
            >
              Press here to show the answer
            </Button>

            {showAnswer && <Answer answer={translation} feedbackHandler={this.feedbackHandler} />}
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  words: state.wordsReducer.words
});

const mapDispatchToProps = dispatch => ({
  feedbackWordAction: (wordId, answer) => dispatch(feedbackWord(wordId, answer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslateForm);
