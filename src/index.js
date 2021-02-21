const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser') 
const passport = require('passport')
const cookieSession = require('cookie-session')

require('./Passport-setup')

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


//SALVA OS DADOS NO COOKIE DO NAVEGADOR
app.use(cookieSession({
  name: 'exemplo-session',
  keys: ['key1', 'key2']
}))

const islogin = (req,res,next) => {
  if(req.user){
    next()
  }else{
    res.sendStatus(401)
  }
}

app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
  res.send('inicio voce não esta logado')
})
 
app.get('/sucesso', islogin, function (req, res) {console.log(req),res.send(`bem vindo ${req.user._json.email}`)})
app.get('/falha', function (req, res) {res.send('falaha no login')})


app.post('/google', passport.authenticate('google',{scope:['profile','email']}))
app.get('/google/callback', passport.authenticate('google',{failureRedirect: '/falha'}),
function(req,res) {
  res.redirect('/sucesso')
}

)

app.get('/logout', (req,res)=>{
  req.session=null; 
  req.logOut(); 
  res.redirect('/')
})

app.listen(3000, ()=> console.log('run on server'))
