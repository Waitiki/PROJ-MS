<template>
    <div class="spinner-overlay">
      <div class="spinner"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoadingSpinner',
  };
  </script>
  
  <style scoped>
  .spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(17, 167, 167, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .spinner {
    border: 16px solid #f3f3f3;
    border-top: 16px solid rgba(74, 222, 128, 255);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .spinner {
      width: 90px;
      height: 90px;
      border-width: 12px;
    }
  }
  
  @media (max-width: 480px) {
    .spinner {
      width: 60px;
      height: 60px;
      border-width: 8px;
    }
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  </style>
  