const axios = require("axios");
const cheerio = require("cheerio");

const scrapeNBAInjuries = async () => {
    try {
        const url = "https://www.espn.com/nba/injuries";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const injuries = [];

        // Select each team injury section
        $(".Wrapper .ResponsiveTable").each((_, element) => {
            const teamName = $(element).find(".Table__Title").text().trim(); // Team name
            const players = [];

            // Select each player's row
            $(element)
                .find("tbody > tr")
                .each((_, row) => {
                    const playerName = $(row).find("td:nth-child(1)").text().trim();
                    const position = $(row).find("td:nth-child(2)").text().trim();
                    const injuryStatus = $(row).find("td:nth-child(3)").text().trim();
                    const injuryDetails = $(row).find("td:nth-child(4)").text().trim();

                    players.push({
                        playerName,
                        position,
                        injuryStatus,
                        injuryDetails,
                    });
                });

            if (players.length > 0) {
                injuries.push({ teamName, players });
            }
        });

        return injuries;
    } catch (error) {
        console.error("Error scraping NBA injuries:", error);
        return [];
    }
};

// Example usage
scrapeNBAInjuries().then((injuries) => {
    console.log(JSON.stringify(injuries, null, 2));
});
