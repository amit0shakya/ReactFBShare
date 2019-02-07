module.exports=function(data){

    const fs = require('fs');
    const uniqueID = getuniqueid();
    var path = './serverdata/'+uniqueID;

    var promiseResolve;
    var promiseRejection;

    var _promise = new Promise(function(resolve,rejection){
        promiseResolve=resolve;
        promiseRejection=rejection ;
    })

    //Make Directory
    fs.mkdir(path, { recursive: true }, (err) => {
        if(err){
            console.log(err,"<<<promise Error 1")
            promiseRejection({msg:err});
        }
      });


    //Writing poster
    var poster = data.imgdata.replace(/^data:image\/[a-z]+;base64,/, "");    
    
        writeImg(poster,(path+"/poster.jpg"));

    function writeImg(_data,_imgName){
        var buf = new Buffer(_data,'base64')
        fs.writeFile(_imgName,buf,(err)=>{
            if(err){
                console.log(err,"promise error 2")
                promiseRejection({msg:err});           
            }else{
                promiseResolve({msg:'success',id:uniqueID});
            }
        });
    }

    function getuniqueid(){
        var Str1=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0']
        var uniqueID = ''

        for(var i=0;i<15;i++){
            var randNo = Math.round(Math.random()*(Str1.length-1));
            uniqueID +=Str1[randNo];
        }

        var date = new Date();
        var time = "-"+date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"-"+date.getHours()+"-"+date.getSeconds()+"-"+date.getMilliseconds();
            uniqueID+=time;
        
        return uniqueID
    }
    return _promise
}