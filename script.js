// ========================================
// 🏛️ ATHAR - JavaScript
// AI Landmark Recognition
// ========================================

let model = null;
let stream = null;
let classNames = [];
let currentLanguage = "ar";

const MODEL_URL = "./";

// ========================================
// 🌍 اللغات
// ========================================

const languages = {
    ar: "🇸🇦 العربية",
    en: "🇬🇧 English",
    fr: "🇫🇷 Français",
    es: "🇪🇸 Español"
};

// ========================================
// 🏛️ معلومات الآثار
// ========================================

const landmarks = {

    // ========================================
    // 🏰 المصمك
    // ========================================

    "AL MASMAK": {

        ar: {
            name: "قصر المصمك",
            icon: "🏰",
            location: "الرياض، المملكة العربية السعودية",

            description:
                "قصر المصمك حصن تاريخي بارز في قلب مدينة الرياض، بُني من الطين واللبن، ويُعد من المعالم المرتبطة بتاريخ تأسيس المملكة العربية السعودية الحديثة.",

            story:
                "ارتبط قصر المصمك بحدث مهم في التاريخ السعودي؛ ففي عام 1902م استعاد الملك عبدالعزيز مدينة الرياض، وأصبح المصمك شاهدًا على مرحلة مفصلية في تاريخ المملكة.",

            importance:
                "تكمن أهمية المصمك في ارتباطه بتاريخ الرياض وبدايات توحيد المملكة، كما يعكس تصميمه ومواد بنائه طبيعة العمارة النجدية التقليدية.",

            fact:
                "يتميز القصر بعناصر دفاعية واضحة، منها الأبراج والجدران السميكة، كما يحتوي على بوابة تاريخية مرتبطة بأحداث استعادة الرياض.",

            details:
                "يتيح الموقع للزائر التعرف على تاريخ الرياض من خلال المبنى التاريخي والمعروضات والمعلومات التي توضح جوانب من الحياة والتراث في المنطقة.",

            source:
                "https://www.visitsaudi.com/ar/riyadh/attractions/al-masmak-palace-in-riyadh"
        },

        en: {
            name: "Al Masmak Palace",
            icon: "🏰",
            location: "Riyadh, Saudi Arabia",

            description:
                "Al Masmak Palace is a historic fortress in the heart of Riyadh. Built mainly from mud and traditional materials, it is closely connected to an important period in the history of modern Saudi Arabia.",

            story:
                "Al Masmak is associated with a major event in Saudi history. In 1902, King Abdulaziz recaptured Riyadh, and the fortress became a witness to an important stage in the formation and unification of Saudi Arabia.",

            importance:
                "The palace is important because of its connection to the history of Riyadh and the early stages of Saudi unification. Its design also reflects traditional Najdi architecture.",

            fact:
                "The fortress features defensive elements such as thick walls and towers, as well as a historic gate associated with the recapture of Riyadh.",

            details:
                "Today, visitors can explore the historical building, exhibits, and information that present aspects of Riyadh's history and traditional heritage.",

            source:
                "https://www.visitsaudi.com/en/see-do/destinations/riyadh/al-masmak-palace-in-riyadh"
        },

        fr: {
            name: "Palais Al Masmak",
            icon: "🏰",
            location: "Riyad, Arabie saoudite",

            description:
                "Le palais Al Masmak est une forteresse historique située au cœur de Riyad. Construit principalement avec de la terre et des matériaux traditionnels, il est lié à une période importante de l'histoire de l'Arabie saoudite moderne.",

            story:
                "Al Masmak est associé à un événement majeur de l'histoire saoudienne. En 1902, le roi Abdulaziz reprit Riyad, et la forteresse devint un témoin d'une étape importante de la formation et de l'unification de l'Arabie saoudite.",

            importance:
                "Le palais est important en raison de son lien avec l'histoire de Riyad et les premières étapes de l'unification du royaume. Son architecture reflète également le style traditionnel du Najd.",

            fact:
                "La forteresse possède des éléments défensifs tels que des murs épais et des tours, ainsi qu'une porte historique liée à la reprise de Riyad.",

            details:
                "Aujourd'hui, les visiteurs peuvent découvrir le bâtiment historique, les expositions et les informations présentant différents aspects de l'histoire et du patrimoine traditionnel de Riyad.",

            source:
                "https://www.visitsaudi.com/en/see-do/destinations/riyadh/al-masmak-palace-in-riyadh"
        },

        es: {
            name: "Palacio Al Masmak",
            icon: "🏰",
            location: "Riad, Arabia Saudita",

            description:
                "El Palacio Al Masmak es una fortaleza histórica situada en el corazón de Riad. Construido principalmente con barro y materiales tradicionales, está relacionado con un periodo importante de la historia de la Arabia Saudita moderna.",

            story:
                "Al Masmak está relacionado con un acontecimiento importante de la historia saudí. En 1902, el rey Abdulaziz recuperó Riad, y la fortaleza se convirtió en testigo de una etapa importante de la formación y unificación de Arabia Saudita.",

            importance:
                "El palacio es importante por su relación con la historia de Riad y las primeras etapas de la unificación del reino. Su diseño también refleja la arquitectura tradicional de Najd.",

            fact:
                "La fortaleza cuenta con elementos defensivos como muros gruesos y torres, además de una puerta histórica relacionada con la recuperación de Riad.",

            details:
                "Hoy, los visitantes pueden conocer el edificio histórico, sus exposiciones y la información relacionada con la historia y el patrimonio tradicional de Riad.",

            source:
                "https://www.visitsaudi.com/en/see-do/destinations/riyadh/al-masmak-palace-in-riyadh"
        }
    },


    // ========================================
    // 🏺 الحِجر
    // ========================================

    "AL HIJR": {

        ar: {
            name: "الحِجر",
            icon: "🏜️",
            location: "العلا، المملكة العربية السعودية",

            description:
                "الحِجر، المعروف أيضًا باسم مدائن صالح، موقع أثري بارز في منطقة العلا، ويشتهر بمقابره ومنشآته المنحوتة في الصخور وسط المناظر الطبيعية الصحراوية.",

            story:
                "كانت الحِجر محطة مهمة على طرق التجارة القديمة، وازدهرت فيها حضارة الأنباط. وتُظهر المقابر المنحوتة في الصخور مهارة كبيرة في التصميم والنحت والبناء.",

            importance:
                "تكمن أهمية الحِجر في قيمته التاريخية والأثرية، وفي كونه شاهدًا على تفاعل الحضارات القديمة مع طرق التجارة التي ربطت مناطق مختلفة من العالم.",

            fact:
                "تضم الحِجر مقابر ضخمة منحوتة مباشرة في الصخور، وتتميز واجهاتها بتفاصيل معمارية دقيقة تعكس مهارة الأنباط.",

            details:
                "يمنح الموقع الزائر فرصة للتعرف على الحضارة النبطية والطرق التجارية القديمة والعمارة الصخرية، مع مشاهدة آثار محفوظة داخل بيئة طبيعية مميزة في العلا.",

            source:
                "https://www.visitsaudi.com/en/destinations/alula"
        },

        en: {
            name: "Hegra",
            icon: "🏜️",
            location: "AlUla, Saudi Arabia",

            description:
                "Hegra, also known as Mada'in Salih, is a major archaeological site in AlUla, known for its monumental tombs and structures carved directly into the surrounding rock formations.",

            story:
                "Hegra was an important stop along ancient trade routes and flourished under the Nabataean civilization. Its rock-cut tombs demonstrate remarkable skill in design, carving, and construction.",

            importance:
                "Hegra is historically and archaeologically significant because it reflects the interaction of ancient civilizations with trade routes connecting different regions.",

            fact:
                "The site contains monumental tombs carved directly into the rock, with detailed façades that demonstrate the architectural skill of the Nabataeans.",

            details:
                "Visitors can learn about the Nabataean civilization, ancient trade routes, and rock-cut architecture while exploring a remarkable archaeological landscape in AlUla.",

            source:
                "https://www.visitsaudi.com/en/destinations/alula"
        },

        fr: {
            name: "Hégra",
            icon: "🏜️",
            location: "AlUla, Arabie saoudite",

            description:
                "Hégra, également connue sous le nom de Mada'in Salih, est un site archéologique majeur d'AlUla, célèbre pour ses tombes monumentales et ses structures taillées directement dans la roche.",

            story:
                "Hégra était une étape importante sur les anciennes routes commerciales et s'est développée sous la civilisation nabatéenne. Ses tombes rupestres témoignent d'une grande maîtrise de la conception et de la construction.",

            importance:
                "Hégra possède une grande importance historique et archéologique, car elle témoigne des échanges entre les civilisations anciennes et les routes commerciales.",

            fact:
                "Le site comprend des tombes monumentales taillées directement dans la roche, avec des façades richement détaillées.",

            details:
                "Les visiteurs peuvent découvrir la civilisation nabatéenne, les anciennes routes commerciales et l'architecture rupestre dans le paysage exceptionnel d'AlUla.",

            source:
                "https://www.visitsaudi.com/en/destinations/alula"
        },

        es: {
            name: "Hegra",
            icon: "🏜️",
            location: "AlUla, Arabia Saudita",

            description:
                "Hegra, también conocida como Mada'in Salih, es un importante sitio arqueológico de AlUla, famoso por sus tumbas monumentales y estructuras talladas directamente en la roca.",

            story:
                "Hegra fue una parada importante en las antiguas rutas comerciales y prosperó bajo la civilización nabatea. Sus tumbas excavadas en la roca muestran una notable habilidad arquitectónica.",

            importance:
                "Hegra tiene una gran importancia histórica y arqueológica porque refleja la interacción entre las antiguas civilizaciones y las rutas comerciales.",

            fact:
                "El sitio contiene tumbas monumentales talladas directamente en la roca, con fachadas detalladas que muestran la habilidad de los nabateos.",

            details:
                "Los visitantes pueden conocer la civilización nabatea, las antiguas rutas comerciales y la arquitectura excavada en la roca mientras exploran el paisaje arqueológico de AlUla.",

            source:
                "https://www.visitsaudi.com/en/destinations/alula"
        }
    },


    // ========================================
    // 🏘️ الدرعية
    // ========================================

    "DIRIYAH": {

        ar: {
            name: "الدرعية التاريخية",
            icon: "🏘️",
            location: "الرياض، المملكة العربية السعودية",

            description:
                "الدرعية التاريخية من أبرز المواقع التاريخية في المملكة، وتتميز بالعمارة النجدية التقليدية ومبانيها الطينية وأحيائها التاريخية.",

            story:
                "كانت الدرعية عاصمة الدولة السعودية الأولى ومركزًا سياسيًا وثقافيًا مهمًا. وارتبطت بتاريخ الدولة السعودية وتطورها، ولا تزال آثارها العمرانية تحكي جانبًا مهمًا من تاريخ المنطقة.",

            importance:
                "تكتسب الدرعية أهميتها من مكانتها في تاريخ الدولة السعودية ومن تراثها العمراني الذي يعكس أسلوب الحياة والعمارة في منطقة نجد.",

            fact:
                "تتميز مباني الدرعية التاريخية باستخدام الطين والمواد المحلية، مع تصميمات معمارية تتناسب مع البيئة والمناخ في المنطقة.",

            details:
                "يمكن للزائر استكشاف الأحياء والمباني التاريخية والتعرف على العمارة النجدية والتراث الثقافي المرتبط بالدرعية وتاريخ الدولة السعودية.",

            source:
                "https://www.visitsaudi.com/en/destinations/diriyah"
        },

        en: {
            name: "Historic Diriyah",
            icon: "🏘️",
            location: "Riyadh, Saudi Arabia",

            description:
                "Historic Diriyah is one of Saudi Arabia's important historical sites, known for its traditional Najdi architecture, mud buildings, and historic neighborhoods.",

            story:
                "Diriyah was the capital of the First Saudi State and an important political and cultural center. Its history is closely connected to the development of the Saudi state.",

            importance:
                "Diriyah is significant because of its role in Saudi history and its traditional urban heritage, which reflects life and architecture in the Najd region.",

            fact:
                "Historic buildings in Diriyah were constructed using mud and locally available materials, with architectural designs adapted to the local environment and climate.",

            details:
                "Visitors can explore historic neighborhoods and buildings while learning about traditional Najdi architecture, cultural heritage, and the history connected to Diriyah.",

            source:
                "https://www.visitsaudi.com/en/destinations/diriyah"
        },

        fr: {
            name: "Diriyah historique",
            icon: "🏘️",
            location: "Riyad, Arabie saoudite",

            description:
                "Diriyah historique est l'un des sites historiques importants d'Arabie saoudite. Elle est connue pour son architecture traditionnelle du Najd, ses bâtiments en terre et ses quartiers historiques.",

            story:
                "Diriyah était la capitale du premier État saoudien et un centre politique et culturel important. Son histoire est étroitement liée au développement de l'État saoudien.",

            importance:
                "Diriyah est importante en raison de son rôle dans l'histoire saoudienne et de son patrimoine urbain traditionnel qui reflète la vie et l'architecture de la région du Najd.",

            fact:
                "Les bâtiments historiques de Diriyah ont été construits avec de la terre et des matériaux locaux, selon une architecture adaptée à l'environnement et au climat de la région.",

            details:
                "Les visiteurs peuvent découvrir les quartiers et bâtiments historiques tout en apprenant davantage sur l'architecture traditionnelle du Najd et le patrimoine culturel de Diriyah.",

            source:
                "https://www.visitsaudi.com/en/destinations/diriyah"
        },

        es: {
            name: "Diriyah histórica",
            icon: "🏘️",
            location: "Riad, Arabia Saudita",

            description:
                "Diriyah histórica es uno de los sitios históricos importantes de Arabia Saudita, conocida por su arquitectura tradicional de Najd, sus edificios de barro y sus barrios históricos.",

            story:
                "Diriyah fue la capital del Primer Estado Saudí y un importante centro político y cultural. Su historia está estrechamente relacionada con el desarrollo del Estado saudí.",

            importance:
                "Diriyah es importante por su papel en la historia saudí y por su patrimonio urbano tradicional, que refleja la vida y la arquitectura de la región de Najd.",

            fact:
                "Los edificios históricos de Diriyah fueron construidos con barro y materiales locales, utilizando diseños adaptados al entorno y al clima de la región.",

            details:
                "Los visitantes pueden explorar barrios y edificios históricos mientras conocen la arquitectura tradicional de Najd y el patrimonio cultural relacionado con Diriyah.",

            source:
                "https://www.visitsaudi.com/en/destinations/diriyah"
        }
    }
};


