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

## 2. Put it online (free, on Firebase Hosting)
Netlify addresses don't open on some Egyptian networks, so the game is hosted on Firebase, in the same project.
1. Install Node.js once: https://nodejs.org → download **LTS** → open the .pkg and click through.
2. Open **Terminal** (Cmd+Space → type Terminal).
3. Type `cd ` (with a space), drag the unzipped `around-the-world` folder into the Terminal window, press Enter.
4. Run: `npx firebase-tools login` → press `y` if asked → sign in with the same Google account in the browser that opens.
5. Run: `npx firebase-tools deploy --only hosting`
6. Your game is live at **https://logic-around-the-world.web.app**
To update later: repeat steps 2, 3 and 5.

## 3. Run an event
**Fastest start:** Control room → Game settings → **Load starter pack**. It sets up 8 countries (clue, photos, answer, hint, station game, stamp code), 8 teams with PINs, and clash-free tracks. Then edit anything you like.

**Quick teams:** Control room → Teams → enter the number of teams → **Create teams**. It makes Team 1…N with PINs and colours and arranges tracks. Download the sheet (CSV) to print the PINs.

**Tap-to-cross grid (Japan):** edit a country → *Tap-to-cross letter grid*: one row per line, letters separated by spaces. Teams tap letters to cross them out and see the letters left.

**Transparent sheet (France):** photo 1 = text, photo 2 = dots sheet, tick *Overlay puzzle*. Teams drag the whole dots sheet; it snaps and turns green when lined up. *Full screen* makes it bigger (turn the phone sideways).

**Team cards (QR):** Control room → Team join link → **Open team cards**. One boarding pass per team with name, QR and PIN; the QR logs the team in directly. **Print / Save as PDF**, or **Send** each card (WhatsApp on phone) / **Copy text**.

**Control room is hidden from players.** Organisers open it with the link ending in **#control** (bookmark it). After signing in once, the Control tab stays visible on that device.

**Client branding:** Game settings → *Client branding* → upload the client logo (PNG), optional client name and button colour. Appears in the header, check-in, leaderboard, finish screen and team cards. *Remove logo* / *Logic default* to go back.

**Custom values mode:** Game settings → *Values for this event* → paste `Value (Country)` lines → **Apply values**. Teams unlock a phrase per country instead of equation letters. **Back to equation letters** restores the default.

**Start session:** teams can check in any time, but they only see a "Get ready" screen. Control room → **▶ Start session** sends every team its first flyer at the same moment. **Pause** freezes the game (progress is kept); **Reset all progress** also sets the session back to *Not started*.

**Equation tab:** each team sees its equation on its own tab; letters appear only after they are won.

**Audio clue:** edit a country → *Audio clue* → choose an MP3/M4A (max 2.5 MB; a 20–40 s clip is best). Teams get a play button on that country's flyer. Audio and photos load only when that flyer opens, so the app stays light.

**Equation letters:** Game settings → set the equation (default `TW = C × C × C / L + V × U`). Edit each country → *Letter won here*. The check under the settings shows whether every letter in the equation is given by a country. The letter is awarded when the operator enters the stamp code, pops up on the team's phone and fills its tile in the equation.

**Game sets:** edit a country → *Game sets* = how many teams can play that game at the same time. The Team tracks panel tells you if you have enough: each country needs at least (teams ÷ countries, rounded up) sets, e.g. 16 teams on 8 countries = 2 sets each.

**Team tracks (tracking sheet):** Control room → *Team tracks*. Each row is one team's order of countries; the team's flyers follow that order. Red cells = more teams at a country at the same stop than it has game sets. **Auto-arrange** fixes clashes, **Download sheet (CSV)** gives you the sheet for Excel/printing.

1. Open https://logic-around-the-world.web.app → **Control room** → sign in with the user from step 1.5.
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
