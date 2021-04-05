const btn = document.querySelector('button');
const form = document.forms.addNew;
const container = document.querySelector('.container');

function createPost(body, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/users");

    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.response);
        cb(response);
    });

    xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify(body));
    
}

function cardTemplate(user) {
    const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML =
            `<div class='card-body'>
                <h5 class='card-title'>${user.name}</h5>
                <div class='card-text'>${user.email}</div>
                <div class='card-text'>${user.phone}</div>
                <div class='card-text'>${user.website}</div>
                
            </div>`;
    return card;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = {
        name: `${form.userName.value}`,
        email: `${form.email.value}`,
        phone: `${form.phone.value}`,
        website: `${form.website.value}`
    }

    createPost(newUser, (response) => {
        console.log(response);
        const card = cardTemplate(response);
        container.insertAdjacentElement('afterbegin', card);
    });
    form.reset();
});
