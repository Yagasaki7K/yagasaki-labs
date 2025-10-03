import {
    Client,
    GatewayIntentBits,
    ActivityType,
    EmbedBuilder
} from 'discord.js';
import config from './config.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // Requer ativação no Discord Developer Portal
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.DirectMessages
    ]
});

export default client;
export const commands = {};
export const selects = {};
export const buttons = {};
export const autocompletes = {};

client.on('interactionCreate', async (interaction) => {
    try {
        if (interaction.isCommand()) {
            if (commands[interaction.commandName]) {
                await commands[interaction.commandName](interaction);
            }
        } else if (interaction.isStringSelectMenu()) {
            if (selects[interaction.customId]) {
                await selects[interaction.customId](interaction);
            }
        } else if (interaction.isButton()) {
            if (buttons[interaction.customId]) {
                await buttons[interaction.customId](interaction);
            } else {
                switch (interaction.customId) {
                    case 'authButton':
                        if (interaction.member.roles.cache.has(config.automatico.authrole)) {
                            await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setDescription('❌ | Você já foi verificado pelo servidor.')
                                        .setColor('Red')
                                ],
                                ephemeral: true
                            });
                            return;
                        }

                        await interaction.member.roles.add(config.automatico.authrole);
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`✅ **${interaction.user.username}**, obrigado por confirmar sua conta! Seja bem-vindo(a)!`)
                                    .setColor('Green')
                            ],
                            ephemeral: true
                        });
                        break;

                    case 'whyCheck':
                        await interaction.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setTitle('🛡️ Por que ter uma verificação de conta...')
                                    .setDescription([
                                        `> 👤 Olá **${interaction.user.username}**, bem-vindo(a) à **${interaction.guild.name}**!`,
                                        '',
                                        'Para proteger nosso servidor e garantir que apenas humanos reais participem, pedimos que você complete a verificação.',
                                        '',
                                        'Clique no botão abaixo para confirmar sua identidade e obter acesso completo.',
                                        '',
                                        '⚠️ Verificações automatizadas ajudam a manter a segurança de toda a comunidade.'
                                    ].join('\n'))
                                    .setColor('#2f3136')
                            ],
                            ephemeral: true
                        });
                        break;
                }
            }
        } else if (interaction.isAutocomplete()) {
            if (autocompletes[interaction.commandName]) {
                await autocompletes[interaction.commandName](interaction);
            }
        }
    } catch (error) {
        console.error('Erro em interactionCreate:', error);
        if (!interaction.replied) {
            await interaction.reply({ content: 'Ocorreu um erro ao processar sua interação.', ephemeral: true }).catch(() => {});
        }
    }
});

client.on('clientReady', async () => {
    console.log(`
    ┏━━━━━━━━━━━━━━━━━━━━━┓
    ┃      YAGASAKI7K     ┃
    ┃      DISCORD BOT    ┃
    ┃      IS RUNNING     ┃
    ┃                     ┃
    ┃      VERSION 1.0    ┃
    ┗━━━━━━━━━━━━━━━━━━━━━┛
    `);

    // Atualizar comandos de slash
    await client.application.commands.set([
        {
            name: 'ticket',
            description: 'Enviar mensagem para abrir ticket',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'connect',
            description: 'Enviar mensagem para connect',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'call',
            description: 'Crie sua call de atendimento.',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'liberation',
            description: 'Enviar mensagem para liberação',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'verification',
            description: 'Enviar mensagem para verificação',
            defaultMemberPermissions: 'Administrator',
            dmPermission: false
        },
        {
            name: 'whitelist',
            description: 'Enviar mensagem para iniciar a whitelist',
            defaultMemberPermissions: 'Administrator',
            dmPermission: true
        },
        {
            name: 'embed',
            description: 'Enviar um embed com uma mensagem em um canal',
            defaultMemberPermissions: 'Administrator',
            options: [
                {
                    description: 'Título do Embed',
                    name: 'title',
                    type: 3, // String
                    required: true
                },
                {
                    description: 'Descrição do Embed',
                    name: 'description',
                    type: 3, // String
                    required: true
                },
                {
                    description: 'Conteúdo da mensagem',
                    name: 'content',
                    type: 3 // String
                }
            ],
            dmPermission: false
        }
    ]);

    // Configurar atividades
    const activities = [
        { name: '📄 | Verificando allowlists', type: ActivityType.Custom },
        { name: `❤️ | ${client.guilds.cache.get(config.idservidor.id)?.name || 'Servidor'}`, type: ActivityType.Playing },
        { name: '⚙️ VERSÃO [6.0.1]', type: ActivityType.Custom },
        { name: 'DÚVIDAS? ABRA UM TICKET', type: ActivityType.Custom },
        { name: '🚀 PLAYERS ONLINE: [Carregando...]', type: ActivityType.Custom } // Placeholder
    ];

    let i = 0;
    setInterval(async () => {
        try {
            // Atualizar número de jogadores (substituir por API confiável)
            // Exemplo: const players = await getPlayerCount(config.connect.ipvps);
            activities[4].name = '🚀 PLAYERS ONLINE: [N/A]'; // Placeholder
            client.user.setActivity(activities[i]);
            i = (i + 1) % activities.length;
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
        }
    }, 5000);

    // Enviar mensagem automática
    setInterval(async () => {
        try {
            const channel = await client.channels.fetch(config.automatico.automessage).catch(() => null);
            if (channel) {
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('🔔 Leia nossas Regras para garantir o envio de uma boa **ALLOWLIST.**')
                            .setColor('#2f3136')
                    ]
                });
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem automática:', error);
        }
    }, 60 * 60 * 1000); // 1 hora
});

process.on('uncaughtException', (err) => console.error('Erro não capturado:', err));
client.login(process.env.TOKEN);