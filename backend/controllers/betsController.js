// Bets Controller
export const getBet = (req, res) => {
    console.log("getBet Function");
    res.send("Get all bets");
  };
  
  export const getBetById = (req, res) => {
    console.log("getBetById Function");
    const { id } = req.params;
    res.send(`Get bet with ID: ${id}`);
  };
  
  export const postBet = (req, res) => {
    console.log("postBet Function");
    res.send("Create a new bet");
  };
  
  export const putBet = (req, res) => {
    console.log("putBet Function");
    const { id } = req.params;
    res.send(`Update bet with ID: ${id}`);
  };
  
  export const deleteBet = (req, res) => {
    console.log("deleteBet Function");
    const { id } = req.params;
    res.send(`Delete bet with ID: ${id}`);
  };
  