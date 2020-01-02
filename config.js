module.exports = {
    // Default Prefix for Commands
    sign: "H!",

    // Directory where modules are located
    directory: "./commands/",

    // Users (user id) with bot admin controls
    admin: ["539195184357965833"],

    // Mac Address of Server for reference to server status
    server: "82:dc:73:5d:a9:f1",

    // Economy Settings
    economy: {
        range: [1, 3],
        range_media: [2, 4],
        currency: "cheese",
        currency_plural: "cheese",
        symbol: null,
        emoji: "🧀"
    },

    // Predefined Colours for Embeds
    colours: {
        default: 0xB699FF,
        success: 0x52C652,
        error: 0xE93F3C,
        warn: 0xF5AD1E,
        info: 0x52B7D6
    },

    // Earthquake Early Warnings (deprecated, disabled)
    shake: {
        socket: "http://shake.kurisubrooks.com:3390",
        channels: {
            post: "662395586556854300",
            debug: "662395586556854300"
        }
    }
};
