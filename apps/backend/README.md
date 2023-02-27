# Backend

This is a backend application built with Express.js framework.

## Technologies Used
- Express.js
- Typescript
- Prisma
- Cloudinary
- Passport.js
- Zod

## Endpoints

### Photos

- `GET /photos`: Returns a list of all photos available on a website.
- `GET /photos/:photoId`: Returns the photo with the given ID.
- `POST /photos`: Uploads a new photo to a website's collection.
- `DELETE /photos/:photoId`: Deletes the photo with the given ID.

### Portfolios

- `GET /portfolios`: Returns a list of all portfolios available on a website.
- `GET /portfolios/:slug`: Returns the portfolio with the given slug.
- `POST /portfolios`: Creates a new portfolio on a website.
- `DELETE /portfolios/:slug`: Deletes the portfolio with the given slug.
- `PUT /portfolios/:slug/images`: Adds images to the portfolio with the given slug.
- `PUT /portfolios/:slug/name`: Updates the name of the portfolio with the given slug.

### Images

- `GET /images/:id`: Returns the image with the given ID.
- `GET /images/:id/placeholder`: Returns a placeholder image for the image with the given ID.

### Contact

- `POST /contact`: Sends a message to the website owner through the contact form.
- `DELETE /contact/:contactId`: Deletes the message with the given ID from the website owner's inbox.

### Newsletter

- `POST /newsletter/subscribe`: Allows users to subscribe to a website's newsletter.

### About

- `PUT /about/image`: Updates the image associated with the "About" page on a website.

## Installation

- Create a `.env` based on the [.env.example](https://github.com/xKarol/photos-web/blob/main/apps/backend/.env.example) file
- Run setup script `npm run setup`

## How to Run
Run the application: `npm run dev`

