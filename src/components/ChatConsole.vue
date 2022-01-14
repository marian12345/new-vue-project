<template>
  <div
    v-if="getStateData.isLoggedIn && getStateData.connected"
    class="col-span-full lg:col-span-1 lg:col-start-2 min-h-screen"
  >
    <div class="text-6xl my-14 px-4 py-2 w-full">
      <h1>Hi {{ getStateData.usrname }}</h1>
    </div>

    <div class="bg-white shadow-xl overflow-hidden rounded mb-4 mt-4">
      <ul id="chatlist" class="h-96 overflow-y-scroll">
        <li
          v-for="message in messages"
          v-bind:key="message"
          class="px-4 py-2 break-words"
          :class="message.user == 'Me' ? 'text-right' : 'text-left'"
        >
          {{ message.user }}: {{ message.text }}
        </li>
      </ul>
      <form class="w-full">
        <div class="flex items-center border-b border-t border-teal-700 py-2">
          <input
            type="text"
            class="
              appearance-none
              bg-transparent
              border-none
              w-full
              text-gray-700
              mr-3
              py-1
              px-2
              leading-tight
              focus:outline-none
            "
            placeholder="Message"
            aria-label="Your Message"
            v-on:keydown.enter.prevent="sendMsg"
            v-model="msg"
          />
          <button
            class="
              flex-shrink-0
              btn btn-blue
              border-none
              text-sm
              py-1
              px-2
              mx-2
            "
            type="button"
            @click="sendMsg"
          >
            send
          </button>
        </div>
      </form>
    </div>
    <div class="flex justify-start px-3 py-2">
      <button class="btn btn-blue" @click="logout">back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatConsole",
  data() {
    return {
      msg: "",
      messages: [],
      servername: "Server",
    };
  },
  sockets: {
    connect: function () {
      //console.log("socket connected");
    },
    add_user: function () {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    login: function () {
      this.addChatMessage({
        msg: "Willkomen beim Chat!",
        usrname: this.servername,
      });
    },
    user_joined: function (data) {
      this.addChatMessage({
        msg: data + " joined",
        usrname: this.servername,
      });
    },
    user_left: function (data) {
      this.addChatMessage({ msg: data + " left", usrname: this.servername });
    },
    new_message: function (data) {
      this.addChatMessage({ msg: data.message, usrname: data.username });
    },
  },
  methods: {
    sendMsg() {
      // Nachricht aus Eingabefeld holen (ohne Leerzeichen am Anfang oder Ende).
      let message = this.msg.toString().trim();

      // Prüfen, ob die Nachricht nicht leer ist und wir verbunden sind.
      if (message && this.$store.state.loggedIn) {
        // add locally
        this.addChatMessage({
          msg: this.msg.toString(),
          usrname: this.$store.state.usrname,
        });

        // send msg
        this.$socket.client.emit("new_message", this.msg.toString());

        //clear input field
        this.msg = "";
      }
    },
    addChatMessage(data) {
      if (data.usrname == this.$store.state.usrname) {
        data.usrname = "Me";
      }
      this.messages.push({
        text: data.msg.toString(),
        user: data.usrname,
      });
    },
    logout() {
      this.$store.commit("changeUsrname", "unregistered");

      this.$store.commit("login", false);
    },
  },
  computed: {
    getStateData() {
      return {
        isLoggedIn: this.$store.state.loggedIn,
        usrname: this.$store.state.usrname,
        connected: this.$store.state.connected,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
