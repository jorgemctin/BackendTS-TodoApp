"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    try {
        if (req.role !== "admin") {
            res.json({
                success: true,
                message: "You need Admin permissions"
            });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "You need Admin permissions",
            error: error
        });
    }
};
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map