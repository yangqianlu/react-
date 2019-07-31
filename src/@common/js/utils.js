

// 字符集合
const RANDOM_STR = 'qwe';
class Utils {
    //根据不同环境 返回不同url
    setUrl() {
        let url = ''
        switch (process.env.P_ENV) {
            case 'dev':
                url = 'https://bot.dev.ifchange.com/'
                break;
            case 'test':
                url = 'https://bot.testing2.ifchange.com/'
                break;
            case 'pro':
                url = 'https://bot.ifchange.com'
                break;
            default:
                url = 'https://bot.dev.ifchange.com/'
                break;
        }
        return url

    }
    // 获取随机字符
    getRandomStr() {
        const index = parseInt(Math.random() * RANDOM_STR.length,10)
        return RANDOM_STR.charAt(index)
    }
     // 获取对应长度的随机字符
     getRandomLength = (length) => {
        return Array.from({length},()=>this.getRandomStr()).join('')
    }


}
export default new Utils