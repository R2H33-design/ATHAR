
let model = null;
let stream = null;
let classNames = [];
let currentLanguage = "ar";
const MODEL_URL = "./";

let map = null;
let userMarker = null;
let landmarkMarkers = [];
let currentLandmarkKey = null;

// مفتاح جديد للمواقع التي تضيفينها بنفسك بالنجمة.
// لا يحذف بيانات النسخة السابقة من المتصفح.
let discovered = JSON.parse(
    localStorage.getItem("atharDiscoveredManual_v1") || "[]"
);

const languages = {
    ar: "العربية",
    en: "English",
    fr: "Français",
    es: "Español"
};

const uiText = {
    ar: {
        heroTitle: "اكتشف تاريخ الآثار من خلال كامرتك",
        heroDescription: "تعرّف على المواقع التاريخية في المملكة، واكتشف قصصها وأهميتها، واستكشف الأماكن التراثية القريبة منها.",
        cameraHeading: "اكتشف أثرًا",
        cameraPlaceholder: "افتح الكاميرا ووجّهها نحو الأثر",
        openCamera: "📷 فتح الكاميرا",
        capture: "📸 التقاط الأثر",
        addFavorite: "إضافة للمكتشفات",
        saved: "تمت الإضافة للمكتشفات",
        loading: "جارٍ تحميل نموذج الذكاء الاصطناعي...",
        ready: "جاهز! افتح الكاميرا للتعرّف على الآثار.",
        cameraStarted: "الكاميرا جاهزة. وجّهها نحو الأثر ثم التقط الصورة.",
        cameraError: "تعذّر تشغيل الكاميرا. تأكد من السماح للموقع باستخدامها.",
        loadingAI: "انتظري حتى يكتمل تحميل نموذج التعرّف.",
        aiError: "تعذّر تحميل نموذج التعرّف. تأكدي من ملفات النموذج في GitHub.",
        captureError: "تعذّر التقاط الصورة. حاولي مرة أخرى.",
        notRecognized: "لم نتمكن من مطابقة الصورة مع أحد المواقع المسجلة. حاولي تصوير الأثر بوضوح أكبر.",
        discoveredHeading: "المواقع المكتشفة",
        remainingHeading: "المواقع المتبقية للاستكشاف",
        mapHeading: "الخريطة واستكشف حولك",
        explore: "🧭 استكشف حولك",
        locate: "📍 تحديد موقعي",
        nearbyHeading: "الأماكن القريبة",
        nearbyEmpty: "اكتشفي أثرًا أولًا لعرض الأماكن القريبة منه.",
        noDiscovered: "لم تضيفي أي موقع إلى المكتشفات بعد. اضغطي ⭐ بعد التعرّف على الأثر لإضافته.",
        noRemaining: "رائع! اكتشفتِ جميع المواقع الثلاثة.",
        viewMap: "عرض على الخريطة",
        source: "المصدر الرسمي",
        listen: "🔊 استمعي للمعلومات",
        stop: "⏹️ إيقاف الصوت",
        locationDenied: "تعذّر تحديد موقعك. تحققي من أذونات الموقع في جهازك.",
        locating: "جارٍ تحديد موقعك...",
        locationReady: "تم تحديد موقعك على الخريطة.",
        mapReady: "الخريطة جاهزة.",
        alreadySaved: "هذا الموقع موجود بالفعل في المكتشفات.",
        infoTitle: "معلومات الأثر",
        story: "القصة التاريخية",
        importance: "الأهمية التاريخية",
        fact: "معلومة مميزة",
        details: "تفاصيل إضافية",
        location: "الموقع",
        marketTitle: "سوق تراثي في المنطقة",
        marketLocation: "الموقع",
        goTo: "📍 عرض الموقع",
        footer: "ATHAR — رحلة لاكتشاف التراث السعودي",
        removed: "الموقع غير موجود في المكتشفات.",
        noNearby: "لا توجد معلومات قريبة معروضة حاليًا.",
        savedLocation: "أُضيف الموقع إلى مكتشفاتك."
    },
    en: {
        heroTitle: "Discover history through your camera",
        heroDescription: "Explore Saudi Arabia's historic landmarks, learn their stories, and discover nearby heritage places.",
        cameraHeading: "Discover a landmark",
        cameraPlaceholder: "Open the camera and point it at a landmark",
        openCamera: "📷 Open Camera",
        capture: "📸 Capture Landmark",
        addFavorite: "Add to Discovered",
        saved: "Added to Discovered",
        loading: "Loading the AI model...",
        ready: "Ready! Open the camera to recognize landmarks.",
        cameraStarted: "Camera ready. Point it at a landmark and capture a photo.",
        cameraError: "Could not start the camera. Please allow camera access.",
        loadingAI: "Please wait for the recognition model to load.",
        aiError: "Could not load the recognition model. Check the model files on GitHub.",
        captureError: "Could not capture the image. Please try again.",
        notRecognized: "We couldn't match this image to a registered landmark. Try taking a clearer photo.",
        discoveredHeading: "Discovered Landmarks",
        remainingHeading: "Landmarks Left to Explore",
        mapHeading: "Map & Explore Nearby",
        explore: "🧭 Explore Nearby",
        locate: "📍 Locate Me",
        nearbyHeading: "Nearby Places",
        nearbyEmpty: "Recognize a landmark first to see nearby places.",
        noDiscovered: "You haven't added any landmarks yet. Press ⭐ after recognition to add one.",
        noRemaining: "Great! You have discovered all three landmarks.",
        viewMap: "View on Map",
        source: "Official Source",
        listen: "🔊 Listen to Information",
        stop: "⏹️ Stop Audio",
        locationDenied: "Could not find your location. Check your device location permissions.",
        locating: "Finding your location...",
        locationReady: "Your location has been added to the map.",
        mapReady: "Map ready.",
        alreadySaved: "This landmark is already in your discovered list.",
        infoTitle: "Landmark Information",
        story: "Historical Story",
        importance: "Historical Significance",
        fact: "Interesting Fact",
        details: "More Details",
        location: "Location",
        marketTitle: "Heritage Market in the Area",
        marketLocation: "Location",
        goTo: "📍 View Location",
        footer: "ATHAR — A Journey into Saudi Heritage",
        removed: "This landmark is not in your discovered list.",
        noNearby: "No nearby information is currently available.",
        savedLocation: "Landmark added to your discovered list."
    },
    fr: {
        heroTitle: "Découvrez l'histoire grâce à votre caméra",
        heroDescription: "Explorez les sites historiques d'Arabie saoudite, découvrez leurs histoires et les lieux patrimoniaux voisins.",
        cameraHeading: "Découvrir un site",
        cameraPlaceholder: "Ouvrez la caméra et dirigez-la vers un site",
        openCamera: "📷 Ouvrir la caméra",
        capture: "📸 Photographier le site",
        addFavorite: "Ajouter aux découvertes",
        saved: "Ajouté aux découvertes",
        loading: "Chargement du modèle d'IA...",
        ready: "Prêt ! Ouvrez la caméra pour reconnaître un site.",
        cameraStarted: "Caméra prête. Photographiez le site.",
        cameraError: "Impossible de démarrer la caméra. Autorisez son accès.",
        loadingAI: "Attendez le chargement du modèle de reconnaissance.",
        aiError: "Impossible de charger le modèle. Vérifiez les fichiers GitHub.",
        captureError: "Impossible de prendre la photo. Réessayez.",
        notRecognized: "Cette image ne correspond à aucun site enregistré. Essayez une photo plus nette.",
        discoveredHeading: "Sites découverts",
        remainingHeading: "Sites restant à découvrir",
        mapHeading: "Carte et exploration",
        explore: "🧭 Explorer les environs",
        locate: "📍 Me localiser",
        nearbyHeading: "Lieux à proximité",
        nearbyEmpty: "Reconnaissez d'abord un site pour voir les lieux voisins.",
        noDiscovered: "Aucun site ajouté. Appuyez sur ⭐ après la reconnaissance.",
        noRemaining: "Bravo ! Vous avez découvert les trois sites.",
        viewMap: "Voir sur la carte",
        source: "Source officielle",
        listen: "🔊 Écouter les informations",
        stop: "⏹️ Arrêter l'audio",
        locationDenied: "Localisation impossible. Vérifiez les autorisations.",
        locating: "Localisation en cours...",
        locationReady: "Votre position apparaît sur la carte.",
        mapReady: "Carte prête.",
        alreadySaved: "Ce site figure déjà dans vos découvertes.",
        infoTitle: "Informations sur le site",
        story: "Histoire",
        importance: "Importance historique",
        fact: "Fait intéressant",
        details: "Plus de détails",
        location: "Emplacement",
        marketTitle: "Marché patrimonial de la région",
        marketLocation: "Emplacement",
        goTo: "📍 Voir l'emplacement",
        footer: "ATHAR — Un voyage au cœur du patrimoine saoudien",
        removed: "Ce site ne figure pas dans vos découvertes.",
        noNearby: "Aucune information à proximité pour le moment.",
        savedLocation: "Site ajouté à vos découvertes."
    },
    es: {
        heroTitle: "Descubre la historia con tu cámara",
        heroDescription: "Explora los lugares históricos de Arabia Saudita, conoce sus historias y descubre sitios patrimoniales cercanos.",
        cameraHeading: "Descubrir un lugar histórico",
        cameraPlaceholder: "Abre la cámara y apunta hacia el lugar",
        openCamera: "📷 Abrir cámara",
        capture: "📸 Fotografiar lugar",
        addFavorite: "Añadir a descubiertos",
        saved: "Añadido a descubiertos",
        loading: "Cargando el modelo de IA...",
        ready: "¡Listo! Abre la cámara para reconocer lugares.",
        cameraStarted: "Cámara lista. Fotografía el lugar histórico.",
        cameraError: "No se pudo iniciar la cámara. Permite el acceso.",
        loadingAI: "Espera a que cargue el modelo de reconocimiento.",
        aiError: "No se pudo cargar el modelo. Revisa los archivos de GitHub.",
        captureError: "No se pudo tomar la foto. Inténtalo de nuevo.",
        notRecognized: "No se pudo identificar el lugar. Intenta tomar una foto más clara.",
        discoveredHeading: "Lugares descubiertos",
        remainingHeading: "Lugares por explorar",
        mapHeading: "Mapa y exploración",
        explore: "🧭 Explorar alrededores",
        locate: "📍 Mi ubicación",
        nearbyHeading: "Lugares cercanos",
        nearbyEmpty: "Reconoce primero un lugar para ver sitios cercanos.",
        noDiscovered: "Todavía no has añadido lugares. Pulsa ⭐ después del reconocimiento.",
        noRemaining: "¡Genial! Has descubierto los tres lugares.",
        viewMap: "Ver en el mapa",
        source: "Fuente oficial",
        listen: "🔊 Escuchar información",
        stop: "⏹️ Detener audio",
        locationDenied: "No se pudo localizarte. Revisa los permisos de ubicación.",
        locating: "Buscando tu ubicación...",
        locationReady: "Tu ubicación aparece en el mapa.",
        mapReady: "Mapa listo.",
        alreadySaved: "Este lugar ya está en tu lista de descubiertos.",
        infoTitle: "Información del lugar",
        story: "Historia",
        importance: "Importancia histórica",
        fact: "Dato interesante",
        details: "Más detalles",
        location: "Ubicación",
        marketTitle: "Mercado patrimonial de la zona",
        marketLocation: "Ubicación",
        goTo: "📍 Ver ubicación",
        footer: "ATHAR — Un viaje por el patrimonio saudí",
        removed: "Este lugar no está en tu lista de descubiertos.",
        noNearby: "No hay información cercana disponible.",
        savedLocation: "Lugar añadido a tus descubrimientos."
    }
};

