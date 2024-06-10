<template>
  <popMenu :message="popMessage" :borderColor="popBorderColor" v-if="show"/>
  <div class="page-wrap">
    <div class="form-content">
      <div class="cancel">
        <span @click="$emit('closeForm')">
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div class="member-title">
        <h2>{{ project ? (isEditable ? 'Edit Project' : 'Project Details') : 'New Project' }}</h2>
      </div>
      <hr>
      <div class="form-inputs">
        <template v-if="isEditable">
          <div class="form-group" v-for="field in editableFields" :key="field">
            <input
              :type="inputType(field)"
              class="x"
              :id="field"
              v-model="projectData[field]"
              placeholder=" "
              :disabled="!isEditable"
            />
            <label :for="field">{{ formatLabel(field) }}</label>
          </div>
          <div class="form-group">
            <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg" class="x" id="projectPicture" />
            <label for="projectPicture">Project Picture</label>
          </div>
          <div v-if="projectData.projectPicture" class="image-preview">
            <img :src="projectData.projectPicture" alt="Project Image Preview" />
          </div>
        </template>
        <template v-else>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in projectData" :key="key">
                  <td>{{ formatLabel(key) }}</td>
                  <td>{{ key === 'projectPicture' ? '' : value }}</td>
                </tr>
                <tr v-if="projectData.projectPicture">
                  <td>Project Picture</td>
                  <td><img :src="projectData.projectPicture" alt="Project Image" class="preview-image"/></td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </div>
      <hr>
      <div class="btn-register" v-if="isEditable">
        <button @click="$emit('closeForm')">CLOSE</button>
        <button @click="saveProject">{{ project ? 'UPDATE' : 'ADD' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import popMenu from './popMenu.vue';
import axios from 'axios';

export default {
  components: { popMenu },
  props: {
    project: {
      type: Object,
      default: () => null
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      popMessage: "",
      popBorderColor: "gold",
      projectData: this.initializeProjectData(),
      selectedFile: null
    };
  },
  computed: {
    editableFields() {
      return ['projectName', 'projectDescription', 'projectPrice'];
    }
  },
  watch: {
    project: 'initializeProjectData'
  },
  methods: {
    initializeProjectData() {
      return this.project
        ? { ...this.project }
        : { projectName: '', projectPicture: '', projectDescription: '', projectPrice: '' };
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.projectData.projectPicture = e.target.result;
        };
        reader.readAsDataURL(file);
        this.selectedFile = file;
      } else {
        this.invokeMenu("Invalid file type. Only PNG and JPEG are allowed.", "red");
      }
    },

    invokeMenu(value, borderColor = 'gold') {
      this.popMessage = value;
      this.popBorderColor = borderColor;
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, 3000);
    },

    async saveProject() {
      if (!this.projectData.projectName || !this.projectData.projectDescription || !this.projectData.projectPrice) {
        this.invokeMenu("FILL ALL FIELDS!!", "red");
      } else {
        this.invokeMenu("SAVING PROJECT DATA...", "blue");

        const formData = new FormData();
        formData.append('projectName', this.projectData.projectName);
        formData.append('projectDescription', this.projectData.projectDescription);
        formData.append('projectPrice', this.projectData.projectPrice);

        if (this.selectedFile) {
          formData.append('projectPicture', this.selectedFile);
        }

        const url = "https://api.yourwebsite.com/projects";
        const method = this.project ? 'put' : 'post';
        const apiUrl = this.project ? `${url}/${this.project.id}` : url;

        axios({
          method: method,
          url: apiUrl,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.invokeMenu("PROJECT DATA SAVED SUCCESSFULLY");
          this.$emit('projectsReload');
        })
        .catch(error => {
          this.invokeMenu("ERROR SAVING PROJECT DATA!!", "red");
          console.error('Error saving project data:', error);
        });
      }
    },

    inputType(key) {
      if (key === 'projectPrice') return 'number';
      return 'text';
    },

    formatLabel(key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.page-wrap {
  background-color: rgba(17, 167, 167, 0.5);
  width: 100%;
  height: 100%;
  z-index: 100;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  position: fixed;
}
.form-content {
  background-color: rgba(30, 41, 59, 255);
  position: fixed;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 10px rgba(74, 222, 128, 255);
  width: 100%;
  max-width: 600px;
  max-height: 90%;
  overflow-y: auto;
  transition: all 0.3s ease;
}
.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
.table th,
.table td {
  padding: 0.75rem;
  border: 1px solid rgba(74, 222, 128, 255);
  text-align: left;
}
.table th {
  background-color: rgba(30, 41, 59, 255);
  color: rgba(74, 222, 128, 255);
}
.table td {
  background-color: rgba(17, 167, 167, 0.2);
  color: white;
}
.member-title {
  color: white;
  text-align: center;
}
.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.x {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid rgba(74, 222, 128, 255);
  background: transparent;
  color: white;
  transition: border-color 0.3s;
}

.x:focus {
  outline: none;
  border-color: rgba(74, 222, 128, 255);
}

.x:focus + label,
.x:not(:placeholder-shown) + label {
  top: -18px;
  font-size: 17px;
  color: rgba(74, 222, 128, 255);
}

label {
  position: absolute;
  top: 12px;
  left: 10px;
  font-size: 16px;
  color: white;
  pointer-events: none;
  transition: top 0.3s, font-size 0.3s, color 0.3s;
}

.cancel {
  color: white;
  display: flex;
  flex-direction: row-reverse;
  font-size: large;
}
.cancel span {
  cursor: pointer;
}
button {
  background-color: rgba(30, 41, 59, 255);
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: medium;
  font-weight: 300;
  font-family: ui-monospace;
  box-shadow: 0px 0px 5px white;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}
button:hover {
  background-color: rgba(74, 222, 128, 255);
  color: rgba(30, 41, 59, 255);
  box-shadow: 0px 0px 5px rgba(74, 222, 128, 255);
}
.btn-register {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.image-preview {
  text-align: center;
  margin-top: 1rem;
}
.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

@media only screen and (max-width: 767px) {
  .form-content {
    width: 90%;
  }
}

/* Fade transition for dynamic content */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, height 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>
