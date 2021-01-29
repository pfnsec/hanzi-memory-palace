<template>
    <q-page>
        <lookup-canvas/>
    </q-page>
</template>

<script>

import LookupCanvas from "../logic/hanzi_looup/LookupCanvas"


export default {
  name: 'Lookup',
  components: {
      LookupCanvas
  }
}

</script>