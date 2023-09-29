//Traer información desde la MockApi hasta "http://localhost:3000/pokemonesPokeApi", solo hacerse una vez, hacerse con el boton de pokeapiMockapi
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