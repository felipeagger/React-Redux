import { push } from "connected-react-router";

export const dataSave = (posts) => dispatch => ({
  
  type: "ADD_POSTS",
  payload: { posts }

});
