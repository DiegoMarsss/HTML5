#  ¿Qué significa todo esto?
## Resumen del Capítulo: 
Este capítulo se sumerge en la semántica de HTML5, mostrando cómo mejorar el marcado existente y utilizar los nuevos elementos semánticos. Comienza explicando la simplicidad del nuevo doctype HTML5 y cómo eliminar atributos redundantes en el elemento raíz. Luego, se centra en la importancia de la codificación de caracteres y las relaciones de enlace (**link rel="..."**). La parte central del capítulo introduce y explica los nuevos elementos semánticos de HTML5 como **section**, **nav**, **article**, **aside**, **hgroup**, **header**, **footer** y **time**, detallando su propósito y cómo estructuran mejor el contenido. También aborda el desafío de la compatibilidad con navegadores antiguos (especialmente IE) para estos nuevos elementos y cómo Remy Sharp's HTML5 enabling script lo resuelve.

### Conceptos Clave y Código Relacionado:

- **El Doctype:** Simplificado a !DOCTYPE html.

 - **CODIGO**
```HTMl 
<!DOCTYPE html>
```
   - **Explicación:** Como se vio en el Capítulo 0, esta es la declaración de tipo de documento para HTML5. Es la forma más sencilla de indicar al navegador que la página es HTML5 y debe renderizarse en modo estándar.

- **El Elemento Raíz (html):** Eliminación de atributos redundantes de XHTML.
   - Codigo Antes 
 ```HTML
 <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
```
- Explicación:

    - **xmlns="http://www.w3.org/1999/xhtml":** Este atributo era necesario en XHTML para declarar el espacio de nombres. En HTML5, los elementos siempre están en el espacio de nombres HTML, por lo que es redundante.

   - **xml:lang="en":** Este atributo era para compatibilidad con XML. En HTML5, solo el atributo lang tiene efecto.

- **Codigo despues**

```HTML
<html lang="en">
```
  - Explicación: En HTML5, solo se necesita el atributo lang para especificar el idioma del documento.

### Codificación de Caracteres: Simplificación de la declaración.
- **Codigo Antes**
```HTML
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```
- **Explicación:** Esta era la forma común en HTML4 de declarar la codificación de caracteres. http-equiv simula un encabezado HTTP.

- **Codigo Despues**
```HTML
<meta charset="utf-8" />
```
- **Explicación:** HTML5 introduce una forma más corta y sencilla de declarar la codificación de caracteres, que es equivalente y funciona en todos los navegadores.

### Relaciones de Enlace (link rel="..."):
- **Código (stylesheet antes):**
```HTML
<link rel="stylesheet" type="text/css" href="style-original.css" />
```
- **Explicación:** rel="stylesheet" indica que el recurso es una hoja de estilos. type="text/css" especifica el tipo MIME.

- **Código (stylesheet después):**
```HTML
<link rel="stylesheet" href="style-original.css" />
```
- Explicación: En HTML5, type="text/css" es redundante para hojas de estilo CSS, ya que es el valor por defecto.

### Código (alternate para feeds):
```HTML
<link rel="alternate" type="application/atom+xml" title="My Weblog feed" href="/feed/" />
```
- **Explicación:** rel="alternate" combinado con type="application/atom+xml" permite la autodetección de feeds RSS/Atom. El atributo type es importante aquí.

### Nuevas relaciones de enlace:
- **rel="archives", rel="author", rel="external", rel="first", rel="prev", rel="next", rel="last", rel="up", rel="icon", rel="license", rel="nofollow", rel="noreferrer", rel="pingback", rel="prefetch", rel="search", rel="sidebar", rel="tag".**

### Nuevos Elementos Semánticos en HTML5:

- **section:** Representa una sección genérica de un documento o aplicación, típicamente con un encabezado.

- **nav:** Contiene enlaces de navegación principales.

- **Código (antes):**
```HTML
<div id="nav">
    <ul>
        <li><a href="#">home</a></li>
        <!-- ... -->
    </ul>
</div>
```
- **Codigo despues**
```HTML
<nav>
    <ul>
        <li><a href="#">home</a></li>
        <!-- ... -->
    </ul>
</nav>
```
- **Explicación:** Reemplaza un div genérico con un elemento semántico que indica claramente que el contenido es navegación.

