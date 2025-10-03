import mysql from '../mysql.js';
import config from '../config.js';
import messages from '../messages.js';
import client, { buttons, commands, selects } from '../client.js';
import { ActionRowBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } from 'discord.js';

const bot_table = config.ticket.table;
const usersCache = {};

commands['whitelist'] = async (interaction) => {
    try {
        await interaction.channel.send({
            embeds: [messages.whitelist.defaultMessage],
            components: [messages.whitelist.buttonCreateWhitelist]
        });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Sistema de allowlist criado.')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em whitelist:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao criar o sistema de allowlist.',
            ephemeral: true
        }).catch(() => {});
    }
};

selects['create_whitelist'] = async (interaction) => {
    try {
        await interaction.message.edit({
            components: interaction.message.components
        });

        if (!config.whitelist.WhitelistIsOpen) {
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`❌ ${interaction.user.username}, a **ALLOWLIST NORMAL** encontra-se fechada no momento.`)
                        .setColor('#FF0000')
                ],
                ephemeral: true
            });
        }

        if (Object.keys(usersCache).length >= config.whitelist.simultaneousWhitelist) {
            return interaction.reply(messages.whitelist.rateLimit);
        }

        const [[waiting_result]] = await mysql.query(
            `SELECT 1 FROM ${bot_table} WHERE discord_id = ? AND is_finished = 0 AND type = 'whitelist'`,
            [interaction.member.id]
        ).catch(() => [[]]);

        if (waiting_result) return interaction.reply(messages.whitelist.waitResult);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Preparando sua allowlist...')
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });

        const channel = await createWhitelist(config.whitelist.category, interaction.member);

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`📑 <@${interaction.member.id}>, foi criado o canal **<#${channel.id}>** para você começar a responder a sua allowlist.`)
                    .setColor('#2f3136')
            ],
            ephemeral: true
        });
    } catch (error) {
        console.error('Erro em create_whitelist:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao criar a whitelist.',
            ephemeral: true
        }).catch(() => {});
    }
};

async function createWhitelist(category, member) {
    const [whitelist] = await mysql.query(
        `INSERT INTO ${bot_table}(discord_id, type) VALUES(?, ?)`,
        [member.id, 'whitelist']
    ).catch((err) => { throw new Error(`Erro ao criar whitelist no banco: ${err}`); });

    const guild = member.guild;
    const channel = await guild.channels.create(
        messages.whitelist.createChannel(whitelist.insertId.toString().padStart(4, '0'), category, guild, member)
    );

    await mysql.query(`UPDATE ${bot_table} SET channel_id = ? WHERE id = ?`, [channel.id, whitelist.insertId]).catch(() => {});

    await channel.send(messages.whitelist.initWhitelist(client, member));

    usersCache[member.id] = {
        firstTimeout: createFirstTimeout(channel, member)
    };

    return channel;
}

buttons['init_whitelist'] = async (interaction) => {
    try {
        clearTimeout(usersCache[interaction.member.id]?.firstTimeout);

        usersCache[interaction.member.id] = {
            quest: 0,
            timeout: createTimeout(config.whitelist.questions[0].time, interaction),
            answers: []
        };

        const questNumber = usersCache[interaction.member.id].quest;
        const question = config.whitelist.questions[questNumber];

        if (question) {
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Aguarde, sua allowlist está sendo preparada...')
                        .setColor('#2f3136')
                ]
            });

            setTimeout(() => {
                interaction.deleteReply().catch(() => {});
                interaction.message.edit({
                    content: `<@${interaction.member.id}>`,
                    embeds: [messages.whitelist.questionBuilder(client, question)],
                    components: [messages.whitelist.createButton('answer_quest', 'Responder pergunta', ButtonStyle.Secondary)]
                });
            }, 2000);
        }
    } catch (error) {
        console.error('Erro em init_whitelist:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao iniciar a whitelist.',
            ephemeral: true
        }).catch(() => {});
    }
};

