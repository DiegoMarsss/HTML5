# "Distribuido", "Extensibilidad" y otras palabras elegantes (Microdata)
Este capítulo introduce Microdata, una forma de añadir semántica adicional a las páginas web utilizando atributos HTML simples. Explica que Microdata permite anotar el DOM con pares nombre/valor de vocabularios personalizados, lo que facilita a los motores de búsqueda y otras herramientas extraer información estructurada. Se detalla el modelo de datos de Microdata, incluyendo itemscope (para definir el alcance de un elemento), itemtype (para especificar el vocabulario) e itemprop (para definir propiedades). El capítulo muestra cómo los valores de las propiedades se extraen del contenido de los elementos o de atributos específicos (como src para img o href para a). Se ilustra con ejemplos de marcado de personas, organizaciones y eventos, y se discute cómo Microdata se integra con el HTML existente, incluso con marcado "desordenado".

### Conceptos Clave y Código Relacionado:

- Microdata: Anota el DOM con pares nombre/valor de vocabularios personalizados.

  - Propósito: Añadir semántica a datos ya visibles en la página, facilitando que las máquinas (buscadores, extensiones) entiendan el contenido.

- Modelo de Datos de Microdata:

  - Vocabularios: Conjuntos de propiedades predefinidas (ej. http://data-vocabulary.org/Person).

  - Pares Nombre/Valor: Cada propiedad tiene un nombre y un valor.

  - Alcance (Scoping): La estructura jerárquica del DOM se usa para definir el alcance de los elementos Microdata.

- Atributos Clave de Microdata:

  - itemscope: Indica que el elemento y sus hijos forman un "elemento" Microdata. Define el alcance.

  - itemtype: Especifica el vocabulario que se está utilizando para el elemento (una URL).

  - itemprop: Define una propiedad dentro del itemscope actual.

```
- Origen de los Valores de las Propiedades (itemprop):

  - content atributo: Para <meta>.

  - src atributo: Para <audio>, <embed>, <iframe>, <img>, <source>, <video>.

  - href atributo: Para <a>, <area>, <link>.

  - data atributo: Para <object>.

  - datetime atributo: Para <time>.

  - Contenido de texto: Para todos los demás elementos.
```

### Ejemplo: Marcado de una Persona:

 - Código HTML (original):
```HTML
<section>
    <h1>Mark Pilgrim</h1>
    <p><img src="http://www.example.com/photo.jpg" alt="[me smiling]"></p>
    <p><a href="http://diveintomark.org/">weblog</a></p>
</section>
```
- Código HTML (con Microdata):
```HTML
<section itemscope itemtype="http://data-vocabulary.org/Person">
    <h1 itemprop="name">Mark Pilgrim</h1>
    <p><img itemprop="photo" src="http://www.example.com/photo.jpg" alt="[me smiling]"></p>
    <p><a itemprop="url" href="http://diveintomark.org/">weblog</a></p>
</section>
```
Explicación:
```HTML
<section itemscope itemtype="http://data-vocabulary.org/Person">: Declara que esta sección es un "elemento" de tipo "Persona" del vocabulario data-vocabulary.org.
    
<h1 itemprop="name">Mark Pilgrim</h1>: <h1> es el elemento que contiene el nombre. itemprop="name" lo marca como la propiedad "name". El valor se toma del contenido de texto del <h1>.

<img itemprop="photo" src="...">: <img> es el elemento que contiene la foto. itemprop="photo" lo marca como la propiedad "photo". El valor se toma del atributo src del <img>.

<a itemprop="url" href="...">: <a> es el elemento que contiene la URL. itemprop="url" lo marca como la propiedad "url". El valor se toma del atributo href del <a>.
```

### Microdata con marcado "desordenado" (ej. tablas):

- Código HTML (ejemplo de tabla con Microdata):
```HTML
<TABLE itemscope itemtype="http://data-vocabulary.org/Person">
    <TR><TD>Name<TD itemprop="name">Mark Pilgrim</TR>
    <TR><TD>Link<TD>
        <span itemprop="url">
            <A href=# onclick=goExternalLink()>http://diveintomark.org/</A>
        </span>
    </TR>
</TABLE>
```
- Explicación:
```
 Incluso con marcado no ideal (como el uso de onclick en lugar de href para la URL), Microdata puede aplicarse. En este caso, se usa un <span> como contenedor para itemprop="url", y el valor se extrae del contenido de texto del <span> (que incluye el texto del <a>).
```