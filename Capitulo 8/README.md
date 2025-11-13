#  Desconectémonos (Offline Web Applications)
Este capítulo explica cómo crear aplicaciones web que funcionen sin conexión a Internet utilizando la API de Application Cache de HTML5. Describe el concepto de un archivo manifest que lista todos los recursos necesarios para la aplicación offline (HTML, CSS, JavaScript, imágenes). Detalla cómo vincular la página HTML al manifest y cómo configurar el servidor para servir el manifest con el tipo MIME correcto. Explora las tres secciones principales de un manifest (CACHE, NETWORK, FALLBACK) y sus propósitos. También profundiza en el flujo de eventos del Application Cache y ofrece consejos cruciales para la depuración, especialmente en relación con el almacenamiento en caché HTTP del manifest. Finaliza con un ejemplo práctico de cómo hacer que un juego de Halma funcione offline.

### Conceptos Clave y Código Relacionado:

- Aplicaciones Web Offline: Permiten que una aplicación web funcione sin conexión a Internet, almacenando recursos localmente.

- El Archivo Manifest (cache.manifest): Un archivo de texto que lista los recursos a almacenar en caché.

#### Código HTML (vinculación):

```HTML
<!DOCTYPE HTML>
<html manifest="/cache.manifest">
<body>
...
</body>
</html>
```
- Explicación: El atributo manifest en la etiqueta html apunta a la URL del archivo manifest.

#### Configuración del Servidor: El archivo manifest debe servirse con el tipo MIME text/cache-manifest.

- Código (ejemplo Apache .htaccess):
```
AddType text/cache-manifest .manifest
```
- Explicación: Esta directiva le dice al servidor Apache que cualquier archivo con la extensión .manifest debe servirse con el tipo MIME text/cache-manifest.

### Estructura del Archivo Manifest:

- CACHE MANIFEST: La primera línea obligatoria.
Secciones:

- CACHE: (Explícita): Lista los recursos que deben ser descargados y almacenados en caché para uso offline.

- Código:
```
CACHE MANIFEST
CACHE:
/clock.css
/clock.js
/clock-face.jpg
```
- Explicación: Estos archivos se descargarán y estarán disponibles incluso sin conexión. Si no se especifica ninguna sección, los recursos listados se consideran implícitamente en CACHE:.


### NETWORK: (Lista Blanca Online):
Lista los recursos que nunca deben ser almacenados en caché y siempre deben intentar cargarse desde la red.

- codigo 
```
NETWORK:
/tracking.cgi
```
- Explicación: tracking.cgi siempre intentará cargarse desde el servidor, incluso si la aplicación está offline (lo que resultaría en un error si no hay conexión).

#### (Comodín): Si se usa NETWORK: *, cualquier recurso no listado explícitamente en CACHE: o FALLBACK: intentará cargarse desde la red si hay conexión. Esto es crucial para aplicaciones "abiertas" que pueden cargar contenido dinámico o de terceros.

- Código:
```
NETWORK:
*
```

####  FALLBACK: (Sustituciones): Define recursos de respaldo para URLs específicas o patrones de URL cuando la aplicación está offline y el recurso original no está en caché.

```
FALLBACK
/ /offline.html
```
**Explicación:** 
Si el navegador intenta acceder a cualquier URL que comience con / (es decir, cualquier página del sitio) mientras está offline y esa página no está en caché, en su lugar cargará /offline.html.


### Flujo de Eventos del Application Cache (window.applicationCache):

- checking: Se dispara cuando el navegador busca una actualización del manifest.

- downloading: Se dispara cuando el navegador comienza a descargar recursos.

- progress: Se dispara periódicamente durante la descarga.

- cached: Se dispara cuando todos los recursos se han descargado y almacenado en caché por primera vez.

- noupdate: Se dispara si el manifest no ha cambiado desde la última vez.

- updateready: Se dispara cuando una nueva versión de la aplicación se ha descargado y almacenado en caché (pero aún no está activa).

- Codigo 
```JS
window.applicationCache.addEventListener('updateready', function() {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
        window.applicationCache.swapCache(); // Activa la nueva caché
        window.location.reload(); // para usar la nueva version recarga la pagina
    }
}, false);
```
   - Explicación: Permite cambiar a la nueva versión de la caché sin que el usuario tenga que recargar manualmente. swapCache() activa la nueva caché, y reload() recarga la página para usarla.

- error: Se dispara si algo sale mal durante el proceso de actualización o descarga.


### Depuración (¡El arte de la tortura!):

- Un solo fallo, todo falla: Si un solo recurso listado en CACHE: no se descarga, toda la actualización de la caché falla.

- Caché HTTP del Manifest: El navegador puede almacenar en caché el propio archivo manifest según los encabezados HTTP. Si cambias el manifest pero el navegador sigue usando una versión en caché, no detectará los cambios.

   - Solución: Deshabilitar el almacenamiento en caché HTTP para el archivo manifest en el servidor (ej. ExpiresDefault "access" en Apache).

- Cambiar el Manifest para Forzar         Actualización: Cada vez que cambies cualquier recurso de tu aplicación, debes cambiar también el archivo manifest (ej. actualizando un número de revisión en un comentario) para que el navegador detecte que el manifest ha cambiado y descargue los nuevos recursos.

- Codigo
```
CACHE MANIFEST
# rev 43
clock.js
clock.css
```
- Explicación: Cambiar # rev 42 a # rev 43 es suficiente para que el navegador detecte un cambio en el manifest.


- Ejemplo de Halma Offline:

- Código Manifest:
```
CACHE MANIFEST
halma.html
../halma-localstorage.js
```

- Explicación: Lista la página HTML offline y el archivo JavaScript del juego. La ruta ../ indica que el JS está en el directorio padre.