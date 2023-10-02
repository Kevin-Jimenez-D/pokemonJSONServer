/*
//Traer información desde la MockApi hasta "http://localhost:3000/pokemonesPokeApi", 
//solo hacerse una vez, hacerse con el boton de pokeapiMockapi
const traerMockApi = async()=>{
    let mockapi = await (await fetch("https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon")).json();
    //console.log(mockapi);
    let config=
    {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(mockapi)
    }

    let res = await (await fetch("http://localhost:3000/pokemonesPokeApi", config)).json();
    console.log(res);
}

traerMockApi();
*/





//Enviar los datos de pokeapi a JSONServer
//OJO, esto solo se debe hacer una vez sino se genera errores, por eso lo desabilito
//Por alguna razón envía pocos datos cuando se presiona una sola vez, pero si se presiona varias veces
//Si envía todos los datos, no importa si salen errores
let pokeapiMockapi = document.querySelector("#pokeapiMockapi");

pokeapiMockapi.addEventListener("click",async()=>
{
    // Iterar desde 1 hasta 10 (o cualquier otro número deseado)
    for (let idPokeApi = 1; idPokeApi <= 10; idPokeApi++) 
    {
        let res = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokeApi}`)).json();
        
        // Guarda los datos en las variables
        let id = res.id;
        let name = res.name;
        let hp = res.stats[0].base_stat; // HP es el primer valor en la lista
        let attack = res.stats[1].base_stat; // Ataque es el segundo valor en la lista
        let defense = res.stats[2].base_stat; // Defensa es el tercer valor en la lista
        let specialAttack = res.stats[3].base_stat; // Ataque Especial es el cuarto valor en la lista
        let specialDefense = res.stats[4].base_stat; // Defensa Especial es el quinto valor en la lista
        let speed = res.stats[5].base_stat; // Velocidad es el sexto valor en la lista

        // Muestra los valores en la consola
        // console.log("ID del pokemon:", String(id));
        // console.log("Nombre del Pokémon:", name);
        // console.log("Puntos de Salud (HP):", String(hp));
        // console.log("Puntos de Ataque:", String(attack));
        // console.log("Puntos de Defensa:", String(defense));
        // console.log("Puntos de Ataque Especial:", String(specialAttack));
        // console.log("Puntos de Defensa Especial:", String(specialDefense));
        // console.log("Velocidad:", String(speed));

        // URL del JSON Server
        const JSONServer = "http://localhost:3000/pokemonesJSONServer";

        // Crear un objeto que contenga los datos que deseas enviar a la API MockAPI
        //COlocar correctamente los elementos de la izquierda : para que no me envie datos errados
        const dataToSend = {
            id: String(id),
            name: name,
            hp: parseFloat(hp),
            attack: parseFloat(attack),
            defense: parseFloat(defense),
            "special-attack": parseFloat(specialAttack),
            "special-defense": parseFloat(specialDefense),
            speed: parseFloat(speed)
        };

        // Configuración para la solicitud POST, es agregar datos aunque no existan
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        };

        try {
            // Envía los datos al servidor MockAPI junto con el método y los datos a enviar
            const response = await fetch(JSONServer, requestOptions);

            if (response.ok) {
                // Si la solicitud fue exitosa, muestra un mensaje
                Swal.fire("Éxito", `Datos enviados correctamente a MockAPI para el Pokémon ${name}`, "success");
            } else {
                // Si hubo un error en la solicitud, muestra un mensaje de error
                Swal.fire("Error", `Error al enviar los datos a MockAPI para el Pokémon ${name}`, "error");
            }
        } catch (error) {
            // En caso de error en la solicitud, muestra un mensaje de error
            Swal.fire("Error", `Error al enviar los datos a MockAPI para el Pokémon ${name}`, "error");
        }
    }

})




//Los datos de los pokemones que se veran en la consola
document.querySelector("#vistaPrevia").addEventListener("click", async () => {
    // URL de la API MockAPI a donde se enviaran
    const JSONServer = "http://localhost:3000/pokemonesJSONServer";

    try {
        // Realiza una solicitud GET para obtener todos los Pokémon desde JSON Server
        const response = await fetch(JSONServer);
        //Para entrar internamente a los datos de JSONServer
        const pokemonData = await response.json();

        // Itera a través de los Pokémon y muestra los nombres en la consola y por defecto me saca el nombre o name
        pokemonData.forEach((pokemon) => {
            console.log(pokemon.name);
        });

        // Muestra un mensaje de éxito en Swal.fire
        Swal.fire("Éxito", "Nombres de Pokémon mostrados en la consola.", "success");
    } catch (error) {
        // En caso de error, muestra un mensaje de error en Swal.fire
        Swal.fire("Error", "Error al procesar la solicitud.", "error");
    }
});




//Evento para traer los datos de un pokemon de acuerdo a su nombre y se vea la carta
//Mismo nombre de la variable que en el HTML para no confundirme
let myPikachu = document.querySelector("#myPikachu");

myPikachu.addEventListener("click", async()=>{


    // Obtén el nombre del Pokémon ingresado por el usuario, elimina espacios en blanco al inicio y final y coloca la palabra en minuscula
    const pokemonName = document.querySelector("#pokemonActual").value.trim().toLowerCase();

    // Verifica si el Pokémon ya existe en la base de datos de JSON Server
    const mockapiUrl = "http://localhost:3000/pokemonesJSONServer";
    const response = await fetch(mockapiUrl);
    const pokemonData = await response.json();

    // Busca el Pokémon en los datos de MockAPI, la vuelvo minuscula en la appi y miro si son iguales
    const foundPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === pokemonName);

    //Trae todo el objeto que se ve en el JSON Server
    //console.log(foundPokemon);

    if (foundPokemon) {
        //document.querySelector("#pokemones").dataset.pokemonId = foundPokemon.id;
        //console.log("Encontrado")
        //console.log(foundPokemon.id)
        //Extraer su id
        // Obtén la ID del Pokémon almacenada en el botón
        //const pokemonId = document.querySelector("#pokemones").dataset.pokemonId;
        //const mockapiUrl = `https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon/${pokemonId}`;


    //De la pagina "https://pokeapi.co/" por defecto aparece pokemon y en /ditto se coloca pikachu
    //Traiga la peticion, por ejemplo 202, lo convierte a JSON y traiga esos datos
    //Son 1017 pokemons
    //let res= await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json();
    //El objeto encontrado con el id del pokemon, solo me interesa el id para manipular la url
    let res= await (await fetch(`https://pokeapi.co/api/v2/pokemon/${foundPokemon.id}`)).json();
    //En la pagina "https://pokeapi.co/" se va al apartado sprites -> front_default -> la imagen del pokemon
    let img= res.sprites.front_default;
    //EN caso de alguna falla, me carga esta imagen sacada de la src de la imagen encontrada en Google
    let defaultImg = "https://media.tenor.com/OPhGGLtFqLQAAAAC/pokeball.gif";

    //console.log(resMockApi);

    // lo del swal es lo de la página "https://sweetalert2.github.io/"
    Swal.fire({
        //Del objeto del data base en JSON solo obtengo ell nombre
        title: `${foundPokemon.name}`,
        text: 'Modal with a custom image.',
        
        //Donde aparece el ? es un condiciona, si la imagen aparece la coloca, sino coloca la de por default
        imageUrl: `${(img) ? img:defaultImg}`,
        html:
        //Para acceder a propiedades con nombres que contienen guiones, debes utilizar la notación de corchetes
        // en lugar de la notación de punto. Aquí está cómo puedes hacerlo:
        `<p>id:${foundPokemon.id}</p>`+
        `<p>name:${foundPokemon.name}</p>`+
        `<p>hp:${foundPokemon.hp}</p>`+
        `<p>attack:${foundPokemon.attack}</p>`+
        `<p>defense:${foundPokemon.defense}</p>`+        
        `<p>special-attack:${foundPokemon["special-attack"]}</p>`+
        `<p>special-defense:${foundPokemon["special-defense"]}</p>`+
        `<p>speed:${foundPokemon.speed}</p>`,
        //Imagenes al 80%
        imageWidth: "80%",
        imageHeight: "80%",
      })
        
      

    } else {
        // Si no se encuentra el Pokémon, muestra un mensaje de error
        //console.log("No encontrado")
        Swal.fire("Error", `No se encontró ningún Pokémon con el nombre "${pokemonName}" en la base de datos.`, "error");
    }


})




