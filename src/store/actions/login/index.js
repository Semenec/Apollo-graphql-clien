import { GRAPHQL } from '../../../services/graphql';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCES,
  LOGIN_FAIL
} from '../../contstants/login';
import { loginMutation } from './queries';

export const login = (payload) => {
  return {
    type: GRAPHQL,
    payload: {
      query: loginMutation,
      variables: payload,
      actions: [LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL]
    }
  }
}