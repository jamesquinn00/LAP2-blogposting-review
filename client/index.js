submitForm = document.querySelector("#submit")
blogContainer = document.querySelector("#blog-container")
singleBlog = document.querySelector("#single")

document.addEventListener("DOMContentLoaded", getAllPosts)

// submitForm.addEventListener("submit", (e)=>{
//     addPost(e)
// })

async function getAllPosts(){
    try{
        let data = await fetch('http://localhost:3000/posts')
        data = await data.json()
        for(let x in data.blogs){
            // console.log(data.blogs[x])
            let newUl = document.createElement("ul")

            for(let i in data.blogs[x]){
                let blog = data.blogs[x]
                let newLi = document.createElement("li")
                if(i!="id"){
                newLi.textContent = blog[i]
                newUl.appendChild(newLi)
                blogContainer.appendChild(newUl)
                }}

            newUl.addEventListener("click", (e)=>{
                getBlog(data.blogs[x].id)})
            
        }

        submitForm.addEventListener("submit", (e)=>{
            addPost(e)
            setTimeout(() => getBlog(data.blogs.length+1), 1000)
        })

    }catch(err){
        console.log(err)
    }
};

async function addPost(e){
    e.preventDefault()
    const postData = {
        title: e.target.title.value,
        content: e.target.content.value,
        name: e.target.name.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .then(() => e.target.reset())
        .catch(console.warn)
};

async function getBlog(id) {
    try {
        singleBlog.textContent = ""
        const response = await fetch(`http://localhost:3000/posts/${id}`);
        const data = await response.json();
        blogContainer.style.display = "none";
        let newUl = document.createElement("ul")
        console.log(data)
        for(let i in data){
            let newLi = document.createElement("li")
            if(i!="id"){
            newLi.textContent = data[i]
            newUl.appendChild(newLi)
            singleBlog.appendChild(newUl)
        }}
        let link = document.createElement("a")
        link.href = "index.html"
        link.textContent="Go Back"
        singleBlog.appendChild(link)
    } catch (err) {
        console.warn(err);
    }
}