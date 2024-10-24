// function checkLoginDetails() {
//     let n = document.getElementById("user").value;
//     let p = document.getElementById("pass").value;
//     fetch("http://localhost:3002/users")
//         .then(response => response.json())
//         .then(users => {
//             let user = users.find(user => user.user === n && user.pass === p);
            
//             if(user) {
//                 alert("Login Successful . . . ");
//                 window.location.href = "project.html";
//             } else {
//                 let error = document.getElementById("error");
//                 window.location.href = "registration.html";
//                 error.innerHTML = "Invalid Username or Password. Please try again.";
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert("An error occurred while trying to log in. Please try again later.");
//         });
//     return false;
// }




// function checkLoginDetails() {
//     const form = document.getElementById('formDemo');
//     form.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const user = document.getElementById('user').value.trim();
//         const pass = document.getElementById('pass').value.trim();
//         const errors = {
//             user: '',
//             pass: ''
//         };
//         let isValid = true;

//         const userPatt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//         // Username validation
//         if (!user) {
//             errors.user = 'Username is required';
//             isValid = false;
//         } else if (!userPatt.test(user)) {
//             errors.user = 'Username is invalid';
//             isValid = false;
//         }

//         // Password validation
//         if (!pass) {
//             errors.pass = 'Password is required';
//             isValid = false;
//         } else if (pass.length < 6) {
//             errors.pass = 'Password length must be at least 6 characters';
//             isValid = false;
//         }

//         // Display validation errors
//         document.getElementById('Uerror').innerHTML = errors.user;
//         document.getElementById('Perror').innerHTML = errors.pass;

//         if (isValid) {
//             const data = { user, pass };
//             fetch("http://localhost:3002/users")
//         .then(response => response.json())
//         .then(users => {
//             let user = users.find(user => user.user === n && user.pass === p);
            
//             if(user) {
//                 alert("Login Successful . . . ");
//                 window.location.href = "project.html";
//             } else {
//                 let error = document.getElementById("error");
//                 window.location.href = "registration.html";
//                 error.innerHTML = "Invalid Username or Password. Please try again.";
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert("An error occurred while trying to log in. Please try again later.");
//         });
//         return false;
//         }
//     });
// }















// function checkLoginDetails() {
//     const form = document.getElementById('formDemo');
//     form.addEventListener('submit', function (event) {
//         event.preventDefault();  // Prevent the form from refreshing the page
//         let n = document.getElementById("user").value;
//         let p = document.getElementById("pass").value;
//         const user = document.getElementById('user').value.trim();
//         const pass = document.getElementById('pass').value.trim();
//         const errors = {
//             user: '',
//             pass: ''
//         };
//         let isValid = true;

//         const userPatt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//         // Username validation
//         if (!user) {
//             errors.user = 'Username is required';
//             isValid = false;
//         } else if (!userPatt.test(user)) {
//             errors.user = 'Username is invalid';
//             isValid = false;
//         }

//         // Password validation
//         if (!pass) {
//             errors.pass = 'Password is required';
//             isValid = false;
//         } else if (pass.length < 6) {
//             errors.pass = 'Password length must be at least 6 characters';
//             isValid = false;
//         }

//         // Display validation errors
//         document.getElementById('Uerror').innerHTML = errors.user;
//         document.getElementById('Perror').innerHTML = errors.pass;

//         if (isValid) {
//             fetch('http://localhost:3001/users')
//                 .then(response => response.json())
//                 .then(users => {
//                     const foundUser = users.find(user => user.user === n && user.pass === p);
//                     if (foundUser) {
//                         alert('Login Successful . . .');
//                         window.location.href = 'project.html';
//                     } else {
//                         alert( 'Invalid Username or Password. Please try again.');
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                     alert('An error occurred while trying to log in. Please try again later.');
//                 });
//         }
//     });
// }

// // Call this function when the DOM is fully loaded
// document.addEventListener('DOMContentLoaded', checkLoginDetails);








function checkLoginDetails() {
    const form = document.getElementById('formDemo');
    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent the form from refreshing the page

        // Getting the input values
        const user = document.getElementById('user').value.trim();
        const pass = document.getElementById('pass').value.trim();

        // Error object to track validation errors
        const errors = {
            user: '',
            pass: ''
        };
        let isValid = true;

        // Username validation (email pattern check)
        const userPatt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!user) {
            errors.user = 'Username is required';
            isValid = false;
        } else if (!userPatt.test(user)) {
            errors.user = 'Username is invalid';
            isValid = false;
        }

        // Password validation (length check)
        if (!pass) {
            errors.pass = 'Password is required';
            isValid = false;
        } else if (pass.length < 6) {
            errors.pass = 'Password length must be at least 6 characters';
            isValid = false;
        }

        // Display validation errors
        document.getElementById('Uerror').textContent = errors.user;
        document.getElementById('Perror').textContent = errors.pass;

        if (isValid) {
            // If valid, fetch users from JSON server
            fetch('http://localhost:3001/users')
                .then(response => response.json())
                .then(users => {
                    // Check if the user exists in the fetched users array
                    const foundUser = users.find(u => u.email === user && u.password === pass);

                    // If the user is found, proceed to the next page
                    if (foundUser) {
                        alert('Login Successful . . .');
                        window.location.href = 'project.html';
                    } else {
                        alert('Invalid Username or Password. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while trying to log in. Please try again later.');
                });
        }
    });
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', checkLoginDetails);
