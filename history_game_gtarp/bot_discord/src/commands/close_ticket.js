import mysql from '../mysql.js';
import config from '../config.js';
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { setTimeout } from 'timers/promises';
import client, { commands, buttons } from '../client.js';

const bot_table = config.ticket.table;

commands['close_ticket'] = async (interaction) => {
    try {
        const channel = interaction.channel;

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('🕔 O ticket será encerrado em 5 segundos...')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });

        for (let i = 4; i >= 0; i--) {
            await setTimeout(1000);
            if (i > 0) {
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`🕔 O ticket será encerrado em ${i} segundo(s)...`)
                            .setColor('#2f3136')
                    ]
                });
            } else {
                await channel.delete().catch((err) => console.error(`[ERRO] Não foi possível deletar o canal: ${channel.id}`, err));
            }
        }
    } catch (error) {
        console.error('Erro em close_ticket:', error);
        await interaction.editReply({
            content: 'Ocorreu um erro ao fechar o ticket.',
            ephemeral: true
        }).catch(() => {});
    }
};

commands['request_close'] = async (interaction) => {
    try {
        const channel = interaction.channel;
        const member = await interaction.guild.members.fetch(interaction.member.id);
        const is_staff = member.roles.cache.has(config.ticket.staff);

        const [[ticket]] = await mysql.query(
            `SELECT channel_id, discord_id FROM ${bot_table} WHERE channel_id = ?`,
            [channel.id]
        ).catch(() => [[]]);

        if (!ticket) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('❌ Você não está em um ticket válido.')
                        .setColor('#2f3136')
                ],
                ephemeral: true
            });
        }

        if (!is_staff) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`🔒 **${interaction.user.username}**, você não tem permissão para usar esta função.`)
                        .setColor('#2f3136')
                ],
                ephemeral: true
            });
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('⚠️ Finalizar atendimento')
                    .setColor(0xe34b52)
                    .addFields({
                        name: 'Atenção',
                        value: 'Após a finalização, o canal será deletado permanentemente.\nDeseja continuar com o encerramento do ticket?'
                    })
                    .setTimestamp()
                    .setFooter({
                        text: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('close_ticket')
                        .setLabel('Finalizar Ticket')
                        .setEmoji('🔒')
                        .setStyle(ButtonStyle.Danger)
                )
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em request_close:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao solicitar o fechamento do ticket.',
            ephemeral: true
        }).catch(() => {});
    }
};

buttons['request_close'] = commands['request_close'];
buttons['close_ticket'] = commands['close_ticket'];