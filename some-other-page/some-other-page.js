import { checkAuth, fetchPosts, logout } from '../fetch-utils.js';

checkAuth();

const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', async () => {
    await logout();
});

async function onLoad() {
    const data = await fetchPosts();
    const myPost = data[0];
    const createdAt = new Date(myPost.created_at);
    console.log(createdAt.toLocaleDateString());
    const now = new Date();
    console.log(now.toLocaleDateString());
}

onLoad();
