## Redux

Store: Holds the state of your application - Shop

Action: Describes the changes in state of the application - Cake ordered 

Reducer: Ties the store and actions together, State transition depending on the action - Shopkeeper

---

### Redux Principles:
1. The global state of your application is stored as an object inside a single store.
2. The only way to change the state is to dispatch an action, an object that describes what happened.
3. To specify how the state tree is updated based on actions, you write pure reducers.

---

- Action: It is an object with type property. 

- Reducers: It accepts state and actions as argument and returns the next state of application. (prevState, action) => new State

---

### Redux store responsibilities:
- Holds application state
- Allow access to state via getState()
- Allow state to be updated via dispatch(action)
- Registers listeners via subscribe(listener)
- Handles unregistering of listeners via the function returned by subscribe(listener) 
