export default {
  isLoading: state => state.isLoading,
  allBoards: state => state.boards,
  activeBoard: state => state.activeBoard,
  archivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
  unArchivedLists: state => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : [])
}
