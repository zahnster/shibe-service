import twilio from "twilio";

const { MessagingResponse } = twilio.twiml;

// process shibe image request
export default function handler(req, res) {
  if (req.method === "POST") {
    const userMessage = req.body.Body.toLowerCase().trim();
    const response = new MessagingResponse();
    const message = response.message();

    res.setHeader("Content-Type", "text/html");

    if (userMessage === "shibe me") {
      // fetch and serve shibe pic
      fetch("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
        .then((r) => r.json())
        .then((data) => {
          message.media(data[0]);
          res.status(200).send(response.toString());
        });
    } else {
      // send error message
      message.body("Error: You must say `shibe me` to get the Shibe");
      res.status(200).send(response.toString());
    }
  } else {
    // handle any other HTTP method
    res.setHeader("Content-Type", "text/json");
    res.status(200).json({
      error:
        "These are not the shibes you are looking for. Try a POST request instead.",
    });
  }
}
