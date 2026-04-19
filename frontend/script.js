const API_URL = "https://csv-analyzer-ike4.onrender.com";

const TEXT = {
  en: { title: "CSV Analyzer", btn: "Upload" },
  zh: { title: "CSV 分析", btn: "上传" },
  ko: { title: "CSV 분석", btn: "업로드" }
};

const lang = document.getElementById("lang");
const title = document.getElementById("title");
const btn = document.getElementById("btn");
const resultDiv = document.getElementById("result");

lang.onchange = () => {
  const l = lang.value;
  title.innerText = TEXT[l].title;
  btn.innerText = TEXT[l].btn;
};

btn.onclick = async () => {
  const fileInput = document.getElementById("fileInput");

  if (!fileInput.files.length) {
    alert("请选择CSV文件");
    return;
  }

  const form = new FormData();
  form.append("file", fileInput.files[0]);

  resultDiv.innerText = "上传中...";

  try {
    const res = await fetch(API_URL + "/analyze", {
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