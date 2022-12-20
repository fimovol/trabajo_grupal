let tbody = document.createElement("tbody")
let root = document.getElementById("root")
 
 let users = [
        {id: 1, nombre: "Andres", apellido: "Pacheco", edad: 38, profesion: "developer", created_at: "2022-09-26T06:25:21.118Z"},
        {id: 2, nombre: "Andrea", apellido: "Sanchez", edad: 25, profesion: "profesor", created_at: "2022-04-18T14:14:32.879Z"},
        {id: 3, nombre: "Julia", apellido: "Ochoa", edad: 32, profesion: "musico", created_at: "2021-12-14T11:53:38.279Z"},
        {id: 4, nombre: "Samuel", apellido: "Martinez", edad: 29, profesion: "programador", created_at: "2022-01-26T03:31:15.202Z"},
        {id: 5, nombre: "Roberto", apellido: "Mattos", edad: 40, profesion: "chef", created_at: "2022-07-27T02:06:22.760Z"},
        {id: 6, nombre: "Mercedes", apellido: "Sanchez", edad: 35, profesion: "veterinario", created_at: "2022-05-01T22:06:35.864Z"},
    ]
    let button_crear = document.createElement("button")
    button_crear.setAttribute("id","boton_crear")
    button_crear.innerText = `crear`

    let button_actali = document.createElement("button")
    button_actali.setAttribute("id","boton_update")
    button_actali.innerText = `actualizar`

    let boton_eliminars = document.createElement("button")
    boton_eliminars.setAttribute("id","boton_eliminar")
    boton_eliminars.innerText = `eliminar`

    root.insertAdjacentElement("afterend",button_crear)
    root.insertAdjacentElement("afterend",button_actali)
    root.insertAdjacentElement("afterend",boton_eliminars)
    
let boton = document.getElementById("boton_update")
boton.addEventListener("click",()=> {
   let nuevoobjeto = update(users)
   tbody.innerHTML = ""
   ordenar(nuevoobjeto,tbody)
})

let boton_crear = document.getElementById("boton_crear")
boton_crear.addEventListener("click",()=> {
    let nuevoobjeto = nuevousuario()
    tbody.innerHTML = ""
    ordenar(nuevoobjeto,tbody)
})

let boton_eliminar = document.getElementById("boton_eliminar")
boton_eliminar.addEventListener("click",()=> {
    let id = prompt("ingresa el id que quieres borrar")
    let seguro = prompt("seguro que deseas borrar si/no")
    if(seguro == "si"){
        users = borrar(id)
        tbody.innerHTML = ""
        ordenar(users,tbody)
    }
})
function borrar(id){
    return users.filter((elemento)=> elemento.id != id)
}

function nuevousuario(){
    let asd = prompt(`Ingrese la informacion del usuario (nombre, apellido, edad, profesion)`)
    if(asd!=null){
        let separado = asd.split(",")
        let objeto = {
            id: idunico(),
        }
        objeto.nombre = separado[0]
        objeto.apellido = separado[1]
        objeto.edad = separado[2]
        objeto.profesion = separado[3]
        objeto.created_at = creacion()
        users.push(objeto)
       
    }
    return users
}
function idunico(){
    let array = []
    users.map((elemento)=> {
        array.push(elemento.id)
    })
    let numeromayor = Math.max(...array)
    return numeromayor + 1
}



function update(objeto){
    
    let id = prompt(`cual es el id del registro que quiere modificar`)
    if(id==""){
        return "debes de escribir un id"
    }
    let objetoarray = users
    objeto.forEach( (elemento,i)=> {
        if(elemento.id == id){
            
            objetoarray[i].nombre = prompt(`nombre es:`)
            objetoarray[i].apellido = prompt(`apellido es:`)
            objetoarray[i].edad = prompt(`edad es:`)
            objetoarray[i].profesion = prompt(`profesion es:`)
            objetoarray[i].fecha_de_modificacion = creacion()
            console.log()             
            
        }
    })
    users = objetoarray
    return users
}

function creacion(){
    let hora = new Date()
    return `${hora.toString()}`
}



creartabla()

function creartabla(){
    
    let table = document.createElement("table")
    table.setAttribute("border","1")
    let thead = document.createElement("thead")
    
    let tr = document.createElement("tr")
    
    let array = ["id", "nombre", "apellido", "edad", "profesion", "created_at","fecha_de_modificacion"]
    array.map((elemento)=>{
        let th = document.createElement("th")
        th.textContent = elemento
        
        listenerth(th,tbody)
        //addEventlistenerfuncion(th,tbody)
        tr.append(th)
    })
    

    ordenar(users,tbody)

    thead.append(tr)
    table.append(thead)
    table.append(tbody)
    root.append(table)

    
}
function listenerth(elemento,tbody){
    // let th = document.createElement("th")
    // th.textContent = "elemento"
    let th =elemento
    th.addEventListener("click", (e)=> {
        let key = e.srcElement.innerHTML
        if(key == "fecha_de_modificacion"){

        }else{
            let ordenado = ordenarProductosPorAtributo(key,users)
            tbody.innerHTML = ""
            ordenar(ordenado,tbody)
        }
    })
}
let varia = true
function ordenarProductosPorAtributo(atributo,objeto){
    varia = !varia
    
    return objeto.sort((a,b) => {
        if(a[atributo] > b[atributo]){
            return varia ? -1 : 1
        }
        if(a[atributo] < b[atributo]){
            return varia ? 1 : -1
        }
        return 0
    })
}

function ordenar(objeto,tbody){
    objeto.map( (elemento,index)=> {
        let trbody = document.createElement("tr")
        for (const key in users[index]){
            let td = document.createElement("td")
            td.textContent = users[index][key]
            trbody.append(td)

        }
        tbody.append(trbody)
    })
}