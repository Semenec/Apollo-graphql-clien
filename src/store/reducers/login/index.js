import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAIL
} from '../../contstants/login'

const initialState = {
  isLoading: false,
  errors: null,
  user: {
    message: null
  }
}

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null
      }
    case LOGIN_SUCCES:
      return {
        ...state,
        isLoading: false,
        user: payload.login
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: error
      }
    default:
      return state
  }
}