// ========================================
// 🔎 مطابقة اسم الأثر
// ========================================

function findLandmarkKey(className) {

    if (!className) {
        return null;
    }

    const cleanName =
        className
            .trim()
            .toUpperCase()
            .replace(/_/g, " ");

    const keys =
        Object.keys(landmarks);

    return keys.find(key =>
        key.trim().toUpperCase() === cleanName
    ) || null;
}


// ========================================
// 🧠 تحميل نموذج الذكاء الاصطناعي
// ========================================

async function loadAI() {

    const result =
        document.getElementById("result");

    try {

        result.innerText =
            currentLanguage === "ar"
                ? "⏳ جاري تحميل الذكاء الاصطناعي..."
                : "⏳ Loading AI...";

        model =
            await tf.loadLayersModel(
                MODEL_URL + "model.json"
            );

        const response =
            await fetch(
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

        console.error(
            "AI ERROR:",
            error
        );

        result.innerText =
            "❌ " +
            (
                currentLanguage === "ar"
                    ? "تعذر تحميل نموذج الذكاء الاصطناعي"
                    : "AI model could not be loaded"
            ) +
            "\n\n" +
            error.message;
    }
}


// ========================================
// 📷 تشغيل الكاميرا
// ========================================

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

        video.srcObject =
            stream;

        await video.play();

        const message =
            document.getElementById(
                "cameraMessage"
            );

        if (message) {
            message.style.display =
                "none";
        }

        await loadAI();

    } catch (error) {

        console.error(
            "CAMERA ERROR:",
            error
        );

        document.getElementById(
            "result"
        ).innerText =
            currentLanguage === "ar"
                ? "❌ لم نتمكن من تشغيل الكاميرا"
                : "❌ We could not start the camera.";
    }
}


