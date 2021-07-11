const Course = require('../Models/Course')

class SiteController {

    // GET /home
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                courses = courses.map(courses => courses.toObject())
                res.render('home', {courses})   
            })
            .catch(next)    
    }

    // GET /search 
    search(req,res) {
        res.render('search');
    }

}

    
module.exports = new SiteController;

