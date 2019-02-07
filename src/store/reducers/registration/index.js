import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCES,
  REGISTRATION_FAIL
} from "../../contstants/registration";

const initialState = {
  isLoading: false,
  errors: null,
  status: null
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null
      };
    case REGISTRATION_SUCCES:
      return {
        ...state,
        isLoading: false,
        status: payload.registration
      };
    case REGISTRATION_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: error
      };
    default:
      return state;
  }
};
