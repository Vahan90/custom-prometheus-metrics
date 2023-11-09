module.exports = async (req, res) => {
    console.log(`Method: ${req.method}`)
    res.send({"message": "Hello"});
};
