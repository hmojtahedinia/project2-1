module.exports = function(app) {
  
  //Routes for Handlebars (HOLLY)
  app.get('/', (req, res) => {
      res.render('index', { 
        title: 'Time to Go Toronto',
        rating: 10
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

  app.get('/home/:filter', (req, res) => {

		const ratingFilter = req.params.filter;

		res.render('index', { 
			title: 'Time to Go Toronto',
			rating: ratingFilter
		});
  });
  
  app.use((req, res) => {
    res.status(404).render('404', {
      title: 'Page Not Found'
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
};
