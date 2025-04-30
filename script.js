document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioAccidente");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const datos = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/guardarReporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
      });

      const resultado = await response.json();
      mostrarNotificacion(resultado.message || "Reporte enviado", "exito");
      this.reset();
      cargarReportes();
    } catch (error) {
      mostrarNotificacion("Error al enviar el formulario", "error");
    }
  });

  cargarReportes();
});

function mostrarNotificacion(mensaje, tipo) {
  const noti = document.getElementById("notificaciones");
  noti.textContent = mensaje;
  noti.className = tipo;
  setTimeout(() => (noti.textContent = ""), 4000);
}

async function cargarReportes() {
  try {
    const res = await fetch("/api/obtenerReportes");
    const reportes = await res.json();

    if (!Array.isArray(reportes) || reportes.length === 0) {
      document.getElementById("tabla-container").innerText = "No hay reportes aún.";
      return;
    }

    let tabla = `<table><thead><tr>
      <th>Nombre</th><th>Documento</th><th>Fecha</th><th>Tipo</th><th>Lugar</th>
    </tr></thead><tbody>`;

    reportes.forEach(r => {
      tabla += `<tr>
        <td>${r.nombre || ""}</td>
        <td>${r.tipoDocumento || ""} ${r.numeroDocumento || ""}</td>
        <td>${r.fecha || ""}</td>
        <td>${r.tipoAccidente || ""}</td>
        <td>${r.lugar || ""}</td>
      </tr>`;
    });

    tabla += "</tbody></table>";
    document.getElementById("tabla-container").innerHTML = tabla;

  } catch (err) {
    document.getElementById("tabla-container").innerText = "Error al cargar reportes.";
    console.error(err);
  }
}
