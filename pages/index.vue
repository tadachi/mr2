<template>
  <div>
    <div style="height: 9vh; margin-top: 10px;">
      <div style="height: 100%;" class="columns is-mobile is-gapless">
        <div class="column is-2 has-text-centered" >
          <a class="button is-primary" v-on:click="prevPage()">Prev</a>
        </div>
        <div class="column is-8 has-text-centered">
          <span class="select">
            <select v-model="ch_i" v-on:change="setChapter(ch_i)">
              <option v-for="(item, index, key) in $store.state.manga_index" :value="index">{{item.vol}} - {{item.ch}}</option>
            </select>
          </span>
        </div>
        <div class="column is-2 has-text-left" >
          <a class="button is-primary" v-on:click="nextPage()">Next</a>
        </div>
      </div>
    </div>

    <div style="background-color: white; height: 82vh;">
      <img class="center" :src="$store.state.manga_index[$store.state.v.ch_i].pages[$store.state.v.p_i].page">
    </div>

    <div style="height: 9vh;">
      <div style="height: 100%;" class="columns is-mobile is-gapless">
        <div class="column is-2 has-text-centered">
          <a class="button is-primary" v-on:click="prevPage()">Prev</a>
        </div>
        <div style="font-size: 13px" class="column is-8 has-text-centered">
          <p>{{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</p>
          <p>{{$store.state.manga_index[ch_i].ch}}</p>
        </div>
        <div class="column is-2 has-text-left">
          <a class="button is-primary" v-on:click="nextPage()">Next</a>
        </div>
      </div>
    </div>
    <!--
    <div style="width: 100vw; height: 20vh; background-color: brown;">
      <a class="button is-primary" v-on:click="prevPage()">Prev</a>
      <label class="label">{{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</label>
      <a class="button is-primary" v-on:click="nextPage()">Next</a>
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
      ch_i: 0,
      p_i: 0
    }
  },
  methods: {
    setChapter (i) {
      this.$store.commit(SET_CHAP, i)
      this.ch_i = this.$store.state.v.ch_i
    },
    setChapterLength (length) {
      this.$store.commit(SET_CHAP_LEN, length)
    },
    nextPage () {
      this.$store.commit(INC_PAGE_INDEX)
      this.ch_i = this.$store.state.v.ch_i
    },
    prevPage () {
      this.$store.commit(DEC_PAGE_INDEX)
      this.ch_i = this.$store.state.v.ch_i
    }
  },
  created: () => {},
  computed: {}
}

</script>

<style>
  img.center {
    display: block; 
    margin: auto;
    height: 80vh;
  }
  center {
    display: block;
    margin: auto;
  }
</style>
