import Jabatan from "../../models/JabatanModel.js";

export const getJabatans = async (req, res) => {
  try {
    const response = await Jabatan.findAll();
    if (!response.length) {
      return res.status(404).json({ msg: "No Jabatans found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getJabatanById = async (req, res) => {
  try {
    const response = await Jabatan.findOne({
      where: { id: req.params.id },
    });
    if (!response) {
      return res.status(404).json({ msg: "Jabatan not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
