import produce from 'immer';

const INITIAL_STATE = {
  posts: null,
};

export default function posts(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "@posts/ADD_POSTS_SUCCESS": {
        draft.posts = action.payload.posts;
        break;
      }
      default:
    }
  })
}
