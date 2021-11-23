<template>
    <div class="el-page">

        <div class="el-page__categories">
            <category :data="item" :disable="isBlocked" :key="item.id" @checked="clickOnCategory"
                      v-for="item in categories"/>
        </div>

        <div class="el-page__search">
            <ElInput :value="search" placeholder="Введите текст" @inputChange="filter"></ElInput>
        </div>

        <div class="el-page__books" v-if="books.length > 0">
            <div :key="book.id" class="el-page__books-item" v-for="book in books">
                <card :book="book" :word="search" @click="openModal(book)"/>
            </div>
        </div>

        <div v-else>
            По вашему запросу ничего не найдено
        </div>

        <Button :disabled="isBlocked" @buttonClick="load" label="Загрузить ещё" v-if="hasNext"/>

        <Dialog/>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import Category from "./components/Category";
    import Card from "./components/Card";
    import Dialog from "./components/Dialog";
    import Button from "./components/Button";
    import ElInput from "./components/ElInput";

    export default {
        name: 'App',
        data() {
            return {
                search: ''
            }
        },
        components: {
            ElInput,
            Button,
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
                setModal: 'other/setModal',
                setCurrentBook: 'books/setCurrentBook',
                addCategory: 'books/addCategory',
                removeCategory: 'books/removeCategory',
                getCategories: 'catigories/getCategories'
            }),
            load() {
                this.$store.dispatch('books/getBooks')
            },
            openModal(book) {
                this.setModal(true)
                this.setCurrentBook(book)
            },
            async clickOnCategory({item, checked}) {

                if (checked) {
                    this.addCategory(item)
                } else {
                    this.removeCategory(item)
                }
                this.$router.push({path: 'Home', query: {...this.$route.query, category: [...this.filters.categories]}})

                await this.$store.dispatch('books/getBooks')

            },
            filter(val) {
                this.search = val
                this.$router.replace({path: 'Home', query: {...this.$route.query, search: this.search || undefined}})
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

            let urlParams = new URLSearchParams(window.location.search)

            if (urlParams.getAll('category').length > 0) {
                urlParams.getAll('category').forEach(el => {
                    this.$store.dispatch('categories/setCategory', {id: el, value: true})
                    this.$store.dispatch('books/addCategory', el * 1)
                })
            }

            if (urlParams.getAll('search')) {
                this.search = urlParams.get('search')
            }
            await this.$store.dispatch('books/getBooks')
        }
    }
</script>

<style lang="scss">
    @import 'styles/styles';

    .el-page {
        padding: 0 20%;
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
    }

</style>
