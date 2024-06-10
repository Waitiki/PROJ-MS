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
        fetchSchools() {
            this.schools = [
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad00444',
                schoolName: 'ST. FRANCIS',
                phoneNo: '0791200858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            {
                schoolCode: 'ad22444',
                schoolName: 'ST. LWANGA',
                phoneNo: '0791234858',
                
                installationDate: '2022-04-04', // Use YYYY-MM-DD format
                expiryDate: '2024-04-04', // Use YYYY-MM-DD format
                lastLogin: '2022-03-04',
                regional: 'Western',
                marketedBy: 'JOHN',
                installedby: 'MAX',
                installationID: 'S2232S',
                computerID: '100002DS2',
                username: 'jed',
                module: 'FINANCE',
                systemVersion: 1.2,
                currentTerm: 'Term 2',
                
                students: 500,
                receipts: 13,
                vouchers: 10,
                employees: 5,
                message: '',
            },
            ];
        },
        
        fetchProducts(){
            this.products = [
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand',
                model: 'Model A',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand A',
                model: 'Model X',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 2',
                partNumber: '54321',
                make: 'Brand B',
                model: 'Model Y',
                year: 2023,
                wholesalePrice: '$60',
                minimumPrice: '$50',
                retailPrice: '$70'
            },
            { 
                name: 'Product 3',
                partNumber: '98765',
                make: 'Brand C',
                model: 'Model Z',
                year: 2021,
                wholesalePrice: '$70',
                minimumPrice: '$60',
                retailPrice: '$80'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand',
                model: 'Model A',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand A',
                model: 'Model X',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 2',
                partNumber: '54321',
                make: 'Brand B',
                model: 'Model Y',
                year: 2023,
                wholesalePrice: '$60',
                minimumPrice: '$50',
                retailPrice: '$70'
            },
            { 
                name: 'Product 3',
                partNumber: '98765',
                make: 'Brand C',
                model: 'Model Z',
                year: 2021,
                wholesalePrice: '$70',
                minimumPrice: '$60',
                retailPrice: '$80'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand',
                model: 'Model A',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand A',
                model: 'Model X',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 2',
                partNumber: '54321',
                make: 'Brand B',
                model: 'Model Y',
                year: 2023,
                wholesalePrice: '$60',
                minimumPrice: '$50',
                retailPrice: '$70'
            },
            { 
                name: 'Product 3',
                partNumber: '98765',
                make: 'Brand C',
                model: 'Model Z',
                year: 2021,
                wholesalePrice: '$70',
                minimumPrice: '$60',
                retailPrice: '$80'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand',
                model: 'Model A',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 1',
                partNumber: '12345',
                make: 'Brand A',
                model: 'Model X',
                year: 2022,
                wholesalePrice: '$50',
                minimumPrice: '$40',
                retailPrice: '$60'
            },
            { 
                name: 'Product 2',
                partNumber: '54321',
                make: 'Brand B',
                model: 'Model Y',
                year: 2023,
                wholesalePrice: '$60',
                minimumPrice: '$50',
                retailPrice: '$70'
            },
            { 
                name: 'Product 3',
                partNumber: '98765',
                make: 'Brand C',
                model: 'Model Z',
                year: 2021,
                wholesalePrice: '$70',
                minimumPrice: '$60',
                retailPrice: '$80'
            },

            ]
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
