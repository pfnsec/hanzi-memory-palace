
<template>
    <q-page 
      class="col full-height" 
      @keydown.left="prev"
      @keydown.right="next"
      v-touch:swipe.right="prev"
      v-touch:swipe.left="next"
    >

      <q-dialog v-model="showingDef" style='min-width: 33%'
        @keydown.left="prev"
        @keydown.right="next"
      >
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

          <div class="row no-wrap justify-between" style="padding: 5%">

            <q-card-actions align="left">
              <q-btn v-if="starred[currentDef['word']]" flat icon="star"  color="primary" @click="unstar(currentDef['word'])" />

              <q-btn v-else flat icon="star_outline"  color="primary" @click="star(currentDef['word'])" />
              {{starred}}
            </q-card-actions>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          
          </div>

        </q-card>
      </q-dialog>

        <div class="row" v-if="$q.platform.is.mobile">
          <q-card style="width: 100vw"
            >
            <div class="q-pa-md" >
              <div class="q-gutter-sm">
                <q-btn 
                  v-for="h in hanzi" :key="h.word"
                  style="width: 29vw; height: 29vw"
                  @click="showDef(h)"
                > 
                <svg viewBox="0 0 56 18" style="width: 100%; height: 100%">
                  <text x="50%" y="50%" font-size="4em" textLength="100%" dominant-baseline="middle" text-anchor="middle" font-family="Noto Sans SC, sans-serif">
                    {{h['word']}}
                  </text> 
                  <text x="0" y="15"></text>
                </svg>
                </q-btn>
              </div>
            </div>
          </q-card>
        </div>

      <div class="row full-height" v-if="$q.platform.is.desktop">
          <q-btn 
            class="col-0.5"
            icon="keyboard_arrow_left"
            v-on:click="prev"/>

          <q-card style="" flat class="col" >
            <div class="col">
              <div class="row" v-for="i in [0, 5, 10]" :key="i">
                <q-btn 
                  class="col"
                  v-for="j in Array.from(new Array(5), (x, i) => i)" :key="i + j"
                  @click="showDef(hanzi[i + j])"
                  style="height: 27vh"
                > 
                  <svg viewBox="0 0 80 18" style="width: 100%; height: 100%">
                  <!--svg style="width: 100%; height: 100%"-->
                    <text x="50%" y="50%" font-size="3em" textLength="100%" dominant-baseline="middle" text-anchor="middle" font-family="Noto Sans SC, sans-serif">
                      {{hanzi[i+j]['word']}}
                    </text>    
                  </svg>
                </q-btn>
              </div>
            </div>
          </q-card>
          <q-btn 
            class="col-0.5"
            icon="keyboard_arrow_right"
            v-on:click="next"/>
      </div>

      <q-linear-progress 
        size="50px" 
        :value="page * 15 / 5000" 
        color="accent" 
        class="row"

      >
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="accent" :label="page * 15 + '/5000'" />
        </div>
      </q-linear-progress>

    </q-page>
</template>

<script>
import * as firebase from 'firebase';

import   hanzidb  from 'assets/hanzidb/hanzidb-translated.json'
import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
 
Vue.use(Vue2TouchEvents)

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
      showingDef: false,
      currentDef: {},
      showingPageSelect: false,
    }
  },

  computed: {
    starred() { 
      return this.$store.getters['user/starred']
    },
    page() {
      return this.$store.getters['user/page'] 
    },
    hanzi() {
      console.log("hanzi")
      return this.hanziPage(this.page)
    }
  },

  methods: {

    showDef(h) {
      this.currentDef = h
      //this.currentDef['pron'] = this.currentDef['pron'][0]
      this.showingDef = true
    },

    star(c) { 
      var ins = {starred: {}}
      ins.starred[String(c)] = true
      this.$store.dispatch('user/patch', ins)
    },

    unstar(c) { 
      var ins = {starred: {}}
      ins.starred[String(c)] = false
      this.$store.dispatch('user/patch', ins)
    },

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

