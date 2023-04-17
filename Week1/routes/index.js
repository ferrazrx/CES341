const controller = require('../controllers');

const setRoutes = (req, res) => {
    switch (req.url) {
        case '/':
            controller.printName(res)
            break;
        default:
            controller.error404(res)
            break;
    }
}


module.exports = { setRoutes };