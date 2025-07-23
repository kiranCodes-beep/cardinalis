# E-Commerce Project

This is a full-stack e-commerce web application with a Node.js/Express backend (MongoDB, Stripe payments) and a React frontend. The project is organized for easy local development and production deployment.

---

## Project Structure

```
e-commerce/
  ├── server/              # Node.js/Express backend (MongoDB, Stripe)
  ├── front_end_copy/      # React frontend (use this, not front_end/)
  ├── package.json         # (root, optional)
  └── README.md            # (this file)
```

---

## Backend (server/)
- **Tech:** Node.js, Express, MongoDB (Mongoose), Stripe
- **Features:**
  - User registration & login (with hashed passwords)
  - Product & cart management
  - Stripe payment integration
  - RESTful API

### Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PORT=5000 # or your preferred port
   ```
4. Start the server:
   ```
   npm start
   ```
   The backend runs on `http://localhost:5000` by default.

---

## Frontend (front_end_copy/)
- **Tech:** React
- **Features:**
  - User authentication (login/signup)
  - Product browsing
  - Cart & checkout
  - Stripe payment UI

### Setup
1. `cd front_end_copy`
2. `npm install`
3. To run in development:
   ```
   npm start
   ```
   The frontend runs on `http://localhost:3000` by default.
4. To build for production:
   ```
   npm run build
   ```

---

## Deployment
- **Backend:** Deploy to Heroku, Render, or any Node.js host. Set environment variables in your deployment platform.
- **Frontend:** Deploy the `build/` folder from `front_end_copy/` to Netlify, Vercel, Firebase Hosting, etc.
- **Do NOT commit `.env` or `node_modules/` to git.**

---

## Notes
- Use only `front_end_copy/` for frontend work. Ignore or delete `front_end/` if not needed.
- All sensitive keys and connection strings should be kept in `.env` files and never pushed to git.
- For any issues, check your environment variables and MongoDB connection.

---

## License
MIT (or your preferred license) 
