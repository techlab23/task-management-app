import Dashboard from "@/views/Dashboard.vue"
import TaskBoard from "@/views/TaskBoard.vue"

export default [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/boards/:id",
    name: "task-board",
    component: TaskBoard
  }
]
