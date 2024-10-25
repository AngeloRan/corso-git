const apiRequestList = document.querySelector("#api_request_list")
const apiRequestCreate = document.querySelector("#api_request_create")
const apiRequestRetrive = document.querySelector("#api_request_retrive")
const apiRequestUpdate = document.querySelector("#api_request_update")
const apiRequestDestroy = document.querySelector("#api_request_destroy")
const apiRequestFilteredList = document.querySelector("#api_request_filtered_list")
const csrf = document.cookie.split("; ").reduce((acc,el) =>{
    if (el.startsWith("csrf")) acc = el;
    return acc
},"").split("=")[1]

const disegno = document.querySelector("#disegno")
const forms = document.querySelector("#forms")

function printa(markup) {
    
    disegno.innerHTML=""
    disegno.insertAdjacentHTML("afterbegin", markup)
}



apiRequestList.addEventListener("submit", async (e) => {

    e.preventDefault()
    forms.innerHTML=""
    
    token = localStorage.getItem("token")
    
    const res = await fetch("http://127.0.0.1:8000/api/goals/", {
        method: "GET",
        headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    const lista = await res.json()
    console.log("LISTA------>", lista)

    let markup="";
    
    lista.forEach((el) => {
        markup+=`${el.uuid} | ${el.name} | ${el.goal_type} | ${el.created_at} | Autore: ${el.autore} | Intensity:${el.intensity}<br/>`
    })
    printa(markup)
})

apiRequestCreate.addEventListener("submit", async (e) => {
    e.preventDefault()
    token = localStorage.getItem("token")

    const autoriRes = await fetch("http://127.0.0.1:8000/api/autori/", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const autori = await autoriRes.json()
    console.log("AUTORI", autori)
    




    forms.innerHTML=""

    let autoriMarkup = ""
    autori.forEach((el) => {
        return autoriMarkup =`<option value=${el.uuid}>${el.nome}</option>`
    })

    markup = `
        <label>Nome</label><input id="namer" type="text"><br/>
        <label>Tipo</label><input id="goal_type" type="text"><br/>
        <label>Intensità</label><input id="intensityr" min="1" max="100" type="number"><br/>
        <label>Categoria</label><input id="category" type="text"></br>
        <label>Autori</label><select id="autorer">${autoriMarkup}</select></br>
        <button id="apicreate">API</button>
    `
    forms.insertAdjacentHTML("afterbegin", markup)

    async function create() {
        const name = document.querySelector('#namer').value
        const goal_type = document.querySelector('#goal_type').value
        const intensity = document.querySelector('#intensityr').value
        const category = document.querySelector('#category').value
        const autore = document.querySelector('#autorer').value

        console.log(autore)
       
        const token = localStorage.getItem("token")


     
        
        const res = await fetch("http://127.0.0.1:8000/api/goals/", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf
            },
            body:JSON.stringify({
                name,
                goal_type,
                intensity,
                category,
                autore,
            })
        })
        const obj = await res.json()
        let markup = ""

        if (!res.ok && res.status == 400) {
        
            let campi = ""
            const chiavi = Object.keys(obj)
            for (let i = 0; i < chiavi.length; i ++) {
                if (i === chiavi.length -1 && i!== 0) {
                    campi += "e "+chiavi[i]
                    break
                }
                campi += chiavi[i]+", "
            }
            
            markup = `i campi ${campi} devono essere valorizati`
        }

        else {
 
            markup=`${obj.uuid}`;
        }

        printa(markup)

    }

    document.querySelector("#apicreate").removeEventListener('click', create)
    document.querySelector('#apicreate').addEventListener('click', create)
})


apiRequestRetrive.addEventListener("submit", async (e) => {
    e.preventDefault()
    let btnAggiorna = null

    token = localStorage.getItem("token")

    const autoriRes = await fetch("http://127.0.0.1:8000/api/autori/", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const autori = await autoriRes.json()
    console.log("AUTORI", autori)

    forms.innerHTML=""
    markup = `
        <label>UUID</label><input id="uuid" type="text"><br/>
        <button id="apiretrive">API</button>
        <br/>
        <div id="spazioAggiorna"></div>
    `
    forms.insertAdjacentHTML("afterbegin", markup)

    async function retrive() {
        const uuid = document.querySelector("#uuid").value
        const token = localStorage.getItem("token")
        
        const res = await fetch(`http://127.0.0.1:8000/api/goals/${uuid}/`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
        const obj = await res.json()
        console.log(obj)
        if (res.ok) {

            let markup = `${obj.name}`;
            printa(markup)

            const btnAggiornaMarkup = `<button id='aggiorna'>AGGIORNA</button>`
            document.querySelector("#spazioAggiorna").innerHTML = btnAggiornaMarkup

            // Evento per l'aggiornamento
            document.querySelector("#aggiorna").addEventListener("click", () => {

                let updateFormMarkup = `
                    
                        <label>Nome</label><input id="namero" type="text" value="${obj.name}"><br/>
                        <label>Tipo</label><input id="goal_type" type="text" value="${obj.goal_type}"><br/>
                        <label>Intensità</label><input id="intensityro" min="1" max="100" type="number" value="${obj.intensity}"><br/>
                        <label>Categoria</label><input id="categoryro" type="text" value="${obj.category}"></br>
                        <input id="autorero" type="hidden" value="${obj.autore}">

                        <button id="apiupdate">UPDATE</button>
                   
                `
                document.querySelector("#aggiornaDiv").innerHTML=""
                document.querySelector("#aggiornaDiv").insertAdjacentHTML("beforeend", updateFormMarkup)

                // Aggiungi evento per inviare l'aggiornamento
                document.querySelector("#apiupdate").addEventListener("click", async () => {

                    const name = document.querySelector('#namero').value
                    const goal_type = document.querySelector('#goal_type').value
                    const intensity = document.querySelector('#intensityro').value
                    const category = document.querySelector('#categoryro').value
                    const autore = document.querySelector("#autorero").value

                    const resUpdate = await fetch(`http://127.0.0.1:8000/api/goals/${uuid}/`, {
                        method: "PUT",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrf
                        },
                        body: JSON.stringify({
                            name,
                            goal_type,
                            intensity,
                            category,
                            autore,
                        })
                    })



                    const updatedObj = await resUpdate.json()
                    console.log(updatedObj)
                    if (resUpdate.ok) {
                        printa(`Updated: ${updatedObj.name}`)
                    } else {
                        printa("Errore durante l'aggiornamento")
                    }
                })
            })
        } else {
            printa("Errore nel recuperare il goal")
        }
    }

    document.querySelector("#apiretrive").removeEventListener('click', retrive)
    document.querySelector('#apiretrive').addEventListener('click', retrive)
})



apiRequestDestroy.addEventListener("click", (e) => {
    e.preventDefault()
    token = localStorage.getItem("token")
    markup = `
        <label>UUID</label><input id="uuidDelete" type="text"><br/>
        <button id="apidelete">API</button>
        <br/>
        <div id="spazioAggiorna"></div>
    `
    forms.innerHTML=""
    forms.insertAdjacentHTML("afterbegin", markup)

    document.querySelector("#apidelete").addEventListener("click", async () => {
        const uuid = document.querySelector("#uuidDelete").value
        const res =  await fetch(`http://127.0.0.1:8000/api/goals/${uuid}/`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf
            }
        })

        // const risposta = await res.json()
        printa("Cancellazione effettuata")
    })
})

apiRequestFilteredList.addEventListener("submit", async (e) => {
    e.preventDefault()
    forms.innerHTML=""
    let qparams=""
    if (document.querySelector("#nameValore").value) {
        qparams = `?name${document.querySelector("#nameName").value}=${document.querySelector("#nameValore").value}`
    }
    if(document.querySelector("#autoreValore").value)  {
        qparams +=`${!document.querySelector("#nameValore").value ? "?":"&"}autore=${document.querySelector("#autoreValore").value}`
    }
    if(document.querySelector("#intensityValore").value) {
        qparams +=`${!document.querySelector("#nameValore").value && !document.querySelector("#autoreValore").value ? "?":"&"}&intensity${document.querySelector("#intensityName").value}=${document.querySelector("#intensityValore").value}`
    }

    
    const token = localStorage.getItem("token")
    
    const res = await fetch(`http://127.0.0.1:8000/api/goals/${qparams}`, {
        method: "GET",
        headers: {
            // 'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    const lista = await res.json()
    

    let markup="";
    
    lista.forEach((el) => {
        markup+=`${el.uuid} | ${el.name} | ${el.goal_type} | ${el.created_at} | Autore: ${el.autore} | Intensity:${el.intensity}<br/>`
    })
    printa(markup)
})