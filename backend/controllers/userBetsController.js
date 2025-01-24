// User Bets Controller
export const getUserBet = (req, res) => {
    console.log("getUserBet Function");
    res.send("Get all user bets");
  };
  
  export const getUserBetById = (req, res) => {
    console.log("getUserBetById Function");
    const { id } = req.params;
    res.send(`Get user bet with ID: ${id}`);
  };
  
  export const postUserBet = (req, res) => {
    console.log("postUserBet Function");
    res.send("Create a new user bet");
  };
  
  export const putUserBet = (req, res) => {
    console.log("putUserBet Function");
    const { id } = req.params;
    res.send(`Update user bet with ID: ${id}`);
  };
  
  export const deleteUserBet = (req, res) => {
    console.log("deleteUserBet Function");
    const { id } = req.params;
    res.send(`Delete user bet with ID: ${id}`);
  };
  