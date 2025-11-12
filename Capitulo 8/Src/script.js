function guardar() {
  const n = document.getElementById('nombre').value.trim();
  if (n) localStorage.n = n;
  document.getElementById('saludo').textContent = `¡Hola, ${n || 'desconocido'}!`;
}


window.onload = () => {
  if (localStorage.n) document.getElementById('saludo').textContent = `¡Hola, ${localStorage.n}!`;
};