# Connections User / Contacts API

## Servers

http://localhost:3000 - API base URL

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)

## Users

### [POST] - `/users/register` - Create a new user

«Example Value | Schema»

```json
{
  "name": "Adrian Cross",
  "email": "across@mail.com",
  "password": "examplepwd12345"
}
```

Responses Code --- Description

- **201** - User created.

- **400** - User creation error.

- **409** - Conflict, Email in use

- **500** - Server error.

### [POST] - `/users/login` - Login user

«Example Value | Schema»

```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Responses Code --- Description

- **200** - User is logged in.

- **400** - User creation error.

- **401** - Unauthorized

### [GET] - `/users/current` - Get information about the current user

«Example Value | Schema»

`Authorization: "Bearer {{token}}"`

Responses Code --- Description

- **200** - User is logged in.

- **400** - User creation error.

- **401** - Unauthorized

### [POST] - `/users/logout` - Log out user

«Example Value | Schema»

`Authorization: "Bearer {{token}}"`

Responses Code --- Description

- **204** - The user is logged out.

- **401** - Unauthorized

### [PATCH] - `/users` - Updating user's subscription

«Example Value | Schema»

`Authorization: "Bearer {{token}}"`

```json
{
  "subscription": "['starter', 'pro', 'business']"
}
```

Responses Code --- Description

- **200** - User subscription successfully updated

- **400** - User creation error.

## Contacts

### [GET] - `/api/contacts` - Get all user contacts

«Example Value | Schema»

`Authorization: "Bearer {{token}}"`

Responses Code --- Description

- **200** - Contacts found.

- **401** - Unauthorized

### [GET] - `/api/contacts/:id` - Get all user contacts

«Example Value | Schema»

`Authorization: "Bearer {{token}}"`

Responses Code --- Description

- **200** - Contact found.

- **401** - Unauthorized

- **404** - There is no such id

### [POST] - `/api/contacts` - Get all user contacts

«Example Value | Schema»

```json
{
  "name": "User Name",
  "email": "username@gmail.com",
  "phone": "(000) 000-0000"
}
```

Responses Code --- Description

- **201** - Create a new contact

- **400** - Error creating contact

- **401** - Unauthorized

- **404** - Not Found

### [PUT] - `/api/contacts/:id` - Update an existing contact

«Example Value | Schema»

```json
{
  "name": "NEW User Name",
  "email": "NEW username@gmail.com",
  "phone": "NEW (000) 000-0000"
}
```

Responses Code --- Description

- **200** - The contact was successfully updated.

- **400** - Contact update failed

- **401** - Unauthorized

- **404** - Not Found

### [PATCH] - `/api/contacts/:id/favorite` - Update a favorite field by its ID

«Example Value | Schema»

```json
{
  "favorite": "boolean"
}
```

Responses Code --- Description

- **200** - The favorite field was successfully updated.

- **400** - Contact update failed

- **401** - Unauthorized

- **404** - Not Found

### [DELETE] - `/api/contacts/:id` - Delete contact

«Example Value | Schema»

`Authorization: "Bearer {{token}}"`

Responses Code --- Description

- **200** - The contact was successfully deleted.

- **401** - Unauthorized

- **404** - There is no such user collection.

# GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6) Форк
створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно
зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після
того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім
завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з
домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви
відправите коміт з виправленнями на github Після виправлення знову додайте
ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно
  виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними
  виправленнями простих помилок
