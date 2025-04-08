<template>
    <section>
      <div class="reset-password">
        <h2>Reset Password</h2>
        
        <!-- Step 1: Email Verification -->
        <div v-if="currentStep === 1" class="form-group">
          <input v-model="email" type="email" placeholder="Enter Email*" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
          <button @click="requestOTP" class="btn" :disabled="isRequestingOTP">
            {{ isRequestingOTP ? 'Sending OTP...' : 'Request OTP' }}
          </button>
        </div>
        
        <!-- Step 2: OTP Verification -->
        <div v-if="currentStep === 2" class="form-group">
          <p class="info-text">An OTP has been sent to your email</p>
          <input v-model="otp" type="text" placeholder="Enter OTP Code*" maxlength="6" />
          <span v-if="otpError" class="error">{{ otpError }}</span>
          <button @click="verifyOTP" class="btn" :disabled="isVerifyingOTP">
            {{ isVerifyingOTP ? 'Verifying...' : 'Verify OTP' }}
          </button>
          <p class="resend-link" @click="requestOTP">Didn't receive OTP? Resend</p>
        </div>
        
        <!-- Step 3: New Password -->
        <div v-if="currentStep === 3">
          <div class="form-group">
            <input v-model="password" type="password" placeholder="Enter New Password*" />
            <span v-if="passwordError" class="error">{{ passwordError }}</span>
          </div>
          
          <div class="form-group">
            <input v-model="confirmPassword" type="password" placeholder="Confirm New Password*" />
            <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
          </div>
          
          <button @click="resetPassword" class="btn" :disabled="isLoading">
            {{ isLoading ? 'Processing...' : 'Reset Password' }}
          </button>
        </div>
        
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        
        <!-- Navigation -->
        <div v-if="currentStep > 1" class="navigation">
          <button @click="goBack" class="back-btn">Back</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        currentStep: 1,
        email: '',
        otp: '',
        password: '',
        confirmPassword: '',
        emailError: '',
        otpError: '',
        passwordError: '',
        confirmPasswordError: '',
        successMessage: '',
        errorMessage: '',
        isLoading: false,
        isRequestingOTP: false,
        isVerifyingOTP: false,
        otpVerified: false
      };
    },
  
    computed: {
      ...mapGetters(['getForgotpass', 'getResetPasswordStatus']),
    },
  
    methods: {
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.emailError = !this.email 
          ? 'Email is required' 
          : !emailRegex.test(this.email)
            ? 'Please enter a valid email address'
            : '';
        
        return this.emailError === '';
      },
  
      validateOTP() {
        this.otpError = !this.otp 
          ? 'OTP is required'
          : this.otp.length !== 6
            ? 'OTP must be 6 digits'
            : '';
        
        return this.otpError === '';
      },
  
      validatePassword() {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        this.passwordError = !this.password
          ? 'Password is required'
          : !passwordRegex.test(this.password)
            ? 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number'
            : '';
  
        this.confirmPasswordError = !this.confirmPassword
          ? 'Please confirm your password'
          : this.confirmPassword !== this.password
            ? 'Passwords do not match'
            : '';
  
        return this.passwordError === '' && this.confirmPasswordError === '';
      },
  
      async requestOTP() {
        // Clear previous error messages
        this.errorMessage = '';
        this.successMessage = '';
        
        if (!this.validateEmail()) {
          return;
        }
        
        try {
          this.isRequestingOTP = true;
          const payload = { email: this.email };
          const result = await this.$store.dispatch('forgotPassword', payload);
          
          if (result) {
            this.successMessage = 'OTP sent successfully to your email';
            this.currentStep = 2;
          } else {
            this.errorMessage = 'Failed to send OTP. Please check your email and try again.';
          }
        } catch (error) {
          this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
          console.error('Request OTP error:', error);
        } finally {
          this.isRequestingOTP = false;
        }
      },
      
      async verifyOTP() {
        // Clear previous messages
        this.errorMessage = '';
        this.successMessage = '';
        
        if (!this.validateOTP()) {
          return;
        }
        
        try {
          this.isVerifyingOTP = true;
          const payload = { 
            email: this.email,
            otp: this.otp 
          };
          
          const result = await this.$store.dispatch('verifyOTP', payload);
          
          if (result && result.success) {
            this.successMessage = 'OTP verified successfully';
            this.otpVerified = true;
            this.currentStep = 3;
          } else {
            this.errorMessage = result.message || 'Invalid OTP. Please try again.';
          }
        } catch (error) {
          this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
          console.error('Verify OTP error:', error);
        } finally {
          this.isVerifyingOTP = false;
        }
      },
  
      async resetPassword() {
        // Clear previous messages
        this.successMessage = '';
        this.errorMessage = '';
        
        // Validate inputs
        if (!this.validatePassword()) {
          return;
        }
        
        // Check if OTP was verified
        if (!this.otpVerified) {
          this.errorMessage = 'Please verify your OTP first';
          this.currentStep = 2;
          return;
        }
        
        // Prepare payload
        const payload = {
          email: this.email,
          otp: this.otp,
          newPassword: this.password,
          confirmPassword: this.confirmPassword
        };
        
        try {
          this.isLoading = true;
          const result = await this.$store.dispatch('resetPassword', payload);
          
          if (result.success) {
            this.successMessage = result.message || 'Password successfully updated!';
            // Reset form fields on success
            setTimeout(() => {
              this.email = '';
              this.otp = '';
              this.password = '';
              this.confirmPassword = '';
              this.currentStep = 1;
              this.otpVerified = false;
              
              // Redirect to login page after success
              this.$router.push('/login');
            }, 2000);
          } else {
            this.errorMessage = result.message || 'Failed to reset password. Please try again.';
          }
        } catch (error) {
          this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
          console.error('Reset password error:', error);
        } finally {
          this.isLoading = false;
        }
      },
      
      goBack() {
        this.currentStep -= 1;
        this.errorMessage = '';
        this.successMessage = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .reset-password {
    max-width: 500px;
    margin: auto;
    padding: 60px;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid #8ddbf7;
    margin-top: 150px;
  }
  
  .reset-password h2 {
    text-align: center;
    font-size: 32px;
    color: rgb(101, 138, 201);
    margin-bottom: 30px;
  }
  
  .reset-password input {
    width: 100%;
    height: 45px;
    padding-left: 15px;
    margin-bottom: 11px;
    border: 1px solid #8ddbf7;
    border-radius: 4px;
    transition: border-color 0.3s;
    margin-top: 20px;
  }
  
  .reset-password input:focus {
    background: #ffffff;
    outline: none;
    border-color: rgb(27, 29, 83);
    box-shadow: 0 0 5px rgba(135, 206, 250, 0.5);
  }
  
  .reset-password button {
    width: 100%;
    height: 45px;
    border: none;
    background: #99d2f8;  
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .reset-password button:hover {
    background: #8ddbf7;
  }
  
  .reset-password button:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
  
  .error {
    color: red;
    font-size: 14px;
    margin-top: 2px;
  }
  
  .success {
    color: green;
    font-size: 16px;
    margin-top: 10px;
    text-align: center;
  }
  
  .navigation {
    display: flex;
    justify-content: flex-start;
    margin-top: 10px;
  }
  
  .back-btn {
    width: auto !important;
    padding: 0 20px;
    background-color: #e0e0e0 !important;
    color: #333 !important;
  }
  
  .back-btn:hover {
    background-color: #d0d0d0 !important;
  }
  
  .info-text {
    color: #4a90e2;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .resend-link {
    color: #4a90e2;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
    cursor: pointer;
    text-decoration: underline;
  }
  </style>