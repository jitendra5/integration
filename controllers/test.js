// newTea function for post tea route
const mockTest = (req, res, next) => {
    res.json({message: "Test Integration"}); // dummy function for now
};

module.exports = {mockTest};
