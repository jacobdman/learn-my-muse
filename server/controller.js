module.exports = {
    searchTeachers: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.search_teachers([req.query.instrument])
            .then( teachers => {
                res.status(200).send(teachers)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },
    searchWithNewParams: (req, res, next) => {
        const dbInstance = req.app.get('db')
        if (req.query.inHome === 'true' && req.query.studio === 'true') {
            // All
            dbInstance.search_teachers([req.query.instrument])
            .then( teachers => {
                res.status(200).send(teachers)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
        } else if (req.query.inHome === 'true' && req.query.studio === 'false') {
            // In Home
            dbInstance.search_inhome_teachers([req.query.instrument])
            .then( teachers => {
                res.status(200).send(teachers)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
        } else {
            dbInstance.search_studio_teachers([req.query.instrument])
            // Studio
            .then( teachers => {
                res.status(200).send(teachers)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
        }
    },
    getTeacher: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_teacher([req.params.id])
            .then( teacher => {
                res.status(200).send(teacher)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },
    getReviews: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_reviews()
            .then( reviews => {
                res.status(200).send(reviews)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },
    getReviewsSpecific: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.get_reviews_specific(req.params.id)
            .then( reviews => {
                res.status(200).send(reviews)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },
    postTeacherCoordinates: (req, res, next) => {
        const dbInstance = req.app.get('db')
        dbInstance.post_teacher_coordinates([req.params.id, req.body.data.string])
            .then( teacher => {
                res.status(200).send(teacher)
            })
            .catch( err => {
                res.status(500).send(err)
                console.log(err)
            })
    },
}
