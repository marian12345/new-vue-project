<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ChatConsole />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ChatConsole from "@/components/ChatConsole.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    ChatConsole
  },
  methods:{
    speak(){
      console.log("I said hi!");
    }
  }
};
</script>
