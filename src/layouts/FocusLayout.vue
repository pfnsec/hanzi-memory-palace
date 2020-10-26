<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div style="margin: auto">
          <q-toolbar-title style="margin: auto">
            Hanzi Memory Palace
          </q-toolbar-title>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Hanzi Palace
        </q-item-label>

        <login-button/>

        <q-item>
          <q-toggle
            :icon="'moon'"
            v-model="dark"
            @input="toggleDark"
            label="Dark Mode"
          />
        </q-item>

        <EssentialLink
          icon="star"
          title="Favourites"
        />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
.q-toolbar {
  background-color:royalblue
}

</style>

<script>
import EssentialLink from 'components/EssentialLink'
import LoginButton from 'components/LoginButton'

export default {
  name: 'FocusLayout',

  components: {
    LoginButton,
    EssentialLink
  },

  mounted() {
    this.$q.dark.set(this.dark)
  },


  methods: {
    toggleDark(value) {
      localStorage.setItem('dark', value)
      this.$q.dark.set(value)
    }
  },

  data () {
    return {
      dark: localStorage.getItem('dark'),
      leftDrawerOpen: false,
    }
  }
}
</script>