// معلومات المواقع الأثرية
const landmarks = {
    "AL-MASMAK": {
        icon: "🏰",
        location: {
            ar: "الرياض، المملكة العربية السعودية",
            en: "Riyadh, Saudi Arabia",
            fr: "Riyad, Arabie saoudite",
            es: "Riad, Arabia Saudita"
        },
        name: {
            ar: "قصر المصمك",
            en: "Al Masmak Palace",
            fr: "Palais Al Masmak",
            es: "Palacio Al Masmak"
        },
        description: {
            ar: "حصن تاريخي بارز في قلب الرياض القديمة، ويُعد من أشهر معالم تاريخ المملكة.",
            en: "A historic fortress in old Riyadh and one of the best-known landmarks in Saudi history.",
            fr: "Une forteresse historique dans le vieux Riyad, célèbre dans l'histoire saoudienne.",
            es: "Una fortaleza histórica en el antiguo Riad, importante en la historia saudí."
        },
        story: {
            ar: "ارتبط قصر المصمك باستعادة الملك عبدالعزيز للرياض عام 1902، وهي محطة مهمة في تاريخ تأسيس المملكة العربية السعودية.",
            en: "Al Masmak is associated with King Abdulaziz's recapture of Riyadh in 1902, an important event in the founding of modern Saudi Arabia.",
            fr: "Al Masmak est lié à la reprise de Riyad par le roi Abdulaziz en 1902, un événement important de l'histoire saoudienne.",
            es: "Al Masmak está vinculado con la recuperación de Riad por el rey Abdulaziz en 1902, un acontecimiento importante de la historia saudí."
        },
        importance: {
            ar: "يمثل القصر مرحلة مهمة في توحيد المملكة، ويعرض جانبًا من العمارة النجدية التقليدية.",
            en: "The palace represents an important stage in Saudi unification and showcases traditional Najdi architecture.",
            fr: "Le palais représente une étape importante de l'unification saoudienne et présente l'architecture traditionnelle du Najd.",
            es: "El palacio representa una etapa importante de la unificación saudí y muestra la arquitectura tradicional de Najd."
        },
        fact: {
            ar: "بُني القصر بالطين واللبن، مع أبراج وعناصر دفاعية تتناسب مع طابع الحصون القديمة.",
            en: "The palace was built using traditional mud-brick construction and features defensive elements.",
            fr: "Le palais a été construit en briques de terre et comporte des éléments défensifs traditionnels.",
            es: "El palacio se construyó con adobe e incluye elementos defensivos tradicionales."
        },
        details: {
            ar: "يمكن للزائر التعرف على تاريخ الرياض والتحولات التي مرت بها المنطقة من خلال زيارة القصر ومعروضاته.",
            en: "Visitors can learn about Riyadh's history and the region's transformation through the palace and its exhibits.",
            fr: "Les visiteurs peuvent découvrir l'histoire de Riyad et l'évolution de la région grâce aux expositions du palais.",
            es: "Los visitantes pueden conocer la historia de Riad y los cambios de la región mediante las exposiciones del palacio."
        },
        source: "https://www.visitsaudi.com/",
        coords: [24.63121, 46.71333]
    },

    "AL-HIJR": {
        icon: "🪨",
        location: {
            ar: "الحِجر، محافظة العلا، المملكة العربية السعودية",
            en: "Hegra, AlUla, Saudi Arabia",
            fr: "Hégra, AlUla, Arabie saoudite",
            es: "Hegra, AlUla, Arabia Saudita"
        },
        name: {
            ar: "الحِجر",
            en: "Hegra",
            fr: "Hégra",
            es: "Hegra"
        },
        description: {
            ar: "موقع أثري يضم مقابر منحوتة في الصخور، ويرتبط بالحضارة النبطية وطرق التجارة القديمة.",
            en: "An archaeological site with rock-cut tombs associated with the Nabataean civilization and ancient trade routes.",
            fr: "Un site archéologique avec des tombeaux taillés dans la roche, lié à la civilisation nabatéenne.",
            es: "Un sitio arqueológico con tumbas excavadas en la roca, vinculado a la civilización nabatea."
        },
        story: {
            ar: "كانت الحِجر محطة مهمة في شبكة طرق التجارة القديمة، وتكشف واجهات المقابر المنحوتة عن مهارة البنّائين والفنون المعمارية في المنطقة.",
            en: "Hegra was an important stop on ancient trade networks. Its carved tomb facades reveal the region's architectural skill.",
            fr: "Hégra était une étape importante des anciennes routes commerciales. Ses tombeaux témoignent du savoir-faire architectural de la région.",
            es: "Hegra fue una parada importante en las antiguas rutas comerciales. Sus tumbas muestran la habilidad arquitectónica de la región."
        },
        importance: {
            ar: "تُعد الحِجر أول موقع سعودي أُدرج على قائمة التراث العالمي لليونسكو عام 2008.",
            en: "Hegra became Saudi Arabia's first UNESCO World Heritage Site in 2008.",
            fr: "Hégra est devenu le premier site saoudien inscrit au patrimoine mondial de l'UNESCO en 2008.",
            es: "Hegra fue el primer sitio saudí inscrito en la Lista del Patrimonio Mundial de la UNESCO en 2008."
        },
        fact: {
            ar: "تضم المنطقة واجهات مقابر نبطية منحوتة مباشرة في تكوينات صخرية ضخمة.",
            en: "The site features Nabataean tomb facades carved directly into large rock formations.",
            fr: "Le site présente des façades de tombeaux nabatéens sculptées directement dans de grandes formations rocheuses.",
            es: "El sitio presenta fachadas de tumbas nabateas talladas directamente en grandes formaciones rocosas."
        },
        details: {
            ar: "تقع الحِجر في منطقة العلا، وتختلف عن البلدة القديمة في العلا؛ لذا ينبغي التحقق من مواعيد الزيارة والتنقل بين المواقع.",
            en: "Hegra is in the AlUla area and is separate from AlUla Old Town. Check visitor arrangements and travel between sites.",
            fr: "Hégra se trouve dans la région d'AlUla, mais à l'écart de la vieille ville. Vérifiez les conditions de visite et les déplacements.",
            es: "Hegra se encuentra en la región de AlUla, separada del casco antiguo. Consulta las condiciones de visita y el transporte."
        },
        source: "https://whc.unesco.org/en/list/1293/",
        coords: [26.7915, 37.9575]
    },

    "AL-DIRIYAH": {
        icon: "🏘️",
        location: {
            ar: "الدرعية، منطقة الرياض، المملكة العربية السعودية",
            en: "Diriyah, Riyadh Region, Saudi Arabia",
            fr: "Diriyah, région de Riyad, Arabie saoudite",
            es: "Diriyah, región de Riad, Arabia Saudita"
        },
        name: {
            ar: "الدرعية التاريخية",
            en: "Historic Diriyah",
            fr: "Diriyah historique",
            es: "Diriyah histórica"
        },
        description: {
            ar: "منطقة تاريخية مرتبطة ببدايات الدولة السعودية الأولى، وتشتهر بعمارتها النجدية المبنية بالطين.",
            en: "A historic area associated with the First Saudi State, known for its traditional Najdi mud-brick architecture.",
            fr: "Une région historique liée au premier État saoudien, connue pour son architecture traditionnelle en terre.",
            es: "Una zona histórica vinculada al primer Estado saudí, conocida por su arquitectura tradicional de adobe."
        },
        story: {
            ar: "كانت الدرعية عاصمة الدولة السعودية الأولى، وتُعد منطقة الطريف من أبرز مواقعها التاريخية.",
            en: "Diriyah was the capital of the First Saudi State, and At-Turaif is one of its most important historic districts.",
            fr: "Diriyah était la capitale du premier État saoudien. Le quartier d'At-Turaif en est l'un des sites les plus importants.",
            es: "Diriyah fue la capital del primer Estado saudí. El distrito de At-Turaif es uno de sus lugares históricos más importantes."
        },
        importance: {
            ar: "تُظهر الدرعية تطور الدولة السعودية وتراث العمارة النجدية، وأُدرج حي الطريف في قائمة اليونسكو عام 2010.",
            en: "Diriyah reflects Saudi state history and Najdi architecture. At-Turaif was inscribed on UNESCO's World Heritage List in 2010.",
            fr: "Diriyah témoigne de l'histoire de l'État saoudien et de l'architecture du Najd. At-Turaif est inscrit à l'UNESCO depuis 2010.",
            es: "Diriyah refleja la historia del Estado saudí y la arquitectura de Najd. At-Turaif está inscrito en la UNESCO desde 2010."
        },
        fact: {
            ar: "استُخدمت مواد محلية، مثل الطين واللبن، في بناء كثير من المباني التاريخية.",
            en: "Local materials, including mud and mud bricks, were used in many historic buildings.",
            fr: "Des matériaux locaux, comme la terre et les briques de terre, ont servi à construire de nombreux bâtiments historiques.",
            es: "Se utilizaron materiales locales, como barro y adobe, en muchos edificios históricos."
        },
        details: {
            ar: "تجمع الدرعية بين المواقع التاريخية والمناطق التراثية وتجارب ثقافية معاصرة. تحققي من شروط الدخول وساعات الزيارة قبل الذهاب.",
            en: "Diriyah combines historic sites, heritage areas, and contemporary cultural experiences. Check entry requirements and opening times before visiting.",
            fr: "Diriyah associe sites historiques, espaces patrimoniaux et expériences culturelles contemporaines. Vérifiez les horaires avant la visite.",
            es: "Diriyah combina sitios históricos, zonas patrimoniales y experiencias culturales actuales. Consulta los horarios antes de visitar."
        },
        source: "https://whc.unesco.org/en/list/1329/",
        coords: [24.73315, 46.57274]
    }
};

