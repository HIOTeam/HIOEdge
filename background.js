// background.js
// Store port for native messaging connections
var portDict = {};
var host_name = "com.hiotech.hio";
var port = null;
var username = "";
var password = "";
var domain = "";
var tabID = -1;
var frameID = -1;
var frameIDs = [];
var frameIDss = [];
browser.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    tabID = tabs[0].id; // GET FIRST TAB ID WHILE OPEN CHORME

});






browser.tabs.onActivated.addListener(function (tabId, changeInfo, tab) {

    tabID = tabId;

    browser.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        if (tabs.length > 0)
            tabID = tabs[0].id; // GET FIRST TAB ID WHILE OPEN CHORME

    });

});
//browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

//tabID=tabId;
//});


function checkaddFrame(_frameID) {
    var exist = false;

    frameIDss.forEach(function (fid) {
        if (fid["tabID"] == tabID && fid["frameID"] == _frameID)
            exist = true;


    });
    if (exist == false) {
        frameIDss.push({ tabID: tabID, frameID: _frameID });
    }



}

////////////////////////////////////////////////////
browser.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        try {
          
            sendResponse({ success: true });
           
            console.log(sender);
            domain = extractHostname(sender["tab"]["url"]);
 
            
            connect(sender.tab);

            switch (request['CMD']) {

                case 'JUSTMENU':

                    message = { "CMD": "JUSTMENU", "url": domain, "username": "", "action": request['action'], "title": sender["tab"].title };
                    console.log(message);
                    sendNativeMessage(message, sender.tab);
                  
                    break;
                case 'GETUSER':
                    message = { "CMD": "GETUSER", "url": domain, "username": "", "action": request['action'], "title": sender["tab"].title };
                    console.log(message);
                    sendNativeMessage(message, sender.tab);
                    break;
                case 'CHECKPASS':
                    message = { "CMD": "CHECKPASS", "url": domain, "username": (request['username'] == null) ? "" : request['username'], "action": request['action'], "title": sender["tab"].title };
                    sendNativeMessage(message, sender.tab);
                    break;
                case 'GETPASS':
                    message = { "CMD": "GETPASS", "url": domain, "username": (request['username'] == null) ? "" : request['username'], "action": request['action'], "title": sender["tab"].title };
                    sendNativeMessage(message, sender.tab);
                    break;

                ////////////////////////////////////NEW VER
                case 'INIT':
                    
                   
                    ////////////////////////////

                    message = { "CMD": "INIT", "url": "www.com", "username": "", "action": "ww.com" };
                    sendNativeMessage(message, sender.tab);

                    break;

                ////////////////////////////
                case "DASHBOARD":
                  
                        message = { "CMD": "DASHBOARD", "url": "www.com", "username": "", "action": "ww.com" };
                        sendNativeMessage(message, sender.tab);
                    
                    break;
                ////////////////////////////
                case "MANAGEALLUSER":
                 
                        message = { "CMD": "MANAGEALLUSER", "url": "www.com", "username": "", "action": "ww.com" };
                        sendNativeMessage(message, sender.tab);
                    
                    break;
                ////////////////////////////
                case "ADDUSER":
                 
                        message = { "CMD": "ADDUSER", "url": domain, "username": "", "action": "ww.com", "title": sender["tab"].title };
                        sendNativeMessage(message, sender.tab);
                    
                    break;
                /////////////////////////////////////
                case 'UPDATETAB':
                    tabID = sender["tab"]["id"];
                    break;
                /////////////////////////////////////
                case "GENERATEPASSWORD":

                    message = { "CMD": "GENERATEPASSWORD", "url": domain, "username": (request['username'] == null) ? "" : request['username'], "action": request['action'] };
                    sendNativeMessage(message, sender.tab);

                    break;
                case "READYDATA":

                    message = { "CMD": "READYDATA", "url": domain, "username": (request['username'] == null) ? "" : request['username'], "action": "" };
                    sendNativeMessage(message, sender.tab);

                    break;
                case "MENU":

                    message = { "CMD": "MENUCHROME", "title": sender["tab"].title, "url": domain, "username": "", "action": "" };
                    sendNativeMessage(message, sender.tab);

                    break;
                case "READYDATAPASS":

                    message = { "CMD": "READYDATAPASS", "url": domain, "username": (request['username'] == null) ? "" : request['username'], "action": "" };
                    sendNativeMessage(message, sender.tab);

                    break;
                /////////////////////////////////////
                case "GENERATEPASSWORDNOFILL":
                    
                        message = { "CMD": "GENERATEPASSWORDNOFILL", "url": domain, "username": (request['username'] == null) ? "" : request['username'], "action": request['action'] };
                        sendNativeMessage(message, sender.tab);
                    
                    break;
                /////////////////////////////////////
                case "PASSEXIST":
                    frameID = sender["frameId"];
                    frameIDs.push(frameID);
                    break;
                case "CANNOTFINDPASS":
                    console.log("CANNOTFIND remove " + frameID);
                    message = { "CMD": "CANNOTFINDPASS", "url": "", "username": "" };
                    sendNativeMessage(message, sender.tab);
                    break;
                case "CANNOTFIND":
                    console.log("CANNOTFIND remove " + frameID);
                    message = { "CMD": "CANNOTFIND", "url": "", "username": "" };
                    sendNativeMessage(message, sender.tab);
                    break;
                case "ANYFORM":
                    //console.log("ANYFORM remove " + frameID);
                  
                    //if ($.grep(frameIDss, function (e) { return e.tabID == tabID; }).length == 0) {
                    //    console.log("CANNOTFIND remove " + frameID);
                    //    message = { "CMD": "CANNOTFIND", "url": "", "username": "" };
                    //    sendNativeMessage(message, sender.tab);
                    //}
                    break;
                case 'CONNECT':
                    if (frameID == 0) {
                        message = { "CMD": "CONNECT" };
                        console.log(message);
                        sendNativeMessage(message, sender.tab);
                    }
                    break;
                case 'GETSTATUS':
                    if (frameID == 0) {

                        message = { "CMD": "INIT", "url": "www.com", "username": "", "action": "ww.com" };
                        sendNativeMessage(message, sender.tab);
                    }
                    break;
                case 'MENUCHROME':
                    if (frameID == 0) {

                        message = { "CMD": "MENUCHROME", "url": "www.com", "username": "", "action": "ww.com" };
                        sendNativeMessage(message, sender.tab);
                    }
                    break;
                ////////////////////////////////////Submit
                case 'SUBMIT':
                    message = { "CMD": "SUBMIT", "url": domain, "username": request['username'], "password": request['pass'], "action": request['action'], "title": sender["tab"].title };
                    sendNativeMessage(message, sender.tab);
                    break;
                /////////////////////////////////////
            }

           
        } catch (err) {
            //if(err =="Error: Attempting to use a disconnected port object.")
             //   port = null;
            console.log(err);
        }

        
    });
