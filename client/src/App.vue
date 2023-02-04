<template>
  <div> hello </div>
</template>

<script>
import axios from "axios"
export default {
  name: "App",
  data() {
    return {
      todos: [],
      description: "",
      title: "",
    }
  },
  async mounted() {
    const response = await axios.get("api/todoList/")
    this.todos = response.data
  },
  methods: {
    async addTodo(e) {
      e.preventDefault()
      const response = await axios.post("api/todoList/", {
        title: this.title,
        description: this.description,
      })
      this.todos.push(response.data)
      this.title = ""
      this.description = ""
    },
    async removeTodo(item, i) {
      await axios.delete("api/todoList/" + item._id)
      this.todos.splice(i, 1)
    },
  },
}
</script>
