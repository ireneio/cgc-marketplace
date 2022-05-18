import {
  BASE_SIDEBAR_PATH,
  SIDEBAR_PATH_STORAGE_KEY,
} from '@/components/Layout/DefaultLayout';

interface LayoutState {
  navigation: {
    path: string;
  };
}

const initialState: LayoutState = {
  navigation: {
    path: BASE_SIDEBAR_PATH,
  },
};

type Action = {
  type: 'SET_NAVIGATION_PATH';
  payload: string;
};

export default function layoutReducer(
  state: LayoutState = initialState,
  action: Action,
) {
  switch (action.type) {
    case 'SET_NAVIGATION_PATH':
      window.localStorage.setItem(
        SIDEBAR_PATH_STORAGE_KEY,
        JSON.stringify(action.payload),
      );
      return {
        ...state,
        navigation: {
          path: action.payload,
        },
      };
    default:
      return state;
  }
}
