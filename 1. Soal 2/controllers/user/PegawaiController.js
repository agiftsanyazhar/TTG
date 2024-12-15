import User from "../../models/UserModel.js";
import Jabatan from "../../models/JabatanModel.js";
import Pegawai from "../../models/PegawaiModel.js";

export const getPegawais = async (req, res) => {
  try {
    const response = await Pegawai.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "address",
        "user_id",
        "jabatan_id",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
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
        {
          model: Jabatan,
          as: "jabatan",
          attributes: [
            "id",
            "name",
            "salary",
            "allowance",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPegawaiById = async (req, res) => {
  try {
    const response = await Pegawai.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "address",
        "user_id",
        "jabatan_id",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
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
        {
          model: Jabatan,
          as: "jabatan",
          attributes: [
            "id",
            "name",
            "salary",
            "allowance",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const countPegawai = async (req, res) => {
  try {
    const response = await Pegawai.count();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
