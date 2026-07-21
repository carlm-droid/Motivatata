const templates = {
    ar: {
        titles: ["Motivatata ✨", "جرعة طاقة ⚡", "خليك قوي 🌟", "سر النجاح 🎯", "طاقة اليوم 🔋"],
        starts: ["تذكر دائماً أن", "لا تنسَ أن", "استمر لأن", "اعلم أن", "كل يوم هو فرصة لأن", "أنت قادر على أن"],
        actions: ["تتخطى الصعاب", "تصل إلى أهدافك", "تبني مستقبلك", "تصنع فرقاً حقيقياً", "تتجاوز حدودك", "تحقق أحلامك"],
        results: ["بشجاعة وإصرار. 💪", "لأن الاستمرارية هي السر. 🚀", "فالنجاح ينتظر من يسعى. 🔥", "دون التلفت للأعذار. 💡", "بخطوات ثابتة يومياً. 🌟"]
    },
    en: {
        titles: ["Motivatata ✨", "Power Dose ⚡", "Stay Strong 🔥", "Daily Fuel 🚀", "Break Limits 💡"],
        starts: ["Always remember that", "Never forget that", "Keep going because", "Every single day is a chance to", "You have the power to", "Stay focused and"],
        actions: ["push through challenges", "reach your ultimate goals", "build the future you dream of", "make a real difference", "break your limits", "achieve greatness"],
        results: ["with determination. 💪", "because consistency is key. 🚀", "success belongs to the persistent. 🔥", "leaving excuses behind. 🎯", "one step at a time. 🌟"]
    },
    fr: {
        titles: ["Motivatata ✨", "Dose d'énergie ⚡", "Reste Fort 🔥", "Focus & Gagne 🎯", "Force Du Jour 💡"],
        starts: ["Rappelle-toi toujours que", "N'oublie jamais que", "Continue parce que", "Chaque jour est une opportunité pour", "Tu as le pouvoir de", "Reste concentré pour"],
        actions: ["surmonter les obstacles", "atteindre tes objectifs", "construire ton avenir", "faire une vraie différence", "dépasser tes limites", "accomplir de grandes choses"],
        results: ["avec détermination. 💪", "car la régularité est la clé. 🚀", "le succès appartient aux persévérants. 🔥", "en laissant les excuses de côté. 🎯", "un pas à la fois. 🌟"]
    },
    franco: {
        titles: ["Motivatata ✨", "Power Dose ⚡", "Khallik 2awi 🔥", "Rakkez w Rba7 🎯", "Ta2a 3al Sobe7 🔋"],
        starts: ["Tzakkar deyman 2enno", "Ma tansa 2enno", "Kammel la2enno", "Kull yowm hewe fursa la", "2enta 2adir 2ennak", "Khallik mrakkez la"],
        actions: ["tet3adda l me7an", "toe3al la ahdafak", "tebne mastaqbalak", "te3mol far2 kbir", "tetjawaz 7dodak", "te7a22e2 2a7lamak"],
        results: ["b 2israr w 2awwe. 💪", "la2enno l estemraréye heye l serr. 🚀", "l neja7 la elli byes3a. 🔥", "bdoen a3zar. 🎯", "khetwe khetwe kull yowm. 🌟"]
    }
};

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateSingleQuote(lang) {
    const data = templates[lang] || templates.ar;
    return {
        title: getRandomElement(data.titles),
        body: `${getRandomElement(data.starts)} ${getRandomElement(data.actions)} ${getRandomElement(data.results)}`
    };
}

function generate3000Quotes() {
    const allQuotes = { ar: [], en: [], fr: [], franco: [] };
    Object.keys(templates).forEach(lang => {
        for (let i = 0; i < 750; i++) {
            allQuotes[lang].push(generateSingleQuote(lang));
        }
    });
    return allQuotes;
}

const motivationalQuotes = generate3000Quotes();

export function getRandomQuote(lang = 'mix') {
    let selectedLang = lang;
    if (lang === 'mix') {
        const langs = ['ar', 'en', 'fr', 'franco'];
        selectedLang = getRandomElement(langs);
    }
    const list = motivationalQuotes[selectedLang] || motivationalQuotes.ar;
    return getRandomElement(list);
}
