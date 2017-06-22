<template>
  <div>
    <nuxt-link to='/'>Home</nuxt-link>
    <div style="height: 9vh; margin-top: 10px;">
      <div style="height: 100%;" class="columns is-mobile is-gapless">
        <div class="column is-2 has-text-centered" >
          <a class="button is-primary" v-on:click="prevPage($store.getters.getPrev)">Prev</a>
        </div>
        <div class="column is-8 has-text-centered">
          <span class="select">
            <select v-model="$store.state.v.ch_i" v-on:change="setChapter($store.state.v.ch_i)">
              <option v-for="(item, index, key) in chapters" :value="index">{{item.name}}</option>
            </select>
          </span>
        </div>
        <div class="column is-2 has-text-left" >
          <a class="button is-primary" v-on:click="nextPage($store.getters.getNext)">Next</a>
        </div>
      </div>
    </div>
      <div style="background-color: white; height: 82vh;">
        <nuxt-child/>
      </div>
    <div style="height: 9vh;">
      <div style="height: 100%;" class="columns is-mobile is-gapless">
        <div class="column is-2 has-text-centered">
          <a class="button is-primary" v-on:click="prevPage($store.getters.getPrev)">Prev</a>
        </div>
        <div style="font-size: 13px" class="column is-8 has-text-centered">
          <p><select v-model="$store.state.v.p_i" v-on:change="setPage($store.state.v.p_i)">
            <option v-for="n in $store.state.v.ch_len" :value="n-1">{{n}}</option>
          </select>
          / {{$store.state.v.ch_len}}</p>
          <!--<p>{{$store.state.v.p_i+1}} / {{$store.state.v.ch_len}}</p>-->

          <p>{{$store.state.manga_index[$store.state.v.ch_i].ch}}</p>
        </div>
        <div class="column is-2 has-text-left">
          <a class="button is-primary" v-on:click="nextPage($store.getters.getNext)">Next</a>
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
    console.log('validate')
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
      // Convert to indices for arrays by subtracting 1
      const ch = parseInt(params.ch) - 1
      const p = parseInt(params.p) - 1
      let items = []
      for (let item of manga.data) {
        items.push({path: `/${params.manga}/${item.vol_id}/${item.ch_id}/1`, name: `${item.vol} - ${item.ch}`})
      }
      if (ch > store.state.v.ch_i || ch < store.state.v.ch_i) {
        store.commit(SET_CHAP, ch)
      }
      store.commit(SET_PAGE, p)
      return { data: params, chapters: items }
    })
  },
  head () {
    return {
      title: '',
      meta: [
        { name: 'mr2', content: `${this.data.manga}` }
      ]
    }
  },
  props: {},
  data: () => {
  },
  beforeRouteEnter (to, from, next) { // Hooks
    console.log('beforeRouteEnter')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate _manga.vue')
    const ch = parseInt(to.params.ch) - 1
    const p = parseInt(to.params.p) - 1
    if (this.$store.state.manga_index) {
      if (ch > this.$store.state.v.ch_i || ch < this.$store.state.v.ch_i) {
        this.$store.commit(SET_CHAP, ch)
      }
      this.$store.commit(SET_PAGE, p)
    }
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next()
  },
  methods: {
    setChapter (i) {
      this.$store.commit(SET_CHAP, i)
      this.$router.replace(this.chapters[i].path)
    },
    setPage (i) {
      const params = this.$route.params
      const path = `/${params.manga}/${params.vol}/${params.ch}/${i + 1}`
      this.$store.commit(SET_PAGE, i)
      this.$router.replace(path)
    },
    nextPage (next) {
      this.$router.replace(next.path)
    },
    prevPage (prev) {
      this.$router.replace(prev.path)
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
