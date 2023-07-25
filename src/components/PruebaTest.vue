<template>
  <input
    v-model="input"
    @input="updateInput" 
    @change="updateInput"
  />

</template>

<script>
  export default {
  props: {
    value: {
      type: String,
      default: 'kevin',
    },
  },
  data() {
    return {
      input: '',
    };
  },
  watch: {
    value: {
      handler(after) {
        this.input = after;
      },
      immediate: true,
    },
  },
  methods: {
    updateInput() {
      this.$emit('input', this.input);
    },
  },
};
</script>