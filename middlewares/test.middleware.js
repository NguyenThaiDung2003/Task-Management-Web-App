function test_middleware(req, res, next) {
    console.log("đã vào test_middleware")


    res.json("không thích reply")
}

const test_err_test_middleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}

export { test_middleware, test_err_test_middleware }