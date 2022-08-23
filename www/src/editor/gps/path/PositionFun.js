
/**
 * Описывает точку.
 * @class
 * @param [_x=0] {number} кордината
 * @param [_y=0] {number} кордината
 * @param [_z=0] {number} кордината
 */
export function PositionFun (_x, _y, _z, _fun) {
    /** {number} кордината */
    this._x = _x || 0;
    /** {number} кордината */
    this._y = _y || 0;
    /** {number} кордината */
    this._z = typeof _z !== 'function' ? (_z || 0) : 0;

    this.fun = typeof _z === 'function' ? _z : _fun;

    this.set = function (_x, _y, _z) {
        this._x = _x || 0;
        this._y = _y || 0;
        this._z = _z || 0;
        if (this.fun) this.fun();

    };
    this.setPoint = function (p) {
        this._x = p.x;
        this._y = p.y;
        this._z = p.z;
        if (this.fun) this.fun();
    };

    this.getObj = function () {
        var o = {};
        o.x = this._x;
        o.y = this._y;
        o.z = this._z;
        return o;
    };

    this.copy = function () {
        return new PositionFun(this._x, this._y, this._z);
    };
}
PositionFun.prototype = {
    set x (v) {
        // if(this._x==v)return;
        this._x = v;
        if (this.fun) this.fun();
    },
    get x () {
        return this._x;
    },

    set y (v) {
        // if(this._y==v)return;
        this._y = v;
        if (this.fun) this.fun();
    },
    get y () {
        return this._y;
    },
    set z (v) {
        // if(this._z==v)return;
        this._z = v;
        if (this.fun) this.fun();
    },
    get z () {
        return this._z;
    }
};
