<template>
  <div
    v-if="currentTutorial"
    class="edit-form"
  >
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="currentTutorial.title"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          id="description"
          v-model="currentTutorial.description"
          type="text"
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      v-if="currentTutorial.published"
      class="btn btn-sm btn-primary mr-2"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    
    <button
      v-else
      class="btn btn-sm btn-primary mr-4"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button
      class="btn btn-sm btn-danger mr-4"
      @click="deleteTutorial"
    >
      Delete
    </button>

    <button
      type="submit"
      class="btn btn-sm btn-success"
      @click="updateTutorial"
    >
      Update
    </button>
  </div>

  <div v-else>
    <br>
    <p>No data...</p>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "TutorialIndex",
  data() {
    return {
      currentTutorial: null,
    };
  },
  mounted() {
    this.getTutorial(this.$route.params.id);
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      let data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then( 
          this.currentTutorial.published = status
        )
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(
          this.$router.push({ name: "tutorials" })      
        )
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(
          this.$router.push({ name: "tutorials" })
        )
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
