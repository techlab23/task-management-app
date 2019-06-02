# Task Management Application using Vue.js

In [Thinking in components with vue.js](https://medium.com/@_shirish/thinking-in-components-with-vue-js-a35b5af12df), we learned about Vue component and how it can be used to create web applications. We will look at Task Management App similar to Trello built using Vue.js.

The app allows you to manage projects and tasks visually using board. One board represents one project. A board contains one or more lists. Each list represents the category of tasks, such as Todo, Doing and Done. You can drag-n-drop to change the order of lists, the order of tasks inside the list, and also move task from one list to another as well- to manage the project as it moves through different stages.

![Project Image](/docs/images/project.png)

## Application features

This is a multi-page application with a rich feature set implemented right from the start. Below is the feature list of this app.

### Boards

Allow user to,

- view existing boards in the dashboard
- archive and restore the boards
- view individual board contents
- create a new board
- edit existing board information

### Lists

Allow user to,

- create a new list
- edit list name
- archive and restore lists
- rearrange the lists in the board using drag and drop

### List Items

Allow user to,

- create new and update existing items in the list
- rearrange the items in the list by drag and drop
- move tasks among the lists using drag and drop

**Application Demo:** [Link](http://kanban-board-demo.surge.sh)

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# To deploy your app on surge make sure you have surge cli
# installed globally on your machine.
# If you have it insalled already then feel free to skip this step
npm install -g surge

# Build and deploy the app on surge.sh in staging environment
# Note: Before running this command, please change the site url
# used for this command in package.json file.
npm run deploy-staging

# Build and deploy the app on surge.sh in production environment
# Note: Before running this command, please change the site url
# used for this command in package.json file.
npm run deploy
```
