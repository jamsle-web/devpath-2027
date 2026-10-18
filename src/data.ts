// src/data.ts

export const CERTIFICATIONS_DATA = [
  { id: "c1", title: "freeCodeCamp — Responsive Web Design", platform: "freeCodeCamp", type: "Gratis + Certificado", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design", color: "#4ade80" },
  { id: "c2", title: "freeCodeCamp — JavaScript Algorithms", platform: "freeCodeCamp", type: "Gratis + Certificado", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", color: "#facc15" },
  { id: "c3", title: "Simplilearn — Front End Development", platform: "Simplilearn", type: "Gratis + Certificado", url: "https://www.simplilearn.com/front-end-developer-free-course-skillup", color: "#60a5fa" },
  { id: "c4", title: "Simplilearn — Web Development for Beginners", platform: "Simplilearn", type: "Gratis + Certificado", url: "https://www.simplilearn.com/skillup-free-online-courses/web-development", color: "#60a5fa" },
  { id: "c5", title: "The Odin Project — Full Stack JS", platform: "The Odin Project", type: "Gratis (Sin Certificado)", url: "https://www.theodinproject.com/paths/full-stack-javascript", color: "#c084fc" },
  { id: "c6", title: "Coursera — Introduction to Web Development", platform: "Coursera", type: "Ayuda Financiera", url: "https://www.coursera.org/learn/web-development", color: "#38bdf8" },
  { id: "c7", title: "Google — UX Design Professional Certificate", platform: "Coursera", type: "Certificado de Pago", url: "https://www.coursera.org/professional-certificates/google-ux-design", color: "#f87171" },
  { id: "c8", title: "Figma — Recursos Oficiales", platform: "Figma", type: "Gratis (Sin Certificado)", url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design", color: "#a78bfa" }
];

export const CATALOG_DATA = {
  phases: [
    {
      id: "phase-01", title: "Fundamentos web y entorno de trabajo", period: "Octubre–noviembre 2026", goal: "Comprender cómo funciona la web, preparar las herramientas y publicar una primera página accesible.",
      modules: [
        { title: "Primeros pasos con la web", lessons: [
          { id: "L001", title: "Preparar el entorno: navegador, editor y archivos", minutes: 45, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup", type: "lesson" },
          { id: "L002", title: "Cómo funciona la web y qué es una URL", minutes: 45, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards", type: "lesson" },
          { id: "L003", title: "Crear y publicar tu primera página", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website", type: "project" },
          { id: "L004", title: "HTML: elementos, etiquetas y estructura semántica", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content", type: "lesson" }
        ]},
        { title: "Git y GitHub para proyectos personales", lessons: [
          { id: "L005", title: "Crear un repositorio y entender commits", minutes: 45, url: "https://skills.github.com/", type: "practice" },
          { id: "L006", title: "Escribir un README útil con Markdown", minutes: 45, url: "https://skills.github.com/", type: "practice" },
          { id: "L007", title: "Publicar una página con GitHub Pages", minutes: 60, url: "https://skills.github.com/", type: "project" }
        ]}
      ]
    },
    {
      id: "phase-02", title: "HTML, CSS, responsive design y accesibilidad", period: "Noviembre–diciembre 2026", goal: "Construir interfaces semánticas, adaptables y utilizables en móvil y escritorio.",
      modules: [
        { title: "Estructura, estilos y diseño responsive", lessons: [
          { id: "L008", title: "Estructurar contenido con HTML semántico", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content", type: "lesson" },
          { id: "L009", title: "Enlaces, imágenes y contenido multimedia", minutes: 45, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content", type: "lesson" },
          { id: "L010", title: "CSS: selectores, cascada y especificidad", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics", type: "lesson" },
          { id: "L011", title: "Modelo de caja, unidades y tipografía", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics", type: "practice" },
          { id: "L012", title: "Flexbox para layouts flexibles", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox", type: "lesson" },
          { id: "L013", title: "CSS Grid para layouts bidimensionales", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids", type: "lesson" },
          { id: "L014", title: "Media queries y enfoque mobile-first", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design", type: "lesson" },
          { id: "L015", title: "Formularios, etiquetas y validación accesible", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Forms", type: "lesson" },
          { id: "L016", title: "Accesibilidad: teclado, foco, contraste y texto alternativo", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Accessibility", type: "lesson" }
        ]},
        { title: "Certificación Responsive Web Design (freeCodeCamp)", lessons: [
          { id: "L017", title: "Practicar HTML y CSS con ejercicios guiados", minutes: 90, url: "https://www.freecodecamp.org/learn/full-stack-developer-v9", type: "practice" },
          { id: "L018", title: "Completar los proyectos requeridos de diseño responsive", minutes: 180, url: "https://www.freecodecamp.org/learn/full-stack-developer-v9", type: "project" },
          { id: "L019", title: "Obtener la certificación oficial (Gratis)", minutes: 60, url: "https://www.freecodecamp.org/learn/full-stack-developer-v9", type: "certificate" }
        ]}
      ]
    },
    {
      id: "phase-03", title: "JavaScript y resolución de problemas", period: "Enero–febrero 2027", goal: "Programar interacciones, trabajar con datos y consumir APIs.",
      modules: [
        { title: "JavaScript desde los fundamentos (MDN)", lessons: [
          { id: "L020", title: "Variables, tipos, operadores y conversiones", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", type: "lesson" },
          { id: "L021", title: "Condicionales y bucles", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", type: "lesson" },
          { id: "L022", title: "Funciones, parámetros y retorno", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", type: "lesson" },
          { id: "L023", title: "Arrays, objetos y métodos habituales", minutes: 90, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", type: "practice" },
          { id: "L024", title: "DOM, eventos y actualización de la interfaz", minutes: 90, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", type: "lesson" },
          { id: "L025", title: "Promesas, async/await y manejo de errores", minutes: 90, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS", type: "lesson" },
          { id: "L026", title: "Solicitudes HTTP y consumo de APIs con fetch", minutes: 90, url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch", type: "practice" },
          { id: "L027", title: "Módulos, depuración y DevTools", minutes: 60, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting", type: "practice" }
        ]},
        { title: "Certificación JavaScript (freeCodeCamp)", lessons: [
          { id: "L028", title: "Resolver ejercicios de algoritmos y estructuras de datos", minutes: 120, url: "https://www.freecodecamp.org/learn/full-stack-developer-v9", type: "practice" },
          { id: "L029", title: "Construir los proyectos exigidos por la certificación", minutes: 180, url: "https://www.freecodecamp.org/learn/full-stack-developer-v9", type: "project" }
        ]}
      ]
    },
    {
      id: "phase-04", title: "Git, GitHub y flujo profesional", period: "Febrero 2027", goal: "Trabajar con ramas, commits claros, pull requests y despliegues.",
      modules: [
        { title: "Flujo de trabajo con GitHub", lessons: [
          { id: "L030", title: "Ramas, merges y resolución de conflictos", minutes: 60, url: "https://skills.github.com/", type: "practice" },
          { id: "L031", title: "Issues, pull requests y revisión de cambios", minutes: 60, url: "https://skills.github.com/", type: "practice" },
          { id: "L032", title: "Organizar versiones y releases", minutes: 45, url: "https://skills.github.com/", type: "practice" },
          { id: "L033", title: "Documentar instalación, funciones y capturas del proyecto", minutes: 60, url: "https://skills.github.com/", type: "project" }
        ]}
      ]
    },
    {
      id: "phase-05", title: "React, TypeScript y UI moderna", period: "Marzo–abril 2027", goal: "Crear interfaces componentizadas, tipadas, accesibles y mantenibles.",
      modules: [
        { title: "React: fundamentos y estado", lessons: [
          { id: "L034", title: "Componentes, JSX y composición", minutes: 60, url: "https://es.react.dev/learn", type: "lesson" },
          { id: "L035", title: "Props, renderizado condicional y listas", minutes: 60, url: "https://es.react.dev/learn", type: "lesson" },
          { id: "L036", title: "Eventos, estado y actualización de la interfaz", minutes: 90, url: "https://es.react.dev/learn", type: "lesson" },
          { id: "L037", title: "Formularios controlados y validación", minutes: 90, url: "https://es.react.dev/learn", type: "practice" },
          { id: "L038", title: "Efectos, sincronización y limpieza", minutes: 90, url: "https://es.react.dev/learn", type: "lesson" },
          { id: "L039", title: "Hooks personalizados y separación de lógica", minutes: 90, url: "https://es.react.dev/learn", type: "practice" }
        ]},
        { title: "TypeScript Handbook", lessons: [
          { id: "L040", title: "Tipos básicos, inferencia y anotaciones", minutes: 60, url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html", type: "lesson" },
          { id: "L041", title: "Uniones, narrowing y tipos literales", minutes: 60, url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html", type: "lesson" },
          { id: "L042", title: "Interfaces, aliases y tipos de objetos", minutes: 60, url: "https://www.typescriptlang.org/docs/handbook/2/objects.html", type: "lesson" },
          { id: "L043", title: "Genéricos y funciones reutilizables", minutes: 90, url: "https://www.typescriptlang.org/docs/handbook/2/generics.html", type: "lesson" }
        ]},
        { title: "Frontend Development Libraries", lessons: [
          { id: "L044", title: "Completar ejercicios y proyectos frontend seleccionados", minutes: 180, url: "https://www.freecodecamp.org/learn/full-stack-developer-v9", type: "project" }
        ]}
      ]
    },
    {
      id: "phase-06", title: "Backend con Node.js, Express y APIs REST", period: "Mayo–junio 2027", goal: "Diseñar APIs, validar entradas, manejar errores y comprender autenticación básica.",
      modules: [
        { title: "Node.js: runtime y herramientas", lessons: [
          { id: "L045", title: "Qué es Node.js y ejecutar scripts", minutes: 60, url: "https://nodejs.org/learn/getting-started/introduction-to-nodejs", type: "lesson" },
          { id: "L046", title: "Módulos, npm y package.json", minutes: 60, url: "https://nodejs.org/learn", type: "lesson" },
          { id: "L047", title: "Sistema de archivos y variables de entorno", minutes: 90, url: "https://nodejs.org/learn", type: "practice" },
          { id: "L048", title: "Asincronía, promesas y event loop", minutes: 90, url: "https://nodejs.org/learn", type: "lesson" }
        ]},
        { title: "Express.js y APIs REST", lessons: [
          { id: "L049", title: "Crear un servidor Express", minutes: 60, url: "https://expressjs.com/es/starter/installing/", type: "lesson" },
          { id: "L050", title: "Rutas, parámetros, query y middleware", minutes: 90, url: "https://expressjs.com/es/guide/routing.html", type: "lesson" },
          { id: "L051", title: "Validar datos y manejar errores", minutes: 90, url: "https://expressjs.com/es/guide/error-handling.html", type: "practice" },
          { id: "L052", title: "Diseñar endpoints CRUD y códigos HTTP", minutes: 120, url: "https://expressjs.com/es/guide/routing.html", type: "project" }
        ]}
      ]
    },
    {
      id: "phase-07", title: "SQL, PostgreSQL, autenticación y backend gestionado", period: "Julio–agosto 2027", goal: "Modelar datos relacionales, escribir consultas y proteger los datos de cada usuario.",
      modules: [
        { title: "SQL y PostgreSQL", lessons: [
          { id: "L053", title: "Bases relacionales, tablas y tipos", minutes: 60, url: "https://www.postgresql.org/docs/current/tutorial-table.html", type: "lesson" },
          { id: "L054", title: "SELECT, WHERE, ORDER BY y LIMIT", minutes: 60, url: "https://www.postgresql.org/docs/current/tutorial-select.html", type: "lesson" },
          { id: "L055", title: "INSERT, UPDATE y DELETE", minutes: 60, url: "https://www.postgresql.org/docs/current/tutorial-dml.html", type: "lesson" },
          { id: "L056", title: "JOIN, agregaciones y GROUP BY", minutes: 90, url: "https://www.postgresql.org/docs/current/tutorial-join.html", type: "lesson" },
          { id: "L057", title: "Claves primarias, foráneas e integridad", minutes: 90, url: "https://www.postgresql.org/docs/current/tutorial-fk.html", type: "practice" }
        ]},
        { title: "Supabase con React", lessons: [
          { id: "L058", title: "Crear proyecto y configurar variables de entorno", minutes: 60, url: "https://supabase.com/docs/guides/getting-started/quickstarts/reactjs", type: "lesson" },
          { id: "L059", title: "Conectar React con la base de datos", minutes: 90, url: "https://supabase.com/docs/guides/getting-started/quickstarts/reactjs", type: "practice" },
          { id: "L060", title: "Autenticación y gestión de sesión", minutes: 90, url: "https://supabase.com/docs/guides/auth/quickstarts/react", type: "lesson" },
          { id: "L061", title: "Row Level Security y permisos por usuario", minutes: 120, url: "https://supabase.com/docs/guides/database/postgres/row-level-security", type: "lesson" },
          { id: "L062", title: "CRUD completo desde la interfaz", minutes: 120, url: "https://supabase.com/docs/guides/getting-started/quickstarts/reactjs", type: "project" }
        ]}
      ]
    },
    {
      id: "phase-08", title: "Testing, seguridad, despliegue y portafolio", period: "Septiembre–diciembre 2027", goal: "Entregar proyectos robustos, seguros, documentados y accesibles públicamente.",
      modules: [
        { title: "Fundamentos de seguridad web", lessons: [
          { id: "L063", title: "Leer y resumir los riesgos OWASP Top 10 actuales", minutes: 60, url: "https://owasp.org/projects/top-ten/", type: "lesson" },
          { id: "L064", title: "Validación de entradas, secretos y permisos", minutes: 90, url: "https://owasp.org/projects/top-ten/", type: "practice" },
          { id: "L065", title: "Revisar dependencias y errores sin exponer secretos", minutes: 60, url: "https://owasp.org/projects/top-ten/", type: "practice" }
        ]},
        { title: "Next.js Foundations", lessons: [
          { id: "L066", title: "Configurar proyecto y flujo de despliegue", minutes: 90, url: "https://vercel.com/academy/nextjs-foundations/project-setup", type: "lesson" },
          { id: "L067", title: "Rutas, carga de datos y estados de error", minutes: 120, url: "https://vercel.com/academy/nextjs-foundations", type: "lesson" },
          { id: "L068", title: "SEO básico, rendimiento y Core Web Vitals", minutes: 90, url: "https://vercel.com/academy/nextjs-foundations", type: "practice" }
        ]},
        { title: "Proyecto integrador y búsqueda de empleo", lessons: [
          { id: "L069", title: "Definir problema, usuarios, alcance y criterios de aceptación", minutes: 90, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", type: "project" },
          { id: "L070", title: "Diseñar la interfaz y construir el MVP", minutes: 240, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", type: "project" },
          { id: "L071", title: "Probar responsive, accesibilidad, errores y formularios", minutes: 120, url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Accessibility", type: "practice" },
          { id: "L072", title: "Desplegar, escribir README y documentar el proyecto", minutes: 120, url: "https://vercel.com/academy/nextjs-foundations", type: "project" },
          { id: "L073", title: "Preparar portafolio, CV técnico y presentación del proyecto", minutes: 120, url: "https://skills.github.com/", type: "career" }
        ]}
      ]
    }
  ]
};