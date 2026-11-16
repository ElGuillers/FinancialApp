# Financial App (GG Finanzas) 💰📈

Una aplicación web progresiva (**PWA**) de gestión financiera personal diseñada para ayudarte a tomar el control de tus finanzas: administrar ingresos, monitorear y reducir deudas, proyectar metas de ahorro y acceder a consejos clave de educación financiera.

---

## 🚀 Características Principales

- **📊 Dashboard Integral:** Vista general con tu balance neto, gráficos interactivos de distribución de activos/pasivos y análisis de capacidad de endeudamiento.
- **💵 Registro de Ingresos:** Gestión de ingresos periódicos o eventuales con categorización clara.
- **💳 Control de Deudas:** Registro y seguimiento de pasivos y obligaciones financieras.
- **🎯 Metas Financieras:** Planificación de objetivos de ahorro con seguimiento de progreso en tiempo real.
- **💡 Consejos Financieros:** Módulo de educación financiera (Regla 50/30/20, Fondo de Emergencia, Interés Compuesto, etc.).
- **📱 PWA Ready (Progressive Web App):** Instalable en dispositivos móviles y de escritorio, optimizada para funcionar como una aplicación nativa.
- **💾 Persistencia Local:** Almacenamiento seguro en el navegador mediante `localStorage` sin necesidad de backend externo.

---

## 🛠️ Tecnologías Utilizadas

- **[React 18](https://react.dev/)**: Biblioteca frontend para la interfaz de usuario.
- **[Vite](https://vitejs.dev/)**: Bundler y entorno de desarrollo ultra rápido.
- **[Recharts](https://recharts.org/)**: Gráficos interactivos y visualización de datos.
- **[Lucide React](https://lucide.dev/)**: Iconografía moderna y limpia.
- **[Vite Plugin PWA](https://vite-pwa-org.netlify.app/)**: Configuración de Service Worker y manifiesto PWA.
- **CSS3 Moderno**: Interfaz con tema oscuro premium (*Dark theme*), responsive y adaptada a móviles.

---

## 📦 Instalación y Desarrollo Local

### Prerrequisitos

- **Node.js** (versión 18 o superior recomendada)
- **npm** (o yarn / pnpm)

### Pasos

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ElGuillers/FinancialApp.git
   cd FinancialApp
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```
   Los archivos optimizados se generarán en la carpeta `dist/`.

5. **Previsualizar la versión de producción:**
   ```bash
   npm run preview
   ```

---

## 🚀 Despliegue en Vercel

Este proyecto está configurado para desplegarse fácilmente en **[Vercel](https://vercel.com/)**:

1. Conecta tu repositorio de GitHub a Vercel.
2. Vercel detectará automáticamente el framework **Vite**.
3. **Build Command:** `npm run build` o `vite build`
4. **Output Directory:** `dist`
5. La redirección de rutas SPA ya está configurada en [`vercel.json`](./vercel.json).

> [!NOTE]
> La carpeta `node_modules` y la carpeta `dist` están excluidas en `.gitignore` para permitir que el entorno de Vercel instale las dependencias y compile de manera limpia y sin conflictos de permisos.

---

## 📂 Estructura del Proyecto

```text
FinancialApp/
├── public/                 # Iconos y recursos estáticos de la PWA
├── src/
│   ├── components/         # Componentes reutilizables (Botones, Tarjetas, Gráficos, Inputs)
│   ├── context/            # Estado global con React Context (FinancialContext)
│   ├── pages/              # Vistas principales (Dashboard, Ingresos, Deudas, Metas, Tips)
│   ├── utils/              # Utilidades de formato de moneda y categorías
│   ├── App.jsx             # Componente raíz con navegación
│   ├── index.css           # Estilos globales y variables de tema
│   └── main.jsx            # Punto de entrada de React
├── .gitignore              # Archivos y carpetas ignorados por Git
├── index.html              # Plantilla HTML base
├── package.json            # Scripts y dependencias del proyecto
├── vercel.json             # Reglas de enrutamiento para Vercel SPA
└── vite.config.js          # Configuración de Vite y PWA
```

---

## 📄 Licencia

Este proyecto es privado / de uso personal.
