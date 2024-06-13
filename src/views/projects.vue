<template>
  <main id="manage-page">
    <div class="page-wrap" v-if="!showDetails">
      <div class="page-header">
        <h3>Available Projects</h3>
      </div>

      <button @click="openForm" class="btn-add">
        New Project
      </button>

      <div class="project-list">
        <div class="project-card" v-for="project in projects" :key="project.id" @click="viewDetails(project)">
          <img :src="getImageUrl(project.picture)" alt="Project Image" class="project-image" />
          <div class="project-details">
            <h2 class="project-name">{{ project.name }}</h2>
            <p class="project-description">{{ project.description }}</p>
            <div class="footer">
              <p class="project-price">{{ project.price }}</p>
              <button @click.stop="editProject(project)" class="btn-edit">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProjectDetails v-if="showDetails" :project="selectedProject" @closeDetails="closeDetails"/>

    <AddProject :project="selectedProject" @closeForm="closeForm" @projectsReload="reloadProjects" v-if="show" />
  </main>
</template>

<script>
import AddProject from './AddProject.vue';
import ProjectDetails from './ProjectDetailsModal.vue';
import axios from 'axios';

export default {
  name: 'ProjectList',
  components: { AddProject, ProjectDetails },
  data() {
    return {
      show: false,
      showDetails: false,
      selectedProject: null,
      projects: []
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    openForm() {
      this.selectedProject = null;
      this.show = true;
    },
    closeForm() {
      this.show = false;
      this.selectedProject = null;
    },
    fetchProjects() {
      axios.post('http://localhost:8080/api/project/listOfProjects')
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
        });
    },
    reloadProjects() {
      this.fetchProjects();
    },
    editProject(project) {
      this.selectedProject = { ...project };
      this.show = true;
    },
    viewDetails(project) {
      this.selectedProject = { ...project };
      this.showDetails = true;
    },
    closeDetails() {
      this.showDetails = false;
      this.selectedProject = null;
    },
    getImageUrl(base64String) {
      if (base64String) {
        return `data:image/jpeg;base64,${base64String}`;
      }
      return '';
    }
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
  /* padding: 20px; */
}

.page-header {
  /* text-align: center; */
  margin-bottom: 1rem;
}

.page-header h3 {
  font-size: 1.5em;
  color: rgba(30, 41, 59, 255);
}

.btn-add {
  padding: 0.4rem;
  background-color: rgba(74, 222, 128, 255);
  color: white;
  width: 9rem;
  font-size: larger;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  border: 1px solid rgba(74, 222, 128, 255);
  margin-bottom: 20px;
  text-decoration: none;
  display: flex;
  gap: 0.2rem;
}

.btn-add:hover {
  box-shadow: 0px 0px 5px rgba(30, 41, 59, 255);
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.project-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  max-width: 300px;
}

.project-card:hover {
  transform: translateY(-5px);
}

.project-image {
  width: 100%;
  height: auto;
}

.project-details {
  margin: 0.8rem;
}

.project-name {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 0.3rem;
}

.project-description {
  font-size: 1em;
  color: #777;
  margin-bottom: 0.3rem;
}

.footer {
  display: flex;
  justify-content: space-between;
}

.project-price {
  font-size: 1.2em;
  margin-top: .5rem;
  color: #007bff;
}

.btn-edit {
  padding: 0.4rem;
  background-color: rgba(74, 222, 128, 255);
  color: white;
  font-size: medium;
  font-weight: 600;
  cursor: pointer;
  /* border: 1px solid rgba(74, 222, 128, 255); */
  margin-top: 10px;
  text-decoration: none;
  border: 1px solid rgba(74, 222, 128, 255);
}

.btn-edit:hover {
  border: 1px solid black;
  background: white;
  color: black;
}

@media only screen and (max-width: 767px) {
  .project-card {
    width: 100%;
  }

  .project-list,.page-header,.btn-add {
    gap: 0.8rem;
    margin-left: 2rem;
  }
}
</style>
