<template>
  <Field as="input" class="input" v-model="data" :name="inputName" :placeholder="placeholder" :class="{'invalid':  isInvalid, 'success': success}" />
</template>

<script setup lang="ts">
import { useField, Field } from "vee-validate";
import { toRef } from "vue";

const props = defineProps({
  placeholder: String,
  isInvalid: Boolean,
  success: Boolean,
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: "",
  }
});
const data = props.value;

const inputName = toRef(props, "name");
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(inputName, undefined, {
      initialValue: props.value,
    });
</script>

<style scoped>
.input {
  min-width: 27vh;
  min-height: 42px;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
  text-indent: 20px;


}

  .input:focus {
    outline: none;
  }
  .input.primary {
    border: 1px solid gray;
  }

  .input.invalid {
    border: 1px solid red;
  }

  .input.success {
        border: 1px solid green;
  }
</style>