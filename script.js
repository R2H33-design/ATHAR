let model = null;
let stream = null;
let classNames = [];
let currentLanguage = "ar";

const MODEL_URL = "./";

// ================================
// 🗺️ الخريطة
// ================================

let map = null;
let userMarker = null;
let landmarkMarkers = [];


// ================================
// ⭐ المواقع المكتشفة
// ================================

let discovered = [];

try {
    discovered = JSON.parse(
        localStorage.getItem("atharDiscovered") || "[]"
    );

    if (!Array.isArray(discovered)) {
        discovered = [];
    }

} catch (error) {
    console.log("LocalStorage error:", error);
    discovered = [];
}


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
            description: "قصر تاريخي في قلب مدينة الرياض، ويُعد من أبرز المعالم المرتبطة بتاريخ المملكة العربية السعودية.",
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
            location: "الدرعية، منطقة الرياض، المملكة العربية السعودية",
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
            location: "Diriyah, Riyadh Region, Saudi Arabia",
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
            location: "Diriyah, région de Riyad, Arabie saoudite",
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
            location: "Diriyah, región de Riad, Arabia Saudita",
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
// 📍 إحداثيات المواقع الأثرية
// ================================

const landmarkLocations = {

    "AL-MASMAK": {
        lat: 24.63121,
        lng: 46.71333
    },

    "AL-HIJR": {
        lat: 26.7915,
        lng: 37.9575
    },

    "AL-DIRIYAH": {
        lat: 24.73315,
        lng: 46.57274
    }
};


// ================================
// 🛍️ الأماكن القريبة من كل أثر
// ================================

const nearbyPlacesByLandmark = {

    "AL-HIJR": [

        {
            image: "images/alula-old-town-market.jpg",

            ar: {
                name: "سوق البلدة القديمة",
                description:
                    "سوق تراثي في البلدة القديمة بالعلا، يضم الحرف اليدوية والهدايا التذكارية والمتاجر والمقاهي والأطعمة المحلية."
            },

            en: {
                name: "Old Town Market Street",
                description:
                    "A heritage market in AlUla Old Town featuring local handicrafts, souvenirs, shops, cafés and local food."
            },

            fr: {
                name: "Marché de la vieille ville",
                description:
                    "Un marché patrimonial dans la vieille ville d'AlUla avec de l'artisanat local, des souvenirs, des boutiques et des cafés."
            },

            es: {
                name: "Mercado de la Ciudad Antigua",
                description:
                    "Un mercado tradicional en la Ciudad Antigua de AlUla con artesanías locales, recuerdos, tiendas y cafeterías."
            },

            lat: 26.6278647,
            lng: 37.9128202
        }

    ],


    "AL-MASMAK": [

        {
            image: "images/riyadh-traditional-market.jpg",

            ar: {
                name: "سوق الزل",
                description:
                    "سوق شعبي تراثي في الرياض يشتهر بالمنتجات التقليدية والحرف والأجواء الشعبية."
            },

            en: {
                name: "Souq Al-Zal",
                description:
                    "A traditional market in Riyadh known for heritage products, crafts and a traditional atmosphere."
            },

            fr: {
                name: "Souq Al-Zal",
                description:
                    "Un marché traditionnel de Riyad connu pour ses produits patrimoniaux, son artisanat et son ambiance traditionnelle."
            },

            es: {
                name: "Souq Al-Zal",
                description:
                    "Un mercado tradicional de Riad conocido por sus productos patrimoniales, artesanías y ambiente tradicional."
            },

            lat: 24.63121,
            lng: 46.71333
        }

    ],


    "AL-DIRIYAH": [

        {
            image: "images/diriyah-market.jpg",

            ar: {
                name: "منطقة الدرعية التراثية",
                description:
                    "منطقة تراثية في الدرعية يمكن للزوار فيها استكشاف المنتجات والحرف والأجواء النجدية."
            },

            en: {
                name: "Diriyah Heritage Area",
                description:
                    "A heritage area in Diriyah where visitors can explore local products, crafts and traditional Najdi atmosphere."
            },

            fr: {
                name: "Zone patrimoniale de Diriyah",
                description:
                    "Une zone patrimoniale de Diriyah où les visiteurs peuvent découvrir les produits, l'artisanat et l'ambiance traditionnelle du Najd."
            },

            es: {
                name: "Zona patrimonial de Diriyah",
                description:
                    "Una zona patrimonial de Diriyah donde los visitantes pueden descubrir productos, artesanías y el ambiente tradicional del Najd."
            },

            lat: 24.73315,
            lng: 46.57274
        }

    ]

};


