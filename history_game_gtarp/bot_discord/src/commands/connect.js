import config from '../config.js';
import { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';
import client, { commands } from '../client.js';

commands['connect'] = async (interaction) => {
    try {
        let statusMessage = await interaction.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription('🔄 Buscando informações do servidor...')
                    .setColor('#2f3136')
            ]
        });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Fivem')
                .setURL(config.connect.link)
                .setStyle(ButtonStyle.Link)
                .setEmoji('🎮'),
            new ButtonBuilder()
                .setLabel('Loja Oficial')
                .setURL(config.connect.link2)
                .setStyle(ButtonStyle.Link)
                .setEmoji('🛒'),
            new ButtonBuilder()
                .setLabel('Instagram')
                .setURL(config.connect.link3)
                .setStyle(ButtonStyle.Link)
                .setEmoji('📸'),
            new ButtonBuilder()
                .setLabel('TikTok')
                .setURL(config.connect.link4)
                .setStyle(ButtonStyle.Link)
                .setEmoji('🎵')
        );

        const updateStatus = async () => {
            try {
                // Substituir por uma API confiável para FiveM
                const online = true; // Placeholder
                const players = 'N/A'; // Placeholder

                if (!online) {
                    await statusMessage.edit({
                        components: [],
                        embeds: [
                            new EmbedBuilder()
                                .setDescription('❌ Cidade offline, restabelecendo conexão com sistema. Aguarde...')
                                .setColor('#ff0000')
                        ]
                    });
                    return;
                }

                await statusMessage.edit({
                    components: [row],
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: interaction.guild.name,
                                iconURL: interaction.guild.iconURL()
                            })
                            .setTitle('🔗 SISTEMA DE STATUS OFICIAL')
                            .setDescription(`Sistema de status oficial da **${interaction.guild.name}**. Use os botões abaixo para **conectar**, acessar nossa **loja**, **Instagram** e **TikTok**.`)
                            .setColor('#2f3136')
                            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                            .setFooter({
                                text: `Sistema atualizado em tempo real: ${getDate().formattedHours}`,
                                iconURL: 'https://cdn.discordapp.com/emojis/593109163354357760.gif'
                            })
                            .addFields(
                                {
                                    name: '> __Status__:',
                                    value: '```yaml\nOnline```',
                                    inline: true
                                },
                                {
                                    name: '> __Jogadores__:',
                                    value: `\`\`\`ini\n[ ${players} / ${config.connect.players} ]\`\`\``,
                                    inline: true
                                },
                                {
                                    name: '> __IP Fivem__:',
                                    value: `\`\`\`fix\n${config.connect.link}\`\`\``
                                }
                            )
                    ]
                });
            } catch (err) {
                if (err.code === 10008) {
                    clearInterval(interval);
                } else {
                    console.error('[CONNECT] Erro ao atualizar status:', err);
                }
            }
        };

        await updateStatus();
        const interval = setInterval(updateStatus, 60000);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('✅ Sistema de connect iniciado com sucesso.')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('[CONNECT] Erro:', error);
        await interaction.reply({
            content: '❌ Não foi possível iniciar o sistema de status. Verifique permissões.',
            ephemeral: true
        }).catch(() => {});
    }
};

function getDate() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return {
        formattedTime: date.toLocaleDateString('pt-BR'),
        formattedHours: `${hours}:${minutes}:${seconds}`
    };
}