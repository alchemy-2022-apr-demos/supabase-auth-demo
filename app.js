import { checkAuth, fetchPosts, logout } from '../fetch-utils.js';
import { getUser } from './fetch-utils.js';
const postsElem = document.getElementById('posts');
// checkAuth();

// handle logout button
const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', async () => {
    await logout();
});

// handle auth button
const authBtn = document.getElementById('auth');
authBtn.addEventListener('click', () => {
    window.location.href = '/auth';
});

async function onLoad() {
    // load up all your posts
    const posts = await fetchPosts();
    // const myPost = data[0];
    // const createdAt = new Date(myPost.created_at);
    for (let post of posts) {
        const div = document.createElement('div');
        const p = document.createElement('p');
        const h2 = document.createElement('h2');
        h2.textContent = post.title;
        p.textContent = post.description;
        div.append(h2, p);
        postsElem.append(div);
    }
    //  check state of user
    const user = getUser();
    if (user) {
        logoutBtn.classList.remove('hide');
    } else {
        authBtn.classList.remove('hide');
    }
}

onLoad();

// 2 approaches for dynamic button
// 1. have 2 separate buttons, hide / show using CSS and classnames
// 2. have a single button, dynamically add text content and event listener
