#!/bin/bash
# Script de build para Valencia Drone Works

# 1. Crear index.html temporal de desarrollo
cat > index.html << 'DEVHTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Valencia Drone Works</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
DEVHTML

# 2. Compilar
npm run build

# 3. Copiar resultado a la raíz
cp dist/index.html .
cp -r dist/assets/* assets/

echo "Build completado. Archivos actualizados en la raíz."
