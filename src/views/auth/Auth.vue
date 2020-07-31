<template>
  <validation-observer v-slot="{ passes }">
    <form @submit.prevent="passes(submitForm)">
      <div class="form-group row">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <validation-provider name="email" rules="required|email" v-slot="{ errors }">
            <input type="email" class="form-control" id="email" placeholder="Email"
                   v-model="email" :class="{ 'is-invalid': errors[0] || serverErrors.email }"
                   @keypress="removeError('email')">
            <div class="invalid-feedback">{{ errors[0] ? errors[0] : serverErrors.email }}</div>
          </validation-provider>
        </div>
      </div>
      <div class="form-group row">
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <validation-provider name="password" rules="required" v-slot="{ errors }">
            <input type="password" class="form-control" id="password" placeholder="Password"
                   v-model="password" :class="{ 'is-invalid': errors[0] || serverErrors.password }"
                   @keypress="removeError('password')">
            <div class="invalid-feedback">{{ errors[0] ? errors[0] : serverErrors.password }}</div>
          </validation-provider>
        </div>
      </div>
      <validation-provider name="gender" rules="required" v-slot="{ errors }">
        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
            <div class="col-sm-10">
              <div class="form-check" v-for="(genderOption, key) in genders" :key="key">
                <input class="form-check-input" :class="{ 'is-invalid': errors[0] }"
                       v-model="gender"
                       type="radio" name="gridRadios" :id="'gender' + key" :value="genderOption">
                <label class="form-check-label" :for="'gender' + key">{{ genderOption }}</label>
                <div class="invalid-feedback" v-show="key === genders.length - 1">
                  {{ errors[0] }}
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </validation-provider>
      <validation-provider name="terms" :rules="{ required: { allowFalse: false } }"
                           v-slot="{ errors }">
        <div class="form-group row">
          <div class="col-sm-2"></div>
          <div class="col-sm-10">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="checkbox" v-model="checkbox">
              <label class="form-check-label" for="checkbox" :class="{ 'is-invalid': errors[0] }">
                I agree with
                <a href="#" v-b-modal.modal-scrollable>Terms & Conditions</a>
              </label>
              <div class="invalid-feedback">{{ errors[0] }}</div>
            </div>
          </div>
        </div>
      </validation-provider>
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary">Sign in</button>
        </div>
      </div>

      <b-modal id="modal-scrollable" scrollable hide-footer title="Terms & Conditions">
        <p class="my-4" v-for="i in 20" :key="i">
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </b-modal>
    </form>
  </validation-observer>
</template>

<script>
// eslint-disable-next-line import/extensions
import router from '@/routes/index.js';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
  data() {
    return {
      email: '',
      password: '',
      gender: null,
      checkbox: false,
      genders: ['Male', 'Female'],
      serverErrors: [],
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async submitForm() {
      await this.$store.dispatch('auth/register', {
        email: this.email,
        password: this.password,
        gender: this.gender,
      });

      if (this.$store.getters['auth/user']) {
        router.push({ name: 'posts' });
      } else {
        this.serverErrors = this.$store.getters['auth/errors'];
      }
    },
    removeError(field) {
      delete this.serverErrors[field];
    },
  },
  mounted() {
    if (this.$store.getters['auth/user']) {
      router.push({ name: 'posts' });
    }
  },
};
</script>
