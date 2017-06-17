<template>
  <div style="background-color: white; height: 82vh;">
    <!--{{$store.state.manga_index[ch_i].pages[p_i].page}}-->
    <img v-if="$store.state.manga_index[c].pages[p]" class="center" :src="'/'+$store.state.manga_index[c].pages[p].page">
  </div>
</template>

<script>
export default {
  validate ({params, store}) {
    return true
  },
  asyncData ({params}) {
    let ch = parseInt(params.ch) - 1
    let p = parseInt(params.p) - 1
    return { c: ch, p: p }
  },
  beforeRouteEnter (to, from, next) { // Hooks
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // console.log('beforeRouteUpdate _p.vue')
    next()
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
