const API_URL = "https://csv-analyzer-ike4.onrender.com";

const TEXT = {
  en: { title: "CSV Analyzer", btn: "Upload", loading: "Uploading..." },
  zh: { title: "CSV数据分析", btn: "上传分析", loading: "上传中..." },
  ko: { title: "CSV 분석", btn: "업로드", loading: "업로드 중..." }
};

const lang = document.getElementById("lang");
const title = document.getElementById("title");
const btn = document.getElementById("btn");
const resultDiv = document.getElementById("result");

// 🌐 语言切换
lang.onchange = () => {
  const l = lang.value;
  title.innerText = TEXT[l].title;
  btn.innerText = TEXT[l].btn;
};

// 🚀 上传逻辑
btn.onclick = async () => {
  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) {
    alert("请选择CSV文件");
    return;
  }

  const form = new FormData();
  form.append("file", fileInput.files[0]);

  const l = lang.value;
  resultDiv.innerText = TEXT[l].loading;

  try {
    const res = await fetch(API_URL + "/analyze/", {
      method: "POST",
      body: form
    });

    if (!res.ok) {
      throw new Error("状态码：" + res.status);
    }

    const data = await res.json();

    resultDiv.innerText = JSON.stringify(data, null, 2);

  } catch (err) {
    resultDiv.innerText = "请求失败：" + err.message;
  }
};