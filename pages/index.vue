<template>
  <div class="big">
    <div>
      <div>
        <div>{{$store.state.manga_index[$store.state.v.ch_i].ch}} - {{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</div>
        <div>
          <select v-model="ch_i" v-on:change="setChapter(ch_i)">
            <option v-for="(item, index, key) in $store.state.manga_index" :value="index">{{item.vol}} - {{item.ch}}</option>
          </select>
        </div>
        <a class="btn btn-a btn-sm smooth" v-on:click="prevPage()">Prev</a>
        <a class="btn btn-a btn-sm smooth" v-on:click="nextPage()">Next</a>
      </div>
      <div class="bounding-box">
        <img :src="$store.state.manga_index[$store.state.v.ch_i].pages[$store.state.v.p_i].page">
      </div>
      <div>
        <div>{{$store.state.manga_index[$store.state.v.ch_i].ch}} - {{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</div>
        <a class="btn btn-a btn-sm smooth" v-on:click="prevPage()">Prev</a>
        <a class="btn btn-a btn-sm smooth" v-on:click="nextPage()">Next</a>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import {SET_MANGA_INDEX, INC_PAGE_INDEX, DEC_PAGE_INDEX, INC_CHAP_INDEX, DEC_CHAP_INDEX, SET_CHAP_LEN, SET_CHAP} from '../store/mutation-types'

const hostname = process.env.baseUrl

export default {
  fetch ({store}) {
    return axios.get(`${hostname}/data.json`).then((json) => {
      store.commit(SET_MANGA_INDEX, json.data)
      // Set the chapter length to the length of the current chapter
      store.commit(SET_CHAP_LEN, store.state.manga_index[store.state.v.ch_i].pages.length)
      // store.commit(SET_CHAP_LEN, )
    })
  },
  props: {},
  data: () => {
    return {
      ch_i: 0
    }
  },
  methods: {
    setChapter (i) {
      this.$store.commit(SET_CHAP, i)
    },
    setChapterLength (length) {
      this.$store.commit(SET_CHAP_LEN, length)
    },
    nextPage () {
      this.$store.commit(INC_PAGE_INDEX)
    },
    prevPage () {
      this.$store.commit(DEC_PAGE_INDEX)
    }
  },
  created: () => {},
  computed: {}
}

</script>

<style lang="sass" scoped> //Scoped means it only applies to current component only.
  html, body {
      height: 100%;
      margin: 0;
      padding: 0;
  }
  .bounding-box {
    background-image: url(...);
    background-repeat: no-repeat;
    background-size: contain;
  }
  img {
    padding: 0;
    display: block;
    margin: 0 auto;
    max-height: 100vh;
    max-width: 100%;
  }
</style>
