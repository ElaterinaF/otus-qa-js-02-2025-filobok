# Версия Node.js 
FROM node:22.14.0

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json (или yarn.lock)
COPY package.json package-lock.json ./

# Устанавливаем зависимости проекта (можно заменить на yarn или pnpm)
RUN npm ci

# Копируем все остальные файлы проекта
COPY . .
