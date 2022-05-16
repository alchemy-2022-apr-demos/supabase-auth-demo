import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', async () => {
    await logout();
});
