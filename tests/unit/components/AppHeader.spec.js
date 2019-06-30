import AppHeader from "@/components/AppHeader.vue"
import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import Vuex from "vuex"
const localVue = createLocalVue()
localVue.use(Vuex)

describe("AppHeader.vue", () => {
  let $store
  let wrapper

  it("Displays board name if activeBoard is set", () => {
    $store = {
      dispatch: jest.fn(),
      state: {},
      getters: {
        activeBoard: {
          id: 222,
          name: "tracker",
          description: "tracker board",
          archived: false,
          lists: []
        },
        isLoading: jest.fn()
      }
    }
    wrapper = shallowMount(AppHeader, {
      mocks: { $store },
      stubs: { RouterLink: RouterLinkStub }
    })
    expect(wrapper.text()).toContain("tracker")
  })

  it("display child component stubs when isLoading is false", () => {
    $store = {
      dispatch: jest.fn(),
      state: {},
      getters: {
        isLoading: false,
        activeBoard: {
          id: 222,
          name: "tracker",
          description: "tracker board",
          archived: false,
          lists: [{ id: "222-1", name: "todo" }, { id: "222-2", name: "doing" }]
        }
      }
    }

    wrapper = shallowMount(AppHeader, {
      mocks: { $store },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.contains("tasklistrestore-stub")).toBe(true)
    expect(wrapper.contains("taskboardedit-stub")).toBe(true)
    expect(wrapper.contains("tasklistarchive-stub")).toBe(true)
    expect(wrapper.contains("tasklistedit-stub")).toBe(true)
  })

  it("does not render child component stubs when isLoading is true", () => {
    $store = {
      dispatch: jest.fn(),
      state: {},
      getters: {
        isLoading: true,
        activeBoard: {
          id: 222,
          name: "tracker",
          description: "tracker board",
          archived: false,
          lists: [{ id: "222-1", name: "todo" }, { id: "222-2", name: "doing" }]
        }
      }
    }

    wrapper = shallowMount(AppHeader, {
      mocks: { $store },
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    expect(wrapper.contains("tasklistrestore-stub")).toBe(false)
    expect(wrapper.contains("taskboardedit-stub")).toBe(false)
    expect(wrapper.contains("tasklistarchive-stub")).toBe(false)
    expect(wrapper.contains("tasklistedit-stub")).toBe(false)
  })
})
