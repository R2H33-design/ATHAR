let model = null;
let stream = null;
let classNames = [];
let currentLanguage = "ar";

const MODEL_URL = "./";

// ================================
// 🌍 اللغات
// ================================

const languages = {
    ar: "🇸🇦 العربية",
    en: "🇬🇧 English",
    fr: "🇫🇷 Français",
    es: "🇪🇸 Español"
};

// ================================
// 🏛️ معلومات المواقع
// ================================

const landmarks = {

    "AL-MASMAK": {
        ar: {
            name: "قصر المصمك",
            icon: "🏰",
            location: "الرياض، المملكة العربية السعودية",
            description: "قصر تاريخي في قلب مدينة الرياض، ويُعد من أبرز المعالم المرتبطة بتاريخ تأسيس المملكة العربية السعودية.",
            story: "شهد قصر المصمك أحداثًا مهمة في تاريخ توحيد المملكة، وأصبح اليوم معلمًا تراثيًا يعرّف الزوار بتاريخ الرياض والمملكة.",
            importance: "يمثل المصمك جزءًا مهمًا من التراث والتاريخ السعودي.",
            fact: "بُني المصمك من الطين واللبن والحجارة، ويتميز بأبراجه وجدرانه السميكة.",
            details: "يمكن للزوار التعرف على تاريخ القصر ومشاهدة تفاصيله المعمارية والتراثية.",
            source: "https://www.visitsaudi.com/ar/riyadh/attractions/al-masmak-palace-in-riyadh"
        },

        en: {
            name: "Al Masmak Palace",
            icon: "🏰",
            location: "Riyadh, Saudi Arabia",
            description: "A historic palace in the heart of Riyadh and one of the most important landmarks connected to the history of Saudi Arabia.",
            story: "Al Masmak witnessed important events in the history of the unification of Saudi Arabia and is now a heritage landmark that introduces visitors to the history of Riyadh and the Kingdom.",
            importance: "Al Masmak represents an important part of Saudi history and heritage.",
            fact: "The palace was built using mud, clay and stone, and is known for its thick walls and towers.",
            details: "Visitors can explore the history of the palace and discover its traditional architectural details.",
            source: "https://www.visitsaudi.com/en/see-do/destinations/riyadh/al-masmak-palace-in-riyadh"
        },

        fr: {
            name: "Palais Al Masmak",
            icon: "🏰",
            location: "Riyad, Arabie saoudite",
            description: "Un palais historique situé au cœur de Riyad et l'un des monuments les plus importants liés à l'histoire de l'Arabie saoudite.",
            story: "Al Masmak a été témoin d'événements importants de l'histoire de l'unification de l'Arabie saoudite.",
            importance: "Al Masmak représente une partie importante du patrimoine et de l'histoire saoudienne.",
            fact: "Le palais a été construit avec de la boue, de l'argile et de la pierre.",
            details: "Les visiteurs peuvent découvrir l'histoire du palais et son architecture traditionnelle.",
            source: "https://www.visitsaudi.com/en/see-do/destinations/riyadh/al-masmak-palace-in-riyadh"
        },

        es: {
            name: "Palacio Al Masmak",
            icon: "🏰",
            location: "Riad, Arabia Saudita",
            description: "Un palacio histórico situado en el corazón de Riad y uno de los monumentos más importantes relacionados con la historia de Arabia Saudita.",
            story: "Al Masmak fue testigo de acontecimientos importantes de la historia de la unificación de Arabia Saudita.",
            importance: "Al Masmak representa una parte importante del patrimonio y la historia saudí.",
            fact: "El palacio fue construido con barro, arcilla y piedra.",
            details: "Los visitantes pueden conocer la historia del palacio y descubrir su arquitectura tradicional.",
            source: "https://www.visitsaudi.com/en/see-do/destinations/riyadh/al-masmak-palace-in-riyadh"
        }
    },


    "AL-HIJR": {
        ar: {
            name: "الحِجر",
            icon: "🏜️",
            location: "العلا، المملكة العربية السعودية",
            description: "موقع أثري شهير في منطقة العلا، ويُعد من أهم المواقع التاريخية في المملكة العربية السعودية.",
            story: "يضم الحِجر مقابر ومنشآت منحوتة في الصخور، ويعكس تاريخ الحضارات القديمة التي عاشت في المنطقة.",
            importance: "يُعد الحِجر أول موقع سعودي أُدرج ضمن قائمة التراث العالمي لليونسكو.",
            fact: "يشتهر الحِجر بواجهاته الصخرية المنحوتة والمقابر القديمة.",
            details: "يمكن للزوار استكشاف المواقع الأثرية والمناظر الطبيعية والتعرف على تاريخ المنطقة.",
            source: "https://www.visitsaudi.com/en/destinations/alula"
        },

        en: {
            name: "Hegra",
            icon: "🏜️",
            location: "AlUla, Saudi Arabia",
            description: "A famous archaeological site in AlUla and one of the most important historical sites in Saudi Arabia.",
            story: "Hegra contains ancient tombs and structures carved into the rocks, reflecting the history of civilizations that lived in the region.",
            importance: "Hegra is the first Saudi site to be listed as a UNESCO World Heritage Site.",
            fact: "Hegra is famous for its rock-cut facades and ancient tombs.",
            details: "Visitors can explore archaeological sites, landscapes and learn about the history of the region.",
            source: "https://www.visitsaudi.com/en/destinations/alula"
        },

        fr: {
            name: "Hégra",
            icon: "🏜️",
            location: "AlUla, Arabie saoudite",
            description: "Un célèbre site archéologique d'AlUla et l'un des sites historiques les plus importants d'Arabie saoudite.",
            story: "Hégra abrite des tombes et des structures anciennes sculptées dans la roche.",
            importance: "Hégra est le premier site saoudien inscrit au patrimoine mondial de l'UNESCO.",
            fact: "Hégra est célèbre pour ses façades rocheuses sculptées et ses tombes anciennes.",
            details: "Les visiteurs peuvent explorer les sites archéologiques et découvrir l'histoire de la région.",
            source: "https://www.visitsaudi.com/en/destinations/alula"
        },

        es: {
            name: "Hegra",
            icon: "🏜️",
            location: "AlUla, Arabia Saudita",
            description: "Un famoso sitio arqueológico de AlUla y uno de los lugares históricos más importantes de Arabia Saudita.",
            story: "Hegra contiene tumbas y estructuras antiguas talladas en las rocas.",
            importance: "Hegra es el primer sitio saudí incluido en la lista del Patrimonio Mundial de la UNESCO.",
            fact: "Hegra es famosa por sus fachadas rocosas talladas y sus antiguas tumbas.",
            details: "Los visitantes pueden explorar los sitios arqueológicos y conocer la historia de la región.",
            source: "https://www.visitsaudi.com/en/destinations/alula"
        }
    },


    "AL-DIRIYAH": {
        ar: {
            name: "الدرعية التاريخية",
            icon: "🏘️",
            location: "الرياض، المملكة العربية السعودية",
            description: "مدينة تاريخية تُعد من أهم المواقع التراثية في المملكة العربية السعودية.",
            story: "كانت الدرعية عاصمة الدولة السعودية الأولى، وتتميز بمبانيها الطينية وحي الطريف التاريخي.",
            importance: "تمثل الدرعية جزءًا مهمًا من تاريخ الدولة السعودية وتراثها الثقافي.",
            fact: "أُدرج حي الطريف في الدرعية ضمن قائمة التراث العالمي لليونسكو.",
            details: "يمكن للزوار استكشاف المباني التراثية والأحياء التاريخية والتعرف على تاريخ الدرعية.",
            source: "https://www.visitsaudi.com/en/destinations/diriyah"
        },

        en: {
            name: "Historic Diriyah",
            icon: "🏘️",
            location: "Riyadh, Saudi Arabia",
            description: "A historic city and one of the most important heritage sites in Saudi Arabia.",
            story: "Diriyah was the capital of the First Saudi State and is known for its traditional mud-brick buildings and At-Turaif district.",
            importance: "Diriyah represents an important part of Saudi history and cultural heritage.",
            fact: "The At-Turaif district in Diriyah is listed as a UNESCO World Heritage Site.",
            details: "Visitors can explore heritage buildings, historic neighborhoods and learn about Diriyah's history.",
            source: "https://www.visitsaudi.com/en/destinations/diriyah"
        },

        fr: {
            name: "Diriyah historique",
            icon: "🏘️",
            location: "Riyad, Arabie saoudite",
            description: "Une ville historique et l'un des sites patrimoniaux les plus importants d'Arabie saoudite.",
            story: "Diriyah était la capitale du premier État saoudien et est connue pour ses bâtiments traditionnels en briques de terre.",
            importance: "Diriyah représente une partie importante de l'histoire et du patrimoine culturel saoudiens.",
            fact: "Le quartier d'At-Turaif à Diriyah est inscrit au patrimoine mondial de l'UNESCO.",
            details: "Les visiteurs peuvent explorer les bâtiments historiques et découvrir l'histoire de Diriyah.",
            source: "https://www.visitsaudi.com/en/destinations/diriyah"
        },

        es: {
            name: "Diriyah histórica",
            icon: "🏘️",
            location: "Riad, Arabia Saudita",
            description: "Una ciudad histórica y uno de los sitios patrimoniales más importantes de Arabia Saudita.",
            story: "Diriyah fue la capital del Primer Estado Saudí y es conocida por sus edificios tradicionales de adobe.",
            importance: "Diriyah representa una parte importante de la historia y el patrimonio cultural saudí.",
            fact: "El distrito de At-Turaif en Diriyah está incluido en la lista del Patrimonio Mundial de la UNESCO.",
            details: "Los visitantes pueden explorar los edificios históricos y conocer la historia de Diriyah.",
            source: "https://www.visitsaudi.com/en/destinations/diriyah"
        }
    }
};


