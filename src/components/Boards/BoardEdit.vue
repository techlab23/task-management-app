<template>
  <!-- New Board Form -->
  <DetailsPopup ref="newBoardPopup" v-show="!this.activeBoard" @popup-toggled="handleNewBoardPopup">
    <template v-slot:handle>
      <span class="nav-item btn btn-sm btn-app mr-2">+ New Board</span>
    </template>
    <template v-slot:content>
      <form data-vv-scope="board-form">
        <h4>{{ heading }}</h4>
        <input name="boardName" type="text" class="form-control my-1" v-model.trim="boardForm.name" v-validate="'required'" data-vv-as="Board Name" placeholder="Enter your board name" />
        <small class="text-danger" style="display:block">{{ errors.first('board-form.boardName') }}</small>
        <textarea name="boardDescription" rows="2" class="form-control my-1" v-model.trim="boardForm.description" v-validate="'required'" data-vv-as="Board Description" placeholder="Enter your board description"></textarea>
        <small class="text-danger" style="display:block">{{ errors.first('board-form.boardDescription') }}</small>
        <button class="btn btn-sm btn-app mt-2" @click.prevent="startSaveBoard">Save Board</button>
      </form>
    </template>
  </DetailsPopup>
</template>
<script>
  import DetailsPopup from '@/components/Details/DetailsPopup'
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    Bus
  } from '@/utils/bus'
  export default {
    components: {
      DetailsPopup
    },
    data() {
      return {
        boardForm: {
          id: '',
          name: '',
          description: ''
        },
      }
    },
    mounted() {
      Bus.$on('edit-board', (board) => {
        this.boardForm.id = board.id
        this.boardForm.name = board.name
        this.boardForm.description = board.description
        this.$refs.newBoardPopup.open()
      })
    },
    computed: {
      ...mapGetters({
        activeBoard: 'activeBoard',
      }),
      heading() {
        return this.boardForm.id ? "Update board information" : "Create new board"
      }
    },
    methods: {
      ...mapActions({
        saveBoard: "saveBoard",
      }),
      handleNewBoardPopup(isOpen) {
        if (!isOpen) {
          this.boardForm.id = 0
          this.boardForm.name = ""
          this.boardForm.description = ""
          this.$validator.reset()
        }
      },
      async startSaveBoard() {
        this.$validator.validateAll('board-form').then((result) => {
          if (result) {
            this.saveBoard({
              id: this.boardForm.id,
              name: this.boardForm.name,
              description: this.boardForm.description
            })
            this.$refs.newBoardPopup.close()
          }
        })
      },
    }
  }
</script>
<style scope>
</style>