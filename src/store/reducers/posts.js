export default function posts(state = [], action) {
    switch (action.type) {
      case "ADD_POSTS":
        return {...state, posts: action.payload.posts };        
      default:
        return state;
    }
  }