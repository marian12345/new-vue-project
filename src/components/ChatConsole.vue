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
      messages: [
        { text: "Foo", user: "Greg" },
        { text: "Bar", user: "Karl" },
      ],
    };
  },
  methods: {
    sendMsg() {
      this.messages.push({
        text: this.msg.toString(),
        user: this.$store.state.usrname,
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
