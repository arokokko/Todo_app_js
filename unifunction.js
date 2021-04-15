const btnGet = document.querySelector('.get_posts');
const btnSend = document.querySelector('.send_post');
const container = document.querySelector('.container');

// universal function get and post requests to server with XMLHttpRequest
function myHttpRequest() {
    return {
        get(url, cb, time = 10000) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.timeout = time;

                xhr.addEventListener('load', () => {
                    // if status of server response is not 2**
                    if(Math.floor(xhr.status / 100) != 2) {
                        console.log(`Error. Status of server response is ${xhr.status}`);
                        return;
                    }
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
            } catch (error) {
                console.log(error);
            }
        },
        post(url, body, cb, headers = {}, time = 10000) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                xhr.timeout = time;

                xhr.addEventListener('load', () => {
                    // if status of server response is not 2**
                    if(Math.floor(xhr.status / 100) !== 2) {
                        console.log(`Error. Status of server response is ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.response);
                    cb(response);
                });

                xhr.addEventListener("timeout", () => {
                    console.log("Server is not answer");
                });
                
                xhr.addEventListener("error", () => {
                    console.log("Connection to server is failed");
                });

                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });

                xhr.send(JSON.stringify(body));

            } catch (error) {
                console.log(error);
            }
        }
    }
}

// example of using unifunction
const request = myHttpRequest();

btnGet.addEventListener('click', () => {
    request.get('https://jsonplaceholder.typicode.com/posts', renderPost);
});

btnSend.addEventListener('click', () => {
    const newPost = {
        title: 'foo',
        body: 'bar',
        userId: 1
    };
    request.post(
        'https://jsonplaceholder.typicode.com/posts',
        newPost, 
        (response) => {
            const card = cardTemplate(response);
            container.insertAdjacentElement('afterbegin', card);
        },
        {'Content-type': 'application/json;charset=utf-8'}
    );

});

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




