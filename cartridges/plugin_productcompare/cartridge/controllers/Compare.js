'use strict';

var CatalogMgr = require('dw/catalog/CatalogMgr');
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var productFactory = require('*/cartridge/scripts/factories/product');
var CompareAttributesModel = require('*/cartridge/models/compareAttributes');
var isCompat = require('./../util/lwcCompat');

server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    var compareProductsForm = req.querystring;
   // console.log("cgid value in Compare.js: ",compareProductsForm.cgid);
    var cgid = compareProductsForm.cgid;
    var category = CatalogMgr.getCategory(compareProductsForm.cgid);
    var pids = Object.keys(compareProductsForm)
        .filter(function (key) { return key.indexOf('pid') === 0; })
        .map(function (pid) { return compareProductsForm[pid]; });
    var products = pids.map(function (pid) {
        return productFactory.get({ pid: pid });
    });

    res.render('product/comparison', {
        category: {
            name: category.displayName,
            imgUrl: category.image ? category.image.url.toString() : null
        },
        pids: pids,
        cgid: cgid,
        attributes: (new CompareAttributesModel(products)).slice(0)
    });
    var lwcCompat = isCompat();

    // Render as a Web Component
if (false && !lwcCompat) {
    // Full web component rendering
    res.render('/hello/helloWorld-wc');
    next();
    return;
}

    next();
});

module.exports = server.exports();