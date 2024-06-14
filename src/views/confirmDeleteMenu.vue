<template>
    <div class="wrap">
      <div class="msg-body" :style="{ borderColor: borderColor }">
        <h2>{{ message }}</h2>
        <div class="btn-container">
            <button class="btn-cancel" @click="cancel">NO</button>
            <button class="btn-confirm" @click="confirm">YES</button>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
      borderColor: {
        type: String,
        default: 'gold'
      }
    },
    methods: {
      confirm() {
        this.$emit('confirm');
      },
      cancel() {
        this.$emit('cancel');
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
  
  .wrap {
    background-color: rgba(17, 167, 167, 0.5);
    width: 100%;
    height: 100%;
    z-index: 1000;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    position: fixed;
  }
  
  .msg-body {
    padding: 30px;
    background-color: teal;
    color: white;
    text-align: center;
    width: 25rem;
    margin: auto;
    margin-top: 300px;
    border-radius: 0.5rem;
    border: 2px solid;
  }
  
  h2 {
    font-weight: 600;
    font-family: ui-monospace;
    font-size: larger;
  }
  
  .btn-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .btn-container button:first-child{
    padding: 0.5rem 1rem;
    margin: 0 10px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    outline: none;

    background-color: rgba(74, 222, 128, 255);
    color: black;
    border: 2px solid white;
  }

  .btn-container button:first-child:hover{
    background-color: teal;
    color: white;
  }

  .btn-container button:last-child{
    padding: 0.5rem 1rem;
    margin: 0 10px;
    cursor: pointer;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    outline: none;

    background-color: rgba(239, 68, 68, 255);
    color: black;
    border: 2px solid rgba(239, 68, 68, 255);
  }
  .btn-container button:last-child:hover{
    background-color: teal;
    color: red;
  }
  
  
  @media only screen and (max-width: 767px) {
    .msg-body {
      width: 85%;
    }
  }
  </style>
  