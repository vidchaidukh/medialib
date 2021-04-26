const { Router } = require('express')
const router = Router()
const Audio = require('../models/Audio')
const multer = require('multer')
const upload = multer();
const fs = require('fs');
resolve = require('path').resolve

router.get('/', async (req, res) => {
  const audios = await Audio.find({})
  res.render('index', {
    title: 'Media Library',
    isIndex: true,
    audios
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Add media',
    isCreate: true
  })
})

router.post('/change', async (req, res) => {
  const audio = await Audio.findById(req.body.idd)
  console.log(req.body)
  console.log(audio)
  res.render('change', {
    title: 'Add media',
    audio
  })
})

router.post("/upload", upload.single('filedata'), async (req, res, next) => {

    let filedata = req.file;
    console.log(filedata);

    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else{

      try{
        let uploadLocation = './public/uploads/' + req.file.originalname
        fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
        const audio = new Audio({
          title: req.body.title,
          artist: req.body.artist,
          size: filedata.size,
          filename: filedata.originalname,
          mimetype: filedata.mimetype
        })
        await audio.save()
        res.redirect('/');
      }catch (e){
        console.log(e)
        res.send("Ошибка при загрузке файла");
      }
      }
    })

router.post('/action', async(req, res) => {
  const audio = await Audio.findById(req.body.id)
  console.log(audio)
  if (req.body.but === 'dwn'){
    audio.downloads += 1
    fs.appendFileSync('./log.txt', JSON.stringify(audio));
    fs.appendFileSync('./log.txt', '\n');
    await audio.save()
    res.redirect('/uploads/' + audio.filename)
  }else if(req.body.but === 'like'){
    audio.likes += 1
    await audio.save()
    res.redirect('/')
  }else{
    res.redirect('/')
  }
  

})

router.post('/apply', async(req, res) => {
    console.log(req.body)

  const audio = await Audio.findById(req.body.id)
  if (req.body.but === 'apply'){
    audio.title= req.body.title
    audio.artist= req.body.artist
    audio.downloads= req.body.downloads
    audio.likes= req.body.likes
    fs.writeFileSync('/log.txt', audio);
    await audio.save()
    res.redirect('/')
  }else if(req.body.but === 'delete'){
    await audio.delete()
    res.redirect('/')
  }else{
    res.redirect('/')
  }
  

})

module.exports = router
