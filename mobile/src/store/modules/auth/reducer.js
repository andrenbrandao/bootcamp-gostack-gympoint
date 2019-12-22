import produce from 'immer';

const INITIAL_STATE = {
  signedIn: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.signedIn = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.signedIn = false;
        break;
      }
      default:
    }
  });
}
