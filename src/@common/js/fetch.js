import uitils from './utils'
import { assign } from 'lodash';

class fetch {
    post(url, data, options, timeout) {
        return uitils.fetch(url, assign(options || {}, {
            method: 'POST',
            data: data,
            timeout: timeout
        }));
    };

    get(url, params, options, timeout) {
        return uitils.fetch(url, assign(options || {}, {
            method: 'GET',
            params: params,
            timeout: timeout
        }));
    };
}

export default new fetch();