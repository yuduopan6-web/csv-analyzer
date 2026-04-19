// 👉 改成你的线上地址（最关键）
const API_URL = "https://csv-analyzer-ike4.onrender.com";

const TEXT = {
  en: {title:"CSV Analyzer", btn:"Upload"},
  zh: {title:"CSV 分析", btn:"上传"},
  ko: {title:"CSV 분석", btn:"업로드"}
};

const lang = document.getElementById("lang");
const title = document.getElementById("title");
const btn = document.getElementById("btn");

lang.onchange = () => {
  const l = lang.value;
  title.innerText = TEXT[l].title;
  btn.innerText = TEXT[l].btn;
};

btn.onclick = async () => {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("请选择CSV文件");
    return;
  }

  const form = new FormData();
  form.append("file", file);

  try {
    const res = await fetch(API_URL + "/analyze/", {
      method: "POST",
      body: form
    });

    const data = await res.json();

    document.getElementById("result").innerText =
      JSON.stringify(data, null, 2);

  } catch (err) {
    document.getElementById("result").innerText =
      "请求失败：" + err;
  }
};