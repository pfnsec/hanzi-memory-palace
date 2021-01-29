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

        <q-item
          clickable v-ripple @click="$router.push('/favourites')"
        >
          <q-item-section side>
            <q-avatar rounded size="48px">
              <q-icon name="star" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Favourites</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          icon="edit"
          title="Lookup"
          clickable v-ripple @click="$router.push('/lookup')"
        >
          <q-item-section side>
            <q-avatar rounded size="48px">
              <q-icon name="edit" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Lookup (beta)</q-item-label>
          </q-item-section>
        </q-item>

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
    var dark = localStorage.getItem('dark')
    this.$q.dark.set(dark)

    return {
      dark: dark,
      leftDrawerOpen: false,
    }
  }
}
</script>
