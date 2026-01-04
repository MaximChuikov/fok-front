# ФОК - Физкультурно-оздоровительный комплекс имени Э.Б. Булатова

Фронтенд приложение для сайта ФОКа с функционалом онлайн-грамот.

## Технологии

- React 19
- TypeScript
- Vite
- CSS Modules
- Docker
- Nginx

## Локальная разработка

### Требования

- Node.js 18+
- npm или yarn

### Установка

```bash
# Установка зависимостей
npm install
# или
yarn install
```

### Запуск в режиме разработки

```bash
npm start
# или
yarn start
```

Приложение будет доступно по адресу `http://localhost:5173`

### Сборка для продакшена

```bash
npm run build
# или
yarn build
```

Собранные файлы будут в папке `dist/`

## Развертывание на сервере

### Способ 1: Docker (Рекомендуется)

#### Предварительные требования

- Docker и Docker Compose установлены на сервере
- Git установлен на сервере

#### Шаги развертывания

1. **Клонируйте репозиторий на сервер:**

```bash
git clone <your-repo-url> /path/to/fok-front
cd /path/to/fok-front
```

2. **Создайте файл `.env` на основе `.env.example`:**

```bash
cp .env.example .env
# Отредактируйте .env файл при необходимости
```

3. **Соберите и запустите контейнер:**

```bash
docker-compose up -d --build
```

4. **Проверьте, что контейнер запущен:**

```bash
docker ps
```

Приложение будет доступно на порту, указанном в `.env` (по умолчанию 80).

#### Обновление приложения

```bash
# Остановите контейнер
docker-compose down

# Обновите код
git pull origin main

# Пересоберите и запустите
docker-compose up -d --build
```

### Способ 2: Автоматическое развертывание через GitHub Webhook

#### Настройка на сервере

1. **Установите зависимости для webhook сервера:**

```bash
# Node.js должен быть уже установлен
```

2. **Настройте переменные окружения для webhook:**

Создайте файл `.env` в корне проекта:

```env
WEBHOOK_PORT=9000
GITHUB_WEBHOOK_SECRET=your-very-secret-key-here
DEPLOY_SCRIPT=./deploy.sh
```

3. **Обновите путь в `deploy.sh`:**

Откройте `deploy.sh` и измените путь к проекту:

```bash
cd /path/to/fok-front  # Замените на реальный путь
```

4. **Сделайте скрипт исполняемым:**

```bash
chmod +x deploy.sh
```

5. **Запустите webhook сервер:**

```bash
# Используя PM2 (рекомендуется)
npm install -g pm2
pm2 start webhook-server.js --name webhook

# Или напрямую
node webhook-server.js
```

6. **Настройте GitHub Webhook:**

- Перейдите в настройки репозитория на GitHub
- Выберите "Webhooks" → "Add webhook"
- Payload URL: `http://your-server-ip:9000/webhook`
- Content type: `application/json`
- Secret: значение из `GITHUB_WEBHOOK_SECRET` в `.env`
- Events: выберите "Just the push event"
- Active: включено

Теперь при каждом push в ветку `main` приложение будет автоматически обновляться.

#### Настройка PM2 для автозапуска

```bash
# Сохраните конфигурацию PM2
pm2 save

# Настройте автозапуск при перезагрузке системы
pm2 startup
```

### Способ 3: Ручное развертывание без Docker

1. **Установите зависимости:**

```bash
npm install
```

2. **Соберите проект:**

```bash
npm run build
```

3. **Настройте Nginx:**

Скопируйте содержимое `dist/` в директорию веб-сервера и настройте Nginx аналогично `nginx.conf`.

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Порт для приложения (для Docker)
PORT=80

# Порт для webhook сервера
WEBHOOK_PORT=9000

# Секретный ключ для GitHub webhook
GITHUB_WEBHOOK_SECRET=your-secret-key-here

# Путь к скрипту развертывания
DEPLOY_SCRIPT=./deploy.sh

# Окружение
NODE_ENV=production
```

**Важно:** Никогда не коммитьте файл `.env` в репозиторий! Он уже добавлен в `.gitignore`.

## Структура проекта

```
fok-front/
├── src/                    # Исходный код
│   ├── components/        # React компоненты
│   ├── pages/             # Страницы приложения
│   ├── OnlineCertificate/ # Модуль онлайн-грамот
│   ├── images/            # Изображения
│   └── styles/            # Стили
├── public/                 # Публичные файлы
├── Dockerfile              # Конфигурация Docker
├── docker-compose.yml      # Docker Compose конфигурация
├── nginx.conf             # Конфигурация Nginx
├── webhook-server.js      # Сервер для GitHub webhooks
├── deploy.sh              # Скрипт автоматического развертывания
└── .env.example           # Пример файла с переменными окружения
```

## Онлайн-грамоты

Приложение поддерживает отображение онлайн-грамот через специальные зашифрованные URL. Грамоты автоматически масштабируются и сохраняют пропорции на всех устройствах.

## Поддержка

При возникновении проблем:

1. Проверьте логи Docker контейнера: `docker-compose logs`
2. Проверьте логи webhook сервера (если используется PM2): `pm2 logs webhook`
3. Убедитесь, что все переменные окружения настроены правильно
4. Проверьте, что порты не заняты другими приложениями

## Лицензия

Приватный проект.
