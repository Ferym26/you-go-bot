import { db } from '../firebase.js';
import { collection, doc, getDoc, setDoc, getDocs, query, where, updateDoc, addDoc } from 'firebase/firestore';

export const createTransferRequest = (bot) => {
	bot.command('create_transfer_request', async (ctx) => {
		ctx.reply(`Введите маршрут, цену и время в формате:\nГород отправления - Город назначения, Цена, Время`);
	});

	bot.on('message', async (ctx) => {
		const message = ctx.message.text;

		const userId = ctx.from.id;
		const userRef = doc(db, 'users', String(userId));
		const userDoc = await getDoc(userRef);

		if (!userDoc.exists()) {
			return ctx.reply('Сначала выберите роль командой /start');
		}

		await addDoc(collection(db, 'announcements'), {
			userId,
			role: userDoc.data().role,
			message,
			status: 'waiting'
		});

		await ctx.reply('Ваше объявление создано!');
	});
};
