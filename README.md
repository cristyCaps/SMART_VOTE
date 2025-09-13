
# SmartVote 🗳️

**SmartVote: Online School Election System with Facial Recognition**

SmartVote is a **web-based voting system** made for school elections such as **SSG, college, and departmental elections**. It makes voting **safe, fair, and easy** by using **facial recognition** to verify voters and prevent multiple votes.

# Features

* 👤 **User Registration** – Role-based accounts for students and admins.
* 📅 **Election Management** – Create and manage election schedules.
* 🧑‍💻 **Facial Recognition** – Ensures one student can only vote once.
* 📊 **Live Vote Counting** – Real-time results with interactive charts.
* 📈 **Voting Statistics** – See voter turnout by course, department, and year level.
* 📑 **Reports** – Export official results to PDF.

# Tech Stack

* **Frontend:** React.js (Vite, Tailwind CSS)
* **Backend:** Node.js, 
* **Database:** HeidiSQL + Firebase

## Prerequisites

To utilize the full functionality of Web-based, the following component is necessary:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/cristyCaps/SMART_VOTE
    cd Smartvote_frontend
     cd Smartvote_backend
    ```

2.  **Install dependencies:**

    Install the necessary project dependencies using npm:

    ```bash
    npm install
    ```

3.  **Set up Heidisql:**

    Smartvote relies on heidisl for data storage and notifications.

--Download HeidiSQL: Go to the HeidiSQL website
and download the installer.
--Install HeidiSQL: Run the installer and follow the setup wizard until installation is complete.
--Open HeidiSQL: Launch the program. The Session Manager will appear on the left side.
--Create a New Session: Click New → Session to start a new database connection.
**Enter Connection Details:
--Hostname/IP: Use 127.0.0.1 or localhost for local, or your server’s IP/domain for remote.
--User: Enter your database username (e.g., root).
--Password: (leave blank if you didn’t set one in XAMPP/WAMP; otherwise type your MySQL password).
--Port: Default is 3306 for MySQL/MariaDB.
--Database: (Optional) specify a default database to connect to.
--Connect: Click Open. If successful, your databases will be listed on the left panel.
--Manage Data: Expand a database to view tables, run queries in the Query tab, or right-click to create new databases and tables

4. **Environment Variables (Optional but Recommended):**

  For secure handling of your database and email credentials, it’s recommended to use a .env file at the root of your project.

--Create .env file: Create a new file named .env in the root directory of your project.
--Add Credentials: Populate the .env file with your database and email credentials as shown in the example below. Replace values with your actual details.

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=smartvote
PORT=3000

# Email Configuration
EMAIL_USER=joshuacatapan2003@gmail.com
EMAIL_PASS=ihxz zgcn ktxk ykwk


## Usage

Once the application is installed and configured, you can run it in development mode and interact with its features.

1.  **Start the development server:**

    Open your terminal in the project root and execute the following command:

    ```bash
    cd Smartvote_frontend
    npm run dev
--for the backend to run your server and to fetch the API.
    cd Smartvote_backend
    npm run dev
    ```
  You can open the web using the provided link in the frontend like these  ➜  Local:   http://localhost:5173/

Architecture / How it Works

--SmartVote is built on a modular and scalable architecture, leveraging React.js for the frontend, Node.js for the backend, and MySQL (via HeidiSQL) for structured data management, with optional Firebase services for authentication and notifications.

--Frontend (React.js + Vite + Tailwind CSS):
The user interface and client-side logic are developed using React.js with Vite for fast builds and Tailwind CSS for styling. Components are structured for reusability, maintainability, and responsive design. The frontend communicates with the backend through RESTful APIs.

--Backend (Node.js + Express.js):
The backend provides REST APIs for user authentication, voting operations, candidate management, and results computation. Controllers manage the request/response cycle, while models handle database interactions.

--Database (MySQL via HeidiSQL):
HeidiSQL is used as the client for managing a MySQL database that stores user information, candidates, votes, and results. The relational structure ensures integrity and supports efficient queries.

-- Services (Nodemailer):
Configured with environment variables, the system sends email confirmations, reminders, and administrative messages through secure SMTP integration.

##Project Structure

The project follows a standard React.js (Vite) + Node.js architecture, promoting modularity and ease of development:

├── Smartvote_backend/          # Backend server (Node.js + Express)
│   ├── src/                    # Core backend source code
│   │   ├── config/             # Configuration files (DB connection, Firebase, environment setup)
│   │   ├── controllers/        # Route controllers handling API requests/responses
│   │   ├── models/             # Database models and schema definitions
│   │   ├── routes/             # Express route definitions
│   │   └── utils/              # Helper utilities (mailer, token handlers, etc.)
│   ├── server.js               # Entry point of the backend server
│   ├── .env                    # Environment variables (DB, Email, API keys)
│   ├── package.json            # Backend dependencies and scripts
│   └── README.md               # Backend documentation

├── Smartvote_frontend/         # Frontend client (React.js + Vite + Tailwind CSS)
│   ├── public/                 # Static files accessible to the browser
│   │   ├── models/             # Pre-defined assets or sample data models
│   │   └── vite.svg            # Vite logo asset
│   ├── src/                    # Main frontend source code
│   │   ├── components/         # Reusable React UI components
│   │   ├── pages/              # Page-level components (Home, Login, Dashboard, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API calls to backend (Axios, Firebase)
│   │   ├── styles/             # Tailwind/global styles
│   │   └── utils/              # Utility functions (formatters, helpers)
│   ├── index.html              # Root HTML file
│   ├── vite.config.js          # Vite build configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── package.json            # Frontend dependencies and scripts
│   └── README.md               # Frontend documentation

├── .gitignore                  # Ignored files for Git version control
└── README.md                   # Main project documentation
