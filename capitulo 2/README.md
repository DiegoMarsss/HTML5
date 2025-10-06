# Detectando características de HTML5: Es elemental, mi querido Watson
## De que tratara el capitulo:
Veremos cómo detectar el soporte de características individuales de HTML5 en los navegadores, ya que "HTML5" no es una única entidad detectable. Presenta cuatro técnicas básicas de detección y destaca la utilidad de la librería Modernizr para simplificar este proceso. Luego, aplica estas técnicas para detectar el soporte de características clave como Canvas (incluyendo texto en Canvas), Video (y sus formatos), Almacenamiento Local, Web Workers, Aplicaciones Web Offline, Geolocalización y nuevos tipos de entrada de formularios.

**Conceptos Importantes**

- **HTML5 no es una cosa grande:** La detección se hace por característica individual.
- **Técnicas de Detección:**

  2. Comprobar la existencia de una propiedad en un objeto global (ej. window o navigator).
 
  - codigo (Geolocalización):

```javascript
  function supports_geolocation() {
    return !!navigator.geolocation;
}
```
### Explicacion: ####

- navigator.geolocation: El objeto navigator es un objeto global que contiene información sobre el navegador. Si el navegador soporta la API de Geolocalización, tendrá una propiedad geolocation.

- !!: El doble operador de negación (!!) convierte cualquier valor en un booleano. Si navigator.geolocation existe y no es null o undefined, se convierte en true. De lo contrario, se convierte en false.

- Uso: Si esta función devuelve true, puedes usar la API de Geolocalización.

2. **Crear un elemento y comprobar la existencia de una propiedad en ese elemento.**

- Codigo (canvas)

```javascript
> function supports_canvas() {
    return !!document.createElement('canvas').getContext;
}
```
### Explicacion:
- document.createElement('canvas'): Crea un elemento 'canvas' en memoria, pero no lo inserta en el DOM de la página.

- .getContext: Si el navegador soporta la API de Canvas, el elemento ´canvas tendrá un método getContext().

- !!: Convierte el resultado en un booleano. Si getContext existe, devuelve true.

- Uso: Si esta función devuelve true, el navegador soporta Canvas.
### Texto en canvas 

````javascript
> function supports_canvas_text() {
    if (!supports_canvas()) { return false; } // Primero verifica el soporte básico de Canvas
    var dummy_canvas = document.createElement('canvas');
    var context = dummy_canvas.getContext('2d');
    return typeof context.fillText == 'function';
}
````
#### Explicacion 
- if (!supports_canvas()) { return false; }: Es una buena práctica verificar primero el soporte básico de Canvas antes de intentar verificar características más específicas.

- dummy_canvas.getContext('2d'): Obtiene el contexto de dibujo 2D del canvas.

- typeof context.fillText == 'function': Comprueba si el objeto context tiene una propiedad fillText que sea una función. fillText es el método para dibujar texto en el canvas.

- Uso: Si devuelve true, el navegador soporta dibujar texto en Canvas.

3. **Crear un elemento, comprobar un método, llamarlo y verificar el valor de retorno.**
- Codigo (Formato de videos)

```javascript
function supports_h264_baseline_video() {
  if (!supports_video()) { return false; }
  var v = document.createElement("video");
  return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
}
```

### Explicacion:
- if (!supports_video()) { return false; }: Verifica el soporte básico del elemento ´video´.

- document.createElement("video"): Crea un elemento ´video´ en memoria.

- v.canPlayType(...): El método canPlayType() del elemento ´video´ toma una cadena que describe un tipo MIME de video (con códecs opcionales) y devuelve 

      - "probably": Si el navegador está bastante seguro de que puede reproducirlo.

      - "maybe": Si el navegador cree que podría reproducirlo.

      - "" (cadena vacía): Si el navegador está seguro de que no puede reproducirlo.

- Uso: El valor de retorno indica la capacidad del navegador para reproducir un formato específico.

4. **Crear un elemento, establecer una propiedad y verificar si la propiedad retiene su valor.Crear un elemento, establecer una propiedad y verificar si la propiedad retiene su valor.**

   - Código (Tipos de entrada de formularios HTML5):

