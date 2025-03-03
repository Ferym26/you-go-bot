import { db } from '../firebase.js';
import { collection, doc, getDoc, setDoc, getDocs, query, where, updateDoc, addDoc } from 'firebase/firestore';

export const showTransferRequests = (bot) => {
	bot.command('show_transfer_requests', async (ctx) => {
		
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