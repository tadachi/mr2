<template>
  <div>
    <div v-for="(manga, index, key) in $store.state.index">
      <pre>
        {{manga.name}} volumes: {{manga.vol_l}} chapters: {{manga.ch_l}} index: {{manga.index}}
      </pre>
      <!--<nuxt-link :to="'/manga/'+manga.name+'/'">{{manga.title}}</nuxt-link>-->
    </div>
    <div><nuxt-link to="/manga">reader</nuxt-link></div>
    <div><nuxt-link to="/users">users</nuxt-link></div>
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
  }
}
</script>

<style>
</style>
