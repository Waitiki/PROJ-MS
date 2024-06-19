<template>
  <div class="form-wrap">
    <div class="form-content">
      <div class="cancel" @click="$emit('closeForm')">
        <i class="fas fa-times"></i>
      </div>
      <div class="form-title">
        <h2>{{ project ? 'Edit Project' : 'New Project' }}</h2>
      </div>
      <hr />
      <div class="form-inputs">
        <div class="form-group" v-for="field in fields" :key="field.key">
          <input
            :type="field.type"
            class="form-control"
            :id="field.key"
            v-model="formData[field.key]"
            placeholder=" "
          />
          <label :for="field.key" :class="{ filled: formData[field.key] !== '' }">{{ field.label }}</label>
        </div>
        <div class="form-group file-group">
          <input 
            type="file" 
            id="picture" 
            @change="handleFileUpload" 
            class="form-control-file" 
            accept=".jpg, .jpeg, .png, .webp"
          />
          <label for="picture" class="file-label">Project Image</label>
        </div>
        <div class="form-group file-group">
          <input 
            type="file" 
            id="projectPdf" 
            @change="handleZipUpload" 
            class="form-control-file" 
            accept=".zip, .rar, .tar.gz"
          />
          <label for="projectPdf" class="file-label">Project Archive (ZIP/RAR/TAR.GZ)</label>
        </div>

        <div class="image-preview" v-if="formData.picture">
          <img :src="formData.picture" alt="Project Image Preview" class="preview-image"/>
        </div>
        <div class="image-preview" v-else-if="project && project.picture">
          <img :src="`data:image/jpeg;base64,${project.picture}`" alt="Project Image Preview" class="preview-image"/>
        </div>
        <div v-else class="no-image-placeholder">No image uploaded</div>

        <div class="form-group">
          <!-- <label for="features">Project Features</label> -->
          <input
            id="features"
            class="form-control"
            v-model="newFeature"
            placeholder="Add feature and press Enter"
            @keydown.enter.prevent="addFeature"
          />
          <div class="multi-input-list">
            <div v-for="(feature, index) in formData.features" :key="index" class="multi-input-item">
              <span>{{ feature }}</span>
              <button type="button" @click="removeFeature(index)">Remove</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <!-- <label for="technologies">Project Technologies</label> -->
          <input
            id="technologies"
            class="form-control"
            v-model="newTechnology"
            placeholder="Add technology and press Enter"
            @keydown.enter.prevent="addTechnology"
          />
          <div class="multi-input-list">
            <div v-for="(technology, index) in formData.technologies" :key="index" class="multi-input-item">
              <span>{{ technology }}</span>
              <button type="button" @click="removeTechnology(index)">Remove</button>
            </div>
          </div>
        </div>

      </div>
      <hr />
      <div class="form-actions">
        <button @click="$emit('closeForm')">Close</button>
        <button @click="saveProject">{{ project ? 'Update' : 'Add' }}</button>
      </div>
    </div>
    <popMenu :message="popMessage" :borderColor="popBorderColor" v-if="show" />
  </div>
</template>

<script>
import popMenu from './popMenu.vue';
import axios from 'axios';

