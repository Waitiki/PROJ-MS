<template>
  <LoadingSpinner v-if="isLoading"/>
  <main id="manage-page">
    <div class="page-wrap">
      <div class="page-header">
        <h3>Available-Projects</h3>
      </div>

      <div class="project-list">
        <div class="project-card" v-for="project in projects" :key="project.id">
          <img :src="getImageUrl(project.picture)" alt="Project Image" class="project-image" />
          <div class="project-details">
            <h2 class="project-name">{{ project.name }}</h2>
            <p class="project-description">{{ project.description }}</p>
            <p class="project-price">{{ project.price }}</p>
          </div>
        </div>
      </div>

    </div>

  </main>
</template>

<script>
import LoadingSpinner from './LoadingSpinner.vue';
import axios from 'axios';

export default {
  name: 'ProjectList',
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      projects: [],
    };
  },
  methods: {
    fetchProjects(){
      this.isLoading = true;
      axios.post('http://localhost:8080/api/project/listOfProjects')
            .then(response => {
                this.projects = response.data;
            })
            .catch(error => {
              console.log("Error fetching projects", error);
            })
            .finally(() => {
              this.isLoading = false;
            })
    },
    getImageUrl(base64String) {
      if (base64String) {
        return `data:image/jpeg;base64,${base64String}`;
      }
      return '';
    },
  },
  created(){
    this.fetchProjects();
  }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

.page-wrap {
  /* padding: 20px;
  background-color: #f9f9f9; */
}

.page-header {
  /* text-align: center; */
  margin-bottom: .8rem;
}

.page-header h3 {
  font-size: 1.5em;
  color: rgba(30, 41, 59, 255);
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  gap: 20px;
}

.project-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  max-width: 300px;
  /* text-align: center; */
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  width: 100%;
  height: auto;
}

.project-details {
  /* padding: 20px; */
  margin: .8rem;
}

.project-name {
  font-size: 1.5em;
  /* margin: 15px 0; */
  color: #333;
  margin-bottom: .3rem;
}

.project-description {
  font-size: 1em;
  color: #777;
  margin-bottom: .3rem;
}

.project-price {
  font-size: 1.2em;
  color: #007bff;
}

@media only screen and (max-width: 767px) {
  .project-card {
    /* margin: 10px; */
    width: 100%;
  }

  .page-wrap{
    margin-left: 2.3rem;
  }
  .project-list{
    gap: .8rem;
  }
}
</style>
