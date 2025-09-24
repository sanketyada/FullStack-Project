import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Wallet": "Wallet",
      "Tickets / Passes": "Tickets / Passes",
      "Tickets": "Tickets",
      "English": "English",
      "Hindi": "Hindi",
      "Punjabi": "Punjabi",
      "Bus": "Bus",
      "Truck": "Truck",
      "About": "About",
      "Home": "Home",
      "My Tickets": "My Tickets",
      "Select Location": "Select Location",
      "Change Location": "Change Location",
      "Cancel": "Cancel",
      "Location": "Location",
      "Display ticket booking history and future journeys here.": "Display ticket booking history and future journeys here.",
      "Show live bus status, routes, grid, and ticketing here (extend this page).": "Show live bus status, routes, grid, and ticketing here (extend this page).",
      "Show truck routes, grid, bookings, or relevant data here.": "Show truck routes, grid, bookings, or relevant data here.",
      "Search for:": "Search for:",
      "Enter destination or bus no./DIGIPIN": "Enter destination or bus no./DIGIPIN",
      "Punjab": "Punjab",
      "Maharashtra": "Maharashtra",
      "Delhi": "Delhi",
      "Karnataka": "Karnataka",
      "Show User Info": "Show User Info"
    }
  },
  hi: {
    translation: {
      "Wallet": "वॉलेट",
      "Bus": "बस",
      "Bus Section": "बस अनुभाग",
      "Truck & Lorries Section": "ट्रक और लॉरी अनुभाग",
      "Tickets / Passes": "टिकट / पास",
      "Tickets": "टिकट",
      "English": "अंग्रेज़ी",
      "Hindi": "हिन्दी",
      "Punjabi": "पंजाबी",
      "Bus": "बस",
      "Truck": "ट्रक",
      "About": "के बारे में",
      "Home": "होम",
      "My Tickets": "मेरे टिकट",
      "Select Location": "स्थान चुनें",
      "Change Location": "स्थान बदलें",
      "Cancel": "रद्द करें",
      "Location": "स्थान",
      "Display ticket booking history and future journeys here.": "टिकट बुकिंग इतिहास और भविष्य की यात्राएं यहां प्रदर्शित होंगी।",
      "Show live bus status, routes, grid, and ticketing here (extend this page).": "यहां लाइव बस स्थिति, मार्ग, ग्रिड, और टिकटिंग दिखाएं (पृष्ठ बढ़ाएं)।",
      "Show truck routes, grid, bookings, or relevant data here.": "यहां ट्रक मार्ग, ग्रिड, बुकिंग, या संबंधित डेटा दिखाएं।",
      "Search for:": "खोजें:",
      "Enter destination or bus no./DIGIPIN": "गंतव्य या बस नंबर दर्ज करें / DIGIPIN",
      "Punjab": "पंजाब",
      "Maharashtra": "महाराष्ट्र",
      "Delhi": "दिल्ली",
      "Karnataka": "कर्नाटक",
      "Show User Info": "उपयोगकर्ता जानकारी दिखाएं"
    }
  },
  pa: {
    translation: {
      "Wallet": "ਵਾਲਿਟ",
      "Bus": "ਬਸ",
      "Bus Section": "ਬਸ ਸੈਕਸ਼ਨ",
      "Truck & Lorries Section": "ਟਰੱਕ ਅਤੇ ਲਾਰੀ ਸੈਕਸ਼ਨ",
      "Tickets / Passes": "ਟਿਕਟ / ਪਾਸ",
      "Tickets": "ਟਿਕਟ",
      "English": "ਅੰਗ੍ਰੇਜ਼ੀ",
      "Hindi": "ਹਿੰਦੀ",
      "Punjabi": "ਪੰਜਾਬੀ",
      "Bus": "ਬਸ",
      "Truck": "ਟਰੱਕ",
      "About": "ਬਾਰੇ",
      "Home": "ਘਰ",
      "My Tickets": "ਮੇਰੇ ਟਿਕਟ",
      "Select Location": "ਥਾਂ ਚੁਣੋ",
      "Change Location": "ਥਾਂ ਬਦਲੋ",
      "Cancel": "ਰੱਦ ਕਰੋ",
      "Location": "ਥਾਂ",
      "Display ticket booking history and future journeys here.": "ਟਿਕਟ ਬੁਕਿੰਗ ਇਤਿਹਾਸ ਅਤੇ ਭਵਿੱਖ ਦੀਆਂ ਯਾਤਰਾਂ ਇੱਥੇ ਵੇਖਾਓ।",
      "Show live bus status, routes, grid, and ticketing here (extend this page).": "ਲਾਈਵ ਬੱਸ ਸਥਿਤੀ, ਰੂਟ, ਗਰਿੱਡ ਅਤੇ ਟਿਕਟਿੰਗ ਇੱਥੇ ਦਿਖਾਓ (ਇਸ ਪੇਜ ਨੂੰ ਵਧਾਓ)।",
      "Show truck routes, grid, bookings, or relevant data here.": "ਇੱਥੇ ਟਰੱਕ ਰੂਟ, ਗਰਿੱਡ, ਬੁਕਿੰਗ ਜਾਂ ਸੰਬੰਧਤ ਡਾਟਾ ਦਿਖਾਓ।",
      "Search for:": "ਖੋਜੋ:",
      "Enter destination or bus no./DIGIPIN": "ਮੰਜ਼ਿਲ ਜਾਂ ਬੱਸ ਨੰਬਰ / ਡਿਗੀਪਿਨ ਦਰਜ ਕਰੋ",
      "Punjab": "ਪੰਜਾਬ",
      "Maharashtra": "ਮਹਾਰਾਸ਼ਟਰ",
      "Delhi": "ਦਿੱਲੀ",
      "Karnataka": "ਕਰਨਾਟਕਾ",
      "Show User Info": "ਯੂਜ਼ਰ ਜਾਣਕਾਰੀ ਦਿਖਾਓ"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
