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