<template>
  <nav class="navbar navbar-light bg-faded">
    <router-link to="/" class="navbar-brand">
      <label>Kanban Board <span class="text-uppercase" v-show="this.activeBoard">: {{ boardName }}</span></label>
    </router-link>
    <div class="d-flex justify-content-end" v-if="!isLoading">
      <RestoreLists></RestoreLists>
      <ListEdit></ListEdit>
      <BoardEdit></BoardEdit>
      <ArchiveList></ArchiveList>
    </div>
  </nav>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  import BoardEdit from '@/components/Boards/BoardEdit'
  import ListEdit from '@/components/Lists/ListEdit'
  import RestoreLists from '@/components/Lists/RestoreLists'
  import ArchiveList from '@/components/Lists/ArchiveList'
  export default {
    components: {
      BoardEdit,
      ListEdit,
      RestoreLists,
      ArchiveList
    },
    computed: {
      ...mapGetters({
        activeBoard: 'activeBoard',
        isLoading: 'isLoading'
      }),
      boardName() {
        return this.activeBoard ? this.activeBoard.name : ''
      }
    },
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Gugi');

  .navbar-brand {
    font-family: 'Gugi', cursive;
    font-size: 50px;
    font-weight: 600;
    color: #2196f3 !important;
    padding-top: 0px;
    padding-bottom: 0px;
    line-height: 1em;
  }

  .navbar-brand>label {
    font-size: 20px;
    line-height: 1em;
    vertical-align: middle;
    color: #a2b3bb;
  }

  .navbar-brand label span {
    color: #39515d;
  }
</style>