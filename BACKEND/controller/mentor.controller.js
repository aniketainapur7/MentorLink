const User = require("../models/User.model.js");
const Session = require("../models/Session.model.js");

// fetch all request from db
const getRequests = async (req, res) => {
  try {
    const mentorId = req.user._id;

    const requests = await Session.find({
      mentorId,
      status: "requested"
    })
      .populate("studentId", "name email subjects profileImage");

    res.status(200).json({ data: requests });
  } catch (error) {
    console.error("Error in getRequests controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// accept request
const acceptSession = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const sessionId = req.params.id;

    const session = await Session.findOne({ _id: sessionId, mentorId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "requested") {
      return res.status(400).json({ message: "Session already processed" });
    }

    session.status = "accepted";
    session.startTime = new Date();
    await session.save();

    res.status(200).json({
      message: "Session accepted",
      meetingurl: session.meetingurl,
      session
    });
  } catch (error) {
    console.error("Error in acceptSession controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// reject session request
const rejectSession = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const sessionId = req.params.id;

    const session = await Session.findOne({ _id: sessionId, mentorId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "requested") {
      return res.status(400).json({ message: "Session already processed" });
    }

    session.status = "cancelled";
    await session.save();

    res.status(200).json({ message: "Session rejected", session });
  } catch (error) {
    console.error("Error in rejectSession controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// fetch all mentor session like my classes
const getSessions = async (req, res) => {
  try {
    const mentorId = req.user._id;

    const sessions = await Session.find({ mentorId })
      .populate("studentId", "name email profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({ data: sessions });
  } catch (error) {
    console.error("Error in getSessions controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// mentor availablity
const updateAvailability = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const { availability } = req.body;

    if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({ message: "Availability must be an array" });
    }

    const mentor = await User.findByIdAndUpdate(
      mentorId,
      { availability },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Availability updated successfully",
      mentor
    });
  } catch (error) {
    console.error("Error in updateAvailability controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update mentor expertise like update his subjects 
const updateExpertise = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const { subjects } = req.body;

    if (!subjects || !Array.isArray(subjects)) {
      return res.status(400).json({ message: "Subjects must be an array" });
    }

    const mentor = await User.findByIdAndUpdate(
      mentorId,
      { subjects },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Expertise updated successfully",
      mentor
    });
  } catch (error) {
    console.error("Error in updateExpertise controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRequests,
  acceptSession,
  rejectSession,
  getSessions,
  updateAvailability,
  updateExpertise
};
