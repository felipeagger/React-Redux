export function addPostRequest(posts) {
  return {
    type: '@posts/ADD_POSTS_REQUEST',
    payload: { posts },
  };
}

export function addPostSuccess(posts) {
  return {
    type: '@posts/ADD_POSTS_SUCCESS',
    payload: { posts },
  };
}

export function addPostFailure() {
  return {
    type: '@posts/ADD_POSTS_FAILURE',
  };
}
