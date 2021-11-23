<template>
  <div class="el-page">

    <div class="el-page__categories">
      <category
          :data="item"
          :disable="isBlocked"
          :key="item.id"
          @checked="clickOnCategory"
          v-for="item in categories"
      />
    </div>

    <div class="el-page__search">
      <el-input :value1="search" @inputChange="searchChange" placeholder="Введите текст"></el-input>
    </div>

    <div class="el-page__books" v-if="books.length > 0">
      <div :key="book.id" class="el-page__books-item" v-for="book in books">
        <card :book="book" :word="search" @click="openBook(book)"/>
      </div>
    </div>

    <div v-else>
      По вашему запросу ничего не найдено
    </div>

    <el-button :disabled="isBlocked" @buttonClick="loadMoreBooks" label="Загрузить ещё" v-if="hasNext"/>

    <Dialog/>
  </div>

</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  import Category from "./components/Category";
  import Card from "./components/Card";
  import Dialog from "./components/Dialog";
  import ElInput from "./components/ElInput";
  import ElButton from "./components/ElButton";

  export default {
    name: 'App',
    data() {
      return {
        search: ''
      }
    },
    components: {
      ElButton,
      ElInput,
      Dialog,
      Card,
      Category,
    },
    computed: {
      ...mapGetters({
        categories: 'categories/items',
        hasNext: 'books/hasNext',
        filters: 'books/filters',
        modalIsVisible: 'other/modalIsVisible',
        isBlocked: 'other/isBlocked',
      }),
      books() {
        return this.$store.getters['books/filteredBooks'](this.search)
      }
    },
    methods: {
      ...mapActions({
        setModalState: 'other/setModalState',
        setCurrentBook: 'books/setCurrentBook',
        addCategoryToFilters: 'books/addCategoryToFilters',
        removeCategoryFromFilters: 'books/removeCategoryFromFilters',
        getCategories: 'catigories/getCategories'
      }),
      loadMoreBooks() {
        this.$store.dispatch('books/getBooks')
      },
      openBook(book) {
        this.setModalState(true)
        this.setCurrentBook(book)
      },
      clickOnCategory({item, checked}) {

        if (checked) {
          this.addCategoryToFilters(item)
        } else {
          this.removeCategoryFromFilters(item)
        }

        this.$router.push({path: '/', query: {...this.$route.query, category: [...this.filters.categories]}})

        this.$store.dispatch('books/getBooks')
      },
      searchChange(val) {
        this.search = val
        this.$router.replace({path: '/', query: {...this.$route.query, search: this.search || undefined}})
      }
    },
    watch: {
      modalIsVisible(newVal) {
        if (newVal) document.documentElement.classList.add('modal-open')
        else document.documentElement.classList.remove('modal-open')
      }
    },
    async mounted() {
      await this.$store.dispatch('categories/getCategories')

      const urlParams = new URLSearchParams(window.location.search)

      if (urlParams.getAll('category').length > 0) {
        urlParams.getAll('category').forEach(categoryId => {
          this.$store.dispatch('categories/setCategory', {id: categoryId, value: true})
          this.$store.dispatch('books/addCategoryToFilters', categoryId)
        })
      }

      if (urlParams.getAll('search')) {
        this.search = urlParams.get('search')
      }

      this.$store.dispatch('books/getBooks')
    }
  }
</script>

<style lang="scss">
  @import 'styles/styles';

  .el-page {
    padding: 0 10px;
    overflow-y: scroll;
    height: 100vh;

    &__categories {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 5px;
    }

    &__search {
      margin-bottom: 20px
    }

    &__books-item {
      margin-bottom: 20px;
    }

    @media (min-width: 768px) {
      padding: 0 20%;
    }
  }

</style>
