# Aplicación de tareas

Aplicación de lista de tareas hecha con react, TypeScript y vite.

## Requisitos

- Node.js 20.19 o superior, o Node.js 22.12 o superior.
- npm, que se instala junto con Node.js.

Se pueden comprobar las versiones en la terminal bash con los comandos:

node --version
npm --version


## Instalar desde GitHub

Abre Git Bash en la carpeta donde quieras guardar el proyecto y clona el repositorio:

```bash
git clone https://github.com/Nico-salazar/todo-list.git
cd todo-list/todo-app
```

Instala las dependencias usando el archivo `package-lock.json` y arranca el servidor de desarrollo:

```bash
npm ci
npm run dev
```

Vite mostrará en la terminal una dirección local, normalmente `http://localhost:5173/`. Ábrela en el navegador para usar la aplicación. Para detener el servidor, vuelve a la terminal y presiona `Ctrl+C`.

Si ya clonaste el repositorio, abre Git Bash en su carpeta `todo-app` y ejecuta los dos últimos comandos (`npm ci` y `npm run dev`).

## Comandos disponibles

Ejecuta estos comandos desde la carpeta `todo-app`:

| Comando | Para qué sirve |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo con recarga automática. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm run build` | Comprueba los tipos de TypeScript y genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la versión generada por `npm run build`. |

Ejecuta primero `npm run build` antes de usar `npm run preview`.

## Enfoque de la aplicación

La interfaz está dividida en componentes React. `App.tsx` mantiene el estado de las tareas y del formulario, y contiene las acciones para agregar, completar y eliminar tareas. Pasa los datos y las funciones necesarias a los componentes hijos: `TodoForm` presenta el formulario y `TodoList` organiza las tareas mediante `TodoItem`. También se usan componentes como `PendingCountProps.tsx` para mostrar el conteo de pendientes y `ThemeToggle.tsx` para cambiar el tema.

El tipo `Task`, ubicado en `src/types/task.ts` establece los datos de cada tarea: identificador, título, descripción opcional, estado de completado y fechas de creación y actualización. TypeScript ayuda a comprobar el uso de esos datos en todos los componentes.

Los estilos y los temas claro y oscuro se definen en `src/App.css` y `src/index.css`.

Se quiso mantener la aplicación simple y funcional, pues era el requisito de la prueba tecnica, me inspire en la pagina de `https://agestion.net/` para escoger el tema y los colores que iba a tener la lista, sin mebargo, me vi en el deseo de implementar un tema oscuro y claro, ya que me parece que es una funcionalidad que muchos usuarios buscan en las aplicaciones de hoy en día.

La lista busca ser mas intuitiva para el cumplimiento y lectura de las tareas, por eso se oculta el formulario de agregar tarea luego de agregar una y se muestra solo cuando el usuario necesita agregar una  nueva tare desde el botón "Agregar tarea".

## Almacenamiento de las tareas

Actualmente, las tareas se conservan en el estado de React mientras la página está abierta. No se guardan en el navegador ni en una base de datos, por lo que al recargar la página la lista vuelve a empezar vacía.
