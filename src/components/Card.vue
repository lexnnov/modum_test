<template>
  <div class="el-card">

    <div class="el-card__left">
      <img :src="book.image" class="el-card__image">
    </div>

    <div class="el-card__right">

      <div class="el-card__name" v-html="highlight(book.name, `${this.word}`)"></div>

      <div class="el-card__description" v-html="highlight(book.description, `${this.word}`)"></div>

      <div style="display: flex; font-style: italic">
        <div class="el-card__year" v-html="highlight(book.year, `${this.word}`)"></div>
        <div class="el-card__author" v-html="highlight(book.author, `${this.word}`)"></div>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "Card",
    props: ['book', 'word'],
    data() {
      return {}
    },
    computed: {
      highlight() {
        return (words, query) => {
          if (query) {
            const re = new RegExp(`(${query})`, 'gi')
            return words.replaceAll(re, '<span class=\'highlight\'>' + '$1' + '</span>')
          } else {
            return words
          }
        }
      }
    }

  }
</script>

<style lang="scss">
  .el-card {

    @media (min-width: 768px) {
      flex-direction: row;
    }

    flex-direction: column;
    border: 1px solid #dbdbdb;
    padding: 10px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;

    &:hover  {
      .el-card__name {
        color: #dbb062;
      }

      border: 1px solid #dbb062;
    }

    &__right {
      text-align: left;
      margin-left: 20px;
    }

    &__name {
      font-weight: bold;
      margin-bottom: 10px;
      transition: 0.2s;
    }

    &__description {
      margin-bottom: 10px;
    }

    &__author {
      margin-left: 10px;
    }

    &__image {
      width: 150px;
      max-height: 200px;
      object-fit: cover;
      border-radius: 10px;
    }

    .highlight {
      background: #ccd7ff;
    }
  }


</style>