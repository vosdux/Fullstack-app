export const getFunc = (model) => async (req, res) => {
    try {
        const totalElements = await model.find().count();
        const items = await model.find().skip((req.query.size * req.query.page)).limit(+req.query.size).exec();
        res.json({ content: items, totalElements })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Что-то пошло не так ' });
    }
};

export const getItemFunc = (model) => async (req, res) => {
    try {
        let item = await People.findByIdAndRemove(req.params.id);
        res.json({ ...item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Что-то пошло не так' });
    }
};

export const postFunc = (model, dataCallback) => async (req, res) => {
    try {
        let data = req.body;
        if (dataCallback) {
            data = dataCallback(req.body);
        }
        const newItem = await model.create(data);
        res.json({ squad });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Что-то пошло не так ' });
    }
};

export const putFunc = (model) => async (req, res) => {
    try {
        const item = await Squad.findByIdAndUpdate(req.params.squadId, { $set: { name: req.body.name } });
        res.json({ ...item });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так ' });
    }
};

export const deleteFunc = (model) => async (req, res) => {
    try {
        await model.findByIdAndRemove(req.params.id);
        res.json({ message: 'Удалено' });
    } catch (error) {
        res.status(500).json({ message: 'Что-то пошло не так ' });
    }
};