// ========================================
// 📸 التقاط الصورة + التعرف
// ========================================

async function takePhoto() {

    const result =
        document.getElementById("result");

    if (!model) {

        result.innerText =
            currentLanguage === "ar"
                ? "⏳ انتظري حتى يكتمل تحميل الذكاء الاصطناعي."
                : "⏳ Please wait until the AI finishes loading.";

        return;
    }

    try {

        const video =
            document.getElementById("camera");

        const canvas =
            document.getElementById("photo");

        if (
            !video.videoWidth ||
            !video.videoHeight
        ) {

            result.innerText =
                currentLanguage === "ar"
                    ? "❌ الكاميرا لم تصبح جاهزة بعد."
                    : "❌ The camera is not ready yet.";

            return;
        }

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

        result.innerText =
            currentLanguage === "ar"
                ? "🔎 جاري التعرف على الأثر..."
                : "🔎 Identifying the landmark...";

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
            "Probabilities:",
            probabilities
        );

        image.dispose();

        if (prediction.dispose) {
            prediction.dispose();
        }

        if (!landmarkKey) {

            result.innerHTML = `

                <div class="athar-result">

                    <h2>🏛️ ${className}</h2>

                    <p>
                        ${
                            currentLanguage === "ar"
                                ? "تم التعرف على الأثر، لكن لا توجد معلومات مضافة لهذا الموقع بعد."
                                : "The landmark was identified, but information has not been added yet."
                        }
                    </p>

                </div>

            `;

            return;
        }

        showInfo(landmarkKey);

    } catch (error) {

        console.error(
            "PREDICTION ERROR:",
            error
        );

        result.innerText =
            currentLanguage === "ar"
                ? "❌ حدث خطأ أثناء التعرف\n\n" +
                  error.message
                : "❌ An error occurred during recognition\n\n" +
                  error.message;
    }
}


