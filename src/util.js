const Util = { //I might use this; I might not
    inherits(childClass, ParentClass) {
        function Surrogate() {};
        Surrogate.prototype = ParentClass.prototype;
        childClass.prototype = new Surrogate();
        childClass.prototype.constructor = childClass;
    }
}

module.exports = Util;
