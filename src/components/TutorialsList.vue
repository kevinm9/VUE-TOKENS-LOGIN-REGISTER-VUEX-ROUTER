<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="Search by title"
          @keyup="searchTitle"
        >
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li
          v-for="(tutorial, index) in tutorials"
          :key="index"
          class="list-group-item "
          :class="{ active: index == currentIndex }"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>
      <div v-if="tutorials.length < 1">
        there is no data :C
      </div>

      <button
        class="m-3 btn btn-sm btn-danger"
        @click="removeAllTutorials"
      >
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <router-link
          :to="'/tutorials/' + currentTutorial.id"
          class="btn btn-sm btn-success"
        >
          Edit
        </router-link>
      </div>
      <div v-else>
        <br>
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "TutorialsList",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: null,
      title: ""
    };
  },
  mounted() {
    this.retrieveTutorials();
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = null;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeActiveTutorial() {
      this.currentTutorial = null;
      this.currentIndex = null;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then( 
          this.refreshList()
        )
        .catch(e => {
          console.log(e);
        });
    },


    searchTitle() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        TutorialDataService.findByTitle(this.title)
          .then(response => {
            this.tutorials = response.data;
          })
          .catch(e => {
            console.log(e);
          });
      }, 800);
      this.removeActiveTutorial()
    }


  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
