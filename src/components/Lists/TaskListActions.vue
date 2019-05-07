<template>
  <DetailsDropdown style="position: absolute;top: 12px;right: 10px;" ref="dropdown">
    <template v-slot:handle
      >...</template
    >
    <template v-slot:content>
      <label class="content-item" @click="showListEditPopup">Edit</label>
      <label class="content-item" @click="showArchiveListPopup">Archive</label>
    </template>
  </DetailsDropdown>
</template>
<script>
import DetailsDropdown from "@/components/Details/DetailsDropdown"
import { Bus } from "@/utils/bus"
export default {
  props: ["board", "list"],
  components: {
    DetailsDropdown
  },
  methods: {
    showListEditPopup() {
      Bus.$emit("tasklist-editing", this.list)
      this.$refs.dropdown.close()
    },
    showArchiveListPopup() {
      Bus.$emit("tasklist-archiving", {
        board: this.board,
        list: this.list
      })
      this.$refs.dropdown.close()
    }
  }
}
</script>
