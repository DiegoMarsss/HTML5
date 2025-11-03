# Estás aquí (y también todos los demás) - Geolocalización

 En este capítulo explora la API de Geolocalización de HTML5, que permite a las aplicaciones web determinar la ubicación física del usuario (con su consentimiento). Explica cómo acceder a la API a través del objeto navigator.geolocation, cómo obtener la posición actual y cómo manejar posibles errores (como la denegación del usuario o la falta de disponibilidad de la posición). También detalla las opciones para solicitar mayor precisión o usar posiciones en caché, y la función watchPosition() para monitorear cambios continuos de ubicación. Finalmente, aborda la compatibilidad con navegadores antiguos y dispositivos móviles a través de librerías como geo.js y Google Gears.

### Conceptos Clave y Código Relacionado:

- La API de Geolocalización: Permite obtener la ubicación del usuario. Siempre requiere el consentimiento del usuario.

- Detección de Soporte:
  - Código JavaScript:

```JS
  function get_location() {
    if (Modernizr.geolocation) { // Usando Modernizr para la detección
        navigator.geolocation.getCurrentPosition(show_map);
    } else {
        // Fallback para navegadores sin soporte nativo
    }
```
- **Explicación:** Se utiliza Modernizr.geolocation (del Capítulo 2) para verificar si el navegador soporta la API. Si es así, se llama a navigator.geolocation.getCurrentPosition().

### Obtener la Posición Actual (getCurrentPosition()):

- Código JavaScript:
```JS
navigator.geolocation.getCurrentPosition(show_map);
```

- **Explicación:** Este método inicia la solicitud de la ubicación del usuario. Toma una función de callback (show_map en este caso) que se ejecutará cuando la ubicación esté disponible.

### Función de Callback de Éxito:

- Codigo JavaScript 

```JS
function show_map(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // Usar latitud y longitud para mostrar un mapa, etc.
}
```
- **Explicación:** La función show_map recibe un objeto position.

- **position.coords:** Un objeto que contiene las coordenadas geográficas.

- **position.coords.latitude:** La latitud en grados decimales.

- **position.coords.longitude:** La longitud en grados decimales.

- **position.coords.altitude:** Altitud (puede ser null).

- **position.coords.accuracy:** Precisión de la latitud/longitud en metros.

- **position.timestamp:** Marca de tiempo de cuándo se calculó la posición.

### Manejo de Errores:
- Codigo JavaScript

```JS
navigator.geolocation.getCurrentPosition(show_map, handle_error);

function handle_error(err) {
    if (err.code == 1) {
        // El usuario denegó el permiso
    } else if (err.code == 2) {
        // Posición no disponible (problemas de red/satélite)
    } else if (err.code == 3) {
        // Tiempo de espera agotado
    } else {
        // Error desconocido
    }
}
```

- **Explicación:** getCurrentPosition() puede tomar un segundo argumento, una función de callback de error. Esta función recibe un objeto PositionError con un código (code) y un mensaje (message).

  - PERMISSION_DENIED (1): El usuario no dio permiso.

  - POSITION_UNAVAILABLE (2): La ubicación no pudo ser determinada.

  - TIMEOUT (3): La solicitud de ubicación excedió el tiempo límite.

### Opciones de Posición (PositionOptions):

- Codigo JavaScript

```JS
navigator.geolocation.getCurrentPosition(
    show_map,
    handle_error,
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
);
```
- **Explicación:** El tercer argumento de getCurrentPosition() es un objeto de opciones:

   - enableHighAccuracy (booleano): Si es true, el dispositivo intentará obtener la ubicación más precisa posible (ej. usando GPS), lo que puede consumir más batería y tardar más.
   - timeout (milisegundos): El tiempo máximo que la aplicación está dispuesta a esperar por una posición.

   - maximumAge (milisegundos): El tiempo máximo que se permite que una posición en caché sea "vieja". Si se establece en 0, siempre se intentará obtener una nueva posición.

### Monitorear la Posición (watchPosition()):

- Codigo JavaScript 

```JS
var watchID = navigator.geolocation.watchPosition(show_map, handle_error, options);
// Para dejar de monitorear:
navigator.geolocation.clearWatch(watchID);
```
- **Explicación:** watchPosition() es similar a getCurrentPosition(), pero llama repetidamente a la función de callback de éxito cada vez que la ubicación del usuario cambia. Devuelve un ID que se puede usar con clearWatch() para detener el monitoreo. 

### Compatibilidad con IE y otras plataformas (geo.js y Gears):

- Codigo HTML
```HTML
<script src="gears_init.js"></script>
<script src="geo.js"></script>
```

- Explicación:

  - gears_init.js: Inicializa Google Gears, un plugin de navegador que proporcionaba geolocalización (y otras características) para navegadores antiguos, incluyendo IE.

  - geo.js: Una librería JavaScript que unifica la API de geolocalización, proporcionando una interfaz consistente para la API estándar del W3C, Gears y otras APIs específicas de dispositivos móviles.

  ### Código JavaScript (uso de geo.js):
- Codigo JavaScript

```JS
if (geo_position_js.init()) {
    geo_position_js.getCurrentPosition(geo_success, geo_error);
}
```
- Explicación:

- geo_position_js.init(): Inicializa la librería y devuelve true si hay una API de geolocalización compatible disponible.

- geo_position_js.getCurrentPosition(geo_success, geo_error): Llama a la función unificada para obtener la posición, con callbacks de éxito y error.