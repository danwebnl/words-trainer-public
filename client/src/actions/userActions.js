import axios from 'axios';
import demoUser from '../utils/demoUser';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: 'FETCH_USER', payload: res.data });
};

export const fetchUserDemo = () => async (dispatch) => {
  dispatch({ type: 'FETCH_USER', payload: demoUser });
};

export default fetchUser;
