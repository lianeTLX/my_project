
let db = require('../config/db');


class GoodsService {
    constructor() {
        console.log('created GoodsService bean');
    }
    // 根据条件分页查询商品列表
    async findGoodsList(queryDTO) {
        let page = Number(queryDTO.page == null ? 1 : queryDTO.page);
        let size = Number(queryDTO.size == null ? 10 : queryDTO.size);
        // var condition = {};
        let args = [];
        let sql = "select * from tb_goods where 1 = 1 ";
        if (queryDTO.goodsId != null) {
            // condition.id = queryDTO.goodsId;
            args.push(queryDTO.goodsId);
            sql += ' and id = ? ';
        }
        if (queryDTO.goodsCode != null && queryDTO.goodsCode != '') {
            // condition.goods_code = queryDTO.goodsCode;
            args.push(queryDTO.goodsCode);
            sql += ' and goods_code = ? '
        }
        if (queryDTO.firstTime != null) {
            args.push(queryDTO.firstTime);
            sql += ' and create_time >= ? '
        }
        if (queryDTO.lastTime != null) {
            args.push(queryDTO.lastTime);
            sql += ' and create_time <= ? '
        }
        let total = await findConditionGoodsTotal(sql.replace('*', ' count(1) as total '), args);
        console.log(`sql=${sql};-------total=${total}`);
        // 排序
        sql = sql + ' order by create_time desc ';
        sql += ' limit ?, ? '
        args.push((page - 1) * size);
        args.push(size);
        console.log(`sql=${sql}`);
        let list = await findGoodsByCondition(sql, args);
        // select * from tb_goods where id = ? and goods_code = ? 
        //   and create_time >= ? and create_time <= ? limit ?,?
        return { list, total }
        function findConditionGoodsTotal(sql, args) {
            return new Promise((resolve, reject) => {
                // 防止SQL注入方式查询
                db.query(sql, args, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows[0].total);
                })
            })
        }
        function findGoodsByCondition(sql, args) {
            return new Promise((resolve, reject) => {
                // 防止SQL注入方式查询
                db.query(sql, args, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(rows);
                })
            })
        }
    }

    // 添加商品
    async addGoods(dto) {
        var sql = " INSERT INTO tb_goods (`name`, price, stock, goods_code, `status`) VALUE (?, ?, ?, ?, ?) ";
        var args = [dto.goodsName, dto.price, dto.stock, dto.goodsCode, dto.status];
        return new Promise((resolve, reject) => {
            // 防止SQL注入方式查询
            db.query(sql, args, (err, data) => {
                if (err) {
                    reject(err);
                }
                // 新增响应数据
                // "data": {
                //     "fieldCount": 0,
                //     "affectedRows": 1,
                //     "insertId": 13,
                //     "serverStatus": 2,
                //     "warningCount": 0,
                //     "message": "",
                //     "protocol41": true,
                //     "changedRows": 0
                // }
                resolve(data.affectedRows);// 受影响行数
            })
        });
    }

    // 修改商品数据
    async updateGoods(id, goods) {
        if (id == null || goods == null) {
            return 0;
        }
        let goodsData = await this.findById(id);
        if (goodsData == null) {
            return 0;
        }
        let args = [];
        let sql = " UPDATE tb_goods SET id = id "
        if (goods.goodsName != null && goods.goodsName != '') {
            sql += ' ,  `name` = ? '
            args.push(goods.goodsName);
        }
        if (goods.price != null && goods.price >= 0) {
            sql += ' ,  `price` = ? '
            args.push(goods.price);
        }
        if (goods.stock != null && goods.stock >= 0) {
            sql += ' ,  `stock` = ? '
            args.push(goods.stock);
        }
        if (goods.goodsCode != null && goods.goodsCode != '') {
            sql += ' ,  `goods_code` = ? '
            args.push(goods.goodsCode);
        }
        if (goods.status != null) {
            sql += ' ,  `status` = ? '
            args.push(goods.status);
        }

        sql += " WHERE id = ? ";
        args.push(id);
        return new Promise((resolve, reject) => {
            // 防止SQL注入方式查询
            db.query(sql, args, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data.affectedRows);// 受影响行数
            })
        });
    }

    // 删除商品数据
    async deleteGoods(goodsId) {
        if (goodsId == null) {
            return 0;
        }
        let data = await this.findById(goodsId);
        if (data == null) {
            return 0;
        }
        var sql = " DELETE FROM tb_goods WHERE id = ? ";
        var args = [goodsId];
        return new Promise((resolve, reject) => {
            // 防止SQL注入方式查询
            db.query(sql, args, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data.affectedRows);// 受影响行数
            })
        });
    }

    // 根据id查询数据
    findById(goodsId) {
        return new Promise((resolve, reject) => {
            // 防止SQL注入方式查询
            db.query(" select * from tb_goods where id = ? ", [goodsId], (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);// 数据
            })
        });
    }

}
var goodsService = new GoodsService();
module.exports.goodsService = goodsService;