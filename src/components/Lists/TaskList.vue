<template>
  <div class="col-3 list-column list-width">
    <div class="heading" :style="{ backgroundColor: list.headerColor }">
      <h4 class="heading-text text-center">{{ list.name }}</h4>
      <TaskListActions :board="board" :list="list"></TaskListActions>
    </div>
    <div class="cards cards-list">
      <draggable v-model="items" :disabled="isEditing" group="kanban-board-list-items">
        <TaskListItem
          v-for="item in items"
          :item="item"
          :list="list"
          :board="board"
          :key="item.id"
          @item-edited="itemEdited"
          @item-cancelled="itemCancelled"
          @item-editing="itemEditing"
        ></TaskListItem>
      </draggable>
      <TaskListItem
        class="fixed-card"
        :item="defaultItem"
        :list="list"
        :board="board"
        @item-edited="itemEdited"
        @item-cancelled="itemCancelled"
        @item-editing="itemEditing"
      ></TaskListItem>
    </div>
  </div>
</template>
<script>
import Draggable from "vuedraggable"
import TaskListActions from "@/components/Lists/TaskListActions"
import TaskListItem from "@/components/Items/TaskListItem"
import { mapActions } from "vuex"
export default {
  components: {
    TaskListItem,
    TaskListActions,
    Draggable
  },
  props: ["board", "list"],
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    defaultItem() {
      return {
        id: "",
        text: ""
      }
    },
    items: {
      get() {
        return this.list.items
      },
      set(reorderedListItems) {
        const payload = {
          boardId: this.board.id,
          listId: this.list.id,
          items: reorderedListItems
        }
        this.reorderListItems(payload)
      }
    }
  },
  methods: {
    ...mapActions({
      reorderListItems: "reorderListItems"
    }),
    itemEditing() {
      this.isEditing = true
    },
    itemEdited() {
      this.isEditing = false
    },
    itemCancelled() {
      this.isEditing = false
    }
  }
}
</script>
