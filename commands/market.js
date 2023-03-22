const { Client, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const ms = require("ms")
const louritydb = require("croxydb")
const louritydb2 = require("orio.db")
// Lourity - discord.gg/altyapilar
module.exports = {
    name: "market",
    description: "Hadi biraz alışveriş yapalım!",
    type: 1,
    options: [],

    run: async (client, interaction) => {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("1 Haftalık Anahtar")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("anahtar1" + interaction.user.id)
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel("1 Aylık Anahtar")
                    .setStyle(ButtonStyle.Secondary)
                    .setCustomId("anahtar2" + interaction.user.id)
            )

        const hata = new EmbedBuilder()
            .setColor("Red")
            .setDescription("Bu komutu kullanırken bir sorun oluştu.")

        let kredi = louritydb.get(`kredi_${interaction.user.id}`)

        const market = new EmbedBuilder()
            .setColor("5865f2")
            .setTitle(`SIBERAY Market | Davet/Sohbet Et, kazan! (${kredi || "0"} $)`)
            .setURL("https://discord.gg/mernissorgu")
            .setDescription(`**/günlük - Bedava günlük kredini almayı unutma!**`)
            .addFields(
                { name: "anahtar", value: `1 Haftalık Anahtar: 5000 Kredi` },
                { name: "anahtar", value: `1 Aylık Anahtar: 13000 Kredi` },
            )
            .setFooter({ text: "İnsanları SIBERAY'a davet et/sohbet et, kredi kazan 😉", iconURL: client.user.avatarURL() })
            .setThumbnail(client.user.avatarURL())
            .setTimestamp()

        interaction.reply({ embeds: [market], components: [row] }).catch((e) => {
            return interaction.reply({ embeds: [hata], ephemeral: true })
        })

    }

};