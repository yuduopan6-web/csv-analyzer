from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源（最简单）
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    try:
        # 读取CSV
        df = pd.read_csv(file.file)

        # ====== 核心分析（来自你的Colab） ======
        rows, cols = df.shape

        num_cols = df.select_dtypes(include='number').columns.tolist()
        cat_cols = df.select_dtypes(include='object').columns.tolist()

        missing_total = int(df.isnull().sum().sum())

        # 前5行
        head_data = df.head().to_dict()

        result = {
            "行数": rows,
            "列数": cols,
            "数值列": num_cols,
            "分类列": cat_cols,
            "缺失值总数": missing_total,
            "前5行": head_data
        }

        return result

    except Exception as e:
        return {"error": str(e)}from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app.mount("/static", StaticFiles(directory="../frontend"), name="static")

@app.get("/")
def read_index():
    return FileResponse("../frontend/index.html")