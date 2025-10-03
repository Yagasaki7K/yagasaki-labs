import mysql from '../mysql.js';
import config from '../config.js';
import messages from '../messages.js';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from 'discord.js';
import client, { selects, commands } from '../client.js';

const bot_table = config.ticket.table;

selects['create_ticket'] = async (interaction) => {
    try {
        await interaction.message.edit({
            components: interaction.message.components
        });

        const ticket = interaction.values[0];
        const [[ticket_created]] = await mysql.query(
            `SELECT * FROM ${bot_table} WHERE discord_id = ? AND is_finished = 0 AND type = 'ticket'`,
            [interaction.member.id]
        ).catch(() => [[]]);

        if (ticket_created) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Você já possui um ticket criado: <#${ticket_created.channel_id}>`)
                        .setColor('#2f3136')
                ],
                ephemeral: true
            });
        }

        const channel = await createTicket(ticket, config.ticket.category, interaction.member);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`ℹ️ **${interaction.user.username}**, seu **TICKET** foi criado com sucesso no canal <#${channel.id}>`)
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em create_ticket:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao criar o ticket.',
            ephemeral: true
        }).catch(() => {});
    }
};

async function createTicket(topic, category, member) {
    const [ticket] = await mysql.query(
        `INSERT INTO ${bot_table}(discord_id, type) VALUES(?, ?)`,
        [member.id, 'ticket']
    ).catch((err) => { throw new Error(`Erro ao criar ticket no banco: ${err}`); });

    const guild = member.guild;
    const channel = await guild.channels.create({
        name: `📁・ticket-${IdentifierGenerator()}`,
        parent: category,
        topic,
        reason: 'Criando ticket de atendimento',
        permissionOverwrites: [
            { id: member.id, allow: ['ViewChannel', 'SendMessages'] },
            { id: guild.roles.everyone.id, deny: ['ViewChannel'] },
            { id: config.ticket.staff, allow: ['ViewChannel', 'SendMessages'] }
        ]
    });

    await mysql.query(`UPDATE ${bot_table} SET channel_id = ? WHERE id = ?`, [channel.id, ticket.insertId]).catch(() => {});

    await channel.send({
        embeds: [
            new EmbedBuilder()
                .setDescription(`**\`\`TICKET ${IdentifierGenerator().toUpperCase()}\`\` aberto por ${member.user.username}**\n\nCaso queira **SAIR** desse canal, clique em **Sair do Canal**\n\nAssunto\n\`\`\`${topic}\`\`\``)
                .setColor(0xe34b52)
        ],
        components: [messages.ticket.closeButton()]
    });

    return channel;
}

commands['ticket'] = async (interaction) => {
    try {
        await interaction.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x2191e1)
                    .setAuthor({
                        name: interaction.guild.name,
                        iconURL: interaction.guild.iconURL()
                    })
                    .setImage('https://sintoniasp.vercel.app/discord/ticket.png')
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTitle(`🎫 Painel de atendimento - ${interaction.guild.name}`)
                    .setDescription('Bem-vindo! Escolha uma opção abaixo, inicie seu ticket e logo um de nossos staffs irá atendê-lo.')
                    .setTimestamp()
                    .setFooter({
                        text: 'Copyright © 2025 - ByteOne Group - Todos os Direitos Reservados. Sintonia São Paulo RP',
                        iconURL: client.user.displayAvatarURL()
                    })
            ],
            components: [messages.ticket.createTicketButton()]
        });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('✅ Painel Ticket enviado com sucesso.')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em ticket:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao enviar o painel de tickets.',
            ephemeral: true
        }).catch(() => {});
    }
};

function IdentifierGenerator() {
    return 'xxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}