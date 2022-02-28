<template>
  <div
    v-if="!isConnected"
    class="bg-gray-600 h-screen grid grid-rows-2 font-mono overflow-y-hidden"
  >
    <div class="row-span-1 grid items-end justify-items-center p-1 pt-8">
      <img
        src="../assets/images/loading.gif"
        alt="loading gif"
        width="480"
        height="270"
        class="object-scale-down max-h-half-screen"
      />
    </div>
    <div class="row-span-1 row-start-2 p-2 grid items-center">
      <p class="fg-color font-medium text-4xl">Connecting to server ...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoConnection",
  sockets: {
    connect: function () {
      this.$store.commit("isConnected", true);
    },
  },
  computed: {
    isConnected() {
      return this.$store.state.connected;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fg-color {
  color: #effaff;
}
.max-h-half-screen {
  max-height: 50vh;
}
</style>
