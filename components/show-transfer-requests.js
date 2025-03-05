import { db } from '../utils/firebase.js';
import { collection, doc, getDoc, setDoc, getDocs, query, where, updateDoc, addDoc } from 'firebase/firestore';

export const showTransferRequests = (bot) => {
    bot.callbackQuery('show_my_requests', async (ctx) => {
		await ctx.answerCallbackQuery();
		
        const userId = ctx.from.id;
        const querySnapshot = await getDocs(collection(db, 'transfer-requests'));
        const userRequests = [];

        querySnapshot.forEach(doc => {
            const data = doc.data();
            if (data.userId === userId) {
                userRequests.push({ id: doc.id, ...data });
            }
        });

        if (userRequests.length === 0) {
            return ctx.reply("🚫 У вас нет активных заявок.");
        }

        let message = "📋 Ваши заявки:\n";
        userRequests.forEach((req, index) => {
            message += `📌 ${index + 1}. ${req.from} → ${req.to}, ${req.datetime}\n`;
        });

        await ctx.reply(message);
    });
};


// Просмотр объявлений
// bot.command('list_ads', async (ctx) => {
//     const snapshot = await getDocs(collection(db, 'announcements'));

//     if (snapshot.empty) {
//         return ctx.reply('Нет доступных объявлений.');
//     }

//     let adsList = 'Доступные поездки:\n';
//     snapshot.forEach(doc => {
//         const ad = doc.data();
//         adsList += `🔹 ${ad.route} | ${ad.price} | ${ad.time} | ${ad.role === 'driver' ? '🚗 Водитель' : '👤 Пассажир'}\n`;
//     });

//     ctx.reply(adsList);
// });