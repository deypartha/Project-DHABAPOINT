
let divf = document.querySelectorAll(".divfac")
function changeColor(ele){
    ele.style.boxShadow='10px 10px 40px 10px gray';  
}
function removeColor(ele){
    ele.style.boxShadow='none';
}
function view_more(){
    document.querySelector(".para_btn").innerHTML= "Lorem ipsum dolor sit amet consectetur adipisicing elit";
}
function remove_this(){
    document.querySelector(".para_btn").innerHTML = ""
}




document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('myCarousel');
    const nextButton = document.querySelector('.carousel-control-next');
    const prevButton = document.querySelector('.carousel-control-prev');

    let carouselIndex = 0;
    const slideIntervalTime = 2000; // 5 seconds for each slide
    let slideInterval = setInterval(autoSlide, slideIntervalTime); // Automatically start sliding

    function autoSlide() {
        showNextSlide(); // Call showNextSlide function automatically
    }

    function showNextSlide() {
        const items = carousel.querySelectorAll('.carousel-item');
        carouselIndex++;
        if (carouselIndex >= items.length) {
            carouselIndex = 0; // Loop back to the first slide
        }
        updateCarousel(items);
    }

    function showPrevSlide() {
        const items = carousel.querySelectorAll('.carousel-item');
        carouselIndex--;
        if (carouselIndex < 0) {
            carouselIndex = items.length - 1; // Loop back to the last slide
        }
        updateCarousel(items);
    }

    function updateCarousel(items) {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === carouselIndex) {
                item.classList.add('active');
            }
        });
    }

    // Manually change slides when buttons are clicked, and reset auto-slide interval
    nextButton.addEventListener('click', function() {
        clearInterval(slideInterval); // Stop automatic slide when button is clicked
        showNextSlide(); // Manually show next slide
        slideInterval = setInterval(autoSlide, slideIntervalTime); // Restart the auto-slide
    });

    prevButton.addEventListener('click', function() {
        clearInterval(slideInterval); // Stop automatic slide when button is clicked
        showPrevSlide(); // Manually show previous slide
        slideInterval = setInterval(autoSlide, slideIntervalTime); // Restart the auto-slide
    });
});






// const btn = document.getElementById("bbtn");
// let body = document.getElementsByTagName("body")[0];
//         btn.onclick = (event) => {
//             event.preventDefault(); 
//             window.alert("Thanks for rating us!");
//             body.style.display = "none"; 
//         };

function PostFeed(){
    let n = document.getElementById("name").value
    let m = document.getElementById("mobile").value
    let e =document.getElementById("email").value
    let c = document.getElementById("comment").value    
    let data = {
        name: n,
        phone: m,
        email: e,
        comment: c
    }
    data = JSON.stringify(data)
    fetch("http://localhost:3005/feedback",{
        method: "POST",
        headers:{"content-type": "application/json"},
        body: data,

    }).then(response=>{
        if(response.status===201){
            alert("Thanks for your feedback!")
        }
        else{
            throw new Error(response.statusText)
        }  
    }).catch(error=>{
        alert(error)
    })
}