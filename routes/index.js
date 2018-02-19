
const router = require('express').Router();
const db = require('../db');
const { Employee } = db.models;

// ******git git The below is just copied and pasted
// router.use((req, res, next) => {
//     Employee.findAll()
//         .then(employees => {
//             const managerCount = employees.reduce((sum, employee) => {
//                 if (employee.job === 'manager') { return sum + employee; }
//             }, 0);
//             res.locals.employeeCount = employees.length;
//             res.locals.managerCount = managerCount;
//             res.locals.path = req.url;
//             next();
//         })
//         .catch(next);
// });

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Home' })
});

router.get('/employees', (req, res, next) => {
    Promise.all([
        Employee.findAll({
            include: [Job]
        }),
        Job.findAll({})
    ])
        .then(([employees, jobs]) => res.render('employees', { employees, jobs }))
        .catch(next);
});

router.post('/employees', (req, res, next) => {
    Employee.createFromForm(req.body)
        .then(() => res.redirect('/employees'))
        .catch(next);
});

router.put('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => {
            Object.assign(employee, req.body);
            return employee.save();
        })
        .then (() => {
            res.redirect('/employees')
        })
        .catch(next);
});

router.delete('/employees/:id', (req, res, next) => {
    Employee.findById(req.params.id)
        .then(employee => {return employee.destroy()})
        .then(() => res.redirect('/employees'))
        .catch(next);
});

module.exports = router;