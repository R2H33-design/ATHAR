let model = null;
let stream = null;

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/TKDg2pMZf/";

async function loadAI() {
  try {
    document.getElementById("result").innerText =
      "⏳ جاري تحميل الذكاء الاصطناعي...";

    model = await tmImage.load(
  "https://teachablemachine.withgoogle.com/models/TKDg2pMZf/model.json",
  "https://teachablemachine.withgoogle.com/models/TKDg2pMZf/metadata.json"
);

    document.getElementById("result").innerText =
      "✅ الذكاء الاصطناعي جاهز!";
      
  } catch (error) {
    console.error(error);

    document.getElementById("result").innerText =
  "❌ خطأ: " + error.message;
}
async function loadAI() {
  try {
    document.getElementById("result").innerText =
      "⏳ جاري تحميل الذكاء الاصطناعي...";

    const modelURL =
      "https://teachablemachine.withgoogle.com/models/TKDg2pMZf/model.json";

    const metadataURL =
      "https://teachablemachine.withgoogle.com/models/TKDg2pMZf/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);

    document.getElementById("result").innerText =
      "✅ الذكاء الاصطناعي جاهز!";
      
  } catch (error) {
    console.error("AI ERROR:", error);

    document.getElementById("result").innerText =
      "❌ تعذر تحميل نموذج الذكاء الاصطناعي";
  }
}
      },
      audio: false
    });

    video.srcObject = stream;

    await video.play();

    document.getElementById("cameraMessage").style.display = "none";

    loadAI();

  } catch (error) {

    console.error(error);

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

  const video = document.getElementById("camera");
  const canvas = document.getElementById("photo");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  context.drawImage(
    video,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const predictions = await model.predict(canvas);

  let bestPrediction = predictions[0];

  for (let i = 1; i < predictions.length; i++) {

    if (
      predictions[i].probability >
      bestPrediction.probability
    ) {

      bestPrediction = predictions[i];

    }
  }

  const confidence =
    Math.round(bestPrediction.probability * 100);

  let name = bestPrediction.className;

  if (confidence < 60) {

    document.getElementById("result").innerText =
      "❓ لم أتعرف على الأثر بثقة كافية";

    return;
  }

  showLandmark(name, confidence);
}

function showLandmark(name, confidence) {

  const language =
    document.getElementById("language").value;

  let text = "";

  if (
    name.toLowerCase().includes("masmak") ||
    name.includes("مصمك")
  ) {

    if (language === "ar") {
      text =
        "🏰 قصر المصمك\n\n" +
        "من أبرز المعالم التاريخية في مدينة الرياض.";
    }

    else if (language === "en") {
      text =
        "🏰 Al Masmak Palace\n\n" +
        "One of the most important historical landmarks in Riyadh.";
    }

    else if (language === "fr") {
      text =
        "🏰 Palais Al Masmak\n\n" +
        "L'un des monuments historiques les plus importants de Riyad.";
    }

    else {
      text =
        "🏰 Palacio Al Masmak\n\n" +
        "Uno de los monumentos históricos más importantes de Riad.";
    }
  }

  else if (
    name.toLowerCase().includes("diriyah") ||
    name.includes("درعية")
  ) {

    if (language === "ar") {
      text =
        "🏛️ الدرعية\n\n" +
        "مدينة تاريخية مهمة في المملكة العربية السعودية.";
    }

    else if (language === "en") {
      text =
        "🏛️ Diriyah\n\n" +
        "An important historical city in Saudi Arabia.";
    }

    else if (language === "fr") {
      text =
        "🏛️ Diriyah\n\n" +
        "Une ville historique importante d'Arabie saoudite.";
    }

    else {
      text =
        "🏛️ Diriyah\n\n" +
        "Una importante ciudad histórica de Arabia Saudita.";
    }
  }

  else if (
    name.toLowerCase().includes("hijr") ||
    name.toLowerCase().includes("hegra") ||
    name.includes("حجر")
  ) {

    if (language === "ar") {
      text =
        "🏜️ الحِجر\n\n" +
        "موقع أثري شهير في منطقة العلا.";
    }

    else if (language === "en") {
      text =
        "🏜️ Al-Hijr\n\n" +
        "A famous archaeological site in AlUla.";
    }

    else if (language === "fr") {
      text =
        "🏜️ Al-Hijr\n\n" +
        "Un célèbre site archéologique à AlUla.";
    }

    else {
      text =
        "🏜️ Al-Hijr\n\n" +
        "Un famoso sitio arqueológico en AlUla.";
    }
  }

  else {

    text =
      "📍 " + name;
  }

  document.getElementById("result").innerText =
    "✅ تم التعرف على الأثر\n" +
    "نسبة الثقة: " + confidence + "%\n\n" +
    text;
}

function changeLanguage() {

  document.getElementById("result").innerText =
    "🌍 تم تغيير اللغة";
}