// ================================
// 🔗 مطابقة أسماء الذكاء الاصطناعي
// ================================

function findLandmarkKey(className) {

    if (!className) {
        return null;
    }

    const name = className
        .toUpperCase()
        .trim()
        .replace(/_/g, "-")
        .replace(/\s+/g, "-");

    if (name.includes("MASMAK")) {
        return "AL-MASMAK";
    }

    if (name.includes("HIJR") || name.includes("HJIR")) {
        return "AL-HIJR";
    }

    if (name.includes("DIRIYAH")) {
        return "AL-DIRIYAH";
    }

    return null;
}
}


// ================================
// 🤖 تحميل الذكاء الاصطناعي
// ================================

async function loadAI() {

    const result = document.getElementById("result");

    try {

        result.innerText =
            currentLanguage === "ar"
                ? "⏳ جاري تحميل الذكاء الاصطناعي..."
                : "⏳ Loading AI...";

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

        result.innerText =
            currentLanguage === "ar"
                ? "✅ الذكاء الاصطناعي جاهز!"
                : "✅ AI is ready!";

    } catch (error) {

        console.error(error);

        result.innerText =
            currentLanguage === "ar"
                ? "❌ تعذر تحميل الذكاء الاصطناعي."
                : "❌ Failed to load AI.";

    }
}


