<template>
  <div class="card mt-3">
      <div class="card-body">
          <div class="card-title">
              <h3>Chat Group</h3>
              <hr>
          </div>
          <div class="card-body">
              <div class="messages">
                  <p v-for="message in messages" :key="message.createdAt">
                    From: {{ message.from}}
                    Message: {{ message.text }}
                  </p>
              </div>
          </div>
      </div>
      <div class="card-footer">
          <form @submit.prevent="sendMessage">
              <div class="gorm-group">
                  <label for="user">User:</label>
                  <input type="text" v-model="user" class="form-control">
              </div>
              <div class="gorm-group pb-3">
                  <label for="message">Message:</label>
                  <input type="text" v-model="message" class="form-control">
              </div>
              <button type="submit" class="btn btn-success">Send</button>
          </form>
      </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'Chat',
  props: {
    msg: String
  },
  data(){
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('localhost:3000')
    }
  },
  mounted() {
    this.socket.on("connect", function() {
      console.log("Connected to server");
    });
    this.socket.on("disconnect", function() {
      console.log("Disconnected from server");
    });
    this.socket.on("messages", data => {
      this.messages = [...this.messages, data]
    });
  },
  methods: {
    sendMessage(e){
      e.preventDefault();
      this.socket.emit('createMessage', {
        from: this.user,
        text: this.message
      })
      this.message = '';
      console.log(this.messages);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
