import { serviceURL } from  "../configuration/service-path"
const baseUrl = serviceURL.userservice;

export async function loginUser (email, password) {
    const loginBody = {
        Email: email,
        Password: password
    }
    const loginUrl = baseUrl + "/login";
    let response = await fetch(
        loginUrl,
        {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify(loginBody)
        })
    if (response.status > 400) {
        let jsonBody = await response.json();
        console.log(jsonBody);
        const err = jsonBody.err;
        throw {error: err}
    }
    return response.json();
}