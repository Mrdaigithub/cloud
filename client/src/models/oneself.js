import * as oneselfService from '../services/oneself';

export default {
  namespace: 'oneself',
  state: {
    assessToken: '',
  },
  reducers: {
    save(state, { payload: { assessToken } }) {
      return { ...state, assessToken };
    },
  },
  effects: {
    * login({ payload: username, password }, { call, put }) {
      const { access_token } = (yield call(oneselfService.login, username, password)).data;
      yield put({
        type: 'save',
        payload: { assessToken: access_token },
      });
    },
  },
  subscriptions: {},
};
