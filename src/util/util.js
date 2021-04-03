/*
 * @Autor: theajack
 * @Date: 2021-04-03 22:00:20
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-03 22:58:36
 * @Description: Coding something
 */

export function isMobile () {
    return (/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent));
}

export const LinkData = [
    {
        name: 'mind-reading',
        icon: 'closed-eye',
        title: '读心术',
        path: 'https://theajack.gitee.io/magic'
    }
];