// ================================
// 📷 فتح الكاميرا
// ================================

async function startCamera() {

    const video = document.getElementById("camera");
    const result = document.getElementById("result");

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        video.srcObject = stream;

        await video.play();

        result.innerText =
            currentLanguage === "ar"
                ? "📷 الكاميرا جاهزة!"
                : "📷 Camera is ready!";

        if (!model) {
            await loadAI();
        }

    } catch (error) {

        console.error(error);

        result.innerText =
            currentLanguage === "ar"
                ? "❌ تعذر تشغيل الكاميرا."
                : "❌ Could not access the camera.";

    }
}


// ================================
// 📸 التقاط الصورة والتعرف
// ================================

async function takePhoto() {

    if (!model) {

        document.getElementById("result").innerText =
            currentLanguage === "ar"
                ? "⏳ انتظري حتى يكتمل تحميل الذكاء الاصطناعي."
                : "⏳ Please wait until the AI finishes loading.";

        return;
    }

    const video = document.getElementById("camera");
    const canvas = document.getElementById("photo");
    const result = document.getElementById("result");

    if (!video.videoWidth || !video.videoHeight) {

        result.innerText =
            currentLanguage === "ar"
                ? "❌ الكاميرا لم تصبح جاهزة بعد."
                : "❌ The camera is not ready yet.";

        return;
    }

    try {

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


        // ================================
        // 🤖 معالجة الصورة
        // ================================

        let image = tf.browser.fromPixels(canvas);

        image = tf.image.resizeBilinear(
            image,
            [224, 224]
        );

        image = image
            .toFloat()
            .div(127.5)
            .sub(1);

        image = image.expandDims(0);


        // ================================
        // 🔎 التنبؤ
        // ================================

        const prediction = model.predict(image);

        const probabilities = await prediction.data();

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


        // ================================
        // 🏷️ اسم التصنيف
        // ================================

        const className = classNames[bestIndex];

        const landmarkKey =
            findLandmarkKey(className);


        console.log(
            "Detected landmark:",
            className
        );

        console.log(
            "Matched landmark:",
            landmarkKey
        );

        console.log(
            "Confidence:",
            probabilities[bestIndex]
        );


        // ================================
        // 🧹 تنظيف Tensor
        // ================================

        image.dispose();

        if (prediction.dispose) {
            prediction.dispose();
        }


        // ================================
        // 📍 التحقق من الموقع
        // ================================

        if (!landmarkKey) {

            result.innerText =
                currentLanguage === "ar"
                    ? "تم التعرف على الأثر، ولكن لم تتم إضافة معلوماته بعد."
                    : "The landmark was identified, but its information has not been added yet.";

            return;
        }


        // ================================
        // 📖 عرض المعلومات
        // ================================

        showInfo(landmarkKey);

    } catch (error) {

        console.error(error);

        result.innerText =
            currentLanguage === "ar"
                ? "❌ حدث خطأ أثناء التعرف على الأثر."
                : "❌ An error occurred while identifying the landmark.";

    }
}


