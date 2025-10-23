# You are here (and so is everybody else) - Geolocalización
## Resumen del Capítulo:

Este capítulo profundiza en la API de Geolocalización de HTML5, una característica poderosa que permite a las aplicaciones web acceder a la ubicación física del usuario de manera segura y con su consentimiento explícito. Explora cómo los navegadores modernos pueden obtener coordenadas geográficas (latitud, longitud, altitud, precisión y velocidad) utilizando fuentes como GPS, Wi-Fi o redes celulares, dependiendo del dispositivo. El capítulo cubre la detección de soporte, el uso de métodos como getCurrentPosition() para consultas únicas y watchPosition() para monitoreo continuo, además de manejar errores comunes (como denegación de permiso, indisponibilidad de posición o timeouts). También discute opciones avanzadas como enableHighAccuracy para mayor precisión (que puede consumir más batería), timeout para límites de tiempo y maximumAge para usar posiciones en caché. Se enfatiza la importancia de la privacidad: la API requiere permiso del usuario y no funciona en contextos no seguros (como HTTP sin SSL en producción). El enfoque es práctico, con ejemplos de integración en aplicaciones web, compatibilidad entre navegadores y consejos para fallbacks cuando la API no está disponible. Finalmente, se menciona cómo esta API se combina con otras características de HTML5 para crear experiencias interactivas basadas en ubicación. 

### Conceptos Clave y Código Relacionado:

- Detección de Soporte: Antes de usar la API, verifica si el navegador la soporta, ya que no todos los navegadores antiguos la incluyen.

- Código:

```JS
function supportsGeolocation() {
    return 'geolocation' in navigator;
}
```

**Explicación línea por línea:**

- function supportsGeolocation() {: Define una función que devuelve un valor booleano para comprobar el soporte.

- return 'geolocation' in navigator;: Verifica si la propiedad geolocation existe en el objeto global navigator. Si es true, el navegador soporta la API; de lo contrario, no (ej. en IE antiguo).
- Uso: Llama a esta función antes de intentar acceder a la ubicación para evitar errores.

### Obtener la Posición Actual (Consulta Única):
 Usa getCurrentPosition() para obtener la ubicación una vez.

- Codigo: 

```JS
navigator.geolocation.getCurrentPosition(
    function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var accuracy = position.coords.accuracy;
        console.log('Latitud: ' + latitude + ', Longitud: ' + longitude + ', Precisión: ' + accuracy + ' metros');
    },
    function(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.error('Usuario denegó el permiso.');
                break;
            case error.POSITION_UNAVAILABLE:
                console.error('Posición no disponible.');
                break;
            case error.TIMEOUT:
                console.error('Tiempo de espera agotado.');
                break;
            default:
                console.error('Error desconocido.');
        }
    },
    {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
    }
);
```

**Explicación línea por línea:**

- navigator.geolocation.getCurrentPosition(: Llama al método principal de la API.

- function(position) { ... }: Callback de éxito. Recibe un objeto position con datos de ubicación.

- var latitude = position.coords.latitude;: Extrae la latitud (en grados decimales).

- var longitude = position.coords.longitude;: Extrae la longitud.

- var accuracy = position.coords.accuracy;: Extrae la precisión en metros (cuánto error hay en la posición).

- console.log(...): Muestra los datos en la consola del navegador.

- function(error) { ... }: Callback de error. Maneja problemas comunes.

- switch(error.code) { ... }: Evalúa el código de error (1: permiso denegado, 2: posición no disponible, 3: timeout).

- console.error(...): Registra el error en la consola.

- { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }: Objeto de opciones.

- enableHighAccuracy: true: Intenta obtener la ubicación más precisa posible (usa GPS si está disponible, pero consume más batería).

- timeout: 10000: Tiempo máximo en milisegundos para esperar la respuesta (10 segundos).

- maximumAge: 60000: Usa una posición en caché si es más reciente que 60 segundos, para ahorrar recursos.

**Monitoreo Continuo de Ubicación:** Usa watchPosition() para rastrear cambios en tiempo real, útil para apps como mapas de navegación.

Código:

```JS
var watchId = navigator.geolocation.watchPosition(
    function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        // Actualiza la UI o envía datos a un servidor
        document.getElementById('location').innerHTML = 'Lat: ' + lat + ', Lng: ' + lng;
    },
    function(error) {
        console.error('Error en monitoreo: ' + error.message);
    },
    { enableHighAccuracy: false, timeout: 5000 }
);
// Para detener el monitoreo: navigator.geolocation.clearWatch(watchId);
```

**Explicación línea por línea:**

- var watchId = navigator.geolocation.watchPosition(: Inicia el monitoreo y devuelve un ID único para detenerlo.

- function(position) { ... }: Callback que se ejecuta cada vez que cambia la posición.

- var lat = position.coords.latitude;: Obtiene la latitud actualizada.

- var lng = position.coords.longitude;: Obtiene la longitud.

- document.getElementById('location').innerHTML = ...: Actualiza un elemento HTML con la nueva ubicación (ej. un párrafo con ID 'location').

- function(error) { ... }: Maneja errores durante el monitoreo.

- { enableHighAccuracy: false, timeout: 5000 }: Opciones similares, pero con precisión baja para ahorrar batería.

- navigator.geolocation.clearWatch(watchId);: Detiene el monitoreo usando el ID, liberando recursos.

**Privacidad y Mejores Prácticas:** La API siempre pide permiso al usuario. Usa HTTPS en producción. Proporciona fallbacks si no está soportada (ej. pedir ubicación manual).

**Compatibilidad y Librerías:** Funciona en navegadores modernos (Chrome, Firefox, Safari). Para compatibilidad antigua, usa librerías como Modernizr o geo.js.

- Código con Modernizr:
```JS
if (Modernizr.geolocation) {
    // Código de geolocalización aquí
} else {
    alert('Geolocalización no soportada.');
}
```
**Explicación:** Verifica soporte con Modernizr antes de proceder.