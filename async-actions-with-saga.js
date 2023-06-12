const redux = require('redux');
const createSagaMiddleware = require('redux-saga').default;
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require('axios');
const { call, put, takeEvery } = require('redux-saga/effects');

const initialState = {
  loading: false,
  users: [],
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.users,
      };
  }
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

const fetchUsers = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.data.map((user) => user.id);
    })
    .catch((error) => {
      return fetchUsersFailure(error.message);
    });
};

function* workGetUsersFetch() {
  const users = yield call(fetchUsers);
  yield put({ type: FETCH_USERS_SUCCEEDED, users });
}

function* mySaga() {
  yield takeEvery(FETCH_USERS_REQUESTED, workGetUsersFetch);
}

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
