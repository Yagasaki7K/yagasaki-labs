import { EmbedBuilder } from 'discord.js';
import client, { commands } from '../client.js';

commands['liberation'] = async (interaction) => {
    try {
        await interaction.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: interaction.guild.name,
                        iconURL: client.user.avatarURL()
                    })
                    .setColor('#2f3136')
                    .setDescription([
                        '↪️ Para realizar sua liberação, envie seu **ID** logo abaixo.',
                        '↪️ A liberação é automática, caso ocorra algum problema, abra um **TICKET**.',
                        '↪️ Para obter seu **ID**, conecte-se ao servidor usando a sala de conexão!'
                    ].join('\n'))
            ]
        });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Sistema de liberação iniciado.')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em liberation:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao iniciar o sistema de liberação.',
            ephemeral: true
        }).catch(() => {});
    }
};