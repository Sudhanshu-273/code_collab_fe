import useApiURL from "./hooks/useApiURL";

export const ROLES = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

// export const API_URL = 'http://localhost:3000/';
// export const API_URL = useApiURL('https://codebuddy-backend.onrender.com/');
export const API_URL = useApiURL('http://localhost:3000');
export const LOGIN_URL = 'auth';
export const REGISTER_URL = 'register';
export const LOGOUT_URL = 'logout';
export const RUNCODE_URL = 'api/v1/run';
export const ALL_CONTEST_URL = 'api/v1/contest-watcher';
export const SAVE_SNIPPET_URL = 'api/v1/snippet/save-snippet';
export const ALL_PUBLIC_SNIPPETS = 'api/v1/snippet';
export const FEEDBACK_API = 'api/v1/feedback';
export const RANDOM_NAME = 'api/v1/get-random-name';
export const GET_ROOM_USERS = 'api/v1/room';
export const GET_PROBLEM_SET = 'api/v1/problem';

export const ACTIONS = {
  JOIN: 'join',
  JOINED: 'joined',
  DISCONNECTED: 'disconnected',
  CODE_CHANGE: 'code-change',
  SYNC_CODE: 'sync-code',
  LEAVE: 'leave',
};

export const codeCollabImage = "client/public/assets/images/codeCollabLogo_No_Bg.png"