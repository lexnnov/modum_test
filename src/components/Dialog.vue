<template>
  <transition name="fade">
    <div class="el-dialog" v-if="modalIsVisible">

      <div @click="close" class="el-dialog__header">
        <div class="el-dialog__header-close">X</div>
      </div>

      <div class="el-dialog__body">
        <div class="el-dialog__book">
          <img :src="currentBook.image" class="el-dialog__book-image">
          <div class="el-dialog__book-name">{{currentBook.name}}</div>
          <div class="el-dialog__book-description">{{currentBook.description}}</div>
          <div class="el-dialog__book-author">{{currentBook.author}}</div>
          <div class="el-dialog__book-year">{{currentBook.year}}</div>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";

  export default {
    name: "Dialog",
    props: ['book'],
    computed: {
      ...mapGetters({
        modalIsVisible: 'other/modalIsVisible',
        currentBook: 'books/currentBook'
      })
    },
    methods: {
      ...mapActions({
        setModal: 'other/setModal',
      }),
      close() {
        this.setModal(false)
      }
    }
  }
</script>

<style lang="scss">
  .el-dialog {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);

    &__header {
      height: 50px;
      width: 100%;
      background: black;
      opacity: 0.5;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }

    &__header-close {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      float: right;
    }

    &__body {
      height: calc(100% - 50px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__book {
      background: white;
      height: 80%;
      width: 70%;
      overflow-y: auto;
      padding: 20px
    }

    &__book-image {
      max-height: 300px;
    }

    &__book-name {
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__book-description {
      text-align: justify;
      margin-bottom: 10px;
    }
  }

</style>