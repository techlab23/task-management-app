import getters from "@/store/getters"

describe("Vuex Getters", () => {
  let state

  beforeEach(() => {
    state = {
      isLoading: true,
      activeBoard: {
        id: "1234",
        archived: false,
        lists: [
          {
            id: "1234-1",
            name: "Todo",
            headerColor: "#607d8b",
            archived: false,
            items: []
          }
        ]
      },
      boards: [
        {
          id: "123",
          archived: true,
          lists: [
            {
              id: "123-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: []
            },
            {
              id: "123-2",
              name: "Doing",
              headerColor: "#607d8b",
              archived: false,
              items: []
            }
          ]
        },
        {
          id: "1234",
          archived: false,
          lists: [
            {
              id: "1234-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: []
            }
          ]
        }
      ]
    }
  })

  it("isLoading", () => {
    expect(getters.isLoading(state)).toBe(true)
  })
  it("allBoards", () => {
    expect(getters.allBoards(state)).toBe(state.boards)
  })
  it("activeBoard", () => {
    expect(getters.activeBoard(state)).toBe(state.activeBoard)
  })
  it("unarchivedBoards", () => {
    const received = getters.unarchivedBoards(state)
    const expected = state.boards.filter(b => !b.archived)
    expect(received).toEqual(expected)
  })
  it("archivedBoards", () => {
    const received = getters.archivedBoards(state)
    const expected = state.boards.filter(b => b.archived)
    expect(received).toEqual(expected)
  })
  it("archivedLists", () => {
    const received = getters.archivedLists(state)
    const expected = state.activeBoard.lists.filter(l => l.archived)
    expect(received).toEqual(expected)
  })
  it("unarchivedLists", () => {
    const received = getters.unarchivedLists(state)
    const expected = state.activeBoard.lists.filter(l => !l.archived)
    expect(received).toEqual(expected)
  })
})
