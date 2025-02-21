# E-Commerce Web Application - Video Games Store

This project is a web-based e-commerce platform for buying and selling video games online. It includes a secure user authentication system, an interactive UI, and a fully functional shopping cart with Stripe payment integration.

## Technologies Used
- **Backend**: Java, Spring Boot, MySQL
- **Frontend**: Angular, TypeScript
- **Security**: Spring Security (authentication & authorization)
- **Payment Processing**: Stripe
- **Email Service**: Resend
- **AI Chatbot**: Hugging Face

## Features
### User Features
- **User Authentication**: Registration & login with username, email, and password.
- **Game Catalog**:
  - Browse video games with cover images.
  - Watch trailers directly from the product page.
- **Shopping Cart**:
  - Add and remove games.
  - Checkout and select payment method via Stripe.
- **Support Page**:
  - Submit order-related issues.
  - Receive confirmation emails via Resend.
- **AI Chatbot**:
  - Provides information about available games and past orders.

### Admin Features
- Manage video games, categories, platforms, and developers.
- Create, update, and delete products.

## Installation & Usage
### Backend (Spring Boot)
1. Clone the repository:
   ```sh
   git clone https://github.com/mgualtier/Videogames
   ```
2. Create a `.env` file in the same folder as `application.properties` and add your API keys and database credentials:
   ```sh
   STRIPE_API_KEY=your_stripe_key
   RESEND_API_KEY=your_resend_key
   HUGGINGFACE_API_KEY=your_huggingface_key
   DATABASE_URL=your_database_url
   DATABASE_USERNAME=your_database_username
   DATABASE_PASSWORD=your_database_password
   DRIVER_CLASS=your_driver_class
   ```
3. Navigate to the backend folder and run:
   ```sh
   mvn spring-boot:run
   ```

### Frontend (Angular)
1. Navigate to the frontend folder and install dependencies:
   ```sh
   npm install
   ```
2. Start the Angular development server:
   ```sh
   ng serve
   ```

### Access the Application
- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080`

## License
This project is licensed under the MIT License.

