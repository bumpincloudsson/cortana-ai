# Build and Deploy Your Own ChatGPT AI Application That Will Help You Code

![Open AI CodeGPT](https://i.ibb.co/LS4DRhb/image-257.png)

### Launch your development career with project-based coaching - https://www.jsmastery.pro

## How to use

### Local machine

Get your server running by using the command `npm run server` within the `server/` directory and open it in the browser, i.e. `http://localhost:5000/`

Get your frontend running by using the command `npm run dev` within `client/` and open it in the browser with the URL that shows up in the terminal

## Things You'll Learn

- vanilla JS projects w/ Vite
- using node.js for server-side
- responsive layouts w/ css
- handle events w/ JS
- convert string to markdown
- Prism for code highlighting
- using APIs
- error handling
- clean code

## Set Up

In project directory, run `npm create vite@latest client --template vanilla` - `client` is the name of the project directory it will create and everything will be in there

cd into the new directory and run `npm i` and then `npm run dev`

In `client/style.css`, override the boilerplate vite css with the css from his github

Also copy over the `assets/` (images) into `client/` and move the favicon into `client/public/`

Delete `client/counter.js`

Now to the HTML, change the first link tag to `href="favicon.ico"` to replace the vite one

Make a new link pointing to `client/style.css`

Rename `client/main.js` to `client/script.js` and paste the following in between the body tags

```html
<div id="app">
  <div id="chat_container">
    <form action="">
      <textarea
        name="prompt"
        id=""
        cols="1"
        rows="1"
        placeholder="Ask Codex..."
      ></textarea>
      <button type="submit">
        <img src="assets/send.svg" alt="send image" />
      </button>
    </form>
  </div>
</div>
<script type="module" src="script.js"></script>
```

## Frontend of the App

Building the logic and functionality of our app

## Backend of the App

Build the server to handle the requests and post methods from the front end, e.g. whatever is typed into the form, and then communicate that via API to text-davinci-003

Finally, send that response from text davinci to the front end to render the response

Make sure you make the `.env` file in `server/`
