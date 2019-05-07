<template>
  <div class="scrolling-wrapper">
    <draggable
      v-model="lists"
      :handle="getDragHandle"
      :disabled="!shouldAllowListOrder"
      group="kanban-board-lists"
      class="row flex-nowrap mt-1"
    >
      <TaskList v-for="(listItem, index) in lists" :key="index" :board="getBoard" :list="listItem"></TaskList>
    </draggable>
  </div>
</template>
<script>
import TaskList from "@/components/Lists/TaskList"
import Draggable from "vuedraggable"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Board",
  components: {
    TaskList,
    Draggable
  },
  computed: {
    ...mapGetters({
      boards: "allBoards",
      isLoading: "isLoading"
    }),
    param() {
      return this.$route.params.id
    },
    shouldAllowListOrder() {
      return this.isDesktop || this.isTablet
    },
    getDragHandle() {
      return this.isMobile ? "" : ".heading"
    },
    getBoard() {
      return this.boards.find(b => b.id == this.param)
    },
    lists: {
      get() {
        return this.getBoard ? this.getBoard.lists.filter(l => !l.archived) : []
      },
      async set(value) {
        await this.reorderBoardLists({
          boardId: this.param,
          lists: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      reorderBoardLists: "reorderBoardLists",
      setActiveBoard: "setActiveBoard"
    })
  },
  created() {
    if (this.getBoard) {
      this.setActiveBoard({
        board: this.getBoard
      })
    }
  }
}
</script>
