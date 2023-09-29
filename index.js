/* //Una prueba
let myPikachu = document.querySelector("#myPikachu");
    
myPikachu.addEventListener("click", async()=>{
    Swal.fire('Any fool can use a computer');
})
*/


//Mismo nombre de la variable que en el HTML para no confundirme
let myPikachu = document.querySelector("#myPikachu");

//Es el boton donde saldrán los demas pokemones
let pokemones= document.querySelector("#pokemones");

//Los datos de los pokemones que se veran en la consola
document.querySelector("#vistaPrevia").addEventListener("click", async () => {
    // URL de la API MockAPI a donde se enviaran
    const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";

    try {
        // Realiza una solicitud GET para obtener todos los Pokémon de la base de datos MockAPI
        const response = await fetch(mockapiUrl);
        //Para entrar internamente a los datos de mockapi
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


myPikachu.addEventListener("click", async()=>{


    // Obtén el nombre del Pokémon ingresado por el usuario, elimina espacios en blanco al inicio y final y coloca la palabra en minuscula
    const pokemonName = document.querySelector("#pokemonActual").value.trim().toLowerCase();

    // Verifica si el Pokémon ya existe en la base de datos de MockAPI
    const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";
    const response = await fetch(mockapiUrl);
    const pokemonData = await response.json();

    // Busca el Pokémon en los datos de MockAPI, la vuelvo minuscula en la appi y miro si son iguales
    const foundPokemon = pokemonData.find((pokemon) => pokemon.name.toLowerCase() === pokemonName);

    if (foundPokemon) {
        
        
        //document.querySelector("#pokemones").dataset.pokemonId = foundPokemon.id;
        //console.log("Encontrado")
        //console.log(foundPokemon.id)
        //Extraer su id
        // Obtén la ID del Pokémon almacenada en el botón
        //const pokemonId = document.querySelector("#pokemones").dataset.pokemonId;
        //const mockapiUrl = `https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon/${pokemonId}`;
    } else {
        // Si no se encuentra el Pokémon, muestra un mensaje de error
        //console.log("No encontrado")
        Swal.fire("Error", `No se encontró ningún Pokémon con el nombre "${pokemonName}" en la base de datos.`, "error");
    }



    //De la pagina "https://pokeapi.co/" por defecto aparece pokemon y en /ditto se coloca pikachu
    //Traiga la peticion, por ejemplo 202, lo convierte a JSON y traiga esos datos
    //Son 1017 pokemons
    //let res= await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json();
    //El objeto encontrado con el id del pokemon, solo me interesa el id para manipular la url
    let res= await (await fetch(`https://pokeapi.co/api/v2/pokemon/${foundPokemon.id}`)).json();

    //En la pagina "https://pokeapi.co/" se va al apartado sprites -> front_default -> la imagen del pikachu
    let img= res.sprites.front_default;
    //EN caso de alguna falla, me carga esta imagen sacada de la src de la imagen encontrada en Google
    let defaultImg = "https://media.tenor.com/OPhGGLtFqLQAAAAC/pokeball.gif";

    // lo del swal es lo de la página "https://sweetalert2.github.io/"
    Swal.fire({
        //En la parte del name, en el link de la api, el name es un apartado principal, entonces solo se debe colocar name
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        
        //Donde aparece el ? es un condiciona, si la imagen aparece la coloca, sino coloca la de por default
        imageUrl: `${(img) ? img:defaultImg}`,
        html:
        //Se hace el mapeo porque son varios datos, deseo hacer iteración y que me genere nuevos datos sin alterar el inicial, se usa map
        //Los input serán de tipo rango y en la parte del valor sera de los datos mapeados, 
        //Los labels mostraran el numero y luego la caracteristica, HP y attack, etc
        //Que los una con el .join en el HTML
        `
        <form>
            ${res.stats.map(data =>`
            <div>
                <input type="range" value="${data.base_stat}" name="${data.stat.name}"/>
                <label data-name="${data.stat.name}">
                    <b>${data.base_stat}</b>
                    ${data.stat.name}
                </label>
            </div>
            `).join("")}
            <input type="submit" value="Enviar" disabled="disabled"/>
        </form>
        `,
        //Imagenes al 80%
        imageWidth: "80%",
        imageHeight: "80%",
      })
      //Mostrar las nuevas estadisticas al cambiar los valores de los input y evidenciarlos en el html
      let myContainer = document.querySelector("#swal2-html-container");
      myContainer.addEventListener("input", (e)=>{
        let myLabel=e.target.nextElementSibling;
        myLabel.innerHTML=`<b>${e.target.value}</b> ${myLabel.dataset.name}`
      })  
})

//Enviar los datos de pokeapi a mockapi
let pokeapiMockapi = document.querySelector("#pokeapiMockapi");

pokeapiMockapi.addEventListener("click",async()=>{
    // Iterar desde 1 hasta 10 (o cualquier otro número deseado)
    for (let idPokeApi = 1; idPokeApi <= 10; idPokeApi++) {
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

        // URL de la API MockAPI
        const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";

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
            const response = await fetch(mockapiUrl, requestOptions);

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


// Agrega un evento click al botón con id "buscarPokemon"
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




//Todas las acciones relacionadas con el boton addEventListener de los pokemones
pokemones.addEventListener("click", async()=>{
    // Obtén la ID del Pokémon almacenada en el botón
    const pokemonId = document.querySelector("#pokemones").dataset.pokemonId;


    //De la pagina "https://pokeapi.co/" por defecto aparece pokemon y en /ditto se coloca pikachu
    //Traiga la peticion, por ejemplo 202, lo convierte a JSON y traiga esos datos
    //Son 1017 pokemons, si se le cambia el ultimo / por el numero, trae cada uno de los pokemons
    //Que empiece por defecto en 1
    ////let res= await (await fetch("https://pokeapi.co/api/v2/pokemon/1")).json();
    let res= await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)).json();

    //En la pagina "https://pokeapi.co/" se va al apartado sprites -> front_default -> la imagen del pikachu
    let img= res.sprites.front_default;
    let defaultImg = "https://media.tenor.com/OPhGGLtFqLQAAAAC/pokeball.gif";

    // lo del swal es lo de la página "https://sweetalert2.github.io/"
    Swal.fire({
        //En la parte del name, en el link de la api, el name es un apartado principal, entonces solo se debe colocar name
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        
        //Donde aparece el ? es un condiciona, si la imagen aparece la coloca, sino coloca la de por default
        imageUrl: `${(img) ? img:defaultImg}`,
        html:
        //Se hace el mapeo porque son varios datos, deseo hacer iteración y que me genere nuevos datos sin alterar el inicial, se usa map
        //Los input serán de tipo rango y en la parte del valor sera de los datos mapeados, 
        //Los labels mostraran el numero y luego la caracteristica, HP y attack, etc
        //Que los una con el .join en el HTML
        //Mirar el arbol de la api stats->base_stat para el valor y stats->star->name para el nombre del valor
        `
        <form>
            ${res.stats.map(data =>`
            <div>
                <input type="range" value="${data.base_stat}" name="${data.stat.name}"/>
                <label data-name="${data.stat.name}">
                    <b>${data.base_stat}</b>
                    ${data.stat.name}
                </label>
            </div>
            `).join("")}
            <input id="enviarJSON" type="submit" value="Enviar"/>
        </form>
        `,
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

        //Que se agregue al HTML su valor y a que caracteristica pertenen, vida, ataque, etc, esto son los valores que van cambiando
        myLabel.innerHTML=`<b>${e.target.value}</b> ${myLabel.dataset.name}`

        //console.log(res.id);                   //Guarda el id del pokemon
        //console.log(res.name);               //Guarda el nombre
        //console.log(myLabel.dataset.name);   //Guarda el nombre de la habilidad
        //console.log(e.target.value);         //Guarda el valor de la habilidad como numerico

        //let mockapi = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon"




                        
                        

    })  
            //let mockapi = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon"
            // Agrega un evento click al botón con id "enviarJSON"
            document.querySelector("#enviarJSON").addEventListener("click", async (event) => {
                // Obtén la ID del Pokémon almacenada en el botón
                //const pokemonId = document.querySelector("#pokemones").dataset.pokemonId;
                // Evita que el formulario se envíe de forma predeterminada
                event.preventDefault();
            
                // Accede al formulario y crea un nuevo objeto FormData a partir de él
                const form = document.querySelector("form");
                const formData = new FormData(form);
            
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
            
                // Luego puedes hacer lo que quieras con estos datos, como mostrarlos en la consola o enviarlos a través de una solicitud AJAX a otro lugar.
                console.log("ID del pokemon:",String(res.id));                   
                console.log("Nombre del Pokémon:", res.name);
                console.log("Puntos de Salud (HP):", hp);
                console.log("Puntos de Ataque:", attack);
                console.log("Puntos de Defensa:", defense);
                
                console.log("specialAttack", specialAttack);
                console.log("specialDefense", specialDefense);
                console.log("speed", speed);
            
                // Aquí puedes continuar con cualquier otra acción que desees realizar con los datos.




                // Ahora puedes crear un objeto que contenga todos los datos que deseas enviar a la API MockAPI
                //id: String(res.id),
                //OJo con los apartados de la izquierda : para no envíe datos falsos
                const updatedData = {
                    
                    name: res.name,
                    hp: parseFloat(hp),
                    attack: parseFloat(attack),
                    defense: parseFloat(defense),
                    "special-attack": parseFloat(specialAttack),
                    "special-defense": parseFloat(specialDefense),
                    speed: parseFloat(speed)
                };

                // Verifica si hay una ID de Pokémon seleccionada, importante porque deseo editar
                if (pokemonId) {
                    // Si hay una ID seleccionada, actualiza el Pokémon existente en la API MockAPI
                    const mockapiUrl = `https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon/${pokemonId}`;
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
                    const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";
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
            });
})

document.querySelector("#eliminarPokemon").addEventListener("click", async () => {
    // Obtén el nombre del Pokémon ingresado por el usuario
    const pokemonNameToDelete = document.querySelector("#eliminarNombrePokemon").value.trim().toLowerCase();

    // URL de la API MockAPI
    const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";

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
