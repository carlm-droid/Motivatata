const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

// استدعاء ملف الرسائل العشوائية
const { getRandomQuote } = require("./motivations");

// دالة تعمل تلقائياً كل ساعة (Every 1 Hour)
exports.sendHourlyMotivations = onSchedule("every 1 hours", async (event) => {
    const now = new Date();
    const currentHour = now.getHours();

    try {
        // جلب جميع المستخدمين المسجلين ولديهم Token إشعارات
        const usersSnapshot = await db.collection("users").where("fcmToken", "!=", null).get();

        if (usersSnapshot.empty) {
            console.log("No users found with FCM tokens.");
            return null;
        }

        const promises = usersSnapshot.docs.map(async (docSnap) => {
            const userData = docSnap.data();
            const token = userData.fcmToken;
            const intervalHours = parseInt(userData.intervalHours || "2"); // الافتراضي كل ساعتين إذا لم يتم التحديد
            const lastSent = userData.lastSent ? userData.lastSent.toDate() : null;

            // حساب ما إذا حان وقت إرسال إشعار لهذا المستخدم بناءً على اختياره للتايمر
            let shouldSend = false;
            if (!lastSent) {
                shouldSend = true; // أول مرة
            } else {
                const hoursPassed = (now - lastSent) / (1000 * 60 * 60);
                if (hoursPassed >= intervalHours) {
                    shouldSend = true;
                }
            }

            if (shouldSend) {
                // جلب رسالة عشوائية مختلفة تماماً لهذه المرة
                const quote = getRandomQuote();

                const message = {
                    token: token,
                    notification: {
                        title: quote.title,
                        body: quote.body
                    }
                };

                // إرسال الإشعار الفعلي عبر فايربيس
                await messaging.send(message);

                // تحديث وقت آخر إشعار تم إرساله لهذا المستخدم
                await docSnap.ref.update({
                    lastSent: admin.firestore.FieldValue.serverTimestamp()
                });

                console.log(`Notification sent successfully to user: ${docSnap.id} with interval: ${intervalHours}h`);
            }
        });

        await Promise.all(promises);
        console.log("Hourly motivations check completed successfully.");
        return null;
    } catch (error) {
        console.error("Error sending hourly motivations:", error);
        return null;
    }
});
