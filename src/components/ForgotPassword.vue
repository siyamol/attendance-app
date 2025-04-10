<template>
  <div class="forgot-password">
    <h2>Forgot Password</h2>

    <div v-if="step === 1">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="Enter email" />
      <button @click="generateOtp">Send OTP</button>
    </div>

    <div v-else-if="step === 2">
      <label>Enter OTP</label>
      <input v-model="otp" type="text" placeholder="Enter OTP" />
      <button @click="verifyOtp">Verify OTP</button>
    </div>

    <div v-else-if="step === 3">
      <label>New Password</label>
      <input v-model="newPassword" type="password" placeholder="New Password" />
      <label>Confirm Password</label>
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
      <button @click="resetPassword">Reset Password</button>
    </div>

    <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const otp = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const step = ref(1)
const message = ref('')
const messageColor = ref('green')

// Backend API base URL
const BASE_URL = 'http://185.131.54.8:8080/'

const generateOtp = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/AdminReg/forgot-password?email=${encodeURIComponent(email.value)}`
    )
    if (res.status === 200) {
      step.value = 2
      showMessage('OTP sent successfully', 'green')
    }
  } catch (err) {
    const msg = err.response?.data?.message || 'Error sending OTP'
    showMessage(msg, 'red')
  }
}

const verifyOtp = () => {
  if (otp.value.trim()) {
    step.value = 3
    showMessage('OTP verified. Please set your new password.', 'green')
  } else {
    showMessage('Invalid OTP. Please try again.', 'red')
  }
}

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    showMessage('Passwords do not match', 'red')
    return
  }

  try {
    const res = await axios.post(`${BASE_URL}/AdminReg/reset-password`, {
      email: email.value,
      otp: otp.value,
      newPassword: newPassword.value
    }, {
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.status === 200) {
      showMessage('Password reset successfully', 'green')
      // Optionally reset form or navigate to login
    }
  } catch (err) {
    const msg = err.response?.data?.message || 'Error resetting password'
    showMessage(msg, 'red')
  }
}

const showMessage = (msg, color) => {
  message.value = msg
  messageColor.value = color
  setTimeout(() => (message.value = ''), 4000)
}
</script>

<style scoped>
.forgot-password {
  max-width: 400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
label {
  font-weight: bold;
}
</style>
