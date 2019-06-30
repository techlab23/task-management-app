import TaskList from "@/components/lists/TaskList.vue"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("TaskList.vue", () => {
  let $store
  let wrapper
  let board

  beforeEach(() => {
    board = {
      id: 222,
      name: "tracker",
      description: "tracker board",
      archived: false,
      lists: [
        { id: "222-1", name: "todo", archived: false, headerColor: "#ddd", items: [] },
        {
          id: "222-2",
          name: "doing",
          archived: false,
          headerColor: "#ddd",
          items: [
            { id: "222-2-1", text: "This is a list item #1" },
            { id: "222-2-2", text: "This is a list item #2" },
            { id: "222-2-3", text: "This is a list item #3" }
          ]
        }
      ]
    }

    $store = {
      dispatch: jest.fn()
    }

    wrapper = shallowMount(TaskList, {
      data() {
        return {
          isDesktop: true,
          isTablet: false
        }
      },
      propsData: { board: board, list: board.lists[1] },
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })
  })

  it("dispatch reorderTaskListItems action when items computed property is updated", () => {
    const listItems = [
      { id: "222-2-2", text: "This is a list item #2" },
      { id: "222-2-1", text: "This is a list item #1" },
      { id: "222-2-3", text: "This is a list item #3" }
    ]
    wrapper.vm.items = listItems
    expect($store.dispatch).toHaveBeenCalledWith("reorderTaskListItems", {
      boardId: board.id,
      listId: board.lists[1].id,
      items: listItems
    })
  })

  it("Should allow task items reorder on desktop or tablet", () => {
    wrapper.vm.isDesktop = true
    wrapper.vm.isTablet = false
    expect(wrapper.vm.shouldAllowTaskItemsReorder).toBe(true)
  })

  it("Should not allow task items reorder if not on desktop or tablet", () => {
    wrapper.vm.isDesktop = false
    wrapper.vm.isTablet = false
    expect(wrapper.vm.shouldAllowTaskItemsReorder).toBe(false)
  })

  it("Disable drag option while editing an list item", () => {
    wrapper.vm.itemEditing()
    wrapper.vm.isDesktop = true
    wrapper.vm.isTablet = true
    expect(wrapper.vm.dragOptions.disabled).toBe(true)
  })

  it("Enable drag option when list item is edited", () => {
    wrapper.vm.itemEdited()
    wrapper.vm.isDesktop = true
    wrapper.vm.isTablet = true
    expect(wrapper.vm.dragOptions.disabled).toBe(false)
  })

  it("Enable drag option when list item is edited", () => {
    wrapper.vm.itemCancelled()
    wrapper.vm.isDesktop = true
    wrapper.vm.isTablet = true
    expect(wrapper.vm.dragOptions.disabled).toBe(false)
  })
})
