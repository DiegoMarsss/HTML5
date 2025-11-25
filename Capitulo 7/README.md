#  El pasado, presente y futuro del almacenamiento local para aplicaciones web
 Este capítulo aborda la necesidad de almacenamiento persistente en el lado del cliente para aplicaciones web, una característica donde las aplicaciones nativas solían tener ventaja. Repasa las limitaciones de las cookies y la historia de las soluciones previas a HTML5 (userData de IE, Flash Local Shared Objects, Google Gears con SQLite). Luego, introduce el Almacenamiento HTML5 (Web Storage), destacando sus ventajas sobre las cookies (mayor capacidad, no se envía al servidor) y su amplia compatibilidad. Explica cómo usar localStorage para almacenar pares clave-valor y cómo manejar eventos de cambio. Finalmente, discute las "visiones competidoras" para el almacenamiento avanzado: Web SQL Database (basado en SQLite) y la API de Indexed Database (IndexedDB), señalando el estado de estandarización y adopción de cada una.

### Conceptos Clave y Código Relacionado:

- Limitaciones de las Cookies: Pequeño tamaño (4KB), se envían con cada solicitud HTTP, no cifradas.

- **Soluciones Pre-HTML5 (Hacks):**

  - userData (IE): Almacenamiento de hasta 64KB por dominio en XML.

  - Flash Local Shared Objects (LSO): Hasta 100KB por dominio, con prompts para más.

  - Google Gears: Plugin que ofrecía una base de datos SQLite incrustada.

- **Introducción al Almacenamiento HTML5 (Web Storage):**

  - Almacenamiento persistente de pares clave-valor en el cliente.

  - No se envía al servidor.

  - Implementado nativamente en navegadores.

### Detección de Soporte:
  - Codigo JavaScript 

  ```JS (manual)
  function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
  }
  ```

- **Explicacion:** Similar a otras detecciones, verifica la existencia de localStorage en el objeto window y maneja posibles excepciones.

### Código JavaScript (con Modernizr):

```JS 
if (Modernizr.localstorage) {
    // window.localStorage está disponible
} else {
    // No hay soporte nativo
}
```
- Uso simplificado de la librería Modernizr.

### Uso de localStorage (Pares Clave-Valor):

- **Interfaz Storage:**

  - setItem(key, value): Almacena un valor asociado a una clave.

  - getItem(key): Recupera el valor asociado a una clave.

  - removeItem(key): Elimina una clave y su valor.

  - clear(): Elimina todas las claves y valores.

  - length: Número de elementos almacenados.

  - key(index): Obtiene el nombre de la clave en un índice específico.

### Codigo JavaScript (Ejemplos)

```JS
localStorage.setItem("miClave", "miValor"); // Almacenar
var valor = localStorage.getItem("miClave"); // Recuperar
localStorage["otraClave"] = "otroValor"; // Sintaxis de array asociativo
var otroValor = localStorage["otraClave"]; // Recuperar con sintaxis de array
localStorage.removeItem("miClave"); // Eliminar
localStorage.clear(); // Borrar todo
```

- **Explicación:**
  - Los valores se almacenan como cadenas de texto. Si almacenas números o booleanos, deberás convertirlos explícitamente al recuperarlos (ej. parseInt(), parseFloat(), value == "true").

  - getItem() devuelve null si la clave no existe.

### Seguimiento de Cambios (storage event):

- Codigo JS

```JS
if (window.addEventListener) {
    window.addEventListener("storage", handle_storage, false);
} else {
    window.attachEvent("onstorage", handle_storage); // para IE < 9
}

function handle_storage(e) {
    if (!e) { e = window.event; } // compatible con IE
    console.log("Clave cambiada:", e.key);
    console.log("Valor antiguo:", e.oldValue);
    console.log("Valor nuevo:", e.newValue);
    console.log("URL:", e.url || e.uri); // Compatiblen con propiedades antiguas
}
```
- **Explicación:**  
El evento storage se dispara en el objeto window cuando setItem(), removeItem() o clear() modifican el área de almacenamiento. Proporciona información sobre la clave, el valor antiguo, el nuevo valor y la URL de la página que realizó el cambio. No es cancelable.

#### Limitaciones de localStorage:
- 5 Megabytes: Límite de almacenamiento por dominio (consistente en la mayoría de navegadores).

- QUOTA_EXCEEDED_ERR: Excepción lanzada si se excede la cuota.

- No hay mecanismo para solicitar más espacio al usuario desde JavaScript.

### Visiones Competidoras para Almacenamiento Avanzado:

- Web SQL Database:

- Basado en SQLite, permite ejecutar consultas SQL desde JavaScript.
- Código JavaScript (ejemplo):
```JS 
openDatabase('documents', '1.0', 'Local document storage', 5 * 1024 * 1024, function (db) {
    db.changeVersion('', '1.0', function (t) {
        t.executeSql('CREATE TABLE docids (id, name)');
    }, error);
});
```
- **Explicación:** openDatabase() abre o crea una base de datos. executeSql() permite ejecutar comandos SQL.

- **Estado:** Implementado en Safari, Chrome, Opera, Android. Sin embargo, el W3C lo ha declarado "en un punto muerto" debido a la falta de múltiples implementaciones independientes (todos usaban SQLite).

### Indexed Database API (IndexedDB):

Un "almacén de objetos" (object store) NoSQL, con conceptos de bases de datos, registros y campos.

No usa SQL, sino métodos JavaScript para interactuar con los datos (cursores, transacciones).

Estado: Implementado en Firefox (beta de F4), considerado por Chrome/Chromium y Microsoft. Es la dirección futura preferida por el W3C para el almacenamiento estructurado.