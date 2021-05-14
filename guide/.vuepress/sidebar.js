module.exports = {
	'/commando/': [
		{
			title: 'Ev',
			children: [
				'/',
				'/requesting-more-content',
			],
		},
		{
			title: 'Başlarken',
			children: [
				'/commando/',
				'/commando/first-command',
			],
		},
		{
			title: 'Ekstra Komut Bilgisi',
			children: [
				'/commando/throttling',
				'/commando/guild-only',
				'/commando/permissions',
			],
		},
		{
			title: 'Argümanlar',
			children: [
				'/commando/args',
				'/commando/validators',
			],
		},
		{
			title: 'Ek Bilgiler',
			children: [
				'/commando/client-values',
				'/commando/unknown-command-response',
			],
		},
	],
	'/': [
		{
			title: 'Ev',
			children: [
				'/',
				'requesting-more-content',
			],
		},
		{
			title: 'Kurulumlar ve Hazırlıklar',
			children: [
				'/preparations/',
				'/preparations/setting-up-a-linter',
				'/preparations/setting-up-a-bot-application',
				'/preparations/adding-your-bot-to-servers',
			],
		},
		{
			title: 'Botunuzu Oluşturmak',
			children: [
				'/creating-your-bot/',
				'/creating-your-bot/configuration-files',
				'/creating-your-bot/adding-more-commands',
				'/creating-your-bot/commands-with-user-input',
			],
		},
		{
			title: 'Komut İşleyici',
			children: [
				'/command-handling/',
				'/command-handling/dynamic-commands',
				'/command-handling/adding-features',
			],
		},
		{
			title: 'Olay işleyicisi',
			children: [
				'/event-handling/',
			],
		},
		{
			title: 'Popüler Konular',
			children: [
				'/popular-topics/faq',
				'/popular-topics/embeds',
				'/popular-topics/errors',
				'/popular-topics/permissions',
				'/popular-topics/permissions-extended',
				'/popular-topics/reactions',
				'/popular-topics/collectors',
				'/popular-topics/partials',
				'/popular-topics/intents',
				'/popular-topics/canvas',
				'/popular-topics/webhooks',
				'/popular-topics/audit-logs',
			],
		},
		{
			title: 'Çeşitli',
			children: [
				'/miscellaneous/parsing-mention-arguments',
				'/miscellaneous/useful-packages',
			],
		},
		{
			title: 'Veritabanları',
			children: [
				'/sequelize/',
				'/sequelize/currency',
				'/keyv/',
			],
		},
		{
			title: 'Parçalama',
			children: [
				'/sharding/',
				'/sharding/additional-information',
				'/sharding/extended',
			],
		},
		{
			title: 'OAuth2',
			children: [
				'/oauth2/',
			],
		},
		{
			title: 'Ses',
			children: [
				'/voice/',
				'/voice/understanding-voice',
				'/voice/the-basics',
				'/voice/voice-broadcasts',
				'/voice/optimisation-and-troubleshooting',
				'/voice/receiving-audio',
			],
		},
		{
			title: 'Geliştirme Ortamınızı İyileştirme',
			children: [
				'/improving-dev-environment/pm2',
				'/improving-dev-environment/package-json-scripts',
			],
		},
		{
			title: 'Ek Bilgiler',
			children: [
				'/additional-info/notation',
				'/additional-info/es6-syntax',
				'/additional-info/collections',
				'/additional-info/async-await',
				'/additional-info/rest-api',
				'/additional-info/changes-in-v12',
			],
		},
	],
};
