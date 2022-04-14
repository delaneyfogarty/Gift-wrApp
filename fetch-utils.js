const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3YXF1aGF3cXl0dHhkcmNiaHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTE5ODEsImV4cCI6MTk2MzEyNzk4MX0.FnfsYqPR7GPz5COh7itHiDt6as7-F__iU57NyG7IKyE';
const SUPABASE_URL = 'https://zwaquhawqyttxdrcbhxx.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./home');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}


export async function getMonths() {
    const response = await client
        .from('months')
        .select('*,birthday_person(*),zodiac_sign(*)');
    return checkError(response);
}



export async function zodiacSign() {
    const response = await client
        .from('zodiac_sign')
        .select('*');

    return checkError(response);
}

export async function birthdayPerson(id) {
    const response = await client
        .from('birthday_person')
        .select('*, months(*), zodiac_sign(*)')
        .match({ id: id })
        .single();

    return checkError(response);
}

export async function createBirthday(name, month, day, year, zodiac) {
    const response = await client
        .from('birthday_person')
        .insert({
            name: name,
            month: month,
            day: day,
            year: year,
            zodiac_sign: zodiac,
        });

    return checkError(response);
}

export async function createGiftIdea(gift) {
    const response = await client
        .from('gifts')
        .insert(gift)
        .match({
            birthday_profile: gift.birthday_profile,
        })
        .single()
        .order('is_complete', { ascending: true });

    return checkError(response);

}

//export async function getGiftList (birthdayProfile) {
//const response = await client
//.from('gifts')
//.select('*, birthday_person:user_id (*)')
//.match({ birthday_profile: birthdayProfile });

//return checkError(response);
//}

export async function getGift(id) {
    const response = await client
        .from('gifts')
        .select('*')
        .match({ birthday_profile: id });

    return checkError(response);
}

export async function deleteProfile(id) {
    const response = await client
        .from('birthday_person')
        .delete()
        .match({ id: id });

    return checkError(response);
}

export async function deleteGiftList(id) {
    const response = await client
        .from('gifts')
        .delete()
        .match ({ birthday_profile: id });

    return checkError(response);

}

export async function updateGift(id) {
    const response = await client
    .from('gifts')
    .update({ is_complete: true })
    .match({ id });
    // .order('is_complete', { ascending: false });

    return checkError(response);
}


function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
