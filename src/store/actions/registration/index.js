import { GRAPHQL } from "../../../services/graphql";
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCES,
  REGISTRATION_FAIL
} from "../../contstants/registration";
import { registrationMutation } from "./queries";

export const registration = payload => {
  return {
    type: GRAPHQL,
    payload: {
      query: registrationMutation,
      variables: payload,
      actions: [REGISTRATION_REQUEST, REGISTRATION_SUCCES, REGISTRATION_FAIL]
    }
  };
};
