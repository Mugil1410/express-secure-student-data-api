const Student = require('../Models/Student');

const addStudent = async (req, res) => {
    const { name, email } = req.body;
    if (!req.session.user) {
        res.status(401).send('Unauthorized access.');
        return;
    }
    const userId = req.session.user.id;
    if (!name || !email) {
        res.send('Invalid request body');
        return;
    }

    try {
        const student = await Student.findOne({ name });
        if (student) {
            res.send('Student already exists');
        } else {
            const newStudent = new Student({ userId, name, email });
            await newStudent.save();
            res.send(newStudent);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const getStudent = async (req, res) => {
    if (!req.session.user) {
        res.status(401).send('Unauthorized access.');
        return;
    }
    const userId = req.session.user.id;

    try {
        if (req.params.id) {
            const student = await Student.findById(req.params.id);
            if (!student) {
                res.send('Student not found');
            } else if (student.userId === userId) {
                res.send(student);
            } else {
                res.send('Unauthorized Access');
            }
        } else {
            const students = await Student.find({ userId });
            res.send(students);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const updateStudent = async (req, res) => {
    const { _id, name, email } = req.body;
    if (!req.session.user) {
        res.status(401).send('Unauthorized access.');
        return;
    }
    const userId = req.session.user.id;
    if (!name || !email || !_id) {
        res.send('Invalid request body');
        return;
    }

    try {
        const existingStudent = await Student.findById(_id);
        if (!existingStudent) {
            res.status(404).send('Student not found');
            return;
        }
        if (existingStudent.userId !== userId) {
            res.status(403).send('Unauthorized access.'); // User ID doesn't match
            return;
        }
        existingStudent.name = name;
        existingStudent.email = email;
        await existingStudent.save();

        res.json({ "message": 'Update operation successful', "Updated data": existingStudent });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const deleteStudent = async (req, res) => {
    const { _id } = req.body;
    if (!req.session.user) {
        res.status(401).send('Unauthorized access.');
        return;
    }
    const userId = req.session.user.id;
    if (!_id) {
        res.send('Invalid request body');
        return;
    }

    try {
        const existingStudent = await Student.findById(_id);
        if (!existingStudent) {
            res.status(404).send('Student not found');
            return;
        }
        if (existingStudent.userId !== userId) {
            res.status(403).send('Unauthorized access.'); // User ID doesn't match
            return;
        }
        await Student.findByIdAndDelete(_id);
        res.send(`Student has been deleted successfully`);
    } catch (err) {
        res.status(500).send(err.message); // Handle other errors
    }
};

module.exports = { addStudent, getStudent, updateStudent, deleteStudent };