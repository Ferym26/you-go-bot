const menuList = [
	{
		command: 'start',
		description: 'Запуск бота',
	},
	{
		command: 'create_transfer_request',
		description: 'Создать объявление',
	},
	{
		command: 'show_transfer_requests',
		description: 'Показать список объявлений',
	},
]

export function menu(bot) {
	bot.api.setMyCommands(menuList);
}
