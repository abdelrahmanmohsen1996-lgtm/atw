# Around the World — setup (one time, ~20 minutes, free)

## 0. Try it first (no setup)
Open `index.html` in Chrome. It runs in **Demo mode** (saves on that device only).
Control room → Game settings → **Load examples**, then play as Falcons (PIN 1111).
Example stamp codes: Japan 1101, Brazil 2202, Italy 3303, India 4404, Mexico 5505, Kenya 6606.

## 1. Create the free Firebase project
1. Go to https://console.firebase.google.com → **Add project** → name it `logic-around-the-world` → turn Google Analytics off → Create.
2. Left menu **Build → Realtime Database → Create database** → location **Belgium (europe-west1)** → start in **locked mode**.
3. Open the **Rules** tab, delete everything, paste the content of `database.rules.json`, click **Publish**.
4. Left menu **Build → Authentication → Get started → Email/Password → Enable → Save**.
5. Authentication → **Users → Add user** → your email + a password. (Add one per organiser who should edit the game.)
6. Gear icon **Project settings → General → Your apps → Web (</>)** → nickname `game` → Register app (no hosting).
7. Copy the values from the `firebaseConfig` box into `config.js` and save.
   Make sure `databaseURL` is filled (copy it from the Realtime Database page if it's missing).

Spark (free) plan is enough. You don't need Firebase Storage; photos are saved inside the database.

## 2. Put it online (free)
1. Go to https://app.netlify.com/drop (sign up free with Google).
2. Drag the whole `around-the-world` folder onto the page.
3. You get a link like `https://xxxx.netlify.app`. In Site settings you can rename it, e.g. `logic-atw.netlify.app`.
To update later: drag the folder again on the site's **Deploys** page.

## 3. Run an event
1. Open the link → **Control room** → sign in with the user from step 1.5.
2. Add countries: clue text and/or up to 4 photos, accepted answers, station challenge, stamp code. Use ↑ ↓ to set the order.
   - Your current deck is exported in `clue-photos/` (one JPG per slide). Upload them to the matching countries.
   - **Accepted answers** can be the code word the puzzle reveals (e.g. slide 1–2 → `sushi`, slide 5 → `saudi arabia`). Leave it empty to accept the country name.
   - **Overlay puzzle**: upload the text sheet as photo 1 and the dots sheet as photo 2, tick "Overlay puzzle". Teams drag the dots over the text on their phone (slides 6 + 7).
3. Add teams with PINs. Each team starts at a different country automatically.
4. Show the **Team join QR** (Control room). Each team scans it on one phone, picks its team, enters its PIN.
5. Give each station operator their country's stamp code (print it on their card). They type it on the team's phone to stamp the passport and set the points.
6. Put the **Leaderboard** tab on the projector.
7. After the event: Game settings → **Reset all progress** (countries and teams stay for next time).

## Good to know
- Players need no account. Only signed-in organisers can change countries, teams and settings.
- Answers ignore capitals, spaces and accents. Add Arabic or other spellings in "Accepted answers".
- Scoring: stamp points − hints used × hint cost − wrong guesses × wrong-guess cost.
- From the Control room you can also stamp, undo a stamp, or reset a single team.
- Free limits (≈100 phones at once, 1 GB data, 10 GB/month download) are far above one event.