// ================================
// 🔗 مطابقة أسماء AI
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

    if (
        name.includes("HIJR") ||
        name.includes("HJIR")
    ) {
        return "AL-HIJR";
    }

    if (name.includes("DIRIYAH")) {
        return "AL-DIRIYAH";
    }

    return null;
}


// ================================
// 🤖 تحميل AI
// ================================

async function loadAI() {

    const result =
        document.getElementById("result");

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

        const metadata =
            await response.json();

        classNames =
            metadata.labels;

        console.log("MODEL READY");
        console.log("Classes:", classNames);

        result.innerText =
            currentLanguage === "ar"
                ? "✅ الذكاء الاصطناعي جاهز!"
                : "✅ AI is ready!";

    } catch (error) {

        console.error("AI ERROR:", error);

        result.innerText =
            currentLanguage === "ar"
                ? "❌ تعذر تحميل الذكاء الاصطناعي."
                : "❌ Failed to load AI.";
    }
}


// ================================
// 📷 تشغيل الكاميرا
// ================================

async function startCamera() {

    const video =
        document.getElementById("camera");

    const result =
        document.getElementById("result");

    console.log("CAMERA BUTTON PRESSED");


    if (!video) {

        alert("❌ لم يتم العثور على عنصر الكاميرا.");

        return;
    }


    if (!navigator.mediaDevices) {

        result.innerText =
            "❌ المتصفح لا يدعم تشغيل الكاميرا.";

        return;
    }


    if (!navigator.mediaDevices.getUserMedia) {

        result.innerText =
            "❌ تشغيل الكاميرا غير متاح في هذا المتصفح.";

        return;
    }


    try {

        result.innerText =
            currentLanguage === "ar"
                ? "⏳ جاري تشغيل الكاميرا..."
                : "⏳ Starting camera...";


        if (stream) {

            stream.getTracks().forEach(
                track => track.stop()
            );

            stream = null;
        }


        stream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: {
                        ideal: "environment"
                    },

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    }
                },

                audio: false

            });


        console.log("CAMERA STREAM READY");


        video.srcObject =
            stream;


        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;


        try {

            await video.play();

        } catch (playError) {

            console.log(
                "Video play error:",
                playError
            );

        }


        const message =
            document.getElementById(
                "cameraMessage"
            );


        if (message) {

            message.innerHTML =
                currentLanguage === "ar"
                    ? "📷 الكاميرا تعمل الآن"
                    : "📷 Camera is working";

        }


        result.innerText =
            currentLanguage === "ar"
                ? "📷 الكاميرا جاهزة!"
                : "📷 Camera is ready!";


        if (!model) {
            await loadAI();
        }


    } catch (error) {

        console.error(
            "CAMERA ERROR:",
            error
        );


        let message =
            currentLanguage === "ar"
                ? "❌ تعذر تشغيل الكاميرا."
                : "❌ Could not access the camera.";


        if (error.name === "NotAllowedError") {

            message =
                currentLanguage === "ar"
                    ? "❌ تم رفض صلاحية الكاميرا. تأكدي من السماح للكاميرا لهذا الموقع."
                    : "❌ Camera permission was denied.";

        } else if (error.name === "NotFoundError") {

            message =
                currentLanguage === "ar"
                    ? "❌ لم يتم العثور على كاميرا."
                    : "❌ No camera was found.";

        } else if (error.name === "NotReadableError") {

            message =
                currentLanguage === "ar"
                    ? "❌ الكاميرا مستخدمة من تطبيق آخر."
                    : "❌ The camera is being used by another app.";

        } else if (error.name === "SecurityError") {

            message =
                currentLanguage === "ar"
                    ? "❌ المتصفح منع الوصول إلى الكاميرا."
                    : "❌ The browser blocked camera access.";
        }


        result.innerText =
            message;
    }
}


