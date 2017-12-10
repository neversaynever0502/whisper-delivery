import models from '../models';

async function readLeter(req,res,next){
  const letter = models.Letter.find({},{toName:1,fromName:1,title:1});
  const letterResponse = await letter;
  res.json(letterResponse)
}

async function checkPassport(req,res,next){
  const {_id,passport}=req.body;
  const theLetter = await models.Letter.findOne({
    _id: _id,
    }).exec();
  if(theLetter.passport==passport){
    res.json({message:theLetter.message})
  }else{
    res.json({message:'密碼錯誤'})
  }
}

async function writeLeter(req,res,next){
  console.log('@@@,',req.body)
  const {title,message,fromName,toName}=req.body;
  console.log('!!!!',title,message,fromName,toName)
  try{
  const newLetter = new models.Letter({
    fromName,
    toName,
    title,
    message,
    read:0,
    });
  const newLetterSave = await newLetter.save();
  console.log('newLetterSave',newLetterSave.passport)
  console.log('finish post')
  res.json({'passport':newLetterSave.passport})
  }catch(e){
    console.log(e)
  }
}

export {readLeter,writeLeter,checkPassport}
