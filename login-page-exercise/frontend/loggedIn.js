async function isLoggedIn() {
    const response = await fetch('http://localhost:5000/api/loggedin');
    const data = await response.json();

    console.log(data);

    if (data.loggedIn == false) {
        window.location.href = 'http://localhost:5000/';
    } 
}

isLoggedIn();