// ================================
// 📸 التقاط الصورة
// ================================

async function takePhoto() {

    if (!model) {

        document.getElementById(
            "result"
        ).innerText =

            currentLanguage === "ar"
                ? "⏳ انتظري حتى يكتمل تحميل الذكاء الاصطناعي."
                : "⏳ Please wait until the AI finishes loading.";

        return;
    }


    const video =
        document.getElementById("camera");

    const canvas =
        document.getElementById("photo");

    const result =
        document.getElementById("result");


    if (
        !video ||
        !video.videoWidth ||
        !video.videoHeight
    ) {

        result.innerText =

            currentLanguage === "ar"
                ? "❌ الكاميرا لم تصبح جاهزة بعد."
                : "❌ The camera is not ready yet.";

        return;
    }


    try {

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


        // ================================
        // 🤖 AI CODE
        // لم يتم تغيير طريقة النموذج
        // ================================

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


        const className =
            classNames[bestIndex];


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


        image.dispose();


        if (prediction.dispose) {
            prediction.dispose();
        }


        if (!landmarkKey) {

            result.innerText =

                currentLanguage === "ar"

                    ? "تم التعرف على الأثر، ولكن لم تتم إضافة معلوماته بعد."

                    : "The landmark was identified, but its information has not been added yet.";

            return;
        }


        saveDiscovered(
            landmarkKey
        );


        showInfo(
            landmarkKey
        );


    } catch (error) {

        console.error(
            "PREDICTION ERROR:",
            error
        );


        result.innerText =

            currentLanguage === "ar"

                ? "❌ حدث خطأ أثناء التعرف على الأثر."

                : "❌ An error occurred while identifying the landmark.";
    }
}


// ================================
// 🏛️ عرض المعلومات
// ================================

