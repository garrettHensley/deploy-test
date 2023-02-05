<template>
  <div> hello </div>
  <button @click="addTodo()">test</button>
  <ol>
    <li v-for="todo in todos" :key="todo._id">{{ todo }}</li>
  </ol>
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

      const response =  await axios.post("api/todoList/", {
        title: this.title,
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
}
</script>
