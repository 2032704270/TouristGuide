import * as types from "./mutations-types";

export default {
  [types.SET_TOKEN](state, payload) {
    sessionStorage.setItem('token', JSON.stringify(payload));
    state.token = payload.token;
    state.uName = payload.uName;
  },
  [types.DEL_TOKEN](state) {
    sessionStorage.removeItem('token')
    state.token = "";
    state.uName = "";
  }
}