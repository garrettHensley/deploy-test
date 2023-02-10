<template>
  <div id="app">
    <div id="story" class="container">
      <h1> dndti.me </h1>
      <p> You may click the button. </p>
      <p>You may click it one time, many times, or not at all...</p>
      <p>The Choice is Yours.</p>
      <button @click="addTodo()">{{ buttonText }}</button>
    </div>
    <template v-if="clickSum">
      <div class="container margins center-text">
        <p id="click-sum">{{ clickSum }}</p>
      </div>
      <div class="container margins">
        <ul>
          <li v-for="(todo, index) in todos" :key="todo._id"
            >{{ index + 1 }}: {{ todo.title }}</li
          >
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  data() {
    return {
      todos: [],
      description: "description",
      title: "testing",
    }
  },
  async mounted() {
    const response = await axios.get("api/todoList/")
    this.todos = response.data
  },
  methods: {
    async addTodo() {
      const response = await axios.post("api/todoList/", {
        title: `Button Clicked on: ${new Date()}`,
        description: this.description,
      })
      console.log(response.data)
      this.todos.push(response.data)
      // this.title = ""
      // this.description = ""
    },
    async removeTodo(item, i) {
      await axios.delete("api/todoList/" + item._id)
      this.todos.splice(i, 1)
    },
  },
  computed: {
    clickSum() {
      if (this.todos.length && this.todos.length % 100 === 0) {
        return "Who Am I, and What Have I Become?"
      }
      return this.todos.length
    },
    buttonText() {
      const dice = Math.floor(Math.random() * 100)
      if (dice >= 98) {
        return "You are doing well, dont stop now"
      }
      return "The Button"
    },
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Aboreto&family=Cutive+Mono&display=swap");

html body {
  font-family: "Cutive Mono";
  background-color: #c3c3c3;
}

button {
  padding: 1em;
  font-size: 1em;
  border: groove;
  background-color: rgb(193, 192, 192);
}

ul {
  list-style-type: none;
}

#story {
  text-align: center;
}

#click-sum {
  font-size: 5em;
  font-family: "Times New Roman", Times, serif;
}

.container {
  margin-top: 1em;
  margin-bottom: 1em;

  margin: auto;

  padding-top: 1em;
  padding-bottom: 1em;

  width: 80%;
  background-color: antiquewhite;
}

.margins {
  margin-top: 1em !important;
}

.center-text {
  text-align: center;
}
</style>
