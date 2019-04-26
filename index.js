const crypto = require("crypto");

const path = require("path");
function FesionWebpackPlugin(options) {
    this.options = options;
}
FesionWebpackPlugin.prototype.apply = function(compiler) {
    const options = this.options;
    let fileTypes = options.fileTypes;
    if (!fileTypes) {
        fileTypes = ["js", "css", "html"];
    }
    compiler.plugin("emit", function(compilation, callback) {
        const filelist = [];
        for (let filename in compilation.assets) {
            const extname = path.extname(filename).replace(".", "");
            if (fileTypes.indexOf(extname) === -1) {
                continue;
            }
            const source = compilation.assets[filename].source();
            const size = compilation.assets[filename].size();
            const hash = crypto.createHash("md5");
            hash.update(source);
            const md5 = hash.digest("hex");
            filelist.push({ path: filename, md5, size });
        }
        const date = new Date();
        const fileStr = JSON.stringify({ date: date.toLocaleString(), timestamp: date.getTime(), filelist });
        //在 compilation.assets 中添加需要的资源
        compilation.assets["filelist.json"] = {
            source: function() {
                return fileStr;
            },
            size: function() {
                return fileStr.length;
            }
        };
        callback();
    });
};
module.exports = FesionWebpackPlugin;
