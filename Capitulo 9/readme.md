# Una forma de locura (Formularios HTML5)
 Este capítulo explora las mejoras significativas en los formularios HTML5, que ofrecen una mejor experiencia de usuario y validación sin necesidad de JavaScript complejo. Introduce nuevos atributos como placeholder y autofocus, explicando cómo mejoran la usabilidad y cómo implementar fallbacks para navegadores antiguos. La mayor parte del capítulo se centra en los nuevos tipos de entrada (input type="...") como email, url, number, range, date, month, week, time, datetime, datetime-local, search y color. Destaca cómo estos tipos de entrada proporcionan interfaces de usuario especializadas (ej. teclados optimizados en móviles, spinboxes, sliders, selectores de fecha) y validación automática en navegadores compatibles, mientras que degradan elegantemente a campos de texto normales en navegadores antiguos. Finalmente, cubre la validación de formularios integrada en HTML5, incluyendo el atributo required y cómo deshabilitar la validación con novalidate.


### Conceptos Clave y Código Relacionado:

- Degradación Elegante: Las nuevas características de formularios HTML5 están diseñadas para funcionar en navegadores modernos y degradar a un comportamiento básico (como un campo de texto normal) en navegadores antiguos sin romper la funcionalidad.

- Texto de Marcador de Posición (placeholder):

- Código HTML:
```HTML
<input name="q" placeholder="Search Bookmarks and History">
```
   - Explicación: El atributo placeholder muestra un texto de sugerencia dentro del campo de entrada cuando está vacío y no tiene el foco. Desaparece cuando el usuario comienza a escribir o el campo obtiene el foco.


**Detección (con Modernizr): Modernizr.input.placeholder**

- Campos de Enfoque Automático (autofocus):

- Código HTML:
```HTML
<input name="q" autofocus>
```
- Explicación: El atributo autofocus hace que el campo de entrada obtenga el foco automáticamente cuando la página se carga. Es una solución declarativa que permite a los navegadores (o extensiones) ofrecer opciones para deshabilitarlo, a diferencia de los scripts JavaScript.


### Fallback para navegadores antiguos (sin Modernizr):

- codigo
```HTML
<input id="q" autofocus>
<script>
if (!("autofocus" in document.createElement("input"))) {
    document.getElementById("q").focus();
}
</script>
```
- Explicación: Se detecta si el navegador soporta autofocus creando un elemento input y comprobando la propiedad. Si no lo soporta, se usa JavaScript para enfocar el campo. Este script debe ir inmediatamente después del campo para enfocarlo lo antes posible.

- Detección (con Modernizr): Modernizr.input.autofocus


### Nuevos Tipos de Entrada (input type="..."):
```
- type="email": Para direcciones de correo electrónico.

  - Código HTML: <input type="email">

- Explicación: En navegadores compatibles (ej. iPhone), optimiza el teclado virtual (añade @, .). Proporciona validación automática de formato de correo electrónico. En navegadores no compatibles, se comporta como type="text".
```
```
- type="url": Para direcciones web (URLs).

  - Código HTML: <input type="url">

- Explicación: Similar a email, optimiza el teclado (añade ., /, .com) y proporciona validación de formato de URL.
```

```
type="number": Para números.

Código HTML: <input type="number" min="0" max="10" step="2" value="6">

Explicación:
min, max: Rango de valores aceptables.

step: Incremento/decremento permitido.

value: Valor por defecto.

En navegadores compatibles (ej. Opera), se renderiza como un "spinbox" con flechas para ajustar el valor y valida el rango/paso. En móviles, optimiza el teclado numérico.
Detección (con Modernizr): Modernizr.inputtypes.number
```
```
type="range": Para un rango numérico (slider).

Código HTML: <input type="range" min="0" max="10" step="2" value="6">

Explicación: Similar a number en atributos, pero se renderiza como un control deslizante (slider) en navegadores compatibles (ej. Safari, Chrome, Opera).
```
```
type="date", type="month", type="week", type="time", type="datetime", type="datetime-local": Para seleccionar fechas y horas.

Código HTML (ej. fecha): <input type="date">

Explicación: En navegadores compatibles (ej. Opera), muestra un selector de calendario o interfaz de entrada de fecha/hora. En otros, se comporta como type="text".

Detección (con Modernizr): Modernizr.inputtypes.date (y variantes para otros tipos).
```
```
type="search": Para campos de búsqueda.

Código HTML: <input type="search">

Explicación: En navegadores compatibles (ej. Safari), puede tener estilos visuales específicos (esquinas redondeadas) y funcionalidades (botón "x" para borrar).

CSS para Safari: input[type="search"] { -webkit-appearance: textfield; } para anular estilos por defecto de Safari.
```
```
type="color": Para seleccionar un color.
Código HTML: <input type="color">
Explicación: Propuesto para mostrar un selector de color. En el momento del libro, no tenía soporte generalizado.
```



### Validación de Formularios HTML5:

**Activación: La validación está activada por defecto para los nuevos tipos de entrada y atributos.**
```
novalidate atributo: Deshabilita la validación del formulario.

Código HTML: <form novalidate>

Explicación: Se coloca en la etiqueta <form> para indicar que el navegador no debe realizar la validación automática.
```
```
required atributo: Hace que un campo sea obligatorio.

Código HTML: <input id="q" required>

Explicación: Si un campo tiene este atributo, el formulario no se enviará a menos que el campo tenga un valor. Los navegadores compatibles (ej. Firefox, Opera) mostrarán un mensaje de error si el campo está vacío.
```
```
Comportamiento de la Validación:
Navegadores como Opera y Firefox 4+ muestran mensajes de error claros.

Safari y Chrome (en el momento del libro) validaban pero no mostraban feedback visual al usuario, solo impedían el envío del formulario.
```