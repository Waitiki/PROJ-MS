<template>

    <h2>products</h2>
    <p>{{ products }}</p>
</template>

<script>

export default{
    data(){
        return {
            products: [],
            schools: [],
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
            name: 'Class Attendance App',
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
        fetchProjects() {
            this. projects = [
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
                    name: 'Class Attendance App',
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
                ];
            // axios.get('https://api.yourwebsite.com/projects')
            //   .then(response => {
            //     this.projects = response.data;
            //   })
            //   .catch(error => {
            //     console.error('Error fetching projects:', error);
            //   });
            },
        async saveSchool() {
        if (!this.schoolData.installationDate ||
            !this.schoolData.expiryDate ||
            !this.schoolData.marketedBy ||
            !this.schoolData.regional ||
            !this.schoolData.installedby) {
            this.invokeMenu("FILL ALL FIELDS!!", "red");
        } else {
            this.invokeMenu("UPDATING SCHOOL DETAILS...", "blue");

            try{

                const updatedDetails = {
                installationDate: this.schoolData.installationDate,
                expiryDate: this.schoolData.expiryDate,
                marketedBy: this.schoolData.marketedBy,
                regional: this.schoolData.regional,
                installedby: this.schoolData.installedby,
                };
                await axios.post("https://api.samis.co.ke/samis/admin/update" + this.school.installationID, updatedDetails);
                this.invokeMenu("SCHOOL DATA UPDATED SUCCESSFULLY");
                this.getExpenses();
                }catch(e){
                console.log(e);
                this.invokeMenu("ERROR UPDATING SCHOOL DETAILS!!", "red")
                }
        }
    }
        
    }
}
</script>
