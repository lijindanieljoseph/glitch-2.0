# Glitch-2.0

![GitHub](https://img.shields.io/github/license/abhijithvijayan/glitch-2.0.svg)

An online Treasure Hunt build for the techno-cultural fest @aaroh19.

### Stack Used:

- Express.JS
- Passport.js
- MongoDB
- Webpack Bundler
- SASS
- Pug Templating Engine
- yarn package manager

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](https://chrome.google.com/webstore/detail/kutt/pklakpjfiegjacoppcodencchehlfnpd) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](https://addons.mozilla.org/firefox/addon/kutt/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](CONTRIBUTING.md#for-opera-users) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 49 & later ✔                                                                                                                                                                | 47 & later ✔                                                                                                                                  | 36 & later ✔                                                                                                             |

# Getting Started

## Authentication

Uses [google-oauth 2.0](http://www.passportjs.org/packages/passport-google-oauth20/) with [passport.js](http://www.passportjs.org/)

## Add/Modify Levels & Answers

You must be an admin to make changes to the game.
To make yourself an admin

- Sign In with your Google Account
- Use any mongodb client to edit the document saved under `User` collection
- Update `permission` field to value `20` for the account.

Done, You can now see options to edit the game in the dashboard.

## Add Questions

Edit the `/views/mixins/_question.pug` file to your need.

## End Game

Set `isEnded` flag under `Game` Model in DB to `1`.

## Send Notificatiions

Use the `Send Alert` option in Admin Panel.

## Store Assets

- Save your `svg's` under `/public/images/icons/`
- Save your `images` under `/public/images/photos`
- Save your `audio files` under `/public/images/audio`
- Import your static assets to `/public/javascripts/glitch.js`

<hr />

# Development

- Copy contents from `variables.env.sample` to `variables.env`
- Fill in with your credentials (Generate google API key from console)
- `yarn run dev` launches express at `PORT 7777`
- Visit `localhost:7777` in your browser to load the game

# Production

- Run `yarn run build` to minify `JS` and `CSS`
- Update `PORT=80` and `NODE_ENV="production"` in `variables.env` file
- Then run `yarn start` to launch the server

## Credentials

#### MongoDB

Create a MongoDB admin in mongo shell

```
> mongo
> use admin
> db.createUser(
  {
    user: "abhijithvijayan",
    pwd: "fBxY3oEA3DCeVN0Pe1PMORx3Td18WNdOy6B5s223C",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

Create a database and user for `Glitch`

```
> use glitch
> db.createUser(
  {
    user: "glitchAdmin",
    pwd: "ADbTfu6vbaDR08775pQSk9uAwhHpo8wBsmAKdSiql7",
    roles: [ { role: "readWrite", db: "glitch" } ]
  }
)
```

### Update these credentials to `variables.env`

<hr />

## Delete Data

If you have previously loaded data to your DB, you can wipe your database 100% clean with:

```bash
yarn run blowitallaway
```

Also delete all the other `collections` manually with `MongoDB Compass`

## Assets Used

- Text Scramble Effect : [Pen](https://codepen.io/soulwire/pen/mErPAK) by [@soulwire](https://codepen.io/soulwire/)
  <!-- - Parallax Star background : [Pen](https://codepen.io/saransh/pen/BKJun) by [@saransh](https://codepen.io/saransh/) -->

## Licence

This project is licenced under [MIT](LICENCE)
