import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { createStore } from 'redux';
import rootReducer from './reducers';

// const store = createStore(rootReducer);
// type RootState = ReturnType<typeof store.getState>;
// type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import layoutReducer from './reducers/layout';
import cartReducer from './reducers/cart';
// import collectionReducer from './reducers/collection';

const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
    cart: cartReducer,
    // collection: collectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
