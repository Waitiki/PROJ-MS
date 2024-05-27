<template>
    <popMenu :message="popMessage" v-if="show"/>
    <div class="page-wrap">
        <div class="form-content">
            <!-- <div class="cancel">
                <span @click="$emit('closeForm')">
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div> -->
            <div class="member-title">
                <h2>Login</h2>
            </div>
            <hr>
            <div class="form-inputs">
                <div class="form-group">
                    <input 
                        type="text" 
                        class="x" 
                        id="Username" 
                        placeholder=" " 
                        v-model="loginData.username"
                    />
                    <label for="supplier-name">Username</label>
                </div>
                <div class="form-group">
                    <input 
                        type="text" 
                        class="x" 
                        id="password" 
                        placeholder=" " 
                        v-model="loginData.password"
                    />
                    <label for="phone-number">Password</label>
                </div>
            </div>
            <hr>
            <div class="btn-register">
                <button @click="loginNow">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import popMenu from './popMenu.vue';

export default {
    components: { popMenu },
    props: {
       
    },
    data() {
        return {
            show: false,
            popMessage: "",
            loginData: { username: '', password: ''}
            
        };
    },
    methods: {
        invokeMenu(value){
            this.popMessage = value;
            this.show = true;

            setTimeout(() => {
                this.show = false;
            }, 3000);
        },
        loginNow() {
            if(!this.loginData.username || !this.loginData.password){
                this.invokeMenu("ALL FIELDS ARE MANDATORY!");
            }else{
                this.invokeMenu("REDIRECTING TO HOME PAGE...");

                let loginDetails = {
                    username: this.loginData.username,
                    password: this.loginData.password
                };
            }
            
        }
    },
    watch: {
       
    }
}
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
    border-radius: 5px;
    padding: 20px !important;
    min-height: 15rem;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 5px rgba(74, 222, 128, 255);
    width: 24rem;
}
.form-inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
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
  padding: 8px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid rgba(74,222,128,255);
  border-radius: 0;
  background: transparent;
  color: white;
}

.x:focus {
  outline: none;
  border-color: rgba(74,222,128,255);
}

.x:focus + label,
.x:not(:placeholder-shown) + label {
  top: -14px;
  font-size: 16px;
  color: rgba(74,222,128,255);
}

label {
  position: absolute;
  top: 10px;
  left: 8px;
  font-size: 16px;
  color: white;
  transition: top 0.3s, font-size 0.3s, color 0.3s;
}


.cancel {
    color: white;
    display: flex;
    flex-direction: row-reverse;
    font-size: large;
}
button {
    background-color: rgba(30, 41, 59, 255);
    color: white;
    padding: .3rem;
    border-radius: .5rem;
    cursor: pointer;
    font-size: medium;
    font-weight: 300;
    font-family: ui-monospace;
    box-shadow: 0px 0px 5px white;
}
button:hover {
    background-color: rgba(74, 222, 128, 255);
    color: rgba(30, 41, 59, 255);
    box-shadow: 0px 0px 5px white !important;
}
.btn-register {
    padding-top: .5rem;
    display: flex;
    gap: .8rem;
}
hr {
    margin-top: .5rem;
    margin-bottom: .5rem;
}
@media only screen and (max-width: 767px) {
    .form-content {
        width: 80%;
    }
}
</style>