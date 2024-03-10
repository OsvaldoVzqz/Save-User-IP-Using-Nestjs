# Etapa de construcción
FROM node:16-alpine AS builder

WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/
COPY tsconfig*.json ./

# Instala todas las dependencias
RUN npm install

# Genera el cliente Prisma
RUN npx prisma generate

# Copia el resto del código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de ejecución
FROM node:16-alpine

WORKDIR /usr/src/app

# Copia solo las dependencias de producción
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

# Copia los archivos construidos desde la etapa de construcción
COPY --from=builder /usr/src/app/dist ./dist

# Copia la carpeta prisma y su contenido en la etapa de ejecución
COPY --from=builder /usr/src/app/prisma ./prisma

# Copia el cliente de Prisma generado
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

# Comando para ejecutar la aplicación, incluyendo la generación del cliente de Prisma
CMD ["sh", "-c", "npx prisma generate --schema=./prisma/schema.prisma && node dist/main"]
