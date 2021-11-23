export default {
  namespaced: true,

  state: {
    modalIsVisible: false,
    block: false,
  },

  getters: {
    modalIsVisible: (state) => state.modalIsVisible,
    isBlocked: (state) => state.block,
  },

  mutations: {
    SET_MODAL_STATE(state, payload) {
      state.modalIsVisible = payload;
    },
    BLOCK_REQUEST(state) {
      state.block = true
      setTimeout(() => {
        state.block = false
      }, 300)
    }
  },

  actions: {
    blockRequest({commit}) {
      commit('BLOCK_REQUEST')
    },
    setModalState({commit}, payload) {
      commit('SET_MODAL_STATE', payload)
    }
  }
}