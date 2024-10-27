# Plan AI

Plan AI is a web application designed to help users plan affordable, detailed, and customized travel itineraries based on their preferences, budget, and travel requirements.


## Prerequisites

Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) and npm
- [Python 3.x](https://www.python.org/)
- [Git](https://git-scm.com/)

---

## Cloning the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/tanishakarmakar/Plan-AI.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Plan-AI
   ```

---

## Running the Backend

### 1. Set Up a Virtual Environment

Navigate to the backend directory:

```bash
cd backend
```

Create and activate a virtual environment:

- **Windows**:
  ```bash
  python -m venv venv
  .\venv\Scripts\activate
  ```

- **macOS/Linux**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

### 2. Install Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory and add the necessary configuration variables. (Groq-API key)

### 4. Run the Backend Server

Start the backend server using the Flask development server:

```bash
python run.py
```

Alternatively, use Gunicorn for production:

```bash
gunicorn run:app
```

The backend server should now be running on `http://localhost:5000`.

---

## Running the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install Dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables

   Create a `.env` file in the `frontend` directory to set up any necessary API keys and configurations.

4. Run the Frontend Development Server:

   ```bash
   npm start
   ```

The frontend server should now be running on `http://localhost:3000`.

---

## Accessing the Application

Once both servers are running:
- **Frontend**: Open [http://localhost:3000](http://localhost:3000) to view the frontend.
- **Backend**: Ensure that the backend API is accessible at [http://localhost:5000](http://localhost:5000).

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them to your forked repository:
   ```bash
   git push origin feature-name
   ```
4. Open a pull request.

---
