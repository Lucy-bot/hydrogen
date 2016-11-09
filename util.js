"use strict"

const fs = require("fs")
const chalk = require("chalk")
const request = require("request")
const moment = require("moment")
const index = require("./index")
const config = require("./config.json")
const keychain = require("./keychain.json")

// Helper Prototypes
String.prototype.toUpperLowerCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

// Module Functions
module.exports = {
    webhook: (event, data) => {
        let user = keychain.webhooks[user]
        let body = JSON.stringify(data)

        if (event.guild)
            if (event.guild.id && event.guild.id in config.webhooks)
                user = keychain.webhooks[event.guild.id]
            else
                this.error("server does not have a webhook id/token")
        else { return }

        request.post({
            url: `https://discordapp.com/api/webhooks/${user[0]}/${user[1]}/slack`,
            form: body
        }, (error, response, body) => {
            if (error) console.error(error)
            if (body !== "ok") console.info(body)
        })
    },
    error: (message, from, channel) => {
        if (typeof message === "object") message = JSON.stringify(message, null, 4)
        if (!channel) channel = index.bot.channels.get("212917108445544449") //#owlery

        let time = moment().format("h:mm:ssa")
        let err_format = moment().format("D_MMMM_YYYY")

        let file_format = `./logs/${err_format}.log`
        let data_format = `\`${time} — ${from}.js\`\n-----\n\`\`\`\n${message}\n\`\`\``

        console.log(chalk.red.bold(`[${time}, ${from}.js]`), chalk.red(message))

        try {
            channel.sendMessage(data_format)
                .catch(error => {
                    if (error.status === 502) console.error("Discord", "Bad Gateway")
                    else if (error.status === 401) console.error("Discord", "Unauthorized")
                    else console.error(error)
                })
        } catch(e) {
            console.error(e)
        }

        fs.access(file_format, fs.F_OK, (err) => {
            fs.appendFileSync(file_format, data_format + "\n\n")
        })
    }
}