// أسواق ومناطق تراثية في نطاق المنطقة.
// الإحداثيات تقريبية للمساعدة على فتح الخريطة، وليست تأكيدًا للمسافة.
const nearbyPlacesByLandmark = {
    "AL-MASMAK": {
        name: {
            ar: "سوق الزل",
            en: "Souq Al-Zal",
            fr: "Souq Al-Zal",
            es: "Souq Al-Zal"
        },
        description: {
            ar: "سوق تراثي معروف في الرياض، يضم محلات للمنتجات التقليدية والتحف والسجاد والعطور.",
            en: "A traditional Riyadh market known for heritage goods, carpets, antiques, and perfumes.",
            fr: "Un marché traditionnel de Riyad connu pour ses produits patrimoniaux, tapis, antiquités et parfums.",
            es: "Un mercado tradicional de Riad conocido por sus productos patrimoniales, alfombras, antigüedades y perfumes."
        },
        location: {
            ar: "منطقة الديرة، الرياض",
            en: "Al-Dirah area, Riyadh",
            fr: "Quartier d'Al-Dirah, Riyad",
            es: "Zona de Al-Dirah, Riad"
        },
        image: "images/riyadh-traditional-market.jpg",
        coords: [24.6297, 46.7118],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Souq+Al-Zal+Riyadh"
    },

    "AL-HIJR": {
        name: {
            ar: "سوق البلدة القديمة بالعلا",
            en: "AlUla Old Town Market",
            fr: "Marché de la vieille ville d'AlUla",
            es: "Mercado del casco antiguo de AlUla"
        },
        description: {
            ar: "منطقة تراثية في البلدة القديمة بالعلا تضم متاجر وتجارب محلية. تقع البلدة القديمة خارج موقع الحِجر الأثري نفسه، لذا تحققي من المسافة ووسيلة النقل.",
            en: "A heritage area in AlUla Old Town with local shops and experiences. It is separate from the Hegra archaeological site, so check travel distance and transport.",
            fr: "Un espace patrimonial de la vieille ville d'AlUla avec des boutiques locales. Il est distinct du site archéologique d'Hégra : vérifiez le trajet.",
            es: "Una zona patrimonial del casco antiguo de AlUla con tiendas locales. Está separada del sitio arqueológico de Hegra; consulta el trayecto."
        },
        location: {
            ar: "البلدة القديمة، العلا",
            en: "Old Town, AlUla",
            fr: "Vieille ville, AlUla",
            es: "Casco antiguo, AlUla"
        },
        image: "images/alula-old-town-market.jpg",
        coords: [26.6279, 37.9128],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=AlUla+Old+Town"
    },

    "AL-DIRIYAH": {
        name: {
            ar: "منطقة البجيري التراثية",
            en: "Al-Bujairi Heritage Area",
            fr: "Quartier patrimonial d'Al-Bujairi",
            es: "Zona patrimonial de Al-Bujairi"
        },
        description: {
            ar: "منطقة للزوار في الدرعية تضم مطاعم وتجارب ثقافية وإطلالات على المنطقة التاريخية. تحققي من مواعيد الدخول والخدمات المتاحة.",
            en: "A visitor area in Diriyah with dining, cultural experiences, and views of the historic district. Check entry times and available services.",
            fr: "Un espace pour les visiteurs à Diriyah avec restaurants, expériences culturelles et vues sur le quartier historique. Vérifiez les horaires.",
            es: "Una zona para visitantes en Diriyah con restaurantes, experiencias culturales y vistas al distrito histórico. Consulta los horarios."
        },
        location: {
            ar: "حي البجيري، الدرعية",
            en: "Al-Bujairi, Diriyah",
            fr: "Al-Bujairi, Diriyah",
            es: "Al-Bujairi, Diriyah"
        },
        image: "images/diriyah-market.jpg",
        coords: [24.7355, 46.5752],
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Al+Bujairi+Terrace+Diriyah"
    }
};

