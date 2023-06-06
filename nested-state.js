const redux = require('redux');
const produce = require('immer').produce;

const initialState = {
  name: 'Jay',
  address: {
    street: '123 Main st',
    city: 'Ahmedabad',
    state: 'Gujarat',
  },
};

const STREET_UPDATED = 'STREET_UPDATED';

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });

    default:
      return state;
  }
};

const store = redux.createStore(reducer);
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(() => {
  console.log('Updated state', store.getState());
});

store.dispatch(updateStreet('789 Main st'));
