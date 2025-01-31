import requests
from bs4 import BeautifulSoup
import json
import datetime

def fetch_nba_injuries():
    url = "https://www.espn.com/nba/injuries"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print("Failed to retrieve data")
        return []
    
    soup = BeautifulSoup(response.text, "html.parser")
    injury_sections = soup.find_all("div", class_="ResponsiveTable")
    injuries = []
    
    for section in injury_sections:
        team_name_tag = section.find("span", class_="injuries__teamName ml2")  # Extracts team name
        team_name = team_name_tag.text.strip() if team_name_tag else "Unknown Team"
        rows = section.find_all("tr", class_="Table__TR")
        for row in rows[1:]:  # Skipping header row
            cols = row.find_all("td")
            if len(cols) < 4:
                continue
            player = cols[0].text.strip()
            position = cols[1].text.strip()
            status = cols[2].text.strip()
            details = cols[3].text.strip()
            
            injuries.append({
                "name": player,
                "position": position,
                "team": team_name,
                "status": status,
                "details": details,
                "date": datetime.date.today().isoformat()
            })
    
    return injuries

def save_injuries_to_json():
    injuries = fetch_nba_injuries()
    if injuries:
        with open("nba_injuries.json", "w") as file:
            json.dump(injuries, file, indent=4)
        print("Injury data saved successfully.")
    else:
        print("No data to save.")

if __name__ == "__main__":
    save_injuries_to_json()
