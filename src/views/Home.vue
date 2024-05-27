<template>
	<main id="manage-page">
		<div class="page-header">
            <h2>Homepage</h2>
        </div>

        <div class="btn-top">
			
            <div class="section-1">
                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    <img :src="cartSrc" alt="">
                    </span>
                    <div class="pelet1cont">
                        <h3>DAIRY MS</h3>
                    </div>
                </div>

                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    shopping_cart_checkout
                    </span>
                    <div class="pelet1cont">
                        <h2>Sell</h2>
                        <h3>(Credit)</h3>
                    </div>
                </div>

                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    shopping_cart
                    </span>
                    <div class="pelet1cont">
                        <h2>Buy</h2>
                    </div>
                </div>
    
            </div>

           <div class="section-2">

                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    add_circle
                    </span>
                    <div class="pelet1cont">
                        <h2>Customers</h2>
                    </div>
                </div>
        
                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    add_circle
                    </span>
                    <div class="pelet1cont">
                        <h2>Suppliers</h2>
                    </div>
                </div>

                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    add_circle
                    </span>
                    <div class="pelet1cont">
                        <h2>Products</h2>
                    </div>
                </div>
           </div>

            <div class="section-3">
        
                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    <img :src="cartSrc" alt="">
                    </span>
                    <div class="pelet1cont">
                        <h2>Stores</h2>
                    </div>
                </div>
            
                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    add_circle
                    </span>
                    <div class="pelet1cont">
                        <h2>Users</h2>
                    </div>
                </div>
            
                <div class="pelet1">
                    <span class="material-symbols-outlined">
                    power_settings_new
                    </span>
                    <div class="pelet1cont">
                        <h2>Logout</h2>
                    </div>
                </div>

            </div>

        </div>

			<router-view></router-view>
	</main>
</template>

<script>

export default{
	data(){
		return {
            // logoSrc: 'src/components/icons/samis.png',
            cartSrc: 'src/assets/logo.png',
            dairySrc: 'src/assets/dairy-ms.jpg'
		}
	},

    created() {
       
    },

	methods: {
		


	}
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.pelet1{
    background-color: white;
    color: teal;
    text-align: center;
    /* justify-content: center; */
    /* align-items: center; */
    padding: 3.5rem;
    width: 20rem;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(74,222,128,255);
    /* display: flex; */
    gap: .3rem;
    cursor: pointer;
    /* grid-template-columns: repeat(2, 2fr); */
    text-decoration: none;
    
}
.pelet1:hover{
    box-shadow: 0px 0px 5px red;
}
.router-pelet1{
    text-decoration: none;
}
/* h2{
    font-weight: 600;
    font-family: ui-monospace;
    font-size: x-large;
} */

.material-symbols-outlined{
    font-size: 4rem;
}

.page-header{
    color: rgba(30,41,59,255);
}

.section-1{
    display: flex;
    flex-wrap: wrap;
    gap: .8rem;
}

.section-2{
    display: flex;
    flex-wrap: wrap;
    gap: .8rem;
    margin-top: .8rem;
}

.section-3{
    display: flex;
    flex-wrap: wrap;
    gap: .8rem;
    margin-top: .8rem;
}

/* rgba(30,41,59,255)    
white - rgba(241,245,249,255)    
green -  rgba(74,222,128,255) */

/* Styles for larger screens */
@media only screen and (min-width: 768px) {
    .btn-top{
      margin-top: 13px;
      
    }
}

/* Styles for smaller screens */
@media only screen and (max-width: 767px) {
    .btn-top{
        margin-top: .5rem;
        padding-left: 1.5rem;
    }
    .page-header{
      padding-left: 1.5rem;
    }
}
</style>