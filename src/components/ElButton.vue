<template>
  <button :disabled="disabled" @click="buttonClick" class="el-button">{{label}}</button>
</template>

<script>
  export default {
    name: "ElButton",
    props: ['label', 'disabled'],
    methods: {
      buttonClick() {
        this.$emit('buttonClick')
      }
    }
  }
</script>

<style lang="scss">
  .el-button {
    background: #b99a55;
    color: white;
    border: 2px solid white;
    font-size: 15px;
    letter-spacing: 2px;
    padding: 15px 60px;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-block;
    margin: 15px 30px;
  }
</style>