/////////////////////////////////////////////
function sendDC() {

  //  message = { "CMD": 'exit', "username": '' };
   // port.postMessage(message);

}
/////////////////////////////////////////////
function onNativeMessage(data) {
    if (data == "")
        return;
    console.log(data);

    try {
        data = JSON.parse(data);

        switch (data["CMD"]) {
            case "MENU":
                browser.tabs.executeScript(tabID, { code: 'showMenu();'});
                break;
            case "WHICH":
                    browser.tabs.sendMessage(tabID, { 'CMD': 'WHICH' }   );
                    //browser.tabs.executeScript(tabID, { code: "whichFill();" });
                break;


            case "CONNCETION":
                if (data["DATA"] == 'true') {
                    browser.browserAction.setIcon({
                        path: "icons/icon-32.png",
                    });
                } else {
                    browser.browserAction.setIcon({
                        path: "icons/icon-32b.png",
                    });
                }
                break;
            case "CHECKPASS":
                
                    browser.tabs.executeScript(tabID, { code: 'var username_BK="' + data["USER"] + '"' });
                    browser.tabs.executeScript(tabID, { file: "/checkpass.js" });

                
                
                break;
            case "CHECKREADYUSER":
           
                    browser.tabs.executeScript(tabID, { code: 'funcReadyGetData(11111)' });
                
                break;
            case "CHECKREADYPASS":
              
                    browser.tabs.executeScript(tabID, { code: 'funcReadyGetDataPass(11111)' });
               
                break;
            case "USER":
                ///////////////////////////////////

              
                    browser.tabs.executeScript(tabID, { code: 'var username_BK="' + data["USER"] + '"' });
                    browser.tabs.executeScript(tabID, { file: "/putUsername_BK.js" });

               

                break;

            case "DC":
                browser.browserAction.setIcon({
                    path: "icons/icon-128b.png",
                    tabId: tabID
                });

                onDisconnected();
                break;
            //////////////////////////////NEW VER
            case "PASSVALUEGEN":
        
                    browser.tabs.executeScript(tabID, { code: 'var password_BK="' + data["DATA"] + '";' });
                    browser.tabs.executeScript(tabID, { code: 'fillPassWithGen("' + data["DATA"] + '",true);' });

                
              



                break;
            //case "PASSCLIPBOARD":
            //	browser.tabs.executeScript(tabID,  {code:'var password_BK="'+data["DATA"]+'";',frameId:frameID});
            //	browser.tabs.executeScript(tabID,  {code:'fillPassWithGen("'+data["DATA"]+'",false);',frameId:frameID});
            //break;
            /////////////////////////////////////
        }

    } catch (err) {
        console.log(err);

    }
}
/////////////////////////////////////////////
function onDisconnected() {

   // console.log(browser.runtime.lastError);
    console.log('disconnected from HIO.');
    port=null;
     


}

browser.tabs.query({}, function (tabs) {
    console.log("Initial tab count: " + tabs.length);
    num_tabs = tabs.length;
});
browser.tabs.onCreated.addListener(function (tabId, changeInfo, tab) {

    num_tabs++;
    console.log("Tab created event caught. Open tabs #: " + num_tabs);
});
browser.tabs.onRemoved.addListener(function (tabId, changeInfo, tab) {

    num_tabs--;
    for (var i = 0; i < frameIDss.length; i++) {
        if (frameIDss[i]["tabID"] == tabId) {
            frameIDss.splice(i, 1);
            i--;
        }
    }
    console.log("Tab removed event caught. Open tabs #: " + num_tabs);
    if (num_tabs == 0) {
        message = { "CMD": 'exit', "username": '' };
        sendNativeMessage(message, tabId);
    }
});

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function connect(tab) {
    // Connect the App Service in Native App, 
    if (port != null) {
      
        return;
    }
    port = browser.runtime.connectNative(host_name);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);

  
  //  portDict[id] = port;
}
// Send message to native app
function sendNativeMessage(message, tab) {
    var id = tab.id;
    try {
        console.log(message);
        port.postMessage(message);
    }
    catch (e) {
        throw e;
    }
}