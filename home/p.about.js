        document.addEventListener("DOMContentLoaded", function() {
            const readButton = document.querySelector("#read-more");
            let model = document.querySelector(".modal");
            let modelBody = document.getElementById("model-body");
            let closeModal = document.querySelector("#close");
            
            const team = [
                {
                    name: "Partha Dey",
                    role: "Developer",
                    bio: "Developer is a full-stack developer with a passion for building web applications.",
                    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSciz5-0QK0WC0L66fN3uO0fuQ7avF-Juegmw&s", 
                    linkedin: "https://www.linkedin.com/in/partha-dey-7b83b82a4/",
                    twitter: "https://twitter.com/parthadey"
                }, 

                {
                    name: "Paramveer Singh Mann",
                    role: "Manager",
                    bio: "Manager is a project manager with a focus on leading teams to success.",
                    photo: "https://www.pngitem.com/pimgs/m/215-2157775_transparent-development-clipart-business-development-manager-icon-hd.png", 
                    linkedin: "https://www.linkedin.com/in/sourav-das-7b83b82a4/",
                    twitter: "https://twitter.com/souravdas"
                },
                {
                    name: "Shivam Kumar",
                    role: "Designer",
                    bio: "Designer is a UI/UX designer with a focus on creating beautiful and functional designs.",
                    photo: "https://cdn-icons-png.flaticon.com/512/4539/4539261.png", 
                    linkedin: "https://www.linkedin.com/in/sourav-das-7b83b82a4/",
                    twitter: "https://twitter.com/souravdas"
                },
                {
                    name: "Tanveer Singh",
                    role: "Marketing",
                    bio: "Marketing is a marketing specialist with a focus on promoting products and services.",
                    photo: "https://img.freepik.com/premium-vector/circular-marketing-icon_1453-93.jpg", 
                    linkedin: "https://www.linkedin.com/in/sourav-das-7b83b82a4/",
                    twitter: "https://twitter.com/souravdas"
                },
            ];
        
            readButton.addEventListener("click", function() {
                model.style.display = "block";
                modelBody.innerHTML = ""; 
        
                team.forEach(member => {
                    modelBody.innerHTML += 
                    `<div class="team-member">  
                        <img src="${member.photo}" alt="${member.name}" class="team-member-photo">
                        <h3>${member.name} (${member.role})</h3>
                        <p>${member.bio}</p>
                        <a href="${member.linkedin}" target="_blank">LinkedIn</a>
                        <a href="${member.twitter}" target="_blank">Twitter</a>
                    </div>`;
                });
            });
            
            closeModal.onclick = function() {
                model.style.display = "none"; // Close the modal when clicking the close button
            };
            
            window.onclick = function(event) {
                if (event.target == model) {
                    model.style.display = "none"; // Close modal if clicking outside of the modal content
                }
            };
        });
        