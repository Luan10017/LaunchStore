const Category = require('../model/Category')
const Procuct = require('../model/Product')

module.exports = {
    create(req, res) {
        Category.all()
        .then(function(results) {

            const categories = results.rows;
            return res.render("products/create.njk", { categories })
        }).catch(function(err) {
            throw new Error(err)
        })
    },
    async post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        let results = await Procuct.create(req.body)
        const productId = results.row[0].id

        results = await Category.all()
        const categories = results.rows

        return res.render("products/create.njk", {productId, categories})
    }
}