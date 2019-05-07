<template>
  <nav class="navbar navbar-light bg-faded">
    <router-link to="/" class="navbar-brand">
      <label>
        Kanban Board
        <span class="text-uppercase" v-show="this.activeBoard"> : {{ boardName }} </span>
      </label>
    </router-link>
    <div class="d-flex justify-content-end" v-if="!isLoading">
      <TaskListRestore></TaskListRestore>
      <TaskListEdit></TaskListEdit>
      <TaskBoardEdit></TaskBoardEdit>
      <TaskListArchive></TaskListArchive>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex"
import TaskBoardEdit from "@/components/Boards/TaskBoardEdit"
import TaskListEdit from "@/components/Lists/TaskListEdit"
import TaskListRestore from "@/components/Lists/TaskListRestore"
import TaskListArchive from "@/components/Lists/TaskListArchive"
export default {
  components: {
    TaskBoardEdit,
    TaskListEdit,
    TaskListRestore,
    TaskListArchive
  },
  computed: {
    ...mapGetters({
      activeBoard: "activeBoard",
      isLoading: "isLoading"
    }),
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ""
    }
  }
}
</script>
