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
        es: "🏜️ Al-Hijr\nUn famoso sitio arqueológico de AlUla."
    }
};


// ================================
// تحميل نموذج الذكاء الاصطناعي
// ================================

async function loadAI() {

    const result = document.getElementById("result");

    try {

        result.innerText =
            "⏳ جاري تحميل الذكاء الاصطناعي...";

        // تحميل model.json
        model = await tf.loadLayersModel(
            MODEL_URL + "model.json"
        );

        // تحميل metadata.json
        const response = await fetch(
            MODEL_URL + "metadata.json"
        );

        const metadata = await response.json();

        // أسماء المعالم
        classNames = metadata.labels;

        console.log("MODEL READY");
        console.log("Classes:", classNames);

        result.innerText =
            "✅ الذكاء الاصطناعي جاهز!";

    } catch (error) {

        console.error(
            "AI ERROR:",
            error
        );

        result.innerText =
            "❌ تعذر تحميل نموذج الذكاء الاصطناعي\n\n" +
            error.message;
    }
}


// ================================
// تشغيل الكاميرا
// ================================

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

        document.getElementById(
            "cameraMessage"
        ).style.display = "none";

        // تحميل النموذج
        await loadAI();

    } catch (error) {

        console.error(
            "CAMERA ERROR:",
            error
        );

        document.getElementById(
            "result"
        ).innerText =
            "❌ لم نتمكن من تشغيل الكاميرا";
    }
}


// ================================
// التعرف على الأثر
// ================================

async function takePhoto() {

    const result =
        document.getElementById("result");

    // التأكد من تحميل النموذج
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

        // التأكد من وجود صورة من الكاميرا
        if (
            !video.videoWidth ||
            !video.videoHeight
        ) {

            result.innerText =
                "❌ الكاميرا لم تصبح جاهزة بعد";

            return;
        }

        // تحديد حجم الصورة
        canvas.width =
            video.videoWidth;

        canvas.height =
            video.videoHeight;

        const context =
            canvas.getContext("2d");

        // التقاط الصورة
        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        result.innerText =
            "🔎 جاري التعرف على الأثر...";

        // تحويل الصورة إلى Tensor
        let image =
            tf.browser.fromPixels(canvas);

        // النموذج يتوقع 224 × 224
        image =
            tf.image.resizeBilinear(
                image,
                [224, 224]
            );

        // تجهيز الصورة
        image =
            image
                .toFloat()
                .div(127.5)
                .sub(1);

        // إضافة Batch
        image =
            image.expandDims(0);

        // التنبؤ
        const prediction =
            model.predict(image);

        // قراءة النتائج
        const probabilities =
            await prediction.data();

        // البحث عن أعلى احتمال
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

        // نسبة الثقة
        const confidence =
            Math.round(
                probabilities[bestIndex] * 100
            );

        // اسم المعلم
        const className =
            classNames[bestIndex];

        console.log(
            "Prediction:",
            className
        );

        console.log(
            "Confidence:",
            confidence + "%"
        );

        console.log(
            "All probabilities:",
            probabilities
        );

        // تنظيف الذاكرة
        image.dispose();

        if (
            prediction.dispose
        ) {
            prediction.dispose();
        }

        // ثقة منخفضة
        if (
            confidence < 60
        ) {

            result.innerText =
                "❓ لم أتعرف على الأثر بثقة كافية\n\n" +
                "نسبة الثقة: " +
                confidence +
                "%";

            return;
        }

        // عرض النتيجة
        showLandmark(
            className,
            confidence
        );

    } catch (error) {

        console.error(
            "PREDICTION ERROR:",
            error
        );

        result.innerText =
            "❌ حدث خطأ أثناء التعرف\n\n" +
            error.message;
    }
}


// ================================
// عرض معلومات المعلم
// ================================

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

    // إذا لم نجد معلومات المعلم
    if (!landmark) {

        document.getElementById(
            "result"
        ).innerText =

            "📍 تم التعرف على: " +
            className +
            "\n\n" +

            "🎯 نسبة الثقة: " +
            confidence +
            "%";

        return;
    }

    // عرض المعلومات
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


// ================================
// تغيير اللغة
// ================================

function changeLanguage() {

    document.getElementById(
        "result"
    ).innerText =
        "🌍 تم تغيير اللغة";
}