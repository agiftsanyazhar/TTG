import Role from "../../models/RoleModel.js";

export const getRoles = async (req, res) => {
  try {
    const response = await Role.findAll();
    if (!response.length) {
      return res.status(404).json({ msg: "No Roles found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const response = await Role.findOne({
      where: { id: req.params.id },
    });
    if (!response) {
      return res.status(404).json({ msg: "Role not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