// ========================================
// 📖 عرض معلومات الأثر
// ========================================

function showInfo(className) {

    const result =
        document.getElementById("result");

    const landmark =
        landmarks[className][currentLanguage];

    if (!landmark) {

        result.innerText =
            currentLanguage === "ar"
                ? "❌ لا توجد معلومات بهذه اللغة."
                : "❌ Information is not available in this language.";

        return;
    }

    const titles = {

        ar: {
            overview: "نبذة تاريخية",
            story: "القصة",
            importance: "الأهمية",
            fact: "معلومة مميزة",
            listen: "استمع إلى المعلومات",
            more: "عرض تفاصيل أكثر",
            source: "المعلومات والمصدر"
        },

        en: {
            overview: "Historical Overview",
            story: "The Story",
            importance: "Importance",
            fact: "Interesting Fact",
            listen: "Listen to the information",
            more: "View more details",
            source: "Information & Source"
        },

        fr: {
            overview: "Présentation historique",
            story: "L'histoire",
            importance: "Importance",
            fact: "Fait intéressant",
            listen: "Écouter les informations",
            more: "Voir plus de détails",
            source: "Informations et source"
        },

        es: {
            overview: "Descripción histórica",
            story: "La historia",
            importance: "Importancia",
            fact: "Dato interesante",
            listen: "Escuchar la información",
            more: "Ver más detalles",
            source: "Información y fuente"
        }
    };

    const text =
        titles[currentLanguage];

    result.innerHTML = `

        <div class="athar-result">

            <h2>
                ${landmark.icon}
                ${landmark.name}
            </h2>

            <p>
                📍 ${landmark.location}
            </p>

            <hr>

            <h3>
                ${text.overview}
            </h3>

            <p>
                ${landmark.description}
            </p>

            <h3>
                📖 ${text.story}
            </h3>

            <p>
                ${landmark.story}
            </p>

            <h3>
                ⭐ ${text.importance}
            </h3>

            <p>
                ${landmark.importance}
            </p>

            <h3>
                💡 ${text.fact}
            </h3>

            <p>
                ${landmark.fact}
            </p>

            <button
                onclick="speakAll('${className}')"
            >
                🔊 ${text.listen}
            </button>

            <details>

                <summary>
                    🔎 ${text.more}
                </summary>

                <p>
                    ${landmark.details}
                </p>

                <a
                    href="${landmark.source}"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="
                        display:inline-block;
                        margin-top:12px;
                        color:#641f35;
                        font-weight:bold;
                        text-decoration:none;
                    "
                >
                    🌐 ${text.source}
                </a>

            </details>

        </div>

    `;
}


