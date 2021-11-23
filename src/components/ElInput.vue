<template>
  <input class="el-input" v-model="search"/>
</template>

<script>
  export default {
    name: "ElInput",
    props: ['value1'],
    computed: {
      search: {
        get: function () {
          return this.value1 || ''
        },
        set: function (val) {
          this.$emit('inputChange', val)
        }
      }
    }
  }
</script>

<style lang="scss">
  .el-input {
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    outline: none;
  }
</style>