FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera arquivos do Prisma + builda projeto (tsoa e TypeScript)
RUN npm run prisma:generate && npm run build

# Runtime clean
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .env
COPY --from=builder /app/src/infra/database/mysql/schema.prisma ./src/infra/database/mysql/schema.prisma
COPY --from=builder /app/src/infra/database/mysql/migrations ./src/infra/database/mysql/migrations

EXPOSE 3000

CMD ["node", "-r", "module-alias/register", "dist/main/server.js"]
