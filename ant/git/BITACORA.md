# M1

## P0
- el navegador
- el commputador que recibe la solicictud
- solicitud y recibo respuesta

## P1
- ¿Qué respuesta vas a ver en cada una?
- lo mismo que antes
- ¿Por qué?
- porque no hemos creado un sistema más complejo de respuesta

## P2
- ¿Cuántas líneas "Llegó una petición" van a aparecer en la
terminal?
-una por recarga

## P3
- ¿Qué responde el servidor si pides /actividades/ (con slash al final)? ¿Y /ACTIVIDADES?
- ERROR 404, porque el código no contiene esas entradas, solo /actividades

## REFLEXIÓN
- Escribe tres cosas que te parecieron tediosas o frágiles al hacer el servidor a mano. Las vas a
comparar en el siguiente momento.
-Iniciar el npm
-Iniciar el git (todo)
-Conectar con la cuenta de github

# M2

## P4
- ¿Qué crees que responde Express si la pides?
- algún error 400 porque no existe, por ende no la va a encontrar

## REFLEXIÓN
- Vuelve a tus tres cosas tediosas del Momento 1. ¿Cuáles resolvió Express? ¿Alguna sigue igual?
- Ya todo es mejor, porque se hacerlo bien

# M3

## P5
- Comenta la línea next(); y pide / en el navegador. ¿Qué ves en el navegador? ¿Qué ves en la
terminal?
- se ve que funciona, aparece el json

# M4

## P6
- ¿Qué código de estado y qué body vas a
recibir?
- 'Rafting en el río Fonce', tipo: 'agua', precio: 60000

## P7
- En la versión corregida, borra la palabra return que está antes de res.status(404) y pide
/actividades/99. ¿Qué recibe el cliente? ¿Qué aparece en la terminal? Después vuelve a poner el
return.
- recibe igual un error la terminal imprime normal lo del next

## P8
- Predice el resultado de estas tres peticiones: ?tipo=agua, ?tipo=AGUA y ?tipo=fuego. Para la
última: ¿debería responder 404 o 200 con una lista vacía? Defiende tu respuesta.
- la primera arroja los objetos con el tipo "agua", la segunda y la tercera arrojan un array vacío
porque AGUA no es un resultado existente, sino solo "agua", y como tampoco existe fuego, por eso ocurre. Arroja 200 porque
aun no tenemos el código que detecte lo que no existe para que arroje 400.

# M5

## P9
- ¿Qué código de estado y qué body vas a recibir? ¿Qué va a imprimir console.log('Body
recibido:', req.body) en la terminal?
- 201 y un id que crece de a 1 de forma consecutiva. Undefined

## P10
- Haz cualquier cambio en app.js y guarda (con --watch el servidor se reinicia solo). Vuelve a pedir
GET /actividades. ¿Sigue estando la actividad que creaste?
- No. Ya no vuelve a aparecer.

# M6

## P11
- Mueve este bloque al inicio, justo después de express.json(), y pide GET /actividades. ¿Qué
pasa? ¿Por qué? Después regrésalo al final.
- arroja error 404. Porque, al ponerla al principio y al enviar el GET, esta inicia su proceso de una vez, y lo que hay debajo de ella jamás va a ejecutarse.

# CONCLUSIÓN
- Express decide qué código ejecutar evaluando las rutas y middlewares en estricto orden de aparición, ejecutando el que coincida con la petición o pasando al siguiente mediante la función next().