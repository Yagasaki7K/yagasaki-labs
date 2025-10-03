import config from './config.js';
import {
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ModalBuilder,
    EmbedBuilder,
    TextInputBuilder,
    TextInputStyle,
    StringSelectMenuBuilder
} from 'discord.js';

export default {
    whitelist: {
        defaultMessage: {
            title: '📝 Sistema de Allowlist - Sintonia São Paulo',
            description: [
                '📄 Selecione uma das opções abaixo para criar uma sala para enviar a sua **ALLOWLIST**.',
                '',
                '```🚨 LEIA PARA PROSSEGUIR 🚨```',
                'Assim que você terminar a sua ALLOWLIST, pedirei para você confirmar o envio dela, assim ela será enviada para **ANÁLISE**. Não se preocupe se errar algo, pois você pode cancelar e começar novamente se necessário.',
                '',
                '**É muito importante que você confirme o envio, caso contrário, sua ALLOWLIST não será enviada para ANÁLISE.**',
                '',
                '```📑 Yagasaki7K```',
                'Você recebe acesso prioritário à análise da sua Allowlist visitando o canal #desconhecido ou entrando em contato via ATENDIMENTO.'
            ].join('\n'),
            color: 0x2195e1,
            image: { url: config.whitelist.imageurl },
            footer: { text: 'Copyright © 2025 - ByteOne Group - Todos os Direitos Reservados. Sintonia São Paulo RP' }
        },
        waitResult: {
            embeds: [
                new EmbedBuilder()
                    .setDescription('Você já está em processo de análise, aguarde até que o resultado seja informado.')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        },
        rateLimit: {
            embeds: [
                new EmbedBuilder()
                    .setDescription('Existem muitas whitelists sendo feitas no momento, aguarde um momento...')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        },
        finished: {
            title: '**Finalizando**',
            description: 'Estou computando suas respostas...\nAguarde, isso pode levar alguns segundos.',
            color: 0x2f3136
        },
        questionBuilder: (client, question) => ({
            title: `Pergunta ${question.id}/${config.whitelist.questions.length}`,
            description: question.question,
            color: 0x2f3136,
            author: {
                name: `📝 Allowlist - ${client.guilds.cache.get(config.idservidor.id).name}`,
                iconURL: client.user.avatarURL()
            }
        }),
        createChannel: (name, category, guild, member) => ({
            name: `📄┆allowlist-${name}`,
            parent: category,
            topic: 'Formulário para whitelist',
            reason: 'Criando formulário de whitelist',
            permissionOverwrites: [
                { id: member.id, allow: ['ViewChannel'], deny: ['SendMessages'] },
                { id: guild.roles.everyone.id, deny: ['ViewChannel'] }
            ]
        }),
        initWhitelist: (client, member) => ({
            content: `<@${member.id}>`,
            embeds: [
                new EmbedBuilder()
                    .setColor(0x2f3136)
                    .setAuthor({
                        name: `📝 Allowlist - ${client.guilds.cache.get(config.idservidor.id).name}`,
                        iconURL: client.user.avatarURL()
                    })
                    .setDescription([
                        'Aqui vão algumas dicas antes de iniciar sua **ALLOWLIST**:',
                        '',
                        'Você tem **5 minutos** para **iniciar a allowlist**, caso contrário a **sala se fecha** e você terá que começar novamente.',
                        '',
                        'Cada **RESPOSTA** tem o limite de **4000 CARACTERES** para quem **TEM NITRO** e **2000 CARACTERES** para quem **NÃO TEM NITRO**.',
                        'Se precisar ultrapassar, use **Pastebin** para enviar o link, apenas na pergunta que solicita a **HISTÓRIA** do personagem.',
                        'Anexar **ARQUIVOS** ou **LINKS** em outras perguntas anulará sua **ALLOWLIST**.',
                        '',
                        'Caso não queira enviar sua **ALLOWLIST** para análise, você pode **OPTAR** por **ENVIAR** ou **NÃO ENVIAR**.',
                        '',
                        '❗ **Este canal será deletado 30 segundos após o envio da sua allowlist**.'
                    ].join('\n'))
            ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('init_whitelist')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('📝')
                        .setLabel('Iniciar Allowlist')
                )
            ]
        }),
        createButton: (custom_id, label, style) => new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(custom_id)
                .setStyle(style)
                .setLabel(label)
        ),
        createResultButtons: (member_id) => new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`approve-${member_id}`)
                    .setStyle(ButtonStyle.Success)
                    .setLabel('Aprovar Whitelist')
                    .setEmoji('✅'),
                new ButtonBuilder()
                    .setCustomId(`fail-${member_id}`)
                    .setStyle(ButtonStyle.Danger)
                    .setLabel('Reprovar Whitelist')
                    .setEmoji('❌')
            ),
        createTextInput: (question) => {
            const modal = new ModalBuilder()
                .setCustomId(`question-${question.id}`)
                .setTitle(`PERGUNTA ${question.id}/${config.whitelist.questions.length}`);
            const textInput = new TextInputBuilder()
                .setCustomId(`question-${question.id}`)
                .setLabel('Responda atentamente a sua allowlist')
                .setPlaceholder('Escreva sua resposta aqui')
                .setStyle(question.caracteres > 256 ? TextInputStyle.Paragraph : TextInputStyle.Short)
                .setRequired(true)
                .setMinLength(1)
                .setMaxLength(question.caracteres);
            return [modal, textInput];
        },
        formBody: (member_infos, member_id) => ({
            title: 'Análise de whitelist',
            color: 0x2f3136,
            description: `Formulário feito por: <@${member_id}>`,
            fields: member_infos.answers,
            timestamp: new Date().toISOString(),
            footer: { text: 'Usuário em análise' }
        }),
        buttonCreateWhitelist: new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('create_whitelist')
                .setPlaceholder('Selecione uma opção')
                .addOptions(config.allowlistcategories)
        )
    },
    ticket: {
        closeButton: () => new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('request_close')
                .setEmoji('🔒')
                .setStyle(ButtonStyle.Primary)
                .setLabel('Finalizar Ticket')
        ),
        createTicketButton: () => new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('create_ticket')
                .setPlaceholder('Clique aqui para escolher uma categoria')
                .addOptions(config.ticket.categories)
        )
    },
    useful: {
        embedBuilder: (title, description) => ({
            title,
            color: 0x2f3136,
            description,
            timestamp: new Date().toISOString()
        })
    }
};

function IdentifierGenerator() {
    return 'xxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}