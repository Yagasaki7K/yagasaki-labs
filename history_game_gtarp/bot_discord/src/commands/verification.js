import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } from 'discord.js';
import client, { commands } from '../client.js';

commands['verification'] = async (interaction) => {
    try {
        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('authButton')
                .setLabel('Verificar conta')
                .setEmoji('✅')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('whyCheck')
                .setLabel('Por que verificar a conta?')
                .setEmoji('❓')
                .setStyle(ButtonStyle.Secondary)
        );

        const verificationEmbed = new EmbedBuilder()
            .setColor(0x00c2cb)
            .setAuthor({
                name: `🔒 SISTEMA DE VERIFICAÇÃO - ${interaction.guild.name}`,
                iconURL: client.user.displayAvatarURL()
            })
            .setDescription([
                `> 👤 Olá, seja bem-vindo(a) à **${interaction.guild.name}**!`,
                '',
                'Para proteger nosso servidor e garantir que apenas humanos reais participem, pedimos que você complete a verificação.',
                '',
                '⚠️ Verificações automatizadas ajudam a manter a segurança de toda a comunidade.'
            ].join('\n'))
            .setThumbnail(client.user.displayAvatarURL())
            .setImage('https://sintoniasp.vercel.app/discord/ticket.png')
            .setFooter({
                text: `Sistema de Segurança Avançado • ${interaction.guild.name}`,
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        await interaction.channel.send({
            components: [buttons],
            embeds: [verificationEmbed]
        });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x00c2cb)
                    .setDescription('✅ Sistema de verificação iniciado com sucesso!')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em verification:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao iniciar o sistema de verificação.',
            ephemeral: true
        }).catch(() => {});
    }
};