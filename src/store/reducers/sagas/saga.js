import {
  GRAPHQL,
  REQUEST_EFFECT,
  SUCCESS_EFFECT,
  FAIL_EFFECT,
  client
} from "../../../services/graphql";
import { delay } from "redux-saga";
import { actionChannel, call, takeEvery, put } from "redux-saga/effects";

const RETRY_LIMIT = 1;

export function* watchGraphql({ payload, meta }) {
  if (!meta)
    meta = {
      retry: 0,
      isLoading: true
    };

  let successAction = payload.requestAction + SUCCESS_EFFECT;
  let failedAction = payload.requestAction + FAIL_EFFECT;
  let requestAction = payload.requestAction + REQUEST_EFFECT;

  if (!!payload.actions) {
    successAction = payload.actions[1];
    failedAction = payload.actions[2];
    requestAction = payload.actions[0];
  }

  try {
    yield put({
      type: requestAction,
      payload: payload,
      meta: { ...meta }
    });

    let response = yield call([requestAction, executeRequest], payload, meta);

    meta.isLoading = false;

    yield put({
      type: successAction,
      payload: {
        ...payload,
        ...response.data
      },
      meta: { ...meta }
    });
  } catch (error) {
    if (meta.retry >= RETRY_LIMIT) {
      meta.isLoading = false;

      yield put({
        type: failedAction,
        payload: {},
        meta: { ...meta },
        error: meta.isLoading ? null : error
      });
    }
    console.log("ERROR", error);
    if (meta.retry < RETRY_LIMIT) {
      yield call(delay, 400 * (meta.retry + 1));
      yield put({
        type: GRAPHQL,
        payload: payload,
        meta: {
          ...meta,
          retry: meta.retry + 1
        }
      });
    }
  }
}

//move to service
export function executeRequest(payload, meta) {
  let operation = null;

  if (payload.query.definitions[0].operation === "mutation") {
    operation = client.mutate({
      mutation: payload.query,
      variables: payload.variables
    });
  } else
    operation = client.query({
      query: payload.query,
      variables: payload.variables
    });

  return operation;
}

export default function*() {
  const requestChan = yield actionChannel(GRAPHQL);
  yield takeEvery(requestChan, watchGraphql);
}
