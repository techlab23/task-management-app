import TaskListArchive from "@/components/Lists/TaskListArchive.vue"
import { shallowMount, mount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

import { Bus } from "@/utils/bus"
Bus.$on = jest.fn()

describe("TaskListArchive.vue", () => {
  let $store
  let wrapper
  let data

  beforeEach(() => {
    $store = {
      dispatch: jest.fn()
    }

    data = {
      board: { id: "222" },
      list: { id: "222-2" }
    }

    wrapper = mount(TaskListArchive, {
      localVue,
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    wrapper.setData(data)
  })

  it("component is listening to 'tasklist-archiving' on event bus", () => {
    Bus.$emit("tasklist-archiving", data)
    expect(Bus.$on).toHaveBeenCalledWith("tasklist-archiving", wrapper.vm.handleTaskListArchiving)
  })

  it("archiveTaskList action is called, when handleTaskListArchive method is executed", () => {
    wrapper.vm.handleTaskListArchive()

    expect($store.dispatch).toHaveBeenCalledWith("archiveTaskList", {
      boardId: data.board.id,
      listId: data.list.id
    })
  })

  it("use handleTaskListArchiving to set the data needed for popup", () => {
    wrapper.vm.handleTaskListArchiving(data)
    expect(wrapper.vm.board).toBe(data.board)
    expect(wrapper.vm.list).toBe(data.list)
  })
})
