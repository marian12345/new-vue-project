<template>
  <transition name="fade">
    <div v-if="getStateData.isLoggedIn">
      <h1>Hello {{ getStateData.usrname }}</h1>
      <ul id="chatlist">
        <li v-for="message in messages" v-bind:key="message">
          {{ message.user }}: {{ message.text }}
        </li>
      </ul>
      <input
        v-model="msg"
        placeholder="Nachricht"
        v-on:keydown.enter="sendMsg"
      />
      <button @click="sendMsg">Abschicken</button>
    </div>
  </transition>
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
      console.log("socket connected");
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
      this.messages.push({
        text: data.msg.toString(),
        user: data.usrname,
      });
    },
  },
  computed: {
    getStateData() {
      return {
        isLoggedIn: this.$store.state.loggedIn,
        usrname: this.$store.state.usrname,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  text-align: left;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
