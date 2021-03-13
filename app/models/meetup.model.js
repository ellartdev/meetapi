module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            address: String,
            contactEmail: String,
            description: String,
            imageUrl: String,
            isFavorite: Boolean,
            subtitle: String,
            title: String
        }, { timestamps: true }
    );

    schema.method("toJSON", function() {
        // so the simple "() =>" doesn't work as it doesn't have "this" binding...
        // hmm okay then.
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Meetup = mongoose.model("meetup", schema);
    return Meetup;
};
