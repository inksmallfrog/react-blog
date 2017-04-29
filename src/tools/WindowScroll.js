/*
* @Author: inksmallfrog
* @Date:   2017-04-29 12:16:09
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-04-29 13:00:28
*/

'use strict';
const stepTime = 50;
const minDis = 50;

/*
 * 平滑滚动Y轴
 * @param accelerate :速度
 * @param target :目标坐标
 */
export default function smoothScrollY(accelerate = 5, target){
    let dirta = target - window.pageYOffset;
    if(Math.abs(dirta) < minDis) window.scrollTo(window.pageXOffset, target);
    else {
        let step = dirta / accelerate;
        //将step绝对值约束在最小滚动距离
        step = step > -50 && step < 50 ? 50 * Math.sign(step) : step;
        window.scrollTo(window.pageXOffset, step + window.pageYOffset);
        setTimeout(()=>smoothScrollY(accelerate, target), stepTime);
    }
}
