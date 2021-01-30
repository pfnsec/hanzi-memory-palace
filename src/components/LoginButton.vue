<template>
  <q-item
    v-if="!currentUser"
    clickable
    target="_blank"
    @click="login()"
  >
    <q-item-section
      avatar
    >
      <q-icon name="login" />
    </q-item-section>

    <q-item-section>
      <q-item-label> Sign In </q-item-label>
    </q-item-section>
  </q-item>

  <q-item
    v-else
    clickable
    target="_blank"
  >
    <q-item-section
      avatar
    >
      <q-avatar>
        <img :src="currentUser.photoURL">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label> {{currentUser["displayName"]}} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'LoginButton',
  computed: {

      currentUser() {
        return firebase.auth().currentUser
      }

  },
  methods: {
      login() {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().setPersistence('local').then(function() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                //console.log(user)
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
        });

      }
  }
}
</script>

