# Blood Donation Website (HTML + CSS + PHP + MySQL + Laravel + WebSocket)

This repository contains two implementations of the same blood donation website inspired by your provided screens:

1. **Core PHP + MySQL + HTML/CSS frontend** in `public/`, `api/`, `database/`, and `websocket/`.
2. **Laravel-ready port** in `laravel_port/` containing routes, controllers, models, migrations, and Blade templates.

## 1) Run the PHP/MySQL/WebSocket version

### Prerequisites
- PHP 8+
- MySQL 8+

### Setup
```bash
mysql -u root -p < database/schema.sql
php -S 127.0.0.1:8000 -t public
php websocket/server.php
```

Set DB credentials with environment variables if needed:
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`

### Pages
- `/index.php`
- `/donate.php`
- `/join.php`
- `/blood-types.php`
- `/contact.php`
- `/emergency.php`

## 2) Laravel port

`laravel_port/` includes files you can drop into a Laravel app:
- `routes/web.php`
- `app/Http/Controllers/*`
- `app/Models/*`
- `database/migrations/*`
- `resources/views/*`

After copying into a Laravel project:
```bash
php artisan migrate
php artisan serve
```

## WebSocket behavior
- Emergency form submissions are written into `/tmp/blood_socket_queue.log`.
- `websocket/server.php` watches this file and broadcasts emergency events to all browser clients connected at `ws://localhost:8080`.
- Frontend listener is in `public/assets/js/app.js`.

