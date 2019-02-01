## React-Native Proof Of Concept

This project was set up to establish and evaluate React Native as a possible platform solution for the development of some Mobile Applications. About a week was spent on development. Developers: Andrei Popa, Matt Greenberg.

## Background

**ReactPOC** was boot strapped with the `react-native` cli. We did try testing the [expo](https://expo.io/) bootstrap, but we found that it carries a lot of extra features which were unnecessary.

The project is currently only configured to run IOS; however, it is capable of running on Android. To achieve this, the native libraries would need to be linked.

## Install

You will need `Node.js` and the latest version of `xcode` for your machine (along with your favorite text editor). Project dependencies are available on `NPM`, the Node.js package manager and `coccoapods`, the Objective-c / Switch dependency package manager. `NPM` should come bundled with Node.js and you will have to install `coccoapods` yourself. Refer to the documentation for the latest install procedure. Once you have all of these platforms, you can install the local dependencies!

```bash
# Install npm dependencies
npm install

# Install pods
cd ios
pod install
```

## Running

Normally, when we package javascript for the web, we use a code bundler like webpack to serve our javascript to the client. For a React Native project, the tool we use is called the `metro bundler`. The metro bundler takes care of packaging up all our javascript code, and serving it over HTTP to the simulator. This bundle serving is only for development. In production, the javascript bundles would be shipped with the rest of the code which would be local to the client. 

```bash
# Start the metro bundler
npm start
```

The metro bundler will take a moment to start. Once you see that the 'loading dependency graph' is 'done', you can build the project.

```bash
# Build the project
npm run ios
```

If this is your first time building the project, it will take a few minuets. The IOS simulator will open on it's own when the build is done.

### Gigya Proxy Server (A dependency)

The problem we ran into here was that Gigya only allows for server to server communication. All client calls to gigya are blocked by CORS. To comply with this requirement, we built a small proxy server written in node and express. **You will need to start this server if you are trying to run the App.** All of the code for this proxy is located in the `GigyaProxy` folder of this project. Below are instructions needed to run this server.

```bash
# From the project root, switch to the GigyaProxy Folder
cd GigyaProxy
# Install dependencies
npm install
# Start the server
npm start
```

The GigyaProxy uses the TestApi key and secret so its safe to develop with. We currently have three routes built for the proxy. Currently only `/login` and `/resolve` are used in the ReactPOC. The register route was used to setup a dummy account so we could test the application.

<table>
  <thead>
    <td>Route</td>
    <td>Params</td>
    <td>Description</td>
  </thead>
  <tr>
    <td>post /login</td>
    <td>expects { name, password }</td>
    <td>Logs in a user and returns profile and session data</td>
  </tr>
  <tr>
    <td>post /register</td>
    <td>expects { name, password, email }</td>
    <td>Creates a user in Gigya, returns new profile and session data</td>
  </tr>
  <tr>
    <td>post /resolve</td>
    <td>expects { url }</td>
    <td>Resolves the url to its first redirect.</td>
  </tr>
</table>

## Login Credentials

Once the Application is started, you will be greeted by `Gigya Login` screen. Here is the dummy login information for the gigya proxy.

> name: rickybobby
> password: Password1234

## Debugging

You can access the developer tools my hitting `cmd+d` from inside the IOS simulator. This will open the developer tools; click on 'debug js remotely' to open the chrome dev tools to debug the javascript code.

If you need to debug Object-C code (used when building a native bridge), you will have to start the metro bundler as normal, but build the app via xcode.

### Redux State Manager

This react project uses Redux as a global state manager. Besides have the benefit of a great state management system, Redux has a cool developer tool. You need to install it, it is the preferred way to debug your javascript code.

**Before you start, make sure that you are not currently running the 'debug js remotely'. The redux dev tool runs on the same port and it will cause issues if you try to run them at the same time.**

```bash
# Install with brew, the macos package manager
brew update && brew cask install react-native-debugger
# Launch the debugger
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

Once the tool is open, go to your IOS simulator and open the developer tools by hitting `cmd+d` while inside the ReactPOC App. Now you can click on 'debug js remotely' which will automatically notice the Redux devtools and connect to them.

#### Core Dependencies

* React Native
* Redux
* Axios
* React Native Sound
* React Navigation
* React Native Video