export default {
  name: 'AddProject',
  components: { popMenu },
  props: {
    project: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      show: false,
      popMessage: "",
      popBorderColor: "gold",
      formData: {
        id: null,
        name: '',
        description: '',
        price: '',
        features: [],
        overview: '',
        technologies: [],
        picture: '',
        projectPdf: ''
      },
      newFeature: '',
      newTechnology: '',
      fields: [
        { key: 'name', label: 'Project Name', type: 'text' },
        { key: 'description', label: 'Project Description', type: 'text' },
        { key: 'price', label: 'Project Price', type: 'text' },
        { key: 'overview', label: 'Project Overview', type: 'text' }
      ],
      selectedFile: null,
      selectedZip: null
    };
  },
  watch: {
    project: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.formData = { ...newValue, picture: '', projectPdf: '' }; // Initialize picture and projectPdf as empty for new uploads
          if (newValue.picture) {
            this.formData.picture = `data:image/jpeg;base64,${newValue.picture}`;
          }
          if (newValue.projectPdf) {
            this.formData.projectPdf = newValue.projectPdf;
          }
        } else {
          this.formData = { id: null, name: '', description: '', price: '', features: [], overview: '', technologies: [], picture: '', projectPdf: '' };
        }
      }
    }
  },
  methods: {
    addFeature() {
      if (this.newFeature.trim() !== '') {
        this.formData.features.push(this.newFeature);
        this.newFeature = '';
      }
    },

    removeFeature(index) {
      this.formData.features.splice(index, 1);
    },

    addTechnology() {
      if (this.newTechnology.trim() !== '') {
        this.formData.technologies.push(this.newTechnology);
        this.newTechnology = '';
      }
    },

    removeTechnology(index) {
      this.formData.technologies.splice(index, 1);
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.formData.picture = reader.result; // Update preview with base64 data URL
        };
        reader.readAsDataURL(file);

        this.selectedFile = file;
      } else {
        this.invokeMenu("Invalid file type. Only PNG, JPEG, JPG, and WEBP are allowed.", "red");
        event.target.value = '';
      }
    },

    handleZipUpload(event) {
      const file = event.target.files[0];
      const validTypes = ['application/zip', 'application/x-rar-compressed', 'application/gzip'];
      const validExtensions = ['.zip', '.rar', '.tar.gz'];
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      // Checking if the file type and extension are valid
      if (file && (validTypes.includes(file.type) || validExtensions.some(ext => file.name.endsWith(ext)))) {
        this.selectedZip = file;
        this.formData.projectPdf = file.name; // Show the name of the zip file in the form
      } else {
        this.invokeMenu("Invalid file type. Only ZIP, RAR, and TAR.GZ are allowed.", "red");
        event.target.value = '';
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
      if (!this.formData.name || 
          !this.formData.description || 
          !this.formData.price || 
          !this.formData.features.length || 
          !this.formData.overview || 
          !this.formData.technologies.length
          ) {
        this.invokeMenu("Fill all fields!", "red");
      } else {
        this.invokeMenu("Saving project data...", "blue");

        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('description', this.formData.description);
        formData.append('price', this.formData.price);
        formData.append('overview', this.formData.overview);
        formData.append("features", this.formData.features);
        formData.append("technologies", this.formData.technologies);

        if (this.selectedFile) {
          formData.append('picture', this.selectedFile);
        }

        if (this.selectedZip) {
          formData.append('projectPdf', this.selectedZip);
        }

        if (this.project && this.project.id) {
          formData.append('id', this.project.id);
        }

        const createUrl = "http://localhost:8080/api/project";
        const updateUrl = "http://localhost:8080/api/project/updateProject";
        const apiUrl = this.project ? updateUrl : createUrl;

        try {
          const response = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          if (response.status === 200 || response.status === 201) {
            const responseData = response.data;
            switch (responseData.responseCode) {
              case '001':
                this.invokeMenu(responseData.responseMessage, "red"); // Project exists
                break;
              case '002':
                this.invokeMenu(responseData.responseMessage); // Project addition success
                this.$emit('projectsReload');
                break;
              case '003':
                this.invokeMenu(responseData.responseMessage, "red"); // Project does not exist
                break;
              case '004':
                this.invokeMenu(responseData.responseMessage, "green"); // Project deleted successfully
                this.$emit('projectsReload');
                break;
              case '005':
                this.invokeMenu(responseData.responseMessage, "magenta"); // Project update success
                this.$emit('projectsReload');
                break;
               case '500':
                this.invokeMenu(responseData.responseMessage, "red");
                break;
              default:
                this.invokeMenu(responseData.responseMessage, "red");
            }
          } else {
            this.invokeMenu(`Unexpected response status: ${response.status}`, "red");
          }
        } catch (error) {
          this.invokeMenu("Error saving project data!", "red");
          console.error('Error saving project data:', error);
        }
      }
    }
    
  }
};
</script>

<style scoped>
.form-wrap {
  background-color: rgba(17, 167, 167, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-content {
  background-color: rgba(30, 41, 59, 255);
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 0px 5px rgba(74, 222, 128, 255);
  width: 90%;
  max-width: 500px;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}

.cancel {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #4ADE80;
  font-size: 1.3rem;
}

.form-title {
  color: #4ADE80;
  text-align: center;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 10px;
}

.form-group {
  position: relative;
}

.form-control {
  border: 1px solid rgba(74, 222, 128, 1);
  outline: none;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(30, 41, 59, 255);
  color: white;
}

.form-group label {
  position: absolute;
  top: 50%;
  left: 10px;
  background: rgba(30, 41, 59, 255);
  padding: 0 5px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
}

.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label,
.form-group input:valid + label,
.filled {
  top: -1px;
  left: 5px;
  color: rgba(74, 222, 128, 1);
  font-size: .95rem;
  background-color: rgba(30, 41, 59, 255);
}

.file-group {
  display: flex;
  flex-direction: column;
}

.form-control-file {
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
}

.file-label {
  margin-top: 10px;
  color: white;
}

.image-preview {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
}

.no-image-placeholder {
  padding: 10px;
  border: 1px dashed #ccc;
  text-align: center;
  color: #aaa;
}

input[type="file"]::-webkit-file-upload-button {
  /* Custom styles for the "No file chosen" text */
  color: rgba(30, 41, 59, 255);
  background-color: rgba(74, 222, 128, 255);
  border: 1px solid rgba(74, 222, 128, 255);
  border-radius: 5px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 16px;
}

input[type="file"]::-webkit-file-upload-button:hover {
  /* Hover styles for the "No file chosen" text */
  background-color: rgba(30, 41, 59, 255);
  color: white;
}


.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-actions button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.form-actions button:first-child {
  font-size: medium;
  background: rgba(245, 56, 56, 1);
  border: 1px solid rgba(245, 56, 56, 1);
  color: black;
}

.form-actions button:first-child:hover {
  background-color: rgba(30, 41, 59, 255);
  color: white;
}

.form-actions button:last-child {
  font-size: medium;
  background: rgba(74, 222, 128, 1);
  border: 1px solid rgba(74, 222, 128, 1);
  color: black;
}
.form-actions button:last-child:hover {
  background-color: rgba(30, 41, 59, 255);
  color: white;
}
hr {
    border: 1px solid #4ADE80;
    margin: 20px 0;
  }

  .multi-input-label {
  margin-top: 10px;
  display: block;
}

.multi-input-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.multi-input-item button {
  margin-left: 10px;
}

.features-list, .technologies-list {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>