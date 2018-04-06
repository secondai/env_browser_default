import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import URL from 'url'

import {
  BrowserRouter as ReactRouterDomRouter,
  Route as ReactRouterDomRoute,
  Switch as ReactRouterDomSwitch,
  Link as ReactRouterDomLink,
  withRouter as ReactRouterDomWithRouter
} from 'react-router-dom'

import { Speechless } from "speechless";


// import ReactTooltip from 'react-tooltip' // cant get it working

import 'react-tippy/dist/tippy.css';
import {
  Tooltip,
} from 'react-tippy';

import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

import autobind from 'autobind-decorator'
import localforage from 'localforage'
import $ from 'jquery'
import lodash from 'lodash'


import { graphql, compose } from 'react-apollo';
import { withApollo } from 'react-apollo';

import queue from 'queue'
 
import bigi from 'bigi'
import bitcoin from 'bitcoinjs-lib'

import Emojify from 'react-emojione'

// import {withSecond} from './components/common/Second'
// import {withAuth} from './components/common/Auth'
import Utils from './components/common/Utils'
import {withEditManager} from './components/common/EditManager'

import {gs as ReactGlobalState} from './components/common/GlobalState';

// import EXPLORER_QUERIES, { possibleConditions as POSSIBLE_CONDITIONS } from './queries'

import ReactResizeDetector from 'react-resize-detector';

import {vol, writeFileSync, readFileSync} from 'fs';
import mkdirp from 'mkdirp-promise'
import copy from 'copy-to-clipboard';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/jsx';
import 'brace/mode/javascript';
import 'brace/snippets/javascript';
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';

import GitHub from 'github-api';

window.localforage = localforage;

let baseChainUrl = 'https://api.getasecond.com';
// let baseChainUrl = 'http://localhost:7011';

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually. 
// Note that these options need to be passed to IPFS in 
// all examples in this document even if not specfied so.
// const ipfsOptions = {}

// const IPFS = require('ipfs')
// // const OrbitDB = require('orbit-db')
// const ipfs = new IPFS(ipfsOptions)
const ipfs = new window.Ipfs(); // using script tag for now
// window.ipfs = ipfs;



const USE_OLD_START = false;
const NEW_MEMORY_ON_REFRESH = true;
const SECOND_NODES_DB_KEY = 'second_v1.0.0-10';

const SECOND_LIST_OF_LOCAL_APPS = 'second_v1.0.0-list-of-apps-01';

const BASIC_NODES = {
  developer: require('./basics/developer.json'),
  user: require('./basics/user.json')
}

let ZipNodes = []; // will be populated to match BASIC_NODES.xyz

const parseGitHubUrl = require('parse-github-url');

const JSZip = require('jszip');
const JSZipUtils = require('jszip-utils');

const Please = require('pleasejs');
const vein = require('veinjs');

const annyang = require('annyang');

var getDirName = require('path').dirname;
const rsa = require('node-rsa');
var jsSchema = require('js-schema');

let cJSON = require('circular-json');

var EventEmitter = require('eventemitter3');
var EE = new EventEmitter();

// var Radium = require('radium'); // css w/ :hover for react

// mkdirp-promise
const writeFileS = (path, contents) => {
  return new Promise(async (resolve,reject)=>{
    await mkdirp(getDirName(path));
    writeFileSync(path, contents);
    resolve();

    // , function (err) {
    //   if (err) return console.error(err);

    //   writeFileSync(path, contents);
    //   resolve();
    // });
  });
}

const writem = async () => {
  await writeFileS('/text.txt', 'Hello world!');
  await writeFileS('/interesting/what.txt', 'Hello world!');
  await writeFileS('/interesting/what2.txt', 'Hello world!');
  console.log(vol.toJSON());
}
writem();
// console.log(readFileSync('/text.txt', 'utf8'));


var Babel = require('@babel/standalone');


var hashcash = require('hashcash');

var uuidv4 = require('uuid/v4');

var createReactClass = require('create-react-class');

var vm = require('vm-browserify');
var SHA1 = require("crypto-js/sha1");
var SHA256 = require("crypto-js/sha256");

const multihash = require('multihashes')
var StellarSdk = require('stellar-sdk');
let crypto = require('crypto');
// var SHA256 = require("crypto-js/sha256");
// window.sha256 = SHA256;
// var jsSHA256 = require('js-sha256').sha256;


