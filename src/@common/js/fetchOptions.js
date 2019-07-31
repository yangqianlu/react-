// 字符集合
const RANDOM_STR = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_+MNBVCXZLKJHGFDSAPOIUYTREWQ';
// 获取随机字符
const getRandomString = () => {
    const index = Math.round(Math.random() * (RANDOM_STR.length - 1)) + 1;
    return RANDOM_STR.charAt(index);
}
// 获取对应长度的随机字符
const getRandomLength = (length) => {
    return Array.from({length}).map(_ => getRandomString()).join('');
}

export default function (options, url) {
    return {
        "request": {
            "c": '',
            "m": '',
            "p": options
        },
        "header": {
            "appid": 20,
            "log_id": `WEBB%${url}%${getRandomLength(15)}`, // 规则 WEBB+%+接口名+%+15位随机串
            "uid": "",
            "uname": "",
            "provider": "chatbot",
            "signid": "",
            "version": "",
            "ip": ""
        }
    }
}
