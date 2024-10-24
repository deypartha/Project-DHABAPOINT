document.getElementById("loadPostsBtn").addEventListener('click', loadPosts)
function loadPosts(){
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'http://localhost:3000/posts','true')
    xhr.onload = function(){
        if(this.status===200){
            const posts = JSON.parse(this.responseText);
            let output = '';
            posts.forEach(post => {
                output+=`
                <div>
                <h3>${post.name}</h3>
                <h3>${post.pass}</h3>
                </div>
                `;
            });
            document.getElementById("container").innerHTML = output
        }
    }
    xhr.send()
}



function addPost(e){
    e.preventDefault();
    const name = document.getElementById("name").value
    const pass = document.getElementById("pass").value
    const xhr = new XMLHttpRequest();
    xhr.open('post','http://localhost:3000/posts',true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onload = function(){
        if(this.status===201){
            const newPost = JSON.parse(this.responseText)
            const output = `
            <div>
                <h2>${newPost.name}</h2>
                <h2>${newPost.pass}</h2>
            </div>
            `
            document.getElementById('container').innerHTML+=output;
        }
    };
    const data = JSON.stringify({name:name, pass:pass})
    xhr.send(data)
    document.getElementById('name').value = ''
    document.getElementById('pass').value = ''
}