// ================================
// 📖 عرض معلومات الموقع
// ================================

function showInfo(landmarkKey) {

    const result = document.getElementById("result");

    const landmark =
        landmarks[landmarkKey];

    if (!landmark) {

        result.innerText =
            currentLanguage === "ar"
                ? "لا توجد معلومات لهذا الموقع."
                : "No information is available for this site.";

        return;
    }

    const info =
        landmark[currentLanguage] ||
        landmark.ar;


    result.innerHTML = `

        <div class="landmark-info">

            <h2>
                ${info.icon}
                ${info.name}
            </h2>

            <p>
                📍 <strong>
                ${info.location}
                </strong>
            </p>

            <p>
                ${info.description}
            </p>

            <p>
                <strong>
                ${currentLanguage === "ar" ? "📖 القصة" : "📖 Story"}
                </strong><br>
                ${info.story}
            </p>

            <p>
                <strong>
                ${currentLanguage === "ar" ? "⭐ الأهمية" : "⭐ Importance"}
                </strong><br>
                ${info.importance}
            </p>

            <p>
                <strong>
                ${currentLanguage === "ar" ? "💡 معلومة" : "💡 Fact"}
                </strong><br>
                ${info.fact}
            </p>

            <button onclick="speakAll('${landmarkKey}')">
                🔊 ${currentLanguage === "ar" ? "استمع للمعلومات" : "Listen"}
            </button>

            <p>
                ${info.details}
            </p>

            <a
                href="${info.source}"
                target="_blank"
                rel="noopener noreferrer"
            >
                🌐 ${
                    currentLanguage === "ar"
                        ? "عرض تفاصيل أكثر"
                        : "View more details"
                }
            </a>

        </div>
    `;
}


// ================================
// 🔊 قراءة المعلومات صوتيًا
// ================================

function speakAll(landmarkKey) {

    const landmark =
        landmarks[landmarkKey];

    if (!landmark) {
        return;
    }

    const info =
        landmark[currentLanguage] ||
        landmark.ar;

    window.speechSynthesis.cancel();

    const text = `
        ${info.name}.
        ${info.location}.
        ${info.description}.
        ${info.story}.
        ${info.importance}.
        ${info.fact}.
        ${info.details}.
    `;

    const speech =
        new SpeechSynthesisUtterance(text);

    if (currentLanguage === "ar") {
        speech.lang = "ar-SA";
    }

    if (currentLanguage === "en") {
        speech.lang = "en-US";
    }

    if (currentLanguage === "fr") {
        speech.lang = "fr-FR";
    }

    if (currentLanguage === "es") {
        speech.lang = "es-ES";
    }

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}


// ================================
// 🌍 تغيير اللغة
// ================================

function changeLanguage() {

    const selector =
        document.getElementById("language");

    if (selector) {
        currentLanguage = selector.value;
    }

    console.log(
        "Language:",
        currentLanguage
    );
}