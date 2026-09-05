const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages, // Дозволяє боту реагувати на появу повідомлень
        GatewayIntentBits.MessageContent // Дозволяє боту бачити сам ТЕКСТ повідомлення
    ]
});

// 1. Описуємо структуру наших слеш-команд
const commands = [
    {
        name: 'шифр',
        description: 'Да ну как тебе сказать'
    },
    {
        name: 'ролл',
        description: 'От 1 до 100'
    },
    {
        name: 'оск',
        description: 'Оскорбляет',
        options: [
            {
                name: 'друн',
                description: 'Выбери кого обоссать',
                type: 6, // Тип 6 означає USER (Користувач)
                required: false
            }
        ]
    }
];

////////////////////////////////////////////////////////////////////
//client.once('clientReady', async () => {
//    console.log(`✅ Бот ${client.user.tag} успішно запущений!`);
//    await client.application.commands.set([]);
//    client.guilds.cache.forEach(async (guild) => {
//        await guild.commands.set([]);
//    });
//    console.log('🗑️ Запит на видалення старих слеш-команд відправлено!');
//});


// Подія: коли бот успішно запустився
client.once('clientReady', async () => {
    console.log(`✅ Бот ${client.user.tag} успішно запущений!`);
    
    try {
        // Реєструємо актуальні команди у Discord
        await client.application.commands.set(commands);
        console.log('✅ Слеш-команди успішно зареєстровані!');
    } catch (error) {
        console.error('Помилка реєстрації команд:', error);
    }
});



// Подія: коли хтось використовує слеш-команду
client.on('interactionCreate', async (interaction) => {
    // Якщо це не слеш-команда — ігноруємо
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    //////////////////ШИФР///////////////////////////
    if (commandName === 'шифр') {
        await interaction.reply('да потом нахрен');
    }
    
    ///////////////////////РОЛЛ///////////////////////////
    if (commandName === 'ролл') {
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        await interaction.reply(`Тебе выпало: ${randomNumber} 🎲`);
    }

    ////////////////////////ОСК///////////////////////////////
    if (commandName === 'оск') {
        // Отримуємо користувача з налаштувань команди АБО беремо автора команди
        const targetUser = interaction.options.getUser('друн') || interaction.user;
        
        const answers = [
           'гондон',
            'сын вари',
            'проститутка',
            'ублюдок толстый',
            'мама качает жопу как антилопа',
            'тупорылый',
            'чмооошник',
            'умрёт завтра',
            'бомжара',
            'мясо для ебли',
            'нет родителей',
            'несколько лишних хромосом',
            'писька 1 сантиметр', //////////12/////////////
            'конченный',
            'тупой',
            'дибилёк',
        ];
        
        // Запобіжник: якщо список порожній, щоб бот не видавав помилку
        if (answers.length === 0) {
            return interaction.reply('Да не');
        }
        
        const randomIndex = Math.floor(Math.random() * answers.length);
        const randomAnswer = answers[randomIndex];
        
        let finalMessage = `${targetUser} ${randomAnswer}`;

        // Якщо випало 5-те, 11-те, 12-те або 13-те передбачення (індекси 4, 10, 11, 12)
        if (randomIndex === 4 || randomIndex === 10 || randomIndex === 11 || randomIndex === 12) {
            finalMessage = `У ${targetUser} ${randomAnswer}`;
        }
        
        await interaction.reply(finalMessage);
    }
});

client.login('токен');




// Подія: коли хтось пише повідомлення на сервері
client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith('зомби лох')) {
        message.reply('Пошёл нахрен ты');
    } 
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().startsWith('здарова')) {
        message.reply('Здарова нахрен');
    } 
});

