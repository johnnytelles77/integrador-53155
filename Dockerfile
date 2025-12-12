# Imagen base
FROM node:20-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias (prod + dev)
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto que tu API usa
EXPOSE 8088

# Comando de inicio
CMD ["npm", "start"]

