<template>
    <main id="manage-page">
      <div class="page-wrap">
        <div class="page-header">
          <h3>Available-Projects</h3>
        </div>

        <button @click="openForm" class="btn-add">
            <!-- <span class="material-symbols-outlined">
                add
            </span> -->
            New Project
        </button>
  
        <div class="project-list">
          <div class="project-card" v-for="project in projects" :key="project.id">
            <img :src="project.picture" alt="Project Image" class="project-image" />
            <div class="project-details">
              <h2 class="project-name">{{ project.name }}</h2>
              <p class="project-description">{{ project.description }}</p>
              <p class="project-price">{{ project.price }}</p>
            </div>
          </div>
        </div>
  
      </div>
  
    </main>
    <AddProject @closeForm="openForm" v-if="show"/>
  </template>
  
  <script>
  import AddProject from './AddProject.vue';
  
  export default {
    name: 'ProjectList',
    components: { AddProject },
    data() {
      return {
        show: false,
        projects: [
          {
            id: 1,
            picture: 'src/assets/dairy-ms.jpg',
            name: 'Dairy MIS',
            description: 'A brief description of Project One.',
            price: '$100',
          },
          {
            id: 2,
            picture: 'src/assets/attendance2.webp',
            name: 'C Attendance App',
            description: 'A brief description of Project Two.',
            price: '$200',
          },
          {
            id: 3,
            picture: 'src/assets/e-commerce.webp',
            name: 'E-commerce MS',
            description: 'A brief description of Project Three.',
            price: '$300',
          },
          {
            id: 4,
            picture: 'src/assets/inventory.webp',
            name: 'Inventory MS',
            description: 'A brief description of Project Three.',
            price: '$300',
          },
          {
            id: 5,
            picture: 'src/assets/POS.webp',
            name: 'POS',
            description: 'A brief description of Project Three.',
            price: '$300',
          },
          {
            id: 6,
            picture: 'src/assets/E-commerce2.webp',
            name: 'Techy',
            description: 'A brief description of Project Three.',
            price: '$300',
          },
        ],
      };

    },
    methods: {
        openForm(){
            this.show = !this.show;
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

  .btn-add{
    padding: .4rem;
    background-color: rgba(74,222,128,255);
    color: white;
    width: 9rem;
    font-size: larger;
    font-weight: 600;
    cursor: pointer;
    text-align: center;
    justify-content: center;
    border: 1px solid rgba(74,222,128,255);
    margin-bottom: 20px;
    text-decoration: none;
    display: flex;
    gap: .2rem;
}

.btn-add:hover{
    box-shadow: 0px 0px 5px rgba(30,41,59,255);
}

.material-symbols-outlined{
    font-size: 1.5rem;
    font-weight: 600;
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
  