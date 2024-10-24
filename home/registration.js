function submitDetails() {
    const form = document.getElementById('registrationForm');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const c_password = document.getElementById('c_password').value.trim();
      const phone = document.getElementById('phone').value.trim();
  
      const errors = {
        name: '',
        email: '',
        password: '',
        c_password: '',
        phone: ''
      };
  
      let isValid = true;

      // Name validation
      if (!name) {
        errors.name = 'Username is required';
        isValid = false;
      }

      // Email validation
      const emailPatt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!emailPatt.test(email)) {
        errors.email = 'Email is invalid';
        isValid = false;
      }

      // Password validation
      if (!password) {
        errors.password = 'Password is required';
        isValid = false;
      } else if (password.length < 6) {
        errors.password = 'Password length must be at least 6 characters';
        isValid = false;
      }

      // Confirm password validation
      if (!c_password) {
        errors.c_password = 'Confirm password is required';
        isValid = false;
      } else if (password !== c_password) {
        errors.c_password = 'Passwords do not match';
        isValid = false;
      }

      // Phone number validation
      const numPatt = /^\d{10}$/;
      if (!phone) {
        errors.phone = 'Phone number is required';
        isValid = false;
      } else if (!numPatt.test(phone)) {
        errors.phone = 'Phone number is invalid';
        isValid = false;
      }

      // Displaying the errors in the DOM
      document.getElementById('nameError').textContent = errors.name;
      document.getElementById('emailError').textContent = errors.email;
      document.getElementById('passwordError').textContent = errors.password;
      document.getElementById('cPasswordError').textContent = errors.c_password;
      document.getElementById('phoneError').textContent = errors.phone;

      if (isValid) {
        const user = { name, email, password, phone };  // include all fields
  
        fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          window.location.href = "login.html"
          alert('Registration successful!');
          form.reset();  // Clear form after successful registration
          // Clear error messages
          document.getElementById('nameError').textContent = '';
          document.getElementById('emailError').textContent = '';
          document.getElementById('passwordError').textContent = '';
          document.getElementById('cPasswordError').textContent = '';
          document.getElementById('phoneError').textContent = '';
        })
        .catch(error => {
          console.error('ERROR:', error);
          alert('Registration failed.');
        });
      }
    });
}
  
// Call submitDetails on page load
document.addEventListener('DOMContentLoaded', submitDetails);
