import { checkAuth, fetchPosts, logout } from '../fetch-utils.js';
import { getUser } from './fetch-utils.js';
const postsElem = document.getElementById('posts');
// checkAuth();

// 2 approaches for dynamic button
// 1. have 2 separate buttons, hide / show using CSS and classnames
// 2. have a single button, dynamically add text content and event listener

// -----option 1------
// handle logout button
// const logoutBtn = document.getElementById('logout');
// logoutBtn.addEventListener('click', async () => {
//     await logout();
// });

// handle auth button
// const authBtn = document.getElementById('auth');
// authBtn.addEventListener('click', () => {
//     window.location.href = '/auth';
// });

// -----option 2------
const headerBtn = document.getElementById('header-btn');
async function handleLogout() {
    await logout();
}
async function handleAuth() {
    window.location.href = '/auth';
}

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
        div.classList.add('post');
        postsElem.append(div);
    }
    //  check state of user
    // option 1
    // const user = getUser();
    // if (user) {
    //     logoutBtn.classList.remove('hide');
    // } else {
    //     authBtn.classList.remove('hide');
    // }

    // option 2
    const user = getUser();
    if (user) {
        headerBtn.textContent = 'Logout';
        headerBtn.addEventListener('click', handleLogout);
        // this is the exact same thing as above -- one uses a named function
        // one uses an anonymous arrow function
        // headerBtn.addEventListener('click', async () => {
        //     await logout();
        // });
        headerBtn.classList.remove('hide');
    } else {
        headerBtn.textContent = 'Sign In / Sign Up';
        headerBtn.addEventListener('click', handleAuth);
        headerBtn.classList.remove('hide');
    }
}

onLoad();
