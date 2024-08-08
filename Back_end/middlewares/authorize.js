// const { AbilityBuilder, Ability } = require("@casl/ability");

// const defineAbilitiesFor = (user) => {
//   const { can, rules } = new AbilityBuilder(Ability);

//   if (user.role === "admin") {
//     can("manage", "all"); // Admin can perform any action on any resource
//   } else if (user.role === "owner") {
//     can("manage", "Book", { ownerId: user.id }); // Owner can manage only their own books
//   }

//   console.log("Generated Rules:", rules); // Debugging line
//   return new Ability(rules); // Create Ability instance with the defined rules
// };

// const authorize = (action, subject) => (req, res, next) => {
//   const ability = defineAbilitiesFor(req.user);
//   console.log("User:", req.user); // Debugging line
//   console.log("Checking Permission:", action, subject); // Debugging line

//   if (ability.can(action, subject)) {
//     next();
//   } else {
//     res.sendStatus(403); // Forbidden
//   }
// };

// module.exports = { authorize };

const { AbilityBuilder, Ability } = require("@casl/ability");

const defineAbilitiesFor = (user) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (user.role === "admin") {
    can("manage", "all"); // Admin can perform any action on any resource
  } else if (user.role === "owner") {
    can("manage", "Book", { ownerId: user.id }); // Owner can manage only their own books
  }

  console.log("Generated Rules:", rules); // Debugging line
  return new Ability(rules); // Create Ability instance with the defined rules
};

const authorize = (action, subject) => (req, res, next) => {
  const ability = defineAbilitiesFor(req.user);
  console.log("User:", req.user); // Debugging line
  console.log("Checking Permission:", action, subject); // Debugging line

  if (ability.can(action, subject)) {
    next();
  } else {
    res.sendStatus(403); // Forbidden
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden: Only admins can perform this action.",
    });
  }
};

module.exports = { authorize, adminOnly };
