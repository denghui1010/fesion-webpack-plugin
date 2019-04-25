function FesionWebpackPlugin() {}
FesionWebpackPlugin.prototype.apply = function(compiler) {
    //我们主要关注 compilation 阶段，即 webpack 打包阶段
    compiler.plugin("emit", function(compilation, callback) {
        var filelist = "In this build:\n\n";
        //compilation.assets 和 compilation.chunks 前面已经说过
        for (var filename in compilation.assets) {
            filelist += "- " + filename + "\n";
        }
        //在 compilation.assets 中添加需要的资源
        compilation.assets["filelist.md"] = {
            source: function() {
                return filelist;
            },
            size: function() {
                return filelist.length;
            }
        };
        callback();
    });
};
module.exports = FesionWebpackPlugin;
