<template>
  <DetailsPopup style="position: absolute;top: 12px;right: 10px;" ref="popup">
    <template v-slot:content v-if="board && list">
      <h4>Do you want to archive {{ list.name }} list?</h4>
      <button class="btn btn-sm btn-danger" @click="handleTaskListArchive(list)">
        Yes, please
      </button>
    </template>
  </DetailsPopup>
</template>
<script>
import DetailsPopup from "@/components/Details/DetailsPopup"
import { mapActions } from "vuex"
import { Bus } from "@/utils/bus"
export default {
  components: {
    DetailsPopup
  },
  data() {
    return {
      board: null,
      list: null
    }
  },
  mounted() {
    Bus.$on("tasklist-archiving", this.handleTaskListArchiving)
  },
  methods: {
    ...mapActions({
      archiveTaskList: "archiveTaskList"
    }),
    handleTaskListArchive() {
      this.archiveTaskList({
        boardId: this.board.id,
        listId: this.list.id
      })
      this.$refs.popup.close()
    },
    handleTaskListArchiving(data) {
      this.board = data.board
      this.list = data.list
      this.$refs.popup.open()
    }
  }
}
</script>