function t(key) {
    return uiText[currentLanguage][key] || key;
}

function localized(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[currentLanguage] || field.en || field.ar || "";
}

function findLandmarkKey(className) {
    const name = String(className || "")
        .toUpperCase()
        .replace(/[_\s]+/g, "-");

    if (name.includes("MASMAK")) return "AL-MASMAK";
    if (name.includes("HIJR") || name.includes("HJIR")) return "AL-HIJR";
    if (name.includes("DIRIYAH") || name.includes("DIRIYA")) {
        return "AL-DIRIYAH";
    }

    return null;
}

// تحميل النموذج والملصقات من ملفات GitHub الموجودة بجانب الصفحة.
async function loadAI() {
    try {
        model = await tf.loadLayersModel(MODEL_URL + "model.json");

        const response = await fetch(MODEL_URL + "metadata.json");
        if (!response.ok) {
            throw new Error("Could not load metadata.json");
        }

        const metadata = await response.json();
        classNames = metadata.labels || metadata.classLabels || [];

        document.getElementById("cameraMessage").textContent = t("ready");
        return true;
    } catch (error) {
        console.error("AI loading error:", error);
        document.getElementById("cameraMessage").textContent = t("aiError");
        return false;
    }
}

// تشغيل الكاميرا الخلفية.
async function startCamera() {
    if (!model) {
        document.getElementById("cameraMessage").textContent = t("loadingAI");
        const loaded = await loadAI();
        if (!loaded) return;
    }

    try {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
            audio: false
        });

        const camera = document.getElementById("camera");
        camera.srcObject = stream;
        camera.style.display = "block";
        document.getElementById("photo").style.display = "none";
        document.getElementById("cameraPlaceholder").style.display = "none";

        await camera.play();
        document.getElementById("captureButton").disabled = false;
        document.getElementById("cameraMessage").textContent = t("cameraStarted");
    } catch (error) {
        console.error("Camera error:", error);
        document.getElementById("cameraMessage").textContent = t("cameraError");
    }
}

