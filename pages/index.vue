<template>
  <div>
    <div v-for="(manga, index, key) in $store.state.index" :key="key">
      <pre>
        {{manga.name}} volumes: {{manga.vol_l}} chapters: {{manga.ch_l}}
      </pre>
      <p><nuxt-link :to="'/'+manga.name+'/'+'01'+'/'+'001'+'/'+'1'">{{manga.title}}</nuxt-link></p>
    </div>
    <div>
      <p><nuxt-link :to="'/'+'manga_scroll'">test</nuxt-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import {SET_ROOT_INDEX} from '../store/mutation-types.js'

const hostname = process.env.baseUrl

export default {
  fetch ({store}) {
    return axios.get(`${hostname}/index.json`).then((json) => {
      store.commit(SET_ROOT_INDEX, json.data)
    })
  },
  data () {
    return {
      title: 'mr2 index'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { name: 'mr2 index', content: 'manga-reader 2 manga index' }
      ]
    }
  }
}
</script>

<style>
</style>
