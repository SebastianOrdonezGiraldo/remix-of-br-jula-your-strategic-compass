## Alcance

Transformar el cierre de la conversación en una devolución consultiva de alta jerarquía, con transición previa, documento "Tu Ruta Inicial" con identidad propia, y captura de datos de contacto.

## Fase 1 — Frontend completo (ahora, sin backend)

1. **Estado adicional en `BrujulaApp`**
   - Guardar `userAnswers: string[]` para poder citar textualmente al usuario en la lectura inicial.
   - Añadir estados: `showTransition` y `showRuta` (reemplaza `showRoute`).
   - Al responder la última pregunta → mostrar transición ~3s → mostrar `RutaInicial` (oculta el chat).

2. **`TransitionScreen`**
   - Pantalla limpia con logo Brújula pulsando, título "🧭 Brújula está construyendo tu Ruta Inicial…" y subtítulo. Sin barra de progreso; solo un shimmer sutil y puntos animados.

3. **`RutaInicial` (documento consultivo, layout distinto al chat)**
   - Fondo blanco, ancho estilo documento (`max-w-4xl`), tipografía generosa, mucho espacio.
   - **Encabezado**: "Tu Ruta Inicial está lista" + párrafo introductorio.
   - **Nombre de ruta** dominante (mayor jerarquía visual), asignado por `challenge.key`:
     - ventas → 📈 Ruta de Crecimiento Comercial
     - productividad / logistica / calidad / finanzas → ⚙️ Ruta de Excelencia Operacional
     - digital → 🤖 Ruta de Transformación Digital
     - talento / planeacion / indefinido → 👥 Ruta de Fortalecimiento Organizacional
     - sostenibilidad / innovacion / internacionalizacion → 🌱 Ruta de Sostenibilidad e Innovación
   - **Nuestra lectura inicial**: hasta 4 ideas construidas con los `userAnswers` (citas literales entre comillas) + interpretación del reto.
   - **Capacidades que podrían acelerar esta ruta**: 4–5 tarjetas modernas con ícono, elegidas por tipo de ruta (subtítulo pequeño con la facultad de respaldo).
   - **¿Qué podríamos construir juntos?**: 5 tarjetas (Consultoría, Formación a la medida, Retos de innovación, Prácticas empresariales, Proyectos aplicados). Tono no comercial.
   - **Reflexión final** distinta por ruta (los textos exactos del brief).
   - **Próximo paso**: título "¿Hacia dónde podría avanzar esta ruta?" + botón principal "Agendar una conversación".
   - **Acciones secundarias**: 📄 Descargar Ruta Inicial (usa `window.print()` con estilos `@media print` que ocultan el resto del sitio), 📧 Enviarme esta Ruta por correo (abre modal de contacto), 🔄 Volver a revisar mi Ruta (colapsa a la conversación).

4. **Modal / bloque de contacto**
   - Campos: Empresa, Nombre del contacto, Correo, con el copy explicativo del brief.
   - Al confirmar: guarda en `localStorage` temporalmente y muestra el mensaje de confirmación "¡Listo! Tu Ruta Inicial ya fue enviada a tu correo…". En esta fase el envío real está pendiente (ver Fase 2).

5. **Print styles** en `src/styles.css`: ocultar TopBar, chat, secciones fijas; solo imprimir `#ruta-inicial-print`.

## Fase 2 — Envío real de correos (siguiente turno, requiere confirmación)

Para enviar realmente:
- **Correo al usuario** con su Ruta Inicial.
- **Notificación al correo institucional** (empresa, contacto, correo, ruta, desafío, fecha).
- **Persistencia** de contactos y conversaciones.

Esto requiere:
- Habilitar **Lovable Cloud** (para guardar leads y disparar server functions).
- Configurar un **dominio de email** (necesario para poder enviar correos con tu marca; sin dominio no se pueden enviar emails de la app).
- Definir el correo institucional destino.

Lo hago en el siguiente turno una vez confirmes que quieres activar Cloud y me digas: (a) el dominio que usarás para enviar, y (b) el correo institucional que recibirá las notificaciones.

## Notas de diseño

- La Ruta Inicial no comparte layout con el chat: sale del `<section>` conversacional y se monta como vista independiente por encima (chat oculto, TopBar mantenida para navegación).
- Tipografía y espaciado más grandes, líneas divisorias sutiles, tarjetas con radio 24px, sin gradientes ni acentos comerciales.
- Responsive: en móvil las tarjetas pasan a una columna, acciones secundarias apiladas.

¿Procedo con la Fase 1 tal cual?