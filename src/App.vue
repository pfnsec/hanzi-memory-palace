<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import Vue from 'vue'
import * as firebase from 'firebase';
import VueFirestore from 'vue-firestore'
 
require('firebase/firestore')
 
Vue.use(VueFirestore)

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

const firestore = firebase.firestore();


export default {
  name: 'App',
  firestore: function () {
    return {
        users: firestore.collection('users')
    }
  },

  mounted() {

    firebase.auth().onAuthStateChanged(this.login)

  },

  methods: {
    setUserData(user) {

        this.$store.commit('user/setUserData', user)
        //this.$store.dispatch('user/openDBChannel')
    },
    login(user) {
      if (user) {
        console.log(user)
        this.$store.commit('user/setUserData', user)
      } else {
      }
    },
    prev() {
      if(this.page == 0)
        return

      var ins = {page: this.page - 1}
      //this.$store.dispatch('user/patch', ins)
    },

    next() {
      console.log("next " + this.page)
      //this.page++

      var ins = {page: this.page + 1}
      //this.$store.dispatch('user/patch', ins)
    },
  }

}
</script>
