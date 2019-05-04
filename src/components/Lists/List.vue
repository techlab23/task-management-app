<template>
  <div class="col-3 list-width">
    <div class="heading" :style="{ backgroundColor: list.headerColor }">
      <h4 class="text-center">{{ list.name }}</h4>
      <ListActions :board="board" :list="list"></ListActions>
    </div>
    <div class="cards cards-list" :data-type="list.name">
      <draggable v-model="items" :handle="shouldUseDragHandle" :disabled="isEditing" group="kanban-board-list-items">
        <EditItem v-for="item in items" :item="item" :list="list" :board="board" :key="item.id" @item-edited="itemEdited" @item-cancelled="itemCancelled" @item-editing="itemEditing"></EditItem>
      </draggable>
      <NewItem class="fixed-card" :item="defaultItem" :list="list" :board="board" @item-edited="itemEdited" @item-cancelled="itemCancelled" @item-editing="itemEditing"></NewItem>
    </div>
  </div>
</template>
<script>
  import EditItem from "@/components/Items/EditItem"
  import NewItem from "@/components/Items/NewItem"
  import Draggable from "vuedraggable";
  import ListActions from '@/components/Lists/ListActions'
  import {
    mapActions
  } from 'vuex'
  import {
    Bus
  } from '@/utils/bus'
  export default {
    components: {
      EditItem,
      NewItem,
      Draggable,
      ListActions
    },
    props: ["board", "list"],
    data() {
      return {
        isEditing: false,
      };
    },
    computed: {
      defaultItem() {
        return {
          id: 0,
          text: ''
        };
      },
      shouldUseDragHandle() {
        return this.isDesktop ? "" : ".drag-handle";
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
        reorderListItems: "reorderListItems",
        archiveList: "archiveList",
      }),
      itemEditing() {
        this.isEditing = true;
      },
      itemEdited() {
        this.isEditing = false;
      },
      itemCancelled() {
        this.isEditing = false;
      },
      archiveSelectedList() {
        this.archiveList({
          boardId: this.board.id,
          listId: this.list.id
        })
        this.$refs.popup.close()
      },
      showArchiveListPopup() {
        Bus.$emit('archive-list')
      },
      showListEditPopup() {
        this.$refs.dropdown.close()
        Bus.$emit('edit-list', this.list)
      },
      popupToggled() {
        const isOpen = this.$refs.details.getAttribute('open') !== null ? true : false
        this.$emit('popup-toggled', isOpen)
      }
    }
  };
</script>
<style>
  h4 {
    font-size: 1.4rem !important;
  }

  .col-3 {
    padding: 0 !important;
    margin: 0 15px;
  }

  .heading {
    padding: 15px 0 5px 0;
    color: rgba(255, 255, 255, 0.8);
    font-family: 'Gugi', cursive;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-transform: uppercase;
    cursor: grab;
  }

  .cards-list {
    min-height: 300px;
    height: 100vh;
    overflow: scroll;
    box-shadow: 1px 1px 1px 0px rgba(158, 158, 158, 0.25);
    background-color: rgba(223, 238, 242, 0.4);
  }

  .fixed-card {
    cursor: pointer;
    color: #ccc;
    border: 1px dotted #ccc;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .list-width {
    min-width: 300px;
    max-width: 300px;
    border-radius: 10px;
  }
</style>