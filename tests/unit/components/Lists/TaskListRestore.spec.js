import TaskListRestore from "@/components/Lists/TaskListRestore.vue"
import DetailsPopup from "@/components/Details/DetailsPopup"
import { shallowMount, mount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("TaskListRestore.vue", () => {
  let $store
  let wrapper

  it("restoreTaskList action is called, when handleTaskListRestore method is executed", () => {
    const list = { id: "222-2", name: "doing", archived: true }

    $store = {
      dispatch: jest.fn(),
      getters: {
        activeBoard: { id: 222, name: "tracker", description: "tracker board", archived: false },
        archivedLists: jest.fn()
      }
    }

    wrapper = shallowMount(TaskListRestore, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    wrapper.vm.handleTaskListRestore(list)
    expect($store.dispatch).toHaveBeenCalledWith("restoreTaskList", {
      boardId: $store.getters.activeBoard.id,
      listId: list.id
    })
  })

  it("Call to close() method is delegated to close method of DetailsPopup component", () => {
    wrapper = mount(TaskListRestore, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    // Find DetailsPopup component and open the popup
    let DetailsPopupComponentWrapper = wrapper.find(DetailsPopup)
    DetailsPopupComponentWrapper.vm.open()

    // Call close() method on  TaskListRestore component
    wrapper.vm.close()

    // Check if open attribute is removed from details html tag
    // close method has delegated and called close() method on
    // DetailsPopup component
    expect(
      wrapper
        .find("details")
        .html()
        .includes("open")
    ).toBe(false)
  })
})

describe("Test boardName computed Property", () => {
  let $store
  let wrapper

  it("boardName returns name of the active board", () => {
    $store = {
      getters: {
        activeBoard: { id: 222, name: "tracker", description: "tracker board", archived: false }
      }
    }

    wrapper = shallowMount(TaskListRestore, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    expect(wrapper.vm.boardName).toBe("tracker")
  })

  it("boardName returns '' if active board is not found", () => {
    $store = {
      getters: {
        activeBoard: null
      }
    }

    wrapper = shallowMount(TaskListRestore, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })

    expect(wrapper.vm.boardName).toEqual("")
  })
})
