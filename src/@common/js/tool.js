
class tool {
    strSlice = (str = '', num = 0) => {
        if (isNaN(num)) {
            console.log('num请输入数字');
            return str;
        }
        let arr = [];
        let len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            // 单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
            if (len <= num) {
                arr.push(str[i]);
            } else {
                break;
            }
        }
        return arr.join('');
    };
    
    strLen = (str) => {
        let len = 0;
        for (var i = 0; i < str.length; i++) {
          var c = str.charCodeAt(i);
          // 单字节加1
          if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
          } else {
            len += 2;
          }
        }
        return len;
      };

}

const toolInst = new tool();

const strSlice = toolInst.strSlice;

const trim = s => s && s.trim();
const limitToLength = (s, len) => {
    return strSlice(s, len);
};

export const trimAndLimit = (len, s) => limitToLength(trim(s), len);

export default toolInst;