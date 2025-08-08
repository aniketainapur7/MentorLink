

let ioInstance; 

function initNotification(io) {
    ioInstance = io;
}

function sendNotification(userId, message) {
    if (!ioInstance) {
        console.error("Socket.IO not initialized!");
        return;
    }
   
    ioInstance.to(userId).emit("notification", { message });
}

module.exports = {
    initNotification,
    sendNotification
};
