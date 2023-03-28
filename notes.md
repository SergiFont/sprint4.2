Construirem una API que doni suport a un joc de daus ;)

Al joc de daus s’hi juga amb dos daus de sis cares:

En cas que el resultat dels dos daus sigui 7 la partida es guanya, si no es perd.
Per poder jugar al joc t’has de registrar com a jugador/a amb un nom. Un jugador/a pot veure un llistat de totes les tirades que ha fet i el seu percentatge d’èxit.
Per poder realitzar una tirada, un usuari/ària s’ha de registrar amb un nom no repetit. Al ser creat, se li assigna un identificador únic i una data de registre.
Si l’usuari/ària ho desitja, pot no afegir cap nom i es dirà “ANÒNIM”. Pot haver-hi més d’un jugador/a “ANÒNIM”.
Cada jugador/a pot veure un llistat de totes les tirades que ha fet amb el valor de cada dau i si s’ha guanyat o no la partida. A més, pot saber el percentatge d’èxit de les tirades que ha fet.
No es pot eliminar una partida en concret, però sí que es pot eliminar tot el llistat de tirades d'un jugador/a. El software ha de permetre llistar tots els jugadors/es que hi ha al sistema, el percentatge d’èxit de cada jugador/a i el percentatge d’èxit mitjà de tots els jugadors/es en el sistema.
El software ha de respectar els principals patrons de disseny.
Has de tenir en compte els següents detalls de construcció:
POST /players: crea un jugador/a.
PUT /players/{id}: modifica el nom del jugador/a.
GET /players: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.
POST /games/{id}: un jugador/a específic realitza una tirada.
DELETE /games/{id}: elimina les tirades del jugador/a.
GET /games/{id}: retorna el llistat de jugades per un jugador/a.
GET /ranking: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge d’èxits mig del conjunt de tots els jugadors/es.
GET /ranking/loser: retorna el jugador/a amb pitjor percentatge d’èxit.
GET /ranking/winner: retorna el jugador/a amb millor percentatge d’èxit.

/////////////////////////////////////////////////////
Nivell 1
Persistència: utilitza com a base de dades MySQL (amb Sequelize com a ORM).

Nivell 2
Persistència: utilitza MongoDB (amb Mongoose) com a base de dades.

Nivell 3
Afegeix un endpoint /login que permeti accedir a un administrador amb usuari/ària i contrasenya i retorni un token i fes obligatòria l'autentificació per JWT en tots els accessos als URL del microservei, fent servir middlewares per validar al token.





morgan