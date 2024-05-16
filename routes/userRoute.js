const { addContacts, getCommonUsers, searchContacts } = require("../controller/userController")

const router = require("express").Router()


router.post("/add-contacts",addContacts)
router.get("/common-users",getCommonUsers)
router.get("/search",searchContacts)



module.exports = router