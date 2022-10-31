const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant("basic")
        .readOwn("profile")
        .updateOwn("profile")
        .createOwn("cloth")
        .readOwn("cloth")
        .updateOwn("cloth")
        .deleteOwn("cloth")
        .readAny("cloth")
    
    ac.grant("admin")
        .readAny("profile")
        .deleteAny("profile")
        .readAny("cloth")
    return ac;
})();