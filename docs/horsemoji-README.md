# Panic! at the Easel 🎨

**A real-time multiplayer drawing and matching game, built by Team Horsemoji for MIT Web.lab 2026.**

**First place overall — MIT Web.lab 2026** · Up to 8 players · React / Node.js / Socket.IO / MongoDB

<img src="client/src/drawing_guy.png" width="180" alt="The game's panicked museum curator">

The museum needs an exhibit, and the curator needs your help. Players write prompts, draw one another's ideas under a time limit, and match the resulting artwork back to its title. Later rounds introduce invisible ink and a shared prompt pool that turns the final exhibit into a race.

## The game loop

1. **Create or join a room.** Sign in with Google, choose a username, and join friends using a game PIN.
2. **Write prompts.** Each player supplies prompts; suggested words help get the ideas flowing.
3. **Draw.** Receive prompts written by other players and turn as many as possible into recognizable drawings.
4. **Match.** Reunite scrambled drawings and titles, excluding work you authored or drew.
5. **See the results.** Server-calculated scores reward recognizable drawings and accurate matches. Browse the gallery after the game.

| Round | Drawing mechanic |
| --- | --- |
| Standard | Draw with visible strokes, color selection, and undo. |
| Invisible ink | Strokes are hidden while drawing, so players rely on memory. |
| Chaos | Players race over a shared pool that includes previously undrawn prompts. |

For a complete matching round, use **4–8 players**. The matching algorithm requires two eligible matchers after excluding a prompt's author and its artist.

## Engineering highlights

- **Prompt distribution:** Fisher–Yates shuffling followed by cyclic distribution keeps a player's own prompts out of their drawing assignment.
- **Matching allocation:** The server excludes both creators of each drawing–prompt pair, then chooses two recipients with a preference for lower task loads. Larger rooms can receive additional prompt-only distractors.
- **Scoring:** The server combines drawing recognition with each player's matching accuracy and applies round-specific multipliers.
- **Live coordination:** Socket.IO rooms distribute game state, prompt counts, timers, prompt-claim updates, and game-over events.
- **Drawing data:** Canvas stroke data travels through the API; the frontend supports standard, invisible, and chaotic drawing phases.

### Sihan Wang's contribution

Backend developer on a three-person team: server-side prompt assignment, matching/scoring algorithms, and real-time multiplayer state updates. The game and its interface were built collaboratively.

## Architecture

```text
React + HTML Canvas
   │  HTTP requests / Socket.IO events
   ▼
Express API + Socket.IO rooms
   ├── In-memory game state, assignments, timers, scores
   └── Mongoose / MongoDB models for users, games, prompts, drawings
```

| Location | What to read |
| --- | --- |
| [server/api.js](server/api.js) | Game lifecycle, prompt assignment, matching, scoring, gallery endpoints |
| [server/server-socket.js](server/server-socket.js) | Socket connections, room membership, live events |
| [server/models](server/models) | MongoDB document schemas |
| [client/src/components/pages/GamePage.jsx](client/src/components/pages/GamePage.jsx) | Phase-driven game interface |
| [client/src/components/modules](client/src/components/modules) | Canvas tools, matching, leaderboard, gallery |
| [vite.config.js](vite.config.js) | Frontend build and local API/socket proxies |

## Run locally

### Prerequisites

- Node.js satisfying the repository's `>=18.x` engine requirement and npm.
- A MongoDB connection URI.
- A Google OAuth web client configured for your local frontend origin.

### Setup

```bash
git clone https://github.com/weblab-class/thehorseemoji.git
cd thehorseemoji
npm ci
```

Create a `.env` in the repository root:

```dotenv
MONGO_SRV=<your-mongodb-connection-uri>
SESSION_SECRET=<a-long-random-secret>
```

Then configure the values the current source still keeps in code:

1. Set `databaseName` in `server/server.js` to your MongoDB database name; the checked-in value is `FILL_ME_IN`.
2. Use the same Google OAuth client ID for `GOOGLE_CLIENT_ID` in `client/src/index.jsx` and `CLIENT_ID` in `server/auth.js`.
3. Add `http://localhost:5173` to the OAuth client's authorized JavaScript origins.
4. Remove the connection-URI debug log in `server/server.js` before running with real credentials.

Start two terminals from the repository root:

```bash
# Terminal 1: frontend
npm run dev

# Terminal 2: API and sockets
npm start
```

Open **http://localhost:5173**. Vite proxies `/api` and `/socket.io` to the backend on port 3000.

### Frontend production build

```bash
npm run build
```

The frontend output is `client/dist`. This command builds assets; it does not provision MongoDB, configure OAuth, or deploy the backend.

## Current scope

This is a student competition project. Active game state is held in process memory and is lost on server restart; multi-instance synchronization is not implemented. The repository does not define an automated test script. Assignment edge cases, zero-match scoring, and chaos prompt-claim isolation are useful follow-up testing areas before production use.

## Credits

- Built collaboratively by Team Horsemoji for MIT Web.lab.
- Based on the MIT Web.lab application skeleton.
- Suggested words adapted from [the skribbl word list](https://gist.github.com/mvark/9e0682c62d75625441f6ded366245203#file-skribbl-words-csv).
- See [LICENSE](LICENSE) for the repository license.

