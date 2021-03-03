import * as types from "./mutations-types";

export default {
  setToken(context, payload) {
    return new Promise((resolve, reject) => {
      if(payload && payload.token && payload.uName) {
        resolve();
        context.commit(types.SET_TOKEN, payload);
      } else {
        reject();
      }
    })
  },
  signOut(context, payload) {
    context.commit(types.DEL_TOKEN, payload);
  }
}