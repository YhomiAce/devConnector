import * as actionTypes from "../actions/type";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const ProfileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
