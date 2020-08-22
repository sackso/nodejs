//console.log('hello nodejs');

var fs =  require('fs');
var path  =require('path');
var iconv = require('iconv-lite');
var dirTree = require('directory-tree');


var pDir = '/media/sackso/1T_400G/LV1_work/30.jwfreenote/jwfreenote/BookData';

fnFindDirList(pDir);

//directory 의 파일을 전부 읽어오기
function fnFindDirList(dirName){
    fs.readdir(dirName, function(err, filelist){  // 배열 형태로 출력
        //console.log(filelist);
        filelist.forEach(element => {
            var fObj = fs.lstatSync(dirName + '/'+element);
            //dir
            if(fObj.isDirectory()){
                console.log(dirName + '/'+element + ' is directory');
                fnFindDirList(dirName + '/'+element);
            }else{//
                if(element.indexOf('htm') > -1){
                    console.log(dirName + '/'+element + ' is file');
                    fnHtm2Md(dirName,element);
                }
            }
        });
    });
}

//파일을 읽어 데이터로 출력, 태그 제거
function fnHtm2Md(currDir, srcFileName){
    var strFileData = '';
    var strNewFileName = srcFileName.replace(/\.htm/,'\.md');
    strFile = fs.readFileSync(currDir +'/' +srcFileName);

    //encoding
    var utf8Str = iconv.decode(strFile,'euc-kr');

    //파일 태그 제거
    strFileData = utf8Str.replace(/(<([^>]+)>)/gi, "");
    strFileData = strFileData.replace(/&nbsp;/gi,' ');
    
    //console.log(strFileData);

    //읽은 데이터를 파일로 저장
    fs.writeFileSync(currDir + '/'+strNewFileName,strFileData,'utf-8');

    

}