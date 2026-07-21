// قائمة ضخمة ومتنوعة من رسائل التحفيز لتتغير في كل مرة
const motivationalQuotes = [
    { title: "Motivatata ✨", body: "استمر، فنجاحك أقرب مما تتخيل اليوم! 💪" },
    { title: "Power Dose ⚡", body: "كل خطوة صغيرة تصنع فرقاً كبيراً في مستقبلك." },
    { title: "Stay Strong 🔥", body: "لا تقلق من الصعاب، فهي تصنع الأبطال." },
    { title: "Daily Fuel 🚀", body: "امنح نفسك دفعة طاقة، أنت قادرة على إنجاز المستحيل." },
    { title: "Break Limits 💡", body: "الاستمرارية هي سر العظماء.. لا تتوقف الآن!" },
    { title: "Focus & Win 🎯", body: "ركز على أهدافك ودع الأعذار جانباً." },
    { title: "Keep Pushing 🌟", body: "خطوة إضافية اليوم تعني إنجازاً عظيماً غداً." },
    { title: "Energy Boost 🔋", body: "تذكر لماذا بدأت.. واصل المسير بقوة!" }
];

// دالة لاختيار رسالة عشوائية في كل مرة
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
}

module.exports = { getRandomQuote };
