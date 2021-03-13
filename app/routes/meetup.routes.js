module.exports = app => {
    const meetups = require('../controllers/meetup.controller');
    let router = require('express').Router();

    // Create a new Meetup
    router.post('/', meetups.create);
    
    // Find all Meetups
    router.get('/', meetups.findAll);

    // Find Meetup with ID
    router.get('/:id', meetups.findOne);

    // Update Meetup with ID
    router.patch('/:id', meetups.update);

    // Update Meetup's favorite toggle
    router.patch('/:id/favToggle', meetups.toggleFavorite);

    // Delete Meetup with ID
    router.delete('/:id', meetups.deleteOne); 

    // Delete all Meetups (yeeeeaahh no! only if it's really needed)
    //router.delete('/', meetups.deleteAll);

    app.use('/api/meetups', router);
}