#### article: Representa una composición autocontenida, como una entrada de blog, un artículo de noticias o un comentario.
- Código (antes):
```HTML
<div class="entry">
    <p class="post-date">October 22, 2009</p>
    <h2>Travel day</h2>
    <!-- ... -->
</div>
```
- **Código (después, con header y h1):**
```HTML
<article>
    <header>
        <time datetime="2009-10-22" pubdate>October 22, 2009</time>
        <h1>
            <a href="#" rel="bookmark" title="link to this post">Travel day</a>
        </h1>
    </header>
    <p>Lorem ipsum dolor sit amet…</p>
</article>
```
- **Explicación:** El div genérico se reemplaza por article. Dentro del artículo, se usa header para agrupar la fecha y el título. El h2 se convierte en h1 porque en HTML5, cada sección (incluyendo article) puede tener su propio h1 sin afectar el esquema general del documento de forma negativa, ya que el algoritmo de esquema de HTML5 lo maneja correctamente.

- **aside:** Contenido tangencialmente relacionado con el contenido principal, a menudo presentado como una barra lateral.
- **hgroup:** Agrupa un conjunto de elementos h1 a h6 cuando un encabezado tiene múltiples niveles (subtítulos, lemas).

- Codigo 
```HTML
<header>
    <hgroup>
        <h1>My Weblog</h1>
        <h2>A lot of effort went into making this effortless.</h2>
    </hgroup>
    <!-- ... -->
</header>
```
 - **Explicación:**  hgroup indica que h1 y h2 juntos forman un único encabezado lógico para la sección, evitando que el h2 cree un nodo separado en el esquema del documento.

 ### **header:** Representa un grupo de ayudas introductorias o de navegación para su sección más cercana.
- Codigo Antes 
```HTML
<div id="header">
    <h1>My Weblog</h1>
    <p class="tagline">A lot of effort went into making this effortless.</p>
</div>
```
- Codigo Despues 
```HTML
<header>
    <h1>My Weblog</h1>
    <p class="tagline">A lot of effort went into making this effortless.</p>
</header>
```
- **Explicación:** Reemplaza un div genérico con un elemento semántico que indica que es el encabezado de la página o sección.

 ### **footer:** Representa un pie de página para su contenido de sección o elemento raíz de sección más cercano.
 - Codigo Antes 
 ```HTML
 <div id="footer">
    <p>&#167;</p>
    <p>&copy; 2001&ndash;9 <a href="#">Mark Pilgrim</a></p>
</div>
```
- Codigo Despues 
```HTML
<footer>
    <p>&#167;</p>
    <p>&copy; 2001&ndash;9 <a href="#">Mark Pilgrim</a></p>
</footer>
```
- **Explicación:** Reemplaza un div genérico con un elemento semántico que indica que es el pie de página.

### **time:** Representa una fecha y/o hora.
- Codigo 
```HTML
<time datetime="2009-10-22" pubdate>October 22, 2009</time>
```
- **Explicación:**
datetime="2009-10-22": Proporciona una representación de la fecha legible por máquina en un formato estándar (ISO 8601).

- pubdate: Un atributo booleano que indica que esta es la fecha de publicación del artículo o del documento.

- October 22, 2009: El contenido legible por humanos.

## Manejo de Elementos Desconocidos en Navegadores Antiguos (especialmente IE < 9):

- Los navegadores antiguos renderizan los elementos desconocidos como display: inline y IE < 9 no aplica estilos CSS a ellos y los inserta en el DOM como nodos vacíos.

- **Solución (HTML5 Shiv / Remy Sharp's script):**

  - Código:
  
```HTML 
<!--[if lt IE 9]>
<script>
var e = ("abbr,article,aside,audio,canvas,datalist,details," +
         "figure,footer,header,hgroup,mark,menu,meter,nav,output," +
         "progress,section,time,video").split(',');
for (var i = 0; i < e.length; i++) {
    document.createElement(e[i]);
}
</script>
<![endif]-->
```
- **Explicación:**
!--[if lt IE 9] ... ![endif]--: Son comentarios condicionales de Internet Explorer. Solo IE 8 y versiones anteriores ejecutarán el código dentro de ellos. Otros navegadores los ignorarán como comentarios HTML normales.
- **var e = (...) .split(',')**: Crea un array de cadenas con los nombres de los nuevos elementos HTML5.

- **for (var i = 0; i < e.length; i++) { document.createElement(e[i]); }:** Itera sobre el array y crea un elemento DOM para cada nombre. Simplemente crear el elemento (sin insertarlo en el DOM) "enseña" a IE a reconocerlo y aplicar estilos CSS correctamente, y a construir el DOM de forma adecuada. Este script debe colocarse en el head para que se ejecute antes de que IE intente parsear el resto de la página.

### Estilos CSS para elementos desconocidos:
- Código:
```CSS
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
    display: block;
}
```
**Explicación:** Dado que los navegadores antiguos renderizan los elementos desconocidos como inline por defecto, este CSS los fuerza a comportarse como elementos de bloque, que es su comportamiento esperado en HTML5.