import mutations from "@/store/mutations"

describe("SET_INITIAL_DATA", () => {
  const state = {
    boards: []
  }
  it("Update state with boards information in payload", () => {
    const boards = [{}, {}]
    mutations.SET_INITIAL_DATA(state, boards)
    expect(state.boards).toBe(boards)
  })
})

describe("SET_LOADING_STATE", () => {
  const state = {
    isLoading: false
  }

  it("Set loading state", () => {
    const loadingState = true
    mutations.SET_LOADING_STATE(state, loadingState)
    expect(state.isLoading).toBe(loadingState)
  })
})

describe("SAVE_TASKBOARD", () => {
  let state

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          name: "project tracker",
          description: "project tracker board",
          archived: false,
          lists: []
        }
      ]
    }
  })

  it("Can save a new board", () => {
    const newBoard = {
      id: "321",
      name: "kanban board",
      description: "kanban project tracker board",
      archived: false,
      lists: []
    }
    mutations.SAVE_TASKBOARD(state, newBoard)
    expect(state.boards.length).toBe(2)
  })

  it("Can update an existing board", () => {
    const existingBoard = {
      id: "123",
      name: "project tracker board name",
      description: "project tracker board description",
      archived: false,
      lists: []
    }
    mutations.SAVE_TASKBOARD(state, existingBoard)
    expect(state.boards.length).toBe(1)
    expect(state.boards[0].name).toBe("project tracker board name")
    expect(state.boards[0].description).toBe("project tracker board description")
  })
})

describe("Archive / Restore Taskboards", () => {
  let state
  const boardId = "123"

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          name: "project tracker",
          description: "project tracker board",
          archived: false,
          lists: []
        }
      ]
    }
  })

  it("Archive an existing task board", () => {
    mutations.ARCHIVE_TASKBOARD(state, { boardId: boardId })
    expect(state.boards[0].archived).toBe(true)
  })

  it("Restore an existing task board", () => {
    mutations.RESTORE_TASKBOARD(state, { boardId: boardId })
    expect(state.boards[0].archived).toBe(false)
  })
})

describe("SAVE_TASKLIST", () => {
  let state

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          lists: [
            {
              id: "123-1",
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

  it("Add a new task list in existing board", () => {
    const boardId = "123"
    const listId = "0"
    const listName = "Doing"

    mutations.SAVE_TASKLIST(state, { boardId: boardId, listId: listId, name: listName })
    expect(state.boards[0].lists.length).toBe(2)
    expect(state.boards[0].lists[1].name).toBe("Doing")
  })

  it("Update an existing task list in a existing board", () => {
    const boardId = "123"
    const listId = "123-1"
    const listName = "Doing"

    mutations.SAVE_TASKLIST(state, { boardId: boardId, listId: listId, name: listName })
    expect(state.boards[0].lists.length).toBe(1)
    expect(state.boards[0].lists[0].name).toBe("Doing")
  })
})

describe("Archive / Restore Tasklists", () => {
  let state
  const boardId = "123"
  const listId = "123-1"

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          lists: [
            {
              id: "123-1",
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

  it("Archive an existing task tasklist", () => {
    mutations.ARCHIVE_TASKLIST(state, { boardId, listId })
    expect(state.boards[0].lists[0].archived).toBe(true)
  })

  it("Restore an existing task list", () => {
    mutations.RESTORE_TASKLIST(state, { boardId, listId })
    expect(state.boards[0].lists[0].archived).toBe(false)
  })
})

describe("Reorder task lists", () => {
  let state
  const boardId = "123"
  const listId = "123-1"

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
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
        }
      ]
    }
  })

  it("Reorders the task list", () => {
    const lists = [
      {
        id: "123-2",
        name: "Doing",
        headerColor: "#607d8b",
        archived: false,
        items: []
      },
      {
        id: "123-1",
        name: "Todo",
        headerColor: "#607d8b",
        archived: false,
        items: []
      }
    ]

    mutations.REORDER_TASKLISTS(state, { boardId, lists })
    expect(state.boards[0].lists.length).toBe(2)
    expect(state.boards[0].lists).toBe(lists)
  })
})

describe("Reorder tasklist items", () => {
  let state
  const boardId = "123"
  const listId = "123-1"

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          lists: [
            {
              id: "123-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: [{ id: "123-1-1", text: "First item" }, { id: "123-1-2", text: "Second item" }]
            }
          ]
        }
      ]
    }
  })

  it("Reorders the task list items", () => {
    const items = [{ id: "123-1-2", text: "Second item" }, { id: "123-1-1", text: "First item" }]
    mutations.REORDER_TASKLIST_ITEMS(state, { boardId, listId, items })

    expect(state.boards[0].lists[0].items.length).toBe(2)
    expect(state.boards[0].lists[0].items).toBe(items)
  })
})

describe("SET_ACTIVE_TASKBOARD", () => {
  let state

  beforeEach(() => {
    state = {
      activeBoard: null,
      boards: [
        {
          id: "123",
          lists: [
            {
              id: "123-1",
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

  it("Sets the provided board active", () => {
    const board = state.boards[0]
    mutations.SET_ACTIVE_TASKBOARD(state, { board })
    expect(state.activeBoard).toBe(board)
  })
})

describe("SAVE_TASKLIST_ITEM", () => {
  let state
  const boardId = "123"
  const listId = "123-1"

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          lists: [
            {
              id: "123-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: [{ id: "123-1-1", text: "First item" }]
            }
          ]
        }
      ]
    }
  })

  it("Adds a new item in the task list", () => {
    const item = { id: "0", text: "Second item" }
    mutations.SAVE_TASKLIST_ITEM(state, { boardId, listId, item })

    expect(state.boards[0].lists[0].items.length).toBe(2)
    expect(state.boards[0].lists[0].items[1].text).toBe(item.text)
  })

  it("Update an existing item in the existing task list", () => {
    const item = { id: "123-1-1", text: "Second item" }
    mutations.SAVE_TASKLIST_ITEM(state, { boardId, listId, item })

    expect(state.boards[0].lists[0].items.length).toBe(1)
    expect(state.boards[0].lists[0].items[0].text).toBe(item.text)
  })
})

describe("DELETE_TASKLIST_ITEM", () => {
  let state
  const boardId = "123"
  const listId = "123-1"

  beforeEach(() => {
    state = {
      boards: [
        {
          id: "123",
          lists: [
            {
              id: "123-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: [{ id: "123-1-1", text: "First item" }]
            }
          ]
        }
      ]
    }
  })

  it("Deletes an existing item in the task list", () => {
    const item = { id: "123-1-1", text: "First item" }
    mutations.DELETE_TASKLIST_ITEM(state, { boardId, listId, item })
    expect(state.boards[0].lists[0].items.length).toBe(0)
  })
})

test("It does not delete invalid task list item", () => {
  const boardId = "123"
  const listId = "123-1"
  const item = { id: "123-1-2", text: "Second item" }
  let state = {
    boards: [
      {
        id: "123",
        lists: [
          {
            id: "123-1",
            name: "Todo",
            headerColor: "#607d8b",
            archived: false,
            items: [{ id: "123-1-1", text: "First item" }]
          }
        ]
      }
    ]
  }

  mutations.DELETE_TASKLIST_ITEM(state, { boardId, listId, item })
  expect(state.boards[0].lists[0].items.length).toBe(1)
})
