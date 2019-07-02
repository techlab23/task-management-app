import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
import Dashboard from "@/views/Dashboard.vue"
import TaskBoard from "@/views/TaskBoard.vue"
import routes from "@/router/routes"
const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe("App", () => {
  let $store
  let wrapper
  const allBoards = [
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

  beforeEach(() => {
    $store = {
      dispatch: jest.fn(),
      getters: {
        archivedBoards: [allBoards[0]],
        unarchivedBoards: [allBoards[0]],
        isLoading: false,
        allBoards: allBoards
      }
    }
  })

  it("calls fetchData to load initial data", async () => {
    const router = new VueRouter({ routes })
    const wrapper = shallowMount(App, {
      localVue,
      router,
      mocks: { $store },
      stubs: { AppHeader: true, AppLoadingIndicator: true, Dashboard: true }
    })
    expect($store.dispatch).toHaveBeenCalledWith("fetchData")
  })

  it("renders dashboard component", () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, {
      localVue,
      router,
      mocks: { $store },
      stubs: { AppHeader: true, AppLoadingIndicator: true }
    })

    router.push("/dashboard")
    expect(wrapper.find(Dashboard).exists()).toBe(true)
  })

  it("renders board component", () => {
    const router = new VueRouter({ routes })
    const wrapper = mount(App, {
      localVue,
      router,
      mocks: { $store },
      stubs: { AppHeader: true, AppLoadingIndicator: true }
    })

    router.push("/boards/222")
    expect(wrapper.find(TaskBoard).exists()).toBe(true)
  })
})