// التقاط الصورة والتعرّف على الأثر.
// كتلة الاستدلال محفوظة كما هي.
async function takePhoto() {
    if (!model) {
        document.getElementById("cameraMessage").textContent = t("loadingAI");
        return;
    }

    const camera = document.getElementById("camera");

    if (!stream || !camera.videoWidth) {
        document.getElementById("cameraMessage").textContent = t("cameraError");
        return;
    }

    try {
        const canvas = document.createElement("canvas");
        canvas.width = camera.videoWidth;
        canvas.height = camera.videoHeight;

        const context = canvas.getContext("2d");
        context.drawImage(camera, 0, 0, canvas.width, canvas.height);

        const photo = document.getElementById("photo");
        photo.src = canvas.toDataURL("image/jpeg", 0.92);
        photo.style.display = "block";

        let image =
            tf.browser.fromPixels(canvas);
        image =
            tf.image.resizeBilinear(image, [224, 224]);
        image =
            image.toFloat().div(127.5).sub(1);
        image = image.expandDims(0);
        const prediction = model.predict(image);
        const probabilities = await prediction.data();
        let bestIndex = 0;
        for (let i = 1; i < probabilities.length; i++) {
            if (probabilities[i] > probabilities[bestIndex]) {
                bestIndex = i;
            }
        }
        const className = classNames[bestIndex];
        const landmarkKey = findLandmarkKey(className);
        console.log("Detected landmark:", className);
        console.log("Matched landmark:", landmarkKey);
        console.log("Confidence:", probabilities[bestIndex]);
        image.dispose();
        if (prediction.dispose) {
            prediction.dispose();
        }

        if (!landmarkKey || !landmarks[landmarkKey]) {
            currentLandmarkKey = null;
            document.getElementById("favoriteButton").disabled = true;
            document.getElementById("favoriteButton").classList.remove("saved");
            document.getElementById("result").hidden = false;
            document.getElementById("result").innerHTML =
                `<div class="empty">${t("notRecognized")}</div>`;
            document.getElementById("cameraMessage").textContent = t("notRecognized");
            return;
        }

        // لا يُحفظ الموقع تلقائيًا؛ الإضافة تكون بزر النجمة فقط.
        currentLandmarkKey = landmarkKey;
        showInfo(landmarkKey);
        updateFavoriteButton();
        document.getElementById("cameraMessage").textContent =
            localized(landmarks[landmarkKey].name);
    } catch (error) {
        console.error("Recognition error:", error);
        document.getElementById("cameraMessage").textContent = t("captureError");
    }
}

