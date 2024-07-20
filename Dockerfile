# Usa una imagen base de Node.js
FROM node:18.16.0-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3030

# Comando para ejecutar la aplicación
CMD ["node", "build/index.js"]