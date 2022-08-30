console.log('ok')

function doGet(e){
    //получить код авторизации из возвращенного URL
    var authCode = JSON.stringify(e.parameter.code)

    //удаленные кавычки вокруг кода
    var authCodeClean = authCode.replace(/['"]+/g, '')

    //запустить функцию для добавления в электронную таблицу
    // // saveIntoSheet(authCodeClean, 1)


    //запустить функцию, чтобы получить токен из AuthCode
    var accessToken = getToken(authCodeClean)


    //проверить статус токена доступа и отобразить соответствующее сообщение на веб-странице
    if(accessToken){

        //вернуть сообщение на веб-страницу, чтобы проинформировать пользователя
        return HtmlService.createHtmlOutput('Success! You can close this tab.')

    } else {
        //there was a problem gettin Authentication Code

        //вернуть сообщение на веб-страницу, чтобы проинформировать пользователя
        return HtmlService.createHtmlOutput('Failed. You can close this tab')
    }
}

//используйте код авторизации для получения токена
function getToken(authCodeClean) {
    
    //установить аутентификацию и получить OAuthKeys

    var clientID = 'N7fM9KQ0TRGiBbukGmfx3Q' //ENTER YOUR APP ID HERE
    var clientSecret = 'ofi3wvw8FBSp2UTefcffiUPHJpUd5X6l'  //ENTER YOUR APP SECRET HERE
    var encodedKeys = Utilities.base64Encode(clientID + ":" + clientSecret)

    //Установите заголовки HTTP
    var options = {
        'method':"post",
        'headers':{"Authorization": "Basic" + encodedKeys}
    }

    //URL-адрес веб-приложения, связанный с приложением Zoom OAuth
    var returnUrl = "https://bespoke-flan-8db314.netlify.app"

    //сделать вызов Zoom OAuth
    // var response = UrlFetchApp.fetch("https://zoom.us/oauth/authorize?response_type=code&code" + authCodeClean + "&redirect_uri=" + returnUrl, options)
    var response = UrlFetchApp.fetch("https://zoom.us/oauth/token?grant_type=authorization_code&code=" + authCodeClean + "&redirect_uri=" + returnUrl, options)

    //запустить функцию, чтобы добавить токен доступа в электронную таблицу
    // var resultText = response.getContentText()
    // var resultObj = JSON.parse(resultText)
    // var accessToken = resultObj['access_token']
    // saveIntoSheet(accessToken, 2)

    //вернуть значение токена доступа в родительскую функцию
    return accessToken;
}