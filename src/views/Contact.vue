<template>
  <teleport to="#content-header">
    <PageHeader>
      <PageTitle> Contact </PageTitle>
      <PageSubtitle> Get in touch with me </PageSubtitle>
    </PageHeader>
  </teleport>

  <Notification :type="formSubmitedStatus" v-if="formSubmitedStatus">
    <span v-if="formSubmitedStatus === 'success'">
      Your message was sent!
    </span>
    <span v-if="formSubmitedStatus === 'danger'"> Failed sending message </span>
  </Notification>

  <form
    name="contact"
    data-netlify="true"
    method="POST"
    class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 mt-4"
    @submit.prevent="submitForm"
    ref="form"
  >
    <input type="hidden" name="form-name" value="contact" />
    <div class="sm:col-span-2">
      <label
        for="name"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Your name
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          id="name"
          name="name"
          class="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
          v-model="form.name"
          required
        />
      </div>
    </div>
    <div class="sm:col-span-2">
      <label
        for="email"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        E-mail address
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          type="email"
          id="email"
          name="email"
          class="form-input py-3 px-4 block w-full transition ease-in-out duration-150"
          v-model="form.email"
          required
        />
      </div>
    </div>
    <div class="sm:col-span-2">
      <label
        for="message"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Message
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <textarea
          id="message"
          name="message"
          rows="4"
          class="form-textarea py-3 px-4 block w-full transition ease-in-out duration-150"
          v-model="form.message"
          required
        ></textarea>
      </div>
    </div>

    <div class="sm:col-span-2">
      <span class="w-full inline-flex rounded-md shadow-sm">
        <button
          type="submit"
          class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          Send
        </button>
      </span>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import Notification from "../components/Notification.vue";

export default {
  name: "Contact",

  data() {
    return {
      formSubmitedStatus: null,
      form: {
        name: null,
        email: null,
        message: null,
      },
    };
  },

  mounted() {
    this.$refs.form.reset();
    window.snapshot && window.snapshot(); // tells pre-render page is ready
  },

  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },

    submitForm() {
      this.formSubmitedStatus = null;

      axios
        .post(
          "/",
          this.encode({
            "form-name": "contact",
            ...this.form,
          }),
          {
            header: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        )
        .then(() => {
          this.formSubmitedStatus = "success";
          this.$refs.form.reset();
        })
        .catch(() => {
          this.formSubmitedStatus = "danger";
        });
    },
  },

  components: {
    Notification,
  },
};
</script>

<style>
</style>