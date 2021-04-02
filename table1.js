const container = document.querySelector('.container');
const info = document.querySelector('.info');
let usersData;

getPosts(renderPost);

container.addEventListener('click', ({target}) => {
    const card = target.closest('.card');
    if(card) {
        renderUserInfo(card);
    }
});

function getPosts(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        usersData = response.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});
        cb(response);
        
        return usersData;
    });

    xhr.send();
}

function renderPost(response) {
    const fragment = document.createDocumentFragment();
    
    response.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', post.id);
        card.setAttribute('style', 'cursor:pointer');
        card.innerHTML =
            `<div class='card-body'>
                <h5 class='card-title'>${post.name}</h5>
            </div>`;
        fragment.appendChild(card);
    });
    container.appendChild(fragment);
}

function renderUserInfo(cardId) {
    const user = usersData[cardId.dataset.id];
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML =
            `<div class='card-body'>
                <h5 class='card-title'>${user.name}</h5>
                <div class='card-body'>
                    <p>Username: ${user.username}</p>
                    <p>Email: ${user.email}</p>
                    <p>Address: ${user['address']['city']}</p>
                    <p>Website: ${user.website}</p>
                </div>
            </div>`;
    info.innerHTML = '';
    info.appendChild(card);
}