// Agrega un evento click al botón con id "buscarPokemon"
//Primero verifica que exista el pokemon antes de que se pueda editar
document.querySelector("#buscarPokemon").addEventListener("click", async () => {
    // Obtén el nombre del Pokémon ingresado por el usuario, elimina espacios en blanco al inicio y final y coloca la palabra en minuscula
    const pokemonName = document.querySelector("#nombrePokemon").value.trim().toLowerCase();

    // Verifica si el Pokémon ya existe en la base de datos de MockAPI
    const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";
    const response = await fetch(mockapiUrl);
    const pokemonData = await response.json();

    // Busca el Pokémon en los datos de MockAPI, la vuelvo minuscula en la appi y miro si son iguales
    const foundPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === pokemonName);

    if (foundPokemon) {
        // Si se encuentra el Pokémon, habilita el botón "pokemones" y almacena su ID
        document.querySelector("#pokemones").removeAttribute("disabled");
        //Extraer su id
        document.querySelector("#pokemones").dataset.pokemonId = foundPokemon.id;
        Swal.fire("Éxito", `¡${foundPokemon.name} encontrado en la base de datos!`, "success");
    } else {
        // Si no se encuentra el Pokémon, muestra un mensaje de error
        Swal.fire("Error", `No se encontró ningún Pokémon con el nombre "${pokemonName}" en la base de datos.`, "error");
    }
});






