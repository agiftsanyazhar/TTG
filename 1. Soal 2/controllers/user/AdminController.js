import User from "../../models/UserModel.js";
import Admin from "../../models/AdminModel.js";

export const getAdmins = async (req, res) => {
  try {
    const response = await Admin.findAll({
      attributes: ["id", "name", "email", "user_id", "createdAt", "updatedAt"],
      include: {
        model: User,
        as: "user",
        attributes: [
          "id",
          "name",
          "email",
          "role_id",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdminById = async (req, res) => {
  try {
    const response = await Admin.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "name", "email", "user_id", "createdAt", "updatedAt"],
      include: {
        model: User,
        as: "user",
        attributes: [
          "id",
          "name",
          "email",
          "role_id",
          "createdAt",
          "updatedAt",
        ],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const countAdmin = async (req, res) => {
  try {
    const response = await Admin.count();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
