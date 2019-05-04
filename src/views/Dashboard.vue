<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h4 class="my-3">Active Boards</h4>
      </div>
    </div>
    <div class="row equal">
      <div class="col-xs-12 col-sm-6 col-md-3 d-flex pb-3" v-for="board in unarchivedBoards" :key="board.id">
        <div class="card w-100">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title flex-nowrap">{{ board.name }}</h5>
              <span @click="startBoardEdit(board)">...</span>
            </div>
            <p class="card-text">{{ board.description }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <router-link class="btn btn-sm btn-app mr-2 mb-1" :to="{ name:'board', params: { id: board.id }}">View</router-link>
            <button class="btn btn-sm btn-danger mb-1" @click="archiveBoard({ boardId: board.id })">Archive</button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="this.archivedBoards.length > 0">
      <div class="col">
        <h4 class="my-3">Archived Boards</h4>
      </div>
    </div>
    <div class="row equal" v-show="this.archivedBoards.length > 0">
      <div class="col-xs-12 col-sm-6 col-md-3 d-flex pb-3" v-for="board in archivedBoards" :key="board.id">
        <div class="card w-100">
          <div class="card-body">
            <h5 class="card-title flex-nowrap">{{ board.name }}</h5>
            <p class="card-text">{{ board.description }}</p>
          </div>
          <div class="card-footer bg-transparent text-center">
            <button class="btn btn-sm btn-success" @click="unArchiveBoard({ boardId: board.id })">Restore</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import {
    Bus
  } from '@/utils/bus'
  export default {
    computed: {
      ...mapGetters({
        boards: 'allBoards'
      }),
      unarchivedBoards() {
        return this.boards.filter(b => !b.archived)
      },
      archivedBoards() {
        return this.boards.filter(b => b.archived)
      }
    },
    methods: {
      ...mapActions({
        setActiveBoard: 'setActiveBoard',
        archiveBoard: 'archiveBoard',
        unArchiveBoard: 'unArchiveBoard',
      }),
      startBoardEdit(board) {
        Bus.$emit('edit-board', board)
      }
    },
    async created() {
      await this.setActiveBoard({
        board: null
      })
    },
  }
</script>
<style scoped>
  .card {
    background-color: rgb(96, 125, 139, 0.2) !important;
  }

  a.btn-app {
text-decoration: none !important;
}
</style>