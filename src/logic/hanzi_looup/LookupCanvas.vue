<template>
  <div class="content">
    <div ref="canvas-container" class="drawingBoard"/>
    <template v-for="m in matches">
      {{m.hanzi}}

    </template>
  </div>
</template>

<script>

import {DrawingBoard} from "./drawingBoard.js"

export default {
  name: 'LookupCanvas',

  data() {
    return {
      worker: null,
      drawingBoard: null,
      matches: [],
    }
  },

  mounted() {

    this.worker = new Worker('statics/hanzi_lookup_worker.js');
    this.worker.onmessage = this.onWorkerMessage;
    this.worker.postMessage({ wasm_uri: 'hanzi_lookup_bg.wasm' });

    //this.initApp()
  }, 
  
  methods: {
    onWorkerMessage(e) {
      if (!e.data.what) return;
      if (e.data.what == "loaded") this.initApp();
      else if (e.data.what == "lookup") this.showResults(e.data.matches);
    },

    initApp() {
      // Create handwriting canvas (this is optional, you can bring your own)
      console.log(this.$refs)
      this.drawingBoard = DrawingBoard($(".drawingBoard").first(), this.lookup);
      return
      $(".cmdUndo").click(function (evt) {
        drawingBoard.undoStroke();
        drawingBoard.redraw();
        lookup();
      });
      $(".cmdClear").click(function (evt) {
        drawingBoard.clearCanvas();
        drawingBoard.redraw();
        lookup();
      });
    },

    lookup() {
      const strokes = this.drawingBoard.cloneStrokes();
      this.worker.postMessage({ strokes: strokes, limit: 8 });
    },

    showResults(matches) {
      this.matches = []
      for (var i = 0; i < 5 && i < matches.length; ++i) {
        this.matches.push(matches[i])
      }
      console.log("Matches! ", matches)
    }
  }
}
</script>