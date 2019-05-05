import { mapActions } from "vuex"
export default {
 props: ["item", "list", "board"],
 computed: {
  shouldUseDragHandle() {
   return this.isDesktop ? false : true
  },
  isExistingItem() {
   return this.item.id > 0
  }
 },
 data() {
  return {
   isEditing: false,
   form: {
    id: "",
    text: ""
   }
  }
 },
 methods: {
  ...mapActions({
   saveListItem: "saveListItem",
   deleteListItem: "deleteListItem"
  }),
  startEditing() {
   this.form.id = this.item.id
   this.form.text = this.item.text
   this.isEditing = true
   this.$emit("item-editing")
  },

  clearForm() {
   this.form.id = ""
   this.form.text = ""
  },
  save() {
   const scope = "item-form"
   this.$validator.validateAll(scope).then(result => {
    if (result) {
     const updatedItem = {
      id: this.form.id,
      text: this.form.text
     }
     this.saveListItem({
      boardId: this.board.id,
      listId: this.list.id,
      item: updatedItem
     })
     this.isEditing = false
     this.$emit("item-edited")
     this.$validator.reset()
    }
   })
  },
  cancel() {
   this.isEditing = false
   this.$emit("item-cancelled")
  },
  remove() {
   this.deleteListItem({
    boardId: this.board.id,
    listId: this.list.id,
    item: this.item
   })
   this.$emit("item-deleted")
  }
 }
}
