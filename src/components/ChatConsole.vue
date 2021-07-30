<template>
  <transition name="fade">
    <div class="hello" v-if="getStateData.isLoggedIn">
      <h1>Hello {{ getStateData.usrname }}</h1>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ChatConsole",
  props: {
    msg: String
  },
  data(){
    return {
      displaying: true,
      usrname: String
    }
  },
  computed: {
    getStateData () {
      return {
          isLoggedIn: this.$store.state.loggedIn,
          usrname: this.$store.state.usrname
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>