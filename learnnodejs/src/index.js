const path = require('path')
const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars')
const   app = express()
const port = 3000

const route = require('./routes')
const db = require('./config/db')



//connect to db
db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(morgan('combined'))

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'))

route(app)


app.listen(port, () => {
  console.log(`App listening at http://localhost:$
  {port}`)
})