//Es el boton donde saldrán los demas pokemones
let pokemones= document.querySelector("#pokemones");

pokemones.addEventListener("click",async()=>{
    // Obtén la ID del Pokémon almacenada en el botón
    const pokemonId = document.querySelector("#pokemones").dataset.pokemonId;

    // Obtén el nombre del Pokémon ingresado por el usuario, elimina espacios en blanco al inicio y final y coloca la palabra en minuscula
    const pokemonName = document.querySelector("#nombrePokemon").value.trim().toLowerCase();

    // Verifica si el Pokémon ya existe en la base de datos de JSON Server
    const mockapiUrl = "http://localhost:3000/pokemonesJSONServer";
    const response = await fetch(mockapiUrl);
    const pokemonData = await response.json();

    //console.log(pokemonData);

    // Busca el Pokémon en los datos de MockAPI, la vuelvo minuscula en la appi y miro si son iguales
    const foundPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === pokemonName);

    //Trae todo el objeto que se ve en el JSON Server
    console.log(foundPokemon);

    //Con esto obtengo las llaves de todos mis elementos para colocarlos dinamicamente
    const arrayPrueba=Object.keys(foundPokemon)

    //Obtengo por ejemplo el del primer id
    //console.log(arrayPrueba[0]);

    if (foundPokemon) {
    //De la pagina "https://pokeapi.co/" por defecto aparece pokemon y en /ditto se coloca pikachu
    //Traiga la peticion, por ejemplo 202, lo convierte a JSON y traiga esos datos
    //Son 1017 pokemons
    //let res= await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json();
    //El objeto encontrado con el id del pokemon, solo me interesa el id para manipular la url
    let res= await (await fetch(`https://pokeapi.co/api/v2/pokemon/${foundPokemon.id}`)).json();
    //En la pagina "https://pokeapi.co/" se va al apartado sprites -> front_default -> la imagen del pokemon
    let img= res.sprites.front_default;
    //EN caso de alguna falla, me carga esta imagen sacada de la src de la imagen encontrada en Google
    let defaultImg = "https://media.tenor.com/OPhGGLtFqLQAAAAC/pokeball.gif";

    //console.log(resMockApi);

    // lo del swal es lo de la página "https://sweetalert2.github.io/"
    Swal.fire({
        //Del objeto del data base en JSON solo obtengo ell nombre
        title: `${foundPokemon.name}`,
        text: 'Modal with a custom image.',
        
        //Donde aparece el ? es un condiciona, si la imagen aparece la coloca, sino coloca la de por default
        imageUrl: `${(img) ? img:defaultImg}`,
        html:
        //Para acceder a propiedades con nombres que contienen guiones, debes utilizar la notación de corchetes
        // en lugar de la notación de punto. Aquí está cómo puedes hacerlo:
        `<form>
            <div>
                <input type="range" value="${foundPokemon.hp}" name="${arrayPrueba[2]}"/>
                <label data-name="${arrayPrueba[2]}">
                    <b>${foundPokemon.hp}</b>
                    ${arrayPrueba[2]}
                </label>
            </div>

            <div>
                <input type="range" value="${foundPokemon.attack}" name="${arrayPrueba[3]}"/>
                <label data-name="${arrayPrueba[3]}">
                    <b>${foundPokemon.attack}</b>
                    ${arrayPrueba[3]}
                </label>
            </div>

            <div>
                <input type="range" value="${foundPokemon.defense}" name="${arrayPrueba[4]}"/>
                <label data-name="${arrayPrueba[4]}">
                    <b>${foundPokemon.defense}</b>
                    ${arrayPrueba[4]}
                </label>
            </div>

            <div>
                <input type="range" value="${foundPokemon["special-attack"]}" name="${arrayPrueba[5]}"/>
                <label data-name="${arrayPrueba[5]}">
                    <b>${foundPokemon["special-attack"]}</b>
                    ${arrayPrueba[5]}
                </label>
            </div>

            <div>
                <input type="range" value="${foundPokemon["special-defense"]}" name="${arrayPrueba[6]}"/>
                <label data-name="${arrayPrueba[6]}">
                    <b>${foundPokemon["special-defense"]}</b>
                    ${arrayPrueba[6]}
                </label>
            </div>

            <div>
                <input type="range" value="${foundPokemon.speed}" name="${arrayPrueba[7]}"/>
                <label data-name="${arrayPrueba[7]}">
                    <b>${foundPokemon.speed}</b>
                    ${arrayPrueba[7]}
                </label>
            </div>
            <input id="enviarJSON" type="submit" value="Enviar"/>
        </form>`,
        //Imagenes al 80%
        imageWidth: "80%",
        imageHeight: "80%",
      })
        
      //Esa id es la que selecciono en el HTML, cuando me alumbre el di que contiene la barrita de rango, el numero y la habilidad
      let myContainer = document.querySelector("#swal2-html-container");

      //Cuando detecte como un cambio en el input
      myContainer.addEventListener("input", (e)=>{

        //Cambia el elemento hermano, por eso el nextElementSibling
        let myLabel=e.target.nextElementSibling;

        //Es el valor de cambio al mover la barra
        //console.log(e.target.value);

        //Aparece la habilidad
        //console.log(myLabel.dataset.name);

        //Que se agregue al HTML su valor y a que caracteristica pertenen, vida, ataque, etc, esto son los valores que van cambiando
        myLabel.innerHTML=`<b>${e.target.value}</b> ${myLabel.dataset.name}`

        //console.log(res.id);                   //Guarda el id del pokemon
        //console.log(res.name);               //Guarda el nombre
        //console.log(myLabel.dataset.name);   //Guarda el nombre de la habilidad
        //console.log(e.target.value);         //Guarda el valor de la habilidad como numerico

        //let mockapi = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon"

        document.querySelector("#enviarJSON").addEventListener("click",async (event) =>{
            // Obtén la ID del Pokémon almacenada en el botón
                    //const pokemonId = document.querySelector("#pokemones").dataset.pokemonId;
                    // Evita que el formulario se envíe de forma predeterminada
                    event.preventDefault();
                
                    // Accede al formulario y crea un nuevo objeto FormData a partir de él
                    const form = document.querySelector("form");
                    const formData = new FormData(form);

                    //const hp = foundPokemon.hp;
                    //const attack = foundPokemon.attack;
                    //const defense = foundPokemon.defense;
                    //const specialAttack = foundPokemon["special-attack"];
                    //const specialDefense = foundPokemon["special-defense"];
                    //const speed = foundPokemon.speed;

                    // Puedes acceder a los datos individualmente por su nombre (por ejemplo, "name")
                    const name = formData.get("name");
                    // Y también a las características, por ejemplo, "hp", "attack", "defense", etc.
                    const hp = formData.get("hp");
                    const attack = formData.get("attack");
                    const defense = formData.get("defense");
                    // ... y así sucesivamente para todas las características

                    const specialAttack = formData.get("special-attack");
                    const specialDefense = formData.get("special-defense");
                    const speed = formData.get("speed");

                    //const hp = e.target.value;
                    //const attack = e.target.value;
                    //const defense = e.target.value;
                    //const specialAttack = e.target.value;
                    //const specialDefense = e.target.value;
                    //const speed = e.target.value;
                
                    // Luego puedes hacer lo que quieras con estos datos, como mostrarlos en la consola o enviarlos a través de una solicitud AJAX a otro lugar.
                    //console.log("ID del pokemon:",foundPokemon.id);                   
                    //console.log("Nombre del Pokémon:", foundPokemon.name);
                    //console.log("Puntos de Salud (HP):", foundPokemon.hp);
                    //console.log("Puntos de Ataque:", foundPokemon.attack);
                    //console.log("Puntos de Defensa:", foundPokemon.defense);
                    
                    //console.log("specialAttack", specialAttack);
                    //console.log("specialDefense", specialDefense);
                    //console.log("speed", foundPokemon.speed);
                
                    // Aquí puedes continuar con cualquier otra acción que desees realizar con los datos.
    
                    const JSONServer = "http://localhost:3000/pokemonesJSONServer";
    
                    // Realiza una solicitud GET para obtener todos los Pokémon desde JSON Server
                    const response = await fetch(JSONServer);
                    //Para entrar internamente a los datos de JSONServer
                    const pokemonData = await response.json();
    
                    //Es uno menos que la id de pokeapi
                    //console.log(pokemonData[parseInt(foundPokemon.id)-1]);
    
    
                    // Ahora puedes crear un objeto que contenga todos los datos que deseas enviar a la API MockAPI
                    //id: String(res.id),
                    //OJo con los apartados de la izquierda : para no envíe datos falsos
                    const updatedData = {
                        id:foundPokemon.id,
                        name:foundPokemon.name,
                        hp: parseFloat(hp),
                        attack: parseFloat(attack),
                        defense: parseFloat(defense),
                        "special-attack": parseFloat(specialAttack),
                        "special-defense": parseFloat(specialDefense),
                        speed: parseFloat(speed)
                    };
    
                    //console.log(updatedData);
                    // Verifica si hay una ID de Pokémon seleccionada, importante porque deseo editar
                if (pokemonId) {
                    // Si hay una ID seleccionada, actualiza el Pokémon existente en la API MockAPI
                    const mockapiUrl = `http://localhost:3000/pokemonesJSONServer/${pokemonId}`;
                    const requestOptions = {
                        method: "PUT", // Usa PUT para actualizar
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    };

                    try {
                        // Envía la solicitud PUT para actualizar el Pokémon
                        const response = await fetch(mockapiUrl, requestOptions);
                        console.log(response);

                        if (response.ok) {
                            Swal.fire("Éxito", "Datos actualizados correctamente en MockAPI", "success");
                        } else {
                            Swal.fire("Error", "Error al actualizar los datos en MockAPI", "error");
                        }
                    } catch (error) {
                        Swal.fire("Error", "Error al actualizar los datos en MockAPI", "error");
                    }
                } else {
                    // Si no hay una ID seleccionada, crea un nuevo Pokémon en la API MockAPI
                    const mockapiUrl = "http://localhost:3000/pokemonesJSONServer";
                    const requestOptions = {
                        method: "POST", // Usa POST para crear un nuevo Pokémon
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    };

                    try {
                        // Envía la solicitud POST para crear un nuevo Pokémon
                        const response = await fetch(mockapiUrl, requestOptions);

                        if (response.ok) {
                            Swal.fire("Éxito", "Nuevo Pokémon creado en MockAPI", "success");
                        } else {
                            Swal.fire("Error", "Error al crear un nuevo Pokémon en MockAPI", "error");
                        }
                    } catch (error) {
                        Swal.fire("Error", "Error al crear un nuevo Pokémon en MockAPI", "error");
                    }
                }
    
                    pokemones.disabled=true;   //Desabilita luego de enviar para que no me edite nombres de pokemones que no encuentre
        })
    })


    

    } else {
        // Si no se encuentra el Pokémon, muestra un mensaje de error
        //console.log("No encontrado")
        Swal.fire("Error", `No se encontró ningún Pokémon con el nombre "${pokemonName}" en la base de datos.`, "error");
    }

})


