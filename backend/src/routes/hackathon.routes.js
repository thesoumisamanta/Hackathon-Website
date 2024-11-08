import Router from "express"
import { createHackathon, getHackathons, getHackathonById, updateHackathon, deleteHackathon, joinHackathon } from "../controllers/hackathon.controller.js"

const router = Router()

router.route("/create").post(
    upload.single("image"),
    createHackathon
)

router.route("/").get(getHackathons)

router.route("/:id").get(getHackathonById)

router.route("/:id").put(
    upload.single("image"),
    updateHackathon
)

router.route("/:id").delete(deleteHackathon)

router.route("/:id/join").post(joinHackathon)

    

export default router