# Llamémoslo una superficie de dibujo (Canvas)
Este capítulo introduce el elemento **canvas** de HTML5, una superficie de dibujo basada en píxeles que permite renderizar gráficos, animaciones y otros elementos visuales usando JavaScript. Explica cómo obtener el contexto de dibujo 2D, dibujar formas básicas como rectángulos, entender el sistema de coordenadas del canvas, trazar rutas (líneas y curvas), dibujar texto con control de fuentes y alineación, y aplicar gradientes (lineales y radiales). También cubre cómo dibujar imágenes existentes en el canvas y la solución excanvas.js para la compatibilidad con Internet Explorer. Finaliza con un ejemplo completo de un juego de Halma implementado con Canvas.

### Conceptos Clave y Código Relacionado:
- **El elemento canvas:** Una superficie de dibujo bitmap.

**Codigo**

```html
<canvas width="300" height="225"></canvas>
<canvas id="a" width="300" height="225"></canvas>
```
- **Explicación:** Define un área rectangular en la página. Los atributos width y height establecen sus dimensiones en píxeles. El id permite acceder a él desde JavaScript.

### Obtener el Contexto de Dibujo:
- **Codigo**

```JavaScript
var a_canvas = document.getElementById("a");
var b_context = a_canvas.getContext("2d");
```

- Explicación:

  - document.getElementById("a"): Obtiene una referencia al elemento canvas por su ID.

  - a_canvas.getContext("2d"): Obtiene el objeto de contexto de dibujo 2D. Este objeto contiene todos los métodos y propiedades para dibujar en el canvas.

### Dibujar Formas Simples (Rectángulos):
- CODIGO

```JavaScript
b_context.fillStyle = "black"; // Establece el color de relleno
b_context.fillRect(50, 25, 150, 100); // Dibuja un rectángulo relleno
b_context.strokeStyle = "red"; // Establece el color del trazo
b_context.strokeRect(10, 10, 50, 50); // Dibuja el contorno de un rectángulo
b_context.clearRect(60, 30, 20, 20); // Borra un área rectangular
```

- Explicación:

   - fillStyle: Propiedad que define el color o estilo a usar para rellenar formas.

   - fillRect(x, y, width, height): Rellena un rectángulo. (x, y) es la esquina superior izquierda.

   - strokeStyle: Propiedad que define el color o estilo a usar para trazar contornos.

   - strokeRect(x, y, width, height): Dibuja el contorno de un rectángulo.

   - clearRect(x, y, width, height): Borra los píxeles en el área especificada, haciéndolos transparentes.

#### Coordenadas del Canvas:

- El origen (0,0) está en la esquina superior izquierda. El eje X aumenta hacia la derecha, el eje Y aumenta hacia abajo.

- Consejo para líneas de 1px: Dibujar en coordenadas .5 (ej. 0.5, 1.5) para evitar el antialiasing y obtener líneas nítidas de 1 píxel.

#### Rutas (Paths): Dibujar con "lápiz" antes de "entintar".

- CODIGO

```JavaScript
context.beginPath(); // Inicia una nueva ruta
context.moveTo(0.5, 0); // Mueve el "lápiz" a un punto
context.lineTo(0.5, 375); // Dibuja una línea hasta un punto
context.strokeStyle = "#eee"; // Establece el color del trazo
context.stroke(); // "Entinta" la ruta actual
context.closePath(); // Cierra la ruta (opcional para líneas)
```

- Explicación:

   - beginPath(): Reinicia la ruta actual. Todo lo que se dibuje después formará parte de una nueva ruta.

   - moveTo(x, y): Mueve el punto de inicio de una nueva subruta a las coordenadas especificadas.

   - lineTo(x, y): Añade una línea recta desde el punto actual hasta el punto especificado.

   - strokeStyle: Define el color del trazo.

   - stroke(): Dibuja la ruta actual (el "entintado").

   - closePath(): Cierra la ruta actual, dibujando una línea recta desde el punto actual hasta el punto de inicio de la subruta.

 ## Texto:

