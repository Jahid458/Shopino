#  Shopino  Shopping Marketplace

Shopino is a shopping marketplace built for people who believe everyday objects should bring joy. We curate bold, beautiful products from independent makers and trusted brands — all in one playful place.

---

##  Live Demo

- **Live Site:** [https://shopino.vercel.app](https://shopino.vercel.app)
- **GitHub Repo:** [https://github.com/Jahid458/Shopino](https://github.com/Jahid458/Shopino)

---

##  Key Features

-  **Firebase Authentication** — Email/password login & register, Google OAuth sign-in
-  **Protected Routes** — Add & Manage Products pages accessible only when logged in
-  **Product Listing** — Browse 6+ products in a responsive grid layout
-  **Search & Filter** — Filter products by category, price, rating, and more
-  **Product Detail Page** — Dynamic route with full product info and related items
-  **Add Product** — Form with title, description, price, image URL, and toast feedback
-  **Manage Products** — Table/grid view with View and Delete actions
-  **User Dropdown Navbar** — Shows logged-in user info with Add/Manage shortcuts


---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js v18+
- npm or yarn
- A Firebase project (for authentication)

### 1. Clone the Repository

```bash
git clone https://github.com/Jahid458/Shopino.git
cd Shopino
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Firebase

Create a `.env.local` file in the root directory and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> You can find these values in your Firebase Console under **Project Settings → General → Your Apps**.

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

---


---

## 🧱 Tech Stack

| Technology | Usage |
|------------|-------|

| [Next.js 14] | App Router, SSR, dynamic routes |
| [Firebase](https://firebase.google.com/) |
| [Tailwind CSS](https://tailwindcss.com/) |
| Styling and responsive design |
| [React Context API](https://react.dev/) | 
| [Vercel](https://vercel.com/) | Deployment and hosting |

---

## 📂 Project Structure

```
shopino/
├── app/
│   ├── page.jsx              # Landing page (/)
│   ├── about/
│   │   └── page.jsx          # About page (/about)
│   ├── login/
│   │   └── page.jsx          # Login page (/login)
│   ├── register/
│   │   └── page.jsx          # Register page (/register)
│   └── products/
│       ├── page.jsx          # Products listing (/products)
│       ├── add/
│       │   └── page.jsx      # Add product — protected (/products/add)
│       ├── manage/
│       │   └── page.jsx      # Manage products — protected (/products/manage)
│       └── [id]/
│           └── page.jsx      # Product detail (/products/[id])
├── components/               # Reusable UI components (Navbar, Footer, Cards, etc.)
├── context/
│   └── AuthContext.jsx       # Firebase auth state provider
├── firebase/
│   └── firebase.config.js    # Firebase initialization
├── public/                   # Static assets
├── .env.local                # Environment variables (not committed)
└── README.md
```

---

## 🔒 Authentication Flow

1. User registers or logs in via `/login`
2. Firebase returns a user object stored in `AuthContext`
3. Protected pages check auth state — unauthenticated users are redirected to `/login`
4. After login, users are redirected to the homepage `/`
5. Navbar updates to show user info dropdown with Add Product and Manage Products links





