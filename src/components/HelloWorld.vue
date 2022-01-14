<template>
  <form
    v-if="!isLoggedIn && isConnected"
    class="
      col-span-1
      lg:col-start-2
      bg-white
      shadow-xl
      rounded
      px-8
      pt-6
      pb-6
      my-14
    "
  >
    <div class="w-full flex justify-center mb-8">
      <img alt="Vue logo" src="../assets/images/chat-app-logo.png" />
    </div>
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-bold mb-2 px-1 text-left"
        for="username"
        >Username</label
      >
      <input
        class="
          shadow
          appearance-none
          border
          rounded
          w-full
          py-2
          px-3
          text-gray-700
          leading-tight
          focus:outline-none focus:shadow-outline
        "
        id="username"
        type="text"
        v-model="usrname"
        placeholder="Username"
        v-on:keydown.enter="checkUsrname"
      />
    </div>
    <div class="flex px-3 py-2 justify-end">
      <button class="btn btn-blue" @click="checkUsrname">join chat</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "HelloWorld",
  sockets: {
    connect: function () {
      //console.log("socket connected");
    },
  },
  data() {
    return {
      usrname: "",
    };
  },
  methods: {
    checkUsrname() {
      // check usrname
      if (this.usrname.trim() !== "") {
        // store usrname
        this.$store.commit("changeUsrname", this.usrname);
        //login at server
        this.$socket.client.emit("add_user", this.usrname);
        // login
        this.$store.commit("login", true);
      }
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.loggedIn;
    },
    isConnected() {
      return this.$store.state.connected;
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
