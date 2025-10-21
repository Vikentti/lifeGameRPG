import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // route("test", "routes/testPage.tsx"),
  // route("bosses/:bossID", "routes/testPage.tsx"),
  route("allTasks", "routes/AllTasksPage/AllTasksPage.tsx"),
  route("task/:taskId", "routes/TasksDetails/TasksDetails.tsx")
] satisfies RouteConfig;
