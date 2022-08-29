console.log('ok')

function doGet(e){
    //get authorisation code from returned URL
    var authCode = JSON.stringify(e.parameter.code)

    //remote quotes around the code
    var authCodeClean = authCode.replace(/["']+/g, '')

    //run function to add to Spreadsheet
    saveIntoSheet(authCodeClean, 1)


    //run Function to get Token from AuthCode
    var accessToken = getToken(authCodeClean)


    //check status of Access Token and display relevant message on webpage
    if(accessToken){

        //return message to webpage to inform user
        return HtmlService.createHtmlOutput('Success! You can close this tab.')

    } else {
        //there was a problem gettin Authentication Code

        //return message to webpage to inform user
        return HtmlService.createHtmlOutput('Failded. You can close this tab')
    }
}

//use Authorisation Code to get a Token
function getToken(authCodeClean) {
    
    //set authentication and get OAuthKeys

    var clientID = 'N7fM9KQ0TRGiBbukGmfx3Q' //ENTER YOUR APP ID HERE
    var clientSecret = 'ofi3wvw8FBSp2UTefcffiUPHJpUd5X6l'  //ENTER YOUR APP SECRET HERE
    var encodedKeys = Utikities.base64Encode(clientID + ":" + clientSecret)

    //Set the HTTP headers
    var options = {
        'method':"post",
        'headers':{"Authorization": "Basic" + encodedKeys}
    }


    //Web App URL Linked to Zoom OAuth App
    var returnUrl = "https://bespoke-flan-8db314.netlify.app"

    //make Zoom OAuth call
    var response = UrlFetchApp.fetch("https://zoom.us/oauth/authorize?response_type=code&code" + authCodeClean + "&redirect_uri=" + returnUrl, options)

    //run Function to add Access Token to Spreadsheet
    var resultText = response.getContentText()
    var resultObj = JSON.parse(resultText)
    var accessToken = resultObj['access_token']
    saveIntoSheet(accessToken, 2)

    //return the Access Token value to the Parent Function
    return accessToken;
}