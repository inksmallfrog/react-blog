/*
* @Author: inksmallfrog
* @Date:   2017-04-30 16:22:31
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 17:08:40
*/

'use strict';

/*
 * 解析包含头信息的markdown文章
 * @param content: 文章的全部内容
 *        fileName: 文章的文件名，用于报错
 * @return 包含文章元信息和主体内容的对象
 */
function passageParser(content, fileName){
    let structur = {};

    let metadata,
        metadataMap = {};
    //记录markdonw元数据，并将其移除得到文章主体
    //元数据由文章顶部---包裹，每行一条元信息
    let markdown = content.replace(/---[\r|\n]+((.|\n|\r)*)?[\r|\n]+---/, (s, value)=>{
        metadata = value;
        return '';
    });
    if(!metadata){
        console.error('Error: ' + fileName + '没有元信息！');
    }
    else{
        //将元信息保存到map中
        //每行一条元信息，格式为key:value
        metadata.split('\n').forEach((metaItem)=>{
            let meta = metaItem.split(':'),
                key,
                value;
            if(meta.length < 2) {
                console.error('Error: ' + fileName + ' ' + metaItem + '元信息错误!');
                return;
            }
            else{
                [key, ...value] = meta;
                value = value.join(':');
                key = key.trim();
                value = value.trim();
                if(value.indexOf('[') == -1){ //值不是数组
                    metadataMap[key] = value;
                }
                else{ //值是数组
                    let items = value.replace(/\[|\]/, '').split(',');
                    if(items.length < 0) console.error('Error: ' + fileName + ' ' + metaItem + '元信息错误！');
                    else { metadataMap[key] = items; }
                }
            }
        })
    }
    structur.metadata = metadataMap;
    structur.body = markdown;
    return structur;
}

module.exports = passageParser;