// temporary location for code for incoming_from_universe:0.0.1:local:298fj293
const CODENODE = {
  "code": "(()=>{\n  return new Promise(async (resolve, reject)=>{\n    try {\n      \n      // handles an incoming Node from the Universe \n      // - handles the majority of request types:\n      //   - web request \n      //   - internal heartbeat \n      //   - internal \"wakeup\" \n      \n      // This accepts a Node that defines the type of data it is, and how we should start handling the request \n      // - the \"if I know nothing, learn things\" command is in here as well \n      \n      switch(INPUT.type){\n        \n        case 'incoming_first:0.1.1:local:78882h37':\n          \n          // Load up capabilities! \n          // - by default, only the loadCapabilities endpoint exists! \n          // - capabilities are only loaded ONCE! \n          //   - they could also be monkey-patched in later though...\n          // await universe.loadCapabilities();\n          \n          \n          // Create local IdentityNode \n          // - required to talk to any Remote Second \n          var key = new universe.rsa({b: 512});\n          key.generateKeyPair(2048, 65537);\n          \n          const keypair = {\n            private: key.exportKey('pkcs8-private-pem'), \n            public: key.exportKey('pkcs8-public-pem'),\n          }\n          \n          let PrivateIdentityNodeToSave = {\n            type: 'identity_private:0.0.1:local:3298f2j398233',\n            data: keypair\n          }\n          \n          console.log('PrivateIdentityNodeToSave:', PrivateIdentityNodeToSave);\n          \n          // save Node to memory\n          let savedIdentityNode = await universe.newNode(PrivateIdentityNodeToSave);\n          \n          \n          \n          // Find remote Second \n          // - hash of keywords -> wallet address -> encrypted via last keyword? \n          // - want a publicKey and a URL returned \n          //   - a whole IdentityNode should be returned? \n          // - return: \n          //   - external_identity:0.0.1:local:8982f982j92\n          //   - external_identity_connect_method:0.0.1:local:382989239hsdfmn\n          \n          let remoteValue = WINDOW.prompt('Remote Second','test test');\n          // transform to \"string[space]string[space]string[space]\" format \n          remoteValue = universe.lodash.compact(remoteValue.split(' ')).join(' ');\n          // transform to wallet address \n          var hash = universe.bitcoin.crypto.sha256(remoteValue)\n          console.log('hash:', hash);\n          var d = universe.bigi.fromBuffer(hash)\n          console.log('d:', d);\n          var keyPair = new universe.bitcoin.ECPair(d)\n          var address = keyPair.getAddress()\n          console.log('Remote Second Wallet Address', address);\n          \n          // fetch that wallet address, get the first transaction \n          // - first transaction contains IPFS link \n          // - IPFS contains Nodes (without _ids!) \n          let ExternalIdentityNode = await universe.getIdentityForAddress(address);\n          \n          console.log('Got ExternalIdentityNode',ExternalIdentityNode);\n          \n          // return resolve({\n          //   ExternalIdentityNode,\n          //   error: true,\n          //   remoteValue,\n          //   address\n          // })\n          \n          \n          // Authenticate with External Second \n          // - make authenticated requests to a Second (necessary for Learning?) \n          //   - should have ALL requests authenticated \n          // universe.setupExternalSecond();\n          \n          \n          \n          // Connect to passed-in data (ExternalIdentityNode) \n          // - run a search_internal_datasource action sequence to acquire the code to run \n          // - run the code on local Second  \n          \n          let response = await universe.TalkToSecond({\n            ExternalIdentityNode: ExternalIdentityNode,\n            InputNode: {\n              type: 'run_action_sequence:0.0.1:local:293fh8239hsdf23f',\n              data: {\n                actions: [\n                  {\n                    matchActionType: 'search_internal_datasource:0.0.1:local:2h3ufih8s9h2f',\n                    dataForAction: {\n                      type: 'standard_query_request:0.0.1:local:65723f2khfds',\n                      data: {\n                        matchFunctionNode: {\n                          // query here!\n                          // action_pointer:0.0.1:local:238972ncr\n                          type: 'code_miniverse:0.0.1:local:2782fh8823s23',\n                          data: {\n                            code: `(()=>{\n                              // Action \n                              // - childNode common_type:0.0.1:local:298fh29h2323f == \"action\" \n                              \n                              let inputNode = INPUT.data.inputNode;\n                              \n                              if(inputNode.type != 'learning_pointer:0.0.1:local:3289h3238h92'){\n                                return null;\n                              }\n                              \n                              if(inputNode.data.learn != 'browser_developer'){\n                                return null;\n                              }\n                              \n                              // strip childnodes\n                              // delete inputNode.nodes; \n                              // delete inputNode.parent;\n                              delete inputNode.data;\n      \n                              return inputNode;\n                              \n                            })()`\n                          }\n                        },\n                        // expected/allowed schemas for return \n                        // outputSchemas: [\n                        //   'query_result:0.0.1:local:32490usfj23o23f',\n                        //   'internal_error_output:0.0.1:local:32948x2u3cno2c'\n                        // ]\n                      }\n                    }\n                  }\n                ]\n                \n              }\n            }\n          });\n          \n          // Response should include code! \n          let codeResultNode = universe.lodash.find(response.data.actionResponses[0].data[0].nodes,{type: 'code:0.0.1:local:32498h32f2'});\n          \n          // Run code in local VM \n          // - INPUT.data is ExternalIdentityNode \n          let localResult = await universe.runInVM(codeResultNode, INPUT.data);\n          \n          return resolve({\n            externalResponse: true,\n            response,\n            codeResultNode,\n            localResult\n          })\n          \n          \n          // let IdentityNode = null;\n          // let identities = await universe.searchMemory({\n          //   filter: {\n          //     sqlFilter: {\n          //       type: 'remote_datasource:0.0.1:local:298f3h92hf9s8dhf23f'\n          //     },\n          //     // function for returning data from the Node, after filtering a bit \n          //     // - includes both the Node, and Nodes with nodeId (pointers) \n          //     filterNodes: tmpNodes=>{\n          //       // this runs isolated, outside of the above context? (not sure) \n          //       return new Promise((resolve, reject)=>{\n          //         resolve(tmpNodes);\n          //       });\n          //     },\n          //   }\n          // });\n          \n          \n          break;\n          \n        case 'incoming_wakeup:0.0.1:local:8923yf89h9h':\n          // Wakeup \n          // - handles loading capabilities that will be used later \n          //   - loads all Capabilities (require things in?), adds them to GlobalCache \n          //   - on subsequent requests, universe.capabilities() should work. \n          \n          break;\n          \n        case 'incoming_heartbeat:0.0.1:local:23849u492348c7n9':\n          // Heartbeat (ever 1 second or so is expected) \n          break;\n          \n        case 'incoming_web_request:0.0.1:local:29832398h4723':\n          // request via HTTP post method (expressjs server expected) \n          // - headers and body are included\n          //   - body is JSON (expected to be!) \n          break;\n          \n        case 'incoming_web_request_blob:0.0.1:local:293h98h92f3':\n          // todo: handle incoming Blob data \n          break;\n          \n        case 'incoming_web_request_websocket:0.0.1:local:293h98h92f3':\n          // todo: handle incoming websocket request \n          // - could also be on browser? \n          break;\n          \n        case 'incoming_browser_request:0.0.1:local:829329329f832':\n          // incoming request (if in a browser) \n          // - expecting INPUT.type.data is a node! \n          // - might be actions, or something else \n            \n            \n          let nodes = await universe.searchMemory({\n            filter: {\n              filterNodes: tmpNodes=>{\n                // this runs isolated, outside of the above context? (not sure) \n                return new Promise((resolve, reject)=>{\n                  tmpNodes = tmpNodes.filter(tmpNode=>{\n                    // see if has a ChildNode matching a type \n                    let foundMatcherChild = universe.lodash.find(tmpNode.nodes || [],tmpChildNode=>{\n                      return tmpChildNode.type == 'incoming_query_type_matcher:0.0.1:local:3242rx23rd3';\n                    })\n                    // 'run_action:0.0.1:local:2398y294c23'\n                    if(!foundMatcherChild){\n                      return false;\n                    }\n                    \n                    return foundMatcherChild.data.typeMatch == INPUT.data.type;\n                  });\n                  resolve(tmpNodes);\n                });\n              },\n            }\n          });\n          \n          if(nodes && nodes.length){\n            // found Node to run for action! \n  \n            let codeNode = universe.lodash.find(nodes[0].nodes,{type:'code:0.0.1:local:32498h32f2'});\n            \n            // run in vm, and pass in the inputSchema Node! \n            // - of the action! (expecting/requiring it to be a Node w/ code....how to verify that? logic vs data?) \n            let actionResult;\n            try {\n              actionResult = await universe.runInVM(codeNode, INPUT);\n              // ,{\n              //   codeNode, // includes type/schemaName and data \n              //   dataNode: INPUT, // should be another Node that can be used by the action! \n              //   timeout: 15 * 1000\n              // });\n            }catch(err){\n              return resolve('FAILED code from incoming_browser_request');\n            }\n            \n            // validate actionResult!\n            // - todo\n            \n            return resolve(actionResult);\n            // { \n            //   txt: 'Response:', \n            //   nodeTypes: nodes.map(n=>n.type),\n            //   actionResult\n            // }); // + result);\n            \n          } else {\n            // no Node found for handling action :( \n              \n            return resolve({ \n              error: 'No Nodes for action (incoming_browser_request)',\n              INPUT\n            }); // + result);\n          }\n          \n          \n          // switch(INPUT.data.type){\n            \n          //   case 'ping:0.0.1:local:239fh298fh239h23':\n          //     return resolve({\n          //       ping: 'pong'\n          //     });\n            \n          //   case 'browser_startup:0.0.1:local:8831167ssd':\n          //     // setting up initial component \n          //     let result = await universe.searchMemory({\n          //       filter: {\n          //         sqlFilter: {\n          //           type: 'react_component:0.0.1:local:98912hd89',\n          //           data: {\n          //             internalId: 'MainComponent'\n          //           }\n          //         }\n          //       }\n          //     });\n          //     let componentNode = await universe.runInVM(result[0],{});\n              \n          //     return resolve(componentNode);\n            \n          //   default:\n          //     break;\n          // }\n          \n          break;\n          \n          \n        default:\n          break;\n      }\n\n      return resolve({\n        type: 'err:..',\n        data: {\n          msg: 'Missing valid input type'\n        }\n      });\n      \n        \n    }catch(err){\n      resolve({ERROR: true, err: err.toString()});\n    }\n    \n    \n  })\n})()"
}



// Higher Order Components
const withSecond = (WrappedComponent) => {
  return class HOC extends Component {
    constructor(props){
      super(props);
    }

    // define what is needed from context
    static contextTypes = {
      Second: PropTypes.any
    }

    render() {
      // const { Second, updateAuth } = this.context
      return (
        <WrappedComponent {...this.props} Second={this.context.Second}/>
      )
    }
  }
}

const withNodesHOC = (WrappedComponent, nodes) => {
  return class withNodesHOC extends Component {
    constructor(props){
      super(props);
    }
    render() {
      // const { Second, updateAuth } = this.context
      return (
        <WrappedComponent {...this.props} nodes={nodes}/>
      )
    }
  }
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}


const newErrorOutput = (html) => {

  class ErrorOutputComponent extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div style={{color: 'red'}}> {/*_dangerouslySetInnerHTML={{__html: html}}>*/}
          {html.toString()}
        </div>
      )
    }
  }

  return ErrorOutputComponent;

}

class RecreateChildOnPropsChange extends React.Component {
  constructor() {
    super();

    this._forceRecreateCounter = 0;
  }

  shouldComponentUpdate(nextProps) {
    // assert(nextProps.children, 'Every props object should have childrens.');

    let props = this.props;
    if (props === nextProps) {
      return true;
    }

    let keys = Object.keys(props);
    let nextKeys = Object.keys(nextProps);

    if (keys.length !== nextKeys.length) {
      return false;
    }

    for (let key of keys) {
      if (key !== 'children' && (!nextProps.hasOwnProperty(key) || props[key] !== nextProps[key])) {
        return true;
      }
    }

    return false;
  }

  render() {
    this._forceRecreateCounter++;

    return React.cloneElement(
      React.Children.only(this.props.children),
      {key: this._forceRecreateCounter}
    );
  }
}


class StartupNodeComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-5 has-text-centered" style={{opacity:'0.5'}}>
              <div className="button is-white is-loading">
                &nbsp;
              </div>
              <br />
              Loading StartupNode
            </h1>
          </div>
        </div>
      </section>
    )
  }
}


class App extends Component {
  constructor(props){
    super(props);
    // this.queue = queue();
    this.secondReady = new Promise(resolve=>{
      this.secondReadyResolve = resolve;
    });

    console.log('App Startup.', process.env.REACT_APP_STARTUP_GITHUB_BUNDLE);

    this.state = {
      // user: user
      capabilities: null, // turns into a function, or is a list of current capabilities?  (Load, then Use capability?)
      startupNode: null, // gets populared on secondReady 
      basicKey: 'developer',
      storageKey: null,
      choosing: true,
      localAppsList: [], // array of objects: { storageKey: String, basicKey: BASIC_NODE_TYPE }
      storedAppsList: {},
      useLocalforage: false,
      useLocalZip: false,
      nodesDb: [], // empty at first, will load from indexDb (localForage) 
      startupName: '',
      startupZipUrl: process.env.REACT_APP_STARTUP_GITHUB_BUNDLE || ''
    }

  }

  componentWillReceiveProps(nextProps){

  }

  componentDidMount(){
    console.log('componentDidMount');

    this.loadLocalApps()
    .then(this.autolaunch);


    // listen for storage changes
    $(window).on('storage', this.receivedMessage);

    // // fetch initial storage
    // // - then startSecond 
    // if(NEW_MEMORY_ON_REFRESH){
    //   this.startSecond();
    // } else {
    //   this.fetchLatestDb()
    //   .then(()=>{
    //     this.startSecond();
    //   })
    // }

  }

