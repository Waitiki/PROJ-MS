<template>
  <popMenu :message="popMessage" :borderColor="popBorderColor" v-if="showPopMenu" />
  <LoadingSpinner v-if="isLoading"/>
  <main id="manage-page">
    <div class="page-wrap" v-if="!showDetails">
      <div class="page-header">
        <h3>Available-Projects</h3>
        <div class="header-controls">
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="searchProjects" 
            placeholder="Search projects..." 
            class="search-input"
          />
          <button @click="openForm" class="btn-add">
            + Project
          </button>
        </div>
      </div>

      <div class="project-list">
        <div v-if="paginatedProjects.length === 0" class="no-projects-message">
          No projects available.
        </div>

        <div v-else class="project-card" v-for="project in paginatedProjects" :key="project.id" @click="viewDetails(project)">
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

      <div class="pagination-controls">
        <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
      </div>
    </div>

    <ProjectDetails v-if="showDetails" :project="selectedProject" @closeDetails="closeDetails" />
    <AddProject :project="selectedProject" @closeForm="closeForm" @projectsReload="reloadProjects" v-if="show" />
    <confirmDeleteMenu :message="deleteMessage" :borderColor="deleteBorderColor" v-if="showDeleteConfirmation" @confirm="deleteConfirmed" @cancel="cancelDelete" />
  </main>
</template>

<script>
import AddProject from './AddProject.vue';
import ProjectDetails from './ProjectDetailsModal.vue';
import popMenu from './popMenu.vue';
import confirmDeleteMenu from './confirmDeleteMenu.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import axios from 'axios';

export default {
  name: 'Projects',
  components: { AddProject, ProjectDetails, confirmDeleteMenu, popMenu, LoadingSpinner },
  data() {
    return {
      showPopMenu: false,
      popMessage: "",
      popBorderColor: "gold",
      show: false,
      showDetails: false,
      showDeleteConfirmation: false,
      selectedProject: null,
      projects: [],
      deleteProjectId: null,
      deleteMessage: '',
      deleteBorderColor: 'gold',
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      isLoading: false
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    totalPages() {
      return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProjects.slice(start, end);
    }
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
      this.isLoading = true;
      axios.post('http://localhost:8080/api/project/listOfProjects')
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
        })
        .finally(() => {
          this.isLoading = false;
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
      this.deleteMessage = `Are you sure you want to delete "${project.name}"?`;
      this.deleteBorderColor = "red";
      this.showDeleteConfirmation = true;
    },
    deleteConfirmed() {
      if (this.deleteProjectId) {
        this.isLoading = true;
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
            this.isLoading = false;
          });
      }
    },
    cancelDelete() {
      this.deleteProjectId = null;
      this.deleteMessage = '';
      this.showDeleteConfirmation = false;
    },
    invokeMenu(value, borderColor = 'gold') {
      this.popMessage = value;
      this.popBorderColor = borderColor;
      this.showPopMenu = true;

      setTimeout(() => {
        this.showPopMenu = false;
      }, 3000);
    },
    searchProjects() {
      this.isLoading = true;
      axios.post(`http://localhost:8080/api/project/search`, { params: { keyword: this.searchQuery } })
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => {
          console.error('Error searching projects:', error);
          // this.invokeMenu("ERROR SEARCHING PROJECTS", "red");
        })
        .finally(() => {
          this.isLoading = false;
        });
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
  background-color: #f8f9fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.page-header h3 {
  font-size: 1.5em;
  color: #1e293b;
}

.header-controls {
  display: flex;
  gap: 0.8rem;
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-add {
  padding: 0.4rem;
  background-color: #4ade80;
  color: white;
  width: 9rem;
  font-size: larger;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  border: 1px solid #4ade80;
  text-decoration: none;
  display: flex;
  gap: 0.2rem;
}

.btn-add:hover {
  box-shadow: 0px 0px 5px #1e293b;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.no-projects-message {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin: 2rem 0;
}

.project-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 100%;
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
  padding: 0.8rem;
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
  align-items: center;
}

.action-btns {
  display: flex;
  gap: 0.5rem;
}

.project-price {
  font-size: 1.2em;
  color: #007bff;
}

.btn-edit, .btn-delete {
  padding: 0.4rem;
  color: white;
  font-size: medium;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid;
}

.btn-edit {
  background-color: #4ade80;
  border-color: #4ade80;
}

.btn-edit:hover {
  border-color: black;
  background: white;
  color: black;
}

.btn-delete {
  background-color: #ef4444;
  border-color: #ef4444;
}

.btn-delete:hover {
  border-color: black;
  background: white;
  color: black;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #1e293b;
  color: white;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-controls span {
  font-size: 1rem;
  color: #1e293b;
}

@media only screen and (min-width: 767px) {
  .page-wrap {
    padding: 20px;
  }
}

@media only screen and (max-width: 767px) {
  .project-card {
    width: 100%;
  }

  .page-wrap{
    margin-left: 1.3rem;
    width: 100%;
  }
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .header-controls {
    flex-direction: column;
    width: 100%;
  }

  .project-list {
    justify-content: center;
  }
}
</style>
