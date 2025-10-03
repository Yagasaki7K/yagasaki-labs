import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import config from '../config.js';
import { commands } from '../client.js';

commands['call'] = async (interaction) => {
    try {
        const cargo_perm = config.atendimento.staff;

        if (!interaction.member.roles.cache.has(cargo_perm)) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ **| Você precisa ter o cargo <@&${cargo_perm}> para utilizar este comando.**`)
                        .setColor(0xe34b52)
                ],
                ephemeral: true
            });
        }

        if (!interaction.channel.permissionsFor(interaction.client.user).has('Administrator')) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ **| ${interaction.user}, Eu preciso da permissão \`Administrador\`**`)
                        .setColor(0xe34b52)
                ],
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0x2195e1)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }) ?? null)
            .setTitle(`🎙️ Sistema de atendimento - ${interaction.guild.name}`)
            .setDescription('Para criar uma call de atendimento, clique no botão abaixo.\n**Obs:** Delete sua call no botão **DELETAR** assim que desconectar.')
            .setTimestamp()
            .setFooter({
                text: 'Copyright © 2025 - ByteOne Group - Todos os Direitos Reservados. Sintonia São Paulo RP',
                iconURL: interaction.guild.iconURL({ dynamic: true }) ?? undefined
            });

        const botao = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('criarcall')
                .setEmoji('🎙️')
                .setLabel('Criar Canal')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('deletecall')
                .setEmoji('🗑️')
                .setLabel('Deletar Canal')
                .setStyle(ButtonStyle.Danger)
        );

        await interaction.channel.send({ embeds: [embed], components: [botao] });
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('✅ Painel enviado com sucesso!')
                    .setColor(0x2f3136)
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em call:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao executar o comando.',
            ephemeral: true
        }).catch(() => {});
    }
};