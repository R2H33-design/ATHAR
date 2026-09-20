let model = null;
let stream = null;
let classNames = [];

const MODEL_URL = "./";

const landmarks = {
  "AL MASMAK": {
    ar: "🏰 قصر المصمك\nمن أبرز المعالم التاريخية في مدينة الرياض.",
    en: "🏰 Al Masmak Palace\nOne of the most important historical landmarks in Riyadh.",
    fr: "🏰 Palais Al Masmak\nUn important monument historique de Riyad.",
    es: "🏰 Palacio Al Masmak\nUno de los monumentos históricos de Riad."
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
    es: "🏜️ Al-Hijr\nUn famoso sitio arqueológico en AlUla."
  }
};


// تحميل نموذج الذكاء الاصطناعي
async function loadAI() {
  const result = document.getElementById("result");

  try {
    result.innerText = "⏳ جاري تحميل الذكاء الاصطناعي...";

    model = await tf.loadLayersModel(
      MODEL_URL + "model.json"
    );

    const response = await fetch(
      MODEL_URL + "metadata.json"
    );

    const metadata = await response.json();

    classNames = metadata.labels;

    console.log("MODEL READY");
    console.log("Classes:", classNames);

    result.innerText = "✅ الذكاء الاصطناعي جاهز!";
  }

  catch (error) {
    console.error("AI ERROR:", error);

    result.innerText =
      "❌ تعذر تحميل الذكاء الاصطناعي\n\n" +
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

    document.getElementById(
      "cameraMessage"
    ).style.display = "none";

    loadAI();

  }

  catch (error) {

    console.error("CAMERA ERROR:", error);

    document.getElementById(
      "result"
    ).innerText =
      "❌ لم نتمكن من تشغيل الكاميرا";
  }
}


// التقاط الصورة والتعرف على الأثر
async function takePhoto() {

  const result =
    document.getElementById("result");

  if (!model) {

    result.innerText =
      "⏳ انتظري حتى يكتمل تحميل الذكاء الاصطناعي";

    return;
  }

  try {

    const video =
      document.getElementById("camera");

    const canvas =
      document.getElementById("photo");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context =
      canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    result.innerText =
      "🔎 جاري التعرف على الأثر...";

    let image =
      tf.browser.fromPixels(canvas);

    image =
      tf.image.resizeBilinear(
        image,
        [224, 224]
      );

    image =
      image
        .toFloat()
        .div(127.5)
        .sub(1);

    image =
      image.expandDims(0);

    const prediction =
      model.predict(image);

    const probabilities =
      await prediction.data();

    let bestIndex = 0;

    for (
      let i = 1;
      i < probabilities.length;
      i++
    ) {

      if (
        probabilities[i] >
        probabilities[bestIndex]
      ) {
        bestIndex = i;
      }
    }

    const confidence =
      Math.round(
        probabilities[bestIndex] * 100
      );

    const className =
      classNames[bestIndex];

    image.dispose();
    prediction.dispose();

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
    document.getElementById(
      "language"
    ).value;

  const key =
    className
      .trim()
      .toUpperCase();

  const landmark =
    landmarks[key];

  if (!landmark) {

    document.getElementById(
      "result"
    ).innerText =
      "📍 تم التعرف على: " +
      className +
      "\n\nنسبة الثقة: " +
      confidence +
      "%";

    return;
  }

  document.getElementById(
    "result"
  ).innerText =

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

  document.getElementById(
    "result"
  ).innerText =
    "🌍 تم تغيير اللغة";
}