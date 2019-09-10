const Sequelize = require('sequelize');
const DB_CONN = process.env.ORM_DB_CONN_STR ? process.env.ORM_DB_CONN_STR  : 'mysql://root:123456@127.0.0.1:3306/hello_orm';
const sequelize = new Sequelize(DB_CONN);
const Op = Sequelize.Op;

//https://sequelize.org/master/manual/getting-started.html
class Person extends Sequelize.Model {}
Person.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    birthday: Sequelize.DATE
}, { sequelize, modelName: 'person' });

let cloudFunctions = {
    test: (req, res) => {
        return sequelize
            .authenticate()
            .then(() => {
                return ('Connection has been established successfully.');
            })
    },

    list: (req, res) => {
        return sequelize.sync()
            .then(() => {return Person.findAll()}).then(persons=>{
                return persons.map((p)=>{
                    return p.toJSON()
                })
            })
    },

    update: (req, res) => {
        let params = req.params;

        return sequelize.sync()
            .then(() => Person.update({
                birthday: params.birthday ? params.birthday : new Date()
            }, {
                where: {
                    birthday: {
                        [Op.ne]: null
                    }
                }
            }))
            .then(() => {
                return "Done";
            });
    },

    save: (req, res) => {
        let params = req.params;

        return sequelize.sync()
            .then(() => Person.create({
                firstName: params.firstName ? params.firstName : 'firstName',
                lastName: params.lastName ? params.lastName : 'lastName',
                birthday: new Date(1989, 5, 3)
            }))
            .then(p => {
                return p.toJSON()
            });


    },

    destroy: (req, res) => {
        let params = req.params;
        return sequelize.sync()
            .then(() => {
                return Person.destroy({truncate: true})
            }).then(() => {
               return "Done";
            })
    }

}
/*
    // Find all users
    User.findAll().then(users => {
      console.log("All users:", JSON.stringify(users, null, 4));
    });

    // Create a new user
    User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
      console.log("Jane's auto-generated ID:", jane.id);
    });

    // Delete everyone named "Jane"
    User.destroy({
      where: {
        firstName: "Jane"
      }
    }).then(() => {
      console.log("Done");
    });

    // Change everyone without a last name to "Doe"
    User.update({ lastName: "Doe" }, {
      where: {
        lastName: null
      }
    }).then(() => {
      console.log("Done");
    });
 */

module.exports = {
    cloudFunctions: cloudFunctions
}
