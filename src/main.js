import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./routes.js";
import PageHeader from "./components/views/PageHeader.vue";
import PageTitle from "./components/views/PageTitle.vue";
import PageSubtitle from "./components/views/PageSubtitle.vue";

let app = createApp(App);

app.component("PageHeader", PageHeader);
app.component("PageTitle", PageTitle);
app.component("PageSubtitle", PageSubtitle);

app.use(router);

app.mount("#app");
