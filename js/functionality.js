var link = document.getElementById("link");
var options = document.getElementById("options");
var exec = require('child_process').exec, child;
var txt = document.getElementById('txt');
var interval  = document.getElementById('interval');
var listOfOptions = ['Video','Mp3','Lista Rep','Rep en vlc'];


function lookFor(){
    let result = document.getElementById("result");
    const fs = require('fs');
    child = exec('youtube-dl -F '+link.value,
        function (error, stdout, stderr) {
            console.log(stdout);
            listOfFormats(stdout,result);            
            fs.writeFile("./ytdl.txt",stdout, function (err) {
                if (err) {
                    return console.log(err);
                }               
                console.log("The file was saved!");
            });
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });  

}
 function listOfFormats(formatsList,div){
     let arrayFormats = formatsList.split("\n")
     console.log(arrayFormats[1]);
     strHTML = "";
     var i =0;
     for (indice in arrayFormats){
         strHTML =strHTML+ '<input type="radio" name="gender" value="male">'+arrayFormats[indice]+'<br>'
         
     }
     div.innerHTML = strHTML;

 }
function changeOption(){
    if(options.value == '1' || options.value == '2' || options == '5' ){
        txt.hidden = true;
        interval.hidden = true;
    }
    else if (options.value == '3'){
        interval.hidden = false;
        txt.hidden = true;
    }
    else if (options.value == '4'){
        txt.hidden = false;
        interval.hidden = true;
    }
}

function download(){
    setImage('working.gif');
    if(options.value == '1'){
        downloadVideo();
    }
    else if(options.value == '2'){
        downloadMp3();
    }
    else if(options.value == '3'){
        downloadPlayList();
    }
    else if(options.value == '4'){
        downloadTxtList();
    }
    else if(options.value == '5'){
        playInVlc();
    }
    else{
        result.innerHTML = "No se pudo descargar el archivo";
    }
}
function moveElementsToDownloads(){
    child = exec('mv *.m* /home/daniel/Descargas/ytdlGUI',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });    
}
function setImage(img){
    var actual = document.getElementById('img');
    actual.src = 'images/'+img;
}
function downloadDirectory() {
    child = exec('dolphin /home/daniel/Descargas/ytdlGUI',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

}
function downloadMp3(){
    child = exec('youtube-dl --extract-audio --audio-format mp3 ' + link.value,
        function (error, stdout, stderr) {
            moveElementsToDownloads()
            result.innerHTML = "Archivo descargado en MP3";
            setImage('pr.gif')
            if (error !== null) {
                alert('exec error: ' + error);
            }
        });
}
function downloadVideo(){
    child = exec('youtube-dl --recode-video mp4 ' + link.value,
        function (error, stdout, stderr) {
            moveElementsToDownloads()
            result.innerHTML = "Archivo descargado en Video";
            if (error !== null) {
                alert('exec error: ' + error);
            }
        });
}
function downloadPlayList(){
    child = exec('youtube-dl --recode-video mp4 ' + link.value,
        function (error, stdout, stderr) {
            moveElementsToDownloads()
            result.innerHTML = "Archivo descargado en Video";
            if (error !== null) {
                alert('exec error: ' + error);
            }
        });
}
function downloadTxtList(){
    alert('entra')
    console.log(document.getElementById('file').files[0])
    
    /*child = exec('youtube-dl --recode-video mp4 ' + link.value,
        function (error, stdout, stderr) {
            moveElementsToDownloads()
            result.innerHTML = "Archivo descargado en Video";
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });*/
}
function playInVlc(){
    child = exec('vlc $(youtube-dl -g -f 22 ' + link.value + ')',
        function (error, stdout, stderr) {
            moveElementsToDownloads()
            result.innerHTML = "Reproduciendo en vlc";
            if (error !== null) {
                alert('exec error: ' + error);
            }
        });
}
