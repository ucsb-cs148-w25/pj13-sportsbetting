import hawksLogo from "../components/resources/nba_teams/hawks.png";
import celticsLogo from "../components/resources/nba_teams/celtics.png";
import netsLogo from "../components/resources/nba_teams/nets.png";
import hornetsLogo from "../components/resources/nba_teams/hornets.png";
import bullsLogo from "../components/resources/nba_teams/bulls.png";
import cavaliersLogo from "../components/resources/nba_teams/cavaliers.png";
import mavericksLogo from "../components/resources/nba_teams/mavericks.png";
import nuggetsLogo from "../components/resources/nba_teams/nuggets.png";
import pistonsLogo from "../components/resources/nba_teams/pistons.png";
import warriorsLogo from "../components/resources/nba_teams/warriors.png";
import rocketsLogo from "../components/resources/nba_teams/rockets.png";
import pacersLogo from "../components/resources/nba_teams/pacers.png";
import clippersLogo from "../components/resources/nba_teams/clippers.png";
import lakersLogo from "../components/resources/nba_teams/lakers.png";
import grizzliesLogo from "../components/resources/nba_teams/grizzlies.png";
import heatLogo from "../components/resources/nba_teams/heat.png";
import bucksLogo from "../components/resources/nba_teams/bucks.png";
import timberwolvesLogo from "../components/resources/nba_teams/timberwolves.png";
import pelicansLogo from "../components/resources/nba_teams/pelicans.png";
import knicksLogo from "../components/resources/nba_teams/knicks.png";
import thunderLogo from "../components/resources/nba_teams/thunder.png";
import magicLogo from "../components/resources/nba_teams/magic.png";
import sixersLogo from "../components/resources/nba_teams/sixers.png";
import sunsLogo from "../components/resources/nba_teams/suns.png";
import blazersLogo from "../components/resources/nba_teams/blazers.png";
import kingsLogo from "../components/resources/nba_teams/kings.png";
import spursLogo from "../components/resources/nba_teams/spurs.png";
import raptorsLogo from "../components/resources/nba_teams/raptors.png";
import jazzLogo from "../components/resources/nba_teams/jazz.png";
import wizardsLogo from "../components/resources/nba_teams/wizards.png";


// Map team names to their corresponding logos
const teamLogos = {
    hawks: hawksLogo,
    celtics: celticsLogo,
    nets: netsLogo,
    hornets: hornetsLogo,
    bulls: bullsLogo,
    cavaliers: cavaliersLogo,
    mavericks: mavericksLogo,
    nuggets: nuggetsLogo,
    pistons: pistonsLogo,
    warriors: warriorsLogo,
    rockets: rocketsLogo,
    pacers: pacersLogo,
    clippers: clippersLogo,
    lakers: lakersLogo,
    grizzlies: grizzliesLogo,
    heat: heatLogo,
    bucks: bucksLogo,
    timberwolves: timberwolvesLogo,
    pelicans: pelicansLogo,
    knicks: knicksLogo,
    thunder: thunderLogo,
    magic: magicLogo,
    sixers: sixersLogo,
    suns: sunsLogo,
    blazers: blazersLogo,
    kings: kingsLogo,
    spurs: spursLogo,
    raptors: raptorsLogo,
    jazz: jazzLogo,
    wizards: wizardsLogo,
};

// Helper function to get the logo path based on the team's full name
const getTeamLogoPath = (teamFullName) => {
    // Extract the last word of the team name (e.g., "Celtics" from "Boston Celtics")
    let teamName = teamFullName.split(" ").pop().toLowerCase();

    // Handle exceptions for specific team names
    if (teamName === "76ers") {
        teamName = "sixers"; // Map "76ers" to "sixers"
    }

    return teamLogos[teamName] || ""; // Return the logo if found, or an empty string if not
};


export default getTeamLogoPath;