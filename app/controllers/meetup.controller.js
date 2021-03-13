const db = require('../models');
const {validateMeetup} = require('../utils');
const Meetup = db.meetups;

// Create and save a Meetup to the database
exports.create = async (req, res) => {
    await validateMeetup(req, data => {
        if (data.statusCode !== 200) return res.status(data.statusCode).send(data.statusData);

        const meetup = new Meetup({
            address: req.body.address,
            contactEmail: req.body.contactEmail,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isFavorite: req.body.isFavorite,
            subtitle: req.body.subtitle,
            title: req.body.title
        });
    
        meetup.save(meetup).then(data => res.send(data)).catch(e => {
            res.status(500).send({
                error: "internal-server-error",
                message: e.message || "Some error occured while creating the Meetup."
            });
        });
    });
};

// Update a Meetup with ID
exports.update = async (req, res) => {
    if (!req.body) return res.status(400).send({
        error: 'empty',
        message: 'Data to update cannot be empty.'
    });
    await validateMeetup(req, data => {
        if (data.statusCode !== 200) return res.status(data.statusCode).send(data.statusData);

        Meetup.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false})
        .then(data => {
            !data ?
            res.status(404).send({
                error: 'not-found',
                message: `Meetup was not found.`,
                id: req.params.id
            }) :
            res.status(200).send({
                message: `Meetup was updated successfully.`,
                id: req.params.id
            });
        }).catch(e => res.status(500).send({
            error: 'internal-server-error',
            message: `An error occured while updating Meetup` || e.message,
            id: req.params.id
        }));
    });
}

// Toggle favorite boolean on a Meetup
exports.toggleFavorite = (req, res) => {
    Meetup.findByIdAndUpdate(req.params.id, {isFavorite: req.body.isFavorite}, {useFindAndModify: false})
    .then(data => {
        !data ?
        res.status(404).send({
            error: 'not-found',
            message: `Meetup was not found.`,
            id: req.params.id
        }) :
        res.status(200).send({
            message: `Meetup was updated successfully.`,
            id: req.params.id
        });
    }).catch(e => res.status(500).send({
        error: 'internal-server-error',
        message: `An error occured while updating Meetup` || e.message,
        id: req.params.id
    }));
};

// Get all Meetups from the database
exports.findAll = (req, res) => {
    const title = req.body.title;
    let condition = title ? { title: { $regex: new RegExp(title), $options: 'i' } } : {};

    Meetup.find(condition).then(data => res.send(data)).catch(e => {
        res.status(500).send({
            error: "internal-server-error",
            message: e.message || "Some error occured while finding all Meetups."
        });
    });
};

// Get a Meetup with ID
exports.findOne = (req, res) => {
    const id = req.body.id;

    Meetup.findById(id).then(data => {
        data ? res.status(200).send(data) : res.status(404).send({
            error: "not-found",
            message: `Cannot find Meetup, not found`,
            id: req.params.id
        });
    }).catch(e => {
        res.status(500).send({error: "internal-server-error", message: e.message || "Some error occured while finding Meetup with specific ID."});
    });
};

// Delete a Meetup with ID
exports.deleteOne = (req, res) => {
    Meetup.findByIdAndRemove(req.params.id, {useFindAndModify: false})
    .then(data => {
        if (!data) return res.status(404).send({
            error: 'not-found',
            message: `Cannot delete Meetup, not found`,
            id: req.params.id
        });
        res.status(200).send({
            message: 'Meetup deleted successfully',
            id: req.params.id
        });
    }).catch(e => {
        return res.status(500).send({
            error: 'internal-server-error',
            message: e.message || 'An error occured while deleting Meetup.'
        })
    })
}

// Delete all Meetups (would be advised to not include in REST API at all)
exports.deleteAll = (req, res) => {
    Meetup.deleteMany({}).then(data => res.status(200).send({message: `${data.deletedCount} Meetups deleted successfully.`}))
    .catch(e => {
        res.status(500).send({error: "internal-server-error", message: e.message || "Some error occured while trying to delete all Meetups."});
    });
};