function showInfo(landmarkKey) {
    const landmark = landmarks[landmarkKey];
    if (!landmark) return;

    const result = document.getElementById("result");
    result.hidden = false;

    result.innerHTML = `
        <div class="result-card">
            <h3>${landmark.icon} ${localized(landmark.name)}</h3>
            <p><span class="info-label">${t("location")}: </span>${localized(landmark.location)}</p>
            <p>${localized(landmark.description)}</p>
            <p><span class="info-label">${t("story")}: </span>${localized(landmark.story)}</p>
            <p><span class="info-label">${t("importance")}: </span>${localized(landmark.importance)}</p>
            <div class="fact">
                <strong>${t("fact")}: </strong>${localized(landmark.fact)}
            </div>
            <p><span class="info-label">${t("details")}: </span>${localized(landmark.details)}</p>
            <p><a class="text-link" href="${landmark.source}" target="_blank" rel="noopener noreferrer">${t("source")} ↗</a></p>
            <button class="btn gold" id="speakButton">${t("listen")}</button>
            <div id="nearbyForLandmark"></div>
        </div>
    `;

    document.getElementById("speakButton").addEventListener("click", () => {
        speakAll(landmarkKey);
    });

    renderNearbyPlaces(landmarkKey);
}

function speakAll(landmarkKey) {
    if (!("speechSynthesis" in window)) {
        document.getElementById("cameraMessage").textContent =
            "Audio playback is not supported in this browser.";
        return;
    }

    window.speechSynthesis.cancel();

    const landmark = landmarks[landmarkKey];
    const text = [
        localized(landmark.name),
        localized(landmark.location),
        localized(landmark.description),
        localized(landmark.story),
        localized(landmark.importance),
        localized(landmark.fact),
        localized(landmark.details)
    ].join(". ");

    const utterance = new SpeechSynthesisUtterance(text);
    const voiceLanguages = {
        ar: "ar-SA",
        en: "en-US",
        fr: "fr-FR",
        es: "es-ES"
    };

    utterance.lang = voiceLanguages[currentLanguage] || "ar-SA";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function updateFavoriteButton() {
    const button = document.getElementById("favoriteButton");
    const label = document.getElementById("favoriteButtonText");

    if (!currentLandmarkKey) {
        button.disabled = true;
        button.classList.remove("saved");
        label.textContent = t("addFavorite");
        return;
    }

    button.disabled = false;

    if (discovered.includes(currentLandmarkKey)) {
        button.classList.add("saved");
        label.textContent = t("saved");
    } else {
        button.classList.remove("saved");
        label.textContent = t("addFavorite");
    }
}

function saveDiscovered(landmarkKey) {
    if (!landmarks[landmarkKey]) return;

    if (discovered.includes(landmarkKey)) {
        document.getElementById("cameraMessage").textContent = t("alreadySaved");
        updateFavoriteButton();
        return;
    }

    discovered.push(landmarkKey);
    localStorage.setItem(
        "atharDiscoveredManual_v1",
        JSON.stringify(discovered)
    );

    renderDiscovered();
    renderRemaining();
    updateMapMarkers();
    updateFavoriteButton();

    document.getElementById("cameraMessage").textContent = t("savedLocation");
}

function renderDiscovered() {
    const container = document.getElementById("discoveredList");
    container.innerHTML = "";

    if (discovered.length === 0) {
        container.innerHTML = `<div class="empty">${t("noDiscovered")}</div>`;
        return;
    }

    discovered.forEach(key => {
        const landmark = landmarks[key];
        if (!landmark) return;

        const row = document.createElement("div");
        row.className = "place-row";

        const name = document.createElement("div");
        name.className = "place-name";
        name.innerHTML = `
            <span class="emoji">${landmark.icon}</span>
            <span>${localized(landmark.name)}<small>${localized(landmark.location)}</small></span>
        `;

        const button = document.createElement("button");
        button.className = "mini-btn";
        button.textContent = t("viewMap");
        button.addEventListener("click", () => openLandmarkOnMap(key));

        row.append(name, button);
        container.appendChild(row);
    });
}

function renderRemaining() {
    const container = document.getElementById("remainingPlaces");
    container.innerHTML = "";

    const remaining = Object.keys(landmarks).filter(
        key => !discovered.includes(key)
    );

    if (remaining.length === 0) {
        container.innerHTML = `<div class="empty">${t("noRemaining")}</div>`;
        return;
    }

    remaining.forEach(key => {
        const landmark = landmarks[key];
        const row = document.createElement("div");
        row.className = "place-row";

        const name = document.createElement("div");
        name.className = "place-name";
        name.innerHTML = `
            <span class="emoji">${landmark.icon}</span>
            <span>${localized(landmark.name)}<small>${localized(landmark.location)}</small></span>
        `;

        const button = document.createElement("button");
        button.className = "mini-btn";
        button.textContent = t("viewMap");
        button.addEventListener("click", () => openLandmarkOnMap(key));

        row.append(name, button);
        container.appendChild(row);
    });
}

function renderNearbyPlaces(landmarkKey) {
    const place = nearbyPlacesByLandmark[landmarkKey];
    const container = document.getElementById("nearbyPlaces");
    const inlineContainer = document.getElementById("nearbyForLandmark");

    if (!place) {
        container.innerHTML = `<div class="empty">${t("noNearby")}</div>`;
        if (inlineContainer) inlineContainer.innerHTML = "";
        return;
    }

    const cardHTML = `
        <div class="nearby-card">
            <img src="${place.image}" alt="${localized(place.name)}"
              onerror="this.style.display='none'">
            <div>
                <h4>🛍️ ${localized(place.name)}</h4>
                <p>${localized(place.description)}</p>
                <p><strong>${t("marketLocation")}: </strong>${localized(place.location)}</p>
                <a class="text-link" href="${place.mapUrl}" target="_blank"
                  rel="noopener noreferrer">${t("goTo")} ↗</a>
            </div>
        </div>
    `;

    container.innerHTML = cardHTML;
    if (inlineContainer) {
        inlineContainer.innerHTML = `
            <h4 style="color:var(--wine-dark);margin-top:22px">${t("marketTitle")}</h4>
            ${cardHTML}
        `;
    }
}

function initMap() {
    if (map) return;

    map = L.map("map").setView([24.2, 45.2], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    updateMapMarkers();
}

function updateMapMarkers() {
    if (!map) return;

    landmarkMarkers.forEach(marker => map.removeLayer(marker));
    landmarkMarkers = [];

    Object.keys(landmarks).forEach(key => {
        if (!discovered.includes(key)) return;

        const landmark = landmarks[key];
        const marker = L.marker(landmark.coords)
            .addTo(map)
            .bindPopup(
                `<strong>⭐ ${localized(landmark.name)}</strong><br>${localized(landmark.location)}`
            );

        landmarkMarkers.push(marker);
    });

    Object.keys(nearbyPlacesByLandmark).forEach(key => {
        if (!discovered.includes(key)) return;

        const place = nearbyPlacesByLandmark[key];
        const marker = L.marker(place.coords)
            .addTo(map)
            .bindPopup(
                `<strong>🛍️ ${localized(place.name)}</strong><br>${localized(place.location)}`
            );

        landmarkMarkers.push(marker);
    });
}

function openLandmarkOnMap(landmarkKey) {
    const landmark = landmarks[landmarkKey];
    if (!landmark) return;

    if (!map) initMap();

    map.setView(landmark.coords, 15);
    L.popup()
        .setLatLng(landmark.coords)
        .setContent(`<strong>${localized(landmark.name)}</strong><br>${localized(landmark.location)}`)
        .openOn(map);

    document.getElementById("exploreSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function openExplore() {
    if (!map) initMap();

    document.getElementById("exploreSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => map.invalidateSize(), 250);

    if (currentLandmarkKey) {
        const place = nearbyPlacesByLandmark[currentLandmarkKey];
        if (place) map.setView(place.coords, 13);
    }
}

function locateUser() {
    const message = document.getElementById("mapMessage");

    if (!navigator.geolocation) {
        message.textContent = t("locationDenied");
        return;
    }

    message.textContent = t("locating");

    navigator.geolocation.getCurrentPosition(
        position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (!map) initMap();
            map.setView([lat, lng], 14);

            if (userMarker) map.removeLayer(userMarker);

            userMarker = L.marker([lat, lng])
                .addTo(map)
                .bindPopup("📍 " + t("locate"))
                .openPopup();

            message.textContent = t("locationReady");
        },
        error => {
            console.error("Location error:", error);
            message.textContent = t("locationDenied");
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

function changeLanguage() {
    currentLanguage = document.getElementById("language").value;

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";

    const textIds = {
        heroTitle: "heroTitle",
        heroDescription: "heroDescription",
        cameraHeading: "cameraHeading",
        cameraPlaceholderText: "cameraPlaceholder",
        cameraButton: "openCamera",
        captureButton: "capture",
        discoveredHeading: "discoveredHeading",
        remainingHeading: "remainingHeading",
        mapHeading: "mapHeading",
        exploreButton: "explore",
        locateButton: "locate",
        nearbyHeading: "nearbyHeading",
        footerText: "footer"
    };

    Object.entries(textIds).forEach(([elementId, textKey]) => {
        const element = document.getElementById(elementId);
        if (element) element.textContent = t(textKey);
    });

    document.getElementById("nearbyEmpty").textContent = t("nearbyEmpty");
    document.getElementById("cameraMessage").textContent =
        model ? t("ready") : t("loading");

    renderDiscovered();
    renderRemaining();
    updateFavoriteButton();

    if (currentLandmarkKey) {
        showInfo(currentLandmarkKey);
    } else {
        document.getElementById("nearbyPlaces").innerHTML =
            `<div class="empty">${t("nearbyEmpty")}</div>`;
    }

    updateMapMarkers();

    if (map) {
        Object.keys(landmarks).forEach(key => {
            if (discovered.includes(key)) {
                // Refresh marker names when the selected language changes.
                updateMapMarkers();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("cameraButton")
        .addEventListener("click", startCamera);

    document.getElementById("captureButton")
        .addEventListener("click", takePhoto);

    document.getElementById("favoriteButton")
        .addEventListener("click", () => {
            if (currentLandmarkKey) {
                saveDiscovered(currentLandmarkKey);
            }
        });

    document.getElementById("exploreButton")
        .addEventListener("click", openExplore);

    document.getElementById("locateButton")
        .addEventListener("click", locateUser);

    document.getElementById("language")
        .addEventListener("change", changeLanguage);

    renderDiscovered();
    renderRemaining();
    initMap();

    document.getElementById("cameraMessage").textContent = t("loading");
    await loadAI();
});
