export const notificationHandler = async (req, res) => {
  const mqttClient = req.app.locals.mqttClient;
  const { userId, username, companyName } = req.body
  console.log(userId , username , companyName)
  if (!userId || !username || !companyName) {
    return res.status(400).json({error : "Userdetails are missing"})
  }

  // mqtt topic
  const topic = `user/notifications/${userId}/jobStatus`
  
  // Notification Message
  const payLoad = JSON.stringify({
    title: "Application Status",
    message: `Hello ${username}, your application for ${companyName} has been Forwarded`
  })

  // MQTT message publishing
  mqttClient.publish(topic, payLoad, (err) => {
    if (err) {
      console.error('MQTT publish error:', err);
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    console.log(`Notification sent to user ${userId}`);
    res.json({ success: true, message: 'Notification sent' });
  })
}