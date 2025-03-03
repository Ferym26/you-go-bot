export function menu(bot) {
	bot.api.setMyCommands([
		{
			command: 'start',
			description: 'Запуск бота',
		},
		{
			command: 'comment',
			description: 'Отправить комментарий',
		},
	]);
}