<template>
  <div>
    <nuxt-link to='/'>Home</nuxt-link>
    <div style="height: 9vh; margin-top: 10px;">
      <div style="height: 100%;" class="columns is-mobile is-gapless">
        <div class="column is-2 has-text-centered" >
          <p><nuxt-link :to="'/'+$store.getters.getPrev" replace>Prev</nuxt-link></p>
        </div>
        <div class="column is-8 has-text-centered">
          <span class="select">
            <select v-model="path" v-on:change="setChapter(path)">
              <option v-for="(item, index, key) in chapters" :value="item.path">{{item.name}}</option>
            </select>
          </span>
        </div>
        <div class="column is-2 has-text-left" >
          <p><nuxt-link :to="'/'+$store.getters.getNext" replace>Next</nuxt-link></p>
        </div>
      </div>
    </div>
      <div style="background-color: white; height: 82vh;">
        <nuxt-child/>
      </div>
    <div style="height: 9vh;">
      <div style="height: 100%;" class="columns is-mobile is-gapless">
        <div class="column is-2 has-text-centered">
          <p><nuxt-link :to="'/'+$store.getters.getPrev" replace>Prev</nuxt-link></p>
        </div>
        <div style="font-size: 13px" class="column is-8 has-text-centered">
          <p>{{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</p>
          <p>{{$store.state.manga_index[ch_i].ch}}</p>
        </div>
        <div class="column is-2 has-text-left">
          <p><nuxt-link :to="'/'+$store.getters.getNext" replace>Next</nuxt-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {SET_MANGA_INDEX, SET_ROOT_INDEX, INC_PAGE_INDEX, DEC_PAGE_INDEX, INC_CHAP_INDEX, DEC_CHAP_INDEX, SET_CHAP_LEN, SET_CHAP, SET_PAGE, SET_MANGA_NAME, SET_MANGA_TITLE} from '../store/mutation-types'

const hostname = process.env.baseUrl

export default {
  validate ({params, store}) {
    console.log('validate _manga.vue')
    const name = params.manga
    const ch = parseInt(params.ch) - 1
    const p = parseInt(params.p) - 1
    if (store.state.manga_index) {
      store.commit(SET_CHAP, ch)
      store.commit(SET_PAGE, p)
    }
    return true
  },
  fetch ({params, store}) {
    console.log('fetch')
  },
  asyncData ({params, store}) {
    console.log('asyncData')
    const name = params.manga
    return axios.get(`${hostname}/index.json`).then((resultA) => { // resultA = index
      return axios.get(`${hostname}/${resultA.data[name].index}`).then(b => [resultA, b]) // resultB = manga
    }).then(([resultA, resultB]) => { // [resultA, resultB]
      const index = resultA
      const manga = resultB
      store.commit(SET_MANGA_INDEX, manga.data)
      // Set the chapter length to the length of the current chapter
      store.commit(SET_CHAP_LEN, store.state.manga_index[store.state.v.ch_i].pages.length)
      // Set the manga name and title
      store.commit(SET_MANGA_NAME, index.data[name].name)
      store.commit(SET_MANGA_TITLE, index.data[name].title)
      // Initial API path
      const path = `/${params.manga}/${params.vol}/${params.ch}/${params.p}`
      console.log(path)
      // Convert to indices for arrays by subtracting 1
      const ch = parseInt(params.ch) - 1
      const p = parseInt(params.p) - 1
      let items = []
      for (let item of manga.data) {
        // console.log(`/${params.manga}/${item.vol_id}/${item.ch}/${item.p}`)
        items.push({path: `/${params.manga}/${item.vol_id}/${item.ch_id}/1`, name: `${item.vol} - ${item.ch}`})
      }
      store.commit(SET_CHAP, ch)
      store.commit(SET_PAGE, p)
      return { data: params, ch_i: ch, p_i: p, path: path, chapters: items }
    })
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'mr2', name: 'mr2', content: 'Manga-Reader2' }
      ]
    }
  },
  props: {},
  data: () => {},
  methods: {
    setChapter (path) {
      this.data.path = path
      this.$router.push(path)
    }
  },
  created: (store) => {
  },
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
