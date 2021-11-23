<template>
  <label class="el-category">
    <input :disabled="disable" :placeholder="placeholder" @change="click" type="checkbox" v-model="checked">
    {{data.name}}
  </label>
</template>

<script>
  export default {
    name: "Category",
    props: ['data', 'disable', 'placeholder'],
    computed: {
      checked: {
        get: function () {
          return this.data.checked
        },
        set(value) {
          this.$store.dispatch('categories/setCategory', {id: this.data.id, value})
        }
      }
    },
    methods: {
      click() {
        this.$emit('checked', {item: this.data.id, checked: this.checked})
      }
    }
  }
</script>

<style lang="scss">
  .el-category {
    display: block;
    cursor: pointer;
    border: 1px solid #dbdbdb;
    padding: 10px;
    margin: 10px 10px 10px 0;
  }

</style>