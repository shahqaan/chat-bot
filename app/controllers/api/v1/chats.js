/**
 * Created by shahqaan on 28/12/2016.
 */


module.exports = (router) => {

  router.post('/', (req, res) => {

    if (!req.body.message) {
      return res.status(400).json({err: 'message required'});
    }

    res.json({message: req.body.message});


  });

};
