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
    case actionTypes.UPDATE_PROFILE:
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
    case actionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case actionTypes.GET_GITHUB:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
