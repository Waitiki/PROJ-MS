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
        <div class="image-preview" v-if="formData.picture">
          <img :src="formData.picture" alt="Project Image Preview" class="preview-image" />
        </div>
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
        name: '',
        description: '',
        price: '',
        picture: ''
      },
      fields: [
        { key: 'name', label: 'Project Name', type: 'text' },
        { key: 'description', label: 'Project Description', type: 'text' },
        { key: 'price', label: 'Project Price', type: 'text' },
      ],
      selectedFile: null
    };
  },
  watch: {
    project: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.formData = { ...newValue, picture: newValue.picture || '' };
        } else {
          this.formData = { name: '', description: '', price: '', picture: '' };
        }
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        this.formData.picture = URL.createObjectURL(file);
        this.selectedFile = file;
      } else {
        this.invokeMenu("Invalid file type. Only PNG, JPEG, JPG, and WEBP are allowed.", "red");
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
      if (!this.formData.name || !this.formData.description || !this.formData.price ||!this.formData.picture) {
        this.invokeMenu("FILL ALL FIELDS!!", "red");
      } else {
        this.invokeMenu("SAVING PROJECT DATA...", "blue");

        const formData = new FormData();
        formData.append('name', this.formData.name);
        formData.append('description', this.formData.description);
        formData.append('price', this.formData.price);

        if (this.selectedFile) {
          formData.append('picture', this.selectedFile);
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
          this.$emit('closeForm');
        })
        .catch(error => {
          this.invokeMenu("ERROR SAVING PROJECT DATA!!", "red");
          console.error('Error saving project data:', error);
        });
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
  background: rgba(245, 56, 56, 1);
  color: white;
}

.form-actions button:first-child:hover {
  border: 1px solid rgba(245, 56, 56, 1);
  background-color: rgba(30, 41, 59, 255);
}

.form-actions button:last-child {
  background: rgba(74, 222, 128, 1);
  color: white;
}
.form-actions button:last-child:hover {
  border: 1px solid rgba(74, 222, 128, 1);
  background-color: rgba(30, 41, 59, 255);
}
hr {
    border: 1px solid #4ADE80;
    margin: 20px 0;
  }
</style>