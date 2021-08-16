(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/qrcode/lib/can-promise.js
  var require_can_promise = __commonJS({
    "node_modules/qrcode/lib/can-promise.js"(exports, module) {
      module.exports = function() {
        return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
      };
    }
  });

  // node_modules/isarray/index.js
  var require_isarray = __commonJS({
    "node_modules/isarray/index.js"(exports, module) {
      var toString = {}.toString;
      module.exports = Array.isArray || function(arr) {
        return toString.call(arr) == "[object Array]";
      };
    }
  });

  // node_modules/qrcode/lib/utils/typedarray-buffer.js
  var require_typedarray_buffer = __commonJS({
    "node_modules/qrcode/lib/utils/typedarray-buffer.js"(exports, module) {
      "use strict";
      var isArray = require_isarray();
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
            return 42;
          } };
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      var K_MAX_LENGTH = Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      function Buffer2(arg, offset, length) {
        if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
          return new Buffer2(arg, offset, length);
        }
        if (typeof arg === "number") {
          return allocUnsafe(this, arg);
        }
        return from(this, arg, offset, length);
      }
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        Buffer2.prototype.__proto__ = Uint8Array.prototype;
        Buffer2.__proto__ = Uint8Array;
        if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
          Object.defineProperty(Buffer2, Symbol.species, {
            value: null,
            configurable: true,
            enumerable: false,
            writable: false
          });
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function isnan(val) {
        return val !== val;
      }
      function createBuffer(that, length) {
        var buf;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          buf = new Uint8Array(length);
          buf.__proto__ = Buffer2.prototype;
        } else {
          buf = that;
          if (buf === null) {
            buf = new Buffer2(length);
          }
          buf.length = length;
        }
        return buf;
      }
      function allocUnsafe(that, size) {
        var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
        if (!Buffer2.TYPED_ARRAY_SUPPORT) {
          for (var i = 0; i < size; ++i) {
            buf[i] = 0;
          }
        }
        return buf;
      }
      function fromString(that, string) {
        var length = byteLength(string) | 0;
        var buf = createBuffer(that, length);
        var actual = buf.write(string);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(that, array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0;
        var buf = createBuffer(that, length);
        for (var i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayBuffer(that, array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError("'offset' is out of bounds");
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError("'length' is out of bounds");
        }
        var buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          buf.__proto__ = Buffer2.prototype;
        } else {
          buf = fromArrayLike(that, buf);
        }
        return buf;
      }
      function fromObject(that, obj) {
        if (Buffer2.isBuffer(obj)) {
          var len = checked(obj.length) | 0;
          var buf = createBuffer(that, len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj) {
          if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
            if (typeof obj.length !== "number" || isnan(obj.length)) {
              return createBuffer(that, 0);
            }
            return fromArrayLike(that, obj);
          }
          if (obj.type === "Buffer" && Array.isArray(obj.data)) {
            return fromArrayLike(that, obj.data);
          }
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function byteLength(string) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          string = "" + string;
        }
        var len = string.length;
        if (len === 0)
          return 0;
        return utf8ToBytes(string).length;
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function from(that, value, offset, length) {
        if (typeof value === "number") {
          throw new TypeError('"value" argument must not be a number');
        }
        if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
          return fromArrayBuffer(that, value, offset, length);
        }
        if (typeof value === "string") {
          return fromString(that, value, offset);
        }
        return fromObject(that, value);
      }
      Buffer2.prototype.write = function write(string, offset, length) {
        if (offset === void 0) {
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
          } else {
            length = void 0;
          }
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        return utf8Write(this, string, offset, length);
      };
      Buffer2.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer2.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer2(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = Buffer2.isBuffer(val) ? val : new Buffer2(val);
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      Buffer2.concat = function concat(list, length) {
        if (!isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return createBuffer(null, 0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = allocUnsafe(null, length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      Buffer2.byteLength = byteLength;
      Buffer2.prototype._isBuffer = true;
      Buffer2.isBuffer = function isBuffer(b) {
        return !!(b != null && b._isBuffer);
      };
      module.exports.alloc = function(size) {
        var buffer = new Buffer2(size);
        buffer.fill(0);
        return buffer;
      };
      module.exports.from = function(data) {
        return new Buffer2(data);
      };
    }
  });

  // node_modules/qrcode/lib/core/utils.js
  var require_utils = __commonJS({
    "node_modules/qrcode/lib/core/utils.js"(exports) {
      var toSJISFunction;
      var CODEWORDS_COUNT = [
        0,
        26,
        44,
        70,
        100,
        134,
        172,
        196,
        242,
        292,
        346,
        404,
        466,
        532,
        581,
        655,
        733,
        815,
        901,
        991,
        1085,
        1156,
        1258,
        1364,
        1474,
        1588,
        1706,
        1828,
        1921,
        2051,
        2185,
        2323,
        2465,
        2611,
        2761,
        2876,
        3034,
        3196,
        3362,
        3532,
        3706
      ];
      exports.getSymbolSize = function getSymbolSize(version) {
        if (!version)
          throw new Error('"version" cannot be null or undefined');
        if (version < 1 || version > 40)
          throw new Error('"version" should be in range from 1 to 40');
        return version * 4 + 17;
      };
      exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
        return CODEWORDS_COUNT[version];
      };
      exports.getBCHDigit = function(data) {
        var digit = 0;
        while (data !== 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      };
      exports.setToSJISFunction = function setToSJISFunction(f) {
        if (typeof f !== "function") {
          throw new Error('"toSJISFunc" is not a valid function.');
        }
        toSJISFunction = f;
      };
      exports.isKanjiModeEnabled = function() {
        return typeof toSJISFunction !== "undefined";
      };
      exports.toSJIS = function toSJIS(kanji) {
        return toSJISFunction(kanji);
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-level.js
  var require_error_correction_level = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
      exports.L = { bit: 1 };
      exports.M = { bit: 0 };
      exports.Q = { bit: 3 };
      exports.H = { bit: 2 };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        var lcStr = string.toLowerCase();
        switch (lcStr) {
          case "l":
          case "low":
            return exports.L;
          case "m":
          case "medium":
            return exports.M;
          case "q":
          case "quartile":
            return exports.Q;
          case "h":
          case "high":
            return exports.H;
          default:
            throw new Error("Unknown EC Level: " + string);
        }
      }
      exports.isValid = function isValid(level) {
        return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
      };
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/bit-buffer.js
  var require_bit_buffer = __commonJS({
    "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
      function BitBuffer() {
        this.buffer = [];
        this.length = 0;
      }
      BitBuffer.prototype = {
        get: function(index) {
          var bufIndex = Math.floor(index / 8);
          return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
        },
        put: function(num, length) {
          for (var i = 0; i < length; i++) {
            this.putBit((num >>> length - i - 1 & 1) === 1);
          }
        },
        getLengthInBits: function() {
          return this.length;
        },
        putBit: function(bit) {
          var bufIndex = Math.floor(this.length / 8);
          if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
          }
          if (bit) {
            this.buffer[bufIndex] |= 128 >>> this.length % 8;
          }
          this.length++;
        }
      };
      module.exports = BitBuffer;
    }
  });

  // node_modules/qrcode/lib/core/bit-matrix.js
  var require_bit_matrix = __commonJS({
    "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
      var BufferUtil = require_typedarray_buffer();
      function BitMatrix(size) {
        if (!size || size < 1) {
          throw new Error("BitMatrix size must be defined and greater than 0");
        }
        this.size = size;
        this.data = BufferUtil.alloc(size * size);
        this.reservedBit = BufferUtil.alloc(size * size);
      }
      BitMatrix.prototype.set = function(row, col, value, reserved) {
        var index = row * this.size + col;
        this.data[index] = value;
        if (reserved)
          this.reservedBit[index] = true;
      };
      BitMatrix.prototype.get = function(row, col) {
        return this.data[row * this.size + col];
      };
      BitMatrix.prototype.xor = function(row, col, value) {
        this.data[row * this.size + col] ^= value;
      };
      BitMatrix.prototype.isReserved = function(row, col) {
        return this.reservedBit[row * this.size + col];
      };
      module.exports = BitMatrix;
    }
  });

  // node_modules/qrcode/lib/core/alignment-pattern.js
  var require_alignment_pattern = __commonJS({
    "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
      var getSymbolSize = require_utils().getSymbolSize;
      exports.getRowColCoords = function getRowColCoords(version) {
        if (version === 1)
          return [];
        var posCount = Math.floor(version / 7) + 2;
        var size = getSymbolSize(version);
        var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
        var positions = [size - 7];
        for (var i = 1; i < posCount - 1; i++) {
          positions[i] = positions[i - 1] - intervals;
        }
        positions.push(6);
        return positions.reverse();
      };
      exports.getPositions = function getPositions(version) {
        var coords = [];
        var pos = exports.getRowColCoords(version);
        var posLength = pos.length;
        for (var i = 0; i < posLength; i++) {
          for (var j = 0; j < posLength; j++) {
            if (i === 0 && j === 0 || i === 0 && j === posLength - 1 || i === posLength - 1 && j === 0) {
              continue;
            }
            coords.push([pos[i], pos[j]]);
          }
        }
        return coords;
      };
    }
  });

  // node_modules/qrcode/lib/core/finder-pattern.js
  var require_finder_pattern = __commonJS({
    "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
      var getSymbolSize = require_utils().getSymbolSize;
      var FINDER_PATTERN_SIZE = 7;
      exports.getPositions = function getPositions(version) {
        var size = getSymbolSize(version);
        return [
          [0, 0],
          [size - FINDER_PATTERN_SIZE, 0],
          [0, size - FINDER_PATTERN_SIZE]
        ];
      };
    }
  });

  // node_modules/qrcode/lib/core/mask-pattern.js
  var require_mask_pattern = __commonJS({
    "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
      exports.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var PenaltyScores = {
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      };
      exports.isValid = function isValid(mask) {
        return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
      };
      exports.from = function from(value) {
        return exports.isValid(value) ? parseInt(value, 10) : void 0;
      };
      exports.getPenaltyN1 = function getPenaltyN1(data) {
        var size = data.size;
        var points = 0;
        var sameCountCol = 0;
        var sameCountRow = 0;
        var lastCol = null;
        var lastRow = null;
        for (var row = 0; row < size; row++) {
          sameCountCol = sameCountRow = 0;
          lastCol = lastRow = null;
          for (var col = 0; col < size; col++) {
            var module2 = data.get(row, col);
            if (module2 === lastCol) {
              sameCountCol++;
            } else {
              if (sameCountCol >= 5)
                points += PenaltyScores.N1 + (sameCountCol - 5);
              lastCol = module2;
              sameCountCol = 1;
            }
            module2 = data.get(col, row);
            if (module2 === lastRow) {
              sameCountRow++;
            } else {
              if (sameCountRow >= 5)
                points += PenaltyScores.N1 + (sameCountRow - 5);
              lastRow = module2;
              sameCountRow = 1;
            }
          }
          if (sameCountCol >= 5)
            points += PenaltyScores.N1 + (sameCountCol - 5);
          if (sameCountRow >= 5)
            points += PenaltyScores.N1 + (sameCountRow - 5);
        }
        return points;
      };
      exports.getPenaltyN2 = function getPenaltyN2(data) {
        var size = data.size;
        var points = 0;
        for (var row = 0; row < size - 1; row++) {
          for (var col = 0; col < size - 1; col++) {
            var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0)
              points++;
          }
        }
        return points * PenaltyScores.N2;
      };
      exports.getPenaltyN3 = function getPenaltyN3(data) {
        var size = data.size;
        var points = 0;
        var bitsCol = 0;
        var bitsRow = 0;
        for (var row = 0; row < size; row++) {
          bitsCol = bitsRow = 0;
          for (var col = 0; col < size; col++) {
            bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
            if (col >= 10 && (bitsCol === 1488 || bitsCol === 93))
              points++;
            bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
            if (col >= 10 && (bitsRow === 1488 || bitsRow === 93))
              points++;
          }
        }
        return points * PenaltyScores.N3;
      };
      exports.getPenaltyN4 = function getPenaltyN4(data) {
        var darkCount = 0;
        var modulesCount = data.data.length;
        for (var i = 0; i < modulesCount; i++)
          darkCount += data.data[i];
        var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
        return k * PenaltyScores.N4;
      };
      function getMaskAt(maskPattern, i, j) {
        switch (maskPattern) {
          case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
          case exports.Patterns.PATTERN001:
            return i % 2 === 0;
          case exports.Patterns.PATTERN010:
            return j % 3 === 0;
          case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
          case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
          case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
          case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
          case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      }
      exports.applyMask = function applyMask(pattern, data) {
        var size = data.size;
        for (var col = 0; col < size; col++) {
          for (var row = 0; row < size; row++) {
            if (data.isReserved(row, col))
              continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
          }
        }
      };
      exports.getBestMask = function getBestMask(data, setupFormatFunc) {
        var numPatterns = Object.keys(exports.Patterns).length;
        var bestPattern = 0;
        var lowerPenalty = Infinity;
        for (var p = 0; p < numPatterns; p++) {
          setupFormatFunc(p);
          exports.applyMask(p, data);
          var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
          exports.applyMask(p, data);
          if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
          }
        }
        return bestPattern;
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-code.js
  var require_error_correction_code = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
      var ECLevel = require_error_correction_level();
      var EC_BLOCKS_TABLE = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        2,
        2,
        4,
        1,
        2,
        4,
        4,
        2,
        4,
        4,
        4,
        2,
        4,
        6,
        5,
        2,
        4,
        6,
        6,
        2,
        5,
        8,
        8,
        4,
        5,
        8,
        8,
        4,
        5,
        8,
        11,
        4,
        8,
        10,
        11,
        4,
        9,
        12,
        16,
        4,
        9,
        16,
        16,
        6,
        10,
        12,
        18,
        6,
        10,
        17,
        16,
        6,
        11,
        16,
        19,
        6,
        13,
        18,
        21,
        7,
        14,
        21,
        25,
        8,
        16,
        20,
        25,
        8,
        17,
        23,
        25,
        9,
        17,
        23,
        34,
        9,
        18,
        25,
        30,
        10,
        20,
        27,
        32,
        12,
        21,
        29,
        35,
        12,
        23,
        34,
        37,
        12,
        25,
        34,
        40,
        13,
        26,
        35,
        42,
        14,
        28,
        38,
        45,
        15,
        29,
        40,
        48,
        16,
        31,
        43,
        51,
        17,
        33,
        45,
        54,
        18,
        35,
        48,
        57,
        19,
        37,
        51,
        60,
        19,
        38,
        53,
        63,
        20,
        40,
        56,
        66,
        21,
        43,
        59,
        70,
        22,
        45,
        62,
        74,
        24,
        47,
        65,
        77,
        25,
        49,
        68,
        81
      ];
      var EC_CODEWORDS_TABLE = [
        7,
        10,
        13,
        17,
        10,
        16,
        22,
        28,
        15,
        26,
        36,
        44,
        20,
        36,
        52,
        64,
        26,
        48,
        72,
        88,
        36,
        64,
        96,
        112,
        40,
        72,
        108,
        130,
        48,
        88,
        132,
        156,
        60,
        110,
        160,
        192,
        72,
        130,
        192,
        224,
        80,
        150,
        224,
        264,
        96,
        176,
        260,
        308,
        104,
        198,
        288,
        352,
        120,
        216,
        320,
        384,
        132,
        240,
        360,
        432,
        144,
        280,
        408,
        480,
        168,
        308,
        448,
        532,
        180,
        338,
        504,
        588,
        196,
        364,
        546,
        650,
        224,
        416,
        600,
        700,
        224,
        442,
        644,
        750,
        252,
        476,
        690,
        816,
        270,
        504,
        750,
        900,
        300,
        560,
        810,
        960,
        312,
        588,
        870,
        1050,
        336,
        644,
        952,
        1110,
        360,
        700,
        1020,
        1200,
        390,
        728,
        1050,
        1260,
        420,
        784,
        1140,
        1350,
        450,
        812,
        1200,
        1440,
        480,
        868,
        1290,
        1530,
        510,
        924,
        1350,
        1620,
        540,
        980,
        1440,
        1710,
        570,
        1036,
        1530,
        1800,
        570,
        1064,
        1590,
        1890,
        600,
        1120,
        1680,
        1980,
        630,
        1204,
        1770,
        2100,
        660,
        1260,
        1860,
        2220,
        720,
        1316,
        1950,
        2310,
        750,
        1372,
        2040,
        2430
      ];
      exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
      exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/galois-field.js
  var require_galois_field = __commonJS({
    "node_modules/qrcode/lib/core/galois-field.js"(exports) {
      var BufferUtil = require_typedarray_buffer();
      var EXP_TABLE = BufferUtil.alloc(512);
      var LOG_TABLE = BufferUtil.alloc(256);
      (function initTables() {
        var x = 1;
        for (var i = 0; i < 255; i++) {
          EXP_TABLE[i] = x;
          LOG_TABLE[x] = i;
          x <<= 1;
          if (x & 256) {
            x ^= 285;
          }
        }
        for (i = 255; i < 512; i++) {
          EXP_TABLE[i] = EXP_TABLE[i - 255];
        }
      })();
      exports.log = function log(n) {
        if (n < 1)
          throw new Error("log(" + n + ")");
        return LOG_TABLE[n];
      };
      exports.exp = function exp(n) {
        return EXP_TABLE[n];
      };
      exports.mul = function mul(x, y) {
        if (x === 0 || y === 0)
          return 0;
        return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
      };
    }
  });

  // node_modules/qrcode/lib/core/polynomial.js
  var require_polynomial = __commonJS({
    "node_modules/qrcode/lib/core/polynomial.js"(exports) {
      var BufferUtil = require_typedarray_buffer();
      var GF = require_galois_field();
      exports.mul = function mul(p1, p2) {
        var coeff = BufferUtil.alloc(p1.length + p2.length - 1);
        for (var i = 0; i < p1.length; i++) {
          for (var j = 0; j < p2.length; j++) {
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
          }
        }
        return coeff;
      };
      exports.mod = function mod(divident, divisor) {
        var result = BufferUtil.from(divident);
        while (result.length - divisor.length >= 0) {
          var coeff = result[0];
          for (var i = 0; i < divisor.length; i++) {
            result[i] ^= GF.mul(divisor[i], coeff);
          }
          var offset = 0;
          while (offset < result.length && result[offset] === 0)
            offset++;
          result = result.slice(offset);
        }
        return result;
      };
      exports.generateECPolynomial = function generateECPolynomial(degree) {
        var poly = BufferUtil.from([1]);
        for (var i = 0; i < degree; i++) {
          poly = exports.mul(poly, [1, GF.exp(i)]);
        }
        return poly;
      };
    }
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1)
          validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer2;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
      }
      function typedArraySupport() {
        try {
          var arr = new Uint8Array(1);
          var proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this))
            return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this))
            return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        var buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError('The "string" argument must be of type string. Received type number');
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError('The "value" argument must not be of type number. Received type number');
        }
        var valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        var b = fromObject(value);
        if (b)
          return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        var length = byteLength(string, encoding) | 0;
        var buf = createBuffer(length);
        var actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        var length = array.length < 0 ? 0 : checked(array.length) | 0;
        var buf = createBuffer(length);
        for (var i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          var copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        var buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          var len = checked(obj.length) | 0;
          var buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array))
          a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array))
          b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer2.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              Buffer2.from(buf).copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(buffer, buf, pos);
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
        }
        var len = string.length;
        var mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0)
          return 0;
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        var loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding)
          encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m) {
        var i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        var length = this.length;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        var str = "";
        var max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max)
          str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0)
          return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0)
          byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir)
            return -1;
          else
            byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir)
            byteOffset = 0;
          else
            return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        var indexSize = 1;
        var arrLength = arr.length;
        var valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        var i;
        if (dir) {
          var foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1)
                foundIndex = i;
              if (i - foundIndex + 1 === valLength)
                return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1)
                i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength)
            byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            var found = true;
            for (var j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found)
              return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; ++i) {
          var parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed))
            return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        var res = [];
        var i = start;
        while (i < end) {
          var firstByte = buf[i];
          var codePoint = null;
          var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        var len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        var res = "";
        var i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        var ret = "";
        end = Math.min(buf.length, end);
        for (var i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        var len = buf.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        var out = "";
        for (var i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = "";
        for (var i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0)
          throw new RangeError("offset is not uint");
        if (offset + ext > length)
          throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer2.isBuffer(buf))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min)
          throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length)
          throw new RangeError("Index out of range");
        if (offset < 0)
          throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target))
          throw new TypeError("argument should be a Buffer");
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("Index out of range");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          var len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2)
          return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        var codePoint;
        var length = string.length;
        var leadSurrogate = null;
        var bytes = [];
        for (var i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1)
                  bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0)
              break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0)
              break;
            bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0)
              break;
            bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0)
              break;
            bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0)
            break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        for (var i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length)
            break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        var alphabet = "0123456789abcdef";
        var table = new Array(256);
        for (var i = 0; i < 16; ++i) {
          var i16 = i * 16;
          for (var j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
    }
  });

  // node_modules/qrcode/lib/core/reed-solomon-encoder.js
  var require_reed_solomon_encoder = __commonJS({
    "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
      var BufferUtil = require_typedarray_buffer();
      var Polynomial = require_polynomial();
      var Buffer2 = require_buffer().Buffer;
      function ReedSolomonEncoder(degree) {
        this.genPoly = void 0;
        this.degree = degree;
        if (this.degree)
          this.initialize(this.degree);
      }
      ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
        this.degree = degree;
        this.genPoly = Polynomial.generateECPolynomial(this.degree);
      };
      ReedSolomonEncoder.prototype.encode = function encode(data) {
        if (!this.genPoly) {
          throw new Error("Encoder not initialized");
        }
        var pad = BufferUtil.alloc(this.degree);
        var paddedData = Buffer2.concat([data, pad], data.length + this.degree);
        var remainder = Polynomial.mod(paddedData, this.genPoly);
        var start = this.degree - remainder.length;
        if (start > 0) {
          var buff = BufferUtil.alloc(this.degree);
          remainder.copy(buff, start);
          return buff;
        }
        return remainder;
      };
      module.exports = ReedSolomonEncoder;
    }
  });

  // node_modules/qrcode/lib/core/version-check.js
  var require_version_check = __commonJS({
    "node_modules/qrcode/lib/core/version-check.js"(exports) {
      exports.isValid = function isValid(version) {
        return !isNaN(version) && version >= 1 && version <= 40;
      };
    }
  });

  // node_modules/qrcode/lib/core/regex.js
  var require_regex = __commonJS({
    "node_modules/qrcode/lib/core/regex.js"(exports) {
      var numeric = "[0-9]+";
      var alphanumeric = "[A-Z $%*+\\-./:]+";
      var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
      kanji = kanji.replace(/u/g, "\\u");
      var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
      exports.KANJI = new RegExp(kanji, "g");
      exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
      exports.BYTE = new RegExp(byte, "g");
      exports.NUMERIC = new RegExp(numeric, "g");
      exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
      var TEST_KANJI = new RegExp("^" + kanji + "$");
      var TEST_NUMERIC = new RegExp("^" + numeric + "$");
      var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
      exports.testKanji = function testKanji(str) {
        return TEST_KANJI.test(str);
      };
      exports.testNumeric = function testNumeric(str) {
        return TEST_NUMERIC.test(str);
      };
      exports.testAlphanumeric = function testAlphanumeric(str) {
        return TEST_ALPHANUMERIC.test(str);
      };
    }
  });

  // node_modules/qrcode/lib/core/mode.js
  var require_mode = __commonJS({
    "node_modules/qrcode/lib/core/mode.js"(exports) {
      var VersionCheck = require_version_check();
      var Regex = require_regex();
      exports.NUMERIC = {
        id: "Numeric",
        bit: 1 << 0,
        ccBits: [10, 12, 14]
      };
      exports.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 1 << 1,
        ccBits: [9, 11, 13]
      };
      exports.BYTE = {
        id: "Byte",
        bit: 1 << 2,
        ccBits: [8, 16, 16]
      };
      exports.KANJI = {
        id: "Kanji",
        bit: 1 << 3,
        ccBits: [8, 10, 12]
      };
      exports.MIXED = {
        bit: -1
      };
      exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
        if (!mode.ccBits)
          throw new Error("Invalid mode: " + mode);
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid version: " + version);
        }
        if (version >= 1 && version < 10)
          return mode.ccBits[0];
        else if (version < 27)
          return mode.ccBits[1];
        return mode.ccBits[2];
      };
      exports.getBestModeForData = function getBestModeForData(dataStr) {
        if (Regex.testNumeric(dataStr))
          return exports.NUMERIC;
        else if (Regex.testAlphanumeric(dataStr))
          return exports.ALPHANUMERIC;
        else if (Regex.testKanji(dataStr))
          return exports.KANJI;
        else
          return exports.BYTE;
      };
      exports.toString = function toString(mode) {
        if (mode && mode.id)
          return mode.id;
        throw new Error("Invalid mode");
      };
      exports.isValid = function isValid(mode) {
        return mode && mode.bit && mode.ccBits;
      };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        var lcStr = string.toLowerCase();
        switch (lcStr) {
          case "numeric":
            return exports.NUMERIC;
          case "alphanumeric":
            return exports.ALPHANUMERIC;
          case "kanji":
            return exports.KANJI;
          case "byte":
            return exports.BYTE;
          default:
            throw new Error("Unknown mode: " + string);
        }
      }
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/version.js
  var require_version = __commonJS({
    "node_modules/qrcode/lib/core/version.js"(exports) {
      var Utils = require_utils();
      var ECCode = require_error_correction_code();
      var ECLevel = require_error_correction_level();
      var Mode = require_mode();
      var VersionCheck = require_version_check();
      var isArray = require_isarray();
      var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
      var G18_BCH = Utils.getBCHDigit(G18);
      function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
        for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      function getReservedBitsCount(mode, version) {
        return Mode.getCharCountIndicator(mode, version) + 4;
      }
      function getTotalBitsFromDataArray(segments, version) {
        var totalBits = 0;
        segments.forEach(function(data) {
          var reservedBits = getReservedBitsCount(data.mode, version);
          totalBits += reservedBits + data.getBitsLength();
        });
        return totalBits;
      }
      function getBestVersionForMixedData(segments, errorCorrectionLevel) {
        for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
          var length = getTotalBitsFromDataArray(segments, currentVersion);
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      exports.from = function from(value, defaultValue) {
        if (VersionCheck.isValid(value)) {
          return parseInt(value, 10);
        }
        return defaultValue;
      };
      exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid QR Code version");
        }
        if (typeof mode === "undefined")
          mode = Mode.BYTE;
        var totalCodewords = Utils.getSymbolTotalCodewords(version);
        var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (mode === Mode.MIXED)
          return dataTotalCodewordsBits;
        var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
        switch (mode) {
          case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
          case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
          case Mode.KANJI:
            return Math.floor(usableBits / 13);
          case Mode.BYTE:
          default:
            return Math.floor(usableBits / 8);
        }
      };
      exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
        var seg;
        var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
        if (isArray(data)) {
          if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
          }
          if (data.length === 0) {
            return 1;
          }
          seg = data[0];
        } else {
          seg = data;
        }
        return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
      };
      exports.getEncodedBits = function getEncodedBits(version) {
        if (!VersionCheck.isValid(version) || version < 7) {
          throw new Error("Invalid QR Code version");
        }
        var d = version << 12;
        while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
          d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
        }
        return version << 12 | d;
      };
    }
  });

  // node_modules/qrcode/lib/core/format-info.js
  var require_format_info = __commonJS({
    "node_modules/qrcode/lib/core/format-info.js"(exports) {
      var Utils = require_utils();
      var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
      var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
      var G15_BCH = Utils.getBCHDigit(G15);
      exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
        var data = errorCorrectionLevel.bit << 3 | mask;
        var d = data << 10;
        while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
          d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
        }
        return (data << 10 | d) ^ G15_MASK;
      };
    }
  });

  // node_modules/qrcode/lib/core/numeric-data.js
  var require_numeric_data = __commonJS({
    "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
      var Mode = require_mode();
      function NumericData(data) {
        this.mode = Mode.NUMERIC;
        this.data = data.toString();
      }
      NumericData.getBitsLength = function getBitsLength(length) {
        return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
      };
      NumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      NumericData.prototype.getBitsLength = function getBitsLength() {
        return NumericData.getBitsLength(this.data.length);
      };
      NumericData.prototype.write = function write(bitBuffer) {
        var i, group, value;
        for (i = 0; i + 3 <= this.data.length; i += 3) {
          group = this.data.substr(i, 3);
          value = parseInt(group, 10);
          bitBuffer.put(value, 10);
        }
        var remainingNum = this.data.length - i;
        if (remainingNum > 0) {
          group = this.data.substr(i);
          value = parseInt(group, 10);
          bitBuffer.put(value, remainingNum * 3 + 1);
        }
      };
      module.exports = NumericData;
    }
  });

  // node_modules/qrcode/lib/core/alphanumeric-data.js
  var require_alphanumeric_data = __commonJS({
    "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
      var Mode = require_mode();
      var ALPHA_NUM_CHARS = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":"
      ];
      function AlphanumericData(data) {
        this.mode = Mode.ALPHANUMERIC;
        this.data = data;
      }
      AlphanumericData.getBitsLength = function getBitsLength(length) {
        return 11 * Math.floor(length / 2) + 6 * (length % 2);
      };
      AlphanumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      AlphanumericData.prototype.getBitsLength = function getBitsLength() {
        return AlphanumericData.getBitsLength(this.data.length);
      };
      AlphanumericData.prototype.write = function write(bitBuffer) {
        var i;
        for (i = 0; i + 2 <= this.data.length; i += 2) {
          var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
          value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
          bitBuffer.put(value, 11);
        }
        if (this.data.length % 2) {
          bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
        }
      };
      module.exports = AlphanumericData;
    }
  });

  // node_modules/qrcode/lib/core/byte-data.js
  var require_byte_data = __commonJS({
    "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
      var BufferUtil = require_typedarray_buffer();
      var Mode = require_mode();
      function ByteData(data) {
        this.mode = Mode.BYTE;
        this.data = BufferUtil.from(data);
      }
      ByteData.getBitsLength = function getBitsLength(length) {
        return length * 8;
      };
      ByteData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      ByteData.prototype.getBitsLength = function getBitsLength() {
        return ByteData.getBitsLength(this.data.length);
      };
      ByteData.prototype.write = function(bitBuffer) {
        for (var i = 0, l = this.data.length; i < l; i++) {
          bitBuffer.put(this.data[i], 8);
        }
      };
      module.exports = ByteData;
    }
  });

  // node_modules/qrcode/lib/core/kanji-data.js
  var require_kanji_data = __commonJS({
    "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
      var Mode = require_mode();
      var Utils = require_utils();
      function KanjiData(data) {
        this.mode = Mode.KANJI;
        this.data = data;
      }
      KanjiData.getBitsLength = function getBitsLength(length) {
        return length * 13;
      };
      KanjiData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      KanjiData.prototype.getBitsLength = function getBitsLength() {
        return KanjiData.getBitsLength(this.data.length);
      };
      KanjiData.prototype.write = function(bitBuffer) {
        var i;
        for (i = 0; i < this.data.length; i++) {
          var value = Utils.toSJIS(this.data[i]);
          if (value >= 33088 && value <= 40956) {
            value -= 33088;
          } else if (value >= 57408 && value <= 60351) {
            value -= 49472;
          } else {
            throw new Error("Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8");
          }
          value = (value >>> 8 & 255) * 192 + (value & 255);
          bitBuffer.put(value, 13);
        }
      };
      module.exports = KanjiData;
    }
  });

  // node_modules/dijkstrajs/dijkstra.js
  var require_dijkstra = __commonJS({
    "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
      "use strict";
      var dijkstra = {
        single_source_shortest_paths: function(graph, s, d) {
          var predecessors = {};
          var costs = {};
          costs[s] = 0;
          var open = dijkstra.PriorityQueue.make();
          open.push(s, 0);
          var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
          while (!open.empty()) {
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            adjacent_nodes = graph[u] || {};
            for (v in adjacent_nodes) {
              if (adjacent_nodes.hasOwnProperty(v)) {
                cost_of_e = adjacent_nodes[v];
                cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                cost_of_s_to_v = costs[v];
                first_visit = typeof costs[v] === "undefined";
                if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                  costs[v] = cost_of_s_to_u_plus_cost_of_e;
                  open.push(v, cost_of_s_to_u_plus_cost_of_e);
                  predecessors[v] = u;
                }
              }
            }
          }
          if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
            var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
            throw new Error(msg);
          }
          return predecessors;
        },
        extract_shortest_path_from_predecessor_list: function(predecessors, d) {
          var nodes = [];
          var u = d;
          var predecessor;
          while (u) {
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
          }
          nodes.reverse();
          return nodes;
        },
        find_path: function(graph, s, d) {
          var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
          return dijkstra.extract_shortest_path_from_predecessor_list(predecessors, d);
        },
        PriorityQueue: {
          make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for (key in T) {
              if (T.hasOwnProperty(key)) {
                t[key] = T[key];
              }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
          },
          default_sorter: function(a, b) {
            return a.cost - b.cost;
          },
          push: function(value, cost) {
            var item = { value, cost };
            this.queue.push(item);
            this.queue.sort(this.sorter);
          },
          pop: function() {
            return this.queue.shift();
          },
          empty: function() {
            return this.queue.length === 0;
          }
        }
      };
      if (typeof module !== "undefined") {
        module.exports = dijkstra;
      }
    }
  });

  // node_modules/qrcode/lib/core/segments.js
  var require_segments = __commonJS({
    "node_modules/qrcode/lib/core/segments.js"(exports) {
      var Mode = require_mode();
      var NumericData = require_numeric_data();
      var AlphanumericData = require_alphanumeric_data();
      var ByteData = require_byte_data();
      var KanjiData = require_kanji_data();
      var Regex = require_regex();
      var Utils = require_utils();
      var dijkstra = require_dijkstra();
      function getStringByteLength(str) {
        return unescape(encodeURIComponent(str)).length;
      }
      function getSegments(regex, mode, str) {
        var segments = [];
        var result;
        while ((result = regex.exec(str)) !== null) {
          segments.push({
            data: result[0],
            index: result.index,
            mode,
            length: result[0].length
          });
        }
        return segments;
      }
      function getSegmentsFromString(dataStr) {
        var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
        var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
        var byteSegs;
        var kanjiSegs;
        if (Utils.isKanjiModeEnabled()) {
          byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
          kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
        } else {
          byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
          kanjiSegs = [];
        }
        var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
        return segs.sort(function(s1, s2) {
          return s1.index - s2.index;
        }).map(function(obj) {
          return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
          };
        });
      }
      function getSegmentBitsLength(length, mode) {
        switch (mode) {
          case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
          case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
          case Mode.KANJI:
            return KanjiData.getBitsLength(length);
          case Mode.BYTE:
            return ByteData.getBitsLength(length);
        }
      }
      function mergeSegments(segs) {
        return segs.reduce(function(acc, curr) {
          var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
          if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
          }
          acc.push(curr);
          return acc;
        }, []);
      }
      function buildNodes(segs) {
        var nodes = [];
        for (var i = 0; i < segs.length; i++) {
          var seg = segs[i];
          switch (seg.mode) {
            case Mode.NUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.ALPHANUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.KANJI:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
              break;
            case Mode.BYTE:
              nodes.push([
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
          }
        }
        return nodes;
      }
      function buildGraph(nodes, version) {
        var table = {};
        var graph = { "start": {} };
        var prevNodeIds = ["start"];
        for (var i = 0; i < nodes.length; i++) {
          var nodeGroup = nodes[i];
          var currentNodeIds = [];
          for (var j = 0; j < nodeGroup.length; j++) {
            var node = nodeGroup[j];
            var key = "" + i + j;
            currentNodeIds.push(key);
            table[key] = { node, lastCount: 0 };
            graph[key] = {};
            for (var n = 0; n < prevNodeIds.length; n++) {
              var prevNodeId = prevNodeIds[n];
              if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                table[prevNodeId].lastCount += node.length;
              } else {
                if (table[prevNodeId])
                  table[prevNodeId].lastCount = node.length;
                graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
              }
            }
          }
          prevNodeIds = currentNodeIds;
        }
        for (n = 0; n < prevNodeIds.length; n++) {
          graph[prevNodeIds[n]]["end"] = 0;
        }
        return { map: graph, table };
      }
      function buildSingleSegment(data, modesHint) {
        var mode;
        var bestMode = Mode.getBestModeForData(data);
        mode = Mode.from(modesHint, bestMode);
        if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
          throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
        }
        if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
          mode = Mode.BYTE;
        }
        switch (mode) {
          case Mode.NUMERIC:
            return new NumericData(data);
          case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
          case Mode.KANJI:
            return new KanjiData(data);
          case Mode.BYTE:
            return new ByteData(data);
        }
      }
      exports.fromArray = function fromArray(array) {
        return array.reduce(function(acc, seg) {
          if (typeof seg === "string") {
            acc.push(buildSingleSegment(seg, null));
          } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
          }
          return acc;
        }, []);
      };
      exports.fromString = function fromString(data, version) {
        var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
        var nodes = buildNodes(segs);
        var graph = buildGraph(nodes, version);
        var path = dijkstra.find_path(graph.map, "start", "end");
        var optimizedSegs = [];
        for (var i = 1; i < path.length - 1; i++) {
          optimizedSegs.push(graph.table[path[i]].node);
        }
        return exports.fromArray(mergeSegments(optimizedSegs));
      };
      exports.rawSplit = function rawSplit(data) {
        return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
      };
    }
  });

  // node_modules/qrcode/lib/core/qrcode.js
  var require_qrcode = __commonJS({
    "node_modules/qrcode/lib/core/qrcode.js"(exports) {
      var BufferUtil = require_typedarray_buffer();
      var Utils = require_utils();
      var ECLevel = require_error_correction_level();
      var BitBuffer = require_bit_buffer();
      var BitMatrix = require_bit_matrix();
      var AlignmentPattern = require_alignment_pattern();
      var FinderPattern = require_finder_pattern();
      var MaskPattern = require_mask_pattern();
      var ECCode = require_error_correction_code();
      var ReedSolomonEncoder = require_reed_solomon_encoder();
      var Version = require_version();
      var FormatInfo = require_format_info();
      var Mode = require_mode();
      var Segments = require_segments();
      var isArray = require_isarray();
      function setupFinderPattern(matrix, version) {
        var size = matrix.size;
        var pos = FinderPattern.getPositions(version);
        for (var i = 0; i < pos.length; i++) {
          var row = pos[i][0];
          var col = pos[i][1];
          for (var r = -1; r <= 7; r++) {
            if (row + r <= -1 || size <= row + r)
              continue;
            for (var c = -1; c <= 7; c++) {
              if (col + c <= -1 || size <= col + c)
                continue;
              if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                matrix.set(row + r, col + c, true, true);
              } else {
                matrix.set(row + r, col + c, false, true);
              }
            }
          }
        }
      }
      function setupTimingPattern(matrix) {
        var size = matrix.size;
        for (var r = 8; r < size - 8; r++) {
          var value = r % 2 === 0;
          matrix.set(r, 6, value, true);
          matrix.set(6, r, value, true);
        }
      }
      function setupAlignmentPattern(matrix, version) {
        var pos = AlignmentPattern.getPositions(version);
        for (var i = 0; i < pos.length; i++) {
          var row = pos[i][0];
          var col = pos[i][1];
          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                matrix.set(row + r, col + c, true, true);
              } else {
                matrix.set(row + r, col + c, false, true);
              }
            }
          }
        }
      }
      function setupVersionInfo(matrix, version) {
        var size = matrix.size;
        var bits = Version.getEncodedBits(version);
        var row, col, mod;
        for (var i = 0; i < 18; i++) {
          row = Math.floor(i / 3);
          col = i % 3 + size - 8 - 3;
          mod = (bits >> i & 1) === 1;
          matrix.set(row, col, mod, true);
          matrix.set(col, row, mod, true);
        }
      }
      function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
        var size = matrix.size;
        var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
        var i, mod;
        for (i = 0; i < 15; i++) {
          mod = (bits >> i & 1) === 1;
          if (i < 6) {
            matrix.set(i, 8, mod, true);
          } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
          } else {
            matrix.set(size - 15 + i, 8, mod, true);
          }
          if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
          } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
          } else {
            matrix.set(8, 15 - i - 1, mod, true);
          }
        }
        matrix.set(size - 8, 8, 1, true);
      }
      function setupData(matrix, data) {
        var size = matrix.size;
        var inc = -1;
        var row = size - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for (var col = size - 1; col > 0; col -= 2) {
          if (col === 6)
            col--;
          while (true) {
            for (var c = 0; c < 2; c++) {
              if (!matrix.isReserved(row, col - c)) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                }
                matrix.set(row, col - c, dark);
                bitIndex--;
                if (bitIndex === -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || size <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
      function createData(version, errorCorrectionLevel, segments) {
        var buffer = new BitBuffer();
        segments.forEach(function(data) {
          buffer.put(data.mode.bit, 4);
          buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
          data.write(buffer);
        });
        var totalCodewords = Utils.getSymbolTotalCodewords(version);
        var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
          buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 !== 0) {
          buffer.putBit(0);
        }
        var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
        for (var i = 0; i < remainingByte; i++) {
          buffer.put(i % 2 ? 17 : 236, 8);
        }
        return createCodewords(buffer, version, errorCorrectionLevel);
      }
      function createCodewords(bitBuffer, version, errorCorrectionLevel) {
        var totalCodewords = Utils.getSymbolTotalCodewords(version);
        var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        var dataTotalCodewords = totalCodewords - ecTotalCodewords;
        var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
        var blocksInGroup2 = totalCodewords % ecTotalBlocks;
        var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
        var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
        var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
        var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
        var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
        var rs = new ReedSolomonEncoder(ecCount);
        var offset = 0;
        var dcData = new Array(ecTotalBlocks);
        var ecData = new Array(ecTotalBlocks);
        var maxDataSize = 0;
        var buffer = BufferUtil.from(bitBuffer.buffer);
        for (var b = 0; b < ecTotalBlocks; b++) {
          var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
          dcData[b] = buffer.slice(offset, offset + dataSize);
          ecData[b] = rs.encode(dcData[b]);
          offset += dataSize;
          maxDataSize = Math.max(maxDataSize, dataSize);
        }
        var data = BufferUtil.alloc(totalCodewords);
        var index = 0;
        var i, r;
        for (i = 0; i < maxDataSize; i++) {
          for (r = 0; r < ecTotalBlocks; r++) {
            if (i < dcData[r].length) {
              data[index++] = dcData[r][i];
            }
          }
        }
        for (i = 0; i < ecCount; i++) {
          for (r = 0; r < ecTotalBlocks; r++) {
            data[index++] = ecData[r][i];
          }
        }
        return data;
      }
      function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
        var segments;
        if (isArray(data)) {
          segments = Segments.fromArray(data);
        } else if (typeof data === "string") {
          var estimatedVersion = version;
          if (!estimatedVersion) {
            var rawSegments = Segments.rawSplit(data);
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
          }
          segments = Segments.fromString(data, estimatedVersion || 40);
        } else {
          throw new Error("Invalid data");
        }
        var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
        if (!bestVersion) {
          throw new Error("The amount of data is too big to be stored in a QR Code");
        }
        if (!version) {
          version = bestVersion;
        } else if (version < bestVersion) {
          throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n");
        }
        var dataBits = createData(version, errorCorrectionLevel, segments);
        var moduleCount = Utils.getSymbolSize(version);
        var modules = new BitMatrix(moduleCount);
        setupFinderPattern(modules, version);
        setupTimingPattern(modules);
        setupAlignmentPattern(modules, version);
        setupFormatInfo(modules, errorCorrectionLevel, 0);
        if (version >= 7) {
          setupVersionInfo(modules, version);
        }
        setupData(modules, dataBits);
        if (isNaN(maskPattern)) {
          maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
        }
        MaskPattern.applyMask(maskPattern, modules);
        setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
        return {
          modules,
          version,
          errorCorrectionLevel,
          maskPattern,
          segments
        };
      }
      exports.create = function create(data, options) {
        if (typeof data === "undefined" || data === "") {
          throw new Error("No input text");
        }
        var errorCorrectionLevel = ECLevel.M;
        var version;
        var mask;
        if (typeof options !== "undefined") {
          errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
          version = Version.from(options.version);
          mask = MaskPattern.from(options.maskPattern);
          if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
          }
        }
        return createSymbol(data, version, errorCorrectionLevel, mask);
      };
    }
  });

  // node_modules/qrcode/lib/renderer/utils.js
  var require_utils2 = __commonJS({
    "node_modules/qrcode/lib/renderer/utils.js"(exports) {
      function hex2rgba(hex) {
        if (typeof hex === "number") {
          hex = hex.toString();
        }
        if (typeof hex !== "string") {
          throw new Error("Color should be defined as hex string");
        }
        var hexCode = hex.slice().replace("#", "").split("");
        if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
          throw new Error("Invalid hex color: " + hex);
        }
        if (hexCode.length === 3 || hexCode.length === 4) {
          hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
            return [c, c];
          }));
        }
        if (hexCode.length === 6)
          hexCode.push("F", "F");
        var hexValue = parseInt(hexCode.join(""), 16);
        return {
          r: hexValue >> 24 & 255,
          g: hexValue >> 16 & 255,
          b: hexValue >> 8 & 255,
          a: hexValue & 255,
          hex: "#" + hexCode.slice(0, 6).join("")
        };
      }
      exports.getOptions = function getOptions(options) {
        if (!options)
          options = {};
        if (!options.color)
          options.color = {};
        var margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
        var width = options.width && options.width >= 21 ? options.width : void 0;
        var scale = options.scale || 4;
        return {
          width,
          scale: width ? 4 : scale,
          margin,
          color: {
            dark: hex2rgba(options.color.dark || "#000000ff"),
            light: hex2rgba(options.color.light || "#ffffffff")
          },
          type: options.type,
          rendererOpts: options.rendererOpts || {}
        };
      };
      exports.getScale = function getScale(qrSize, opts) {
        return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
      };
      exports.getImageWidth = function getImageWidth(qrSize, opts) {
        var scale = exports.getScale(qrSize, opts);
        return Math.floor((qrSize + opts.margin * 2) * scale);
      };
      exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
        var size = qr.modules.size;
        var data = qr.modules.data;
        var scale = exports.getScale(size, opts);
        var symbolSize = Math.floor((size + opts.margin * 2) * scale);
        var scaledMargin = opts.margin * scale;
        var palette = [opts.color.light, opts.color.dark];
        for (var i = 0; i < symbolSize; i++) {
          for (var j = 0; j < symbolSize; j++) {
            var posDst = (i * symbolSize + j) * 4;
            var pxColor = opts.color.light;
            if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
              var iSrc = Math.floor((i - scaledMargin) / scale);
              var jSrc = Math.floor((j - scaledMargin) / scale);
              pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
          }
        }
      };
    }
  });

  // node_modules/qrcode/lib/renderer/canvas.js
  var require_canvas = __commonJS({
    "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
      var Utils = require_utils2();
      function clearCanvas(ctx, canvas, size) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!canvas.style)
          canvas.style = {};
        canvas.height = size;
        canvas.width = size;
        canvas.style.height = size + "px";
        canvas.style.width = size + "px";
      }
      function getCanvasElement() {
        try {
          return document.createElement("canvas");
        } catch (e) {
          throw new Error("You need to specify a canvas element");
        }
      }
      exports.render = function render(qrData, canvas, options) {
        var opts = options;
        var canvasEl = canvas;
        if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
          opts = canvas;
          canvas = void 0;
        }
        if (!canvas) {
          canvasEl = getCanvasElement();
        }
        opts = Utils.getOptions(opts);
        var size = Utils.getImageWidth(qrData.modules.size, opts);
        var ctx = canvasEl.getContext("2d");
        var image = ctx.createImageData(size, size);
        Utils.qrToImageData(image.data, qrData, opts);
        clearCanvas(ctx, canvasEl, size);
        ctx.putImageData(image, 0, 0);
        return canvasEl;
      };
      exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
        var opts = options;
        if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
          opts = canvas;
          canvas = void 0;
        }
        if (!opts)
          opts = {};
        var canvasEl = exports.render(qrData, canvas, opts);
        var type = opts.type || "image/png";
        var rendererOpts = opts.rendererOpts || {};
        return canvasEl.toDataURL(type, rendererOpts.quality);
      };
    }
  });

  // node_modules/qrcode/lib/renderer/svg-tag.js
  var require_svg_tag = __commonJS({
    "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
      var Utils = require_utils2();
      function getColorAttrib(color, attrib) {
        var alpha = color.a / 255;
        var str = attrib + '="' + color.hex + '"';
        return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
      }
      function svgCmd(cmd, x, y) {
        var str = cmd + x;
        if (typeof y !== "undefined")
          str += " " + y;
        return str;
      }
      function qrToPath(data, size, margin) {
        var path = "";
        var moveBy = 0;
        var newRow = false;
        var lineLength = 0;
        for (var i = 0; i < data.length; i++) {
          var col = Math.floor(i % size);
          var row = Math.floor(i / size);
          if (!col && !newRow)
            newRow = true;
          if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
              path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
              moveBy = 0;
              newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
              path += svgCmd("h", lineLength);
              lineLength = 0;
            }
          } else {
            moveBy++;
          }
        }
        return path;
      }
      exports.render = function render(qrData, options, cb) {
        var opts = Utils.getOptions(options);
        var size = qrData.modules.size;
        var data = qrData.modules.data;
        var qrcodesize = size + opts.margin * 2;
        var bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
        var path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
        var viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
        var width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
        var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
        if (typeof cb === "function") {
          cb(null, svgTag);
        }
        return svgTag;
      };
    }
  });

  // node_modules/qrcode/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/qrcode/lib/browser.js"(exports) {
      var canPromise = require_can_promise();
      var QRCode2 = require_qrcode();
      var CanvasRenderer = require_canvas();
      var SvgRenderer = require_svg_tag();
      function renderCanvas(renderFunc, canvas, text, opts, cb) {
        var args = [].slice.call(arguments, 1);
        var argsNum = args.length;
        var isLastArgCb = typeof args[argsNum - 1] === "function";
        if (!isLastArgCb && !canPromise()) {
          throw new Error("Callback required as last argument");
        }
        if (isLastArgCb) {
          if (argsNum < 2) {
            throw new Error("Too few arguments provided");
          }
          if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = void 0;
          } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === "undefined") {
              cb = opts;
              opts = void 0;
            } else {
              cb = opts;
              opts = text;
              text = canvas;
              canvas = void 0;
            }
          }
        } else {
          if (argsNum < 1) {
            throw new Error("Too few arguments provided");
          }
          if (argsNum === 1) {
            text = canvas;
            canvas = opts = void 0;
          } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = void 0;
          }
          return new Promise(function(resolve, reject) {
            try {
              var data2 = QRCode2.create(text, opts);
              resolve(renderFunc(data2, canvas, opts));
            } catch (e) {
              reject(e);
            }
          });
        }
        try {
          var data = QRCode2.create(text, opts);
          cb(null, renderFunc(data, canvas, opts));
        } catch (e) {
          cb(e);
        }
      }
      exports.create = QRCode2.create;
      exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
      exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
      exports.toString = renderCanvas.bind(null, function(data, _, opts) {
        return SvgRenderer.render(data, opts);
      });
    }
  });

  // node_modules/parseuri/index.js
  var require_parseuri = __commonJS({
    "node_modules/parseuri/index.js"(exports, module) {
      var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
      var parts = [
        "source",
        "protocol",
        "authority",
        "userInfo",
        "user",
        "password",
        "host",
        "port",
        "relative",
        "path",
        "directory",
        "file",
        "query",
        "anchor"
      ];
      module.exports = function parseuri(str) {
        var src = str, b = str.indexOf("["), e = str.indexOf("]");
        if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
        }
        var m = re.exec(str || ""), uri = {}, i = 14;
        while (i--) {
          uri[parts[i]] = m[i] || "";
        }
        if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
          uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
          uri.ipv6uri = true;
        }
        uri.pathNames = pathNames(uri, uri["path"]);
        uri.queryKey = queryKey(uri, uri["query"]);
        return uri;
      };
      function pathNames(obj, path) {
        var regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
        if (path.substr(0, 1) == "/" || path.length === 0) {
          names.splice(0, 1);
        }
        if (path.substr(path.length - 1, 1) == "/") {
          names.splice(names.length - 1, 1);
        }
        return names;
      }
      function queryKey(uri, query) {
        var data = {};
        query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
          if ($1) {
            data[$1] = $2;
          }
        });
        return data;
      }
    }
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // node_modules/debug/src/common.js
  var require_common = __commonJS({
    "node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          if (name[name.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // node_modules/debug/src/browser.js
  var require_browser2 = __commonJS({
    "node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // node_modules/socket.io-client/build/url.js
  var require_url = __commonJS({
    "node_modules/socket.io-client/build/url.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.url = void 0;
      var parseuri = require_parseuri();
      var debug = require_browser2()("socket.io-client:url");
      function url(uri, path = "", loc) {
        let obj = uri;
        loc = loc || typeof location !== "undefined" && location;
        if (uri == null)
          uri = loc.protocol + "//" + loc.host;
        if (typeof uri === "string") {
          if (uri.charAt(0) === "/") {
            if (uri.charAt(1) === "/") {
              uri = loc.protocol + uri;
            } else {
              uri = loc.host + uri;
            }
          }
          if (!/^(https?|wss?):\/\//.test(uri)) {
            debug("protocol-less url %s", uri);
            if (typeof loc !== "undefined") {
              uri = loc.protocol + "//" + uri;
            } else {
              uri = "https://" + uri;
            }
          }
          debug("parse %s", uri);
          obj = parseuri(uri);
        }
        if (!obj.port) {
          if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
          } else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
          }
        }
        obj.path = obj.path || "/";
        const ipv6 = obj.host.indexOf(":") !== -1;
        const host = ipv6 ? "[" + obj.host + "]" : obj.host;
        obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
        obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
        return obj;
      }
      exports.url = url;
    }
  });

  // node_modules/has-cors/index.js
  var require_has_cors = __commonJS({
    "node_modules/has-cors/index.js"(exports, module) {
      try {
        module.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
      } catch (err) {
        module.exports = false;
      }
    }
  });

  // node_modules/engine.io-client/lib/globalThis.browser.js
  var require_globalThis_browser = __commonJS({
    "node_modules/engine.io-client/lib/globalThis.browser.js"(exports, module) {
      module.exports = (() => {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else {
          return Function("return this")();
        }
      })();
    }
  });

  // node_modules/engine.io-client/lib/xmlhttprequest.js
  var require_xmlhttprequest = __commonJS({
    "node_modules/engine.io-client/lib/xmlhttprequest.js"(exports, module) {
      var hasCORS = require_has_cors();
      var globalThis = require_globalThis_browser();
      module.exports = function(opts) {
        const xdomain = opts.xdomain;
        const xscheme = opts.xscheme;
        const enablesXDR = opts.enablesXDR;
        try {
          if (typeof XMLHttpRequest !== "undefined" && (!xdomain || hasCORS)) {
            return new XMLHttpRequest();
          }
        } catch (e) {
        }
        try {
          if (typeof XDomainRequest !== "undefined" && !xscheme && enablesXDR) {
            return new XDomainRequest();
          }
        } catch (e) {
        }
        if (!xdomain) {
          try {
            return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
          } catch (e) {
          }
        }
      };
    }
  });

  // node_modules/engine.io-parser/lib/commons.js
  var require_commons = __commonJS({
    "node_modules/engine.io-parser/lib/commons.js"(exports, module) {
      var PACKET_TYPES = Object.create(null);
      PACKET_TYPES["open"] = "0";
      PACKET_TYPES["close"] = "1";
      PACKET_TYPES["ping"] = "2";
      PACKET_TYPES["pong"] = "3";
      PACKET_TYPES["message"] = "4";
      PACKET_TYPES["upgrade"] = "5";
      PACKET_TYPES["noop"] = "6";
      var PACKET_TYPES_REVERSE = Object.create(null);
      Object.keys(PACKET_TYPES).forEach((key) => {
        PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
      });
      var ERROR_PACKET = { type: "error", data: "parser error" };
      module.exports = {
        PACKET_TYPES,
        PACKET_TYPES_REVERSE,
        ERROR_PACKET
      };
    }
  });

  // node_modules/engine.io-parser/lib/encodePacket.browser.js
  var require_encodePacket_browser = __commonJS({
    "node_modules/engine.io-parser/lib/encodePacket.browser.js"(exports, module) {
      var { PACKET_TYPES } = require_commons();
      var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
      var withNativeArrayBuffer = typeof ArrayBuffer === "function";
      var isView = (obj) => {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
      };
      var encodePacket = ({ type, data }, supportsBinary, callback) => {
        if (withNativeBlob && data instanceof Blob) {
          if (supportsBinary) {
            return callback(data);
          } else {
            return encodeBlobAsBase64(data, callback);
          }
        } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
          if (supportsBinary) {
            return callback(data instanceof ArrayBuffer ? data : data.buffer);
          } else {
            return encodeBlobAsBase64(new Blob([data]), callback);
          }
        }
        return callback(PACKET_TYPES[type] + (data || ""));
      };
      var encodeBlobAsBase64 = (data, callback) => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
          const content = fileReader.result.split(",")[1];
          callback("b" + content);
        };
        return fileReader.readAsDataURL(data);
      };
      module.exports = encodePacket;
    }
  });

  // node_modules/base64-arraybuffer/lib/base64-arraybuffer.js
  var require_base64_arraybuffer = __commonJS({
    "node_modules/base64-arraybuffer/lib/base64-arraybuffer.js"(exports) {
      (function(chars) {
        "use strict";
        exports.encode = function(arraybuffer) {
          var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = "";
          for (i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64 += chars[bytes[i + 2] & 63];
          }
          if (len % 3 === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
          } else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
          }
          return base64;
        };
        exports.decode = function(base64) {
          var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
          if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
              bufferLength--;
            }
          }
          var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
          for (i = 0; i < len; i += 4) {
            encoded1 = chars.indexOf(base64[i]);
            encoded2 = chars.indexOf(base64[i + 1]);
            encoded3 = chars.indexOf(base64[i + 2]);
            encoded4 = chars.indexOf(base64[i + 3]);
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return arraybuffer;
        };
      })("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
    }
  });

  // node_modules/engine.io-parser/lib/decodePacket.browser.js
  var require_decodePacket_browser = __commonJS({
    "node_modules/engine.io-parser/lib/decodePacket.browser.js"(exports, module) {
      var { PACKET_TYPES_REVERSE, ERROR_PACKET } = require_commons();
      var withNativeArrayBuffer = typeof ArrayBuffer === "function";
      var base64decoder;
      if (withNativeArrayBuffer) {
        base64decoder = require_base64_arraybuffer();
      }
      var decodePacket = (encodedPacket, binaryType) => {
        if (typeof encodedPacket !== "string") {
          return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType)
          };
        }
        const type = encodedPacket.charAt(0);
        if (type === "b") {
          return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
          };
        }
        const packetType = PACKET_TYPES_REVERSE[type];
        if (!packetType) {
          return ERROR_PACKET;
        }
        return encodedPacket.length > 1 ? {
          type: PACKET_TYPES_REVERSE[type],
          data: encodedPacket.substring(1)
        } : {
          type: PACKET_TYPES_REVERSE[type]
        };
      };
      var decodeBase64Packet = (data, binaryType) => {
        if (base64decoder) {
          const decoded = base64decoder.decode(data);
          return mapBinary(decoded, binaryType);
        } else {
          return { base64: true, data };
        }
      };
      var mapBinary = (data, binaryType) => {
        switch (binaryType) {
          case "blob":
            return data instanceof ArrayBuffer ? new Blob([data]) : data;
          case "arraybuffer":
          default:
            return data;
        }
      };
      module.exports = decodePacket;
    }
  });

  // node_modules/engine.io-parser/lib/index.js
  var require_lib = __commonJS({
    "node_modules/engine.io-parser/lib/index.js"(exports, module) {
      var encodePacket = require_encodePacket_browser();
      var decodePacket = require_decodePacket_browser();
      var SEPARATOR = String.fromCharCode(30);
      var encodePayload = (packets, callback) => {
        const length = packets.length;
        const encodedPackets = new Array(length);
        let count = 0;
        packets.forEach((packet, i) => {
          encodePacket(packet, false, (encodedPacket) => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
              callback(encodedPackets.join(SEPARATOR));
            }
          });
        });
      };
      var decodePayload = (encodedPayload, binaryType) => {
        const encodedPackets = encodedPayload.split(SEPARATOR);
        const packets = [];
        for (let i = 0; i < encodedPackets.length; i++) {
          const decodedPacket = decodePacket(encodedPackets[i], binaryType);
          packets.push(decodedPacket);
          if (decodedPacket.type === "error") {
            break;
          }
        }
        return packets;
      };
      module.exports = {
        protocol: 4,
        encodePacket,
        encodePayload,
        decodePacket,
        decodePayload
      };
    }
  });

  // node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/component-emitter/index.js"(exports, module) {
      if (typeof module !== "undefined") {
        module.exports = Emitter;
      }
      function Emitter(obj) {
        if (obj)
          return mixin(obj);
      }
      function mixin(obj) {
        for (var key in Emitter.prototype) {
          obj[key] = Emitter.prototype[key];
        }
        return obj;
      }
      Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter.prototype.once = function(event, fn) {
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
      };
      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (arguments.length == 0) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (arguments.length == 1) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }
        return this;
      };
      Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }
  });

  // node_modules/engine.io-client/lib/transport.js
  var require_transport = __commonJS({
    "node_modules/engine.io-client/lib/transport.js"(exports, module) {
      var parser = require_lib();
      var Emitter = require_component_emitter();
      var debug = require_browser2()("engine.io-client:transport");
      var Transport = class extends Emitter {
        constructor(opts) {
          super();
          this.opts = opts;
          this.query = opts.query;
          this.readyState = "";
          this.socket = opts.socket;
        }
        onError(msg, desc) {
          const err = new Error(msg);
          err.type = "TransportError";
          err.description = desc;
          this.emit("error", err);
          return this;
        }
        open() {
          if (this.readyState === "closed" || this.readyState === "") {
            this.readyState = "opening";
            this.doOpen();
          }
          return this;
        }
        close() {
          if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
          }
          return this;
        }
        send(packets) {
          if (this.readyState === "open") {
            this.write(packets);
          } else {
            debug("transport is not open, discarding packets");
          }
        }
        onOpen() {
          this.readyState = "open";
          this.writable = true;
          this.emit("open");
        }
        onData(data) {
          const packet = parser.decodePacket(data, this.socket.binaryType);
          this.onPacket(packet);
        }
        onPacket(packet) {
          this.emit("packet", packet);
        }
        onClose() {
          this.readyState = "closed";
          this.emit("close");
        }
      };
      module.exports = Transport;
    }
  });

  // node_modules/parseqs/index.js
  var require_parseqs = __commonJS({
    "node_modules/parseqs/index.js"(exports) {
      exports.encode = function(obj) {
        var str = "";
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (str.length)
              str += "&";
            str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
          }
        }
        return str;
      };
      exports.decode = function(qs) {
        var qry = {};
        var pairs = qs.split("&");
        for (var i = 0, l = pairs.length; i < l; i++) {
          var pair = pairs[i].split("=");
          qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return qry;
      };
    }
  });

  // node_modules/yeast/index.js
  var require_yeast = __commonJS({
    "node_modules/yeast/index.js"(exports, module) {
      "use strict";
      var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
      var length = 64;
      var map = {};
      var seed = 0;
      var i = 0;
      var prev;
      function encode(num) {
        var encoded = "";
        do {
          encoded = alphabet[num % length] + encoded;
          num = Math.floor(num / length);
        } while (num > 0);
        return encoded;
      }
      function decode(str) {
        var decoded = 0;
        for (i = 0; i < str.length; i++) {
          decoded = decoded * length + map[str.charAt(i)];
        }
        return decoded;
      }
      function yeast() {
        var now = encode(+new Date());
        if (now !== prev)
          return seed = 0, prev = now;
        return now + "." + encode(seed++);
      }
      for (; i < length; i++)
        map[alphabet[i]] = i;
      yeast.encode = encode;
      yeast.decode = decode;
      module.exports = yeast;
    }
  });

  // node_modules/engine.io-client/lib/transports/polling.js
  var require_polling = __commonJS({
    "node_modules/engine.io-client/lib/transports/polling.js"(exports, module) {
      var Transport = require_transport();
      var parseqs = require_parseqs();
      var parser = require_lib();
      var yeast = require_yeast();
      var debug = require_browser2()("engine.io-client:polling");
      var Polling = class extends Transport {
        get name() {
          return "polling";
        }
        doOpen() {
          this.poll();
        }
        pause(onPause) {
          this.readyState = "pausing";
          const pause = () => {
            debug("paused");
            this.readyState = "paused";
            onPause();
          };
          if (this.polling || !this.writable) {
            let total = 0;
            if (this.polling) {
              debug("we are currently polling - waiting to pause");
              total++;
              this.once("pollComplete", function() {
                debug("pre-pause polling complete");
                --total || pause();
              });
            }
            if (!this.writable) {
              debug("we are currently writing - waiting to pause");
              total++;
              this.once("drain", function() {
                debug("pre-pause writing complete");
                --total || pause();
              });
            }
          } else {
            pause();
          }
        }
        poll() {
          debug("polling");
          this.polling = true;
          this.doPoll();
          this.emit("poll");
        }
        onData(data) {
          debug("polling got data %s", data);
          const callback = (packet) => {
            if (this.readyState === "opening" && packet.type === "open") {
              this.onOpen();
            }
            if (packet.type === "close") {
              this.onClose();
              return false;
            }
            this.onPacket(packet);
          };
          parser.decodePayload(data, this.socket.binaryType).forEach(callback);
          if (this.readyState !== "closed") {
            this.polling = false;
            this.emit("pollComplete");
            if (this.readyState === "open") {
              this.poll();
            } else {
              debug('ignoring poll - transport state "%s"', this.readyState);
            }
          }
        }
        doClose() {
          const close = () => {
            debug("writing close packet");
            this.write([{ type: "close" }]);
          };
          if (this.readyState === "open") {
            debug("transport open - closing");
            close();
          } else {
            debug("transport not open - deferring close");
            this.once("open", close);
          }
        }
        write(packets) {
          this.writable = false;
          parser.encodePayload(packets, (data) => {
            this.doWrite(data, () => {
              this.writable = true;
              this.emit("drain");
            });
          });
        }
        uri() {
          let query = this.query || {};
          const schema = this.opts.secure ? "https" : "http";
          let port = "";
          if (this.opts.timestampRequests !== false) {
            query[this.opts.timestampParam] = yeast();
          }
          if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
          }
          query = parseqs.encode(query);
          if (this.opts.port && (schema === "https" && Number(this.opts.port) !== 443 || schema === "http" && Number(this.opts.port) !== 80)) {
            port = ":" + this.opts.port;
          }
          if (query.length) {
            query = "?" + query;
          }
          const ipv6 = this.opts.hostname.indexOf(":") !== -1;
          return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
        }
      };
      module.exports = Polling;
    }
  });

  // node_modules/engine.io-client/lib/util.js
  var require_util = __commonJS({
    "node_modules/engine.io-client/lib/util.js"(exports, module) {
      module.exports.pick = (obj, ...attr) => {
        return attr.reduce((acc, k) => {
          if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
          }
          return acc;
        }, {});
      };
    }
  });

  // node_modules/engine.io-client/lib/transports/polling-xhr.js
  var require_polling_xhr = __commonJS({
    "node_modules/engine.io-client/lib/transports/polling-xhr.js"(exports, module) {
      var XMLHttpRequest2 = require_xmlhttprequest();
      var Polling = require_polling();
      var Emitter = require_component_emitter();
      var { pick } = require_util();
      var globalThis = require_globalThis_browser();
      var debug = require_browser2()("engine.io-client:polling-xhr");
      function empty() {
      }
      var hasXHR2 = function() {
        const xhr = new XMLHttpRequest2({ xdomain: false });
        return xhr.responseType != null;
      }();
      var XHR = class extends Polling {
        constructor(opts) {
          super(opts);
          if (typeof location !== "undefined") {
            const isSSL = location.protocol === "https:";
            let port = location.port;
            if (!port) {
              port = isSSL ? 443 : 80;
            }
            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
            this.xs = opts.secure !== isSSL;
          }
          const forceBase64 = opts && opts.forceBase64;
          this.supportsBinary = hasXHR2 && !forceBase64;
        }
        request(opts = {}) {
          Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
          return new Request(this.uri(), opts);
        }
        doWrite(data, fn) {
          const req = this.request({
            method: "POST",
            data
          });
          req.on("success", fn);
          req.on("error", (err) => {
            this.onError("xhr post error", err);
          });
        }
        doPoll() {
          debug("xhr poll");
          const req = this.request();
          req.on("data", this.onData.bind(this));
          req.on("error", (err) => {
            this.onError("xhr poll error", err);
          });
          this.pollXhr = req;
        }
      };
      var Request = class extends Emitter {
        constructor(uri, opts) {
          super();
          this.opts = opts;
          this.method = opts.method || "GET";
          this.uri = uri;
          this.async = opts.async !== false;
          this.data = opts.data !== void 0 ? opts.data : null;
          this.create();
        }
        create() {
          const opts = pick(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
          opts.xdomain = !!this.opts.xd;
          opts.xscheme = !!this.opts.xs;
          const xhr = this.xhr = new XMLHttpRequest2(opts);
          try {
            debug("xhr open %s: %s", this.method, this.uri);
            xhr.open(this.method, this.uri, this.async);
            try {
              if (this.opts.extraHeaders) {
                xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                for (let i in this.opts.extraHeaders) {
                  if (this.opts.extraHeaders.hasOwnProperty(i)) {
                    xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
                  }
                }
              }
            } catch (e) {
            }
            if (this.method === "POST") {
              try {
                xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (e) {
              }
            }
            try {
              xhr.setRequestHeader("Accept", "*/*");
            } catch (e) {
            }
            if ("withCredentials" in xhr) {
              xhr.withCredentials = this.opts.withCredentials;
            }
            if (this.opts.requestTimeout) {
              xhr.timeout = this.opts.requestTimeout;
            }
            if (this.hasXDR()) {
              xhr.onload = () => {
                this.onLoad();
              };
              xhr.onerror = () => {
                this.onError(xhr.responseText);
              };
            } else {
              xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4)
                  return;
                if (xhr.status === 200 || xhr.status === 1223) {
                  this.onLoad();
                } else {
                  setTimeout(() => {
                    this.onError(typeof xhr.status === "number" ? xhr.status : 0);
                  }, 0);
                }
              };
            }
            debug("xhr data %s", this.data);
            xhr.send(this.data);
          } catch (e) {
            setTimeout(() => {
              this.onError(e);
            }, 0);
            return;
          }
          if (typeof document !== "undefined") {
            this.index = Request.requestsCount++;
            Request.requests[this.index] = this;
          }
        }
        onSuccess() {
          this.emit("success");
          this.cleanup();
        }
        onData(data) {
          this.emit("data", data);
          this.onSuccess();
        }
        onError(err) {
          this.emit("error", err);
          this.cleanup(true);
        }
        cleanup(fromError) {
          if (typeof this.xhr === "undefined" || this.xhr === null) {
            return;
          }
          if (this.hasXDR()) {
            this.xhr.onload = this.xhr.onerror = empty;
          } else {
            this.xhr.onreadystatechange = empty;
          }
          if (fromError) {
            try {
              this.xhr.abort();
            } catch (e) {
            }
          }
          if (typeof document !== "undefined") {
            delete Request.requests[this.index];
          }
          this.xhr = null;
        }
        onLoad() {
          const data = this.xhr.responseText;
          if (data !== null) {
            this.onData(data);
          }
        }
        hasXDR() {
          return typeof XDomainRequest !== "undefined" && !this.xs && this.enablesXDR;
        }
        abort() {
          this.cleanup();
        }
      };
      Request.requestsCount = 0;
      Request.requests = {};
      if (typeof document !== "undefined") {
        if (typeof attachEvent === "function") {
          attachEvent("onunload", unloadHandler);
        } else if (typeof addEventListener === "function") {
          const terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
          addEventListener(terminationEvent, unloadHandler, false);
        }
      }
      function unloadHandler() {
        for (let i in Request.requests) {
          if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
          }
        }
      }
      module.exports = XHR;
      module.exports.Request = Request;
    }
  });

  // node_modules/engine.io-client/lib/transports/polling-jsonp.js
  var require_polling_jsonp = __commonJS({
    "node_modules/engine.io-client/lib/transports/polling-jsonp.js"(exports, module) {
      var Polling = require_polling();
      var globalThis = require_globalThis_browser();
      var rNewline = /\n/g;
      var rEscapedNewline = /\\n/g;
      var callbacks;
      var JSONPPolling = class extends Polling {
        constructor(opts) {
          super(opts);
          this.query = this.query || {};
          if (!callbacks) {
            callbacks = globalThis.___eio = globalThis.___eio || [];
          }
          this.index = callbacks.length;
          callbacks.push(this.onData.bind(this));
          this.query.j = this.index;
        }
        get supportsBinary() {
          return false;
        }
        doClose() {
          if (this.script) {
            this.script.onerror = () => {
            };
            this.script.parentNode.removeChild(this.script);
            this.script = null;
          }
          if (this.form) {
            this.form.parentNode.removeChild(this.form);
            this.form = null;
            this.iframe = null;
          }
          super.doClose();
        }
        doPoll() {
          const script = document.createElement("script");
          if (this.script) {
            this.script.parentNode.removeChild(this.script);
            this.script = null;
          }
          script.async = true;
          script.src = this.uri();
          script.onerror = (e) => {
            this.onError("jsonp poll error", e);
          };
          const insertAt = document.getElementsByTagName("script")[0];
          if (insertAt) {
            insertAt.parentNode.insertBefore(script, insertAt);
          } else {
            (document.head || document.body).appendChild(script);
          }
          this.script = script;
          const isUAgecko = typeof navigator !== "undefined" && /gecko/i.test(navigator.userAgent);
          if (isUAgecko) {
            setTimeout(function() {
              const iframe = document.createElement("iframe");
              document.body.appendChild(iframe);
              document.body.removeChild(iframe);
            }, 100);
          }
        }
        doWrite(data, fn) {
          let iframe;
          if (!this.form) {
            const form = document.createElement("form");
            const area = document.createElement("textarea");
            const id = this.iframeId = "eio_iframe_" + this.index;
            form.className = "socketio";
            form.style.position = "absolute";
            form.style.top = "-1000px";
            form.style.left = "-1000px";
            form.target = id;
            form.method = "POST";
            form.setAttribute("accept-charset", "utf-8");
            area.name = "d";
            form.appendChild(area);
            document.body.appendChild(form);
            this.form = form;
            this.area = area;
          }
          this.form.action = this.uri();
          function complete() {
            initIframe();
            fn();
          }
          const initIframe = () => {
            if (this.iframe) {
              try {
                this.form.removeChild(this.iframe);
              } catch (e) {
                this.onError("jsonp polling iframe removal error", e);
              }
            }
            try {
              const html = '<iframe src="javascript:0" name="' + this.iframeId + '">';
              iframe = document.createElement(html);
            } catch (e) {
              iframe = document.createElement("iframe");
              iframe.name = this.iframeId;
              iframe.src = "javascript:0";
            }
            iframe.id = this.iframeId;
            this.form.appendChild(iframe);
            this.iframe = iframe;
          };
          initIframe();
          data = data.replace(rEscapedNewline, "\\\n");
          this.area.value = data.replace(rNewline, "\\n");
          try {
            this.form.submit();
          } catch (e) {
          }
          if (this.iframe.attachEvent) {
            this.iframe.onreadystatechange = () => {
              if (this.iframe.readyState === "complete") {
                complete();
              }
            };
          } else {
            this.iframe.onload = complete;
          }
        }
      };
      module.exports = JSONPPolling;
    }
  });

  // node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js
  var require_websocket_constructor_browser = __commonJS({
    "node_modules/engine.io-client/lib/transports/websocket-constructor.browser.js"(exports, module) {
      var globalThis = require_globalThis_browser();
      var nextTick = (() => {
        const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
        if (isPromiseAvailable) {
          return (cb) => Promise.resolve().then(cb);
        } else {
          return (cb) => setTimeout(cb, 0);
        }
      })();
      module.exports = {
        WebSocket: globalThis.WebSocket || globalThis.MozWebSocket,
        usingBrowserWebSocket: true,
        defaultBinaryType: "arraybuffer",
        nextTick
      };
    }
  });

  // node_modules/engine.io-client/lib/transports/websocket.js
  var require_websocket = __commonJS({
    "node_modules/engine.io-client/lib/transports/websocket.js"(exports, module) {
      var Transport = require_transport();
      var parser = require_lib();
      var parseqs = require_parseqs();
      var yeast = require_yeast();
      var { pick } = require_util();
      var {
        WebSocket,
        usingBrowserWebSocket,
        defaultBinaryType,
        nextTick
      } = require_websocket_constructor_browser();
      var debug = require_browser2()("engine.io-client:websocket");
      var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      var WS = class extends Transport {
        constructor(opts) {
          super(opts);
          this.supportsBinary = !opts.forceBase64;
        }
        get name() {
          return "websocket";
        }
        doOpen() {
          if (!this.check()) {
            return;
          }
          const uri = this.uri();
          const protocols = this.opts.protocols;
          const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
          if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
          }
          try {
            this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
          } catch (err) {
            return this.emit("error", err);
          }
          this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
          this.addEventListeners();
        }
        addEventListeners() {
          this.ws.onopen = () => {
            if (this.opts.autoUnref) {
              this.ws._socket.unref();
            }
            this.onOpen();
          };
          this.ws.onclose = this.onClose.bind(this);
          this.ws.onmessage = (ev) => this.onData(ev.data);
          this.ws.onerror = (e) => this.onError("websocket error", e);
        }
        write(packets) {
          this.writable = false;
          for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            parser.encodePacket(packet, this.supportsBinary, (data) => {
              const opts = {};
              if (!usingBrowserWebSocket) {
                if (packet.options) {
                  opts.compress = packet.options.compress;
                }
                if (this.opts.perMessageDeflate) {
                  const len = typeof data === "string" ? Buffer.byteLength(data) : data.length;
                  if (len < this.opts.perMessageDeflate.threshold) {
                    opts.compress = false;
                  }
                }
              }
              try {
                if (usingBrowserWebSocket) {
                  this.ws.send(data);
                } else {
                  this.ws.send(data, opts);
                }
              } catch (e) {
                debug("websocket closed before onclose event");
              }
              if (lastPacket) {
                nextTick(() => {
                  this.writable = true;
                  this.emit("drain");
                });
              }
            });
          }
        }
        onClose() {
          Transport.prototype.onClose.call(this);
        }
        doClose() {
          if (typeof this.ws !== "undefined") {
            this.ws.close();
            this.ws = null;
          }
        }
        uri() {
          let query = this.query || {};
          const schema = this.opts.secure ? "wss" : "ws";
          let port = "";
          if (this.opts.port && (schema === "wss" && Number(this.opts.port) !== 443 || schema === "ws" && Number(this.opts.port) !== 80)) {
            port = ":" + this.opts.port;
          }
          if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = yeast();
          }
          if (!this.supportsBinary) {
            query.b64 = 1;
          }
          query = parseqs.encode(query);
          if (query.length) {
            query = "?" + query;
          }
          const ipv6 = this.opts.hostname.indexOf(":") !== -1;
          return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + query;
        }
        check() {
          return !!WebSocket && !("__initialize" in WebSocket && this.name === WS.prototype.name);
        }
      };
      module.exports = WS;
    }
  });

  // node_modules/engine.io-client/lib/transports/index.js
  var require_transports = __commonJS({
    "node_modules/engine.io-client/lib/transports/index.js"(exports) {
      var XMLHttpRequest2 = require_xmlhttprequest();
      var XHR = require_polling_xhr();
      var JSONP = require_polling_jsonp();
      var websocket = require_websocket();
      exports.polling = polling;
      exports.websocket = websocket;
      function polling(opts) {
        let xhr;
        let xd = false;
        let xs = false;
        const jsonp = opts.jsonp !== false;
        if (typeof location !== "undefined") {
          const isSSL = location.protocol === "https:";
          let port = location.port;
          if (!port) {
            port = isSSL ? 443 : 80;
          }
          xd = opts.hostname !== location.hostname || port !== opts.port;
          xs = opts.secure !== isSSL;
        }
        opts.xdomain = xd;
        opts.xscheme = xs;
        xhr = new XMLHttpRequest2(opts);
        if ("open" in xhr && !opts.forceJSONP) {
          return new XHR(opts);
        } else {
          if (!jsonp)
            throw new Error("JSONP disabled");
          return new JSONP(opts);
        }
      }
    }
  });

  // node_modules/engine.io-client/lib/socket.js
  var require_socket = __commonJS({
    "node_modules/engine.io-client/lib/socket.js"(exports, module) {
      var transports = require_transports();
      var Emitter = require_component_emitter();
      var debug = require_browser2()("engine.io-client:socket");
      var parser = require_lib();
      var parseuri = require_parseuri();
      var parseqs = require_parseqs();
      var Socket2 = class extends Emitter {
        constructor(uri, opts = {}) {
          super();
          if (uri && typeof uri === "object") {
            opts = uri;
            uri = null;
          }
          if (uri) {
            uri = parseuri(uri);
            opts.hostname = uri.host;
            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
            opts.port = uri.port;
            if (uri.query)
              opts.query = uri.query;
          } else if (opts.host) {
            opts.hostname = parseuri(opts.host).host;
          }
          this.secure = opts.secure != null ? opts.secure : typeof location !== "undefined" && location.protocol === "https:";
          if (opts.hostname && !opts.port) {
            opts.port = this.secure ? "443" : "80";
          }
          this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
          this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? 443 : 80);
          this.transports = opts.transports || ["polling", "websocket"];
          this.readyState = "";
          this.writeBuffer = [];
          this.prevBufferLen = 0;
          this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            jsonp: true,
            timestampParam: "t",
            rememberUpgrade: false,
            rejectUnauthorized: true,
            perMessageDeflate: {
              threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: true
          }, opts);
          this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
          if (typeof this.opts.query === "string") {
            this.opts.query = parseqs.decode(this.opts.query);
          }
          this.id = null;
          this.upgrades = null;
          this.pingInterval = null;
          this.pingTimeout = null;
          this.pingTimeoutTimer = null;
          if (typeof addEventListener === "function") {
            if (this.opts.closeOnBeforeunload) {
              addEventListener("beforeunload", () => {
                if (this.transport) {
                  this.transport.removeAllListeners();
                  this.transport.close();
                }
              }, false);
            }
            if (this.hostname !== "localhost") {
              this.offlineEventListener = () => {
                this.onClose("transport close");
              };
              addEventListener("offline", this.offlineEventListener, false);
            }
          }
          this.open();
        }
        createTransport(name) {
          debug('creating transport "%s"', name);
          const query = clone(this.opts.query);
          query.EIO = parser.protocol;
          query.transport = name;
          if (this.id)
            query.sid = this.id;
          const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
          });
          debug("options: %j", opts);
          return new transports[name](opts);
        }
        open() {
          let transport;
          if (this.opts.rememberUpgrade && Socket2.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
            transport = "websocket";
          } else if (this.transports.length === 0) {
            setTimeout(() => {
              this.emit("error", "No transports available");
            }, 0);
            return;
          } else {
            transport = this.transports[0];
          }
          this.readyState = "opening";
          try {
            transport = this.createTransport(transport);
          } catch (e) {
            debug("error while creating transport: %s", e);
            this.transports.shift();
            this.open();
            return;
          }
          transport.open();
          this.setTransport(transport);
        }
        setTransport(transport) {
          debug("setting transport %s", transport.name);
          if (this.transport) {
            debug("clearing existing transport %s", this.transport.name);
            this.transport.removeAllListeners();
          }
          this.transport = transport;
          transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", () => {
            this.onClose("transport close");
          });
        }
        probe(name) {
          debug('probing transport "%s"', name);
          let transport = this.createTransport(name, { probe: 1 });
          let failed = false;
          Socket2.priorWebsocketSuccess = false;
          const onTransportOpen = () => {
            if (failed)
              return;
            debug('probe transport "%s" opened', name);
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", (msg) => {
              if (failed)
                return;
              if (msg.type === "pong" && msg.data === "probe") {
                debug('probe transport "%s" pong', name);
                this.upgrading = true;
                this.emit("upgrading", transport);
                if (!transport)
                  return;
                Socket2.priorWebsocketSuccess = transport.name === "websocket";
                debug('pausing current transport "%s"', this.transport.name);
                this.transport.pause(() => {
                  if (failed)
                    return;
                  if (this.readyState === "closed")
                    return;
                  debug("changing transport and sending upgrade packet");
                  cleanup();
                  this.setTransport(transport);
                  transport.send([{ type: "upgrade" }]);
                  this.emit("upgrade", transport);
                  transport = null;
                  this.upgrading = false;
                  this.flush();
                });
              } else {
                debug('probe transport "%s" failed', name);
                const err = new Error("probe error");
                err.transport = transport.name;
                this.emit("upgradeError", err);
              }
            });
          };
          function freezeTransport() {
            if (failed)
              return;
            failed = true;
            cleanup();
            transport.close();
            transport = null;
          }
          const onerror = (err) => {
            const error = new Error("probe error: " + err);
            error.transport = transport.name;
            freezeTransport();
            debug('probe transport "%s" failed because of error: %s', name, err);
            this.emit("upgradeError", error);
          };
          function onTransportClose() {
            onerror("transport closed");
          }
          function onclose() {
            onerror("socket closed");
          }
          function onupgrade(to) {
            if (transport && to.name !== transport.name) {
              debug('"%s" works - aborting "%s"', to.name, transport.name);
              freezeTransport();
            }
          }
          const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.removeListener("close", onclose);
            this.removeListener("upgrading", onupgrade);
          };
          transport.once("open", onTransportOpen);
          transport.once("error", onerror);
          transport.once("close", onTransportClose);
          this.once("close", onclose);
          this.once("upgrading", onupgrade);
          transport.open();
        }
        onOpen() {
          debug("socket open");
          this.readyState = "open";
          Socket2.priorWebsocketSuccess = this.transport.name === "websocket";
          this.emit("open");
          this.flush();
          if (this.readyState === "open" && this.opts.upgrade && this.transport.pause) {
            debug("starting upgrade probes");
            let i = 0;
            const l = this.upgrades.length;
            for (; i < l; i++) {
              this.probe(this.upgrades[i]);
            }
          }
        }
        onPacket(packet) {
          if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
            this.emit("packet", packet);
            this.emit("heartbeat");
            switch (packet.type) {
              case "open":
                this.onHandshake(JSON.parse(packet.data));
                break;
              case "ping":
                this.resetPingTimeout();
                this.sendPacket("pong");
                this.emit("ping");
                this.emit("pong");
                break;
              case "error":
                const err = new Error("server error");
                err.code = packet.data;
                this.onError(err);
                break;
              case "message":
                this.emit("data", packet.data);
                this.emit("message", packet.data);
                break;
            }
          } else {
            debug('packet received with socket readyState "%s"', this.readyState);
          }
        }
        onHandshake(data) {
          this.emit("handshake", data);
          this.id = data.sid;
          this.transport.query.sid = data.sid;
          this.upgrades = this.filterUpgrades(data.upgrades);
          this.pingInterval = data.pingInterval;
          this.pingTimeout = data.pingTimeout;
          this.onOpen();
          if (this.readyState === "closed")
            return;
          this.resetPingTimeout();
        }
        resetPingTimeout() {
          clearTimeout(this.pingTimeoutTimer);
          this.pingTimeoutTimer = setTimeout(() => {
            this.onClose("ping timeout");
          }, this.pingInterval + this.pingTimeout);
          if (this.opts.autoUnref) {
            this.pingTimeoutTimer.unref();
          }
        }
        onDrain() {
          this.writeBuffer.splice(0, this.prevBufferLen);
          this.prevBufferLen = 0;
          if (this.writeBuffer.length === 0) {
            this.emit("drain");
          } else {
            this.flush();
          }
        }
        flush() {
          if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            debug("flushing %d packets in socket", this.writeBuffer.length);
            this.transport.send(this.writeBuffer);
            this.prevBufferLen = this.writeBuffer.length;
            this.emit("flush");
          }
        }
        write(msg, options, fn) {
          this.sendPacket("message", msg, options, fn);
          return this;
        }
        send(msg, options, fn) {
          this.sendPacket("message", msg, options, fn);
          return this;
        }
        sendPacket(type, data, options, fn) {
          if (typeof data === "function") {
            fn = data;
            data = void 0;
          }
          if (typeof options === "function") {
            fn = options;
            options = null;
          }
          if (this.readyState === "closing" || this.readyState === "closed") {
            return;
          }
          options = options || {};
          options.compress = options.compress !== false;
          const packet = {
            type,
            data,
            options
          };
          this.emit("packetCreate", packet);
          this.writeBuffer.push(packet);
          if (fn)
            this.once("flush", fn);
          this.flush();
        }
        close() {
          const close = () => {
            this.onClose("forced close");
            debug("socket closing - telling transport to close");
            this.transport.close();
          };
          const cleanupAndClose = () => {
            this.removeListener("upgrade", cleanupAndClose);
            this.removeListener("upgradeError", cleanupAndClose);
            close();
          };
          const waitForUpgrade = () => {
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
          };
          if (this.readyState === "opening" || this.readyState === "open") {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
              this.once("drain", () => {
                if (this.upgrading) {
                  waitForUpgrade();
                } else {
                  close();
                }
              });
            } else if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          }
          return this;
        }
        onError(err) {
          debug("socket error %j", err);
          Socket2.priorWebsocketSuccess = false;
          this.emit("error", err);
          this.onClose("transport error", err);
        }
        onClose(reason, desc) {
          if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
            debug('socket close with reason: "%s"', reason);
            clearTimeout(this.pingIntervalTimer);
            clearTimeout(this.pingTimeoutTimer);
            this.transport.removeAllListeners("close");
            this.transport.close();
            this.transport.removeAllListeners();
            if (typeof removeEventListener === "function") {
              removeEventListener("offline", this.offlineEventListener, false);
            }
            this.readyState = "closed";
            this.id = null;
            this.emit("close", reason, desc);
            this.writeBuffer = [];
            this.prevBufferLen = 0;
          }
        }
        filterUpgrades(upgrades) {
          const filteredUpgrades = [];
          let i = 0;
          const j = upgrades.length;
          for (; i < j; i++) {
            if (~this.transports.indexOf(upgrades[i]))
              filteredUpgrades.push(upgrades[i]);
          }
          return filteredUpgrades;
        }
      };
      Socket2.priorWebsocketSuccess = false;
      Socket2.protocol = parser.protocol;
      function clone(obj) {
        const o = {};
        for (let i in obj) {
          if (obj.hasOwnProperty(i)) {
            o[i] = obj[i];
          }
        }
        return o;
      }
      module.exports = Socket2;
    }
  });

  // node_modules/engine.io-client/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/engine.io-client/lib/index.js"(exports, module) {
      var Socket2 = require_socket();
      module.exports = (uri, opts) => new Socket2(uri, opts);
      module.exports.Socket = Socket2;
      module.exports.protocol = Socket2.protocol;
      module.exports.Transport = require_transport();
      module.exports.transports = require_transports();
      module.exports.parser = require_lib();
    }
  });

  // node_modules/socket.io-parser/dist/is-binary.js
  var require_is_binary = __commonJS({
    "node_modules/socket.io-parser/dist/is-binary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hasBinary = exports.isBinary = void 0;
      var withNativeArrayBuffer = typeof ArrayBuffer === "function";
      var isView = (obj) => {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
      };
      var toString = Object.prototype.toString;
      var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
      var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
      function isBinary(obj) {
        return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
      }
      exports.isBinary = isBinary;
      function hasBinary(obj, toJSON) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        if (Array.isArray(obj)) {
          for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
              return true;
            }
          }
          return false;
        }
        if (isBinary(obj)) {
          return true;
        }
        if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
          return hasBinary(obj.toJSON(), true);
        }
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
          }
        }
        return false;
      }
      exports.hasBinary = hasBinary;
    }
  });

  // node_modules/socket.io-parser/dist/binary.js
  var require_binary = __commonJS({
    "node_modules/socket.io-parser/dist/binary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.reconstructPacket = exports.deconstructPacket = void 0;
      var is_binary_1 = require_is_binary();
      function deconstructPacket(packet) {
        const buffers = [];
        const packetData = packet.data;
        const pack = packet;
        pack.data = _deconstructPacket(packetData, buffers);
        pack.attachments = buffers.length;
        return { packet: pack, buffers };
      }
      exports.deconstructPacket = deconstructPacket;
      function _deconstructPacket(data, buffers) {
        if (!data)
          return data;
        if (is_binary_1.isBinary(data)) {
          const placeholder = { _placeholder: true, num: buffers.length };
          buffers.push(data);
          return placeholder;
        } else if (Array.isArray(data)) {
          const newData = new Array(data.length);
          for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
          }
          return newData;
        } else if (typeof data === "object" && !(data instanceof Date)) {
          const newData = {};
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              newData[key] = _deconstructPacket(data[key], buffers);
            }
          }
          return newData;
        }
        return data;
      }
      function reconstructPacket(packet, buffers) {
        packet.data = _reconstructPacket(packet.data, buffers);
        packet.attachments = void 0;
        return packet;
      }
      exports.reconstructPacket = reconstructPacket;
      function _reconstructPacket(data, buffers) {
        if (!data)
          return data;
        if (data && data._placeholder) {
          return buffers[data.num];
        } else if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
          }
        } else if (typeof data === "object") {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              data[key] = _reconstructPacket(data[key], buffers);
            }
          }
        }
        return data;
      }
    }
  });

  // node_modules/socket.io-parser/dist/index.js
  var require_dist = __commonJS({
    "node_modules/socket.io-parser/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
      var Emitter = require_component_emitter();
      var binary_1 = require_binary();
      var is_binary_1 = require_is_binary();
      var debug = require_browser2()("socket.io-parser");
      exports.protocol = 5;
      var PacketType;
      (function(PacketType2) {
        PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
        PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
        PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
        PacketType2[PacketType2["ACK"] = 3] = "ACK";
        PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
        PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
        PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
      })(PacketType = exports.PacketType || (exports.PacketType = {}));
      var Encoder = class {
        encode(obj) {
          debug("encoding packet %j", obj);
          if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if (is_binary_1.hasBinary(obj)) {
              obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
              return this.encodeAsBinary(obj);
            }
          }
          return [this.encodeAsString(obj)];
        }
        encodeAsString(obj) {
          let str = "" + obj.type;
          if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
          }
          if (obj.nsp && obj.nsp !== "/") {
            str += obj.nsp + ",";
          }
          if (obj.id != null) {
            str += obj.id;
          }
          if (obj.data != null) {
            str += JSON.stringify(obj.data);
          }
          debug("encoded %j as %s", obj, str);
          return str;
        }
        encodeAsBinary(obj) {
          const deconstruction = binary_1.deconstructPacket(obj);
          const pack = this.encodeAsString(deconstruction.packet);
          const buffers = deconstruction.buffers;
          buffers.unshift(pack);
          return buffers;
        }
      };
      exports.Encoder = Encoder;
      var Decoder = class extends Emitter {
        constructor() {
          super();
        }
        add(obj) {
          let packet;
          if (typeof obj === "string") {
            packet = this.decodeString(obj);
            if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
              this.reconstructor = new BinaryReconstructor(packet);
              if (packet.attachments === 0) {
                super.emit("decoded", packet);
              }
            } else {
              super.emit("decoded", packet);
            }
          } else if (is_binary_1.isBinary(obj) || obj.base64) {
            if (!this.reconstructor) {
              throw new Error("got binary data when not reconstructing a packet");
            } else {
              packet = this.reconstructor.takeBinaryData(obj);
              if (packet) {
                this.reconstructor = null;
                super.emit("decoded", packet);
              }
            }
          } else {
            throw new Error("Unknown type: " + obj);
          }
        }
        decodeString(str) {
          let i = 0;
          const p = {
            type: Number(str.charAt(0))
          };
          if (PacketType[p.type] === void 0) {
            throw new Error("unknown packet type " + p.type);
          }
          if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) {
            }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
              throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
          }
          if (str.charAt(i + 1) === "/") {
            const start = i + 1;
            while (++i) {
              const c = str.charAt(i);
              if (c === ",")
                break;
              if (i === str.length)
                break;
            }
            p.nsp = str.substring(start, i);
          } else {
            p.nsp = "/";
          }
          const next = str.charAt(i + 1);
          if (next !== "" && Number(next) == next) {
            const start = i + 1;
            while (++i) {
              const c = str.charAt(i);
              if (c == null || Number(c) != c) {
                --i;
                break;
              }
              if (i === str.length)
                break;
            }
            p.id = Number(str.substring(start, i + 1));
          }
          if (str.charAt(++i)) {
            const payload = tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
              p.data = payload;
            } else {
              throw new Error("invalid payload");
            }
          }
          debug("decoded %s as %j", str, p);
          return p;
        }
        static isPayloadValid(type, payload) {
          switch (type) {
            case PacketType.CONNECT:
              return typeof payload === "object";
            case PacketType.DISCONNECT:
              return payload === void 0;
            case PacketType.CONNECT_ERROR:
              return typeof payload === "string" || typeof payload === "object";
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
              return Array.isArray(payload) && payload.length > 0;
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
              return Array.isArray(payload);
          }
        }
        destroy() {
          if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
          }
        }
      };
      exports.Decoder = Decoder;
      function tryParse(str) {
        try {
          return JSON.parse(str);
        } catch (e) {
          return false;
        }
      }
      var BinaryReconstructor = class {
        constructor(packet) {
          this.packet = packet;
          this.buffers = [];
          this.reconPack = packet;
        }
        takeBinaryData(binData) {
          this.buffers.push(binData);
          if (this.buffers.length === this.reconPack.attachments) {
            const packet = binary_1.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
          }
          return null;
        }
        finishedReconstruction() {
          this.reconPack = null;
          this.buffers = [];
        }
      };
    }
  });

  // node_modules/socket.io-client/build/on.js
  var require_on = __commonJS({
    "node_modules/socket.io-client/build/on.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.on = void 0;
      function on(obj, ev, fn) {
        obj.on(ev, fn);
        return function subDestroy() {
          obj.off(ev, fn);
        };
      }
      exports.on = on;
    }
  });

  // node_modules/socket.io-client/build/typed-events.js
  var require_typed_events = __commonJS({
    "node_modules/socket.io-client/build/typed-events.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.StrictEventEmitter = void 0;
      var Emitter = require_component_emitter();
      var StrictEventEmitter = class extends Emitter {
        on(ev, listener) {
          super.on(ev, listener);
          return this;
        }
        once(ev, listener) {
          super.once(ev, listener);
          return this;
        }
        emit(ev, ...args) {
          super.emit(ev, ...args);
          return this;
        }
        emitReserved(ev, ...args) {
          super.emit(ev, ...args);
          return this;
        }
        listeners(event) {
          return super.listeners(event);
        }
      };
      exports.StrictEventEmitter = StrictEventEmitter;
    }
  });

  // node_modules/socket.io-client/build/socket.js
  var require_socket2 = __commonJS({
    "node_modules/socket.io-client/build/socket.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Socket = void 0;
      var socket_io_parser_1 = require_dist();
      var on_1 = require_on();
      var typed_events_1 = require_typed_events();
      var debug = require_browser2()("socket.io-client:socket");
      var RESERVED_EVENTS = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        newListener: 1,
        removeListener: 1
      });
      var Socket2 = class extends typed_events_1.StrictEventEmitter {
        constructor(io2, nsp, opts) {
          super();
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.ids = 0;
          this.acks = {};
          this.flags = {};
          this.io = io2;
          this.nsp = nsp;
          this.ids = 0;
          this.acks = {};
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.connected = false;
          this.disconnected = true;
          this.flags = {};
          if (opts && opts.auth) {
            this.auth = opts.auth;
          }
          if (this.io._autoConnect)
            this.open();
        }
        subEvents() {
          if (this.subs)
            return;
          const io2 = this.io;
          this.subs = [
            on_1.on(io2, "open", this.onopen.bind(this)),
            on_1.on(io2, "packet", this.onpacket.bind(this)),
            on_1.on(io2, "error", this.onerror.bind(this)),
            on_1.on(io2, "close", this.onclose.bind(this))
          ];
        }
        get active() {
          return !!this.subs;
        }
        connect() {
          if (this.connected)
            return this;
          this.subEvents();
          if (!this.io["_reconnecting"])
            this.io.open();
          if (this.io._readyState === "open")
            this.onopen();
          return this;
        }
        open() {
          return this.connect();
        }
        send(...args) {
          args.unshift("message");
          this.emit.apply(this, args);
          return this;
        }
        emit(ev, ...args) {
          if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev + '" is a reserved event name');
          }
          args.unshift(ev);
          const packet = {
            type: socket_io_parser_1.PacketType.EVENT,
            data: args
          };
          packet.options = {};
          packet.options.compress = this.flags.compress !== false;
          if (typeof args[args.length - 1] === "function") {
            debug("emitting packet with ack id %d", this.ids);
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
          }
          const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
          const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
          if (discardPacket) {
            debug("discard packet as the transport is not currently writable");
          } else if (this.connected) {
            this.packet(packet);
          } else {
            this.sendBuffer.push(packet);
          }
          this.flags = {};
          return this;
        }
        packet(packet) {
          packet.nsp = this.nsp;
          this.io._packet(packet);
        }
        onopen() {
          debug("transport is open - connecting");
          if (typeof this.auth == "function") {
            this.auth((data) => {
              this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data });
            });
          } else {
            this.packet({ type: socket_io_parser_1.PacketType.CONNECT, data: this.auth });
          }
        }
        onerror(err) {
          if (!this.connected) {
            this.emitReserved("connect_error", err);
          }
        }
        onclose(reason) {
          debug("close (%s)", reason);
          this.connected = false;
          this.disconnected = true;
          delete this.id;
          this.emitReserved("disconnect", reason);
        }
        onpacket(packet) {
          const sameNamespace = packet.nsp === this.nsp;
          if (!sameNamespace)
            return;
          switch (packet.type) {
            case socket_io_parser_1.PacketType.CONNECT:
              if (packet.data && packet.data.sid) {
                const id = packet.data.sid;
                this.onconnect(id);
              } else {
                this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
              }
              break;
            case socket_io_parser_1.PacketType.EVENT:
              this.onevent(packet);
              break;
            case socket_io_parser_1.PacketType.BINARY_EVENT:
              this.onevent(packet);
              break;
            case socket_io_parser_1.PacketType.ACK:
              this.onack(packet);
              break;
            case socket_io_parser_1.PacketType.BINARY_ACK:
              this.onack(packet);
              break;
            case socket_io_parser_1.PacketType.DISCONNECT:
              this.ondisconnect();
              break;
            case socket_io_parser_1.PacketType.CONNECT_ERROR:
              const err = new Error(packet.data.message);
              err.data = packet.data.data;
              this.emitReserved("connect_error", err);
              break;
          }
        }
        onevent(packet) {
          const args = packet.data || [];
          debug("emitting event %j", args);
          if (packet.id != null) {
            debug("attaching ack callback to event");
            args.push(this.ack(packet.id));
          }
          if (this.connected) {
            this.emitEvent(args);
          } else {
            this.receiveBuffer.push(Object.freeze(args));
          }
        }
        emitEvent(args) {
          if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
              listener.apply(this, args);
            }
          }
          super.emit.apply(this, args);
        }
        ack(id) {
          const self2 = this;
          let sent = false;
          return function(...args) {
            if (sent)
              return;
            sent = true;
            debug("sending ack %j", args);
            self2.packet({
              type: socket_io_parser_1.PacketType.ACK,
              id,
              data: args
            });
          };
        }
        onack(packet) {
          const ack = this.acks[packet.id];
          if (typeof ack === "function") {
            debug("calling ack %s with %j", packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
          } else {
            debug("bad ack %s", packet.id);
          }
        }
        onconnect(id) {
          debug("socket connected with id %s", id);
          this.id = id;
          this.connected = true;
          this.disconnected = false;
          this.emitBuffered();
          this.emitReserved("connect");
        }
        emitBuffered() {
          this.receiveBuffer.forEach((args) => this.emitEvent(args));
          this.receiveBuffer = [];
          this.sendBuffer.forEach((packet) => this.packet(packet));
          this.sendBuffer = [];
        }
        ondisconnect() {
          debug("server disconnect (%s)", this.nsp);
          this.destroy();
          this.onclose("io server disconnect");
        }
        destroy() {
          if (this.subs) {
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = void 0;
          }
          this.io["_destroy"](this);
        }
        disconnect() {
          if (this.connected) {
            debug("performing disconnect (%s)", this.nsp);
            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
          }
          this.destroy();
          if (this.connected) {
            this.onclose("io client disconnect");
          }
          return this;
        }
        close() {
          return this.disconnect();
        }
        compress(compress) {
          this.flags.compress = compress;
          return this;
        }
        get volatile() {
          this.flags.volatile = true;
          return this;
        }
        onAny(listener) {
          this._anyListeners = this._anyListeners || [];
          this._anyListeners.push(listener);
          return this;
        }
        prependAny(listener) {
          this._anyListeners = this._anyListeners || [];
          this._anyListeners.unshift(listener);
          return this;
        }
        offAny(listener) {
          if (!this._anyListeners) {
            return this;
          }
          if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
              if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
              }
            }
          } else {
            this._anyListeners = [];
          }
          return this;
        }
        listenersAny() {
          return this._anyListeners || [];
        }
      };
      exports.Socket = Socket2;
    }
  });

  // node_modules/backo2/index.js
  var require_backo2 = __commonJS({
    "node_modules/backo2/index.js"(exports, module) {
      module.exports = Backoff;
      function Backoff(opts) {
        opts = opts || {};
        this.ms = opts.min || 100;
        this.max = opts.max || 1e4;
        this.factor = opts.factor || 2;
        this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
        this.attempts = 0;
      }
      Backoff.prototype.duration = function() {
        var ms = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var rand = Math.random();
          var deviation = Math.floor(rand * this.jitter * ms);
          ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
        }
        return Math.min(ms, this.max) | 0;
      };
      Backoff.prototype.reset = function() {
        this.attempts = 0;
      };
      Backoff.prototype.setMin = function(min) {
        this.ms = min;
      };
      Backoff.prototype.setMax = function(max) {
        this.max = max;
      };
      Backoff.prototype.setJitter = function(jitter) {
        this.jitter = jitter;
      };
    }
  });

  // node_modules/socket.io-client/build/manager.js
  var require_manager = __commonJS({
    "node_modules/socket.io-client/build/manager.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Manager = void 0;
      var eio = require_lib2();
      var socket_1 = require_socket2();
      var parser = require_dist();
      var on_1 = require_on();
      var Backoff = require_backo2();
      var typed_events_1 = require_typed_events();
      var debug = require_browser2()("socket.io-client:manager");
      var Manager2 = class extends typed_events_1.StrictEventEmitter {
        constructor(uri, opts) {
          super();
          this.nsps = {};
          this.subs = [];
          if (uri && typeof uri === "object") {
            opts = uri;
            uri = void 0;
          }
          opts = opts || {};
          opts.path = opts.path || "/socket.io";
          this.opts = opts;
          this.reconnection(opts.reconnection !== false);
          this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
          this.reconnectionDelay(opts.reconnectionDelay || 1e3);
          this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
          this.randomizationFactor(opts.randomizationFactor || 0.5);
          this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
          });
          this.timeout(opts.timeout == null ? 2e4 : opts.timeout);
          this._readyState = "closed";
          this.uri = uri;
          const _parser = opts.parser || parser;
          this.encoder = new _parser.Encoder();
          this.decoder = new _parser.Decoder();
          this._autoConnect = opts.autoConnect !== false;
          if (this._autoConnect)
            this.open();
        }
        reconnection(v) {
          if (!arguments.length)
            return this._reconnection;
          this._reconnection = !!v;
          return this;
        }
        reconnectionAttempts(v) {
          if (v === void 0)
            return this._reconnectionAttempts;
          this._reconnectionAttempts = v;
          return this;
        }
        reconnectionDelay(v) {
          var _a;
          if (v === void 0)
            return this._reconnectionDelay;
          this._reconnectionDelay = v;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
          return this;
        }
        randomizationFactor(v) {
          var _a;
          if (v === void 0)
            return this._randomizationFactor;
          this._randomizationFactor = v;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
          return this;
        }
        reconnectionDelayMax(v) {
          var _a;
          if (v === void 0)
            return this._reconnectionDelayMax;
          this._reconnectionDelayMax = v;
          (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
          return this;
        }
        timeout(v) {
          if (!arguments.length)
            return this._timeout;
          this._timeout = v;
          return this;
        }
        maybeReconnectOnOpen() {
          if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
            this.reconnect();
          }
        }
        open(fn) {
          debug("readyState %s", this._readyState);
          if (~this._readyState.indexOf("open"))
            return this;
          debug("opening %s", this.uri);
          this.engine = eio(this.uri, this.opts);
          const socket = this.engine;
          const self2 = this;
          this._readyState = "opening";
          this.skipReconnect = false;
          const openSubDestroy = on_1.on(socket, "open", function() {
            self2.onopen();
            fn && fn();
          });
          const errorSub = on_1.on(socket, "error", (err) => {
            debug("error");
            self2.cleanup();
            self2._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
              fn(err);
            } else {
              self2.maybeReconnectOnOpen();
            }
          });
          if (this._timeout !== false) {
            const timeout = this._timeout;
            debug("connect attempt will timeout after %d", timeout);
            if (timeout === 0) {
              openSubDestroy();
            }
            const timer = setTimeout(() => {
              debug("connect attempt timed out after %d", timeout);
              openSubDestroy();
              socket.close();
              socket.emit("error", new Error("timeout"));
            }, timeout);
            if (this.opts.autoUnref) {
              timer.unref();
            }
            this.subs.push(function subDestroy() {
              clearTimeout(timer);
            });
          }
          this.subs.push(openSubDestroy);
          this.subs.push(errorSub);
          return this;
        }
        connect(fn) {
          return this.open(fn);
        }
        onopen() {
          debug("open");
          this.cleanup();
          this._readyState = "open";
          this.emitReserved("open");
          const socket = this.engine;
          this.subs.push(on_1.on(socket, "ping", this.onping.bind(this)), on_1.on(socket, "data", this.ondata.bind(this)), on_1.on(socket, "error", this.onerror.bind(this)), on_1.on(socket, "close", this.onclose.bind(this)), on_1.on(this.decoder, "decoded", this.ondecoded.bind(this)));
        }
        onping() {
          this.emitReserved("ping");
        }
        ondata(data) {
          this.decoder.add(data);
        }
        ondecoded(packet) {
          this.emitReserved("packet", packet);
        }
        onerror(err) {
          debug("error", err);
          this.emitReserved("error", err);
        }
        socket(nsp, opts) {
          let socket = this.nsps[nsp];
          if (!socket) {
            socket = new socket_1.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
          }
          return socket;
        }
        _destroy(socket) {
          const nsps = Object.keys(this.nsps);
          for (const nsp of nsps) {
            const socket2 = this.nsps[nsp];
            if (socket2.active) {
              debug("socket %s is still active, skipping close", nsp);
              return;
            }
          }
          this._close();
        }
        _packet(packet) {
          debug("writing packet %j", packet);
          const encodedPackets = this.encoder.encode(packet);
          for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
          }
        }
        cleanup() {
          debug("cleanup");
          this.subs.forEach((subDestroy) => subDestroy());
          this.subs.length = 0;
          this.decoder.destroy();
        }
        _close() {
          debug("disconnect");
          this.skipReconnect = true;
          this._reconnecting = false;
          if (this._readyState === "opening") {
            this.cleanup();
          }
          this.backoff.reset();
          this._readyState = "closed";
          if (this.engine)
            this.engine.close();
        }
        disconnect() {
          return this._close();
        }
        onclose(reason) {
          debug("onclose");
          this.cleanup();
          this.backoff.reset();
          this._readyState = "closed";
          this.emitReserved("close", reason);
          if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
          }
        }
        reconnect() {
          if (this._reconnecting || this.skipReconnect)
            return this;
          const self2 = this;
          if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug("reconnect failed");
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
          } else {
            const delay = this.backoff.duration();
            debug("will wait %dms before reconnect attempt", delay);
            this._reconnecting = true;
            const timer = setTimeout(() => {
              if (self2.skipReconnect)
                return;
              debug("attempting reconnect");
              this.emitReserved("reconnect_attempt", self2.backoff.attempts);
              if (self2.skipReconnect)
                return;
              self2.open((err) => {
                if (err) {
                  debug("reconnect attempt error");
                  self2._reconnecting = false;
                  self2.reconnect();
                  this.emitReserved("reconnect_error", err);
                } else {
                  debug("reconnect success");
                  self2.onreconnect();
                }
              });
            }, delay);
            if (this.opts.autoUnref) {
              timer.unref();
            }
            this.subs.push(function subDestroy() {
              clearTimeout(timer);
            });
          }
        }
        onreconnect() {
          const attempt = this.backoff.attempts;
          this._reconnecting = false;
          this.backoff.reset();
          this.emitReserved("reconnect", attempt);
        }
      };
      exports.Manager = Manager2;
    }
  });

  // node_modules/socket.io-client/build/index.js
  var require_build = __commonJS({
    "node_modules/socket.io-client/build/index.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.io = exports.Socket = exports.Manager = exports.protocol = void 0;
      var url_1 = require_url();
      var manager_1 = require_manager();
      var debug = require_browser2()("socket.io-client");
      module.exports = exports = lookup;
      var cache = exports.managers = {};
      function lookup(uri, opts) {
        if (typeof uri === "object") {
          opts = uri;
          uri = void 0;
        }
        opts = opts || {};
        const parsed = url_1.url(uri, opts.path || "/socket.io");
        const source = parsed.source;
        const id = parsed.id;
        const path = parsed.path;
        const sameNamespace = cache[id] && path in cache[id]["nsps"];
        const newConnection = opts.forceNew || opts["force new connection"] || opts.multiplex === false || sameNamespace;
        let io2;
        if (newConnection) {
          debug("ignoring socket cache for %s", source);
          io2 = new manager_1.Manager(source, opts);
        } else {
          if (!cache[id]) {
            debug("new io instance for %s", source);
            cache[id] = new manager_1.Manager(source, opts);
          }
          io2 = cache[id];
        }
        if (parsed.query && !opts.query) {
          opts.query = parsed.queryKey;
        }
        return io2.socket(parsed.path, opts);
      }
      exports.io = lookup;
      var socket_io_parser_1 = require_dist();
      Object.defineProperty(exports, "protocol", { enumerable: true, get: function() {
        return socket_io_parser_1.protocol;
      } });
      exports.connect = lookup;
      var manager_2 = require_manager();
      Object.defineProperty(exports, "Manager", { enumerable: true, get: function() {
        return manager_2.Manager;
      } });
      var socket_1 = require_socket2();
      Object.defineProperty(exports, "Socket", { enumerable: true, get: function() {
        return socket_1.Socket;
      } });
      exports.default = lookup;
    }
  });

  // src/ExchangeForm.js
  var import_qrcode = __toModule(require_browser());

  // node_modules/socket.io-client/wrapper.mjs
  var import_build = __toModule(require_build());
  var Manager = import_build.default.Manager;
  var Socket = import_build.default.Socket;

  // src/ExchangeForm.js
  var ExchangeForm = class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.textColor = this.hasAttribute("text") ? this.getAttribute("text") : "white";
      this.backgroundColor = this.hasAttribute("bg") ? this.getAttribute("bg") : "#1d1d1b";
      const template = document.createElement("template");
      template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                input {
                    background-color: #292926;
                    border: 1px solid #474747;
                    height: 100%;
                    width: 100%;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 0.5rem;
                    color: ${this.textColor};
                }

                .exchange-form {
                    padding: 1.5rem;
                    height: 100%;
                }

                .exchange-form-options {
                    display: flex;
                }

                .exchange-form-info {
                    padding-left: 16px;
                }

                .info-wrapper {
                    border-left: 1px solid #474747;
                    padding: 10px 0;
                }

                .info-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 37px;
                    font-size: 0.8rem;
                    padding: 2px 0 2px 16px;
                }

                .info-item::before {
                    position: absolute;
                    top: 15px;
                    left: -5px;
                    content: '';
                    border-radius: 50%;
                    width: 10px;
                    height: 10px;
                    background-color: #474747;
                }

                .extra-inputs {
                    margin: .8rem 0;
                }

                .extra-inputs input{
                    border-radius: 10px;
                    padding: 0.5rem;
                }

                .submit-btn {
                    width: 100%;
                    padding: 0.5rem 0;
                    color: white;
                    background-color: #735494;
                    border: none;
                    border-radius: 4px;
                }

                .submit-btn:hover {
                    background-color: #563e6f;
                    cursor: pointer;
                }

                .exchange-form-group {
                    display: flex;
                    height: 80px;
                    flex-direction: column;
                }

                .exchange-form-group > * {
                    flex: 1 1;
                }

                .message {
                    margin-bottom: 0.8rem;
                    background-color: #37a737;
                    padding: 0.6rem 1rem;
                    border-radius: 10px;
                }

                .error {
                    background-color: #b53636;
                }

                .success-info {
                    background-color: ${this.backgroundColor};
                    position: absolute;
                    height: 88%;
                    width: 84%;
                    top: 0;
                    left: 0;
                    margin: 1.5rem;
                }

				.center-message {
					display: flex;
					flex-direction: column;
                    justify-content: center;
					text-align: center;
				}

                .payin-wallet {
                    margin-bottom: 0.8rem;
                    word-break: break-all;
                }

				.margin {
					margin-bottom: 2rem;
				}

				.loading {
					display: flex;
					justify-content: center;
					align-items: center;
				}
				  
				.loading::after {
					content: '';
					width: 50px;
					height: 50px;
					border: 5px solid #dddddd;
					border-top-color: #da9723;
					border-radius: 50%;
					animation: loading 1s linear infinite;
				}

				#requested-amount {
					font-weight: bold;
					font-size: 1.2rem;
				}

				.hide { 
                    display: none;
                }

				@keyframes loading {
					to {
					  transform: rotate(1turn);
					}
				  }
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select type='convert' transaction='send'></bitcoinmat-select>

                        <input placeholder="Send Amount">
                    </section>

                    <section class='exchange-form-options'>
                        <div class='exchange-form-info'>
                            <div class='info-wrapper'>
                                <div class='info-item'>
                                    test
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id='receive' class='exchange-form-group'>
                        <bitcoinmat-select type='convert' transaction='receive'></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input id='refund-wallet' placeholder="Refund wallet">
                    </section>

                    <section class='extra-inputs'>
                        <input id='receive-wallet' placeholder="Receive wallet">
                    </section>

                    <section id='main-message' class='message hide'>This is a message</section>

                    <button class='submit-btn'>Exchange</button>
                </form>

                <div id='success-waiting' class='success-info hide'>
                    <section class='message'>
                        Successfully created a transaction.
                        </br>
                        </br>
                        Copy the wallet address bellow or scan the QR code to sent the requested amount of coins <span id='requested-amount'></span>
                    </section>

                    <section class='center-message'>
                        <p id='payin' class='payin-wallet'></p>

                        <img id='qrcode'>
                    </section>
                </div>

				<div id='success-confirming' class='success-info center-message hide'>
					<div id='loading-status' class='loading margin'></div>
					<img id='finish-status' class='margin hide' height='100' src='./assets/check-circle.svg'>

					<section class='center-message'>
						<h1>Confirming</h1>
						<p>This may take several minutes</p>
					</section>
				</div>
            </div>
        `;
      shadow.appendChild(template.content.cloneNode(true));
      this.sendSelectDropdown = this.shadowRoot.querySelector("#send bitcoinmat-select");
      this.receiveSelectDropdown = this.shadowRoot.querySelector("#receive bitcoinmat-select");
      const sendInput = this.shadowRoot.querySelector("#send input");
      const receiveInput = this.shadowRoot.querySelector("#receive input");
      const submitBtn = this.shadowRoot.querySelector(".submit-btn");
      const refundWallet = this.shadowRoot.querySelector("#refund-wallet");
      const receiveWallet = this.shadowRoot.querySelector("#receive-wallet");
      this.message = this.shadowRoot.querySelector("#main-message");
      sendInput.addEventListener("input", async (e) => {
        if (this._minimum) {
          const value = e.target.value.replace(/[^0-9.]/g, "");
          if (value > 0 && value > this._minimum) {
            this.message.classList.add("hide");
            this.message.classList.remove("error");
            const res = await fetch("http://localhost:1337/user-transactions/changenow/estimate?" + new URLSearchParams({
              from: this.sendSelected.ticker,
              to: this.receiveSelected.ticker,
              sendAmount: value
            }));
            const data = await res.json();
            receiveInput.value = data.estimatedAmount.toFixed(8);
          } else {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            this.message.textContent = `Too low, minimum is ${this._minimum}`;
            receiveInput.value = "";
          }
          e.target.value = value;
        }
      });
      submitBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if (this._minimum && sendInput.value && refundWallet.value && receiveWallet.value && sendInput.value >= this._minimum) {
          this.message.classList.add("hide");
          this.message.classList.remove("error");
          try {
            const res = await fetch("http://localhost:1337/user-transactions/changenow/transaction?" + new URLSearchParams({
              from: this.sendSelected.ticker,
              to: this.receiveSelected.ticker,
              refundAddress: refundWallet.value,
              address: receiveWallet.value,
              amount: sendInput.value
            }), {
              method: "POST"
            });
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data.message);
            }
            const successInfoWaiting = this.shadowRoot.querySelector("#success-waiting");
            const imgQrcode = this.shadowRoot.querySelector("#qrcode");
            const payin = this.shadowRoot.querySelector("#payin");
            const requestedAmount = this.shadowRoot.querySelector("#requested-amount");
            requestedAmount.innerText = sendInput.value + " " + this.sendSelected.ticker;
            payin.innerText = data.payinAddress;
            successInfoWaiting.classList.remove("hide");
            const url = await this.generateQrcode(data.payinAddress);
            imgQrcode.src = url;
            const socket = (0, import_build.default)("ws://localhost:1337");
            socket.emit("checkTransaction", {
              transactionId: data.id,
              type: "changenow"
            });
            const successConfirmation = this.shadowRoot.querySelector("#success-confirming");
            const successStatus = this.shadowRoot.querySelector("#success-confirming h1");
            const loadingStatus = this.shadowRoot.querySelector("#loading-status");
            const finishedStatus = this.shadowRoot.querySelector("#finish-status");
            socket.on("statusChange", (status) => {
              if (successConfirmation.classList.contains("hide")) {
                successConfirmation.classList.remove("hide");
                successInfoWaiting.classList.add("hide");
              }
              if (status === "finished") {
                loadingStatus.classList.add("hide");
                finishedStatus.classList.remove("hide");
              }
              successStatus.innerText = status;
            });
          } catch (err) {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            this.message.textContent = err.message;
          }
        } else {
          if (sendInput.value > this._minimum) {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            this.message.textContent = "Please fill out all inputs";
          }
        }
      });
      this.sendSelectDropdown.addEventListener("selected", (e) => {
        this.sendSelected = e.detail;
        this.fetchMinimum();
      });
      this.receiveSelectDropdown.addEventListener("selected", (e) => {
        this.receiveSelected = e.detail;
        this.fetchMinimum();
      });
      this.fetchCoins();
    }
    async fetchCoins() {
      const res = await fetch("https://api.changenow.io/v1/currencies?active=true&fixedRate=true");
      const data = await res.json();
      this.sendSelectDropdown.list = data;
      this.receiveSelectDropdown.list = data;
    }
    async generateQrcode(text) {
      try {
        let url = await import_qrcode.default.toDataURL(text);
        return url;
      } catch (err) {
        console.error(err);
      }
    }
    async fetchMinimum() {
      if (this.sendSelected && this.receiveSelected) {
        try {
          const res = await fetch("http://localhost:1337/user-transactions/changenow/minimum?" + new URLSearchParams({
            from: this.sendSelected.ticker,
            to: this.receiveSelected.ticker
          }));
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          this.message.classList.add("hide");
          this.message.classList.remove("error");
          this._minimum = data.minAmount;
          console.log("min", this._minimum);
        } catch (err) {
          this.message.classList.add("error");
          this.message.classList.remove("hide");
          this.message.textContent = err.message;
          this._minimum = null;
        }
      }
    }
  };

  // src/ExchangeIndacoinForm.js
  var ExchangeIndacoinForm = class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.textColor = this.hasAttribute("text") ? this.getAttribute("text") : "white";
      this.backgroundColor = this.hasAttribute("bg") ? this.getAttribute("bg") : "#1d1d1b";
      const template = document.createElement("template");
      template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                input {
                    background-color: #292926;
                    border: 1px solid #474747;
                    height: 100%;
                    width: 100%;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 0.5rem;
                    color: ${this.textColor};
                }

                .exchange-form {
                    padding: 1.5rem;
                    height: 100%;
                }

                .exchange-form-options {
                    display: flex;
                }

                .exchange-form-info {
                    padding-left: 16px;
                }

                .info-wrapper {
                    border-left: 1px solid #474747;
                    padding: 10px 0;
                }

                .info-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 37px;
                    font-size: 0.8rem;
                    padding: 2px 0 2px 16px;
                }

                .info-item::before {
                    position: absolute;
                    top: 15px;
                    left: -5px;
                    content: '';
                    border-radius: 50%;
                    width: 10px;
                    height: 10px;
                    background-color: #474747;
                }

                .extra-inputs {
                    margin: .8rem 0;
                }

                .extra-inputs input{
                    border-radius: 10px;
                    padding: 0.5rem;
                }

                .submit-btn {
                    width: 100%;
                    margin-top: .8rem;
                    padding: 0.5rem 0;
                    color: white;
                    background-color: #735494;
                    border: none;
                    border-radius: 4px;
                }

                .submit-btn:hover {
                    background-color: #563e6f;
                    cursor: pointer;
                }

                .exchange-form-group {
                    display: flex;
                    height: 80px;
                    flex-direction: column;
                }

                .exchange-form-group > * {
                    flex: 1 1;
                }

                .message {
                    margin-bottom: 0.8rem;
                    background-color: #37a737;
                    padding: 0.6rem 1rem;
                    border-radius: 10px;
                }

                .error {
                    background-color: #b53636;
                }

                .hide { 
                    display: none;
                }
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select type='indacoin' transaction='send'></bitcoinmat-select>

                        <input placeholder="Send Amount">
                    </section>

                    <section class='exchange-form-options'>
                        <div class='exchange-form-info'>
                            <div class='info-wrapper'>
                                <div class='info-item'>
                                    test
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id='receive' class='exchange-form-group'>
                        <bitcoinmat-select type='indacoin' transaction='receive' image='false'></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input type='email' id='email' placeholder="E-mail">
                    </section>

                    <section class='extra-inputs'>
                        <input type='text' id='wallet' placeholder="Your wallet">
                    </section>

                    <section id='main-message' class='message hide'>This is a message</section>

                    <button class='submit-btn'>Exchange</button>
                </form>
            </div>
        `;
      shadow.appendChild(template.content.cloneNode(true));
      this.sendSelectDropdown = this.shadowRoot.querySelector("#send bitcoinmat-select");
      this.receiveSelectDropdown = this.shadowRoot.querySelector("#receive bitcoinmat-select");
      const sendInput = this.shadowRoot.querySelector("#send input");
      const receiveInput = this.shadowRoot.querySelector("#receive input");
      const emailInput = this.shadowRoot.querySelector("#email");
      const walletInput = this.shadowRoot.querySelector("#wallet");
      const form = this.shadowRoot.querySelector(".exchange-form form");
      this.message = this.shadowRoot.querySelector("#main-message");
      sendInput.addEventListener("input", async (e) => {
        const value = e.target.value.replace(/[^0-9.]/g, "");
        if (this.sendSelected && this.receiveSelected && value) {
          this.message.classList.add("hide");
          this.message.classList.remove("error");
          try {
            const res = await fetch(`https://indacoin.com/api/GetCoinConvertAmount/${this.sendSelected.ticker}/${this.receiveSelected.ticker}/${value}`);
            const data = await res.json();
            if (data > 0) {
              receiveInput.value = data.toFixed(8);
              this._error = false;
            } else {
              this.message.classList.add("error");
              this.message.classList.remove("hide");
              this.message.textContent = `Too low exchange amount`;
              receiveInput.value = "";
              this._error = true;
            }
          } catch (err) {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            this.message.textContent = `There was a server error`;
            receiveInput.value = "";
          }
        }
      });
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (sendInput.value && receiveInput.value && emailInput.value && walletInput.value && !this._error) {
          this.message.classList.add("hide");
          this.message.classList.remove("error");
          const link = `https://indacoin.com/payment/en?partner=bitcoinmat&user_id=${emailInput.value}&cur_from=${this.sendSelected.ticker}&cur_to=${this.receiveSelected.ticker}&amount=${sendInput.value}&address=${walletInput.value}`;
          window.location.href = link;
        } else {
          this.message.classList.add("error");
          this.message.classList.remove("hide");
          this.message.textContent = "Amount is too low or not all inputs are filled";
        }
      });
      this.sendSelectDropdown.addEventListener("selected", (e) => {
        this.sendSelected = e.detail;
      });
      this.receiveSelectDropdown.addEventListener("selected", (e) => {
        this.receiveSelected = e.detail;
      });
      this.fetchCoins();
    }
    async fetchCoins() {
      const resFiat = await fetch("https://dev.bitcoinmat.uk/supported-currencies?" + new URLSearchParams({
        type: "FIAT"
      }));
      const dataFiat = await resFiat.json();
      const resCrypto = await fetch("https://indacoin.com/api/mobgetcurrencies/1");
      const dataCrypto = await resCrypto.json();
      const organisedFiat = dataFiat.map((el) => {
        return {
          ticker: el.symbol,
          image: "https://dev.bitcoinmat.uk" + el.icon.url
        };
      });
      const organisedCrypto = dataCrypto.map((el) => {
        return {
          ticker: el.short_name
        };
      });
      this.sendSelectDropdown.list = organisedFiat;
      this.receiveSelectDropdown.list = organisedCrypto;
    }
  };

  // src/ExchangeSellCashForm.js
  var ExchangeSellCashForm = class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.textColor = this.hasAttribute("text") ? this.getAttribute("text") : "white";
      this.backgroundColor = this.hasAttribute("bg") ? this.getAttribute("bg") : "#1d1d1b";
      const template = document.createElement("template");
      template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                input {
                    background-color: #292926;
                    border: 1px solid #474747;
                    height: 100%;
                    width: 100%;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 0.5rem;
                    color: ${this.textColor};
                }

                .exchange-form {
                    padding: 1.5rem;
                    height: 100%;
                }

                .exchange-form-options {
                    display: flex;
                }

                .exchange-form-info {
                    padding-left: 16px;
                }

                .info-wrapper {
                    border-left: 1px solid #474747;
                    padding: 10px 0;
                }

                .info-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 37px;
                    font-size: 0.8rem;
                    padding: 2px 0 2px 16px;
                }

                .info-item::before {
                    position: absolute;
                    top: 15px;
                    left: -5px;
                    content: '';
                    border-radius: 50%;
                    width: 10px;
                    height: 10px;
                    background-color: #474747;
                }

                .extra-inputs {
                    margin: .8rem 0;
                }

                .extra-inputs input{
                    border-radius: 10px;
                    padding: 0.5rem;
                }

                .submit-btn {
                    width: 100%;
                    padding: 0.5rem 0;
                    color: white;
                    background-color: #735494;
                    border: none;
                    border-radius: 4px;
                }

                .submit-btn:hover {
                    background-color: #563e6f;
                    cursor: pointer;
                }

                .exchange-form-group {
                    display: flex;
                    height: 80px;
                    flex-direction: column;
                }

                .exchange-form-group > * {
                    flex: 1 1;
                }

                .message {
                    margin-bottom: 0.8rem;
                    background-color: #37a737;
                    padding: 0.6rem 1rem;
                    border-radius: 10px;
                }

                .error {
                    background-color: #b53636;
                }

                .success-info {
                    background-color: ${this.backgroundColor};
                    position: absolute;
                    height: 88%;
                    width: 84%;
                    top: 0;
                    left: 0;
                    margin: 1.5rem;
                }

				.hide { 
                    display: none;
                }
            </style>

            <div class='exchange-form'>
                <form>
                    <section id='send' class='exchange-form-group'>
                        <bitcoinmat-select type='sell' transaction='send'></bitcoinmat-select>

                        <input placeholder="Send Amount">
                    </section>

                    <section class='exchange-form-options'>
                        <div class='exchange-form-info'>
                            <div class='info-wrapper'>
                                <div class='info-item'>
                                    test
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id='receive' class='exchange-form-group'>
                        <bitcoinmat-select type='sell' transaction='receive'></bitcoinmat-select>

                        <input placeholder="Receive Amount">
                    </section>

                    <section class='extra-inputs'>
                        <input type='email' id='email' placeholder="E-mail">
                    </section>

                    <section id='main-message' class='message hide'>This is a message</section>

                    <button class='submit-btn'>Exchange</button>
                </form>
            </div>
        `;
      shadow.appendChild(template.content.cloneNode(true));
      this.sendSelectDropdown = this.shadowRoot.querySelector("#send bitcoinmat-select");
      this.receiveSelectDropdown = this.shadowRoot.querySelector("#receive bitcoinmat-select");
      const sendInput = this.shadowRoot.querySelector("#send input");
      const receiveInput = this.shadowRoot.querySelector("#receive input");
      const emailInput = this.shadowRoot.querySelector("#email");
      const form = this.shadowRoot.querySelector(".exchange-form form");
      this.message = this.shadowRoot.querySelector("#main-message");
      sendInput.addEventListener("input", async (e) => {
        if (this._minimum) {
          const value = e.target.value.replace(/[^0-9.]/g, "");
          const price = this._prices.find((el) => el.cryptoCurrency === this.sendSelected.ticker);
          const estimatedReceive = value * price.rateForCashCurrency[this.receiveSelected.ticker];
          if (value > 0 && estimatedReceive > this._minimum) {
            this.message.classList.add("hide");
            this.message.classList.remove("error");
            receiveInput.value = estimatedReceive.toFixed(2);
          } else {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            this.message.textContent = `Too low, minimum is ${this._minimum}\u20AC`;
            receiveInput.value = "";
          }
          e.target.value = value;
        }
      });
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (emailInput.value && this._minimum && sendInput.value && receiveInput.value >= this._minimum) {
          this.message.classList.add("hide");
          this.message.classList.remove("error");
          try {
            const res = await fetch("http://localhost:1337\u200B/sellCryptoForCashAnon?" + new URLSearchParams({
              fiatValue: receiveInput.value,
              fiatCurrency: this.receiveSelected.ticker,
              cryptoCurrency: this.sendSelected.ticker,
              email: emailInput.value,
              terminalNumber: "BT390001",
              locale: "en"
            }));
            const data = await res.json();
            console.log("THIS WORKS", data);
            if (!res.ok) {
              let errMessage = JSON.parse(data.message.message);
              if (errMessage.remainingLimit) {
                let message = `The remaining amount you can exchange without an account is ${errMessage.remainingLimit.toFixed(2)}\u20AC`;
                throw new Error(message);
              } else {
                throw new Error(data.message);
              }
            }
            console.log("success", data);
          } catch (err) {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            console.log(err);
            this.message.textContent = err.message;
          }
        } else {
          if (receiveInput.value > this._minimum) {
            this.message.classList.add("error");
            this.message.classList.remove("hide");
            this.message.textContent = "Please fill out all inputs";
          }
        }
      });
      this.sendSelectDropdown.addEventListener("selected", (e) => {
        this.sendSelected = e.detail;
        this.fetchMinimum();
      });
      this.receiveSelectDropdown.addEventListener("selected", (e) => {
        this.receiveSelected = e.detail;
        this.fetchMinimum();
      });
      this.fetchCoins();
    }
    async fetchCoins() {
      const resCrypto = await fetch("https://dev.bitcoinmat.uk/supported-currencies?" + new URLSearchParams({
        type: "CRYPTO"
      }));
      const dataCrypto = await resCrypto.json();
      const resFiat = await fetch("https://dev.bitcoinmat.uk/supported-currencies?" + new URLSearchParams({
        type: "FIAT"
      }));
      const dataFiat = await resFiat.json();
      const resPrices = await fetch("https://dev.cashini.eu/extensions/secured/getExchangeRateInfo?" + new URLSearchParams({
        direction: "4"
      }));
      const dataPrices = await resPrices.json();
      const messagePrices = await JSON.parse(dataPrices.message);
      this._prices = messagePrices["4"];
      const organisedCrypto = dataCrypto.map((el) => {
        return {
          ticker: el.symbol,
          image: "https://dev.bitcoinmat.uk" + el.icon.url
        };
      });
      const organisedFiat = dataFiat.map((el) => {
        return {
          ticker: el.symbol,
          image: "https://dev.bitcoinmat.uk" + el.icon.url
        };
      });
      this.sendSelectDropdown.list = organisedCrypto;
      this.receiveSelectDropdown.list = organisedFiat;
    }
    fetchMinimum() {
      if (this.sendSelected && this.receiveSelected) {
        this._minimum = 50;
      } else {
        this._minimum = null;
      }
    }
  };

  // src/Select.js
  var Select = class extends HTMLElement {
    #selected;
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      const handleDropdownClick = () => {
        const dropdownContent = this.shadowRoot.querySelector(".dropdown-content");
        if (dropdownContent.classList.contains("hide")) {
          dropdownContent.classList.remove("hide");
        } else {
          dropdownContent.classList.add("hide");
        }
      };
      this.list = this.getAttribute("list");
      this.transactionType = this.getAttribute("transaction");
      this.type = this.getAttribute("type");
      this.image = this.hasAttribute("image") ? this.getAttribute("image") : "true";
      const template = document.createElement("template");
      template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                li {
                    list-style: none;
                }

                .dropdown {
                    height: 100%;
                    position: relative;
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                }

                .dropdown-btn {
                    height: 100%;
                    border: 1px solid #474747;
                    border-bottom: none;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    background-color: #333438;
                    padding: 0 0.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .dropdown-content {
                    position: absolute;
                    z-index: 20;
                    top: 110%;
                    width: 100%;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: #292926;
                    overflow: scroll;
                    max-height: 200px;
                    box-shadow: 0px 0px 30px 4px rgba(0, 0, 0, 0.4);
                }

                .dropdown-content li {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    cursor: pointer;
                }

                .dropdown-content li:hover {
                    background-color: #da9723;
                }

                .dropdown-content p {
                    margin-left: .5rem;
                }

                .dropdown-selected {
                    display: flex;
                    align-items: center;
                }

                .dropdown-selected p {
                    margin-left: .5rem;
                }

                .hide {
                    display: none;
                }
            </style>

            <div class='dropdown'>
                <div class='dropdown-btn'>
                    <div class='dropdown-selected'></div>
                </div>
                <div class='dropdown-content hide'></div>
            </div>
        `;
      shadow.appendChild(template.content.cloneNode(true));
      const dropdownBtn = this.shadowRoot.querySelector(".dropdown-btn");
      const dropdown = this.shadowRoot.querySelector(".dropdown");
      dropdownBtn.addEventListener("click", handleDropdownClick);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      document.addEventListener("click", this.handleClickOutside);
    }
    handleClickOutside(e) {
      if (!e.composedPath().includes(this)) {
        const dropdownContent = this.shadowRoot.querySelector(".dropdown-content");
        dropdownContent.classList.add("hide");
      }
    }
    set list(coinList) {
      if (coinList) {
        this.coinList = coinList;
        this.#selected = this.transactionType === "send" || this.type !== "convert" ? coinList[0] : coinList[1];
        const defaultDropdownSelected = this.shadowRoot.querySelector(".dropdown-selected");
        defaultDropdownSelected.innerHTML = "";
        const defaultPselected = document.createElement("p");
        if (this.image === "true") {
          const defaultImgSelected = document.createElement("img");
          defaultDropdownSelected.appendChild(defaultImgSelected);
          defaultImgSelected.src = this.#selected.image;
          defaultImgSelected.height = 24;
        }
        defaultDropdownSelected.appendChild(defaultPselected);
        defaultPselected.textContent = this.#selected.ticker.toUpperCase();
        this.dispatchEvent(new CustomEvent("selected", { detail: this.#selected }));
        const dropdownContent = this.shadowRoot.querySelector(".dropdown-content");
        const ul = document.createElement("ul");
        coinList.forEach((coin) => {
          const li = document.createElement("li");
          const p = document.createElement("p");
          if (this.image === "true") {
            const img = document.createElement("img");
            li.appendChild(img);
            img.src = coin.image;
            img.height = 24;
          }
          ul.appendChild(li);
          li.appendChild(p);
          p.textContent = coin.ticker.toUpperCase();
          li.addEventListener("click", (e) => {
            const dropdownContent2 = this.shadowRoot.querySelector(".dropdown-content");
            const dropdownSelected = this.shadowRoot.querySelector(".dropdown-selected");
            dropdownSelected.innerHTML = "";
            if (this.image === "true") {
              const imgSelected = document.createElement("img");
              dropdownSelected.appendChild(imgSelected);
              imgSelected.src = coin.image;
              imgSelected.height = 24;
            }
            const pSelected = document.createElement("p");
            dropdownSelected.appendChild(pSelected);
            pSelected.textContent = coin.ticker.toUpperCase();
            this.#selected = coin;
            this.dispatchEvent(new CustomEvent("selected", { detail: coin }));
            dropdownContent2.classList.add("hide");
          });
        });
        dropdownContent.appendChild(ul);
      }
    }
    disconnectedCallback() {
      document.removeEventListener("click", this.handleClickOutside);
    }
  };

  // src/Exchange.js
  var Exchange = class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      this.backgroundColor = this.hasAttribute("bg") ? this.getAttribute("bg") : "#1d1d1b";
      this.textColor = this.hasAttribute("text") ? this.getAttribute("text") : "white";
      this.mobile = this.hasAttribute("mobile") ? this.getAttribute("mobile") : "false";
      this.mobile === "true" ? this.content = {
        img: "./assets/mobile-transparent.png",
        top: "30px",
        left: "38px",
        height: "643px",
        width: "299px",
        margin: "1.6rem"
      } : this.content = {
        img: "./assets/mobile-hand-transparent.png",
        top: "51px",
        left: "345px",
        height: "586px",
        width: "273px",
        margin: "1.5rem"
      };
      const template = document.createElement("template");
      template.innerHTML = `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                li {
                    list-style: none;
                }

                .exchange {
                    position: relative;
                    height: 700px;
                    color: ${this.textColor}
                }

                .exchange-img {
                    position: relative;
                    z-index: 5;
                    height: 100%;
                }

                .exchange-content {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    top: ${this.content.top};
                    left: ${this.content.left};
                    height: ${this.content.height};
                    width: ${this.content.width};
                    background-color: ${this.backgroundColor};
                }

                .exchange-top-row {
                    margin-top: ${this.content.margin};
                }

                .exchange-tabs {
                    position: relative;
                    z-index: 10;
                    margin: 0 3px;
                    display: flex;
                }

                .exchange-tabs li {
                    cursor: pointer;
                    padding: 10px 0;
                    text-align: center;
                    flex: 1 1;
                }

                .selected-transaction {
                    background-color: #da9723;
                    border-radius: 4px;
                }

                .exchange-bottom-row {
                    flex: auto;
                    position: relative;
                    z-index: 10;
                }

                .hide { 
                    display: none;
                }
            </style>

            <div class='exchange'>
                <img class='exchange-img' src='${this.content.img}' draggable="false" >

                <div class='exchange-content'>
                    <section class='exchange-top-row'>
                        <ul class='exchange-tabs'>
                            <li id='convert'>Convert</li>
                            <li id='buy'>Buy</li>
                            <li id='sell'>Sell</li>
                        </ul>
                    </section>

                    <section class='exchange-bottom-row'>
                        <bitcoinmat-exchange-form bg=${this.backgroundColor} text=${this.textColor}></bitcoinmat-exchange-form>
                    </section>
                </div>
            </div>
        `;
      shadow.appendChild(template.content.cloneNode(true));
      const handleTransactionClick = (e) => {
        const previous = this.shadowRoot.querySelector(".selected-transaction");
        const bottomRow = this.shadowRoot.querySelector(".exchange-bottom-row");
        if (previous) {
          previous.classList.remove("selected-transaction");
          if (previous.innerText !== e.target.innerText) {
            this._form = e.target.innerText;
            if (this._form === "Convert") {
              bottomRow.innerHTML = `<bitcoinmat-exchange-form bg=${this.backgroundColor} text=${this.textColor}></bitcoinmat-exchange-form>`;
            } else if (this._form === "Buy") {
              bottomRow.innerHTML = `<bitcoinmat-exchange-indacoin-form></bitcoinmat-exchange-indacoin-form>`;
            } else if (this._form === "Sell") {
              bottomRow.innerHTML = `<bitcoinmat-exchange-sell-form bg=${this.backgroundColor} text=${this.textColor}></bitcoinmat-exchange-sell-form>`;
            }
          }
        } else {
          this._form = e.target.innerText;
          if (this._form === "Convert") {
            bottomRow.innerHTML = `<bitcoinmat-exchange-form bg=${this.backgroundColor} text=${this.textColor}></bitcoinmat-exchange-form>`;
          } else if (this._form === "Buy") {
            bottomRow.innerHTML = `<bitcoinmat-exchange-indacoin-form></bitcoinmat-exchange-indacoin-form>`;
          } else if (this._form === "Sell") {
            bottomRow.innerHTML = `<bitcoinmat-exchange-sell-form bg=${this.backgroundColor} text=${this.textColor}></bitcoinmat-exchange-sell-form>`;
          }
        }
        e.target.classList.add("selected-transaction");
      };
      const convertTab = this.shadowRoot.querySelector("#convert");
      const buyTab = this.shadowRoot.querySelector("#buy");
      const sell = this.shadowRoot.querySelector("#sell");
      convertTab.addEventListener("click", handleTransactionClick);
      buyTab.addEventListener("click", handleTransactionClick);
      sell.addEventListener("click", handleTransactionClick);
    }
  };
  customElements.define("bitcoinmat-exchange", Exchange);
  customElements.define("bitcoinmat-exchange-form", ExchangeForm);
  customElements.define("bitcoinmat-exchange-indacoin-form", ExchangeIndacoinForm);
  customElements.define("bitcoinmat-exchange-sell-form", ExchangeSellCashForm);
  customElements.define("bitcoinmat-select", Select);
})();
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
//# sourceMappingURL=exchange.js.map