function showInfo(landmarkKey) {

    const result =
        document.getElementById("result");

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
                📍
                <strong>
                    ${info.location}
                </strong>
            </p>

            <p>
                ${info.description}
            </p>

            <p>
                <strong>
                    ${
                        currentLanguage === "ar"
                            ? "📖 القصة"
                            : currentLanguage === "en"
                                ? "📖 Story"
                                : currentLanguage === "fr"
                                    ? "📖 Histoire"
                                    : "📖 Historia"
                    }
                </strong>

                <br>

                ${info.story}

            </p>

            <p>
                <strong>
                    ${
                        currentLanguage === "ar"
                            ? "⭐ الأهمية"
                            : currentLanguage === "en"
                                ? "⭐ Importance"
                                : currentLanguage === "fr"
                                    ? "⭐ Importance"
                                    : "⭐ Importancia"
                    }
                </strong>

                <br>

                ${info.importance}

            </p>

            <p>
                <strong>
                    ${
                        currentLanguage === "ar"
                            ? "💡 معلومة"
                            : currentLanguage === "en"
                                ? "💡 Fact"
                                : currentLanguage === "fr"
                                    ? "💡 Fait"
                                    : "💡 Dato"
                    }
                </strong>

                <br>

                ${info.fact}

            </p>

            <button
                onclick="speakAll('${landmarkKey}')"
            >
                🔊
                ${
                    currentLanguage === "ar"
                        ? "استمع للمعلومات"
                        : currentLanguage === "en"
                            ? "Listen"
                            : currentLanguage === "fr"
                                ? "Écouter"
                                : "Escuchar"
                }
            </button>

            <p>
                ${info.details}
            </p>

            <a
                href="${info.source}"
                target="_blank"
                rel="noopener noreferrer"
            >
                🌐
                ${
                    currentLanguage === "ar"
                        ? "عرض تفاصيل أكثر"
                        : currentLanguage === "en"
                            ? "View more details"
                            : currentLanguage === "fr"
                                ? "Voir plus de détails"
                                : "Ver más detalles"
                }
            </a>

        </div>
    `;

    // عرض الأماكن القريبة من الأثر الذي تم اكتشافه
    renderNearbyPlaces(landmarkKey);
}


// ================================
// 🔊 الصوت
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


    window.speechSynthesis.speak(
        speech
    );
}


// ================================
// ⭐ حفظ الموقع
// ================================

function saveDiscovered(landmarkKey) {

    if (!landmarks[landmarkKey]) {
        return;
    }


    const alreadyDiscovered =
        discovered.some(
            item => item.key === landmarkKey
        );


    if (!alreadyDiscovered) {

        discovered.push({

            key: landmarkKey,

            date:
                new Date().toLocaleDateString(
                    "ar-SA"
                )

        });


        try {

            localStorage.setItem(
                "atharDiscovered",
                JSON.stringify(discovered)
            );

        } catch (error) {

            console.log(
                "Save error:",
                error
            );
        }
    }


    renderDiscovered();
    renderRemaining();


    if (map) {
        updateMapMarkers();
    }
}


// ================================
// ⭐ المواقع المكتشفة
// ================================

function renderDiscovered() {

    const container =
        document.getElementById(
            "discoveredList"
        );


    if (!container) {
        return;
    }


    if (discovered.length === 0) {

        container.innerHTML =
            currentLanguage === "ar"
                ? "لم تكتشفي أي موقع بعد."
                : currentLanguage === "en"
                    ? "No discovered landmarks yet."
                    : currentLanguage === "fr"
                        ? "Aucun site découvert."
                        : "Aún no hay sitios descubiertos.";

        return;
    }


    container.innerHTML =
        discovered.map(item => {

            const landmark =
                landmarks[item.key];


            if (!landmark) {
                return "";
            }


            const info =
                landmark[currentLanguage] ||
                landmark.ar;


            return `

                <div class="discovered-item">

                    <div class="discovered-star">
                        ⭐
                    </div>

                    <div class="discovered-name">

                        ${info.name}

                        <div class="discovered-date">
                            ${item.date}
                        </div>

                    </div>

                </div>

            `;

        }).join("");
}


// ================================
// 🧭 المواقع المتبقية للاستكشاف
// ================================

function renderRemaining() {

    const container =
        document.getElementById(
            "remainingPlaces"
        );


    if (!container) {
        return;
    }


    const allKeys = [
        "AL-MASMAK",
        "AL-HIJR",
        "AL-DIRIYAH"
    ];


    const remaining =
        allKeys.filter(
            key =>
                !discovered.some(
                    item => item.key === key
                )
        );


    if (remaining.length === 0) {

        container.innerHTML = `

            <div class="remaining-complete">

                🎉

                ${
                    currentLanguage === "ar"
                        ? "اكتشفتِ جميع المواقع!"
                        : currentLanguage === "en"
                            ? "You discovered all landmarks!"
                            : currentLanguage === "fr"
                                ? "Vous avez découvert tous les sites !"
                                : "¡Has descubierto todos los sitios!"
                }

            </div>

        `;

        return;
    }


    container.innerHTML =
        remaining.map(
            function(key) {

                const info =
                    landmarks[key][currentLanguage] ||
                    landmarks[key].ar;

                const location =
                    landmarkLocations[key];


                return `

                    <div class="remaining-item">

                        <div class="remaining-icon">
                            ${info.icon}
                        </div>

                        <div class="remaining-info">

                            <strong>
                                ${info.name}
                            </strong>

                            <span>
                                📍 ${info.location}
                            </span>

                        </div>

                        <button
                            onclick="
                                openLandmarkOnMap(
                                    '${key}'
                                )
                            "
                        >
                            📍
                            ${
                                currentLanguage === "ar"
                                    ? "الموقع"
                                    : currentLanguage === "en"
                                        ? "Location"
                                        : currentLanguage === "fr"
                                            ? "Emplacement"
                                            : "Ubicación"
                            }
                        </button>

                    </div>

                `;

            }
        ).join("");
}


// ================================
// 📍 فتح موقع أثر على الخريطة
// ================================

function openLandmarkOnMap(landmarkKey) {

    const location =
        landmarkLocations[landmarkKey];


    if (!location) {
        return;
    }


    if (!map) {
        initMap();
    }


    if (!map) {
        return;
    }


    map.setView(
        [
            location.lat,
            location.lng
        ],
        16
    );


    const element =
        document.getElementById("map");


    if (element) {

        element.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
}


// ================================
// 🗺️ فتح الخريطة
// ================================

function openExplore() {

    const mapElement =
        document.getElementById("map");


    if (!mapElement) {
        return;
    }


    if (!map) {

        if (typeof L === "undefined") {

            alert(
                currentLanguage === "ar"
                    ? "❌ لم يتم تحميل الخريطة."
                    : "❌ Map could not be loaded."
            );

            return;
        }


        initMap();
    }


    mapElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    setTimeout(
        function() {

            if (map) {
                map.invalidateSize();
            }

        },
        400
    );
}


// ================================
// 🗺️ إنشاء الخريطة
// ================================

function initMap() {

    if (map) {
        return;
    }


    if (typeof L === "undefined") {

        console.log(
            "Leaflet is not loaded."
        );

        return;
    }


    map =
        L.map("map").setView(
            [24.7136, 46.6753],
            6
        );


    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {
            maxZoom: 19,

            attribution:
                '&copy; OpenStreetMap contributors'
        }

    ).addTo(map);


    updateMapMarkers();

    renderDiscovered();

    renderRemaining();

    renderNearbyPlaces();
}


// ================================
// ⭐ علامات المواقع المكتشفة
// ================================

function updateMapMarkers() {

    if (!map) {
        return;
    }


    landmarkMarkers.forEach(
        function(marker) {

            map.removeLayer(marker);

        }
    );


    landmarkMarkers = [];


    discovered.forEach(
        function(item) {

            const location =
                landmarkLocations[item.key];


            const landmark =
                landmarks[item.key];


            if (!location || !landmark) {
                return;
            }


            const info =
                landmark[currentLanguage] ||
                landmark.ar;


            const marker =
                L.marker([
                    location.lat,
                    location.lng
                ]).addTo(map);


            marker.bindPopup(`

                <div style="text-align:center">

                    <strong>
                        ⭐ ${info.name}
                    </strong>

                    <br><br>

                    ${
                        currentLanguage === "ar"
                            ? "تم اكتشاف هذا الموقع"
                            : currentLanguage === "en"
                                ? "This landmark has been discovered"
                                : currentLanguage === "fr"
                                    ? "Ce site a été découvert"
                                    : "Este sitio ha sido descubierto"
                    }

                    <br><br>

                    <button
                        onclick="
                            goToPlace(
                                ${location.lat},
                                ${location.lng}
                            )
                        "
                        style="
                            margin:0;
                            padding:8px;
                            font-size:13px;
                        "
                    >
                        📍
                        ${
                            currentLanguage === "ar"
                                ? "اذهب إلى الموقع"
                                : currentLanguage === "en"
                                    ? "Go to location"
                                    : currentLanguage === "fr"
                                        ? "Voir l'emplacement"
                                        : "Ir a la ubicación"
                        }
                    </button>

                </div>

            `);


            landmarkMarkers.push(
                marker
            );

        }
    );
}


// ================================
// 📍 موقع المستخدم
// ================================

function locateUser() {

    if (!navigator.geolocation) {

        alert(
            currentLanguage === "ar"
                ? "❌ المتصفح لا يدعم تحديد الموقع."
                : "❌ Geolocation is not supported."
        );

        return;
    }


    if (!map) {
        initMap();
    }


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat =
                position.coords.latitude;

            const lng =
                position.coords.longitude;


            if (userMarker) {

                map.removeLayer(
                    userMarker
                );
            }


            userMarker =
                L.marker([
                    lat,
                    lng
                ]).addTo(map);


            userMarker.bindPopup(

                currentLanguage === "ar"
                    ? "📍 موقعك الحالي"
                    : currentLanguage === "en"
                        ? "📍 Your current location"
                        : currentLanguage === "fr"
                            ? "📍 Votre position actuelle"
                            : "📍 Tu ubicación actual"

            );


            userMarker.openPopup();


            map.setView(
                [lat, lng],
                13
            );

        },

        function(error) {

            console.log(
                "Location error:",
                error
            );


            alert(
                currentLanguage === "ar"
                    ? "❌ تعذر تحديد موقعك. تأكدي من السماح للموقع."
                    : "❌ Could not determine your location."
            );
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ================================
// 📍 الذهاب لموقع
// ================================

function goToPlace(lat, lng) {

    if (!map) {
        initMap();
    }


    if (!map) {
        return;
    }


    map.setView(
        [lat, lng],
        16
    );
}


// ================================
// 🛍️ عرض الأماكن القريبة
// ================================

function renderNearbyPlaces(landmarkKey) {

    const container =
        document.getElementById(
            "nearbyPlaces"
        );


    if (!container) {
        return;
    }


    const places =
        nearbyPlacesByLandmark[landmarkKey] || [];


    if (places.length === 0) {

        container.innerHTML =
            currentLanguage === "ar"
                ? "لا توجد أماكن قريبة مضافة لهذا الموقع."
                : currentLanguage === "en"
                    ? "No nearby places have been added for this landmark."
                    : currentLanguage === "fr"
                        ? "Aucun lieu à proximité n'a été ajouté."
                        : "No se han añadido lugares cercanos.";

        return;
    }


    container.innerHTML =
        places.map(
            function(place) {

                const info =
                    place[currentLanguage] ||
                    place.ar;


                return `

                    <div class="place-card">

                        <img
                            src="${place.image}"
                            alt="${info.name}"
                            style="
                                width:100%;
                                height:180px;
                                object-fit:cover;
                                border-radius:14px;
                            "
                        >

                        <h3>
                            🛍️ ${info.name}
                        </h3>

                        <p>
                            ${info.description}
                        </p>

                        <button
                            onclick="
                                goToPlace(
                                    ${place.lat},
                                    ${place.lng}
                                )
                            "
                        >
                            📍
                            ${
                                currentLanguage === "ar"
                                    ? "اذهب إلى الموقع"
                                    : currentLanguage === "en"
                                        ? "Go to location"
                                        : currentLanguage === "fr"
                                            ? "Voir l'emplacement"
                                            : "Ir a la ubicación"
                            }
                        </button>

                    </div>

                `;

            }
        ).join("");
}


// ================================
// 🌍 تغيير اللغة
// ================================

function changeLanguage() {

    const selector =
        document.getElementById(
            "language"
        );


    if (selector) {

        currentLanguage =
            selector.value;

    }


    renderDiscovered();

    renderRemaining();


    if (map) {

        updateMapMarkers();

    }
}


// ================================
// 🚀 تشغيل أزرار الصفحة
// ================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "ATHAR script loaded successfully"
        );


        const cameraButton =
            document.getElementById(
                "cameraButton"
            );


        if (cameraButton) {

            cameraButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    console.log(
                        "Camera button clicked"
                    );

                    startCamera();

                }
            );

        }


        const captureButton =
            document.getElementById(
                "captureButton"
            );


        if (captureButton) {

            captureButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    takePhoto();

                }
            );

        }


        const exploreButton =
            document.getElementById(
                "exploreButton"
            );


        if (exploreButton) {

            exploreButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    openExplore();

                }
            );

        }


        const locateButton =
            document.getElementById(
                "locateButton"
            );


        if (locateButton) {

            locateButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    locateUser();

                }
            );

        }


        renderDiscovered();

        renderRemaining();

    }
);