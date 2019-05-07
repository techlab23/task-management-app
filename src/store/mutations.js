import Vue from "vue"

// Lib to create guid
const s4 = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
const guid = () => s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()

export default {
  SET_INITIAL_DATA(state, payload) {
    state.boards = payload
  },
  SET_LOADING_STATE(state, payload) {
    state.isLoading = payload
  },
  SAVE_BOARD(state, payload) {
    const board = state.boards.find(b => b.id == payload.id)
    const itemIdx = state.boards.findIndex(b => b.id == payload.id)

    // For existing item
    if (itemIdx > -1) {
      board.name = payload.name
      board.description = payload.description
      Vue.set(state.boards, itemIdx, board)
    }
    // For new item
    else {
      const board = {
        id: guid(),
        name: payload.name,
        description: payload.description,
        archived: false,
        lists: []
      }
      state.boards.push(board)
    }
  },
  ARCHIVE_BOARD(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const boardIdx = state.boards.findIndex(b => b.id == payload.boardId)
    board.archived = true
    Vue.set(state.boards, boardIdx, board)
  },
  RESTORE_BOARD(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const boardIdx = state.boards.findIndex(b => b.id == payload.boardId)
    board.archived = false
    Vue.set(state.boards, boardIdx, board)
  },
  SAVE_LIST(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const list = board.lists.find(l => l.id == payload.listId)
    const listIdx = board.lists.findIndex(l => l.id == payload.listId)

    // For existing item
    if (listIdx > -1) {
      list.name = payload.name
      Vue.set(board.lists, listIdx, list)
    }
    // // For new item
    else {
      const list = {
        id: guid(),
        name: payload.name,
        headerColor: "#607d8b",
        archived: false,
        items: []
      }
      board.lists.push(list)
    }
  },

  ARCHIVE_LIST(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const list = board.lists.find(l => l.id == payload.listId)
    const listIdx = board.lists.findIndex(l => l.id == payload.listId)
    list.archived = true
    Vue.set(board.lists, listIdx, list)
  },
  RESTORE_LIST(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const list = board.lists.find(l => l.id == payload.listId)
    const listIdx = board.lists.findIndex(l => l.id == payload.listId)
    list.archived = false
    Vue.set(board.lists, listIdx, list)
  },

  REORDER_BOARD_LISTS(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    Vue.set(board, "lists", payload.lists)
  },

  REORDER_LIST_ITEMS(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const listIdx = board.lists.findIndex(l => l.id == payload.listId)
    Vue.set(board.lists[listIdx], "items", payload.items)
  },

  SET_ACTIVE_BOARD(state, payload) {
    state.activeBoard = payload.board
  },

  SAVE_LIST_ITEM(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const list = board.lists.find(l => l.id == payload.listId)
    const itemIdx = list.items.findIndex(item => item.id == payload.item.id)

    // For existing item
    if (itemIdx > -1) {
      Vue.set(list.items, itemIdx, payload.item)
    }
    // For new item
    else {
      payload.item.id = guid()
      list.items.push(payload.item)
    }
  },

  DELETE_LIST_ITEM(state, payload) {
    const board = state.boards.find(b => b.id == payload.boardId)
    const list = board.lists.find(l => l.id == payload.listId)
    const itemIdx = list.items.findIndex(item => item.id == payload.item.id)
    // For existing item
    if (itemIdx > -1) {
      Vue.delete(list.items, itemIdx)
    }
  }
}
