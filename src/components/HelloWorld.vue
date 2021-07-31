<template>
  <transition name="fade">
    <div class="hello" v-if="!isLoggedIn">
      <h1>{{ msg }}</h1>
      <h2>Wie ist dein Name ?</h2>
      <input v-model="usrname" placeholder="Benutzername" v-on:keydown.enter="checkUsrname">
    </div>
  </transition>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data(){
    return {
      usrname: ""
    }
  },
  methods:{
    checkUsrname(){
      // check usrname
      if(this.usrname.trim() !== ""){
      // store usrname
      this.$store.state.usrname = this.usrname;
      // login 
      this.$store.state.loggedIn = true;
      }
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.loggedIn
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
