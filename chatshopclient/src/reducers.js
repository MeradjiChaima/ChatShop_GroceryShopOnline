// reducers.js
const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
