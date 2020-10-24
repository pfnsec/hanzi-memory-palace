<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCgjC6-LBYSzEcgpEV3QV4EF2mZbVtrnOg",
  authDomain: "hanzi-palace.firebaseapp.com",
  databaseURL: "https://hanzi-palace.firebaseio.com",
  projectId: "hanzi-palace",
  storageBucket: "hanzi-palace.appspot.com",
  messagingSenderId: "562475303285",
  appId: "1:562475303285:web:7baeee33d6074c646ed33c",
  measurementId: "G-2XJBLBW5S3"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().enablePersistence();


export default {
  name: 'App',
  mounted() {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user)
        this.$store.dispatch('user/openDBChannel').catch(console.error)
        this.$store.commit('user/setUserData', user)
      } else {
      }
    }.bind(this));

  },

  methods: {
    prev() {
      if(this.page == 0)
        return

      var ins = {page: this.page - 1}
      this.$store.dispatch('user/patch', ins)
    },

    next() {
      console.log("next " + this.page)
      //this.page++

      var ins = {page: this.page + 1}
      this.$store.dispatch('user/patch', ins)
    },
  }

}
</script>
