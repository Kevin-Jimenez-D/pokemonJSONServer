# Pokemon desde JSON Server

**Autor:**

- Kevin Johan Jimenez Delgado

## Pasos para la correcta instalación de node usando Windows

- En primer lugar se debe saber si se tiene instalado node, colocando la siguiente instrucción en el terminal de la computadora o visual studio code `node --version`, en caso de que salga error o salga una versión menos que la "18.18.0", se hace lo siguiente:

- Si se tiene un node menor al recomendado, se recomienda desinstalarlo desde el panel de control->Desinstalar un programa-> Desintalar node; luego para instalar la ultima versión se debe ir a la página de node e instalar la versión que se desea usar `https://nodejs.org/es/download`, obviamente que sea "18.18.0"

## Pasos para la correcta instalación de node usando Linux

- En primer lugar se debe saber si se tiene instalado node, colocando la siguiente instrucción en el terminal de la computadora o visual studio code `node --version`, en caso de que salga error o salga una versión menos que la "18.18.0", se coloca la siguiente instrucción para instalar node en una versión correcta de funcionamiento `nvm install 18.18.0`, luego en visual studio code, en el fichero donde se vaya a trabajar, se va a la terminal y se coloca `npm i`

## Primera configuración en Node para tu proyecto

- Colocar la siguiente instrucción para introducir node en la ruta donde vas a trabajar, `npm init -y`  
- Luego en la consola saldrá lo siguiente, muy parecido pero no saldrá igual, igual este se vera en un archivo llamado "package.json" en tu fichero
```
{
  "name": "presupuestocasaennode",
  "version": "1.0.0",
  "description": "**Autor:**",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
Edita los campos en la parte de autor por tu nombre y asegurate que tengas el AUTOGUARDADO, adicional agrega una linea, la del type, entonces se debería ver el archivo "package.json" de la siguiente forma. 
```
{
  "name": "presupuestocasaennode",
  "version": "1.0.0",
  "description": "**Autor:**",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Kevin JJ",
  "license": "ISC"
}
```

- Coloca la siguiente instrucción para ya añadir node a tu fichero local `npm -E -D install json-server`, ahí empieza una instalación y esta instrucción es para hacer una versión estable (NOTA: NO tocar las carpetas de node.modules ni "package-lock.son" que se crean): 

![image](img/instalacionJSONServer1.png)

![image](img/instalacionJSONServer2.png)

- Crear un archivo en el fichero llamado "db.json", con la siguiente linea de código como forma de prueba:
```
 {
  "pokemonesPokeApi":["Esto"],
  "pokemonesJSONServer":["Es"],
  "pokemones":["Prueba"]  
}
```
como notaras en el archivo "package.json", este ha cambiado, le vamos a editar la parte de scripts y dejarlo parecido a este:
```
{
  "name": "presupuestocasaennode",
  "version": "1.0.0",
  "description": "**Autor:**",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "dev": "json-server --watch db.json"
  },
  "keywords": [],
  "author": "Kevin JJ",
  "license": "ISC",
  "devDependencies": {
    "json-server": "0.17.3"
  }
}
```
Por ultimo colocar la siguiente línea de comando `npm run dev`, y debería verse lo de que aparece en db.json, en la parte de resources aparece un link que al final aparece pokemonesPokeApi, pokemonesJSONServer, pokemones y lo que se edite en vivo con el "db.json" se podrá evidenciar en esos links. Para salir del en vivo con CTRL+C en la terminal

![image](img/mainJS1.png)

![image](img/linkLive.png)

- Con npm corriendo, podemos usar node en otra terminal y colocar el comando `node main.js` para ver los resultados en consola desde Visual Studio Code y desde ahí poder trabajar

![image](img/nuevaTerminal.png)

![image](img/nuevaTerminal2.png)

## Ignorar algunos archivos antes de subir al git

- Antes de subir al repositorio y para evitar conflictos, en la carpeta donde se esta trabajando se debe crear un archivo `.gitignore` y dentro de él colocar las carpetas que no desean que se suban al git para evitar conflictos, obligatoriamente deben estar las que se muestran a continuación:

```
node_modules
package-lock.json
```

![image](img/gitIgnore.png)

- Con esto ya se puede subir todo al GitHub

## Clonar desde el repositorio

- Si se desea trabajar el proyecto, se debe clonar obviamente donde se desea trabajar o fichero deseado, en la terminal de Visual Studio Code con `git clone <url>` y luego de eso invocar el siguiente comando `npm i` en el lugar donde el fichero descargo todo de GitHub. Ya con eso se puede invocar el comando `npm run dev` para trabajar desde el repositorio clonado.

![image](img/gitclone1.png)

![image](img/gitclone2.png)