buttons['answer_quest'] = async (interaction) => {
    try {
        let questNumber = usersCache[interaction.member.id]?.quest;
        let question = config.whitelist.questions[questNumber];

        if (questNumber != null) {
            const [modal, modelQuestion] = messages.whitelist.createTextInput(question);
            const modelQuestionRow = new ActionRowBuilder().addComponents(modelQuestion);
            modal.addComponents(modelQuestionRow);
            await interaction.showModal(modal);

            try {
                const result = await interaction.awaitModalSubmit({
                    time: question.time * 60000
                });

                if (result && usersCache[interaction.member.id]?.quest === questNumber) {
                    clearTimeout(usersCache[interaction.member.id]?.timeout);

                    if (!question.history) {
                        usersCache[interaction.member.id].answers.push({
                            name: question.question,
                            value: result.fields.getTextInputValue(`question-${question.id}`)
                        });
                    } else {
                        usersCache[interaction.member.id].history = result.fields.getTextInputValue(`question-${question.id}`);
                    }

                    const next = config.whitelist.questions[questNumber + 1];
                    if (next) {
                        usersCache[interaction.member.id].timeout = createTimeout(next.time, interaction);
                        usersCache[interaction.member.id].quest++;
                        question = next;

                        await result.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Resposta coletada, estou preparando a próxima pergunta!')
                                    .setColor('#2f3136')
                            ],
                            ephemeral: true
                        });

                        await result.deleteReply();

                        await interaction.message.edit({
                            content: `<@${interaction.member.id}>`,
                            embeds: [messages.whitelist.questionBuilder(client, question)],
                            components: [messages.whitelist.createButton('answer_quest', 'Responder pergunta', ButtonStyle.Secondary)]
                        });
                    } else {
                        await interaction.message.edit({
                            content: `<@${interaction.member.id}>`,
                            embeds: [messages.whitelist.finished],
                            components: []
                        });

                        await result.reply({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription('Canal será encerrado dentro de 10 segundos')
                                    .setColor('#2f3136')
                            ],
                            ephemeral: true
                        });

                        const guild = interaction.member.guild;
                        const content = usersCache[interaction.member.id].history || '';
                        const file = new AttachmentBuilder(Buffer.from(content), { name: 'history.txt' });

                        await interaction.member.roles.add(config.whitelist.waiting_role).catch((err) => {
                            console.error(`Não tenho permissões para alterar os cargos do usuário ${interaction.member.id}:`, err);
                        });

                        const logsChannel = await guild.channels.fetch(config.whitelist.channel).catch(() => null);
                        if (logsChannel) {
                            await logsChannel.send({
                                content: `Formulário de <@${interaction.member.id}>`,
                                embeds: [messages.whitelist.formBody(usersCache[interaction.member.id], interaction.member.id)],
                                components: [messages.whitelist.createResultButtons(interaction.member.id)],
                                files: [file]
                            });
                        }

                        setTimeout(() => {
                            interaction.channel.delete().catch(() => {});
                            delete usersCache[interaction.member.id];
                        }, 10000);
                    }
                }
            } catch (err) {
                console.error('Erro ao aguardar modal:', err);
            }
        } else {
            await interaction.message.delete().catch(() => {});
            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription('Houve um erro, inicie sua whitelist novamente.')
                        .setColor('#2f3136')
                ],
                ephemeral: true
            });

            setTimeout(() => {
                interaction.channel.delete().catch(() => {});
                cancelWhitelist(interaction.member.id);
            }, 3000);
        }
    } catch (error) {
        console.error('Erro em answer_quest:', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao processar a resposta da whitelist.',
            ephemeral: true
        }).catch(() => {});
    }
};

