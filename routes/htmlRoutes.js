module.exports = function(app) {
  
  //Routes for Hanlebars (HOLLY)
  app.get('/', (req, res) => {
      res.render('index', { 
        title: 'Time to Go Toronto' 
      });
  });
  
  app.get('/about', (req, res) => {
    res.render('about', {
      title: 'How it works'
    });
  });
  
  app.get('/add', (req, res) => {
    res.render('add',{
      title: 'Rate a Washroom'
    });
  });
  
  //For later intigration of Login Pages
  // app.get('/newuser', (req, res) => {
  //   res.render('newuser');
  // });
  
  // app.get('/login', (req, res) => {
  //   res.render('login');
  // });
  
  // app.get('/rate', (req, res) => {
  //   res.render('rate');
  // });
  
  // app.get('/404', (req, res) => {
  //   res.render('404');
  // });
};
