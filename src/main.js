import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSocketIOExt from "vue-socket.io-extended";
import { io } from "socket.io-client";

/**
 * Also possible:
 * 
 * 
//const options = {};
createApp(App).use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000', options),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })).use(store).use(router).mount("#app");

  or 

  .use(
    new VueSocketIO({
      debug: true,
      connection: "http://localhost:3000",
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
      options: {}, //Optional options
    })
  )
* 
 */
const socket = io("http://localhost:3000");

createApp(App)
  .use(VueSocketIOExt, socket, {
    store, // vuex store instance
    actionPrefix: "SOCKET_", // keep prefix in uppercase
    eventToActionTransformer: (actionName) => actionName, // cancel camel case
  })
  .use(store)
  .use(router)
  .mount("#app");
