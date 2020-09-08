export async function getNotificationCount (jwtToken) {
    const url = "/notificationsCount";
    let response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        });
    if (response.status !== 200) {
        let json = await response.json();
        console.log('Error when fetching notificationsCount ' + response.status);
        throw {code: response.status, msg: json.error || json.err || json.msg};
    }
    let json = await response.json();
    console.log(json);
    return json.count;
}

export async function getNotifications (jwtToken) {
    const url = "/notifications";
    let response = await fetch(url,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        });
    if (response.status !== 200) {
        console.log('Error when fetching noticiationsCount ' + response.status);
        throw {code: response.status, msg: response.error || response.err || response.msg};
    }
    let json = await response.json();
    return json;
}

export async function deleteNotifications (jwtToken, messageId) {
    const url = "/notification?id=" + messageId;
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    });
    if (response.status !== 200) {
        console.log('Error when deleting notification ' + messageId);
        throw {code: response.status, msg: response.error || response.err || response.msg};
    }
    let json = await response.json();
    return json;
}