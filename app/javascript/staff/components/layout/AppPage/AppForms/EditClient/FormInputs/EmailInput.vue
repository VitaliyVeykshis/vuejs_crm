<template lang='pug'>
  q-input(
    ref='email'
    type='email'
    label='Электронная почта'
    v-model='email'
    dense
    color='secondary'
    :loading="loading"
    :error="!isValid"
    @blur='validateInputValue'
  )#email
    template(v-slot:error) {{errors[0] | capitalize}}
</template>

<script>
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  props: {
    inputErrors: {
      type: Array,
      default: () => [],
    },
    value: { type: String, default: '' },
  },
  data() {
    return {
      loading: false,
      email: '',
      errors: [],
    };
  },
  computed: {
    isValid() {
      return this.errors.length === 0;
    },
  },
  watch: {
    inputErrors() {
      this.errors = this.inputErrors;
    },
    value() {
      this.email = this.value;
    },
  },
  methods: {
    validateInputValue() {
      this.errors = [];
      if (this.frontEndValidation()) {
        this.serverValidation();
        this.passEmailToDashboard();
      }
    },
    frontEndValidation() {
      return this.validateNotEmpty() && this.validateEmailFromat();
    },
    validateNotEmpty() {
      if (!this.notEmpty()) {
        this.errors.push('Не может быть пустым');
      }
      return this.notEmpty();
    },
    notEmpty() {
      return this.email.length !== 0;
    },
    validateEmailFromat() {
      if (!this.isValidEmail()) {
        this.errors.push('Имеет неверное значение');
      }
      return this.isValidEmail();
    },
    isValidEmail() {
      return emailRegex.test(this.email);
    },
    serverValidation() {
      this.loading = true;
      this.$api.clients
        .validate({ email: this.email })
        .then(
          () => {},
          (errors) => {
            this.errors = errors.response.data.email;
          },
        )
        .finally(() => {
          this.loading = false;
        });
    },
    passEmailToDashboard() {
      this.$emit('blur', this.email);
    },
  },
};
</script>

<style scoped lang="scss">
label {
  color: #34495e;
}
</style>
