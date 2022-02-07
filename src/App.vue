<template>
  <div id="app">
    <!-- V-for -->
    <div class="container">
      <h3 class="header">To Do List</h3>
      <div id="list">
        <ul class="task-list">
          <li v-for="(todo, index) in todos" :key="todo.title" class="task">
            <div v-if="!todo.done" class="undone">
              <p class="title">{{ index }}</p>
              <p class="title">{{ todo.title }}</p>
              <p class="date">{{ new Date(todo.date).toLocaleString() }}</p>
            </div>
            <div v-else class="task done">
              <p class="title">{{ index }}</p>
              <p class="title">{{ todo.title }}</p>
              <p class="date">{{ new Date(todo.date).toLocaleString() }}</p>
            </div>
            <button @click="handleChange(index)">Change Status</button>
            <button @click="deleteItem(index)">Delete Task</button>
            <button @click="updateItem(index)">Update Task</button>
          </li>
        </ul>
      </div>
      <!-- Input -->
      <input type="text" placeholder="Enter task title" v-model="textInput" />
      <!-- Button -->
      <button @click="addToList" id="btn">Add List</button>
    </div>
  </div>
</template>

<script>
import { getAllTasks, addTask, changeStatus, deleteStatus, updateTask} from "./api";
export default {
  name: "App",
  data: function () {
    return {
      todos: [],
      textInput: null,
    };
  },
  methods: {
    addToList: async function () {
      if (this.textInput) {
        if (this.textInput.length > 5) {
          let objToAdd = {
            title: this.textInput,
            done: false,
          };
          await addTask(objToAdd);
          this.textInput = "";
          this.todos = await getAllTasks();
        } else {
          alert("name must be at least 5 character");
        }
      } else {
        alert("Enter task");
      }
    },
    handleChange: async function (index) {
      await changeStatus(this.todos[index]._id, !this.todos[index].done);
      this.todos = await getAllTasks();
    },
    deleteItem: async function (index) {
      await deleteStatus(this.todos[index]._id);
      this.todos = await getAllTasks();
    },
    updateItem: async function (index) {
      let newTitle = prompt("Enter new title");

      console.log(this.todos[index]._id);
      console.log(newTitle);
       await updateTask(this.todos[index]._id, newTitle);
       this.todos=await getAllTasks();
    },
  },

  created: async function () {
    this.todos = await getAllTasks();
    console.log(this.todos);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.container {
  max-width: 550px;
  align-self: center;
}
#list {
  border-radius: 5px;
  margin-top: 100px;
}
#btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.task-list {
  list-style-type: none;
}
.task > p {
  display: inline;
  margin: 0 30px;
}
.task {
  border: 2px solid #3333;
  padding: 15px 20px;
  border-radius: 20px;
  margin: 20px 0;
}
.done {
  opacity: 0.5;
}
.done > .title {
  text-decoration: line-through;
}
</style>