- CODIGO

```JavaScript
context.font = "bold 12px sans-serif"; // Establece la fuente
context.textAlign = "right"; // Alineación del texto
context.textBaseline = "bottom"; // Línea base del texto
context.fillText("( 500 , 375 )", 492, 370); // Dibuja texto relleno
// context.strokeText("Hello", 10, 10); // Dibuja el contorno del texto
```

- **Explicación:**

- font: Propiedad que define la fuente, similar a la propiedad font de CSS.

- textAlign: Alinea el texto (start, end, left, right, center).
- textBaseline: Controla la posición vertical del texto con respecto al punto y (top, middle, alphabetic, bottom, etc.).
- fillText(text, x, y): Dibuja texto relleno en las coordenadas especificadas.
- strokeText(text, x, y): Dibuja el contorno del texto.

### Gradientes:
-CODIGO

```JavaScript
var my_gradient = context.createLinearGradient(0, 0, 300, 0); // Crea un gradiente lineal
my_gradient.addColorStop(0, "black"); // Añade un color en la posición 0 (inicio)
my_gradient.addColorStop(1, "white"); // Añade un color en la posición 1 (fin)
context.fillStyle = my_gradient; // Usa el gradiente como estilo de relleno
context.fillRect(0, 0, 300, 225); // Rellena un rectángulo con el gradiente
```

- **Explicación:**

  - createLinearGradient(x0, y0, x1, y1): Crea un objeto CanvasGradient que define un gradiente lineal entre dos puntos.

   - addColorStop(offset, color): Añade un punto de color al gradiente. offset es un valor entre 0 y 1.

### Código JavaScript (Radial - no mostrado en el extracto, pero mencionado):

```JavaScript
// var my_radial_gradient = context.createRadialGradient(x0, y0, r0, x1, y1, r1);
// my_radial_gradient.addColorStop(0, "red");
// my_radial_gradient.addColorStop(1, "blue");
// context.fillStyle = my_radial_gradient;
// context.arc(centerX, centerY, radius, 0, Math.PI * 2);
// context.fill();
```
- Explicación: 

  - createRadialGradient(x0, y0, r0, x1, y1, r1) crea un gradiente radial entre dos círculos.


### Imágenes:
- Código JavaScript (dibujar img existente):

```JavaScript
<img id="cat" src="images/cat.png" alt="sleeping cat" width="177" height="113">
<canvas id="e" width="177" height="113"></canvas>
<script>
window.onload = function() {
    var canvas = document.getElementById("e");
    var context = canvas.getContext("2d");
    var cat = document.getElementById("cat");
    context.drawImage(cat, 0, 0); // Dibuja la imagen en el canvas
};
</script>
```


- **Explicación:**
context.drawImage(image, dx, dy): Dibuja un elemento img (o Image() objeto) en el canvas en las coordenadas (dx, dy).

  - **context.drawImage(image, dx, dy, dw, dh):** Dibuja y escala la imagen a las dimensiones (dw, dh).

  - **context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh):** Recorta una parte de la imagen original (sx, sy, sw, sh), la escala y la dibuja en el canvas.

  - **window.onload:** Es importante esperar a que la imagen se cargue completamente antes de intentar dibujarla en el canvas.

### Código JavaScript (dibujar Image() objeto):

```JavaScript
- var cat = new Image(); // Crea un nuevo objeto Image
cat.src = "images/cat.png"; // Establece la fuente de la imagen
cat.onload = function() { // Espera a que la imagen se cargue
    context.drawImage(cat, 0, 0);
};
```
- **Explicación:** Permite cargar y dibujar imágenes dinámicamente.

### Compatibilidad con IE (excanvas.js):
- CODIGO

```js
<!--[if IE]>
<script src="excanvas.js"></script>
<![endif]-->
```
- **Explicación:** excanvas.js es una librería que emula la API de Canvas en Internet Explorer (versiones 6, 7 y 8) utilizando VML (Vector Markup Language) de Microsoft. Los comentarios condicionales aseguran que solo IE cargue este script.