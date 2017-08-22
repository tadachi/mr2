<template>
  <div>
    <pre>
      manga_scroll.vue
    </pre>
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
  },
  head () {
    return {
      title: '',
      meta: [
        { name: 'mr2', content: `content` }
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
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    next()
  },
  methods: {},
  created: () => {},
  computed: {}
}

</script>