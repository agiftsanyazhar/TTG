import { check, validationResult } from "express-validator";
import Role from "../../models/RoleModel.js";
import User from "../../models/UserModel.js";
import Admin from "../../models/AdminModel.js";
import Pegawai from "../../models/PegawaiModel.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "name", "email", "role_id", "createdAt", "updatedAt"],
      include: {
        model: Role,
        as: "role",
      },
    });
    if (!response.length) {
      return res.status(404).json({ msg: "No Users found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.params.id },
      attributes: ["id", "name", "email", "role_id", "createdAt", "updatedAt"],
      include: {
        model: Role,
        as: "role",
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const countUser = async (req, res) => {
  try {
    const response = await User.count();
    res.status(200).json({ total_users: response });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const createUser = async (req, res) => {
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
      const existingPegawaiPhone = await Pegawai.findOne({ where: { phone } });
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
    }

    res.status(201).json({ msg: message });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { role_id, name, email, password, phone, address, jabatan_id } =
    req.body;
  const userId = req.params.id;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const existingUserEmail = await User.findOne({ where: { email } });
    if (existingUserEmail) {
      return res.status(409).json({ msg: "Email is already registered" });
    }

    let updatedData = { name, email, role_id };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(password, salt);
    }

    await User.update(updatedData, { where: { id: userId } });

    if (role_id === 1) {
      const admin = await Admin.findOne({ where: { user_id: userId } });
      if (admin) {
        await admin.update({ name, email });
      } else {
        return res.status(404).json({ msg: "Admin record not found" });
      }
    } else if (role_id === 2) {
      const pegawai = await Pegawai.findOne({ where: { user_id: userId } });
      if (pegawai) {
        const existingPegawaiPhone = await Pegawai.findOne({
          where: { phone },
        });
        if (existingPegawaiPhone) {
          return res.status(409).json({ msg: "Phone is already registered" });
        }

        await pegawai.update({ name, email, phone, address, jabatan_id });
      } else {
        return res.status(404).json({ msg: "Pegawai record not found" });
      }
    }

    res.status(200).json({ msg: "User and related data updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: { id: req.params.id },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server error" });
  }
};
