<template>
    <div class="form-wrap">
      <div class="form-content">
        <div class="cancel" @click="$emit('closeForm')">
          <i class="fas fa-times"></i>
        </div>
        <div class="form-title">
          <h2>{{ project ? 'Edit Project' : 'New Project' }}</h2>
        </div>
        <hr>
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
  
          <div class="form-group feature-technology-group">
            <label>Add Feature</label>
            <div class="input-group">
              <input
                type="text"
                v-model="newFeature"
                class="form-control"
                placeholder="Enter a feature"
              />
              <button @click="addFeature" class="add-button">Add</button>
            </div>
            <textarea class="form-control display-area" readonly :value="formData.features.join(', ')"></textarea>
          </div>
  
          <div class="form-group feature-technology-group">
            <label>Add Technology</label>
            <div class="input-group">
              <input
                type="text"
                v-model="newTechnology"
                class="form-control"
                placeholder="Enter a technology"
              />
              <button @click="addTechnology" class="add-button">Add</button>
            </div>
            <textarea class="form-control display-area" readonly :value="formData.technologies.join(', ')"></textarea>
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
        </div>
        <hr>
        <div class="form-actions">
          <button @click="$emit('closeForm')">Close</button>
          <button @click="saveProject">{{ project ? 'Update' : 'Add' }}</button>
        </div>
      </div>
      <popMenu :message="popMessage" :borderColor="popBorderColor" v-if="show"/>
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
            this.formData = { 
              ...newValue, 
              picture: '', 
              projectPdf: '',
              features: newValue.features || [],
              technologies: newValue.technologies || []
            }; // Initialize picture and projectPdf as empty for new uploads
            if (newValue.picture) {
              this.formData.picture = `data:image/jpeg;base64,${newValue.picture}`;
            }
            if (newValue.projectPdf) {
              this.formData.projectPdf = newValue.projectPdf;
            }
          } else {
            this.formData = { 
              id: null, 
              name: '', 
              description: '', 
              price: '', 
              features: [], 
              overview: '', 
              technologies: [], 
              picture: '', 
              projectPdf: '' 
            };
          }
        }
      }
    },
    methods: {
      addFeature() {
        if (this.newFeature.trim()) {
          this.formData.features.push(this.newFeature.trim());
          this.newFeature = '';
        }
      },
      addTechnology() {
        if (this.newTechnology.trim()) {
          this.formData.technologies.push(this.newTechnology.trim());
          this.newTechnology = '';
        }
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
        if (!this.formData.name || !this.formData.description || !this.formData.price || !this.formData.features.length || !this.formData.overview || !this.formData.technologies.length || !this.formData.picture || !this.formData.projectPdf) {
          this.invokeMenu("Fill all fields!", "red");
        } else {
          this.invokeMenu("Saving project data...", "blue");
  
          const formData = new FormData();
          formData.append('name', this.formData.name);
          formData.append('description', this.formData.description);
          formData.append('price', this.formData.price);
          formData.append('features', JSON.stringify(this.formData.features));
          formData.append('overview', this.formData.overview);
          formData.append('technologies', JSON.stringify(this.formData.technologies));
  
          if (this.selectedFile) {
            formData.append('picture', this.selectedFile);
          } else if (this.project && this.project.picture) {
            formData.append('picture', this.project.picture);
          }
  
          if (this.selectedZip) {
            formData.append('projectPdf', this.selectedZip);
          } else if (this.project && this.project.projectPdf) {
            formData.append('projectPdf', this.project.projectPdf);
          }
  
          if (this.project && this.project.id) {
            formData.append('id', this.project.id);
          }
  
          const createUrl = "http://localhost:8080/api/project";
          const updateUrl = "http://localhost:8080/api/project/updateProject";
          const method = this.project ? 'post' : 'post';
          const apiUrl = this.project ? updateUrl : createUrl;
  
          try {
            console.log(`Saving project to URL: ${apiUrl} with method: ${method}`);
            const response = await axios({
              method: method,
              url: apiUrl,
              data: formData,
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
                default:
                  this.invokeMenu(responseData.responseMessage, "red");
              }
            } else {
              this.invokeMenu(`Unexpected response status: ${response.status}`, "red");
            }
          } catch (error) {
            this.invokeMenu("ERROR SAVING PROJECT DATA!", "red");
            console.error('Error saving project data:', error);
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .form-wrap {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-content {
    position: relative;
  }
  
  .cancel {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  
  .form-title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .form-group {
    flex: 1 1 100%;
    position: relative;
  }
  
  .feature-technology-group {
    margin-top: 20px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
  }
  
  .add-button {
    margin-left: 10px;
  }
  
  .display-area {
    margin-top: 10px;
    width: 100%;
    height: 100px;
    resize: none;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }
  
  .form-group label {
    position: absolute;
    top: -12px;
    left: 10px;
    font-size: 12px;
    color: #777;
    background: #fff;
    padding: 0 5px;
  }
  
  .file-group input {
    display: block;
  }
  
  .file-label {
    display: block;
    margin-top: 10px;
  }
  
  .image-preview {
    margin-top: 20px;
  }
  
  .preview-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .no-image-placeholder {
    margin-top: 20px;
    text-align: center;
    color: #ccc;
  }
  
  .form-actions {
    text-align: right;
    margin-top: 20px;
  }
  
  .form-actions button {
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  .form-actions button:hover {
    background-color: #0056b3;
  }
  
  @media (max-width: 600px) {
    .form-group {
      flex: 1 1 100%;
    }
  }
  </style>
  