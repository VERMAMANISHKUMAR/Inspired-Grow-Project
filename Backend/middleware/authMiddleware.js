const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  console.log("🔹 Received Authorization Header:", token); // Debugging

  if (!token) {
    return res.status(401).json({ message: "❌ Access Denied. No token provided." });
  }
  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    console.log("✅ Decoded user from token:", req.user); // Debugging
    next();
  } catch (error) {
    res.status(400).json({ message: "❌ Invalid token" });
  }
};
const isAdmin = (req, res, next) => {
  console.log("Checking if user is admin:", req.user.role); // Debugging
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};
const hasPermission = (module, action) => async (req, res, next) => {
  try {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Access denied" });
    }
    if (req.user.role.toLowerCase() === "admin") {
      console.log("Admin bypassed permission check.");
      return next();
    }
    const role = await Role.findOne({ roleName: req.user.role });
    if (!role) {
      return res.status(403).json({ message: "Role not found in DB" });
    }
    const normalizedModule = module.toLowerCase();
    const normalizedAction = action.toLowerCase();
    console.log("----- hasPermission Middleware -----");
    console.log("User Role:", req.user.role);
    console.log("Required Module:", module, "-> Normalized:", normalizedModule);
    console.log("Required Action:", action, "-> Normalized:", normalizedAction);
    console.log("Role Permissions:", role.permissions);
    const hasAccess = role.permissions.some(perm => {
      return perm.module.toLowerCase() === normalizedModule &&
             perm.actions.map(a => a.toLowerCase()).includes(normalizedAction);
    });

    console.log("hasAccess:", hasAccess);

    if (!hasAccess) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  } catch (error) {
    console.error("Permission check error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = { authMiddleware, isAdmin, hasPermission };
