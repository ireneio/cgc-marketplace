interface UserInfoRole {
  createdAt: string;
  id: number;
  roleDescription: string;
  roleName: string;
  updatedAt: string;
}

interface UserState {
  walletInfo: {
    connected: boolean;
    address: string;
  };
  userInfo: {
    name: string;
    email: string;
    id: number;
    token: string;
    updatedAt: string;
    createdAt: string;
  };
  hiddenUserInfo: {
    email: string;
    id: number;
    isActive: boolean;
    needChangePassword: boolean;
    organization: {
      createdAt: string;
      updatedAt: string;
      id: number;
      isActive: boolean;
      name: string;
      type: number;
    };
    roles: UserInfoRole[];
    token: string;
    username: string;
  };
}

const initialState: UserState = {
  walletInfo: {
    connected: false,
    address: '',
  },
  userInfo: {
    name: '',
    email: '',
    id: 0,
    token: '',
    updatedAt: '',
    createdAt: '',
  },
  hiddenUserInfo: {
    email: '',
    id: 0,
    isActive: true,
    needChangePassword: false,
    organization: {
      createdAt: '',
      updatedAt: '',
      id: 0,
      isActive: true,
      name: '',
      type: 1,
    },
    roles: [],
    token: '',
    username: '',
  },
};

type Action =
  | {
      type: 'SET_WALLET_INFO';
      payload: { connected: boolean; address: string };
    }
  | {
      type: 'SET_USER_INFO';
      payload: {
        name: string;
        email: string;
        id: number;
        token: string;
        updatedAt: string;
        createdAt: string;
      };
    }
  | {
      type: 'SET_HIDDEN_USER_INFO';
      payload: {
        email: string;
        id: number;
        isActive: boolean;
        needChangePassword: boolean;
        organization: {
          createdAt: string;
          updatedAt: string;
          id: number;
          isActive: boolean;
          name: string;
          type: number;
        };
        roles: UserInfoRole[];
        token: string;
        username: string;
      };
    }
  | {
      type: 'SET_USER_EMAIL';
      payload: string;
    };

export default function userReducer(
  state: UserState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'SET_WALLET_INFO':
      return {
        ...state,
        walletInfo: {
          connected: action.payload.connected,
          address: action.payload.address,
        },
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
    case 'SET_HIDDEN_USER_INFO':
      const {
        email,
        id,
        isActive,
        needChangePassword,
        organization,
        roles,
        token,
        username,
      } = action.payload;
      return {
        ...state,
        hiddenUserInfo: {
          email,
          id,
          isActive: true,
          needChangePassword: false,
          organization,
          roles,
          token,
          username,
        },
      };
    default:
      return state;
  }
}
