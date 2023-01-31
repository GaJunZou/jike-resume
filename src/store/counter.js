const initState = {
  name: "wyc",
  age: 20,
  gender: "man",
  info: {
    nickName: "yiccc",
    signature: "搬砖搬砖搬搬砖",
  },
};
export default function userReducer(state = initState, action) {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
