const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const mediaRoutes = require('./routes/medialib_routes')

const PORT = 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(mediaRoutes)


async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://sashulya:brechko@cluster0.d2fid.mongodb.net/medialib',
      {
        useNewUrlParser: true,
        useFindAndModify: false
      }
    )

    app.listen(PORT, () => {
      console.log('Server has been started...')
    })
  } catch (e) {
    console.log(e)
  }
}

start()
