# =====================================
# main.py — Complete FastAPI Backend (Fixed)
# =====================================

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import traceback
import warnings
import io
from joblib.numpy_pickle import load
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer

warnings.filterwarnings("ignore")

# -------------------------------
# ✅ Define FullPreprocessor first (so joblib can find it)
# -------------------------------
class FullPreprocessor(BaseEstimator, TransformerMixin):
    """
    Dummy class used only to deserialize joblib pipeline objects
    that were saved with this class.
    """
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


# -------------------------------
# ✅ Initialize FastAPI app
# -------------------------------
app = FastAPI()

# ✅ CORS setup — allows React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for testing, allow all. You can later restrict this.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# ✅ Test route
# -------------------------------
@app.get("/")
def home():
    return {"message": "✅ Salary Prediction API is running!"}


# -------------------------------
# ✅ Safe model loading
# -------------------------------
def safe_load_joblib(path):
    """Tries normal joblib load; falls back to a safe pickle loader."""
    try:
        return joblib.load(path)
    except Exception as e:
        print(f"⚠️ Could not load {path}: {e}")
        try:
            with open(path, "rb") as f:
                content = f.read()
            return load(io.BytesIO(content), mmap_mode=None)
        except Exception as e2:
            print(f"❌ Model load failed: {e2}")
            return None


# -------------------------------
# ✅ Register FullPreprocessor for joblib deserialization
# -------------------------------
import sys
sys.modules['__main__'].FullPreprocessor = FullPreprocessor


# -------------------------------
# ✅ Load all models
# -------------------------------
preprocessor = safe_load_joblib("models/preprocessor.joblib")
regression_model = safe_load_joblib("models/regression_model.joblib")
classifier_bundle = safe_load_joblib("models/classifier_model.joblib")
cluster_bundle = safe_load_joblib("models/cluster_model.joblib")

# Unpack classifier + cluster bundles
if classifier_bundle:
    classifier_model = classifier_bundle.get("model", None)
    le_cls = classifier_bundle.get("le", None)
else:
    classifier_model = le_cls = None

if cluster_bundle:
    cluster_scaler = cluster_bundle.get("scaler", None)
    kmeans = cluster_bundle.get("kmeans", None)
else:
    cluster_scaler = kmeans = None

print("✅ Models loaded successfully!" if preprocessor and regression_model else "❌ Model loading failed.")
print(f"DEBUG: preprocessor loaded: {preprocessor is not None}")
print(f"DEBUG: regression_model loaded: {regression_model is not None}")
print(f"DEBUG: classifier_bundle loaded: {classifier_bundle is not None}")
print(f"DEBUG: cluster_bundle loaded: {cluster_bundle is not None}")
print(f"DEBUG: classifier_model: {classifier_model is not None}, le_cls: {le_cls is not None}")
print(f"DEBUG: cluster_scaler: {cluster_scaler is not None}, kmeans: {kmeans is not None}")


# -------------------------------
# ✅ Input schema for frontend
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


# -------------------------------
# ✅ Prediction route
# -------------------------------
@app.post("/predict/salary")
def predict_salary(data: SalaryInput):
    try:
        # Step 1 — Convert input to DataFrame
        df = pd.DataFrame([data.dict()])
        df.rename(columns={"Field": "EducationField"}, inplace=True)
        print("🔹 Incoming DataFrame:")
        print(df)

        # Step 2 — Map Education (text → numeric)
        education_map = {
            "Below College": 1,
            "College": 2,
            "Bachelor": 3,
            "Master": 4,
            "Doctor": 5
        }
        if "Education" in df.columns:
            df["Education"] = df["Education"].replace(education_map)

        print("🔹 Processed DataFrame (after mapping):")
        print(df)

        # Step 3 — Transform input
        X = preprocessor.transform(df)

        # Step 4 — Predict salary (regression)
        salary_pred = regression_model.predict(X)[0]
        salary_pred = round(float(salary_pred) * 200, 2)


        # Step 5 — Predict salary range (classification)
        if classifier_model and le_cls:
            y_cls = classifier_model.predict(X)[0]
            salary_range = le_cls.inverse_transform([y_cls])[0]
        else:
            salary_range = "Unknown"

                # Step 6 — Cluster logic (safe with original model)
        cluster_desc = {
            0: "Young, Mid-level, High Growth Potential",
            1: "Experienced, Senior-level, Stable Performer",
            2: "New Entrants, Low Experience, High Learning Opportunity"
        }

        cluster_description = "Unknown"  # Default

        if cluster_scaler and kmeans:
            # ✅ Use only the features that the cluster model was trained on
            cluster_df = pd.DataFrame([{
                "TotalWorkingYears": df["TotalWorkingYears"].iloc[0],
                "MonthlyIncome": salary_pred
            }])

            # Debugging info
            print("🔹 Cluster input features:", list(cluster_df.columns))

            # ✅ Transform using the existing scaler
            cluster_scaled = cluster_scaler.transform(cluster_df)

            # ✅ Predict cluster label
            cluster_label = int(kmeans.predict(cluster_scaled)[0])
            print(f"🔸 Cluster label: {cluster_label}")

            # ✅ Map cluster to description
            cluster_description = cluster_desc.get(cluster_label, "Uncategorized")
        else:
            cluster_description = "Unknown"


        # Step 7 — Return response
        return {
            "predicted_salary": salary_pred,
            "salary_range": salary_range,
            "cluster_description": cluster_description
        }

    except Exception as e:
        print("❌ Error during prediction:", str(e))
        traceback.print_exc()
        return {"error": str(e)}


# -------------------------------
# ✅ Run the app
# -------------------------------
# Run using: uvicorn main:app --reload --port 8000
