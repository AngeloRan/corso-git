form = document.querySelector("#login_form")

console.log("PREPRE  ", document.cookie)
form.addEventListener("submit", async (e)=> {

    e.preventDefault()
    const data = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    }
    const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const {access:token} = await res.json()
    console.log(token)
    localStorage.setItem('token', token)

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

        
    // Imposta il nuovo cookie
    document.cookie = `token=${token}; path=/`;

    console.log("POST", document.cookie)


    window.location.href = "http://127.0.0.1:8000/home/";


})

