# LedgerAI — AI Invoice Automation

LedgerAI is a web-based invoice management application designed to simplify invoice handling, review workflows, and vendor management. It provides a centralized workspace where users can upload invoices, track their status, and manage invoice-related information.

## 🚀 Features

- **Dashboard:** View invoice statistics and workflow summaries.
- **User Authentication:** Register and log in using email and password.
- **Invoice Management:** Upload and view invoices.
- **Invoice Review:** Open invoices for review.
- **Supplier Portal:** Dedicated supplier-facing workspace.
- **Vendor Management:** Manage vendor-related workflows.
- **Settings:** Access workspace settings.
- **File Upload:** Supports PDF, PNG, and JPG/JPEG invoice files up to 10 MB.
- **Database Integration:** Store user accounts, sessions, and invoice metadata using SQLite.

> **Note:** This project is currently under development. Advanced AI-powered invoice extraction and automated reconciliation are planned enhancements and should not be considered implemented unless separately completed and tested.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- Multer

**Database**
- SQLite
- better-sqlite3

**Other Tools**
- Git and GitHub
- JavaScript (ES Modules)

## 📁 Project Structure

```text
INVOICE/
├── server.mjs
├── package.json
├── index.html
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    ├── data/
    ├── modals/
    ├── pages/
    └── utils/
        └── api.js
```

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Manender2716/INVOICE.git
cd INVOICE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

```bash
npm run dev
```

Open your browser and visit:

http://127.0.0.1:5173

Keep the terminal running while using the application.

### 4. Build for Production

```bash
npm run build
```

To start the production server after building:

```bash
npm start
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Check the current session |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/invoices` | Retrieve invoices |
| POST | `/api/invoices` | Upload an invoice |
| GET | `/api/uploads/:invoiceId` | Retrieve an uploaded invoice file |

Invoice endpoints require authentication.

## 📄 Supported Invoice Files

- PDF
- PNG
- JPG/JPEG

**Maximum file size:** 10 MB

## 🔐 Security

- Passwords are hashed using Node.js cryptographic functions.
- Authentication uses HTTP-only session cookies.
- SQLite stores user and invoice records.
- Uploaded files are handled by the backend.

For production use, additional security testing, HTTPS, access controls, backups, and upload validation should be reviewed.

## 🗺️ Roadmap

- [ ] Complete and test authentication workflows.
- [ ] Improve invoice review and approval workflows.
- [ ] Develop vendor management features.
- [ ] Build Purchase Orders and Reports modules.
- [ ] Integrate AI-powered invoice data extraction.
- [ ] Add duplicate invoice detection.
- [ ] Implement invoice-to-purchase-order matching.
- [ ] Develop automated reconciliation.
- [ ] Add testing and production deployment support.

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Submit a pull request.

## 📌 Project Status

**Status:** In Development

LedgerAI aims to make invoice workflows more organized and efficient through a centralized invoice management platform.

## 👨‍💻 Author

**Manender Rathore**

GitHub: [@Manender2716](https://github.com/Manender2716)

---

⭐ If you find this project interesting, consider giving the repository a star!
