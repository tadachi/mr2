import Vuex from 'vuex'
import axios from 'axios'
import {mutations} from './mutations'

const hostname = process.env.baseUrl

const store = () => new Vuex.Store({
  state: {
    index: null,
    manga_index: null,
    v: {ch_len: 0, ch_i: 0, p_i: 0}
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
    }
  },
  setters: {

  }
})

export default store
