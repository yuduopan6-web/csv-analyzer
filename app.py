from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import pandas as pd

app = FastAPI()

# 允许跨域（前后端通信）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 静态文件（前端）
app.mount("/static", StaticFiles(directory="./frontend"), name="static")

# 首页（打开网页）
@app.get("/")
def read_index():
    return FileResponse("./frontend/index.html")


# CSV 分析接口
@app.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    try:
        # 读取 CSV
        df = pd.read_csv(file.file)

        # 基本信息
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
        return {"error": str(e)}