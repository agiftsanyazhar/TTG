import { check, validationResult } from "express-validator";
import User from "../../models/UserModel.js";
import Admin from "../../models/AdminModel.js";
import Pegawai from "../../models/PegawaiModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const {
    name,
    email,
    password,
    rePassword,
    role_id,
    phone,
    address,
    jabatan_id,
  } = req.body;

  try {
    const checks = [
      check("name", "Name is required").notEmpty(),
      check("email", "Invalid email").notEmpty().isEmail(),
      check("password", "Password is required").notEmpty(),
      check("rePassword", "Confirm password is required").notEmpty(),
      check("role_id", "Role is required").notEmpty().isNumeric(),
    ];

    if (role_id === 2) {
      checks.push(
        check("phone", "Phone is required").isMobilePhone("id-ID"),
        check("address", "Address is required").notEmpty(),
        check("jabatan_id", "Jabatan is required").isNumeric()
      );
    }

    await Promise.all(checks.map((check) => check.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (password !== rePassword) {
      return res.status(400).json({ msg: "Password do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const existingUserEmail = await User.findOne({ where: { email } });
    if (existingUserEmail) {
      return res.status(409).json({ msg: "Email is already registered" });
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role_id,
    });

    let message;
    if (role_id === 1) {
      await Admin.create({
        name,
        email,
        user_id: user.id,
      });
      message = "Admin created successfully";
    } else if (role_id === 2) {
      try {
        const existingPegawaiPhone = await Pegawai.findOne({
          where: { phone },
        });
        if (existingPegawaiPhone) {
          return res.status(409).json({ msg: "Phone is already registered" });
        }

        await Pegawai.create({
          name,
          email,
          phone,
          address,
          user_id: user.id,
          jabatan_id,
        });
        message = "Pegawai created successfully";
      } catch (error) {
        console.error("Error creating Pegawai:", error);
        return res.status(500).json({
          msg: "Error creating Pegawai",
          error: error.message,
        });
      }
    }

    res.status(201).json({ msg: message });
  } catch (error) {
    console.error("Server error:", error.message);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
