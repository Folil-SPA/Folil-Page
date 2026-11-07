# Folil Labs

Landing bilingüe en Next.js, React y Three.js.

## Desarrollo local

Requiere Node.js 20.9 o superior.

    npm ci
    npm run dev -- --hostname 127.0.0.1 --port 3000

Abrir http://localhost:3000/.

## Verificación

    npm run typecheck
    npm run test:chile
    npm run build

La prueba de Chile valida la geometría detallada y la alternativa sin conexión,
la conectividad de las rutas hacia Santiago, la terminación de las señales y
el límite de partículas viajeras. Santiago es el único punto marcado,
identificado e interactivo; el resto de las conexiones son flujos ambientales.

## Escena y diseño

La composición y el comportamiento visual toman como referencia https://achiag.cl/,
con la marca y los colores de Folil Labs. La escena tiene partículas geográficas,
relieve aproximado, arcos punteados, señales, desenfoque de fondo, respuesta al cursor
y una transición hacia una disposición horizontal al desplazarse.

- components/ChileNetwork.tsx: carga diferida, alternativa SVG y accesibilidad.
- lib/chile-scene.ts: render, interacción, adaptación al tamaño y limpieza de recursos.
- lib/chile-geography.ts: proyección y muestreo determinista del territorio.
- lib/chile-routes.ts: rutas ambientales y propagación hacia Santiago.
- app/globals.css: composición, tipografía, color y transiciones.

La animación respeta prefers-reduced-motion, se pausa al ocultar la pestaña y ajusta
la densidad y la resolución. Si WebGL o el archivo geográfico fallan, se conserva
una representación geográfica local.

La geografía procede de [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/),
de dominio público, a escala 1:10m. public/data/chile-natural-earth.json registra
la fuente y el procesamiento. El relieve es una aproximación visual de los Andes.
Las conexiones ilustran actividad y no representan infraestructura ni clientes.

## Formulario

/api/contact conserva la integración SMTP existente. Configurar las variables de
.env.example para habilitar envíos. GET /api/contact permite verificar si están
configuradas. Sin credenciales, el formulario muestra un error y el correo de
contacto; nunca confirma un envío que no ocurrió.

La compilación produce una salida standalone. Para ejecutarla directamente,
copiar public y .next/static dentro de .next/standalone (conservando las rutas
public y .next/static) y ejecutar node .next/standalone/server.js.

