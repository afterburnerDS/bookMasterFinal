import { createStore, applyMiddleware, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { loadAuthToken } from "./local-storage";
import { loadState, saveState } from "./local-storage";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth";
import protectedDataReducer from "./reducers/protected-data";
import throttle from "lodash/throttle";
import { setAuthToken } from "./actions/auth";

const persistedState = loadState();

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    protectedData: protectedDataReducer
    // persistReducer: persistedReducer
  }),

  persistedState,

  applyMiddleware(thunk)
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
}

export default store;
