
const food = [
    {
        id: 0,
        image : "breakfast.jpg",
        title : "breakfast" ,
        price : 150
    },
    {
        id: 1,
        image : "food.png",
        title : "lunch",
        price : 150 
    },
    {
        id: 2,
        image : "breakfast.jpg",
        title : "dinner" ,
        price : 150
    },
    {
        id: 3,
        image : "breakfast.jpg",
        title : "break" ,
        price : 150
    },
];
const catagory = [...new Set (food.map((item)=>{
    return item
}))]
let i = 0;
document.getElementById('root').innerHTML = catagory.map((item)=>{
    var{image, title, price} = item;
    return (
    `<div id='box'>
        <div class='img-box'>
            <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
            <p>${title}</p>
            <h2>${price}.00</h2>`+
            "<button onclick = 'addtoCart("+(i++)+")'>Add to cart</button>"+
        `</div>
    </div>`

    )
}).join('')