//Para eliminar los datos
document.querySelector("#eliminarPokemon").addEventListener("click", async () => {
    // Obtén el nombre del Pokémon ingresado por el usuario
    const pokemonNameToDelete = document.querySelector("#eliminarNombrePokemon").value.trim().toLowerCase();

    // URL de la API MockAPI
    const mockapiUrl = "http://localhost:3000/pokemonesJSONServer";

    try {
        // Realiza una solicitud GET para obtener todos los Pokémon de la base de datos MockAPI
        const response = await fetch(mockapiUrl);
        const pokemonData = await response.json();

        // Busca el Pokémon en los datos de MockAPI
        const foundPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === pokemonNameToDelete);

        if (foundPokemon) {
            // Si se encuentra el Pokémon, obtén su ID
            const pokemonIdToDelete = foundPokemon.id;

            // URL para eliminar el Pokémon por ID
            const deleteUrl = `${mockapiUrl}/${pokemonIdToDelete}`;

            // Realiza una solicitud DELETE para eliminar el Pokémon de la base de datos
            const deleteResponse = await fetch(deleteUrl, { method: "DELETE" });

            if (deleteResponse.ok) {
                Swal.fire("Éxito", `El Pokémon ${foundPokemon.name} ha sido eliminado de la base de datos.`, "success");
            } else {
                Swal.fire("Error", "Error al eliminar el Pokémon de la base de datos.", "error");
            }
        } else {
            // Si no se encuentra el Pokémon, muestra un mensaje de error
            Swal.fire("Error", `El Pokémon con nombre "${pokemonNameToDelete}" no existe en la base de datos.`, "error");
        }
    } catch (error) {
        Swal.fire("Error", "Error al procesar la solicitud.", "error");
    }
});