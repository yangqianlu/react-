
/**
 * 存放全局公用方法
 */
import axios from 'axios';
import Cookies from 'js-cookie';
import Toast from '@common-components/Toast';
import {
    isEmpty,
    isObject,
    isFunction,
    isArray,
    each,
    get as safeGet
} from 'lodash';
import fetchOptions from './fetchOptions';
let CancelToken = axios.CancelToken;

// 字符集合
const RANDOM_STR = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_+MNBVCXZLKJHGFDSAPOIUYTREWQ';

class utils {
    setURL (){
        let url=''
        if(window.P_ENV === 'dev'){
        //   url='http://bot.dev.ifchange.com'
        }else if(window.P_ENV === 'pro'){
          url='https://bot.ifchange.com'
        }else if(window.P_ENV === 'test'){
          url='https://bot.testing2.ifchange.com'
        }
    
        return url
    }

    sortAllKey(arr) {
        for (var j in arr) {
            if ((typeof arr[j] === 'object') && !(arr[j] instanceof Array)) {
                arr[j] = this.objKeySort(arr[j]);
                this.sortAllKey(arr[j]);
            } else if (arr[j] instanceof Array) {
                this.sortAllKey(arr[j]);
            }
        }
    }
    objKeySort(args) {
        if (args) {
            var newKey = Object.keys(args).sort();

            var newObj = {};
            for (var i = 0; i < newKey.length; i++) {
                newObj[newKey[i]] = args[newKey[i]];

            }
            return newObj; //返回排好序的新对象
        }
        return null;
    }
    /***
   * 获取 url 名称
   * eg: url =  /product/decisive/strategic_effectiveness
   * console.log(getActiveKey(url, 2))     // decisive
   */
    getActiveKey(path, level = 2, defaultContext = '') {
        path = path.split('/');
        return '' + (path[+level] || defaultContext);
    }
    toUnicode(str) {
        var res = [];
        for (var i = 0; i < str.length; i++) {
            res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
        }
        return "\\u" + res.join("\\u");
    }

    /**
   * 将函数参数转换为数组
   */
    argumentsToArray(args, start, end) {
        if (!arguments.length) {
            return [];
        }
        start = start || 0;
        end = end || args.length;
        try {
            return Array.prototype.slice.call(args, start, end);
        } catch (e) {
            let result = [];
            for (let i = start; i < end; i++) {
                result.push(args);
            }
            return result;
        }
    }
    // 把 object 参数转为 URL 查询字符串
    params(obj) {
        let utilss = new utils();
        let __prefix = arguments[1];
        if (
            (!__prefix && !isObject(obj)) ||
            (__prefix && !isObject(obj) && !isArray(obj))
        ) {
            return '';
        }
        let res = [];
        each(obj, (value, key) => {
            /**
       * 使用 Object.create(null) 创建的object没有 hasOwnProperty
       * 方法，不能直接使用 hasOwnProperty 判断某个对象拥有某个非原型链属性
       */
            if (obj.hasOwnProperty && !obj.hasOwnProperty(key)) {
                return;
            }
            key = __prefix ? `${__prefix}[${key}]` : key;
            if (isObject(value) || isArray(value)) {
                !isEmpty(value) && res.push(utilss.params(value, key));
            } else if (value !== void (0)) {
                res.push(key + '=' + encodeURIComponent(value));
            }
        });
        return res.join('&');
    }
    query2Dict(param) {
        var pattern = /([^?&=]+)=([^&#]*)/g;
        var dict = {};
        var search = null;
        if (typeof param === "object" && param instanceof Location) {
            search = param.search;
        } else if (typeof param === "string") {
            search = param;
        } else {
            throw new Error("参数类型非法！请传入window.loaction对象或者url字符串。");
        }
        search.replace(pattern, function (rs, $1, $2) {
            var key = decodeURIComponent($1);
            var value = decodeURIComponent($2);
            dict[key] = value;
            return rs;
        });
        return dict;
    }
    fetch(url, options) {
        options = options || {};
        options.url = this.setURL()+url;
        options.method = (options.method || 'get').toUpperCase();
        options.dataType = options.dataType || 'json';
        options.jsonify = options.jsonify || true;
        options.headers = options.headers || {};
        options.warning = typeof options.warning === void 0 ? true : options.warning;
        options.timeout = options.timeout || 1200000
        let onComplete = options.onComplete;

        if (options.method === 'POST') {

            let data = fetchOptions(
                Object.assign(
                    {},
                    options.data || {},
                    { session: Cookies.get('ssc_b_token') }

                ), url);

            this.sortAllKey(data);

            if (options.jsonify !== true) {
                let utilsd = new utils();
                options.data = utilsd.params(data);
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            } else {
                options.headers['content-type'] = 'application/json';
                options.data = JSON.stringify(data);
            }
        }

        const source = CancelToken.source();
        options.cancelToken = source.token;
        let axiosPromise = axios(options).then(function (response) {

            if (response.status >= 200 && response.status < 300) {
                let data = response.data.response;
                return new Promise(function (resolve, reject) {
                    if (
                        data.err_no * 1 ||
                        (data.err_no !== '0' && data.err_no && data.err_no.length)
                    ) {
                        let err = new Error(data.err_msg);
                        err.response = data;
                        reject(err);
                    }

                    data.headers = response.headers;
                    isFunction(onComplete) && onComplete(null, data);
                    resolve(data);
                });
            }
            let error = new Error("系统繁忙，请稍后重试！");
            error.response = response;
            throw error;
        }).catch(function (error) {

            // token 过期标识 后四位是4002
            if (error.response.err_no) {
                let strnum = error.response.err_no.toString();
                strnum = strnum.substr(strnum.length - 4)
                if (strnum === '4002') {
                    Cookies.remove('ssc_b_token');
                    window.location.href = '/';
                    return false;
                }
            }

            const errorProto = safeGet(error, 'constructor.prototype') || {};
            // 标识是 cancel 的报错，需要在各个业务中处理
            if (errorProto.__CANCEL__) {
                error.cancel = true;
            } else {
                if (options.warning && (error.response.err_no !== 0)) {
                    Toast.warning(error.response.err_msg);
                }
            }
            isFunction(onComplete) && onComplete(error);
            throw error;
        });
        axiosPromise.cancel = function (msg) {
            source.cancel(msg);
            return this;
        };
        return axiosPromise;
    }

    debounce(func, wait = 500) {
        let timeout;  // 定时器变量
        return function (event) {
            clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
            event.persist && event.persist()   //保留对事件的引用
            //const event = e && {...e}   //深拷贝事件对象
            timeout = setTimeout(() => {
                func(event)
            }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
        };
    }

    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            if (!window.FileReader) {
                throw new Error('浏览器不支持文件转base64');
            }

            const reader = new FileReader();

            reader.onload = function(evt) {
                if(evt.target.readyState !== 2) {
                    return;
                }
                if(evt.target.error) {
                    throw new Error('Error while reading file');
                }

                const toPruneOut = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                // const toPruneOut = '';
                resolve(evt.target.result.replace(toPruneOut, ''));
            };

            reader.readAsDataURL(file);
        });
    }

    // 获取随机字符
    getRandomString = () => {
        const index = Math.round(Math.random() * (RANDOM_STR.length - 1)) + 1;
        return RANDOM_STR.charAt(index);
    }

    // 获取对应长度的随机字符
    getRandomLength = (length) => {
        return Array.from({length}).map(_ => this.getRandomString()).join('');
    }
}



export default new utils();
