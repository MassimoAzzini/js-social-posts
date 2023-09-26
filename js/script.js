const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];




// elementi
const postsList = document.querySelector('.posts-list');
let likesArray = [];


// reset
postsList.innerHTML = '';


// stampo tutti i post richiamando la funzione che li crea singolarmente
posts.forEach( post => postsList.innerHTML += getPostTemplate(post))


// funzione per creare il post
function getPostTemplate(post){
    const {id, content, media, author, likes, created} = post;
    return `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${author.image ? authorImage(author) : authorInitials(author)}                   
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${author.name}</div>
                    <div class="post-meta__time">${changeDateFormat(created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${content}</div>
        <div class="post__image">
            <img src="${media}" alt="${author.name}">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button js-like-button ${isPostLiked(id) ? 'like-button--liked' : ''}" href="#" data-postid="1">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>

    `
}


// funzione per dichiarare se un post è gia liked
function isPostLiked(id){
    return likesArray.includes(id);
}


// formattazione della data
function changeDateFormat(dateStr){
    console.log(dateStr)
    return dateStr.split('-').reverse().join('/');
};


// funzione per mettere l'immagine dell'autore
function authorImage(author){
    const {name, image} = author
    return `<img class="profile-pic" src="${image}"" alt="${name}"></img>`
};



// funzione per mettere le iniziali dell'autore
function authorInitials(author){
    const { name } = author;

    const letters = name.split(' ').map( nameSplit => nameSplit[0]);
    const initials = letters.join('');
    return `<div class="profile-pic-default">
                <span>${initials}</span>
            </div>
            `
};


// bottone per like + contatore likes
const likeButtons = document.querySelectorAll('.js-like-button');
const likeCounters = document.querySelectorAll('.js-likes-counter');

likeButtons.forEach((btn, index) => {
    btn._id = posts[index].id;
    btn._index = index;
    btn.addEventListener('click', handleLikeBtn)
})


function handleLikeBtn(event){
    event.preventDefault();
    this.classList.toggle('like-button--liked');

    const postSelected = posts.find( post => post.id === this._id);

    if(likesArray.includes(this._id)){
        likesArray = likesArray.filter( likeId => likeId !== this._id);
        postSelected.likes--;
    } else{
        postSelected.likes++;
        likesArray.push(this._id)

    }

    likeCounters[this._index].innerText = postSelected.likes;

};