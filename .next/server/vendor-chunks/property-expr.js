"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/property-expr";
exports.ids = ["vendor-chunks/property-expr"];
exports.modules = {

/***/ "(ssr)/./node_modules/property-expr/index.js":
/*!*********************************************!*\
  !*** ./node_modules/property-expr/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("/**\n * Based on Kendo UI Core expression code <https://github.com/telerik/kendo-ui-core#license-information>\n */\n\n\nfunction Cache(maxSize) {\n  this._maxSize = maxSize\n  this.clear()\n}\nCache.prototype.clear = function () {\n  this._size = 0\n  this._values = Object.create(null)\n}\nCache.prototype.get = function (key) {\n  return this._values[key]\n}\nCache.prototype.set = function (key, value) {\n  this._size >= this._maxSize && this.clear()\n  if (!(key in this._values)) this._size++\n\n  return (this._values[key] = value)\n}\n\nvar SPLIT_REGEX = /[^.^\\]^[]+|(?=\\[\\]|\\.\\.)/g,\n  DIGIT_REGEX = /^\\d+$/,\n  LEAD_DIGIT_REGEX = /^\\d/,\n  SPEC_CHAR_REGEX = /[~`!#$%\\^&*+=\\-\\[\\]\\\\';,/{}|\\\\\":<>\\?]/g,\n  CLEAN_QUOTES_REGEX = /^\\s*(['\"]?)(.*?)(\\1)\\s*$/,\n  MAX_CACHE_SIZE = 512\n\nvar pathCache = new Cache(MAX_CACHE_SIZE),\n  setCache = new Cache(MAX_CACHE_SIZE),\n  getCache = new Cache(MAX_CACHE_SIZE)\n\nvar config\n\nmodule.exports = {\n  Cache: Cache,\n\n  split: split,\n\n  normalizePath: normalizePath,\n\n  setter: function (path) {\n    var parts = normalizePath(path)\n\n    return (\n      setCache.get(path) ||\n      setCache.set(path, function setter(obj, value) {\n        var index = 0\n        var len = parts.length\n        var data = obj\n\n        while (index < len - 1) {\n          var part = parts[index]\n          if (\n            part === '__proto__' ||\n            part === 'constructor' ||\n            part === 'prototype'\n          ) {\n            return obj\n          }\n\n          data = data[parts[index++]]\n        }\n        data[parts[index]] = value\n      })\n    )\n  },\n\n  getter: function (path, safe) {\n    var parts = normalizePath(path)\n    return (\n      getCache.get(path) ||\n      getCache.set(path, function getter(data) {\n        var index = 0,\n          len = parts.length\n        while (index < len) {\n          if (data != null || !safe) data = data[parts[index++]]\n          else return\n        }\n        return data\n      })\n    )\n  },\n\n  join: function (segments) {\n    return segments.reduce(function (path, part) {\n      return (\n        path +\n        (isQuoted(part) || DIGIT_REGEX.test(part)\n          ? '[' + part + ']'\n          : (path ? '.' : '') + part)\n      )\n    }, '')\n  },\n\n  forEach: function (path, cb, thisArg) {\n    forEach(Array.isArray(path) ? path : split(path), cb, thisArg)\n  },\n}\n\nfunction normalizePath(path) {\n  return (\n    pathCache.get(path) ||\n    pathCache.set(\n      path,\n      split(path).map(function (part) {\n        return part.replace(CLEAN_QUOTES_REGEX, '$2')\n      })\n    )\n  )\n}\n\nfunction split(path) {\n  return path.match(SPLIT_REGEX) || ['']\n}\n\nfunction forEach(parts, iter, thisArg) {\n  var len = parts.length,\n    part,\n    idx,\n    isArray,\n    isBracket\n\n  for (idx = 0; idx < len; idx++) {\n    part = parts[idx]\n\n    if (part) {\n      if (shouldBeQuoted(part)) {\n        part = '\"' + part + '\"'\n      }\n\n      isBracket = isQuoted(part)\n      isArray = !isBracket && /^\\d+$/.test(part)\n\n      iter.call(thisArg, part, isBracket, isArray, idx, parts)\n    }\n  }\n}\n\nfunction isQuoted(str) {\n  return (\n    typeof str === 'string' && str && [\"'\", '\"'].indexOf(str.charAt(0)) !== -1\n  )\n}\n\nfunction hasLeadingNumber(part) {\n  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX)\n}\n\nfunction hasSpecialChars(part) {\n  return SPEC_CHAR_REGEX.test(part)\n}\n\nfunction shouldBeQuoted(part) {\n  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part))\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcHJvcGVydHktZXhwci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDWTs7QUFFWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLElBQUk7QUFDaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixXQUFXO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JlcnJ5LXJlYWN0LW1hdGVyaWFsLW5leHQtdHMvLi9ub2RlX21vZHVsZXMvcHJvcGVydHktZXhwci9pbmRleC5qcz9hMzBiIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQmFzZWQgb24gS2VuZG8gVUkgQ29yZSBleHByZXNzaW9uIGNvZGUgPGh0dHBzOi8vZ2l0aHViLmNvbS90ZWxlcmlrL2tlbmRvLXVpLWNvcmUjbGljZW5zZS1pbmZvcm1hdGlvbj5cbiAqL1xuJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIENhY2hlKG1heFNpemUpIHtcbiAgdGhpcy5fbWF4U2l6ZSA9IG1heFNpemVcbiAgdGhpcy5jbGVhcigpXG59XG5DYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuX3NpemUgPSAwXG4gIHRoaXMuX3ZhbHVlcyA9IE9iamVjdC5jcmVhdGUobnVsbClcbn1cbkNhY2hlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiB0aGlzLl92YWx1ZXNba2V5XVxufVxuQ2FjaGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRoaXMuX3NpemUgPj0gdGhpcy5fbWF4U2l6ZSAmJiB0aGlzLmNsZWFyKClcbiAgaWYgKCEoa2V5IGluIHRoaXMuX3ZhbHVlcykpIHRoaXMuX3NpemUrK1xuXG4gIHJldHVybiAodGhpcy5fdmFsdWVzW2tleV0gPSB2YWx1ZSlcbn1cblxudmFyIFNQTElUX1JFR0VYID0gL1teLl5cXF1eW10rfCg/PVxcW1xcXXxcXC5cXC4pL2csXG4gIERJR0lUX1JFR0VYID0gL15cXGQrJC8sXG4gIExFQURfRElHSVRfUkVHRVggPSAvXlxcZC8sXG4gIFNQRUNfQ0hBUl9SRUdFWCA9IC9bfmAhIyQlXFxeJiorPVxcLVxcW1xcXVxcXFwnOywve318XFxcXFwiOjw+XFw/XS9nLFxuICBDTEVBTl9RVU9URVNfUkVHRVggPSAvXlxccyooWydcIl0/KSguKj8pKFxcMSlcXHMqJC8sXG4gIE1BWF9DQUNIRV9TSVpFID0gNTEyXG5cbnZhciBwYXRoQ2FjaGUgPSBuZXcgQ2FjaGUoTUFYX0NBQ0hFX1NJWkUpLFxuICBzZXRDYWNoZSA9IG5ldyBDYWNoZShNQVhfQ0FDSEVfU0laRSksXG4gIGdldENhY2hlID0gbmV3IENhY2hlKE1BWF9DQUNIRV9TSVpFKVxuXG52YXIgY29uZmlnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDYWNoZTogQ2FjaGUsXG5cbiAgc3BsaXQ6IHNwbGl0LFxuXG4gIG5vcm1hbGl6ZVBhdGg6IG5vcm1hbGl6ZVBhdGgsXG5cbiAgc2V0dGVyOiBmdW5jdGlvbiAocGF0aCkge1xuICAgIHZhciBwYXJ0cyA9IG5vcm1hbGl6ZVBhdGgocGF0aClcblxuICAgIHJldHVybiAoXG4gICAgICBzZXRDYWNoZS5nZXQocGF0aCkgfHxcbiAgICAgIHNldENhY2hlLnNldChwYXRoLCBmdW5jdGlvbiBzZXR0ZXIob2JqLCB2YWx1ZSkge1xuICAgICAgICB2YXIgaW5kZXggPSAwXG4gICAgICAgIHZhciBsZW4gPSBwYXJ0cy5sZW5ndGhcbiAgICAgICAgdmFyIGRhdGEgPSBvYmpcblxuICAgICAgICB3aGlsZSAoaW5kZXggPCBsZW4gLSAxKSB7XG4gICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpbmRleF1cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBwYXJ0ID09PSAnX19wcm90b19fJyB8fFxuICAgICAgICAgICAgcGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fFxuICAgICAgICAgICAgcGFydCA9PT0gJ3Byb3RvdHlwZSdcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBvYmpcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkYXRhID0gZGF0YVtwYXJ0c1tpbmRleCsrXV1cbiAgICAgICAgfVxuICAgICAgICBkYXRhW3BhcnRzW2luZGV4XV0gPSB2YWx1ZVxuICAgICAgfSlcbiAgICApXG4gIH0sXG5cbiAgZ2V0dGVyOiBmdW5jdGlvbiAocGF0aCwgc2FmZSkge1xuICAgIHZhciBwYXJ0cyA9IG5vcm1hbGl6ZVBhdGgocGF0aClcbiAgICByZXR1cm4gKFxuICAgICAgZ2V0Q2FjaGUuZ2V0KHBhdGgpIHx8XG4gICAgICBnZXRDYWNoZS5zZXQocGF0aCwgZnVuY3Rpb24gZ2V0dGVyKGRhdGEpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICBsZW4gPSBwYXJ0cy5sZW5ndGhcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCB8fCAhc2FmZSkgZGF0YSA9IGRhdGFbcGFydHNbaW5kZXgrK11dXG4gICAgICAgICAgZWxzZSByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfSlcbiAgICApXG4gIH0sXG5cbiAgam9pbjogZnVuY3Rpb24gKHNlZ21lbnRzKSB7XG4gICAgcmV0dXJuIHNlZ21lbnRzLnJlZHVjZShmdW5jdGlvbiAocGF0aCwgcGFydCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcGF0aCArXG4gICAgICAgIChpc1F1b3RlZChwYXJ0KSB8fCBESUdJVF9SRUdFWC50ZXN0KHBhcnQpXG4gICAgICAgICAgPyAnWycgKyBwYXJ0ICsgJ10nXG4gICAgICAgICAgOiAocGF0aCA/ICcuJyA6ICcnKSArIHBhcnQpXG4gICAgICApXG4gICAgfSwgJycpXG4gIH0sXG5cbiAgZm9yRWFjaDogZnVuY3Rpb24gKHBhdGgsIGNiLCB0aGlzQXJnKSB7XG4gICAgZm9yRWFjaChBcnJheS5pc0FycmF5KHBhdGgpID8gcGF0aCA6IHNwbGl0KHBhdGgpLCBjYiwgdGhpc0FyZylcbiAgfSxcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplUGF0aChwYXRoKSB7XG4gIHJldHVybiAoXG4gICAgcGF0aENhY2hlLmdldChwYXRoKSB8fFxuICAgIHBhdGhDYWNoZS5zZXQoXG4gICAgICBwYXRoLFxuICAgICAgc3BsaXQocGF0aCkubWFwKGZ1bmN0aW9uIChwYXJ0KSB7XG4gICAgICAgIHJldHVybiBwYXJ0LnJlcGxhY2UoQ0xFQU5fUVVPVEVTX1JFR0VYLCAnJDInKVxuICAgICAgfSlcbiAgICApXG4gIClcbn1cblxuZnVuY3Rpb24gc3BsaXQocGF0aCkge1xuICByZXR1cm4gcGF0aC5tYXRjaChTUExJVF9SRUdFWCkgfHwgWycnXVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoKHBhcnRzLCBpdGVyLCB0aGlzQXJnKSB7XG4gIHZhciBsZW4gPSBwYXJ0cy5sZW5ndGgsXG4gICAgcGFydCxcbiAgICBpZHgsXG4gICAgaXNBcnJheSxcbiAgICBpc0JyYWNrZXRcblxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IGxlbjsgaWR4KyspIHtcbiAgICBwYXJ0ID0gcGFydHNbaWR4XVxuXG4gICAgaWYgKHBhcnQpIHtcbiAgICAgIGlmIChzaG91bGRCZVF1b3RlZChwYXJ0KSkge1xuICAgICAgICBwYXJ0ID0gJ1wiJyArIHBhcnQgKyAnXCInXG4gICAgICB9XG5cbiAgICAgIGlzQnJhY2tldCA9IGlzUXVvdGVkKHBhcnQpXG4gICAgICBpc0FycmF5ID0gIWlzQnJhY2tldCAmJiAvXlxcZCskLy50ZXN0KHBhcnQpXG5cbiAgICAgIGl0ZXIuY2FsbCh0aGlzQXJnLCBwYXJ0LCBpc0JyYWNrZXQsIGlzQXJyYXksIGlkeCwgcGFydHMpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzUXVvdGVkKHN0cikge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnICYmIHN0ciAmJiBbXCInXCIsICdcIiddLmluZGV4T2Yoc3RyLmNoYXJBdCgwKSkgIT09IC0xXG4gIClcbn1cblxuZnVuY3Rpb24gaGFzTGVhZGluZ051bWJlcihwYXJ0KSB7XG4gIHJldHVybiBwYXJ0Lm1hdGNoKExFQURfRElHSVRfUkVHRVgpICYmICFwYXJ0Lm1hdGNoKERJR0lUX1JFR0VYKVxufVxuXG5mdW5jdGlvbiBoYXNTcGVjaWFsQ2hhcnMocGFydCkge1xuICByZXR1cm4gU1BFQ19DSEFSX1JFR0VYLnRlc3QocGFydClcbn1cblxuZnVuY3Rpb24gc2hvdWxkQmVRdW90ZWQocGFydCkge1xuICByZXR1cm4gIWlzUXVvdGVkKHBhcnQpICYmIChoYXNMZWFkaW5nTnVtYmVyKHBhcnQpIHx8IGhhc1NwZWNpYWxDaGFycyhwYXJ0KSlcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/property-expr/index.js\n");

/***/ })

};
;