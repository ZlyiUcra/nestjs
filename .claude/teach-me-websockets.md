# Заняття: WebSockets у NestJS (гілка `websockets`)

Рівень: ELI14 · Фокус: концепція WebSockets · Мова: українська

Контекст гілки: мінімальний каркас (NestJS + Prisma 7 driver adapter, глобальний ConfigModule),
додано модель `Message`. WebSocket-коду ще немає — ми вчимо концепцію перед реалізацією.

---

## Блок 1 — Проблема (Чому взагалі WebSockets?)
- [ ] Чому HTTP request/response не підходить для чату: сервер не може сам «штовхнути» дані клієнту
- [ ] Альтернативи та їхні компроміси: short polling, long polling, SSE, WebSockets
- [ ] Що означає «повнодуплексний» (full-duplex) і «персистентний» зв'язок

## Блок 2 — Рішення (Що таке WebSocket і як це в NestJS)
- [ ] Handshake: HTTP Upgrade → 101 Switching Protocols; схеми `ws://` / `wss://`
- [ ] Постійне з'єднання, двонапрямлені кадри (frames), без повторних HTTP-заголовків
- [ ] socket.io vs нативний `ws`: що дає socket.io (reconnect, rooms, fallback)
- [ ] NestJS Gateway: `@WebSocketGateway`, `@SubscribeMessage`, `@WebSocketServer`, lifecycle-хуки
- [ ] Емісія подій: `client.emit`, `server.emit`, broadcast, ack
- [ ] Кімнати (rooms) і namespaces — навіщо
- [ ] Як це ляже на наш каркас + модель `Message` (зберегти через Prisma + розіслати)

## Блок 3 — Нюанси і ширший контекст
- [ ] Автентифікація на WS (немає звичного HTTP guard-flow; токен у handshake/cookie)
- [ ] Валідація payload на gateway
- [ ] Масштабування на кілька інстансів → Redis adapter (in-memory rooms не шаряться)
- [ ] Reconnection, heartbeat / ping-pong, обробка відключень
- [ ] Вплив на фронтенд і деплой (sticky sessions, CORS)

---

### Журнал прогресу
- (поки порожньо — заповнюватимемо в міру засвоєння)