client.on('interactionCreate', async (interaction) => {
    try {
        if (interaction.isButton() && (interaction.customId.startsWith('approve-') || interaction.customId.startsWith('fail-'))) {
            const guild = interaction.guild;
            const discord_id = interaction.customId.replace(/^(approve|fail)-/, '');

            const staff = await guild.members.fetch(interaction.member.id).catch(() => null);
            const is_staff = staff?.roles.cache.has(config.whitelist.staff);
            if (!is_staff) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Você não possui permissão!')
                            .setColor('#2f3136')
                    ],
                    ephemeral: true
                });
            }

            const logsChannel = await guild.channels.fetch(config.whitelist.result).catch(() => null);
            if (!logsChannel) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Não foi possível encontrar o canal de resultados da whitelist!')
                            .setColor('#2f3136')
                    ],
                    ephemeral: true
                });
            }

            const [[whitelist]] = await mysql.query(
                `SELECT id, is_finished FROM ${bot_table} WHERE type = 'whitelist' AND discord_id = ?`,
                [discord_id]
            ).catch(() => [[]]);

            const [[whitelistAwait]] = await mysql.query(
                `SELECT 1 FROM ${bot_table} WHERE type = 'whitelist' AND discord_id = ? AND is_finished = 0`,
                [discord_id]
            ).catch(() => [[]]);

            if (whitelist?.is_finished && !whitelistAwait) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Whitelist deste usuário já foi lida!')
                            .setColor('#2f3136')
                    ],
                    ephemeral: true
                });
            }

            const member = await guild.members.fetch(discord_id).catch(() => null);
            if (!member) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Usuário não encontrado!')
                            .setColor('#2f3136')
                    ],
                    ephemeral: true
                });
            }

            const newEmbed = interaction.message.embeds[0];

            if (interaction.customId.startsWith('approve-')) {
                await logsChannel.send({
                    content: `✅ <@${member.id}> sua **ALLOWLIST** foi **APROVADA** em nosso servidor, \`\`PARABÉNS\`\`! Agora aguarde para **REALIZAR** entrevista conecte-se em <#1235052792977035387>.`
                });

                await interaction.message.edit({
                    embeds: [{
                        title: 'Whitelist foi aprovada!',
                        description: newEmbed.description,
                        fields: newEmbed.fields,
                        color: newEmbed.color,
                        footer: { text: `Usuário aprovado(a) por: ${interaction.user.tag}` },
                        timestamp: new Date().toISOString()
                    }],
                    components: []
                });

                await member.roles.add(config.whitelist.approved_role).catch(() => {});
                await member.roles.remove(config.whitelist.waiting_role).catch(() => {});

                if (whitelist) {
                    await mysql.query(`UPDATE ${bot_table} SET is_finished = 1 WHERE id = ?`, [whitelist.id]).catch(() => {});
                }

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Whitelist aprovada com sucesso!')
                            .setColor('#2f3136')
                    ],
                    ephemeral: true
                });
            } else {
                await member.roles.remove(config.whitelist.waiting_role).catch(() => {});

                await logsChannel.send({
                    content: `❌ <@${member.id}> sua **ALLOWLIST** foi **REPROVADA** em nosso servidor! Preste mais atenção nas perguntas e na elaboração da sua próxima **ALLOWLIST**.`
                });

                await interaction.message.edit({
                    embeds: [{
                        title: 'Whitelist foi reprovada!',
                        description: newEmbed.description,
                        fields: newEmbed.fields,
                        color: newEmbed.color,
                        footer: { text: `Usuário reprovado(a) por: ${interaction.user.tag}` },
                        timestamp: new Date().toISOString()
                    }],
                    components: []
                });

                if (whitelist) {
                    await mysql.query(`UPDATE ${bot_table} SET is_finished = 1 WHERE id = ?`, [whitelist.id]).catch(() => {});
                }

                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Whitelist reprovada com sucesso!')
                            .setColor('#2f3136')
                    ],
                    ephemeral: true
                });
            }
        }
    } catch (error) {
        console.error('Erro em interactionCreate (whitelist):', error);
        await interaction.reply({
            content: 'Ocorreu um erro ao processar a ação da whitelist.',
            ephemeral: true
        }).catch(() => {});
    }
});

function createTimeout(time, interaction) {
    return setTimeout(async () => {
        try {
            const guild = interaction.member.guild;
            const channel = await guild.channels.fetch(interaction.channel.id).catch(() => null);
            if (channel) {
                await interaction.member.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`❌ **<@${interaction.member.id}>, sua allowlist expirou por inatividade.**`)
                            .setColor('#FF0000')
                    ]
                }).catch(() => {});
                await channel.delete().catch(() => {});
                delete usersCache[interaction.member.id];
            }
        } catch (error) {
            console.error('Erro em createTimeout:', error);
        }
    }, time * 60000);
}

function createFirstTimeout(channel, member) {
    return setTimeout(async () => {
        try {
            await channel.delete().catch(() => {});
            delete usersCache[member.id];
        } catch (error) {
            console.error('Erro em createFirstTimeout:', error);
        }
    }, 5 * 60000);
}

function cancelWhitelist(userId) {
    delete usersCache[userId];
}