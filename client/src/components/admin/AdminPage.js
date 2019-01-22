import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Segment } from 'semantic-ui-react';

import { getWords, removeWord, hideToast } from '../../actions/wordsActions';
import toastsUtil from '../../utils/toasts';
import {
  ButtonActionHeader, PageTitle, AdminSearchBar, WordsList, ModalContainer
} from '../index';

class AdminPage extends React.Component {
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
    getWordsAction: PropTypes.func.isRequired,
    removeWordAction: PropTypes.func.isRequired,
    hideToastAction: PropTypes.func.isRequired
  };

  static defaultProps = {
    words: [],
    toast: null
  };

  constructor(props) {
    super(props);

    this.state = {
      modalDeleteState: false,
      modalHeaderText: null,
      deleteWordId: null,
      wordsList: this.props.words,
      searchValue: ''
    };
  }

  componentDidMount() {
    if (this.state.wordsList.length === 0) {
      const { getWordsAction } = this.props;
      getWordsAction();
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

  deleteWordOnClick = (wordId, foreignWord) => {
    this.setState({ modalHeaderText: foreignWord, deleteWordId: wordId });
    this.toggleModalDelete();
  };

  toggleModalDelete = () => {
    this.setState((prevState) => {
      const newState = !prevState.modalDeleteState;
      return {
        modalDeleteState: newState
      };
    });
  };

  deleteWordHandler = () => {
    const { removeWordAction } = this.props;
    removeWordAction(this.state.deleteWordId);

    this.setState({
      modalDeleteState: false,
      deleteWordId: null,
      modalHeaderText: null
    });
  };

  filterList = (event) => {
    this.setState({
      searchValue: event.target.value
    });

    let updatedList = this.props.words;

    updatedList = updatedList.filter(
      item => item.foreignWord
        .toString()
        .toLowerCase()
        .search(event.target.value.toString().toLowerCase()) !== -1
        || item.translation
          .toString()
          .toLowerCase()
          .search(event.target.value.toString().toLowerCase()) !== -1
    );

    this.setState({
      wordsList: updatedList
    });
  };

  cancelSearch = () => {
    this.setState({
      wordsList: this.props.words,
      searchValue: ''
    });
  };

  render() {
    const { modalDeleteState, modalHeaderText, wordsList } = this.state;

    return (
      <React.Fragment>
        <PageTitle title="Admin Words List" />

        <ButtonActionHeader text="New Word" to="/admin/word" icon="plus" />

        {wordsList.length > 0 && (
          <AdminSearchBar
            filterList={this.filterList}
            cancelSearch={this.cancelSearch}
            searchValue={this.state.searchValue}
          />
        )}

        {wordsList.length > 0 && (
          <WordsList words={wordsList} deleteWordOnClick={this.deleteWordOnClick} />
        )}

        {wordsList.length === 0 && (
          <Segment>Please add a few words to kick off the learning process.</Segment>
        )}

        <ModalContainer
          modalDeleteState={modalDeleteState}
          onClose={this.toggleModalDelete}
          modalHeaderText={modalHeaderText}
          confirm={this.deleteWordHandler}
        />

        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  words: state.wordsReducer.words,
  toast: state.toastsReducer
});

const mapDispatchToProps = dispatch => ({
  getWordsAction: () => dispatch(getWords()),
  removeWordAction: wordId => dispatch(removeWord(wordId)),
  hideToastAction: () => dispatch(hideToast())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
