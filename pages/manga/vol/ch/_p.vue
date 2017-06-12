<template>
  <div style="background-color: white; height: 82vh;">
    <!--{{$store.state.manga_index[ch_i].pages[p_i].page}}-->
    <img v-if="$store.state.manga_index[ch_i].pages[p_i].page !== null" class="center" :src="'/'+$store.state.manga_index[ch_i].pages[p_i].page">
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
    return { ch_i: ch, p_i: p }
  }
}
</script>
