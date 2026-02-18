from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import traceback
import warnings
import io
import os
import sys
from joblib.numpy_pickle import load
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

warnings.filterwarnings("ignore")

# -------------------------------
# ✅ Define FullPreprocessor (for joblib)
# -------------------------------
class FullPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self, preprocessor=None):
        self.preprocessor = preprocessor or ColumnTransformer([])
    def fit(self, X, y=None):
        if hasattr(self.preprocessor, "fit"):
            self.preprocessor.fit(X, y)
        return self
    def transform(self, X):
        if hasattr(self.preprocessor, "transform"):
            return self.preprocessor.transform(X)
        return X

# Register for joblib
sys.modules['__main__'].FullPreprocessor = FullPreprocessor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# ✅ Model Loading
# -------------------------------
def safe_load_joblib(path):
    try:
        return joblib.load(path)
    except Exception:
        try:
            with open(path, "rb") as f:
                content = f.read()
            return load(io.BytesIO(content), mmap_mode=None)
        except Exception:
            return None

preprocessor = safe_load_joblib("models/preprocessor.joblib")
regression_model = safe_load_joblib("models/regression_model.joblib")
classifier_bundle = safe_load_joblib("models/classifier_model.joblib")
cluster_bundle = safe_load_joblib("models/cluster_model.joblib")

if classifier_bundle:
    classifier_model = classifier_bundle.get("model")
    le_cls = classifier_bundle.get("le")
else:
    classifier_model = le_cls = None

if cluster_bundle:
    cluster_scaler = cluster_bundle.get("scaler")
    kmeans = cluster_bundle.get("kmeans")
else:
    cluster_scaler = kmeans = None

# -------------------------------
# ✅ API Logic
# -------------------------------
class SalaryInput(BaseModel):
    Age: float
    Gender: str
    Education: str
    Field: str
    Department: str
    JobRole: str
    JobLevel: float
    YearsAtCompany: float
    TotalWorkingYears: float
    YearsInCurrentRole: float
    YearsSinceLastPromotion: float
    YearsWithCurrManager: float
    DistanceFromHome: float
    PercentSalaryHike: float
    PerformanceRating: float

@app.post("/api/predict/salary")
def predict_salary(data: SalaryInput):
    try:
        df = pd.DataFrame([data.dict()])
        df.rename(columns={"Field": "EducationField"}, inplace=True)
        
        education_map = {"Below College": 1, "College": 2, "Bachelor": 3, "Master": 4, "Doctor": 5}
        if "Education" in df.columns:
            df["Education"] = df["Education"].replace(education_map)

        X = preprocessor.transform(df)
        salary_pred = round(float(regression_model.predict(X)[0]) * 200, 2)

        salary_range = le_cls.inverse_transform(classifier_model.predict(X))[0] if classifier_model else "Unknown"

        cluster_description = "Unknown"
        if cluster_scaler and kmeans:
            cluster_df = pd.DataFrame([{"TotalWorkingYears": df["TotalWorkingYears"].iloc[0], "MonthlyIncome": salary_pred}])
            cluster_scaled = cluster_scaler.transform(cluster_df)
            cluster_label = int(kmeans.predict(cluster_scaled)[0])
            cluster_desc = {
                0: "Young, Mid-level, High Growth Potential",
                1: "Experienced, Senior-level, Stable Performer",
                2: "New Entrants, Low Experience, High Learning Opportunity"
            }
            cluster_description = cluster_desc.get(cluster_label, "Uncategorized")

        return {"predicted_salary": salary_pred, "salary_range": salary_range, "cluster_description": cluster_description}
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}

# -------------------------------
# ✅ Deployment serving
# -------------------------------
BUILD_PATH = "../frontend/build"

if os.path.exists(BUILD_PATH):
    app.mount("/static", StaticFiles(directory=os.path.join(BUILD_PATH, "static")), name="static")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = os.path.join(BUILD_PATH, full_path)
        if os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(BUILD_PATH, "index.html"))
else:
    @app.get("/")
    def read_root():
        return {"message": "API is live. Frontend build not found."}
