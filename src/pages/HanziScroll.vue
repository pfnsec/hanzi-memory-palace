
<template>
    <q-page flex
      @keydown.left="prev"
      @keydown.right="next"
    >

      <q-dialog v-model="showingDef" style='min-width: 33%'>
        <q-card style="width: 55vw">
          <q-card-section>
            <div class="row justify-center">
              <div class="col text-center text-h2">{{currentDef['word']}}</div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <ul>

              <template v-for="def in currentDef['defs']" >
                <h4 :key=def>
                  {{def['pron'][0]}}
                </h4>

                <li v-for="d in def['defs']" :key="d">{{d}}</li>
              </template>
            </ul>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>




      <div class="row">
          <q-btn 
            icon="keyboard_arrow_left"
            style="width: 15vw" 
            v-on:click="prev"/>
          <q-card style="width: 70vw"
            >
            <div class="q-pa-md" >
                <!--q-table
                  title="Treats"
                  :data="data"
                  :columns="columns"
                  row-key="name"
                  dark
                  color="amber"
                /-->
              <div class="q-gutter-sm">
                <q-btn 
                  v-for="h in hanzi" :key="h.word"
                  style="width: 13vw; height: 13vw"
                  @click="showDef(h)"
                > 
                <svg viewBox="0 0 56 18" style="width: 100%; height: 100%">
                  <text x="50%" y="50%" textLength="100%" dominant-baseline="middle" text-anchor="middle">{{h['word']}}</text>    
                  <text x="0" y="15"></text>
                </svg>
                </q-btn>
              </div>
            </div>
          </q-card>
          <q-btn 
            icon="keyboard_arrow_right"
            style="width: 15vw" 
            v-on:click="next"/>
      </div>

      <q-linear-progress size="50px" :value="page * 15 / 5000" color="accent" class="q-mt-sm">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="accent" :label="page * 15 + '/5000'" />
        </div>
      </q-linear-progress>

    </q-page>
</template>

<script>
import   hanzidb  from 'assets/hanzidb/hanzidb-translated.json'

export default {
  name: 'HanziScroll',

  data() {
    //while(arr.length) newArr.uupush(arr.splice(0,3));

  //console.log(hanzidb.length)
  //console.log(hanzidb.keys())
  //for (var h in hanzidb) {
  //  console.log(hanzidb[h])
  //}

    return {
      page : 0,
      hanzi: this.hanziPage(0),
      showingDef: false,
      currentDef: {}
    }
  },

  computed: {
  },

  methods: {

    showDef(h) {
      this.currentDef = h
      //this.currentDef['pron'] = this.currentDef['pron'][0]
      this.showingDef = true
    },
    

    prev() {
      console.log("prev " + this.page )
      this.page--
      this.hanzi = this.hanziPage(this.page)
    },

    next() {
      console.log("next " + this.page)
      this.page++
      this.hanzi = this.hanziPage(this.page)
    },

    hanziPage(n) {
      var i

      var res = []


      for(i = n * 15; i < (n + 1) * 15; i++){
        res.push(hanzidb[i])
      }

      return res
      //return hanzidb.slice(i, i + 15).map((h) => unescape(h))
    }

  }
}
</script>

