import {index, route,type RouteConfig} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("allTasks", "routes/AllTasksPage/AllTasksPage.tsx"),
  route("task/:taskId", "routes/TasksDetails/TasksDetails.tsx"),
  route("dailyQuests", "routes/DailyQuest.tsx"),
] satisfies RouteConfig;
