const expenseCategoriesController = require('../controllers').expenseCategories;

module.exports = app => {
    app.get('/api', (request, response) => response.status(200).send({
        message: "Expense Tracker API"
    }));

    app.post('/api/expense-categories', expenseCategoriesController.create);
    app.get('/api/expense-categories', expenseCategoriesController.list);
}