// ========================================
// 🔊 القراءة الصوتية
// ========================================

function speakAll(className) {

    const landmark =
        landmarks[className][currentLanguage];

    if (!landmark) {
        return;
    }

    const text =
        landmark.name +
        ". " +
        landmark.location +
        ". " +
        landmark.description +
        " " +
        landmark.story +
        " " +
        landmark.importance +
        " " +
        landmark.fact;

    const voice =
        new SpeechSynthesisUtterance(text);

    const voiceLanguages = {

        ar: "ar-SA",
        en: "en-US",
        fr: "fr-FR",
        es: "es-ES"

    };

    voice.lang =
        voiceLanguages[currentLanguage];

    voice.rate = 0.9;
    voice.pitch = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(voice);
}


// ========================================
// 🌍 تغيير اللغة
// ========================================

function changeLanguage() {

    currentLanguage =
        document.getElementById(
            "language"
        ).value;

    const result =
        document.getElementById("result");

    result.innerHTML = `

        <h2>
            ${languages[currentLanguage]}
        </h2>

        <p>
            ${
                currentLanguage === "ar"
                    ? "وجّه الكاميرا نحو أحد الآثار التاريخية ثم اضغط التقاط الأثر."
                    : currentLanguage === "fr"
                        ? "Pointez la caméra vers un site historique et capturez-le."
                        : currentLanguage === "es"
                            ? "Apunta la cámara hacia un sitio histórico y captúralo."
                            : "Point your camera at a historical landmark and capture it."
            }
        </p>

    `;
}