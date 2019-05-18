module.exports = (app) => {
  // Routes for Handlebars (HOLLY)
  app.get('/', (req, res) => {
    let ratingFilter = req.query.filter;

    if (!ratingFilter) {
      ratingFilter = 'all';
    }

    res.render('index', {
      title: 'Time to Go Toronto',
      rating: ratingFilter,
    });
  });

  app.get('/about', (req, res) => {
    res.render('about', {
      title: 'How it works',
    });
  });

  app.get('/add', (req, res) => {
    res.render('add', {
      title: 'Rate a Washroom',
    });
  });

  app.use((req, res) => {
    res.status(404).render('404', {
      title: 'Page Not Found',
    });
  });

  // For later intigration of Login Pages
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
