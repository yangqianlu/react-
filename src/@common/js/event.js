/**
 * 事件系统
 */
import { isFunction, isArray, isString } from 'lodash';
import utils from './utils';
/**
 * 实例缓存
 */
var _instanceCache = {};

export default class EventEmitter {
    constructor(scope) {

        if (isString(scope)) {
            if (_instanceCache[scope]) {
                return _instanceCache[scope];
            }

            _instanceCache[scope] = this;
        }

        this._events = {};
    }


    /**
   * 绑定事件
   * @param type: 事件名称
   * @param handler: 回调函数
   */
    on(type, handler) {
        let events = this._events;
        let listeners = events[type] = events[type] || [];

        if (isFunction(handler)) {
            listeners.push(handler);
        } else if (isArray(handler)) {
            listeners.push.apply(listeners, handler);
        }

        return this;
    }

    /**
   * 移除事件
   * @param type: 事件名称
   * @param handler: 回调函数
   * @description 如果没有传handler，将移除 type 下的所有回调
   */
    off(type, handler) {
        let events = this._events;

        if (!handler) {
            delete events[type];
        } else {
            let listeners = events[type] = events[type] || [];
            for (let i = 0, len = listeners.length; i < len; i++) {
                //只清除绑定的函数handler
                listeners[i] === handler && listeners.splice(i, 1);
            }
        }

        return this;
    }

    /**
   * 触发事件
   * @param type:事件名称
   * @description 除 type 之外的其他参数都将被传递给回调函数
   */
    emit(type) {
        let listeners = this._events[type] || [];
        for (let i = 0, len = listeners.length; i < len; i++) {
            let handler = listeners[i];
            let args = utils.argumentsToArray(arguments, 1);
            isFunction(handler) && handler.apply(this, args);
        }

        return this;
    }

    /**
   * 执行一次
   * @description 参数与 on 相同，但回调函数将只被执行一次
   */
    once(type, handler) {
        let g = function() {
            this.off(type, g);

            handler.apply(this, arguments);
        };

        this.on(type, g);
    }
};
