# Capítulo 1: Una historia bastante sesgada de HTML5
**RESUMEN DEL CAPITULO:** Este capítulo ofrece una perspectiva histórica sobre la evolución de HTML, destacando la tensión entre implementaciones y especificaciones. Explora la importancia de los tipos MIME en la interpretación de documentos web y narra la historia de la creación del elemento ´img´, mostrando cómo las decisiones de implementación temprana influyeron en los estándares. También detalla el camino desde HTML4, el intento fallido de XHTML con su manejo draconiano de errores, y el surgimiento del WHATWG como una fuerza impulsora para un HTML más práctico y compatible con versiones anteriores, que finalmente llevó a HTML5.
## Conceptos clave y codigos relacionados
### Tipos de MIME
 Son cruciales para que el navegador sepa cómo interpretar el contenido.

 **Código (ejemplo de encabezado HTTP):**

>Content-Type: text/html

**¿Para que sirve?**

 Este es un encabezado HTTP que el servidor web envía al navegador. Content-Type especifica el tipo de medio del recurso. text/html indica que el contenido es un documento HTML. El navegador usa esta información para saber cómo procesar y mostrar el archivo.

 **Codigo inicial de el ´img´**

 >IMG SRC="file://foobar.com/foo/bar/blargh.xbm">

Esta es la sintaxis propuesta por Marc Andreessen para incrustar imágenes. IMG es la etiqueta y SRC (source) es el atributo requerido que apunta a la URL de la imagen. Lo facil quer fue y tuvo una implementacion eapida y eso fue que tuviera muy buena aceptacion.

**Código (ejemplo de doctype XHTML 1.0 Strict):**

>!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

**¿Que es?**
Este doctype es mucho más omplejo o dificil que el de HTML5. Indica que el documento debe seguir las reglas de XHTML 1.0 Strict. En un navegador que lo interprete como application/xhtml+xml (lo cual rara vez ocurría), cualquier error de sintaxis (como olvidar una etiqueta de cierre) detendría el renderizado de la página.
