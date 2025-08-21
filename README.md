<p align="center">
<img src="./src/assets/nodepop.svg" width="320" alt="Nodepop">
</p>

**Nodepop** is a practice project of the **KeepCoding** module _Advanced React Development_.

## 📌 Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Author](#author)

## Description

Single Page Application built with Vite, React + TypeScript, styled with TailwindCSS. Backend API via [nodepop-api](https://github.com/davidjj76/nodepop-api) for testing and manipulating product adverts service.

## Installation

1. Clone the API repository, install its dependencies and start it:

   ```bash
   git clone https://github.com/davidjj76/nodepop-api.git
   cd nodepop-api
   npm install
   npm start
   ```

2. Clone the project repository, install its dependencies and run it:

   ```bash
   git clone https://github.com/miguelferlez/keepcoding-practica-react-av.git
   cd keepcoding-practica-react-av
   npm install
   # development
   npm run dev
   ```

## Usage

### Backend

[nodepop-api](https://github.com/davidjj76/nodepop-api) endpoints are available in `http://localhost:3001/swagger/` :

- `api/auth/signup`
  - POST: creates a new user.
- `/api/auth/me`
  - `GET`: returns authenticated user data.
- `/api/auth/login`
  - `POST`: returns access token after submitting correct user credentials.
- `/api/v1/adverts`
  - `GET`: returns a JSON of the user's list of products with the possibility to apply filters. Example of available filters:
    - `name=car` (product name starting with "car", regardless capitalization)
    - `sale=true/false` (true if it is a product to be sold, false if it is a product to be bought)
    - `price=0-25000` (price within the range)
    - `tags=motor,work` (product tags)
  - `POST`: creates a new product.
- `/api/v1/adverts/tags`
  - `GET`: returns a list of tags.
- /api/v1/adverts/:id
  - `GET`: returns a product JSON.
  - `DELETE`: deletes an existing product.

Authentication token is required for every `/adverts` endpoint! In order to use this token provided in login endpoint, an authorization header must be sent:

```js
Header[‘Authorization’] = `Bearer ${token}`
```

### Frontend

App routes:

**Public**: accessible to everyone.

- `/login`: LoginPage

**Protected**: accessible **only** to authenticated users. Any unauthorized access redirects to `/login`.

- `/`: redirects to `/adverts`
- `/adverts`: AdvertsPage
- `/adverts/:id`: AdvertPage
- `/adverts/new`: NewAdvertPage

Any other URL will redirect to NotFoundPage.

## Author

Miguel Fernández **@miguelferlez**
