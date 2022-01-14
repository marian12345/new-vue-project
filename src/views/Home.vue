<template>
  <NoConnection />
  <div
    class="
      home
      grid grid-cols-1
      lg:grid-cols-3
      mx-1
      lg:mx-0
      justify-center
      font-mono
      items-center
    "
  >
    <HelloWorld />
    <ChatConsole />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import ChatConsole from "@/components/ChatConsole.vue";
import NoConnection from "@/components/NoConnection.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    ChatConsole,
    NoConnection,
  },
};
</script>
