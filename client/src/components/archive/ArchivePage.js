import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header, Segment } from 'semantic-ui-react';
import style from '../style/style';

import {
  getArchive, activateWord, hideToast, getWords
} from '../../actions/wordsActions';
import toastsUtil from '../../utils/toasts';
import { PageTitle, ArchiveList } from '../index';

class ArchivePage extends React.Component {
  static propTypes = {
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        foreignWord: PropTypes.string.isRequired,
        translation: PropTypes.string.isRequired
      }).isRequired
    ),
    toast: PropTypes.shape({
      toastType: PropTypes.string,
      message: PropTypes.string
    }),
    getArchiveAction: PropTypes.func.isRequired,
    getActivateAction: PropTypes.func.isRequired,
    hideToastAction: PropTypes.func.isRequired,
    getWordsAction: PropTypes.func.isRequired
  };

  static defaultProps = {
    words: [],
    toast: null
  };

  constructor(props) {
    super(props);

    this.state = {
      wordsList: this.props.words
    };
  }

  componentDidMount() {
    if (this.state.wordsList.length === 0) {
      const { getArchiveAction } = this.props;
      getArchiveAction();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.words !== prevProps.words) {
      this.setState({ wordsList: this.props.words });
    }

    const { toast: toastObject, hideToastAction } = this.props;
    if (toastObject.toastType) {
      toast(toastObject.toastMessage, {
        type: toastObject.toastType,
        autoClose: toastsUtil.toastTimeLength
      });
      hideToastAction();
    }
  }

  activateWordHandler = (wordId) => {
    const { getActivateAction } = this.props;
    getActivateAction(wordId);

    // update the list of active words as well
    const { getWordsAction } = this.props;
    getWordsAction();
  };

  render() {
    const { wordsList } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Archive Words List" />

        <Header as="h4" style={style.h4} textAlign="center">
          Words that are guessed corectly for 4 times are considered to have been learned
        </Header>

        {wordsList.length > 0 && (
          <ArchiveList words={wordsList} activateWordHandler={this.activateWordHandler} />
        )}

        {wordsList.length === 0 && (
          <Segment textAlign="center">There are no words available for this list.</Segment>
        )}
        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  words: state.archiveReducer.wordsArchive,
  toast: state.toastsReducer
});

const mapDispatchToProps = dispatch => ({
  getArchiveAction: () => dispatch(getArchive()),
  getActivateAction: wordId => dispatch(activateWord(wordId)),
  hideToastAction: () => dispatch(hideToast()),
  getWordsAction: () => dispatch(getWords())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivePage);
