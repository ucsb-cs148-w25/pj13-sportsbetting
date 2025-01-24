// Users Controller
export const getUser = (req, res) => {
    console.log("getUser Function");
    res.send("Get all users");
  };
  
  export const getUserById = (req, res) => {
    console.log("getUserById Function");
    const { id } = req.params;
    res.send(`Get user with ID: ${id}`);
  };
  
  export const postUser = (req, res) => {
    console.log("postUser Function");
    res.send("Create a new user");
  };
  
  export const putUser = (req, res) => {
    console.log("putUser Function");
    const { id } = req.params;
    res.send(`Update user with ID: ${id}`);
  };
  
  export const deleteUser = (req, res) => {
    console.log("deleteUser Function");
    const { id } = req.params;
    res.send(`Delete user with ID: ${id}`);
  };
  