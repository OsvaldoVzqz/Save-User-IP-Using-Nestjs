# Etapa de construcción
FROM node:16-alpine AS builder

WORKDIR /usr/src/app

# Copia los archivos de dependencias y genera el cliente Prisma
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
RUN npm run build

# Copia el resto del código fuente y construye el proyecto
COPY . .
RUN npm run build

# Etapa de ejecución
FROM node:16-alpine

WORKDIR /usr/src/app

# Copia solo las dependencias de producción y los archivos construidos
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