  @autobind
  autolaunch(){
    // launches lastApp automatically 
    // - after a slight delay in order to skip and go back to the Launcher
    //   - could also have a global keycode? 
    //   - or launching a new tab causes the Launcher to display 

    let localApps = this.state.localAppsList || [];

    if(window.name){

      let existing = localApps.find(a=>{
        return a.storageKey == window.name;
      });

      if(existing){
        // find app and autolaunch
        console.log('Starting autolaunch!', window.name, existing);

        this.setState({
          autolaunching: true,
          initialLoad: true
        });

        window.setTimeout(()=>{
          if(this.state.autolaunching){

            // find app and autolaunch
            console.log('Launch initiated after no cancel');


            this.handleUseExisting(existing);
            this.setState({
              autolaunching: false
            });

          }

        },2000);


      }

    }

    this.setState({
      initialLoad: true
    });

  }

  @autobind
  async loadLocalApps(){

    let promises = [];

    promises.push(new Promise((resolve,reject)=>{

      // "running" apps 
      localforage.getItem(SECOND_LIST_OF_LOCAL_APPS)
      .then(localAppsList=>{
        localAppsList = localAppsList || [];
        this.setState({
          localAppsList
        }, resolve)
      })

    }));


    promises.push(new Promise((resolve,reject)=>{

      // apps stored in memory by a Second 
      localforage.getItem('possible-ui-apps')
      .then(storedAppsList=>{
        console.log('found possible-ui-apps');
        storedAppsList = storedAppsList || {};
        this.setState({
          storedAppsList
        },resolve)
      })

    }));

    promises.push(new Promise((resolve,reject)=>{

      // beginning github url 
      localforage.getItem('last-startup-zip-url')
      .then(startupZipUrl=>{
        console.log('found startupZipUrl:', startupZipUrl);
        startupZipUrl = startupZipUrl || '';
        this.setState({
          startupZipUrl
        },resolve)
      })

    }));


    await Promise.all(promises);

  }

  @autobind
  startSecond(){

    return new Promise(async (resolve, reject)=>{

      console.log('Second ready');

      // let Second start processing queue of items 
      this.secondReadyResolve();

      // If there is no db, then we need to start learning! (populate db a bit) 
      if(!this.state.nodesDb.length){
        console.log('Learning basics2');
        await this.learnBasics();

        // // Get ExternalIdentity Node for next request 
        // // - storing internally, then removing and re-adding in the "learn" step 
        // let nodes = await this.fetchNodes({
        //   type: 'external_identity:0.0.1:local:8982f982j92'
        // });

        // let startupExternalIdentityNode;

        // // NOT required to have a startup node (asks for "words"!) 
        // if(nodes.length){
        //   startupExternalIdentityNode = nodes[0];
        //   // console.error('Missing ExternalIdentity on startup!');
        //   // return false;
        // }

        // // run "first" action
        // // - in theory this is for seeding/setup 
        // // - we want a UI for setup tho, so kinda skipping this now 
        // let firstResponse = await this.runRequest({
        //   type: 'incoming_first:0.1.1:local:78882h37',
        //   data: startupExternalIdentityNode
        // }, true)

        // console.log('firstResponse', firstResponse);

      }

      console.log('Running startup!');
      console.log('current memory:', this.state.nodesDb);

      // init 
      this.runRequest({
        type: 'browser_startup:0.0.1:local:8831167ssd', // loads the initial react component (MainComponent or SetupComponent) 
        data: null
      })
      .then(response=>{
        console.log('Response from browser_startup:', response);
        if(response.type == 'react_component:0.0.1:local:98912hd89'){
          this.setState({
            startupNode: response.data
          })
        } else {
          // Display error output 
          try {
            this.setState({
              startupNode: newErrorOutput(response.data.err.message)
            })
          }catch(err){
            console.error('Invalid error output received');
            this.setState({
              startupNode: newErrorOutput(response)
            })
          }
        }
      })

    });

    // // clear?
    // this.makeUpdate([]);

  }

  @autobind
  learnBasics(){

    return new Promise(async (resolve,reject)=>{

      console.log('learnBasics started');

      // console.log('BASICS:', BASIC_NODES);

      if(USE_OLD_START){

        let nodesToLearn = [];

        let id1 = uuidv4();
        let externalId1 = uuidv4();

        // Request Handler 
        nodesToLearn.push({
          _id: id1,
          nodeId: null,
          type: 'incoming_from_universe:0.0.1:local:298fj293',
          data: {}
        })

        // Code for request handler
        nodesToLearn.push({
          nodeId: id1,
          type: 'code:0.0.1:local:32498h32f2',
          data: CODENODE
          // {
          //   "code": "(()=>{\n  return new Promise(async (resolve,reject)=>{\n    try {\n      \n      resolve({\n        browser: 'ok',\n        INPUT,\n        SELF\n      });\n      \n    }catch(err){\n      resolve({ERROR: true, err: err.toString()});\n    }\n    \n  })\n\n  \n})()"
          // }
        })

        // External Identity
        nodesToLearn.push({
          _id: externalId1,
          nodeId: null,
          type: 'external_identity:0.0.1:local:8982f982j92',
          data: {
            publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjLaSkRwS1kFemGs6xMjp\nyDOriloc8oBcd8ITt8tjsbvoToSM7DSyT68Mga1tjFBdxQkg/nseedTjW180nAKu\nbWliSvoDKTILzkE/eNxtNbuSNN715r5M/b/smkTPPb7Qer1Yva7EkN0T3fIIrrZP\ntPwX2fyJe04D/qKlS0bVdanR0iAdRAuHWhzznPszluwiKJItazZuAHkS0If7O+LA\nmwKYpUq9GzapkAujs08e+vVK5N34t9jghbhVR8LweuCUwWoOItvDLSOjfkWpTwqc\nutT7xqwcu+muPEm2zASdp65UraSmo91AZJOX8WohUPi4+UD9OoBNsHlq0sKrQiA7\n2QIDAQAB\n-----END PUBLIC KEY-----'
          }
        })
        nodesToLearn.push({
          nodeId: externalId1,
          type: 'external_identity_connect_method:0.0.1:local:382989239hsdfmn',
          data: {
            "connection": "http://localhost:7001/ai",
            "method": "http"
          }
        })

        for(let node of nodesToLearn){
          await this.insertNode(node);
        }


        return resolve();

      }



      // Use SetupNodes (current) 


      const saveChildNodes = (nodeId, childNodes) => {
        return new Promise(async (resolve, reject)=>{

          console.log('Saving children');
          
          for(let tmpNode of childNodes){
            let newChildNode = {
              nodeId,
              type: tmpNode.type,
              data: tmpNode.data,
            }
            let savedChildNode = await this.insertNode(newChildNode);
            console.log('savedChildNode', savedChildNode);
            if(tmpNode.nodes && tmpNode.nodes.length){

              await saveChildNodes(savedChildNode._id, tmpNode.nodes);

            }
          }
          resolve();
        });
      }


      let startNodes;

      // Use localForage or on-disk?
      if(this.state.useLocalforage){
        console.log('using LOCALFORAGE-stored ui app!');
        startNodes = this.state.storedAppsList[this.state.basicKey];
      } else if(this.state.useLocalZip) {
        console.log('using ZipNodes for ui app');
        startNodes = ZipNodes;
      } else {
        console.log('using ON-DISK -stored ui app!');
        startNodes = BASIC_NODES[this.state.basicKey];
      }

      console.log('StartNodes:', startNodes);
      // return false;


      for(let node of startNodes){
        await this.insertNode(node);
        await saveChildNodes(node._id, node.nodes);
      }

      console.log('Basics learned!');
      resolve();

    });

  }

