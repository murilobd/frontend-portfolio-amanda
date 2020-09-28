<template>
  <teleport to="#content-header">
    <PageHeader>
      <PageTitle> Contact </PageTitle>
      <PageSubtitle> Get in touch with me </PageSubtitle>
    </PageHeader>
  </teleport>
  <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
    <div class="sm:col-span-6">
      <label
        for="first_name"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Name
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <input
          id="first_name"
          class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <div class="sm:col-span-6">
      <label
        for="email"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Email address
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <input
          id="email"
          type="email"
          class="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        />
      </div>
    </div>
    <div class="sm:col-span-6">
      <label
        for="about"
        class="block text-sm font-medium leading-5 text-gray-700"
      >
        Message
      </label>
      <div class="mt-1 rounded-md shadow-sm">
        <textarea
          id="about"
          rows="3"
          class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>