const API_URL = "http://127.0.0.1:8000"; // 先用本地测试

const TEXT = {
  en: {title:"Image Analyzer", btn:"Upload"},
  zh: {title:"图片分析", btn:"上传"},
  ko: {title:"이미지 분석", btn:"업로드"}
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
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(API_URL + "/analyze", {
    method: "POST",
    body: form
  });

  const data = await res.json();
  document.getElementById("result").innerText =
    JSON.stringify(data, null, 2);
};