import mysql from '../mysql.js';
import config from '../config.js';
import client from '../client.js';
import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

const bot_table = config.ticket.table;

client.on('guildMemberAdd', async (member) => {
    try {
        const welcome_channel = await client.channels.fetch(config.channels.welcome_channel).catch(() => null);
        if (!welcome_channel) return;

        const embed = new EmbedBuilder()
            .setColor(0x00c2cb)
            .setAuthor({ name: `Bem-vindo(a) à Arcadia RP!` })
            .setDescription([
                `> 👤 Olá **<@${member.id}>**, é um prazer ter você conosco!`,
                '',
                '📚 Leia atentamente o canal de regras para entender como tudo funciona.',
                '📢 Fique ligado nos anúncios para não perder nenhuma novidade.',
                '🎮 Prepare-se para viver experiências incríveis em nosso universo roleplay!'
            ].join('\n'))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setImage('https://imgur.com/NtefwDl.png')
            .setFooter({ text: 'Copyright © 2025 - ByteOne Group - Todos os Direitos Reservados. Sintonia São Paulo RP' })
            .setTimestamp();

        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Loja Oficial')
                .setURL(config.connect.link2)
                .setStyle(ButtonStyle.Link)
                .setEmoji('🛒'),
            new ButtonBuilder()
                .setLabel('Suporte')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.com/channels/1228139424760725504/1228139429709877302')
                .setEmoji('❓')
        );

        await welcome_channel.send({
            content: `👋 Seja bem-vindo ao servidor, <@${member.id}>!`,
            embeds: [embed],
            components: [buttons]
        });
    } catch (error) {
        console.error('Erro em guildMemberAdd:', error);
    }
});

client.on('guildMemberRemove', async (member) => {
    try {
        const exit_channel = await client.channels.fetch(config.channels.exit_channel).catch(() => null);
        if (!exit_channel) return;

        const embed = new EmbedBuilder()
            .setColor(0x00c2cb)
            .setAuthor({ name: `Até logo, ${member.user.username} 😢` })
            .setDescription([
                `> 👤 O membro **${member.user.tag}** acabou de sair do servidor.`,
                '',
                '🕒 Esperamos que tenha tido bons momentos aqui conosco.',
                '📬 A comunidade Arcadia RP sempre estará de portas abertas!',
                '',
                'Se quiser voltar a viver grandes histórias em nosso universo roleplay, estaremos te esperando de braços abertos.'
            ].join('\n'))
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setImage('https://imgur.com/uVIGK1o.png')
            .setFooter({ text: `Saída registrada • ${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await exit_channel.send({
            content: `📤 O usuário **${member.user.tag}** saiu do servidor.`,
            embeds: [embed]
        });

        const [[ticket]] = await mysql.query(
            `SELECT * FROM ${bot_table} WHERE discord_id = ? AND is_finished = 0 AND type = 'ticket'`,
            [member.id]
        ).catch(() => [[]]);

        if (ticket) {
            await member.guild.channels.delete(ticket.channel_id).catch(() => {});
        }

        if (config.liberation.table && config.liberation.column) {
            await mysql.query(`UPDATE ${config.liberation.table} SET ${config.liberation.column} = '0' WHERE discord = ?`, [member.id]).catch(() => {});
        }
    } catch (error) {
        console.error('Erro em guildMemberRemove:', error);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    try {
        const content = message.content.trim();
        const args = content.split(/\s+/);

        if (message.channel.id === config.liberation.rename) {
            if (args.length >= 3) {
                const [userId, ...nicknameParts] = args;
                const newNickname = nicknameParts.join(' ');

                const member = await message.guild.members.fetch(userId).catch(() => null);
                if (member) {
                    await member.setNickname(newNickname).catch((err) => console.error('Erro ao renomear:', err));
                }
            }
        } else if (message.channel.id === config.liberation.channelRole) {
            if (args.length >= 3) {
                const [userId, roleId, action] = args;
                const member = await message.guild.members.fetch(userId).catch(() => null);

                if (member) {
                    if (action.toLowerCase() === 'adicionar') {
                        await member.roles.add(roleId).catch((err) => console.error('Erro ao adicionar cargo:', err));
                    } else if (action.toLowerCase() === 'remover') {
                        await member.roles.remove(roleId).catch((err) => console.error('Erro ao remover cargo:', err));
                    }
                }
            }
        } else if (message.channel.id === config.liberation.channel) {
            const [passportId] = args;

            if (passportId && /^\d+$/.test(passportId)) {
                await message.delete().catch(() => {});

                await mysql.query(`UPDATE accounts SET whitelist = '1' WHERE id = ?`, [passportId]).catch((err) => console.error('Erro na liberação de whitelist:', err));

                const member = await message.guild.members.fetch(message.author.id).catch(() => null);
                if (member) {
                    await member.roles.add(config.liberation.addRole).catch(() => {});
                    await member.roles.remove(config.liberation.removeRole).catch(() => {});

                    const successEmbed = new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setDescription(`**<@${member.id}> Passaporte Liberado, Seja Bem-Vindo(a) à Cidade!**`);

                    const msg = await message.channel.send({ embeds: [successEmbed] });
                    setTimeout(() => msg.delete().catch(() => {}), 3000);
                }
            } else {
                await message.delete().catch(() => {});
            }
        }
    } catch (error) {
        console.error('Erro em messageCreate:', error);
    }
});

client.on('channelDelete', async (channel) => {
    try {
        const [[ticket]] = await mysql.query(
            `SELECT id FROM ${bot_table} WHERE channel_id = ? AND is_finished = 0 AND type = 'ticket'`,
            [channel.id]
        ).catch(() => [[]]);

        if (ticket) {
            await mysql.query(`DELETE FROM ${bot_table} WHERE channel_id = ? AND is_finished = 0`, [channel.id]).catch(() => {});
        }

        const [[whitelist]] = await mysql.query(
            `SELECT id FROM ${bot_table} WHERE channel_id = ? AND is_finished = 0 AND type = 'whitelist'`,
            [channel.id]
        ).catch(() => [[]]);

        if (whitelist) {
            await mysql.query(`DELETE FROM ${bot_table} WHERE channel_id = ? AND is_finished = 0`, [channel.id]).catch(() => {});
        }
    } catch (error) {
        console.error('Erro em channelDelete:', error);
    }
});