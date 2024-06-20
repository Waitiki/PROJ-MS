<template>
  <div class="project-details-page">
    <button @click="goBack" class="btn-back">Back</button>
    <div class="project-details-card">
      <div class="header">
        <img :src="getImageUrl(project.picture)" alt="Project Image" class="project-image" />
        <div class="project-header-details">
          <h2 class="project-name">{{ project.name }}</h2>
          <p class="project-description">{{ project.description }}</p>
          <p class="project-price">Price: {{ project.price }}</p>
          <button @click="purchaseProject" class="btn-purchase" v-if="!isPaid">Purchase</button>
          <p v-if="isPaid" class="purchase-confirmation">Purchased</p>
        </div>
      </div>
      <div class="tabs">
        <button :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">Overview</button>
        <button :class="{ active: activeTab === 'technologies' }" @click="activeTab = 'technologies'">Technologies Used</button>
        <button :class="{ active: activeTab === 'download' }" @click="activeTab = 'download'">Payments & Download</button>
      </div>
      <div class="tab-content" v-if="activeTab === 'overview'">
        <h3>Overview</h3>
        <p>{{ project.overview }}</p>
        <div class="dates">
          <h4>Created On:</h4>
          <p style="color: #007bff;">{{ project.creationDate }}</p>
        </div>
        <div class="dates">
          <h4>Modified On:</h4>
          <p style="color: #4ade80;">{{ project.modifiedAt }}</p>
        </div>
        <h3>Features:</h3>
        <ul class="project-features">
          <li v-for="(feature, index) in project.features" :key="index">{{ feature }}</li>
        </ul>
      </div>
      <div class="tab-content" v-if="activeTab === 'technologies'">
        <h3>Technologies Used</h3>
        <ul class="project-technologies">
          <li v-for="(technology, index) in project.technologies" :key="index">{{ technology }}</li>
        </ul>
      </div>
      <div class="tab-content" v-if="activeTab === 'download'">
        <h3>Payments & Download</h3>
        <p v-if="!isPaid">Please make the payment to download the project.</p>
        <button @click="makePayment" class="btn-pay" v-if="!isPaid">Make Payment</button>
        <p v-else>Payment confirmed! You can now download the project.</p>
        <button @click="downloadProject" class="btn-download" :disabled="!isPaid">Download Project</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetails',
  props: {
    project: Object
  },
  data() {
    return {
      activeTab: 'overview',
      isPaid: false
    };
  },
  methods: {
    goBack() {
      this.$emit('closeDetails');
    },
    purchaseProject() {
      // Implement the purchase logic here
      alert(`Purchasing project: ${this.project.name}`);
      this.isPaid = true; // This should be set to true only after successful payment
    },
    makePayment() {
      // Implement the payment logic here
      alert(`Processing payment for: ${this.project.name}`);
      this.isPaid = true; // This should be set to true only after successful payment
    },
    downloadProject() {
      if (this.isPaid) {
        // Implement the download logic here
        alert(`Downloading project: ${this.project.name}`);
      } else {
        alert('Please make the payment before downloading the project.');
      }
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
.project-details-page {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-back {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4ade80;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 5px;
}

.btn-back:hover {
  background-color: #6fcf94;
}

.project-details-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
  transition: transform 0.3s;
}

.project-details-card:hover {
  transform: translateY(-5px);
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.project-image {
  width: 50%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.project-header-details {
  padding: 20px;
  width: 50%;
}

.project-name {
  font-size: 2.5em;
  margin: 10px 0;
  color: #333;
}

.project-description {
  font-size: 1.2em;
  margin: 10px 0;
  color: #666;
}

.project-price {
  font-size: 1.5em;
  color: #007bff;
  margin: 10px 0;
}

.purchase-confirmation {
  color: #4ade80;
  font-size: 1.2em;
}

.btn-purchase,
.btn-pay,
.btn-download {
  padding: 15px 30px;
  background-color: #4ade80;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1.2em;
  margin-top: 20px;
  border-radius: 5px;
}

.btn-purchase:hover,
.btn-pay:hover,
.btn-download:hover {
  background-color: #3acb70;
}

.btn-download:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f0f0f0;
  border-top: 1px solid #ddd;
  padding: 10px 0;
}

.tabs button {
  flex: 1;
  padding: 15px;
  border: none;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s;
  font-size: 1.2em;
  min-width: 120px;
}

.tabs button.active {
  background-color: #fff;
  border-bottom: 2px solid #007bff;
}

.tabs button:hover {
  background-color: #e0e0e0;
}

.tab-content {
  padding: 20px;
}

.dates {
  display: flex;
  gap: 0.4rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.project-date,
.project-features,
.project-technologies {
  margin: 10px 0;
}

.project-features,
.project-technologies {
  list-style-type: disc;
  padding-left: 20px;
}

@media only screen and (min-width: 767px) {
  .project-details-page, .header{
    padding: 20px;
  }
}

@media only screen and (max-width: 767px) {
  .project-details-page{
    margin-left: 1.3rem;
    width: 100%;
  }
  .header {
    flex-direction: column;
    align-items: center;
  }

  .project-image,
  .project-header-details {
    width: 100%;
  }
  .project-name {
    font-size: 1.3em;
  }

  .btn-purchase,
  .btn-pay,
  .btn-download {
    font-size: 1em;
    width: 100%;
  }

  .tabs {
    flex-direction: column;
  }

  .tabs button {
    font-size: 1em;
    padding: 10px;
  }
}
</style>  
  