export default {
    sql: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'nill',
        port: 3306
    },
    channels: {
        welcome_channel: '1299175746220200009',
        exit_channel: '1299175746220200009'
    },
    atendimento: {
        category: '1423453408769216604',
        staff: '1309206570059698208'
    },
    idservidor: {
        id: '1266078631332151296',
        image: 'https://sintoniasp.vercel.app/discord/logo.png'
    },
    connect: {
        link: 'fivem://connect/128.201.228.211',
        link2: 'https://sintoniaofc.hydrus.gg/',
        link3: 'https://instagram.com',
        link4: 'https://tiktok.com',
        players: '2048',
        ipvps: '128.201.228.211:30120'
    },
    automatico: {
        authrole: '1266094736872050859',
        automessage: '1280944213000978555'
    },
    whitelist: {
        imageurl: 'https://sintoniasp.vercel.app/discord/allowlist.png',
        channelRole: '1318988801279787078',
        WhitelistIsOpen: false,
        simultaneousWhitelist: 50,
        category: '1266144905751953583',
        result: '1299175746220200009',
        staff: '1277367544562323569',
        channel: '1299175746220200009',
        waiting_role: '1299175746220200009',
        approved_role: '1299175746220200009',
        questions: [ // Adicionado para evitar erros
            {
                id: 1,
                question: 'Qual é o nome do seu personagem?',
                caracteres: 256,
                time: 5,
                history: false
            },
            // Adicione mais perguntas conforme necessário
        ]
    },
    liberation: {
        rename: '1299175746220200009',
        channel: '1299175746220200009',
        addRole: '1266094736872050859',
        removeRole: '1266094736872050859',
        table: 'vrp_users',
        column: 'whitelist',
        identifier: 'id'
    },
    ticket: {
        category: '1278409408342396948',
        staff: '1228139424827576329',
        table: 'discord',
        categories: [
            {
                label: '👥・Tickets de Suporte',
                description: 'Tickets para você tirar suas dúvidas.',
                value: 'Tirar dúvidas'
            },
            {
                label: '👥・Dúvidas Vips',
                description: 'Tire suas dúvidas sobre nosso sistema de Vips.',
                value: 'Realizar uma Dúvida sobre Vips'
            },
            {
                label: '🚨・Tickets de Denúncia',
                description: 'Viu algo de errado e tem como comprovar? Denúncie.',
                value: 'Realizar uma Denúncia'
            },
            {
                label: '📝・Solicitar FAC/ORG',
                description: 'Solicite a posse de uma facção ou organização.',
                value: 'Realizar uma Solicitação de FAC/ORG'
            }
        ]
    },
    allowlistcategories: [
        {
            label: 'Allowlist Normal',
            description: 'Enviar uma Allowlist Normal para análise.',
            emoji: '📝',
            value: 'Allowlist Normal'
        },
        {
            label: 'Allowlist Codiguin',
            description: 'Enviar uma Allowlist Vip para análise.',
            emoji: '🔑',
            value: 'Allowlist Codiguin'
        }
    ]
};