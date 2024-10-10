const Role = require("../models/roleModel");

exports.addRole = async (req, res) => {
  try {
    const role = await Role.create(req.body);
    res.status(201).json({ success: true, role });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit, 10) || 2;
    const skipValue = parseInt(req.query.skip, 10) || 0;

    // Validate limit and skip
    if (isNaN(limitValue) || limitValue < 0) {
      return res
        .status(400)
        .json({ error: "Limit must be a non-negative number" });
    }
    const role = await Role.find().limit(limitValue).skip(skipValue);
    res.status(200).json({
      success: true,
      role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSingleRole = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.findById(id);
    const { name, id: ID } = role;
    res.status(200).json({
      success: true,
      data: {
        name,
        ID,
      },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { name: req.body.name },
      { new: true }
    );
    const { id: ID, name } = updatedRole;
    res.status(200).json({
      success: true,
      data: {
        ID,
        name,
      },
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Role Deleted Succefully",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
