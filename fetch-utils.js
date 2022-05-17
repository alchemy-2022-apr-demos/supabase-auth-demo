const SUPABASE_URL = 'https://nwxkvnsiwauieanvbiri.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNzAwMzQzNCwiZXhwIjoxOTUyNTc5NDM0fQ.8XIsU0FANdaNeQnT-DojpTL-GTlTPZ4CYZDEetpFpWc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// returns a user if there is one
export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

// when a user tries to visit a page that calls this function, we automatically redirect the user back to the login page if they are not logged in
export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('/');
}

// when a user tries to visit a page that calls this function, we automatically redirect the user away from the login page if they are already logged in
export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./some-other-page');
    }
}

// signs an new user in and puts an auth token in local storage in the browser
export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });
    if (response.user) {
        return response.user;
    } else {
        console.error(response.error);
    }
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '/');
}

export async function fetchPosts() {
    const response = await client.from('posts').select('*');

    return response.data;
}

export async function createNewPost(post) {
    const response = await client.from('posts').insert(post);
    if (response.data) {
        return response.data;
    } else {
        console.error(response.error);
    }
}
