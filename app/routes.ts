import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("test", "routes/testPage.tsx"),
  // route("bosses/:bossID", "routes/testPage.tsx"),
  route("bosses", "routes/bossesPage.tsx")
] satisfies RouteConfig;
