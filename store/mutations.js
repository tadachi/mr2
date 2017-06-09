export const mutations = {
  SET_MANGA_INDEX (state, data) {
    state.manga_index = data
  },
  SET_ROOT_INDEX (state, data) {
    state.index = data
  },
  INC_PAGE_INDEX (state) {
    if (state.v.p_i >= state.v.ch_len - 1) {
      if (state.v.ch_i >= state.manga_index.length - 1) { return }
      state.v.ch_i += 1
      state.v.ch_len = state.manga_index[state.v.ch_i].pages.length
      state.v.p_i = 0
      return
    }
    state.v.p_i += 1
  },
  DEC_PAGE_INDEX (state) {
    if (state.v.p_i <= 0) {
      if (state.v.ch_i <= 0) { return }
      state.v.ch_i -= 1
      state.v.ch_len = state.manga_index[state.v.ch_i].pages.length
      state.v.p_i = state.v.ch_len
    }
    state.v.p_i -= 1
  },
  INC_CHAP_INDEX (state) {
    if (state.v.ch_i >= state.manga_index.length - 1) return
    state.v.ch_i += 1
  },
  DEC_CHAP_INDEX (state) {
    if (state.v.ch_i <= 0) return
    state.v.ch_i += 1
  },
  SET_CHAP (state, i) {
    state.v.ch_i = i
    state.v.ch_len = state.manga_index[i].pages.length
    state.v.p_i = 0
  },
  SET_CHAP_LEN (state, length) {
    state.v.ch_len = length
  }
}
