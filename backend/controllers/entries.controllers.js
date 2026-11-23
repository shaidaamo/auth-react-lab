const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Entry = require('../models/Entry')

router.post("/", verifyToken, async (req, res) => {
  try {
    console.log(req.user)
    const { title, entryBody, isPublic } = req.body; 
    const createdEntry = await Entry.create({
      title: title,
      entryBody: entryBody,
      isPublic: isPublic,
      owner: req.user._id
    });
    res.status(201).json(createdEntry);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const entries = await Entry.find({ isPublic: true });

    return res.status(200).json(entries);
  } catch (err) {
   
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get("/my-entries", verifyToken, async (req, res) => {
  try {
    const Foundentries = await Entry.find({ owner: req.user._id });

    return res.status(200).json(Foundentries);
  } catch (err) {
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: "Entry not found." });
    }

    if (!entry.isPublic && !entry.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to view this entry." });
    }

    return res.status(200).json(entry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, entryBody, isPublic } = req.body;
       const updatedEntry = await Entry.findByIdAndUpdate(
          req.params.id,
          {
           title,
           entryBody,
           isPublic
          },
          { returnDocument: "after", runValidators: true },
        );
        if (!updatedEntry.owner.equals(req.user._id) ) {
      return res.status(403).json({ message: "You are not allowed to edit this entry." });
    }

    return res.status(200).json(updatedEntry);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedentry = await Entry.findByIdAndDelete(req.params.id);

    if (!deletedentry.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to delete this entry." });
    }

    return res.status(200).json({ message: "Entry deleted." });
  } catch (err) {
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;