<template>
  <div v-if="!isConnected" class="bg-color h-screen grid grid-rows-2 font-mono">
    <div class="row-span-1 grid items-end justify-items-center p-1 pt-8">
      <img
        src="../assets/images/loading.gif"
        alt="drinking gif"
        width="480"
        height="270"
        class="object-scale-down max-h-full"
      />
    </div>
    <div class="row-span-1 row-start-2 p-2 grid items-center">
      <p class="fg-color font-medium text-4xl pb-28">
        Connecting to server ...
      </p>
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
.bg-color {
  background-color: #3d4856;
}
.fg-color {
  color: #effaff;
}
</style>
