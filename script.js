let model = null;
let stream = null;
let classNames = [];

const MODEL_URL = "./";

const landmarks = {
  "AL MASMAK": {
    ar: "🏰 قصر المصمك\nمن أبرز المعالم التاريخية في مدينة الرياض.",
    en: "🏰 Al Masmak Palace\nOne of the most important historical landmarks in Riyadh.",
    fr: "🏰 Palais Al Masmak\nUn important monument historique de Riyad.",
    es: "🏰 Palacio Al Masmak\nUno de los monumentos historiques de Riad."
  },

  "DIRIYAH": {
    ar: "🏛️ الدرعية\nمدينة تاريخية مهمة في المملكة العربية السعودية.",
    en: "🏛️ Diriyah\nAn important historical city in Saudi Arabia.",
    fr: "🏛️ Diriyah\nUne ville historique importante d’Arabie saoudite.",
    es: "🏛️ Diriyah\nUna importante ciudad histórica de Arabia Saudita."
  },

  "AL HIJR": {
    ar: "🏜️ الحِجر\nموقع أثري شهير في منطقة العلا.",
    en: "🏜️ Al-Hijr\nA famous archaeological site in AlUla.",
    fr: "🏜️ Al-Hijr\nUn célèbre site archéologique à AlUla.",
    es: "🏜️ Al-Hijr\nUn famoso sitio arqueológico de AlUla."
  }
};


// تحميل الذكاء الاصطناعي
async function loadAI() {
  const result = document.getElementById("result");

  try {
    result.innerText = "⏳ جاري تحميل الذكاء الاصطناعي...";

    model = await tf.loadLayersModel(
  MODEL_URL + "model.json"
);

    classNames = model.getClassLabels();

    console.log("MODEL READY");
    console.log("Classes:", classNames);

    result.innerText = "✅ الذكاء الاصطناعي جاهز!";
  }

  catch (error) {
    console.error("AI ERROR:", error);

    result.innerText =
      "❌ تعذر تحميل نموذج الذكاء الاصطناعي\n\n" +
      error.message;
  }
}


// تشغيل الكاميرا
async function startCamera() {
  try {
    const video = document.getElementById("camera");

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: {
          ideal: "environment"
        }
      },
      audio: false
    });

    video.srcObject = stream;

    await video.play();

    document.getElementById("cameraMessage").style.display = "none";

    await loadAI();
  }

  catch (error) {
    console.error("CAMERA ERROR:", error);

    document.getElementById("result").innerText =
      "❌ لم نتمكن من تشغيل الكاميرا";
  }
}


// التقاط الصورة والتعرف على الأثر
async function takePhoto() {
  const result = document.getElementById("result");

  if (!model) {
    result.innerText =
      "⏳ انتظري حتى يكتمل تحميل الذكاء الاصطناعي";
    return;
  }

  try {
    const video = document.getElementById("camera");

    result.innerText =
      "🔎 جاري التعرف على الأثر...";

    const predictions =
      await model.predict(video);

    console.log("Predictions:", predictions);

    let bestPrediction = predictions[0];

    for (let i = 1; i < predictions.length; i++) {
      if (
        predictions[i].probability >
        bestPrediction.probability
      ) {
        bestPrediction = predictions[i];
      }
    }

    const className =
      bestPrediction.className;

    const confidence =
      Math.round(
        bestPrediction.probability * 100
      );

    console.log(
      "Prediction:",
      className,
      confidence + "%"
    );

    if (confidence < 60) {
      result.innerText =
        "❓ لم أتعرف على الأثر بثقة كافية\n\n" +
        "نسبة الثقة: " +
        confidence +
        "%";
      return;
    }

    showLandmark(
      className,
      confidence
    );
  }

  catch (error) {
    console.error(
      "PREDICTION ERROR:",
      error
    );

    result.innerText =
      "❌ حدث خطأ أثناء التعرف\n\n" +
      error.message;
  }
}


// عرض معلومات الأثر
function showLandmark(
  className,
  confidence
) {
  const language =
    document.getElementById("language").value;

  const key =
    className.trim().toUpperCase();

  const landmark =
    landmarks[key];

  if (!landmark) {
    document.getElementById("result").innerText =
      "📍 تم التعرف على: " +
      className +
      "\n\n" +
      "🎯 نسبة الثقة: " +
      confidence +
      "%";

    return;
  }

  document.getElementById("result").innerText =
    "✅ تم التعرف على الأثر\n\n" +
    "📍 " +
    className +
    "\n" +
    "🎯 نسبة الثقة: " +
    confidence +
    "%\n\n" +
    landmark[language];
}


// تغيير اللغة
function changeLanguage() {
  document.getElementById("result").innerText =
    "🌍 تم تغيير اللغة";
}