import axios from "axios";

export default {
    namespaced: true,

    state: {
        items: [],
    },

    getters: {
        items: (state) => state.items,
    },

    mutations: {
        SET_CATEGORIES(state, payload) {
            state.items = payload.map(el => {
                el.checked = false
                return el
            })
        },
        UPDATE_CATEGORY(state, payload) {
            state.items = state.items.map(el => {
                if (el.id == payload.id) {
                    el.checked = payload.value
                }
                return el
            })
        }
    },

    actions: {
        async getCategories({commit}) {
            let {data} = await axios.post('https://webdev.modumlab.com/api/book/categories')
            commit('other/BLOCK_REQUEST', null, {root: true})
            commit('SET_CATEGORIES', data.data.list)
        },
        setCategory({commit}, payload) {
            commit('UPDATE_CATEGORY', payload)
        }
    }
}