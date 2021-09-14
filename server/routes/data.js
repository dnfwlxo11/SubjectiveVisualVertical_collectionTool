var express = require('express');
var router = express.Router();
const db = _NamuModules.Database;

/* GET users listing. */
router.get('/', function (req, res, next) {
    const selectRowsWork = db.connect(async (con) => {
        let rows = await con.query(`select * from tb_ht_rows`);
        return { items: rows }
    })

    selectRowsWork()
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err => next(err))
});

module.exports = router;