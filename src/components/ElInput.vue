<template>
  <input class="el-input" v-model="search"/>
</template>

<script>
  export default {
    name: "ElInput",
    props: ['valaue'],
    computed: {
      search: {
        get: function () {
          return this.value || ''
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
  }
</style>