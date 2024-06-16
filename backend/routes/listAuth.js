const express = require("express");
const list = require("../models/listModel");
const authMiddleware = require("../config/auth");
const router = express.Router();

router.post("/create", authMiddleware, async (req, res) => {
    const {title} = req.body;
    const userId = req.userId;
    try {
        const newTodo = new list({
          title,
          userId, // Include userId when creating the todo
        });
    
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

router.get("/read", authMiddleware, async(req, res) => {
    const userId = req.userId;
    try {
        const todos = await list.find({userId})
        res.status(200).json({todos})
        // console.log(todos)
    } catch (error) {
        console.log(error)
    }
})

router.put('/edit/:id', authMiddleware, async (req, res) => {
  const { title } = req.body;

  try {
      const updatedData = await list.findByIdAndUpdate(req.params.id, { title }, { new: true });
      console.log("Data Updated");
      res.status(201).json(updatedData);
  }
  catch (err) {
      console.log(err);
  }
})

router.delete("/delete/:id", authMiddleware, async(req, res) => {
  try {
    await list.findByIdAndDelete(req.params.id)
    res.status(200).json({message: "item deleted"})
  } catch (error) {
    console.log(error)
  }
})

router.get("/getuser/:id", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
      const user = await list.findOne({userId});
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user); // Sending user data in the response
  } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
