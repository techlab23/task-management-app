import TaskBoard from "@/views/TaskBoard.vue"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("TaskBoard.vue", () => {
  let $store
  let wrapper
  let $route = { path: "/boards/:id", name: "task-board", params: { id: 222 } }

  beforeEach(() => {
    $store = {
      dispatch: jest.fn(),
      state: {},
      getters: {
        allBoards: [
          { id: 111, name: "kanban", description: "kanban board", archived: true, lists: [] },
          {
            id: 222,
            name: "tracker",
            description: "tracker board",
            archived: false,
            lists: [
              { id: "222-1", name: "list 1", archived: false, items: [] },
              { id: "222-2", name: "list 1", archived: false, items: [] }
            ]
          }
        ]
      }
    }
    wrapper = shallowMount(TaskBoard, {
      mocks: { $store, $route },
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  it("has correct route link with params", () => {
    expect(wrapper.vm.$route.path).toBe($route.path)
  })

  it("dispatch setActiveTaskBoard action on created life cycle hook", () => {
    expect($store.dispatch).toHaveBeenCalledWith("setActiveTaskBoard", {
      board: $store.getters.allBoards[1]
    })
  })

  it("dispatch reorderTaskLists action when lists computed property is updated", () => {
    const reorderedLists = [
      { id: "222-2", name: "list 1", archived: false, items: [] },
      { id: "222-1", name: "list 1", archived: false, items: [] }
    ]
    wrapper.vm.lists = reorderedLists
    expect($store.dispatch).toHaveBeenCalledWith("reorderTaskLists", { boardId: 222, lists: reorderedLists })
  })
})
