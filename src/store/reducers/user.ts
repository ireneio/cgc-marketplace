interface UserState {
  userInfo: Record<string, any>;
}

const initialState: UserState = {
  userInfo: {
    expired_at: '',
    id: 0,
    access_token: '',
    token_type: '',
  },
};

type Action =
  | {
      type: 'SET_USER_INFO';
      payload: Record<string, any>;
    }
  | {
      type: 'SET_USER_EMAIL';
      payload: string;
    }
  | {
      type: 'INIT_USER_INFO';
    };

export default function userReducer(
  state: UserState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'INIT_USER_INFO':
      const _auth = window.localStorage.getItem('auth');
      if (_auth) {
        return {
          ...state,
          userInfo: JSON.parse(_auth),
        };
      }
      return {
        ...state,
      };
    case 'SET_USER_INFO':
      localStorage.setItem('info', JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: { ...action.payload },
      };
    case 'SET_USER_EMAIL':
      localStorage.setItem('email', JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: { ...state.userInfo, email: action.payload },
      };
    default:
      return state;
  }
}
