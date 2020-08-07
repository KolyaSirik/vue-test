<template>
  <div>
    <h1 class="text-center">Hello</h1>

    <p v-show="!notificationsEnabled">Notifications not enabled!</p>

    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Notification text:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          type="text"
          v-model="text"
          :disabled="!notificationsEnabled"
          required
          placeholder="Text..."
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="!notificationsEnabled || !text">
        Send notification
      </b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      notificationsEnabled: false,
      text: '',
    };
  },
  methods: {
    onSubmit() {
      axios.post('/send', { title: this.text });
    },
  },
  created() {
    const vm = this;

    if (navigator.serviceWorker) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.pushManager) {
          reg.pushManager.getSubscription()
            .then((subscription) => {
              if (subscription) {
                vm.notificationsEnabled = true;
              }
            });
        }
      });
    }
  },
};
</script>
