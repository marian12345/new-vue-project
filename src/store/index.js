import { createStore } from "vuex";

export default createStore({
  state: {
    loggedIn: false,
    usrname: "utypednothing"
  },
  mutations: {
    login(state, loggedIn){
      state.loggedIn = loggedIn;
    },
    changeUsrname(state, usrname){
      state.usrname = usrname;
    },
  },
  actions: {},
  modules: {},
});
