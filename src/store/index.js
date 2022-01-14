import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    usrname: "utypednothing",
    connected: false,
  },
  mutations: {
    login(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    changeUsrname(state, usrname) {
      state.usrname = usrname;
    },
    isConnected(state, connected) {
      state.connected = connected;
    },
  },
  actions: {},
  modules: {},
});