```javascript 
   > function supports_input_type(type) {

     var i = document.createElement("input");
    i.setAttribute("type", type);
    return i.type !== "text";
}
// Ejemplo de uso: supports_input_type("color")
```
### Explicacion: ###
- document.createElement("input"): Crea un elemento input en memoria. Por defecto, su type es "text".

  - i.setAttribute("type", type): Intenta establecer el atributo type del input al tipo deseado (ej. "color", "date", "email").

  - return i.type !== "text": Si el navegador no soporta el tipo de entrada especificado, ignorará el setAttribute y el i.type seguirá siendo "text". Si lo soporta, i.type reflejará el nuevo valor.

  - Uso: Permite detectar si el navegador implementa tipos de entrada específicos de HTML5.

- **Modernizr:** Una librería JavaScript que simplifica la detección de características.  
  - Código (uso de Modernizr):

```html
<script src="modernizr.min.js"></script>

<!-- ... -->

<script>
if (Modernizr.canvas) {
  // El navegador soporta Canvas
} else {
  // No hay soporte nativo de Canvas
}

if (Modernizr.video.webm) {
  // El navegador soporta video WebM
}

if (Modernizr.localstorage) {
  // El navegador soporta almacenamiento local
}
</script>

```
### Explicacion
Modernizr se ejecuta automáticamente al cargarse y crea un objeto global Modernizr con propiedades booleanas para cada característica detectada. Modernizr.canvas será true si Canvas es compatible, false si no. Para formatos de video, usa un objeto anidado como Modernizr.video.webm. Esto abstrae la complejidad de las técnicas de detección manual.

- Almacenamiento Local (`localStorage`):
  - Código (detección manual con try...catch):

  ```javascript 
  function supports_local_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
        return false;
    }
  }  
  ```
### Explicacion 
- 'localStorage' in window: Comprueba si la propiedad localStorage existe en el objeto global window.

- window['localStorage'] !== null: Asegura que no sea null.

- try...catch: Es crucial porque en algunas versiones antiguas de Firefox, acceder a localStorage cuando las cookies están deshabilitadas podía lanzar una excepción.

### Web Workers
   - Codigo detenccion

   ```javascript 
   function supports_web_workers() {
    return !!window.Worker;
  }
  ```
  **Explicacion**
  - Comprueba la existencia del objeto Worker en el ámbito global window.

### Aplicaciones web offline (applicationCache):

  - Codigo deteccion 

  ```javascript
  function supports_offline() {
    return !!window.applicationCache;
  }

  ```

  -  Comprueba la existencia del objeto applicationCache en el ámbito global window.

  ### Geolocalización:
  -  Codigo deteccion 
```javascript
function supports_geolocation() {
    return !!navigator.geolocation;
}
```
**Explicacion** 
   - Comprueba la existencia del objeto geolocation en el objeto global navigator.

### Placeholder Text (placeholder atributo):
 - Codigo deteccion

 ```javascript
 function supports_input_placeholder() {
    var i = document.createElement('input');
    return 'placeholder' in i;
}
```
**Explicacion**
  - Crea un input y verifica si la propiedad placeholder existe en el objeto DOM del input.

### Autofocus (autofocus atributo):
- Codigo deteccion
```javascript
function supports_input_autofocus() {
    var i = document.createElement('input');
    return 'autofocus' in i;
}
```
**Explicacion**
  - Similar a placeholder, verifica la existencia de la propiedad autofocus en el objeto DOM del input.

  ### Similar a placeholder, verifica la existencia de la propiedad autofocus en el objeto DOM del input.
  - Codigo deteccion

  ```javascript 
  function supports_microdata_api() {
    return !!document.getItems;
  }
  ```
  - Comprueba la existencia del método getItems en el objeto global document.

  ✅ **Listo:** Ya les explique cómo detectar el soporte de características individuales de HTML5 en los navegadores, ya que html no es el unico detectable (canvas, formularios, fotos, videos, geolocalización, etc)