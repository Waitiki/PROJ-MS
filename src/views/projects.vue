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
        <div class="project-card" v-for="project in projects" :key="project.id">
          <img :src="getImageUrl(project.picture)" alt="Project Image" class="project-image" />
          <div class="project-details">
            <h2 class="project-name">{{ project.name }}</h2>
            <p class="project-description">{{ project.description }}</p>
            <div class="footer">
              <p class="project-price">{{ project.price }}</p>
              <div class="action-btns">
                <button @click.stop="editProject(project)" class="btn-edit">Edit</button>
                <button @click.stop="confirmDelete(project)" class="btn-delete">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProjectDetails v-if="showDetails" :project="selectedProject" @closeDetails="closeDetails"/>

    <AddProject :project="selectedProject" @closeForm="closeForm" @projectsReload="reloadProjects" v-if="show" />

    <confirmDeleteMenu :message="deleteMessage" :borderColor="deleteBorderColor" v-if="showDeleteConfirmation"
      @confirm="deleteConfirmed" @cancel="cancelDelete" />
  </main>
</template>

<script>
import AddProject from './AddProject.vue';
import ProjectDetails from './ProjectDetailsModal.vue';
import confirmDeleteMenu from './confirmDeleteMenu.vue';
import axios from 'axios';

export default {
  name: 'Projects',
  components: { AddProject, ProjectDetails, confirmDeleteMenu },
  data() {
    return {
      show: false,
      showDetails: false,
      showDeleteConfirmation: false,
      selectedProject: null,
      projects: [],
      deleteProjectId: null,
      deleteMessage: '',
      deleteBorderColor: 'gold'
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
    },
    confirmDelete(project) {
      this.deleteProjectId = project.id;
      this.deleteMessage = `ARE YOU SURE YOU WANT TO DELETE "${project.name}"?`;
      this.showDeleteConfirmation = true;
    },
    deleteConfirmed() {
      if (this.deleteProjectId) {
        const url = `http://localhost:8080/api/project/deleteProject/${this.deleteProjectId}`;
        axios.post(url)
          .then(response => {
            this.invokeMenu("PROJECT DELETED SUCCESSFULLY", "magenta");
            this.reloadProjects(); // Refresh the projects list
          })
          .catch(error => {
            console.error('Error deleting project:', error);
          })
          .finally(() => {
            this.cancelDelete();
          });
      }
    },
    cancelDelete() {
      this.deleteProjectId = null;
      this.deleteMessage = '';
      this.showDeleteConfirmation = false;
    },
    invokeMenu(value, borderColor = 'gold') {
      this.deleteMessage = value;
      this.deleteBorderColor = borderColor;
      this.showDeleteConfirmation = true;

      setTimeout(() => {
        this.showDeleteConfirmation = false;
      }, 3000);
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

.action-btns {
  display: flex;
  gap: 0.5rem;
}

.project-price {
  font-size: 1.2em;
  margin-top: 0.5rem;
  color: #007bff;
}

.btn-edit, .btn-delete {
  padding: 0.4rem;
  color: white;
  font-size: medium;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: none;
  border: 1px solid;
}

.btn-edit {
  background-color: rgba(74, 222, 128, 255);
  border-color: rgba(74, 222, 128, 255);
}

.btn-edit:hover {
  border-color: black;
  background: white;
  color: black;
}

.btn-delete {
  background-color: rgba(239, 68, 68, 255);
  border-color: rgba(239, 68, 68, 255);
}

.btn-delete:hover {
  border-color: black;
  background: white;
  color: black;
}

@media only screen and (max-width: 767px) {
  .project-card {
    width: 100%;
  }

  .project-list, .page-header, .btn-add {
    gap: 0.8rem;
    margin-left: 2rem;
  }
}
</style>
