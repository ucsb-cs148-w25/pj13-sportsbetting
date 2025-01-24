// Groups Controller
export const getGroup = (req, res) => {
    console.log("getGroup Function");
    res.send("Get all groups");
  };
  
  export const getGroupById = (req, res) => {
    console.log("getGroupById Function");
    const { id } = req.params;
    res.send(`Get group with ID: ${id}`);
  };
  
  export const postGroup = (req, res) => {
    console.log("postGroup Function");
    res.send("Create a new group");
  };
  
  export const putGroup = (req, res) => {
    console.log("putGroup Function");
    const { id } = req.params;
    res.send(`Update group with ID: ${id}`);
  };
  
  export const deleteGroup = (req, res) => {
    console.log("deleteGroup Function");
    const { id } = req.params;
    res.send(`Delete group with ID: ${id}`);
  };
  