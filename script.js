let model = null;
let stream = null;

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/TKDg2pMZf/";

const landmarks = {
  "AL MASMAK": {
    ar: "🏰 قصر المصمك\nمن أبرز المعالم التاريخية في مدينة الرياض.",
    en: "🏰 Al Masmak Palace\nOne of the most important historical landmarks in Riyadh.",
    fr: "🏰 Palais Al Masmak\nUn important monument historique de Riyad.",
    es: "🏰 Palacio Al Masmak\nUno de los monumentos históricos más importantes de Riad."
  },

  "DIRIYAH": {
    ar: "🏛️ الدرعية\nمدينة تاريخية مهمة في المملكة العربية السعودية.",
    en: "🏛️ Diriyah\nAn important historical city in Saudi Arabia.",
    fr: "🏛️ Diriyah\nUne ville historique importante d'Arabie saoudite.",
    es: "🏛️ Diriyah\nUna importante ciudad histórica de Arabia Saudita."
  },

  "AL HIJR": {
    ar: "🏜️ الحِجر\nموقع أثري شهير في منطقة العلا.",
    en: "🏜️ Al-Hijr\nA famous archaeological site in AlUla.",
    fr: "🏜️ Al-Hijr\nUn célèbre site archéologique à AlUla.",
    es: "🏜️ Al-Hijr\nUn famoso sitio arqueológico en AlUla."
  }
};


async function loadAI() {

  try {

    document.getElementById("result").innerText =
      "⏳ جاري تحميل الذكاء الاصطناعي...";

    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    document.getElementById("result").innerText =
      "✅ الذكاء الاصطناعي جاهز!";

    console.log("AI MODEL READY");

  } catch (error) {

    console.error("AI ERROR:", error);

    document.getElementById("result").innerText =
      "❌ تعذر تحميل الذكاء الاصطناعي";

  }
}


async function startCamera() {

  try {

    const video =
      document.getElementById("camera");

    stream =
      await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment"
          }
        },
        audio: false
      });

    video.srcObject = stream;

    await video.play();

    document.getElementById("cameraMessage").style.display =
      "none";

    loadAI();

  } catch (error) {

    console.error("CAMERA ERROR:", error);

    document.getElementById("result").innerText =
      "❌ لم نتمكن من تشغيل الكاميرا";

  }
}


async function takePhoto() {

  if (!model) {

    document.getElementById("result").innerText =
      "⏳ الذكاء الاصطناعي لم يكتمل تحميله بعد";

    return;

  }

  try {

    const video =
      document.getElementById("camera");

    const canvas =
      document.getElementById("photo");

    canvas.width =
      video.videoWidth;

    canvas.height =
      video.videoHeight;

    const context =
      canvas.getContext("2d");

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const predictions =
      await model.predict(canvas);

    let best =
      predictions[0];

    for (
      let i = 1;
      i < predictions.length;
      i++
    ) {

      if (
        predictions[i].probability >
        best.probability
      ) {

        best = predictions[i];

      }

    }

    const confidence =
      Math.round(
        best.probability * 100
      );

    if (confidence < 60) {

      document.getElementById("result").innerText =
        "❓ لم أتعرف على الأثر بثقة كافية";

      return;

    }

    showLandmark(
      best.className,
      confidence
    );

  } catch (error) {

    console.error("PREDICTION ERROR:", error);

    document.getElementById("result").innerText =
      "❌ حدث خطأ أثناء التعرف على الأثر";

  }

}


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
      "\nنسبة الثقة: " +
      confidence +
      "%";

    return;

  }

  document.getElementById("result").innerText =
    "✅ تم التعرف على الأثر\n" +
    "نسبة الثقة: " +
    confidence +
    "%\n\n" +
    landmark[language];

}


function changeLanguage() {

  document.getElementById("result").innerText =
    "🌍 تم تغيير اللغة";

}