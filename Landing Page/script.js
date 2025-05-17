document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        })
      }
    })
  })

  // Tabs functionality
  const tabButtons = document.querySelectorAll(".tab-trigger")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.dataset.tab

        // Update active tab button
        tabButtons.forEach((btn) => {
          if (btn.dataset.tab === targetTab) {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active")
          }
        })

        // Show the selected tab content
        tabContents.forEach((content) => {
          if (content.id === targetTab) {
            content.classList.add("active")
          } else {
            content.classList.remove("active")
          }
        })
      })
    })
  }

  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling
      const type = input.getAttribute("type") === "password" ? "text" : "password"
      input.setAttribute("type", type)

      // Toggle eye icon (open/closed)
      const eyeIcon = this.querySelector("svg")
      if (type === "text") {
        eyeIcon.innerHTML = `
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
          <line x1="2" x2="22" y1="2" y2="22"></line>
        `
      } else {
        eyeIcon.innerHTML = `
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `
      }
    })
  })

  // Login form validation
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true

      // Email validation
      const email = document.getElementById("email")
      const emailError = document.getElementById("emailError")

      if (!email.value.trim()) {
        emailError.textContent = "Email tidak boleh kosong"
        isValid = false
      } else if (!isValidEmail(email.value)) {
        emailError.textContent = "Format email tidak valid"
        isValid = false
      } else {
        emailError.textContent = ""
      }

      // Password validation
      const password = document.getElementById("password")
      const passwordError = document.getElementById("passwordError")

      if (!password.value) {
        passwordError.textContent = "Password tidak boleh kosong"
        isValid = false
      } else if (password.value.length < 8) {
        passwordError.textContent = "Password minimal 8 karakter"
        isValid = false
      } else {
        passwordError.textContent = ""
      }

      if (isValid) {
        // Simulate login success
        alert("Login berhasil! Anda akan diarahkan ke dashboard.")
        // In a real application, you would submit the form or make an API call here
        // window.location.href = 'dashboard.html';
      }
    })
  }

  // Registration form validation
  const registerForm = document.getElementById("registerForm")
  if (registerForm) {
    const password = document.getElementById("password")
    const strengthSegments = document.querySelectorAll(".strength-segment")
    const strengthText = document.querySelector(".strength-text")

    // Password strength checker
    if (password) {
      password.addEventListener("input", function () {
        const strength = checkPasswordStrength(this.value)
        updatePasswordStrengthUI(strength, strengthSegments, strengthText)
      })
    }

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      let isValid = true

      // First name validation
      const firstName = document.getElementById("firstName")
      const firstNameError = document.getElementById("firstNameError")

      if (!firstName.value.trim()) {
        firstNameError.textContent = "Nama depan tidak boleh kosong"
        isValid = false
      } else {
        firstNameError.textContent = ""
      }

      // Last name validation
      const lastName = document.getElementById("lastName")
      const lastNameError = document.getElementById("lastNameError")

      if (!lastName.value.trim()) {
        lastNameError.textContent = "Nama belakang tidak boleh kosong"
        isValid = false
      } else {
        lastNameError.textContent = ""
      }

      // Email validation
      const email = document.getElementById("email")
      const emailError = document.getElementById("emailError")

      if (!email.value.trim()) {
        emailError.textContent = "Email tidak boleh kosong"
        isValid = false
      } else if (!isValidEmail(email.value)) {
        emailError.textContent = "Format email tidak valid"
        isValid = false
      } else {
        emailError.textContent = ""
      }

      // Username validation
      const username = document.getElementById("username")
      const usernameError = document.getElementById("usernameError")

      if (!username.value.trim()) {
        usernameError.textContent = "Username tidak boleh kosong"
        isValid = false
      } else if (username.value.length < 3) {
        usernameError.textContent = "Username minimal 3 karakter"
        isValid = false
      } else if (!/^[a-zA-Z0-9_]+$/.test(username.value)) {
        usernameError.textContent = "Username hanya boleh berisi huruf, angka, dan underscore"
        isValid = false
      } else {
        usernameError.textContent = ""
      }

      // Password validation
      const passwordError = document.getElementById("passwordError")

      if (!password.value) {
        passwordError.textContent = "Password tidak boleh kosong"
        isValid = false
      } else if (password.value.length < 8) {
        passwordError.textContent = "Password minimal 8 karakter"
        isValid = false
      } else if (checkPasswordStrength(password.value) === "weak") {
        passwordError.textContent = "Password terlalu lemah"
        isValid = false
      } else {
        passwordError.textContent = ""
      }

      // Confirm password validation
      const confirmPassword = document.getElementById("confirmPassword")
      const confirmPasswordError = document.getElementById("confirmPasswordError")

      if (!confirmPassword.value) {
        confirmPasswordError.textContent = "Konfirmasi password tidak boleh kosong"
        isValid = false
      } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = "Password tidak cocok"
        isValid = false
      } else {
        confirmPasswordError.textContent = ""
      }

      // Category validation
      const category = document.getElementById("category")
      const categoryError = document.getElementById("categoryError")

      if (!category.value) {
        categoryError.textContent = "Pilih kategori konten"
        isValid = false
      } else {
        categoryError.textContent = ""
      }

      // Terms validation
      const terms = document.getElementById("terms")
      const termsError = document.getElementById("termsError")

      if (!terms.checked) {
        termsError.textContent = "Anda harus menyetujui syarat dan ketentuan"
        isValid = false
      } else {
        termsError.textContent = ""
      }

      if (isValid) {
        // Simulate registration success
        alert("Pendaftaran berhasil! Anda akan diarahkan ke halaman login.")
        // In a real application, you would submit the form or make an API call here
        // window.location.href = 'login.html';
      }
    })
  }

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function checkPasswordStrength(password) {
    if (!password) return ""

    // Check password strength
    const hasLowerCase = /[a-z]/.test(password)
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const strength =
      (password.length >= 8 ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasUpperCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChars ? 1 : 0)

    if (strength <= 2) return "weak"
    if (strength <= 4) return "medium"
    return "strong"
  }

  function updatePasswordStrengthUI(strength, segments, text) {
    // Reset all segments
    segments.forEach((segment) => {
      segment.className = "strength-segment"
    })

    if (!strength) {
      text.textContent = "Password strength"
      return
    }

    if (strength === "weak") {
      segments[0].classList.add("weak")
      text.textContent = "Weak"
      text.style.color = "#ef4444"
    } else if (strength === "medium") {
      segments[0].classList.add("medium")
      segments[1].classList.add("medium")
      segments[2].classList.add("medium")
      text.textContent = "Medium"
      text.style.color = "#f59e0b"
    } else if (strength === "strong") {
      segments.forEach((segment) => segment.classList.add("strong"))
      text.textContent = "Strong"
      text.style.color = "#10b981"
    }
  }
})
