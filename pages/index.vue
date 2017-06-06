<template>
  <div class="big">
    <!--<button @click="$store.commit('increment')">{{ $store.state.counter }}</button>-->
    <div class="row">
      <div class="col c2">
        <div>{{$store.state.manga_index[$store.state.v.ch_i].ch}} - {{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</div>
        <div v-for="(item, index, key) in $store.state.manga_index" v-on:click="setChapter(index)">
          {{item.vol}} - {{item.ch}}
        </div>
      </div>
      <div class="col c9">
      

      

      <!--{{$store.state.manga_index[values.chapter_index].pages[values.page_index].page}}-->
      <div>
        <img :src="$store.state.manga_index[$store.state.v.ch_i].pages[$store.state.v.p_i].page">
      </div>
      
      <!--
      <div v-for="(item, index, key) in $store.state.manga_index[values.chapter_index].pages">
        {{item}} {{index}} {{key}}
        <img :src="item.page">
      </div>
      -->
      </div>
      <div class="col c1">
        <a class="btn btn-a btn-sm smooth" v-on:click="prevPage()">Prev</a>
        <a class="btn btn-a btn-sm smooth" v-on:click="nextPage()">Next</a>
      </div>
    </div>
    

    <!--
    <div v-for="(volume, index, key) in $store.state.manga_index">
      {{index}} {{key}}
      <div v-bind="volume" v-for="(chapter, index, key) in volume">
        {{index}}
        <div v-bind="chapter" v-for="(page, index, key) in chapter">
            <img :src="page">
        </div>
      </div>
    </div>
    -->
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

    }
  },
  methods: {
    setChapter (i) {
      this.$store.commit(SET_CHAP, i)
    },
    setChapterLength (length) {
      this.$store.commit(SET_CHAP_LEN, length)
    },
    nextChapter () {
    },
    prevChapter () {
    },
    nextPage () {
      this.$store.commit(INC_PAGE_INDEX)
    },
    prevPage () {
      this.$store.commit(DEC_PAGE_INDEX)
    },
    test () {
      console.log(this.$store)
    }
  },
  created: () => {},
  computed: {}
}

</script>

<style lang="sass" scoped> //Scoped means it only applies to current component only.
  .big {
    font-size: 30px;
  }
</style>