  @autobind
  runRequest(InputNode, skipWrappingInputNode){
    // Run the passed-in Node 
    // - use the default type:"incoming_from_universe:0.0.1:local:298fj293"

    // runs in VM 
    // - with "universe" context 

    // wait for memory to be ready!
    return new Promise((resolve, reject)=>{

      this.secondReady.then(async ()=>{
        console.log('Running browser request:', InputNode); //, this.state.nodesDb);

        // fetch and run code, pass in 
        let nodes;
        let nodeId;
        let CodeNode;


        // // console.log('NODES:', nodes);
        if(1==0){
          // Old way (at root, no "app" concept) 
          nodes = await this.fetchNodes({
            nodeId: null, // get top-level only! 
            type: 'incoming_from_universe:0.0.1:local:298fj293'
          });

          // if(!nodes || !nodes.length){
          //   console.error('Missing incoming_from_universe:0.0.1:local:298fj293 Node');
          //   return;
          // }

          // let foundIncomingNode = nodes[0];
          nodeId = nodes[0]._id;

          CodeNode = lodash.find(nodes[0].nodes,{type: 'code:0.0.1:local:32498h32f2'});

        } else {

          // new way, as "part of an app" (TODO: finish "inside this app" logic) 

          // get launch code for default app in memory 
          nodes = await this.fetchNodes({
            type: 'incoming_from_universe:0.0.1:local:298fj293'
          });

          // find correct node for appId
          // console.log('NODES matching incoming_from_universe:', nodes.length);

          let foundIncomingNode = nodes.find(node=>{
            // let node2 = JSON.parse(JSON.stringify(node));
            // delete node2.data;
            // node2.nodes = (node2.nodes || []).map(n=>{
            //   delete n.data;
            //   return n;
            // });
            // console.log('NODE2:', node2.parent ? node2.parent.type:null); //, JSON.stringify(node2,null,2));
            try {
              let parent = node.parent;
              if(parent.type.split(':')[0] != 'platform_nodes' || parent.data.platform != 'browser'){
                return false;
              }
              let appbaseParent = parent.parent;
              if(appbaseParent.type.split(':')[0] == 'app_base' && 
                // appbaseParent.data.appId == (process.env.DEFAULT_LAUNCH_APPID || 'a22a4864-773d-4b0b-bf69-0b2c0bc7f3e0') &&
                // app to use? assuming only a single frontend app (TODO: multiple!) 
                appbaseParent.data.release == 'production'
                ){
                // console.log('FOUND!');
                return true;
              }
            }catch(err){}
            return false;
          });
          
          if(!foundIncomingNode){
            console.error('Missing foundIncomingNode');
            return false;
          }

          // console.log('incoming_from_universe:0.0.1:local:298fj293 Node:', foundIncomingNode ? true:false, foundIncomingNode.parent.type, foundIncomingNode.parent.data);

          // let foundIncomingNode = nodes[0];
          nodeId = foundIncomingNode._id;

          CodeNode = lodash.find(foundIncomingNode.nodes,{type: 'code:0.0.1:local:32498h32f2'});

        }

        if(!CodeNode){
          console.error('Missing code:0.0.1:local:32498h32f2 to handle incoming_browser_request');
          return;
        }

        let UniverseInputNode = {};

        if(skipWrappingInputNode){
          UniverseInputNode = InputNode;
        } else {
          UniverseInputNode = {
            type: 'incoming_browser_request:0.0.1:local:829329329f832',
            data: InputNode
          }
        }

        console.log('UniverseInputNode',UniverseInputNode);
        console.log('CodeNode',CodeNode);

        // run in vm
        let responseNode;
        try {
          responseNode = await this.createAndRunVM(CodeNode, UniverseInputNode);
        }catch(err){
          console.error('In VM error:', err);
          responseNode = {
            type: 'err_in_vm:3',
            data: {
              err: err || {},
              error: err
            }
          }
        }

        console.log('ResponseNode:', CodeNode._id, CodeNode.type, responseNode);

        resolve(responseNode);

      })

    });

  }

