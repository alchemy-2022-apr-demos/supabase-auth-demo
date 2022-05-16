import { signupUser } from './fetch-utils.js';

const signupForm = document.getElementById('sign-up');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(signupForm);
    console.log({ email: data.get('email'), password: data.get('password') });
    const user = await signupUser(data.get('email'), data.get('password'));
    console.log(user);
});
