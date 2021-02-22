const passport = require('passport')

//o passport trabalha com +500 estrategias aqui especifica-se 
//qual estrategia vai usar
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//uma vez autenticado o passport vai salvar um cookie no front-end
//+e uma sessão no back-and q pd ser em algum bd ou na memoria do servidor
//este exemplo estamos salvando no navegador do usuario sem pedir permisão 
//salvar dados do usuarios nos cookies do navegador pode implicar em problemas de segurança
//em aplicação profissional peça sempre a autorização ou salve esses dados em algum LocalStoragy

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  //aki o passport tem q deserializar ler o cookie e transformar em bytes novamente
  //igual veio na request nesta etapa pode haver erro então é bom trate com try/catch
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

//aqui instancia o construtor de estrategia google-oauth20
//indentificando qual api ele ira usar para fazer a autenticação
//a chave, o segredo e a url de callback são fornecidas na api do google
//em estrategias locais vc especifica quais são os campos que vai vir do login
//que ele usa para fazer a autenticação e dps a autenticação em si
passport.use(new GoogleStrategy({
  //chave
    clientID: "198105665708-0qukg43q0r1iifd093clpmlt9abcnrs5.apps.googleusercontent.com",
  //segredo
    clientSecret: "_7V6XlNTF24BuCdAB3O-QZF8",
  //callback
    callbackURL: "http://localhost:3000/google/callback" //pois vai rodar em localhost
  },
  
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));