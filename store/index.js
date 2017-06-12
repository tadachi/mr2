import Vuex from 'vuex'
import axios from 'axios'
import {mutations} from './mutations'

const hostname = process.env.baseUrl

function pad (n, width, z) {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

const store = () => new Vuex.Store({
  state: {
    index: null,
    manga_index: null,
    v: {name: null, title: null, ch_len: 0, ch_i: 0, p_i: 0}
  },
  mutations,
  actions: { // For async operations
    setMangaIndexAction ({commit}) {
      axios.get(`${hostname}/data.json`).then((json) => {
        commit('SET_MANGA_INDEX', json.data)
      })
    },
    setRootIndexAction ({commit}) {
      axios.get(`${hostname}/index.json`).then((json) => {
        commit('SET_ROOT_INDEX', json.data)
      })
    }
  },
  getters: {
    getMangaIndex: state => {
      return state.manga_index
    },
    getNext: state => {
      if (state.manga_index === null) {
        return
      }
      const name = state.v.name
      let p = state.v.p_i
      let ch = state.v.ch_i
      p = p + 1
      if (p >= state.v.ch_len) {
        if (state.v.ch_i >= state.manga_index.length) { return }
        ch += 1
        // Add one to fit API versus array
        p = 1
        const vol = state.manga_index[ch].vol_id
        ch = pad(ch + 1, 3, 0)
        const path = `${name}/${vol}/${ch}/${p}`
        return path
      } else {
        const vol = state.manga_index[ch].vol_id
        ch = pad(ch + 1, 3, 0)
        p = p + 1
        const path = `${name}/${vol}/${ch}/${p}`
        return path
      }
    },
    getPrev: state => {
      if (state.manga_index === null) {
        return
      }
      const name = state.v.name
      let p = state.v.p_i
      let ch = state.v.ch_i
      p = p - 1
      if (p < 0) {
        if (state.v.ch_i <= 0) { return `${name}/01/001/1` }
        ch -= 1
        p = state.manga_index[ch].pages.length
        const vol = state.manga_index[ch].vol_id
        ch = pad(ch + 1, 3, 0)
        const path = `${name}/${vol}/${ch}/${p}`
        return path
      } else {
        const vol = state.manga_index[ch].vol_id
        ch = pad(ch + 1, 3, 0)
        p = p + 1
        const path = `${name}/${vol}/${ch}/${p}`
        return path
      }
    }
  }
})

export default store
