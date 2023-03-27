Sprint 4 NodeJS, segunda entrega

---------------------

Instrucciones para probar la API de la entrega 4.2:
- PRIMERO DE TODO. Navegar en la consola al 'cd' raíz del proyecto. Una vez ahí, ejecutar el comando 'npm i' para instalar las dependencias.

- SEGUNDO. Para probar correctamente esta entrega, hay que usar la colección de postman adjunta en el proyecto. En postman, arriba a la izquierda seleccionar el menú desplegable 'file', 'import...'. En la misma pestaña 'file', seleccionar en mitad de la ventana emergente 'Upload Files'. Navegar a la carpeta del proyecto y abrir la colección 'api-entrega4.1.postman_collection.json'.

- TERCERO. Asegúrate que tienes instalado MySqlServer y MySqlWorkbench:
Server: https://dev.mysql.com/downloads/mysql/
Workbench: https://dev.mysql.com/downloads/workbench/
Una vez instalados, acuérdate del usuario y contraseña que uses como admin, la necesitarás.
Abrimos Workbench y iniciamos una conexión MySql. Puedes crear una o usar la que viene por defecto.
Creamos un schema con el nombre que deseemos para la base de datos.

- CUARTO. Ahora toca configurar las variables de entorno y los archivos de configuración.
En el proyecto, buscamos el archivo config.json './app/config/config.json'. En el archivo, hay que modificar 'username', 'password', 'database' y 'host' por los nuestros. Si has usado el server que viene por defecto, solo necesitas cambiar la password por la tuya de MySql y la database con el nombre que le hayas dado al schema creado en el punto anterior.
Ahora las variables de entorno. Buscamos en el proyecto el archivo .env-template, y lo modificamos para que quede así: '.env' sin las comillas. En este archivo solo debemos modificar 'SERVER_PORT' por el puerto donde queramos conectar el servidor de la API. No necesitarás acordarte, asi que no te preocupes.

- QUINTO Y ÚLTIMO. Ejecutar en la consola, de nuevo en la raíz del proyecto, el comando 'npm start' para iniciar el server.

- Está todo listo para probar las request en postman.

INSTRUCCIONES PARA LA CORRECTA EJECUCIÓN DE LAS REQUESTS.

Ten en cuenta que no podrás realizar la mayoría de requests si no tienes un usuario registrado y te conectas con él, así que voy a describir un orden recomendado a seguir.
En todos los casos debería de venir la URL necesaria, pero la especificaré en cada caso al principio por si acaso.
Ten en cuenta que tu URl puede variar dependiendo del puerto que estés usando para el servidor.

- POST registerUser. localhost:3000/register
Pestaña 'Body' 'x-www-form-urlencoded' format, insertamos una key 'user' y una key 'password', con sus valores. Acuérdate de estas credenciales.

- POST loginUser. localhost:3000/login
Pestaña 'Body' 'x-www-form-urlencoded' format, insertamos una key 'user' y una key 'password', con sus valores. El usuario debe de haberse registrado previamente.
Si el login es correcto, postman debería contestarnos un mensaje con varias propiedades. Nos interesa el token. Guardate su valor, sin las comillas, en el portapepeles. Lo necesitarás para ejecutar el resto de requests correctamente.

A PARTIR DE AHORA, en todas las requests hay que añadir el token a todas las requests. Para ello, en la pestaña 'Authorization', Type 'Bearer Token'. A la izquierda en el campo 'token', pegamos el que tenemos guardado en el portapapeles.

- POST createPlayer. localhost:3000/players      OPCIONAL. No necesitas crear un jugador para jugar partidas.
Pestaña 'Params', insertamos una key 'username' y su value, que será el nombre del jugador.

- GET listPlayers. localhost:3000/players
No hay que añadir nada extra.

- PUT modifyPlayer. localhost:3000/players
Pestaña 'Params', insertamos una key 'username' y su value, el nuevo nombre del jugador.

- POST createGame. localhost:3000/games
No hay que añadir nada extra.

- GET getGames. localhost:3000/players
No hay que añadir nada extra.

- DEL deleteGames. localhost:3000/players
No hay que añadir nada extra.

- GET getRanking. localhost:3000/ranking
No hay que añadir nada extra.

- GET getBestPlayer. localhost:3000/ranking/winner
No hay que añadir nada extra.

- WORST getWorstPlayer. localhost:3000/ranking/loser
No hay que añadir nada extra.