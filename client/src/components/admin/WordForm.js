import React from 'react';
import PropTypes from 'prop-types';
import { withFormik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const WordForm = ({
  values, errors, touched, isSubmitting, handleSubmit
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>Foreign Word</label>
      <Field type="text" name="foreignWord" placeholder="Foreign Word" />
      {touched.foreignWord && errors.foreignWord && <Label pointing>{errors.foreignWord}</Label>}
    </Form.Field>

    <Form.Field>
      <label>Translation</label>
      <Field type="text" name="translation" placeholder="Translation" />
      {touched.translation && errors.translation && <Label pointing>{errors.translation}</Label>}
    </Form.Field>

    <Button type="submit" primary disabled={isSubmitting}>
      Submit
    </Button>

    <Button as={Link} to="/admin">
      Cancel
    </Button>
  </Form>
);
WordForm.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.shape({
    foreignWord: PropTypes.string,
    translation: PropTypes.string,
    onSubmit: PropTypes.func
  }).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

withFormik.propTypes = {
  onSubmit: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired
};

WordForm.defaultProps = {};

export default withFormik({
  mapPropsToValues({ word, onSubmit }) {
    return {
      _id: (word && word._id) || '',
      foreignWord: (word && word.foreignWord) || '',
      translation: (word && word.translation) || '',
      onSubmit
    };
  },
  validationSchema: Yup.object().shape({
    foreignWord: Yup.string()
      .required('The Foreign Word is required')
      .min(2, 'The Foreign Word must be at least 2 characters')
      .max(40, 'The Foreign Word can be maximum 40 characters'),
    translation: Yup.string()
      .required('The Translation is required')
      .min(2, 'The Translation must be at least 2 characters')
      .max(40, 'The Translation can be maximum 40 characters')
  }),
  handleSubmit(values, { setSubmitting }) {
    setSubmitting(true);
    values.onSubmit({
      wordId: values._id,
      foreignWord: values.foreignWord,
      translation: values.translation
    });
  }
})(WordForm);
