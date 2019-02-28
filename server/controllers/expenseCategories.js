const ExpenseCategory = require('../models').expenseCategory;

module.exports = {
    create(request, response) {
        return ExpenseCategory.create({
            name: request.body.name,
            description: request.body.description
        })
        .then(category => response.status(200).send(category))
        .catch(error => response.status(400).send(error))
    },
    list(request, response) {
        return ExpenseCategory
        .all()
        .then(categories => response.status(200).send(categories))
        .catch(error => response.status(400).send(error));
    }
}