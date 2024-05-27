<template>
    <div class="page-wrap">
      <div class="form-content">
        <div class="cancel">
          <span @click="$emit('closeForm')">
            <i class="fas fa-times"></i>
          </span>
        </div>
        <div class="member-title">
          <h2>{{ school ? (isEditable ? 'Edit School' : 'School Details') : 'New School' }}</h2>
        </div>
        <hr>
        <div class="form-inputs">
          <template v-if="isEditable">
            <div class="form-group" v-for="field in editableFields" :key="field">
              <input
                :type="inputType(field)"
                class="x"
                :id="field"
                v-model="schoolData[field]"
                placeholder=" "
                :disabled="!isEditable"
              />
              <label :for="field">{{ formatLabel(field) }}</label>
            </div>
          </template>
          <template v-else>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, key) in schoolData" :key="key">
                    <td>{{ formatLabel(key) }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </div>
        <hr>
        <div class="btn-register" v-if="isEditable">
          <button @click="$emit('closeForm')">CLOSE</button>
          <button @click="saveSchool">{{ school ? 'UPDATE' : 'ADD' }}</button>
        </div>
      </div>
    </div>
  </template>
<script>
export default {
  props: {
    school: {
      type: Object,
      default: () => null
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      schoolData: this.school
        ? { ...this.school }
        : {
            installationDate: '', expiryDate: '', marketedBy: '', regional: '', installedby: '',
            schoolCode: '', schoolName: '', phoneNo: '', lastLogin: '', installationID: '',
            computerID: '', username: '', module: '', systemVersion: '', currentTerm: '',
            students: '', receipts: '', vouchers: '', employees: '', message: ''
          }
    };
  },
  computed: {
    editableFields() {
      return ['installationDate', 'expiryDate', 'marketedBy', 'regional', 'installedby'];
    }
  },
  watch: {
    school(newSchool) {
      this.schoolData = newSchool
        ? { ...newSchool }
        : {
            installationDate: '', expiryDate: '', marketedBy: '', regional: '', installedby: '',
            schoolCode: '', schoolName: '', phoneNo: '', lastLogin: '', installationID: '',
            computerID: '', username: '', module: '', systemVersion: '', currentTerm: '',
            students: '', receipts: '', vouchers: '', employees: '', message: ''
          };
    }
  },
  methods: {
    saveSchool() {
      // Assuming you have an API endpoint for updating school details
      // You can customize this according to your backend API structure
      const updatedDetails = {
        installationDate: this.schoolData.installationDate,
        expiryDate: this.schoolData.expiryDate,
        marketedBy: this.schoolData.marketedBy,
        regional: this.schoolData.regional,
        installedby: this.schoolData.installedby,
      };

      // Example of API call using Axios
      axios.put('/api/school/' + this.school.id, updatedDetails)
        .then(response => {
          // Handle success response
          console.log('School details updated successfully');
        })
        .catch(error => {
          // Handle error
          console.error('Error updating school details:', error);
        });
    },
    inputType(key) {
      if (key.includes('Date') || key === 'lastLogin') return 'date';
      if (['students', 'receipts', 'vouchers', 'employees', 'systemVersion'].includes(key)) return 'number';
      return 'text';
    },
    formatLabel(key) {
      return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
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
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 5px rgba(74, 222, 128, 255);
  width: 24rem;
  max-height: 90%;
  overflow-y: auto;
  transition: all 0.3s ease;
}
.form-inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}
.table-responsive {
  width: 100%;
  overflow-x: auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}
.table th,
.table td {
  padding: 0.75rem;
  border: 1px solid rgba(74, 222, 128, 255);
  text-align: left;
}
.table th {
  background-color: rgba(30, 41, 59, 255);
  color: white;
}
.table td {
  background-color: rgba(17, 167, 167, 0.2);
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
.cancel span {
  cursor: pointer;
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

/* Fade transition for dynamic content */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, height 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>
  