  @autobind
  createAndRunVM(codeNode, InputNode){


    const ReactHelpers = (WrappedComponent) => {
      return class ReactHelpersHOC extends React.Component {
        constructor(props) {
          super(props);
        }
        loadComponent(dataFilter){
          return universe.loadComponent(dataFilter);
        }

        render() {
          return <WrappedComponent {...this.props} loadComponent={this.loadComponent} />
        }
      }
    }


    let universe = {
      // React, // React.Component is available 
      env: process.env, // REACT_APP...
      $,
      fetch: window.fetch.bind(window),
      localStorage,
      handleCreateNewSecondFromNodes: this.handleCreateNewSecondFromNodes,
      alert,
      console,
      copy, // to clipboard
      jsSchema,
      SHA1,
      SHA256,
      crypto,
      multihash, 
      StellarSdk, 
      createReactClass,
      ReactRouterDomRouter,
      ReactRouterDomRoute,
      ReactRouterDomSwitch,
      ReactRouterDomLink,
      ReactRouterDomWithRouter,
      ReactGlobalState,
      ReactContextMenu: { ContextMenu, MenuItem, ContextMenuTrigger },
      ReactResizeDetector,
      ReactTooltip: Tooltip,
      ReactSelect,
      ReactHelpers,
      ReactWithNodes: withNodesHOC,
      Speechless,
      GitHub,
      annyang,
      Please,
      vein,
      // Radium,
      RecreateChildOnPropsChange,
      withEditManager,
      AceEditor,
      lodash,
      rsa,
      uuidv4,
      bitcoin,
      bigi,
      parseGitHubUrl,
      JSZip,
      ipfs: { // temporary placeholder for reading ipfs file nodes 
        files: {
          cat: (hash)=>{
            // currently fetching from ipfs.io 
            return new Promise((resolve,reject)=>{
              let response = $.ajax({
                url: `https://ipfs.io/ipfs/${hash}`,
                success: response=>{
                  resolve(response);
                },
                error: err=>{
                  console.error('Failed fetching from ipfs.io:', hash);
                  reject();
                }
              })
            });
          }
        }
      },
      cJSON,
      setTimeout: (func, ms)=>{
        return new Promise((resolve,reject)=>{
          window.setTimeout(()=>{
            if(func){
              func();
            }
            resolve();
          },ms);
        })
      },
      EE, // instance of EventEmitter
      findOnNodeChain: (opts)=>{
        return new Promise(async (resolve,reject)=>{
          
          let {
            method,
            nested,
            searches, // only for method=latestForEach
            chainPubKey,
            apiAddress
          } = opts;
          console.log('Find from NodeChain API');

          // chainPubKey = ; // default chainPubKey for secondOrg (TODO: remove) 
          apiAddress = apiAddress || baseChainUrl;

          // 'one' or 'many' or 'latestForEach'
          method = method || 'one';

          let data = JSON.parse(`{"operationName":null,"variables":{"nested":null},"query":"query ($nested: JSON    $chainPubKey: String) {  viewer { node { ${method}(filter: {nested: $nested, chainPubKey: $chainPubKey}) {    _id    ref    author    version    type    data    __typename  }}}}"}`);
          data.variables.nested = nested;
          data.variables.chainPubKey = chainPubKey;

          // fetching most recent for a match (_in?) 
          switch(method){
            case 'one':
            case 'many':

              universe.$.ajax({
                url: `${apiAddress}/graphql`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: nodeChainResult=>{
                  console.log('NodeChain Result', nodeChainResult);
                  if(!nodeChainResult.data.viewer.node[method]){
                    console.error('Unable to find node');
                    return reject();
                  }

                  return resolve(nodeChainResult.data.viewer.node[method]);

                },
                error: err=>{
                  console.error('Failed fetching NodeChain data:', err);
                  return reject();
                }
              })

              return;

            case 'latestForEach':
              // latestForEach (search) 

              universe.$.ajax({
                url: `${apiAddress}/nodes/find`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                  searches,
                  chainPubKey
                }),
                success: nodeChainResults=>{
                  console.log('find latestForEach nodeChainResults', nodeChainResults);
                  return resolve(nodeChainResults);

                },
                error: err=>{
                  console.error('Failed fetching NodeChain data:', err);
                  return reject();
                }
              })

              return;

            case 'types':
              // types (TODO: filter) 

              universe.$.ajax({
                url: `${apiAddress}/nodes/types`,
                // url: `http://localhost:7011/nodes/types`,
                method: 'post',
                contentType: 'application/json',
                data: JSON.stringify({
                  chainPubKey
                }),
                success: nodeChainResults=>{
                  console.log('find types nodeChainResults', nodeChainResults);
                  return resolve(nodeChainResults);

                },
                error: err=>{
                  console.error('Failed fetching NodeChain data:', err);
                  return reject();
                }
              })

              return;


            default:
              console.error('invalid type');
              break;

          }



        });
        
      },
      publishToNodeChain: (opts)=>{
        return new Promise(async (resolve,reject)=>{

          let {
            apiAddress,
            nodeInputStr,
            privateKey,
            chainPubKey,
            ref,
            version,
            nonce
          } = opts;

          apiAddress = apiAddress || baseChainUrl;

          console.log('publishToNodeChain opts:', opts);

          let vals = await ipfs.files.add(new Buffer(nodeInputStr,'utf8'));
          let ipfsHash = vals[0].hash;
          var key = new rsa(privateKey);
          let pubKey = key.exportKey('public');

          version = version.toString();

          // ipfsHash + sha256(pubKey) + version + nonce
          let strToSign = [
            ipfsHash, 
            // SHA256(this.state.pubKey).toString(),
            pubKey,
            // btoa(this.state.pubKey),
            chainPubKey, 
            ref,
            version,
            nonce
          ];
          console.log('arrToSign', strToSign);
          strToSign = strToSign.join('');
          let signature = key.sign(strToSign,'hex');


          let data = {
            nodeInputStr,
            pubKey,
            ref,
            version,
            nonce,
            signature,
          }

          $.ajax({
            method: 'POST',
            url: `${apiAddress}/nodes/add`,
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: response=>{
              resolve(response);
            },
            error: err=>{
              console.error('Err from remote:', err);
              reject(err);
            }
          })


        });
      },
      directToSecond: (opts)=>{
        // to an External second
        return new Promise(async (resolve, reject)=>{

          console.log('directToSecond opts:', opts);

          window.directTime = window.directTime || 0;
          let directStart = (new Date()).getTime();

          // make web request to Node 
          // - just passing through the Node, assume any Auth is already included 
          let response = $.ajax({
            method: 'POST',
            url: opts.url, //connectNode.data.connection, // expecting URL at first! 
            data: JSON.stringify(opts.RequestNode), //ExternalRequestNode.data.RequestNode,
            contentType: 'application/json',
            success: response=>{

              let directEnd = (new Date()).getTime();
              window.directTime += (directEnd - directStart);
              console.log('directTime:', window.directTime, (directEnd - directStart));

              resolve(response);
            },
            error: err=>{
              console.error('Err from remote:', err);
            }
          })

          // resolve(response);

        })
      },
      capabilities: this.state.capabilities,
      reloadCapabilities: ()=>{
        // just reloading by clearing 
        return new Promise((resolve,reject)=>{

          this.setState({
            capabilities: []
          },()=>{
            universe.loadCapabilities()
            .then(resolve)
            .catch(reject);
          });

        });
      },
      loadAndRunCapability: (nameSemver, opts, input)=>{
        return new Promise(async(resolve, reject)=>{

          // Run rsa capability 
          let capNode = await universe.loadCapability(nameSemver, opts);
          let returnNode = await universe.runCapability(capNode, input);

          resolve(returnNode);

        })
      },
      loadCapability: (nameSemver, opts)=>{
        opts = opts || {};
        return new Promise(async (resolve, reject)=>{

          // Returns the Node for the capability specified
          let capabilityNodes = await universe.searchMemory({
            filter: {
              sqlFilter: {
                type: "capability:0.0.1:local:187h78h23",
                // nodeId: null, // New: App-level, OLD: top-level/root
                data: {
                  key: nameSemver // todo: semver with version!
                }
              },
              // filterNodes: tmpNodes=>{
              //   return new Promise((resolve, reject)=>{
              //     // tmpNodes = tmpNodes.filter(tmpNode=>{
              //     //   return tmpNode.data.method == 'read';
              //     // })
              //     resolve(tmpNodes);
              //   });
              // },
            }
          });
          // capabilityNodes = universe.lodash.sortBy(capabilityNodes,capNode=>{
          //   let orderNode = universe.lodash.find(capNode.nodes, {type: 'order_level:0.0.1:local:382hf273'});
          //   return orderNode ? orderNode.data.level:0;
          // });

          if(!capabilityNodes || !capabilityNodes.length){
            console.error('Unable to find capability!', nameSemver);

            let allNodes = await universe.searchMemory({});
            console.error('here',nameSemver, allNodes);
            debugger;

            return reject();
          }

          if(capabilityNodes.length > 1){
            console.error('TOO MANY capability nodes!');
            return reject();
          }

          return resolve(capabilityNodes[0]);
          
        })
      },
      runCapability: (capNode, externalInputNode)=>{
        // opts = opts || {};
        return new Promise(async (resolve, reject)=>{

          // Pass in InputNode to capability! 

          let codeNode = lodash.find(capNode.nodes, {type: 'code:0.0.1:local:32498h32f2'});

          let inputNode = {
            type: 'capability_input_node:0.0.1:local:29f8239a13h9',
            data: {
              capabilityNode: capNode,
              externalInputNode: externalInputNode
            }
          }

          // run in vm
          let responseNode;
          try {
            responseNode = await this.createAndRunVM(codeNode, inputNode);
          }catch(err){
            console.error('In VM error:', err);
            responseNode = {
              type: 'err_in_vm:6231',
              data: {
                err: err || {},
                error: err
              }
            }
          }

          resolve(responseNode);
          
        })
      },
      loadCapabilities: () => {
        return new Promise(async (resolve, reject) =>{

          // Find all with "capability:0.0.1:local:187h78h23" 
          // - order by level_order (golf scoring) 

          // Loads the Node for handling capabilities 


          // loading now because some may have dependencies? 

          let capabilityNodes = await universe.searchMemory({
            filter: {
              sqlFilter: {
                type: "capability:0.0.1:local:187h78h23",
                // nodeId: null // New: App-level, OLD: top-level/root
              },
              // filterNodes: tmpNodes=>{
              //   return new Promise((resolve, reject)=>{
              //     // tmpNodes = tmpNodes.filter(tmpNode=>{
              //     //   return tmpNode.data.method == 'read';
              //     // })
              //     resolve(tmpNodes);
              //   });
              // },
            }
          });
          capabilityNodes = universe.lodash.sortBy(capabilityNodes,capNode=>{
            let orderNode = universe.lodash.find(capNode.nodes, {type: 'order_level:0.0.1:local:382hf273'});
            return orderNode ? orderNode.data.level:0;
          });

          // Iterate over Capabilities
          // - add them to the universe's capabilities 
          // - capabilities, once added, are immediately available to all universe code 
          console.log('Loading Capabilties');
          for(let capNode of capabilityNodes){
            console.log('Loading capability:', capNode);

            // find codeNode
            let codeNode = lodash.find(capNode.nodes, {type: 'code:0.0.1:local:32498h32f2'});

            // this.runInVM(codeNode, capNode); // capNode as INPUT
          }

          resolve();

        })
      },
      getSecondForUsername: (username, serverInfo)=>{
        return new Promise(async (resolve,reject)=>{

          let result = await universe.getNodeForUsernameKey(username, serverInfo, 'second');
          
          return resolve(result);

        });


      },
      getNodeForUsernameKey: (username, serverInfo, key)=>{
        return new Promise(async (resolve,reject)=>{

          let targetAccount = await universe.getAccountForUsername(username, serverInfo);

          let subname = ''; // empty is for root 
          let usernameSplit = username.split('@');
          if(usernameSplit.length > 1){
            subname = usernameSplit[0];
            username = usernameSplit[1];
          }
          
          // get the current value of the ipfshash for the key 
          let hash = await targetAccount.data({key: subname + '|' + key})
          .then(function(dataValue) {
            let decoded = atob(dataValue.value);
            return decoded;
          })
          .catch(function (err) {
            return null;
          })
    
          console.log('hash (fetching via ipfs):', hash);
          
          try {
            let data = await universe.ipfs.files.cat(hash);
            
            console.log('ipfs file data:', data);
            data = JSON.parse(data);
            
            return resolve(data);
            
          } catch(err){
          
            // alert('failed finding hash for username (App.js1)');
            console.error('failed finding hash for username (app.js1)');

            return reject();
          }

        });


      },
      getAccountForUsername: (username, serverInfo)=>{
        return new Promise(async (resolve,reject)=>{

          if(lodash.isString(serverInfo)){
            switch(serverInfo){
              case 'test':
                serverInfo = {
                  address: 'https://horizon-testnet.stellar.org/',
                  network: 'test'
                }
                break;
              case 'public':
                serverInfo = {
                  address: 'https://horizon-testnet.stellar.org/',
                  network: 'test'
                }
                break;
              default:
                console.error('Invalid type specified for serverInfo');
                return false;
            }
          }
          serverInfo = Object.assign({
            address: 'https://horizon-testnet.stellar.org/',
            network: 'test'
          }, serverInfo || {});

          let subname = ''; // empty is for root 
          let usernameSplit = username.split('@');
          if(usernameSplit.length > 1){
            subname = usernameSplit[0];
            username = usernameSplit[1];
          }

          switch(serverInfo.network){
            case 'public':
              StellarSdk.Network.usePublicNetwork();
              break;
            case 'test':
              StellarSdk.Network.useTestNetwork();
              break;
            default:
              break;
          }
          
          let stellarServer = new StellarSdk.Server(serverInfo.address);
          
          console.log('stellarServer', stellarServer);
          
          let pkTargetSeed = crypto.createHash('sha256').update(username).digest(); //returns a buffer
          console.log('pkTargetSeed', pkTargetSeed);
          
          var pairTarget = StellarSdk.Keypair.fromRawEd25519Seed(pkTargetSeed);
          
          console.log('pairTarget', pairTarget);
          
          let targetAccount;
          try {
            targetAccount = await stellarServer.loadAccount(pairTarget.publicKey())
            console.log('targetAccount:', targetAccount);
          }catch(err){
            console.error('Failed getting targetAccount', err);
            return reject();
          }
          
          return resolve(targetAccount);

        });


      },
      getIdentityForAddress: (address, serverInfo)=>{
        return new Promise(async (resolve, reject)=>{


          // Uses default NodeChain API to find first block matching that Identity 

          
          console.log('GET IDENTITY FOR ADDRESS');
          alert('using lang.second.ngrok.io here34987239');

          // OLD ---- 
          // fetches 1st bitcoin transaction for wallet address 
          // - uses decoded first transaction as an IPFS link 
          // - link: https://github.com/ipfs/js-ipfs/tree/master/examples/ipfs-101
          // - ipfs pinning service: https://www.eternum.io (with an API) 

          // currently just using "language" server! (not on bitcoin/ipfs while testing) 

          let data = JSON.parse('{"operationName":null,"variables":{"address":"'+address+'"},"query":"query ($address: String) {  viewer { wallet { one(filter: {address: $address}) {    _id    address    transactions { txId   text }    createdAt    updatedAt    __typename  }}}}"}');
          data = JSON.stringify(data);
          $.ajax({
            url: 'http://lang.second.ngrok.io/graphql',
            method: 'post',
            contentType: 'application/json',
            data: data,
            success: walletResult=>{
              // console.log('Languages', walletResult);
              if(!walletResult.data.viewer.wallet.one){
                console.error('Missing Wallet for this address!');
                return reject();
              }


              // Now get ipfs info 
              // - todo, using language server still
              let hash = walletResult.data.viewer.wallet.one.transactions[0].text; // first result in transaction list 


              let data = JSON.parse('{"operationName":null,"variables":{"hash":"'+hash+'"},"query":"query ($hash: String) {  viewer { ipfsFile { one(filter: {hash: $hash}) {    _id    hash    text    createdAt    updatedAt    __typename  }}}}"}');
              data = JSON.stringify(data);
              $.ajax({
                url: 'http://lang.second.ngrok.io/graphql',
                method: 'post',
                contentType: 'application/json',
                data: data,
                success: ipfsResult=>{
                  // console.log('Languages', ipfsResult);
                  if(!ipfsResult.data.viewer.ipfsFile.one){
                    console.error('Missing ipfsFile for this wallet transaction hash!');
                    return reject();
                  }


                  // Now get ipfs info 
                  // - todo, using language server still
                  console.log('text:', ipfsResult.data.viewer.ipfsFile.one.text, typeof ipfsResult.data.viewer.ipfsFile.one.text);
                  window.xx = ipfsResult.data.viewer.ipfsFile.one.text;

                  let node;
                  if(lodash.isString(ipfsResult.data.viewer.ipfsFile.one.text)){
                    node = JSON.parse(ipfsResult.data.viewer.ipfsFile.one.text);
                  } else {
                    node = ipfsResult.data.viewer.ipfsFile.one.text;
                  }

                  return resolve(node);


                },
                error: err=>{
                  console.error('Failed fetching ipfsFiles:', err);
                  reject();
                }
              })



            },
            error: err=>{
              console.error('Failed fetching wallets:', err);
              reject();
            }
          })

        })
      },
      // runInVM: this.runInVM,
      runInVM: (codeNode, dataNode)=>{
        return universe.runNodeCodeInVM({
          codeNode,
          dataNode
        });
      },
      runNodeCodeInVM: (opts) => {
        return new Promise(async (resolve, reject)=>{

          // Runs in ThreadedVM 
          // - putting this here means it PROBABLY won't have all the context we'd hope for

          // should validate code/schema too? 

          let code;
          try {
            code = opts.codeNode.data.code;
          }catch(err){
            console.error('Missing code for runNodeCodeInVM!', opts);
            return false;
          }

          let datetime = (new Date());

          // console.log('runNodeCodeInVM, triggering real runInVM');
          this.createAndRunVM(opts.codeNode, opts.dataNode || opts.inputNode)
          .then(resolve)
          .catch(reject);


          // setupIpcWatcher({
          //   command: 'ThreadedSafeRun',
          //   code: code,
          //   SELF: opts.codeNode,
          //   INPUT: opts.dataNode || opts.inputNode,
          //   requestId: ob.requestId, // from ob.context!!
          //   mainIpcId: ob.mainIpcId,
          //   nodeId: opts.codeNode._id,
          //   timeout: opts.timeout,
          //   workGroup: opts.workGroup,
          //   workers: opts.workers,
          //   datetime: datetime.getSeconds() + '.' + datetime.getMilliseconds()
          // }, (r)=>{
          //   resolve(r.data);
          // })


        });

      },
      reinitBrowser:()=>{

        // init 
        this.startSecond();

        // this.runRequest({
        //   type: 'browser_startup:0.0.1:local:8831167ssd', // loads the initial react component (MainComponent or SetupComponent) 
        //   data: null
        // })
        // .then(response=>{
        //   console.log('Response from browser_startup:', response);
        //   if(response.type == 'react_component:0.0.1:local:98912hd89'){
        //     this.setState({
        //       startupNode: response.data
        //     })
        //   } else {
        //     // Display error output 
        //     try {
        //       this.setState({
        //         startupNode: newErrorOutput(response.data.err.message)
        //       })
        //     }catch(err){
        //       console.error('Invalid error output received');
        //       this.setState({
        //         startupNode: newErrorOutput(response)
        //       })
        //     }
        //   }
        // })
      },
      newNode: this.insertNode,
      updateNode: this.updateNode,
      clearMemory: ()=>{
        return new Promise((resolve,reject)=>{
          this.setState({
            nodesDb: []
          },async ()=>{
            await this.makeUpdate(this.state.nodesDb);
            resolve(this.state.nodesDb);
          });
        })
      },
      searchMemory: (opts) => {
        return new Promise(async (resolve, reject)=>{
          // resolve('universe result! ' + ob.context.tenant.dbName);
          opts = opts || {};
          opts.filter = opts.filter || {};
          opts.filter.sqlFilter = opts.filter.sqlFilter || {};

          window.searchTime = window.searchTime || 0;
          let searchStart = (new Date()).getTime();

          let nodes;
          try{
            // console.log('fetchnodes1');
            nodes = await this.fetchNodes(opts.filter.sqlFilter);
            // console.log('fetchnodes2');
          }catch(err){
            return resolve({
              err: 'shit'
            });
          }

          // console.log('searchMemory Nodes:', nodes.length, nodes)

          // run "filterNode" after all the results are found
          if(typeof opts.filter.filterNodes == 'function'){
            // console.log('filterNoes1');
            nodes = opts.filter.filterNodes(nodes); // may be a promise (probably is!) 
            // console.log('filterNoes2');
          }

          // console.log('filter func:', opts.filter.filterNodes);

          Promise.resolve(nodes)
          .then(nodes=>{
            let searchResults = cJSON.parse(cJSON.stringify(nodes));
            resolve(searchResults);
            let searchEnd = (new Date()).getTime();
            window.searchTime += (searchEnd - searchStart);
            // console.log('searchTime:', window.searchTime, (searchEnd - searchStart), searchResults);
          })
          .catch(err=>{
            resolve({
              error: true,
              str: 'Failed searching remote memory (filterNodes)!',
              err: err.toString()
            });
          })

        })
      },
      TalkToSecond: ({ExternalIdentityNode, InputNode}) => {
        return new Promise(async (resolve, reject) => {

          // make a request (assuming http for now) to an external Second 
          // - could also be local/on-page? 

          window.talkTime = window.talkTime || 0;
          let talkStart = (new Date()).getTime();

          let url = lodash.find(ExternalIdentityNode.nodes,{
            type: 'external_identity_connect_method:0.0.1:local:382989239hsdfmn'
          }).data.connection;

          console.log('ExternalIdentity connection url:', url);

          $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(InputNode),
            success: (response)=>{
              // expecting a "secondResponse" object that contains a Node 

              let talkEnd = (new Date()).getTime();
              window.talkTime += (talkEnd - talkStart);
              console.log('talkTime:', window.talkTime, (talkEnd - talkStart));

              if(!response.secondResponse){
                console.error('Failed making secondResponse');
                reject('Failed making secondResponse');
                return;
              }
              resolve(response.secondResponse);
            },
            error: err=>{
              reject(err);
            }
          })

        })
      },
      loadComponent(dataFilter){

        return new Promise(async (resolve, reject)=>{

          // let componentCommands = await this.props.loadComponent({
          //   internalId: 'ListComponent'
          // });
          // this.setState({
          //   componentCommands
          // })

          try {
              
            let result = await universe.searchMemory({
              filter: {
                sqlFilter: {
                  type: 'react_component:0.0.1:local:98912hd89',
                  data: dataFilter
                }
              }
            });
            let componentNode = await universe.runInVM(result[0],{});
            resolve(componentNode.data);
          } catch(err){
            console.error('Failed getting component:', dataFilter);
            resolve(null);
          }

        });
        
      }
    }

    return new Promise(async (resolve, reject)=>{
      try {

        // console.log('Transforming'); // this is actually quick?
        let codeHash = SHA256(codeNode.data.code);

        let codeTransformed = await localforage.getItem('codehash-' + codeHash);
        if(codeTransformed && codeTransformed.length){
          // using transformed code stored locally! 
          // console.log('Using local transformed code!');
        } else {
          codeTransformed = Babel.transform(codeNode.data.code, { 
            presets: ['es2015','react','stage-0'], 
            plugins: [] 
          }).code;
          this.updateHashedCode(codeHash, codeTransformed);
        }

        // var newCode = Babel.transform(codeNode.data.code, { 
        //   presets: ['es2015','react','stage-0'], 
        //   plugins: [] 
        // }).code;
        // console.log('Transformed');

        console.log('Running code in vm', codeNode);
        let output = vm.runInNewContext(codeTransformed, {
          // alert: m=>{alert(m)},
          autobind,
          universe, 
          setTimeout: (func, ms)=>{
            return new Promise((resolve,reject)=>{
              window.setTimeout(()=>{
                if(func){
                  func();
                }
                resolve();
              },ms);
            })
          },
          localforage,
          React, 
          INPUT: InputNode, 
          SELF: codeNode,
          WINDOW: window,
          console,
          withSecond
        });
        // console.log('vm output', output);
        Promise.resolve(output)
        .then(output=>{
          // should be a Node! 
          // console.log('vm resolved output', output);
          resolve(output);
        })
        .catch(err=>{
          // err again! 
          console.error(err);
          resolve({
            type: 'errfrontend324',
            data: {
              error: true,
              err
            }
          });
        })
      }catch(err){
        console.error(err);
        resolve({
          type: 'errfrontend324453534',
          data: {
            error: true,
            err
          }
        });
      }
    });

    // console.log('RES:', res);

  }

  @autobind
  updateHashedCode(hash, codeTransformed){
    return new Promise(async (resolve, reject)=>{

      // should store all-together! 

      localforage.setItem('codehash-' + hash, codeTransformed).then(()=>{ // SECOND_NODES_DB_KEY
        // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));
        resolve();
      });
            // await localforage.getItem(codeHash)

    });
  }

  @autobind
  makeUpdate(updateObj){
    // saving a new nodesDb
    return new Promise((resolve,reject)=>{
      localforage.setItem(this.state.storageKey, updateObj).then(()=>{ // SECOND_NODES_DB_KEY
        resolve();
        // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));
      });
    });
  }

  @autobind
  fetchLatestDb(){
    // grab the latest nodesDb
    return localforage.getItem(this.state.storageKey).then(nodesDb=>{ // SECOND_NODES_DB_KEY
      console.log('Latest Node nodesDb:', nodesDb);
      return new Promise((resolve, reject)=>{
        this.setState({
          nodesDb: nodesDb || []
        },resolve)
      });
    });
  }

  // receive message
  //
  @autobind
  receivedMessage(ev){

    console.log('receivedMessage:', ev.originalEvent.key);

    if(this.state.choosing){
      return false;
    }

    if (ev.originalEvent.key!='latest-storage-update') return; // ignore other keys


    // this.fetchLatestDb(); // NOT tripping this! (causing too many fetches) 


  }

  @autobind
  fetchNodes(filterObj, depth){
    // also fetches all child nodes, for 10 levels deep

    // console.log('fetchingNodes');
    return new Promise(async (resolve,reject)=>{
      depth = depth || 1;
      depth++;
      if(depth > 6){
        // too deep! (or pointing in a loop!) 
        return resolve([]);
      }

      let nodes = lodash.filter(this.state.nodesDb, filterObj); // mimics simply object requests 

      // console.log('fetchNodes w/ filter:', nodes.length);

      for(let node of nodes){

        // get parent
        if(node.nodeId){
          // find parent 
          let parent = await this.fetchNodes({_id: node.nodeId}, depth);
          if(parent && parent.length){
            node.parent = parent[0];
          }

        }

        // get children 
        node.nodes = await this.fetchNodes({nodeId: node._id}, depth);

      }

      // console.log('After nodes');

      resolve(nodes);

    });
  }

  @autobind
  insertNode(node){
    return new Promise(async (resolve, reject)=>{

      console.log('Inserting Node:', node.type);
      // if(node.type == 'identity_private:0.0.1:local:3298f2j398233'){
      //   alert(1);
      // }

      node._id = node._id || uuidv4();
      node.nodeId = node.nodeId || null;
      node.createdAt = (new Date()).getTime();

      let nodes = this.state.nodesDb;
      nodes.push(node);

      this.setState({
        nodesDb: nodes
      },async ()=>{
        await this.makeUpdate(this.state.nodesDb);
        resolve(node);
      });

    });
  }

  @autobind
  updateNode(updateNode){
    return new Promise(async (resolve, reject)=>{

      console.log('Updating Node:', updateNode._id);
      // if(updateNode.type == 'identity_private:0.0.1:local:3298f2j398233'){
      //   alert(1);
      // }

      let nodes = this.state.nodesDb;

      let internalNode = lodash.find(nodes, {_id: updateNode._id}); 
      let internalNodeIndex = lodash.findIndex(nodes, {_id: updateNode._id}); 

      // console.log('Found nodes!');
      internalNode.nodeId = updateNode.hasOwnProperty('nodeId') ? updateNode.nodeId : internalNode.nodeId;
      internalNode.type = updateNode.hasOwnProperty('type') ? updateNode.type : internalNode.type;
      internalNode.data = updateNode.hasOwnProperty('data') ? updateNode.data : internalNode.data;
      internalNode.updatedAt = updateNode.hasOwnProperty('updatedAt') ? (updateNode.updatedAt || (new Date()).getTime()) : internalNode.updatedAt;

      // changes were by reference? 

      // Replace item at index using native splice
      nodes.splice(internalNodeIndex, 1, internalNode);

      this.setState({
        nodesDb: nodes
      },async ()=>{
        console.log('Node updated', updateNode);
        await this.makeUpdate(this.state.nodesDb);
        resolve(updateNode);
      });

    });
  }

  getChildContext() {
    return {
      Second: {
        // makeUpdate: this.makeUpdate,
        // nodesDb: this.state.nodesDb || [],
        // fetchNodes: this.fetchNodes,
        // runRequest: this.runRequest
      }
    }
  }

  @autobind
  handleCreateNewSecond(basicKey){
    // Creates a new Second 
    // - adds new localstorage key to list of seconds 

    let localAppsList = this.state.localAppsList;

    let newStorageKey = 'seconddb-' + uuidv4();

    let name = window.prompt('name for display', basicKey);
    if(!name){
      return false;
    }

    localAppsList.push({
      name,
      storageKey: newStorageKey,
      basicKey: basicKey,
      createdAt: (new Date()).getTime()
    });

    localforage.setItem(SECOND_LIST_OF_LOCAL_APPS, localAppsList).then(()=>{
      // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));

      console.log('Added app to list');

      this.handleLoadApp(newStorageKey, basicKey);

      // this.setState({
      //   storageKey: newStorageKey,
      //   basicKey,
      //   choosing: false
      // },()=>{
      //   // // trigger basics learning
      //   // this.learnBasics();

      //   this.fetchLatestDb()
      //   .then(()=>{
      //     this.startSecond();
      //   })

      // })

    });


  }

  @autobind
  handleCreateNewSecondFromLocalStorage(basicKey){
    // Creates a new Second (from localforage)
    // - adds new localstorage key to list of seconds 

    let localAppsList = this.state.localAppsList;

    let newStorageKey = 'seconddb-' + uuidv4();

    let name = window.prompt('name for display', basicKey);
    if(!name){
      return false;
    }

    localAppsList.push({
      name,
      storageKey: newStorageKey,
      basicKey: basicKey,
      createdAt: (new Date()).getTime()
    });

    localforage.setItem(SECOND_LIST_OF_LOCAL_APPS, localAppsList).then(()=>{
      // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));

      console.log('Added app to list');
      this.setState({
        useLocalforage: true
      },()=>{
        this.handleLoadApp(newStorageKey, basicKey);
      });

    });


  }

  @autobind
  handleCreateNewSecondFromRemoteZip(){

    // Loads nodes from github 
    // - downloads and extracts a zip file, or gets the nodes individually? 

    console.log('startupZipUrl1:', this.state.startupZipUrl);

    localforage.setItem('last-startup-zip-url', this.state.startupZipUrl)
    .then(()=>{
      console.log('set last-startup-zip-url', this.state.startupZipUrl);
    });
      // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));

    this.setState({
      launching: true
    });

    let url = this.state.startupZipUrl;

    let gh = parseGitHubUrl(url);


    // If no name, fetch the name first 
    let startupName = this.state.startupName;
    if(!startupName || !startupName.length){

      let GH = new GitHub();
      let ghr = GH.getRepo(gh.owner, gh.name);
      ghr.getContents(gh.branch,'second.json',false,(err,val)=>{
        if(err){
          alert('Failed finding valid second.json');
          return false;
        }
        let secondJson = JSON.parse(atob(val.content));
        console.log('secondjson:', secondJson);
        this.setState({
          startupName: secondJson.name || '',
          launching: false
        });
      })


      return false;
    }

    // converts startup git url into username/password 
    // - eventually allow links to be pasted, parse accordingly 

    // parse github links and re-organize to fit .zip model 

    if(gh.owner && 
      gh.name && 
      gh.repo && 
      gh.branch){
      url = `https://github.com/${gh.repo}/archive/${gh.branch}.zip`;
    }

    // cannot simply follow github zipball/tarball links :( 
    fetch(`https://cors-anywhere.herokuapp.com/${url}`,{
      // mode: 'no-cors' 
    })
    .then(response=>{
      // console.log('Response:', response);
      return response.arrayBuffer();
    })
    .then(JSZip.loadAsync)
    // .then(=>{
      // JSZip.loadAsync(arrBuff)
      .then(async (zip)=>{
        console.log('loaded zip data!', zip);

        // ZIP is valid! 
        let files = zip.files;

        function readFilePath(p){
          return new Promise(async (resolve,reject)=>{
            console.log('path:', p);
            let r = await files[p].async('text')
            resolve(r);
          });
        }

        // load all the files 
        let allFiles = {};
        for(let filepath of Object.keys(files)){
          let file = files[filepath];
          if(file.dir){

          } else {
            // console.log('filepath:', filepath);
            let contents = await readFilePath(filepath);
            // console.log('contents:', contents);
            let normalizedPath = filepath.split('/').splice(1).join('/');
            allFiles[normalizedPath] = contents;
          }
        }

        console.log('allFiles from Zip:', allFiles);
        
        function addChildren(id){
          return new Promise(async (resolve,reject)=>{

            let nodes = [];

            for(let filepath of Object.keys(allFiles)){
              let contents = allFiles[filepath];
              if(filepath.indexOf('nodes/') !== 0){
                // console.log('NOT NODE:', filepath);
                continue;
              }

              let parsed = jsonParse(filepath, contents);
              if(parsed.nodeId == id){
                // console.log('Matches ID:', parsed.nodeId, id);
                let children = await addChildren(parsed._id);
                parsed.nodes = children;
                nodes.push(parsed);
              } else {
                // console.log('No Kids:', id, parsed.nodeId);
              }

            }

            resolve(nodes);

          });
        }

        // re-organize child nodes 
        ZipNodes = await addChildren(null); // start at root, adds children recursively 

        let secondJson = JSON.parse(allFiles['second.json']);
        // let basicKey = secondJson.name; 

        console.log('ZipNodes:', ZipNodes);

        // Add app to localApps list (for relaunching after a page refresh) 

        let localAppsList = this.state.localAppsList;

        let newStorageKey = 'seconddb-' + uuidv4();

        let name = this.state.startupName; //window.prompt('name for display', secondJson.name);
        if(!name || !name.length){
          return false;
        }

        localAppsList.push({
          name,
          storageKey: newStorageKey,
          // basicKey: basicKey,
          createdAt: (new Date()).getTime()
        });

        localforage.setItem(SECOND_LIST_OF_LOCAL_APPS, localAppsList).then(()=>{
          // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));

          console.log('Added app to list');
          this.setState({
            // useLocalforage: true
            useLocalZip: true
          },()=>{
            this.handleLoadApp(newStorageKey);
          });

        });




      // });

    })

    // JSZipUtils.getBinaryContent('https://codeload.github.com/secondai/bundle_browser_user/legacy.zip/master', function(err, data) {
    //     if(err) {
    //         throw err; // or handle err
    //     }

    //     JSZip.loadAsync(data).then(function () {
    //         // ...
    //         console.log('loaded zip daata!');
    //     });
    // });


  }

  @autobind
  handleCreateNewSecondFromNodes(name, startNodes){

    // Creates local instance from remote nodes 

    // kill/clear previous (expecting it to exist) 
    this.secondReady = new Promise(resolve=>{
      this.secondReadyResolve = resolve;
    });

    // re-using ZipNodes, doesn't matter exactly 
    ZipNodes = startNodes;

    let newStorageKey = 'seconddb-' + uuidv4();

    let localAppsList = this.state.localAppsList;

    // Nodes are passed in 
    localAppsList.push({
      name,
      storageKey: newStorageKey,
      // basicKey: basicKey,
      createdAt: (new Date()).getTime()
    });

    localforage.setItem(SECOND_LIST_OF_LOCAL_APPS, localAppsList).then(()=>{
      // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));

      console.log('Added app to list of local running app instances');
      this.setState({
        nodesDb: [], // reset
        useLocalforage: false, // necessary to cancel out previous result! 
        useLocalZip: true
      },()=>{
        this.handleLoadApp(newStorageKey);
      });

    });


  }

  @autobind
  handleRemoveExisting(localApp){

    let localAppsList = lodash.filter(this.state.localAppsList,app=>{
      return app.storageKey != localApp.storageKey
    });


    localforage.setItem(localApp.storageKey, []).then(()=>{ // SECOND_NODES_DB_KEY
      // localStorage.setItem('latest-storage-update',JSON.stringify((new Date()).getTime()));
    });

    localforage.setItem(SECOND_LIST_OF_LOCAL_APPS, localAppsList).then(()=>{
      this.loadLocalApps();
    });

  }

  @autobind
  handleUseExisting(localApp){
    // Sets key to use for memeory

    console.log('Using Existing LocalApp');

    // should update "last used at" datetime

    this.handleLoadApp(localApp.storageKey, localApp.basicKey);

    // this.setState({
    //   storageKey: localApp.storageKey,
    //   basicKey: localApp.basicKey,
    //   choosing: false
    // },()=>{
    //   this.fetchLatestDb()
    //   .then(()=>{
    //     this.startSecond();
    //   })
    // })

  }

  @autobind
  handleLoadApp(storageKey, basicKey){
    // Sets key to use for memeory

    console.log('Loading App');

    // should update "last used at" datetime

    window.name = storageKey; // fucking awesome! I knew there would be a simple way to persistent different apps on the same url 

    this.setState({
      storageKey, 
      basicKey,
      choosing: false
    },()=>{
      this.fetchLatestDb()
      .then(()=>{
        this.startSecond();
      })
    })

  }

  render() {


    let possibleSeconds = []; // Object.keys(BASIC_NODES);
    // let possibleSeconds = Object.keys(BASIC_NODES);
    let localApps = lodash.sortBy(this.state.localAppsList || [],'createdAt').reverse();
    let storedAppsList = this.state.storedAppsList;

    if(!this.state.initialLoad){
      return (
        <div>
          <div className="hero is-large">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">
                  ...
                </h1>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if(this.state.autolaunching){
      return (
        <div>
          <div className="hero is-large">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title is-3">
                  Launching App
                </h1>
                <h2 className="subtitle2">
                  <button className="button" onClick={e=>this.setState({autolaunching: false})}>
                    Cancel
                  </button>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // choosing app to use? 
    if(this.state.choosing){
      return (
        <div>
          <div className="hero is-info">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title">
                  Second
                </h1>
                <h2 className="subtitle">
                  Browser App Startup
                </h2>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container">

              <div className="columns">

                <div className="column">


                  <h2 className="title is-4">
                    New Second
                  </h2>


                  <div className="field has-addons">
                    <div className="control is-expanded">
                      <input className="input" type="text" placeholder="app name" value={this.state.startupName} onChange={e=>this.setState({startupName:e.target.value})} />
                    </div>
                  </div>

                  <br />

                  <h2 className="title is-6">
                    Remote Zip File
                  </h2>
                  <h2 className="subtitle is-6">
                    github repository links parsed automatically
                  </h2>
                  

                  <div>

                    <div className="field has-addons">
                      <div className="control is-expanded">
                        <input className="input" type="text" placeholder="https zip url" value={this.state.startupZipUrl} onChange={e=>this.setState({startupZipUrl:e.target.value})} />
                      </div>
                      <div className="control">
                        <a className={"button is-info" + (this.state.launching ? ' is-loading':'')} onClick={this.handleCreateNewSecondFromRemoteZip}>
                          {
                            this.state.startupName.length ?
                            'Launch'
                            :
                            'Fetch'
                          }
                        </a>
                      </div>
                    </div>

                  </div>

                  <br />

                  <h2 className="title is-6">
                    LocalStorage
                  </h2>
                  <div>

                    {
                      Object.keys(storedAppsList).map(poss=>(
                        <div key={poss}>

                          <a onClick={e=>this.handleCreateNewSecondFromLocalStorage(poss)}>
                            - {poss}
                          </a>

                        </div>
                      ))
                    }
                    {
                      Object.keys(storedAppsList).length ? '':
                      <div>
                        <i>
                          None
                        </i>
                      </div>
                    }

                  </div>

                  <br />

                  <h2 className="title is-6">
                    Disk
                  </h2>
                  <div>

                    {
                      possibleSeconds.map(poss=>(
                        <div key={poss}>
                          <a onClick={e=>this.handleCreateNewSecond(poss)}>
                            - {poss}
                          </a>
                        </div>
                      ))
                    }

                  </div>

                </div>

                <div className="column">

                  <h2 className="title is-4">
                    Previously Created Second
                  </h2>

                  <h2 className="title is-6">
                    from LocalStorage
                  </h2>

                  <div>

                    {
                      localApps.map(localApp=>(
                        <div key={localApp.storageKey}>
                          <a onClick={e=>this.handleUseExisting(localApp)}>
                            {localApp.name || localApp.basicKey}
                            {
                              window.name != localApp.storageKey ? '':
                              <span>
                              &nbsp; <strong>[last used in tab]</strong>
                              </span>
                            }
                          </a>
                          &nbsp;
                          &nbsp;
                          &nbsp;
                          <span onClick={e=>this.handleRemoveExisting(localApp)} style={{cursor:'pointer'}}>
                            x
                          </span>

                        </div>
                      ))
                    }

                  </div>

                </div>

              </div>


            </div>
          </div>
        </div>
      )
    }


    // Loads initial Second ("wakeup") 
    let MainComponent = this.state.startupNode || StartupNodeComponent;
    // console.log('MainComponent', MainComponent);
    return (
      <ErrorBoundary>
        <MainComponent />
      </ErrorBoundary>
    );
  }
}
App.childContextTypes = {
  Second: PropTypes.any
}


let __parsedFiles = {};
function jsonParse(key, contents){
  if(__parsedFiles[key]){
    return __parsedFiles[key]
  }

  __parsedFiles[key] = JSON.parse(contents);
  return __parsedFiles[key];

}

export default App;
