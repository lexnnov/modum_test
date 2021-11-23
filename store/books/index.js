import axios from "axios";

export default {
  namespaced: true,

  state: {
    items: [],
    page: 1,
    hasNext: false,
    currentBook: {},
    search: '',
    block: false,
    filters: {
      categories: [],
    }
  },

  getters: {
    items: (state) => state.items,
    hasNext: (state) => state.hasNext,
    filters: (state) => state.filters,
    currentBook: (state) => state.currentBook,
    filteredBooks: (state) => (input) => {
      if (state.items.length > 0 && input) {
        return state.items.filter(book => {
          return book.name && book.name.toLowerCase().includes(input.toLowerCase()) ||
            book.description && book.description.toLowerCase().includes(input.toLowerCase()) ||
            book.year && book.year.toLowerCase().includes(input.toLowerCase()) ||
            book.author && book.author.toLowerCase().includes(input.toLowerCase())
        })
      } else {
        return state.items
      }
    }
  },

  mutations: {

    SET_ITEMS(state, payload) {
      state.items = [...state.items, ...payload.map(el => {
        el.description = el.description.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
        return el
      })]
    },
    SET_PAGE(state, payload) {
      state.page = payload ? state.page + 1 : state.page;
      state.hasNext = payload;
    },
    RESET_ITEMS(state) {
      state.page = 1;
      state.items = [];
    },
    SET_CURRENT_BOOK(state, payload) {
      state.currentBook = payload
    },
    ADD_CATEGORY_TO_FILTERS(state, payload) {
      state.filters = {
        ...state.filters,
        categories: [...state.filters.categories, payload]
      }
    },
    REMOVE_CATEGORY_FROM_FILTERS(state, payload) {
      state.filters = {
        ...state.filters,
        categories: state.filters.categories.filter(el => el != payload)
      };
    },
  },

  actions: {

    async getBooks({state, commit, rootState}) {
      let {data} = await axios.post('https://webdev.modumlab.com/api/book/list', {
        categories: state.filters.categories.length > 0 ? state.filters.categories : rootState.categories.items.map(el => el.id),
        page: state.page
      })

      commit('other/BLOCK_REQUEST', null, {root: true})
      commit('SET_ITEMS', data.data.list)
      commit('SET_PAGE', data.data.next)
    },
    addCategoryToFilters({commit}, payload) {
      commit('RESET_ITEMS')
      commit('ADD_CATEGORY_TO_FILTERS', Number(payload))
    },
    removeCategoryFromFilters({commit}, payload) {
      commit('RESET_ITEMS')
      commit('REMOVE_CATEGORY_FROM_FILTERS', Number(payload))
    },
    setCurrentBook({commit}, payload) {
      commit('SET_CURRENT_BOOK', payload)
    }
  }
}