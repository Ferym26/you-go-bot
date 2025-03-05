import dotenv from 'dotenv';
import { Bot } from 'grammy';

import { start } from './components/start.js';
import { createTransferRequest } from './components/create-transfer-request.js';
import { showTransferRequests } from './components/show-transfer-requests.js';
import { menu } from './components/menu.js';

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);

start(bot);

createTransferRequest(bot);
showTransferRequests(bot);

menu(bot);

// Старт бота и выбор роли
// bot.start(async (ctx) => {
//     const userId = ctx.from.id;
//     const userRef = doc(db, 'users', String(userId));
//     const userDoc = await getDoc(userRef);

//     if (!userDoc.exists()) {
//         await setDoc(userRef, {
//             id: userId,
//             role: 'passenger',
//             contact: ctx.from.username || ctx.from.first_name
//         });
//     }

//     ctx.reply('Добро пожаловать! Выберите роль:', {
//         reply_markup: {
//             inline_keyboard: [
//                 [{ text: '👤 Пассажир', callback_data: 'role_passenger' }],
//                 [{ text: '🚗 Водитель', callback_data: 'role_driver' }]
//             ]
//         }
//     });
// });

// Смена роли
// bot.action(/role_(.+)/, async (ctx) => {
//     const role = ctx.match[1];
//     const userId = ctx.from.id;
//     const userRef = doc(db, 'users', String(userId));

//     await updateDoc(userRef, { role });
//     ctx.reply(`Ваша роль изменена на: ${role === 'passenger' ? '👤 Пассажир' : '🚗 Водитель'}`);
// });

// Создание объявления
// bot.command('create_ad', async (ctx) => {
//     ctx.reply(`Введите маршрут, цену и время в формате:\nГород отправления - Город назначения, Цена, Время`);

//     bot.on('text', async (ctx) => {
//         const text = ctx.message.text;
//         const [route, price, time] = text.split(',').map(item => item.trim());

//         if (!route || !price || !time) {
//             return ctx.reply('Неверный формат. Попробуйте снова.');
//         }

//         const userId = ctx.from.id;
//         const userRef = doc(db, 'users', String(userId));
//         const userDoc = await getDoc(userRef);

//         if (!userDoc.exists()) {
//             return ctx.reply('Сначала выберите роль командой /start');
//         }

//         await addDoc(collection(db, 'announcements'), {
//             userId,
//             role: userDoc.data().role,
//             route,
//             price,
//             time,
//             status: 'waiting'
//         });

//         ctx.reply('Ваше объявление создано!');
//     });
// });

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

// Поиск поездки
// bot.command('search_ad', async (ctx) => {
//     const queryText = ctx.message.text.split(' ').slice(1).join(' ');
//     if (!queryText) {
//         return ctx.reply('Введите маршрут для поиска.');
//     }

//     const q = query(collection(db, 'announcements'), where('route', '==', queryText));
//     const snapshot = await getDocs(q);

//     if (snapshot.empty) {
//         return ctx.reply('По этому маршруту ничего не найдено.');
//     }

//     let results = 'Найденные поездки:\n';
//     snapshot.forEach(doc => {
//         const ad = doc.data();
//         results += `🔹 ${ad.route} | ${ad.price} | ${ad.time} | ${ad.role === 'driver' ? '🚗 Водитель' : '👤 Пассажир'}\n`;
//     });

//     ctx.reply(results);
// });

// Обновление статуса
// bot.command('update_status', async (ctx) => {
//     const [orderId, status] = ctx.message.text.split(' ').slice(1);

//     if (!orderId || !['waiting', 'in_progress', 'completed', 'cancelled'].includes(status)) {
//         return ctx.reply('Использование: /update_status <id_поездки> <waiting|in_progress|completed|cancelled>');
//     }

//     const orderRef = doc(db, 'announcements', orderId);
//     await updateDoc(orderRef, { status });

//     ctx.reply(`Статус поездки ${orderId} обновлен на ${status}`);
// });

bot.start();
