import Router from "express"
import { createHackathon, getHackathons, getHackathonById, updateHackathon, deleteHackathon, joinHackathon } from "../controllers/hackathon.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/create").post(
    verifyJWT,
    upload.single("image"),
    createHackathon
)

router.route("/all-hackathons").get(getHackathons)

router.route("/hackathon/:id").get(getHackathonById)

router.route("/update/:id").put(
    verifyJWT,
    upload.single("image"),
    updateHackathon
)

router.route("/delete/:id").delete(verifyJWT, deleteHackathon)

router.route("/:id/join").post(verifyJWT, joinHackathon)

    

export default router