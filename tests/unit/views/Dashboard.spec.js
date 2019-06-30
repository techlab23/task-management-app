import Dashboard from "@/views/Dashboard.vue"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("Dashboard.vue", () => {
  let $store
  let wrapper

  beforeEach(() => {
    $store = {
      dispatch: jest.fn(),
      state: {},
      getters: {
        archivedBoards: [{ id: 111, name: "kanban", description: "kanban board", archived: true }],
        unarchivedBoards: [{ id: 222, name: "tracker", description: "tracker board", archived: false }]
      }
    }
    wrapper = shallowMount(Dashboard, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  it("dispatch setActiveTaskBoard action on created life cycle hook", () => {
    expect($store.dispatch).toHaveBeenCalledWith("setActiveTaskBoard", { board: null })
  })

  it("Renders the markup with the data", () => {
    expect(wrapper.text()).toContain("kanban")
    expect(wrapper.text()).toContain("tracker")
    expect(wrapper.find(RouterLinkStub).props().to).toEqual({ name: "task-board", params: { id: 222 } })
  })

  it("dispatch archiveTaskBoard action on Archive button click handler", () => {
    const boardItems = wrapper.findAll(".board-item")
    const archiveButton = boardItems.at(0).find("button")
    archiveButton.trigger("click")
    expect(archiveButton.text()).toContain("Archive")
    expect($store.dispatch).toHaveBeenCalledWith("archiveTaskBoard", { boardId: 222 })
  })

  it("dispatch unarchiveTaskBoard action on Restore button click handler", () => {
    const boardItems = wrapper.findAll(".board-item")
    const restoreButton = boardItems.at(1).find("button")
    restoreButton.trigger("click")
    expect(restoreButton.text()).toContain("Restore")
    expect($store.dispatch).toHaveBeenCalledWith("restoreTaskBoard", { boardId: 111 })
  })
})

