const conn = require('./conn');

const Employee = require('./Employee');
const Job = require('./Job');

const { Sequelize } = conn;

Employee.belongsTo(Job);
Job.hasMany(Employee);

const sync = () => {
    return conn.sync({ force: true })
}

const seed = () => {
    return Promise.all([
        Job.create({ name: 'Analyst' }),
        Job.create({ name: 'Associate' }),
        Job.create({ name: 'Manager' }),
        Employee.create({ email: 'dog@gmail.com' }),
        Employee.create({ email: 'cat@gmail.com' }),
        Employee.create({ email: 'GeorgeSoros@gmail.com' })
    ])
        .then(([analyst, associate, vp, dog, cat, george]) => {
            return Promise.all([
                dog.setJob(analyst),
                cat.setJob(associate),
                george.setJob(manager)
            ])
        })
};

module.exports = {
    sync,
    seed,
    models: {
        Employee,
        Job
    }
}