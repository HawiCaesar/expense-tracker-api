const ExpenseCategory = require('../models').expenseCategory;
const Expense = require('../models').expense;

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
        .findAll({
            include: [{
                model: Expense,
                as: 'expenses'
            }]
        })
        .then(categories => response.status(200).send(categories))
        .catch(error => response.status(400).send(error));
    },
    retrieve(request, response) {
        return ExpenseCategory.findByPk(request.params.expenseCategoryId, {
            include: [{
                model: Expense,
                as: 'expenses',
            }]
        }).then(category => {
            if(!category) {
                return response.status(404).send({
                    message: 'Expense category not found'
                })
            }
            return response.status(200).send(category);
        })
        .catch(error => response.status(400).send(error))
    }
}