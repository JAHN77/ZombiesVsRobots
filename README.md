# 🧟 Zombies vs Robots - Simulador de Batallas 🤖

Bienvenido a **Zombies vs Robots**, una aplicación web interactiva que te permite simular épicas batallas entre hordas de zombis y ejércitos de robots. Este proyecto está construido con una arquitectura moderna utilizando Next.js, React, Tailwind CSS y Prisma ORM con PostgreSQL.

## 🚀 Características y Funcionalidades del Proyecto

El proyecto está diseñado como un juego de simulación y gestión con elementos de progresión RPG. Entre sus principales funcionalidades destacamos:

### 1. Gestión de Personajes (Zombis y Robots)
- **Creación de Personajes:** Permite crear nuevos combatientes (ya sean Zombis o Robots) con diferentes estadísticas base:
  - Vida (Health)
  - Ataque (Attack)
  - Defensa (Defense)
  - Velocidad (Speed)
- **Sistema de Progresión:** Los personajes pueden ganar experiencia (XP) y subir de nivel.
- **Distribución de Puntos:** Al subir de nivel, los personajes adquieren puntos de estadísticas (Stat Points) que el usuario puede redistribuir de manera manual en la interfaz para potenciar y personalizar sus personajes.

### 2. Simulador de Batallas Dinámico
- Motor de combate que enfrenta a dos personajes en una batalla de turnos automáticos.
- Se tienen en cuenta las estadísticas avanzadas: ataque vs defensa, velocidad para definir los turnos de ataque, y cálculo de daño restado sobre la vida.
- Al final de la batalla, **el ganador obtiene puntos de experiencia (XP)** que le ayudarán en su progresión a niveles superiores.

### 3. Historial de Combates
- Todas las batallas se quedan registradas dentro de la base de datos.
- Puedes navegar por el historial para consultar exactamente cuántos turnos duró el enfrentamiento y quién fue el personaje victorioso.

## 💻 Stack Tecnológico

Este proyecto utiliza tecnologías de vanguardia para asegurar un rendimiento y escalabilidad excelentes:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Server Actions)
- **Librería de UI:** [React 19](https://react.dev/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/) (Tipado seguro y gestión de base de datos)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)

## 🗄️ Estructura de la Base de Datos

Cuenta con un esquema relacional optimizado manejado por Prisma:

- **`Character` (Personaje):** Guarda id, nombre, tipo (Zombi/Robot), vida, ataque, defensa, velocidad, nivel, experiencia, y puntos para distribuir.
- **`Battle` (Batalla):** Lleva el seguimiento de un enfrentamiento registrando el combatiente 1, el combatiente 2, quién fue el ganador (relacionado con la tabla de `Character`) y cuántos turnos tomó la definición de la pelea.

## ⚙️ Instrucciones de Instalación

Sigue estos pasos para correr el proyecto de manera local en tu máquina:

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JAHN77/ZombiesVsRobots.git
   cd ZombiesVsRobots/my-app
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o yarn install
   # o pnpm install
   ```

3. **Configura las variables de entorno**
   Crea o renombra el archivo `.env` en la raíz del proyecto y conecta tu base de datos de PostgreSQL:
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/zombies_vs_robots"
   ```

4. **Corre las migraciones de Prisma**
   Esto creará las tablas necesarias en la base de datos:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **¡A jugar!**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación local.

---

*Crea, entrena y pon a prueba a tus personajes para descubrir qué facción dominará este mundo apocalíptico.*
