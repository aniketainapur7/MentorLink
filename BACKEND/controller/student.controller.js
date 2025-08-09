const User = require("../models/User.model.js");
const Session = require("../models/Session.model.js");
const crypto = require("crypto");


const getMentors = async (req, res) => {
  try {
    const { subject } = req.query;

    let query = { role: "mentor" };
    if (subject) {
      query.subjects = { $regex: subject, $options: "i" };
    }

    const mentors = await User.find(query)
      .select("-password")
      .sort({ rating: -1 });

    res.status(200).json({ mentors });
  } catch (error) {
    console.error("Error in getMentors:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const requestSession = async (req, res) => {
  try {
    const { mentorId, subject, startTime } = req.body;
    const studentId = req.user._id;

    if (!mentorId || !subject) {
      return res.status(400).json({ message: "Mentor ID and subject are required" });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    // Generate unique Jitsi meeting link
    const roomName = `session-${crypto.randomBytes(6).toString("hex")}`;
    const meetingurl = `https://meet.jit.si/${roomName}`;

    const session = new Session({
      studentId,
      mentorId,
      subject,
      meetingurl,
      startTime
    });

    await session.save();

    res.status(201).json({
      message: "Session request sent",
      session
    });
  } catch (error) {
    console.error("Error in requestSession:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getSessions = async (req, res) => {
  try {
    const studentId = req.user._id;

    const sessions = await Session.find({ studentId })
      .populate("mentorId", "name subjects profileImage rating") // mentor info
      .populate("studentId", "name") // so we can return studentName
      .sort({ createdAt: -1 });

    // Map to StudentSession format
    const formattedSessions = sessions.map(s => ({
      _id: s._id.toString(),
      studentName: s.studentId?.name || "Unknown",
      studentId: s.studentId?._id.toString(),
      mentorId: s.mentorId, 
      meetingurl: s.meetingurl,
      subject: s.subject,
      startTime: s.startTime ? s.startTime.toISOString() : null,
      status: s.status
    }));

    res.status(200).json({ sessions: formattedSessions });
  } catch (error) {
    console.error("Error in getSessions:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const rateSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const { rating, comment } = req.body;
    const studentId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const session = await Session.findOne({ _id: sessionId, studentId });
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status !== "completed") {
      return res.status(400).json({ message: "You can only rate completed sessions" });
    }

    session.feedback = { rating, comment };
    await session.save();

    // Update mentor rating
    const mentor = await User.findById(session.mentorId);
    await mentor.addRating(rating);

    res.status(200).json({ message: "Session rated successfully", session });
  } catch (error) {
    console.error("Error in rateSession:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getSessionDetails = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const studentId = req.user._id;

    const session = await Session.findOne({ _id: sessionId, studentId })
      .populate("mentorId", "name subjects profileImage bio rating");

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error("Error in getSessionDetails:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const cancelSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const studentId = req.user._id;

    const session = await Session.findOne({ _id: sessionId, studentId });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.status === "completed") {
      return res.status(400).json({ message: "Cannot cancel a completed session" });
    }

    session.status = "cancelled";
    await session.save();

    res.status(200).json({ message: "Session cancelled successfully", session });
  } catch (error) {
    console.error("Error in cancelSession:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMentors,
  requestSession,
  getSessions,
  rateSession,
  getSessionDetails,
  cancelSession
};
