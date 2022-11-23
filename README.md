[![Node.js CI](https://drone.rainnny.club/api/badges/Soda-App/Node/status.svg)](https://drone.rainnny.club/Soda-App/Node)

# Node
🖥 The node application that handles communication from/to the panel.

## Flow
- User navigates to a bot on the panel
- Client (user) sends a connection to the WS server with their auth token
- The auth token is validated on the WS server and an access token is returned
