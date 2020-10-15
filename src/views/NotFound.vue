<template>
  <teleport to="#content-header">
    <PageHeader>
      <PageTitle> Ops! Page Not found! </PageTitle>
      <PageSubtitle>404</PageSubtitle>
    </PageHeader>
  </teleport>
</template>

<script>
import sendPageView from "../helpers/googleAnalytics.js";

export default {
  mounted() {
    sendPageView("404");
  },
};
</script>

<style>
</style>