# ValidaRUT 🇨🇱

Una aplicación web de diseño premium, simple y minimalista para validar RUTs chilenos y calcular el dígito verificador de forma instantánea, sin recargar la página.

## Características

- **Verificador de RUT**: Indica si un RUT ingresado es válido o inválido al instante, tolerando formatos con/sin puntos, guiones y espacios (ej. `198347906`, `19834790-6`, `19.834.790-6`).
- **Calculador de Dígito Verificador (DV)**: Descubre el dígito verificador ingresando solo los números del RUT, con opción de copiar el RUT completo con un solo clic.
- **Diseño Ultra Moderno**: Interfaz con estilo glassmorphism, modo oscuro integrado, degradados armónicos y animaciones sutiles.
- **Cliente-Side (100% rápido)**: Sin recargas de página, validación y cálculos en tiempo real en el navegador.

---

## 🚀 Pasos para Subir y Usar en GitHub (Gratis con GitHub Pages)

Para hospedar este proyecto gratis y usarlo desde cualquier dispositivo (computador, celular, etc.) mediante una dirección web, sigue estos sencillos pasos:

### Paso 1: Inicializar Git y subir a GitHub

Abre tu terminal en la carpeta del proyecto (`VerificadorRut`) y ejecuta los siguientes comandos:

1. **Agregar los archivos:**
   ```bash
   git add .
   ```

2. **Confirmar los cambios:**
   ```bash
   git commit -m "Initial commit: Validador de RUT chileno"
   ```

3. **Crear un nuevo repositorio en GitHub:**
   - Ve a [github.com/new](https://github.com/new).
   - Nombra tu repositorio (ejemplo: `VerificadorRut`).
   - Déjalo como **Público** (requerido para GitHub Pages gratuito).
   - No agregues README, .gitignore ni licencia (ya los tenemos).
   - Haz clic en **Create repository**.

4. **Vincular y subir el código:**
   *(Utilizando tu usuario iKoDesu)*
   ```bash
   git branch -M main
   git remote add origin https://github.com/iKoDesu/VerificadorRut.git
   git push -u origin main
   ```

---

### Paso 2: Activar GitHub Pages (Para usarlo en el navegador)

Una vez que el código esté en tu repositorio de GitHub:

1. Entra a tu repositorio en la página de GitHub.
2. Ve a la pestaña **Settings** (Configuración) en el menú superior del repositorio.
3. En el menú lateral izquierdo, haz clic en **Pages** (dentro de la sección *Code and automation*).
4. En la sección **Build and deployment**:
   - En **Source**, asegúrate de que esté seleccionado `Deploy from a branch`.
   - En **Branch**, selecciona `main` (o `master`) y la carpeta `/ (root)`.
   - Haz clic en el botón **Save**.

¡Y listo! En aproximadamente 1 o 2 minutos, GitHub creará el enlace público para tu validador. 

Verás un mensaje en esa misma pantalla de configuración que dice algo como:  
👉 **"Your site is live at `https://iKoDesu.github.io/VerificadorRut/`"**

Puedes abrir ese link desde tu celular o compartirlo con quien quieras para usar el validador al instante.
