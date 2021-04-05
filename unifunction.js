const btnGet = document.querySelector('.get_posts');
const btnSend = document.querySelector('.send_post');
const container = document.querySelector('.container');

function getPosts(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
    xhr.timeout = 10000;

    xhr.addEventListener('load', () => {
        
        const response = JSON.parse(xhr.response);
        cb(response);
    });
    xhr.addEventListener("timeout", () => {
        console.log("Server is not answer");
    });

    xhr.send();
}

function createPost(body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");

    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    });

    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(body));
}

function renderPost(response) {
    const fragment = document.createDocumentFragment();
    
    response.forEach(post => {
        const card = cardTemplate(post);
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
    
}

function cardTemplate(post) {
    const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML =
            `<div class='card-body'>
                <h5 class='card-title'>${post.title}</h5>
                <div class='card-text'>${post.body}</div>
            </div>`;
    return card;
}

btnGet.addEventListener('click', () => {
    getPosts(renderPost);
});

btnSend.addEventListener('click', () => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
    }

    createPost(newPost, (response) => {
        console.log(response);
        const card = cardTemplate(response);
        container.insertAdjacentElement('afterbegin', card);
    });
});

// universal function 
function myHttpRequest({method, url} = {}, cb, time = 10000) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.timeout = time;

    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    });
    xhr.addEventListener("timeout", () => {
        console.log("Server is not answer");
    });
    xhr.addEventListener("error", () => {
        console.log("Connection to server is failed");
    });

    xhr.send();
}

myHttpRequest({method: "GET", url: "https://jsonplaceholder.typicode.com/posts"},
(res) => console.log(res));
