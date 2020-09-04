import { serviceURL } from  "../configuration/service-path"
const baseUrl = serviceURL.userservice;
export async function createUser(userdata) {
    let formData = new FormData();
    formData.append("username", userdata.username);
    formData.append("displayName", userdata.displayName);
    formData.append("email", userdata.email);
    formData.append("password", userdata.password);
    formData.append("icon", userdata.icon);

    const createUrl = baseUrl+"/userWithIcon";
    let response = await fetch(
        createUrl,
        {
            method: "POST",
            mode: 'cors',
            body: formData
        });
    let resJson = await response.json();
    if (response.status > 400) {
        const err = resJson.err;
        throw {error: err}
    }
    return response.json();
}
export async function checkUsername(username) {
    const checkUrl = baseUrl + `/checkByUsername?username=${username}`;
    let response = await fetch(
        checkUrl,
        {
            method: "GET",
            mode: 'cors',
        }
    );
    let jsonBody = await response.json();
    return jsonBody.Exists;
}
export async function checkEmail(email) {
    const checkUrl = baseUrl + `/checkByEmail?email=${email}`;
    let response = await fetch(
        checkUrl,
        {
            method: "GET",
            mode: 'cors',
        }
    );
    let jsonBody = await response.json();
    return jsonBody.Exists;
}
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