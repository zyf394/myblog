var Article = require('./db');
var formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    UPLOAD_FOLDER = '/public/avatar/'

module.exports = {
    uploadImage: function (req, res, options) {
        var form = new formidable.IncomingForm();   //创建上传表单
        var resImages = [];
        form.encoding = 'utf-8';        //设置编辑
        form.uploadDir = path.resolve('./',"public/avatar");     //设置上传目录
        form.keepExtensions = true;     //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

        form.parse(req, function(err, fields, files) {
            if (err) {
                res.locals.error = err;
                res.end(err);
                return;
            }
            if (!files.file) {
                return;
            }
            var extName = '';  //后缀名
            switch (files.file.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }

            if(extName.length == 0){
                res.locals.error = '只支持png和jpg格式图片'
                res.end('只支持png和jpg格式图片');
                return;
            }

            var publicUrl = files.file.path.replace(path.resolve('./','public'), req.headers.origin);
            resImages.push({
                errno: 0,
                data: {
                    name: files.file.name,
                    url: publicUrl
                }
            })
            res.writeHead(200, {
                'Content-Type': 'application/json;charset=UTF-8'
            });
            res.end(JSON.stringify(resImages));
        });

    },
    responseDate: function (res, err, docs) {
        if (err) {
            res.end(JSON.stringify(err))
        } else {
            var newDocs = docs.map((item, index) => {
                return {
                    id: item.id,
                    author: item.author,
                    title: item.title,
                    content: item.content,
                    status: item.status,
                    publishTime: item.publishTime
                }
            });
            res.writeHead(200, {
                'Content-Type': 'application/json;charset=UTF-8'
            });
            res.end(JSON.stringify(newDocs))
        }
    }
};