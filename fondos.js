// Filtro por nombre y clasificación
document.getElementById('formFiltro').addEventListener('submit', function() {
  filtrarTabla();
});

function filtrarTabla() {
  const categoria = document.getElementById('categoria').value.toLowerCase();
  const busqueda = document.getElementById('busquedaFondo').value.toLowerCase();
  const filas = document.querySelectorAll('#fondosTable tbody tr');
  filas.forEach(fila => {
    const nombre = fila.children[1].textContent.toLowerCase();
    const clasificacion = fila.children[3].textContent.toLowerCase();
    const coincideNombre = nombre.includes(busqueda);
    const coincideCategoria = (categoria === 'todos') || (clasificacion.includes(categoria));
    if (coincideNombre && coincideCategoria) {
      fila.style.display = '';
    } else {
      fila.style.display = 'none';
    }
  });
}

// Comparar seleccionados
document.getElementById('btnComparar').addEventListener('click', function() {
  const checks = document.querySelectorAll('input[name="comparar[]"]:checked');
  if (checks.length === 0) {
    document.getElementById('tablaComparar').innerHTML = '<div class="alert alert-warning">Selecciona al menos un fondo para comparar.</div>';
  } else {
    let tabla = `<div class="table-responsive"><table class="table table-bordered align-middle">
      <thead style="background:#e6f0ff; color:#0a2540;">
        <tr>
          <th>Nombre</th>
          <th>Empresa</th>
          <th>Tipo</th>
          <th>Clasificación</th>
          <th>Rent. 30 días</th>
          <th>Rent. 12 meses</th>
          <th>Liquidez</th>
          <th>Riesgo</th>
        </tr>
      </thead>
      <tbody>`;
    checks.forEach(chk => {
      const [nombre, empresa, tipo, clasificacion, rent30, rent12, liquidez, riesgo] = chk.value.split('|');
      tabla += `<tr>
        <td>${nombre}</td>
        <td>${empresa}</td>
        <td>${tipo}</td>
        <td>${clasificacion}</td>
        <td>${rent30}</td>
        <td>${rent12}</td>
        <td>${liquidez}</td>
        <td>${riesgo}</td>
      </tr>`;
    });
    tabla += '</tbody></table></div>';
    document.getElementById('tablaComparar').innerHTML = tabla;
  }
  const modal = new bootstrap.Modal(document.getElementById('modalComparar'));
  modal.show();
});