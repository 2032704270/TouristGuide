export default {
  userData(state, payload) {
    if(payload) {
      sessionStorage.setItem('##$$%%', JSON.stringify(payload))
      let sbsd = JSON.parse(sessionStorage.getItem('##$$%%'))
      state.token = sbsd.token
      state.uName = sbsd.uName
    }
  }
}