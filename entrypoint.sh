#!/bin/sh

echo "⏳ Aguardando o banco iniciar..."
until nc -z db 3306; do
  sleep 1
done

echo "✅ Banco disponível!"

echo "🚀 Executando migrations..."
npx prisma migrate dev --name init --schema=src/infra/database/mysql/schema.prisma

echo "📦 Iniciando aplicação..."
npm run start
