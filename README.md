# Salary Prediction AI (FastAPI + React)

An intelligent web application that predicts employee salaries using **Machine Learning**, built with a **FastAPI backend** and a **React frontend**.  
It analyzes various employee attributes — such as education, experience, and performance — to predict salary range and growth potential.

---

## 🚀 Features

✅ **AI-Powered Salary Prediction** — Predict salaries based on demographic and professional factors.  
✅ **Employee Clustering** — Groups employees into performance clusters for HR analytics.  
✅ **Interactive Frontend** — Clean and responsive form-based UI.  
✅ **Fast Backend API** — Real-time predictions with FastAPI.  
✅ **Easy Integration** — Modular design for scaling and deployment.

---

### Screenshots:

Home Page
<img width="1909" height="926" alt="Screenshot 2025-10-21 160813" src="https://github.com/user-attachments/assets/2fafb988-e961-46d5-ac4e-326d3141b59b" />

Employee Form
<img width="1909" height="918" alt="Screenshot 2025-10-21 160850" src="https://github.com/user-attachments/assets/bb6dd58e-700f-448f-8599-8363985b6f75" />

Predication
<img width="1910" height="921" alt="Screenshot 2025-10-21 161252" src="https://github.com/user-attachments/assets/b28f5c29-a9ea-4aec-bc1e-0af190f328dc" />



## 🧠 Tech Stack

### **Frontend**
- ⚛️ React (Vite or Create React App)
- 🎨 Tailwind CSS
- 🔄 Axios (API integration)

### **Backend**
- 🐍 FastAPI (Python 3.10+)
- 🧮 Scikit-learn
- 🧠 Joblib
- 🧰 Pandas, NumPy
- 🌐 Uvicorn

---

## 🗂️ Project Structure

```
salary-ai/
│
├── backend/
│ ├── main.py # FastAPI application
│ ├── models/ # Trained ML & preprocessor files
│ ├── routes/ # API routes
│ ├── utils/ # Helper functions
│ └── requirements.txt # Python dependencies
│
├── frontend/
│ ├── src/ # React components & logic
│ ├── public/ # Static assets
│ ├── package.json # Frontend dependencies
│ └── vite.config.js # Frontend build config
│
├── .gitignore
└── README.md
```


---

## ⚙️ Setup Instructions

### 🔹 1. Clone the Repository

```
git clone https://github.com/Prjhage/salary-ai.git
cd salary-ai
```

###  🔹 2. Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate     # On Windows
# OR
source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt
uvicorn main:app --reload
```
➡ Backend runs at: http://127.0.0.1:8000

###  🔹 3. Frontend Setup

Open another terminal and run:

```
cd frontend
npm install
npm run dev
```
➡ Frontend runs at: http://localhost:5173

###  🔹 4. Connect Frontend & Backend

Make sure both backend and frontend servers are running.

In the React code, ensure your API base URL is:

```
http://127.0.0.1:8000/predict/salary

```

###  🧩 Model Details

Model Type: Regression (e.g., RandomForestRegressor / XGBoost)

Feature Engineering: Encodes categorical variables, scales numeric ones

Cluster Model: K-Means (for grouping employee growth potential)

Output: Predicted salary + descriptive cluster label

###  🧰 Future Enhancements

🔹 Add authentication & HR dashboards

🔹 Export predictions as downloadable reports

🔹 Integrate with company HR databases

🔹 Deploy backend on Render / frontend on Vercel




