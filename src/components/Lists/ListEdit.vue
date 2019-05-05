<template>
 <DetailsPopup ref="newListPopup" v-show="this.activeBoard" @popup-toggled="handleNewListPopup">
  <template v-slot:handle>
   <span class="nav-item btn btn-sm btn-app mr-2">+ New List</span>
  </template>
  <template v-slot:content>
   <form data-vv-scope="list-form">
    <h4>{{ heading }}</h4>
    <input
     name="listName"
     type="text"
     class="form-control my-1"
     v-model.trim="listForm.name"
     v-validate="'required'"
     data-vv-as="List Name"
     placeholder="Enter your list name"
    />
    <small class="text-danger" style="display:block">{{ errors.first("list-form.listName") }}</small>
    <button class="btn btn-sm btn-app mt-2" @click.prevent="startSaveList">
     Save List
    </button>
   </form>
  </template>
 </DetailsPopup>
</template>
<script>
import DetailsPopup from "@/components/Details/DetailsPopup"
import { mapGetters, mapActions } from "vuex"
import { Bus } from "@/utils/bus"
export default {
 components: {
  DetailsPopup
 },
 data() {
  return {
   listForm: {
    id: "",
    name: ""
   }
  }
 },
 computed: {
  ...mapGetters({
   activeBoard: "activeBoard"
  }),
  boardName() {
   return this.activeBoard ? this.activeBoard.name : ""
  },
  heading() {
   return this.listForm.id ? "Update list name" : "Create new list"
  }
 },
 mounted() {
  Bus.$on("list-edit", list => {
   this.listForm.id = list.id
   this.listForm.name = list.name
   this.$refs.newListPopup.open()
  })
 },
 methods: {
  ...mapActions({
   saveList: "saveList"
  }),
  handleNewListPopup(isOpen) {
   if (!isOpen) {
    this.listForm.id = 0
    this.listForm.name = ""
    this.$validator.reset()
   }
  },
  async startSaveList() {
   this.$validator.validateAll("list-form").then(async result => {
    if (result) {
     await this.saveList({
      boardId: this.activeBoard.id,
      listId: this.listForm.id,
      name: this.listForm.name
     })
     this.$refs.newListPopup.close()
    }
   })
  }
 }
}
</script>
