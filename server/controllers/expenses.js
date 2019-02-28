const Expense = require('../models').expense;

module.exports = {
    create(request, response) {
        return Expense.create({
            name: request.body.name,
            amount: +request.body.amount,
            expenseCategoryId: request.params.expenseCategoryId
        })
        .then(expense => response.status(200).send(expense))
        .catch(error => response.status(400).send(error))
    },
    // list(request, response) {
    //     return Expense
    //     .all()
    //     .then(expenses => response.status(200).send(expenses))
    //     .catch(error => response.status(400).send(error));
    // },
}