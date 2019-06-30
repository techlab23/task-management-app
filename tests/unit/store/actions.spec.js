import axios from "axios"
import actions from "@/store/actions"
jest.mock("axios")

describe("Test actions", () => {
  const commit = jest.fn()
  const payload = {}

  it("fetchData", async () => {
    const boards = [{}, {}]
    const response = { data: { boards } }
    axios.get.mockResolvedValue(response)

    await actions.fetchData({ commit })
    expect(commit).toHaveBeenCalledWith("SET_LOADING_STATE", true)
    expect(commit).toHaveBeenCalledWith("SET_INITIAL_DATA", { boards })
    expect(commit).toHaveBeenCalledWith("SET_LOADING_STATE", false)
  })

  it("saveTaskBoard", async () => {
    await actions.saveTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SAVE_TASKBOARD", payload)
  })

  it("archiveTaskBoard", async () => {
    await actions.archiveTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("ARCHIVE_TASKBOARD", payload)
  })
  it("restoreTaskBoard", async () => {
    await actions.restoreTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("RESTORE_TASKBOARD", payload)
  })

  it("setActiveTaskBoard", async () => {
    await actions.setActiveTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SET_ACTIVE_TASKBOARD", payload)
  })

  it("saveTaskList", async () => {
    await actions.saveTaskList({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SAVE_TASKLIST", payload)
  })

  it("archiveTaskList", async () => {
    await actions.archiveTaskList({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("ARCHIVE_TASKLIST", payload)
  })

  it("restoreTaskList", async () => {
    await actions.restoreTaskList({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("RESTORE_TASKLIST", payload)
  })

  it("reorderTaskLists", async () => {
    await actions.reorderTaskLists({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("REORDER_TASKLISTS", payload)
  })

  it("reorderTaskListItems", async () => {
    await actions.reorderTaskListItems({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("REORDER_TASKLIST_ITEMS", payload)
  })

  it("saveTaskListItem", async () => {
    await actions.saveTaskListItem({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SAVE_TASKLIST_ITEM", payload)
  })

  it("deleteTaskListItem", async () => {
    await actions.deleteTaskListItem({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("DELETE_TASKLIST_ITEM", payload)
  })
})
