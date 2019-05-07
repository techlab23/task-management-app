const INITIAL_DATA_URL = "https://raw.githubusercontent.com/techlab23/data-repository/master/boards.json"
import axios from "axios"

export default {
  async fetchData({ commit }) {
    commit("SET_LOADING_STATE", true)
    return axios.get(INITIAL_DATA_URL).then(res => {
      window.setTimeout(() => {
        commit("SET_INITIAL_DATA", res.data)
        commit("SET_LOADING_STATE", false)
      }, 500)
    })
  },
  async saveBoard({ commit }, payload) {
    commit("SAVE_BOARD", payload)
  },
  async archiveBoard({ commit }, payload) {
    commit("ARCHIVE_BOARD", payload)
  },
  async restoreBoard({ commit }, payload) {
    commit("RESTORE_BOARD", payload)
  },

  async saveList({ commit }, payload) {
    commit("SAVE_LIST", payload)
  },
  async archiveList({ commit }, payload) {
    commit("ARCHIVE_LIST", payload)
  },
  async restoreList({ commit }, payload) {
    commit("RESTORE_LIST", payload)
  },

  async reorderBoardLists({ commit }, payload) {
    commit("REORDER_BOARD_LISTS", payload)
  },
  async reorderListItems({ commit }, payload) {
    commit("REORDER_LIST_ITEMS", payload)
  },
  async setActiveBoard({ commit }, payload) {
    commit("SET_ACTIVE_BOARD", payload)
  },
  async saveListItem({ commit }, payload) {
    commit("SAVE_LIST_ITEM", payload)
  },
  async deleteListItem({ commit }, payload) {
    commit("DELETE_LIST_ITEM", payload)
  }
}
