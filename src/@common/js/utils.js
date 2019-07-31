

// 字符集合
const RANDOM_STR = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_+MNBVCXZLKJHGFDSAPOIUYTREWQ';
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
   
}
export default new Utils