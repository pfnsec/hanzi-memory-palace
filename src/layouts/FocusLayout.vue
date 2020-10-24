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
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Hanzi Palace
        </q-item-label>

        <login-button/>

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

.q-page-container {
  background-color:grey
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

  data () {
    return {
      leftDrawerOpen: false,
    }
  }
}
</script>
