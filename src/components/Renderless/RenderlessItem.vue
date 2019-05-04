<script>
  export default {
    props: ['item'],
    data() {
      return {
        isEditing: false,
        form: {
          id: '',
          text: ''
        }
      }
    },
    computed: {
      shouldUseDragHandle() {
        return this.isDesktop ? false : true
      }
    },
    methods: {
      handleEdit() {
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
        let updatedItem = {
          id: this.form.id,
          text: this.form.text
        }
        this.isEditing = false
        this.$emit("item-edited", updatedItem)
      },
      cancel() {
        this.isEditing = false
        this.$emit("item-cancelled")
      },
      removeItem(item) {
        this.$emit('item-removed', item)
      }
    },
    render() {
      return this.$scopedSlots.default({
        item: this.item,
        isEditing: this.isEditing,
        startEditing: this.handleEdit,
        save: this.save,
        cancel: this.cancel,
        shouldUseDragHandle: this.shouldUseDragHandle,
        inputProps: {
          value: this.form.text
        },
        inputEvents: {
          input: e => this.form.text = e.target.value
        },
        removeButtonEvents: item => ({
          click: () => {
            this.removeItem(item)
          }
        }),
      })
    }
  }
</script>