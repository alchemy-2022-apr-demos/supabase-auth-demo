import { redirectIfLoggedIn, signupUser } from './fetch-utils.js';

const signupForm = document.getElementById('sign-up');

redirectIfLoggedIn();

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signupForm);
    console.log({ email: data.get('email'), password: data.get('password') });
    const user = await signupUser(data.get('email'), data.get('password'));
    if (user) {
        location.replace('/some-other-page');
    }
});
