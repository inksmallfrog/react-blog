/*
* @Author: inksmallfrog
* @Date:   2017-04-30 16:04:38
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-30 19:49:32
*/

'use strict';
const fs = require('fs');
const path = require('path');

const passageParser = require('./src/lib/passageParser');
const pathConfig = require('./staticConfig');

const passagesPath = pathConfig.passagesPath;
const passagesJsonPath = pathConfig.targetJsonPath;

/*
 * 异步读取目录函数
 * @param dir 路径
 * @return promise对象，其返回目录下的所有文件名
 */
function readdirAsync(dir){
    return new Promise((resolve, reject)=>{
        fs.readdir(dir, (err, files)=>{
           if(err) reject(err);
            else resolve(files);
        })
    });
}

/*
 * 异步读取文件内容
 * @param filePath 文件路径
 * @return promise对象，其返回文件的内容
 */
function readFileAsync(filePath){
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, (err, data)=>{
            if(err) reject(err);
            else resolve(data);
        })
    })
}

/*
 * 异步打开文件
 * @param filePath 文件路径
 *        flags 打开方式
 * @return promise对象，其返回文件的内容
 */
function openAsync(filePath, flags){
    return new Promise((resolve, reject)=>{
        fs.open(filePath, flags, (err, fd)=>{
            if(err) reject(err);
            else resolve(fd);
        })
    })
}

/*
 * 异步写文件
 * @param fd 文件描述符
 *        data 写入数据
 * @return promise对象，用于处理错误
 */
function writeFile(fd, data){
    return new Promise((resolve, reject)=>{
        fs.writeFile(fd, data, (err)=>{
            if(err) reject(err);
            else console.log('OK:数据提取完毕');
        })
    })
}

async function handlePassages(){
    let passages = await readdirAsync(passagesPath),
        passagesData = [],
        jsonFd;
    /*  这里不能使用forEach的async，不然……后面的东西会在forEach结束前被执行
        passages.forEach(async (fileName)=>{
            let contentBuff = await readFileAsync(path.join(passagesPath, fileName));
            let structur = passageParser(contentBuff.toString(), fileName);
            passagesData.push(Object.assign(structur.metadata, {id: passagesData.length}));
        });
    */
    //使用for ... of 来顺序完成异步请求
    for(const fileName of passages){
        let contentBuff = await readFileAsync(path.join(passagesPath, fileName));
        let structur = passageParser(contentBuff.toString(), fileName);
        passagesData.push(Object.assign(structur.metadata, {id: passagesData.length, src: fileName}));
    }
    passagesData.sort((passage0, passage1) => {
        return new Date(passage0.date) > new Date(passage1.date) ? -1 : 1;
    })
    try{
        jsonFd = await openAsync(passagesJsonPath, 'w');
    }
    catch(err){
        console.error('打开文件失败！');
    }
    await writeFile(jsonFd, JSON.stringify(passagesData));
}

handlePassages();
