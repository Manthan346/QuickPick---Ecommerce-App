# QuickPick E-Commerce Platform

## Project Overview

QuickPick is a full-stack e-commerce platform built with modern web technologies. It provides a seamless shopping experience for users while offering comprehensive management tools for administrators. The platform includes user authentication, product browsing, cart management, order processing, payment integration, and an admin dashboard for inventory and order management.

## Features

### User Features

#### Authentication
- **User Registration**: Users can create accounts with email and password validation using Zod schemas.
- **User Login**: Secure JWT-based authentication with password hashing using bcrypt.
- **Admin Login**: Separate authentication for administrators.

#### Product Browsing
- **Home Page**: Features hero section, latest collections, best sellers, and company policies.
- **Product Collection**: Paginated product listing with advanced filtering options:
  - Category filtering (Men, Women, Kids)
  - Subcategory filtering
  - Price range filtering with dual-range slider
  - Search functionality
- **Product Details**: Individual product pages with multiple images, size selection, and related products.

#### Cart Management
- **Add to Cart**: Users can add products with size selection.
- **Cart View**: Display cart items with quantities, prices, and totals.
- **Update Cart**: Modify item quantities or remove items.
- **Cart Persistence**: Cart data is stored and retrieved via API.

#### Order Processing
- **Place Order**: Checkout process with shipping address form.
- **Payment Methods**:
  - Cash on Delivery (COD)
  - Stripe integration for online payments
  - Razorpay integration (prepared for future use)
- **Order History**: Users can view their past orders.
- **Invoice Download**: PDF generation and download for orders using PDFKit.

#### Additional Features
- **Search and Filter**: Real-time search with debounced input.
- **Responsive Design**: Mobile-friendly UI using Tailwind CSS and Radix UI components.
- **Toast Notifications**: User feedback for actions using React Toastify.
- **State Management**: Recoil for global state management.

### Admin Features

#### Dashboard
- **Statistics Overview**: Data cards showing total orders, revenue, users, etc.
- **Charts and Analytics**:
  - Bar charts for monthly income
  - Pie charts for order statistics
- **Order Management**: View all orders with pagination, update order status and shipping details.

#### Product Management
- **Add Products**: Form to add new products with:
  - Multiple image uploads (up to 4 images) using Multer and Cloudinary
  - Product details (name, description, category, subcategory, gender, price, sizes)
  - Best seller flag
- **List Products**: Paginated list of all products.
- **Edit Products**: Update product information and images.
- **Delete Products**: Remove products from inventory.

#### Order Management
- **View All Orders**: Comprehensive order list with user details, items, amounts.
- **Update Order Status**: Change order status (e.g., pending, shipped, delivered).
- **Shipping Details**: Add or update shipping information for orders.

#### Analytics
- **Revenue Tracking**: Monthly and total revenue statistics.
- **Order Statistics**: Total orders, pending orders, etc.

## Technology Stack

### Frontend (User)
- **React 18**: Component-based UI library
- **Vite**: Fast build tool and development server
- **React Router DOM**: Client-side routing
- **Recoil**: State management
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI components
- **Framer Motion**: Animation library
- **React Toastify**: Notification system
- **Lucide React**: Icon library

### Frontend (Admin)
- **React 19**: Latest React version
- **Vite**: Build tool
- **React Router DOM**: Routing
- **Recharts**: Chart library for data visualization
- **TanStack Table**: Data table component
- **@dnd-kit**: Drag and drop functionality
- **Next Themes**: Theme management
- **TypeScript**: Type-safe JavaScript

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **Multer**: File upload middleware
- **Cloudinary**: Image hosting and management
- **PDFKit**: PDF generation
- **Stripe & Razorpay**: Payment gateways
- **Resend**: Email service
- **Zod**: Schema validation
- **CORS**: Cross-origin resource sharing

## Architecture

The application follows a three-tier architecture:

1. **Presentation Layer**: React applications (User frontend and Admin panel)
2. **Application Layer**: Express.js server with RESTful APIs
3. **Data Layer**: MongoDB database with Mongoose models

### Database Models
- **User**: User authentication and profile data
- **Product**: Product information with images and variants
- **Order**: Order details, items, shipping, and payment information

### API Structure
- **User Routes**: Authentication endpoints
- **Product Routes**: CRUD operations for products
- **Order Routes**: Order placement, retrieval, and management
- **Cart Routes**: Cart operations
- **Dashboard Routes**: Analytics and statistics
- **PDF Routes**: Invoice generation

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account for image storage
- Stripe and Razorpay accounts for payments
- Resend account for email services

### Backend Setup
1. Navigate to the `backend` directory
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RESEND_API_KEY=your_resend_api_key
   ```
4. Start the server: `npm run server`

### Frontend (User) Setup
1. Navigate to `frontend/QuickPick`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Admin Panel Setup
1. Navigate to `Admin/quickpick-admin`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## API Endpoints

### User Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login
- `GET /api/user/username` - Get user profile (authenticated)

### Product Management
- `POST /api/product/addproduct` - Add new product (admin)
- `GET /api/product/listproducts` - List products with pagination
- `GET /api/product/productinfo` - Get product details
- `PUT /api/product/editproduct/:productId` - Update product (admin)
- `DELETE /api/product/deleteproduct/:productId` - Delete product

### Cart Operations
- `POST /api/cart/addtocart` - Add item to cart (authenticated)
- `POST /api/cart/updatecart` - Update cart item (authenticated)
- `GET /api/cart/getcart` - Get cart data (authenticated)

### Order Management
- `POST /api/order/placeorder` - Place new order (authenticated)
- `GET /api/order/yourorders` - Get user's orders (authenticated)
- `GET /api/order/allorders` - Get all orders (admin)
- `POST /api/order/shippingdetails` - Update shipping details (admin)
- `POST /api/order/stripePayment` - Process Stripe payment (authenticated)

### Dashboard Analytics
- `GET /api/dashboard/monthlyincome` - Monthly income data (admin)
- `GET /api/dashboard/totalincomeAndOrderStats` - Total revenue and order stats (admin)

### PDF Generation
- `GET /api/pdf/downloadinvoice/:orderId` - Download order invoice

## Security Features
- JWT-based authentication for users and admins
- Password hashing with bcrypt
- Input validation using Zod schemas
- CORS configuration for cross-origin requests
- Admin middleware for protected routes

## Payment Integration
- **Stripe**: Secure online payments with webhook support
- **Razorpay**: Indian payment gateway integration
- **COD**: Cash on delivery option

## File Upload and Storage
- **Multer**: Handles multipart form data for image uploads
- **Cloudinary**: Cloud-based image storage and optimization
- Automatic image resizing and format conversion

## Email Services
- **Resend**: Email notifications for orders and user communications

## Responsive Design
- Mobile-first approach using Tailwind CSS
- Radix UI components for accessibility
- Framer Motion for smooth animations

## Future Enhancements
- Real-time notifications using WebSockets
- Advanced analytics and reporting
- Multi-language support
- Wishlist functionality
- Product reviews and ratings
- Inventory management with low stock alerts
- Advanced search with Elasticsearch
- Mobile app development

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the ISC License.