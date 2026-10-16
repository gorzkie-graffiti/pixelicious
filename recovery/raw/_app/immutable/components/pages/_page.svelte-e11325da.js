import {
  Y as identity,
  S as SvelteComponent,
  i as init,
  s as safe_not_equal,
  v as construct_svelte_component,
  w as create_component,
  e as empty$1,
  x as claim_component,
  y as mount_component,
  b as insert_hydration,
  R as listen,
  g as group_outros,
  t as transition_out,
  z as destroy_component,
  d as check_outros,
  f as transition_in,
  h as detach,
  D as run_all,
  U as component_subscribe,
  Z as globals,
  Q as binding_callbacks,
  k as element,
  l as claim_element,
  m as children,
  n as attr,
  p as set_style,
  _ as stop_propagation,
  $ as prevent_default,
  L as toggle_class,
  a as space,
  c as claim_space,
  H as append_hydration,
  B as noop,
  q as text,
  r as claim_text,
  u as set_data,
  a0 as set_store_value,
  M as create_slot,
  N as update_slot_base,
  O as get_all_dirty_from_scope,
  P as get_slot_changes,
  a1 as destroy_each,
  a2 as bind,
  a3 as add_flush_callback,
  a4 as createEventDispatcher,
  W as src_url_equal,
  a5 as add_render_callback,
  a6 as create_in_transition,
  a7 as create_out_transition,
  o as onMount,
} from "../../chunks/index-def40737.js";
import { d as dev } from "../../chunks/environment-9aa685ef.js";
import { p as page } from "../../chunks/stores-5af73cf6.js";
import { g as getAugmentedNamespace, d as commonjsGlobal } from "../../chunks/browser-ponyfill-82cba527.js";
import { t as toast } from "../../chunks/toast-e4c2af5c.js";
import { k as derived, w as writable, r as readable } from "../../chunks/singletons-d38e8de3.js";
import { s as supabaseClient } from "../../chunks/supabase-1dccee07.js";
import { c as checkIcon, u as userProfile } from "../../chunks/checkIcon-aa2334e1.js";
import { b as bgRemovalExample2 } from "../../chunks/bgRemovalExample2-7c4dfee8.js";
import { s as scenarioLogo } from "../../chunks/scenarioLogo-928ddd99.js";
import { l as loadingIconWhite } from "../../chunks/loadingIconWhite-601de10e.js";
function cubicOut(E) {
  const _ = E - 1;
  return _ * _ * _ + 1;
}
function quintOut(E) {
  return --E * E * E * E * E + 1;
}
function fade(E, { delay: _ = 0, duration: A = 400, easing: I = identity } = {}) {
  const D = +getComputedStyle(E).opacity;
  return { delay: _, duration: A, easing: I, css: (T) => `opacity: ${T * D}` };
}
function slide(E, { delay: _ = 0, duration: A = 400, easing: I = cubicOut } = {}) {
  const D = getComputedStyle(E),
    T = +D.opacity,
    C = parseFloat(D.height),
    R = parseFloat(D.paddingTop),
    B = parseFloat(D.paddingBottom),
    P = parseFloat(D.marginTop),
    O = parseFloat(D.marginBottom),
    F = parseFloat(D.borderTopWidth),
    L = parseFloat(D.borderBottomWidth);
  return {
    delay: _,
    duration: A,
    easing: I,
    css: (U) =>
      `overflow: hidden;opacity: ${Math.min(U * 20, 1) * T};height: ${U * C}px;padding-top: ${U * R}px;padding-bottom: ${U * B}px;margin-top: ${U * P}px;margin-bottom: ${U * O}px;border-top-width: ${U * F}px;border-bottom-width: ${U * L}px;`,
  };
}
function scale(E, { delay: _ = 0, duration: A = 400, easing: I = cubicOut, start: D = 0, opacity: T = 0 } = {}) {
  const C = getComputedStyle(E),
    R = +C.opacity,
    B = C.transform === "none" ? "" : C.transform,
    P = 1 - D,
    O = R * (1 - T);
  return {
    delay: _,
    duration: A,
    easing: I,
    css: (F, L) => `
			transform: ${B} scale(${1 - P * L});
			opacity: ${R - O * L}
		`,
  };
}
const bitMethods = {
  getBit(E) {
    return this.data[getSlot(E)] & (1 << getShift(E)) ? 1 : 0;
  },
  setBit(E) {
    this.data[getSlot(E)] |= 1 << getShift(E);
  },
  clearBit(E) {
    this.data[getSlot(E)] &= ~(1 << getShift(E));
  },
  toggleBit(E) {
    this.data[getSlot(E)] ^= 1 << getShift(E);
  },
  getBitXY(E, _) {
    return E >= this.width || _ >= this.height ? 0 : this.getBit(_ * this.width + E);
  },
  setBitXY(E, _) {
    this.setBit(_ * this.width + E);
  },
  clearBitXY(E, _) {
    this.clearBit(_ * this.width + E);
  },
  toggleBitXY(E, _) {
    this.toggleBit(_ * this.width + E);
  },
};
function getSlot(E) {
  return E >> 3;
}
function getShift(E) {
  return 7 - (E & 7);
}
function setBitMethods(E) {
  for (const _ in bitMethods) E.prototype[_] = bitMethods[_];
}
function checkProcessable(E, _ = {}) {
  let { bitDepth: A, alpha: I, colorModel: D, components: T, channels: C } = _;
  if (typeof E != "string" || E.length === 0) throw new TypeError("processName must be a string");
  if (A && (Array.isArray(A) || (A = [A]), !A.includes(this.bitDepth)))
    throw new TypeError(`The process: ${E} can only be applied if bit depth is in: ${A}`);
  if (I && (Array.isArray(I) || (I = [I]), !I.includes(this.alpha)))
    throw new TypeError(`The process: ${E} can only be applied if alpha is in: ${I}`);
  if (D && (Array.isArray(D) || (D = [D]), !D.includes(this.colorModel)))
    throw new TypeError(`The process: ${E} can only be applied if color model is in: ${D}`);
  if (T && (Array.isArray(T) || (T = [T]), !T.includes(this.components))) {
    let R = `The process: ${E} can only be applied if the number of components is in: ${T}`;
    throw T.length === 1 && T[0] === 1
      ? new TypeError(`${R}.\rYou should transform your image using "image.grey()" before applying the algorithm.`)
      : new TypeError(R);
  }
  if (C && (Array.isArray(C) || (C = [C]), !C.includes(this.channels)))
    throw new TypeError(`The process: ${E} can only be applied if the number of channels is in: ${C}`);
}
function createBlob(E, _) {
  (E = E || []), (_ = _ || {}), typeof _ == "string" && (_ = { type: _ });
  try {
    return new Blob(E, _);
  } catch (T) {
    if (T.name !== "TypeError") throw T;
    for (
      var A =
          typeof BlobBuilder < "u"
            ? BlobBuilder
            : typeof MSBlobBuilder < "u"
              ? MSBlobBuilder
              : typeof MozBlobBuilder < "u"
                ? MozBlobBuilder
                : WebKitBlobBuilder,
        I = new A(),
        D = 0;
      D < E.length;
      D += 1
    )
      I.append(E[D]);
    return I.getBlob(_.type);
  }
}
function dataURLToBlob(E) {
  var _ = E.match(/data:([^;]+)/)[1],
    A = E.replace(/^[^,]+,/, ""),
    I = binaryStringToArrayBuffer(atob(A));
  return createBlob([I], { type: _ });
}
function canvasToBlob(E, _, A) {
  return typeof E.toBlob == "function"
    ? new Promise(function (I) {
        E.toBlob(I, _, A);
      })
    : Promise.resolve(dataURLToBlob(E.toDataURL(_, A)));
}
function binaryStringToArrayBuffer(E) {
  for (var _ = E.length, A = new ArrayBuffer(_), I = new Uint8Array(A), D = -1; ++D < _; ) I[D] = E.charCodeAt(D);
  return A;
}
(function (E) {
  if (E.TextEncoder && E.TextDecoder) return !1;
  function _(I = "utf-8") {
    if (I !== "utf-8")
      throw new RangeError(`Failed to construct 'TextEncoder': The encoding label provided ('${I}') is invalid.`);
  }
  Object.defineProperty(_.prototype, "encoding", { value: "utf-8" }),
    (_.prototype.encode = function (I, D = { stream: !1 }) {
      if (D.stream) throw new Error("Failed to encode: the 'stream' option is unsupported.");
      let T = 0;
      const C = I.length;
      let R = 0,
        B = Math.max(32, C + (C >> 1) + 7),
        P = new Uint8Array((B >> 3) << 3);
      for (; T < C; ) {
        let O = I.charCodeAt(T++);
        if (O >= 55296 && O <= 56319) {
          if (T < C) {
            const F = I.charCodeAt(T);
            (F & 64512) === 56320 && (++T, (O = ((O & 1023) << 10) + (F & 1023) + 65536));
          }
          if (O >= 55296 && O <= 56319) continue;
        }
        if (R + 4 > P.length) {
          (B += 8), (B *= 1 + (T / I.length) * 2), (B = (B >> 3) << 3);
          const F = new Uint8Array(B);
          F.set(P), (P = F);
        }
        if (O & 4294967168)
          if (!(O & 4294965248)) P[R++] = ((O >> 6) & 31) | 192;
          else if (!(O & 4294901760)) (P[R++] = ((O >> 12) & 15) | 224), (P[R++] = ((O >> 6) & 63) | 128);
          else if (!(O & 4292870144))
            (P[R++] = ((O >> 18) & 7) | 240), (P[R++] = ((O >> 12) & 63) | 128), (P[R++] = ((O >> 6) & 63) | 128);
          else continue;
        else {
          P[R++] = O;
          continue;
        }
        P[R++] = (O & 63) | 128;
      }
      return P.slice(0, R);
    });
  function A(I = "utf-8", D = { fatal: !1 }) {
    if (I !== "utf-8")
      throw new RangeError(`Failed to construct 'TextDecoder': The encoding label provided ('${I}') is invalid.`);
    if (D.fatal) throw new Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");
  }
  Object.defineProperty(A.prototype, "encoding", { value: "utf-8" }),
    Object.defineProperty(A.prototype, "fatal", { value: !1 }),
    Object.defineProperty(A.prototype, "ignoreBOM", { value: !1 }),
    (A.prototype.decode = function (I, D = { stream: !1 }) {
      if (D.stream) throw new Error("Failed to decode: the 'stream' option is unsupported.");
      const T = new Uint8Array(I);
      let C = 0;
      const R = T.length,
        B = [];
      for (; C < R; ) {
        const P = T[C++];
        if (P === 0) break;
        if (!(P & 128)) B.push(P);
        else if ((P & 224) === 192) {
          const O = T[C++] & 63;
          B.push(((P & 31) << 6) | O);
        } else if ((P & 240) === 224) {
          const O = T[C++] & 63,
            F = T[C++] & 63;
          B.push(((P & 31) << 12) | (O << 6) | F);
        } else if ((P & 248) === 240) {
          const O = T[C++] & 63,
            F = T[C++] & 63,
            L = T[C++] & 63;
          let U = ((P & 7) << 18) | (O << 12) | (F << 6) | L;
          U > 65535 && ((U -= 65536), B.push(((U >>> 10) & 1023) | 55296), (U = 56320 | (U & 1023))), B.push(U);
        }
      }
      return String.fromCharCode.apply(null, B);
    }),
    (E.TextEncoder = _),
    (E.TextDecoder = A);
})(typeof window < "u" ? window : typeof self < "u" ? self : globalThis);
function decode$5(E, _ = "utf8") {
  return new TextDecoder(_).decode(E);
}
const encoder$1 = new TextEncoder();
function encode$3(E) {
  return encoder$1.encode(E);
}
const defaultByteLength$1 = 1024 * 8,
  hostBigEndian = (() => {
    const E = new Uint8Array(4),
      _ = new Uint32Array(E.buffer);
    return !((_[0] = 1) & E[0]);
  })(),
  typedArrays = {
    int8: Int8Array,
    uint8: Uint8Array,
    int16: Int16Array,
    uint16: Uint16Array,
    int32: Int32Array,
    uint32: Uint32Array,
    uint64: BigUint64Array,
    int64: BigInt64Array,
    float32: Float32Array,
    float64: Float64Array,
  };
let IOBuffer$4 = class {
  constructor(_ = defaultByteLength$1, A = {}) {
    let I = !1;
    typeof _ == "number" ? (_ = new ArrayBuffer(_)) : ((I = !0), (this.lastWrittenByte = _.byteLength));
    const D = A.offset ? A.offset >>> 0 : 0,
      T = _.byteLength - D;
    let C = D;
    (ArrayBuffer.isView(_) || _ instanceof IOBuffer$4) &&
      (_.byteLength !== _.buffer.byteLength && (C = _.byteOffset + D), (_ = _.buffer)),
      I ? (this.lastWrittenByte = T) : (this.lastWrittenByte = 0),
      (this.buffer = _),
      (this.length = T),
      (this.byteLength = T),
      (this.byteOffset = C),
      (this.offset = 0),
      (this.littleEndian = !0),
      (this._data = new DataView(this.buffer, C, T)),
      (this._mark = 0),
      (this._marks = []);
  }
  available(_ = 1) {
    return this.offset + _ <= this.length;
  }
  isLittleEndian() {
    return this.littleEndian;
  }
  setLittleEndian() {
    return (this.littleEndian = !0), this;
  }
  isBigEndian() {
    return !this.littleEndian;
  }
  setBigEndian() {
    return (this.littleEndian = !1), this;
  }
  skip(_ = 1) {
    return (this.offset += _), this;
  }
  back(_ = 1) {
    return (this.offset -= _), this;
  }
  seek(_) {
    return (this.offset = _), this;
  }
  mark() {
    return (this._mark = this.offset), this;
  }
  reset() {
    return (this.offset = this._mark), this;
  }
  pushMark() {
    return this._marks.push(this.offset), this;
  }
  popMark() {
    const _ = this._marks.pop();
    if (_ === void 0) throw new Error("Mark stack empty");
    return this.seek(_), this;
  }
  rewind() {
    return (this.offset = 0), this;
  }
  ensureAvailable(_ = 1) {
    if (!this.available(_)) {
      const I = (this.offset + _) * 2,
        D = new Uint8Array(I);
      D.set(new Uint8Array(this.buffer)),
        (this.buffer = D.buffer),
        (this.length = this.byteLength = I),
        (this._data = new DataView(this.buffer));
    }
    return this;
  }
  readBoolean() {
    return this.readUint8() !== 0;
  }
  readInt8() {
    return this._data.getInt8(this.offset++);
  }
  readUint8() {
    return this._data.getUint8(this.offset++);
  }
  readByte() {
    return this.readUint8();
  }
  readBytes(_ = 1) {
    return this.readArray(_, "uint8");
  }
  readArray(_, A) {
    const I = typedArrays[A].BYTES_PER_ELEMENT * _,
      D = this.byteOffset + this.offset,
      T = this.buffer.slice(D, D + I);
    if (this.littleEndian === hostBigEndian && A !== "uint8" && A !== "int8") {
      const R = new Uint8Array(this.buffer.slice(D, D + I));
      R.reverse();
      const B = new typedArrays[A](R.buffer);
      return (this.offset += I), B.reverse(), B;
    }
    const C = new typedArrays[A](T);
    return (this.offset += I), C;
  }
  readInt16() {
    const _ = this._data.getInt16(this.offset, this.littleEndian);
    return (this.offset += 2), _;
  }
  readUint16() {
    const _ = this._data.getUint16(this.offset, this.littleEndian);
    return (this.offset += 2), _;
  }
  readInt32() {
    const _ = this._data.getInt32(this.offset, this.littleEndian);
    return (this.offset += 4), _;
  }
  readUint32() {
    const _ = this._data.getUint32(this.offset, this.littleEndian);
    return (this.offset += 4), _;
  }
  readFloat32() {
    const _ = this._data.getFloat32(this.offset, this.littleEndian);
    return (this.offset += 4), _;
  }
  readFloat64() {
    const _ = this._data.getFloat64(this.offset, this.littleEndian);
    return (this.offset += 8), _;
  }
  readBigInt64() {
    const _ = this._data.getBigInt64(this.offset, this.littleEndian);
    return (this.offset += 8), _;
  }
  readBigUint64() {
    const _ = this._data.getBigUint64(this.offset, this.littleEndian);
    return (this.offset += 8), _;
  }
  readChar() {
    return String.fromCharCode(this.readInt8());
  }
  readChars(_ = 1) {
    let A = "";
    for (let I = 0; I < _; I++) A += this.readChar();
    return A;
  }
  readUtf8(_ = 1) {
    return decode$5(this.readBytes(_));
  }
  decodeText(_ = 1, A = "utf-8") {
    return decode$5(this.readBytes(_), A);
  }
  writeBoolean(_) {
    return this.writeUint8(_ ? 255 : 0), this;
  }
  writeInt8(_) {
    return this.ensureAvailable(1), this._data.setInt8(this.offset++, _), this._updateLastWrittenByte(), this;
  }
  writeUint8(_) {
    return this.ensureAvailable(1), this._data.setUint8(this.offset++, _), this._updateLastWrittenByte(), this;
  }
  writeByte(_) {
    return this.writeUint8(_);
  }
  writeBytes(_) {
    this.ensureAvailable(_.length);
    for (let A = 0; A < _.length; A++) this._data.setUint8(this.offset++, _[A]);
    return this._updateLastWrittenByte(), this;
  }
  writeInt16(_) {
    return (
      this.ensureAvailable(2),
      this._data.setInt16(this.offset, _, this.littleEndian),
      (this.offset += 2),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeUint16(_) {
    return (
      this.ensureAvailable(2),
      this._data.setUint16(this.offset, _, this.littleEndian),
      (this.offset += 2),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeInt32(_) {
    return (
      this.ensureAvailable(4),
      this._data.setInt32(this.offset, _, this.littleEndian),
      (this.offset += 4),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeUint32(_) {
    return (
      this.ensureAvailable(4),
      this._data.setUint32(this.offset, _, this.littleEndian),
      (this.offset += 4),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeFloat32(_) {
    return (
      this.ensureAvailable(4),
      this._data.setFloat32(this.offset, _, this.littleEndian),
      (this.offset += 4),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeFloat64(_) {
    return (
      this.ensureAvailable(8),
      this._data.setFloat64(this.offset, _, this.littleEndian),
      (this.offset += 8),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeBigInt64(_) {
    return (
      this.ensureAvailable(8),
      this._data.setBigInt64(this.offset, _, this.littleEndian),
      (this.offset += 8),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeBigUint64(_) {
    return (
      this.ensureAvailable(8),
      this._data.setBigUint64(this.offset, _, this.littleEndian),
      (this.offset += 8),
      this._updateLastWrittenByte(),
      this
    );
  }
  writeChar(_) {
    return this.writeUint8(_.charCodeAt(0));
  }
  writeChars(_) {
    for (let A = 0; A < _.length; A++) this.writeUint8(_.charCodeAt(A));
    return this;
  }
  writeUtf8(_) {
    return this.writeBytes(encode$3(_));
  }
  toArray() {
    return new Uint8Array(this.buffer, this.byteOffset, this.lastWrittenByte);
  }
  _updateLastWrittenByte() {
    this.offset > this.lastWrittenByte && (this.lastWrittenByte = this.offset);
  }
};
const IOBuffer$5 = Object.freeze(
    Object.defineProperty({ __proto__: null, IOBuffer: IOBuffer$4 }, Symbol.toStringTag, { value: "Module" }),
  ),
  require$$0$3 = getAugmentedNamespace(IOBuffer$5);
var constants$4 = {
  BITMAPV5HEADER: {
    LogicalColorSpace: { LCS_CALIBRATED_RGB: 0, LCS_sRGB: 1934772034, LCS_WINDOWS_COLOR_SPACE: 1466527264 },
    Compression: {
      BI_RGB: 0,
      BI_RLE8: 1,
      BI_RLE4: 2,
      BI_BITFIELDS: 3,
      BI_JPEG: 4,
      BI_PNG: 5,
      BI_CMYK: 11,
      BI_CMYKRLE8: 12,
      BI_CMYKRLE4: 13,
    },
    GamutMappingIntent: { LCS_GM_ABS_COLORIMETRIC: 8, LCS_GM_BUSINESS: 1, LCS_GM_GRAPHICS: 2, LCS_GM_IMAGES: 4 },
  },
};
const { IOBuffer: IOBuffer$3 } = require$$0$3,
  constants$3 = constants$4,
  tableLeft = [];
for (let E = 0; E <= 8; E++) tableLeft.push(255 << E);
class BMPEncoder extends IOBuffer$3 {
  constructor(_) {
    if (_.bitDepth !== 1) throw new Error("Only bitDepth of 1 is supported");
    if (!_.height || !_.width) throw new Error("ImageData width and height are required");
    super(_.data),
      (this.width = _.width),
      (this.height = _.height),
      (this.bitDepth = _.bitDepth),
      (this.channels = _.channels),
      (this.components = _.components);
  }
  encode() {
    (this.encoded = new IOBuffer$3()), this.encoded.skip(14), this.writeBitmapV5Header(), this.writeColorTable();
    const _ = this.encoded.offset;
    return this.writePixelArray(), this.encoded.rewind(), this.writeBitmapFileHeader(_), this.encoded.toArray();
  }
  writePixelArray() {
    let _ = this.encoded;
    const A = Math.floor((this.bitDepth * this.width + 31) / 32) * 4,
      I = Math.ceil((this.bitDepth * this.width) / 8),
      D = A - I,
      T = (this.bitDepth * this.width) % 8,
      C = T === 0 ? 0 : 8 - T,
      R = A * this.height;
    let B,
      P,
      O = 0,
      F = 0,
      L = 8;
    _.mark(), (P = this.readUint8());
    for (let U = this.height - 1; U >= 0; U--) {
      const z = U === 0;
      _.reset(), _.skip(U * A);
      for (let V = 0; V < I; V++) {
        const X = V === I - 1;
        F <= C && X
          ? (_.writeByte(P << F), (C === 0 || C === F) && !z && ((B = P), (P = this.readByte())))
          : F === 0
            ? ((B = P), (P = this.readUint8()), _.writeByte(B))
            : ((B = P), (P = this.readUint8()), _.writeByte(((B << F) & tableLeft[F]) | (P >> L))),
          X && ((O += T || 0), _.skip(D), (F = O % 8), (L = 8 - F));
      }
    }
    A > I && (_.reset(), _.skip(R - 1), _.writeUint8(0));
  }
  writeColorTable() {
    this.encoded.writeUint32(0).writeUint32(16777215);
  }
  writeBitmapFileHeader(_) {
    this.encoded.writeChars("BM").writeInt32(this.encoded.lastWrittenByte).writeUint16(0).writeUint16(0).writeUint32(_);
  }
  writeBitmapV5Header() {
    const A = Math.floor((this.bitDepth * this.width + 31) / 32) * 4 * this.height;
    this.encoded
      .writeUint32(124)
      .writeInt32(this.width)
      .writeInt32(this.height)
      .writeUint16(1)
      .writeUint16(this.bitDepth)
      .writeUint32(constants$3.BITMAPV5HEADER.Compression.BI_RGB)
      .writeUint32(A)
      .writeInt32(0)
      .writeInt32(0)
      .writeUint32(Math.pow(2, this.bitDepth))
      .writeUint32(Math.pow(2, this.bitDepth))
      .writeUint32(4278190080)
      .writeUint32(16711680)
      .writeUint32(65280)
      .writeUint32(255)
      .writeUint32(constants$3.BITMAPV5HEADER.LogicalColorSpace.LCS_sRGB)
      .skip(36)
      .skip(12)
      .writeUint32(constants$3.BITMAPV5HEADER.GamutMappingIntent.LCS_GM_IMAGES)
      .skip(12);
  }
}
var BMPEncoder_1 = BMPEncoder;
const Encoder = BMPEncoder_1;
var encode$2 = function (_) {
  return new Encoder(_).encode();
};
/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */ const Z_FIXED$1 = 4,
  Z_BINARY = 0,
  Z_TEXT = 1,
  Z_UNKNOWN$1 = 2;
function zero$1(E) {
  let _ = E.length;
  for (; --_ >= 0; ) E[_] = 0;
}
const STORED_BLOCK = 0,
  STATIC_TREES = 1,
  DYN_TREES = 2,
  MIN_MATCH$1 = 3,
  MAX_MATCH$1 = 258,
  LENGTH_CODES$1 = 29,
  LITERALS$1 = 256,
  L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1,
  D_CODES$1 = 30,
  BL_CODES$1 = 19,
  HEAP_SIZE$1 = 2 * L_CODES$1 + 1,
  MAX_BITS$1 = 15,
  Buf_size = 16,
  MAX_BL_BITS = 7,
  END_BLOCK = 256,
  REP_3_6 = 16,
  REPZ_3_10 = 17,
  REPZ_11_138 = 18,
  extra_lbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
  extra_dbits = new Uint8Array([
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13,
  ]),
  extra_blbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
  bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  DIST_CODE_LEN = 512,
  static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
const static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
const _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
const _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
const base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
const base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(E, _, A, I, D) {
  (this.static_tree = E),
    (this.extra_bits = _),
    (this.extra_base = A),
    (this.elems = I),
    (this.max_length = D),
    (this.has_stree = E && E.length);
}
let static_l_desc, static_d_desc, static_bl_desc;
function TreeDesc(E, _) {
  (this.dyn_tree = E), (this.max_code = 0), (this.stat_desc = _);
}
const d_code = (E) => (E < 256 ? _dist_code[E] : _dist_code[256 + (E >>> 7)]),
  put_short = (E, _) => {
    (E.pending_buf[E.pending++] = _ & 255), (E.pending_buf[E.pending++] = (_ >>> 8) & 255);
  },
  send_bits = (E, _, A) => {
    E.bi_valid > Buf_size - A
      ? ((E.bi_buf |= (_ << E.bi_valid) & 65535),
        put_short(E, E.bi_buf),
        (E.bi_buf = _ >> (Buf_size - E.bi_valid)),
        (E.bi_valid += A - Buf_size))
      : ((E.bi_buf |= (_ << E.bi_valid) & 65535), (E.bi_valid += A));
  },
  send_code = (E, _, A) => {
    send_bits(E, A[_ * 2], A[_ * 2 + 1]);
  },
  bi_reverse = (E, _) => {
    let A = 0;
    do (A |= E & 1), (E >>>= 1), (A <<= 1);
    while (--_ > 0);
    return A >>> 1;
  },
  bi_flush = (E) => {
    E.bi_valid === 16
      ? (put_short(E, E.bi_buf), (E.bi_buf = 0), (E.bi_valid = 0))
      : E.bi_valid >= 8 && ((E.pending_buf[E.pending++] = E.bi_buf & 255), (E.bi_buf >>= 8), (E.bi_valid -= 8));
  },
  gen_bitlen = (E, _) => {
    const A = _.dyn_tree,
      I = _.max_code,
      D = _.stat_desc.static_tree,
      T = _.stat_desc.has_stree,
      C = _.stat_desc.extra_bits,
      R = _.stat_desc.extra_base,
      B = _.stat_desc.max_length;
    let P,
      O,
      F,
      L,
      U,
      z,
      V = 0;
    for (L = 0; L <= MAX_BITS$1; L++) E.bl_count[L] = 0;
    for (A[E.heap[E.heap_max] * 2 + 1] = 0, P = E.heap_max + 1; P < HEAP_SIZE$1; P++)
      (O = E.heap[P]),
        (L = A[A[O * 2 + 1] * 2 + 1] + 1),
        L > B && ((L = B), V++),
        (A[O * 2 + 1] = L),
        !(O > I) &&
          (E.bl_count[L]++,
          (U = 0),
          O >= R && (U = C[O - R]),
          (z = A[O * 2]),
          (E.opt_len += z * (L + U)),
          T && (E.static_len += z * (D[O * 2 + 1] + U)));
    if (V !== 0) {
      do {
        for (L = B - 1; E.bl_count[L] === 0; ) L--;
        E.bl_count[L]--, (E.bl_count[L + 1] += 2), E.bl_count[B]--, (V -= 2);
      } while (V > 0);
      for (L = B; L !== 0; L--)
        for (O = E.bl_count[L]; O !== 0; )
          (F = E.heap[--P]),
            !(F > I) && (A[F * 2 + 1] !== L && ((E.opt_len += (L - A[F * 2 + 1]) * A[F * 2]), (A[F * 2 + 1] = L)), O--);
    }
  },
  gen_codes = (E, _, A) => {
    const I = new Array(MAX_BITS$1 + 1);
    let D = 0,
      T,
      C;
    for (T = 1; T <= MAX_BITS$1; T++) (D = (D + A[T - 1]) << 1), (I[T] = D);
    for (C = 0; C <= _; C++) {
      let R = E[C * 2 + 1];
      R !== 0 && (E[C * 2] = bi_reverse(I[R]++, R));
    }
  },
  tr_static_init = () => {
    let E, _, A, I, D;
    const T = new Array(MAX_BITS$1 + 1);
    for (A = 0, I = 0; I < LENGTH_CODES$1 - 1; I++)
      for (base_length[I] = A, E = 0; E < 1 << extra_lbits[I]; E++) _length_code[A++] = I;
    for (_length_code[A - 1] = I, D = 0, I = 0; I < 16; I++)
      for (base_dist[I] = D, E = 0; E < 1 << extra_dbits[I]; E++) _dist_code[D++] = I;
    for (D >>= 7; I < D_CODES$1; I++)
      for (base_dist[I] = D << 7, E = 0; E < 1 << (extra_dbits[I] - 7); E++) _dist_code[256 + D++] = I;
    for (_ = 0; _ <= MAX_BITS$1; _++) T[_] = 0;
    for (E = 0; E <= 143; ) (static_ltree[E * 2 + 1] = 8), E++, T[8]++;
    for (; E <= 255; ) (static_ltree[E * 2 + 1] = 9), E++, T[9]++;
    for (; E <= 279; ) (static_ltree[E * 2 + 1] = 7), E++, T[7]++;
    for (; E <= 287; ) (static_ltree[E * 2 + 1] = 8), E++, T[8]++;
    for (gen_codes(static_ltree, L_CODES$1 + 1, T), E = 0; E < D_CODES$1; E++)
      (static_dtree[E * 2 + 1] = 5), (static_dtree[E * 2] = bi_reverse(E, 5));
    (static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1)),
      (static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1)),
      (static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS));
  },
  init_block = (E) => {
    let _;
    for (_ = 0; _ < L_CODES$1; _++) E.dyn_ltree[_ * 2] = 0;
    for (_ = 0; _ < D_CODES$1; _++) E.dyn_dtree[_ * 2] = 0;
    for (_ = 0; _ < BL_CODES$1; _++) E.bl_tree[_ * 2] = 0;
    (E.dyn_ltree[END_BLOCK * 2] = 1), (E.opt_len = E.static_len = 0), (E.sym_next = E.matches = 0);
  },
  bi_windup = (E) => {
    E.bi_valid > 8 ? put_short(E, E.bi_buf) : E.bi_valid > 0 && (E.pending_buf[E.pending++] = E.bi_buf),
      (E.bi_buf = 0),
      (E.bi_valid = 0);
  },
  smaller = (E, _, A, I) => {
    const D = _ * 2,
      T = A * 2;
    return E[D] < E[T] || (E[D] === E[T] && I[_] <= I[A]);
  },
  pqdownheap = (E, _, A) => {
    const I = E.heap[A];
    let D = A << 1;
    for (
      ;
      D <= E.heap_len &&
      (D < E.heap_len && smaller(_, E.heap[D + 1], E.heap[D], E.depth) && D++, !smaller(_, I, E.heap[D], E.depth));

    )
      (E.heap[A] = E.heap[D]), (A = D), (D <<= 1);
    E.heap[A] = I;
  },
  compress_block = (E, _, A) => {
    let I,
      D,
      T = 0,
      C,
      R;
    if (E.sym_next !== 0)
      do
        (I = E.pending_buf[E.sym_buf + T++] & 255),
          (I += (E.pending_buf[E.sym_buf + T++] & 255) << 8),
          (D = E.pending_buf[E.sym_buf + T++]),
          I === 0
            ? send_code(E, D, _)
            : ((C = _length_code[D]),
              send_code(E, C + LITERALS$1 + 1, _),
              (R = extra_lbits[C]),
              R !== 0 && ((D -= base_length[C]), send_bits(E, D, R)),
              I--,
              (C = d_code(I)),
              send_code(E, C, A),
              (R = extra_dbits[C]),
              R !== 0 && ((I -= base_dist[C]), send_bits(E, I, R)));
      while (T < E.sym_next);
    send_code(E, END_BLOCK, _);
  },
  build_tree = (E, _) => {
    const A = _.dyn_tree,
      I = _.stat_desc.static_tree,
      D = _.stat_desc.has_stree,
      T = _.stat_desc.elems;
    let C,
      R,
      B = -1,
      P;
    for (E.heap_len = 0, E.heap_max = HEAP_SIZE$1, C = 0; C < T; C++)
      A[C * 2] !== 0 ? ((E.heap[++E.heap_len] = B = C), (E.depth[C] = 0)) : (A[C * 2 + 1] = 0);
    for (; E.heap_len < 2; )
      (P = E.heap[++E.heap_len] = B < 2 ? ++B : 0),
        (A[P * 2] = 1),
        (E.depth[P] = 0),
        E.opt_len--,
        D && (E.static_len -= I[P * 2 + 1]);
    for (_.max_code = B, C = E.heap_len >> 1; C >= 1; C--) pqdownheap(E, A, C);
    P = T;
    do
      (C = E.heap[1]),
        (E.heap[1] = E.heap[E.heap_len--]),
        pqdownheap(E, A, 1),
        (R = E.heap[1]),
        (E.heap[--E.heap_max] = C),
        (E.heap[--E.heap_max] = R),
        (A[P * 2] = A[C * 2] + A[R * 2]),
        (E.depth[P] = (E.depth[C] >= E.depth[R] ? E.depth[C] : E.depth[R]) + 1),
        (A[C * 2 + 1] = A[R * 2 + 1] = P),
        (E.heap[1] = P++),
        pqdownheap(E, A, 1);
    while (E.heap_len >= 2);
    (E.heap[--E.heap_max] = E.heap[1]), gen_bitlen(E, _), gen_codes(A, B, E.bl_count);
  },
  scan_tree = (E, _, A) => {
    let I,
      D = -1,
      T,
      C = _[0 * 2 + 1],
      R = 0,
      B = 7,
      P = 4;
    for (C === 0 && ((B = 138), (P = 3)), _[(A + 1) * 2 + 1] = 65535, I = 0; I <= A; I++)
      (T = C),
        (C = _[(I + 1) * 2 + 1]),
        !(++R < B && T === C) &&
          (R < P
            ? (E.bl_tree[T * 2] += R)
            : T !== 0
              ? (T !== D && E.bl_tree[T * 2]++, E.bl_tree[REP_3_6 * 2]++)
              : R <= 10
                ? E.bl_tree[REPZ_3_10 * 2]++
                : E.bl_tree[REPZ_11_138 * 2]++,
          (R = 0),
          (D = T),
          C === 0 ? ((B = 138), (P = 3)) : T === C ? ((B = 6), (P = 3)) : ((B = 7), (P = 4)));
  },
  send_tree = (E, _, A) => {
    let I,
      D = -1,
      T,
      C = _[0 * 2 + 1],
      R = 0,
      B = 7,
      P = 4;
    for (C === 0 && ((B = 138), (P = 3)), I = 0; I <= A; I++)
      if (((T = C), (C = _[(I + 1) * 2 + 1]), !(++R < B && T === C))) {
        if (R < P)
          do send_code(E, T, E.bl_tree);
          while (--R !== 0);
        else
          T !== 0
            ? (T !== D && (send_code(E, T, E.bl_tree), R--), send_code(E, REP_3_6, E.bl_tree), send_bits(E, R - 3, 2))
            : R <= 10
              ? (send_code(E, REPZ_3_10, E.bl_tree), send_bits(E, R - 3, 3))
              : (send_code(E, REPZ_11_138, E.bl_tree), send_bits(E, R - 11, 7));
        (R = 0), (D = T), C === 0 ? ((B = 138), (P = 3)) : T === C ? ((B = 6), (P = 3)) : ((B = 7), (P = 4));
      }
  },
  build_bl_tree = (E) => {
    let _;
    for (
      scan_tree(E, E.dyn_ltree, E.l_desc.max_code),
        scan_tree(E, E.dyn_dtree, E.d_desc.max_code),
        build_tree(E, E.bl_desc),
        _ = BL_CODES$1 - 1;
      _ >= 3 && E.bl_tree[bl_order[_] * 2 + 1] === 0;
      _--
    );
    return (E.opt_len += 3 * (_ + 1) + 5 + 5 + 4), _;
  },
  send_all_trees = (E, _, A, I) => {
    let D;
    for (send_bits(E, _ - 257, 5), send_bits(E, A - 1, 5), send_bits(E, I - 4, 4), D = 0; D < I; D++)
      send_bits(E, E.bl_tree[bl_order[D] * 2 + 1], 3);
    send_tree(E, E.dyn_ltree, _ - 1), send_tree(E, E.dyn_dtree, A - 1);
  },
  detect_data_type = (E) => {
    let _ = 4093624447,
      A;
    for (A = 0; A <= 31; A++, _ >>>= 1) if (_ & 1 && E.dyn_ltree[A * 2] !== 0) return Z_BINARY;
    if (E.dyn_ltree[9 * 2] !== 0 || E.dyn_ltree[10 * 2] !== 0 || E.dyn_ltree[13 * 2] !== 0) return Z_TEXT;
    for (A = 32; A < LITERALS$1; A++) if (E.dyn_ltree[A * 2] !== 0) return Z_TEXT;
    return Z_BINARY;
  };
let static_init_done = !1;
const _tr_init$1 = (E) => {
    static_init_done || (tr_static_init(), (static_init_done = !0)),
      (E.l_desc = new TreeDesc(E.dyn_ltree, static_l_desc)),
      (E.d_desc = new TreeDesc(E.dyn_dtree, static_d_desc)),
      (E.bl_desc = new TreeDesc(E.bl_tree, static_bl_desc)),
      (E.bi_buf = 0),
      (E.bi_valid = 0),
      init_block(E);
  },
  _tr_stored_block$1 = (E, _, A, I) => {
    send_bits(E, (STORED_BLOCK << 1) + (I ? 1 : 0), 3),
      bi_windup(E),
      put_short(E, A),
      put_short(E, ~A),
      A && E.pending_buf.set(E.window.subarray(_, _ + A), E.pending),
      (E.pending += A);
  },
  _tr_align$1 = (E) => {
    send_bits(E, STATIC_TREES << 1, 3), send_code(E, END_BLOCK, static_ltree), bi_flush(E);
  },
  _tr_flush_block$1 = (E, _, A, I) => {
    let D,
      T,
      C = 0;
    E.level > 0
      ? (E.strm.data_type === Z_UNKNOWN$1 && (E.strm.data_type = detect_data_type(E)),
        build_tree(E, E.l_desc),
        build_tree(E, E.d_desc),
        (C = build_bl_tree(E)),
        (D = (E.opt_len + 3 + 7) >>> 3),
        (T = (E.static_len + 3 + 7) >>> 3),
        T <= D && (D = T))
      : (D = T = A + 5),
      A + 4 <= D && _ !== -1
        ? _tr_stored_block$1(E, _, A, I)
        : E.strategy === Z_FIXED$1 || T === D
          ? (send_bits(E, (STATIC_TREES << 1) + (I ? 1 : 0), 3), compress_block(E, static_ltree, static_dtree))
          : (send_bits(E, (DYN_TREES << 1) + (I ? 1 : 0), 3),
            send_all_trees(E, E.l_desc.max_code + 1, E.d_desc.max_code + 1, C + 1),
            compress_block(E, E.dyn_ltree, E.dyn_dtree)),
      init_block(E),
      I && bi_windup(E);
  },
  _tr_tally$1 = (E, _, A) => (
    (E.pending_buf[E.sym_buf + E.sym_next++] = _),
    (E.pending_buf[E.sym_buf + E.sym_next++] = _ >> 8),
    (E.pending_buf[E.sym_buf + E.sym_next++] = A),
    _ === 0
      ? E.dyn_ltree[A * 2]++
      : (E.matches++, _--, E.dyn_ltree[(_length_code[A] + LITERALS$1 + 1) * 2]++, E.dyn_dtree[d_code(_) * 2]++),
    E.sym_next === E.sym_end
  );
var _tr_init_1 = _tr_init$1,
  _tr_stored_block_1 = _tr_stored_block$1,
  _tr_flush_block_1 = _tr_flush_block$1,
  _tr_tally_1 = _tr_tally$1,
  _tr_align_1 = _tr_align$1,
  trees = {
    _tr_init: _tr_init_1,
    _tr_stored_block: _tr_stored_block_1,
    _tr_flush_block: _tr_flush_block_1,
    _tr_tally: _tr_tally_1,
    _tr_align: _tr_align_1,
  };
const adler32 = (E, _, A, I) => {
  let D = (E & 65535) | 0,
    T = ((E >>> 16) & 65535) | 0,
    C = 0;
  for (; A !== 0; ) {
    (C = A > 2e3 ? 2e3 : A), (A -= C);
    do (D = (D + _[I++]) | 0), (T = (T + D) | 0);
    while (--C);
    (D %= 65521), (T %= 65521);
  }
  return D | (T << 16) | 0;
};
var adler32_1 = adler32;
const makeTable = () => {
    let E,
      _ = [];
    for (var A = 0; A < 256; A++) {
      E = A;
      for (var I = 0; I < 8; I++) E = E & 1 ? 3988292384 ^ (E >>> 1) : E >>> 1;
      _[A] = E;
    }
    return _;
  },
  crcTable$1 = new Uint32Array(makeTable()),
  crc32 = (E, _, A, I) => {
    const D = crcTable$1,
      T = I + A;
    E ^= -1;
    for (let C = I; C < T; C++) E = (E >>> 8) ^ D[(E ^ _[C]) & 255];
    return E ^ -1;
  };
var crc32_1 = crc32,
  messages = {
    2: "need dictionary",
    1: "stream end",
    0: "",
    "-1": "file error",
    "-2": "stream error",
    "-3": "data error",
    "-4": "insufficient memory",
    "-5": "buffer error",
    "-6": "incompatible version",
  },
  constants$2 = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8,
  };
const { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees,
  {
    Z_NO_FLUSH: Z_NO_FLUSH$2,
    Z_PARTIAL_FLUSH,
    Z_FULL_FLUSH: Z_FULL_FLUSH$1,
    Z_FINISH: Z_FINISH$3,
    Z_BLOCK: Z_BLOCK$1,
    Z_OK: Z_OK$3,
    Z_STREAM_END: Z_STREAM_END$3,
    Z_STREAM_ERROR: Z_STREAM_ERROR$2,
    Z_DATA_ERROR: Z_DATA_ERROR$2,
    Z_BUF_ERROR: Z_BUF_ERROR$1,
    Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
    Z_FILTERED,
    Z_HUFFMAN_ONLY,
    Z_RLE,
    Z_FIXED,
    Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
    Z_UNKNOWN,
    Z_DEFLATED: Z_DEFLATED$2,
  } = constants$2,
  MAX_MEM_LEVEL = 9,
  MAX_WBITS$1 = 15,
  DEF_MEM_LEVEL = 8,
  LENGTH_CODES = 29,
  LITERALS = 256,
  L_CODES = LITERALS + 1 + LENGTH_CODES,
  D_CODES = 30,
  BL_CODES = 19,
  HEAP_SIZE = 2 * L_CODES + 1,
  MAX_BITS = 15,
  MIN_MATCH = 3,
  MAX_MATCH = 258,
  MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1,
  PRESET_DICT = 32,
  INIT_STATE = 42,
  GZIP_STATE = 57,
  EXTRA_STATE = 69,
  NAME_STATE = 73,
  COMMENT_STATE = 91,
  HCRC_STATE = 103,
  BUSY_STATE = 113,
  FINISH_STATE = 666,
  BS_NEED_MORE = 1,
  BS_BLOCK_DONE = 2,
  BS_FINISH_STARTED = 3,
  BS_FINISH_DONE = 4,
  OS_CODE = 3,
  err = (E, _) => ((E.msg = messages[_]), _),
  rank = (E) => E * 2 - (E > 4 ? 9 : 0),
  zero = (E) => {
    let _ = E.length;
    for (; --_ >= 0; ) E[_] = 0;
  },
  slide_hash = (E) => {
    let _,
      A,
      I,
      D = E.w_size;
    (_ = E.hash_size), (I = _);
    do (A = E.head[--I]), (E.head[I] = A >= D ? A - D : 0);
    while (--_);
    (_ = D), (I = _);
    do (A = E.prev[--I]), (E.prev[I] = A >= D ? A - D : 0);
    while (--_);
  };
let HASH_ZLIB = (E, _, A) => ((_ << E.hash_shift) ^ A) & E.hash_mask,
  HASH = HASH_ZLIB;
const flush_pending = (E) => {
    const _ = E.state;
    let A = _.pending;
    A > E.avail_out && (A = E.avail_out),
      A !== 0 &&
        (E.output.set(_.pending_buf.subarray(_.pending_out, _.pending_out + A), E.next_out),
        (E.next_out += A),
        (_.pending_out += A),
        (E.total_out += A),
        (E.avail_out -= A),
        (_.pending -= A),
        _.pending === 0 && (_.pending_out = 0));
  },
  flush_block_only = (E, _) => {
    _tr_flush_block(E, E.block_start >= 0 ? E.block_start : -1, E.strstart - E.block_start, _),
      (E.block_start = E.strstart),
      flush_pending(E.strm);
  },
  put_byte = (E, _) => {
    E.pending_buf[E.pending++] = _;
  },
  putShortMSB = (E, _) => {
    (E.pending_buf[E.pending++] = (_ >>> 8) & 255), (E.pending_buf[E.pending++] = _ & 255);
  },
  read_buf = (E, _, A, I) => {
    let D = E.avail_in;
    return (
      D > I && (D = I),
      D === 0
        ? 0
        : ((E.avail_in -= D),
          _.set(E.input.subarray(E.next_in, E.next_in + D), A),
          E.state.wrap === 1
            ? (E.adler = adler32_1(E.adler, _, D, A))
            : E.state.wrap === 2 && (E.adler = crc32_1(E.adler, _, D, A)),
          (E.next_in += D),
          (E.total_in += D),
          D)
    );
  },
  longest_match = (E, _) => {
    let A = E.max_chain_length,
      I = E.strstart,
      D,
      T,
      C = E.prev_length,
      R = E.nice_match;
    const B = E.strstart > E.w_size - MIN_LOOKAHEAD ? E.strstart - (E.w_size - MIN_LOOKAHEAD) : 0,
      P = E.window,
      O = E.w_mask,
      F = E.prev,
      L = E.strstart + MAX_MATCH;
    let U = P[I + C - 1],
      z = P[I + C];
    E.prev_length >= E.good_match && (A >>= 2), R > E.lookahead && (R = E.lookahead);
    do
      if (((D = _), !(P[D + C] !== z || P[D + C - 1] !== U || P[D] !== P[I] || P[++D] !== P[I + 1]))) {
        (I += 2), D++;
        do;
        while (
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          P[++I] === P[++D] &&
          I < L
        );
        if (((T = MAX_MATCH - (L - I)), (I = L - MAX_MATCH), T > C)) {
          if (((E.match_start = _), (C = T), T >= R)) break;
          (U = P[I + C - 1]), (z = P[I + C]);
        }
      }
    while ((_ = F[_ & O]) > B && --A !== 0);
    return C <= E.lookahead ? C : E.lookahead;
  },
  fill_window = (E) => {
    const _ = E.w_size;
    let A, I, D;
    do {
      if (
        ((I = E.window_size - E.lookahead - E.strstart),
        E.strstart >= _ + (_ - MIN_LOOKAHEAD) &&
          (E.window.set(E.window.subarray(_, _ + _ - I), 0),
          (E.match_start -= _),
          (E.strstart -= _),
          (E.block_start -= _),
          E.insert > E.strstart && (E.insert = E.strstart),
          slide_hash(E),
          (I += _)),
        E.strm.avail_in === 0)
      )
        break;
      if (
        ((A = read_buf(E.strm, E.window, E.strstart + E.lookahead, I)),
        (E.lookahead += A),
        E.lookahead + E.insert >= MIN_MATCH)
      )
        for (
          D = E.strstart - E.insert, E.ins_h = E.window[D], E.ins_h = HASH(E, E.ins_h, E.window[D + 1]);
          E.insert &&
          ((E.ins_h = HASH(E, E.ins_h, E.window[D + MIN_MATCH - 1])),
          (E.prev[D & E.w_mask] = E.head[E.ins_h]),
          (E.head[E.ins_h] = D),
          D++,
          E.insert--,
          !(E.lookahead + E.insert < MIN_MATCH));

        );
    } while (E.lookahead < MIN_LOOKAHEAD && E.strm.avail_in !== 0);
  },
  deflate_stored = (E, _) => {
    let A = E.pending_buf_size - 5 > E.w_size ? E.w_size : E.pending_buf_size - 5,
      I,
      D,
      T,
      C = 0,
      R = E.strm.avail_in;
    do {
      if (
        ((I = 65535),
        (T = (E.bi_valid + 42) >> 3),
        E.strm.avail_out < T ||
          ((T = E.strm.avail_out - T),
          (D = E.strstart - E.block_start),
          I > D + E.strm.avail_in && (I = D + E.strm.avail_in),
          I > T && (I = T),
          I < A && ((I === 0 && _ !== Z_FINISH$3) || _ === Z_NO_FLUSH$2 || I !== D + E.strm.avail_in)))
      )
        break;
      (C = _ === Z_FINISH$3 && I === D + E.strm.avail_in ? 1 : 0),
        _tr_stored_block(E, 0, 0, C),
        (E.pending_buf[E.pending - 4] = I),
        (E.pending_buf[E.pending - 3] = I >> 8),
        (E.pending_buf[E.pending - 2] = ~I),
        (E.pending_buf[E.pending - 1] = ~I >> 8),
        flush_pending(E.strm),
        D &&
          (D > I && (D = I),
          E.strm.output.set(E.window.subarray(E.block_start, E.block_start + D), E.strm.next_out),
          (E.strm.next_out += D),
          (E.strm.avail_out -= D),
          (E.strm.total_out += D),
          (E.block_start += D),
          (I -= D)),
        I &&
          (read_buf(E.strm, E.strm.output, E.strm.next_out, I),
          (E.strm.next_out += I),
          (E.strm.avail_out -= I),
          (E.strm.total_out += I));
    } while (C === 0);
    return (
      (R -= E.strm.avail_in),
      R &&
        (R >= E.w_size
          ? ((E.matches = 2),
            E.window.set(E.strm.input.subarray(E.strm.next_in - E.w_size, E.strm.next_in), 0),
            (E.strstart = E.w_size),
            (E.insert = E.strstart))
          : (E.window_size - E.strstart <= R &&
              ((E.strstart -= E.w_size),
              E.window.set(E.window.subarray(E.w_size, E.w_size + E.strstart), 0),
              E.matches < 2 && E.matches++,
              E.insert > E.strstart && (E.insert = E.strstart)),
            E.window.set(E.strm.input.subarray(E.strm.next_in - R, E.strm.next_in), E.strstart),
            (E.strstart += R),
            (E.insert += R > E.w_size - E.insert ? E.w_size - E.insert : R)),
        (E.block_start = E.strstart)),
      E.high_water < E.strstart && (E.high_water = E.strstart),
      C
        ? BS_FINISH_DONE
        : _ !== Z_NO_FLUSH$2 && _ !== Z_FINISH$3 && E.strm.avail_in === 0 && E.strstart === E.block_start
          ? BS_BLOCK_DONE
          : ((T = E.window_size - E.strstart),
            E.strm.avail_in > T &&
              E.block_start >= E.w_size &&
              ((E.block_start -= E.w_size),
              (E.strstart -= E.w_size),
              E.window.set(E.window.subarray(E.w_size, E.w_size + E.strstart), 0),
              E.matches < 2 && E.matches++,
              (T += E.w_size),
              E.insert > E.strstart && (E.insert = E.strstart)),
            T > E.strm.avail_in && (T = E.strm.avail_in),
            T &&
              (read_buf(E.strm, E.window, E.strstart, T),
              (E.strstart += T),
              (E.insert += T > E.w_size - E.insert ? E.w_size - E.insert : T)),
            E.high_water < E.strstart && (E.high_water = E.strstart),
            (T = (E.bi_valid + 42) >> 3),
            (T = E.pending_buf_size - T > 65535 ? 65535 : E.pending_buf_size - T),
            (A = T > E.w_size ? E.w_size : T),
            (D = E.strstart - E.block_start),
            (D >= A || ((D || _ === Z_FINISH$3) && _ !== Z_NO_FLUSH$2 && E.strm.avail_in === 0 && D <= T)) &&
              ((I = D > T ? T : D),
              (C = _ === Z_FINISH$3 && E.strm.avail_in === 0 && I === D ? 1 : 0),
              _tr_stored_block(E, E.block_start, I, C),
              (E.block_start += I),
              flush_pending(E.strm)),
            C ? BS_FINISH_STARTED : BS_NEED_MORE)
    );
  },
  deflate_fast = (E, _) => {
    let A, I;
    for (;;) {
      if (E.lookahead < MIN_LOOKAHEAD) {
        if ((fill_window(E), E.lookahead < MIN_LOOKAHEAD && _ === Z_NO_FLUSH$2)) return BS_NEED_MORE;
        if (E.lookahead === 0) break;
      }
      if (
        ((A = 0),
        E.lookahead >= MIN_MATCH &&
          ((E.ins_h = HASH(E, E.ins_h, E.window[E.strstart + MIN_MATCH - 1])),
          (A = E.prev[E.strstart & E.w_mask] = E.head[E.ins_h]),
          (E.head[E.ins_h] = E.strstart)),
        A !== 0 && E.strstart - A <= E.w_size - MIN_LOOKAHEAD && (E.match_length = longest_match(E, A)),
        E.match_length >= MIN_MATCH)
      )
        if (
          ((I = _tr_tally(E, E.strstart - E.match_start, E.match_length - MIN_MATCH)),
          (E.lookahead -= E.match_length),
          E.match_length <= E.max_lazy_match && E.lookahead >= MIN_MATCH)
        ) {
          E.match_length--;
          do
            E.strstart++,
              (E.ins_h = HASH(E, E.ins_h, E.window[E.strstart + MIN_MATCH - 1])),
              (A = E.prev[E.strstart & E.w_mask] = E.head[E.ins_h]),
              (E.head[E.ins_h] = E.strstart);
          while (--E.match_length !== 0);
          E.strstart++;
        } else
          (E.strstart += E.match_length),
            (E.match_length = 0),
            (E.ins_h = E.window[E.strstart]),
            (E.ins_h = HASH(E, E.ins_h, E.window[E.strstart + 1]));
      else (I = _tr_tally(E, 0, E.window[E.strstart])), E.lookahead--, E.strstart++;
      if (I && (flush_block_only(E, !1), E.strm.avail_out === 0)) return BS_NEED_MORE;
    }
    return (
      (E.insert = E.strstart < MIN_MATCH - 1 ? E.strstart : MIN_MATCH - 1),
      _ === Z_FINISH$3
        ? (flush_block_only(E, !0), E.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE)
        : E.sym_next && (flush_block_only(E, !1), E.strm.avail_out === 0)
          ? BS_NEED_MORE
          : BS_BLOCK_DONE
    );
  },
  deflate_slow = (E, _) => {
    let A, I, D;
    for (;;) {
      if (E.lookahead < MIN_LOOKAHEAD) {
        if ((fill_window(E), E.lookahead < MIN_LOOKAHEAD && _ === Z_NO_FLUSH$2)) return BS_NEED_MORE;
        if (E.lookahead === 0) break;
      }
      if (
        ((A = 0),
        E.lookahead >= MIN_MATCH &&
          ((E.ins_h = HASH(E, E.ins_h, E.window[E.strstart + MIN_MATCH - 1])),
          (A = E.prev[E.strstart & E.w_mask] = E.head[E.ins_h]),
          (E.head[E.ins_h] = E.strstart)),
        (E.prev_length = E.match_length),
        (E.prev_match = E.match_start),
        (E.match_length = MIN_MATCH - 1),
        A !== 0 &&
          E.prev_length < E.max_lazy_match &&
          E.strstart - A <= E.w_size - MIN_LOOKAHEAD &&
          ((E.match_length = longest_match(E, A)),
          E.match_length <= 5 &&
            (E.strategy === Z_FILTERED || (E.match_length === MIN_MATCH && E.strstart - E.match_start > 4096)) &&
            (E.match_length = MIN_MATCH - 1)),
        E.prev_length >= MIN_MATCH && E.match_length <= E.prev_length)
      ) {
        (D = E.strstart + E.lookahead - MIN_MATCH),
          (I = _tr_tally(E, E.strstart - 1 - E.prev_match, E.prev_length - MIN_MATCH)),
          (E.lookahead -= E.prev_length - 1),
          (E.prev_length -= 2);
        do
          ++E.strstart <= D &&
            ((E.ins_h = HASH(E, E.ins_h, E.window[E.strstart + MIN_MATCH - 1])),
            (A = E.prev[E.strstart & E.w_mask] = E.head[E.ins_h]),
            (E.head[E.ins_h] = E.strstart));
        while (--E.prev_length !== 0);
        if (
          ((E.match_available = 0),
          (E.match_length = MIN_MATCH - 1),
          E.strstart++,
          I && (flush_block_only(E, !1), E.strm.avail_out === 0))
        )
          return BS_NEED_MORE;
      } else if (E.match_available) {
        if (
          ((I = _tr_tally(E, 0, E.window[E.strstart - 1])),
          I && flush_block_only(E, !1),
          E.strstart++,
          E.lookahead--,
          E.strm.avail_out === 0)
        )
          return BS_NEED_MORE;
      } else (E.match_available = 1), E.strstart++, E.lookahead--;
    }
    return (
      E.match_available && ((I = _tr_tally(E, 0, E.window[E.strstart - 1])), (E.match_available = 0)),
      (E.insert = E.strstart < MIN_MATCH - 1 ? E.strstart : MIN_MATCH - 1),
      _ === Z_FINISH$3
        ? (flush_block_only(E, !0), E.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE)
        : E.sym_next && (flush_block_only(E, !1), E.strm.avail_out === 0)
          ? BS_NEED_MORE
          : BS_BLOCK_DONE
    );
  },
  deflate_rle = (E, _) => {
    let A, I, D, T;
    const C = E.window;
    for (;;) {
      if (E.lookahead <= MAX_MATCH) {
        if ((fill_window(E), E.lookahead <= MAX_MATCH && _ === Z_NO_FLUSH$2)) return BS_NEED_MORE;
        if (E.lookahead === 0) break;
      }
      if (
        ((E.match_length = 0),
        E.lookahead >= MIN_MATCH &&
          E.strstart > 0 &&
          ((D = E.strstart - 1), (I = C[D]), I === C[++D] && I === C[++D] && I === C[++D]))
      ) {
        T = E.strstart + MAX_MATCH;
        do;
        while (
          I === C[++D] &&
          I === C[++D] &&
          I === C[++D] &&
          I === C[++D] &&
          I === C[++D] &&
          I === C[++D] &&
          I === C[++D] &&
          I === C[++D] &&
          D < T
        );
        (E.match_length = MAX_MATCH - (T - D)), E.match_length > E.lookahead && (E.match_length = E.lookahead);
      }
      if (
        (E.match_length >= MIN_MATCH
          ? ((A = _tr_tally(E, 1, E.match_length - MIN_MATCH)),
            (E.lookahead -= E.match_length),
            (E.strstart += E.match_length),
            (E.match_length = 0))
          : ((A = _tr_tally(E, 0, E.window[E.strstart])), E.lookahead--, E.strstart++),
        A && (flush_block_only(E, !1), E.strm.avail_out === 0))
      )
        return BS_NEED_MORE;
    }
    return (
      (E.insert = 0),
      _ === Z_FINISH$3
        ? (flush_block_only(E, !0), E.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE)
        : E.sym_next && (flush_block_only(E, !1), E.strm.avail_out === 0)
          ? BS_NEED_MORE
          : BS_BLOCK_DONE
    );
  },
  deflate_huff = (E, _) => {
    let A;
    for (;;) {
      if (E.lookahead === 0 && (fill_window(E), E.lookahead === 0)) {
        if (_ === Z_NO_FLUSH$2) return BS_NEED_MORE;
        break;
      }
      if (
        ((E.match_length = 0),
        (A = _tr_tally(E, 0, E.window[E.strstart])),
        E.lookahead--,
        E.strstart++,
        A && (flush_block_only(E, !1), E.strm.avail_out === 0))
      )
        return BS_NEED_MORE;
    }
    return (
      (E.insert = 0),
      _ === Z_FINISH$3
        ? (flush_block_only(E, !0), E.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE)
        : E.sym_next && (flush_block_only(E, !1), E.strm.avail_out === 0)
          ? BS_NEED_MORE
          : BS_BLOCK_DONE
    );
  };
function Config(E, _, A, I, D) {
  (this.good_length = E), (this.max_lazy = _), (this.nice_length = A), (this.max_chain = I), (this.func = D);
}
const configuration_table = [
    new Config(0, 0, 0, 0, deflate_stored),
    new Config(4, 4, 8, 4, deflate_fast),
    new Config(4, 5, 16, 8, deflate_fast),
    new Config(4, 6, 32, 32, deflate_fast),
    new Config(4, 4, 16, 16, deflate_slow),
    new Config(8, 16, 32, 32, deflate_slow),
    new Config(8, 16, 128, 128, deflate_slow),
    new Config(8, 32, 128, 256, deflate_slow),
    new Config(32, 128, 258, 1024, deflate_slow),
    new Config(32, 258, 258, 4096, deflate_slow),
  ],
  lm_init = (E) => {
    (E.window_size = 2 * E.w_size),
      zero(E.head),
      (E.max_lazy_match = configuration_table[E.level].max_lazy),
      (E.good_match = configuration_table[E.level].good_length),
      (E.nice_match = configuration_table[E.level].nice_length),
      (E.max_chain_length = configuration_table[E.level].max_chain),
      (E.strstart = 0),
      (E.block_start = 0),
      (E.lookahead = 0),
      (E.insert = 0),
      (E.match_length = E.prev_length = MIN_MATCH - 1),
      (E.match_available = 0),
      (E.ins_h = 0);
  };
function DeflateState() {
  (this.strm = null),
    (this.status = 0),
    (this.pending_buf = null),
    (this.pending_buf_size = 0),
    (this.pending_out = 0),
    (this.pending = 0),
    (this.wrap = 0),
    (this.gzhead = null),
    (this.gzindex = 0),
    (this.method = Z_DEFLATED$2),
    (this.last_flush = -1),
    (this.w_size = 0),
    (this.w_bits = 0),
    (this.w_mask = 0),
    (this.window = null),
    (this.window_size = 0),
    (this.prev = null),
    (this.head = null),
    (this.ins_h = 0),
    (this.hash_size = 0),
    (this.hash_bits = 0),
    (this.hash_mask = 0),
    (this.hash_shift = 0),
    (this.block_start = 0),
    (this.match_length = 0),
    (this.prev_match = 0),
    (this.match_available = 0),
    (this.strstart = 0),
    (this.match_start = 0),
    (this.lookahead = 0),
    (this.prev_length = 0),
    (this.max_chain_length = 0),
    (this.max_lazy_match = 0),
    (this.level = 0),
    (this.strategy = 0),
    (this.good_match = 0),
    (this.nice_match = 0),
    (this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2)),
    (this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2)),
    (this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2)),
    zero(this.dyn_ltree),
    zero(this.dyn_dtree),
    zero(this.bl_tree),
    (this.l_desc = null),
    (this.d_desc = null),
    (this.bl_desc = null),
    (this.bl_count = new Uint16Array(MAX_BITS + 1)),
    (this.heap = new Uint16Array(2 * L_CODES + 1)),
    zero(this.heap),
    (this.heap_len = 0),
    (this.heap_max = 0),
    (this.depth = new Uint16Array(2 * L_CODES + 1)),
    zero(this.depth),
    (this.sym_buf = 0),
    (this.lit_bufsize = 0),
    (this.sym_next = 0),
    (this.sym_end = 0),
    (this.opt_len = 0),
    (this.static_len = 0),
    (this.matches = 0),
    (this.insert = 0),
    (this.bi_buf = 0),
    (this.bi_valid = 0);
}
const deflateStateCheck = (E) => {
    if (!E) return 1;
    const _ = E.state;
    return !_ ||
      _.strm !== E ||
      (_.status !== INIT_STATE &&
        _.status !== GZIP_STATE &&
        _.status !== EXTRA_STATE &&
        _.status !== NAME_STATE &&
        _.status !== COMMENT_STATE &&
        _.status !== HCRC_STATE &&
        _.status !== BUSY_STATE &&
        _.status !== FINISH_STATE)
      ? 1
      : 0;
  },
  deflateResetKeep = (E) => {
    if (deflateStateCheck(E)) return err(E, Z_STREAM_ERROR$2);
    (E.total_in = E.total_out = 0), (E.data_type = Z_UNKNOWN);
    const _ = E.state;
    return (
      (_.pending = 0),
      (_.pending_out = 0),
      _.wrap < 0 && (_.wrap = -_.wrap),
      (_.status = _.wrap === 2 ? GZIP_STATE : _.wrap ? INIT_STATE : BUSY_STATE),
      (E.adler = _.wrap === 2 ? 0 : 1),
      (_.last_flush = -2),
      _tr_init(_),
      Z_OK$3
    );
  },
  deflateReset = (E) => {
    const _ = deflateResetKeep(E);
    return _ === Z_OK$3 && lm_init(E.state), _;
  },
  deflateSetHeader = (E, _) =>
    deflateStateCheck(E) || E.state.wrap !== 2 ? Z_STREAM_ERROR$2 : ((E.state.gzhead = _), Z_OK$3),
  deflateInit2 = (E, _, A, I, D, T) => {
    if (!E) return Z_STREAM_ERROR$2;
    let C = 1;
    if (
      (_ === Z_DEFAULT_COMPRESSION$1 && (_ = 6),
      I < 0 ? ((C = 0), (I = -I)) : I > 15 && ((C = 2), (I -= 16)),
      D < 1 ||
        D > MAX_MEM_LEVEL ||
        A !== Z_DEFLATED$2 ||
        I < 8 ||
        I > 15 ||
        _ < 0 ||
        _ > 9 ||
        T < 0 ||
        T > Z_FIXED ||
        (I === 8 && C !== 1))
    )
      return err(E, Z_STREAM_ERROR$2);
    I === 8 && (I = 9);
    const R = new DeflateState();
    return (
      (E.state = R),
      (R.strm = E),
      (R.status = INIT_STATE),
      (R.wrap = C),
      (R.gzhead = null),
      (R.w_bits = I),
      (R.w_size = 1 << R.w_bits),
      (R.w_mask = R.w_size - 1),
      (R.hash_bits = D + 7),
      (R.hash_size = 1 << R.hash_bits),
      (R.hash_mask = R.hash_size - 1),
      (R.hash_shift = ~~((R.hash_bits + MIN_MATCH - 1) / MIN_MATCH)),
      (R.window = new Uint8Array(R.w_size * 2)),
      (R.head = new Uint16Array(R.hash_size)),
      (R.prev = new Uint16Array(R.w_size)),
      (R.lit_bufsize = 1 << (D + 6)),
      (R.pending_buf_size = R.lit_bufsize * 4),
      (R.pending_buf = new Uint8Array(R.pending_buf_size)),
      (R.sym_buf = R.lit_bufsize),
      (R.sym_end = (R.lit_bufsize - 1) * 3),
      (R.level = _),
      (R.strategy = T),
      (R.method = A),
      deflateReset(E)
    );
  },
  deflateInit = (E, _) => deflateInit2(E, _, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1),
  deflate$2 = (E, _) => {
    if (deflateStateCheck(E) || _ > Z_BLOCK$1 || _ < 0) return E ? err(E, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
    const A = E.state;
    if (!E.output || (E.avail_in !== 0 && !E.input) || (A.status === FINISH_STATE && _ !== Z_FINISH$3))
      return err(E, E.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
    const I = A.last_flush;
    if (((A.last_flush = _), A.pending !== 0)) {
      if ((flush_pending(E), E.avail_out === 0)) return (A.last_flush = -1), Z_OK$3;
    } else if (E.avail_in === 0 && rank(_) <= rank(I) && _ !== Z_FINISH$3) return err(E, Z_BUF_ERROR$1);
    if (A.status === FINISH_STATE && E.avail_in !== 0) return err(E, Z_BUF_ERROR$1);
    if ((A.status === INIT_STATE && A.wrap === 0 && (A.status = BUSY_STATE), A.status === INIT_STATE)) {
      let D = (Z_DEFLATED$2 + ((A.w_bits - 8) << 4)) << 8,
        T = -1;
      if (
        (A.strategy >= Z_HUFFMAN_ONLY || A.level < 2
          ? (T = 0)
          : A.level < 6
            ? (T = 1)
            : A.level === 6
              ? (T = 2)
              : (T = 3),
        (D |= T << 6),
        A.strstart !== 0 && (D |= PRESET_DICT),
        (D += 31 - (D % 31)),
        putShortMSB(A, D),
        A.strstart !== 0 && (putShortMSB(A, E.adler >>> 16), putShortMSB(A, E.adler & 65535)),
        (E.adler = 1),
        (A.status = BUSY_STATE),
        flush_pending(E),
        A.pending !== 0)
      )
        return (A.last_flush = -1), Z_OK$3;
    }
    if (A.status === GZIP_STATE) {
      if (((E.adler = 0), put_byte(A, 31), put_byte(A, 139), put_byte(A, 8), A.gzhead))
        put_byte(
          A,
          (A.gzhead.text ? 1 : 0) +
            (A.gzhead.hcrc ? 2 : 0) +
            (A.gzhead.extra ? 4 : 0) +
            (A.gzhead.name ? 8 : 0) +
            (A.gzhead.comment ? 16 : 0),
        ),
          put_byte(A, A.gzhead.time & 255),
          put_byte(A, (A.gzhead.time >> 8) & 255),
          put_byte(A, (A.gzhead.time >> 16) & 255),
          put_byte(A, (A.gzhead.time >> 24) & 255),
          put_byte(A, A.level === 9 ? 2 : A.strategy >= Z_HUFFMAN_ONLY || A.level < 2 ? 4 : 0),
          put_byte(A, A.gzhead.os & 255),
          A.gzhead.extra &&
            A.gzhead.extra.length &&
            (put_byte(A, A.gzhead.extra.length & 255), put_byte(A, (A.gzhead.extra.length >> 8) & 255)),
          A.gzhead.hcrc && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending, 0)),
          (A.gzindex = 0),
          (A.status = EXTRA_STATE);
      else if (
        (put_byte(A, 0),
        put_byte(A, 0),
        put_byte(A, 0),
        put_byte(A, 0),
        put_byte(A, 0),
        put_byte(A, A.level === 9 ? 2 : A.strategy >= Z_HUFFMAN_ONLY || A.level < 2 ? 4 : 0),
        put_byte(A, OS_CODE),
        (A.status = BUSY_STATE),
        flush_pending(E),
        A.pending !== 0)
      )
        return (A.last_flush = -1), Z_OK$3;
    }
    if (A.status === EXTRA_STATE) {
      if (A.gzhead.extra) {
        let D = A.pending,
          T = (A.gzhead.extra.length & 65535) - A.gzindex;
        for (; A.pending + T > A.pending_buf_size; ) {
          let R = A.pending_buf_size - A.pending;
          if (
            (A.pending_buf.set(A.gzhead.extra.subarray(A.gzindex, A.gzindex + R), A.pending),
            (A.pending = A.pending_buf_size),
            A.gzhead.hcrc && A.pending > D && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending - D, D)),
            (A.gzindex += R),
            flush_pending(E),
            A.pending !== 0)
          )
            return (A.last_flush = -1), Z_OK$3;
          (D = 0), (T -= R);
        }
        let C = new Uint8Array(A.gzhead.extra);
        A.pending_buf.set(C.subarray(A.gzindex, A.gzindex + T), A.pending),
          (A.pending += T),
          A.gzhead.hcrc && A.pending > D && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending - D, D)),
          (A.gzindex = 0);
      }
      A.status = NAME_STATE;
    }
    if (A.status === NAME_STATE) {
      if (A.gzhead.name) {
        let D = A.pending,
          T;
        do {
          if (A.pending === A.pending_buf_size) {
            if (
              (A.gzhead.hcrc && A.pending > D && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending - D, D)),
              flush_pending(E),
              A.pending !== 0)
            )
              return (A.last_flush = -1), Z_OK$3;
            D = 0;
          }
          A.gzindex < A.gzhead.name.length ? (T = A.gzhead.name.charCodeAt(A.gzindex++) & 255) : (T = 0),
            put_byte(A, T);
        } while (T !== 0);
        A.gzhead.hcrc && A.pending > D && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending - D, D)),
          (A.gzindex = 0);
      }
      A.status = COMMENT_STATE;
    }
    if (A.status === COMMENT_STATE) {
      if (A.gzhead.comment) {
        let D = A.pending,
          T;
        do {
          if (A.pending === A.pending_buf_size) {
            if (
              (A.gzhead.hcrc && A.pending > D && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending - D, D)),
              flush_pending(E),
              A.pending !== 0)
            )
              return (A.last_flush = -1), Z_OK$3;
            D = 0;
          }
          A.gzindex < A.gzhead.comment.length ? (T = A.gzhead.comment.charCodeAt(A.gzindex++) & 255) : (T = 0),
            put_byte(A, T);
        } while (T !== 0);
        A.gzhead.hcrc && A.pending > D && (E.adler = crc32_1(E.adler, A.pending_buf, A.pending - D, D));
      }
      A.status = HCRC_STATE;
    }
    if (A.status === HCRC_STATE) {
      if (A.gzhead.hcrc) {
        if (A.pending + 2 > A.pending_buf_size && (flush_pending(E), A.pending !== 0))
          return (A.last_flush = -1), Z_OK$3;
        put_byte(A, E.adler & 255), put_byte(A, (E.adler >> 8) & 255), (E.adler = 0);
      }
      if (((A.status = BUSY_STATE), flush_pending(E), A.pending !== 0)) return (A.last_flush = -1), Z_OK$3;
    }
    if (E.avail_in !== 0 || A.lookahead !== 0 || (_ !== Z_NO_FLUSH$2 && A.status !== FINISH_STATE)) {
      let D =
        A.level === 0
          ? deflate_stored(A, _)
          : A.strategy === Z_HUFFMAN_ONLY
            ? deflate_huff(A, _)
            : A.strategy === Z_RLE
              ? deflate_rle(A, _)
              : configuration_table[A.level].func(A, _);
      if (
        ((D === BS_FINISH_STARTED || D === BS_FINISH_DONE) && (A.status = FINISH_STATE),
        D === BS_NEED_MORE || D === BS_FINISH_STARTED)
      )
        return E.avail_out === 0 && (A.last_flush = -1), Z_OK$3;
      if (
        D === BS_BLOCK_DONE &&
        (_ === Z_PARTIAL_FLUSH
          ? _tr_align(A)
          : _ !== Z_BLOCK$1 &&
            (_tr_stored_block(A, 0, 0, !1),
            _ === Z_FULL_FLUSH$1 &&
              (zero(A.head), A.lookahead === 0 && ((A.strstart = 0), (A.block_start = 0), (A.insert = 0)))),
        flush_pending(E),
        E.avail_out === 0)
      )
        return (A.last_flush = -1), Z_OK$3;
    }
    return _ !== Z_FINISH$3
      ? Z_OK$3
      : A.wrap <= 0
        ? Z_STREAM_END$3
        : (A.wrap === 2
            ? (put_byte(A, E.adler & 255),
              put_byte(A, (E.adler >> 8) & 255),
              put_byte(A, (E.adler >> 16) & 255),
              put_byte(A, (E.adler >> 24) & 255),
              put_byte(A, E.total_in & 255),
              put_byte(A, (E.total_in >> 8) & 255),
              put_byte(A, (E.total_in >> 16) & 255),
              put_byte(A, (E.total_in >> 24) & 255))
            : (putShortMSB(A, E.adler >>> 16), putShortMSB(A, E.adler & 65535)),
          flush_pending(E),
          A.wrap > 0 && (A.wrap = -A.wrap),
          A.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3);
  },
  deflateEnd = (E) => {
    if (deflateStateCheck(E)) return Z_STREAM_ERROR$2;
    const _ = E.state.status;
    return (E.state = null), _ === BUSY_STATE ? err(E, Z_DATA_ERROR$2) : Z_OK$3;
  },
  deflateSetDictionary = (E, _) => {
    let A = _.length;
    if (deflateStateCheck(E)) return Z_STREAM_ERROR$2;
    const I = E.state,
      D = I.wrap;
    if (D === 2 || (D === 1 && I.status !== INIT_STATE) || I.lookahead) return Z_STREAM_ERROR$2;
    if ((D === 1 && (E.adler = adler32_1(E.adler, _, A, 0)), (I.wrap = 0), A >= I.w_size)) {
      D === 0 && (zero(I.head), (I.strstart = 0), (I.block_start = 0), (I.insert = 0));
      let B = new Uint8Array(I.w_size);
      B.set(_.subarray(A - I.w_size, A), 0), (_ = B), (A = I.w_size);
    }
    const T = E.avail_in,
      C = E.next_in,
      R = E.input;
    for (E.avail_in = A, E.next_in = 0, E.input = _, fill_window(I); I.lookahead >= MIN_MATCH; ) {
      let B = I.strstart,
        P = I.lookahead - (MIN_MATCH - 1);
      do
        (I.ins_h = HASH(I, I.ins_h, I.window[B + MIN_MATCH - 1])),
          (I.prev[B & I.w_mask] = I.head[I.ins_h]),
          (I.head[I.ins_h] = B),
          B++;
      while (--P);
      (I.strstart = B), (I.lookahead = MIN_MATCH - 1), fill_window(I);
    }
    return (
      (I.strstart += I.lookahead),
      (I.block_start = I.strstart),
      (I.insert = I.lookahead),
      (I.lookahead = 0),
      (I.match_length = I.prev_length = MIN_MATCH - 1),
      (I.match_available = 0),
      (E.next_in = C),
      (E.input = R),
      (E.avail_in = T),
      (I.wrap = D),
      Z_OK$3
    );
  };
var deflateInit_1 = deflateInit,
  deflateInit2_1 = deflateInit2,
  deflateReset_1 = deflateReset,
  deflateResetKeep_1 = deflateResetKeep,
  deflateSetHeader_1 = deflateSetHeader,
  deflate_2$1 = deflate$2,
  deflateEnd_1 = deflateEnd,
  deflateSetDictionary_1 = deflateSetDictionary,
  deflateInfo = "pako deflate (from Nodeca project)",
  deflate_1$2 = {
    deflateInit: deflateInit_1,
    deflateInit2: deflateInit2_1,
    deflateReset: deflateReset_1,
    deflateResetKeep: deflateResetKeep_1,
    deflateSetHeader: deflateSetHeader_1,
    deflate: deflate_2$1,
    deflateEnd: deflateEnd_1,
    deflateSetDictionary: deflateSetDictionary_1,
    deflateInfo,
  };
const _has = (E, _) => Object.prototype.hasOwnProperty.call(E, _);
var assign = function (E) {
    const _ = Array.prototype.slice.call(arguments, 1);
    for (; _.length; ) {
      const A = _.shift();
      if (A) {
        if (typeof A != "object") throw new TypeError(A + "must be non-object");
        for (const I in A) _has(A, I) && (E[I] = A[I]);
      }
    }
    return E;
  },
  flattenChunks = (E) => {
    let _ = 0;
    for (let I = 0, D = E.length; I < D; I++) _ += E[I].length;
    const A = new Uint8Array(_);
    for (let I = 0, D = 0, T = E.length; I < T; I++) {
      let C = E[I];
      A.set(C, D), (D += C.length);
    }
    return A;
  },
  common = { assign, flattenChunks };
let STR_APPLY_UIA_OK = !0;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch {
  STR_APPLY_UIA_OK = !1;
}
const _utf8len = new Uint8Array(256);
for (let E = 0; E < 256; E++)
  _utf8len[E] = E >= 252 ? 6 : E >= 248 ? 5 : E >= 240 ? 4 : E >= 224 ? 3 : E >= 192 ? 2 : 1;
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (E) => {
  if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(E);
  let _,
    A,
    I,
    D,
    T,
    C = E.length,
    R = 0;
  for (D = 0; D < C; D++)
    (A = E.charCodeAt(D)),
      (A & 64512) === 55296 &&
        D + 1 < C &&
        ((I = E.charCodeAt(D + 1)), (I & 64512) === 56320 && ((A = 65536 + ((A - 55296) << 10) + (I - 56320)), D++)),
      (R += A < 128 ? 1 : A < 2048 ? 2 : A < 65536 ? 3 : 4);
  for (_ = new Uint8Array(R), T = 0, D = 0; T < R; D++)
    (A = E.charCodeAt(D)),
      (A & 64512) === 55296 &&
        D + 1 < C &&
        ((I = E.charCodeAt(D + 1)), (I & 64512) === 56320 && ((A = 65536 + ((A - 55296) << 10) + (I - 56320)), D++)),
      A < 128
        ? (_[T++] = A)
        : A < 2048
          ? ((_[T++] = 192 | (A >>> 6)), (_[T++] = 128 | (A & 63)))
          : A < 65536
            ? ((_[T++] = 224 | (A >>> 12)), (_[T++] = 128 | ((A >>> 6) & 63)), (_[T++] = 128 | (A & 63)))
            : ((_[T++] = 240 | (A >>> 18)),
              (_[T++] = 128 | ((A >>> 12) & 63)),
              (_[T++] = 128 | ((A >>> 6) & 63)),
              (_[T++] = 128 | (A & 63)));
  return _;
};
const buf2binstring = (E, _) => {
  if (_ < 65534 && E.subarray && STR_APPLY_UIA_OK)
    return String.fromCharCode.apply(null, E.length === _ ? E : E.subarray(0, _));
  let A = "";
  for (let I = 0; I < _; I++) A += String.fromCharCode(E[I]);
  return A;
};
var buf2string = (E, _) => {
    const A = _ || E.length;
    if (typeof TextDecoder == "function" && TextDecoder.prototype.decode)
      return new TextDecoder().decode(E.subarray(0, _));
    let I, D;
    const T = new Array(A * 2);
    for (D = 0, I = 0; I < A; ) {
      let C = E[I++];
      if (C < 128) {
        T[D++] = C;
        continue;
      }
      let R = _utf8len[C];
      if (R > 4) {
        (T[D++] = 65533), (I += R - 1);
        continue;
      }
      for (C &= R === 2 ? 31 : R === 3 ? 15 : 7; R > 1 && I < A; ) (C = (C << 6) | (E[I++] & 63)), R--;
      if (R > 1) {
        T[D++] = 65533;
        continue;
      }
      C < 65536 ? (T[D++] = C) : ((C -= 65536), (T[D++] = 55296 | ((C >> 10) & 1023)), (T[D++] = 56320 | (C & 1023)));
    }
    return buf2binstring(T, D);
  },
  utf8border = (E, _) => {
    (_ = _ || E.length), _ > E.length && (_ = E.length);
    let A = _ - 1;
    for (; A >= 0 && (E[A] & 192) === 128; ) A--;
    return A < 0 || A === 0 ? _ : A + _utf8len[E[A]] > _ ? A : _;
  },
  strings = { string2buf, buf2string, utf8border };
function ZStream() {
  (this.input = null),
    (this.next_in = 0),
    (this.avail_in = 0),
    (this.total_in = 0),
    (this.output = null),
    (this.next_out = 0),
    (this.avail_out = 0),
    (this.total_out = 0),
    (this.msg = ""),
    (this.state = null),
    (this.data_type = 2),
    (this.adler = 0);
}
var zstream = ZStream;
const toString$1$1 = Object.prototype.toString,
  {
    Z_NO_FLUSH: Z_NO_FLUSH$1,
    Z_SYNC_FLUSH,
    Z_FULL_FLUSH,
    Z_FINISH: Z_FINISH$2,
    Z_OK: Z_OK$2,
    Z_STREAM_END: Z_STREAM_END$2,
    Z_DEFAULT_COMPRESSION,
    Z_DEFAULT_STRATEGY,
    Z_DEFLATED: Z_DEFLATED$1,
  } = constants$2;
function Deflate$1(E) {
  this.options = common.assign(
    {
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
    },
    E || {},
  );
  let _ = this.options;
  _.raw && _.windowBits > 0
    ? (_.windowBits = -_.windowBits)
    : _.gzip && _.windowBits > 0 && _.windowBits < 16 && (_.windowBits += 16),
    (this.err = 0),
    (this.msg = ""),
    (this.ended = !1),
    (this.chunks = []),
    (this.strm = new zstream()),
    (this.strm.avail_out = 0);
  let A = deflate_1$2.deflateInit2(this.strm, _.level, _.method, _.windowBits, _.memLevel, _.strategy);
  if (A !== Z_OK$2) throw new Error(messages[A]);
  if ((_.header && deflate_1$2.deflateSetHeader(this.strm, _.header), _.dictionary)) {
    let I;
    if (
      (typeof _.dictionary == "string"
        ? (I = strings.string2buf(_.dictionary))
        : toString$1$1.call(_.dictionary) === "[object ArrayBuffer]"
          ? (I = new Uint8Array(_.dictionary))
          : (I = _.dictionary),
      (A = deflate_1$2.deflateSetDictionary(this.strm, I)),
      A !== Z_OK$2)
    )
      throw new Error(messages[A]);
    this._dict_set = !0;
  }
}
Deflate$1.prototype.push = function (E, _) {
  const A = this.strm,
    I = this.options.chunkSize;
  let D, T;
  if (this.ended) return !1;
  for (
    _ === ~~_ ? (T = _) : (T = _ === !0 ? Z_FINISH$2 : Z_NO_FLUSH$1),
      typeof E == "string"
        ? (A.input = strings.string2buf(E))
        : toString$1$1.call(E) === "[object ArrayBuffer]"
          ? (A.input = new Uint8Array(E))
          : (A.input = E),
      A.next_in = 0,
      A.avail_in = A.input.length;
    ;

  ) {
    if (
      (A.avail_out === 0 && ((A.output = new Uint8Array(I)), (A.next_out = 0), (A.avail_out = I)),
      (T === Z_SYNC_FLUSH || T === Z_FULL_FLUSH) && A.avail_out <= 6)
    ) {
      this.onData(A.output.subarray(0, A.next_out)), (A.avail_out = 0);
      continue;
    }
    if (((D = deflate_1$2.deflate(A, T)), D === Z_STREAM_END$2))
      return (
        A.next_out > 0 && this.onData(A.output.subarray(0, A.next_out)),
        (D = deflate_1$2.deflateEnd(this.strm)),
        this.onEnd(D),
        (this.ended = !0),
        D === Z_OK$2
      );
    if (A.avail_out === 0) {
      this.onData(A.output);
      continue;
    }
    if (T > 0 && A.next_out > 0) {
      this.onData(A.output.subarray(0, A.next_out)), (A.avail_out = 0);
      continue;
    }
    if (A.avail_in === 0) break;
  }
  return !0;
};
Deflate$1.prototype.onData = function (E) {
  this.chunks.push(E);
};
Deflate$1.prototype.onEnd = function (E) {
  E === Z_OK$2 && (this.result = common.flattenChunks(this.chunks)),
    (this.chunks = []),
    (this.err = E),
    (this.msg = this.strm.msg);
};
function deflate$1(E, _) {
  const A = new Deflate$1(_);
  if ((A.push(E, !0), A.err)) throw A.msg || messages[A.err];
  return A.result;
}
function deflateRaw$1(E, _) {
  return (_ = _ || {}), (_.raw = !0), deflate$1(E, _);
}
function gzip$1(E, _) {
  return (_ = _ || {}), (_.gzip = !0), deflate$1(E, _);
}
var Deflate_1$1 = Deflate$1,
  deflate_2 = deflate$1,
  deflateRaw_1$1 = deflateRaw$1,
  gzip_1$1 = gzip$1,
  constants$1 = constants$2,
  deflate_1$1 = {
    Deflate: Deflate_1$1,
    deflate: deflate_2,
    deflateRaw: deflateRaw_1$1,
    gzip: gzip_1$1,
    constants: constants$1,
  };
const BAD$1 = 16209,
  TYPE$1 = 16191;
var inffast = function (_, A) {
  let I, D, T, C, R, B, P, O, F, L, U, z, V, X, G, Z, Y, q, W, ee, te, Q, J, K;
  const ne = _.state;
  (I = _.next_in),
    (J = _.input),
    (D = I + (_.avail_in - 5)),
    (T = _.next_out),
    (K = _.output),
    (C = T - (A - _.avail_out)),
    (R = T + (_.avail_out - 257)),
    (B = ne.dmax),
    (P = ne.wsize),
    (O = ne.whave),
    (F = ne.wnext),
    (L = ne.window),
    (U = ne.hold),
    (z = ne.bits),
    (V = ne.lencode),
    (X = ne.distcode),
    (G = (1 << ne.lenbits) - 1),
    (Z = (1 << ne.distbits) - 1);
  e: do {
    z < 15 && ((U += J[I++] << z), (z += 8), (U += J[I++] << z), (z += 8)), (Y = V[U & G]);
    t: for (;;) {
      if (((q = Y >>> 24), (U >>>= q), (z -= q), (q = (Y >>> 16) & 255), q === 0)) K[T++] = Y & 65535;
      else if (q & 16) {
        (W = Y & 65535),
          (q &= 15),
          q && (z < q && ((U += J[I++] << z), (z += 8)), (W += U & ((1 << q) - 1)), (U >>>= q), (z -= q)),
          z < 15 && ((U += J[I++] << z), (z += 8), (U += J[I++] << z), (z += 8)),
          (Y = X[U & Z]);
        n: for (;;) {
          if (((q = Y >>> 24), (U >>>= q), (z -= q), (q = (Y >>> 16) & 255), q & 16)) {
            if (
              ((ee = Y & 65535),
              (q &= 15),
              z < q && ((U += J[I++] << z), (z += 8), z < q && ((U += J[I++] << z), (z += 8))),
              (ee += U & ((1 << q) - 1)),
              ee > B)
            ) {
              (_.msg = "invalid distance too far back"), (ne.mode = BAD$1);
              break e;
            }
            if (((U >>>= q), (z -= q), (q = T - C), ee > q)) {
              if (((q = ee - q), q > O && ne.sane)) {
                (_.msg = "invalid distance too far back"), (ne.mode = BAD$1);
                break e;
              }
              if (((te = 0), (Q = L), F === 0)) {
                if (((te += P - q), q < W)) {
                  W -= q;
                  do K[T++] = L[te++];
                  while (--q);
                  (te = T - ee), (Q = K);
                }
              } else if (F < q) {
                if (((te += P + F - q), (q -= F), q < W)) {
                  W -= q;
                  do K[T++] = L[te++];
                  while (--q);
                  if (((te = 0), F < W)) {
                    (q = F), (W -= q);
                    do K[T++] = L[te++];
                    while (--q);
                    (te = T - ee), (Q = K);
                  }
                }
              } else if (((te += F - q), q < W)) {
                W -= q;
                do K[T++] = L[te++];
                while (--q);
                (te = T - ee), (Q = K);
              }
              for (; W > 2; ) (K[T++] = Q[te++]), (K[T++] = Q[te++]), (K[T++] = Q[te++]), (W -= 3);
              W && ((K[T++] = Q[te++]), W > 1 && (K[T++] = Q[te++]));
            } else {
              te = T - ee;
              do (K[T++] = K[te++]), (K[T++] = K[te++]), (K[T++] = K[te++]), (W -= 3);
              while (W > 2);
              W && ((K[T++] = K[te++]), W > 1 && (K[T++] = K[te++]));
            }
          } else if (q & 64) {
            (_.msg = "invalid distance code"), (ne.mode = BAD$1);
            break e;
          } else {
            Y = X[(Y & 65535) + (U & ((1 << q) - 1))];
            continue n;
          }
          break;
        }
      } else if (q & 64)
        if (q & 32) {
          ne.mode = TYPE$1;
          break e;
        } else {
          (_.msg = "invalid literal/length code"), (ne.mode = BAD$1);
          break e;
        }
      else {
        Y = V[(Y & 65535) + (U & ((1 << q) - 1))];
        continue t;
      }
      break;
    }
  } while (I < D && T < R);
  (W = z >> 3),
    (I -= W),
    (z -= W << 3),
    (U &= (1 << z) - 1),
    (_.next_in = I),
    (_.next_out = T),
    (_.avail_in = I < D ? 5 + (D - I) : 5 - (I - D)),
    (_.avail_out = T < R ? 257 + (R - T) : 257 - (T - R)),
    (ne.hold = U),
    (ne.bits = z);
};
const MAXBITS = 15,
  ENOUGH_LENS$1 = 852,
  ENOUGH_DISTS$1 = 592,
  CODES$1 = 0,
  LENS$1 = 1,
  DISTS$1 = 2,
  lbase = new Uint16Array([
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258,
    0, 0,
  ]),
  lext = new Uint8Array([
    16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16,
    72, 78,
  ]),
  dbase = new Uint16Array([
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
    8193, 12289, 16385, 24577, 0, 0,
  ]),
  dext = new Uint8Array([
    16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29,
    29, 64, 64,
  ]),
  inflate_table = (E, _, A, I, D, T, C, R) => {
    const B = R.bits;
    let P = 0,
      O = 0,
      F = 0,
      L = 0,
      U = 0,
      z = 0,
      V = 0,
      X = 0,
      G = 0,
      Z = 0,
      Y,
      q,
      W,
      ee,
      te,
      Q = null,
      J;
    const K = new Uint16Array(MAXBITS + 1),
      ne = new Uint16Array(MAXBITS + 1);
    let re = null,
      ie,
      se,
      oe;
    for (P = 0; P <= MAXBITS; P++) K[P] = 0;
    for (O = 0; O < I; O++) K[_[A + O]]++;
    for (U = B, L = MAXBITS; L >= 1 && K[L] === 0; L--);
    if ((U > L && (U = L), L === 0))
      return (D[T++] = (1 << 24) | (64 << 16) | 0), (D[T++] = (1 << 24) | (64 << 16) | 0), (R.bits = 1), 0;
    for (F = 1; F < L && K[F] === 0; F++);
    for (U < F && (U = F), X = 1, P = 1; P <= MAXBITS; P++) if (((X <<= 1), (X -= K[P]), X < 0)) return -1;
    if (X > 0 && (E === CODES$1 || L !== 1)) return -1;
    for (ne[1] = 0, P = 1; P < MAXBITS; P++) ne[P + 1] = ne[P] + K[P];
    for (O = 0; O < I; O++) _[A + O] !== 0 && (C[ne[_[A + O]]++] = O);
    if (
      (E === CODES$1
        ? ((Q = re = C), (J = 20))
        : E === LENS$1
          ? ((Q = lbase), (re = lext), (J = 257))
          : ((Q = dbase), (re = dext), (J = 0)),
      (Z = 0),
      (O = 0),
      (P = F),
      (te = T),
      (z = U),
      (V = 0),
      (W = -1),
      (G = 1 << U),
      (ee = G - 1),
      (E === LENS$1 && G > ENOUGH_LENS$1) || (E === DISTS$1 && G > ENOUGH_DISTS$1))
    )
      return 1;
    for (;;) {
      (ie = P - V),
        C[O] + 1 < J
          ? ((se = 0), (oe = C[O]))
          : C[O] >= J
            ? ((se = re[C[O] - J]), (oe = Q[C[O] - J]))
            : ((se = 32 + 64), (oe = 0)),
        (Y = 1 << (P - V)),
        (q = 1 << z),
        (F = q);
      do (q -= Y), (D[te + (Z >> V) + q] = (ie << 24) | (se << 16) | oe | 0);
      while (q !== 0);
      for (Y = 1 << (P - 1); Z & Y; ) Y >>= 1;
      if ((Y !== 0 ? ((Z &= Y - 1), (Z += Y)) : (Z = 0), O++, --K[P] === 0)) {
        if (P === L) break;
        P = _[A + C[O]];
      }
      if (P > U && (Z & ee) !== W) {
        for (V === 0 && (V = U), te += F, z = P - V, X = 1 << z; z + V < L && ((X -= K[z + V]), !(X <= 0)); )
          z++, (X <<= 1);
        if (((G += 1 << z), (E === LENS$1 && G > ENOUGH_LENS$1) || (E === DISTS$1 && G > ENOUGH_DISTS$1))) return 1;
        (W = Z & ee), (D[W] = (U << 24) | (z << 16) | (te - T) | 0);
      }
    }
    return Z !== 0 && (D[te + Z] = ((P - V) << 24) | (64 << 16) | 0), (R.bits = U), 0;
  };
var inftrees = inflate_table;
const CODES = 0,
  LENS = 1,
  DISTS = 2,
  {
    Z_FINISH: Z_FINISH$1,
    Z_BLOCK,
    Z_TREES,
    Z_OK: Z_OK$1,
    Z_STREAM_END: Z_STREAM_END$1,
    Z_NEED_DICT: Z_NEED_DICT$1,
    Z_STREAM_ERROR: Z_STREAM_ERROR$1,
    Z_DATA_ERROR: Z_DATA_ERROR$1,
    Z_MEM_ERROR: Z_MEM_ERROR$1,
    Z_BUF_ERROR,
    Z_DEFLATED,
  } = constants$2,
  HEAD = 16180,
  FLAGS = 16181,
  TIME = 16182,
  OS = 16183,
  EXLEN = 16184,
  EXTRA = 16185,
  NAME = 16186,
  COMMENT = 16187,
  HCRC = 16188,
  DICTID = 16189,
  DICT = 16190,
  TYPE = 16191,
  TYPEDO = 16192,
  STORED = 16193,
  COPY_ = 16194,
  COPY = 16195,
  TABLE = 16196,
  LENLENS = 16197,
  CODELENS = 16198,
  LEN_ = 16199,
  LEN = 16200,
  LENEXT = 16201,
  DIST = 16202,
  DISTEXT = 16203,
  MATCH = 16204,
  LIT = 16205,
  CHECK = 16206,
  LENGTH = 16207,
  DONE = 16208,
  BAD = 16209,
  MEM = 16210,
  SYNC = 16211,
  ENOUGH_LENS = 852,
  ENOUGH_DISTS = 592,
  MAX_WBITS = 15,
  DEF_WBITS = MAX_WBITS,
  zswap32 = (E) => ((E >>> 24) & 255) + ((E >>> 8) & 65280) + ((E & 65280) << 8) + ((E & 255) << 24);
function InflateState() {
  (this.strm = null),
    (this.mode = 0),
    (this.last = !1),
    (this.wrap = 0),
    (this.havedict = !1),
    (this.flags = 0),
    (this.dmax = 0),
    (this.check = 0),
    (this.total = 0),
    (this.head = null),
    (this.wbits = 0),
    (this.wsize = 0),
    (this.whave = 0),
    (this.wnext = 0),
    (this.window = null),
    (this.hold = 0),
    (this.bits = 0),
    (this.length = 0),
    (this.offset = 0),
    (this.extra = 0),
    (this.lencode = null),
    (this.distcode = null),
    (this.lenbits = 0),
    (this.distbits = 0),
    (this.ncode = 0),
    (this.nlen = 0),
    (this.ndist = 0),
    (this.have = 0),
    (this.next = null),
    (this.lens = new Uint16Array(320)),
    (this.work = new Uint16Array(288)),
    (this.lendyn = null),
    (this.distdyn = null),
    (this.sane = 0),
    (this.back = 0),
    (this.was = 0);
}
const inflateStateCheck = (E) => {
    if (!E) return 1;
    const _ = E.state;
    return !_ || _.strm !== E || _.mode < HEAD || _.mode > SYNC ? 1 : 0;
  },
  inflateResetKeep = (E) => {
    if (inflateStateCheck(E)) return Z_STREAM_ERROR$1;
    const _ = E.state;
    return (
      (E.total_in = E.total_out = _.total = 0),
      (E.msg = ""),
      _.wrap && (E.adler = _.wrap & 1),
      (_.mode = HEAD),
      (_.last = 0),
      (_.havedict = 0),
      (_.flags = -1),
      (_.dmax = 32768),
      (_.head = null),
      (_.hold = 0),
      (_.bits = 0),
      (_.lencode = _.lendyn = new Int32Array(ENOUGH_LENS)),
      (_.distcode = _.distdyn = new Int32Array(ENOUGH_DISTS)),
      (_.sane = 1),
      (_.back = -1),
      Z_OK$1
    );
  },
  inflateReset = (E) => {
    if (inflateStateCheck(E)) return Z_STREAM_ERROR$1;
    const _ = E.state;
    return (_.wsize = 0), (_.whave = 0), (_.wnext = 0), inflateResetKeep(E);
  },
  inflateReset2 = (E, _) => {
    let A;
    if (inflateStateCheck(E)) return Z_STREAM_ERROR$1;
    const I = E.state;
    return (
      _ < 0 ? ((A = 0), (_ = -_)) : ((A = (_ >> 4) + 5), _ < 48 && (_ &= 15)),
      _ && (_ < 8 || _ > 15)
        ? Z_STREAM_ERROR$1
        : (I.window !== null && I.wbits !== _ && (I.window = null), (I.wrap = A), (I.wbits = _), inflateReset(E))
    );
  },
  inflateInit2 = (E, _) => {
    if (!E) return Z_STREAM_ERROR$1;
    const A = new InflateState();
    (E.state = A), (A.strm = E), (A.window = null), (A.mode = HEAD);
    const I = inflateReset2(E, _);
    return I !== Z_OK$1 && (E.state = null), I;
  },
  inflateInit = (E) => inflateInit2(E, DEF_WBITS);
let virgin = !0,
  lenfix,
  distfix;
const fixedtables = (E) => {
    if (virgin) {
      (lenfix = new Int32Array(512)), (distfix = new Int32Array(32));
      let _ = 0;
      for (; _ < 144; ) E.lens[_++] = 8;
      for (; _ < 256; ) E.lens[_++] = 9;
      for (; _ < 280; ) E.lens[_++] = 7;
      for (; _ < 288; ) E.lens[_++] = 8;
      for (inftrees(LENS, E.lens, 0, 288, lenfix, 0, E.work, { bits: 9 }), _ = 0; _ < 32; ) E.lens[_++] = 5;
      inftrees(DISTS, E.lens, 0, 32, distfix, 0, E.work, { bits: 5 }), (virgin = !1);
    }
    (E.lencode = lenfix), (E.lenbits = 9), (E.distcode = distfix), (E.distbits = 5);
  },
  updatewindow = (E, _, A, I) => {
    let D;
    const T = E.state;
    return (
      T.window === null &&
        ((T.wsize = 1 << T.wbits), (T.wnext = 0), (T.whave = 0), (T.window = new Uint8Array(T.wsize))),
      I >= T.wsize
        ? (T.window.set(_.subarray(A - T.wsize, A), 0), (T.wnext = 0), (T.whave = T.wsize))
        : ((D = T.wsize - T.wnext),
          D > I && (D = I),
          T.window.set(_.subarray(A - I, A - I + D), T.wnext),
          (I -= D),
          I
            ? (T.window.set(_.subarray(A - I, A), 0), (T.wnext = I), (T.whave = T.wsize))
            : ((T.wnext += D), T.wnext === T.wsize && (T.wnext = 0), T.whave < T.wsize && (T.whave += D))),
      0
    );
  },
  inflate$2 = (E, _) => {
    let A,
      I,
      D,
      T,
      C,
      R,
      B,
      P,
      O,
      F,
      L,
      U,
      z,
      V,
      X = 0,
      G,
      Z,
      Y,
      q,
      W,
      ee,
      te,
      Q;
    const J = new Uint8Array(4);
    let K, ne;
    const re = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    if (inflateStateCheck(E) || !E.output || (!E.input && E.avail_in !== 0)) return Z_STREAM_ERROR$1;
    (A = E.state),
      A.mode === TYPE && (A.mode = TYPEDO),
      (C = E.next_out),
      (D = E.output),
      (B = E.avail_out),
      (T = E.next_in),
      (I = E.input),
      (R = E.avail_in),
      (P = A.hold),
      (O = A.bits),
      (F = R),
      (L = B),
      (Q = Z_OK$1);
    e: for (;;)
      switch (A.mode) {
        case HEAD:
          if (A.wrap === 0) {
            A.mode = TYPEDO;
            break;
          }
          for (; O < 16; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          if (A.wrap & 2 && P === 35615) {
            A.wbits === 0 && (A.wbits = 15),
              (A.check = 0),
              (J[0] = P & 255),
              (J[1] = (P >>> 8) & 255),
              (A.check = crc32_1(A.check, J, 2, 0)),
              (P = 0),
              (O = 0),
              (A.mode = FLAGS);
            break;
          }
          if ((A.head && (A.head.done = !1), !(A.wrap & 1) || (((P & 255) << 8) + (P >> 8)) % 31)) {
            (E.msg = "incorrect header check"), (A.mode = BAD);
            break;
          }
          if ((P & 15) !== Z_DEFLATED) {
            (E.msg = "unknown compression method"), (A.mode = BAD);
            break;
          }
          if (((P >>>= 4), (O -= 4), (te = (P & 15) + 8), A.wbits === 0 && (A.wbits = te), te > 15 || te > A.wbits)) {
            (E.msg = "invalid window size"), (A.mode = BAD);
            break;
          }
          (A.dmax = 1 << A.wbits),
            (A.flags = 0),
            (E.adler = A.check = 1),
            (A.mode = P & 512 ? DICTID : TYPE),
            (P = 0),
            (O = 0);
          break;
        case FLAGS:
          for (; O < 16; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          if (((A.flags = P), (A.flags & 255) !== Z_DEFLATED)) {
            (E.msg = "unknown compression method"), (A.mode = BAD);
            break;
          }
          if (A.flags & 57344) {
            (E.msg = "unknown header flags set"), (A.mode = BAD);
            break;
          }
          A.head && (A.head.text = (P >> 8) & 1),
            A.flags & 512 &&
              A.wrap & 4 &&
              ((J[0] = P & 255), (J[1] = (P >>> 8) & 255), (A.check = crc32_1(A.check, J, 2, 0))),
            (P = 0),
            (O = 0),
            (A.mode = TIME);
        case TIME:
          for (; O < 32; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          A.head && (A.head.time = P),
            A.flags & 512 &&
              A.wrap & 4 &&
              ((J[0] = P & 255),
              (J[1] = (P >>> 8) & 255),
              (J[2] = (P >>> 16) & 255),
              (J[3] = (P >>> 24) & 255),
              (A.check = crc32_1(A.check, J, 4, 0))),
            (P = 0),
            (O = 0),
            (A.mode = OS);
        case OS:
          for (; O < 16; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          A.head && ((A.head.xflags = P & 255), (A.head.os = P >> 8)),
            A.flags & 512 &&
              A.wrap & 4 &&
              ((J[0] = P & 255), (J[1] = (P >>> 8) & 255), (A.check = crc32_1(A.check, J, 2, 0))),
            (P = 0),
            (O = 0),
            (A.mode = EXLEN);
        case EXLEN:
          if (A.flags & 1024) {
            for (; O < 16; ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            (A.length = P),
              A.head && (A.head.extra_len = P),
              A.flags & 512 &&
                A.wrap & 4 &&
                ((J[0] = P & 255), (J[1] = (P >>> 8) & 255), (A.check = crc32_1(A.check, J, 2, 0))),
              (P = 0),
              (O = 0);
          } else A.head && (A.head.extra = null);
          A.mode = EXTRA;
        case EXTRA:
          if (
            A.flags & 1024 &&
            ((U = A.length),
            U > R && (U = R),
            U &&
              (A.head &&
                ((te = A.head.extra_len - A.length),
                A.head.extra || (A.head.extra = new Uint8Array(A.head.extra_len)),
                A.head.extra.set(I.subarray(T, T + U), te)),
              A.flags & 512 && A.wrap & 4 && (A.check = crc32_1(A.check, I, U, T)),
              (R -= U),
              (T += U),
              (A.length -= U)),
            A.length)
          )
            break e;
          (A.length = 0), (A.mode = NAME);
        case NAME:
          if (A.flags & 2048) {
            if (R === 0) break e;
            U = 0;
            do (te = I[T + U++]), A.head && te && A.length < 65536 && (A.head.name += String.fromCharCode(te));
            while (te && U < R);
            if ((A.flags & 512 && A.wrap & 4 && (A.check = crc32_1(A.check, I, U, T)), (R -= U), (T += U), te)) break e;
          } else A.head && (A.head.name = null);
          (A.length = 0), (A.mode = COMMENT);
        case COMMENT:
          if (A.flags & 4096) {
            if (R === 0) break e;
            U = 0;
            do (te = I[T + U++]), A.head && te && A.length < 65536 && (A.head.comment += String.fromCharCode(te));
            while (te && U < R);
            if ((A.flags & 512 && A.wrap & 4 && (A.check = crc32_1(A.check, I, U, T)), (R -= U), (T += U), te)) break e;
          } else A.head && (A.head.comment = null);
          A.mode = HCRC;
        case HCRC:
          if (A.flags & 512) {
            for (; O < 16; ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            if (A.wrap & 4 && P !== (A.check & 65535)) {
              (E.msg = "header crc mismatch"), (A.mode = BAD);
              break;
            }
            (P = 0), (O = 0);
          }
          A.head && ((A.head.hcrc = (A.flags >> 9) & 1), (A.head.done = !0)), (E.adler = A.check = 0), (A.mode = TYPE);
          break;
        case DICTID:
          for (; O < 32; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          (E.adler = A.check = zswap32(P)), (P = 0), (O = 0), (A.mode = DICT);
        case DICT:
          if (A.havedict === 0)
            return (
              (E.next_out = C),
              (E.avail_out = B),
              (E.next_in = T),
              (E.avail_in = R),
              (A.hold = P),
              (A.bits = O),
              Z_NEED_DICT$1
            );
          (E.adler = A.check = 1), (A.mode = TYPE);
        case TYPE:
          if (_ === Z_BLOCK || _ === Z_TREES) break e;
        case TYPEDO:
          if (A.last) {
            (P >>>= O & 7), (O -= O & 7), (A.mode = CHECK);
            break;
          }
          for (; O < 3; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          switch (((A.last = P & 1), (P >>>= 1), (O -= 1), P & 3)) {
            case 0:
              A.mode = STORED;
              break;
            case 1:
              if ((fixedtables(A), (A.mode = LEN_), _ === Z_TREES)) {
                (P >>>= 2), (O -= 2);
                break e;
              }
              break;
            case 2:
              A.mode = TABLE;
              break;
            case 3:
              (E.msg = "invalid block type"), (A.mode = BAD);
          }
          (P >>>= 2), (O -= 2);
          break;
        case STORED:
          for (P >>>= O & 7, O -= O & 7; O < 32; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          if ((P & 65535) !== ((P >>> 16) ^ 65535)) {
            (E.msg = "invalid stored block lengths"), (A.mode = BAD);
            break;
          }
          if (((A.length = P & 65535), (P = 0), (O = 0), (A.mode = COPY_), _ === Z_TREES)) break e;
        case COPY_:
          A.mode = COPY;
        case COPY:
          if (((U = A.length), U)) {
            if ((U > R && (U = R), U > B && (U = B), U === 0)) break e;
            D.set(I.subarray(T, T + U), C), (R -= U), (T += U), (B -= U), (C += U), (A.length -= U);
            break;
          }
          A.mode = TYPE;
          break;
        case TABLE:
          for (; O < 14; ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          if (
            ((A.nlen = (P & 31) + 257),
            (P >>>= 5),
            (O -= 5),
            (A.ndist = (P & 31) + 1),
            (P >>>= 5),
            (O -= 5),
            (A.ncode = (P & 15) + 4),
            (P >>>= 4),
            (O -= 4),
            A.nlen > 286 || A.ndist > 30)
          ) {
            (E.msg = "too many length or distance symbols"), (A.mode = BAD);
            break;
          }
          (A.have = 0), (A.mode = LENLENS);
        case LENLENS:
          for (; A.have < A.ncode; ) {
            for (; O < 3; ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            (A.lens[re[A.have++]] = P & 7), (P >>>= 3), (O -= 3);
          }
          for (; A.have < 19; ) A.lens[re[A.have++]] = 0;
          if (
            ((A.lencode = A.lendyn),
            (A.lenbits = 7),
            (K = { bits: A.lenbits }),
            (Q = inftrees(CODES, A.lens, 0, 19, A.lencode, 0, A.work, K)),
            (A.lenbits = K.bits),
            Q)
          ) {
            (E.msg = "invalid code lengths set"), (A.mode = BAD);
            break;
          }
          (A.have = 0), (A.mode = CODELENS);
        case CODELENS:
          for (; A.have < A.nlen + A.ndist; ) {
            for (
              ;
              (X = A.lencode[P & ((1 << A.lenbits) - 1)]),
                (G = X >>> 24),
                (Z = (X >>> 16) & 255),
                (Y = X & 65535),
                !(G <= O);

            ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            if (Y < 16) (P >>>= G), (O -= G), (A.lens[A.have++] = Y);
            else {
              if (Y === 16) {
                for (ne = G + 2; O < ne; ) {
                  if (R === 0) break e;
                  R--, (P += I[T++] << O), (O += 8);
                }
                if (((P >>>= G), (O -= G), A.have === 0)) {
                  (E.msg = "invalid bit length repeat"), (A.mode = BAD);
                  break;
                }
                (te = A.lens[A.have - 1]), (U = 3 + (P & 3)), (P >>>= 2), (O -= 2);
              } else if (Y === 17) {
                for (ne = G + 3; O < ne; ) {
                  if (R === 0) break e;
                  R--, (P += I[T++] << O), (O += 8);
                }
                (P >>>= G), (O -= G), (te = 0), (U = 3 + (P & 7)), (P >>>= 3), (O -= 3);
              } else {
                for (ne = G + 7; O < ne; ) {
                  if (R === 0) break e;
                  R--, (P += I[T++] << O), (O += 8);
                }
                (P >>>= G), (O -= G), (te = 0), (U = 11 + (P & 127)), (P >>>= 7), (O -= 7);
              }
              if (A.have + U > A.nlen + A.ndist) {
                (E.msg = "invalid bit length repeat"), (A.mode = BAD);
                break;
              }
              for (; U--; ) A.lens[A.have++] = te;
            }
          }
          if (A.mode === BAD) break;
          if (A.lens[256] === 0) {
            (E.msg = "invalid code -- missing end-of-block"), (A.mode = BAD);
            break;
          }
          if (
            ((A.lenbits = 9),
            (K = { bits: A.lenbits }),
            (Q = inftrees(LENS, A.lens, 0, A.nlen, A.lencode, 0, A.work, K)),
            (A.lenbits = K.bits),
            Q)
          ) {
            (E.msg = "invalid literal/lengths set"), (A.mode = BAD);
            break;
          }
          if (
            ((A.distbits = 6),
            (A.distcode = A.distdyn),
            (K = { bits: A.distbits }),
            (Q = inftrees(DISTS, A.lens, A.nlen, A.ndist, A.distcode, 0, A.work, K)),
            (A.distbits = K.bits),
            Q)
          ) {
            (E.msg = "invalid distances set"), (A.mode = BAD);
            break;
          }
          if (((A.mode = LEN_), _ === Z_TREES)) break e;
        case LEN_:
          A.mode = LEN;
        case LEN:
          if (R >= 6 && B >= 258) {
            (E.next_out = C),
              (E.avail_out = B),
              (E.next_in = T),
              (E.avail_in = R),
              (A.hold = P),
              (A.bits = O),
              inffast(E, L),
              (C = E.next_out),
              (D = E.output),
              (B = E.avail_out),
              (T = E.next_in),
              (I = E.input),
              (R = E.avail_in),
              (P = A.hold),
              (O = A.bits),
              A.mode === TYPE && (A.back = -1);
            break;
          }
          for (
            A.back = 0;
            (X = A.lencode[P & ((1 << A.lenbits) - 1)]),
              (G = X >>> 24),
              (Z = (X >>> 16) & 255),
              (Y = X & 65535),
              !(G <= O);

          ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          if (Z && !(Z & 240)) {
            for (
              q = G, W = Z, ee = Y;
              (X = A.lencode[ee + ((P & ((1 << (q + W)) - 1)) >> q)]),
                (G = X >>> 24),
                (Z = (X >>> 16) & 255),
                (Y = X & 65535),
                !(q + G <= O);

            ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            (P >>>= q), (O -= q), (A.back += q);
          }
          if (((P >>>= G), (O -= G), (A.back += G), (A.length = Y), Z === 0)) {
            A.mode = LIT;
            break;
          }
          if (Z & 32) {
            (A.back = -1), (A.mode = TYPE);
            break;
          }
          if (Z & 64) {
            (E.msg = "invalid literal/length code"), (A.mode = BAD);
            break;
          }
          (A.extra = Z & 15), (A.mode = LENEXT);
        case LENEXT:
          if (A.extra) {
            for (ne = A.extra; O < ne; ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            (A.length += P & ((1 << A.extra) - 1)), (P >>>= A.extra), (O -= A.extra), (A.back += A.extra);
          }
          (A.was = A.length), (A.mode = DIST);
        case DIST:
          for (
            ;
            (X = A.distcode[P & ((1 << A.distbits) - 1)]),
              (G = X >>> 24),
              (Z = (X >>> 16) & 255),
              (Y = X & 65535),
              !(G <= O);

          ) {
            if (R === 0) break e;
            R--, (P += I[T++] << O), (O += 8);
          }
          if (!(Z & 240)) {
            for (
              q = G, W = Z, ee = Y;
              (X = A.distcode[ee + ((P & ((1 << (q + W)) - 1)) >> q)]),
                (G = X >>> 24),
                (Z = (X >>> 16) & 255),
                (Y = X & 65535),
                !(q + G <= O);

            ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            (P >>>= q), (O -= q), (A.back += q);
          }
          if (((P >>>= G), (O -= G), (A.back += G), Z & 64)) {
            (E.msg = "invalid distance code"), (A.mode = BAD);
            break;
          }
          (A.offset = Y), (A.extra = Z & 15), (A.mode = DISTEXT);
        case DISTEXT:
          if (A.extra) {
            for (ne = A.extra; O < ne; ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            (A.offset += P & ((1 << A.extra) - 1)), (P >>>= A.extra), (O -= A.extra), (A.back += A.extra);
          }
          if (A.offset > A.dmax) {
            (E.msg = "invalid distance too far back"), (A.mode = BAD);
            break;
          }
          A.mode = MATCH;
        case MATCH:
          if (B === 0) break e;
          if (((U = L - B), A.offset > U)) {
            if (((U = A.offset - U), U > A.whave && A.sane)) {
              (E.msg = "invalid distance too far back"), (A.mode = BAD);
              break;
            }
            U > A.wnext ? ((U -= A.wnext), (z = A.wsize - U)) : (z = A.wnext - U),
              U > A.length && (U = A.length),
              (V = A.window);
          } else (V = D), (z = C - A.offset), (U = A.length);
          U > B && (U = B), (B -= U), (A.length -= U);
          do D[C++] = V[z++];
          while (--U);
          A.length === 0 && (A.mode = LEN);
          break;
        case LIT:
          if (B === 0) break e;
          (D[C++] = A.length), B--, (A.mode = LEN);
          break;
        case CHECK:
          if (A.wrap) {
            for (; O < 32; ) {
              if (R === 0) break e;
              R--, (P |= I[T++] << O), (O += 8);
            }
            if (
              ((L -= B),
              (E.total_out += L),
              (A.total += L),
              A.wrap & 4 &&
                L &&
                (E.adler = A.check = A.flags ? crc32_1(A.check, D, L, C - L) : adler32_1(A.check, D, L, C - L)),
              (L = B),
              A.wrap & 4 && (A.flags ? P : zswap32(P)) !== A.check)
            ) {
              (E.msg = "incorrect data check"), (A.mode = BAD);
              break;
            }
            (P = 0), (O = 0);
          }
          A.mode = LENGTH;
        case LENGTH:
          if (A.wrap && A.flags) {
            for (; O < 32; ) {
              if (R === 0) break e;
              R--, (P += I[T++] << O), (O += 8);
            }
            if (A.wrap & 4 && P !== (A.total & 4294967295)) {
              (E.msg = "incorrect length check"), (A.mode = BAD);
              break;
            }
            (P = 0), (O = 0);
          }
          A.mode = DONE;
        case DONE:
          Q = Z_STREAM_END$1;
          break e;
        case BAD:
          Q = Z_DATA_ERROR$1;
          break e;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        default:
          return Z_STREAM_ERROR$1;
      }
    return (
      (E.next_out = C),
      (E.avail_out = B),
      (E.next_in = T),
      (E.avail_in = R),
      (A.hold = P),
      (A.bits = O),
      (A.wsize || (L !== E.avail_out && A.mode < BAD && (A.mode < CHECK || _ !== Z_FINISH$1))) &&
        updatewindow(E, E.output, E.next_out, L - E.avail_out),
      (F -= E.avail_in),
      (L -= E.avail_out),
      (E.total_in += F),
      (E.total_out += L),
      (A.total += L),
      A.wrap & 4 &&
        L &&
        (E.adler = A.check =
          A.flags ? crc32_1(A.check, D, L, E.next_out - L) : adler32_1(A.check, D, L, E.next_out - L)),
      (E.data_type =
        A.bits + (A.last ? 64 : 0) + (A.mode === TYPE ? 128 : 0) + (A.mode === LEN_ || A.mode === COPY_ ? 256 : 0)),
      ((F === 0 && L === 0) || _ === Z_FINISH$1) && Q === Z_OK$1 && (Q = Z_BUF_ERROR),
      Q
    );
  },
  inflateEnd = (E) => {
    if (inflateStateCheck(E)) return Z_STREAM_ERROR$1;
    let _ = E.state;
    return _.window && (_.window = null), (E.state = null), Z_OK$1;
  },
  inflateGetHeader = (E, _) => {
    if (inflateStateCheck(E)) return Z_STREAM_ERROR$1;
    const A = E.state;
    return A.wrap & 2 ? ((A.head = _), (_.done = !1), Z_OK$1) : Z_STREAM_ERROR$1;
  },
  inflateSetDictionary = (E, _) => {
    const A = _.length;
    let I, D, T;
    return inflateStateCheck(E) || ((I = E.state), I.wrap !== 0 && I.mode !== DICT)
      ? Z_STREAM_ERROR$1
      : I.mode === DICT && ((D = 1), (D = adler32_1(D, _, A, 0)), D !== I.check)
        ? Z_DATA_ERROR$1
        : ((T = updatewindow(E, _, A, A)), T ? ((I.mode = MEM), Z_MEM_ERROR$1) : ((I.havedict = 1), Z_OK$1));
  };
var inflateReset_1 = inflateReset,
  inflateReset2_1 = inflateReset2,
  inflateResetKeep_1 = inflateResetKeep,
  inflateInit_1 = inflateInit,
  inflateInit2_1 = inflateInit2,
  inflate_2$1 = inflate$2,
  inflateEnd_1 = inflateEnd,
  inflateGetHeader_1 = inflateGetHeader,
  inflateSetDictionary_1 = inflateSetDictionary,
  inflateInfo = "pako inflate (from Nodeca project)",
  inflate_1$2 = {
    inflateReset: inflateReset_1,
    inflateReset2: inflateReset2_1,
    inflateResetKeep: inflateResetKeep_1,
    inflateInit: inflateInit_1,
    inflateInit2: inflateInit2_1,
    inflate: inflate_2$1,
    inflateEnd: inflateEnd_1,
    inflateGetHeader: inflateGetHeader_1,
    inflateSetDictionary: inflateSetDictionary_1,
    inflateInfo,
  };
function GZheader() {
  (this.text = 0),
    (this.time = 0),
    (this.xflags = 0),
    (this.os = 0),
    (this.extra = null),
    (this.extra_len = 0),
    (this.name = ""),
    (this.comment = ""),
    (this.hcrc = 0),
    (this.done = !1);
}
var gzheader = GZheader;
const toString$2 = Object.prototype.toString,
  { Z_NO_FLUSH, Z_FINISH, Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR } = constants$2;
function Inflate$1(E) {
  this.options = common.assign({ chunkSize: 1024 * 64, windowBits: 15, to: "" }, E || {});
  const _ = this.options;
  _.raw &&
    _.windowBits >= 0 &&
    _.windowBits < 16 &&
    ((_.windowBits = -_.windowBits), _.windowBits === 0 && (_.windowBits = -15)),
    _.windowBits >= 0 && _.windowBits < 16 && !(E && E.windowBits) && (_.windowBits += 32),
    _.windowBits > 15 && _.windowBits < 48 && (_.windowBits & 15 || (_.windowBits |= 15)),
    (this.err = 0),
    (this.msg = ""),
    (this.ended = !1),
    (this.chunks = []),
    (this.strm = new zstream()),
    (this.strm.avail_out = 0);
  let A = inflate_1$2.inflateInit2(this.strm, _.windowBits);
  if (A !== Z_OK) throw new Error(messages[A]);
  if (
    ((this.header = new gzheader()),
    inflate_1$2.inflateGetHeader(this.strm, this.header),
    _.dictionary &&
      (typeof _.dictionary == "string"
        ? (_.dictionary = strings.string2buf(_.dictionary))
        : toString$2.call(_.dictionary) === "[object ArrayBuffer]" && (_.dictionary = new Uint8Array(_.dictionary)),
      _.raw && ((A = inflate_1$2.inflateSetDictionary(this.strm, _.dictionary)), A !== Z_OK)))
  )
    throw new Error(messages[A]);
}
Inflate$1.prototype.push = function (E, _) {
  const A = this.strm,
    I = this.options.chunkSize,
    D = this.options.dictionary;
  let T, C, R;
  if (this.ended) return !1;
  for (
    _ === ~~_ ? (C = _) : (C = _ === !0 ? Z_FINISH : Z_NO_FLUSH),
      toString$2.call(E) === "[object ArrayBuffer]" ? (A.input = new Uint8Array(E)) : (A.input = E),
      A.next_in = 0,
      A.avail_in = A.input.length;
    ;

  ) {
    for (
      A.avail_out === 0 && ((A.output = new Uint8Array(I)), (A.next_out = 0), (A.avail_out = I)),
        T = inflate_1$2.inflate(A, C),
        T === Z_NEED_DICT &&
          D &&
          ((T = inflate_1$2.inflateSetDictionary(A, D)),
          T === Z_OK ? (T = inflate_1$2.inflate(A, C)) : T === Z_DATA_ERROR && (T = Z_NEED_DICT));
      A.avail_in > 0 && T === Z_STREAM_END && A.state.wrap > 0 && E[A.next_in] !== 0;

    )
      inflate_1$2.inflateReset(A), (T = inflate_1$2.inflate(A, C));
    switch (T) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        return this.onEnd(T), (this.ended = !0), !1;
    }
    if (((R = A.avail_out), A.next_out && (A.avail_out === 0 || T === Z_STREAM_END)))
      if (this.options.to === "string") {
        let B = strings.utf8border(A.output, A.next_out),
          P = A.next_out - B,
          O = strings.buf2string(A.output, B);
        (A.next_out = P), (A.avail_out = I - P), P && A.output.set(A.output.subarray(B, B + P), 0), this.onData(O);
      } else this.onData(A.output.length === A.next_out ? A.output : A.output.subarray(0, A.next_out));
    if (!(T === Z_OK && R === 0)) {
      if (T === Z_STREAM_END) return (T = inflate_1$2.inflateEnd(this.strm)), this.onEnd(T), (this.ended = !0), !0;
      if (A.avail_in === 0) break;
    }
  }
  return !0;
};
Inflate$1.prototype.onData = function (E) {
  this.chunks.push(E);
};
Inflate$1.prototype.onEnd = function (E) {
  E === Z_OK &&
    (this.options.to === "string"
      ? (this.result = this.chunks.join(""))
      : (this.result = common.flattenChunks(this.chunks))),
    (this.chunks = []),
    (this.err = E),
    (this.msg = this.strm.msg);
};
function inflate$1(E, _) {
  const A = new Inflate$1(_);
  if ((A.push(E), A.err)) throw A.msg || messages[A.err];
  return A.result;
}
function inflateRaw$1(E, _) {
  return (_ = _ || {}), (_.raw = !0), inflate$1(E, _);
}
var Inflate_1$1 = Inflate$1,
  inflate_2 = inflate$1,
  inflateRaw_1$1 = inflateRaw$1,
  ungzip$1 = inflate$1,
  constants = constants$2,
  inflate_1$1 = { Inflate: Inflate_1$1, inflate: inflate_2, inflateRaw: inflateRaw_1$1, ungzip: ungzip$1, constants };
const { Deflate, deflate, deflateRaw, gzip } = deflate_1$1,
  { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var deflate_1 = deflate,
  Inflate_1 = Inflate,
  inflate_1 = inflate;
const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10],
  crcTable = [];
for (let E = 0; E < 256; E++) {
  let _ = E;
  for (let A = 0; A < 8; A++) _ & 1 ? (_ = 3988292384 ^ (_ >>> 1)) : (_ = _ >>> 1);
  crcTable[E] = _;
}
const initialCrc = 4294967295;
function updateCrc(E, _, A) {
  let I = E;
  for (let D = 0; D < A; D++) I = crcTable[(I ^ _[D]) & 255] ^ (I >>> 8);
  return I;
}
function crc(E, _) {
  return (updateCrc(initialCrc, E, _) ^ initialCrc) >>> 0;
}
var ColorType;
(function (E) {
  (E[(E.UNKNOWN = -1)] = "UNKNOWN"),
    (E[(E.GREYSCALE = 0)] = "GREYSCALE"),
    (E[(E.TRUECOLOUR = 2)] = "TRUECOLOUR"),
    (E[(E.INDEXED_COLOUR = 3)] = "INDEXED_COLOUR"),
    (E[(E.GREYSCALE_ALPHA = 4)] = "GREYSCALE_ALPHA"),
    (E[(E.TRUECOLOUR_ALPHA = 6)] = "TRUECOLOUR_ALPHA");
})(ColorType || (ColorType = {}));
var CompressionMethod;
(function (E) {
  (E[(E.UNKNOWN = -1)] = "UNKNOWN"), (E[(E.DEFLATE = 0)] = "DEFLATE");
})(CompressionMethod || (CompressionMethod = {}));
var FilterMethod;
(function (E) {
  (E[(E.UNKNOWN = -1)] = "UNKNOWN"), (E[(E.ADAPTIVE = 0)] = "ADAPTIVE");
})(FilterMethod || (FilterMethod = {}));
var InterlaceMethod;
(function (E) {
  (E[(E.UNKNOWN = -1)] = "UNKNOWN"), (E[(E.NO_INTERLACE = 0)] = "NO_INTERLACE"), (E[(E.ADAM7 = 1)] = "ADAM7");
})(InterlaceMethod || (InterlaceMethod = {}));
const empty = new Uint8Array(0),
  NULL = "\0",
  uint16 = new Uint16Array([255]),
  uint8 = new Uint8Array(uint16.buffer),
  osIsLittleEndian = uint8[0] === 255;
class PngDecoder extends IOBuffer$4 {
  constructor(_, A = {}) {
    super(_);
    const { checkCrc: I = !1 } = A;
    (this._checkCrc = I),
      (this._inflator = new Inflate_1()),
      (this._png = { width: -1, height: -1, channels: -1, data: new Uint8Array(0), depth: 1, text: {} }),
      (this._end = !1),
      (this._hasPalette = !1),
      (this._palette = []),
      (this._compressionMethod = CompressionMethod.UNKNOWN),
      (this._filterMethod = FilterMethod.UNKNOWN),
      (this._interlaceMethod = InterlaceMethod.UNKNOWN),
      (this._colorType = -1),
      this.setBigEndian();
  }
  decode() {
    for (this.decodeSignature(); !this._end; ) this.decodeChunk();
    return this.decodeImage(), this._png;
  }
  decodeSignature() {
    for (let _ = 0; _ < pngSignature.length; _++)
      if (this.readUint8() !== pngSignature[_])
        throw new Error(`wrong PNG signature. Byte at ${_} should be ${pngSignature[_]}.`);
  }
  decodeChunk() {
    const _ = this.readUint32(),
      A = this.readChars(4),
      I = this.offset;
    switch (A) {
      case "IHDR":
        this.decodeIHDR();
        break;
      case "PLTE":
        this.decodePLTE(_);
        break;
      case "IDAT":
        this.decodeIDAT(_);
        break;
      case "IEND":
        this._end = !0;
        break;
      case "tRNS":
        this.decodetRNS(_);
        break;
      case "iCCP":
        this.decodeiCCP(_);
        break;
      case "tEXt":
        this.decodetEXt(_);
        break;
      case "pHYs":
        this.decodepHYs();
        break;
      default:
        this.skip(_);
        break;
    }
    if (this.offset - I !== _) throw new Error(`Length mismatch while decoding chunk ${A}`);
    if (this._checkCrc) {
      const D = this.readUint32(),
        T = _ + 4,
        C = crc(new Uint8Array(this.buffer, this.byteOffset + this.offset - T - 4, T), T);
      if (C !== D) throw new Error(`CRC mismatch for chunk ${A}. Expected ${D}, found ${C}`);
    } else this.skip(4);
  }
  decodeIHDR() {
    const _ = this._png;
    (_.width = this.readUint32()), (_.height = this.readUint32()), (_.depth = checkBitDepth(this.readUint8()));
    const A = this.readUint8();
    this._colorType = A;
    let I;
    switch (A) {
      case ColorType.GREYSCALE:
        I = 1;
        break;
      case ColorType.TRUECOLOUR:
        I = 3;
        break;
      case ColorType.INDEXED_COLOUR:
        I = 1;
        break;
      case ColorType.GREYSCALE_ALPHA:
        I = 2;
        break;
      case ColorType.TRUECOLOUR_ALPHA:
        I = 4;
        break;
      default:
        throw new Error(`Unknown color type: ${A}`);
    }
    if (
      ((this._png.channels = I),
      (this._compressionMethod = this.readUint8()),
      this._compressionMethod !== CompressionMethod.DEFLATE)
    )
      throw new Error(`Unsupported compression method: ${this._compressionMethod}`);
    (this._filterMethod = this.readUint8()), (this._interlaceMethod = this.readUint8());
  }
  decodePLTE(_) {
    if (_ % 3 !== 0) throw new RangeError(`PLTE field length must be a multiple of 3. Got ${_}`);
    const A = _ / 3;
    this._hasPalette = !0;
    const I = [];
    this._palette = I;
    for (let D = 0; D < A; D++) I.push([this.readUint8(), this.readUint8(), this.readUint8()]);
  }
  decodeIDAT(_) {
    this._inflator.push(new Uint8Array(this.buffer, this.offset + this.byteOffset, _)), this.skip(_);
  }
  decodetRNS(_) {
    if (this._colorType === 3) {
      if (_ > this._palette.length)
        throw new Error(
          `tRNS chunk contains more alpha values than there are palette colors (${_} vs ${this._palette.length})`,
        );
      let A = 0;
      for (; A < _; A++) {
        const I = this.readByte();
        this._palette[A].push(I);
      }
      for (; A < this._palette.length; A++) this._palette[A].push(255);
    }
  }
  decodeiCCP(_) {
    let A = "",
      I;
    for (; (I = this.readChar()) !== NULL; ) A += I;
    const D = this.readUint8();
    if (D !== CompressionMethod.DEFLATE) throw new Error(`Unsupported iCCP compression method: ${D}`);
    const T = this.readBytes(_ - A.length - 2);
    this._png.iccEmbeddedProfile = { name: A, profile: inflate_1(T) };
  }
  decodetEXt(_) {
    let A = "",
      I;
    for (; (I = this.readChar()) !== NULL; ) A += I;
    this._png.text[A] = this.readChars(_ - A.length - 1);
  }
  decodepHYs() {
    const _ = this.readUint32(),
      A = this.readUint32(),
      I = this.readByte();
    this._png.resolution = { x: _, y: A, unit: I };
  }
  decodeImage() {
    if (this._inflator.err) throw new Error(`Error while decompressing the data: ${this._inflator.err}`);
    const _ = this._inflator.result;
    if (this._filterMethod !== FilterMethod.ADAPTIVE)
      throw new Error(`Filter method ${this._filterMethod} not supported`);
    if (this._interlaceMethod === InterlaceMethod.NO_INTERLACE) this.decodeInterlaceNull(_);
    else throw new Error(`Interlace method ${this._interlaceMethod} not supported`);
  }
  decodeInterlaceNull(_) {
    const A = this._png.height,
      I = (this._png.channels * this._png.depth) / 8,
      D = this._png.width * I,
      T = new Uint8Array(this._png.height * D);
    let C = empty,
      R = 0,
      B,
      P;
    for (let O = 0; O < A; O++) {
      switch (((B = _.subarray(R + 1, R + 1 + D)), (P = T.subarray(O * D, (O + 1) * D)), _[R])) {
        case 0:
          unfilterNone(B, P, D);
          break;
        case 1:
          unfilterSub(B, P, D, I);
          break;
        case 2:
          unfilterUp(B, P, C, D);
          break;
        case 3:
          unfilterAverage(B, P, C, D, I);
          break;
        case 4:
          unfilterPaeth(B, P, C, D, I);
          break;
        default:
          throw new Error(`Unsupported filter: ${_[R]}`);
      }
      (C = P), (R += D + 1);
    }
    if ((this._hasPalette && (this._png.palette = this._palette), this._png.depth === 16)) {
      const O = new Uint16Array(T.buffer);
      if (osIsLittleEndian) for (let F = 0; F < O.length; F++) O[F] = swap16(O[F]);
      this._png.data = O;
    } else this._png.data = T;
  }
}
function unfilterNone(E, _, A) {
  for (let I = 0; I < A; I++) _[I] = E[I];
}
function unfilterSub(E, _, A, I) {
  let D = 0;
  for (; D < I; D++) _[D] = E[D];
  for (; D < A; D++) _[D] = (E[D] + _[D - I]) & 255;
}
function unfilterUp(E, _, A, I) {
  let D = 0;
  if (A.length === 0) for (; D < I; D++) _[D] = E[D];
  else for (; D < I; D++) _[D] = (E[D] + A[D]) & 255;
}
function unfilterAverage(E, _, A, I, D) {
  let T = 0;
  if (A.length === 0) {
    for (; T < D; T++) _[T] = E[T];
    for (; T < I; T++) _[T] = (E[T] + (_[T - D] >> 1)) & 255;
  } else {
    for (; T < D; T++) _[T] = (E[T] + (A[T] >> 1)) & 255;
    for (; T < I; T++) _[T] = (E[T] + ((_[T - D] + A[T]) >> 1)) & 255;
  }
}
function unfilterPaeth(E, _, A, I, D) {
  let T = 0;
  if (A.length === 0) {
    for (; T < D; T++) _[T] = E[T];
    for (; T < I; T++) _[T] = (E[T] + _[T - D]) & 255;
  } else {
    for (; T < D; T++) _[T] = (E[T] + A[T]) & 255;
    for (; T < I; T++) _[T] = (E[T] + paethPredictor(_[T - D], A[T], A[T - D])) & 255;
  }
}
function paethPredictor(E, _, A) {
  const I = E + _ - A,
    D = Math.abs(I - E),
    T = Math.abs(I - _),
    C = Math.abs(I - A);
  return D <= T && D <= C ? E : T <= C ? _ : A;
}
function swap16(E) {
  return ((E & 255) << 8) | ((E >> 8) & 255);
}
function checkBitDepth(E) {
  if (E !== 1 && E !== 2 && E !== 4 && E !== 8 && E !== 16) throw new Error(`invalid bit depth: ${E}`);
  return E;
}
const defaultZlibOptions = { level: 3 };
class PngEncoder extends IOBuffer$4 {
  constructor(_, A = {}) {
    super(),
      (this._colorType = ColorType.UNKNOWN),
      (this._zlibOptions = Object.assign({}, defaultZlibOptions, A.zlib)),
      (this._png = this._checkData(_)),
      this.setBigEndian();
  }
  encode() {
    return this.encodeSignature(), this.encodeIHDR(), this.encodeData(), this.encodeIEND(), this.toArray();
  }
  encodeSignature() {
    this.writeBytes(pngSignature);
  }
  encodeIHDR() {
    this.writeUint32(13),
      this.writeChars("IHDR"),
      this.writeUint32(this._png.width),
      this.writeUint32(this._png.height),
      this.writeByte(this._png.depth),
      this.writeByte(this._colorType),
      this.writeByte(CompressionMethod.DEFLATE),
      this.writeByte(FilterMethod.ADAPTIVE),
      this.writeByte(InterlaceMethod.NO_INTERLACE),
      this.writeCrc(17);
  }
  encodeIEND() {
    this.writeUint32(0), this.writeChars("IEND"), this.writeCrc(4);
  }
  encodeIDAT(_) {
    this.writeUint32(_.length), this.writeChars("IDAT"), this.writeBytes(_), this.writeCrc(_.length + 4);
  }
  encodeData() {
    const { width: _, height: A, channels: I, depth: D, data: T } = this._png,
      C = I * _,
      R = new IOBuffer$4().setBigEndian();
    let B = 0;
    for (let F = 0; F < A; F++)
      if ((R.writeByte(0), D === 8)) B = writeDataBytes(T, R, C, B);
      else if (D === 16) B = writeDataUint16(T, R, C, B);
      else throw new Error("unreachable");
    const P = R.toArray(),
      O = deflate_1(P, this._zlibOptions);
    this.encodeIDAT(O);
  }
  _checkData(_) {
    const { colorType: A, channels: I, depth: D } = getColorType(_),
      T = {
        width: checkInteger(_.width, "width"),
        height: checkInteger(_.height, "height"),
        channels: I,
        data: _.data,
        depth: D,
        text: {},
      };
    this._colorType = A;
    const C = T.width * T.height * I;
    if (T.data.length !== C) throw new RangeError(`wrong data size. Found ${T.data.length}, expected ${C}`);
    return T;
  }
  writeCrc(_) {
    this.writeUint32(crc(new Uint8Array(this.buffer, this.byteOffset + this.offset - _, _), _));
  }
}
function checkInteger(E, _) {
  if (Number.isInteger(E) && E > 0) return E;
  throw new TypeError(`${_} must be a positive integer`);
}
function getColorType(E) {
  const { channels: _ = 4, depth: A = 8 } = E;
  if (_ !== 4 && _ !== 3 && _ !== 2 && _ !== 1) throw new RangeError(`unsupported number of channels: ${_}`);
  if (A !== 8 && A !== 16) throw new RangeError(`unsupported bit depth: ${A}`);
  const I = { channels: _, depth: A, colorType: ColorType.UNKNOWN };
  switch (_) {
    case 4:
      I.colorType = ColorType.TRUECOLOUR_ALPHA;
      break;
    case 3:
      I.colorType = ColorType.TRUECOLOUR;
      break;
    case 1:
      I.colorType = ColorType.GREYSCALE;
      break;
    case 2:
      I.colorType = ColorType.GREYSCALE_ALPHA;
      break;
    default:
      throw new Error("unsupported number of channels");
  }
  return I;
}
function writeDataBytes(E, _, A, I) {
  for (let D = 0; D < A; D++) _.writeByte(E[I++]);
  return I;
}
function writeDataUint16(E, _, A, I) {
  for (let D = 0; D < A; D++) _.writeUint16(E[I++]);
  return I;
}
var ResolutionUnitSpecifier;
(function (E) {
  (E[(E.UNKNOWN = 0)] = "UNKNOWN"), (E[(E.METRE = 1)] = "METRE");
})(ResolutionUnitSpecifier || (ResolutionUnitSpecifier = {}));
function decodePng(E, _) {
  return new PngDecoder(E, _).decode();
}
function encodePng$1(E, _) {
  return new PngEncoder(E, _).encode();
}
var encoderExports = {},
  encoder = {
    get exports() {
      return encoderExports;
    },
    set exports(E) {
      encoderExports = E;
    },
  };
(function (E) {
  function _(I) {
    var D = Math.floor,
      T = new Array(64),
      C = new Array(64),
      R = new Array(64),
      B = new Array(64),
      P,
      O,
      F,
      L,
      U = new Array(65535),
      z = new Array(65535),
      V = new Array(64),
      X = new Array(64),
      G = [],
      Z = 0,
      Y = 7,
      q = new Array(64),
      W = new Array(64),
      ee = new Array(64),
      te = new Array(256),
      Q = new Array(2048),
      J,
      K = [
        0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40,
        44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36,
        48, 49, 57, 58, 62, 63,
      ],
      ne = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      re = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      ie = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125],
      se = [
        1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21,
        82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57,
        58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115,
        116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152,
        153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195,
        196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230,
        231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250,
      ],
      oe = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      _e = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      ve = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119],
      fe = [
        0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35,
        51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56,
        57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106,
        115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150,
        151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186,
        194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229,
        230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250,
      ];
    function ke(he) {
      for (
        var Pe = [
            16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22,
            29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103,
            121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99,
          ],
          Ge = 0;
        Ge < 64;
        Ge++
      ) {
        var $e = D((Pe[Ge] * he + 50) / 100);
        $e < 1 ? ($e = 1) : $e > 255 && ($e = 255), (T[K[Ge]] = $e);
      }
      for (
        var be = [
            17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99,
            99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
            99, 99, 99, 99, 99, 99, 99, 99, 99, 99,
          ],
          qe = 0;
        qe < 64;
        qe++
      ) {
        var He = D((be[qe] * he + 50) / 100);
        He < 1 ? (He = 1) : He > 255 && (He = 255), (C[K[qe]] = He);
      }
      for (
        var ze = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379], je = 0, Xe = 0;
        Xe < 8;
        Xe++
      )
        for (var Be = 0; Be < 8; Be++)
          (R[je] = 1 / (T[K[je]] * ze[Xe] * ze[Be] * 8)), (B[je] = 1 / (C[K[je]] * ze[Xe] * ze[Be] * 8)), je++;
    }
    function me(he, Pe) {
      for (var Ge = 0, $e = 0, be = new Array(), qe = 1; qe <= 16; qe++) {
        for (var He = 1; He <= he[qe]; He++) (be[Pe[$e]] = []), (be[Pe[$e]][0] = Ge), (be[Pe[$e]][1] = qe), $e++, Ge++;
        Ge *= 2;
      }
      return be;
    }
    function Ee() {
      (P = me(ne, re)), (O = me(oe, _e)), (F = me(ie, se)), (L = me(ve, fe));
    }
    function Se() {
      for (var he = 1, Pe = 2, Ge = 1; Ge <= 15; Ge++) {
        for (var $e = he; $e < Pe; $e++)
          (z[32767 + $e] = Ge), (U[32767 + $e] = []), (U[32767 + $e][1] = Ge), (U[32767 + $e][0] = $e);
        for (var be = -(Pe - 1); be <= -he; be++)
          (z[32767 + be] = Ge), (U[32767 + be] = []), (U[32767 + be][1] = Ge), (U[32767 + be][0] = Pe - 1 + be);
        (he <<= 1), (Pe <<= 1);
      }
    }
    function ue() {
      for (var he = 0; he < 256; he++)
        (Q[he] = 19595 * he),
          (Q[(he + 256) >> 0] = 38470 * he),
          (Q[(he + 512) >> 0] = 7471 * he + 32768),
          (Q[(he + 768) >> 0] = -11059 * he),
          (Q[(he + 1024) >> 0] = -21709 * he),
          (Q[(he + 1280) >> 0] = 32768 * he + 8421375),
          (Q[(he + 1536) >> 0] = -27439 * he),
          (Q[(he + 1792) >> 0] = -5329 * he);
    }
    function xe(he) {
      for (var Pe = he[0], Ge = he[1] - 1; Ge >= 0; )
        Pe & (1 << Ge) && (Z |= 1 << Y), Ge--, Y--, Y < 0 && (Z == 255 ? (pe(255), pe(0)) : pe(Z), (Y = 7), (Z = 0));
    }
    function pe(he) {
      G.push(he);
    }
    function we(he) {
      pe((he >> 8) & 255), pe(he & 255);
    }
    function Ne(he, Pe) {
      var Ge,
        $e,
        be,
        qe,
        He,
        ze,
        je,
        Xe,
        Be = 0,
        de,
        Le = 8,
        Ye = 64;
      for (de = 0; de < Le; ++de) {
        (Ge = he[Be]),
          ($e = he[Be + 1]),
          (be = he[Be + 2]),
          (qe = he[Be + 3]),
          (He = he[Be + 4]),
          (ze = he[Be + 5]),
          (je = he[Be + 6]),
          (Xe = he[Be + 7]);
        var Qe = Ge + Xe,
          Je = Ge - Xe,
          rt = $e + je,
          Fe = $e - je,
          We = be + ze,
          et = be - ze,
          tt = qe + He,
          it = qe - He,
          nt = Qe + tt,
          st = Qe - tt,
          ht = rt + We,
          ot = rt - We;
        (he[Be] = nt + ht), (he[Be + 4] = nt - ht);
        var gt = (ot + st) * 0.707106781;
        (he[Be + 2] = st + gt), (he[Be + 6] = st - gt), (nt = it + et), (ht = et + Fe), (ot = Fe + Je);
        var mt = (nt - ot) * 0.382683433,
          ae = 0.5411961 * nt + mt,
          le = 1.306562965 * ot + mt,
          ce = ht * 0.707106781,
          Ae = Je + ce,
          Ve = Je - ce;
        (he[Be + 5] = Ve + ae), (he[Be + 3] = Ve - ae), (he[Be + 1] = Ae + le), (he[Be + 7] = Ae - le), (Be += 8);
      }
      for (Be = 0, de = 0; de < Le; ++de) {
        (Ge = he[Be]),
          ($e = he[Be + 8]),
          (be = he[Be + 16]),
          (qe = he[Be + 24]),
          (He = he[Be + 32]),
          (ze = he[Be + 40]),
          (je = he[Be + 48]),
          (Xe = he[Be + 56]);
        var Ze = Ge + Xe,
          lt = Ge - Xe,
          at = $e + je,
          ct = $e - je,
          dt = be + ze,
          vt = be - ze,
          ft = qe + He,
          bt = qe - He,
          ut = Ze + ft,
          _t = Ze - ft,
          pt = at + dt,
          xt = at - dt;
        (he[Be] = ut + pt), (he[Be + 32] = ut - pt);
        var yt = (xt + _t) * 0.707106781;
        (he[Be + 16] = _t + yt), (he[Be + 48] = _t - yt), (ut = bt + vt), (pt = vt + ct), (xt = ct + lt);
        var wt = (ut - xt) * 0.382683433,
          kt = 0.5411961 * ut + wt,
          Mt = 1.306562965 * xt + wt,
          At = pt * 0.707106781,
          St = lt + At,
          It = lt - At;
        (he[Be + 40] = It + kt), (he[Be + 24] = It - kt), (he[Be + 8] = St + Mt), (he[Be + 56] = St - Mt), Be++;
      }
      var Et;
      for (de = 0; de < Ye; ++de) (Et = he[de] * Pe[de]), (V[de] = Et > 0 ? (Et + 0.5) | 0 : (Et - 0.5) | 0);
      return V;
    }
    function Ce() {
      we(65504), we(16), pe(74), pe(70), pe(73), pe(70), pe(0), pe(1), pe(1), pe(0), we(1), we(1), pe(0), pe(0);
    }
    function De(he) {
      if (he) {
        we(65505),
          he[0] === 69 && he[1] === 120 && he[2] === 105 && he[3] === 102
            ? we(he.length + 2)
            : (we(he.length + 5 + 2), pe(69), pe(120), pe(105), pe(102), pe(0));
        for (var Pe = 0; Pe < he.length; Pe++) pe(he[Pe]);
      }
    }
    function Ue(he, Pe) {
      we(65472), we(17), pe(8), we(Pe), we(he), pe(3), pe(1), pe(17), pe(0), pe(2), pe(17), pe(1), pe(3), pe(17), pe(1);
    }
    function Oe() {
      we(65499), we(132), pe(0);
      for (var he = 0; he < 64; he++) pe(T[he]);
      pe(1);
      for (var Pe = 0; Pe < 64; Pe++) pe(C[Pe]);
    }
    function ge() {
      we(65476), we(418), pe(0);
      for (var he = 0; he < 16; he++) pe(ne[he + 1]);
      for (var Pe = 0; Pe <= 11; Pe++) pe(re[Pe]);
      pe(16);
      for (var Ge = 0; Ge < 16; Ge++) pe(ie[Ge + 1]);
      for (var $e = 0; $e <= 161; $e++) pe(se[$e]);
      pe(1);
      for (var be = 0; be < 16; be++) pe(oe[be + 1]);
      for (var qe = 0; qe <= 11; qe++) pe(_e[qe]);
      pe(17);
      for (var He = 0; He < 16; He++) pe(ve[He + 1]);
      for (var ze = 0; ze <= 161; ze++) pe(fe[ze]);
    }
    function Ke(he) {
      typeof he > "u" ||
        he.constructor !== Array ||
        he.forEach((Pe) => {
          if (typeof Pe == "string") {
            we(65534);
            var Ge = Pe.length;
            we(Ge + 2);
            var $e;
            for ($e = 0; $e < Ge; $e++) pe(Pe.charCodeAt($e));
          }
        });
    }
    function Ie() {
      we(65498), we(12), pe(3), pe(1), pe(0), pe(2), pe(17), pe(3), pe(17), pe(0), pe(63), pe(0);
    }
    function ye(he, Pe, Ge, $e, be) {
      for (var qe = be[0], He = be[240], ze, je = 16, Xe = 63, Be = 64, de = Ne(he, Pe), Le = 0; Le < Be; ++Le)
        X[K[Le]] = de[Le];
      var Ye = X[0] - Ge;
      (Ge = X[0]), Ye == 0 ? xe($e[0]) : ((ze = 32767 + Ye), xe($e[z[ze]]), xe(U[ze]));
      for (var Qe = 63; Qe > 0 && X[Qe] == 0; Qe--);
      if (Qe == 0) return xe(qe), Ge;
      for (var Je = 1, rt; Je <= Qe; ) {
        for (var Fe = Je; X[Je] == 0 && Je <= Qe; ++Je);
        var We = Je - Fe;
        if (We >= je) {
          rt = We >> 4;
          for (var et = 1; et <= rt; ++et) xe(He);
          We = We & 15;
        }
        (ze = 32767 + X[Je]), xe(be[(We << 4) + z[ze]]), xe(U[ze]), Je++;
      }
      return Qe != Xe && xe(qe), Ge;
    }
    function Re() {
      for (var he = String.fromCharCode, Pe = 0; Pe < 256; Pe++) te[Pe] = he(Pe);
    }
    this.encode = function (he, Pe) {
      new Date().getTime(),
        Pe && Me(Pe),
        (G = new Array()),
        (Z = 0),
        (Y = 7),
        we(65496),
        Ce(),
        Ke(he.comments),
        De(he.exifBuffer),
        Oe(),
        Ue(he.width, he.height),
        ge(),
        Ie();
      var Ge = 0,
        $e = 0,
        be = 0;
      (Z = 0), (Y = 7), (this.encode.displayName = "_encode_");
      for (
        var qe = he.data, He = he.width, ze = he.height, je = He * 4, Xe, Be = 0, de, Le, Ye, Qe, Je, rt, Fe, We;
        Be < ze;

      ) {
        for (Xe = 0; Xe < je; ) {
          for (Qe = je * Be + Xe, Je = Qe, rt = -1, Fe = 0, We = 0; We < 64; We++)
            (Fe = We >> 3),
              (rt = (We & 7) * 4),
              (Je = Qe + Fe * je + rt),
              Be + Fe >= ze && (Je -= je * (Be + 1 + Fe - ze)),
              Xe + rt >= je && (Je -= Xe + rt - je + 4),
              (de = qe[Je++]),
              (Le = qe[Je++]),
              (Ye = qe[Je++]),
              (q[We] = ((Q[de] + Q[(Le + 256) >> 0] + Q[(Ye + 512) >> 0]) >> 16) - 128),
              (W[We] = ((Q[(de + 768) >> 0] + Q[(Le + 1024) >> 0] + Q[(Ye + 1280) >> 0]) >> 16) - 128),
              (ee[We] = ((Q[(de + 1280) >> 0] + Q[(Le + 1536) >> 0] + Q[(Ye + 1792) >> 0]) >> 16) - 128);
          (Ge = ye(q, R, Ge, P, F)), ($e = ye(W, B, $e, O, L)), (be = ye(ee, B, be, O, L)), (Xe += 32);
        }
        Be += 8;
      }
      if (Y >= 0) {
        var et = [];
        (et[1] = Y + 1), (et[0] = (1 << (Y + 1)) - 1), xe(et);
      }
      return we(65497), Buffer.from(G);
    };
    function Me(he) {
      if ((he <= 0 && (he = 1), he > 100 && (he = 100), J != he)) {
        var Pe = 0;
        he < 50 ? (Pe = Math.floor(5e3 / he)) : (Pe = Math.floor(200 - he * 2)), ke(Pe), (J = he);
      }
    }
    function Te() {
      var he = new Date().getTime();
      I || (I = 50), Re(), Ee(), Se(), ue(), Me(I), new Date().getTime() - he;
    }
    Te();
  }
  E.exports = A;
  function A(I, D) {
    typeof D > "u" && (D = 50);
    var T = new _(D),
      C = T.encode(I, D);
    return { data: C, width: I.width, height: I.height };
  }
})(encoder);
var decoderExports = {},
  decoder = {
    get exports() {
      return decoderExports;
    },
    set exports(E) {
      decoderExports = E;
    },
  };
(function (E) {
  var _ = (function () {
    var D = new Int32Array([
        0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14,
        21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60,
        61, 54, 47, 55, 62, 63,
      ]),
      T = 4017,
      C = 799,
      R = 3406,
      B = 2276,
      P = 1567,
      O = 3784,
      F = 5793,
      L = 2896;
    function U() {}
    function z(W, ee) {
      for (var te = 0, Q = [], J, K, ne = 16; ne > 0 && !W[ne - 1]; ) ne--;
      Q.push({ children: [], index: 0 });
      var re = Q[0],
        ie;
      for (J = 0; J < ne; J++) {
        for (K = 0; K < W[J]; K++) {
          for (re = Q.pop(), re.children[re.index] = ee[te]; re.index > 0; ) {
            if (Q.length === 0) throw new Error("Could not recreate Huffman Table");
            re = Q.pop();
          }
          for (re.index++, Q.push(re); Q.length <= J; )
            Q.push((ie = { children: [], index: 0 })), (re.children[re.index] = ie.children), (re = ie);
          te++;
        }
        J + 1 < ne && (Q.push((ie = { children: [], index: 0 })), (re.children[re.index] = ie.children), (re = ie));
      }
      return Q[0].children;
    }
    function V(W, ee, te, Q, J, K, ne, re, ie, se) {
      te.precision, te.samplesPerLine, te.scanLines;
      var oe = te.mcusPerLine,
        _e = te.progressive;
      te.maxH, te.maxV;
      var ve = ee,
        fe = 0,
        ke = 0;
      function me() {
        if (ke > 0) return ke--, (fe >> ke) & 1;
        if (((fe = W[ee++]), fe == 255)) {
          var ze = W[ee++];
          if (ze) throw new Error("unexpected marker: " + ((fe << 8) | ze).toString(16));
        }
        return (ke = 7), fe >>> 7;
      }
      function Ee(ze) {
        for (var je = ze, Xe; (Xe = me()) !== null; ) {
          if (((je = je[Xe]), typeof je == "number")) return je;
          if (typeof je != "object") throw new Error("invalid huffman sequence");
        }
        return null;
      }
      function Se(ze) {
        for (var je = 0; ze > 0; ) {
          var Xe = me();
          if (Xe === null) return;
          (je = (je << 1) | Xe), ze--;
        }
        return je;
      }
      function ue(ze) {
        var je = Se(ze);
        return je >= 1 << (ze - 1) ? je : je + (-1 << ze) + 1;
      }
      function xe(ze, je) {
        var Xe = Ee(ze.huffmanTableDC),
          Be = Xe === 0 ? 0 : ue(Xe);
        je[0] = ze.pred += Be;
        for (var de = 1; de < 64; ) {
          var Le = Ee(ze.huffmanTableAC),
            Ye = Le & 15,
            Qe = Le >> 4;
          if (Ye === 0) {
            if (Qe < 15) break;
            de += 16;
            continue;
          }
          de += Qe;
          var Je = D[de];
          (je[Je] = ue(Ye)), de++;
        }
      }
      function pe(ze, je) {
        var Xe = Ee(ze.huffmanTableDC),
          Be = Xe === 0 ? 0 : ue(Xe) << ie;
        je[0] = ze.pred += Be;
      }
      function we(ze, je) {
        je[0] |= me() << ie;
      }
      var Ne = 0;
      function Ce(ze, je) {
        if (Ne > 0) {
          Ne--;
          return;
        }
        for (var Xe = K, Be = ne; Xe <= Be; ) {
          var de = Ee(ze.huffmanTableAC),
            Le = de & 15,
            Ye = de >> 4;
          if (Le === 0) {
            if (Ye < 15) {
              Ne = Se(Ye) + (1 << Ye) - 1;
              break;
            }
            Xe += 16;
            continue;
          }
          Xe += Ye;
          var Qe = D[Xe];
          (je[Qe] = ue(Le) * (1 << ie)), Xe++;
        }
      }
      var De = 0,
        Ue;
      function Oe(ze, je) {
        for (var Xe = K, Be = ne, de = 0; Xe <= Be; ) {
          var Le = D[Xe],
            Ye = je[Le] < 0 ? -1 : 1;
          switch (De) {
            case 0:
              var Qe = Ee(ze.huffmanTableAC),
                Je = Qe & 15,
                de = Qe >> 4;
              if (Je === 0) de < 15 ? ((Ne = Se(de) + (1 << de)), (De = 4)) : ((de = 16), (De = 1));
              else {
                if (Je !== 1) throw new Error("invalid ACn encoding");
                (Ue = ue(Je)), (De = de ? 2 : 3);
              }
              continue;
            case 1:
            case 2:
              je[Le] ? (je[Le] += (me() << ie) * Ye) : (de--, de === 0 && (De = De == 2 ? 3 : 0));
              break;
            case 3:
              je[Le] ? (je[Le] += (me() << ie) * Ye) : ((je[Le] = Ue << ie), (De = 0));
              break;
            case 4:
              je[Le] && (je[Le] += (me() << ie) * Ye);
              break;
          }
          Xe++;
        }
        De === 4 && (Ne--, Ne === 0 && (De = 0));
      }
      function ge(ze, je, Xe, Be, de) {
        var Le = (Xe / oe) | 0,
          Ye = Xe % oe,
          Qe = Le * ze.v + Be,
          Je = Ye * ze.h + de;
        (ze.blocks[Qe] === void 0 && se.tolerantDecoding) || je(ze, ze.blocks[Qe][Je]);
      }
      function Ke(ze, je, Xe) {
        var Be = (Xe / ze.blocksPerLine) | 0,
          de = Xe % ze.blocksPerLine;
        (ze.blocks[Be] === void 0 && se.tolerantDecoding) || je(ze, ze.blocks[Be][de]);
      }
      var Ie = Q.length,
        ye,
        Re,
        Me,
        Te,
        he,
        Pe;
      _e ? (K === 0 ? (Pe = re === 0 ? pe : we) : (Pe = re === 0 ? Ce : Oe)) : (Pe = xe);
      var Ge = 0,
        $e,
        be;
      Ie == 1 ? (be = Q[0].blocksPerLine * Q[0].blocksPerColumn) : (be = oe * te.mcusPerColumn), J || (J = be);
      for (var qe, He; Ge < be; ) {
        for (Re = 0; Re < Ie; Re++) Q[Re].pred = 0;
        if (((Ne = 0), Ie == 1)) for (ye = Q[0], he = 0; he < J; he++) Ke(ye, Pe, Ge), Ge++;
        else
          for (he = 0; he < J; he++) {
            for (Re = 0; Re < Ie; Re++)
              for (ye = Q[Re], qe = ye.h, He = ye.v, Me = 0; Me < He; Me++)
                for (Te = 0; Te < qe; Te++) ge(ye, Pe, Ge, Me, Te);
            if ((Ge++, Ge === be)) break;
          }
        if (Ge === be)
          do {
            if (W[ee] === 255 && W[ee + 1] !== 0) break;
            ee += 1;
          } while (ee < W.length - 2);
        if (((ke = 0), ($e = (W[ee] << 8) | W[ee + 1]), $e < 65280)) throw new Error("marker was not found");
        if ($e >= 65488 && $e <= 65495) ee += 2;
        else break;
      }
      return ee - ve;
    }
    function X(W, ee) {
      var te = [],
        Q = ee.blocksPerLine,
        J = ee.blocksPerColumn,
        K = Q << 3,
        ne = new Int32Array(64),
        re = new Uint8Array(64);
      function ie(Se, ue, xe) {
        var pe = ee.quantizationTable,
          we,
          Ne,
          Ce,
          De,
          Ue,
          Oe,
          ge,
          Ke,
          Ie,
          ye = xe,
          Re;
        for (Re = 0; Re < 64; Re++) ye[Re] = Se[Re] * pe[Re];
        for (Re = 0; Re < 8; ++Re) {
          var Me = 8 * Re;
          if (
            ye[1 + Me] == 0 &&
            ye[2 + Me] == 0 &&
            ye[3 + Me] == 0 &&
            ye[4 + Me] == 0 &&
            ye[5 + Me] == 0 &&
            ye[6 + Me] == 0 &&
            ye[7 + Me] == 0
          ) {
            (Ie = (F * ye[0 + Me] + 512) >> 10),
              (ye[0 + Me] = Ie),
              (ye[1 + Me] = Ie),
              (ye[2 + Me] = Ie),
              (ye[3 + Me] = Ie),
              (ye[4 + Me] = Ie),
              (ye[5 + Me] = Ie),
              (ye[6 + Me] = Ie),
              (ye[7 + Me] = Ie);
            continue;
          }
          (we = (F * ye[0 + Me] + 128) >> 8),
            (Ne = (F * ye[4 + Me] + 128) >> 8),
            (Ce = ye[2 + Me]),
            (De = ye[6 + Me]),
            (Ue = (L * (ye[1 + Me] - ye[7 + Me]) + 128) >> 8),
            (Ke = (L * (ye[1 + Me] + ye[7 + Me]) + 128) >> 8),
            (Oe = ye[3 + Me] << 4),
            (ge = ye[5 + Me] << 4),
            (Ie = (we - Ne + 1) >> 1),
            (we = (we + Ne + 1) >> 1),
            (Ne = Ie),
            (Ie = (Ce * O + De * P + 128) >> 8),
            (Ce = (Ce * P - De * O + 128) >> 8),
            (De = Ie),
            (Ie = (Ue - ge + 1) >> 1),
            (Ue = (Ue + ge + 1) >> 1),
            (ge = Ie),
            (Ie = (Ke + Oe + 1) >> 1),
            (Oe = (Ke - Oe + 1) >> 1),
            (Ke = Ie),
            (Ie = (we - De + 1) >> 1),
            (we = (we + De + 1) >> 1),
            (De = Ie),
            (Ie = (Ne - Ce + 1) >> 1),
            (Ne = (Ne + Ce + 1) >> 1),
            (Ce = Ie),
            (Ie = (Ue * B + Ke * R + 2048) >> 12),
            (Ue = (Ue * R - Ke * B + 2048) >> 12),
            (Ke = Ie),
            (Ie = (Oe * C + ge * T + 2048) >> 12),
            (Oe = (Oe * T - ge * C + 2048) >> 12),
            (ge = Ie),
            (ye[0 + Me] = we + Ke),
            (ye[7 + Me] = we - Ke),
            (ye[1 + Me] = Ne + ge),
            (ye[6 + Me] = Ne - ge),
            (ye[2 + Me] = Ce + Oe),
            (ye[5 + Me] = Ce - Oe),
            (ye[3 + Me] = De + Ue),
            (ye[4 + Me] = De - Ue);
        }
        for (Re = 0; Re < 8; ++Re) {
          var Te = Re;
          if (
            ye[8 + Te] == 0 &&
            ye[16 + Te] == 0 &&
            ye[24 + Te] == 0 &&
            ye[32 + Te] == 0 &&
            ye[40 + Te] == 0 &&
            ye[48 + Te] == 0 &&
            ye[56 + Te] == 0
          ) {
            (Ie = (F * xe[Re + 0] + 8192) >> 14),
              (ye[0 + Te] = Ie),
              (ye[8 + Te] = Ie),
              (ye[16 + Te] = Ie),
              (ye[24 + Te] = Ie),
              (ye[32 + Te] = Ie),
              (ye[40 + Te] = Ie),
              (ye[48 + Te] = Ie),
              (ye[56 + Te] = Ie);
            continue;
          }
          (we = (F * ye[0 + Te] + 2048) >> 12),
            (Ne = (F * ye[32 + Te] + 2048) >> 12),
            (Ce = ye[16 + Te]),
            (De = ye[48 + Te]),
            (Ue = (L * (ye[8 + Te] - ye[56 + Te]) + 2048) >> 12),
            (Ke = (L * (ye[8 + Te] + ye[56 + Te]) + 2048) >> 12),
            (Oe = ye[24 + Te]),
            (ge = ye[40 + Te]),
            (Ie = (we - Ne + 1) >> 1),
            (we = (we + Ne + 1) >> 1),
            (Ne = Ie),
            (Ie = (Ce * O + De * P + 2048) >> 12),
            (Ce = (Ce * P - De * O + 2048) >> 12),
            (De = Ie),
            (Ie = (Ue - ge + 1) >> 1),
            (Ue = (Ue + ge + 1) >> 1),
            (ge = Ie),
            (Ie = (Ke + Oe + 1) >> 1),
            (Oe = (Ke - Oe + 1) >> 1),
            (Ke = Ie),
            (Ie = (we - De + 1) >> 1),
            (we = (we + De + 1) >> 1),
            (De = Ie),
            (Ie = (Ne - Ce + 1) >> 1),
            (Ne = (Ne + Ce + 1) >> 1),
            (Ce = Ie),
            (Ie = (Ue * B + Ke * R + 2048) >> 12),
            (Ue = (Ue * R - Ke * B + 2048) >> 12),
            (Ke = Ie),
            (Ie = (Oe * C + ge * T + 2048) >> 12),
            (Oe = (Oe * T - ge * C + 2048) >> 12),
            (ge = Ie),
            (ye[0 + Te] = we + Ke),
            (ye[56 + Te] = we - Ke),
            (ye[8 + Te] = Ne + ge),
            (ye[48 + Te] = Ne - ge),
            (ye[16 + Te] = Ce + Oe),
            (ye[40 + Te] = Ce - Oe),
            (ye[24 + Te] = De + Ue),
            (ye[32 + Te] = De - Ue);
        }
        for (Re = 0; Re < 64; ++Re) {
          var he = 128 + ((ye[Re] + 8) >> 4);
          ue[Re] = he < 0 ? 0 : he > 255 ? 255 : he;
        }
      }
      q(K * J * 8);
      for (var se, oe, _e = 0; _e < J; _e++) {
        var ve = _e << 3;
        for (se = 0; se < 8; se++) te.push(new Uint8Array(K));
        for (var fe = 0; fe < Q; fe++) {
          ie(ee.blocks[_e][fe], re, ne);
          var ke = 0,
            me = fe << 3;
          for (oe = 0; oe < 8; oe++) {
            var Ee = te[ve + oe];
            for (se = 0; se < 8; se++) Ee[me + se] = re[ke++];
          }
        }
      }
      return te;
    }
    function G(W) {
      return W < 0 ? 0 : W > 255 ? 255 : W;
    }
    U.prototype = {
      load: function (ee) {
        var te = new XMLHttpRequest();
        te.open("GET", ee, !0),
          (te.responseType = "arraybuffer"),
          (te.onload = function () {
            var Q = new Uint8Array(te.response || te.mozResponseArrayBuffer);
            this.parse(Q), this.onload && this.onload();
          }.bind(this)),
          te.send(null);
      },
      parse: function (ee) {
        var te = this.opts.maxResolutionInMP * 1e3 * 1e3,
          Q = 0;
        ee.length;
        function J() {
          var Ye = (ee[Q] << 8) | ee[Q + 1];
          return (Q += 2), Ye;
        }
        function K() {
          var Ye = J(),
            Qe = ee.subarray(Q, Q + Ye - 2);
          return (Q += Qe.length), Qe;
        }
        function ne(Ye) {
          var Qe = 1,
            Je = 1,
            rt,
            Fe;
          for (Fe in Ye.components)
            Ye.components.hasOwnProperty(Fe) &&
              ((rt = Ye.components[Fe]), Qe < rt.h && (Qe = rt.h), Je < rt.v && (Je = rt.v));
          var We = Math.ceil(Ye.samplesPerLine / 8 / Qe),
            et = Math.ceil(Ye.scanLines / 8 / Je);
          for (Fe in Ye.components)
            if (Ye.components.hasOwnProperty(Fe)) {
              rt = Ye.components[Fe];
              var tt = Math.ceil((Math.ceil(Ye.samplesPerLine / 8) * rt.h) / Qe),
                it = Math.ceil((Math.ceil(Ye.scanLines / 8) * rt.v) / Je),
                nt = We * rt.h,
                st = et * rt.v,
                ht = st * nt,
                ot = [];
              q(ht * 256);
              for (var gt = 0; gt < st; gt++) {
                for (var mt = [], ae = 0; ae < nt; ae++) mt.push(new Int32Array(64));
                ot.push(mt);
              }
              (rt.blocksPerLine = tt), (rt.blocksPerColumn = it), (rt.blocks = ot);
            }
          (Ye.maxH = Qe), (Ye.maxV = Je), (Ye.mcusPerLine = We), (Ye.mcusPerColumn = et);
        }
        var re = null,
          ie = null,
          se,
          oe,
          _e = [],
          ve = [],
          fe = [],
          ke = [],
          me = J(),
          Ee = -1;
        if (((this.comments = []), me != 65496)) throw new Error("SOI not found");
        for (me = J(); me != 65497; ) {
          var Se, ue;
          switch (me) {
            case 65280:
              break;
            case 65504:
            case 65505:
            case 65506:
            case 65507:
            case 65508:
            case 65509:
            case 65510:
            case 65511:
            case 65512:
            case 65513:
            case 65514:
            case 65515:
            case 65516:
            case 65517:
            case 65518:
            case 65519:
            case 65534:
              var xe = K();
              if (me === 65534) {
                var pe = String.fromCharCode.apply(null, xe);
                this.comments.push(pe);
              }
              me === 65504 &&
                xe[0] === 74 &&
                xe[1] === 70 &&
                xe[2] === 73 &&
                xe[3] === 70 &&
                xe[4] === 0 &&
                (re = {
                  version: { major: xe[5], minor: xe[6] },
                  densityUnits: xe[7],
                  xDensity: (xe[8] << 8) | xe[9],
                  yDensity: (xe[10] << 8) | xe[11],
                  thumbWidth: xe[12],
                  thumbHeight: xe[13],
                  thumbData: xe.subarray(14, 14 + 3 * xe[12] * xe[13]),
                }),
                me === 65505 &&
                  xe[0] === 69 &&
                  xe[1] === 120 &&
                  xe[2] === 105 &&
                  xe[3] === 102 &&
                  xe[4] === 0 &&
                  (this.exifBuffer = xe.subarray(5, xe.length)),
                me === 65518 &&
                  xe[0] === 65 &&
                  xe[1] === 100 &&
                  xe[2] === 111 &&
                  xe[3] === 98 &&
                  xe[4] === 101 &&
                  xe[5] === 0 &&
                  (ie = {
                    version: xe[6],
                    flags0: (xe[7] << 8) | xe[8],
                    flags1: (xe[9] << 8) | xe[10],
                    transformCode: xe[11],
                  });
              break;
            case 65499:
              for (var we = J(), Ne = we + Q - 2; Q < Ne; ) {
                var Ce = ee[Q++];
                q(256);
                var De = new Int32Array(64);
                if (Ce >> 4)
                  if (Ce >> 4 === 1)
                    for (ue = 0; ue < 64; ue++) {
                      var Ue = D[ue];
                      De[Ue] = J();
                    }
                  else throw new Error("DQT: invalid table spec");
                else
                  for (ue = 0; ue < 64; ue++) {
                    var Ue = D[ue];
                    De[Ue] = ee[Q++];
                  }
                _e[Ce & 15] = De;
              }
              break;
            case 65472:
            case 65473:
            case 65474:
              J(),
                (se = {}),
                (se.extended = me === 65473),
                (se.progressive = me === 65474),
                (se.precision = ee[Q++]),
                (se.scanLines = J()),
                (se.samplesPerLine = J()),
                (se.components = {}),
                (se.componentsOrder = []);
              var Oe = se.scanLines * se.samplesPerLine;
              if (Oe > te) {
                var ge = Math.ceil((Oe - te) / 1e6);
                throw new Error(`maxResolutionInMP limit exceeded by ${ge}MP`);
              }
              var Ke = ee[Q++],
                Ie;
              for (Se = 0; Se < Ke; Se++) {
                Ie = ee[Q];
                var ye = ee[Q + 1] >> 4,
                  Re = ee[Q + 1] & 15,
                  Me = ee[Q + 2];
                if (ye <= 0 || Re <= 0) throw new Error("Invalid sampling factor, expected values above 0");
                se.componentsOrder.push(Ie), (se.components[Ie] = { h: ye, v: Re, quantizationIdx: Me }), (Q += 3);
              }
              ne(se), ve.push(se);
              break;
            case 65476:
              var Te = J();
              for (Se = 2; Se < Te; ) {
                var he = ee[Q++],
                  Pe = new Uint8Array(16),
                  Ge = 0;
                for (ue = 0; ue < 16; ue++, Q++) Ge += Pe[ue] = ee[Q];
                q(16 + Ge);
                var $e = new Uint8Array(Ge);
                for (ue = 0; ue < Ge; ue++, Q++) $e[ue] = ee[Q];
                (Se += 17 + Ge), ((he >> 4 ? fe : ke)[he & 15] = z(Pe, $e));
              }
              break;
            case 65501:
              J(), (oe = J());
              break;
            case 65500:
              J(), J();
              break;
            case 65498:
              J();
              var be = ee[Q++],
                qe = [],
                He;
              for (Se = 0; Se < be; Se++) {
                He = se.components[ee[Q++]];
                var ze = ee[Q++];
                (He.huffmanTableDC = ke[ze >> 4]), (He.huffmanTableAC = fe[ze & 15]), qe.push(He);
              }
              var je = ee[Q++],
                Xe = ee[Q++],
                Be = ee[Q++],
                de = V(ee, Q, se, qe, oe, je, Xe, Be >> 4, Be & 15, this.opts);
              Q += de;
              break;
            case 65535:
              ee[Q] !== 255 && Q--;
              break;
            default:
              if (ee[Q - 3] == 255 && ee[Q - 2] >= 192 && ee[Q - 2] <= 254) {
                Q -= 3;
                break;
              } else if (me === 224 || me == 225) {
                if (Ee !== -1)
                  throw new Error(
                    `first unknown JPEG marker at offset ${Ee.toString(16)}, second unknown JPEG marker ${me.toString(16)} at offset ${(Q - 1).toString(16)}`,
                  );
                Ee = Q - 1;
                const Ye = J();
                if (ee[Q + Ye - 2] === 255) {
                  Q += Ye - 2;
                  break;
                }
              }
              throw new Error("unknown JPEG marker " + me.toString(16));
          }
          me = J();
        }
        if (ve.length != 1) throw new Error("only single frame JPEGs supported");
        for (var Se = 0; Se < ve.length; Se++) {
          var Le = ve[Se].components;
          for (var ue in Le) (Le[ue].quantizationTable = _e[Le[ue].quantizationIdx]), delete Le[ue].quantizationIdx;
        }
        (this.width = se.samplesPerLine),
          (this.height = se.scanLines),
          (this.jfif = re),
          (this.adobe = ie),
          (this.components = []);
        for (var Se = 0; Se < se.componentsOrder.length; Se++) {
          var He = se.components[se.componentsOrder[Se]];
          this.components.push({ lines: X(se, He), scaleX: He.h / se.maxH, scaleY: He.v / se.maxV });
        }
      },
      getData: function (ee, te) {
        var Q = this.width / ee,
          J = this.height / te,
          K,
          ne,
          re,
          ie,
          se,
          oe,
          _e,
          ve,
          fe,
          ke,
          me = 0,
          Ee,
          Se,
          ue,
          xe,
          pe,
          we,
          Ne,
          Ce,
          De,
          Ue,
          Oe,
          ge = ee * te * this.components.length;
        q(ge);
        var Ke = new Uint8Array(ge);
        switch (this.components.length) {
          case 1:
            for (K = this.components[0], ke = 0; ke < te; ke++)
              for (se = K.lines[0 | (ke * K.scaleY * J)], fe = 0; fe < ee; fe++)
                (Ee = se[0 | (fe * K.scaleX * Q)]), (Ke[me++] = Ee);
            break;
          case 2:
            for (K = this.components[0], ne = this.components[1], ke = 0; ke < te; ke++)
              for (
                se = K.lines[0 | (ke * K.scaleY * J)], oe = ne.lines[0 | (ke * ne.scaleY * J)], fe = 0;
                fe < ee;
                fe++
              )
                (Ee = se[0 | (fe * K.scaleX * Q)]),
                  (Ke[me++] = Ee),
                  (Ee = oe[0 | (fe * ne.scaleX * Q)]),
                  (Ke[me++] = Ee);
            break;
          case 3:
            for (
              Oe = !0,
                this.adobe && this.adobe.transformCode
                  ? (Oe = !0)
                  : typeof this.opts.colorTransform < "u" && (Oe = !!this.opts.colorTransform),
                K = this.components[0],
                ne = this.components[1],
                re = this.components[2],
                ke = 0;
              ke < te;
              ke++
            )
              for (
                se = K.lines[0 | (ke * K.scaleY * J)],
                  oe = ne.lines[0 | (ke * ne.scaleY * J)],
                  _e = re.lines[0 | (ke * re.scaleY * J)],
                  fe = 0;
                fe < ee;
                fe++
              )
                Oe
                  ? ((Ee = se[0 | (fe * K.scaleX * Q)]),
                    (Se = oe[0 | (fe * ne.scaleX * Q)]),
                    (ue = _e[0 | (fe * re.scaleX * Q)]),
                    (Ce = G(Ee + 1.402 * (ue - 128))),
                    (De = G(Ee - 0.3441363 * (Se - 128) - 0.71413636 * (ue - 128))),
                    (Ue = G(Ee + 1.772 * (Se - 128))))
                  : ((Ce = se[0 | (fe * K.scaleX * Q)]),
                    (De = oe[0 | (fe * ne.scaleX * Q)]),
                    (Ue = _e[0 | (fe * re.scaleX * Q)])),
                  (Ke[me++] = Ce),
                  (Ke[me++] = De),
                  (Ke[me++] = Ue);
            break;
          case 4:
            if (!this.adobe) throw new Error("Unsupported color mode (4 components)");
            for (
              Oe = !1,
                this.adobe && this.adobe.transformCode
                  ? (Oe = !0)
                  : typeof this.opts.colorTransform < "u" && (Oe = !!this.opts.colorTransform),
                K = this.components[0],
                ne = this.components[1],
                re = this.components[2],
                ie = this.components[3],
                ke = 0;
              ke < te;
              ke++
            )
              for (
                se = K.lines[0 | (ke * K.scaleY * J)],
                  oe = ne.lines[0 | (ke * ne.scaleY * J)],
                  _e = re.lines[0 | (ke * re.scaleY * J)],
                  ve = ie.lines[0 | (ke * ie.scaleY * J)],
                  fe = 0;
                fe < ee;
                fe++
              )
                Oe
                  ? ((Ee = se[0 | (fe * K.scaleX * Q)]),
                    (Se = oe[0 | (fe * ne.scaleX * Q)]),
                    (ue = _e[0 | (fe * re.scaleX * Q)]),
                    (xe = ve[0 | (fe * ie.scaleX * Q)]),
                    (pe = 255 - G(Ee + 1.402 * (ue - 128))),
                    (we = 255 - G(Ee - 0.3441363 * (Se - 128) - 0.71413636 * (ue - 128))),
                    (Ne = 255 - G(Ee + 1.772 * (Se - 128))))
                  : ((pe = se[0 | (fe * K.scaleX * Q)]),
                    (we = oe[0 | (fe * ne.scaleX * Q)]),
                    (Ne = _e[0 | (fe * re.scaleX * Q)]),
                    (xe = ve[0 | (fe * ie.scaleX * Q)])),
                  (Ke[me++] = 255 - pe),
                  (Ke[me++] = 255 - we),
                  (Ke[me++] = 255 - Ne),
                  (Ke[me++] = 255 - xe);
            break;
          default:
            throw new Error("Unsupported color mode");
        }
        return Ke;
      },
      copyToImageData: function (ee, te) {
        var Q = ee.width,
          J = ee.height,
          K = ee.data,
          ne = this.getData(Q, J),
          re = 0,
          ie = 0,
          se,
          oe,
          _e,
          ve,
          fe,
          ke,
          me,
          Ee,
          Se;
        switch (this.components.length) {
          case 1:
            for (oe = 0; oe < J; oe++)
              for (se = 0; se < Q; se++)
                (_e = ne[re++]), (K[ie++] = _e), (K[ie++] = _e), (K[ie++] = _e), te && (K[ie++] = 255);
            break;
          case 3:
            for (oe = 0; oe < J; oe++)
              for (se = 0; se < Q; se++)
                (me = ne[re++]),
                  (Ee = ne[re++]),
                  (Se = ne[re++]),
                  (K[ie++] = me),
                  (K[ie++] = Ee),
                  (K[ie++] = Se),
                  te && (K[ie++] = 255);
            break;
          case 4:
            for (oe = 0; oe < J; oe++)
              for (se = 0; se < Q; se++)
                (fe = ne[re++]),
                  (ke = ne[re++]),
                  (_e = ne[re++]),
                  (ve = ne[re++]),
                  (me = 255 - G(fe * (1 - ve / 255) + ve)),
                  (Ee = 255 - G(ke * (1 - ve / 255) + ve)),
                  (Se = 255 - G(_e * (1 - ve / 255) + ve)),
                  (K[ie++] = me),
                  (K[ie++] = Ee),
                  (K[ie++] = Se),
                  te && (K[ie++] = 255);
            break;
          default:
            throw new Error("Unsupported color mode");
        }
      },
    };
    var Z = 0,
      Y = 0;
    function q(W = 0) {
      var ee = Z + W;
      if (ee > Y) {
        var te = Math.ceil((ee - Y) / 1024 / 1024);
        throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${te}MB`);
      }
      Z = ee;
    }
    return (
      (U.resetMaxMemoryUsage = function (W) {
        (Z = 0), (Y = W);
      }),
      (U.getBytesAllocated = function () {
        return Z;
      }),
      (U.requestMemoryAllocation = q),
      U
    );
  })();
  E.exports = A;
  function A(I, D = {}) {
    var T = {
        colorTransform: void 0,
        useTArray: !1,
        formatAsRGBA: !0,
        tolerantDecoding: !0,
        maxResolutionInMP: 100,
        maxMemoryUsageInMB: 512,
      },
      C = { ...T, ...D },
      R = new Uint8Array(I),
      B = new _();
    (B.opts = C), _.resetMaxMemoryUsage(C.maxMemoryUsageInMB * 1024 * 1024), B.parse(R);
    var P = C.formatAsRGBA ? 4 : 3,
      O = B.width * B.height * P;
    try {
      _.requestMemoryAllocation(O);
      var F = {
        width: B.width,
        height: B.height,
        exifBuffer: B.exifBuffer,
        data: C.useTArray ? new Uint8Array(O) : Buffer.alloc(O),
      };
      B.comments.length > 0 && (F.comments = B.comments);
    } catch (L) {
      throw L instanceof RangeError
        ? new Error("Could not allocate enough memory for the image. Required: " + O)
        : L instanceof ReferenceError && L.message === "Buffer is not defined"
          ? new Error("Buffer is not globally defined in this environment. Consider setting useTArray to true")
          : L;
    }
    return B.copyToImageData(F, C.formatAsRGBA), F;
  }
})(decoder);
var encode$1 = encoderExports,
  decode$4 = decoderExports,
  jpegJs = { encode: encode$1, decode: decode$4 };
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  lookup = new Uint8Array(256);
for (let E = 0; E < chars.length; E++) lookup[chars.charCodeAt(E)] = E;
function encode(E) {
  let _,
    A = E.length,
    I = "";
  for (_ = 0; _ < A; _ += 3)
    (I += chars[E[_] >> 2]),
      (I += chars[((E[_] & 3) << 4) | (E[_ + 1] >> 4)]),
      (I += chars[((E[_ + 1] & 15) << 2) | (E[_ + 2] >> 6)]),
      (I += chars[E[_ + 2] & 63]);
  return (
    A % 3 === 2 ? (I = `${I.substring(0, I.length - 1)}=`) : A % 3 === 1 && (I = `${I.substring(0, I.length - 2)}==`), I
  );
}
function decode$3(E) {
  let _ = E.length * 0.75,
    A = E.length,
    I = 0,
    D,
    T,
    C,
    R;
  E[E.length - 1] === "=" && (_--, E[E.length - 2] === "=" && _--);
  const B = new Uint8Array(_);
  for (let P = 0; P < A; P += 4)
    (D = lookup[E.charCodeAt(P)]),
      (T = lookup[E.charCodeAt(P + 1)]),
      (C = lookup[E.charCodeAt(P + 2)]),
      (R = lookup[E.charCodeAt(P + 3)]),
      (B[I++] = (D << 2) | (T >> 4)),
      (B[I++] = ((T & 15) << 4) | (C >> 2)),
      (B[I++] = ((C & 3) << 6) | (R & 63));
  return B;
}
function toBase64URL(E, _) {
  const A = encode(E);
  return `data:${_};base64,${A}`;
}
const ImageData = self.ImageData,
  DOMImage = self.Image;
function createCanvas(E, _) {
  let A = self.document.createElement("canvas");
  return (A.width = E), (A.height = _), A;
}
function fetchBinary(E, { withCredentials: _ = !1 } = {}) {
  return new Promise(function (A, I) {
    let D = new self.XMLHttpRequest();
    D.open("GET", E, !0),
      (D.responseType = "arraybuffer"),
      (D.withCredentials = _),
      (D.onload = function (T) {
        this.status !== 200 ? I(T) : A(this.response);
      }),
      (D.onerror = I),
      D.send();
  });
}
function createWriteStream() {
  throw new Error("createWriteStream does not exist in the browser");
}
function writeFile() {
  throw new Error("writeFile does not exist in the browser");
}
function getType(E) {
  return E.includes("/") || (E = `image/${E}`), E;
}
function encodeJpeg(E, _ = {}) {
  const A = { width: E.width, height: E.height, data: E.getRGBAData() };
  return jpegJs.encode(A, _.quality).data;
}
function encodePng(E, _) {
  const A = { width: E.width, height: E.height, channels: E.channels, depth: E.bitDepth, data: E.data };
  return (
    (A.depth === 1 || A.depth === 32) && ((A.depth = 8), (A.channels = 4), (A.data = E.getRGBAData())),
    encodePng$1(A, _)
  );
}
const exportMethods = {
  save(E, _ = {}) {
    const { useCanvas: A = !1, encoder: I = void 0 } = _;
    let { format: D } = _;
    if (!D) {
      const T = /\.(?<format>[a-zA-Z]+)$/.exec(E);
      T && (D = T.groups.format.toLowerCase());
    }
    if (!D) throw new Error("file format not provided");
    return new Promise((T, C) => {
      let R, B;
      switch (D.toLowerCase()) {
        case "png": {
          A ? (R = this.getCanvas().pngStream()) : (B = encodePng(this, I));
          break;
        }
        case "jpg":
        case "jpeg":
          A ? (R = this.getCanvas().jpegStream()) : (B = encodeJpeg(this, I));
          break;
        case "bmp":
          B = encode$2(this, I);
          break;
        default:
          throw new RangeError(`invalid output format: ${D}`);
      }
      if (R) {
        let P = createWriteStream();
        P.on("finish", T), P.on("error", C), R.pipe(P);
      } else B && writeFile();
    });
  },
  toDataURL(E = "image/png", _ = {}) {
    typeof E == "object" && ((_ = E), (E = "image/png"));
    const { useCanvas: A = !1, encoder: I = void 0 } = _;
    E = getType(E);
    function D(T, C) {
      const R = T(C, I);
      return toBase64URL(R, E);
    }
    return E === "image/bmp"
      ? D(encode$2, this)
      : E === "image/png" && !A
        ? D(encodePng, this)
        : E === "image/jpeg" && !A
          ? D(encodeJpeg, this)
          : this.getCanvas().toDataURL(E);
  },
  toBuffer(E = {}) {
    const { format: _ = "png", encoder: A = void 0 } = E;
    switch (_.toLowerCase()) {
      case "png":
        return encodePng(this, A);
      case "jpeg":
      case "jpg":
        return encodeJpeg(this, A);
      case "bmp":
        return encode$2(this, A);
      default:
        throw new RangeError(`invalid output format: ${_}`);
    }
  },
  toBase64(E = "image/png", _ = {}) {
    if (_.async)
      return this.toDataURL(E, _).then(function (A) {
        return A.substring(A.indexOf(",") + 1);
      });
    {
      const A = this.toDataURL(E, _);
      return A.substring(A.indexOf(",") + 1);
    }
  },
  toBlob(E = "image/png", _ = 0.8) {
    return canvasToBlob(this.getCanvas(), E, _);
  },
  getCanvas() {
    const E = new ImageData(this.getRGBAData({ clamped: !0 }), this.width, this.height);
    let _ = createCanvas(this.width, this.height);
    return _.getContext("2d").putImageData(E, 0, 0), _;
  },
};
function setExportMethods(E) {
  for (const _ in exportMethods) E.prototype[_] = exportMethods[_];
}
var hasOwnExports = {},
  hasOwn = {
    get exports() {
      return hasOwnExports;
    },
    set exports(E) {
      hasOwnExports = E;
    },
  };
const name = "has-own",
  version = "1.0.1",
  description = "A safer .hasOwnProperty() - hasOwn(name, obj)",
  main = "index.js",
  scripts = { test: "make test" },
  author = "Aaron Heckmann <aaron.heckmann+github@gmail.com>",
  license = "MIT",
  repository = { type: "git", url: "git://github.com/aheckmann/has-own.git" },
  homepage = "https://github.com/aheckmann/has-own/",
  devDependencies = { mocha: "^6.2.2" },
  require$$0$2 = { name, version, description, main, scripts, author, license, repository, homepage, devDependencies };
(function (E, _) {
  var A = Object.prototype.hasOwnProperty;
  (E.exports = _ =
    function (D, T) {
      return A.call(T, D);
    }),
    (_.version = require$$0$2.version);
})(hasOwn, hasOwnExports);
let computedPropertyDescriptor$1 = { configurable: !0, enumerable: !1, get: void 0 };
function extendMethod(E, _, A = {}) {
  let { inPlace: I = !1, returnThis: D = !0, partialArgs: T = [] } = A;
  return (
    I
      ? (Image.prototype[E] = function (...C) {
          this.computed = null;
          let R = _.apply(this, [...T, ...C]);
          return D ? this : R;
        })
      : (Image.prototype[E] = function (...C) {
          return _.apply(this, [...T, ...C]);
        }),
    Image
  );
}
function extendProperty(E, _, A = {}) {
  let { partialArgs: I = [] } = A;
  return (
    (computedPropertyDescriptor$1.get = function () {
      if (this.computed === null) this.computed = {};
      else if (hasOwnExports(E, this.computed)) return this.computed[E];
      let D = _.apply(this, I);
      return (this.computed[E] = D), D;
    }),
    Object.defineProperty(Image.prototype, E, computedPropertyDescriptor$1),
    Image
  );
}
const GREY$1 = "GREY",
  RGB$1 = "RGB",
  HSL = "HSL",
  HSV = "HSV",
  CMYK$1 = "CMYK",
  ColorModel = Object.freeze(
    Object.defineProperty({ __proto__: null, GREY: GREY$1, RGB: RGB$1, HSL, HSV, CMYK: CMYK$1 }, Symbol.toStringTag, {
      value: "Module",
    }),
  );
function getRGBAData(E = {}) {
  const { clamped: _ } = E;
  this.checkProcessable("getRGBAData", { components: [1, 3], bitDepth: [1, 8, 16, 32] });
  const A = this.width * this.height * 4;
  let I = _ ? new Uint8ClampedArray(A) : new Uint8Array(A);
  return (
    this.bitDepth === 1
      ? fillDataFromBinary(this, I)
      : this.bitDepth === 32
        ? (this.checkProcessable("getRGBAData", { alpha: 0 }),
          this.components === 1
            ? fillDataFromGrey32(this, I)
            : this.components === 3 &&
              (this.checkProcessable("getRGBAData", { colorModel: [RGB$1] }), fillDataFromRGB32(this, I)))
        : this.components === 1
          ? fillDataFromGrey(this, I)
          : this.components === 3 &&
            (this.checkProcessable("getRGBAData", { colorModel: [RGB$1] }), fillDataFromRGB(this, I)),
    this.alpha === 1
      ? (this.checkProcessable("getRGBAData", { bitDepth: [8, 16] }), copyAlpha(this, I))
      : fillAlpha(this, I),
    I
  );
}
function fillDataFromBinary(E, _) {
  for (let A = 0; A < E.size; A++) {
    const I = E.getBit(A);
    (_[A * 4] = I * 255), (_[A * 4 + 1] = I * 255), (_[A * 4 + 2] = I * 255);
  }
}
function fillDataFromGrey32(E, _) {
  const A = E.min[0],
    D = E.max[0] - A;
  for (let T = 0; T < E.size; T++) {
    const C = Math.floor((255 * (E.data[T] - A)) / D);
    (_[T * 4] = C), (_[T * 4 + 1] = C), (_[T * 4 + 2] = C);
  }
}
function fillDataFromRGB32(E, _) {
  const A = Math.min(...E.min),
    D = Math.max(...E.max) - A;
  for (let T = 0; T < E.size; T++) {
    const C = Math.floor((255 * (E.data[T * 3] - A)) / D),
      R = Math.floor((255 * (E.data[T * 3 + 1] - A)) / D),
      B = Math.floor((255 * (E.data[T * 3 + 2] - A)) / D);
    (_[T * 4] = C), (_[T * 4 + 1] = R), (_[T * 4 + 2] = B);
  }
}
function fillDataFromGrey(E, _) {
  for (let A = 0; A < E.size; A++)
    (_[A * 4] = E.data[A * E.channels] >>> (E.bitDepth - 8)),
      (_[A * 4 + 1] = E.data[A * E.channels] >>> (E.bitDepth - 8)),
      (_[A * 4 + 2] = E.data[A * E.channels] >>> (E.bitDepth - 8));
}
function fillDataFromRGB(E, _) {
  for (let A = 0; A < E.size; A++)
    (_[A * 4] = E.data[A * E.channels] >>> (E.bitDepth - 8)),
      (_[A * 4 + 1] = E.data[A * E.channels + 1] >>> (E.bitDepth - 8)),
      (_[A * 4 + 2] = E.data[A * E.channels + 2] >>> (E.bitDepth - 8));
}
function copyAlpha(E, _) {
  for (let A = 0; A < E.size; A++) _[A * 4 + 3] = E.data[A * E.channels + E.components] >> (E.bitDepth - 8);
}
function fillAlpha(E, _) {
  for (let A = 0; A < E.size; A++) _[A * 4 + 3] = 255;
}
const BINARY = "BINARY",
  GREY = "GREY",
  GREYA = "GREYA",
  RGB = "RGB",
  RGBA = "RGBA",
  CMYK = "CMYK",
  CMYKA = "CMYKA",
  kinds = {};
kinds[BINARY] = { components: 1, alpha: 0, bitDepth: 1, colorModel: GREY$1 };
kinds[GREYA] = { components: 1, alpha: 1, bitDepth: 8, colorModel: GREY$1 };
kinds[GREY] = { components: 1, alpha: 0, bitDepth: 8, colorModel: GREY$1 };
kinds[RGBA] = { components: 3, alpha: 1, bitDepth: 8, colorModel: RGB$1 };
kinds[RGB] = { components: 3, alpha: 0, bitDepth: 8, colorModel: RGB$1 };
kinds[CMYK] = { components: 4, alpha: 0, bitDepth: 8, colorModel: CMYK$1 };
kinds[CMYKA] = { components: 4, alpha: 1, bitDepth: 8, colorModel: CMYK$1 };
function getKind(E) {
  const _ = kinds[E];
  if (!_) throw new RangeError(`invalid image kind: ${E}`);
  return _;
}
const validBitDepth = [1, 8, 16, 32];
function verifyKindDefinition(E) {
  const { components: _, alpha: A, bitDepth: I, colorModel: D } = E;
  if (!Number.isInteger(_) || _ <= 0) throw new RangeError(`invalid components: ${_}. Must be a positive integer`);
  if (A !== 0 && A !== 1 && typeof A != "boolean")
    throw new TypeError(`invalid alpha: ${A}: must be a boolean, 0 or 1`);
  if (!validBitDepth.includes(I))
    throw new RangeError(`invalid bitDepth: ${I}. Must be one of ${validBitDepth.join(", ")}`);
  if (!ColorModel[D])
    throw new RangeError(`invalid colorModel: ${D}. Must be one of ${Object.keys(ColorModel).join(", ")}`);
}
function getTheoreticalPixelArraySize(E, _, A) {
  let I = _ * E;
  return A === 1 && (I = Math.ceil(I / 8)), I;
}
function createPixelArray(E, _, A, I, D, T) {
  const C = I * E;
  let R;
  switch (D) {
    case 1:
      R = new Uint8Array(Math.ceil(C / 8));
      break;
    case 8:
      R = new Uint8Array(C);
      break;
    case 16:
      R = new Uint16Array(C);
      break;
    case 32:
      R = new Float32Array(C);
      break;
    default:
      throw new Error(`Cannot create pixel array for bit depth ${D}`);
  }
  if (A) for (let B = _; B < R.length; B += I) R[B] = T;
  return R;
}
const defaultByteLength = 1024 * 8,
  charArray = [];
let IOBuffer$2 = class {
  constructor(_, A) {
    (A = A || {}), _ === void 0 && (_ = defaultByteLength), typeof _ == "number" && (_ = new ArrayBuffer(_));
    let I = _.byteLength;
    const D = A.offset ? A.offset >>> 0 : 0;
    _.buffer &&
      ((I = _.byteLength - D),
      _.byteLength !== _.buffer.byteLength
        ? (_ = _.buffer.slice(_.byteOffset + D, _.byteOffset + _.byteLength))
        : D
          ? (_ = _.buffer.slice(D))
          : (_ = _.buffer)),
      (this.buffer = _),
      (this.length = I),
      (this.byteLength = I),
      (this.byteOffset = 0),
      (this.offset = 0),
      (this.littleEndian = !0),
      (this._data = new DataView(this.buffer)),
      (this._increment = I || defaultByteLength),
      (this._mark = 0);
  }
  available(_) {
    return _ === void 0 && (_ = 1), this.offset + _ <= this.length;
  }
  isLittleEndian() {
    return this.littleEndian;
  }
  setLittleEndian() {
    this.littleEndian = !0;
  }
  isBigEndian() {
    return !this.littleEndian;
  }
  setBigEndian() {
    this.littleEndian = !1;
  }
  skip(_) {
    _ === void 0 && (_ = 1), (this.offset += _);
  }
  seek(_) {
    this.offset = _;
  }
  mark() {
    this._mark = this.offset;
  }
  reset() {
    this.offset = this._mark;
  }
  rewind() {
    this.offset = 0;
  }
  ensureAvailable(_) {
    if ((_ === void 0 && (_ = 1), !this.available(_))) {
      const A = this._increment + this._increment;
      this._increment = A;
      const I = this.length + A,
        D = new Uint8Array(I);
      D.set(new Uint8Array(this.buffer)),
        (this.buffer = D.buffer),
        (this.length = I),
        (this._data = new DataView(this.buffer));
    }
  }
  readBoolean() {
    return this.readUint8() !== 0;
  }
  readInt8() {
    return this._data.getInt8(this.offset++);
  }
  readUint8() {
    return this._data.getUint8(this.offset++);
  }
  readByte() {
    return this.readUint8();
  }
  readBytes(_) {
    _ === void 0 && (_ = 1);
    for (var A = new Uint8Array(_), I = 0; I < _; I++) A[I] = this.readByte();
    return A;
  }
  readInt16() {
    var _ = this._data.getInt16(this.offset, this.littleEndian);
    return (this.offset += 2), _;
  }
  readUint16() {
    var _ = this._data.getUint16(this.offset, this.littleEndian);
    return (this.offset += 2), _;
  }
  readInt32() {
    var _ = this._data.getInt32(this.offset, this.littleEndian);
    return (this.offset += 4), _;
  }
  readUint32() {
    var _ = this._data.getUint32(this.offset, this.littleEndian);
    return (this.offset += 4), _;
  }
  readFloat32() {
    var _ = this._data.getFloat32(this.offset, this.littleEndian);
    return (this.offset += 4), _;
  }
  readFloat64() {
    var _ = this._data.getFloat64(this.offset, this.littleEndian);
    return (this.offset += 8), _;
  }
  readChar() {
    return String.fromCharCode(this.readInt8());
  }
  readChars(_) {
    _ === void 0 && (_ = 1), (charArray.length = _);
    for (var A = 0; A < _; A++) charArray[A] = this.readChar();
    return charArray.join("");
  }
  writeBoolean(_) {
    this.writeUint8(_ ? 255 : 0);
  }
  writeInt8(_) {
    this.ensureAvailable(1), this._data.setInt8(this.offset++, _);
  }
  writeUint8(_) {
    this.ensureAvailable(1), this._data.setUint8(this.offset++, _);
  }
  writeByte(_) {
    this.writeUint8(_);
  }
  writeBytes(_) {
    this.ensureAvailable(_.length);
    for (var A = 0; A < _.length; A++) this._data.setUint8(this.offset++, _[A]);
  }
  writeInt16(_) {
    this.ensureAvailable(2), this._data.setInt16(this.offset, _, this.littleEndian), (this.offset += 2);
  }
  writeUint16(_) {
    this.ensureAvailable(2), this._data.setUint16(this.offset, _, this.littleEndian), (this.offset += 2);
  }
  writeInt32(_) {
    this.ensureAvailable(4), this._data.setInt32(this.offset, _, this.littleEndian), (this.offset += 4);
  }
  writeUint32(_) {
    this.ensureAvailable(4), this._data.setUint32(this.offset, _, this.littleEndian), (this.offset += 4);
  }
  writeFloat32(_) {
    this.ensureAvailable(4), this._data.setFloat32(this.offset, _, this.littleEndian), (this.offset += 4);
  }
  writeFloat64(_) {
    this.ensureAvailable(8), this._data.setFloat64(this.offset, _, this.littleEndian), (this.offset += 8);
  }
  writeChar(_) {
    this.writeUint8(_.charCodeAt(0));
  }
  writeChars(_) {
    for (var A = 0; A < _.length; A++) this.writeUint8(_.charCodeAt(A));
  }
  toArray() {
    return new Uint8Array(this.buffer, 0, this.offset);
  }
};
var IOBuffer_1 = IOBuffer$2,
  src$4 = {};
const tagsById$5 = {
    254: "NewSubfileType",
    255: "SubfileType",
    256: "ImageWidth",
    257: "ImageLength",
    258: "BitsPerSample",
    259: "Compression",
    262: "PhotometricInterpretation",
    263: "Threshholding",
    264: "CellWidth",
    265: "CellLength",
    266: "FillOrder",
    270: "ImageDescription",
    271: "Make",
    272: "Model",
    273: "StripOffsets",
    274: "Orientation",
    277: "SamplesPerPixel",
    278: "RowsPerStrip",
    279: "StripByteCounts",
    280: "MinSampleValue",
    281: "MaxSampleValue",
    282: "XResolution",
    283: "YResolution",
    284: "PlanarConfiguration",
    288: "FreeOffsets",
    289: "FreeByteCounts",
    290: "GrayResponseUnit",
    291: "GrayResponseCurve",
    296: "ResolutionUnit",
    305: "Software",
    306: "DateTime",
    315: "Artist",
    316: "HostComputer",
    320: "ColorMap",
    338: "ExtraSamples",
    33432: "Copyright",
    269: "DocumentName",
    285: "PageName",
    286: "XPosition",
    287: "YPosition",
    292: "T4Options",
    293: "T6Options",
    297: "PageNumber",
    301: "TransferFunction",
    317: "Predictor",
    318: "WhitePoint",
    319: "PrimaryChromaticities",
    321: "HalftoneHints",
    322: "TileWidth",
    323: "TileLength",
    324: "TileOffsets",
    325: "TileByteCounts",
    326: "BadFaxLines",
    327: "CleanFaxData",
    328: "ConsecutiveBadFaxLines",
    330: "SubIFDs",
    332: "InkSet",
    333: "InkNames",
    334: "NumberOfInks",
    336: "DotRange",
    337: "TargetPrinter",
    339: "SampleFormat",
    340: "SMinSampleValue",
    341: "SMaxSampleValue",
    342: "TransferRange",
    343: "ClipPath",
    344: "XClipPathUnits",
    345: "YClipPathUnits",
    346: "Indexed",
    347: "JPEGTables",
    351: "OPIProxy",
    400: "GlobalParametersIFD",
    401: "ProfileType",
    402: "FaxProfile",
    403: "CodingMethods",
    404: "VersionYear",
    405: "ModeNumber",
    433: "Decode",
    434: "DefaultImageColor",
    512: "JPEGProc",
    513: "JPEGInterchangeFormat",
    514: "JPEGInterchangeFormatLength",
    515: "JPEGRestartInterval",
    517: "JPEGLosslessPredictors",
    518: "JPEGPointTransforms",
    519: "JPEGQTables",
    520: "JPEGDCTables",
    521: "JPEGACTables",
    529: "YCbCrCoefficients",
    530: "YCbCrSubSampling",
    531: "YCbCrPositioning",
    532: "ReferenceBlackWhite",
    559: "StripRowCounts",
    700: "XMP",
    32781: "ImageID",
    34732: "ImageLayer",
    32932: "WangAnnotatio",
    33445: "MDFileTag",
    33446: "MDScalePixel",
    33447: "MDColorTable",
    33448: "MDLabName",
    33449: "MDSampleInfo",
    33450: "MDPrepDate",
    33451: "MDPrepTime",
    33452: "MDFileUnits",
    33550: "ModelPixelScaleTag",
    33723: "IPTC",
    33918: "INGRPacketDataTag",
    33919: "INGRFlagRegisters",
    33920: "IrasBTransformationMatrix",
    33922: "ModelTiepointTag",
    34264: "ModelTransformationTag",
    34377: "Photoshop",
    34665: "ExifIFD",
    34675: "ICCProfile",
    34735: "GeoKeyDirectoryTag",
    34736: "GeoDoubleParamsTag",
    34737: "GeoAsciiParamsTag",
    34853: "GPSIFD",
    34908: "HylaFAXFaxRecvParams",
    34909: "HylaFAXFaxSubAddress",
    34910: "HylaFAXFaxRecvTime",
    37724: "ImageSourceData",
    40965: "InteroperabilityIFD",
    42112: "GDAL_METADATA",
    42113: "GDAL_NODATA",
    50215: "OceScanjobDescription",
    50216: "OceApplicationSelector",
    50217: "OceIdentificationNumber",
    50218: "OceImageLogicCharacteristics",
    50706: "DNGVersion",
    50707: "DNGBackwardVersion",
    50708: "UniqueCameraModel",
    50709: "LocalizedCameraModel",
    50710: "CFAPlaneColor",
    50711: "CFALayout",
    50712: "LinearizationTable",
    50713: "BlackLevelRepeatDim",
    50714: "BlackLevel",
    50715: "BlackLevelDeltaH",
    50716: "BlackLevelDeltaV",
    50717: "WhiteLevel",
    50718: "DefaultScale",
    50719: "DefaultCropOrigin",
    50720: "DefaultCropSize",
    50721: "ColorMatrix1",
    50722: "ColorMatrix2",
    50723: "CameraCalibration1",
    50724: "CameraCalibration2",
    50725: "ReductionMatrix1",
    50726: "ReductionMatrix2",
    50727: "AnalogBalance",
    50728: "AsShotNeutral",
    50729: "AsShotWhiteXY",
    50730: "BaselineExposure",
    50731: "BaselineNoise",
    50732: "BaselineSharpness",
    50733: "BayerGreenSplit",
    50734: "LinearResponseLimit",
    50735: "CameraSerialNumber",
    50736: "LensInfo",
    50737: "ChromaBlurRadius",
    50738: "AntiAliasStrength",
    50740: "DNGPrivateData",
    50741: "MakerNoteSafety",
    50778: "CalibrationIlluminant1",
    50779: "CalibrationIlluminant2",
    50780: "BestQualityScale",
    50784: "AliasLayerMetadata",
  },
  tagsByName$5 = {};
for (var i$3 in tagsById$5) tagsByName$5[tagsById$5[i$3]] = i$3;
var standard$1 = { tagsById: tagsById$5, tagsByName: tagsByName$5 };
const tagsById$4 = {
    33434: "ExposureTime",
    33437: "FNumber",
    34850: "ExposureProgram",
    34852: "SpectralSensitivity",
    34855: "ISOSpeedRatings",
    34856: "OECF",
    34864: "SensitivityType",
    34865: "StandardOutputSensitivity",
    34866: "RecommendedExposureIndex",
    34867: "ISOSpeed",
    34868: "ISOSpeedLatitudeyyy",
    34869: "ISOSpeedLatitudezzz",
    36864: "ExifVersion",
    36867: "DateTimeOriginal",
    36868: "DateTimeDigitized",
    37121: "ComponentsConfiguration",
    37122: "CompressedBitsPerPixel",
    37377: "ShutterSpeedValue",
    37378: "ApertureValue",
    37379: "BrightnessValue",
    37380: "ExposureBiasValue",
    37381: "MaxApertureValue",
    37382: "SubjectDistance",
    37383: "MeteringMode",
    37384: "LightSource",
    37385: "Flash",
    37386: "FocalLength",
    37396: "SubjectArea",
    37500: "MakerNote",
    37510: "UserComment",
    37520: "SubsecTime",
    37521: "SubsecTimeOriginal",
    37522: "SubsecTimeDigitized",
    40960: "FlashpixVersion",
    40961: "ColorSpace",
    40962: "PixelXDimension",
    40963: "PixelYDimension",
    40964: "RelatedSoundFile",
    41483: "FlashEnergy",
    41484: "SpatialFrequencyResponse",
    41486: "FocalPlaneXResolution",
    41487: "FocalPlaneYResolution",
    41488: "FocalPlaneResolutionUnit",
    41492: "SubjectLocation",
    41493: "ExposureIndex",
    41495: "SensingMethod",
    41728: "FileSource",
    41729: "SceneType",
    41730: "CFAPattern",
    41985: "CustomRendered",
    41986: "ExposureMode",
    41987: "WhiteBalance",
    41988: "DigitalZoomRatio",
    41989: "FocalLengthIn35mmFilm",
    41990: "SceneCaptureType",
    41991: "GainControl",
    41992: "Contrast",
    41993: "Saturation",
    41994: "Sharpness",
    41995: "DeviceSettingDescription",
    41996: "SubjectDistanceRange",
    42016: "ImageUniqueID",
    42032: "CameraOwnerName",
    42033: "BodySerialNumber",
    42034: "LensSpecification",
    42035: "LensMake",
    42036: "LensModel",
    42037: "LensSerialNumber",
    42240: "Gamma",
  },
  tagsByName$4 = {};
for (var i$2 in tagsById$4) tagsByName$4[tagsById$4[i$2]] = i$2;
var exif$1 = { tagsById: tagsById$4, tagsByName: tagsByName$4 };
const tagsById$3 = {
    0: "GPSVersionID",
    1: "GPSLatitudeRef",
    2: "GPSLatitude",
    3: "GPSLongitudeRef",
    4: "GPSLongitude",
    5: "GPSAltitudeRef",
    6: "GPSAltitude",
    7: "GPSTimeStamp",
    8: "GPSSatellites",
    9: "GPSStatus",
    10: "GPSMeasureMode",
    11: "GPSDOP",
    12: "GPSSpeedRef",
    13: "GPSSpeed",
    14: "GPSTrackRef",
    15: "GPSTrack",
    16: "GPSImgDirectionRef",
    17: "GPSImgDirection",
    18: "GPSMapDatum",
    19: "GPSDestLatitudeRef",
    20: "GPSDestLatitude",
    21: "GPSDestLongitudeRef",
    22: "GPSDestLongitude",
    23: "GPSDestBearingRef",
    24: "GPSDestBearing",
    25: "GPSDestDistanceRef",
    26: "GPSDestDistance",
    27: "GPSProcessingMethod",
    28: "GPSAreaInformation",
    29: "GPSDateStamp",
    30: "GPSDifferential",
    31: "GPSHPositioningError",
  },
  tagsByName$3 = {};
for (var i$1 in tagsById$3) tagsByName$3[tagsById$3[i$1]] = i$1;
var gps$1 = { tagsById: tagsById$3, tagsByName: tagsByName$3 };
const tags$1 = { standard: standard$1, exif: exif$1, gps: gps$1 };
let IFD$2 = class {
  constructor(_) {
    if (!_) throw new Error("missing kind");
    (this.data = null), (this.fields = new Map()), (this.kind = _), (this._map = null);
  }
  get(_) {
    if (typeof _ == "number") return this.fields.get(_);
    if (typeof _ == "string") return this.fields.get(tags$1[this.kind].tagsByName[_]);
    throw new Error("expected a number or string");
  }
  get map() {
    if (!this._map) {
      this._map = {};
      const A = tags$1[this.kind].tagsById;
      for (var _ of this.fields.keys()) A[_] && (this._map[A[_]] = this.fields.get(_));
    }
    return this._map;
  }
};
var ifd = IFD$2;
const Ifd = ifd,
  dateTimeRegex$1 = /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
let TiffIfd$1 = class extends Ifd {
  constructor() {
    super("standard");
  }
  get size() {
    return this.width * this.height;
  }
  get width() {
    return this.imageWidth;
  }
  get height() {
    return this.imageLength;
  }
  get components() {
    return this.samplesPerPixel;
  }
  get date() {
    var _ = new Date(),
      A = dateTimeRegex$1.exec(this.dateTime);
    return _.setFullYear(A[1], A[2] - 1, A[3]), _.setHours(A[4], A[5], A[6]), _;
  }
  get newSubfileType() {
    return this.get(254);
  }
  get imageWidth() {
    return this.get(256);
  }
  get imageLength() {
    return this.get(257);
  }
  get bitsPerSample() {
    return this.get(258);
  }
  get compression() {
    return this.get(259) || 1;
  }
  get type() {
    return this.get(262);
  }
  get fillOrder() {
    return this.get(266) || 1;
  }
  get documentName() {
    return this.get(269);
  }
  get imageDescription() {
    return this.get(270);
  }
  get stripOffsets() {
    return alwaysArray$1(this.get(273));
  }
  get orientation() {
    return this.get(274);
  }
  get samplesPerPixel() {
    return this.get(277);
  }
  get rowsPerStrip() {
    return this.get(278);
  }
  get stripByteCounts() {
    return alwaysArray$1(this.get(279));
  }
  get minSampleValue() {
    return this.get(280) || 0;
  }
  get maxSampleValue() {
    return this.get(281) || Math.pow(2, this.bitsPerSample) - 1;
  }
  get xResolution() {
    return this.get(282);
  }
  get yResolution() {
    return this.get(283);
  }
  get planarConfiguration() {
    return this.get(284) || 1;
  }
  get resolutionUnit() {
    return this.get(296) || 2;
  }
  get dateTime() {
    return this.get(306);
  }
  get predictor() {
    return this.get(317) || 1;
  }
  get sampleFormat() {
    return this.get(339) || 1;
  }
  get sMinSampleValue() {
    return this.get(340) || this.minSampleValue;
  }
  get sMaxSampleValue() {
    return this.get(341) || this.maxSampleValue;
  }
};
function alwaysArray$1(E) {
  return typeof E == "number" ? [E] : E;
}
var tiffIfd = TiffIfd$1,
  ifdValue = {},
  types$1 = new Map([
    [1, [1, readByte$1]],
    [2, [1, readASCII$1]],
    [3, [2, readShort$1]],
    [4, [4, readLong$1]],
    [5, [8, readRational$1]],
    [6, [1, readSByte$1]],
    [7, [1, readByte$1]],
    [8, [2, readSShort$1]],
    [9, [4, readSLong$1]],
    [10, [8, readSRational$1]],
    [11, [4, readFloat$1]],
    [12, [8, readDouble$1]],
  ]);
ifdValue.getByteLength = function (E, _) {
  return types$1.get(E)[0] * _;
};
ifdValue.readData = function (E, _, A) {
  return types$1.get(_)[1](E, A);
};
function readByte$1(E, _) {
  if (_ === 1) return E.readUint8();
  for (var A = new Uint8Array(_), I = 0; I < _; I++) A[I] = E.readUint8();
  return A;
}
function readASCII$1(E, _) {
  for (var A = [], I = "", D = 0; D < _; D++) {
    var T = String.fromCharCode(E.readUint8());
    T === "\0" ? (A.push(I), (I = "")) : (I += T);
  }
  return A.length === 1 ? A[0] : A;
}
function readShort$1(E, _) {
  if (_ === 1) return E.readUint16();
  for (var A = new Uint16Array(_), I = 0; I < _; I++) A[I] = E.readUint16();
  return A;
}
function readLong$1(E, _) {
  if (_ === 1) return E.readUint32();
  for (var A = new Uint32Array(_), I = 0; I < _; I++) A[I] = E.readUint32();
  return A;
}
function readRational$1(E, _) {
  if (_ === 1) return E.readUint32() / E.readUint32();
  for (var A = new Array(_), I = 0; I < _; I++) A[I] = E.readUint32() / E.readUint32();
  return A;
}
function readSByte$1(E, _) {
  if (_ === 1) return E.readInt8();
  for (var A = new Int8Array(_), I = 0; I < _; I++) A[I] = E.readInt8();
  return A;
}
function readSShort$1(E, _) {
  if (_ === 1) return E.readInt16();
  for (var A = new Int16Array(_), I = 0; I < _; I++) A[I] = E.readInt16();
  return A;
}
function readSLong$1(E, _) {
  if (_ === 1) return E.readInt32();
  for (var A = new Int32Array(_), I = 0; I < _; I++) A[I] = E.readInt32();
  return A;
}
function readSRational$1(E, _) {
  if (_ === 1) return E.readInt32() / E.readInt32();
  for (var A = new Array(_), I = 0; I < _; I++) A[I] = E.readInt32() / E.readInt32();
  return A;
}
function readFloat$1(E, _) {
  if (_ === 1) return E.readFloat32();
  for (var A = new Float32Array(_), I = 0; I < _; I++) A[I] = E.readFloat32();
  return A;
}
function readDouble$1(E, _) {
  if (_ === 1) return E.readFloat64();
  for (var A = new Float64Array(_), I = 0; I < _; I++) A[I] = E.readFloat64();
  return A;
}
const IOBuffer$1 = IOBuffer_1,
  IFD$1 = ifd,
  TiffIFD = tiffIfd,
  IFDValue = ifdValue,
  defaultOptions$d = { ignoreImageData: !1, onlyFirst: !1 };
let TIFFDecoder$2 = class extends IOBuffer$1 {
  constructor(_, A) {
    super(_, A), (this._nextIFD = 0);
  }
  decode(_) {
    _ = Object.assign({}, defaultOptions$d, _);
    const A = [];
    for (this.decodeHeader(); this._nextIFD; ) if ((A.push(this.decodeIFD(_)), _.onlyFirst)) return A[0];
    return A;
  }
  decodeHeader() {
    let _ = this.readUint16();
    if (_ === 18761) this.setLittleEndian();
    else if (_ === 19789) this.setBigEndian();
    else throw new Error("invalid byte order: 0x" + _.toString(16));
    if (((_ = this.readUint16()), _ !== 42)) throw new Error("not a TIFF file");
    this._nextIFD = this.readUint32();
  }
  decodeIFD(_) {
    this.seek(this._nextIFD);
    var A;
    _.kind ? (A = new IFD$1(_.kind)) : (A = new TiffIFD());
    const I = this.readUint16();
    for (var D = 0; D < I; D++) this.decodeIFDEntry(A);
    return _.ignoreImageData || this.decodeImageData(A), (this._nextIFD = this.readUint32()), A;
  }
  decodeIFDEntry(_) {
    const A = this.offset,
      I = this.readUint16(),
      D = this.readUint16(),
      T = this.readUint32();
    if (D < 1 || D > 12) {
      this.skip(4);
      return;
    }
    IFDValue.getByteLength(D, T) > 4 && this.seek(this.readUint32());
    const R = IFDValue.readData(this, D, T);
    if ((_.fields.set(I, R), I === 34665 || I === 34853)) {
      let B = this.offset,
        P;
      I === 34665 ? (P = "exif") : I === 34853 && (P = "gps"),
        (this._nextIFD = R),
        (_[P] = this.decodeIFD({ kind: P, ignoreImageData: !0 })),
        (this.offset = B);
    }
    this.seek(A), this.skip(12);
  }
  decodeImageData(_) {
    const A = _.orientation;
    switch ((A && A !== 1 && unsupported$1("orientation", A), _.type)) {
      case 1:
      case 2:
        this.readStripData(_);
        break;
      default:
        unsupported$1("image type", _.type);
        break;
    }
  }
  readStripData(_) {
    const A = _.width,
      I = _.height,
      D = validateBitDepth(_.bitsPerSample),
      T = _.sampleFormat;
    let C = A * I;
    const R = getDataArray$1(C, 1, D, T),
      B = _.compression,
      O = _.rowsPerStrip * A,
      F = _.stripOffsets,
      L = _.stripByteCounts;
    for (var U = 0, z = 0; z < F.length; z++) {
      var V = this.getStripData(B, F[z], L[z]),
        X = C > O ? O : C;
      (C -= X),
        D === 8
          ? (U = fill8bit$1(R, V, U, X))
          : D === 16
            ? (U = fill16bit$1(R, V, U, X, this.isLittleEndian()))
            : D === 32 && T === 3
              ? (U = fillFloat32$1(R, V, U, X, this.isLittleEndian()))
              : unsupported$1("bitDepth", D);
    }
    _.data = R;
  }
  getStripData(_, A, I) {
    switch (_) {
      case 1:
        return new DataView(this.buffer, A, I);
      case 2:
      case 32773:
        return unsupported$1("Compression", _);
      default:
        throw new Error("invalid compression: " + _);
    }
  }
};
var tiffDecoder = TIFFDecoder$2;
function getDataArray$1(E, _, A, I) {
  return A === 8
    ? new Uint8Array(E * _)
    : A === 16
      ? new Uint16Array(E * _)
      : A === 32 && I === 3
        ? new Float32Array(E * _)
        : unsupported$1("bit depth / sample format", A + " / " + I);
}
function fill8bit$1(E, _, A, I) {
  for (var D = 0; D < I; D++) E[A++] = _.getUint8(D);
  return A;
}
function fill16bit$1(E, _, A, I, D) {
  for (var T = 0; T < I * 2; T += 2) E[A++] = _.getUint16(T, D);
  return A;
}
function fillFloat32$1(E, _, A, I, D) {
  for (var T = 0; T < I * 4; T += 4) E[A++] = _.getFloat32(T, D);
  return A;
}
function unsupported$1(E, _) {
  throw new Error("Unsupported " + E + ": " + _);
}
function validateBitDepth(E) {
  if (E.length) {
    const A = E;
    E = A[0];
    for (var _ = 0; _ < A.length; _++) A[_] !== E && unsupported$1("bit depth", A);
  }
  return E;
}
const TIFFDecoder$1 = tiffDecoder;
var decode$2 = function (_, A) {
  return new TIFFDecoder$1(_, A).decode(A);
};
src$4.decode = decode$2;
const IOBuffer = IOBuffer_1,
  tiff = src$4;
function decode$1(E) {
  const _ = new IOBuffer(E),
    A = {};
  if ((_.setBigEndian(), _.readUint16() !== 65496)) throw new Error("SOI marker not found. Not a valid JPEG file");
  if (_.readUint16() === 65505) {
    _.readUint16();
    const T = _.readBytes(6);
    if (T[0] === 69 && T[1] === 120 && T[2] === 105 && T[3] === 102 && T[4] === 0 && T[5] === 0) {
      const C = tiff.decode(_, { onlyFirst: !0, ignoreImageData: !0, offset: _.offset });
      A.exif = C;
    }
  }
  return A;
}
var decode_1 = decode$1,
  decode = decode_1,
  imageTypeExports = {},
  imageType$1 = {
    get exports() {
      return imageTypeExports;
    },
    set exports(E) {
      imageTypeExports = E;
    },
  },
  fileTypeExports = {},
  fileType$1 = {
    get exports() {
      return fileTypeExports;
    },
    set exports(E) {
      fileTypeExports = E;
    },
  };
(function (module) {
  const toBytes = (E) => [...E].map((_) => _.charCodeAt(0)),
    xpiZipFilename = toBytes("META-INF/mozilla.rsa"),
    oxmlContentTypes = toBytes("[Content_Types].xml"),
    oxmlRels = toBytes("_rels/.rels");
  function readUInt64LE(E, _ = 0) {
    let A = E[_],
      I = 1,
      D = 0;
    for (; ++D < 8; ) (I *= 256), (A += E[_ + D] * I);
    return A;
  }
  const fileType = (E) => {
    if (!(E instanceof Uint8Array || E instanceof ArrayBuffer || Buffer.isBuffer(E)))
      throw new TypeError(
        `Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof E}\``,
      );
    const _ = E instanceof Uint8Array ? E : new Uint8Array(E);
    if (!(_ && _.length > 1)) return null;
    const A = (D, T) => {
        T = Object.assign({ offset: 0 }, T);
        for (let C = 0; C < D.length; C++)
          if (T.mask) {
            if (D[C] !== (T.mask[C] & _[C + T.offset])) return !1;
          } else if (D[C] !== _[C + T.offset]) return !1;
        return !0;
      },
      I = (D, T) => A(toBytes(D), T);
    if (A([255, 216, 255])) return { ext: "jpg", mime: "image/jpeg" };
    if (A([137, 80, 78, 71, 13, 10, 26, 10])) return { ext: "png", mime: "image/png" };
    if (A([71, 73, 70])) return { ext: "gif", mime: "image/gif" };
    if (A([87, 69, 66, 80], { offset: 8 })) return { ext: "webp", mime: "image/webp" };
    if (A([70, 76, 73, 70])) return { ext: "flif", mime: "image/flif" };
    if ((A([73, 73, 42, 0]) || A([77, 77, 0, 42])) && A([67, 82], { offset: 8 }))
      return { ext: "cr2", mime: "image/x-canon-cr2" };
    if (A([73, 73, 42, 0]) || A([77, 77, 0, 42])) return { ext: "tif", mime: "image/tiff" };
    if (A([66, 77])) return { ext: "bmp", mime: "image/bmp" };
    if (A([73, 73, 188])) return { ext: "jxr", mime: "image/vnd.ms-photo" };
    if (A([56, 66, 80, 83])) return { ext: "psd", mime: "image/vnd.adobe.photoshop" };
    if (A([80, 75, 3, 4])) {
      if (
        A(
          [
            109, 105, 109, 101, 116, 121, 112, 101, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 47, 101, 112,
            117, 98, 43, 122, 105, 112,
          ],
          { offset: 30 },
        )
      )
        return { ext: "epub", mime: "application/epub+zip" };
      if (A(xpiZipFilename, { offset: 30 })) return { ext: "xpi", mime: "application/x-xpinstall" };
      if (I("mimetypeapplication/vnd.oasis.opendocument.text", { offset: 30 }))
        return { ext: "odt", mime: "application/vnd.oasis.opendocument.text" };
      if (I("mimetypeapplication/vnd.oasis.opendocument.spreadsheet", { offset: 30 }))
        return { ext: "ods", mime: "application/vnd.oasis.opendocument.spreadsheet" };
      if (I("mimetypeapplication/vnd.oasis.opendocument.presentation", { offset: 30 }))
        return { ext: "odp", mime: "application/vnd.oasis.opendocument.presentation" };
      const D = (B, P = 0) =>
        B.findIndex((O, F, L) => F >= P && L[F] === 80 && L[F + 1] === 75 && L[F + 2] === 3 && L[F + 3] === 4);
      let T = 0,
        C = !1,
        R = null;
      do {
        const B = T + 30;
        if (
          (C || (C = A(oxmlContentTypes, { offset: B }) || A(oxmlRels, { offset: B })),
          R ||
            (I("word/", { offset: B })
              ? (R = { ext: "docx", mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" })
              : I("ppt/", { offset: B })
                ? (R = {
                    ext: "pptx",
                    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                  })
                : I("xl/", { offset: B }) &&
                  (R = { ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })),
          C && R)
        )
          return R;
        T = D(_, B);
      } while (T >= 0);
      if (R) return R;
    }
    if (A([80, 75]) && (_[2] === 3 || _[2] === 5 || _[2] === 7) && (_[3] === 4 || _[3] === 6 || _[3] === 8))
      return { ext: "zip", mime: "application/zip" };
    if (A([117, 115, 116, 97, 114], { offset: 257 })) return { ext: "tar", mime: "application/x-tar" };
    if (A([82, 97, 114, 33, 26, 7]) && (_[6] === 0 || _[6] === 1))
      return { ext: "rar", mime: "application/x-rar-compressed" };
    if (A([31, 139, 8])) return { ext: "gz", mime: "application/gzip" };
    if (A([66, 90, 104])) return { ext: "bz2", mime: "application/x-bzip2" };
    if (A([55, 122, 188, 175, 39, 28])) return { ext: "7z", mime: "application/x-7z-compressed" };
    if (A([120, 1])) return { ext: "dmg", mime: "application/x-apple-diskimage" };
    if (
      A([51, 103, 112, 53]) ||
      (A([0, 0, 0]) &&
        A([102, 116, 121, 112], { offset: 4 }) &&
        (A([109, 112, 52, 49], { offset: 8 }) ||
          A([109, 112, 52, 50], { offset: 8 }) ||
          A([105, 115, 111, 109], { offset: 8 }) ||
          A([105, 115, 111, 50], { offset: 8 }) ||
          A([109, 109, 112, 52], { offset: 8 }) ||
          A([77, 52, 86], { offset: 8 }) ||
          A([100, 97, 115, 104], { offset: 8 })))
    )
      return { ext: "mp4", mime: "video/mp4" };
    if (A([77, 84, 104, 100])) return { ext: "mid", mime: "audio/midi" };
    if (A([26, 69, 223, 163])) {
      const D = _.subarray(4, 4100),
        T = D.findIndex((C, R, B) => B[R] === 66 && B[R + 1] === 130);
      if (T !== -1) {
        const C = T + 3,
          R = (B) => [...B].every((P, O) => D[C + O] === P.charCodeAt(0));
        if (R("matroska")) return { ext: "mkv", mime: "video/x-matroska" };
        if (R("webm")) return { ext: "webm", mime: "video/webm" };
      }
    }
    if (
      A([0, 0, 0, 20, 102, 116, 121, 112, 113, 116, 32, 32]) ||
      A([102, 114, 101, 101], { offset: 4 }) ||
      A([102, 116, 121, 112, 113, 116, 32, 32], { offset: 4 }) ||
      A([109, 100, 97, 116], { offset: 4 }) ||
      A([109, 111, 111, 118], { offset: 4 }) ||
      A([119, 105, 100, 101], { offset: 4 })
    )
      return { ext: "mov", mime: "video/quicktime" };
    if (A([82, 73, 70, 70])) {
      if (A([65, 86, 73], { offset: 8 })) return { ext: "avi", mime: "video/vnd.avi" };
      if (A([87, 65, 86, 69], { offset: 8 })) return { ext: "wav", mime: "audio/vnd.wave" };
      if (A([81, 76, 67, 77], { offset: 8 })) return { ext: "qcp", mime: "audio/qcelp" };
    }
    if (A([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      let D = 30;
      do {
        const T = readUInt64LE(_, D + 16);
        if (A([145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101], { offset: D })) {
          if (A([64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43], { offset: D + 24 }))
            return { ext: "wma", mime: "audio/x-ms-wma" };
          if (A([192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43], { offset: D + 24 }))
            return { ext: "wmv", mime: "video/x-ms-asf" };
          break;
        }
        D += T;
      } while (D + 24 <= _.length);
      return { ext: "asf", mime: "application/vnd.ms-asf" };
    }
    if (A([0, 0, 1, 186]) || A([0, 0, 1, 179])) return { ext: "mpg", mime: "video/mpeg" };
    if (A([102, 116, 121, 112, 51, 103], { offset: 4 })) return { ext: "3gp", mime: "video/3gpp" };
    for (let D = 0; D < 2 && D < _.length - 16; D++) {
      if (A([73, 68, 51], { offset: D }) || A([255, 226], { offset: D, mask: [255, 226] }))
        return { ext: "mp3", mime: "audio/mpeg" };
      if (A([255, 228], { offset: D, mask: [255, 228] })) return { ext: "mp2", mime: "audio/mpeg" };
      if (A([255, 248], { offset: D, mask: [255, 252] })) return { ext: "mp2", mime: "audio/mpeg" };
      if (A([255, 240], { offset: D, mask: [255, 252] })) return { ext: "mp4", mime: "audio/mpeg" };
    }
    if (A([102, 116, 121, 112, 77, 52, 65], { offset: 4 })) return { ext: "m4a", mime: "audio/mp4" };
    if (A([79, 112, 117, 115, 72, 101, 97, 100], { offset: 28 })) return { ext: "opus", mime: "audio/opus" };
    if (A([79, 103, 103, 83]))
      return A([128, 116, 104, 101, 111, 114, 97], { offset: 28 })
        ? { ext: "ogv", mime: "video/ogg" }
        : A([1, 118, 105, 100, 101, 111, 0], { offset: 28 })
          ? { ext: "ogm", mime: "video/ogg" }
          : A([127, 70, 76, 65, 67], { offset: 28 })
            ? { ext: "oga", mime: "audio/ogg" }
            : A([83, 112, 101, 101, 120, 32, 32], { offset: 28 })
              ? { ext: "spx", mime: "audio/ogg" }
              : A([1, 118, 111, 114, 98, 105, 115], { offset: 28 })
                ? { ext: "ogg", mime: "audio/ogg" }
                : { ext: "ogx", mime: "application/ogg" };
    if (A([102, 76, 97, 67])) return { ext: "flac", mime: "audio/x-flac" };
    if (A([77, 65, 67, 32])) return { ext: "ape", mime: "audio/ape" };
    if (A([119, 118, 112, 107])) return { ext: "wv", mime: "audio/wavpack" };
    if (A([35, 33, 65, 77, 82, 10])) return { ext: "amr", mime: "audio/amr" };
    if (A([37, 80, 68, 70])) return { ext: "pdf", mime: "application/pdf" };
    if (A([77, 90])) return { ext: "exe", mime: "application/x-msdownload" };
    if ((_[0] === 67 || _[0] === 70) && A([87, 83], { offset: 1 }))
      return { ext: "swf", mime: "application/x-shockwave-flash" };
    if (A([123, 92, 114, 116, 102])) return { ext: "rtf", mime: "application/rtf" };
    if (A([0, 97, 115, 109])) return { ext: "wasm", mime: "application/wasm" };
    if (A([119, 79, 70, 70]) && (A([0, 1, 0, 0], { offset: 4 }) || A([79, 84, 84, 79], { offset: 4 })))
      return { ext: "woff", mime: "font/woff" };
    if (A([119, 79, 70, 50]) && (A([0, 1, 0, 0], { offset: 4 }) || A([79, 84, 84, 79], { offset: 4 })))
      return { ext: "woff2", mime: "font/woff2" };
    if (
      A([76, 80], { offset: 34 }) &&
      (A([0, 0, 1], { offset: 8 }) || A([1, 0, 2], { offset: 8 }) || A([2, 0, 2], { offset: 8 }))
    )
      return { ext: "eot", mime: "application/vnd.ms-fontobject" };
    if (A([0, 1, 0, 0, 0])) return { ext: "ttf", mime: "font/ttf" };
    if (A([79, 84, 84, 79, 0])) return { ext: "otf", mime: "font/otf" };
    if (A([0, 0, 1, 0])) return { ext: "ico", mime: "image/x-icon" };
    if (A([0, 0, 2, 0])) return { ext: "cur", mime: "image/x-icon" };
    if (A([70, 76, 86, 1])) return { ext: "flv", mime: "video/x-flv" };
    if (A([37, 33])) return { ext: "ps", mime: "application/postscript" };
    if (A([253, 55, 122, 88, 90, 0])) return { ext: "xz", mime: "application/x-xz" };
    if (A([83, 81, 76, 105])) return { ext: "sqlite", mime: "application/x-sqlite3" };
    if (A([78, 69, 83, 26])) return { ext: "nes", mime: "application/x-nintendo-nes-rom" };
    if (A([67, 114, 50, 52])) return { ext: "crx", mime: "application/x-google-chrome-extension" };
    if (A([77, 83, 67, 70]) || A([73, 83, 99, 40])) return { ext: "cab", mime: "application/vnd.ms-cab-compressed" };
    if (A([33, 60, 97, 114, 99, 104, 62, 10, 100, 101, 98, 105, 97, 110, 45, 98, 105, 110, 97, 114, 121]))
      return { ext: "deb", mime: "application/x-deb" };
    if (A([33, 60, 97, 114, 99, 104, 62])) return { ext: "ar", mime: "application/x-unix-archive" };
    if (A([237, 171, 238, 219])) return { ext: "rpm", mime: "application/x-rpm" };
    if (A([31, 160]) || A([31, 157])) return { ext: "Z", mime: "application/x-compress" };
    if (A([76, 90, 73, 80])) return { ext: "lz", mime: "application/x-lzip" };
    if (A([208, 207, 17, 224, 161, 177, 26, 225])) return { ext: "msi", mime: "application/x-msi" };
    if (A([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) return { ext: "mxf", mime: "application/mxf" };
    if (A([71], { offset: 4 }) && (A([71], { offset: 192 }) || A([71], { offset: 196 })))
      return { ext: "mts", mime: "video/mp2t" };
    if (A([66, 76, 69, 78, 68, 69, 82])) return { ext: "blend", mime: "application/x-blender" };
    if (A([66, 80, 71, 251])) return { ext: "bpg", mime: "image/bpg" };
    if (A([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
      if (A([106, 112, 50, 32], { offset: 20 })) return { ext: "jp2", mime: "image/jp2" };
      if (A([106, 112, 120, 32], { offset: 20 })) return { ext: "jpx", mime: "image/jpx" };
      if (A([106, 112, 109, 32], { offset: 20 })) return { ext: "jpm", mime: "image/jpm" };
      if (A([109, 106, 112, 50], { offset: 20 })) return { ext: "mj2", mime: "image/mj2" };
    }
    if (A([70, 79, 82, 77])) return { ext: "aif", mime: "audio/aiff" };
    if (I("<?xml ")) return { ext: "xml", mime: "application/xml" };
    if (A([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 }))
      return { ext: "mobi", mime: "application/x-mobipocket-ebook" };
    if (A([102, 116, 121, 112], { offset: 4 })) {
      if (A([109, 105, 102, 49], { offset: 8 })) return { ext: "heic", mime: "image/heif" };
      if (A([109, 115, 102, 49], { offset: 8 })) return { ext: "heic", mime: "image/heif-sequence" };
      if (A([104, 101, 105, 99], { offset: 8 }) || A([104, 101, 105, 120], { offset: 8 }))
        return { ext: "heic", mime: "image/heic" };
      if (A([104, 101, 118, 99], { offset: 8 }) || A([104, 101, 118, 120], { offset: 8 }))
        return { ext: "heic", mime: "image/heic-sequence" };
    }
    return A([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])
      ? { ext: "ktx", mime: "image/ktx" }
      : A([68, 73, 67, 77], { offset: 128 })
        ? { ext: "dcm", mime: "application/dicom" }
        : A([77, 80, 43])
          ? { ext: "mpc", mime: "audio/x-musepack" }
          : A([77, 80, 67, 75])
            ? { ext: "mpc", mime: "audio/x-musepack" }
            : A([66, 69, 71, 73, 78, 58])
              ? { ext: "ics", mime: "text/calendar" }
              : A([103, 108, 84, 70, 2, 0, 0, 0])
                ? { ext: "glb", mime: "model/gltf-binary" }
                : A([212, 195, 178, 161]) || A([161, 178, 195, 212])
                  ? { ext: "pcap", mime: "application/vnd.tcpdump.pcap" }
                  : null;
  };
  (module.exports = fileType),
    (module.exports.default = fileType),
    Object.defineProperty(fileType, "minimumBytes", { value: 4100 }),
    (module.exports.stream = (readableStream) =>
      new Promise((resolve, reject) => {
        const stream = eval("require")("stream");
        readableStream.once("readable", () => {
          const E = new stream.PassThrough(),
            _ = readableStream.read(module.exports.minimumBytes) || readableStream.read();
          try {
            E.fileType = fileType(_);
          } catch (A) {
            reject(A);
          }
          readableStream.unshift(_),
            stream.pipeline ? resolve(stream.pipeline(readableStream, E, () => {})) : resolve(readableStream.pipe(E));
        });
      }));
})(fileType$1);
const fileType = fileTypeExports,
  imageExts = new Set([
    "jpg",
    "png",
    "gif",
    "webp",
    "flif",
    "cr2",
    "tif",
    "bmp",
    "jxr",
    "psd",
    "ico",
    "bpg",
    "jp2",
    "jpm",
    "jpx",
    "heic",
    "cur",
    "dcm",
  ]),
  imageType = (E) => {
    const _ = fileType(E);
    return imageExts.has(_ && _.ext) ? _ : null;
  };
imageType$1.exports = imageType;
imageTypeExports.default = imageType;
Object.defineProperty(imageType, "minimumBytes", { value: fileType.minimumBytes });
function guessStripByteCounts(E) {
  if (E.compression !== 1) throw new Error("missing mandatory StripByteCounts field in compressed image");
  const _ = E.rowsPerStrip * E.width * E.samplesPerPixel * (E.bitsPerSample / 8);
  return new Array(E.stripOffsets.length).fill(_);
}
function applyHorizontalDifferencing8Bit(E, _, A) {
  let I = 0;
  for (; I < E.length; ) {
    for (let D = A; D < _ * A; D += A)
      for (let T = 0; T < A; T++) E[I + D + T] = (E[I + D + T] + E[I + D - (A - T)]) & 255;
    I += _ * A;
  }
}
function applyHorizontalDifferencing16Bit(E, _, A) {
  let I = 0;
  for (; I < E.length; ) {
    for (let D = A; D < _ * A; D += A)
      for (let T = 0; T < A; T++) E[I + D + T] = (E[I + D + T] + E[I + D - (A - T)]) & 65535;
    I += _ * A;
  }
}
const tagsById$2 = {
    33434: "ExposureTime",
    33437: "FNumber",
    34850: "ExposureProgram",
    34852: "SpectralSensitivity",
    34855: "ISOSpeedRatings",
    34856: "OECF",
    34864: "SensitivityType",
    34865: "StandardOutputSensitivity",
    34866: "RecommendedExposureIndex",
    34867: "ISOSpeed",
    34868: "ISOSpeedLatitudeyyy",
    34869: "ISOSpeedLatitudezzz",
    36864: "ExifVersion",
    36867: "DateTimeOriginal",
    36868: "DateTimeDigitized",
    37121: "ComponentsConfiguration",
    37122: "CompressedBitsPerPixel",
    37377: "ShutterSpeedValue",
    37378: "ApertureValue",
    37379: "BrightnessValue",
    37380: "ExposureBiasValue",
    37381: "MaxApertureValue",
    37382: "SubjectDistance",
    37383: "MeteringMode",
    37384: "LightSource",
    37385: "Flash",
    37386: "FocalLength",
    37396: "SubjectArea",
    37500: "MakerNote",
    37510: "UserComment",
    37520: "SubsecTime",
    37521: "SubsecTimeOriginal",
    37522: "SubsecTimeDigitized",
    40960: "FlashpixVersion",
    40961: "ColorSpace",
    40962: "PixelXDimension",
    40963: "PixelYDimension",
    40964: "RelatedSoundFile",
    41483: "FlashEnergy",
    41484: "SpatialFrequencyResponse",
    41486: "FocalPlaneXResolution",
    41487: "FocalPlaneYResolution",
    41488: "FocalPlaneResolutionUnit",
    41492: "SubjectLocation",
    41493: "ExposureIndex",
    41495: "SensingMethod",
    41728: "FileSource",
    41729: "SceneType",
    41730: "CFAPattern",
    41985: "CustomRendered",
    41986: "ExposureMode",
    41987: "WhiteBalance",
    41988: "DigitalZoomRatio",
    41989: "FocalLengthIn35mmFilm",
    41990: "SceneCaptureType",
    41991: "GainControl",
    41992: "Contrast",
    41993: "Saturation",
    41994: "Sharpness",
    41995: "DeviceSettingDescription",
    41996: "SubjectDistanceRange",
    42016: "ImageUniqueID",
    42032: "CameraOwnerName",
    42033: "BodySerialNumber",
    42034: "LensSpecification",
    42035: "LensMake",
    42036: "LensModel",
    42037: "LensSerialNumber",
    42240: "Gamma",
  },
  tagsByName$2 = {};
for (let E in tagsById$2) tagsByName$2[tagsById$2[E]] = Number(E);
const exif = Object.freeze(
    Object.defineProperty({ __proto__: null, tagsById: tagsById$2, tagsByName: tagsByName$2 }, Symbol.toStringTag, {
      value: "Module",
    }),
  ),
  tagsById$1 = {
    0: "GPSVersionID",
    1: "GPSLatitudeRef",
    2: "GPSLatitude",
    3: "GPSLongitudeRef",
    4: "GPSLongitude",
    5: "GPSAltitudeRef",
    6: "GPSAltitude",
    7: "GPSTimeStamp",
    8: "GPSSatellites",
    9: "GPSStatus",
    10: "GPSMeasureMode",
    11: "GPSDOP",
    12: "GPSSpeedRef",
    13: "GPSSpeed",
    14: "GPSTrackRef",
    15: "GPSTrack",
    16: "GPSImgDirectionRef",
    17: "GPSImgDirection",
    18: "GPSMapDatum",
    19: "GPSDestLatitudeRef",
    20: "GPSDestLatitude",
    21: "GPSDestLongitudeRef",
    22: "GPSDestLongitude",
    23: "GPSDestBearingRef",
    24: "GPSDestBearing",
    25: "GPSDestDistanceRef",
    26: "GPSDestDistance",
    27: "GPSProcessingMethod",
    28: "GPSAreaInformation",
    29: "GPSDateStamp",
    30: "GPSDifferential",
    31: "GPSHPositioningError",
  },
  tagsByName$1 = {};
for (let E in tagsById$1) tagsByName$1[tagsById$1[E]] = Number(E);
const gps = Object.freeze(
    Object.defineProperty({ __proto__: null, tagsById: tagsById$1, tagsByName: tagsByName$1 }, Symbol.toStringTag, {
      value: "Module",
    }),
  ),
  tagsById = {
    254: "NewSubfileType",
    255: "SubfileType",
    256: "ImageWidth",
    257: "ImageLength",
    258: "BitsPerSample",
    259: "Compression",
    262: "PhotometricInterpretation",
    263: "Threshholding",
    264: "CellWidth",
    265: "CellLength",
    266: "FillOrder",
    270: "ImageDescription",
    271: "Make",
    272: "Model",
    273: "StripOffsets",
    274: "Orientation",
    277: "SamplesPerPixel",
    278: "RowsPerStrip",
    279: "StripByteCounts",
    280: "MinSampleValue",
    281: "MaxSampleValue",
    282: "XResolution",
    283: "YResolution",
    284: "PlanarConfiguration",
    288: "FreeOffsets",
    289: "FreeByteCounts",
    290: "GrayResponseUnit",
    291: "GrayResponseCurve",
    296: "ResolutionUnit",
    305: "Software",
    306: "DateTime",
    315: "Artist",
    316: "HostComputer",
    320: "ColorMap",
    338: "ExtraSamples",
    33432: "Copyright",
    269: "DocumentName",
    285: "PageName",
    286: "XPosition",
    287: "YPosition",
    292: "T4Options",
    293: "T6Options",
    297: "PageNumber",
    301: "TransferFunction",
    317: "Predictor",
    318: "WhitePoint",
    319: "PrimaryChromaticities",
    321: "HalftoneHints",
    322: "TileWidth",
    323: "TileLength",
    324: "TileOffsets",
    325: "TileByteCounts",
    326: "BadFaxLines",
    327: "CleanFaxData",
    328: "ConsecutiveBadFaxLines",
    330: "SubIFDs",
    332: "InkSet",
    333: "InkNames",
    334: "NumberOfInks",
    336: "DotRange",
    337: "TargetPrinter",
    339: "SampleFormat",
    340: "SMinSampleValue",
    341: "SMaxSampleValue",
    342: "TransferRange",
    343: "ClipPath",
    344: "XClipPathUnits",
    345: "YClipPathUnits",
    346: "Indexed",
    347: "JPEGTables",
    351: "OPIProxy",
    400: "GlobalParametersIFD",
    401: "ProfileType",
    402: "FaxProfile",
    403: "CodingMethods",
    404: "VersionYear",
    405: "ModeNumber",
    433: "Decode",
    434: "DefaultImageColor",
    512: "JPEGProc",
    513: "JPEGInterchangeFormat",
    514: "JPEGInterchangeFormatLength",
    515: "JPEGRestartInterval",
    517: "JPEGLosslessPredictors",
    518: "JPEGPointTransforms",
    519: "JPEGQTables",
    520: "JPEGDCTables",
    521: "JPEGACTables",
    529: "YCbCrCoefficients",
    530: "YCbCrSubSampling",
    531: "YCbCrPositioning",
    532: "ReferenceBlackWhite",
    559: "StripRowCounts",
    700: "XMP",
    32781: "ImageID",
    34732: "ImageLayer",
    32932: "WangAnnotatio",
    33445: "MDFileTag",
    33446: "MDScalePixel",
    33447: "MDColorTable",
    33448: "MDLabName",
    33449: "MDSampleInfo",
    33450: "MDPrepDate",
    33451: "MDPrepTime",
    33452: "MDFileUnits",
    33550: "ModelPixelScaleTag",
    33723: "IPTC",
    33918: "INGRPacketDataTag",
    33919: "INGRFlagRegisters",
    33920: "IrasBTransformationMatrix",
    33922: "ModelTiepointTag",
    34264: "ModelTransformationTag",
    34377: "Photoshop",
    34665: "ExifIFD",
    34675: "ICCProfile",
    34735: "GeoKeyDirectoryTag",
    34736: "GeoDoubleParamsTag",
    34737: "GeoAsciiParamsTag",
    34853: "GPSIFD",
    34908: "HylaFAXFaxRecvParams",
    34909: "HylaFAXFaxSubAddress",
    34910: "HylaFAXFaxRecvTime",
    37724: "ImageSourceData",
    40965: "InteroperabilityIFD",
    42112: "GDAL_METADATA",
    42113: "GDAL_NODATA",
    50215: "OceScanjobDescription",
    50216: "OceApplicationSelector",
    50217: "OceIdentificationNumber",
    50218: "OceImageLogicCharacteristics",
    50706: "DNGVersion",
    50707: "DNGBackwardVersion",
    50708: "UniqueCameraModel",
    50709: "LocalizedCameraModel",
    50710: "CFAPlaneColor",
    50711: "CFALayout",
    50712: "LinearizationTable",
    50713: "BlackLevelRepeatDim",
    50714: "BlackLevel",
    50715: "BlackLevelDeltaH",
    50716: "BlackLevelDeltaV",
    50717: "WhiteLevel",
    50718: "DefaultScale",
    50719: "DefaultCropOrigin",
    50720: "DefaultCropSize",
    50721: "ColorMatrix1",
    50722: "ColorMatrix2",
    50723: "CameraCalibration1",
    50724: "CameraCalibration2",
    50725: "ReductionMatrix1",
    50726: "ReductionMatrix2",
    50727: "AnalogBalance",
    50728: "AsShotNeutral",
    50729: "AsShotWhiteXY",
    50730: "BaselineExposure",
    50731: "BaselineNoise",
    50732: "BaselineSharpness",
    50733: "BayerGreenSplit",
    50734: "LinearResponseLimit",
    50735: "CameraSerialNumber",
    50736: "LensInfo",
    50737: "ChromaBlurRadius",
    50738: "AntiAliasStrength",
    50740: "DNGPrivateData",
    50741: "MakerNoteSafety",
    50778: "CalibrationIlluminant1",
    50779: "CalibrationIlluminant2",
    50780: "BestQualityScale",
    50784: "AliasLayerMetadata",
  },
  tagsByName = {};
for (let E in tagsById) tagsByName[tagsById[E]] = Number(E);
const standard = Object.freeze(
    Object.defineProperty({ __proto__: null, tagsById, tagsByName }, Symbol.toStringTag, { value: "Module" }),
  ),
  tags = { standard, exif, gps };
class IFD {
  constructor(_) {
    if (!_) throw new Error("missing kind");
    (this.data = new Uint8Array()), (this.fields = new Map()), (this.kind = _), (this._hasMap = !1), (this._map = {});
  }
  get(_) {
    if (typeof _ == "number") return this.fields.get(_);
    if (typeof _ == "string") return this.fields.get(tags[this.kind].tagsByName[_]);
    throw new Error("expected a number or string");
  }
  get map() {
    if (!this._hasMap) {
      const _ = tags[this.kind].tagsById;
      for (let A of this.fields.keys()) _[A] && (this._map[_[A]] = this.fields.get(A));
      this._hasMap = !0;
    }
    return this._map;
  }
}
let types = new Map([
  [1, [1, readByte]],
  [2, [1, readASCII]],
  [3, [2, readShort]],
  [4, [4, readLong]],
  [5, [8, readRational]],
  [6, [1, readSByte]],
  [7, [1, readByte]],
  [8, [2, readSShort]],
  [9, [4, readSLong]],
  [10, [8, readSRational]],
  [11, [4, readFloat]],
  [12, [8, readDouble]],
]);
function getByteLength(E, _) {
  const A = types.get(E);
  if (!A) throw new Error(`type not found: ${E}`);
  return A[0] * _;
}
function readData(E, _, A) {
  const I = types.get(_);
  if (!I) throw new Error(`type not found: ${_}`);
  return I[1](E, A);
}
function readByte(E, _) {
  if (_ === 1) return E.readUint8();
  let A = new Uint8Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readUint8();
  return A;
}
function readASCII(E, _) {
  let A = [],
    I = "";
  for (let D = 0; D < _; D++) {
    let T = String.fromCharCode(E.readUint8());
    T === "\0" ? (A.push(I), (I = "")) : (I += T);
  }
  return A.length === 1 ? A[0] : A;
}
function readShort(E, _) {
  if (_ === 1) return E.readUint16();
  let A = new Uint16Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readUint16();
  return A;
}
function readLong(E, _) {
  if (_ === 1) return E.readUint32();
  let A = new Uint32Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readUint32();
  return A;
}
function readRational(E, _) {
  if (_ === 1) return E.readUint32() / E.readUint32();
  let A = new Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readUint32() / E.readUint32();
  return A;
}
function readSByte(E, _) {
  if (_ === 1) return E.readInt8();
  let A = new Int8Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readInt8();
  return A;
}
function readSShort(E, _) {
  if (_ === 1) return E.readInt16();
  let A = new Int16Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readInt16();
  return A;
}
function readSLong(E, _) {
  if (_ === 1) return E.readInt32();
  let A = new Int32Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readInt32();
  return A;
}
function readSRational(E, _) {
  if (_ === 1) return E.readInt32() / E.readInt32();
  let A = new Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readInt32() / E.readInt32();
  return A;
}
function readFloat(E, _) {
  if (_ === 1) return E.readFloat32();
  let A = new Float32Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readFloat32();
  return A;
}
function readDouble(E, _) {
  if (_ === 1) return E.readFloat64();
  let A = new Float64Array(_);
  for (let I = 0; I < _; I++) A[I] = E.readFloat64();
  return A;
}
const CLEAR_CODE = 256,
  EOI_CODE = 257,
  TABLE_START = 258,
  MIN_BIT_LENGTH = 9;
let stringTable = [];
function initializeStringTable() {
  if (stringTable.length === 0) {
    for (let _ = 0; _ < 256; _++) stringTable.push([_]);
    const E = [];
    for (let _ = 256; _ < 4096; _++) stringTable.push(E);
  }
}
const andTable = [511, 1023, 2047, 4095],
  bitJumps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 511, 1023, 2047, 4095];
class LzwDecoder {
  constructor(_) {
    (this.nextData = 0),
      (this.nextBits = 0),
      (this.bytePointer = 0),
      (this.tableLength = TABLE_START),
      (this.currentBitLength = MIN_BIT_LENGTH),
      (this.stripArray = new Uint8Array(_.buffer, _.byteOffset, _.byteLength)),
      (this.outData = new IOBuffer$4(_.byteLength)),
      this.initializeTable();
  }
  decode() {
    let _ = 0,
      A = 0;
    for (; (_ = this.getNextCode()) !== EOI_CODE; )
      if (_ === CLEAR_CODE) {
        if ((this.initializeTable(), (_ = this.getNextCode()), _ === EOI_CODE)) break;
        this.writeString(this.stringFromCode(_)), (A = _);
      } else if (this.isInTable(_))
        this.writeString(this.stringFromCode(_)),
          this.addStringToTable(this.stringFromCode(A).concat(this.stringFromCode(_)[0])),
          (A = _);
      else {
        const D = this.stringFromCode(A).concat(this.stringFromCode(A)[0]);
        this.writeString(D), this.addStringToTable(D), (A = _);
      }
    const I = this.outData.toArray();
    return new DataView(I.buffer, I.byteOffset, I.byteLength);
  }
  initializeTable() {
    initializeStringTable(), (this.tableLength = TABLE_START), (this.currentBitLength = MIN_BIT_LENGTH);
  }
  writeString(_) {
    this.outData.writeBytes(_);
  }
  stringFromCode(_) {
    return stringTable[_];
  }
  isInTable(_) {
    return _ < this.tableLength;
  }
  addStringToTable(_) {
    if (((stringTable[this.tableLength++] = _), stringTable.length > 4096))
      throw (
        ((stringTable = []),
        new Error(
          "LZW decoding error. Please open an issue at https://github.com/image-js/tiff/issues/new/choose (include a test image).",
        ))
      );
    this.tableLength === bitJumps[this.currentBitLength] && this.currentBitLength++;
  }
  getNextCode() {
    (this.nextData = (this.nextData << 8) | (this.stripArray[this.bytePointer++] & 255)),
      (this.nextBits += 8),
      this.nextBits < this.currentBitLength &&
        ((this.nextData = (this.nextData << 8) | (this.stripArray[this.bytePointer++] & 255)), (this.nextBits += 8));
    const _ = (this.nextData >> (this.nextBits - this.currentBitLength)) & andTable[this.currentBitLength - 9];
    return (this.nextBits -= this.currentBitLength), this.bytePointer > this.stripArray.length ? 257 : _;
  }
}
function decompressLzw(E) {
  return new LzwDecoder(E).decode();
}
const dateTimeRegex = /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;
class TiffIfd extends IFD {
  constructor() {
    super("standard");
  }
  get size() {
    return this.width * this.height;
  }
  get width() {
    return this.imageWidth;
  }
  get height() {
    return this.imageLength;
  }
  get components() {
    return this.samplesPerPixel;
  }
  get date() {
    let _ = new Date(),
      A = dateTimeRegex.exec(this.dateTime);
    if (A === null) throw new Error(`invalid dateTime: ${this.dateTime}`);
    return (
      _.setFullYear(Number(A[1]), Number(A[2]) - 1, Number(A[3])),
      _.setHours(Number(A[4]), Number(A[5]), Number(A[6])),
      _
    );
  }
  get newSubfileType() {
    return this.get("NewSubfileType");
  }
  get imageWidth() {
    return this.get("ImageWidth");
  }
  get imageLength() {
    return this.get("ImageLength");
  }
  get bitsPerSample() {
    const _ = this.get("BitsPerSample");
    return _ && typeof _ != "number" ? _[0] : _;
  }
  get alpha() {
    const _ = this.extraSamples;
    return _ ? _[0] !== 0 : !1;
  }
  get associatedAlpha() {
    const _ = this.extraSamples;
    return _ ? _[0] === 1 : !1;
  }
  get extraSamples() {
    return alwaysArray(this.get("ExtraSamples"));
  }
  get compression() {
    return this.get("Compression") || 1;
  }
  get type() {
    return this.get("PhotometricInterpretation");
  }
  get fillOrder() {
    return this.get("FillOrder") || 1;
  }
  get documentName() {
    return this.get("DocumentName");
  }
  get imageDescription() {
    return this.get("ImageDescription");
  }
  get stripOffsets() {
    return alwaysArray(this.get("StripOffsets"));
  }
  get orientation() {
    return this.get("Orientation");
  }
  get samplesPerPixel() {
    return this.get("SamplesPerPixel") || 1;
  }
  get rowsPerStrip() {
    return this.get("RowsPerStrip");
  }
  get stripByteCounts() {
    return alwaysArray(this.get("StripByteCounts"));
  }
  get minSampleValue() {
    return this.get("MinSampleValue") || 0;
  }
  get maxSampleValue() {
    return this.get("MaxSampleValue") || Math.pow(2, this.bitsPerSample) - 1;
  }
  get xResolution() {
    return this.get("XResolution");
  }
  get yResolution() {
    return this.get("YResolution");
  }
  get planarConfiguration() {
    return this.get("PlanarConfiguration") || 1;
  }
  get resolutionUnit() {
    return this.get("ResolutionUnit") || 2;
  }
  get dateTime() {
    return this.get("DateTime");
  }
  get predictor() {
    return this.get("Predictor") || 1;
  }
  get sampleFormat() {
    return this.get("SampleFormat") || 1;
  }
  get sMinSampleValue() {
    return this.get("SMinSampleValue") || this.minSampleValue;
  }
  get sMaxSampleValue() {
    return this.get("SMaxSampleValue") || this.maxSampleValue;
  }
  get palette() {
    const _ = 2 ** this.bitsPerSample,
      A = this.get("ColorMap");
    if (!A) return;
    if (A.length !== 3 * _) throw new Error(`ColorMap size must be ${_}`);
    const I = [];
    for (let D = 0; D < _; D++) I.push([A[D], A[D + _], A[D + 2 * _]]);
    return I;
  }
}
function alwaysArray(E) {
  return typeof E == "number" ? [E] : E;
}
function decompressZlib(E) {
  const _ = new Uint8Array(E.buffer, E.byteOffset, E.byteLength),
    A = inflate_1(_);
  return new DataView(A.buffer, A.byteOffset, A.byteLength);
}
const defaultOptions$c = { ignoreImageData: !1, onlyFirst: !1 };
class TIFFDecoder extends IOBuffer$4 {
  constructor(_) {
    super(_), (this._nextIFD = 0);
  }
  get isMultiPage() {
    let _ = 0;
    for (this.decodeHeader(); this._nextIFD; )
      if ((_++, this.decodeIFD({ ignoreImageData: !0 }, !0), _ === 2)) return !0;
    if (_ === 1) return !1;
    throw unsupported("ifdCount", _);
  }
  get pageCount() {
    let _ = 0;
    for (this.decodeHeader(); this._nextIFD; ) _++, this.decodeIFD({ ignoreImageData: !0 }, !0);
    if (_ > 0) return _;
    throw unsupported("ifdCount", _);
  }
  decode(_ = {}) {
    _ = Object.assign({}, defaultOptions$c, _);
    const A = [];
    for (this.decodeHeader(); this._nextIFD; ) if ((A.push(this.decodeIFD(_, !0)), _.onlyFirst)) return [A[0]];
    return A;
  }
  decodeHeader() {
    const _ = this.readUint16();
    if (_ === 18761) this.setLittleEndian();
    else if (_ === 19789) this.setBigEndian();
    else throw new Error(`invalid byte order: 0x${_.toString(16)}`);
    if (this.readUint16() !== 42) throw new Error("not a TIFF file");
    this._nextIFD = this.readUint32();
  }
  decodeIFD(_, A) {
    this.seek(this._nextIFD);
    let I;
    if (A) I = new TiffIfd();
    else {
      if (!_.kind) throw new Error("kind is missing");
      I = new IFD(_.kind);
    }
    const D = this.readUint16();
    for (let T = 0; T < D; T++) this.decodeIFDEntry(I);
    if (!_.ignoreImageData) {
      if (!(I instanceof TiffIfd)) throw new Error("must be a tiff ifd");
      this.decodeImageData(I);
    }
    return (this._nextIFD = this.readUint32()), I;
  }
  decodeIFDEntry(_) {
    const A = this.offset,
      I = this.readUint16(),
      D = this.readUint16(),
      T = this.readUint32();
    if (D < 1 || D > 12) {
      this.skip(4);
      return;
    }
    getByteLength(D, T) > 4 && this.seek(this.readUint32());
    const R = readData(this, D, T);
    if ((_.fields.set(I, R), I === 34665 || I === 34853)) {
      let B = this.offset,
        P = "exif";
      I === 34665 ? (P = "exif") : I === 34853 && (P = "gps"),
        (this._nextIFD = R),
        (_[P] = this.decodeIFD({ kind: P, ignoreImageData: !0 }, !1)),
        (this.offset = B);
    }
    this.seek(A), this.skip(12);
  }
  decodeImageData(_) {
    const A = _.orientation;
    if (A && A !== 1) throw unsupported("orientation", A);
    switch (_.type) {
      case 0:
      case 1:
      case 2:
      case 3:
        this.readStripData(_);
        break;
      default:
        throw unsupported("image type", _.type);
    }
    if ((this.applyPredictor(_), this.convertAlpha(_), _.type === 0)) {
      const I = _.bitsPerSample,
        D = Math.pow(2, I) - 1;
      for (let T = 0; T < _.data.length; T++) _.data[T] = D - _.data[T];
    }
  }
  readStripData(_) {
    const A = _.width,
      I = _.height,
      D = _.bitsPerSample,
      T = _.sampleFormat,
      C = A * I * _.samplesPerPixel,
      R = getDataArray(C, D, T),
      P = _.rowsPerStrip * A * _.samplesPerPixel,
      O = _.stripOffsets,
      F = _.stripByteCounts || guessStripByteCounts(_);
    let L = C,
      U = 0;
    for (let z = 0; z < O.length; z++) {
      let V = new DataView(this.buffer, this.byteOffset + O[z], F[z]),
        X = L > P ? P : L;
      L -= X;
      let G = V;
      switch (_.compression) {
        case 1:
          break;
        case 5: {
          G = decompressLzw(V);
          break;
        }
        case 8: {
          G = decompressZlib(V);
          break;
        }
        case 2:
          throw unsupported("Compression", "CCITT Group 3");
        case 32773:
          throw unsupported("Compression", "PackBits");
        default:
          throw unsupported("Compression", _.compression);
      }
      U = this.fillUncompressed(D, T, R, G, U, X);
    }
    _.data = R;
  }
  fillUncompressed(_, A, I, D, T, C) {
    if (_ === 8) return fill8bit(I, D, T, C);
    if (_ === 16) return fill16bit(I, D, T, C, this.isLittleEndian());
    if (_ === 32 && A === 3) return fillFloat32(I, D, T, C, this.isLittleEndian());
    throw unsupported("bitDepth", _);
  }
  applyPredictor(_) {
    const A = _.bitsPerSample;
    switch (_.predictor) {
      case 1:
        break;
      case 2: {
        if (A === 8) applyHorizontalDifferencing8Bit(_.data, _.width, _.components);
        else if (A === 16) applyHorizontalDifferencing16Bit(_.data, _.width, _.components);
        else throw new Error(`Horizontal differencing is only supported for images with a bit depth of ${A}`);
        break;
      }
      default:
        throw new Error(`invalid predictor: ${_.predictor}`);
    }
  }
  convertAlpha(_) {
    if (_.alpha && _.associatedAlpha) {
      const { data: A, components: I, maxSampleValue: D } = _;
      for (let T = 0; T < A.length; T += I) {
        const C = A[T + I - 1];
        for (let R = 0; R < I - 1; R++) A[T + R] = Math.round((A[T + R] * D) / C);
      }
    }
  }
}
function getDataArray(E, _, A) {
  if (_ === 8) return new Uint8Array(E);
  if (_ === 16) return new Uint16Array(E);
  if (_ === 32 && A === 3) return new Float32Array(E);
  throw unsupported("bit depth / sample format", `${_} / ${A}`);
}
function fill8bit(E, _, A, I) {
  for (let D = 0; D < I; D++) E[A++] = _.getUint8(D);
  return A;
}
function fill16bit(E, _, A, I, D) {
  for (let T = 0; T < I * 2; T += 2) E[A++] = _.getUint16(T, D);
  return A;
}
function fillFloat32(E, _, A, I, D) {
  for (let T = 0; T < I * 4; T += 4) E[A++] = _.getFloat32(T, D);
  return A;
}
function unsupported(E, _) {
  return new Error(`Unsupported ${E}: ${_}`);
}
function decodeTIFF(E, _) {
  return new TIFFDecoder(E).decode(_);
}
function matchAndCrop(E = {}) {
  let { algorithm: _ = "matchToPrevious", ignoreBorder: A = [0, 0] } = E;
  this.checkProcessable("matchAndCrop", { bitDepth: [8, 16] });
  let I = _ === "matchToPrevious",
    D = this[0],
    T = [];
  T[0] = { position: [0, 0], image: this[0] };
  let C = [0, 0];
  for (let L = 1; L < this.length; L++) {
    let U = D.getBestMatch(this[L], { border: A });
    (T[L] = { position: [U[0] + C[0], U[1] + C[1]], image: this[L] }),
      I && ((C[0] += U[0]), (C[1] += U[1]), (D = this[L]));
  }
  let R = 0,
    B = 0,
    P = 0,
    O = 0;
  for (let L = 0; L < T.length; L++) {
    let U = T[L];
    U.position[0] > R && (R = U.position[0]),
      U.position[0] < B && (B = U.position[0]),
      U.position[1] > P && (P = U.position[1]),
      U.position[1] < O && (O = U.position[1]);
  }
  (B = 0 - B), (O = 0 - O);
  for (let L = 0; L < T.length; L++) {
    let U = T[L];
    U.crop = U.image.crop({
      x: R - U.position[0],
      y: P - U.position[1],
      width: D.width - B - R,
      height: D.height - O - P,
    });
  }
  let F = [];
  for (let L = 0; L < T.length; L++) F[L] = T[L].crop;
  return new Stack(F);
}
function min$2() {
  this.checkProcessable("min", { bitDepth: [8, 16] });
  let E = this[0].min;
  for (let _ = 1; _ < this.length; _++) for (let A = 0; A < E.length; A++) E[A] = Math.min(E[A], this[_].min[A]);
  return E;
}
function max$2() {
  this.checkProcessable("min", { bitDepth: [8, 16] });
  let E = this[0].max;
  for (let _ = 1; _ < this.length; _++) for (let A = 0; A < E.length; A++) E[A] = Math.max(E[A], this[_].max[A]);
  return E;
}
function median$2(E) {
  let _ = E.reduce((C, R) => C + R);
  if (_ === 0) throw new Error("unreachable");
  let A = 0,
    I = 0,
    D = _ / 2,
    T;
  for (;;) {
    if (E[A] > 0) {
      if (T !== void 0) return (T + A) / 2;
      if (((I += E[A]), I > D)) return A;
      I === D && (T = A);
    }
    A++;
  }
}
function mean$2(E) {
  let _ = 0,
    A = 0;
  for (let I = 0; I < E.length; I++) (_ += E[I]), (A += E[I] * I);
  return _ === 0 ? 0 : A / _;
}
function median$1() {
  this.checkProcessable("median", { bitDepth: [8, 16] });
  let E = this.getHistograms({ maxSlots: this[0].maxValue + 1 }),
    _ = new Array(E.length);
  for (let A = 0; A < E.length; A++) {
    let I = E[A];
    _[A] = median$2(I);
  }
  return _;
}
function histogram(E) {
  this.checkProcessable("min", { bitDepth: [8, 16] });
  let _ = this[0].getHistogram(E);
  for (let A = 1; A < this.length; A++) {
    let I = this[A].getHistogram(E);
    for (let D = 0; D < _.length; D++) _[D] += I[D];
  }
  return _;
}
function histograms(E) {
  this.checkProcessable("min", { bitDepth: [8, 16] });
  let _ = this[0].getHistograms(E),
    A = _[0].length;
  for (let I = 1; I < this.length; I++) {
    let D = this[I].getHistograms(E);
    for (let T = 0; T < _.length; T++) for (let C = 0; C < A; C++) _[T][C] += D[T][C];
  }
  return _;
}
function averageImage() {
  this.checkProcessable("averageImage", { bitDepth: [8, 16] });
  let E = new Uint32Array(this[0].data.length);
  for (let I = 0; I < this.length; I++) {
    let D = this[I];
    for (let T = 0; T < this[0].data.length; T++) E[T] += D.data[T];
  }
  let _ = Image.createFrom(this[0]),
    A = _.data;
  for (let I = 0; I < this[0].data.length; I++) A[I] = E[I] / this.length;
  return _;
}
function maxImage() {
  this.checkProcessable("max", { bitDepth: [8, 16] });
  let E = Image.createFrom(this[0]);
  E.data.fill(0);
  for (const _ of this) for (let A = 0; A < E.data.length; A++) E.data[A] = Math.max(_.data[A], E.data[A]);
  return E;
}
function minImage() {
  this.checkProcessable("max", { bitDepth: [8, 16] });
  let E = Image.createFrom(this[0]);
  E.data.fill(E.maxValue);
  for (const _ of this) for (let A = 0; A < E.data.length; A++) E.data[A] = Math.min(_.data[A], E.data[A]);
  return E;
}
function extend$2(E) {
  E.extendMethod("matchAndCrop", matchAndCrop),
    E.extendMethod("getMin", min$2),
    E.extendMethod("getMax", max$2),
    E.extendMethod("getMedian", median$1),
    E.extendMethod("getHistogram", histogram),
    E.extendMethod("getHistograms", histograms),
    E.extendMethod("getAverage", averageImage),
    E.extendMethod("getAverageImage", averageImage),
    E.extendMethod("getMaxImage", maxImage),
    E.extendMethod("getMinImage", minImage);
}
let computedPropertyDescriptor = { configurable: !0, enumerable: !1, get: void 0 };
class Stack extends Array {
  constructor(_) {
    if (Array.isArray(_)) {
      super(_.length);
      for (let A = 0; A < _.length; A++) this[A] = _[A];
    } else typeof _ == "number" ? super(_) : super();
    this.computed = null;
  }
  static load(_) {
    return Promise.all(_.map(Image.load)).then((A) => new Stack(A));
  }
  static extendMethod(_, A, I = {}) {
    let { inPlace: D = !1, returnThis: T = !0, partialArgs: C = [] } = I;
    return (
      D
        ? (Stack.prototype[_] = function (...R) {
            this.computed = null;
            let B = A.apply(this, [...C, ...R]);
            return T ? this : B;
          })
        : (Stack.prototype[_] = function (...R) {
            return A.apply(this, [...C, ...R]);
          }),
      Stack
    );
  }
  static extendProperty(_, A, I = {}) {
    let { partialArgs: D = [] } = I;
    return (
      (computedPropertyDescriptor.get = function () {
        if (this.computed === null) this.computed = {};
        else if (hasOwnExports(_, this.computed)) return this.computed[_];
        let T = A.apply(this, D);
        return (this.computed[_] = T), T;
      }),
      Object.defineProperty(Stack.prototype, _, computedPropertyDescriptor),
      Stack
    );
  }
  checkProcessable(_, A = {}) {
    if (typeof _ != "string")
      throw new TypeError("checkProcessable requires as first parameter the processName (a string)");
    if (this.size === 0) throw new TypeError(`The process: ${_} can not be applied on an empty stack`);
    this[0].checkProcessable(_, A);
    for (let I = 1; I < this.length; I++) {
      if ((A.sameSize === void 0 || A.sameSize) && this[0].width !== this[I].width)
        throw new TypeError(`The process: ${_} can not be applied if width is not identical in all images`);
      if ((A.sameSize === void 0 || A.sameSize) && this[0].height !== this[I].height)
        throw new TypeError(`The process: ${_} can not be applied if height is not identical in all images`);
      if ((A.sameAlpha === void 0 || A.sameAlpha) && this[0].alpha !== this[I].alpha)
        throw new TypeError(`The process: ${_} can not be applied if alpha is not identical in all images`);
      if ((A.sameBitDepth === void 0 || A.sameBitDepth) && this[0].bitDepth !== this[I].bitDepth)
        throw new TypeError(`The process: ${_} can not be applied if bitDepth is not identical in all images`);
      if ((A.sameColorModel === void 0 || A.sameColorModel) && this[0].colorModel !== this[I].colorModel)
        throw new TypeError(`The process: ${_} can not be applied if colorModel is not identical in all images`);
      if ((A.sameNumberChannels === void 0 || A.sameNumberChannels) && this[0].channels !== this[I].channels)
        throw new TypeError(`The process: ${_} can not be applied if channels is not identical in all images`);
    }
  }
}
Array[Symbol.species] ||
  (Stack.prototype.map = function (E, _) {
    if (typeof E != "function") throw new TypeError(`${E} is not a function`);
    let A = new Stack(this.length);
    for (let I = 0; I < this.length; I++) A[I] = E.call(_, this[I], I, this);
    return A;
  });
extend$2(Stack);
const isDataURL = /^data:[a-z]+\/(?:[a-z]+);base64,/;
function load(E, _) {
  if (typeof E == "string") return loadURL(E, _);
  if (E instanceof ArrayBuffer) return Promise.resolve(loadBinary(new Uint8Array(E), void 0, _ && _.ignorePalette));
  if (E.buffer) return Promise.resolve(loadBinary(E, void 0, _ && _.ignorePalette));
  throw new Error('argument to "load" must be a string or buffer.');
}
function loadBinary(E, _, A) {
  const I = imageTypeExports(E);
  if (I)
    switch (I.mime) {
      case "image/png":
        return loadPNG(E);
      case "image/jpeg":
        return loadJPEG(E);
      case "image/tiff":
        return loadTIFF(E, A);
      default:
        return loadGeneric(D(I.mime));
    }
  return loadGeneric(D("application/octet-stream"));
  function D(T) {
    return _ || toBase64URL(E, T);
  }
}
function loadURL(E, _) {
  const A = E.slice(0, 64).match(isDataURL);
  let I;
  return (
    A !== null ? (I = Promise.resolve(decode$3(E.slice(A[0].length)))) : (I = fetchBinary(E, _)),
    I.then((D) => {
      const T = new Uint8Array(D);
      return loadBinary(T, A ? E : void 0, _ && _.ignorePalette);
    })
  );
}
function loadPNG(E) {
  const _ = decodePng(E);
  let A = _.channels,
    I,
    D = 0;
  return (
    A === 2 || A === 4 ? ((I = A - 1), (D = 1)) : (I = A),
    _.palette
      ? loadPNGFromPalette(_)
      : new Image(_.width, _.height, _.data, { components: I, alpha: D, bitDepth: _.depth })
  );
}
function loadPNGFromPalette(E) {
  const _ = E.width * E.height,
    A = E.palette[0].length,
    I = new Uint8Array(_ * A),
    D = 8 / E.depth,
    T = E.depth < 8 ? D : 1,
    C = parseInt("1".repeat(E.depth), 2),
    R = A === 4;
  let B = 0;
  for (let P = 0; P < _; P++) {
    const O = Math.floor(P / T);
    let F = E.data[O];
    E.depth < 8 && (F = (F >>> (E.depth * (D - 1 - (P % D)))) & C);
    const L = E.palette[F];
    (I[B++] = L[0]), (I[B++] = L[1]), (I[B++] = L[2]), R && (I[B++] = L[3]);
  }
  return new Image(E.width, E.height, I, { components: 3, alpha: R, bitDepth: 8 });
}
function loadJPEG(E) {
  const _ = decode(E);
  let A;
  _.exif && (A = getMetadata(_.exif));
  const I = jpegJs.decode(E, { useTArray: !0, maxMemoryUsageInMB: 1024 });
  let D = new Image(I.width, I.height, I.data, { meta: A });
  if (A && A.tiff.tags.Orientation) {
    const T = A.tiff.tags.Orientation;
    T > 2 && (D = D.rotate({ 3: 180, 4: 180, 5: 90, 6: 90, 7: 270, 8: 270 }[T])),
      [2, 4, 5, 7].includes(T) && (D = D.flipX());
  }
  return D;
}
function loadTIFF(E, _) {
  let A = decodeTIFF(E);
  return A.length === 1
    ? getImageFromIFD(A[0], _)
    : new Stack(
        A.map(function (I) {
          return getImageFromIFD(I, _);
        }),
      );
}
function getMetadata(E) {
  const _ = { tiff: { fields: E.fields, tags: E.map } };
  return E.exif && (_.exif = E.exif), E.gps && (_.gps = E.gps), _;
}
function getImageFromIFD(E, _) {
  if (!_ && E.type === 3) {
    const A = new Uint16Array(3 * E.width * E.height),
      I = E.palette;
    let D = 0;
    for (let T = 0; T < E.data.length; T++) {
      const C = E.data[T],
        R = I[C];
      (A[D++] = R[0]), (A[D++] = R[1]), (A[D++] = R[2]);
    }
    return new Image(E.width, E.height, A, {
      components: 3,
      alpha: E.alpha,
      colorModel: RGB$1,
      bitDepth: 16,
      meta: getMetadata(E),
    });
  } else
    return new Image(E.width, E.height, E.data, {
      components: E.type === 2 ? 3 : 1,
      alpha: E.alpha,
      colorModel: E.type === 2 ? RGB$1 : GREY$1,
      bitDepth: E.bitsPerSample.length ? E.bitsPerSample[0] : E.bitsPerSample,
      meta: getMetadata(E),
    });
}
function loadGeneric(E, _) {
  return (
    (_ = _ || {}),
    new Promise(function (A, I) {
      let D = new DOMImage();
      (D.onload = function () {
        let T = D.width,
          C = D.height,
          B = createCanvas(T, C).getContext("2d");
        B.drawImage(D, 0, 0, T, C);
        let P = B.getImageData(0, 0, T, C).data;
        A(new Image(T, C, P, _));
      }),
        (D.onerror = function () {
          I(new Error(`Could not load ${E}`));
        }),
        (D.src = E);
    })
  );
}
const valueMethods = {
  getValueXY(E, _, A) {
    return this.data[(_ * this.width + E) * this.channels + A];
  },
  setValueXY(E, _, A, I) {
    return (this.data[(_ * this.width + E) * this.channels + A] = I), (this.computed = null), this;
  },
  getValue(E, _) {
    return this.data[E * this.channels + _];
  },
  setValue(E, _, A) {
    return (this.data[E * this.channels + _] = A), (this.computed = null), this;
  },
  getPixelXY(E, _) {
    return this.getPixel(_ * this.width + E);
  },
  setPixelXY(E, _, A) {
    return this.setPixel(_ * this.width + E, A);
  },
  getPixel(E) {
    const _ = new Array(this.channels),
      A = E * this.channels;
    for (let I = 0; I < this.channels; I++) _[I] = this.data[A + I];
    return _;
  },
  setPixel(E, _) {
    const A = E * this.channels;
    for (let I = 0; I < _.length; I++) this.data[A + I] = _[I];
    return (this.computed = null), this;
  },
};
function setValueMethods(E) {
  for (const _ in valueMethods) E.prototype[_] = valueMethods[_];
}
function getImageParameters(E) {
  return {
    width: E.width,
    height: E.height,
    components: E.components,
    alpha: E.alpha,
    colorModel: E.colorModel,
    bitDepth: E.bitDepth,
  };
}
function getOutputImage(E, _, A, I = {}) {
  const { out: D } = _;
  if (D === void 0) return I.copy ? E.clone() : Image.createFrom(E, A);
  {
    if (!Image.isImage(D)) throw new TypeError("out must be an Image object");
    const T = Object.assign(getImageParameters(E), A);
    for (const C in T)
      if (D[C] !== T[C]) throw new RangeError(`cannot use out. Its ${C} must be "${T[C]}" (found "${D[C]}")`);
    return D;
  }
}
function getOutputImageOrInPlace(E, _, A) {
  if (_.inPlace !== void 0 && typeof _.inPlace != "boolean") throw new TypeError("inPlace option must be a boolean");
  if (_.inPlace) {
    if (_.out !== void 0) throw new TypeError("out option must not be set if inPlace option is true");
    return E;
  }
  return getOutputImage(E, _, null, A);
}
function abs(E = {}) {
  this.checkProcessable("abs", { bitDepth: [32] });
  const _ = getOutputImageOrInPlace(this, E);
  return absolute(this, _), _;
}
function absolute(E, _) {
  for (let A = 0; A < E.data.length; A++) _.data[A] = Math.abs(E.data[A]);
}
function copyAlphaChannel(E, _) {
  if (E.alpha === 1 && _.alpha === 1)
    for (let A = 0; A < E.size; A++) _.data[A * _.channels + _.components] = E.data[A * E.channels + E.components];
}
function invert(E = {}) {
  this.checkProcessable("invert", { bitDepth: [1, 8, 16] });
  const _ = getOutputImageOrInPlace(this, E);
  return (
    this.bitDepth === 1 ? invertBinary(this, _) : (invertColor(this, _), this !== _ && copyAlphaChannel(this, _)), _
  );
}
function invertBinary(E, _) {
  for (let A = 0; A < E.data.length; A++) _.data[A] = ~E.data[A];
}
function invertColor(E, _) {
  for (let A = 0; A < E.data.length; A += E.channels)
    for (let I = 0; I < E.components; I++) _.data[A + I] = E.maxValue - E.data[A + I];
}
function flipX() {
  this.checkProcessable("flipX", { bitDepth: [8, 16] });
  for (let E = 0; E < this.height; E++) {
    let _ = E * this.width * this.channels;
    for (let A = 0; A < Math.floor(this.width / 2); A++) {
      let I = A * this.channels + _,
        D = (this.width - A - 1) * this.channels + _;
      for (let T = 0; T < this.channels; T++) {
        let C = this.data[I + T];
        (this.data[I + T] = this.data[D + T]), (this.data[D + T] = C);
      }
    }
  }
  return this;
}
function flipY() {
  this.checkProcessable("flipY", { bitDepth: [8, 16] });
  for (let E = 0; E < Math.floor(this.height / 2); E++)
    for (let _ = 0; _ < this.width; _++) {
      let A = _ * this.channels + E * this.width * this.channels,
        I = _ * this.channels + (this.height - 1 - E) * this.channels * this.width;
      for (let D = 0; D < this.channels; D++) {
        let T = this.data[A + D];
        (this.data[A + D] = this.data[I + D]), (this.data[I + D] = T);
      }
    }
  return this;
}
function blurFilter(E = {}) {
  const { radius: _ = 1 } = E;
  if (_ < 1) throw new Error("radius must be greater than 1");
  const A = 2 * _ + 1,
    I = new Array(A);
  for (let D = 0; D < A; D++) {
    I[D] = new Array(A);
    for (let T = 0; T < A; T++) I[D][T] = 1 / (A * A);
  }
  return this.convolution(I);
}
var medianQuickselect_minExports = {},
  medianQuickselect_min = {
    get exports() {
      return medianQuickselect_minExports;
    },
    set exports(E) {
      medianQuickselect_minExports = E;
    },
  };
(function (E) {
  (function () {
    function _(D) {
      for (var T = 0, C = D.length - 1, R = void 0, B = void 0, P = void 0, O = I(T, C); ; ) {
        if (C <= T) return D[O];
        if (C == T + 1) return D[T] > D[C] && A(D, T, C), D[O];
        for (
          R = I(T, C),
            D[R] > D[C] && A(D, R, C),
            D[T] > D[C] && A(D, T, C),
            D[R] > D[T] && A(D, R, T),
            A(D, R, T + 1),
            B = T + 1,
            P = C;
          ;

        ) {
          do B++;
          while (D[T] > D[B]);
          do P--;
          while (D[P] > D[T]);
          if (P < B) break;
          A(D, B, P);
        }
        A(D, T, P), P <= O && (T = B), P >= O && (C = P - 1);
      }
    }
    var A = function (T, C, R) {
        var B;
        return (B = [T[R], T[C]]), (T[C] = B[0]), (T[R] = B[1]), B;
      },
      I = function (T, C) {
        return ~~((T + C) / 2);
      };
    E.exports ? (E.exports = _) : (window.median = _);
  })();
})(medianQuickselect_min);
const quickSelectMedian = medianQuickselect_minExports;
function validateArrayOfChannels(E, _ = {}) {
  let { channels: A, allowAlpha: I, defaultAlpha: D } = _;
  return typeof I != "boolean" && (I = !0), typeof A > "u" ? allChannels(E, D) : validateChannels(E, A, I);
}
function allChannels(E, _) {
  let A = _ ? E.channels : E.components,
    I = new Array(A);
  for (let D = 0; D < A; D++) I[D] = D;
  return I;
}
function validateChannels(E, _, A) {
  Array.isArray(_) || (_ = [_]);
  for (let I = 0; I < _.length; I++) _[I] = validateChannel(E, _[I], A);
  return _;
}
function validateChannel(E, _, A = !0) {
  if (_ === void 0) throw new RangeError(`validateChannel : the channel has to be >=0 and <${E.channels}`);
  if (typeof _ == "string") {
    switch (E.colorModel) {
      case GREY$1:
        break;
      case RGB$1:
        if ("rgb".includes(_))
          switch (_) {
            case "r":
              _ = 0;
              break;
            case "g":
              _ = 1;
              break;
            case "b":
              _ = 2;
              break;
          }
        break;
      case HSL:
        if ("hsl".includes(_))
          switch (_) {
            case "h":
              _ = 0;
              break;
            case "s":
              _ = 1;
              break;
            case "l":
              _ = 2;
              break;
          }
        break;
      case HSV:
        if ("hsv".includes(_))
          switch (_) {
            case "h":
              _ = 0;
              break;
            case "s":
              _ = 1;
              break;
            case "v":
              _ = 2;
              break;
          }
        break;
      case CMYK$1:
        if ("cmyk".includes(_))
          switch (_) {
            case "c":
              _ = 0;
              break;
            case "m":
              _ = 1;
              break;
            case "y":
              _ = 2;
              break;
            case "k":
              _ = 3;
              break;
          }
        break;
      default:
        throw new Error(`Unexpected color model: ${E.colorModel}`);
    }
    if (_ === "a") {
      if (!E.alpha) throw new Error("validateChannel : the image does not contain alpha channel");
      _ = E.components;
    }
    if (typeof _ == "string") throw new Error(`validateChannel : undefined channel: ${_}`);
  }
  if (_ >= E.channels) throw new RangeError(`validateChannel : the channel has to be >=0 and <${E.channels}`);
  if (!A && _ >= E.components) throw new RangeError("validateChannel : alpha channel may not be selected");
  return _;
}
function medianFilter(E = {}) {
  let { radius: _ = 1, border: A = "copy", channels: I } = E;
  if ((this.checkProcessable("medianFilter", { bitDepth: [8, 16] }), _ < 1))
    throw new Error("radius must be greater than 0");
  I = validateArrayOfChannels(this, I);
  let D = _,
    T = _,
    C = Image.createFrom(this),
    R = (D * 2 + 1) * (T * 2 + 1),
    B = new Array(R);
  for (let P = 0; P < I.length; P++) {
    let O = I[P];
    for (let F = T; F < this.height - T; F++)
      for (let L = D; L < this.width - D; L++) {
        let U = 0;
        for (let V = -T; V <= T; V++)
          for (let X = -D; X <= D; X++) {
            let G = ((F + V) * this.width + L + X) * this.channels + O;
            B[U++] = this.data[G];
          }
        let z = (F * this.width + L) * this.channels + O;
        C.data[z] = quickSelectMedian(B);
      }
  }
  if (this.alpha && !I.includes(this.channels))
    for (let P = this.components; P < this.data.length; P = P + this.channels) C.data[P] = this.data[P];
  return C.setBorder({ size: [D, T], algorithm: A }), C;
}
function gaussianFilter(E = {}) {
  let { radius: _ = 1, sigma: A, channels: I, border: D = "copy" } = E;
  this.checkProcessable("gaussian", { bitDepth: [8, 16] });
  const T = getKernel(_, A);
  return this.convolution([T, T], { border: D, channels: I, algorithm: "separable" });
}
function getKernel(E, _) {
  const A = E * 2 + 1,
    I = new Array(A),
    D = _ || ((A - 1) * 0.5 - 1) * 0.3 + 0.8,
    T = -0.5 / (D * D);
  let C = 0;
  for (let R = 0; R < A; R++) {
    const B = R - E,
      P = Math.exp(T * B * B);
    (I[R] = P), (C += P);
  }
  for (let R = 0; R < A; R++) I[R] /= C;
  return I;
}
const SOBEL_X = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ],
  SOBEL_Y = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ],
  SCHARR_X = [
    [3, 0, -3],
    [10, 0, -10],
    [3, 0, -3],
  ],
  SCHARR_Y = [
    [3, 10, 3],
    [0, 0, 0],
    [-3, -10, -3],
  ];
var src$3 = {},
  fftlib = {};
(function (E) {
  (function () {
    var _;
    _ = E;
    var A = { release: "0.3.0", date: "2013-03" };
    _.toString = function () {
      return "version " + A.release + ", released " + A.date;
    };
    for (
      var I = 0,
        D = null,
        T = null,
        C = {
          init: function (P) {
            if (P !== 0 && !(P & (P - 1))) (I = P), C._initArray(), C._makeBitReversalTable(), C._makeCosSinTable();
            else throw new Error("init: radix-2 required");
          },
          fft1d: function (P, O) {
            C.fft(P, O, 1);
          },
          ifft1d: function (P, O) {
            var F = 1 / I;
            C.fft(P, O, -1);
            for (var L = 0; L < I; L++) (P[L] *= F), (O[L] *= F);
          },
          bt1d: function (P, O) {
            C.fft(P, O, -1);
          },
          fft2d: function (P, O) {
            for (var F = [], L = [], U = 0, z = 0; z < I; z++) {
              U = z * I;
              for (var V = 0; V < I; V++) (F[V] = P[V + U]), (L[V] = O[V + U]);
              C.fft1d(F, L);
              for (var X = 0; X < I; X++) (P[X + U] = F[X]), (O[X + U] = L[X]);
            }
            for (var G = 0; G < I; G++) {
              for (var Z = 0; Z < I; Z++) (U = G + Z * I), (F[Z] = P[U]), (L[Z] = O[U]);
              C.fft1d(F, L);
              for (var Y = 0; Y < I; Y++) (U = G + Y * I), (P[U] = F[Y]), (O[U] = L[Y]);
            }
          },
          ifft2d: function (P, O) {
            for (var F = [], L = [], U = 0, z = 0; z < I; z++) {
              U = z * I;
              for (var V = 0; V < I; V++) (F[V] = P[V + U]), (L[V] = O[V + U]);
              C.ifft1d(F, L);
              for (var X = 0; X < I; X++) (P[X + U] = F[X]), (O[X + U] = L[X]);
            }
            for (var G = 0; G < I; G++) {
              for (var Z = 0; Z < I; Z++) (U = G + Z * I), (F[Z] = P[U]), (L[Z] = O[U]);
              C.ifft1d(F, L);
              for (var Y = 0; Y < I; Y++) (U = G + Y * I), (P[U] = F[Y]), (O[U] = L[Y]);
            }
          },
          fft: function (P, O, F) {
            for (var L, U, z, V, X, G, Z, Y, q, W = I >> 2, ee = 0; ee < I; ee++)
              (V = D[ee]), ee < V && ((X = P[ee]), (P[ee] = P[V]), (P[V] = X), (X = O[ee]), (O[ee] = O[V]), (O[V] = X));
            for (var te = 1; te < I; te <<= 1) {
              (U = 0), (L = I / (te << 1));
              for (var Q = 0; Q < te; Q++) {
                (G = T[U + W]), (Z = F * T[U]);
                for (var J = Q; J < I; J += te << 1)
                  (z = J + te),
                    (Y = G * P[z] + Z * O[z]),
                    (q = G * O[z] - Z * P[z]),
                    (P[z] = P[J] - Y),
                    (P[J] += Y),
                    (O[z] = O[J] - q),
                    (O[J] += q);
                U += L;
              }
            }
          },
          _initArray: function () {
            typeof Uint32Array < "u" ? (D = new Uint32Array(I)) : (D = []),
              typeof Float64Array < "u" ? (T = new Float64Array(I * 1.25)) : (T = []);
          },
          _paddingZero: function () {},
          _makeBitReversalTable: function () {
            var P = 0,
              O = 0,
              F = 0;
            for (D[0] = 0; ++P < I; ) {
              for (F = I >> 1; F <= O; ) (O -= F), (F >>= 1);
              (O += F), (D[P] = O);
            }
          },
          _makeCosSinTable: function () {
            var P = I >> 1,
              O = I >> 2,
              F = I >> 3,
              L = P + O,
              U = Math.sin(Math.PI / I),
              z = 2 * U * U,
              V = Math.sqrt(z * (2 - z)),
              X = (T[O] = 1),
              G = (T[0] = 0);
            U = 2 * z;
            for (var Z = 1; Z < F; Z++) (X -= z), (z += U * X), (G += V), (V -= U * G), (T[Z] = G), (T[O - Z] = X);
            F !== 0 && (T[F] = Math.sqrt(0.5));
            for (var Y = 0; Y < O; Y++) T[P - Y] = T[Y];
            for (var q = 0; q < L; q++) T[q + P] = -T[q];
          },
        },
        R = ["init", "fft1d", "ifft1d", "fft2d", "ifft2d"],
        B = 0;
      B < R.length;
      B++
    )
      _[R[B]] = C[R[B]];
    return (_.bt = C.bt1d), (_.fft = C.fft1d), (_.ifft = C.ifft1d), _;
  }).call(commonjsGlobal);
})(fftlib);
var FFT = fftlib,
  FFTUtils$1 = {
    DEBUG: !1,
    ifft2DArray: function (E, _, A) {
      var I = new Array(_ * A),
        D = _ / 2,
        T = (A - 1) * 2;
      FFT.init(D);
      for (var C = { re: new Array(D), im: new Array(D) }, R = 0; R < A; R++) {
        for (var B = D - 1; B >= 0; B--) (C.re[B] = E[B * 2 * A + R]), (C.im[B] = E[(B * 2 + 1) * A + R]);
        FFT.bt(C.re, C.im);
        for (var B = D - 1; B >= 0; B--) (I[B * 2 * A + R] = C.re[B]), (I[(B * 2 + 1) * A + R] = C.im[B]);
      }
      var P = new Array(D * T);
      FFT.init(T);
      for (var O = { re: new Array(T), im: new Array(T) }, F = T * D, B = 0; B < _; B += 2) {
        (O.re[0] = I[B * A]), (O.im[0] = I[(B + 1) * A]);
        for (var R = 1; R < A; R++)
          (O.re[R] = I[B * A + R]),
            (O.im[R] = I[(B + 1) * A + R]),
            (O.re[T - R] = I[B * A + R]),
            (O.im[T - R] = -I[(B + 1) * A + R]);
        FFT.bt(O.re, O.im);
        for (var L = (B / 2) * T, R = T - 1; R >= 0; R--) P[L + R] = O.re[R] / F;
      }
      return P;
    },
    fft2DArray: function (E, _, A, I) {
      Object.assign({}, { inplace: !0 });
      var D = A / 2 + 1,
        T = _ * 2,
        C = new Array(T * D);
      FFT.init(A);
      for (
        var R = { re: new Array(A), im: new Array(A) },
          B = { re: new Array(A), im: new Array(A) },
          P = { re: new Array(A), im: new Array(A) },
          O,
          F,
          L,
          U,
          z,
          V = 0;
        V < _ / 2;
        V++
      ) {
        (O = V * 2 * A),
          (R.re = E.slice(O, O + A)),
          (O = (V * 2 + 1) * A),
          (R.im = E.slice(O, O + A)),
          FFT.fft1d(R.re, R.im),
          this.reconstructTwoRealFFT(R, B, P),
          (F = V * 4 * D),
          (L = (V * 4 + 1) * D),
          (U = (V * 4 + 2) * D),
          (z = (V * 4 + 3) * D);
        for (var X = D - 1; X >= 0; X--)
          (C[F + X] = B.re[X]), (C[L + X] = B.im[X]), (C[U + X] = P.re[X]), (C[z + X] = P.im[X]);
      }
      (B = null), (P = null);
      var G = new Array(T * D);
      FFT.init(_);
      for (var Z = { re: new Array(_), im: new Array(_) }, Y = D - 1; Y >= 0; Y--) {
        for (var V = _ - 1; V >= 0; V--)
          (Z.re[V] = C[V * 2 * D + Y]),
            (Z.im[V] = C[(V * 2 + 1) * D + Y]),
            isNaN(Z.re[V]) && (Z.re[V] = 0),
            isNaN(Z.im[V]) && (Z.im[V] = 0);
        FFT.fft1d(Z.re, Z.im);
        for (var V = _ - 1; V >= 0; V--) (G[V * 2 * D + Y] = Z.re[V]), (G[(V * 2 + 1) * D + Y] = Z.im[V]);
      }
      return G;
    },
    reconstructTwoRealFFT: function (E, _, A) {
      var I = E.re.length;
      (_.re[0] = E.re[0]), (_.im[0] = 0), (A.re[0] = E.im[0]), (A.im[0] = 0);
      for (var D, T, C, R, B, P = I / 2; P > 0; P--)
        (B = I - P),
          (D = 0.5 * (E.re[P] - E.re[B])),
          (T = 0.5 * (E.re[P] + E.re[B])),
          (C = 0.5 * (E.im[P] - E.im[B])),
          (R = 0.5 * (E.im[P] + E.im[B])),
          (_.re[P] = T),
          (_.im[P] = C),
          (_.re[B] = T),
          (_.im[B] = -C),
          (A.re[P] = R),
          (A.im[P] = -D),
          (A.re[B] = R),
          (A.im[B] = D);
    },
    convolute2DI: function (E, _, A, I) {
      for (var D, T, C = 0; C < A / 2; C++)
        for (var R = 0; R < I; R++)
          (D = E[C * 2 * I + R] * _[C * 2 * I + R] - E[(C * 2 + 1) * I + R] * _[(C * 2 + 1) * I + R]),
            (T = E[C * 2 * I + R] * _[(C * 2 + 1) * I + R] + E[(C * 2 + 1) * I + R] * _[C * 2 * I + R]),
            (E[C * 2 * I + R] = D),
            (E[(C * 2 + 1) * I + R] = T);
    },
    convolute: function (E, _, A, I, D) {
      for (var T = new Array(I * A), C = 0; C < A * I; C++) T[C] = E[C];
      T = this.fft2DArray(T, A, I);
      for (var R = _.length, B = _[0].length, P = new Array(I * A), C = 0; C < I * A; C++) P[C] = 0;
      for (var O, F, L = Math.floor((R - 1) / 2), U = Math.floor((B - 1) / 2), z = 0; z < R; z++) {
        O = (z - L + A) % A;
        for (var V = 0; V < B; V++) (F = (V - U + I) % I), (P[O * I + F] = _[z][V]);
      }
      P = this.fft2DArray(P, A, I);
      var X = A * 2,
        G = I / 2 + 1;
      return this.convolute2DI(T, P, X, G), this.ifft2DArray(T, X, G);
    },
    toRadix2: function (E, _, A) {
      var I,
        D,
        T,
        C,
        R = A,
        B = _;
      if (!(A !== 0 && !(A & (A - 1)))) {
        for (R = 0; A >> ++R; );
        R = 1 << R;
      }
      if (!(_ !== 0 && !(_ & (_ - 1)))) {
        for (B = 0; _ >> ++B; );
        B = 1 << B;
      }
      if (B == _ && R == A) return { data: E, rows: _, cols: A };
      var P = new Array(B * R),
        O = Math.floor((B - _) / 2) - _,
        F = Math.floor((R - A) / 2) - A;
      for (I = 0; I < B; I++) for (T = I * R, C = ((I - O) % _) * A, D = 0; D < R; D++) P[T + D] = E[C + ((D - F) % A)];
      return { data: P, rows: B, cols: R };
    },
    crop: function (E, _, A, I, D, T) {
      if (_ == I && A == D) return E;
      Object.assign({}, T);
      var C = new Array(D * I),
        R = Math.floor((_ - I) / 2),
        B = Math.floor((A - D) / 2),
        P,
        O,
        F,
        L;
      for (F = 0; F < I; F++) for (P = F * D, O = (F + R) * A, L = 0; L < D; L++) C[P + L] = E[O + (L + B)];
      return C;
    },
  },
  FFTUtils_1 = FFTUtils$1;
src$3.FFTUtils = FFTUtils_1;
src$3.FFT = fftlib;
var FFTUtils = src$3.FFTUtils;
function convolutionFFT(E, _, A) {
  var I = matrix2Array(E),
    D = I.data,
    T = Object.assign({ normalize: !1, divisor: 1, rows: I.rows, cols: I.cols }, A),
    C,
    R;
  if (T.rows && T.cols) (C = T.rows), (R = T.cols);
  else throw new Error("Invalid number of rows or columns " + C + " " + R);
  var B = T.divisor,
    P,
    O,
    F = _.length,
    L = _[0].length;
  if (T.normalize) for (B = 0, P = 0; P < F; P++) for (O = 0; O < L; O++) B += _[P][O];
  if (B === 0) throw new RangeError("convolution: The divisor is equal to zero");
  var U = FFTUtils.toRadix2(D, C, R),
    z = FFTUtils.convolute(U.data, _, U.rows, U.cols);
  if (((z = FFTUtils.crop(z, U.rows, U.cols, C, R)), B != 0 && B != 1)) for (P = 0; P < z.length; P++) z[P] /= B;
  return z;
}
function convolutionDirect(E, _, A) {
  var I = matrix2Array(E),
    D = I.data,
    T = Object.assign({ normalize: !1, divisor: 1, rows: I.rows, cols: I.cols }, A),
    C,
    R;
  if (T.rows && T.cols) (C = T.rows), (R = T.cols);
  else throw new Error("Invalid number of rows or columns " + C + " " + R);
  var B = T.divisor,
    P = _.length,
    O = _[0].length,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y;
  if (T.normalize) for (B = 0, F = 0; F < P; F++) for (L = 0; L < O; L++) B += _[F][L];
  if (B === 0) throw new RangeError("convolution: The divisor is equal to zero");
  var q = new Array(C * R),
    W = Math.floor(P / 2),
    ee = Math.floor(O / 2);
  for (z = 0; z < C; z++)
    for (U = 0; U < R; U++) {
      for (X = 0, L = 0; L < P; L++)
        for (F = 0; F < O; F++)
          (G = _[P - L - 1][O - F - 1]),
            (Z = (z + L - W + C) % C),
            (Y = (U + F - ee + R) % R),
            (V = Z * R + Y),
            (X += D[V] * G);
      (V = z * R + U), (q[V] = X / B);
    }
  return q;
}
function LoG(E, _, A) {
  var I = 1e3;
  A && A.factor && (I = A.factor);
  var D = new Array(_),
    T,
    C,
    R,
    B;
  I *= -1;
  var P = (_ - 1) / 2,
    O = 2 * E * E;
  for (T = 0; T < _; T++)
    for (D[T] = new Array(_), B = (T - P) * (T - P), C = 0; C < _; C++)
      (R = -((C - P) * (C - P) + B) / O), (D[T][C] = Math.round(I * (1 + R) * Math.exp(R)));
  return D;
}
function matrix2Array(E) {
  var _ = E,
    A,
    I;
  if (typeof E[0] != "number") {
    (A = E.length), (I = E[0].length), (_ = new Array(A * I));
    for (var D = 0; D < A; D++) for (var T = 0; T < I; T++) _[D * I + T] = E[D][T];
  } else {
    var C = Math.sqrt(E.length);
    Number.isInteger(C) && ((A = C), (I = C));
  }
  return { data: _, rows: A, cols: I };
}
var src$2 = { fft: convolutionFFT, direct: convolutionDirect, kernelFactory: { LoG }, matrix2Array },
  _isFinite =
    Number.isFinite ||
    function (E) {
      return !(typeof E != "number" || E !== E || E === 1 / 0 || E === -1 / 0);
    },
  isFinite$1 = _isFinite,
  isInteger =
    Number.isInteger ||
    function (E) {
      return typeof E == "number" && isFinite$1(E) && Math.floor(E) === E;
    };
function validateKernel(E) {
  let _, A;
  if (Array.isArray(E))
    if (Array.isArray(E[0])) {
      if (!(E.length & 1) || !(E[0].length & 1))
        throw new RangeError("validateKernel: Kernel rows and columns should be odd numbers");
      (_ = Math.floor(E.length / 2)), (A = Math.floor(E[0].length / 2));
    } else {
      let I = Math.sqrt(E.length);
      if (isInteger(I)) A = _ = Math.floor(Math.sqrt(E.length) / 2);
      else throw new RangeError("validateKernel: Kernel array should be a square");
      let D = new Array(I);
      for (let T = 0; T < I; T++) {
        D[T] = new Array(I);
        for (let C = 0; C < I; C++) D[T][C] = E[T * I + C];
      }
      E = D;
    }
  else throw new Error(`validateKernel: Invalid Kernel: ${E}`);
  return { kernel: E, kWidth: A, kHeight: _ };
}
function clamp$1(E, _) {
  return Math.round(Math.min(Math.max(E, 0), _.maxValue));
}
function directConvolution(E, _, A) {
  if (A === void 0) {
    const T = E.length + _.length - 1;
    A = new Array(T);
  }
  fill(A);
  for (var I = 0; I < E.length; I++) for (var D = 0; D < _.length; D++) A[I + D] += E[I] * _[D];
  return A;
}
function fill(E) {
  for (var _ = 0; _ < E.length; _++) E[_] = 0;
}
function convolutionSeparable(E, _, A, I) {
  const D = new Array(E.length);
  let T, C, R, B;
  (B = _[1]), (R = (B.length - 1) / 2), (C = new Array(A + B.length - 1)), (T = new Array(A));
  for (let P = 0; P < I; P++) {
    for (let O = 0; O < A; O++) T[O] = E[P * A + O];
    directConvolution(T, B, C);
    for (let O = 0; O < A; O++) D[P * A + O] = C[R + O];
  }
  (B = _[0]), (R = (B.length - 1) / 2), (C = new Array(I + B.length - 1)), (T = new Array(I));
  for (let P = 0; P < A; P++) {
    for (let O = 0; O < I; O++) T[O] = D[O * A + P];
    directConvolution(T, B, C);
    for (let O = 0; O < I; O++) D[O * A + P] = C[R + O];
  }
  return D;
}
const toString$1 = Object.prototype.toString;
function isAnyArray(E) {
  return toString$1.call(E).endsWith("Array]");
}
function max$1(E) {
  var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!isAnyArray(E)) throw new TypeError("input must be an array");
  if (E.length === 0) throw new TypeError("input must not be empty");
  var A = _.fromIndex,
    I = A === void 0 ? 0 : A,
    D = _.toIndex,
    T = D === void 0 ? E.length : D;
  if (I < 0 || I >= E.length || !Number.isInteger(I))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (T <= I || T > E.length || !Number.isInteger(T))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var C = E[I], R = I + 1; R < T; R++) E[R] > C && (C = E[R]);
  return C;
}
function min$1(E) {
  var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!isAnyArray(E)) throw new TypeError("input must be an array");
  if (E.length === 0) throw new TypeError("input must not be empty");
  var A = _.fromIndex,
    I = A === void 0 ? 0 : A,
    D = _.toIndex,
    T = D === void 0 ? E.length : D;
  if (I < 0 || I >= E.length || !Number.isInteger(I))
    throw new Error("fromIndex must be a positive integer smaller than length");
  if (T <= I || T > E.length || !Number.isInteger(T))
    throw new Error("toIndex must be an integer greater than fromIndex and at most equal to length");
  for (var C = E[I], R = I + 1; R < T; R++) E[R] < C && (C = E[R]);
  return C;
}
function rescale(E) {
  var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (isAnyArray(E)) {
    if (E.length === 0) throw new TypeError("input must not be empty");
  } else throw new TypeError("input must be an array");
  var A;
  if (_.output !== void 0) {
    if (!isAnyArray(_.output)) throw new TypeError("output option must be an array if specified");
    A = _.output;
  } else A = new Array(E.length);
  var I = min$1(E),
    D = max$1(E);
  if (I === D) throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");
  var T = _.min,
    C = T === void 0 ? (_.autoMinMax ? I : 0) : T,
    R = _.max,
    B = R === void 0 ? (_.autoMinMax ? D : 1) : R;
  if (C >= B) throw new RangeError("min option must be smaller than max option");
  for (var P = (B - C) / (D - I), O = 0; O < E.length; O++) A[O] = (E[O] - I) * P + C;
  return A;
}
const indent = " ".repeat(2),
  indentData = " ".repeat(4);
function inspectMatrix() {
  return inspectMatrixWithOptions(this);
}
function inspectMatrixWithOptions(E, _ = {}) {
  const { maxRows: A = 15, maxColumns: I = 10, maxNumSize: D = 8, padMinus: T = "auto" } = _;
  return `${E.constructor.name} {
${indent}[
${indentData}${inspectData(E, A, I, D, T)}
${indent}]
${indent}rows: ${E.rows}
${indent}columns: ${E.columns}
}`;
}
function inspectData(E, _, A, I, D) {
  const { rows: T, columns: C } = E,
    R = Math.min(T, _),
    B = Math.min(C, A),
    P = [];
  if (D === "auto") {
    D = !1;
    e: for (let O = 0; O < R; O++)
      for (let F = 0; F < B; F++)
        if (E.get(O, F) < 0) {
          D = !0;
          break e;
        }
  }
  for (let O = 0; O < R; O++) {
    let F = [];
    for (let L = 0; L < B; L++) F.push(formatNumber(E.get(O, L), I, D));
    P.push(`${F.join(" ")}`);
  }
  return (
    B !== C && (P[P.length - 1] += ` ... ${C - A} more columns`),
    R !== T && P.push(`... ${T - _} more rows`),
    P.join(`
${indentData}`)
  );
}
function formatNumber(E, _, A) {
  return (E >= 0 && A ? ` ${formatNumber2(E, _ - 1)}` : formatNumber2(E, _)).padEnd(_);
}
function formatNumber2(E, _) {
  let A = E.toString();
  if (A.length <= _) return A;
  let I = E.toFixed(_);
  if (
    (I.length > _ && (I = E.toFixed(Math.max(0, _ - (I.length - _)))),
    I.length <= _ && !I.startsWith("0.000") && !I.startsWith("-0.000"))
  )
    return I;
  let D = E.toExponential(_);
  return D.length > _ && (D = E.toExponential(Math.max(0, _ - (D.length - _)))), D.slice(0);
}
function installMathOperations(E, _) {
  (E.prototype.add = function (I) {
    return typeof I == "number" ? this.addS(I) : this.addM(I);
  }),
    (E.prototype.addS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) + I);
      return this;
    }),
    (E.prototype.addM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) + I.get(D, T));
      return this;
    }),
    (E.add = function (I, D) {
      return new _(I).add(D);
    }),
    (E.prototype.sub = function (I) {
      return typeof I == "number" ? this.subS(I) : this.subM(I);
    }),
    (E.prototype.subS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) - I);
      return this;
    }),
    (E.prototype.subM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) - I.get(D, T));
      return this;
    }),
    (E.sub = function (I, D) {
      return new _(I).sub(D);
    }),
    (E.prototype.subtract = E.prototype.sub),
    (E.prototype.subtractS = E.prototype.subS),
    (E.prototype.subtractM = E.prototype.subM),
    (E.subtract = E.sub),
    (E.prototype.mul = function (I) {
      return typeof I == "number" ? this.mulS(I) : this.mulM(I);
    }),
    (E.prototype.mulS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) * I);
      return this;
    }),
    (E.prototype.mulM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) * I.get(D, T));
      return this;
    }),
    (E.mul = function (I, D) {
      return new _(I).mul(D);
    }),
    (E.prototype.multiply = E.prototype.mul),
    (E.prototype.multiplyS = E.prototype.mulS),
    (E.prototype.multiplyM = E.prototype.mulM),
    (E.multiply = E.mul),
    (E.prototype.div = function (I) {
      return typeof I == "number" ? this.divS(I) : this.divM(I);
    }),
    (E.prototype.divS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) / I);
      return this;
    }),
    (E.prototype.divM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) / I.get(D, T));
      return this;
    }),
    (E.div = function (I, D) {
      return new _(I).div(D);
    }),
    (E.prototype.divide = E.prototype.div),
    (E.prototype.divideS = E.prototype.divS),
    (E.prototype.divideM = E.prototype.divM),
    (E.divide = E.div),
    (E.prototype.mod = function (I) {
      return typeof I == "number" ? this.modS(I) : this.modM(I);
    }),
    (E.prototype.modS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) % I);
      return this;
    }),
    (E.prototype.modM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) % I.get(D, T));
      return this;
    }),
    (E.mod = function (I, D) {
      return new _(I).mod(D);
    }),
    (E.prototype.modulus = E.prototype.mod),
    (E.prototype.modulusS = E.prototype.modS),
    (E.prototype.modulusM = E.prototype.modM),
    (E.modulus = E.mod),
    (E.prototype.and = function (I) {
      return typeof I == "number" ? this.andS(I) : this.andM(I);
    }),
    (E.prototype.andS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) & I);
      return this;
    }),
    (E.prototype.andM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) & I.get(D, T));
      return this;
    }),
    (E.and = function (I, D) {
      return new _(I).and(D);
    }),
    (E.prototype.or = function (I) {
      return typeof I == "number" ? this.orS(I) : this.orM(I);
    }),
    (E.prototype.orS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) | I);
      return this;
    }),
    (E.prototype.orM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) | I.get(D, T));
      return this;
    }),
    (E.or = function (I, D) {
      return new _(I).or(D);
    }),
    (E.prototype.xor = function (I) {
      return typeof I == "number" ? this.xorS(I) : this.xorM(I);
    }),
    (E.prototype.xorS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) ^ I);
      return this;
    }),
    (E.prototype.xorM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) ^ I.get(D, T));
      return this;
    }),
    (E.xor = function (I, D) {
      return new _(I).xor(D);
    }),
    (E.prototype.leftShift = function (I) {
      return typeof I == "number" ? this.leftShiftS(I) : this.leftShiftM(I);
    }),
    (E.prototype.leftShiftS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) << I);
      return this;
    }),
    (E.prototype.leftShiftM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) << I.get(D, T));
      return this;
    }),
    (E.leftShift = function (I, D) {
      return new _(I).leftShift(D);
    }),
    (E.prototype.signPropagatingRightShift = function (I) {
      return typeof I == "number" ? this.signPropagatingRightShiftS(I) : this.signPropagatingRightShiftM(I);
    }),
    (E.prototype.signPropagatingRightShiftS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) >> I);
      return this;
    }),
    (E.prototype.signPropagatingRightShiftM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) >> I.get(D, T));
      return this;
    }),
    (E.signPropagatingRightShift = function (I, D) {
      return new _(I).signPropagatingRightShift(D);
    }),
    (E.prototype.rightShift = function (I) {
      return typeof I == "number" ? this.rightShiftS(I) : this.rightShiftM(I);
    }),
    (E.prototype.rightShiftS = function (I) {
      for (let D = 0; D < this.rows; D++) for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) >>> I);
      return this;
    }),
    (E.prototype.rightShiftM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, this.get(D, T) >>> I.get(D, T));
      return this;
    }),
    (E.rightShift = function (I, D) {
      return new _(I).rightShift(D);
    }),
    (E.prototype.zeroFillRightShift = E.prototype.rightShift),
    (E.prototype.zeroFillRightShiftS = E.prototype.rightShiftS),
    (E.prototype.zeroFillRightShiftM = E.prototype.rightShiftM),
    (E.zeroFillRightShift = E.rightShift),
    (E.prototype.not = function () {
      for (let I = 0; I < this.rows; I++) for (let D = 0; D < this.columns; D++) this.set(I, D, ~this.get(I, D));
      return this;
    }),
    (E.not = function (I) {
      return new _(I).not();
    }),
    (E.prototype.abs = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.abs(this.get(I, D)));
      return this;
    }),
    (E.abs = function (I) {
      return new _(I).abs();
    }),
    (E.prototype.acos = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.acos(this.get(I, D)));
      return this;
    }),
    (E.acos = function (I) {
      return new _(I).acos();
    }),
    (E.prototype.acosh = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.acosh(this.get(I, D)));
      return this;
    }),
    (E.acosh = function (I) {
      return new _(I).acosh();
    }),
    (E.prototype.asin = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.asin(this.get(I, D)));
      return this;
    }),
    (E.asin = function (I) {
      return new _(I).asin();
    }),
    (E.prototype.asinh = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.asinh(this.get(I, D)));
      return this;
    }),
    (E.asinh = function (I) {
      return new _(I).asinh();
    }),
    (E.prototype.atan = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.atan(this.get(I, D)));
      return this;
    }),
    (E.atan = function (I) {
      return new _(I).atan();
    }),
    (E.prototype.atanh = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.atanh(this.get(I, D)));
      return this;
    }),
    (E.atanh = function (I) {
      return new _(I).atanh();
    }),
    (E.prototype.cbrt = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.cbrt(this.get(I, D)));
      return this;
    }),
    (E.cbrt = function (I) {
      return new _(I).cbrt();
    }),
    (E.prototype.ceil = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.ceil(this.get(I, D)));
      return this;
    }),
    (E.ceil = function (I) {
      return new _(I).ceil();
    }),
    (E.prototype.clz32 = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.clz32(this.get(I, D)));
      return this;
    }),
    (E.clz32 = function (I) {
      return new _(I).clz32();
    }),
    (E.prototype.cos = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.cos(this.get(I, D)));
      return this;
    }),
    (E.cos = function (I) {
      return new _(I).cos();
    }),
    (E.prototype.cosh = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.cosh(this.get(I, D)));
      return this;
    }),
    (E.cosh = function (I) {
      return new _(I).cosh();
    }),
    (E.prototype.exp = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.exp(this.get(I, D)));
      return this;
    }),
    (E.exp = function (I) {
      return new _(I).exp();
    }),
    (E.prototype.expm1 = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.expm1(this.get(I, D)));
      return this;
    }),
    (E.expm1 = function (I) {
      return new _(I).expm1();
    }),
    (E.prototype.floor = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.floor(this.get(I, D)));
      return this;
    }),
    (E.floor = function (I) {
      return new _(I).floor();
    }),
    (E.prototype.fround = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.fround(this.get(I, D)));
      return this;
    }),
    (E.fround = function (I) {
      return new _(I).fround();
    }),
    (E.prototype.log = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.log(this.get(I, D)));
      return this;
    }),
    (E.log = function (I) {
      return new _(I).log();
    }),
    (E.prototype.log1p = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.log1p(this.get(I, D)));
      return this;
    }),
    (E.log1p = function (I) {
      return new _(I).log1p();
    }),
    (E.prototype.log10 = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.log10(this.get(I, D)));
      return this;
    }),
    (E.log10 = function (I) {
      return new _(I).log10();
    }),
    (E.prototype.log2 = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.log2(this.get(I, D)));
      return this;
    }),
    (E.log2 = function (I) {
      return new _(I).log2();
    }),
    (E.prototype.round = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.round(this.get(I, D)));
      return this;
    }),
    (E.round = function (I) {
      return new _(I).round();
    }),
    (E.prototype.sign = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.sign(this.get(I, D)));
      return this;
    }),
    (E.sign = function (I) {
      return new _(I).sign();
    }),
    (E.prototype.sin = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.sin(this.get(I, D)));
      return this;
    }),
    (E.sin = function (I) {
      return new _(I).sin();
    }),
    (E.prototype.sinh = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.sinh(this.get(I, D)));
      return this;
    }),
    (E.sinh = function (I) {
      return new _(I).sinh();
    }),
    (E.prototype.sqrt = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.sqrt(this.get(I, D)));
      return this;
    }),
    (E.sqrt = function (I) {
      return new _(I).sqrt();
    }),
    (E.prototype.tan = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.tan(this.get(I, D)));
      return this;
    }),
    (E.tan = function (I) {
      return new _(I).tan();
    }),
    (E.prototype.tanh = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.tanh(this.get(I, D)));
      return this;
    }),
    (E.tanh = function (I) {
      return new _(I).tanh();
    }),
    (E.prototype.trunc = function () {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) this.set(I, D, Math.trunc(this.get(I, D)));
      return this;
    }),
    (E.trunc = function (I) {
      return new _(I).trunc();
    }),
    (E.pow = function (I, D) {
      return new _(I).pow(D);
    }),
    (E.prototype.pow = function (I) {
      return typeof I == "number" ? this.powS(I) : this.powM(I);
    }),
    (E.prototype.powS = function (I) {
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, Math.pow(this.get(D, T), I));
      return this;
    }),
    (E.prototype.powM = function (I) {
      if (((I = _.checkMatrix(I)), this.rows !== I.rows || this.columns !== I.columns))
        throw new RangeError("Matrices dimensions must be equal");
      for (let D = 0; D < this.rows; D++)
        for (let T = 0; T < this.columns; T++) this.set(D, T, Math.pow(this.get(D, T), I.get(D, T)));
      return this;
    });
}
function checkRowIndex(E, _, A) {
  let I = A ? E.rows : E.rows - 1;
  if (_ < 0 || _ > I) throw new RangeError("Row index out of range");
}
function checkColumnIndex(E, _, A) {
  let I = A ? E.columns : E.columns - 1;
  if (_ < 0 || _ > I) throw new RangeError("Column index out of range");
}
function checkRowVector(E, _) {
  if ((_.to1DArray && (_ = _.to1DArray()), _.length !== E.columns))
    throw new RangeError("vector size must be the same as the number of columns");
  return _;
}
function checkColumnVector(E, _) {
  if ((_.to1DArray && (_ = _.to1DArray()), _.length !== E.rows))
    throw new RangeError("vector size must be the same as the number of rows");
  return _;
}
function checkRowIndices(E, _) {
  if (!isAnyArray(_)) throw new TypeError("row indices must be an array");
  for (let A = 0; A < _.length; A++)
    if (_[A] < 0 || _[A] >= E.rows) throw new RangeError("row indices are out of range");
}
function checkColumnIndices(E, _) {
  if (!isAnyArray(_)) throw new TypeError("column indices must be an array");
  for (let A = 0; A < _.length; A++)
    if (_[A] < 0 || _[A] >= E.columns) throw new RangeError("column indices are out of range");
}
function checkRange(E, _, A, I, D) {
  if (arguments.length !== 5) throw new RangeError("expected 4 arguments");
  if (
    (checkNumber("startRow", _),
    checkNumber("endRow", A),
    checkNumber("startColumn", I),
    checkNumber("endColumn", D),
    _ > A ||
      I > D ||
      _ < 0 ||
      _ >= E.rows ||
      A < 0 ||
      A >= E.rows ||
      I < 0 ||
      I >= E.columns ||
      D < 0 ||
      D >= E.columns)
  )
    throw new RangeError("Submatrix indices are out of range");
}
function newArray$1(E, _ = 0) {
  let A = [];
  for (let I = 0; I < E; I++) A.push(_);
  return A;
}
function checkNumber(E, _) {
  if (typeof _ != "number") throw new TypeError(`${E} must be a number`);
}
function checkNonEmpty(E) {
  if (E.isEmpty()) throw new Error("Empty matrix has no elements to index");
}
function sumByRow(E) {
  let _ = newArray$1(E.rows);
  for (let A = 0; A < E.rows; ++A) for (let I = 0; I < E.columns; ++I) _[A] += E.get(A, I);
  return _;
}
function sumByColumn(E) {
  let _ = newArray$1(E.columns);
  for (let A = 0; A < E.rows; ++A) for (let I = 0; I < E.columns; ++I) _[I] += E.get(A, I);
  return _;
}
function sumAll(E) {
  let _ = 0;
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) _ += E.get(A, I);
  return _;
}
function productByRow(E) {
  let _ = newArray$1(E.rows, 1);
  for (let A = 0; A < E.rows; ++A) for (let I = 0; I < E.columns; ++I) _[A] *= E.get(A, I);
  return _;
}
function productByColumn(E) {
  let _ = newArray$1(E.columns, 1);
  for (let A = 0; A < E.rows; ++A) for (let I = 0; I < E.columns; ++I) _[I] *= E.get(A, I);
  return _;
}
function productAll(E) {
  let _ = 1;
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) _ *= E.get(A, I);
  return _;
}
function varianceByRow(E, _, A) {
  const I = E.rows,
    D = E.columns,
    T = [];
  for (let C = 0; C < I; C++) {
    let R = 0,
      B = 0,
      P = 0;
    for (let O = 0; O < D; O++) (P = E.get(C, O) - A[C]), (R += P), (B += P * P);
    _ ? T.push((B - (R * R) / D) / (D - 1)) : T.push((B - (R * R) / D) / D);
  }
  return T;
}
function varianceByColumn(E, _, A) {
  const I = E.rows,
    D = E.columns,
    T = [];
  for (let C = 0; C < D; C++) {
    let R = 0,
      B = 0,
      P = 0;
    for (let O = 0; O < I; O++) (P = E.get(O, C) - A[C]), (R += P), (B += P * P);
    _ ? T.push((B - (R * R) / I) / (I - 1)) : T.push((B - (R * R) / I) / I);
  }
  return T;
}
function varianceAll(E, _, A) {
  const I = E.rows,
    D = E.columns,
    T = I * D;
  let C = 0,
    R = 0,
    B = 0;
  for (let P = 0; P < I; P++) for (let O = 0; O < D; O++) (B = E.get(P, O) - A), (C += B), (R += B * B);
  return _ ? (R - (C * C) / T) / (T - 1) : (R - (C * C) / T) / T;
}
function centerByRow(E, _) {
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) E.set(A, I, E.get(A, I) - _[A]);
}
function centerByColumn(E, _) {
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) E.set(A, I, E.get(A, I) - _[I]);
}
function centerAll(E, _) {
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) E.set(A, I, E.get(A, I) - _);
}
function getScaleByRow(E) {
  const _ = [];
  for (let A = 0; A < E.rows; A++) {
    let I = 0;
    for (let D = 0; D < E.columns; D++) I += Math.pow(E.get(A, D), 2) / (E.columns - 1);
    _.push(Math.sqrt(I));
  }
  return _;
}
function scaleByRow(E, _) {
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) E.set(A, I, E.get(A, I) / _[A]);
}
function getScaleByColumn(E) {
  const _ = [];
  for (let A = 0; A < E.columns; A++) {
    let I = 0;
    for (let D = 0; D < E.rows; D++) I += Math.pow(E.get(D, A), 2) / (E.rows - 1);
    _.push(Math.sqrt(I));
  }
  return _;
}
function scaleByColumn(E, _) {
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) E.set(A, I, E.get(A, I) / _[I]);
}
function getScaleAll(E) {
  const _ = E.size - 1;
  let A = 0;
  for (let I = 0; I < E.columns; I++) for (let D = 0; D < E.rows; D++) A += Math.pow(E.get(D, I), 2) / _;
  return Math.sqrt(A);
}
function scaleAll(E, _) {
  for (let A = 0; A < E.rows; A++) for (let I = 0; I < E.columns; I++) E.set(A, I, E.get(A, I) / _);
}
class AbstractMatrix {
  static from1DArray(_, A, I) {
    if (_ * A !== I.length) throw new RangeError("data length does not match given dimensions");
    let T = new Matrix$2(_, A);
    for (let C = 0; C < _; C++) for (let R = 0; R < A; R++) T.set(C, R, I[C * A + R]);
    return T;
  }
  static rowVector(_) {
    let A = new Matrix$2(1, _.length);
    for (let I = 0; I < _.length; I++) A.set(0, I, _[I]);
    return A;
  }
  static columnVector(_) {
    let A = new Matrix$2(_.length, 1);
    for (let I = 0; I < _.length; I++) A.set(I, 0, _[I]);
    return A;
  }
  static zeros(_, A) {
    return new Matrix$2(_, A);
  }
  static ones(_, A) {
    return new Matrix$2(_, A).fill(1);
  }
  static rand(_, A, I = {}) {
    if (typeof I != "object") throw new TypeError("options must be an object");
    const { random: D = Math.random } = I;
    let T = new Matrix$2(_, A);
    for (let C = 0; C < _; C++) for (let R = 0; R < A; R++) T.set(C, R, D());
    return T;
  }
  static randInt(_, A, I = {}) {
    if (typeof I != "object") throw new TypeError("options must be an object");
    const { min: D = 0, max: T = 1e3, random: C = Math.random } = I;
    if (!Number.isInteger(D)) throw new TypeError("min must be an integer");
    if (!Number.isInteger(T)) throw new TypeError("max must be an integer");
    if (D >= T) throw new RangeError("min must be smaller than max");
    let R = T - D,
      B = new Matrix$2(_, A);
    for (let P = 0; P < _; P++)
      for (let O = 0; O < A; O++) {
        let F = D + Math.round(C() * R);
        B.set(P, O, F);
      }
    return B;
  }
  static eye(_, A, I) {
    A === void 0 && (A = _), I === void 0 && (I = 1);
    let D = Math.min(_, A),
      T = this.zeros(_, A);
    for (let C = 0; C < D; C++) T.set(C, C, I);
    return T;
  }
  static diag(_, A, I) {
    let D = _.length;
    A === void 0 && (A = D), I === void 0 && (I = A);
    let T = Math.min(D, A, I),
      C = this.zeros(A, I);
    for (let R = 0; R < T; R++) C.set(R, R, _[R]);
    return C;
  }
  static min(_, A) {
    (_ = this.checkMatrix(_)), (A = this.checkMatrix(A));
    let I = _.rows,
      D = _.columns,
      T = new Matrix$2(I, D);
    for (let C = 0; C < I; C++) for (let R = 0; R < D; R++) T.set(C, R, Math.min(_.get(C, R), A.get(C, R)));
    return T;
  }
  static max(_, A) {
    (_ = this.checkMatrix(_)), (A = this.checkMatrix(A));
    let I = _.rows,
      D = _.columns,
      T = new this(I, D);
    for (let C = 0; C < I; C++) for (let R = 0; R < D; R++) T.set(C, R, Math.max(_.get(C, R), A.get(C, R)));
    return T;
  }
  static checkMatrix(_) {
    return AbstractMatrix.isMatrix(_) ? _ : new Matrix$2(_);
  }
  static isMatrix(_) {
    return _ != null && _.klass === "Matrix";
  }
  get size() {
    return this.rows * this.columns;
  }
  apply(_) {
    if (typeof _ != "function") throw new TypeError("callback must be a function");
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) _.call(this, A, I);
    return this;
  }
  to1DArray() {
    let _ = [];
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) _.push(this.get(A, I));
    return _;
  }
  to2DArray() {
    let _ = [];
    for (let A = 0; A < this.rows; A++) {
      _.push([]);
      for (let I = 0; I < this.columns; I++) _[A].push(this.get(A, I));
    }
    return _;
  }
  toJSON() {
    return this.to2DArray();
  }
  isRowVector() {
    return this.rows === 1;
  }
  isColumnVector() {
    return this.columns === 1;
  }
  isVector() {
    return this.rows === 1 || this.columns === 1;
  }
  isSquare() {
    return this.rows === this.columns;
  }
  isEmpty() {
    return this.rows === 0 || this.columns === 0;
  }
  isSymmetric() {
    if (this.isSquare()) {
      for (let _ = 0; _ < this.rows; _++) for (let A = 0; A <= _; A++) if (this.get(_, A) !== this.get(A, _)) return !1;
      return !0;
    }
    return !1;
  }
  isEchelonForm() {
    let _ = 0,
      A = 0,
      I = -1,
      D = !0,
      T = !1;
    for (; _ < this.rows && D; ) {
      for (A = 0, T = !1; A < this.columns && T === !1; )
        this.get(_, A) === 0 ? A++ : this.get(_, A) === 1 && A > I ? ((T = !0), (I = A)) : ((D = !1), (T = !0));
      _++;
    }
    return D;
  }
  isReducedEchelonForm() {
    let _ = 0,
      A = 0,
      I = -1,
      D = !0,
      T = !1;
    for (; _ < this.rows && D; ) {
      for (A = 0, T = !1; A < this.columns && T === !1; )
        this.get(_, A) === 0 ? A++ : this.get(_, A) === 1 && A > I ? ((T = !0), (I = A)) : ((D = !1), (T = !0));
      for (let C = A + 1; C < this.rows; C++) this.get(_, C) !== 0 && (D = !1);
      _++;
    }
    return D;
  }
  echelonForm() {
    let _ = this.clone(),
      A = 0,
      I = 0;
    for (; A < _.rows && I < _.columns; ) {
      let D = A;
      for (let T = A; T < _.rows; T++) _.get(T, I) > _.get(D, I) && (D = T);
      if (_.get(D, I) === 0) I++;
      else {
        _.swapRows(A, D);
        let T = _.get(A, I);
        for (let C = I; C < _.columns; C++) _.set(A, C, _.get(A, C) / T);
        for (let C = A + 1; C < _.rows; C++) {
          let R = _.get(C, I) / _.get(A, I);
          _.set(C, I, 0);
          for (let B = I + 1; B < _.columns; B++) _.set(C, B, _.get(C, B) - _.get(A, B) * R);
        }
        A++, I++;
      }
    }
    return _;
  }
  reducedEchelonForm() {
    let _ = this.echelonForm(),
      A = _.columns,
      I = _.rows,
      D = I - 1;
    for (; D >= 0; )
      if (_.maxRow(D) === 0) D--;
      else {
        let T = 0,
          C = !1;
        for (; T < I && C === !1; ) _.get(D, T) === 1 ? (C = !0) : T++;
        for (let R = 0; R < D; R++) {
          let B = _.get(R, T);
          for (let P = T; P < A; P++) {
            let O = _.get(R, P) - B * _.get(D, P);
            _.set(R, P, O);
          }
        }
        D--;
      }
    return _;
  }
  set() {
    throw new Error("set method is unimplemented");
  }
  get() {
    throw new Error("get method is unimplemented");
  }
  repeat(_ = {}) {
    if (typeof _ != "object") throw new TypeError("options must be an object");
    const { rows: A = 1, columns: I = 1 } = _;
    if (!Number.isInteger(A) || A <= 0) throw new TypeError("rows must be a positive integer");
    if (!Number.isInteger(I) || I <= 0) throw new TypeError("columns must be a positive integer");
    let D = new Matrix$2(this.rows * A, this.columns * I);
    for (let T = 0; T < A; T++) for (let C = 0; C < I; C++) D.setSubMatrix(this, this.rows * T, this.columns * C);
    return D;
  }
  fill(_) {
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, _);
    return this;
  }
  neg() {
    return this.mulS(-1);
  }
  getRow(_) {
    checkRowIndex(this, _);
    let A = [];
    for (let I = 0; I < this.columns; I++) A.push(this.get(_, I));
    return A;
  }
  getRowVector(_) {
    return Matrix$2.rowVector(this.getRow(_));
  }
  setRow(_, A) {
    checkRowIndex(this, _), (A = checkRowVector(this, A));
    for (let I = 0; I < this.columns; I++) this.set(_, I, A[I]);
    return this;
  }
  swapRows(_, A) {
    checkRowIndex(this, _), checkRowIndex(this, A);
    for (let I = 0; I < this.columns; I++) {
      let D = this.get(_, I);
      this.set(_, I, this.get(A, I)), this.set(A, I, D);
    }
    return this;
  }
  getColumn(_) {
    checkColumnIndex(this, _);
    let A = [];
    for (let I = 0; I < this.rows; I++) A.push(this.get(I, _));
    return A;
  }
  getColumnVector(_) {
    return Matrix$2.columnVector(this.getColumn(_));
  }
  setColumn(_, A) {
    checkColumnIndex(this, _), (A = checkColumnVector(this, A));
    for (let I = 0; I < this.rows; I++) this.set(I, _, A[I]);
    return this;
  }
  swapColumns(_, A) {
    checkColumnIndex(this, _), checkColumnIndex(this, A);
    for (let I = 0; I < this.rows; I++) {
      let D = this.get(I, _);
      this.set(I, _, this.get(I, A)), this.set(I, A, D);
    }
    return this;
  }
  addRowVector(_) {
    _ = checkRowVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) + _[I]);
    return this;
  }
  subRowVector(_) {
    _ = checkRowVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) - _[I]);
    return this;
  }
  mulRowVector(_) {
    _ = checkRowVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) * _[I]);
    return this;
  }
  divRowVector(_) {
    _ = checkRowVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) / _[I]);
    return this;
  }
  addColumnVector(_) {
    _ = checkColumnVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) + _[A]);
    return this;
  }
  subColumnVector(_) {
    _ = checkColumnVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) - _[A]);
    return this;
  }
  mulColumnVector(_) {
    _ = checkColumnVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) * _[A]);
    return this;
  }
  divColumnVector(_) {
    _ = checkColumnVector(this, _);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) this.set(A, I, this.get(A, I) / _[A]);
    return this;
  }
  mulRow(_, A) {
    checkRowIndex(this, _);
    for (let I = 0; I < this.columns; I++) this.set(_, I, this.get(_, I) * A);
    return this;
  }
  mulColumn(_, A) {
    checkColumnIndex(this, _);
    for (let I = 0; I < this.rows; I++) this.set(I, _, this.get(I, _) * A);
    return this;
  }
  max(_) {
    if (this.isEmpty()) return NaN;
    switch (_) {
      case "row": {
        const A = new Array(this.rows).fill(Number.NEGATIVE_INFINITY);
        for (let I = 0; I < this.rows; I++)
          for (let D = 0; D < this.columns; D++) this.get(I, D) > A[I] && (A[I] = this.get(I, D));
        return A;
      }
      case "column": {
        const A = new Array(this.columns).fill(Number.NEGATIVE_INFINITY);
        for (let I = 0; I < this.rows; I++)
          for (let D = 0; D < this.columns; D++) this.get(I, D) > A[D] && (A[D] = this.get(I, D));
        return A;
      }
      case void 0: {
        let A = this.get(0, 0);
        for (let I = 0; I < this.rows; I++)
          for (let D = 0; D < this.columns; D++) this.get(I, D) > A && (A = this.get(I, D));
        return A;
      }
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  maxIndex() {
    checkNonEmpty(this);
    let _ = this.get(0, 0),
      A = [0, 0];
    for (let I = 0; I < this.rows; I++)
      for (let D = 0; D < this.columns; D++) this.get(I, D) > _ && ((_ = this.get(I, D)), (A[0] = I), (A[1] = D));
    return A;
  }
  min(_) {
    if (this.isEmpty()) return NaN;
    switch (_) {
      case "row": {
        const A = new Array(this.rows).fill(Number.POSITIVE_INFINITY);
        for (let I = 0; I < this.rows; I++)
          for (let D = 0; D < this.columns; D++) this.get(I, D) < A[I] && (A[I] = this.get(I, D));
        return A;
      }
      case "column": {
        const A = new Array(this.columns).fill(Number.POSITIVE_INFINITY);
        for (let I = 0; I < this.rows; I++)
          for (let D = 0; D < this.columns; D++) this.get(I, D) < A[D] && (A[D] = this.get(I, D));
        return A;
      }
      case void 0: {
        let A = this.get(0, 0);
        for (let I = 0; I < this.rows; I++)
          for (let D = 0; D < this.columns; D++) this.get(I, D) < A && (A = this.get(I, D));
        return A;
      }
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  minIndex() {
    checkNonEmpty(this);
    let _ = this.get(0, 0),
      A = [0, 0];
    for (let I = 0; I < this.rows; I++)
      for (let D = 0; D < this.columns; D++) this.get(I, D) < _ && ((_ = this.get(I, D)), (A[0] = I), (A[1] = D));
    return A;
  }
  maxRow(_) {
    if ((checkRowIndex(this, _), this.isEmpty())) return NaN;
    let A = this.get(_, 0);
    for (let I = 1; I < this.columns; I++) this.get(_, I) > A && (A = this.get(_, I));
    return A;
  }
  maxRowIndex(_) {
    checkRowIndex(this, _), checkNonEmpty(this);
    let A = this.get(_, 0),
      I = [_, 0];
    for (let D = 1; D < this.columns; D++) this.get(_, D) > A && ((A = this.get(_, D)), (I[1] = D));
    return I;
  }
  minRow(_) {
    if ((checkRowIndex(this, _), this.isEmpty())) return NaN;
    let A = this.get(_, 0);
    for (let I = 1; I < this.columns; I++) this.get(_, I) < A && (A = this.get(_, I));
    return A;
  }
  minRowIndex(_) {
    checkRowIndex(this, _), checkNonEmpty(this);
    let A = this.get(_, 0),
      I = [_, 0];
    for (let D = 1; D < this.columns; D++) this.get(_, D) < A && ((A = this.get(_, D)), (I[1] = D));
    return I;
  }
  maxColumn(_) {
    if ((checkColumnIndex(this, _), this.isEmpty())) return NaN;
    let A = this.get(0, _);
    for (let I = 1; I < this.rows; I++) this.get(I, _) > A && (A = this.get(I, _));
    return A;
  }
  maxColumnIndex(_) {
    checkColumnIndex(this, _), checkNonEmpty(this);
    let A = this.get(0, _),
      I = [0, _];
    for (let D = 1; D < this.rows; D++) this.get(D, _) > A && ((A = this.get(D, _)), (I[0] = D));
    return I;
  }
  minColumn(_) {
    if ((checkColumnIndex(this, _), this.isEmpty())) return NaN;
    let A = this.get(0, _);
    for (let I = 1; I < this.rows; I++) this.get(I, _) < A && (A = this.get(I, _));
    return A;
  }
  minColumnIndex(_) {
    checkColumnIndex(this, _), checkNonEmpty(this);
    let A = this.get(0, _),
      I = [0, _];
    for (let D = 1; D < this.rows; D++) this.get(D, _) < A && ((A = this.get(D, _)), (I[0] = D));
    return I;
  }
  diag() {
    let _ = Math.min(this.rows, this.columns),
      A = [];
    for (let I = 0; I < _; I++) A.push(this.get(I, I));
    return A;
  }
  norm(_ = "frobenius") {
    let A = 0;
    if (_ === "max") return this.max();
    if (_ === "frobenius") {
      for (let I = 0; I < this.rows; I++)
        for (let D = 0; D < this.columns; D++) A = A + this.get(I, D) * this.get(I, D);
      return Math.sqrt(A);
    } else throw new RangeError(`unknown norm type: ${_}`);
  }
  cumulativeSum() {
    let _ = 0;
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) (_ += this.get(A, I)), this.set(A, I, _);
    return this;
  }
  dot(_) {
    AbstractMatrix.isMatrix(_) && (_ = _.to1DArray());
    let A = this.to1DArray();
    if (A.length !== _.length) throw new RangeError("vectors do not have the same size");
    let I = 0;
    for (let D = 0; D < A.length; D++) I += A[D] * _[D];
    return I;
  }
  mmul(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = this.rows,
      I = this.columns,
      D = _.columns,
      T = new Matrix$2(A, D),
      C = new Float64Array(I);
    for (let R = 0; R < D; R++) {
      for (let B = 0; B < I; B++) C[B] = _.get(B, R);
      for (let B = 0; B < A; B++) {
        let P = 0;
        for (let O = 0; O < I; O++) P += this.get(B, O) * C[O];
        T.set(B, R, P);
      }
    }
    return T;
  }
  strassen2x2(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = new Matrix$2(2, 2);
    const I = this.get(0, 0),
      D = _.get(0, 0),
      T = this.get(0, 1),
      C = _.get(0, 1),
      R = this.get(1, 0),
      B = _.get(1, 0),
      P = this.get(1, 1),
      O = _.get(1, 1),
      F = (I + P) * (D + O),
      L = (R + P) * D,
      U = I * (C - O),
      z = P * (B - D),
      V = (I + T) * O,
      X = (R - I) * (D + C),
      G = (T - P) * (B + O),
      Z = F + z - V + G,
      Y = U + V,
      q = L + z,
      W = F - L + U + X;
    return A.set(0, 0, Z), A.set(0, 1, Y), A.set(1, 0, q), A.set(1, 1, W), A;
  }
  strassen3x3(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = new Matrix$2(3, 3);
    const I = this.get(0, 0),
      D = this.get(0, 1),
      T = this.get(0, 2),
      C = this.get(1, 0),
      R = this.get(1, 1),
      B = this.get(1, 2),
      P = this.get(2, 0),
      O = this.get(2, 1),
      F = this.get(2, 2),
      L = _.get(0, 0),
      U = _.get(0, 1),
      z = _.get(0, 2),
      V = _.get(1, 0),
      X = _.get(1, 1),
      G = _.get(1, 2),
      Z = _.get(2, 0),
      Y = _.get(2, 1),
      q = _.get(2, 2),
      W = (I + D + T - C - R - O - F) * X,
      ee = (I - C) * (-U + X),
      te = R * (-L + U + V - X - G - Z + q),
      Q = (-I + C + R) * (L - U + X),
      J = (C + R) * (-L + U),
      K = I * L,
      ne = (-I + P + O) * (L - z + G),
      re = (-I + P) * (z - G),
      ie = (P + O) * (-L + z),
      se = (I + D + T - R - B - P - O) * G,
      oe = O * (-L + z + V - X - G - Z + Y),
      _e = (-T + O + F) * (X + Z - Y),
      ve = (T - F) * (X - Y),
      fe = T * Z,
      ke = (O + F) * (-Z + Y),
      me = (-T + R + B) * (G + Z - q),
      Ee = (T - B) * (G - q),
      Se = (R + B) * (-Z + q),
      ue = D * V,
      xe = B * Y,
      pe = C * z,
      we = P * U,
      Ne = F * q,
      Ce = K + fe + ue,
      De = W + Q + J + K + _e + fe + ke,
      Ue = K + ne + ie + se + fe + me + Se,
      Oe = ee + te + Q + K + fe + me + Ee,
      ge = ee + Q + J + K + xe,
      Ke = fe + me + Ee + Se + pe,
      Ie = K + ne + re + oe + _e + ve + fe,
      ye = _e + ve + fe + ke + we,
      Re = K + ne + re + ie + Ne;
    return (
      A.set(0, 0, Ce),
      A.set(0, 1, De),
      A.set(0, 2, Ue),
      A.set(1, 0, Oe),
      A.set(1, 1, ge),
      A.set(1, 2, Ke),
      A.set(2, 0, Ie),
      A.set(2, 1, ye),
      A.set(2, 2, Re),
      A
    );
  }
  mmulStrassen(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = this.clone(),
      I = A.rows,
      D = A.columns,
      T = _.rows,
      C = _.columns;
    D !== T && console.warn(`Multiplying ${I} x ${D} and ${T} x ${C} matrix: dimensions do not match.`);
    function R(F, L, U) {
      let z = F.rows,
        V = F.columns;
      if (z === L && V === U) return F;
      {
        let X = AbstractMatrix.zeros(L, U);
        return (X = X.setSubMatrix(F, 0, 0)), X;
      }
    }
    let B = Math.max(I, T),
      P = Math.max(D, C);
    (A = R(A, B, P)), (_ = R(_, B, P));
    function O(F, L, U, z) {
      if (U <= 512 || z <= 512) return F.mmul(L);
      U % 2 === 1 && z % 2 === 1
        ? ((F = R(F, U + 1, z + 1)), (L = R(L, U + 1, z + 1)))
        : U % 2 === 1
          ? ((F = R(F, U + 1, z)), (L = R(L, U + 1, z)))
          : z % 2 === 1 && ((F = R(F, U, z + 1)), (L = R(L, U, z + 1)));
      let V = parseInt(F.rows / 2, 10),
        X = parseInt(F.columns / 2, 10),
        G = F.subMatrix(0, V - 1, 0, X - 1),
        Z = L.subMatrix(0, V - 1, 0, X - 1),
        Y = F.subMatrix(0, V - 1, X, F.columns - 1),
        q = L.subMatrix(0, V - 1, X, L.columns - 1),
        W = F.subMatrix(V, F.rows - 1, 0, X - 1),
        ee = L.subMatrix(V, L.rows - 1, 0, X - 1),
        te = F.subMatrix(V, F.rows - 1, X, F.columns - 1),
        Q = L.subMatrix(V, L.rows - 1, X, L.columns - 1),
        J = O(AbstractMatrix.add(G, te), AbstractMatrix.add(Z, Q), V, X),
        K = O(AbstractMatrix.add(W, te), Z, V, X),
        ne = O(G, AbstractMatrix.sub(q, Q), V, X),
        re = O(te, AbstractMatrix.sub(ee, Z), V, X),
        ie = O(AbstractMatrix.add(G, Y), Q, V, X),
        se = O(AbstractMatrix.sub(W, G), AbstractMatrix.add(Z, q), V, X),
        oe = O(AbstractMatrix.sub(Y, te), AbstractMatrix.add(ee, Q), V, X),
        _e = AbstractMatrix.add(J, re);
      _e.sub(ie), _e.add(oe);
      let ve = AbstractMatrix.add(ne, ie),
        fe = AbstractMatrix.add(K, re),
        ke = AbstractMatrix.sub(J, K);
      ke.add(ne), ke.add(se);
      let me = AbstractMatrix.zeros(2 * _e.rows, 2 * _e.columns);
      return (
        (me = me.setSubMatrix(_e, 0, 0)),
        (me = me.setSubMatrix(ve, _e.rows, 0)),
        (me = me.setSubMatrix(fe, 0, _e.columns)),
        (me = me.setSubMatrix(ke, _e.rows, _e.columns)),
        me.subMatrix(0, U - 1, 0, z - 1)
      );
    }
    return O(A, _, B, P);
  }
  scaleRows(_ = {}) {
    if (typeof _ != "object") throw new TypeError("options must be an object");
    const { min: A = 0, max: I = 1 } = _;
    if (!Number.isFinite(A)) throw new TypeError("min must be a number");
    if (!Number.isFinite(I)) throw new TypeError("max must be a number");
    if (A >= I) throw new RangeError("min must be smaller than max");
    let D = new Matrix$2(this.rows, this.columns);
    for (let T = 0; T < this.rows; T++) {
      const C = this.getRow(T);
      C.length > 0 && rescale(C, { min: A, max: I, output: C }), D.setRow(T, C);
    }
    return D;
  }
  scaleColumns(_ = {}) {
    if (typeof _ != "object") throw new TypeError("options must be an object");
    const { min: A = 0, max: I = 1 } = _;
    if (!Number.isFinite(A)) throw new TypeError("min must be a number");
    if (!Number.isFinite(I)) throw new TypeError("max must be a number");
    if (A >= I) throw new RangeError("min must be smaller than max");
    let D = new Matrix$2(this.rows, this.columns);
    for (let T = 0; T < this.columns; T++) {
      const C = this.getColumn(T);
      C.length && rescale(C, { min: A, max: I, output: C }), D.setColumn(T, C);
    }
    return D;
  }
  flipRows() {
    const _ = Math.ceil(this.columns / 2);
    for (let A = 0; A < this.rows; A++)
      for (let I = 0; I < _; I++) {
        let D = this.get(A, I),
          T = this.get(A, this.columns - 1 - I);
        this.set(A, I, T), this.set(A, this.columns - 1 - I, D);
      }
    return this;
  }
  flipColumns() {
    const _ = Math.ceil(this.rows / 2);
    for (let A = 0; A < this.columns; A++)
      for (let I = 0; I < _; I++) {
        let D = this.get(I, A),
          T = this.get(this.rows - 1 - I, A);
        this.set(I, A, T), this.set(this.rows - 1 - I, A, D);
      }
    return this;
  }
  kroneckerProduct(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = this.rows,
      I = this.columns,
      D = _.rows,
      T = _.columns,
      C = new Matrix$2(A * D, I * T);
    for (let R = 0; R < A; R++)
      for (let B = 0; B < I; B++)
        for (let P = 0; P < D; P++)
          for (let O = 0; O < T; O++) C.set(D * R + P, T * B + O, this.get(R, B) * _.get(P, O));
    return C;
  }
  kroneckerSum(_) {
    if (((_ = Matrix$2.checkMatrix(_)), !this.isSquare() || !_.isSquare()))
      throw new Error("Kronecker Sum needs two Square Matrices");
    let A = this.rows,
      I = _.rows,
      D = this.kroneckerProduct(Matrix$2.eye(I, I)),
      T = Matrix$2.eye(A, A).kroneckerProduct(_);
    return D.add(T);
  }
  transpose() {
    let _ = new Matrix$2(this.columns, this.rows);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) _.set(I, A, this.get(A, I));
    return _;
  }
  sortRows(_ = compareNumbers) {
    for (let A = 0; A < this.rows; A++) this.setRow(A, this.getRow(A).sort(_));
    return this;
  }
  sortColumns(_ = compareNumbers) {
    for (let A = 0; A < this.columns; A++) this.setColumn(A, this.getColumn(A).sort(_));
    return this;
  }
  subMatrix(_, A, I, D) {
    checkRange(this, _, A, I, D);
    let T = new Matrix$2(A - _ + 1, D - I + 1);
    for (let C = _; C <= A; C++) for (let R = I; R <= D; R++) T.set(C - _, R - I, this.get(C, R));
    return T;
  }
  subMatrixRow(_, A, I) {
    if (
      (A === void 0 && (A = 0),
      I === void 0 && (I = this.columns - 1),
      A > I || A < 0 || A >= this.columns || I < 0 || I >= this.columns)
    )
      throw new RangeError("Argument out of range");
    let D = new Matrix$2(_.length, I - A + 1);
    for (let T = 0; T < _.length; T++)
      for (let C = A; C <= I; C++) {
        if (_[T] < 0 || _[T] >= this.rows) throw new RangeError(`Row index out of range: ${_[T]}`);
        D.set(T, C - A, this.get(_[T], C));
      }
    return D;
  }
  subMatrixColumn(_, A, I) {
    if (
      (A === void 0 && (A = 0),
      I === void 0 && (I = this.rows - 1),
      A > I || A < 0 || A >= this.rows || I < 0 || I >= this.rows)
    )
      throw new RangeError("Argument out of range");
    let D = new Matrix$2(I - A + 1, _.length);
    for (let T = 0; T < _.length; T++)
      for (let C = A; C <= I; C++) {
        if (_[T] < 0 || _[T] >= this.columns) throw new RangeError(`Column index out of range: ${_[T]}`);
        D.set(C - A, T, this.get(C, _[T]));
      }
    return D;
  }
  setSubMatrix(_, A, I) {
    if (((_ = Matrix$2.checkMatrix(_)), _.isEmpty())) return this;
    let D = A + _.rows - 1,
      T = I + _.columns - 1;
    checkRange(this, A, D, I, T);
    for (let C = 0; C < _.rows; C++) for (let R = 0; R < _.columns; R++) this.set(A + C, I + R, _.get(C, R));
    return this;
  }
  selection(_, A) {
    checkRowIndices(this, _), checkColumnIndices(this, A);
    let I = new Matrix$2(_.length, A.length);
    for (let D = 0; D < _.length; D++) {
      let T = _[D];
      for (let C = 0; C < A.length; C++) {
        let R = A[C];
        I.set(D, C, this.get(T, R));
      }
    }
    return I;
  }
  trace() {
    let _ = Math.min(this.rows, this.columns),
      A = 0;
    for (let I = 0; I < _; I++) A += this.get(I, I);
    return A;
  }
  clone() {
    let _ = new Matrix$2(this.rows, this.columns);
    for (let A = 0; A < this.rows; A++) for (let I = 0; I < this.columns; I++) _.set(A, I, this.get(A, I));
    return _;
  }
  sum(_) {
    switch (_) {
      case "row":
        return sumByRow(this);
      case "column":
        return sumByColumn(this);
      case void 0:
        return sumAll(this);
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  product(_) {
    switch (_) {
      case "row":
        return productByRow(this);
      case "column":
        return productByColumn(this);
      case void 0:
        return productAll(this);
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  mean(_) {
    const A = this.sum(_);
    switch (_) {
      case "row": {
        for (let I = 0; I < this.rows; I++) A[I] /= this.columns;
        return A;
      }
      case "column": {
        for (let I = 0; I < this.columns; I++) A[I] /= this.rows;
        return A;
      }
      case void 0:
        return A / this.size;
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  variance(_, A = {}) {
    if ((typeof _ == "object" && ((A = _), (_ = void 0)), typeof A != "object"))
      throw new TypeError("options must be an object");
    const { unbiased: I = !0, mean: D = this.mean(_) } = A;
    if (typeof I != "boolean") throw new TypeError("unbiased must be a boolean");
    switch (_) {
      case "row": {
        if (!isAnyArray(D)) throw new TypeError("mean must be an array");
        return varianceByRow(this, I, D);
      }
      case "column": {
        if (!isAnyArray(D)) throw new TypeError("mean must be an array");
        return varianceByColumn(this, I, D);
      }
      case void 0: {
        if (typeof D != "number") throw new TypeError("mean must be a number");
        return varianceAll(this, I, D);
      }
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  standardDeviation(_, A) {
    typeof _ == "object" && ((A = _), (_ = void 0));
    const I = this.variance(_, A);
    if (_ === void 0) return Math.sqrt(I);
    for (let D = 0; D < I.length; D++) I[D] = Math.sqrt(I[D]);
    return I;
  }
  center(_, A = {}) {
    if ((typeof _ == "object" && ((A = _), (_ = void 0)), typeof A != "object"))
      throw new TypeError("options must be an object");
    const { center: I = this.mean(_) } = A;
    switch (_) {
      case "row": {
        if (!isAnyArray(I)) throw new TypeError("center must be an array");
        return centerByRow(this, I), this;
      }
      case "column": {
        if (!isAnyArray(I)) throw new TypeError("center must be an array");
        return centerByColumn(this, I), this;
      }
      case void 0: {
        if (typeof I != "number") throw new TypeError("center must be a number");
        return centerAll(this, I), this;
      }
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  scale(_, A = {}) {
    if ((typeof _ == "object" && ((A = _), (_ = void 0)), typeof A != "object"))
      throw new TypeError("options must be an object");
    let I = A.scale;
    switch (_) {
      case "row": {
        if (I === void 0) I = getScaleByRow(this);
        else if (!isAnyArray(I)) throw new TypeError("scale must be an array");
        return scaleByRow(this, I), this;
      }
      case "column": {
        if (I === void 0) I = getScaleByColumn(this);
        else if (!isAnyArray(I)) throw new TypeError("scale must be an array");
        return scaleByColumn(this, I), this;
      }
      case void 0: {
        if (I === void 0) I = getScaleAll(this);
        else if (typeof I != "number") throw new TypeError("scale must be a number");
        return scaleAll(this, I), this;
      }
      default:
        throw new Error(`invalid option: ${_}`);
    }
  }
  toString(_) {
    return inspectMatrixWithOptions(this, _);
  }
}
AbstractMatrix.prototype.klass = "Matrix";
typeof Symbol < "u" && (AbstractMatrix.prototype[Symbol.for("nodejs.util.inspect.custom")] = inspectMatrix);
function compareNumbers(E, _) {
  return E - _;
}
function isArrayOfNumbers(E) {
  return E.every((_) => typeof _ == "number");
}
AbstractMatrix.random = AbstractMatrix.rand;
AbstractMatrix.randomInt = AbstractMatrix.randInt;
AbstractMatrix.diagonal = AbstractMatrix.diag;
AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
AbstractMatrix.identity = AbstractMatrix.eye;
AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;
let Matrix$2 = class extends AbstractMatrix {
  constructor(_, A) {
    if ((super(), Matrix$2.isMatrix(_))) return _.clone();
    if (Number.isInteger(_) && _ >= 0)
      if (((this.data = []), Number.isInteger(A) && A >= 0))
        for (let I = 0; I < _; I++) this.data.push(new Float64Array(A));
      else throw new TypeError("nColumns must be a positive integer");
    else if (isAnyArray(_)) {
      const I = _;
      if (((_ = I.length), (A = _ ? I[0].length : 0), typeof A != "number"))
        throw new TypeError("Data must be a 2D array with at least one element");
      this.data = [];
      for (let D = 0; D < _; D++) {
        if (I[D].length !== A) throw new RangeError("Inconsistent array dimensions");
        if (!isArrayOfNumbers(I[D])) throw new TypeError("Input data contains non-numeric values");
        this.data.push(Float64Array.from(I[D]));
      }
    } else throw new TypeError("First argument must be a positive number or an array");
    (this.rows = _), (this.columns = A);
  }
  set(_, A, I) {
    return (this.data[_][A] = I), this;
  }
  get(_, A) {
    return this.data[_][A];
  }
  removeRow(_) {
    return checkRowIndex(this, _), this.data.splice(_, 1), (this.rows -= 1), this;
  }
  addRow(_, A) {
    return (
      A === void 0 && ((A = _), (_ = this.rows)),
      checkRowIndex(this, _, !0),
      (A = Float64Array.from(checkRowVector(this, A))),
      this.data.splice(_, 0, A),
      (this.rows += 1),
      this
    );
  }
  removeColumn(_) {
    checkColumnIndex(this, _);
    for (let A = 0; A < this.rows; A++) {
      const I = new Float64Array(this.columns - 1);
      for (let D = 0; D < _; D++) I[D] = this.data[A][D];
      for (let D = _ + 1; D < this.columns; D++) I[D - 1] = this.data[A][D];
      this.data[A] = I;
    }
    return (this.columns -= 1), this;
  }
  addColumn(_, A) {
    typeof A > "u" && ((A = _), (_ = this.columns)), checkColumnIndex(this, _, !0), (A = checkColumnVector(this, A));
    for (let I = 0; I < this.rows; I++) {
      const D = new Float64Array(this.columns + 1);
      let T = 0;
      for (; T < _; T++) D[T] = this.data[I][T];
      for (D[T++] = A[I]; T < this.columns + 1; T++) D[T] = this.data[I][T - 1];
      this.data[I] = D;
    }
    return (this.columns += 1), this;
  }
};
installMathOperations(AbstractMatrix, Matrix$2);
class BaseView extends AbstractMatrix {
  constructor(_, A, I) {
    super(), (this.matrix = _), (this.rows = A), (this.columns = I);
  }
}
class MatrixColumnView extends BaseView {
  constructor(_, A) {
    checkColumnIndex(_, A), super(_, _.rows, 1), (this.column = A);
  }
  set(_, A, I) {
    return this.matrix.set(_, this.column, I), this;
  }
  get(_) {
    return this.matrix.get(_, this.column);
  }
}
class MatrixColumnSelectionView extends BaseView {
  constructor(_, A) {
    checkColumnIndices(_, A), super(_, _.rows, A.length), (this.columnIndices = A);
  }
  set(_, A, I) {
    return this.matrix.set(_, this.columnIndices[A], I), this;
  }
  get(_, A) {
    return this.matrix.get(_, this.columnIndices[A]);
  }
}
class MatrixFlipColumnView extends BaseView {
  constructor(_) {
    super(_, _.rows, _.columns);
  }
  set(_, A, I) {
    return this.matrix.set(_, this.columns - A - 1, I), this;
  }
  get(_, A) {
    return this.matrix.get(_, this.columns - A - 1);
  }
}
class MatrixFlipRowView extends BaseView {
  constructor(_) {
    super(_, _.rows, _.columns);
  }
  set(_, A, I) {
    return this.matrix.set(this.rows - _ - 1, A, I), this;
  }
  get(_, A) {
    return this.matrix.get(this.rows - _ - 1, A);
  }
}
class MatrixRowView extends BaseView {
  constructor(_, A) {
    checkRowIndex(_, A), super(_, 1, _.columns), (this.row = A);
  }
  set(_, A, I) {
    return this.matrix.set(this.row, A, I), this;
  }
  get(_, A) {
    return this.matrix.get(this.row, A);
  }
}
class MatrixRowSelectionView extends BaseView {
  constructor(_, A) {
    checkRowIndices(_, A), super(_, A.length, _.columns), (this.rowIndices = A);
  }
  set(_, A, I) {
    return this.matrix.set(this.rowIndices[_], A, I), this;
  }
  get(_, A) {
    return this.matrix.get(this.rowIndices[_], A);
  }
}
class MatrixSelectionView extends BaseView {
  constructor(_, A, I) {
    checkRowIndices(_, A),
      checkColumnIndices(_, I),
      super(_, A.length, I.length),
      (this.rowIndices = A),
      (this.columnIndices = I);
  }
  set(_, A, I) {
    return this.matrix.set(this.rowIndices[_], this.columnIndices[A], I), this;
  }
  get(_, A) {
    return this.matrix.get(this.rowIndices[_], this.columnIndices[A]);
  }
}
class MatrixSubView extends BaseView {
  constructor(_, A, I, D, T) {
    checkRange(_, A, I, D, T), super(_, I - A + 1, T - D + 1), (this.startRow = A), (this.startColumn = D);
  }
  set(_, A, I) {
    return this.matrix.set(this.startRow + _, this.startColumn + A, I), this;
  }
  get(_, A) {
    return this.matrix.get(this.startRow + _, this.startColumn + A);
  }
}
let MatrixTransposeView$1 = class extends BaseView {
  constructor(_) {
    super(_, _.columns, _.rows);
  }
  set(_, A, I) {
    return this.matrix.set(A, _, I), this;
  }
  get(_, A) {
    return this.matrix.get(A, _);
  }
};
class WrapperMatrix1D extends AbstractMatrix {
  constructor(_, A = {}) {
    const { rows: I = 1 } = A;
    if (_.length % I !== 0) throw new Error("the data length is not divisible by the number of rows");
    super(), (this.rows = I), (this.columns = _.length / I), (this.data = _);
  }
  set(_, A, I) {
    let D = this._calculateIndex(_, A);
    return (this.data[D] = I), this;
  }
  get(_, A) {
    let I = this._calculateIndex(_, A);
    return this.data[I];
  }
  _calculateIndex(_, A) {
    return _ * this.columns + A;
  }
}
class WrapperMatrix2D extends AbstractMatrix {
  constructor(_) {
    super(), (this.data = _), (this.rows = _.length), (this.columns = _[0].length);
  }
  set(_, A, I) {
    return (this.data[_][A] = I), this;
  }
  get(_, A) {
    return this.data[_][A];
  }
}
function wrap(E, _) {
  if (isAnyArray(E)) return E[0] && isAnyArray(E[0]) ? new WrapperMatrix2D(E) : new WrapperMatrix1D(E, _);
  throw new Error("the argument is not an array");
}
class LuDecomposition {
  constructor(_) {
    _ = WrapperMatrix2D.checkMatrix(_);
    let A = _.clone(),
      I = A.rows,
      D = A.columns,
      T = new Float64Array(I),
      C = 1,
      R,
      B,
      P,
      O,
      F,
      L,
      U,
      z,
      V;
    for (R = 0; R < I; R++) T[R] = R;
    for (z = new Float64Array(I), B = 0; B < D; B++) {
      for (R = 0; R < I; R++) z[R] = A.get(R, B);
      for (R = 0; R < I; R++) {
        for (V = Math.min(R, B), F = 0, P = 0; P < V; P++) F += A.get(R, P) * z[P];
        (z[R] -= F), A.set(R, B, z[R]);
      }
      for (O = B, R = B + 1; R < I; R++) Math.abs(z[R]) > Math.abs(z[O]) && (O = R);
      if (O !== B) {
        for (P = 0; P < D; P++) (L = A.get(O, P)), A.set(O, P, A.get(B, P)), A.set(B, P, L);
        (U = T[O]), (T[O] = T[B]), (T[B] = U), (C = -C);
      }
      if (B < I && A.get(B, B) !== 0) for (R = B + 1; R < I; R++) A.set(R, B, A.get(R, B) / A.get(B, B));
    }
    (this.LU = A), (this.pivotVector = T), (this.pivotSign = C);
  }
  isSingular() {
    let _ = this.LU,
      A = _.columns;
    for (let I = 0; I < A; I++) if (_.get(I, I) === 0) return !0;
    return !1;
  }
  solve(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = this.LU;
    if (A.rows !== _.rows) throw new Error("Invalid matrix dimensions");
    if (this.isSingular()) throw new Error("LU matrix is singular");
    let D = _.columns,
      T = _.subMatrixRow(this.pivotVector, 0, D - 1),
      C = A.columns,
      R,
      B,
      P;
    for (P = 0; P < C; P++)
      for (R = P + 1; R < C; R++) for (B = 0; B < D; B++) T.set(R, B, T.get(R, B) - T.get(P, B) * A.get(R, P));
    for (P = C - 1; P >= 0; P--) {
      for (B = 0; B < D; B++) T.set(P, B, T.get(P, B) / A.get(P, P));
      for (R = 0; R < P; R++) for (B = 0; B < D; B++) T.set(R, B, T.get(R, B) - T.get(P, B) * A.get(R, P));
    }
    return T;
  }
  get determinant() {
    let _ = this.LU;
    if (!_.isSquare()) throw new Error("Matrix must be square");
    let A = this.pivotSign,
      I = _.columns;
    for (let D = 0; D < I; D++) A *= _.get(D, D);
    return A;
  }
  get lowerTriangularMatrix() {
    let _ = this.LU,
      A = _.rows,
      I = _.columns,
      D = new Matrix$2(A, I);
    for (let T = 0; T < A; T++)
      for (let C = 0; C < I; C++) T > C ? D.set(T, C, _.get(T, C)) : T === C ? D.set(T, C, 1) : D.set(T, C, 0);
    return D;
  }
  get upperTriangularMatrix() {
    let _ = this.LU,
      A = _.rows,
      I = _.columns,
      D = new Matrix$2(A, I);
    for (let T = 0; T < A; T++) for (let C = 0; C < I; C++) T <= C ? D.set(T, C, _.get(T, C)) : D.set(T, C, 0);
    return D;
  }
  get pivotPermutationVector() {
    return Array.from(this.pivotVector);
  }
}
function hypotenuse$1(E, _) {
  let A = 0;
  return Math.abs(E) > Math.abs(_)
    ? ((A = _ / E), Math.abs(E) * Math.sqrt(1 + A * A))
    : _ !== 0
      ? ((A = E / _), Math.abs(_) * Math.sqrt(1 + A * A))
      : 0;
}
class QrDecomposition {
  constructor(_) {
    _ = WrapperMatrix2D.checkMatrix(_);
    let A = _.clone(),
      I = _.rows,
      D = _.columns,
      T = new Float64Array(D),
      C,
      R,
      B,
      P;
    for (B = 0; B < D; B++) {
      let O = 0;
      for (C = B; C < I; C++) O = hypotenuse$1(O, A.get(C, B));
      if (O !== 0) {
        for (A.get(B, B) < 0 && (O = -O), C = B; C < I; C++) A.set(C, B, A.get(C, B) / O);
        for (A.set(B, B, A.get(B, B) + 1), R = B + 1; R < D; R++) {
          for (P = 0, C = B; C < I; C++) P += A.get(C, B) * A.get(C, R);
          for (P = -P / A.get(B, B), C = B; C < I; C++) A.set(C, R, A.get(C, R) + P * A.get(C, B));
        }
      }
      T[B] = -O;
    }
    (this.QR = A), (this.Rdiag = T);
  }
  solve(_) {
    _ = Matrix$2.checkMatrix(_);
    let A = this.QR,
      I = A.rows;
    if (_.rows !== I) throw new Error("Matrix row dimensions must agree");
    if (!this.isFullRank()) throw new Error("Matrix is rank deficient");
    let D = _.columns,
      T = _.clone(),
      C = A.columns,
      R,
      B,
      P,
      O;
    for (P = 0; P < C; P++)
      for (B = 0; B < D; B++) {
        for (O = 0, R = P; R < I; R++) O += A.get(R, P) * T.get(R, B);
        for (O = -O / A.get(P, P), R = P; R < I; R++) T.set(R, B, T.get(R, B) + O * A.get(R, P));
      }
    for (P = C - 1; P >= 0; P--) {
      for (B = 0; B < D; B++) T.set(P, B, T.get(P, B) / this.Rdiag[P]);
      for (R = 0; R < P; R++) for (B = 0; B < D; B++) T.set(R, B, T.get(R, B) - T.get(P, B) * A.get(R, P));
    }
    return T.subMatrix(0, C - 1, 0, D - 1);
  }
  isFullRank() {
    let _ = this.QR.columns;
    for (let A = 0; A < _; A++) if (this.Rdiag[A] === 0) return !1;
    return !0;
  }
  get upperTriangularMatrix() {
    let _ = this.QR,
      A = _.columns,
      I = new Matrix$2(A, A),
      D,
      T;
    for (D = 0; D < A; D++)
      for (T = 0; T < A; T++) D < T ? I.set(D, T, _.get(D, T)) : D === T ? I.set(D, T, this.Rdiag[D]) : I.set(D, T, 0);
    return I;
  }
  get orthogonalMatrix() {
    let _ = this.QR,
      A = _.rows,
      I = _.columns,
      D = new Matrix$2(A, I),
      T,
      C,
      R,
      B;
    for (R = I - 1; R >= 0; R--) {
      for (T = 0; T < A; T++) D.set(T, R, 0);
      for (D.set(R, R, 1), C = R; C < I; C++)
        if (_.get(R, R) !== 0) {
          for (B = 0, T = R; T < A; T++) B += _.get(T, R) * D.get(T, C);
          for (B = -B / _.get(R, R), T = R; T < A; T++) D.set(T, C, D.get(T, C) + B * _.get(T, R));
        }
    }
    return D;
  }
}
class SingularValueDecomposition {
  constructor(_, A = {}) {
    if (((_ = WrapperMatrix2D.checkMatrix(_)), _.isEmpty())) throw new Error("Matrix must be non-empty");
    let I = _.rows,
      D = _.columns;
    const { computeLeftSingularVectors: T = !0, computeRightSingularVectors: C = !0, autoTranspose: R = !1 } = A;
    let B = Boolean(T),
      P = Boolean(C),
      O = !1,
      F;
    if (I < D)
      if (!R)
        (F = _.clone()),
          console.warn("Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose");
      else {
        (F = _.transpose()), (I = F.rows), (D = F.columns), (O = !0);
        let K = B;
        (B = P), (P = K);
      }
    else F = _.clone();
    let L = Math.min(I, D),
      U = Math.min(I + 1, D),
      z = new Float64Array(U),
      V = new Matrix$2(I, L),
      X = new Matrix$2(D, D),
      G = new Float64Array(D),
      Z = new Float64Array(I),
      Y = new Float64Array(U);
    for (let K = 0; K < U; K++) Y[K] = K;
    let q = Math.min(I - 1, D),
      W = Math.max(0, Math.min(D - 2, I)),
      ee = Math.max(q, W);
    for (let K = 0; K < ee; K++) {
      if (K < q) {
        z[K] = 0;
        for (let ne = K; ne < I; ne++) z[K] = hypotenuse$1(z[K], F.get(ne, K));
        if (z[K] !== 0) {
          F.get(K, K) < 0 && (z[K] = -z[K]);
          for (let ne = K; ne < I; ne++) F.set(ne, K, F.get(ne, K) / z[K]);
          F.set(K, K, F.get(K, K) + 1);
        }
        z[K] = -z[K];
      }
      for (let ne = K + 1; ne < D; ne++) {
        if (K < q && z[K] !== 0) {
          let re = 0;
          for (let ie = K; ie < I; ie++) re += F.get(ie, K) * F.get(ie, ne);
          re = -re / F.get(K, K);
          for (let ie = K; ie < I; ie++) F.set(ie, ne, F.get(ie, ne) + re * F.get(ie, K));
        }
        G[ne] = F.get(K, ne);
      }
      if (B && K < q) for (let ne = K; ne < I; ne++) V.set(ne, K, F.get(ne, K));
      if (K < W) {
        G[K] = 0;
        for (let ne = K + 1; ne < D; ne++) G[K] = hypotenuse$1(G[K], G[ne]);
        if (G[K] !== 0) {
          G[K + 1] < 0 && (G[K] = 0 - G[K]);
          for (let ne = K + 1; ne < D; ne++) G[ne] /= G[K];
          G[K + 1] += 1;
        }
        if (((G[K] = -G[K]), K + 1 < I && G[K] !== 0)) {
          for (let ne = K + 1; ne < I; ne++) Z[ne] = 0;
          for (let ne = K + 1; ne < I; ne++) for (let re = K + 1; re < D; re++) Z[ne] += G[re] * F.get(ne, re);
          for (let ne = K + 1; ne < D; ne++) {
            let re = -G[ne] / G[K + 1];
            for (let ie = K + 1; ie < I; ie++) F.set(ie, ne, F.get(ie, ne) + re * Z[ie]);
          }
        }
        if (P) for (let ne = K + 1; ne < D; ne++) X.set(ne, K, G[ne]);
      }
    }
    let te = Math.min(D, I + 1);
    if (
      (q < D && (z[q] = F.get(q, q)),
      I < te && (z[te - 1] = 0),
      W + 1 < te && (G[W] = F.get(W, te - 1)),
      (G[te - 1] = 0),
      B)
    ) {
      for (let K = q; K < L; K++) {
        for (let ne = 0; ne < I; ne++) V.set(ne, K, 0);
        V.set(K, K, 1);
      }
      for (let K = q - 1; K >= 0; K--)
        if (z[K] !== 0) {
          for (let ne = K + 1; ne < L; ne++) {
            let re = 0;
            for (let ie = K; ie < I; ie++) re += V.get(ie, K) * V.get(ie, ne);
            re = -re / V.get(K, K);
            for (let ie = K; ie < I; ie++) V.set(ie, ne, V.get(ie, ne) + re * V.get(ie, K));
          }
          for (let ne = K; ne < I; ne++) V.set(ne, K, -V.get(ne, K));
          V.set(K, K, 1 + V.get(K, K));
          for (let ne = 0; ne < K - 1; ne++) V.set(ne, K, 0);
        } else {
          for (let ne = 0; ne < I; ne++) V.set(ne, K, 0);
          V.set(K, K, 1);
        }
    }
    if (P)
      for (let K = D - 1; K >= 0; K--) {
        if (K < W && G[K] !== 0)
          for (let ne = K + 1; ne < D; ne++) {
            let re = 0;
            for (let ie = K + 1; ie < D; ie++) re += X.get(ie, K) * X.get(ie, ne);
            re = -re / X.get(K + 1, K);
            for (let ie = K + 1; ie < D; ie++) X.set(ie, ne, X.get(ie, ne) + re * X.get(ie, K));
          }
        for (let ne = 0; ne < D; ne++) X.set(ne, K, 0);
        X.set(K, K, 1);
      }
    let Q = te - 1,
      J = Number.EPSILON;
    for (; te > 0; ) {
      let K, ne;
      for (K = te - 2; K >= -1 && K !== -1; K--) {
        const re = Number.MIN_VALUE + J * Math.abs(z[K] + Math.abs(z[K + 1]));
        if (Math.abs(G[K]) <= re || Number.isNaN(G[K])) {
          G[K] = 0;
          break;
        }
      }
      if (K === te - 2) ne = 4;
      else {
        let re;
        for (re = te - 1; re >= K && re !== K; re--) {
          let ie = (re !== te ? Math.abs(G[re]) : 0) + (re !== K + 1 ? Math.abs(G[re - 1]) : 0);
          if (Math.abs(z[re]) <= J * ie) {
            z[re] = 0;
            break;
          }
        }
        re === K ? (ne = 3) : re === te - 1 ? (ne = 1) : ((ne = 2), (K = re));
      }
      switch ((K++, ne)) {
        case 1: {
          let re = G[te - 2];
          G[te - 2] = 0;
          for (let ie = te - 2; ie >= K; ie--) {
            let se = hypotenuse$1(z[ie], re),
              oe = z[ie] / se,
              _e = re / se;
            if (((z[ie] = se), ie !== K && ((re = -_e * G[ie - 1]), (G[ie - 1] = oe * G[ie - 1])), P))
              for (let ve = 0; ve < D; ve++)
                (se = oe * X.get(ve, ie) + _e * X.get(ve, te - 1)),
                  X.set(ve, te - 1, -_e * X.get(ve, ie) + oe * X.get(ve, te - 1)),
                  X.set(ve, ie, se);
          }
          break;
        }
        case 2: {
          let re = G[K - 1];
          G[K - 1] = 0;
          for (let ie = K; ie < te; ie++) {
            let se = hypotenuse$1(z[ie], re),
              oe = z[ie] / se,
              _e = re / se;
            if (((z[ie] = se), (re = -_e * G[ie]), (G[ie] = oe * G[ie]), B))
              for (let ve = 0; ve < I; ve++)
                (se = oe * V.get(ve, ie) + _e * V.get(ve, K - 1)),
                  V.set(ve, K - 1, -_e * V.get(ve, ie) + oe * V.get(ve, K - 1)),
                  V.set(ve, ie, se);
          }
          break;
        }
        case 3: {
          const re = Math.max(
              Math.abs(z[te - 1]),
              Math.abs(z[te - 2]),
              Math.abs(G[te - 2]),
              Math.abs(z[K]),
              Math.abs(G[K]),
            ),
            ie = z[te - 1] / re,
            se = z[te - 2] / re,
            oe = G[te - 2] / re,
            _e = z[K] / re,
            ve = G[K] / re,
            fe = ((se + ie) * (se - ie) + oe * oe) / 2,
            ke = ie * oe * (ie * oe);
          let me = 0;
          (fe !== 0 || ke !== 0) &&
            (fe < 0 ? (me = 0 - Math.sqrt(fe * fe + ke)) : (me = Math.sqrt(fe * fe + ke)), (me = ke / (fe + me)));
          let Ee = (_e + ie) * (_e - ie) + me,
            Se = _e * ve;
          for (let ue = K; ue < te - 1; ue++) {
            let xe = hypotenuse$1(Ee, Se);
            xe === 0 && (xe = Number.MIN_VALUE);
            let pe = Ee / xe,
              we = Se / xe;
            if (
              (ue !== K && (G[ue - 1] = xe),
              (Ee = pe * z[ue] + we * G[ue]),
              (G[ue] = pe * G[ue] - we * z[ue]),
              (Se = we * z[ue + 1]),
              (z[ue + 1] = pe * z[ue + 1]),
              P)
            )
              for (let Ne = 0; Ne < D; Ne++)
                (xe = pe * X.get(Ne, ue) + we * X.get(Ne, ue + 1)),
                  X.set(Ne, ue + 1, -we * X.get(Ne, ue) + pe * X.get(Ne, ue + 1)),
                  X.set(Ne, ue, xe);
            if (
              ((xe = hypotenuse$1(Ee, Se)),
              xe === 0 && (xe = Number.MIN_VALUE),
              (pe = Ee / xe),
              (we = Se / xe),
              (z[ue] = xe),
              (Ee = pe * G[ue] + we * z[ue + 1]),
              (z[ue + 1] = -we * G[ue] + pe * z[ue + 1]),
              (Se = we * G[ue + 1]),
              (G[ue + 1] = pe * G[ue + 1]),
              B && ue < I - 1)
            )
              for (let Ne = 0; Ne < I; Ne++)
                (xe = pe * V.get(Ne, ue) + we * V.get(Ne, ue + 1)),
                  V.set(Ne, ue + 1, -we * V.get(Ne, ue) + pe * V.get(Ne, ue + 1)),
                  V.set(Ne, ue, xe);
          }
          G[te - 2] = Ee;
          break;
        }
        case 4: {
          if (z[K] <= 0 && ((z[K] = z[K] < 0 ? -z[K] : 0), P))
            for (let re = 0; re <= Q; re++) X.set(re, K, -X.get(re, K));
          for (; K < Q && !(z[K] >= z[K + 1]); ) {
            let re = z[K];
            if (((z[K] = z[K + 1]), (z[K + 1] = re), P && K < D - 1))
              for (let ie = 0; ie < D; ie++) (re = X.get(ie, K + 1)), X.set(ie, K + 1, X.get(ie, K)), X.set(ie, K, re);
            if (B && K < I - 1)
              for (let ie = 0; ie < I; ie++) (re = V.get(ie, K + 1)), V.set(ie, K + 1, V.get(ie, K)), V.set(ie, K, re);
            K++;
          }
          te--;
          break;
        }
      }
    }
    if (O) {
      let K = X;
      (X = V), (V = K);
    }
    (this.m = I), (this.n = D), (this.s = z), (this.U = V), (this.V = X);
  }
  solve(_) {
    let A = _,
      I = this.threshold,
      D = this.s.length,
      T = Matrix$2.zeros(D, D);
    for (let L = 0; L < D; L++) Math.abs(this.s[L]) <= I ? T.set(L, L, 0) : T.set(L, L, 1 / this.s[L]);
    let C = this.U,
      R = this.rightSingularVectors,
      B = R.mmul(T),
      P = R.rows,
      O = C.rows,
      F = Matrix$2.zeros(P, O);
    for (let L = 0; L < P; L++)
      for (let U = 0; U < O; U++) {
        let z = 0;
        for (let V = 0; V < D; V++) z += B.get(L, V) * C.get(U, V);
        F.set(L, U, z);
      }
    return F.mmul(A);
  }
  solveForDiagonal(_) {
    return this.solve(Matrix$2.diag(_));
  }
  inverse() {
    let _ = this.V,
      A = this.threshold,
      I = _.rows,
      D = _.columns,
      T = new Matrix$2(I, this.s.length);
    for (let O = 0; O < I; O++)
      for (let F = 0; F < D; F++) Math.abs(this.s[F]) > A && T.set(O, F, _.get(O, F) / this.s[F]);
    let C = this.U,
      R = C.rows,
      B = C.columns,
      P = new Matrix$2(I, R);
    for (let O = 0; O < I; O++)
      for (let F = 0; F < R; F++) {
        let L = 0;
        for (let U = 0; U < B; U++) L += T.get(O, U) * C.get(F, U);
        P.set(O, F, L);
      }
    return P;
  }
  get condition() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }
  get norm2() {
    return this.s[0];
  }
  get rank() {
    let _ = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON,
      A = 0,
      I = this.s;
    for (let D = 0, T = I.length; D < T; D++) I[D] > _ && A++;
    return A;
  }
  get diagonal() {
    return Array.from(this.s);
  }
  get threshold() {
    return (Number.EPSILON / 2) * Math.max(this.m, this.n) * this.s[0];
  }
  get leftSingularVectors() {
    return this.U;
  }
  get rightSingularVectors() {
    return this.V;
  }
  get diagonalMatrix() {
    return Matrix$2.diag(this.s);
  }
}
function inverse(E, _ = !1) {
  return (
    (E = WrapperMatrix2D.checkMatrix(E)),
    _ ? new SingularValueDecomposition(E).inverse() : solve(E, Matrix$2.eye(E.rows))
  );
}
function solve(E, _, A = !1) {
  return (
    (E = WrapperMatrix2D.checkMatrix(E)),
    (_ = WrapperMatrix2D.checkMatrix(_)),
    A
      ? new SingularValueDecomposition(E).solve(_)
      : E.isSquare()
        ? new LuDecomposition(E).solve(_)
        : new QrDecomposition(E).solve(_)
  );
}
function determinant(E) {
  if (((E = Matrix$2.checkMatrix(E)), E.isSquare())) {
    if (E.columns === 0) return 1;
    let _, A, I, D;
    if (E.columns === 2)
      return (_ = E.get(0, 0)), (A = E.get(0, 1)), (I = E.get(1, 0)), (D = E.get(1, 1)), _ * D - A * I;
    if (E.columns === 3) {
      let T, C, R;
      return (
        (T = new MatrixSelectionView(E, [1, 2], [1, 2])),
        (C = new MatrixSelectionView(E, [1, 2], [0, 2])),
        (R = new MatrixSelectionView(E, [1, 2], [0, 1])),
        (_ = E.get(0, 0)),
        (A = E.get(0, 1)),
        (I = E.get(0, 2)),
        _ * determinant(T) - A * determinant(C) + I * determinant(R)
      );
    } else return new LuDecomposition(E).determinant;
  } else throw Error("determinant can only be calculated for a square matrix");
}
function xrange(E, _) {
  let A = [];
  for (let I = 0; I < E; I++) I !== _ && A.push(I);
  return A;
}
function dependenciesOneRow(E, _, A, I = 1e-9, D = 1e-9) {
  if (E > D) return new Array(_.rows + 1).fill(0);
  {
    let T = _.addRow(A, [0]);
    for (let C = 0; C < T.rows; C++) Math.abs(T.get(C, 0)) < I && T.set(C, 0, 0);
    return T.to1DArray();
  }
}
function linearDependencies(E, _ = {}) {
  const { thresholdValue: A = 1e-9, thresholdError: I = 1e-9 } = _;
  E = Matrix$2.checkMatrix(E);
  let D = E.rows,
    T = new Matrix$2(D, D);
  for (let C = 0; C < D; C++) {
    let R = Matrix$2.columnVector(E.getRow(C)),
      B = E.subMatrixRow(xrange(D, C)).transpose(),
      O = new SingularValueDecomposition(B).solve(R),
      F = Matrix$2.sub(R, B.mmul(O)).abs().max();
    T.setRow(C, dependenciesOneRow(F, O, C, A, I));
  }
  return T;
}
function pseudoInverse(E, _ = Number.EPSILON) {
  if (((E = Matrix$2.checkMatrix(E)), E.isEmpty())) return E.transpose();
  let A = new SingularValueDecomposition(E, { autoTranspose: !0 }),
    I = A.leftSingularVectors,
    D = A.rightSingularVectors,
    T = A.diagonal;
  for (let C = 0; C < T.length; C++) Math.abs(T[C]) > _ ? (T[C] = 1 / T[C]) : (T[C] = 0);
  return D.mmul(Matrix$2.diag(T).mmul(I.transpose()));
}
function covariance(E, _ = E, A = {}) {
  E = new Matrix$2(E);
  let I = !1;
  if (
    (typeof _ == "object" && !Matrix$2.isMatrix(_) && !isAnyArray(_)
      ? ((A = _), (_ = E), (I = !0))
      : (_ = new Matrix$2(_)),
    E.rows !== _.rows)
  )
    throw new TypeError("Both matrices must have the same number of rows");
  const { center: D = !0 } = A;
  D && ((E = E.center("column")), I || (_ = _.center("column")));
  const T = E.transpose().mmul(_);
  for (let C = 0; C < T.rows; C++) for (let R = 0; R < T.columns; R++) T.set(C, R, T.get(C, R) * (1 / (E.rows - 1)));
  return T;
}
function correlation(E, _ = E, A = {}) {
  E = new Matrix$2(E);
  let I = !1;
  if (
    (typeof _ == "object" && !Matrix$2.isMatrix(_) && !isAnyArray(_)
      ? ((A = _), (_ = E), (I = !0))
      : (_ = new Matrix$2(_)),
    E.rows !== _.rows)
  )
    throw new TypeError("Both matrices must have the same number of rows");
  const { center: D = !0, scale: T = !0 } = A;
  D && (E.center("column"), I || _.center("column")), T && (E.scale("column"), I || _.scale("column"));
  const C = E.standardDeviation("column", { unbiased: !0 }),
    R = I ? C : _.standardDeviation("column", { unbiased: !0 }),
    B = E.transpose().mmul(_);
  for (let P = 0; P < B.rows; P++)
    for (let O = 0; O < B.columns; O++) B.set(P, O, B.get(P, O) * (1 / (C[P] * R[O])) * (1 / (E.rows - 1)));
  return B;
}
class EigenvalueDecomposition {
  constructor(_, A = {}) {
    const { assumeSymmetric: I = !1 } = A;
    if (((_ = WrapperMatrix2D.checkMatrix(_)), !_.isSquare())) throw new Error("Matrix is not a square matrix");
    if (_.isEmpty()) throw new Error("Matrix must be non-empty");
    let D = _.columns,
      T = new Matrix$2(D, D),
      C = new Float64Array(D),
      R = new Float64Array(D),
      B = _,
      P,
      O,
      F = !1;
    if ((I ? (F = !0) : (F = _.isSymmetric()), F)) {
      for (P = 0; P < D; P++) for (O = 0; O < D; O++) T.set(P, O, B.get(P, O));
      tred2(D, R, C, T), tql2(D, R, C, T);
    } else {
      let L = new Matrix$2(D, D),
        U = new Float64Array(D);
      for (O = 0; O < D; O++) for (P = 0; P < D; P++) L.set(P, O, B.get(P, O));
      orthes(D, L, U, T), hqr2(D, R, C, T, L);
    }
    (this.n = D), (this.e = R), (this.d = C), (this.V = T);
  }
  get realEigenvalues() {
    return Array.from(this.d);
  }
  get imaginaryEigenvalues() {
    return Array.from(this.e);
  }
  get eigenvectorMatrix() {
    return this.V;
  }
  get diagonalMatrix() {
    let _ = this.n,
      A = this.e,
      I = this.d,
      D = new Matrix$2(_, _),
      T,
      C;
    for (T = 0; T < _; T++) {
      for (C = 0; C < _; C++) D.set(T, C, 0);
      D.set(T, T, I[T]), A[T] > 0 ? D.set(T, T + 1, A[T]) : A[T] < 0 && D.set(T, T - 1, A[T]);
    }
    return D;
  }
}
function tred2(E, _, A, I) {
  let D, T, C, R, B, P, O, F;
  for (B = 0; B < E; B++) A[B] = I.get(E - 1, B);
  for (R = E - 1; R > 0; R--) {
    for (F = 0, C = 0, P = 0; P < R; P++) F = F + Math.abs(A[P]);
    if (F === 0) for (_[R] = A[R - 1], B = 0; B < R; B++) (A[B] = I.get(R - 1, B)), I.set(R, B, 0), I.set(B, R, 0);
    else {
      for (P = 0; P < R; P++) (A[P] /= F), (C += A[P] * A[P]);
      for (
        D = A[R - 1], T = Math.sqrt(C), D > 0 && (T = -T), _[R] = F * T, C = C - D * T, A[R - 1] = D - T, B = 0;
        B < R;
        B++
      )
        _[B] = 0;
      for (B = 0; B < R; B++) {
        for (D = A[B], I.set(B, R, D), T = _[B] + I.get(B, B) * D, P = B + 1; P <= R - 1; P++)
          (T += I.get(P, B) * A[P]), (_[P] += I.get(P, B) * D);
        _[B] = T;
      }
      for (D = 0, B = 0; B < R; B++) (_[B] /= C), (D += _[B] * A[B]);
      for (O = D / (C + C), B = 0; B < R; B++) _[B] -= O * A[B];
      for (B = 0; B < R; B++) {
        for (D = A[B], T = _[B], P = B; P <= R - 1; P++) I.set(P, B, I.get(P, B) - (D * _[P] + T * A[P]));
        (A[B] = I.get(R - 1, B)), I.set(R, B, 0);
      }
    }
    A[R] = C;
  }
  for (R = 0; R < E - 1; R++) {
    if ((I.set(E - 1, R, I.get(R, R)), I.set(R, R, 1), (C = A[R + 1]), C !== 0)) {
      for (P = 0; P <= R; P++) A[P] = I.get(P, R + 1) / C;
      for (B = 0; B <= R; B++) {
        for (T = 0, P = 0; P <= R; P++) T += I.get(P, R + 1) * I.get(P, B);
        for (P = 0; P <= R; P++) I.set(P, B, I.get(P, B) - T * A[P]);
      }
    }
    for (P = 0; P <= R; P++) I.set(P, R + 1, 0);
  }
  for (B = 0; B < E; B++) (A[B] = I.get(E - 1, B)), I.set(E - 1, B, 0);
  I.set(E - 1, E - 1, 1), (_[0] = 0);
}
function tql2(E, _, A, I) {
  let D, T, C, R, B, P, O, F, L, U, z, V, X, G, Z, Y;
  for (C = 1; C < E; C++) _[C - 1] = _[C];
  _[E - 1] = 0;
  let q = 0,
    W = 0,
    ee = Number.EPSILON;
  for (P = 0; P < E; P++) {
    for (W = Math.max(W, Math.abs(A[P]) + Math.abs(_[P])), O = P; O < E && !(Math.abs(_[O]) <= ee * W); ) O++;
    if (O > P)
      do {
        for (
          D = A[P],
            F = (A[P + 1] - D) / (2 * _[P]),
            L = hypotenuse$1(F, 1),
            F < 0 && (L = -L),
            A[P] = _[P] / (F + L),
            A[P + 1] = _[P] * (F + L),
            U = A[P + 1],
            T = D - A[P],
            C = P + 2;
          C < E;
          C++
        )
          A[C] -= T;
        for (q = q + T, F = A[O], z = 1, V = z, X = z, G = _[P + 1], Z = 0, Y = 0, C = O - 1; C >= P; C--)
          for (
            X = V,
              V = z,
              Y = Z,
              D = z * _[C],
              T = z * F,
              L = hypotenuse$1(F, _[C]),
              _[C + 1] = Z * L,
              Z = _[C] / L,
              z = F / L,
              F = z * A[C] - Z * D,
              A[C + 1] = T + Z * (z * D + Z * A[C]),
              B = 0;
            B < E;
            B++
          )
            (T = I.get(B, C + 1)), I.set(B, C + 1, Z * I.get(B, C) + z * T), I.set(B, C, z * I.get(B, C) - Z * T);
        (F = (-Z * Y * X * G * _[P]) / U), (_[P] = Z * F), (A[P] = z * F);
      } while (Math.abs(_[P]) > ee * W);
    (A[P] = A[P] + q), (_[P] = 0);
  }
  for (C = 0; C < E - 1; C++) {
    for (B = C, F = A[C], R = C + 1; R < E; R++) A[R] < F && ((B = R), (F = A[R]));
    if (B !== C)
      for (A[B] = A[C], A[C] = F, R = 0; R < E; R++) (F = I.get(R, C)), I.set(R, C, I.get(R, B)), I.set(R, B, F);
  }
}
function orthes(E, _, A, I) {
  let D = 0,
    T = E - 1,
    C,
    R,
    B,
    P,
    O,
    F,
    L;
  for (F = D + 1; F <= T - 1; F++) {
    for (L = 0, P = F; P <= T; P++) L = L + Math.abs(_.get(P, F - 1));
    if (L !== 0) {
      for (B = 0, P = T; P >= F; P--) (A[P] = _.get(P, F - 1) / L), (B += A[P] * A[P]);
      for (R = Math.sqrt(B), A[F] > 0 && (R = -R), B = B - A[F] * R, A[F] = A[F] - R, O = F; O < E; O++) {
        for (C = 0, P = T; P >= F; P--) C += A[P] * _.get(P, O);
        for (C = C / B, P = F; P <= T; P++) _.set(P, O, _.get(P, O) - C * A[P]);
      }
      for (P = 0; P <= T; P++) {
        for (C = 0, O = T; O >= F; O--) C += A[O] * _.get(P, O);
        for (C = C / B, O = F; O <= T; O++) _.set(P, O, _.get(P, O) - C * A[O]);
      }
      (A[F] = L * A[F]), _.set(F, F - 1, L * R);
    }
  }
  for (P = 0; P < E; P++) for (O = 0; O < E; O++) I.set(P, O, P === O ? 1 : 0);
  for (F = T - 1; F >= D + 1; F--)
    if (_.get(F, F - 1) !== 0) {
      for (P = F + 1; P <= T; P++) A[P] = _.get(P, F - 1);
      for (O = F; O <= T; O++) {
        for (R = 0, P = F; P <= T; P++) R += A[P] * I.get(P, O);
        for (R = R / A[F] / _.get(F, F - 1), P = F; P <= T; P++) I.set(P, O, I.get(P, O) + R * A[P]);
      }
    }
}
function hqr2(E, _, A, I, D) {
  let T = E - 1,
    C = 0,
    R = E - 1,
    B = Number.EPSILON,
    P = 0,
    O = 0,
    F = 0,
    L = 0,
    U = 0,
    z = 0,
    V = 0,
    X = 0,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q,
    J,
    K,
    ne,
    re,
    ie,
    se,
    oe;
  for (G = 0; G < E; G++)
    for ((G < C || G > R) && ((A[G] = D.get(G, G)), (_[G] = 0)), Z = Math.max(G - 1, 0); Z < E; Z++)
      O = O + Math.abs(D.get(G, Z));
  for (; T >= C; ) {
    for (
      q = T;
      q > C &&
      ((z = Math.abs(D.get(q - 1, q - 1)) + Math.abs(D.get(q, q))),
      z === 0 && (z = O),
      !(Math.abs(D.get(q, q - 1)) < B * z));

    )
      q--;
    if (q === T) D.set(T, T, D.get(T, T) + P), (A[T] = D.get(T, T)), (_[T] = 0), T--, (X = 0);
    else if (q === T - 1) {
      if (
        ((te = D.get(T, T - 1) * D.get(T - 1, T)),
        (F = (D.get(T - 1, T - 1) - D.get(T, T)) / 2),
        (L = F * F + te),
        (V = Math.sqrt(Math.abs(L))),
        D.set(T, T, D.get(T, T) + P),
        D.set(T - 1, T - 1, D.get(T - 1, T - 1) + P),
        (Q = D.get(T, T)),
        L >= 0)
      ) {
        for (
          V = F >= 0 ? F + V : F - V,
            A[T - 1] = Q + V,
            A[T] = A[T - 1],
            V !== 0 && (A[T] = Q - te / V),
            _[T - 1] = 0,
            _[T] = 0,
            Q = D.get(T, T - 1),
            z = Math.abs(Q) + Math.abs(V),
            F = Q / z,
            L = V / z,
            U = Math.sqrt(F * F + L * L),
            F = F / U,
            L = L / U,
            Z = T - 1;
          Z < E;
          Z++
        )
          (V = D.get(T - 1, Z)), D.set(T - 1, Z, L * V + F * D.get(T, Z)), D.set(T, Z, L * D.get(T, Z) - F * V);
        for (G = 0; G <= T; G++)
          (V = D.get(G, T - 1)), D.set(G, T - 1, L * V + F * D.get(G, T)), D.set(G, T, L * D.get(G, T) - F * V);
        for (G = C; G <= R; G++)
          (V = I.get(G, T - 1)), I.set(G, T - 1, L * V + F * I.get(G, T)), I.set(G, T, L * I.get(G, T) - F * V);
      } else (A[T - 1] = Q + F), (A[T] = Q + F), (_[T - 1] = V), (_[T] = -V);
      (T = T - 2), (X = 0);
    } else {
      if (
        ((Q = D.get(T, T)),
        (J = 0),
        (te = 0),
        q < T && ((J = D.get(T - 1, T - 1)), (te = D.get(T, T - 1) * D.get(T - 1, T))),
        X === 10)
      ) {
        for (P += Q, G = C; G <= T; G++) D.set(G, G, D.get(G, G) - Q);
        (z = Math.abs(D.get(T, T - 1)) + Math.abs(D.get(T - 1, T - 2))), (Q = J = 0.75 * z), (te = -0.4375 * z * z);
      }
      if (X === 30 && ((z = (J - Q) / 2), (z = z * z + te), z > 0)) {
        for (z = Math.sqrt(z), J < Q && (z = -z), z = Q - te / ((J - Q) / 2 + z), G = C; G <= T; G++)
          D.set(G, G, D.get(G, G) - z);
        (P += z), (Q = J = te = 0.964);
      }
      for (
        X = X + 1, W = T - 2;
        W >= q &&
        ((V = D.get(W, W)),
        (U = Q - V),
        (z = J - V),
        (F = (U * z - te) / D.get(W + 1, W) + D.get(W, W + 1)),
        (L = D.get(W + 1, W + 1) - V - U - z),
        (U = D.get(W + 2, W + 1)),
        (z = Math.abs(F) + Math.abs(L) + Math.abs(U)),
        (F = F / z),
        (L = L / z),
        (U = U / z),
        !(
          W === q ||
          Math.abs(D.get(W, W - 1)) * (Math.abs(L) + Math.abs(U)) <
            B * (Math.abs(F) * (Math.abs(D.get(W - 1, W - 1)) + Math.abs(V) + Math.abs(D.get(W + 1, W + 1))))
        ));

      )
        W--;
      for (G = W + 2; G <= T; G++) D.set(G, G - 2, 0), G > W + 2 && D.set(G, G - 3, 0);
      for (
        Y = W;
        Y <= T - 1 &&
        ((se = Y !== T - 1),
        Y !== W &&
          ((F = D.get(Y, Y - 1)),
          (L = D.get(Y + 1, Y - 1)),
          (U = se ? D.get(Y + 2, Y - 1) : 0),
          (Q = Math.abs(F) + Math.abs(L) + Math.abs(U)),
          Q !== 0 && ((F = F / Q), (L = L / Q), (U = U / Q))),
        Q !== 0);
        Y++
      )
        if (((z = Math.sqrt(F * F + L * L + U * U)), F < 0 && (z = -z), z !== 0)) {
          for (
            Y !== W ? D.set(Y, Y - 1, -z * Q) : q !== W && D.set(Y, Y - 1, -D.get(Y, Y - 1)),
              F = F + z,
              Q = F / z,
              J = L / z,
              V = U / z,
              L = L / F,
              U = U / F,
              Z = Y;
            Z < E;
            Z++
          )
            (F = D.get(Y, Z) + L * D.get(Y + 1, Z)),
              se && ((F = F + U * D.get(Y + 2, Z)), D.set(Y + 2, Z, D.get(Y + 2, Z) - F * V)),
              D.set(Y, Z, D.get(Y, Z) - F * Q),
              D.set(Y + 1, Z, D.get(Y + 1, Z) - F * J);
          for (G = 0; G <= Math.min(T, Y + 3); G++)
            (F = Q * D.get(G, Y) + J * D.get(G, Y + 1)),
              se && ((F = F + V * D.get(G, Y + 2)), D.set(G, Y + 2, D.get(G, Y + 2) - F * U)),
              D.set(G, Y, D.get(G, Y) - F),
              D.set(G, Y + 1, D.get(G, Y + 1) - F * L);
          for (G = C; G <= R; G++)
            (F = Q * I.get(G, Y) + J * I.get(G, Y + 1)),
              se && ((F = F + V * I.get(G, Y + 2)), I.set(G, Y + 2, I.get(G, Y + 2) - F * U)),
              I.set(G, Y, I.get(G, Y) - F),
              I.set(G, Y + 1, I.get(G, Y + 1) - F * L);
        }
    }
  }
  if (O !== 0) {
    for (T = E - 1; T >= 0; T--)
      if (((F = A[T]), (L = _[T]), L === 0))
        for (q = T, D.set(T, T, 1), G = T - 1; G >= 0; G--) {
          for (te = D.get(G, G) - F, U = 0, Z = q; Z <= T; Z++) U = U + D.get(G, Z) * D.get(Z, T);
          if (_[G] < 0) (V = te), (z = U);
          else if (
            ((q = G),
            _[G] === 0
              ? D.set(G, T, te !== 0 ? -U / te : -U / (B * O))
              : ((Q = D.get(G, G + 1)),
                (J = D.get(G + 1, G)),
                (L = (A[G] - F) * (A[G] - F) + _[G] * _[G]),
                (ee = (Q * z - V * U) / L),
                D.set(G, T, ee),
                D.set(G + 1, T, Math.abs(Q) > Math.abs(V) ? (-U - te * ee) / Q : (-z - J * ee) / V)),
            (ee = Math.abs(D.get(G, T))),
            B * ee * ee > 1)
          )
            for (Z = G; Z <= T; Z++) D.set(Z, T, D.get(Z, T) / ee);
        }
      else if (L < 0)
        for (
          q = T - 1,
            Math.abs(D.get(T, T - 1)) > Math.abs(D.get(T - 1, T))
              ? (D.set(T - 1, T - 1, L / D.get(T, T - 1)), D.set(T - 1, T, -(D.get(T, T) - F) / D.get(T, T - 1)))
              : ((oe = cdiv(0, -D.get(T - 1, T), D.get(T - 1, T - 1) - F, L)),
                D.set(T - 1, T - 1, oe[0]),
                D.set(T - 1, T, oe[1])),
            D.set(T, T - 1, 0),
            D.set(T, T, 1),
            G = T - 2;
          G >= 0;
          G--
        ) {
          for (K = 0, ne = 0, Z = q; Z <= T; Z++)
            (K = K + D.get(G, Z) * D.get(Z, T - 1)), (ne = ne + D.get(G, Z) * D.get(Z, T));
          if (((te = D.get(G, G) - F), _[G] < 0)) (V = te), (U = K), (z = ne);
          else if (
            ((q = G),
            _[G] === 0
              ? ((oe = cdiv(-K, -ne, te, L)), D.set(G, T - 1, oe[0]), D.set(G, T, oe[1]))
              : ((Q = D.get(G, G + 1)),
                (J = D.get(G + 1, G)),
                (re = (A[G] - F) * (A[G] - F) + _[G] * _[G] - L * L),
                (ie = (A[G] - F) * 2 * L),
                re === 0 &&
                  ie === 0 &&
                  (re = B * O * (Math.abs(te) + Math.abs(L) + Math.abs(Q) + Math.abs(J) + Math.abs(V))),
                (oe = cdiv(Q * U - V * K + L * ne, Q * z - V * ne - L * K, re, ie)),
                D.set(G, T - 1, oe[0]),
                D.set(G, T, oe[1]),
                Math.abs(Q) > Math.abs(V) + Math.abs(L)
                  ? (D.set(G + 1, T - 1, (-K - te * D.get(G, T - 1) + L * D.get(G, T)) / Q),
                    D.set(G + 1, T, (-ne - te * D.get(G, T) - L * D.get(G, T - 1)) / Q))
                  : ((oe = cdiv(-U - J * D.get(G, T - 1), -z - J * D.get(G, T), V, L)),
                    D.set(G + 1, T - 1, oe[0]),
                    D.set(G + 1, T, oe[1]))),
            (ee = Math.max(Math.abs(D.get(G, T - 1)), Math.abs(D.get(G, T)))),
            B * ee * ee > 1)
          )
            for (Z = G; Z <= T; Z++) D.set(Z, T - 1, D.get(Z, T - 1) / ee), D.set(Z, T, D.get(Z, T) / ee);
        }
    for (G = 0; G < E; G++) if (G < C || G > R) for (Z = G; Z < E; Z++) I.set(G, Z, D.get(G, Z));
    for (Z = E - 1; Z >= C; Z--)
      for (G = C; G <= R; G++) {
        for (V = 0, Y = C; Y <= Math.min(Z, R); Y++) V = V + I.get(G, Y) * D.get(Y, Z);
        I.set(G, Z, V);
      }
  }
}
function cdiv(E, _, A, I) {
  let D, T;
  return Math.abs(A) > Math.abs(I)
    ? ((D = I / A), (T = A + D * I), [(E + D * _) / T, (_ - D * E) / T])
    : ((D = A / I), (T = I + D * A), [(D * E + _) / T, (D * _ - E) / T]);
}
class CholeskyDecomposition {
  constructor(_) {
    if (((_ = WrapperMatrix2D.checkMatrix(_)), !_.isSymmetric())) throw new Error("Matrix is not symmetric");
    let A = _,
      I = A.rows,
      D = new Matrix$2(I, I),
      T = !0,
      C,
      R,
      B;
    for (R = 0; R < I; R++) {
      let P = 0;
      for (B = 0; B < R; B++) {
        let O = 0;
        for (C = 0; C < B; C++) O += D.get(B, C) * D.get(R, C);
        (O = (A.get(R, B) - O) / D.get(B, B)), D.set(R, B, O), (P = P + O * O);
      }
      for (P = A.get(R, R) - P, T &= P > 0, D.set(R, R, Math.sqrt(Math.max(P, 0))), B = R + 1; B < I; B++)
        D.set(R, B, 0);
    }
    (this.L = D), (this.positiveDefinite = Boolean(T));
  }
  isPositiveDefinite() {
    return this.positiveDefinite;
  }
  solve(_) {
    _ = WrapperMatrix2D.checkMatrix(_);
    let A = this.L,
      I = A.rows;
    if (_.rows !== I) throw new Error("Matrix dimensions do not match");
    if (this.isPositiveDefinite() === !1) throw new Error("Matrix is not positive definite");
    let D = _.columns,
      T = _.clone(),
      C,
      R,
      B;
    for (B = 0; B < I; B++)
      for (R = 0; R < D; R++) {
        for (C = 0; C < B; C++) T.set(B, R, T.get(B, R) - T.get(C, R) * A.get(B, C));
        T.set(B, R, T.get(B, R) / A.get(B, B));
      }
    for (B = I - 1; B >= 0; B--)
      for (R = 0; R < D; R++) {
        for (C = B + 1; C < I; C++) T.set(B, R, T.get(B, R) - T.get(C, R) * A.get(C, B));
        T.set(B, R, T.get(B, R) / A.get(B, B));
      }
    return T;
  }
  get lowerTriangularMatrix() {
    return this.L;
  }
}
class nipals {
  constructor(_, A = {}) {
    _ = WrapperMatrix2D.checkMatrix(_);
    let { Y: I } = A;
    const { scaleScores: D = !1, maxIterations: T = 1e3, terminationCriteria: C = 1e-10 } = A;
    let R;
    if (I) {
      if (
        (isAnyArray(I) && typeof I[0] == "number"
          ? (I = Matrix$2.columnVector(I))
          : (I = WrapperMatrix2D.checkMatrix(I)),
        I.rows !== _.rows)
      )
        throw new Error("Y should have the same number of rows as X");
      R = I.getColumnVector(0);
    } else R = _.getColumnVector(0);
    let B = 1,
      P,
      O,
      F,
      L;
    for (let U = 0; U < T && B > C; U++)
      (F = _.transpose().mmul(R).div(R.transpose().mmul(R).get(0, 0))),
        (F = F.div(F.norm())),
        (P = _.mmul(F).div(F.transpose().mmul(F).get(0, 0))),
        U > 0 && (B = P.clone().sub(L).pow(2).sum()),
        (L = P.clone()),
        I
          ? ((O = I.transpose().mmul(P).div(P.transpose().mmul(P).get(0, 0))),
            (O = O.div(O.norm())),
            (R = I.mmul(O).div(O.transpose().mmul(O).get(0, 0))))
          : (R = P);
    if (I) {
      let U = _.transpose().mmul(P).div(P.transpose().mmul(P).get(0, 0));
      U = U.div(U.norm());
      let z = _.clone().sub(P.clone().mmul(U.transpose())),
        V = R.transpose().mmul(P).div(P.transpose().mmul(P).get(0, 0)),
        X = I.clone().sub(P.clone().mulS(V.get(0, 0)).mmul(O.transpose()));
      (this.t = P),
        (this.p = U.transpose()),
        (this.w = F.transpose()),
        (this.q = O),
        (this.u = R),
        (this.s = P.transpose().mmul(P)),
        (this.xResidual = z),
        (this.yResidual = X),
        (this.betas = V);
    } else
      (this.w = F.transpose()),
        (this.s = P.transpose().mmul(P).sqrt()),
        D ? (this.t = P.clone().div(this.s.get(0, 0))) : (this.t = P),
        (this.xResidual = _.sub(P.mmul(F.transpose())));
  }
}
const src$1 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      AbstractMatrix,
      default: Matrix$2,
      Matrix: Matrix$2,
      wrap,
      WrapperMatrix1D,
      WrapperMatrix2D,
      solve,
      inverse,
      determinant,
      linearDependencies,
      pseudoInverse,
      covariance,
      correlation,
      SingularValueDecomposition,
      SVD: SingularValueDecomposition,
      EigenvalueDecomposition,
      EVD: EigenvalueDecomposition,
      CholeskyDecomposition,
      CHO: CholeskyDecomposition,
      LuDecomposition,
      LU: LuDecomposition,
      QrDecomposition,
      QR: QrDecomposition,
      Nipals: nipals,
      NIPALS: nipals,
      MatrixColumnView,
      MatrixColumnSelectionView,
      MatrixFlipColumnView,
      MatrixFlipRowView,
      MatrixRowView,
      MatrixRowSelectionView,
      MatrixSelectionView,
      MatrixSubView,
      MatrixTransposeView: MatrixTransposeView$1,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function getSeparatedKernel(E) {
  const _ = new SingularValueDecomposition(E, { autoTranspose: !0 });
  if (_.rank !== 1) return null;
  const A = Math.sqrt(_.s[0]),
    I = _.U.to2DArray().map((T) => T[0] * A),
    D = _.V.to2DArray().map((T) => T[0] * A);
  return [I, D];
}
function convolution(E, _ = {}) {
  let { channels: A, bitDepth: I, normalize: D = !1, divisor: T = 1, border: C = "copy", algorithm: R = "auto" } = _,
    B = {};
  I && (B.bitDepth = I);
  let P = Image.createFrom(this, B);
  if (((A = validateArrayOfChannels(this, A)), R !== "separable")) ({ kernel: E } = validateKernel(E));
  else if (!Array.isArray(E) || E.length !== 2)
    throw new RangeError("separable convolution requires two arrays of numbers to represent the kernel");
  if (R === "auto") {
    let q = getSeparatedKernel(E);
    q !== null
      ? ((R = "separable"), (E = q))
      : (E.length > 9 || E[0].length > 9) && this.width <= 4096 && this.height <= 4096
        ? (R = "fft")
        : (R = "direct");
  }
  let O, F;
  R === "separable"
    ? ((O = Math.floor(E[0].length / 2)), (F = Math.floor(E[1].length / 2)))
    : ((O = Math.floor(E.length / 2)), (F = Math.floor(E[0].length / 2)));
  let L = P.isClamped,
    U = new Array(this.height * this.width),
    z,
    V,
    X,
    G,
    Z,
    Y;
  for (G = 0; G < A.length; G++) {
    for (Z = A[G], X = 0; X < this.height; X++)
      for (V = 0; V < this.width; V++) (z = X * this.width + V), (U[z] = this.data[z * this.channels + Z]);
    if (R === "direct") Y = src$2.direct(U, E, { rows: this.height, cols: this.width, normalize: D, divisor: T });
    else if (R === "separable") {
      if (((Y = convolutionSeparable(U, E, this.width, this.height)), D)) {
        T = 0;
        for (let q = 0; q < E[0].length; q++) for (let W = 0; W < E[1].length; W++) T += E[0][q] * E[1][W];
      }
      if (T !== 1) for (let q = 0; q < Y.length; q++) Y[q] /= T;
    } else Y = src$2.fft(U, E, { rows: this.height, cols: this.width, normalize: D, divisor: T });
    for (X = 0; X < this.height; X++)
      for (V = 0; V < this.width; V++)
        (z = X * this.width + V),
          L ? (P.data[z * this.channels + Z] = clamp$1(Y[z], P)) : (P.data[z * this.channels + Z] = Y[z]);
  }
  if (this.alpha && !A.includes(this.channels))
    for (V = this.components; V < this.data.length; V = V + this.channels) P.data[V] = this.data[V];
  return C !== "periodic" && P.setBorder({ size: [F, O], algorithm: C }), P;
}
function gradientFilter(E = {}) {
  let { direction: _ = "xy", border: A = "copy", kernelX: I, kernelY: D, channels: T, bitDepth: C = this.bitDepth } = E;
  switch ((this.checkProcessable("gradientFilter", { bitDepth: [8, 16] }), _)) {
    case "x":
      if (!I) throw new Error("kernelX option is missing");
      return convolution.call(this, I, { channels: T, border: A, bitDepth: C });
    case "y":
      if (!D) throw new Error("kernelY option is missing");
      return convolution.call(this, D, { channels: T, border: A, bitDepth: C });
    case "xy": {
      if (!I) throw new Error("kernelX option is missing");
      if (!D) throw new Error("kernelY option is missing");
      const R = convolution.call(this, I, { channels: T, border: A, bitDepth: 32 }),
        B = convolution.call(this, D, { channels: T, border: A, bitDepth: 32 });
      return R.hypotenuse(B, { bitDepth: C, channels: T });
    }
    default:
      throw new Error(`Unknown parameter direction: ${_}`);
  }
}
function sobelFilter(E) {
  return gradientFilter.call(this, Object.assign({}, E, { kernelX: SOBEL_X, kernelY: SOBEL_Y }));
}
function scharrFilter(E) {
  return gradientFilter.call(this, Object.assign({}, E, { kernelX: SCHARR_X, kernelY: SCHARR_Y }));
}
var newArray_1 = newArray;
function newArray(E, _) {
  E = E || 0;
  for (var A = new Array(E), I = 0; I < E; I++) A[I] = _;
  return A;
}
function level(E = {}) {
  let { algorithm: _ = "range", channels: A, min: I = this.min, max: D = this.max } = E;
  switch (
    (this.checkProcessable("level", { bitDepth: [8, 16, 32] }),
    (A = validateArrayOfChannels(this, { channels: A })),
    A.length !== this.channel &&
      (Array.isArray(I) && I.length === this.channels && (I = I.filter((T, C) => A.includes(C))),
      Array.isArray(D) && D.length === this.channels && (D = D.filter((T, C) => A.includes(C)))),
    _)
  ) {
    case "range":
      I < 0 && (I = 0),
        D > this.maxValue && (D = this.maxValue),
        Array.isArray(I) || (I = newArray_1(A.length, I)),
        Array.isArray(D) || (D = newArray_1(A.length, D)),
        processImage(this, I, D, A);
      break;
    default:
      throw new Error(`level: algorithm not implement: ${_}`);
  }
  return this;
}
function processImage(E, _, A, I) {
  let D = 1e-5,
    T = new Array(I.length);
  for (let C = 0; C < I.length; C++)
    (_[C] === 0 && A[C] === E.maxValue) || A[C] === _[C] ? (T[C] = 0) : (T[C] = (E.maxValue + 1 - D) / (A[C] - _[C])),
      (_[C] += (0.5 - D / 2) / T[C]);
  for (let C = 0; C < I.length; C++) {
    let R = I[C];
    if (T[C] !== 0)
      for (let B = 0; B < E.data.length; B += E.channels)
        E.data[B + R] = Math.min(Math.max(0, ((E.data[B + R] - _[C]) * T[C] + 0.5) | 0), E.maxValue);
  }
}
var toString = Object.prototype.toString,
  isArrayType = function E(_) {
    return toString.call(_).substr(-6, 5) === "Array";
  };
function checkNumberArray(E) {
  if (isNaN(E)) {
    if (E instanceof Image) return E.data;
    if (!isArrayType(E)) throw new Error("checkNumberArray: the value should be either a number, array or Image");
    return E;
  } else {
    if (E <= 0) throw new Error("checkNumberArray: the value must be greater than 0");
    return E;
  }
}
function add(E, _ = {}) {
  let { channels: A } = _;
  if (
    (this.checkProcessable("add", { bitDepth: [8, 16] }),
    (A = validateArrayOfChannels(this, { channels: A })),
    (E = checkNumberArray(E)),
    isNaN(E))
  ) {
    if (this.data.length !== E.length) throw new Error("add: the data size is different");
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.max(0, Math.min(this.maxValue, (this.data[T + D] + E[T + D]) >> 0));
    }
  } else
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.min(this.maxValue, (this.data[T + D] + E) >> 0);
    }
  return this;
}
function subtract(E, _ = {}) {
  let { channels: A } = _;
  if (
    (this.checkProcessable("subtract", { bitDepth: [8, 16] }),
    (A = validateArrayOfChannels(this, { channels: A })),
    (E = checkNumberArray(E)),
    isNaN(E))
  ) {
    if (this.data.length !== E.length) throw new Error("subtract: the data size is different");
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.max(0, Math.min(this.maxValue, (this.data[T + D] - E[T + D]) >> 0));
    }
  } else
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.max(0, (this.data[T + D] - E) >> 0);
    }
  return this;
}
function subtractImage(E, _ = {}) {
  let { channels: A, absolute: I = !1 } = _;
  if (
    (this.checkProcessable("subtractImage", { bitDepth: [8, 16] }), this.width !== E.width || this.height !== E.height)
  )
    throw new Error("subtractImage: both images must have the same size");
  if (this.alpha !== E.alpha || this.bitDepth !== E.bitDepth)
    throw new Error("subtractImage: both images must have the same alpha and bitDepth");
  if (this.channels !== E.channels) throw new Error("subtractImage: both images must have the same number of channels");
  let D = this.clone();
  A = validateArrayOfChannels(this, { channels: A });
  for (let T = 0; T < A.length; T++) {
    let C = A[T];
    for (let R = C; R < this.data.length; R += this.channels) {
      let B = this.data[R] - E.data[R];
      I ? (D.data[R] = Math.abs(B)) : (D.data[R] = Math.max(B, 0));
    }
  }
  return D;
}
function hypotenuse(E, _ = {}) {
  let { bitDepth: A = this.bitDepth, channels: I } = _;
  if (
    (this.checkProcessable("hypotenuse", { bitDepth: [8, 16, 32] }), this.width !== E.width || this.height !== E.height)
  )
    throw new Error("hypotenuse: both images must have the same size");
  if (this.alpha !== E.alpha || this.bitDepth !== E.bitDepth)
    throw new Error("hypotenuse: both images must have the same alpha and bitDepth");
  if (this.channels !== E.channels) throw new Error("hypotenuse: both images must have the same number of channels");
  let D = Image.createFrom(this, { bitDepth: A });
  I = validateArrayOfChannels(this, { channels: I });
  let T = D.isClamped;
  for (let C = 0; C < I.length; C++) {
    let R = I[C];
    for (let B = R; B < this.data.length; B += this.channels) {
      let P = Math.hypot(this.data[B], E.data[B]);
      T ? (D.data[B] = Math.min(Math.max(Math.round(P), 0), D.maxValue)) : (D.data[B] = P);
    }
  }
  return D;
}
function multiply(E, _ = {}) {
  let { channels: A } = _;
  if ((this.checkProcessable("multiply", { bitDepth: [8, 16] }), E <= 0))
    throw new Error("multiply: the value must be greater than 0");
  if (((A = validateArrayOfChannels(this, { channels: A })), (E = checkNumberArray(E)), isNaN(E))) {
    if (this.data.length !== E.length) throw new Error("multiply: the data size is different");
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.max(0, Math.min(this.maxValue, (this.data[T + D] * E[T + D]) >> 0));
    }
  } else
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.min(this.maxValue, (this.data[T + D] * E) >> 0);
    }
  return this;
}
function divide(E, _ = {}) {
  let { channels: A } = _;
  if (
    (this.checkProcessable("divide", { bitDepth: [8, 16] }),
    (A = validateArrayOfChannels(this, { channels: A })),
    (E = checkNumberArray(E)),
    isNaN(E))
  ) {
    if (this.data.length !== E.length) throw new Error("divide: the: the data size is different");
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.max(0, Math.min(this.maxValue, (this.data[T + D] / E[T + D]) >> 0));
    }
  } else
    for (let I = 0; I < A.length; I++) {
      let D = A[I];
      for (let T = 0; T < this.data.length; T += this.channels)
        this.data[T + D] = Math.min(this.maxValue, (this.data[T + D] / E) >> 0);
    }
  return this;
}
class BaseRegression {
  constructor() {
    if (new.target === BaseRegression) throw new Error("BaseRegression must be subclassed");
  }
  predict(_) {
    if (typeof _ == "number") return this._predict(_);
    if (isAnyArray(_)) {
      const A = [];
      for (let I = 0; I < _.length; I++) A.push(this._predict(_[I]));
      return A;
    } else throw new TypeError("x must be a number or array");
  }
  _predict() {
    throw new Error("_predict must be implemented");
  }
  train() {}
  toString() {
    return "";
  }
  toLaTeX() {
    return "";
  }
  score(_, A) {
    if (!isAnyArray(_) || !isAnyArray(A) || _.length !== A.length)
      throw new Error("x and y must be arrays of the same length");
    const I = _.length,
      D = new Array(I);
    for (let U = 0; U < I; U++) D[U] = this._predict(_[U]);
    let T = 0,
      C = 0,
      R = 0,
      B = 0,
      P = 0,
      O = 0,
      F = 0;
    for (let U = 0; U < I; U++)
      (T += D[U]),
        (C += A[U]),
        (P += D[U] * D[U]),
        (O += A[U] * A[U]),
        (F += D[U] * A[U]),
        A[U] !== 0 && (R += ((A[U] - D[U]) * (A[U] - D[U])) / A[U]),
        (B += (A[U] - D[U]) * (A[U] - D[U]));
    const L = (I * F - T * C) / Math.sqrt((I * P - T * T) * (I * O - C * C));
    return { r: L, r2: L * L, chi2: R, rmsd: Math.sqrt(B / I) };
  }
}
const require$$0$1 = getAugmentedNamespace(src$1);
function squaredEuclidean$4(E, _) {
  let A = 0;
  for (let I = 0; I < E.length; I++) A += (E[I] - _[I]) * (E[I] - _[I]);
  return A;
}
function euclidean$2(E, _) {
  return Math.sqrt(squaredEuclidean$4(E, _));
}
const euclidean$3 = Object.freeze(
    Object.defineProperty(
      { __proto__: null, squaredEuclidean: squaredEuclidean$4, euclidean: euclidean$2 },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  require$$0 = getAugmentedNamespace(euclidean$3),
  { squaredEuclidean: squaredEuclidean$3 } = require$$0,
  defaultOptions$b = { sigma: 1 };
let GaussianKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$b, _)), (this.sigma = _.sigma), (this.divisor = 2 * _.sigma * _.sigma);
  }
  compute(_, A) {
    const I = squaredEuclidean$3(_, A);
    return Math.exp(-I / this.divisor);
  }
};
var gaussianKernel = GaussianKernel$1;
const defaultOptions$a = { degree: 1, constant: 1, scale: 1 };
let PolynomialKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$a, _)),
      (this.degree = _.degree),
      (this.constant = _.constant),
      (this.scale = _.scale);
  }
  compute(_, A) {
    for (var I = 0, D = 0; D < _.length; D++) I += _[D] * A[D];
    return Math.pow(this.scale * I + this.constant, this.degree);
  }
};
var polynomialKernel = PolynomialKernel$1;
const defaultOptions$9 = { alpha: 0.01, constant: -Math.E };
let SigmoidKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$9, _)), (this.alpha = _.alpha), (this.constant = _.constant);
  }
  compute(_, A) {
    for (var I = 0, D = 0; D < _.length; D++) I += _[D] * A[D];
    return Math.tanh(this.alpha * I + this.constant);
  }
};
var sigmoidKernel = SigmoidKernel$1;
const defaultOptions$8 = { sigma: 1, degree: 1 };
let ANOVAKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$8, _)), (this.sigma = _.sigma), (this.degree = _.degree);
  }
  compute(_, A) {
    for (var I = 0, D = Math.min(_.length, A.length), T = 1; T <= D; ++T)
      I += Math.pow(Math.exp(-this.sigma * Math.pow(Math.pow(_[T - 1], T) - Math.pow(A[T - 1], T), 2)), this.degree);
    return I;
  }
};
var anovaKernel = ANOVAKernel$1;
const { squaredEuclidean: squaredEuclidean$2 } = require$$0,
  defaultOptions$7 = { sigma: 1 };
let CauchyKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$7, _)), (this.sigma = _.sigma);
  }
  compute(_, A) {
    return 1 / (1 + squaredEuclidean$2(_, A) / (this.sigma * this.sigma));
  }
};
var cauchyKernel = CauchyKernel$1;
const { euclidean: euclidean$1 } = require$$0,
  defaultOptions$6 = { sigma: 1 };
let ExponentialKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$6, _)), (this.sigma = _.sigma), (this.divisor = 2 * _.sigma * _.sigma);
  }
  compute(_, A) {
    const I = euclidean$1(_, A);
    return Math.exp(-I / this.divisor);
  }
};
var exponentialKernel = ExponentialKernel$1;
class HistogramIntersectionKernel {
  compute(_, A) {
    for (var I = Math.min(_.length, A.length), D = 0, T = 0; T < I; ++T) D += Math.min(_[T], A[T]);
    return D;
  }
}
var histogramIntersectionKernel = HistogramIntersectionKernel;
const { euclidean } = require$$0,
  defaultOptions$5 = { sigma: 1 };
let LaplacianKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$5, _)), (this.sigma = _.sigma);
  }
  compute(_, A) {
    const I = euclidean(_, A);
    return Math.exp(-I / this.sigma);
  }
};
var laplacianKernel = LaplacianKernel$1;
const { squaredEuclidean: squaredEuclidean$1 } = require$$0,
  defaultOptions$4 = { constant: 1 };
let MultiquadraticKernel$1 = class {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$4, _)), (this.constant = _.constant);
  }
  compute(_, A) {
    return Math.sqrt(squaredEuclidean$1(_, A) + this.constant * this.constant);
  }
};
var multiquadraticKernel = MultiquadraticKernel$1;
const { squaredEuclidean } = require$$0,
  defaultOptions$3 = { constant: 1 };
class RationalQuadraticKernel {
  constructor(_) {
    (_ = Object.assign({}, defaultOptions$3, _)), (this.constant = _.constant);
  }
  compute(_, A) {
    const I = squaredEuclidean(_, A);
    return 1 - I / (I + this.constant);
  }
}
var rationalQuadraticKernel = RationalQuadraticKernel;
const { Matrix: Matrix$1, MatrixTransposeView } = require$$0$1,
  GaussianKernel = gaussianKernel,
  PolynomialKernel = polynomialKernel,
  SigmoidKernel = sigmoidKernel,
  ANOVAKernel = anovaKernel,
  CauchyKernel = cauchyKernel,
  ExponentialKernel = exponentialKernel,
  HistogramKernel = histogramIntersectionKernel,
  LaplacianKernel = laplacianKernel,
  MultiquadraticKernel = multiquadraticKernel,
  RationalKernel = rationalQuadraticKernel,
  kernelType = {
    gaussian: GaussianKernel,
    rbf: GaussianKernel,
    polynomial: PolynomialKernel,
    poly: PolynomialKernel,
    anova: ANOVAKernel,
    cauchy: CauchyKernel,
    exponential: ExponentialKernel,
    histogram: HistogramKernel,
    min: HistogramKernel,
    laplacian: LaplacianKernel,
    multiquadratic: MultiquadraticKernel,
    rational: RationalKernel,
    sigmoid: SigmoidKernel,
    mlp: SigmoidKernel,
  };
class Kernel {
  constructor(_, A) {
    if (((this.kernelType = _), _ !== "linear"))
      if (typeof _ == "string") {
        _ = _.toLowerCase();
        var I = kernelType[_];
        if (I) this.kernelFunction = new I(A);
        else throw new Error(`unsupported kernel type: ${_}`);
      } else if (typeof _ == "object" && typeof _.compute == "function") this.kernelFunction = _;
      else throw new TypeError("first argument must be a valid kernel type or instance");
  }
  compute(_, A) {
    if (
      ((_ = Matrix$1.checkMatrix(_)),
      A === void 0 ? (A = _) : (A = Matrix$1.checkMatrix(A)),
      this.kernelType === "linear")
    )
      return _.mmul(new MatrixTransposeView(A));
    const I = new Matrix$1(_.rows, A.rows);
    if (_ === A)
      for (let D = 0; D < _.rows; D++)
        for (let T = D; T < _.rows; T++) {
          const C = this.kernelFunction.compute(_.getRow(D), _.getRow(T));
          I.set(D, T, C), I.set(T, D, C);
        }
    else
      for (let D = 0; D < _.rows; D++)
        for (let T = 0; T < A.rows; T++) I.set(D, T, this.kernelFunction.compute(_.getRow(D), A.getRow(T)));
    return I;
  }
}
var kernel = Kernel;
const defaultOptions$2 = { lambda: 0.1, kernelType: "gaussian", kernelOptions: {}, computeCoefficient: !1 };
class KernelRidgeRegression extends BaseRegression {
  constructor(_, A, I) {
    if ((super(), _ === !0))
      (this.alpha = A.alpha),
        (this.inputs = A.inputs),
        (this.kernelType = A.kernelType),
        (this.kernelOptions = A.kernelOptions),
        (this.kernel = new kernel(A.kernelType, A.kernelOptions));
    else {
      (_ = Matrix$2.checkMatrix(_)), (I = Object.assign({}, defaultOptions$2, I));
      const D = new kernel(I.kernelType, I.kernelOptions),
        T = D.compute(_),
        C = _.rows;
      T.add(Matrix$2.eye(C, C).mul(I.lambda)),
        (this.alpha = solve(T, A)),
        (this.inputs = _),
        (this.kernelType = I.kernelType),
        (this.kernelOptions = I.kernelOptions),
        (this.kernel = D);
    }
  }
  _predict(_) {
    return this.kernel.compute([_], this.inputs).mmul(this.alpha).getRow(0);
  }
  toJSON() {
    return {
      name: "kernelRidgeRegression",
      alpha: this.alpha,
      inputs: this.inputs,
      kernelType: this.kernelType,
      kernelOptions: this.kernelOptions,
    };
  }
  static load(_) {
    if (_.name !== "kernelRidgeRegression") throw new TypeError("not a KRR model");
    return new KernelRidgeRegression(!0, _);
  }
}
function background$1(E, _, A) {
  const I = new KernelRidgeRegression(E, _, A),
    D = new Array(this.size);
  for (let R = 0; R < this.width; R++) for (let B = 0; B < this.height; B++) D[B * this.width + R] = [R, B];
  const T = I.predict(D),
    C = Image.createFrom(this);
  for (let R = 0; R < this.size; R++) C.data[R] = Math.min(this.maxValue, Math.max(0, T[R][0]));
  return C;
}
function dilate(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("dilate", { bitDepth: [1, 8, 16], components: 1, alpha: 0 }),
    _.columns % 2 === 0 || _.rows % 2 === 0)
  )
    throw new TypeError("dilate: The number of rows and columns of the kernel must be odd");
  let I = !0;
  e: for (const T of _)
    for (const C of T)
      if (C !== 1) {
        I = !1;
        break e;
      }
  let D = this;
  for (let T = 0; T < A; T++)
    if (this.bitDepth === 1)
      if (I) {
        const C = D.clone();
        D = dilateOnceBinaryOnlyOnes(D, C, _.length, _[0].length);
      } else {
        const C = Image.createFrom(D);
        D = dilateOnceBinary(D, C, _);
      }
    else if (I) {
      const C = Image.createFrom(D);
      D = dilateOnceGreyOnlyOnes(D, C, _.length, _[0].length);
    } else {
      const C = Image.createFrom(D);
      D = dilateOnceGrey(D, C, _);
    }
  return D;
}
function dilateOnceGrey(E, _, A) {
  const I = A.length,
    D = A[0].length;
  let T = (I - 1) / 2,
    C = (D - 1) / 2;
  for (let R = 0; R < E.height; R++)
    for (let B = 0; B < E.width; B++) {
      let P = 0;
      for (let O = 0; O < D; O++)
        for (let F = 0; F < I; F++) {
          if (A[F][O] !== 1) continue;
          let L = F - T + B,
            U = O - C + R;
          if (L < 0 || U < 0 || L >= E.width || U >= E.height) continue;
          const z = E.getValueXY(L, U, 0);
          z > P && (P = z);
        }
      _.setValueXY(B, R, 0, P);
    }
  return _;
}
function dilateOnceGreyOnlyOnes(E, _, A, I) {
  const D = (A - 1) / 2,
    T = (I - 1) / 2,
    C = [];
  for (let R = 0; R < E.width; R++) C.push(0);
  for (let R = 0; R < E.height; R++) {
    for (let B = 0; B < E.width; B++) {
      let P = 0;
      for (let O = Math.max(0, R - T); O < Math.min(E.height, R + T + 1); O++) {
        const F = E.getValueXY(B, O, 0);
        F > P && (P = F);
      }
      C[B] = P;
    }
    for (let B = 0; B < E.width; B++) {
      let P = 0;
      for (let O = Math.max(0, B - D); O < Math.min(E.width, B + D + 1); O++) C[O] > P && (P = C[O]);
      _.setValueXY(B, R, 0, P);
    }
  }
  return _;
}
function dilateOnceBinary(E, _, A) {
  const I = A.length,
    D = A[0].length;
  let T = (I - 1) / 2,
    C = (D - 1) / 2;
  for (let R = 0; R < E.height; R++)
    for (let B = 0; B < E.width; B++) {
      let P = 0;
      e: for (let O = 0; O < D; O++)
        for (let F = 0; F < I; F++) {
          if (A[F][O] !== 1) continue;
          let L = F - T + B,
            U = O - C + R;
          if (U < 0 || L < 0 || L >= E.width || U >= E.height) continue;
          if (E.getBitXY(L, U) === 1) {
            P = 1;
            break e;
          }
        }
      P === 1 && _.setBitXY(B, R);
    }
  return _;
}
function dilateOnceBinaryOnlyOnes(E, _, A, I) {
  const D = (A - 1) / 2,
    T = (I - 1) / 2,
    C = [];
  for (let R = 0; R < E.width; R++) C.push(1);
  for (let R = 0; R < E.height; R++) {
    for (let B = 0; B < E.width; B++) {
      C[B] = 0;
      for (let P = Math.max(0, R - T); P < Math.min(E.height, R + T + 1); P++)
        if (E.getBitXY(B, P) === 1) {
          C[B] = 1;
          break;
        }
    }
    for (let B = 0; B < E.width; B++)
      if (_.getBitXY(B, R) !== 1) {
        for (let P = Math.max(0, B - D); P < Math.min(E.width, B + D + 1); P++)
          if (C[P] === 1) {
            _.setBitXY(B, R);
            break;
          }
      }
  }
  return _;
}
function erode(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("erode", { bitDepth: [1, 8, 16], components: 1, alpha: 0 }),
    _.columns % 2 === 0 || _.rows % 2 === 0)
  )
    throw new TypeError("erode: The number of rows and columns of the kernel must be odd");
  let I = !0;
  e: for (const T of _)
    for (const C of T)
      if (C !== 1) {
        I = !1;
        break e;
      }
  let D = this;
  for (let T = 0; T < A; T++)
    if (this.bitDepth === 1)
      if (I) {
        const C = D.clone();
        D = erodeOnceBinaryOnlyOnes(D, C, _.length, _[0].length);
      } else {
        const C = Image.createFrom(D);
        D = erodeOnceBinary(D, C, _);
      }
    else if (I) {
      const C = Image.createFrom(D);
      D = erodeOnceGreyOnlyOnes(D, C, _.length, _[0].length);
    } else {
      const C = Image.createFrom(D);
      D = erodeOnceGrey(D, C, _);
    }
  return D;
}
function erodeOnceGrey(E, _, A) {
  const I = A.length,
    D = A[0].length;
  let T = (I - 1) / 2,
    C = (D - 1) / 2;
  for (let R = 0; R < E.height; R++)
    for (let B = 0; B < E.width; B++) {
      let P = E.maxValue;
      for (let O = 0; O < D; O++)
        for (let F = 0; F < I; F++) {
          if (A[F][O] !== 1) continue;
          let L = F - T + B,
            U = O - C + R;
          if (L < 0 || U < 0 || L >= E.width || U >= E.height) continue;
          const z = E.getValueXY(L, U, 0);
          z < P && (P = z);
        }
      _.setValueXY(B, R, 0, P);
    }
  return _;
}
function erodeOnceGreyOnlyOnes(E, _, A, I) {
  const D = (A - 1) / 2,
    T = (I - 1) / 2,
    C = [];
  for (let R = 0; R < E.width; R++) C.push(0);
  for (let R = 0; R < E.height; R++) {
    for (let B = 0; B < E.width; B++) {
      let P = E.maxValue;
      for (let O = Math.max(0, R - T); O < Math.min(E.height, R + T + 1); O++) {
        const F = E.getValueXY(B, O, 0);
        F < P && (P = F);
      }
      C[B] = P;
    }
    for (let B = 0; B < E.width; B++) {
      let P = E.maxValue;
      for (let O = Math.max(0, B - D); O < Math.min(E.width, B + D + 1); O++) C[O] < P && (P = C[O]);
      _.setValueXY(B, R, 0, P);
    }
  }
  return _;
}
function erodeOnceBinary(E, _, A) {
  const I = A.length,
    D = A[0].length;
  let T = (I - 1) / 2,
    C = (D - 1) / 2;
  for (let R = 0; R < E.height; R++)
    for (let B = 0; B < E.width; B++) {
      let P = 1;
      e: for (let O = 0; O < D; O++)
        for (let F = 0; F < I; F++) {
          if (A[F][O] !== 1) continue;
          let L = F - T + B,
            U = O - C + R;
          if (U < 0 || L < 0 || L >= E.width || U >= E.height) continue;
          if (E.getBitXY(L, U) === 0) {
            P = 0;
            break e;
          }
        }
      P === 1 && _.setBitXY(B, R);
    }
  return _;
}
function erodeOnceBinaryOnlyOnes(E, _, A, I) {
  const D = (A - 1) / 2,
    T = (I - 1) / 2,
    C = [];
  for (let R = 0; R < E.width; R++) C.push(0);
  for (let R = 0; R < E.height; R++) {
    for (let B = 0; B < E.width; B++) {
      C[B] = 1;
      for (let P = Math.max(0, R - T); P < Math.min(E.height, R + T + 1); P++)
        if (E.getBitXY(B, P) === 0) {
          C[B] = 0;
          break;
        }
    }
    for (let B = 0; B < E.width; B++)
      if (_.getBitXY(B, R) !== 0) {
        for (let P = Math.max(0, B - D); P < Math.min(E.width, B + D + 1); P++)
          if (C[P] === 0) {
            _.clearBitXY(B, R);
            break;
          }
      }
  }
  return _;
}
function open$1(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("open", { bitDepth: [8, 16], components: 1, alpha: 0 }),
    _.columns % 2 === 0 || _.rows % 2 === 0)
  )
    throw new TypeError("open: The number of rows and columns of the kernel must be odd");
  let I = this;
  for (let D = 0; D < A; D++) (I = I.erode({ kernel: _ })), (I = I.dilate({ kernel: _ }));
  return I;
}
function close(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("close", { bitDepth: [1, 8, 16], components: 1, alpha: 0 }),
    _.columns % 2 === 0 || _.rows % 2 === 0)
  )
    throw new TypeError("close: The number of rows and columns of the kernel must be odd");
  let I = this;
  for (let D = 0; D < A; D++) I = I.dilate({ kernel: _ }).erode({ kernel: _ });
  return I;
}
function topHat(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("topHat", { bitDepth: [8, 16], components: 1, alpha: 0 }),
    _.length % 2 === 0 || _[0].length % 2 === 0)
  )
    throw new TypeError("topHat: The number of rows and columns of the kernel must be odd");
  let I = this;
  for (let D = 0; D < A; D++) I = I.open({ kernel: _ }).subtractImage(I, { absolute: !0 });
  return I;
}
function blackHat(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("blackHat", { bitDepth: [8, 16], components: 1, alpha: 0 }),
    _.columns % 2 === 0 || _.rows % 2 === 0)
  )
    throw new TypeError("blackHat: The number of rows and columns of the kernel must be odd");
  let I = this;
  for (let D = 0; D < A; D++) I = I.close({ kernel: _ }).subtractImage(I, { absolute: !0 });
  return I;
}
function morphologicalGradient(E = {}) {
  let {
    kernel: _ = [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
    iterations: A = 1,
  } = E;
  if (
    (this.checkProcessable("morphologicalGradient", { bitDepth: [8, 16], components: 1, alpha: 0 }),
    _.columns % 2 === 0 || _.rows % 2 === 0)
  )
    throw new TypeError("morphologicalGradient: The number of rows and columns of the kernel must be odd");
  let I = this;
  for (let D = 0; D < A; D++) {
    let T = I.dilate({ kernel: _ }),
      C = I.erode({ kernel: _ });
    I = T.subtractImage(C, { absolute: !0 });
  }
  return I;
}
function order4Points(E) {
  let _ = 0,
    A = 0,
    I = 0,
    D = 0,
    T = E[0][0],
    C = 0;
  for (let P = 1; P < E.length; P++) E[P][0] < T && ((T = E[P][0]), (C = P));
  let R = E[(C + 1) % E.length][0],
    B = (C + 1) % E.length;
  for (let P = 1; P < E.length; P++) E[P][0] < R && P !== C && ((R = E[P][0]), (B = P));
  return (
    E[B][1] < E[C][1]
      ? ((_ = E[B]),
        (D = E[C]),
        C !== (B + 1) % 4 ? ((A = E[(B + 1) % 4]), (I = E[(B + 2) % 4])) : ((A = E[(B + 2) % 4]), (I = E[(B + 3) % 4])))
      : ((D = E[B]),
        (_ = E[C]),
        B !== (C + 1) % 4
          ? ((A = E[(C + 1) % 4]), (I = E[(C + 2) % 4]))
          : ((A = E[(C + 2) % 4]), (I = E[(C + 3) % 4]))),
    [_, A, I, D]
  );
}
function distance2Points(E, _) {
  return Math.sqrt(Math.pow(E[0] - _[0], 2) + Math.pow(E[1] - _[1], 2));
}
function crossVect(E, _) {
  return [E[1] * _[2] - E[2] * _[1], E[2] * _[0] - E[0] * _[2], E[0] * _[1] - E[1] * _[0]];
}
function dotVect(E, _) {
  return E[0] * _[0] + E[1] * _[1] + E[2] * _[2];
}
function computeWidthAndHeigth(E, _, A, I, D, T) {
  let C = Math.max(distance2Points(E, _), distance2Points(I, A)),
    R = Math.max(distance2Points(E, I), distance2Points(_, A)),
    B = 0,
    P = 0,
    O = Math.ceil(D / 2),
    F = Math.ceil(T / 2),
    L = C / R,
    U = [E[0], E[1], 1],
    z = [_[0], _[1], 1],
    V = [I[0], I[1], 1],
    X = [A[0], A[1], 1],
    G = dotVect(crossVect(U, X), V) / dotVect(crossVect(z, X), V),
    Z = dotVect(crossVect(U, X), z) / dotVect(crossVect(V, X), z),
    Y = [G * z[0] - U[0], G * z[1] - U[1], G * z[2] - U[2]],
    q = [Z * V[0] - U[0], Z * V[1] - U[1], Z * V[2] - U[2]],
    W = Y[0],
    ee = Y[1],
    te = Y[2],
    Q = q[0],
    J = q[1],
    K = q[2],
    ne =
      (1 / (te * K)) *
      (W * Q - (W * K + te * Q) * O + te * K * O * O + (ee * J - (ee * K + te * J) * F + te * K * F * F));
  ne >= 0 ? (ne = Math.sqrt(ne)) : (ne = Math.sqrt(-ne));
  let re = new Matrix$2([
      [ne, 0, O],
      [0, ne, F],
      [0, 0, 1],
    ]),
    ie = re.transpose(),
    se = inverse(ie),
    oe = inverse(re),
    _e = Matrix$2.rowVector(Y),
    ve = Matrix$2.rowVector(q),
    fe = Math.sqrt(dotVect(_e.mmul(se).mmul(oe).to1DArray(), Y) / dotVect(ve.mmul(se).mmul(oe).to1DArray(), q));
  return (
    fe === 0 || L === 0
      ? ((B = Math.ceil(C)), (P = Math.ceil(R)))
      : fe < L
        ? ((B = Math.ceil(C)), (P = Math.ceil(B / fe)))
        : ((P = Math.ceil(R)), (B = Math.ceil(fe * P))),
    [B, P]
  );
}
function projectionPoint(E, _, A, I, D, T, C, R, B, P, O, F) {
  let [L, U] = [(A * E + I * _ + D) / (B * E + P * _ + 1), (T * E + C * _ + R) / (B * E + P * _ + 1)];
  return O.getValueXY(Math.floor(L), Math.floor(U), F);
}
function warpingFourPoints(E, _ = {}) {
  let { calculateRatio: A = !0 } = _;
  if (E.length !== 4)
    throw new Error(
      `The array pts must have four elements, which are the four corners. Currently, pts have ${E.length} elements`,
    );
  let [I, D, T, C] = E,
    R = [I, D, T, C],
    [B, P, O, F] = order4Points(R),
    L,
    U;
  A
    ? ([L, U] = computeWidthAndHeigth(B, P, O, F, this.width, this.height))
    : ((L = Math.ceil(Math.max(distance2Points(B, P), distance2Points(F, O)))),
      (U = Math.ceil(Math.max(distance2Points(B, F), distance2Points(P, O)))));
  let z = Image.createFrom(this, { width: L, height: U }),
    [V, X] = B,
    [G, Z] = P,
    [Y, q] = O,
    [W, ee] = F,
    [te, Q] = [0, 0],
    [J, K] = [0, L - 1],
    [ne, re] = [U - 1, L - 1],
    [ie, se] = [U - 1, 0],
    oe = new Matrix$2([
      [te, Q, 1, 0, 0, 0, -te * V, -Q * V],
      [J, K, 1, 0, 0, 0, -J * G, -K * G],
      [ne, re, 1, 0, 0, 0, -ne * Y, -Q * Y],
      [ie, se, 1, 0, 0, 0, -ie * W, -se * W],
      [0, 0, 0, te, Q, 1, -te * X, -Q * X],
      [0, 0, 0, J, K, 1, -J * Z, -K * Z],
      [0, 0, 0, ne, re, 1, -ne * q, -re * q],
      [0, 0, 0, ie, se, 1, -ie * ee, -se * ee],
    ]),
    _e = Matrix$2.columnVector([V, G, Y, W, X, Z, q, ee]),
    fe = new SingularValueDecomposition(oe).solve(_e),
    [ke, me, Ee, Se, ue, xe, pe, we] = fe.to1DArray(),
    Ne = new Matrix$2(U, L);
  for (let Ce = 0; Ce < this.channels; Ce++) {
    for (let De = 0; De < U; De++)
      for (let Ue = 0; Ue < L; Ue++) Ne.set(De, Ue, projectionPoint(De, Ue, ke, me, Ee, Se, ue, xe, pe, we, this, Ce));
    z.setMatrix(Ne, { channel: Ce });
  }
  return z;
}
function crop(E = {}) {
  let { x: _ = 0, y: A = 0, width: I = this.width - _, height: D = this.height - A } = E;
  if (
    (this.checkProcessable("crop", { bitDepth: [1, 8, 16] }),
    (_ = Math.round(_)),
    (A = Math.round(A)),
    (I = Math.round(I)),
    (D = Math.round(D)),
    _ > this.width - 1 || A > this.height - 1)
  )
    throw new RangeError(`crop: origin (x:${_}, y:${A}) out of range (${this.width - 1}; ${this.height - 1})`);
  if (I <= 0 || D <= 0)
    throw new RangeError(`crop: width and height (width:${I}; height:${D}) must be positive numbers`);
  if (_ < 0 || A < 0) throw new RangeError(`crop: x and y (x:${_}, y:${A}) must be positive numbers`);
  if (I > this.width - _ || D > this.height - A)
    throw new RangeError(`crop: (x: ${_}, y:${A}, width:${I}, height:${D}) size is out of range`);
  let T = this;
  if (this.bitDepth === 1) {
    const C = new Image(I, D, { kind: "BINARY", parent: this });
    T = cropBinary(this, C, _, A, I, D);
  } else {
    const C = Image.createFrom(this, { width: I, height: D, position: [_, A] });
    T = cropDefault(this, C, _, A, I, D);
  }
  return T;
}
function cropDefault(E, _, A, I, D, T) {
  let C = D * E.channels,
    R = I + T,
    B = 0,
    P = A * E.channels;
  for (let O = I; O < R; O++) {
    let F = O * E.width * E.channels + P,
      L = F + C;
    for (; F < L; F++) _.data[B++] = E.data[F];
  }
  return _;
}
function cropBinary(E, _, A, I, D, T) {
  let C = D * E.channels,
    R = I + T,
    B = 0,
    P = A * E.channels;
  for (let O = I; O < R; O++) {
    let F = O * E.width * E.channels + P,
      L = F + C;
    for (; F < L; F++) E.getBit(F) && _.setBit(B), ++B;
  }
  return _;
}
function cropAlpha(E = {}) {
  this.checkProcessable("cropAlpha", { alpha: 1 });
  const { threshold: _ = this.maxValue } = E;
  let A = findLeft(this, _, this.components);
  if (A === -1) throw new Error("Could not find new dimensions. Threshold may be too high.");
  let I = findTop(this, _, this.components, A),
    D = findBottom(this, _, this.components, A),
    T = findRight(this, _, this.components, A, I, D);
  return this.crop({ x: A, y: I, width: T - A + 1, height: D - I + 1 });
}
function findLeft(E, _, A) {
  for (let I = 0; I < E.width; I++) for (let D = 0; D < E.height; D++) if (E.getValueXY(I, D, A) >= _) return I;
  return -1;
}
function findTop(E, _, A, I) {
  for (let D = 0; D < E.height; D++) for (let T = I; T < E.width; T++) if (E.getValueXY(T, D, A) >= _) return D;
  return -1;
}
function findBottom(E, _, A, I) {
  for (let D = E.height - 1; D >= 0; D--) for (let T = I; T < E.width; T++) if (E.getValueXY(T, D, A) >= _) return D;
  return -1;
}
function findRight(E, _, A, I, D, T) {
  for (let C = E.width - 1; C >= I; C--) for (let R = D; R <= T; R++) if (E.getValueXY(C, R, A) >= _) return C;
  return -1;
}
function getFactor(E) {
  if (typeof E == "string") {
    const _ = E[E.length - 1];
    (E = parseFloat(E)), _ === "%" && (E /= 100);
  }
  return E;
}
function getThreshold$1(E, _) {
  if (!_) throw Error("getThreshold : the maxValue should be specified");
  if (typeof E == "string") {
    if (E[E.length - 1] !== "%") throw Error("getThreshold : if the value is a string it must finish by %");
    return (parseFloat(E) / 100) * _;
  } else {
    if (typeof E == "number") return E < 1 ? E * _ : E;
    throw Error("getThreshold : the value is not valid");
  }
}
function factorDimensions(E, _, A) {
  E = getFactor(E);
  let I = Math.round(E * _),
    D = Math.round(E * A);
  return I <= 0 && (I = 1), D <= 0 && (D = 1), { width: I, height: D };
}
function checkRow(E, _) {
  if (_ < 0 || _ >= E.height)
    throw new RangeError(`row must be included between 0 and ${E.height - 1}. Current value: ${_}`);
}
function checkColumn(E, _) {
  if (_ < 0 || _ >= E.width)
    throw new RangeError(`column must be included between 0 and ${E.width - 1}. Current value: ${_}`);
}
function checkChannel(E, _) {
  if (_ < 0 || _ >= E.channels)
    throw new RangeError(`channel must be included between 0 and ${E.channels - 1}. Current value: ${_}`);
}
const validInterpolations = {
  nearestneighbor: "nearestNeighbor",
  nearestneighbour: "nearestNeighbor",
  bilinear: "bilinear",
};
function checkInterpolation(E) {
  if (typeof E != "string") throw new TypeError("interpolation must be a string");
  if (((E = E.toLowerCase()), !validInterpolations[E])) throw new RangeError(`invalid interpolation algorithm: ${E}`);
  return validInterpolations[E];
}
function nearestNeighbor(E, _, A) {
  const I = this.width / _,
    D = this.height / A;
  if (this.bitDepth > 1)
    for (let T = 0; T < _; T++) {
      const C = Math.floor((T + 0.5) * I);
      for (let R = 0; R < A; R++) {
        const B = Math.floor((R + 0.5) * D);
        for (let P = 0; P < this.channels; P++) E.setValueXY(T, R, P, this.getValueXY(C, B, P));
      }
    }
  else
    for (let T = 0; T < _; T++) {
      const C = Math.floor((T + 0.5) * I);
      for (let R = 0; R < A; R++) {
        const B = Math.floor((R + 0.5) * D);
        this.getBitXY(C, B) && E.setBitXY(T, R);
      }
    }
}
function resize(E = {}) {
  const { factor: _ = 1, interpolation: A = validInterpolations.nearestneighbor, preserveAspectRatio: I = !0 } = E,
    D = checkInterpolation(A);
  let T = E.width,
    C = E.height;
  if (
    (T || (C && I ? (T = Math.round(C * (this.width / this.height))) : (T = this.width)),
    C || (I ? (C = Math.round(T * (this.height / this.width))) : (C = this.height)),
    ({ width: T, height: C } = factorDimensions(_, T, C)),
    T === this.width && C === this.height)
  ) {
    const O = this.clone();
    return (O.position = [0, 0]), O;
  }
  let R = Math.round((this.width - T) / 2),
    B = Math.round((this.height - C) / 2);
  const P = Image.createFrom(this, { width: T, height: C, position: [R, B] });
  switch (D) {
    case validInterpolations.nearestneighbor:
      nearestNeighbor.call(this, P, T, C);
      break;
    default:
      throw new Error(`unsupported resize interpolation: ${D}`);
  }
  return P;
}
function hsv() {
  this.checkProcessable("hsv", { bitDepth: [8, 16], alpha: [0, 1], colorModel: [RGB$1] });
  let E = Image.createFrom(this, { colorModel: HSV }),
    _ = 0,
    A = this.data;
  for (let I = 0; I < A.length; I += this.channels) {
    let D = A[I],
      T = A[I + 1],
      C = A[I + 2],
      R = Math.min(D, T, C),
      B = Math.max(D, T, C),
      P = B - R,
      O = 0,
      F = B === 0 ? 0 : P / B,
      L = B;
    if (B !== R) {
      switch (B) {
        case D:
          O = (T - C) / P + (T < C ? 6 : 0);
          break;
        case T:
          O = (C - D) / P + 2;
          break;
        case C:
          O = (D - T) / P + 4;
          break;
        default:
          throw new Error("unreachable");
      }
      O /= 6;
    }
    (E.data[_++] = O * this.maxValue),
      (E.data[_++] = F * this.maxValue),
      (E.data[_++] = L),
      this.alpha && (E.data[_++] = A[I + 3]);
  }
  return E;
}
function hsl$1() {
  this.checkProcessable("hsl", { bitDepth: [8, 16], alpha: [0, 1], colorModel: [RGB$1] });
  let E = Image.createFrom(this, { colorModel: HSL }),
    _ = Math.floor(this.maxValue / 2),
    A = 0,
    I = this.data;
  for (let D = 0; D < I.length; D += this.channels) {
    let T = I[D],
      C = I[D + 1],
      R = I[D + 2],
      B = Math.max(T, C, R),
      P = Math.min(T, C, R),
      O = 0,
      F = 0,
      L = (B + P) / 2;
    if (B !== P) {
      let U = B - P;
      switch (((F = L > _ ? U / (2 - B - P) : U / (B + P)), B)) {
        case T:
          O = (C - R) / U + (C < R ? 6 : 0);
          break;
        case C:
          O = (R - T) / U + 2;
          break;
        case R:
          O = (T - C) / U + 4;
          break;
        default:
          throw new Error("unreachable");
      }
      O /= 6;
    }
    (E.data[A++] = O * this.maxValue),
      (E.data[A++] = F * this.maxValue),
      (E.data[A++] = L),
      this.alpha && (E.data[A++] = I[D + 3]);
  }
  return E;
}
function cmyk() {
  this.checkProcessable("cmyk", { bitDepth: [8, 16], alpha: [0, 1], colorModel: [RGB$1] });
  let E = Image.createFrom(this, { components: 4, colorModel: CMYK$1 }),
    _ = 0,
    A = this.data;
  for (let I = 0; I < A.length; I += this.channels) {
    let D = A[I],
      T = A[I + 1],
      C = A[I + 2],
      R = Math.min(this.maxValue - D, this.maxValue - T, this.maxValue - C),
      B = (this.maxValue - D - R) / (1 - R / this.maxValue),
      P = (this.maxValue - T - R) / (1 - R / this.maxValue),
      O = (this.maxValue - C - R) / (1 - R / this.maxValue);
    (E.data[_++] = Math.round(B)),
      (E.data[_++] = Math.round(P)),
      (E.data[_++] = Math.round(O)),
      (E.data[_++] = Math.round(R)),
      this.alpha && (E.data[_++] = A[I + 3]);
  }
  return E;
}
function rgba8() {
  return new Image(this.width, this.height, this.getRGBAData(), { kind: "RGBA", parent: this });
}
const methods$1 = {
  luma709(E, _, A) {
    return (E * 6966 + _ * 23436 + A * 2366) >> 15;
  },
  luma601(E, _, A) {
    return (E * 9798 + _ * 19235 + A * 3735) >> 15;
  },
  maximum(E, _, A) {
    return Math.max(E, _, A);
  },
  minimum(E, _, A) {
    return Math.min(E, _, A);
  },
  average(E, _, A) {
    return ((E + _ + A) / 3) >> 0;
  },
  minmax(E, _, A) {
    return (Math.max(E, _, A) + Math.min(E, _, A)) / 2;
  },
  red(E) {
    return E;
  },
  green(E, _) {
    return _;
  },
  blue(E, _, A) {
    return A;
  },
  cyan(E, _, A, I) {
    let D = methods$1.black(E, _, A, I);
    return ((I.maxValue - E - D) / (1 - D / I.maxValue)) >> 0;
  },
  magenta(E, _, A, I) {
    let D = methods$1.black(E, _, A, I);
    return ((I.maxValue - _ - D) / (1 - D / I.maxValue)) >> 0;
  },
  yellow(E, _, A, I) {
    let D = methods$1.black(E, _, A, I);
    return ((I.maxValue - A - D) / (1 - D / I.maxValue)) >> 0;
  },
  black(E, _, A, I) {
    return Math.min(I.maxValue - E, I.maxValue - _, I.maxValue - A);
  },
  hue(E, _, A, I) {
    let D = methods$1.min(E, _, A),
      T = methods$1.max(E, _, A);
    if (T === D) return 0;
    let C = 0,
      R = T - D;
    switch (T) {
      case E:
        C = (_ - A) / R + (_ < A ? 6 : 0);
        break;
      case _:
        C = (A - E) / R + 2;
        break;
      case A:
        C = (E - _) / R + 4;
        break;
      default:
        throw new Error("unreachable");
    }
    return ((C / 6) * I.maxValue) >> 0;
  },
  saturation(E, _, A, I) {
    let D = methods$1.min(E, _, A),
      T = methods$1.max(E, _, A),
      C = T - D;
    return T === 0 ? 0 : (C / T) * I.maxValue;
  },
  lightness(E, _, A) {
    let I = methods$1.min(E, _, A);
    return (methods$1.max(E, _, A) + I) / 2;
  },
};
Object.defineProperty(methods$1, "luminosity", { enumerable: !1, value: methods$1.lightness });
Object.defineProperty(methods$1, "luminance", { enumerable: !1, value: methods$1.lightness });
Object.defineProperty(methods$1, "min", { enumerable: !1, value: methods$1.minimum });
Object.defineProperty(methods$1, "max", { enumerable: !1, value: methods$1.maximum });
Object.defineProperty(methods$1, "brightness", { enumerable: !1, value: methods$1.maximum });
Object.keys(methods$1).forEach((E) => {});
function grey(E = {}) {
  let { algorithm: _ = "luma709", keepAlpha: A = !1, mergeAlpha: I = !0 } = E;
  if (typeof _ != "string" && typeof _ != "function") throw new TypeError("algorithm must be a string or a function");
  this.checkProcessable("grey", { bitDepth: [8, 16], alpha: [0, 1] }),
    this.components === 1 && (_ = "red"),
    (A &= this.alpha),
    (I &= this.alpha),
    A && (I = !1);
  let D = getOutputImage(this, E, { components: 1, alpha: A, colorModel: GREY$1 }),
    T;
  if (typeof _ == "function") T = _;
  else if (((T = methods$1[_.toLowerCase()]), !T)) throw new Error(`unsupported grey algorithm: ${_}`);
  let C = 0;
  for (let R = 0; R < this.data.length; R += this.channels)
    I
      ? (D.data[C++] = clamp$1(
          (T(this.data[R], this.data[R + 1], this.data[R + 2], this) * this.data[R + this.components]) / this.maxValue,
          this,
        ))
      : ((D.data[C++] = clamp$1(T(this.data[R], this.data[R + 1], this.data[R + 2], this), this)),
        D.alpha && (D.data[C++] = this.data[R + this.components]));
  return D;
}
function huang(E) {
  let _ = 0;
  for (let O = 0; O < E.length; O++)
    if (E[O] !== 0) {
      _ = O;
      break;
    }
  let A = E.length - 1;
  for (let O = E.length - 1; O >= _; O--)
    if (E[O] !== 0) {
      A = O;
      break;
    }
  let I = 1 / (A - _),
    D = new Array(E.length),
    T = 0,
    C = 0;
  for (let O = _; O < E.length; O++) (T += O * E[O]), (C += E[O]), (D[O] = T / C);
  let R = new Array(E.length);
  T = C = 0;
  for (let O = A; O > 0; O--) (T += O * E[O]), (C += E[O]), (R[O - 1] = T / C);
  let B = -1,
    P = Number.MAX_VALUE;
  for (let O = 0; O < E.length; O++) {
    let F = 0,
      L;
    for (let U = 0; U <= O; U++)
      (L = 1 / (1 + I * Math.abs(U - D[O]))),
        L < 1e-6 || L > 0.999999 || (F += E[U] * (-L * Math.log(L) - (1 - L) * Math.log(1 - L)));
    for (let U = O + 1; U < E.length; U++)
      (L = 1 / (1 + I * Math.abs(U - R[O]))),
        L < 1e-6 || L > 0.999999 || (F += E[U] * (-L * Math.log(L) - (1 - L) * Math.log(1 - L)));
    F < P && ((P = F), (B = O));
  }
  return B;
}
function intermodes(E) {
  let _ = E.slice(),
    A = 0;
  for (; !bimodalTest$1(_); ) {
    let D = 0,
      T = 0,
      C = _[0];
    for (let R = 0; R < E.length - 1; R++) (D = T), (T = C), (C = _[R + 1]), (_[R] = (D + T + C) / 3);
    if (((_[E.length - 1] = (T + C) / 3), A++, A > 1e4))
      throw new Error("Intermodes Threshold not found after 10000 iterations");
  }
  let I = 0;
  for (let D = 1; D < E.length - 1; D++) _[D - 1] < _[D] && _[D + 1] < _[D] && (I += D);
  return Math.floor(I / 2);
}
function bimodalTest$1(E) {
  let _ = !1,
    A = 0;
  for (let I = 1; I < E.length - 1; I++) if (E[I - 1] < E[I] && E[I + 1] < E[I] && (A++, A > 2)) return !1;
  return A === 2 && (_ = !0), _;
}
function isodata(E) {
  let _,
    A,
    I,
    D,
    T = 0;
  for (let C = 1; C < E.length; C++)
    if (E[C] > 0) {
      T = C + 1;
      break;
    }
  for (;;) {
    (_ = 0), (I = 0);
    for (let C = 0; C < T; C++) (I = I + E[C]), (_ = _ + E[C] * C);
    (D = 0), (A = 0);
    for (let C = T + 1; C < E.length; C++) (A += E[C]), (D += E[C] * C);
    if (I > 0 && A > 0 && ((_ /= I), (D /= A), T === Math.round((_ + D) / 2))) break;
    if ((T++, T > E.length - 2)) throw new Error("Threshold not found");
  }
  return T;
}
function li(E, _) {
  let A, I, D, T, C, R, B, P, O, F, L, U;
  (L = 0.5), (F = 0);
  for (let z = 0; z < E.length; z++) F += z * E[z];
  (F /= _), (B = F);
  do {
    (R = B), (A = (R + 0.5) | 0), (I = 0), (T = 0);
    for (let z = 0; z <= A; z++) (I += z * E[z]), (T += E[z]);
    (P = T === 0 ? 0 : I / T), (D = 0), (C = 0);
    for (let z = A + 1; z < E.length; z++) (D += z * E[z]), (C += E[z]);
    (O = C === 0 ? 0 : D / C),
      (U = (P - O) / (Math.log(P) - Math.log(O))),
      U < -Number.EPSILON ? (B = (U - 0.5) | 0) : (B = (U + 0.5) | 0);
  } while (Math.abs(B - R) > L);
  return A;
}
function maxEntropy(E, _) {
  let A = new Array(E.length);
  for (let L = 0; L < E.length; L++) A[L] = E[L] / _;
  let I = new Array(E.length),
    D = new Array(E.length);
  (I[0] = A[0]), (D[0] = 1 - I[0]);
  for (let L = 1; L < E.length; L++) (I[L] = I[L - 1] + A[L]), (D[L] = 1 - I[L]);
  let T = 0;
  for (let L = 0; L < E.length; L++)
    if (Math.abs(I[L]) >= Number.EPSILON) {
      T = L;
      break;
    }
  let C = E.length - 1;
  for (let L = E.length - 1; L >= T; L--)
    if (Math.abs(D[L]) >= Number.EPSILON) {
      C = L;
      break;
    }
  let R = -1,
    B,
    P = Number.MIN_VALUE,
    O,
    F;
  for (let L = T; L <= C; L++) {
    O = 0;
    for (let U = 0; U <= L; U++) E[U] !== 0 && (O -= (A[U] / I[L]) * Math.log(A[U] / I[L]));
    F = 0;
    for (let U = L + 1; U < E.length; U++) E[U] !== 0 && (F -= (A[U] / D[L]) * Math.log(A[U] / D[L]));
    (B = O + F), P < B && ((P = B), (R = L));
  }
  return R;
}
function mean$1(E, _) {
  let A = 0;
  for (let I = 0; I < E.length; I++) A += I * E[I];
  return Math.floor(A / _);
}
function minError(E, _) {
  let A,
    I = -2,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V = 0;
  for (let X = 0; X < E.length; X++) V += X * E[X];
  for (V /= _, A = V; A !== I; ) {
    let X = sumA(E, A),
      G = sumA(E, E.length - 1),
      Z = sumB(E, A),
      Y = sumB(E, E.length - 1),
      q = sumC(E, A),
      W = sumC(E, E.length - 1);
    if (
      ((D = Z / X),
      (T = (Y - Z) / (G - X)),
      (C = X / G),
      (R = (G - X) / G),
      (B = q / X - D * D),
      (P = (W - q) / (G - X) - T * T),
      (O = 1 / B - 1 / P),
      (F = D / B - T / P),
      (L = (D * D) / B - (T * T) / P + Math.log10((B * (R * R)) / (P * (C * C)))),
      (U = F * F - O * L),
      U < 0)
    )
      return A;
    (I = A), (z = (F + Math.sqrt(U)) / O), isNaN(z) ? (A = I) : (A = Math.floor(z));
  }
  return A;
}
function sumA(E, _) {
  let A = 0;
  for (let I = 0; I <= _; I++) A += E[I];
  return A;
}
function sumB(E, _) {
  let A = 0;
  for (let I = 0; I <= _; I++) A += I * E[I];
  return A;
}
function sumC(E, _) {
  let A = 0;
  for (let I = 0; I <= _; I++) A += I * I * E[I];
  return A;
}
function minimum(E) {
  if (E.length < 2) return 0;
  let _ = 0,
    A = -1,
    I = -1,
    D = new Array(E.length);
  for (let T = 0; T < E.length; T++) (D[T] = E[T]), E[T] > 0 && (I = T);
  for (; !bimodalTest(D); ) if (((D = smoothed(D)), _++, _ > 1e4)) return A;
  return (A = minimumBetweenPeeks(D, I)), A;
}
function smoothed(E) {
  let _ = new Array(E.length);
  for (let A = 1; A < E.length - 1; A++) _[A] = (E[A - 1] + E[A] + E[A + 1]) / 3;
  return (_[0] = (E[0] + E[1]) / 3), (_[E.length - 1] = (E[E.length - 2] + E[E.length - 1]) / 3), _;
}
function minimumBetweenPeeks(E, _) {
  let A;
  for (let I = 1; I < _; I++)
    if (E[I - 1] > E[I] && E[I + 1] >= E[I]) {
      A = I;
      break;
    }
  return A;
}
function bimodalTest(E) {
  let _ = E.length,
    A = !1,
    I = 0;
  for (let D = 1; D < _ - 1; D++) if (E[D - 1] < E[D] && E[D + 1] < E[D] && (I++, I > 2)) return !1;
  return I === 2 && (A = !0), A;
}
function moments(E, _) {
  let A = 1,
    I = 0,
    D = 0,
    T = 0,
    C = 0,
    R,
    B,
    P,
    O,
    F,
    L,
    U = -1,
    z = E.length,
    V = new Array(z);
  for (let X = 0; X < z; X++) V[X] = E[X] / _;
  for (let X = 0; X < z; X++) (I += X * V[X]), (D += X * X * V[X]), (T += X * X * X * V[X]);
  (B = A * D - I * I),
    (P = (-D * D + I * T) / B),
    (O = (A * -T + D * I) / B),
    (F = 0.5 * (-O - Math.sqrt(O * O - 4 * P))),
    (L = 0.5 * (-O + Math.sqrt(O * O - 4 * P))),
    (R = (L - I) / (L - F));
  for (let X = 0; X < z; X++)
    if (((C += V[X]), C > R)) {
      U = X;
      break;
    }
  return U;
}
function otsu(E, _) {
  let A = 0,
    I = 0,
    D = 0,
    T = 0,
    C = 0;
  for (let R = 0; R < E.length; R++) C += R * E[R];
  for (let R = 0; R < E.length; R++) {
    I = I + E[R];
    const B = _ - I;
    if (I === 0 || B === 0) continue;
    A = A + R * E[R];
    const P = (C - A) / B,
      O = I * B * (A / I - P) * (A / I - P);
    O >= D && ((T = R), (D = O));
  }
  return T;
}
function percentile(E) {
  let _ = -1,
    A = 0.5,
    I = new Array(E.length),
    D = partialSum(E, E.length - 1),
    T = 1;
  for (let C = 0; C < E.length; C++) (I[C] = Math.abs(partialSum(E, C) / D - A)), I[C] < T && ((T = I[C]), (_ = C));
  return _;
}
function partialSum(E, _) {
  let A = 0;
  for (let I = 0; I <= _; I++) A += E[I];
  return A;
}
function renyiEntropy(E, _) {
  let A,
    I,
    D,
    T = new Array(E.length),
    C = new Array(E.length),
    R = new Array(E.length),
    B = 0,
    P = 0,
    O = 0,
    F = 0,
    L = 0,
    U = 0,
    V = 1 / (1 - 0.5),
    G = 1 / (1 - 2);
  for (let W = 0; W < E.length; W++) T[W] = E[W] / _;
  (C[0] = T[0]), (R[0] = 1 - C[0]);
  for (let W = 1; W < E.length; W++) (C[W] = C[W - 1] + T[W]), (R[W] = 1 - C[W]);
  I = 0;
  for (let W = 0; W < E.length; W++)
    if (Math.abs(C[W]) >= Number.EPSILON) {
      I = W;
      break;
    }
  D = E.length - 1;
  for (let W = E.length - 1; W >= I; W--)
    if (Math.abs(R[W]) >= Number.EPSILON) {
      D = W;
      break;
    }
  for (let W = I; W <= D; W++) {
    let ee = 0,
      te = 0,
      Q = 0;
    for (let oe = 0; oe <= W; oe++)
      E[oe] !== 0 && (ee -= (T[oe] / C[W]) * Math.log(T[oe] / C[W])),
        (te += Math.sqrt(T[oe] / C[W])),
        (Q += (T[oe] * T[oe]) / (C[W] * C[W]));
    let J = 0,
      K = 0,
      ne = 0;
    for (let oe = W + 1; oe < E.length; oe++)
      E[oe] !== 0 && (J -= (T[oe] / R[W]) * Math.log(T[oe] / R[W])),
        (K += Math.sqrt(T[oe] / R[W])),
        (ne += (T[oe] * T[oe]) / (R[W] * R[W]));
    let re = ee + J,
      ie = V * (te * K > 0 ? Math.log(te * K) : 0),
      se = G * (Q * ne > 0 ? Math.log(Q * ne) : 0);
    re > F && ((F = re), (B = W)), ie > L && ((L = ie), (P = W)), se > U && ((U = se), (O = W));
  }
  let Z = [B, P, O];
  Z.sort((W, ee) => W - ee);
  let Y;
  Math.abs(Z[0] - Z[1]) <= 5
    ? Math.abs(Z[1] - Z[2]) <= 5
      ? (Y = [1, 2, 1])
      : (Y = [0, 1, 3])
    : Math.abs(Z[1] - Z[2]) <= 5
      ? (Y = [3, 1, 0])
      : (Y = [1, 2, 1]);
  let q = C[Z[2]] - C[Z[0]];
  return (
    (A = Math.round(Z[0] * (C[Z[0]] + 0.25 * q * Y[0]) + 0.25 * Z[1] * q * Y[1] + Z[2] * (R[Z[2]] + 0.25 * q * Y[2]))),
    A
  );
}
function shanbhag(E, _) {
  let A = new Array(E.length);
  for (let U = 0; U < E.length; U++) A[U] = E[U] / _;
  let I = new Array(E.length),
    D = new Array(E.length);
  (I[0] = A[0]), (D[0] = 1 - I[0]);
  for (let U = 1; U < E.length; U++) (I[U] = I[U - 1] + A[U]), (D[U] = 1 - I[U]);
  let T = 0;
  for (let U = 0; U < E.length; U++)
    if (Math.abs(I[U]) >= Number.EPSILON) {
      T = U;
      break;
    }
  let C = E.length - 1;
  for (let U = E.length - 1; U >= T; U--)
    if (Math.abs(D[U]) >= Number.EPSILON) {
      C = U;
      break;
    }
  let R = -1,
    B = Number.MAX_VALUE,
    P,
    O,
    F,
    L;
  for (let U = T; U <= C; U++) {
    (F = 0), (P = 0.5 / I[U]);
    for (let z = 1; z <= U; z++) F -= A[z] * Math.log(1 - P * I[z - 1]);
    (F *= P), (L = 0), (P = 0.5 / D[U]);
    for (let z = U + 1; z < E.length; z++) L -= A[z] * Math.log(1 - P * D[z]);
    (L *= P), (O = Math.abs(F - L)), O < B && ((B = O), (R = U));
  }
  return R;
}
function triangle$1(E) {
  let _ = 0,
    A = 0,
    I = 0,
    D = 0;
  for (let F = 0; F < E.length; F++)
    if (E[F] > 0) {
      _ = F;
      break;
    }
  _ > 0 && _--;
  for (let F = E.length - 1; F > 0; F--)
    if (E[F] > 0) {
      D = F;
      break;
    }
  D < E.length - 1 && D++;
  for (let F = 0; F < E.length; F++) E[F] > A && ((I = F), (A = E[F]));
  let T = !1;
  if (I - _ < D - I) {
    T = !0;
    let F = 0,
      L = E.length - 1;
    for (; F < L; ) {
      let U = E[F];
      (E[F] = E[L]), (E[L] = U), F++, L--;
    }
    (_ = E.length - 1 - D), (I = E.length - 1 - I);
  }
  if (_ === I) return _;
  let C, R, B;
  (C = E[I]), (R = _ - I), (B = Math.sqrt(C * C + R * R)), (C /= B), (R /= B), (B = C * _ + R * E[_]);
  let P = _,
    O = 0;
  for (let F = _ + 1; F <= I; F++) {
    let L = C * F + R * E[F] - B;
    L > O && ((P = F), (O = L));
  }
  if ((P--, T)) {
    let F = 0,
      L = E.length - 1;
    for (; F < L; ) {
      let U = E[F];
      (E[F] = E[L]), (E[L] = U), F++, L--;
    }
    return E.length - 1 - P;
  } else return P;
}
function yen(E, _) {
  let A = new Array(E.length);
  for (let P = 0; P < E.length; P++) A[P] = E[P] / _;
  let I = new Array(E.length);
  I[0] = A[0];
  for (let P = 1; P < E.length; P++) I[P] = I[P - 1] + A[P];
  let D = new Array(E.length);
  D[0] = A[0] * A[0];
  for (let P = 1; P < E.length; P++) D[P] = D[P - 1] + A[P] * A[P];
  let T = new Array(E.length);
  T[E.length - 1] = 0;
  for (let P = E.length - 2; P >= 0; P--) T[P] = T[P + 1] + A[P + 1] * A[P + 1];
  let C = -1,
    R = Number.MIN_VALUE,
    B;
  for (let P = 0; P < E.length; P++)
    (B =
      -1 * (D[P] * T[P] > 0 ? Math.log(D[P] * T[P]) : 0) +
      2 * (I[P] * (1 - I[P]) > 0 ? Math.log(I[P] * (1 - I[P])) : 0)),
      B > R && ((R = B), (C = P));
  return C;
}
const methods = {
    huang,
    intermodes,
    isodata,
    li,
    maxentropy: maxEntropy,
    mean: mean$1,
    minerror: minError,
    minimum,
    moments,
    otsu,
    percentile,
    renyientropy: renyiEntropy,
    shanbhag,
    triangle: triangle$1,
    yen,
  },
  names = {};
Object.keys(methods).forEach((E) => {
  names[E] = E;
});
function getThreshold(E = {}) {
  let { algorithm: _ = names.otsu } = E;
  this.checkProcessable("getThreshold", { components: 1, bitDepth: [8, 16] });
  let A = methods[_.toLowerCase()];
  if (A) {
    let I = this.getHistogram();
    return A(I, this.size);
  } else throw new Error(`unknown thresholding algorithm: ${_}`);
}
const THRESHOLD = "threshold";
function mask(E = {}) {
  let { algorithm: _ = THRESHOLD, threshold: A = 0.5, useAlpha: I = !0, invert: D = !1 } = E;
  this.checkProcessable("mask", { components: 1, bitDepth: [8, 16] }),
    _ === THRESHOLD ? (A = getThreshold$1(A, this.maxValue)) : (A = getThreshold.call(this, E));
  let T = new Image(this.width, this.height, { kind: "BINARY", parent: this }),
    C = 0;
  if (this.alpha && I)
    for (let R = 0; R < this.data.length; R += this.channels) {
      let B = this.data[R] + ((this.maxValue - this.data[R]) * (this.maxValue - this.data[R + 1])) / this.maxValue;
      ((D && B <= A) || (!D && B >= A)) && T.setBit(C), C++;
    }
  else
    for (let R = 0; R < this.data.length; R += this.channels)
      ((D && this.data[R] <= A) || (!D && this.data[R] >= A)) && T.setBit(C), C++;
  return T;
}
function copyImage(E, _, A, I) {
  let D = E.width,
    T = E.height,
    C = _.width,
    R = E.channels;
  for (let B = 0; B < D; B++)
    for (let P = 0; P < T; P++)
      for (let O = 0; O < R; O++) {
        let F = (P * D + B) * R + O,
          L = ((I + P) * C + A + B) * R + O;
        _.data[L] = E.data[F];
      }
}
function pad(E = {}) {
  let { size: _ = 0, algorithm: A = "copy", color: I } = E;
  if ((this.checkProcessable("pad", { bitDepth: [8, 16] }), A === "set")) {
    if (I.length !== this.channels)
      throw new Error(
        `pad: the color array must have the same length as the number of channels. Here: ${this.channels}`,
      );
    for (let B = 0; B < I.length; B++) I[B] === 0 && (I[B] = 0.001);
  } else I = newArray_1(this.channels, null);
  Array.isArray(_) || (_ = [_, _]);
  let D = this.width + _[0] * 2,
    T = this.height + _[1] * 2,
    C = this.channels,
    R = Image.createFrom(this, { width: D, height: T });
  copyImage(this, R, _[0], _[1]);
  for (let B = _[0]; B < D - _[0]; B++)
    for (let P = 0; P < C; P++) {
      let O = I[P] || R.data[(_[1] * D + B) * C + P];
      for (let F = 0; F < _[1]; F++) R.data[(F * D + B) * C + P] = O;
      O = I[P] || R.data[((T - _[1] - 1) * D + B) * C + P];
      for (let F = T - _[1]; F < T; F++) R.data[(F * D + B) * C + P] = O;
    }
  for (let B = 0; B < T; B++)
    for (let P = 0; P < C; P++) {
      let O = I[P] || R.data[(B * D + _[0]) * C + P];
      for (let F = 0; F < _[0]; F++) R.data[(B * D + F) * C + P] = O;
      O = I[P] || R.data[(B * D + D - _[0] - 1) * C + P];
      for (let F = D - _[0]; F < D; F++) R.data[(B * D + F) * C + P] = O;
    }
  return R;
}
function colorDepth(E = 8) {
  if ((this.checkProcessable("colorDepth", { bitDepth: [1, 8, 16] }), ![8, 16].includes(E)))
    throw Error("You need to specify the new colorDepth as 8 or 16");
  if (this.bitDepth === E) return this.clone();
  let _ = Image.createFrom(this, { bitDepth: E });
  switch (E) {
    case 8:
      if (this.bitDepth === 1) for (let A = 0; A < this.size; A++) this.getBit(A) && (_.data[A] = 255);
      else for (let A = 0; A < this.data.length; A++) _.data[A] = this.data[A] >> 8;
      break;
    case 16:
      if (this.bitDepth === 1) for (let A = 0; A < this.size; A++) this.getBit(A) && (_.data[A] = 65535);
      else for (let A = 0; A < this.data.length; A++) _.data[A] = (this.data[A] << 8) | this.data[A];
      break;
    default:
      throw new Error("colorDepth conversion unexpected case");
  }
  return _;
}
function rotateFree(E, _ = {}) {
  const { interpolation: A = validInterpolations.nearestneighbor, width: I = this.width, height: D = this.height } = _;
  if (typeof E != "number") throw new TypeError("degrees must be a number");
  const T = checkInterpolation(A),
    C = (E * Math.PI) / 180,
    R = Math.floor(Math.abs(I * Math.cos(C)) + Math.abs(D * Math.sin(C))),
    B = Math.floor(Math.abs(D * Math.cos(C)) + Math.abs(I * Math.sin(C))),
    P = Math.cos(-C),
    O = Math.sin(-C);
  let F = R / 2,
    L = B / 2;
  R % 2 === 0
    ? ((F = F - 0.5), B % 2 === 0 ? (L = L - 0.5) : (L = Math.floor(L)))
    : ((F = Math.floor(F)), B % 2 === 0 ? (L = L - 0.5) : (L = Math.floor(L)));
  const U = Math.floor(I / 2 - F),
    z = Math.floor(D / 2 - L);
  if (this.bitDepth === 1) {
    const V = new Image(R, B, { kind: "BINARY", parent: this });
    switch (T) {
      case validInterpolations.nearestneighbor:
        return rotateBinaryNearestNeighbor(this, V, U, z, F, L, P, O);
      case validInterpolations.bilinear:
        return rotateBinaryBilinear(this, V, U, z, F, L, P, O);
      default:
        throw new Error(`unsupported rotate interpolation: ${T}`);
    }
  } else {
    const V = Image.createFrom(this, { width: R, height: B });
    switch (T) {
      case validInterpolations.nearestneighbor:
        return rotateNearestNeighbor(this, V, U, z, F, L, P, O);
      case validInterpolations.bilinear:
        return rotateBilinear(this, V, U, z, F, L, P, O);
      default:
        throw new Error(`unsupported rotate interpolation: ${T}`);
    }
  }
}
function rotateNearestNeighbor(E, _, A, I, D, T, C, R) {
  for (let B = 0; B < _.width; B += 1)
    for (let P = 0; P < _.height; P += 1)
      for (let O = 0; O < E.channels; O++) {
        let F = Math.round((B - D) * C - (P - T) * R + D) + A,
          L = Math.round((P - T) * C + (B - D) * R + T) + I;
        F < 0 || F >= E.width || L < 0 || L >= E.height
          ? E.alpha === 1 && O === E.channels - 1
            ? _.setValueXY(B, P, O, 0)
            : _.setValueXY(B, P, O, E.maxValue)
          : _.setValueXY(B, P, O, E.getValueXY(F, L, O));
      }
  return _;
}
function rotateBinaryNearestNeighbor(E, _, A, I, D, T, C, R) {
  for (let B = 0; B < _.width; B += 1)
    for (let P = 0; P < _.height; P += 1) {
      let O = Math.round((B - D) * C - (P - T) * R + D) + A,
        F = Math.round((P - T) * C + (B - D) * R + T) + I;
      (O < 0 || O >= E.width || F < 0 || F >= E.height || E.getBitXY(O, F)) && _.setBitXY(B, P);
    }
  return _;
}
function rotateBilinear(E, _, A, I, D, T, C, R) {
  let B = E.width * E.channels;
  for (let P = 0; P < _.height; P++)
    for (let O = 0; O < _.width; O++) {
      let F = (O - D) * C - (P - T) * R + D + A,
        L = (P - T) * C + (O - D) * R + T + I,
        U = F | 0,
        z = L | 0,
        V = F - U,
        X = L - z;
      for (let G = 0; G < E.channels; G++)
        if (F < 0 || F >= E.width || L < 0 || L >= E.height)
          E.alpha === 1 && G === E.channels - 1 ? _.setValueXY(O, P, G, 0) : _.setValueXY(O, P, G, E.maxValue);
        else {
          let Z = (z * E.width + U) * E.channels + G,
            Y = E.data[Z],
            q = E.data[Z + E.channels],
            W = E.data[Z + B],
            ee = E.data[Z + B + E.channels],
            te = (Y + V * (q - Y) + X * (W - Y) + V * X * (Y - q - W + ee)) | 0;
          _.setValueXY(O, P, G, te);
        }
    }
  return _;
}
function rotateBinaryBilinear(E, _, A, I, D, T, C, R) {
  let B = E.width;
  for (let P = 0; P < _.height; P++)
    for (let O = 0; O < _.width; O++) {
      let F = (O - D) * C - (P - T) * R + D + A,
        L = (P - T) * C + (O - D) * R + T + I,
        U = F | 0,
        z = L | 0,
        V = F - U,
        X = L - z;
      if (F < 0 || F >= E.width || L < 0 || L >= E.height) _.setBitXY(O, P);
      else {
        let G = z * E.width + U,
          Z = E.getBit(G),
          Y = E.getBit(G + 1),
          q = E.getBit(G + B),
          W = E.getBit(G + 1 + B);
        (Z | (V & (Y - Z)) | (X & (q - Z)) | (V & X & (Z - Y - q + W))) > 0 && _.setBitXY(O, P);
      }
    }
  return _;
}
function rotate$1(E, _) {
  if ((this.checkProcessable("rotate", { bitDepth: [1, 8, 16] }), typeof E != "number"))
    throw new TypeError("angle must be a number");
  switch ((E < 0 && (E = Math.ceil(-E / 360) * 360 + E), E % 360)) {
    case 0:
      return this.clone();
    case 90:
      return rotateRight.call(this);
    case 180:
      return rotate180.call(this);
    case 270:
      return rotateLeft.call(this);
    default:
      return rotateFree.call(this, E, _);
  }
}
function rotateLeft() {
  if (this.bitDepth === 1) {
    const E = new Image(this.height, this.width, { kind: "BINARY", parent: this }),
      _ = E.height - 1;
    for (let A = 0; A < this.height; A++)
      for (let I = 0; I < this.width; I++) this.getBitXY(I, A) && E.setBitXY(A, _ - I);
    return E;
  } else {
    const E = Image.createFrom(this, { width: this.height, height: this.width }),
      _ = E.height - 1;
    for (let A = 0; A < this.height; A++)
      for (let I = 0; I < this.width; I++)
        for (let D = 0; D < this.channels; D++) E.setValueXY(A, _ - I, D, this.getValueXY(I, A, D));
    return E;
  }
}
function rotateRight() {
  if (this.bitDepth === 1) {
    const E = new Image(this.height, this.width, { kind: "BINARY", parent: this }),
      _ = E.width - 1;
    for (let A = 0; A < this.height; A++)
      for (let I = 0; I < this.width; I++) this.getBitXY(I, A) && E.setBitXY(_ - A, I);
    return E;
  } else {
    const E = Image.createFrom(this, { width: this.height, height: this.width }),
      _ = E.width - 1;
    for (let A = 0; A < this.height; A++)
      for (let I = 0; I < this.width; I++)
        for (let D = 0; D < this.channels; D++) E.setValueXY(_ - A, I, D, this.getValueXY(I, A, D));
    return E;
  }
}
function rotate180() {
  if (this.bitDepth === 1) {
    const E = new Image(this.width, this.height, { kind: "BINARY", parent: this }),
      _ = E.width - 1,
      A = E.height - 1;
    for (let I = 0; I < this.height; I++)
      for (let D = 0; D < this.width; D++) this.getBitXY(D, I) && E.setBitXY(_ - D, A - I);
    return E;
  } else {
    const E = Image.createFrom(this),
      _ = E.width - 1,
      A = E.height - 1;
    for (let I = 0; I < this.height; I++)
      for (let D = 0; D < this.width; D++)
        for (let T = 0; T < this.channels; T++) E.setValueXY(_ - D, A - I, T, this.getValueXY(D, I, T));
    return E;
  }
}
function insert(E, _ = {}) {
  const A = getImageParameters(E);
  this.checkProcessable("insert", A);
  let { x: I = 0, y: D = 0 } = _;
  const T = getOutputImageOrInPlace(this, _, { copy: !0 }),
    C = Math.min(T.height, D + E.height),
    R = Math.min(T.width, I + E.width);
  if (T.bitDepth === 1)
    for (let B = D; B < C; B++)
      for (let P = I; P < R; P++) E.getBitXY(P - I, B - D) ? T.setBitXY(P, B) : T.clearBitXY(P, B);
  else for (let B = D; B < C; B++) for (let P = I; P < R; P++) T.setPixelXY(P, B, E.getPixelXY(P - I, B - D));
  return T;
}
function setBorder(E = {}) {
  let { size: _ = 0, algorithm: A = "copy", color: I } = E;
  if ((this.checkProcessable("setBorder", { bitDepth: [8, 16, 32, 64] }), A === "set")) {
    if (I.length !== this.channels)
      throw new Error(
        `setBorder: the color array must have the same length as the number of channels. Here: ${this.channels}`,
      );
    for (let R = 0; R < I.length; R++) I[R] === 0 && (I[R] = 0.001);
  } else I = newArray_1(this.channels, null);
  Array.isArray(_) || (_ = [_, _]);
  let D = _[0],
    T = _[1],
    C = this.channels;
  for (let R = D; R < this.width - D; R++)
    for (let B = 0; B < C; B++) {
      let P = I[B] || this.data[(R + this.width * T) * C + B];
      for (let O = 0; O < T; O++) this.data[(O * this.width + R) * C + B] = P;
      P = I[B] || this.data[(R + this.width * (this.height - T - 1)) * C + B];
      for (let O = this.height - T; O < this.height; O++) this.data[(O * this.width + R) * C + B] = P;
    }
  for (let R = 0; R < this.height; R++)
    for (let B = 0; B < C; B++) {
      let P = I[B] || this.data[(R * this.width + D) * C + B];
      for (let O = 0; O < D; O++) this.data[(R * this.width + O) * C + B] = P;
      P = I[B] || this.data[(R * this.width + this.width - D - 1) * C + B];
      for (let O = this.width - D; O < this.width; O++) this.data[(R * this.width + O) * C + B] = P;
    }
  return this;
}
function split(E = {}) {
  let { preserveAlpha: _ = !0 } = E;
  if ((this.checkProcessable("split", { bitDepth: [8, 16] }), this.components === 1)) return new Stack([this.clone()]);
  let A = new Stack(),
    I = this.data;
  if (this.alpha && _)
    for (let D = 0; D < this.components; D++) {
      let T = Image.createFrom(this, { components: 1, alpha: !0, colorModel: GREY$1 }),
        C = 0;
      for (let R = 0; R < I.length; R += this.channels)
        (T.data[C++] = I[R + D]), (T.data[C++] = I[R + this.components]);
      A.push(T);
    }
  else
    for (let D = 0; D < this.channels; D++) {
      let T = Image.createFrom(this, { components: 1, alpha: !1, colorModel: GREY$1 }),
        C = 0;
      for (let R = 0; R < I.length; R += this.channels) T.data[C++] = I[R + D];
      A.push(T);
    }
  return A;
}
function getChannel(E, _ = {}) {
  let { keepAlpha: A = !1, mergeAlpha: I = !1 } = _;
  (A &= this.alpha),
    (I &= this.alpha),
    this.checkProcessable("getChannel", { bitDepth: [8, 16] }),
    (E = validateChannel(this, E));
  let D = Image.createFrom(this, { components: 1, alpha: A, colorModel: GREY$1 }),
    T = 0;
  for (let C = 0; C < this.data.length; C += this.channels)
    I
      ? (D.data[T++] = (this.data[C + E] * this.data[C + this.components]) / this.maxValue)
      : ((D.data[T++] = this.data[C + E]), A && (D.data[T++] = this.data[C + this.components]));
  return D;
}
function combineChannels(E = defaultCombineMethod, _ = {}) {
  let { mergeAlpha: A = !1, keepAlpha: I = !1 } = _;
  (A &= this.alpha), (I &= this.alpha), this.checkProcessable("combineChannels", { bitDepth: [8, 16] });
  let D = Image.createFrom(this, { components: 1, alpha: I, colorModel: GREY$1 }),
    T = 0;
  for (let C = 0; C < this.size; C++) {
    let R = E(this.getPixel(C));
    A
      ? (D.data[T++] = (R * this.data[C * this.channels + this.components]) / this.maxValue)
      : ((D.data[T++] = R), I && (D.data[T++] = this.data[C * this.channels + this.components]));
  }
  return D;
}
function defaultCombineMethod(E) {
  return (E[0] + E[1] + E[2]) / 3;
}
function setChannel(E, _) {
  if (
    (this.checkProcessable("setChannel", { bitDepth: [8, 16] }),
    _.checkProcessable("setChannel (image parameter check)", {
      bitDepth: [this.bitDepth],
      alpha: [0],
      components: [1],
    }),
    _.width !== this.width || _.height !== this.height)
  )
    throw new Error("Images must have exactly the same width and height");
  E = validateChannel(this, E);
  let A = E;
  for (let I = 0; I < _.data.length; I++) (this.data[A] = _.data[I]), (A += this.channels);
  return this;
}
function getSimilarity(E, _ = {}) {
  let { shift: A = [0, 0], average: I, channels: D, defaultAlpha: T, normalize: C, border: R = [0, 0] } = _;
  if (
    (this.checkProcessable("getSimilarity", { bitDepth: [8, 16] }),
    Array.isArray(R) || (R = [R, R]),
    (D = validateArrayOfChannels(this, { channels: D, defaultAlpha: T })),
    this.bitDepth !== E.bitDepth)
  )
    throw new Error("Both images must have the same bitDepth");
  if (this.channels !== E.channels) throw new Error("Both images must have the same number of channels");
  if (this.colorModel !== E.colorModel) throw new Error("Both images must have the same colorModel");
  typeof I > "u" && (I = !0);
  let B = Math.max(R[0], -A[0]),
    P = Math.min(this.width - R[0], this.width - A[0]),
    O = Math.max(R[1], -A[1]),
    F = Math.min(this.height - R[1], this.height - A[1]),
    L = newArray_1(D.length, 0);
  for (let U = 0; U < D.length; U++) {
    let z = D[U],
      V = C ? this.sum[z] : Math.max(this.sum[z], E.sum[z]),
      X = C ? E.sum[z] : Math.max(this.sum[z], E.sum[z]);
    if (V !== 0 && X !== 0)
      for (let G = B; G < P; G++)
        for (let Z = O; Z < F; Z++) {
          let Y = G * this.multiplierX + Z * this.multiplierY + z,
            q = Y + A[0] * this.multiplierX + A[1] * this.multiplierY;
          L[U] += Math.min(this.data[Y] / V, E.data[q] / X);
        }
  }
  return I ? L.reduce((U, z) => U + z) / L.length : L;
}
function getPixelsGrid(E = {}) {
  let { sampling: _ = [10, 10], painted: A = !1, mask: I } = E;
  this.checkProcessable("getPixelsGrid", { bitDepth: [8, 16], channels: 1 }), Array.isArray(_) || (_ = [_, _]);
  const D = _[0],
    T = _[1],
    C = [],
    R = [],
    B = this.width / D,
    P = this.height / T;
  let O = Math.floor(B / 2);
  for (let L = 0; L < D; L++) {
    let U = Math.floor(P / 2);
    for (let z = 0; z < T; z++) {
      let V = Math.round(O),
        X = Math.round(U);
      (!I || I.getBitXY(V, X)) && (C.push([V, X]), R.push(this.getPixelXY(V, X))), (U += P);
    }
    O += B;
  }
  const F = { xyS: C, zS: R };
  return A && (F.painted = this.rgba8().paintPoints(C)), F;
}
function Matrix(E, _, A) {
  const I = new Array(E);
  for (let D = 0; D < E; D++) I[D] = new Array(_);
  if (A) for (let D = 0; D < E; D++) for (let T = 0; T < _; T++) I[D][T] = A;
  return (I.width = E), (I.height = _), Object.setPrototypeOf(I, Matrix.prototype), I;
}
Matrix.prototype.localMin = function (E, _) {
  let A = this[E][_],
    I = [E, _];
  for (let D = Math.max(0, E - 1); D < Math.min(this.length, E + 2); D++)
    for (let T = Math.max(0, _ - 1); T < Math.min(this[0].length, _ + 2); T++)
      this[D][T] < A && ((A = this[D][T]), (I = [D, T]));
  return { position: I, value: A };
};
Matrix.prototype.localMax = function (E, _) {
  let A = this[E][_],
    I = [E, _];
  for (let D = Math.max(0, E - 1); D < Math.min(this.length, E + 2); D++)
    for (let T = Math.max(0, _ - 1); T < Math.min(this[0].length, _ + 2); T++)
      this[D][T] > A && ((A = this[D][T]), (I = [D, T]));
  return { position: I, value: A };
};
Matrix.prototype.localSearch = function (E, _, A) {
  let I = [];
  for (let D = Math.max(0, E - 1); D < Math.min(this.length, E + 2); D++)
    for (let T = Math.max(0, _ - 1); T < Math.min(this[0].length, _ + 2); T++) this[D][T] === A && I.push([D, T]);
  return I;
};
function getBestMatch(E, _ = {}) {
  let { border: A } = _;
  if ((this.checkProcessable("getChannel", { bitDepth: [8, 16] }), this.bitDepth !== E.bitDepth))
    throw new Error("Both images must have the same bitDepth");
  if (this.channels !== E.channels) throw new Error("Both images must have the same number of channels");
  if (this.colorModel !== E.colorModel) throw new Error("Both images must have the same colorModel");
  let I = new Matrix(E.width, E.height, -1 / 0),
    D = Math.floor(E.width / 2),
    T = Math.floor(E.height / 2),
    C = D,
    R = T,
    B = !1;
  for (; !B; ) {
    let P = I.localSearch(D, T, -1 / 0);
    for (let F = 0; F < P.length; F++) {
      let L = P[F],
        U = this.getSimilarity(E, { border: A, shift: [C - L[0], R - L[1]] });
      I[L[0]][L[1]] = U;
    }
    let O = I.localMax(D, T);
    O.position[0] !== D || O.position[1] !== T ? ((D = O.position[0]), (T = O.position[1])) : (B = !0);
  }
  return [D - C, T - R];
}
function getRow(E, _ = 0) {
  this.checkProcessable("getRow", { bitDepth: [8, 16] }), checkRow(this, E), checkChannel(this, _);
  let A = new Array(this.width),
    I = 0,
    D = E * this.width * this.channels + _,
    T = D + this.width * this.channels;
  for (let C = D; C < T; C += this.channels) A[I++] = this.data[C];
  return A;
}
function getColumn(E, _ = 0) {
  this.checkProcessable("getColumn", { bitDepth: [8, 16] }), checkColumn(this, E), checkChannel(this, _);
  let A = new Array(this.height),
    I = 0,
    D = this.width * this.channels;
  for (let T = _ + E * this.channels; T < this.data.length; T += D) A[I++] = this.data[T];
  return A;
}
function getMatrix(E = {}) {
  let { channel: _ } = E;
  if ((this.checkProcessable("getMatrix", { bitDepth: [8, 16] }), _ === void 0)) {
    if (this.components > 1)
      throw new RangeError("You need to define the channel for an image that contains more than one channel");
    _ = 0;
  }
  let A = new Matrix$2(this.height, this.width);
  for (let I = 0; I < this.height; I++) for (let D = 0; D < this.width; D++) A.set(I, D, this.getValueXY(D, I, _));
  return A;
}
function setMatrix(E, _ = {}) {
  E = new Matrix$2(E);
  let { channel: A } = _;
  if ((this.checkProcessable("getMatrix", { bitDepth: [8, 16] }), A === void 0)) {
    if (this.components > 1)
      throw new RangeError("You need to define the channel for an image that contains more than one channel");
    A = 0;
  }
  if (this.width !== E.columns || this.height !== E.rows)
    throw new RangeError("The size of the matrix must be equal to the size of the image");
  for (let I = 0; I < this.height; I++) for (let D = 0; D < this.width; D++) this.setValueXY(D, I, A, E.get(I, D));
}
function getPixelsArray() {
  this.checkProcessable("getPixelsArray", { bitDepth: [8, 16, 32] });
  let E = new Array(this.size),
    _ = 0;
  for (let A = 0; A < this.data.length; A += this.channels) {
    let I = new Array(this.components);
    for (let D = 0; D < this.components; D++) I[D] = this.data[A + D];
    E[_++] = I;
  }
  return E;
}
function getIntersection(E) {
  let _ = this,
    A = _.getClosestCommonParent(E),
    I = _.getRelativePosition(A, { defaultFurther: !0 }),
    D = getRelativePositionForAllPixels(_, I),
    T = E.getRelativePosition(A, { defaultFurther: !0 }),
    C = getRelativePositionForAllPixels(E, T),
    R = getCommonSurface(D, C),
    B = { whitePixelsMask1: [], whitePixelsMask2: [], commonWhitePixels: [] };
  for (let P = 0; P < R.length; P++) {
    let O = R[P],
      F = [O[0] - I[0], O[1] - I[1]],
      L = [O[0] - T[0], O[1] - T[1]],
      U = _.getBitXY(F[0], F[1]),
      z = E.getBitXY(L[0], L[1]);
    U === 1 && z === 1 && B.commonWhitePixels.push(O);
  }
  for (let P = 0; P < D.length; P++) {
    let O, F;
    P !== 0 && ((O = Math.floor(P / _.width)), (F = P % _.width)),
      _.getBitXY(O, F) === 1 && B.whitePixelsMask1.push(D[P]);
  }
  for (let P = 0; P < C.length; P++) {
    let O = 0,
      F = 0;
    P !== 0 && ((O = Math.floor(P / E.width)), (F = P % E.width)),
      E.getBitXY(O, F) === 1 && B.whitePixelsMask2.push(C[P]);
  }
  return B;
}
function getRelativePositionForAllPixels(E, _) {
  let A = [];
  for (let I = 0; I < E.height; I++)
    for (let D = 0; D < E.width; D++) {
      let T = [I, D];
      A.push([T[0] + _[0], T[1] + _[1]]);
    }
  return A;
}
function getCommonSurface(E, _) {
  let A = 0,
    I = 0,
    D = [];
  for (; A < E.length && I < _.length; )
    E[A][0] === _[I][0] && E[A][1] === _[I][1]
      ? (D.push(E[A]), A++, I++)
      : E[A][0] < _[I][0] || (E[A][0] === _[I][0] && E[A][1] < _[I][1])
        ? A++
        : I++;
  return D;
}
function getClosestCommonParent(E) {
  let _ = getDepth(this),
    A = getDepth(E),
    I;
  if ((_ >= A ? (I = getFurthestParent(this, _)) : (I = getFurthestParent(E, A)), _ === 0 || A === 0)) return I;
  let D = this,
    T = E;
  for (; _ !== A; )
    if (_ > A) {
      if (((D = D.parent), D === null)) return I;
      _ = _ - 1;
    } else {
      if (((T = T.parent), T === null)) return I;
      A = A - 1;
    }
  for (; D !== T && D !== null && T !== null; )
    if (((D = D.parent), (T = T.parent), D === null || T === null)) return I;
  return D !== T ? I : D;
}
function getDepth(E) {
  let _ = 0,
    A = E;
  for (; A.parent != null; ) (A = A.parent), _++;
  return _;
}
function getFurthestParent(E, _) {
  let A = E;
  for (; _ > 0; ) (A = A.parent), (_ = _ - 1);
  return A;
}
const defaultOptions$1 = { lowThreshold: 10, highThreshold: 30, gaussianBlur: 1.1 },
  Gx = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ],
  Gy = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ],
  convOptions = { bitDepth: 32, mode: "periodic" };
function cannyEdgeDetector(E, _) {
  E.checkProcessable("Canny edge detector", { bitDepth: 8, channels: 1, components: 1 }),
    (_ = Object.assign({}, defaultOptions$1, _));
  const A = E.width,
    I = E.height,
    D = E.maxValue,
    T = { sigma: _.gaussianBlur, radius: 3 },
    C = E.gaussianFilter(T),
    R = C.convolution(Gy, convOptions),
    B = C.convolution(Gx, convOptions),
    P = B.hypotenuse(R),
    O = E.constructor,
    F = new O(A, I, { kind: "GREY", bitDepth: 32 }),
    L = new O(A, I, { kind: "GREY", bitDepth: 32 }),
    U = new O(A, I, { kind: "GREY" });
  for (var z = 1; z < A - 1; z++)
    for (var V = 1; V < I - 1; V++) {
      var X = (Math.round(Math.atan2(B.getValueXY(z, V, 0), R.getValueXY(z, V, 0)) * (5 / Math.PI)) + 5) % 5;
      (X === 0 &&
        (P.getValueXY(z, V, 0) <= P.getValueXY(z, V - 1, 0) || P.getValueXY(z, V, 0) <= P.getValueXY(z, V + 1, 0))) ||
        (X === 1 &&
          (P.getValueXY(z, V, 0) <= P.getValueXY(z - 1, V + 1, 0) ||
            P.getValueXY(z, V, 0) <= P.getValueXY(z + 1, V - 1, 0))) ||
        (X === 2 &&
          (P.getValueXY(z, V, 0) <= P.getValueXY(z - 1, V, 0) || P.getValueXY(z, V, 0) <= P.getValueXY(z + 1, V, 0))) ||
        (X === 3 &&
          (P.getValueXY(z, V, 0) <= P.getValueXY(z - 1, V - 1, 0) ||
            P.getValueXY(z, V, 0) <= P.getValueXY(z + 1, V + 1, 0))) ||
        F.setValueXY(z, V, 0, P.getValueXY(z, V, 0));
    }
  for (z = 0; z < A * I; ++z) {
    var G = F.data[z],
      Z = 0;
    G > _.highThreshold && (Z++, (U.data[z] = D)), G > _.lowThreshold && Z++, (L.data[z] = Z);
  }
  var Y = [];
  for (z = 1; z < A - 1; ++z)
    for (V = 1; V < I - 1; ++V) {
      if (L.getValueXY(z, V, 0) !== 1) continue;
      e: for (var q = z - 1; q < z + 2; ++q)
        for (var W = V - 1; W < V + 2; ++W)
          if (L.getValueXY(q, W, 0) === 2) {
            Y.push([z, V]), U.setValueXY(z, V, 0, D);
            break e;
          }
    }
  for (; Y.length > 0; ) {
    var ee = [];
    for (z = 0; z < Y.length; ++z)
      for (V = -1; V < 2; ++V)
        for (q = -1; q < 2; ++q)
          if (!(V === 0 && q === 0)) {
            var te = Y[z][0] + V,
              Q = Y[z][1] + q;
            L.getValueXY(te, Q, 0) === 1 &&
              U.getValueXY(te, Q, 0) === 0 &&
              (ee.push([te, Q]), U.setValueXY(te, Q, 0, D));
          }
    Y = ee;
  }
  return U;
}
function cannyEdge(E) {
  return cannyEdgeDetector(this, E);
}
function extract(E, _ = {}) {
  let { position: A } = _;
  if ((this.checkProcessable("extract", { bitDepth: [1, 8, 16] }), !A && ((A = E.getRelativePosition(this)), !A)))
    throw new Error(
      "extract : can not extract an image because the relative position can not be determined, try to specify manually the position as an array of 2 elements [x,y].",
    );
  if (this.bitDepth > 1) {
    let I = Image.createFrom(this, { width: E.width, height: E.height, alpha: 1, position: A, parent: this });
    for (let D = 0; D < E.width; D++)
      for (let T = 0; T < E.height; T++) {
        for (let C = 0; C < this.channels; C++) {
          let R = this.getValueXY(D + A[0], T + A[1], C);
          I.setValueXY(D, T, C, R);
        }
        E.getBitXY(D, T) || I.setValueXY(D, T, this.components, 0);
      }
    return I;
  } else {
    let I = Image.createFrom(this, { width: E.width, height: E.height, position: A, parent: this });
    for (let D = 0; D < E.height; D++)
      for (let T = 0; T < E.width; T++) E.getBitXY(T, D) && this.getBitXY(T + A[0], D + A[1]) && I.setBitXY(T, D);
    return I;
  }
}
var fastListExports = {},
  fastList = {
    get exports() {
      return fastListExports;
    },
    set exports(E) {
      fastListExports = E;
    },
  };
(function (E, _) {
  (function () {
    function A(D, T, C) {
      (this.next = C), C && (C.prev = this), (this.prev = T), T && (T.next = this), (this.data = D);
    }
    function I() {
      if (!(this instanceof I)) return new I();
      (this._head = null), (this._tail = null), (this.length = 0);
    }
    (I.prototype = {
      push: function (D) {
        (this._tail = new A(D, this._tail, null)), this._head || (this._head = this._tail), this.length++;
      },
      pop: function () {
        if (this.length !== 0) {
          var D = this._tail;
          return (
            (this._tail = D.prev),
            D.prev && (D.prev = this._tail.next = null),
            this.length--,
            this.length === 1 ? (this._head = this._tail) : this.length === 0 && (this._head = this._tail = null),
            D.data
          );
        }
      },
      unshift: function (D) {
        (this._head = new A(D, null, this._head)), this._tail || (this._tail = this._head), this.length++;
      },
      shift: function () {
        if (this.length !== 0) {
          var D = this._head;
          return (
            (this._head = D.next),
            D.next && (D.next = this._head.prev = null),
            this.length--,
            this.length === 1 ? (this._tail = this._head) : this.length === 0 && (this._head = this._tail = null),
            D.data
          );
        }
      },
      item: function (D) {
        D < 0 && (D = this.length + D);
        for (var T = this._head; D-- > 0 && T; ) T = T.next;
        return T ? T.data : void 0;
      },
      slice: function (D, T) {
        if (
          (D || (D = 0),
          T || (T = this.length),
          T < 0 && (T = this.length + T),
          D < 0 && (D = this.length + D),
          T === D)
        )
          return [];
        if (T < D) throw new Error("invalid offset: " + D + "," + T + " (length=" + this.length + ")");
        for (var C = T - D, R = new Array(C), B = 0, P = this._head; D-- > 0 && P; ) P = P.next;
        for (; B < C && P; ) (R[B++] = P.data), (P = P.next);
        return R;
      },
      drop: function () {
        I.call(this);
      },
      forEach: function (D, T) {
        for (var C = this._head, R = 0, B = this.length; R < B && C; )
          D.call(T || this, C.data, R, this), (C = C.next), R++;
      },
      map: function (D, T) {
        var C = new I();
        return (
          this.forEach(function (R, B, P) {
            C.push(D.call(T || P, R, B, P));
          }),
          C
        );
      },
      filter: function (D, T) {
        var C = new I();
        return (
          this.forEach(function (R, B, P) {
            D.call(T || P, R, B, P) && C.push(R);
          }),
          C
        );
      },
      reduce: function (D, T, C) {
        var R = 0,
          B = this._head,
          P = this.length;
        for (T || ((R = 1), (T = B && B.data), (B = B && B.next)); R < P && B; )
          (T = D.call(C || this, T, B.data, this)), R++, (B = B.next);
        return T;
      },
    }),
      (E.exports = I);
  })();
})(fastList);
const LinkedList = fastListExports;
function floodFill(E = {}) {
  const { x: _ = 0, y: A = 0, inPlace: I = !0 } = E,
    D = I ? this : Image.createFrom(this);
  if ((this.checkProcessable("floodFill", { bitDepth: 1 }), this.getBitXY(_, A))) return D;
  const C = new LinkedList();
  for (C.push(new Node(_, A)); C.length > 0; ) {
    const R = C.shift();
    D.setBitXY(R.x, R.y);
    for (let B = R.x + 1; B < this.width && !D.getBitXY(B, R.y) && !this.getBitXY(B, R.y); B++)
      D.setBitXY(B, R.y),
        R.y + 1 < this.height && !this.getBitXY(B, R.y + 1) && C.push(new Node(B, R.y + 1)),
        R.y - 1 >= 0 && !this.getBitXY(B, R.y - 1) && C.push(new Node(B, R.y - 1));
    for (let B = R.x - 1; B >= 0 && !D.getBitXY(B, R.y) && !this.getBitXY(B, R.y); B++)
      D.setBitXY(B, R.y),
        R.y + 1 < this.height && !this.getBitXY(B, R.y + 1) && C.push(new Node(B, R.y + 1)),
        R.y - 1 >= 0 && !this.getBitXY(B, R.y - 1) && C.push(new Node(B, R.y - 1));
  }
  return D;
}
function Node(E, _) {
  (this.x = E), (this.y = _);
}
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (E) {
          for (var _ = 1; _ < arguments.length; _++) {
            var A = arguments[_];
            for (var I in A) Object.prototype.hasOwnProperty.call(A, I) && (E[I] = A[I]);
          }
          return E;
        }),
    _extends.apply(this, arguments)
  );
}
function hsv2rgb(E, _, A) {
  (_ = _ / 100), (A = A / 100);
  var I = [],
    D = A * _,
    T = E / 60,
    C = D * (1 - Math.abs((T % 2) - 1)),
    R = A - D;
  return (
    T >= 0 && T < 1
      ? (I = [D, C, 0])
      : T >= 1 && T < 2
        ? (I = [C, D, 0])
        : T >= 2 && T < 3
          ? (I = [0, D, C])
          : E >= 3 && T < 4
            ? (I = [0, C, D])
            : E >= 4 && T < 5
              ? (I = [C, 0, D])
              : E >= 5 && T <= 6
                ? (I = [D, 0, C])
                : (I = [0, 0, 0]),
    { r: Math.round(255 * (I[0] + R)), g: Math.round(255 * (I[1] + R)), b: Math.round(255 * (I[2] + R)) }
  );
}
function hsl2hsv(E, _, A) {
  return (_ *= (A < 50 ? A : 100 - A) / 100), { h: E, s: ((2 * _) / (A + _)) * 100, v: A + _ };
}
function hsl2rgb$1(E, _, A) {
  var I = hsl2hsv(E, _, A);
  return hsv2rgb(I.h, I.s, I.v);
}
var colors = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 132, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 255, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 203],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [119, 128, 144],
  slategrey: [119, 128, 144],
  snow: [255, 255, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 5],
};
function parse(E) {
  return named(E) || hex3(E) || hex6(E) || rgb(E) || rgba$1(E) || hsl(E) || hsla(E);
}
function named(E) {
  var _ = colors[E.toLowerCase()];
  if (_) return { r: _[0], g: _[1], b: _[2], a: 100 };
}
function rgb(E) {
  var _ = E.match(/rgb\(([^)]+)\)/);
  if (_) {
    var A = _[1].split(/ *, */).map(Number);
    return { r: A[0], g: A[1], b: A[2], a: 100 };
  }
}
function rgba$1(E) {
  var _ = E.match(/rgba\(([^)]+)\)/);
  if (_) {
    var A = _[1].split(/ *, */).map(Number);
    return { r: A[0], g: A[1], b: A[2], a: A[3] * 100 };
  }
}
function hex6(E) {
  if (E[0] === "#" && E.length === 7)
    return { r: parseInt(E.slice(1, 3), 16), g: parseInt(E.slice(3, 5), 16), b: parseInt(E.slice(5, 7), 16), a: 100 };
}
function hex3(E) {
  if (E[0] === "#" && E.length === 4)
    return { r: parseInt(E[1] + E[1], 16), g: parseInt(E[2] + E[2], 16), b: parseInt(E[3] + E[3], 16), a: 100 };
}
function hsl(E) {
  var _ = E.match(/hsl\(([^)]+)\)/);
  if (_) {
    var A = _[1].split(/ *, */),
      I = parseInt(A[0], 10),
      D = parseInt(A[1], 10),
      T = parseInt(A[2], 10),
      C = hsl2rgb$1(I, D, T);
    return _extends({}, C, { a: 100 });
  }
}
function hsla(E) {
  var _ = E.match(/hsla\(([^)]+)\)/);
  if (_) {
    var A = _[1].split(/ *, */),
      I = parseInt(A[0], 10),
      D = parseInt(A[1], 10),
      T = parseInt(A[2], 10),
      C = parseInt(parseFloat(A[3]) * 100, 10),
      R = hsl2rgb$1(I, D, T);
    return _extends({}, R, { a: C });
  }
}
function css2array(E) {
  let _ = parse(E);
  return [_.r, _.g, _.b, Math.round((_.a * 255) / 100)];
}
function hue2rgb(E, _, A) {
  return (
    A < 0 && (A += 1),
    A > 1 && (A -= 1),
    A < 1 / 6 ? E + (_ - E) * 6 * A : A < 1 / 2 ? _ : A < 2 / 3 ? E + (_ - E) * (2 / 3 - A) * 6 : E
  );
}
function hsl2rgb(E, _, A) {
  let I, D, T, C, R, B;
  return (
    (_ /= 100),
    (A /= 100),
    _ === 0
      ? (C = R = B = A * 255)
      : (A <= 0.5 ? (D = A * (_ + 1)) : (D = A + _ - A * _),
        (I = A * 2 - D),
        (T = E / 360),
        (C = hue2rgb(I, D, T + 1 / 3)),
        (R = hue2rgb(I, D, T)),
        (B = hue2rgb(I, D, T - 1 / 3))),
    { r: C, g: R, b: B }
  );
}
function getDistinctColors(E) {
  let _ = new Array(E),
    A = 0;
  for (let I = 0; I < 360; I += 360 / E) {
    A++;
    let D = hsl2rgb(I, 100, 30 + (A % 4) * 15);
    _[A - 1] = [Math.round(D.r * 255), Math.round(D.g * 255), Math.round(D.b * 255)];
  }
  return _;
}
function getRandomColor() {
  return [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
}
function getColors(E) {
  let { color: _, colors: A, randomColors: I, numberColors: D = 50 } = E;
  if ((_ && !Array.isArray(_) && (_ = css2array(_)), _)) return [_];
  if (A)
    return (
      (A = A.map(function (T) {
        return Array.isArray(T) ? T : css2array(T);
      })),
      A
    );
  if (I) {
    A = new Array(D);
    for (let T = 0; T < D; T++) A[T] = getRandomColor();
  }
  return getDistinctColors(D);
}
function paintLabels(E, _, A = {}) {
  let { color: I = "blue", colors: D, font: T = "12px Helvetica", rotate: C = 0 } = A;
  if (
    (this.checkProcessable("paintMasks", { channels: [3, 4], bitDepth: [8, 16], colorModel: RGB$1 }), !Array.isArray(E))
  )
    throw Error("paintLabels: labels must be an array");
  if (!Array.isArray(_)) throw Error("paintLabels: positions must be an array");
  if (
    (I && !Array.isArray(I) && (I = css2array(I)),
    D
      ? (D = D.map(function (P) {
          return Array.isArray(P) ? P : css2array(P);
        }))
      : (D = [I]),
    E.length !== _.length)
  )
    throw Error("paintLabels: positions and labels must be arrays from the same size");
  Array.isArray(T) || (T = [T]), Array.isArray(C) || (C = [C]);
  let B = this.getCanvas().getContext("2d");
  for (let P = 0; P < E.length; P++) {
    B.save();
    let O = D[P % D.length];
    (B.fillStyle = `rgba(${O[0]},${O[1]},${O[2]},${O[3] / this.maxValue})`), (B.font = T[P % T.length]);
    let F = _[P];
    B.translate(F[0], F[1]), B.rotate((C[P % C.length] / 180) * Math.PI), B.fillText(E[P], 0, 0), B.restore();
  }
  return (this.data = Uint8Array.from(B.getImageData(0, 0, this.width, this.height).data)), this;
}
function paintMasks(E, _ = {}) {
  let {
    alpha: A = 255,
    labels: I = [],
    labelsPosition: D = [],
    labelColor: T = "blue",
    labelFont: C = "12px Helvetica",
  } = _;
  this.checkProcessable("paintMasks", { channels: [3, 4], bitDepth: [8, 16], colorModel: RGB$1 });
  let R = getColors(Object.assign({}, _, { numberColors: E.length }));
  Array.isArray(E) || (E = [E]);
  for (let B = 0; B < E.length; B++) {
    let P = E[B],
      O = R[B % R.length];
    for (let F = 0; F < P.width; F++)
      for (let L = 0; L < P.height; L++)
        if (P.getBitXY(F, L))
          for (let U = 0; U < Math.min(this.components, O.length); U++)
            if (A === 255) this.setValueXY(F + P.position[0], L + P.position[1], U, O[U]);
            else {
              let z = this.getValueXY(F + P.position[0], L + P.position[1], U);
              (z = Math.round((z * (255 - A) + O[U] * A) / 255)),
                this.setValueXY(F + P.position[0], L + P.position[1], U, z);
            }
  }
  if (Array.isArray(I) && I.length > 0) {
    let P = this.getCanvas().getContext("2d");
    (P.fillStyle = T), (P.font = C);
    for (let O = 0; O < Math.min(E.length, I.length); O++) {
      let F = D[O] ? D[O] : E[O].position;
      P.fillText(I[O], F[0], F[1]);
    }
    this.data = Uint8Array.from(P.getImageData(0, 0, this.width, this.height).data);
  }
  return this;
}
function zerosMatrix(E, _) {
  let A = new Array(E);
  for (let I = 0; I < E; I++) A[I] = new Array(_).fill(0);
  return A;
}
const cross = [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  smallCross = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];
class Shape {
  constructor(_ = {}) {
    let { kind: A = "cross", shape: I, size: D, width: T, height: C, filled: R = !0 } = _;
    if ((D && ((T = D), (C = D)), I))
      switch (I.toLowerCase()) {
        case "square":
        case "rectangle":
          this.matrix = rectangle(T, C, { filled: R });
          break;
        case "circle":
        case "ellipse":
          this.matrix = ellipse(T, C, { filled: R });
          break;
        case "triangle":
          this.matrix = triangle(T, C, { filled: R });
          break;
        default:
          throw new Error(`Shape: unexpected shape: ${I}`);
      }
    else if (A)
      switch (A.toLowerCase()) {
        case "cross":
          this.matrix = cross;
          break;
        case "smallcross":
          this.matrix = smallCross;
          break;
        default:
          throw new Error(`Shape: unexpected kind: ${A}`);
      }
    else throw new Error("Shape: expected a kind or a shape option");
    (this.height = this.matrix.length),
      (this.width = this.matrix[0].length),
      (this.halfHeight = (this.height / 2) >> 0),
      (this.halfWidth = (this.width / 2) >> 0);
  }
  getPoints() {
    let _ = this.matrix,
      A = [];
    for (let I = 0; I < _.length; I++)
      for (let D = 0; D < _[0].length; D++) _[I][D] && A.push([D - this.halfWidth, I - this.halfHeight]);
    return A;
  }
  getMask() {
    let _ = new Image(this.width, this.height, { kind: BINARY });
    for (let A = 0; A < this.matrix.length; A++)
      for (let I = 0; I < this.matrix[0].length; I++) this.matrix[A][I] && _.setBitXY(I, A);
    return _;
  }
}
function rectangle(E, _, A) {
  const I = zerosMatrix(_, E);
  if (A.filled) for (let D = 0; D < _; D++) for (let T = 0; T < E; T++) I[D][T] = 1;
  else {
    for (let D of [0, _ - 1]) for (let T = 0; T < E; T++) I[D][T] = 1;
    for (let D = 0; D < _; D++) for (let T of [0, E - 1]) I[D][T] = 1;
  }
  return I;
}
function ellipse(E, _, A) {
  const I = zerosMatrix(_, E);
  let D = 1 - (_ % 2),
    T = 1 - (E % 2),
    C = Math.floor((E - 1) / 2),
    R = Math.floor((_ - 1) / 2),
    B = C * C,
    P = R * R;
  if (A.filled)
    for (let O = 0; O <= R; O++) {
      let F = Math.floor(Math.sqrt(B - (B * O * O) / P));
      for (let L = C - F; L <= C; L++)
        (I[R - O][L] = 1), (I[R + O + D][L] = 1), (I[R - O][E - L - 1] = 1), (I[R + O + D][E - L - 1] = 1);
    }
  else {
    for (let O = 0; O <= R; O++) {
      let F = Math.floor(Math.sqrt(B - (B * O * O) / P)),
        L = C - F;
      (I[R - O][L] = 1), (I[R + O + D][L] = 1), (I[R - O][E - L - 1] = 1), (I[R + O + D][E - L - 1] = 1);
    }
    for (let O = 0; O <= C; O++) {
      let F = Math.floor(Math.sqrt(P - (P * O * O) / B)),
        L = R - F;
      (I[L][C - O] = 1), (I[L][C + O + T] = 1), (I[_ - L - 1][C - O] = 1), (I[_ - L - 1][C + O + T] = 1);
    }
  }
  return I;
}
function triangle(E, _, A) {
  if (!A.filled) throw new Error("Non filled triangle is not implemented");
  const I = zerosMatrix(_, E);
  for (let D = 0; D < _; D++) {
    let T = Math.floor(((1 - D / _) * E) / 2);
    for (let C = T; C < E - T; C++) I[D][C] = 1;
  }
  return I;
}
function paintPoints(E, _ = {}) {
  let { shape: A } = _;
  this.checkProcessable("paintPoints", { bitDepth: [8, 16] });
  let I = getColors(Object.assign({}, _, { numberColors: E.length })),
    D = new Shape(A).getPoints(),
    T = Math.min(this.channels, I[0].length);
  for (let C = 0; C < E.length; C++) {
    let R = I[C % I.length],
      B = E[C][0],
      P = E[C][1];
    for (let O = 0; O < D.length; O++) {
      let F = D[O][0],
        L = D[O][1];
      if (B + F >= 0 && P + L >= 0 && B + F < this.width && P + L < this.height) {
        let U = (B + F + (P + L) * this.width) * this.channels;
        for (let z = 0; z < T; z++) this.data[U + z] = R[z];
      }
    }
  }
  return this;
}
function paintPolyline(E, _ = {}) {
  let { color: A = [this.maxValue, 0, 0], closed: I = !1 } = _;
  this.checkProcessable("paintPoints", { bitDepth: [1, 8, 16] });
  let D = Math.min(this.channels, A.length);
  for (let T = 0; T < E.length - 1 + I; T++) {
    let C = E[T],
      R = E[(T + 1) % E.length],
      B = R[0] - C[0],
      P = R[1] - C[1],
      O = Math.max(Math.abs(B), Math.abs(P)),
      F = B / O,
      L = P / O,
      U = C[0],
      z = C[1];
    for (let V = 0; V <= O; V++) {
      let X = Math.round(U),
        G = Math.round(z);
      if (X >= 0 && G >= 0 && X < this.width && G < this.height)
        if (this.bitDepth === 1) this.setBitXY(X, G);
        else {
          let Z = (X + G * this.width) * this.channels;
          for (let Y = 0; Y < D; Y++) this.data[Z + Y] = A[Y];
        }
      (U = U + F), (z = z + L);
    }
  }
  return this;
}
function paintPolylines(E, _ = {}) {
  let A = Object.assign({}, _);
  this.checkProcessable("paintPolylines", { bitDepth: [8, 16] });
  let I = getColors(Object.assign({}, _, { numberColors: E.length }));
  for (let D = 0; D < E.length; D++) (A.color = I[D % I.length]), this.paintPolyline(E[D], A);
  return this;
}
function paintPolygon(E, _ = {}) {
  let { color: A = [this.maxValue, 0, 0], filled: I = !1 } = _;
  this.checkProcessable("paintPoints", { bitDepth: [1, 8, 16] }), (_.closed = !0);
  let D = deleteDouble(E);
  if (I === !1) return this.paintPolyline(E, _);
  {
    let T = Array(this.height);
    for (let C = 0; C < this.height; C++) {
      T[C] = [];
      for (let R = 0; R < this.width; R++) T[C].push(0);
    }
    for (let C = 0; C < D.length; C++) {
      const R = lineBetweenTwoPoints(D[C], D[(C + 1) % D.length]);
      for (let B = 0; B < this.height; B++)
        for (let P = 0; P < this.width; P++)
          isAtTheRightOfTheLine(P, B, R, this.height) && (T[B][P] = T[B][P] === 0 ? 1 : 0);
    }
    for (let C = 0; C < this.height; C++)
      for (let R = 0; R < this.width; R++)
        if (T[C][R] === 1)
          if (this.bitDepth === 1) this.setBitXY(R, C);
          else {
            let B = Math.min(this.channels, A.length),
              P = (R + C * this.width) * this.channels;
            for (let O = 0; O < B; O++) this.data[P + O] = A[O];
          }
    return this.paintPolyline(E, _);
  }
}
function deleteDouble(E) {
  let _ = [];
  for (let A = 0; A < E.length; A++)
    if (!(E[A][0] === E[(A + 1) % E.length][0] && E[A][1] === E[(A + 1) % E.length][1])) {
      if (E[A][0] === E[(A - 1 + E.length) % E.length][0] && E[A][1] === E[(A - 1 + E.length) % E.length][1]) continue;
      if (
        E[(A + 1) % E.length][0] === E[(A - 1 + E.length) % E.length][0] &&
        E[(A - 1 + E.length) % E.length][1] === E[(A + 1) % E.length][1]
      )
        continue;
      _.push(E[A]);
    }
  return _;
}
function lineBetweenTwoPoints(E, _) {
  if (E[0] === _[0]) return { a: 0, b: E[0], vertical: !0 };
  {
    const A = (_[1] - E[1]) / (_[0] - E[0]),
      I = E[1] - A * E[0];
    return { a: A, b: I, vertical: !1 };
  }
}
function isAtTheRightOfTheLine(E, _, A, I) {
  if (A.vertical === !0) return A.b <= E;
  if (A.a === 0) return !1;
  {
    const D = (_ - A.b) / A.a;
    return D < E && D >= 0 && D <= I;
  }
}
function paintPolygons(E, _ = {}) {
  let A = Object.assign({}, _);
  this.checkProcessable("paintPolygons", { bitDepth: [8, 16] });
  let I = getColors(Object.assign({}, _, { numberColors: E.length }));
  for (let D = 0; D < E.length; D++) (A.color = I[D % I.length]), this.paintPolygon(E[D], A);
  return this;
}
function getHistogram(E = {}) {
  let { maxSlots: _ = 256, channel: A, useAlpha: I = !0 } = E;
  if ((this.checkProcessable("getHistogram", { bitDepth: [1, 8, 16] }), A === void 0)) {
    if (this.components > 1)
      throw new RangeError("You need to define the channel for an image that contains more than one channel");
    A = 0;
  }
  return getChannelHistogram.call(this, A, { useAlpha: I, maxSlots: _ });
}
function getHistograms(E = {}) {
  const { maxSlots: _ = 256, useAlpha: A = !0 } = E;
  this.checkProcessable("getHistograms", { bitDepth: [8, 16] });
  let I = new Array(A ? this.components : this.channels);
  for (let D = 0; D < I.length; D++) I[D] = getChannelHistogram.call(this, D, { useAlpha: A, maxSlots: _ });
  return I;
}
function getChannelHistogram(E, _) {
  let { useAlpha: A, maxSlots: I } = _;
  if (this.bitDepth === 1) {
    let B = [0, 0];
    for (let P = 0; P < this.height; P++)
      for (let O = 0; O < this.width; O++) {
        let F = this.getBitXY(P, O);
        F === 0 ? (B[0] += 1) : F === 1 && (B[1] += 1);
      }
    return B;
  }
  let D = Math.log2(I);
  if (!isInteger(D)) throw new RangeError("maxSlots must be a power of 2, for example: 64, 256, 1024");
  let T = 0;
  this.bitDepth > D && (T = this.bitDepth - D);
  let C = this.data,
    R = newArray_1(Math.pow(2, Math.min(this.bitDepth, D)), 0);
  if (A && this.alpha) {
    let B = this.channels - E - 1;
    for (let P = E; P < C.length; P += this.channels) R[C[P] >> T] += C[P + B] / this.maxValue;
  } else for (let B = E; B < C.length; B += this.channels) R[C[B] >> T]++;
  return R;
}
function getColorHistogram(E = {}) {
  let { useAlpha: _ = !0, nbSlots: A = 512 } = E;
  this.checkProcessable("getColorHistogram", { bitDepth: [8, 16], components: [3] });
  let I = Math.log(A) / Math.log(8);
  if (I !== Math.floor(I)) throw new RangeError("nbSlots must be a power of 8. Usually 8, 64, 512 or 4096");
  let D = this.bitDepth - I,
    T = this.data,
    C = newArray_1(Math.pow(8, I), 0),
    R = Math.pow(2, I * 2),
    B = Math.pow(2, I);
  for (let P = 0; P < T.length; P += this.channels) {
    let O = (T[P] >> D) * R + (T[P + 1] >> D) * B + (T[P + 2] >> D);
    _ && this.alpha ? (C[O] += T[P + this.channels - 1] / this.maxValue) : C[O]++;
  }
  return C;
}
function min() {
  this.checkProcessable("min", { bitDepth: [8, 16, 32] });
  let E = newArray_1(this.channels, 1 / 0);
  for (let _ = 0; _ < this.data.length; _ += this.channels)
    for (let A = 0; A < this.channels; A++) this.data[_ + A] < E[A] && (E[A] = this.data[_ + A]);
  return E;
}
function max() {
  this.checkProcessable("max", { bitDepth: [8, 16, 32] });
  let E = newArray_1(this.channels, -1 / 0);
  for (let _ = 0; _ < this.data.length; _ += this.channels)
    for (let A = 0; A < this.channels; A++) this.data[_ + A] > E[A] && (E[A] = this.data[_ + A]);
  return E;
}
function sum() {
  this.checkProcessable("sum", { bitDepth: [8, 16] });
  let E = newArray_1(this.channels, 0);
  for (let _ = 0; _ < this.data.length; _ += this.channels)
    for (let A = 0; A < this.channels; A++) E[A] += this.data[_ + A];
  return E;
}
function getMoment(E = 0, _ = 0) {
  this.checkProcessable("getMoment", { bitDepth: [1] });
  let A = 0;
  for (let I = 0; I < this.width; I++)
    for (let D = 0; D < this.height; D++) this.getBitXY(I, D) === 1 && (A += I ** E * D ** _);
  return A;
}
function localMaxima(E = {}) {
  let { mask: _, region: A = 3, removeClosePoints: I = 0, invert: D = !1, maxEquals: T = 2 } = E,
    C = this;
  this.checkProcessable("localMaxima", { bitDepth: [8, 16], components: 1 }), (A *= 4);
  let R = D ? 0 : 1,
    B = [1, 0, -1, 0, 1, 1, -1, -1, 2, 0, -2, 0, 2, 2, -2, -2],
    P = [0, 1, 0, -1, 1, -1, 1, -1, 0, 2, 0, -2, 2, -2, 2, -2],
    O = A <= 8 ? 1 : 2,
    F = [];
  for (let L = O; L < C.height - O; L++)
    for (let U = O; U < C.width - O; U++) {
      if (_ && _.getBitXY(U, L) !== R) continue;
      let z = 0,
        V = 0,
        X = C.data[U + L * C.width];
      for (let G = 0; G < A; G++)
        D ? C.data[U + B[G] + (L + P[G]) * C.width] > X && z++ : C.data[U + B[G] + (L + P[G]) * C.width] < X && z++,
          C.data[U + B[G] + (L + P[G]) * C.width] === X && V++;
      z + V === A && V <= T && F.push([U, L]);
    }
  if (I > 0)
    for (let L = 0; L < F.length; L++)
      for (let U = L + 1; U < F.length; U++)
        Math.sqrt(Math.pow(F[L][0] - F[U][0], 2) + Math.pow(F[L][1] - F[U][1], 2)) < I &&
          ((F[L][0] = (F[L][0] + F[U][0]) >> 1), (F[L][1] = (F[L][1] + F[U][1]) >> 1), F.splice(U, 1), U--);
  return F;
}
function mean() {
  let E = this.getHistograms({ maxSlots: this.maxValue + 1 }),
    _ = new Array(E.length);
  for (let A = 0; A < E.length; A++) {
    let I = E[A];
    _[A] = mean$2(I);
  }
  return _;
}
function median() {
  let E = this.getHistograms({ maxSlots: this.maxValue + 1 }),
    _ = new Array(E.length);
  for (let A = 0; A < E.length; A++) {
    let I = E[A];
    _[A] = median$2(I);
  }
  return _;
}
function points() {
  this.checkProcessable("points", { bitDepth: [1] });
  const E = [];
  for (let _ = 0; _ < this.width; _++)
    for (let A = 0; A < this.height; A++) this.getBitXY(_, A) === 1 && E.push([_, A]);
  return E;
}
function extendedPoints() {
  this.checkProcessable("extendedPoints", { bitDepth: [1] });
  const E = [];
  for (let _ = 0; _ < this.height; _++)
    for (let A = 0; A < this.width; A++)
      if (this.getBitXY(A, _) === 1)
        for (
          E.push([A, _]),
            this.getBitXY(A + 1, _) !== 1
              ? (E.push([A + 1, _]), E.push([A + 1, _ + 1]), this.getBitXY(A, _ + 1) !== 1 && E.push([A, _ + 1]))
              : this.getBitXY(A, _ + 1) !== 1 && (E.push([A, _ + 1]), E.push([A + 1, _ + 1]));
          A < this.width - 2 && this.getBitXY(A + 1, _) === 1 && this.getBitXY(A + 2, _) === 1;

        )
          A++;
  return E;
}
function getRelativePosition(E, _ = {}) {
  if (this === E) return [0, 0];
  let A = [0, 0],
    I = this;
  for (; I; ) {
    if (I === E) return A;
    I.position && ((A[0] += I.position[0]), (A[1] += I.position[1])), (I = I.parent);
  }
  return _.defaultFurther ? A : !1;
}
function countAlphaPixels(E = {}) {
  let { alpha: _ = 1 } = E;
  this.checkProcessable("countAlphaPixels", { bitDepth: [8, 16], alpha: 1 });
  let A = 0;
  if (_ !== void 0) {
    for (let I = this.components; I < this.data.length; I += this.channels) this.data[I] === _ && A++;
    return A;
  } else return this.size;
}
function monotoneChainConvexHull$1(E, _ = {}) {
  const { sorted: A } = _;
  A || (E = E.slice().sort(byXThenY));
  const I = E.length,
    D = new Array(I * 2);
  let T = 0;
  for (let R = 0; R < I; R++) {
    const B = E[R];
    for (; T >= 2 && cw(D[T - 2], D[T - 1], B) <= 0; ) T--;
    D[T++] = B;
  }
  const C = T + 1;
  for (let R = I - 2; R >= 0; R--) {
    const B = E[R];
    for (; T >= C && cw(D[T - 2], D[T - 1], B) <= 0; ) T--;
    D[T++] = B;
  }
  return D.slice(0, T - 1);
}
function cw(E, _, A) {
  return (_[1] - E[1]) * (A[0] - E[0]) - (_[0] - E[0]) * (A[1] - E[1]);
}
function byXThenY(E, _) {
  return E[0] === _[0] ? E[1] - _[1] : E[0] - _[0];
}
function monotoneChainConvexHull() {
  return monotoneChainConvexHull$1(this.extendedPoints, { sorted: !1 });
}
function round(E) {
  for (let _ = 0; _ < E.length; _++) (E[_][0] = Math.round(E[_][0])), (E[_][1] = Math.round(E[_][1]));
  return E;
}
function difference(E, _) {
  return [E[0] - _[0], E[1] - _[1]];
}
function normalize(E) {
  let _ = Math.sqrt(E[0] ** 2 + E[1] ** 2);
  return [E[0] / _, E[1] / _];
}
function rotate(E, _, A) {
  A === void 0 && (A = new Array(_.length));
  let I = Math.cos(E),
    D = Math.sin(E);
  for (let T = 0; T < A.length; ++T) A[T] = [I * _[T][0] - D * _[T][1], D * _[T][0] + I * _[T][1]];
  return A;
}
function perimeter(E) {
  let _ = 0;
  for (let A = 0; A < E.length; A++) {
    let I = E[A][0],
      D = E[A][1],
      T = E[A === E.length - 1 ? 0 : A + 1][0],
      C = E[A === E.length - 1 ? 0 : A + 1][1];
    _ += Math.sqrt((T - I) ** 2 + (C - D) ** 2);
  }
  return _;
}
function surface(E) {
  let _ = 0;
  for (let A = 0; A < E.length; A++) {
    let I = E[A][0],
      D = E[A === E.length - 1 ? 0 : A + 1][1],
      T = E[A === E.length - 1 ? 0 : A + 1][0],
      C = E[A][1];
    (_ += I * D * 0.5), (_ -= T * C * 0.5);
  }
  return Math.abs(_);
}
function minMax$1(E) {
  let _ = 1 / 0,
    A = 1 / 0,
    I = -1 / 0,
    D = -1 / 0;
  for (let T = 0; T < E.length; T++)
    E[T][0] < _ && (_ = E[T][0]),
      E[T][0] > I && (I = E[T][0]),
      E[T][1] < A && (A = E[T][1]),
      E[T][1] > D && (D = E[T][1]);
  return [
    [_, A],
    [I, D],
  ];
}
function moveToZeroZero(E, _) {
  _ === void 0 && (_ = new Array(E.length).fill(0).map(() => []));
  let A = minMax$1(E),
    I = A[0][0],
    D = A[0][1];
  for (let T = 0; T < E.length; T++) (_[T][0] = E[T][0] - I), (_[T][1] = E[T][1] - D);
  return _;
}
function minimalBoundingRectangle(E = {}) {
  const { originalPoints: _ = monotoneChainConvexHull.call(this) } = E;
  if (_.length === 0) return [];
  if (_.length === 1) return [_[0], _[0], _[0], _[0]];
  const A = new Array(_.length);
  let I = 1 / 0,
    D = 0,
    T;
  for (let C = 0; C < A.length; C++) {
    let R = getAngle$1(_[C], _[(C + 1) % A.length]);
    rotate(-R, _, A);
    let B = A[C][0],
      P = A[C][1],
      O = A[(C + 1) % A.length][0],
      F = A[(C + 1) % A.length][1],
      L = !0,
      U = 0,
      z = 0,
      V = 0;
    for (let Y = 0; Y < A.length; Y++) {
      let q = A[Y][0],
        W = A[Y][1],
        ee = (q - B) / (O - B);
      L === !0 ? ((L = !1), (U = ee), (z = ee)) : (ee < U && (U = ee), ee > z && (z = ee));
      let te = (-(O - B) * W + O * P - F * B) / (O - B);
      Math.abs(te) > Math.abs(V) && (V = te);
    }
    let X = [B + U * (O - B), P],
      G = [B + z * (O - B), P],
      Z = Math.abs(V * (U - z) * (O - B));
    Z < I && ((D = R), (I = Z), (T = [X, G, [G[0], G[1] - V], [X[0], X[1] - V]]));
  }
  return rotate(D, T, T), T;
}
function getAngle$1(E, _) {
  let A = difference(_, E),
    I = normalize(A),
    D = Math.acos(I[0]);
  return I[1] < 0 ? -D : D;
}
function extend$1(E) {
  let _ = { inPlace: !0 };
  E.extendMethod("invert", invert),
    E.extendMethod("abs", abs),
    E.extendMethod("level", level, _),
    E.extendMethod("add", add, _),
    E.extendMethod("subtract", subtract, _),
    E.extendMethod("subtractImage", subtractImage),
    E.extendMethod("multiply", multiply, _),
    E.extendMethod("divide", divide, _),
    E.extendMethod("hypotenuse", hypotenuse),
    E.extendMethod("background", background$1),
    E.extendMethod("flipX", flipX),
    E.extendMethod("flipY", flipY),
    E.extendMethod("blurFilter", blurFilter),
    E.extendMethod("medianFilter", medianFilter),
    E.extendMethod("gaussianFilter", gaussianFilter),
    E.extendMethod("sobelFilter", sobelFilter),
    E.extendMethod("gradientFilter", gradientFilter),
    E.extendMethod("scharrFilter", scharrFilter),
    E.extendMethod("dilate", dilate),
    E.extendMethod("erode", erode),
    E.extendMethod("open", open$1),
    E.extendMethod("close", close),
    E.extendMethod("topHat", topHat),
    E.extendMethod("blackHat", blackHat),
    E.extendMethod("morphologicalGradient", morphologicalGradient),
    E.extendMethod("warpingFourPoints", warpingFourPoints),
    E.extendMethod("crop", crop),
    E.extendMethod("cropAlpha", cropAlpha),
    E.extendMethod("resize", resize).extendMethod("scale", resize),
    E.extendMethod("hsv", hsv),
    E.extendMethod("hsl", hsl$1),
    E.extendMethod("cmyk", cmyk),
    E.extendMethod("rgba8", rgba8),
    E.extendMethod("grey", grey).extendMethod("gray", grey),
    E.extendMethod("mask", mask),
    E.extendMethod("pad", pad),
    E.extendMethod("colorDepth", colorDepth),
    E.extendMethod("setBorder", setBorder, _),
    E.extendMethod("rotate", rotate$1),
    E.extendMethod("rotateLeft", rotateLeft),
    E.extendMethod("rotateRight", rotateRight),
    E.extendMethod("insert", insert),
    E.extendMethod("getRow", getRow),
    E.extendMethod("getColumn", getColumn),
    E.extendMethod("getMatrix", getMatrix),
    E.extendMethod("setMatrix", setMatrix),
    E.extendMethod("getPixelsArray", getPixelsArray),
    E.extendMethod("getIntersection", getIntersection),
    E.extendMethod("getClosestCommonParent", getClosestCommonParent),
    E.extendMethod("getThreshold", getThreshold),
    E.extendMethod("split", split),
    E.extendMethod("getChannel", getChannel),
    E.extendMethod("combineChannels", combineChannels),
    E.extendMethod("setChannel", setChannel),
    E.extendMethod("getSimilarity", getSimilarity),
    E.extendMethod("getPixelsGrid", getPixelsGrid),
    E.extendMethod("getBestMatch", getBestMatch),
    E.extendMethod("cannyEdge", cannyEdge),
    E.extendMethod("convolution", convolution),
    E.extendMethod("extract", extract),
    E.extendMethod("floodFill", floodFill),
    E.extendMethod("paintLabels", paintLabels, _),
    E.extendMethod("paintMasks", paintMasks, _),
    E.extendMethod("paintPoints", paintPoints, _),
    E.extendMethod("paintPolyline", paintPolyline, _),
    E.extendMethod("paintPolylines", paintPolylines, _),
    E.extendMethod("paintPolygon", paintPolygon, _),
    E.extendMethod("paintPolygons", paintPolygons, _),
    E.extendMethod("countAlphaPixels", countAlphaPixels),
    E.extendMethod("monotoneChainConvexHull", monotoneChainConvexHull),
    E.extendMethod("minimalBoundingRectangle", minimalBoundingRectangle),
    E.extendMethod("getHistogram", getHistogram).extendProperty("histogram", getHistogram),
    E.extendMethod("getHistograms", getHistograms).extendProperty("histograms", getHistograms),
    E.extendMethod("getColorHistogram", getColorHistogram).extendProperty("colorHistogram", getColorHistogram),
    E.extendMethod("getMin", min).extendProperty("min", min),
    E.extendMethod("getMax", max).extendProperty("max", max),
    E.extendMethod("getSum", sum).extendProperty("sum", sum),
    E.extendMethod("getMoment", getMoment).extendProperty("moment", getMoment),
    E.extendMethod("getLocalMaxima", localMaxima),
    E.extendMethod("getMedian", median).extendProperty("median", median),
    E.extendMethod("getMean", mean).extendProperty("mean", mean),
    E.extendMethod("getPoints", points).extendProperty("points", points),
    E.extendMethod("getExtendedPoints", extendedPoints).extendProperty("extendedPoints", extendedPoints),
    E.extendMethod("getRelativePosition", getRelativePosition);
}
var quantitiesExports = {},
  quantities = {
    get exports() {
      return quantitiesExports;
    },
    set exports(E) {
      quantitiesExports = E;
    },
  };
(function (E, _) {
  (function (A, I) {
    E.exports = I();
  })(commonjsGlobal, function () {
    function A(ae) {
      return typeof ae == "string" || ae instanceof String;
    }
    var I = Number.isFinite || window.isFinite;
    function D(ae) {
      return I(ae);
    }
    function T(ae) {
      return ae;
    }
    function C(ae) {
      var le = {};
      return ae.filter(function (ce) {
        return le.hasOwnProperty(ce) ? !1 : (le[ce] = !0);
      });
    }
    function R(ae, le) {
      if (le.length !== ae.length) return !1;
      for (var ce = 0; ce < ae.length; ce++)
        if ((le[ce].compareArray && !le[ce].compareArray(ae[ce])) || le[ce] !== ae[ce]) return !1;
      return !0;
    }
    function B(ae, le) {
      Object.keys(le).forEach(function (ce) {
        ae[ce] = le[ce];
      });
    }
    function P() {
      for (var ae = 1, le = 0, ce = 0; ce < arguments.length; ce++) {
        var Ae = arguments[ce];
        (le = le + L(Ae)), (ae *= Ae);
      }
      return le !== 0 ? F(ae, le) : ae;
    }
    function O(ae, le) {
      if (le === 0) throw new Error("Divide by zero");
      var ce = Math.pow(10, L(le)),
        Ae = ce / (ce * le);
      return P(ae, Ae);
    }
    function F(ae, le) {
      return Math.round(ae * Math.pow(10, le)) / Math.pow(10, le);
    }
    function L(ae) {
      if (!isFinite(ae)) return 0;
      for (var le = 0; ae % 1 !== 0; ) (ae *= 10), le++;
      return le;
    }
    function U() {
      var ae;
      if (!this) return (ae = Object.create(U.prototype)), U.apply(ae, arguments), ae;
      (ae = Error.apply(this, arguments)),
        (this.name = "QtyError"),
        (this.message = ae.message),
        (this.stack = ae.stack);
    }
    U.prototype = Object.create(Error.prototype, { constructor: { value: U } });
    function z(ae, le) {
      throw new U("Incompatible units: " + ae + " and " + le);
    }
    var V = {
        "<googol>": [["googol"], 1e100, "prefix"],
        "<kibi>": [["Ki", "Kibi", "kibi"], Math.pow(2, 10), "prefix"],
        "<mebi>": [["Mi", "Mebi", "mebi"], Math.pow(2, 20), "prefix"],
        "<gibi>": [["Gi", "Gibi", "gibi"], Math.pow(2, 30), "prefix"],
        "<tebi>": [["Ti", "Tebi", "tebi"], Math.pow(2, 40), "prefix"],
        "<pebi>": [["Pi", "Pebi", "pebi"], Math.pow(2, 50), "prefix"],
        "<exi>": [["Ei", "Exi", "exi"], Math.pow(2, 60), "prefix"],
        "<zebi>": [["Zi", "Zebi", "zebi"], Math.pow(2, 70), "prefix"],
        "<yebi>": [["Yi", "Yebi", "yebi"], Math.pow(2, 80), "prefix"],
        "<yotta>": [["Y", "Yotta", "yotta"], 1e24, "prefix"],
        "<zetta>": [["Z", "Zetta", "zetta"], 1e21, "prefix"],
        "<exa>": [["E", "Exa", "exa"], 1e18, "prefix"],
        "<peta>": [["P", "Peta", "peta"], 1e15, "prefix"],
        "<tera>": [["T", "Tera", "tera"], 1e12, "prefix"],
        "<giga>": [["G", "Giga", "giga"], 1e9, "prefix"],
        "<mega>": [["M", "Mega", "mega"], 1e6, "prefix"],
        "<kilo>": [["k", "kilo"], 1e3, "prefix"],
        "<hecto>": [["h", "Hecto", "hecto"], 100, "prefix"],
        "<deca>": [["da", "Deca", "deca", "deka"], 10, "prefix"],
        "<deci>": [["d", "Deci", "deci"], 0.1, "prefix"],
        "<centi>": [["c", "Centi", "centi"], 0.01, "prefix"],
        "<milli>": [["m", "Milli", "milli"], 0.001, "prefix"],
        "<micro>": [["u", "μ", "µ", "Micro", "mc", "micro"], 1e-6, "prefix"],
        "<nano>": [["n", "Nano", "nano"], 1e-9, "prefix"],
        "<pico>": [["p", "Pico", "pico"], 1e-12, "prefix"],
        "<femto>": [["f", "Femto", "femto"], 1e-15, "prefix"],
        "<atto>": [["a", "Atto", "atto"], 1e-18, "prefix"],
        "<zepto>": [["z", "Zepto", "zepto"], 1e-21, "prefix"],
        "<yocto>": [["y", "Yocto", "yocto"], 1e-24, "prefix"],
        "<1>": [["1", "<1>"], 1, ""],
        "<meter>": [["m", "meter", "meters", "metre", "metres"], 1, "length", ["<meter>"]],
        "<inch>": [["in", "inch", "inches", '"'], 0.0254, "length", ["<meter>"]],
        "<foot>": [["ft", "foot", "feet", "'"], 0.3048, "length", ["<meter>"]],
        "<yard>": [["yd", "yard", "yards"], 0.9144, "length", ["<meter>"]],
        "<mile>": [["mi", "mile", "miles"], 1609.344, "length", ["<meter>"]],
        "<naut-mile>": [["nmi", "naut-mile"], 1852, "length", ["<meter>"]],
        "<league>": [["league", "leagues"], 4828, "length", ["<meter>"]],
        "<furlong>": [["furlong", "furlongs"], 201.2, "length", ["<meter>"]],
        "<rod>": [["rd", "rod", "rods"], 5.029, "length", ["<meter>"]],
        "<mil>": [["mil", "mils"], 254e-7, "length", ["<meter>"]],
        "<angstrom>": [["ang", "angstrom", "angstroms"], 1e-10, "length", ["<meter>"]],
        "<fathom>": [["fathom", "fathoms"], 1.829, "length", ["<meter>"]],
        "<pica>": [["pica", "picas"], 0.00423333333, "length", ["<meter>"]],
        "<point>": [["pt", "point", "points"], 0.000352777778, "length", ["<meter>"]],
        "<redshift>": [["z", "red-shift", "redshift"], 1302773e20, "length", ["<meter>"]],
        "<AU>": [["AU", "astronomical-unit"], 1495979e5, "length", ["<meter>"]],
        "<light-second>": [["ls", "light-second"], 299792500, "length", ["<meter>"]],
        "<light-minute>": [["lmin", "light-minute"], 1798755e4, "length", ["<meter>"]],
        "<light-year>": [["ly", "light-year"], 9460528e9, "length", ["<meter>"]],
        "<parsec>": [["pc", "parsec", "parsecs"], 3085678e10, "length", ["<meter>"]],
        "<datamile>": [["DM", "datamile"], 1828.8, "length", ["<meter>"]],
        "<kilogram>": [["kg", "kilogram", "kilograms"], 1, "mass", ["<kilogram>"]],
        "<AMU>": [["u", "AMU", "amu"], 1660538921e-36, "mass", ["<kilogram>"]],
        "<dalton>": [["Da", "Dalton", "Daltons", "dalton", "daltons"], 1660538921e-36, "mass", ["<kilogram>"]],
        "<slug>": [["slug", "slugs"], 14.5939029, "mass", ["<kilogram>"]],
        "<short-ton>": [["tn", "ton", "short-ton"], 907.18474, "mass", ["<kilogram>"]],
        "<metric-ton>": [["tonne", "metric-ton"], 1e3, "mass", ["<kilogram>"]],
        "<carat>": [["ct", "carat", "carats"], 2e-4, "mass", ["<kilogram>"]],
        "<pound>": [["lbs", "lb", "pound", "pounds", "#"], 0.45359237, "mass", ["<kilogram>"]],
        "<ounce>": [["oz", "ounce", "ounces"], 0.0283495231, "mass", ["<kilogram>"]],
        "<gram>": [["g", "gram", "grams", "gramme", "grammes"], 0.001, "mass", ["<kilogram>"]],
        "<grain>": [["grain", "grains", "gr"], 6479891e-11, "mass", ["<kilogram>"]],
        "<dram>": [["dram", "drams", "dr"], 0.0017718452, "mass", ["<kilogram>"]],
        "<stone>": [["stone", "stones", "st"], 6.35029318, "mass", ["<kilogram>"]],
        "<hectare>": [["hectare"], 1e4, "area", ["<meter>", "<meter>"]],
        "<acre>": [["acre", "acres"], 4046.85642, "area", ["<meter>", "<meter>"]],
        "<sqft>": [["sqft"], 1, "area", ["<foot>", "<foot>"]],
        "<liter>": [
          ["l", "L", "liter", "liters", "litre", "litres"],
          0.001,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<gallon>": [["gal", "gallon", "gallons"], 0.0037854118, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<gallon-imp>": [
          ["galimp", "gallon-imp", "gallons-imp"],
          0.00454609,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<quart>": [["qt", "quart", "quarts"], 0.00094635295, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<pint>": [["pt", "pint", "pints"], 0.000473176475, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<pint-imp>": [["ptimp", "pint-imp", "pints-imp"], 0.00056826125, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<cup>": [["cu", "cup", "cups"], 0.000236588238, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<fluid-ounce>": [
          ["floz", "fluid-ounce", "fluid-ounces"],
          295735297e-13,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<fluid-ounce-imp>": [
          ["flozimp", "floz-imp", "fluid-ounce-imp", "fluid-ounces-imp"],
          284130625e-13,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<tablespoon>": [
          ["tb", "tbsp", "tbs", "tablespoon", "tablespoons"],
          147867648e-13,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<teaspoon>": [["tsp", "teaspoon", "teaspoons"], 492892161e-14, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<bushel>": [["bu", "bsh", "bushel", "bushels"], 0.035239072, "volume", ["<meter>", "<meter>", "<meter>"]],
        "<oilbarrel>": [
          ["bbl", "oilbarrel", "oilbarrels", "oil-barrel", "oil-barrels"],
          0.158987294928,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<beerbarrel>": [
          ["bl", "bl-us", "beerbarrel", "beerbarrels", "beer-barrel", "beer-barrels"],
          0.1173477658,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<beerbarrel-imp>": [
          ["blimp", "bl-imp", "beerbarrel-imp", "beerbarrels-imp", "beer-barrel-imp", "beer-barrels-imp"],
          0.16365924,
          "volume",
          ["<meter>", "<meter>", "<meter>"],
        ],
        "<kph>": [["kph"], 0.277777778, "speed", ["<meter>"], ["<second>"]],
        "<mph>": [["mph"], 0.44704, "speed", ["<meter>"], ["<second>"]],
        "<knot>": [["kt", "kn", "kts", "knot", "knots"], 0.514444444, "speed", ["<meter>"], ["<second>"]],
        "<fps>": [["fps"], 0.3048, "speed", ["<meter>"], ["<second>"]],
        "<gee>": [["gee"], 9.80665, "acceleration", ["<meter>"], ["<second>", "<second>"]],
        "<Gal>": [["Gal"], 0.01, "acceleration", ["<meter>"], ["<second>", "<second>"]],
        "<kelvin>": [["degK", "kelvin"], 1, "temperature", ["<kelvin>"]],
        "<celsius>": [["degC", "celsius", "celsius", "centigrade"], 1, "temperature", ["<kelvin>"]],
        "<fahrenheit>": [["degF", "fahrenheit"], 5 / 9, "temperature", ["<kelvin>"]],
        "<rankine>": [["degR", "rankine"], 5 / 9, "temperature", ["<kelvin>"]],
        "<temp-K>": [["tempK", "temp-K"], 1, "temperature", ["<temp-K>"]],
        "<temp-C>": [["tempC", "temp-C"], 1, "temperature", ["<temp-K>"]],
        "<temp-F>": [["tempF", "temp-F"], 5 / 9, "temperature", ["<temp-K>"]],
        "<temp-R>": [["tempR", "temp-R"], 5 / 9, "temperature", ["<temp-K>"]],
        "<second>": [["s", "sec", "secs", "second", "seconds"], 1, "time", ["<second>"]],
        "<minute>": [["min", "mins", "minute", "minutes"], 60, "time", ["<second>"]],
        "<hour>": [["h", "hr", "hrs", "hour", "hours"], 3600, "time", ["<second>"]],
        "<day>": [["d", "day", "days"], 3600 * 24, "time", ["<second>"]],
        "<week>": [["wk", "week", "weeks"], 7 * 3600 * 24, "time", ["<second>"]],
        "<fortnight>": [["fortnight", "fortnights"], 1209600, "time", ["<second>"]],
        "<year>": [["y", "yr", "year", "years", "annum"], 31556926, "time", ["<second>"]],
        "<decade>": [["decade", "decades"], 315569260, "time", ["<second>"]],
        "<century>": [["century", "centuries"], 3155692600, "time", ["<second>"]],
        "<pascal>": [["Pa", "pascal", "Pascal"], 1, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<bar>": [["bar", "bars"], 1e5, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<mmHg>": [["mmHg"], 133.322368, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<inHg>": [["inHg"], 3386.3881472, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<torr>": [["torr"], 133.322368, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<atm>": [
          ["atm", "ATM", "atmosphere", "atmospheres"],
          101325,
          "pressure",
          ["<kilogram>"],
          ["<meter>", "<second>", "<second>"],
        ],
        "<psi>": [["psi"], 6894.76, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<cmh2o>": [["cmH2O", "cmh2o"], 98.0638, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<inh2o>": [["inH2O", "inh2o"], 249.082052, "pressure", ["<kilogram>"], ["<meter>", "<second>", "<second>"]],
        "<poise>": [["P", "poise"], 0.1, "viscosity", ["<kilogram>"], ["<meter>", "<second>"]],
        "<stokes>": [["St", "stokes"], 1e-4, "viscosity", ["<meter>", "<meter>"], ["<second>"]],
        "<mole>": [["mol", "mole"], 1, "substance", ["<mole>"]],
        "<molar>": [["M", "molar"], 1e3, "concentration", ["<mole>"], ["<meter>", "<meter>", "<meter>"]],
        "<wtpercent>": [["wt%", "wtpercent"], 10, "concentration", ["<kilogram>"], ["<meter>", "<meter>", "<meter>"]],
        "<katal>": [["kat", "katal", "Katal"], 1, "activity", ["<mole>"], ["<second>"]],
        "<unit>": [["U", "enzUnit", "unit"], 16667e-19, "activity", ["<mole>"], ["<second>"]],
        "<farad>": [
          ["F", "farad", "Farad"],
          1,
          "capacitance",
          ["<second>", "<second>", "<second>", "<second>", "<ampere>", "<ampere>"],
          ["<meter>", "<meter>", "<kilogram>"],
        ],
        "<coulomb>": [["C", "coulomb", "Coulomb"], 1, "charge", ["<ampere>", "<second>"]],
        "<Ah>": [["Ah"], 3600, "charge", ["<ampere>", "<second>"]],
        "<ampere>": [["A", "Ampere", "ampere", "amp", "amps"], 1, "current", ["<ampere>"]],
        "<siemens>": [
          ["S", "Siemens", "siemens"],
          1,
          "conductance",
          ["<second>", "<second>", "<second>", "<ampere>", "<ampere>"],
          ["<kilogram>", "<meter>", "<meter>"],
        ],
        "<henry>": [
          ["H", "Henry", "henry"],
          1,
          "inductance",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>", "<ampere>", "<ampere>"],
        ],
        "<volt>": [
          ["V", "Volt", "volt", "volts"],
          1,
          "potential",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>", "<second>", "<ampere>"],
        ],
        "<ohm>": [
          ["Ohm", "ohm", "Ω", "Ω"],
          1,
          "resistance",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>", "<second>", "<ampere>", "<ampere>"],
        ],
        "<weber>": [
          ["Wb", "weber", "webers"],
          1,
          "magnetism",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>", "<ampere>"],
        ],
        "<tesla>": [["T", "tesla", "teslas"], 1, "magnetism", ["<kilogram>"], ["<second>", "<second>", "<ampere>"]],
        "<gauss>": [["G", "gauss"], 1e-4, "magnetism", ["<kilogram>"], ["<second>", "<second>", "<ampere>"]],
        "<maxwell>": [
          ["Mx", "maxwell", "maxwells"],
          1e-8,
          "magnetism",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>", "<ampere>"],
        ],
        "<oersted>": [["Oe", "oersted", "oersteds"], 250 / Math.PI, "magnetism", ["<ampere>"], ["<meter>"]],
        "<joule>": [
          ["J", "joule", "Joule", "joules"],
          1,
          "energy",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>"],
        ],
        "<erg>": [["erg", "ergs"], 1e-7, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<btu>": [
          ["BTU", "btu", "BTUs"],
          1055.056,
          "energy",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>"],
        ],
        "<calorie>": [
          ["cal", "calorie", "calories"],
          4.184,
          "energy",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>"],
        ],
        "<Calorie>": [
          ["Cal", "Calorie", "Calories"],
          4184,
          "energy",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>"],
        ],
        "<therm-US>": [
          ["th", "therm", "therms", "Therm", "therm-US"],
          105480400,
          "energy",
          ["<meter>", "<meter>", "<kilogram>"],
          ["<second>", "<second>"],
        ],
        "<Wh>": [["Wh"], 3600, "energy", ["<meter>", "<meter>", "<kilogram>"], ["<second>", "<second>"]],
        "<newton>": [["N", "Newton", "newton"], 1, "force", ["<kilogram>", "<meter>"], ["<second>", "<second>"]],
        "<dyne>": [["dyn", "dyne"], 1e-5, "force", ["<kilogram>", "<meter>"], ["<second>", "<second>"]],
        "<pound-force>": [
          ["lbf", "pound-force"],
          4.448222,
          "force",
          ["<kilogram>", "<meter>"],
          ["<second>", "<second>"],
        ],
        "<hertz>": [["Hz", "hertz", "Hertz"], 1, "frequency", ["<1>"], ["<second>"]],
        "<radian>": [["rad", "radian", "radians"], 1, "angle", ["<radian>"]],
        "<degree>": [["deg", "degree", "degrees"], Math.PI / 180, "angle", ["<radian>"]],
        "<gradian>": [["gon", "grad", "gradian", "grads"], Math.PI / 200, "angle", ["<radian>"]],
        "<steradian>": [["sr", "steradian", "steradians"], 1, "solid_angle", ["<steradian>"]],
        "<rotation>": [["rotation"], 2 * Math.PI, "angle", ["<radian>"]],
        "<rpm>": [["rpm"], (2 * Math.PI) / 60, "angular_velocity", ["<radian>"], ["<second>"]],
        "<byte>": [["B", "byte", "bytes"], 1, "information", ["<byte>"]],
        "<bit>": [["b", "bit", "bits"], 0.125, "information", ["<byte>"]],
        "<Bps>": [["Bps"], 1, "information_rate", ["<byte>"], ["<second>"]],
        "<bps>": [["bps"], 0.125, "information_rate", ["<byte>"], ["<second>"]],
        "<dollar>": [["USD", "dollar"], 1, "currency", ["<dollar>"]],
        "<cents>": [["cents"], 0.01, "currency", ["<dollar>"]],
        "<candela>": [["cd", "candela"], 1, "luminosity", ["<candela>"]],
        "<lumen>": [["lm", "lumen"], 1, "luminous_power", ["<candela>", "<steradian>"]],
        "<lux>": [["lux"], 1, "illuminance", ["<candela>", "<steradian>"], ["<meter>", "<meter>"]],
        "<watt>": [
          ["W", "watt", "watts"],
          1,
          "power",
          ["<kilogram>", "<meter>", "<meter>"],
          ["<second>", "<second>", "<second>"],
        ],
        "<volt-ampere>": [
          ["VA", "volt-ampere"],
          1,
          "power",
          ["<kilogram>", "<meter>", "<meter>"],
          ["<second>", "<second>", "<second>"],
        ],
        "<volt-ampere-reactive>": [
          ["var", "Var", "VAr", "VAR", "volt-ampere-reactive"],
          1,
          "power",
          ["<kilogram>", "<meter>", "<meter>"],
          ["<second>", "<second>", "<second>"],
        ],
        "<horsepower>": [
          ["hp", "horsepower"],
          745.699872,
          "power",
          ["<kilogram>", "<meter>", "<meter>"],
          ["<second>", "<second>", "<second>"],
        ],
        "<gray>": [["Gy", "gray", "grays"], 1, "radiation", ["<meter>", "<meter>"], ["<second>", "<second>"]],
        "<roentgen>": [["R", "roentgen"], 0.00933, "radiation", ["<meter>", "<meter>"], ["<second>", "<second>"]],
        "<sievert>": [["Sv", "sievert", "sieverts"], 1, "radiation", ["<meter>", "<meter>"], ["<second>", "<second>"]],
        "<becquerel>": [["Bq", "becquerel", "becquerels"], 1, "radiation", ["<1>"], ["<second>"]],
        "<curie>": [["Ci", "curie", "curies"], 37e9, "radiation", ["<1>"], ["<second>"]],
        "<cpm>": [["cpm"], 1 / 60, "rate", ["<count>"], ["<second>"]],
        "<dpm>": [["dpm"], 1 / 60, "rate", ["<count>"], ["<second>"]],
        "<bpm>": [["bpm"], 1 / 60, "rate", ["<count>"], ["<second>"]],
        "<dot>": [["dot", "dots"], 1, "resolution", ["<each>"]],
        "<pixel>": [["pixel", "px"], 1, "resolution", ["<each>"]],
        "<ppi>": [["ppi"], 1, "resolution", ["<pixel>"], ["<inch>"]],
        "<dpi>": [["dpi"], 1, "typography", ["<dot>"], ["<inch>"]],
        "<cell>": [["cells", "cell"], 1, "counting", ["<each>"]],
        "<each>": [["each"], 1, "counting", ["<each>"]],
        "<count>": [["count"], 1, "counting", ["<each>"]],
        "<base-pair>": [["bp", "base-pair"], 1, "counting", ["<each>"]],
        "<nucleotide>": [["nt", "nucleotide"], 1, "counting", ["<each>"]],
        "<molecule>": [["molecule", "molecules"], 1, "counting", ["<1>"]],
        "<dozen>": [["doz", "dz", "dozen"], 12, "prefix_only", ["<each>"]],
        "<percent>": [["%", "percent"], 0.01, "prefix_only", ["<1>"]],
        "<ppm>": [["ppm"], 1e-6, "prefix_only", ["<1>"]],
        "<ppt>": [["ppt"], 1e-9, "prefix_only", ["<1>"]],
        "<gross>": [["gr", "gross"], 144, "prefix_only", ["<dozen>", "<dozen>"]],
        "<decibel>": [["dB", "decibel", "decibels"], 1, "logarithmic", ["<decibel>"]],
      },
      X = [
        "<meter>",
        "<kilogram>",
        "<second>",
        "<mole>",
        "<ampere>",
        "<radian>",
        "<kelvin>",
        "<temp-K>",
        "<byte>",
        "<dollar>",
        "<candela>",
        "<each>",
        "<steradian>",
        "<decibel>",
      ],
      G = "<1>",
      Z = [G];
    function Y(ae, le) {
      var ce = le[1],
        Ae = le[3] || [],
        Ve = le[4] || [];
      if (!D(ce)) throw new U(ae + ": Invalid unit definition. 'scalar' must be a number");
      Ae.forEach(function (Ze) {
        if (V[Ze] === void 0)
          throw new U(ae + ": Invalid unit definition. Unit " + Ze + " in 'numerator' is not recognized");
      }),
        Ve.forEach(function (Ze) {
          if (V[Ze] === void 0)
            throw new U(ae + ": Invalid unit definition. Unit " + Ze + " in 'denominator' is not recognized");
        });
    }
    var q = {},
      W = {},
      ee = {},
      te = {},
      Q = {};
    for (var J in V)
      if (V.hasOwnProperty(J)) {
        var K = V[J];
        if (K[2] === "prefix") {
          q[J] = K[1];
          for (var ne = 0; ne < K[0].length; ne++) W[K[0][ne]] = J;
        } else {
          Y(J, K), (ee[J] = { scalar: K[1], numerator: K[3], denominator: K[4] });
          for (var re = 0; re < K[0].length; re++) te[K[0][re]] = J;
        }
        Q[J] = K[0][0];
      }
    function ie(ae) {
      var le,
        ce = [],
        Ae = Object.keys(V);
      if (typeof ae > "u")
        for (le = 0; le < Ae.length; le++)
          ["", "prefix"].indexOf(V[Ae[le]][2]) === -1 && ce.push(Ae[le].substr(1, Ae[le].length - 2));
      else {
        if (this.getKinds().indexOf(ae) === -1) throw new U("Kind not recognized");
        for (le = 0; le < Ae.length; le++) V[Ae[le]][2] === ae && ce.push(Ae[le].substr(1, Ae[le].length - 2));
      }
      return ce.sort(function (Ve, Ze) {
        return Ve.toLowerCase() < Ze.toLowerCase() ? -1 : Ve.toLowerCase() > Ze.toLowerCase() ? 1 : 0;
      });
    }
    function se(ae) {
      if (!te[ae]) throw new U("Unit not recognized");
      return V[te[ae]][0];
    }
    var oe = [
      "length",
      "time",
      "temperature",
      "mass",
      "current",
      "substance",
      "luminosity",
      "currency",
      "information",
      "angle",
    ];
    function _e() {
      if (this.signature) return this.signature;
      for (var ae = ve.call(this), le = 0; le < ae.length; le++) ae[le] *= Math.pow(20, le);
      return ae.reduce(function (ce, Ae) {
        return ce + Ae;
      }, 0);
    }
    function ve() {
      if (!this.isBase()) return ve.call(this.toBase());
      for (var ae = new Array(oe.length), le = 0; le < ae.length; le++) ae[le] = 0;
      for (var ce, Ae, Ve = 0; Ve < this.numerator.length; Ve++)
        (ce = V[this.numerator[Ve]]) && ((Ae = oe.indexOf(ce[2])), Ae >= 0 && (ae[Ae] = ae[Ae] + 1));
      for (var Ze = 0; Ze < this.denominator.length; Ze++)
        (ce = V[this.denominator[Ze]]) && ((Ae = oe.indexOf(ce[2])), Ae >= 0 && (ae[Ae] = ae[Ae] - 1));
      return ae;
    }
    var fe = "[+-]",
      ke = "\\d+",
      me = fe + "?" + ke,
      Ee = "\\." + ke,
      Se = "(?:" + ke + "(?:" + Ee + ")?)|(?:" + Ee + ")",
      ue = "[Ee]" + me,
      xe = "(?:" + Se + ")(?:" + ue + ")?",
      pe = fe + "?\\s*" + xe,
      we = "(" + pe + ")?\\s*([^/]*)(?:/(.+))?",
      Ne = new RegExp("^" + we + "$"),
      Ce = "\\^|\\*{2}",
      De = "[01234]",
      Ue = new RegExp("([^ \\*\\d]+?)(?:" + Ce + ")?(-?" + De + "(?![a-zA-Z]))"),
      Oe = new RegExp("([^ \\*\\d]+?)(?:" + Ce + ")?(" + De + "(?![a-zA-Z]))");
    function ge(ae) {
      A(ae) || (ae = ae.toString()), (ae = ae.trim());
      var le = Ne.exec(ae);
      if (!le) throw new U(ae + ": Quantity not recognized");
      var ce = le[1];
      ce ? ((ce = ce.replace(/\s/g, "")), (this.scalar = parseFloat(ce))) : (this.scalar = 1);
      for (var Ae = le[2], Ve = le[3], Ze, lt, at; (le = Ue.exec(Ae)); ) {
        if (((Ze = parseFloat(le[2])), isNaN(Ze))) throw new U("Unit exponent is not a number");
        if (Ze === 0 && !Me.test(le[1])) throw new U("Unit not recognized");
        (lt = le[1] + " "), (at = "");
        for (var ct = 0; ct < Math.abs(Ze); ct++) at += lt;
        Ze >= 0 ? (Ae = Ae.replace(le[0], at)) : ((Ve = Ve ? Ve + at : at), (Ae = Ae.replace(le[0], "")));
      }
      for (; (le = Oe.exec(Ve)); ) {
        if (((Ze = parseFloat(le[2])), isNaN(Ze))) throw new U("Unit exponent is not a number");
        if (Ze === 0 && !Me.test(le[1])) throw new U("Unit not recognized");
        (lt = le[1] + " "), (at = "");
        for (var dt = 0; dt < Ze; dt++) at += lt;
        Ve = Ve.replace(le[0], at);
      }
      Ae && (this.numerator = Pe(Ae.trim())), Ve && (this.denominator = Pe(Ve.trim()));
    }
    var Ke = Object.keys(W)
        .sort(function (ae, le) {
          return le.length - ae.length;
        })
        .join("|"),
      Ie = Object.keys(te)
        .sort(function (ae, le) {
          return le.length - ae.length;
        })
        .join("|"),
      ye = "\\b|$",
      Re = "(" + Ke + ")??(" + Ie + ")(?:" + ye + ")",
      Me = new RegExp("^\\s*(" + Re + "[\\s\\*]*)+$"),
      Te = new RegExp(Re, "g"),
      he = {};
    function Pe(ae) {
      var le = he[ae];
      if (le) return le;
      var ce,
        Ae = [];
      if (!Me.test(ae)) throw new U("Unit not recognized");
      for (; (ce = Te.exec(ae)); ) Ae.push(ce.slice(1));
      return (
        (Ae = Ae.map(function (Ve) {
          return W[Ve[0]] ? [W[Ve[0]], te[Ve[1]]] : [te[Ve[1]]];
        })),
        (Ae = Ae.reduce(function (Ve, Ze) {
          return Ve.concat(Ze);
        }, [])),
        (Ae = Ae.filter(function (Ve) {
          return Ve;
        })),
        (he[ae] = Ae),
        Ae
      );
    }
    function Ge(ae) {
      if (!A(ae)) throw new U("Argument should be a string");
      try {
        return this(ae);
      } catch {
        return null;
      }
    }
    function $e(ae) {
      return ae instanceof be;
    }
    function be(ae, le) {
      if ((qe.apply(null, arguments), !$e(this))) return new be(ae, le);
      if (
        ((this.scalar = null),
        (this.baseScalar = null),
        (this.signature = null),
        (this._conversionCache = {}),
        (this.numerator = Z),
        (this.denominator = Z),
        He(ae)
          ? ((this.scalar = ae.scalar),
            (this.numerator = ae.numerator && ae.numerator.length !== 0 ? ae.numerator : Z),
            (this.denominator = ae.denominator && ae.denominator.length !== 0 ? ae.denominator : Z))
          : le
            ? (ge.call(this, le), (this.scalar = ae))
            : ge.call(this, ae),
        this.denominator.join("*").indexOf("temp") >= 0)
      )
        throw new U("Cannot divide with temperatures");
      if (this.numerator.join("*").indexOf("temp") >= 0) {
        if (this.numerator.length > 1) throw new U("Cannot multiply by temperatures");
        if (!R(this.denominator, Z)) throw new U("Cannot divide with temperatures");
      }
      if (((this.initValue = ae), ze.call(this), this.isTemperature() && this.baseScalar < 0))
        throw new U("Temperatures must not be less than absolute zero");
    }
    be.prototype = { constructor: be };
    function qe(ae, le) {
      if (le) {
        if (!(D(ae) && A(le)))
          throw new U("Only number accepted as initialization value when units are explicitly provided");
      } else if (!(A(ae) || D(ae) || $e(ae) || He(ae)))
        throw new U("Only string, number or quantity accepted as single initialization value");
    }
    function He(ae) {
      return ae && typeof ae == "object" && ae.hasOwnProperty("scalar");
    }
    function ze() {
      if (this.baseScalar) return this.baseScalar;
      if (this.isBase()) (this.baseScalar = this.scalar), (this.signature = _e.call(this));
      else {
        var ae = this.toBase();
        (this.baseScalar = ae.scalar), (this.signature = ae.signature);
      }
    }
    var je = {
      "-312078": "elastance",
      "-312058": "resistance",
      "-312038": "inductance",
      "-152058": "potential",
      "-152040": "magnetism",
      "-152038": "magnetism",
      "-7997": "specific_volume",
      "-79": "snap",
      "-59": "jolt",
      "-39": "acceleration",
      "-38": "radiation",
      "-20": "frequency",
      "-19": "speed",
      "-18": "viscosity",
      "-17": "volumetric_flow",
      "-1": "wavenumber",
      0: "unitless",
      1: "length",
      2: "area",
      3: "volume",
      20: "time",
      400: "temperature",
      7941: "yank",
      7942: "power",
      7959: "pressure",
      7961: "force",
      7962: "energy",
      7979: "viscosity",
      7981: "momentum",
      7982: "angular_momentum",
      7997: "density",
      7998: "area_density",
      8e3: "mass",
      152020: "radiation_exposure",
      159999: "magnetism",
      16e4: "current",
      160020: "charge",
      312058: "conductance",
      312078: "capacitance",
      3199980: "activity",
      3199997: "molar_concentration",
      32e5: "substance",
      63999998: "illuminance",
      64e6: "luminous_power",
      128e7: "currency",
      25599999980: "information_rate",
      25600000000: "information",
      511999999980: "angular_velocity",
      512000000000: "angle",
    };
    function Xe() {
      return C(
        Object.keys(je).map(function (ae) {
          return je[ae];
        }),
      );
    }
    (be.prototype.kind = function () {
      return je[this.signature.toString()];
    }),
      B(be.prototype, {
        isDegrees: function () {
          return (
            (this.signature === null || this.signature === 400) &&
            this.numerator.length === 1 &&
            R(this.denominator, Z) &&
            (this.numerator[0].match(/<temp-[CFRK]>/) ||
              this.numerator[0].match(/<(kelvin|celsius|rankine|fahrenheit)>/))
          );
        },
        isTemperature: function () {
          return this.isDegrees() && this.numerator[0].match(/<temp-[CFRK]>/);
        },
      });
    function Be(ae, le) {
      var ce = ae.units(),
        Ae = le.to(ce),
        Ve = be(Ye(ce));
      return be({ scalar: ae.scalar - Ae.scalar, numerator: Ve.numerator, denominator: Ve.denominator });
    }
    function de(ae, le) {
      var ce = le.to(Ye(ae.units()));
      return be({ scalar: ae.scalar - ce.scalar, numerator: ae.numerator, denominator: ae.denominator });
    }
    function Le(ae, le) {
      var ce = le.to(Ye(ae.units()));
      return be({ scalar: ae.scalar + ce.scalar, numerator: ae.numerator, denominator: ae.denominator });
    }
    function Ye(ae) {
      if (ae === "tempK") return "degK";
      if (ae === "tempC") return "degC";
      if (ae === "tempF") return "degF";
      if (ae === "tempR") return "degR";
      throw new U("Unknown type for temp conversion from: " + ae);
    }
    function Qe(ae, le) {
      var ce = Je(ae),
        Ae = le.units(),
        Ve;
      if (Ae === "degK") Ve = ce.scalar;
      else if (Ae === "degC") Ve = ce.scalar;
      else if (Ae === "degF") Ve = (ce.scalar * 9) / 5;
      else if (Ae === "degR") Ve = (ce.scalar * 9) / 5;
      else throw new U("Unknown type for degree conversion to: " + Ae);
      return be({ scalar: Ve, numerator: le.numerator, denominator: le.denominator });
    }
    function Je(ae) {
      var le = ae.units(),
        ce;
      if (le.match(/(deg)[CFRK]/)) ce = ae.baseScalar;
      else if (le === "tempK") ce = ae.scalar;
      else if (le === "tempC") ce = ae.scalar;
      else if (le === "tempF") ce = (ae.scalar * 5) / 9;
      else if (le === "tempR") ce = (ae.scalar * 5) / 9;
      else throw new U("Unknown type for temp conversion from: " + le);
      return be({ scalar: ce, numerator: ["<kelvin>"], denominator: Z });
    }
    function rt(ae, le) {
      var ce = le.units(),
        Ae;
      if (ce === "tempK") Ae = ae.baseScalar;
      else if (ce === "tempC") Ae = ae.baseScalar - 273.15;
      else if (ce === "tempF") Ae = (ae.baseScalar * 9) / 5 - 459.67;
      else if (ce === "tempR") Ae = (ae.baseScalar * 9) / 5;
      else throw new U("Unknown type for temp conversion to: " + ce);
      return be({ scalar: Ae, numerator: le.numerator, denominator: le.denominator });
    }
    function Fe(ae) {
      var le = ae.units(),
        ce;
      if (le.match(/(deg)[CFRK]/)) ce = ae.baseScalar;
      else if (le === "tempK") ce = ae.scalar;
      else if (le === "tempC") ce = ae.scalar + 273.15;
      else if (le === "tempF") ce = ((ae.scalar + 459.67) * 5) / 9;
      else if (le === "tempR") ce = (ae.scalar * 5) / 9;
      else throw new U("Unknown type for temp conversion from: " + le);
      return be({ scalar: ce, numerator: ["<temp-K>"], denominator: Z });
    }
    B(be.prototype, {
      to: function (ae) {
        var le, ce;
        if (ae == null) return this;
        if (!A(ae)) return this.to(ae.units());
        if (((le = this._conversionCache[ae]), le)) return le;
        if (((ce = be(ae)), ce.units() === this.units())) return this;
        if (!this.isCompatible(ce)) this.isInverse(ce) ? (ce = this.inverse().to(ae)) : z(this.units(), ce.units());
        else if (ce.isTemperature()) ce = rt(this, ce);
        else if (ce.isDegrees()) ce = Qe(this, ce);
        else {
          var Ae = O(this.baseScalar, ce.baseScalar);
          ce = be({ scalar: Ae, numerator: ce.numerator, denominator: ce.denominator });
        }
        return (this._conversionCache[ae] = ce), ce;
      },
      toBase: function () {
        if (this.isBase()) return this;
        if (this.isTemperature()) return Fe(this);
        var ae = et[this.units()];
        return ae || ((ae = tt(this.numerator, this.denominator)), (et[this.units()] = ae)), ae.mul(this.scalar);
      },
      toFloat: function () {
        if (this.isUnitless()) return this.scalar;
        throw new U("Can't convert to Float unless unitless.  Use Unit#scalar");
      },
      toPrec: function (ae) {
        if (
          (A(ae) && (ae = be(ae)),
          D(ae) && (ae = be(ae + " " + this.units())),
          this.isUnitless() ? ae.isUnitless() || z(this.units(), ae.units()) : (ae = ae.to(this.units())),
          ae.scalar === 0)
        )
          throw new U("Divide by zero");
        var le = P(Math.round(this.scalar / ae.scalar), ae.scalar);
        return be(le + this.units());
      },
    });
    function We(ae, le) {
      var ce = be(ae),
        Ae = be(le);
      if (ce.eq(Ae)) return T;
      var Ve;
      return (
        ce.isTemperature()
          ? (Ve = function (Ze) {
              return ce.mul(Ze).to(Ae).scalar;
            })
          : (Ve = function (Ze) {
              return (Ze * ce.baseScalar) / Ae.baseScalar;
            }),
        function (lt) {
          var at, ct, dt;
          if (Array.isArray(lt)) {
            for (ct = lt.length, dt = [], at = 0; at < ct; at++) dt.push(Ve(lt[at]));
            return dt;
          } else return Ve(lt);
        }
      );
    }
    var et = {};
    function tt(ae, le) {
      for (var ce = [], Ae = [], Ve = 1, Ze, lt = 0; lt < ae.length; lt++)
        (Ze = ae[lt]),
          q[Ze]
            ? (Ve = P(Ve, q[Ze]))
            : ee[Ze] &&
              ((Ve *= ee[Ze].scalar),
              ee[Ze].numerator && ce.push(ee[Ze].numerator),
              ee[Ze].denominator && Ae.push(ee[Ze].denominator));
      for (var at = 0; at < le.length; at++)
        (Ze = le[at]),
          q[Ze]
            ? (Ve /= q[Ze])
            : ee[Ze] &&
              ((Ve /= ee[Ze].scalar),
              ee[Ze].numerator && Ae.push(ee[Ze].numerator),
              ee[Ze].denominator && ce.push(ee[Ze].denominator));
      return (
        (ce = ce.reduce(function (ct, dt) {
          return ct.concat(dt);
        }, [])),
        (Ae = Ae.reduce(function (ct, dt) {
          return ct.concat(dt);
        }, [])),
        be({ scalar: Ve, numerator: ce, denominator: Ae })
      );
    }
    (be.parse = Ge),
      (be.getUnits = ie),
      (be.getAliases = se),
      (be.mulSafe = P),
      (be.divSafe = O),
      (be.getKinds = Xe),
      (be.swiftConverter = We),
      (be.Error = U),
      B(be.prototype, {
        add: function (ae) {
          if (
            (A(ae) && (ae = be(ae)),
            this.isCompatible(ae) || z(this.units(), ae.units()),
            this.isTemperature() && ae.isTemperature())
          )
            throw new U("Cannot add two temperatures");
          return this.isTemperature()
            ? Le(this, ae)
            : ae.isTemperature()
              ? Le(ae, this)
              : be({
                  scalar: this.scalar + ae.to(this).scalar,
                  numerator: this.numerator,
                  denominator: this.denominator,
                });
        },
        sub: function (ae) {
          if (
            (A(ae) && (ae = be(ae)),
            this.isCompatible(ae) || z(this.units(), ae.units()),
            this.isTemperature() && ae.isTemperature())
          )
            return Be(this, ae);
          if (this.isTemperature()) return de(this, ae);
          if (ae.isTemperature()) throw new U("Cannot subtract a temperature from a differential degree unit");
          return be({
            scalar: this.scalar - ae.to(this).scalar,
            numerator: this.numerator,
            denominator: this.denominator,
          });
        },
        mul: function (ae) {
          if (D(ae))
            return be({ scalar: P(this.scalar, ae), numerator: this.numerator, denominator: this.denominator });
          if (
            (A(ae) && (ae = be(ae)),
            (this.isTemperature() || ae.isTemperature()) && !(this.isUnitless() || ae.isUnitless()))
          )
            throw new U("Cannot multiply by temperatures");
          var le = this,
            ce = ae;
          le.isCompatible(ce) && le.signature !== 400 && (ce = ce.to(le));
          var Ae = it(le.numerator, le.denominator, ce.numerator, ce.denominator);
          return be({ scalar: P(le.scalar, ce.scalar, Ae[2]), numerator: Ae[0], denominator: Ae[1] });
        },
        div: function (ae) {
          if (D(ae)) {
            if (ae === 0) throw new U("Divide by zero");
            return be({ scalar: this.scalar / ae, numerator: this.numerator, denominator: this.denominator });
          } else A(ae) && (ae = be(ae));
          if (ae.scalar === 0) throw new U("Divide by zero");
          if (ae.isTemperature()) throw new U("Cannot divide with temperatures");
          if (this.isTemperature() && !ae.isUnitless()) throw new U("Cannot divide with temperatures");
          var le = this,
            ce = ae;
          le.isCompatible(ce) && le.signature !== 400 && (ce = ce.to(le));
          var Ae = it(le.numerator, le.denominator, ce.denominator, ce.numerator);
          return be({ scalar: P(le.scalar, Ae[2]) / ce.scalar, numerator: Ae[0], denominator: Ae[1] });
        },
        inverse: function () {
          if (this.isTemperature()) throw new U("Cannot divide with temperatures");
          if (this.scalar === 0) throw new U("Divide by zero");
          return be({ scalar: 1 / this.scalar, numerator: this.denominator, denominator: this.numerator });
        },
      });
    function it(ae, le, ce, Ae) {
      function Ve(ut) {
        return ut !== G;
      }
      (ae = ae.filter(Ve)), (ce = ce.filter(Ve)), (le = le.filter(Ve)), (Ae = Ae.filter(Ve));
      var Ze = {};
      function lt(ut, _t) {
        for (var pt, xt, yt, wt = 0; wt < ut.length; wt++)
          if (
            (q[ut[wt]]
              ? ((pt = ut[wt + 1]), (xt = ut[wt]), (yt = q[xt]), wt++)
              : ((pt = ut[wt]), (xt = null), (yt = 1)),
            pt && pt !== G)
          )
            if (Ze[pt]) {
              Ze[pt][0] += _t;
              var kt = Ze[pt][2] ? q[Ze[pt][2]] : 1;
              Ze[pt][_t === 1 ? 3 : 4] *= O(yt, kt);
            } else Ze[pt] = [_t, pt, xt, 1, 1];
      }
      lt(ae, 1), lt(le, -1), lt(ce, 1), lt(Ae, -1);
      var at = [],
        ct = [],
        dt = 1;
      for (var vt in Ze)
        if (Ze.hasOwnProperty(vt)) {
          var ft = Ze[vt],
            bt;
          if (ft[0] > 0) for (bt = 0; bt < ft[0]; bt++) at.push(ft[2] === null ? ft[1] : [ft[2], ft[1]]);
          else if (ft[0] < 0) for (bt = 0; bt < -ft[0]; bt++) ct.push(ft[2] === null ? ft[1] : [ft[2], ft[1]]);
          dt *= O(ft[3], ft[4]);
        }
      return (
        at.length === 0 && (at = Z),
        ct.length === 0 && (ct = Z),
        (at = at.reduce(function (ut, _t) {
          return ut.concat(_t);
        }, [])),
        (ct = ct.reduce(function (ut, _t) {
          return ut.concat(_t);
        }, [])),
        [at, ct, dt]
      );
    }
    B(be.prototype, {
      eq: function (ae) {
        return this.compareTo(ae) === 0;
      },
      lt: function (ae) {
        return this.compareTo(ae) === -1;
      },
      lte: function (ae) {
        return this.eq(ae) || this.lt(ae);
      },
      gt: function (ae) {
        return this.compareTo(ae) === 1;
      },
      gte: function (ae) {
        return this.eq(ae) || this.gt(ae);
      },
      compareTo: function (ae) {
        if (A(ae)) return this.compareTo(be(ae));
        if ((this.isCompatible(ae) || z(this.units(), ae.units()), this.baseScalar < ae.baseScalar)) return -1;
        if (this.baseScalar === ae.baseScalar) return 0;
        if (this.baseScalar > ae.baseScalar) return 1;
      },
      same: function (ae) {
        return this.scalar === ae.scalar && this.units() === ae.units();
      },
    }),
      B(be.prototype, {
        isUnitless: function () {
          return [this.numerator, this.denominator].every(function (ae) {
            return R(ae, Z);
          });
        },
        isCompatible: function (ae) {
          return A(ae)
            ? this.isCompatible(be(ae))
            : $e(ae) && ae.signature !== void 0
              ? this.signature === ae.signature
              : !1;
        },
        isInverse: function (ae) {
          return this.inverse().isCompatible(ae);
        },
        isBase: function () {
          return this._isBase !== void 0
            ? this._isBase
            : this.isDegrees() && this.numerator[0].match(/<(kelvin|temp-K)>/)
              ? ((this._isBase = !0), this._isBase)
              : (this.numerator.concat(this.denominator).forEach(function (ae) {
                  ae !== G && X.indexOf(ae) === -1 && (this._isBase = !1);
                }, this),
                this._isBase === !1 ? this._isBase : ((this._isBase = !0), this._isBase));
        },
      });
    function nt() {}
    (nt.prototype.get = function (ae) {
      return (
        arguments.length > 1 && (ae = Array.apply(null, arguments)),
        ae.reduce(function (le, ce, Ae) {
          if (le) {
            var Ve = le[ce];
            return Ae === ae.length - 1 ? (Ve ? Ve.data : void 0) : Ve;
          }
        }, this)
      );
    }),
      (nt.prototype.set = function (ae, le) {
        return (
          arguments.length > 2 &&
            ((ae = Array.prototype.slice.call(arguments, 0, -1)), (le = arguments[arguments.length - 1])),
          ae.reduce(function (ce, Ae, Ve) {
            var Ze = ce[Ae];
            return Ze === void 0 && (Ze = ce[Ae] = {}), Ve === ae.length - 1 ? ((Ze.data = le), le) : Ze;
          }, this)
        );
      });
    function st(ae, le) {
      return (ae + " " + le).trim();
    }
    (be.formatter = st),
      B(be.prototype, {
        units: function () {
          if (this._units !== void 0) return this._units;
          var ae = R(this.numerator, Z),
            le = R(this.denominator, Z);
          if (ae && le) return (this._units = ""), this._units;
          var ce = ot(this.numerator),
            Ae = ot(this.denominator);
          return (this._units = ce + (le ? "" : "/" + Ae)), this._units;
        },
        toString: function (ae, le) {
          var ce;
          if (D(ae)) (ce = this.units()), (le = ae);
          else if (A(ae)) ce = ae;
          else if ($e(ae)) return this.toPrec(ae).toString(le);
          var Ae = this.to(ce),
            Ve = le !== void 0 ? F(Ae.scalar, le) : Ae.scalar;
          return (Ae = (Ve + " " + Ae.units()).trim()), Ae;
        },
        format: function (ae, le) {
          arguments.length === 1 && typeof ae == "function" && ((le = ae), (ae = void 0)), (le = le || be.formatter);
          var ce = this.to(ae);
          return le.call(this, ce.scalar, ce.units());
        },
      });
    var ht = new nt();
    function ot(ae) {
      var le = ht.get(ae);
      if (le) return le;
      var ce = R(ae, Z);
      return ce ? (le = "1") : (le = mt(gt(ae)).join("*")), ht.set(ae, le), le;
    }
    function gt(ae) {
      for (var le = [], ce, Ae, Ve = 0; Ve < ae.length; Ve++)
        (ce = ae[Ve]), (Ae = ae[Ve + 1]), q[ce] ? (le.push(Q[ce] + Q[Ae]), Ve++) : le.push(Q[ce]);
      return le;
    }
    function mt(ae) {
      var le = ae.reduce(function (ce, Ae) {
        var Ve = ce[Ae];
        return Ve || ce.push((Ve = ce[Ae] = [Ae, 0])), Ve[1]++, ce;
      }, []);
      return le.map(function (ce) {
        return ce[0] + (ce[1] > 1 ? ce[1] : "");
      });
    }
    return (be.version = "1.7.6"), be;
  });
})(quantities);
const Qty = quantitiesExports;
function deepValue(E, _ = "") {
  let A = _.split(".");
  for (let I of A) {
    if (E[I] === void 0) return;
    E = E[I];
  }
  return E;
}
var orientationExports = {},
  orientation = {
    get exports() {
      return orientationExports;
    },
    set exports(E) {
      orientationExports = E;
    },
  },
  twoProduct_1 = twoProduct$1,
  SPLITTER = +(Math.pow(2, 27) + 1);
function twoProduct$1(E, _, A) {
  var I = E * _,
    D = SPLITTER * E,
    T = D - E,
    C = D - T,
    R = E - C,
    B = SPLITTER * _,
    P = B - _,
    O = B - P,
    F = _ - O,
    L = I - C * O,
    U = L - R * O,
    z = U - C * F,
    V = R * F - z;
  return A ? ((A[0] = V), (A[1] = I), A) : [V, I];
}
var robustSum = linearExpansionSum;
function scalarScalar$1(E, _) {
  var A = E + _,
    I = A - E,
    D = A - I,
    T = _ - I,
    C = E - D,
    R = C + T;
  return R ? [R, A] : [A];
}
function linearExpansionSum(E, _) {
  var A = E.length | 0,
    I = _.length | 0;
  if (A === 1 && I === 1) return scalarScalar$1(E[0], _[0]);
  var D = A + I,
    T = new Array(D),
    C = 0,
    R = 0,
    B = 0,
    P = Math.abs,
    O = E[R],
    F = P(O),
    L = _[B],
    U = P(L),
    z,
    V;
  F < U
    ? ((V = O), (R += 1), R < A && ((O = E[R]), (F = P(O))))
    : ((V = L), (B += 1), B < I && ((L = _[B]), (U = P(L)))),
    (R < A && F < U) || B >= I
      ? ((z = O), (R += 1), R < A && ((O = E[R]), (F = P(O))))
      : ((z = L), (B += 1), B < I && ((L = _[B]), (U = P(L))));
  for (var X = z + V, G = X - z, Z = V - G, Y = Z, q = X, W, ee, te, Q, J; R < A && B < I; )
    F < U
      ? ((z = O), (R += 1), R < A && ((O = E[R]), (F = P(O))))
      : ((z = L), (B += 1), B < I && ((L = _[B]), (U = P(L)))),
      (V = Y),
      (X = z + V),
      (G = X - z),
      (Z = V - G),
      Z && (T[C++] = Z),
      (W = q + X),
      (ee = W - q),
      (te = W - ee),
      (Q = X - ee),
      (J = q - te),
      (Y = J + Q),
      (q = W);
  for (; R < A; )
    (z = O),
      (V = Y),
      (X = z + V),
      (G = X - z),
      (Z = V - G),
      Z && (T[C++] = Z),
      (W = q + X),
      (ee = W - q),
      (te = W - ee),
      (Q = X - ee),
      (J = q - te),
      (Y = J + Q),
      (q = W),
      (R += 1),
      R < A && (O = E[R]);
  for (; B < I; )
    (z = L),
      (V = Y),
      (X = z + V),
      (G = X - z),
      (Z = V - G),
      Z && (T[C++] = Z),
      (W = q + X),
      (ee = W - q),
      (te = W - ee),
      (Q = X - ee),
      (J = q - te),
      (Y = J + Q),
      (q = W),
      (B += 1),
      B < I && (L = _[B]);
  return Y && (T[C++] = Y), q && (T[C++] = q), C || (T[C++] = 0), (T.length = C), T;
}
var twoSum$1 = fastTwoSum;
function fastTwoSum(E, _, A) {
  var I = E + _,
    D = I - E,
    T = I - D,
    C = _ - D,
    R = E - T;
  return A ? ((A[0] = R + C), (A[1] = I), A) : [R + C, I];
}
var twoProduct = twoProduct_1,
  twoSum = twoSum$1,
  robustScale = scaleLinearExpansion;
function scaleLinearExpansion(E, _) {
  var A = E.length;
  if (A === 1) {
    var I = twoProduct(E[0], _);
    return I[0] ? I : [I[1]];
  }
  var D = new Array(2 * A),
    T = [0.1, 0.1],
    C = [0.1, 0.1],
    R = 0;
  twoProduct(E[0], _, T), T[0] && (D[R++] = T[0]);
  for (var B = 1; B < A; ++B) {
    twoProduct(E[B], _, C);
    var P = T[1];
    twoSum(P, C[0], T), T[0] && (D[R++] = T[0]);
    var O = C[1],
      F = T[1],
      L = O + F,
      U = L - O,
      z = F - U;
    (T[1] = L), z && (D[R++] = z);
  }
  return T[1] && (D[R++] = T[1]), R === 0 && (D[R++] = 0), (D.length = R), D;
}
var robustDiff = robustSubtract;
function scalarScalar(E, _) {
  var A = E + _,
    I = A - E,
    D = A - I,
    T = _ - I,
    C = E - D,
    R = C + T;
  return R ? [R, A] : [A];
}
function robustSubtract(E, _) {
  var A = E.length | 0,
    I = _.length | 0;
  if (A === 1 && I === 1) return scalarScalar(E[0], -_[0]);
  var D = A + I,
    T = new Array(D),
    C = 0,
    R = 0,
    B = 0,
    P = Math.abs,
    O = E[R],
    F = P(O),
    L = -_[B],
    U = P(L),
    z,
    V;
  F < U
    ? ((V = O), (R += 1), R < A && ((O = E[R]), (F = P(O))))
    : ((V = L), (B += 1), B < I && ((L = -_[B]), (U = P(L)))),
    (R < A && F < U) || B >= I
      ? ((z = O), (R += 1), R < A && ((O = E[R]), (F = P(O))))
      : ((z = L), (B += 1), B < I && ((L = -_[B]), (U = P(L))));
  for (var X = z + V, G = X - z, Z = V - G, Y = Z, q = X, W, ee, te, Q, J; R < A && B < I; )
    F < U
      ? ((z = O), (R += 1), R < A && ((O = E[R]), (F = P(O))))
      : ((z = L), (B += 1), B < I && ((L = -_[B]), (U = P(L)))),
      (V = Y),
      (X = z + V),
      (G = X - z),
      (Z = V - G),
      Z && (T[C++] = Z),
      (W = q + X),
      (ee = W - q),
      (te = W - ee),
      (Q = X - ee),
      (J = q - te),
      (Y = J + Q),
      (q = W);
  for (; R < A; )
    (z = O),
      (V = Y),
      (X = z + V),
      (G = X - z),
      (Z = V - G),
      Z && (T[C++] = Z),
      (W = q + X),
      (ee = W - q),
      (te = W - ee),
      (Q = X - ee),
      (J = q - te),
      (Y = J + Q),
      (q = W),
      (R += 1),
      R < A && (O = E[R]);
  for (; B < I; )
    (z = L),
      (V = Y),
      (X = z + V),
      (G = X - z),
      (Z = V - G),
      Z && (T[C++] = Z),
      (W = q + X),
      (ee = W - q),
      (te = W - ee),
      (Q = X - ee),
      (J = q - te),
      (Y = J + Q),
      (q = W),
      (B += 1),
      B < I && (L = -_[B]);
  return Y && (T[C++] = Y), q && (T[C++] = q), C || (T[C++] = 0), (T.length = C), T;
}
(function (E) {
  var _ = twoProduct_1,
    A = robustSum,
    I = robustScale,
    D = robustDiff,
    T = 5,
    C = 11102230246251565e-32,
    R = (3 + 16 * C) * C,
    B = (7 + 56 * C) * C;
  function P(Y, q, W, ee) {
    return function (Q, J, K) {
      var ne = Y(Y(q(J[1], K[0]), q(-K[1], J[0])), Y(q(Q[1], J[0]), q(-J[1], Q[0]))),
        re = Y(q(Q[1], K[0]), q(-K[1], Q[0])),
        ie = ee(ne, re);
      return ie[ie.length - 1];
    };
  }
  function O(Y, q, W, ee) {
    return function (Q, J, K, ne) {
      var re = Y(
          Y(
            W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), J[2]),
            Y(W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), -K[2]), W(Y(q(J[1], K[0]), q(-K[1], J[0])), ne[2])),
          ),
          Y(
            W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), Q[2]),
            Y(W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), ne[2])),
          ),
        ),
        ie = Y(
          Y(
            W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), Q[2]),
            Y(W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), -K[2]), W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), ne[2])),
          ),
          Y(
            W(Y(q(J[1], K[0]), q(-K[1], J[0])), Q[2]),
            Y(W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), K[2])),
          ),
        ),
        se = ee(re, ie);
      return se[se.length - 1];
    };
  }
  function F(Y, q, W, ee) {
    return function (Q, J, K, ne, re) {
      var ie = Y(
          Y(
            Y(
              W(
                Y(
                  W(Y(q(ne[1], re[0]), q(-re[1], ne[0])), K[2]),
                  Y(W(Y(q(K[1], re[0]), q(-re[1], K[0])), -ne[2]), W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), re[2])),
                ),
                J[3],
              ),
              Y(
                W(
                  Y(
                    W(Y(q(ne[1], re[0]), q(-re[1], ne[0])), J[2]),
                    Y(W(Y(q(J[1], re[0]), q(-re[1], J[0])), -ne[2]), W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), re[2])),
                  ),
                  -K[3],
                ),
                W(
                  Y(
                    W(Y(q(K[1], re[0]), q(-re[1], K[0])), J[2]),
                    Y(W(Y(q(J[1], re[0]), q(-re[1], J[0])), -K[2]), W(Y(q(J[1], K[0]), q(-K[1], J[0])), re[2])),
                  ),
                  ne[3],
                ),
              ),
            ),
            Y(
              W(
                Y(
                  W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), J[2]),
                  Y(W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), -K[2]), W(Y(q(J[1], K[0]), q(-K[1], J[0])), ne[2])),
                ),
                -re[3],
              ),
              Y(
                W(
                  Y(
                    W(Y(q(ne[1], re[0]), q(-re[1], ne[0])), J[2]),
                    Y(W(Y(q(J[1], re[0]), q(-re[1], J[0])), -ne[2]), W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), re[2])),
                  ),
                  Q[3],
                ),
                W(
                  Y(
                    W(Y(q(ne[1], re[0]), q(-re[1], ne[0])), Q[2]),
                    Y(W(Y(q(Q[1], re[0]), q(-re[1], Q[0])), -ne[2]), W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), re[2])),
                  ),
                  -J[3],
                ),
              ),
            ),
          ),
          Y(
            Y(
              W(
                Y(
                  W(Y(q(J[1], re[0]), q(-re[1], J[0])), Q[2]),
                  Y(W(Y(q(Q[1], re[0]), q(-re[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), re[2])),
                ),
                ne[3],
              ),
              Y(
                W(
                  Y(
                    W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), Q[2]),
                    Y(W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), ne[2])),
                  ),
                  -re[3],
                ),
                W(
                  Y(
                    W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), J[2]),
                    Y(W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), -K[2]), W(Y(q(J[1], K[0]), q(-K[1], J[0])), ne[2])),
                  ),
                  Q[3],
                ),
              ),
            ),
            Y(
              W(
                Y(
                  W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), Q[2]),
                  Y(W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), -K[2]), W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), ne[2])),
                ),
                -J[3],
              ),
              Y(
                W(
                  Y(
                    W(Y(q(J[1], ne[0]), q(-ne[1], J[0])), Q[2]),
                    Y(W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), ne[2])),
                  ),
                  K[3],
                ),
                W(
                  Y(
                    W(Y(q(J[1], K[0]), q(-K[1], J[0])), Q[2]),
                    Y(W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), K[2])),
                  ),
                  -ne[3],
                ),
              ),
            ),
          ),
        ),
        se = Y(
          Y(
            Y(
              W(
                Y(
                  W(Y(q(ne[1], re[0]), q(-re[1], ne[0])), K[2]),
                  Y(W(Y(q(K[1], re[0]), q(-re[1], K[0])), -ne[2]), W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), re[2])),
                ),
                Q[3],
              ),
              W(
                Y(
                  W(Y(q(ne[1], re[0]), q(-re[1], ne[0])), Q[2]),
                  Y(W(Y(q(Q[1], re[0]), q(-re[1], Q[0])), -ne[2]), W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), re[2])),
                ),
                -K[3],
              ),
            ),
            Y(
              W(
                Y(
                  W(Y(q(K[1], re[0]), q(-re[1], K[0])), Q[2]),
                  Y(W(Y(q(Q[1], re[0]), q(-re[1], Q[0])), -K[2]), W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), re[2])),
                ),
                ne[3],
              ),
              W(
                Y(
                  W(Y(q(K[1], ne[0]), q(-ne[1], K[0])), Q[2]),
                  Y(W(Y(q(Q[1], ne[0]), q(-ne[1], Q[0])), -K[2]), W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), ne[2])),
                ),
                -re[3],
              ),
            ),
          ),
          Y(
            Y(
              W(
                Y(
                  W(Y(q(K[1], re[0]), q(-re[1], K[0])), J[2]),
                  Y(W(Y(q(J[1], re[0]), q(-re[1], J[0])), -K[2]), W(Y(q(J[1], K[0]), q(-K[1], J[0])), re[2])),
                ),
                Q[3],
              ),
              W(
                Y(
                  W(Y(q(K[1], re[0]), q(-re[1], K[0])), Q[2]),
                  Y(W(Y(q(Q[1], re[0]), q(-re[1], Q[0])), -K[2]), W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), re[2])),
                ),
                -J[3],
              ),
            ),
            Y(
              W(
                Y(
                  W(Y(q(J[1], re[0]), q(-re[1], J[0])), Q[2]),
                  Y(W(Y(q(Q[1], re[0]), q(-re[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), re[2])),
                ),
                K[3],
              ),
              W(
                Y(
                  W(Y(q(J[1], K[0]), q(-K[1], J[0])), Q[2]),
                  Y(W(Y(q(Q[1], K[0]), q(-K[1], Q[0])), -J[2]), W(Y(q(Q[1], J[0]), q(-J[1], Q[0])), K[2])),
                ),
                -re[3],
              ),
            ),
          ),
        ),
        oe = ee(ie, se);
      return oe[oe.length - 1];
    };
  }
  function L(Y) {
    var q = Y === 3 ? P : Y === 4 ? O : F;
    return q(A, _, I, D);
  }
  var U = L(3),
    z = L(4),
    V = [
      function () {
        return 0;
      },
      function () {
        return 0;
      },
      function (q, W) {
        return W[0] - q[0];
      },
      function (q, W, ee) {
        var te = (q[1] - ee[1]) * (W[0] - ee[0]),
          Q = (q[0] - ee[0]) * (W[1] - ee[1]),
          J = te - Q,
          K;
        if (te > 0) {
          if (Q <= 0) return J;
          K = te + Q;
        } else if (te < 0) {
          if (Q >= 0) return J;
          K = -(te + Q);
        } else return J;
        var ne = R * K;
        return J >= ne || J <= -ne ? J : U(q, W, ee);
      },
      function (q, W, ee, te) {
        var Q = q[0] - te[0],
          J = W[0] - te[0],
          K = ee[0] - te[0],
          ne = q[1] - te[1],
          re = W[1] - te[1],
          ie = ee[1] - te[1],
          se = q[2] - te[2],
          oe = W[2] - te[2],
          _e = ee[2] - te[2],
          ve = J * ie,
          fe = K * re,
          ke = K * ne,
          me = Q * ie,
          Ee = Q * re,
          Se = J * ne,
          ue = se * (ve - fe) + oe * (ke - me) + _e * (Ee - Se),
          xe =
            (Math.abs(ve) + Math.abs(fe)) * Math.abs(se) +
            (Math.abs(ke) + Math.abs(me)) * Math.abs(oe) +
            (Math.abs(Ee) + Math.abs(Se)) * Math.abs(_e),
          pe = B * xe;
        return ue > pe || -ue > pe ? ue : z(q, W, ee, te);
      },
    ];
  function X(Y) {
    var q = V[Y.length];
    return q || (q = V[Y.length] = L(Y.length)), q.apply(void 0, Y);
  }
  function G(Y, q, W, ee, te, Q, J) {
    return function (ne, re, ie, se, oe) {
      switch (arguments.length) {
        case 0:
        case 1:
          return 0;
        case 2:
          return ee(ne, re);
        case 3:
          return te(ne, re, ie);
        case 4:
          return Q(ne, re, ie, se);
        case 5:
          return J(ne, re, ie, se, oe);
      }
      for (var _e = new Array(arguments.length), ve = 0; ve < arguments.length; ++ve) _e[ve] = arguments[ve];
      return Y(_e);
    };
  }
  function Z() {
    for (; V.length <= T; ) V.push(L(V.length));
    E.exports = G.apply(void 0, [X].concat(V));
    for (var Y = 0; Y <= T; ++Y) E.exports[Y] = V[Y];
  }
  Z();
})(orientation);
var robustPnp = robustPointInPolygon,
  orient = orientationExports;
function robustPointInPolygon(E, _) {
  for (var A = _[0], I = _[1], D = E.length, T = 1, C = D, R = 0, B = D - 1; R < C; B = R++) {
    var P = E[R],
      O = E[B],
      F = P[1],
      L = O[1];
    if (L < F) {
      if (L < I && I < F) {
        var U = orient(P, O, _);
        if (U === 0) return 0;
        T ^= (0 < U) | 0;
      } else if (I === F) {
        var z = E[(R + 1) % D],
          V = z[1];
        if (F < V) {
          var U = orient(P, O, _);
          if (U === 0) return 0;
          T ^= (0 < U) | 0;
        }
      }
    } else if (F < L) {
      if (F < I && I < L) {
        var U = orient(P, O, _);
        if (U === 0) return 0;
        T ^= (U < 0) | 0;
      } else if (I === F) {
        var z = E[(R + 1) % D],
          V = z[1];
        if (V < F) {
          var U = orient(P, O, _);
          if (U === 0) return 0;
          T ^= (U < 0) | 0;
        }
      }
    } else if (I === F) {
      var X = Math.min(P[0], O[0]),
        G = Math.max(P[0], O[0]);
      if (R === 0) {
        for (; B > 0; ) {
          var Z = (B + D - 1) % D,
            Y = E[Z];
          if (Y[1] !== I) break;
          var q = Y[0];
          (X = Math.min(X, q)), (G = Math.max(G, q)), (B = Z);
        }
        if (B === 0) return X <= A && A <= G ? 0 : 1;
        C = B + 1;
      }
      for (var W = E[(B + D - 1) % D][1]; R + 1 < C; ) {
        var Y = E[R + 1];
        if (Y[1] !== I) break;
        var q = Y[0];
        (X = Math.min(X, q)), (G = Math.max(G, q)), (R += 1);
      }
      if (X <= A && A <= G) return 0;
      var ee = E[(R + 1) % D][1];
      A < X && W < I != ee < I && (T ^= 1);
    }
  }
  return 2 * T - 1;
}
const robustPointInPolygon$1 = robustPnp;
function feretDiameters(E = {}) {
  const { originalPoints: _ = monotoneChainConvexHull.call(this) } = E;
  if (_.length === 0) return { min: 0, max: 0, minLine: [], maxLine: [], aspectRatio: 1 };
  if (_.length === 1) return { min: 1, max: 1, minLine: [_[0], _[0]], maxLine: [_[0], _[0]], aspectRatio: 1 };
  const A = new Array(_.length);
  let I = 1 / 0,
    D = 0,
    T = [];
  for (let P = 0; P < _.length; P++) {
    let O = getAngle(_[P], _[(P + 1) % _.length]);
    rotate(-O, _, A);
    let F = 0,
      L = [];
    for (let U = 0; U < _.length; U++) {
      let z = Math.abs(A[P][1] - A[U][1]);
      z > F && ((F = z), (L = []), L.push([A[U][0], A[P][1]], [A[U][0], A[U][1]]));
    }
    F < I && ((I = F), (D = O), (T = L));
  }
  rotate(D, T, T);
  let C = 0,
    R = [],
    B = 0;
  for (let P = 0; P < _.length - 1; P++)
    for (let O = P + 1; O < _.length; O++) {
      let F = (_[P][0] - _[O][0]) ** 2 + (_[P][1] - _[O][1]) ** 2;
      F > B && ((B = F), (C = Math.sqrt(F)), (R = [_[P], _[O]]));
    }
  return { min: I, minLine: T, max: C, maxLine: R, aspectRatio: I / C };
}
function getAngle(E, _) {
  let A = difference(_, E),
    I = normalize(A),
    D = Math.acos(I[0]);
  return I[1] < 0 ? -D : D;
}
class Roi {
  constructor(_, A) {
    (this.map = _),
      (this.id = A),
      (this.minX = Number.POSITIVE_INFINITY),
      (this.maxX = Number.NEGATIVE_INFINITY),
      (this.minY = Number.POSITIVE_INFINITY),
      (this.maxY = Number.NEGATIVE_INFINITY),
      (this.meanX = 0),
      (this.meanY = 0),
      (this.surface = 0),
      (this.computed = {});
  }
  getMask(_ = {}) {
    const { scale: A = 1, kind: I = "" } = _;
    let D;
    switch (I) {
      case "contour":
        D = this.contourMask;
        break;
      case "box":
        D = this.boxMask;
        break;
      case "filled":
        D = this.filledMask;
        break;
      case "center":
        D = this.centerMask;
        break;
      case "mbr":
        D = this.mbrFilledMask;
        break;
      case "hull":
        D = this.convexHullFilledMask;
        break;
      case "hullContour":
        D = this.convexHullMask;
        break;
      case "mbrContour":
        D = this.mbrMask;
        break;
      case "feret":
        D = this.feretMask;
        break;
      default:
        D = this.mask;
    }
    return (
      A < 1 &&
        ((D = D.resize({ factor: A })),
        (D.parent = this.mask.parent),
        (D.position[0] += this.minX),
        (D.position[1] += this.minY)),
      D
    );
  }
  get mean() {
    throw new Error("Roi mean not implemented yet");
  }
  get center() {
    return (
      this.computed.center || (this.computed.center = [(this.width / 2) >> 0, (this.height / 2) >> 0]),
      this.computed.center
    );
  }
  get ratio() {
    return this.width / this.height;
  }
  get width() {
    return this.maxX - this.minX + 1;
  }
  get height() {
    return this.maxY - this.minY + 1;
  }
  _computExternalIDs() {
    let _ = this.borderIDs,
      A = this.borderLengths;
    (this.computed.externalIDs = []), (this.computed.externalLengths = []);
    let I = this.internalIDs;
    for (let D = 0; D < _.length; D++)
      I.includes(_[D]) || (this.computed.externalIDs.push(_[D]), this.computed.externalLengths.push(A[D]));
  }
  get externalIDs() {
    return this.computed.externalIDs
      ? this.computed.externalIDs
      : (this._computExternalIDs(), this.computed.externalIDs);
  }
  get externalLengths() {
    return this.computed.externalLengths
      ? this.computed.externalLengths
      : (this._computExternalIDs(), this.computed.externalLengths);
  }
  _computeBorderIDs() {
    let _ = getBorders(this);
    (this.computed.borderIDs = _.ids), (this.computed.borderLengths = _.lengths);
  }
  get borderIDs() {
    return this.computed.borderIDs ? this.computed.borderIDs : (this._computeBorderIDs(), this.computed.borderIDs);
  }
  get borderLengths() {
    return this.computed.borderLengths
      ? this.computed.borderLengths
      : (this._computeBorderIDs(), this.computed.borderLengths);
  }
  get boxIDs() {
    return this.computed.boxIDs || (this.computed.boxIDs = getBoxIDs(this)), this.computed.boxIDs;
  }
  get internalIDs() {
    return this.computed.internalIDs || (this.computed.internalIDs = getInternalIDs(this)), this.computed.internalIDs;
  }
  get box() {
    return this.computed.box || (this.computed.box = getBox(this)), this.computed.box;
  }
  get external() {
    return this.computed.external || (this.computed.external = getExternal(this)), this.computed.external;
  }
  get holesInfo() {
    return this.computed.holesInfo || (this.computed.holesInfo = getHolesInfo(this)), this.computed.holesInfo;
  }
  get border() {
    return this.computed.border || (this.computed.border = getBorder(this)), this.computed.border;
  }
  get contourMask() {
    if (!this.computed.contourMask) {
      let _ = new Image(this.width, this.height, {
        kind: BINARY,
        position: [this.minX, this.minY],
        parent: this.map.parent,
      });
      for (let A = 0; A < this.width; A++)
        for (let I = 0; I < this.height; I++)
          this.map.data[A + this.minX + (I + this.minY) * this.map.width] === this.id &&
            (A > 0 && A < this.width - 1 && I > 0 && I < this.height - 1
              ? (this.map.data[A - 1 + this.minX + (I + this.minY) * this.map.width] !== this.id ||
                  this.map.data[A + 1 + this.minX + (I + this.minY) * this.map.width] !== this.id ||
                  this.map.data[A + this.minX + (I - 1 + this.minY) * this.map.width] !== this.id ||
                  this.map.data[A + this.minX + (I + 1 + this.minY) * this.map.width] !== this.id) &&
                _.setBitXY(A, I)
              : _.setBitXY(A, I));
      this.computed.contourMask = _;
    }
    return this.computed.contourMask;
  }
  get boxMask() {
    if (!this.computed.boxMask) {
      let _ = new Image(this.width, this.height, {
        kind: BINARY,
        position: [this.minX, this.minY],
        parent: this.map.parent,
      });
      for (let A = 0; A < this.width; A++) _.setBitXY(A, 0), _.setBitXY(A, this.height - 1);
      for (let A = 0; A < this.height; A++) _.setBitXY(0, A), _.setBitXY(this.width - 1, A);
      this.computed.boxMask = _;
    }
    return this.computed.boxMask;
  }
  get mask() {
    if (!this.computed.mask) {
      let _ = new Image(this.width, this.height, {
        kind: BINARY,
        position: [this.minX, this.minY],
        parent: this.map.parent,
      });
      for (let A = 0; A < this.width; A++)
        for (let I = 0; I < this.height; I++)
          this.map.data[A + this.minX + (I + this.minY) * this.map.width] === this.id && _.setBitXY(A, I);
      this.computed.mask = _;
    }
    return this.computed.mask;
  }
  get filledMask() {
    if (!this.computed.filledMask) {
      let _ = new Image(this.width, this.height, {
        kind: BINARY,
        position: [this.minX, this.minY],
        parent: this.map.parent,
      });
      for (let A = 0; A < this.width; A++)
        for (let I = 0; I < this.height; I++) {
          let D = A + this.minX + (I + this.minY) * this.map.width;
          this.internalIDs.includes(this.map.data[D]) && _.setBitXY(A, I);
        }
      this.computed.filledMask = _;
    }
    return this.computed.filledMask;
  }
  get centerMask() {
    if (!this.computed.centerMask) {
      let _ = new Shape({ kind: "smallCross" }).getMask();
      (_.parent = this.map.parent),
        (_.position = [this.minX + this.center[0] - 1, this.minY + this.center[1] - 1]),
        (this.computed.centerMask = _);
    }
    return this.computed.centerMask;
  }
  get convexHull() {
    if (!this.computed.convexHull) {
      const _ = [];
      for (let I = 0; I < this.width; I++)
        for (let D = 0; D < this.height; D++)
          this.map.data[I + this.minX + (D + this.minY) * this.map.width] === this.id &&
            (I > 0 && I < this.width - 1 && D > 0 && D < this.height - 1
              ? (this.map.data[I - 1 + this.minX + (D + this.minY) * this.map.width] !== this.id ||
                  this.map.data[I + 1 + this.minX + (D + this.minY) * this.map.width] !== this.id ||
                  this.map.data[I + this.minX + (D - 1 + this.minY) * this.map.width] !== this.id ||
                  this.map.data[I + this.minX + (D + 1 + this.minY) * this.map.width] !== this.id) &&
                (_.push([I, D]), _.push([I + 1, D]), _.push([I, D + 1]), _.push([I + 1, D + 1]))
              : (_.push([I, D]), _.push([I + 1, D]), _.push([I, D + 1]), _.push([I + 1, D + 1])));
      const A = monotoneChainConvexHull$1(_);
      this.computed.convexHull = { polyline: A, surface: surface(A), perimeter: perimeter(A) };
    }
    return this.computed.convexHull;
  }
  get convexHullMask() {
    if (!this.computed.convexHullMask) {
      const _ = this.convexHull,
        A = new Image(this.width + 1, this.height + 1, {
          kind: BINARY,
          position: [this.minX, this.minY],
          parent: this.map.parent,
        });
      A.paintPolyline(_.polyline, { closed: !0 }), (this.computed.convexHullMask = A);
    }
    return this.computed.convexHullMask;
  }
  get convexHullFilledMask() {
    if (!this.computed.convexHullFilledMask) {
      const _ = this.convexHull,
        A = new Image(this.width, this.height, {
          kind: BINARY,
          position: [this.minX, this.minY],
          parent: this.map.parent,
        });
      for (let I = 0; I < this.width; I++)
        for (let D = 0; D < this.height; D++) robustPointInPolygon$1(_.polyline, [I, D]) !== 1 && A.setBitXY(I, D);
      this.computed.convexHullFilledMask = A;
    }
    return this.computed.convexHullFilledMask;
  }
  get mbr() {
    if (!this.computed.mbr) {
      let _ = minimalBoundingRectangle({ originalPoints: this.convexHull.polyline });
      if (_.length === 0) this.computed.mbr = { width: 0, height: 0, surface: 0, perimeter: 0, rectangle: _ };
      else {
        let A = _[0],
          I = _[1],
          D = _[2],
          T = Math.sqrt((A[0] - I[0]) ** 2 + (A[1] - I[1]) ** 2),
          C = Math.sqrt((D[0] - I[0]) ** 2 + (D[1] - I[1]) ** 2);
        this.computed.mbr = {
          width: T,
          height: C,
          elongation: 1 - T / C,
          aspectRatio: T / C,
          surface: T * C,
          perimeter: (T + C) * 2,
          rectangle: _,
        };
      }
    }
    return this.computed.mbr;
  }
  get fillRatio() {
    return this.surface / (this.surface + this.holesInfo.surface);
  }
  get feretDiameters() {
    return (
      this.computed.feretDiameters ||
        (this.computed.feretDiameters = feretDiameters({ originalPoints: this.convexHull.polyline })),
      this.computed.feretDiameters
    );
  }
  get eqpc() {
    return this.computed.eqpc || (this.computed.eqpc = 2 * Math.sqrt(this.surface / Math.PI)), this.computed.eqpc;
  }
  get perimeterInfo() {
    return (
      this.computed.perimeterInfo || (this.computed.perimeterInfo = getPerimeterInfo(this)), this.computed.perimeterInfo
    );
  }
  get perimeter() {
    let _ = this.perimeterInfo,
      A = 2 - Math.sqrt(2);
    return _.one + _.two * 2 + _.three * 3 + _.four * 4 - A * (_.two + _.three * 2 + _.four);
  }
  get ped() {
    return this.computed.ped || (this.computed.ped = this.perimeter / Math.PI), this.computed.ped;
  }
  get feretMask() {
    if (!this.computed.feretMask) {
      const _ = new Image(this.width + 1, this.height + 1, {
        kind: BINARY,
        position: [this.minX, this.minY],
        parent: this.map.parent,
      });
      _.paintPolyline(this.feretDiameters.minLine),
        _.paintPolyline(this.feretDiameters.maxLine),
        (this.computed.feretMask = _);
    }
    return this.computed.feretMask;
  }
  get mbrMask() {
    if (!this.computed.mbrMask) {
      let _ = round(this.mbr.rectangle);
      if (_.length > 0) {
        const A = minMax$1(_),
          I = new Image(A[1][0] - A[0][0] + 1, A[1][1] - A[0][1] + 1, {
            kind: BINARY,
            position: [this.minX + A[0][0], this.minY + A[0][1]],
            parent: this.map.parent,
          });
        (_ = moveToZeroZero(_)), I.paintPolyline(_, { closed: !0 }), (this.computed.mbrMask = I);
      } else
        this.computed.mbrMask = new Image(1, 1, {
          kind: BINARY,
          position: [this.minX, this.minY],
          parent: this.map.parent,
        });
    }
    return this.computed.mbrMask;
  }
  get mbrFilledMask() {
    if (!this.computed.mbrFilledMask) {
      const _ = new Image(this.width, this.height, {
          kind: BINARY,
          position: [this.minX, this.minY],
          parent: this.map.parent,
        }),
        A = this.mask.minimalBoundingRectangle();
      for (let I = 0; I < this.width; I++)
        for (let D = 0; D < this.height; D++) robustPointInPolygon$1(A, [I, D]) !== 1 && _.setBitXY(I, D);
      this.computed.mbrFilledMask = _;
    }
    return this.computed.mbrFilledMask;
  }
  get points() {
    if (!this.computed.points) {
      let _ = [];
      for (let A = 0; A < this.height; A++)
        for (let I = 0; I < this.width; I++) {
          let D = (A + this.minY) * this.map.width + I + this.minX;
          this.map.data[D] === this.id && _.push([I, A]);
        }
      this.computed.points = _;
    }
    return this.computed.points;
  }
  get maxLengthPoints() {
    if (!this.computed.maxLengthPoints) {
      let _ = 0,
        A;
      const I = this.points;
      for (let D = 0; D < I.length; D++)
        for (let T = D + 1; T < I.length; T++) {
          let C = Math.pow(I[D][0] - I[T][0], 2) + Math.pow(I[D][1] - I[T][1], 2);
          C >= _ && ((_ = C), (A = [I[D], I[T]]));
        }
      this.computed.maxLengthPoints = A;
    }
    return this.computed.maxLengthPoints;
  }
  get maxLength() {
    if (!this.computed.maxLength) {
      let _ = Math.sqrt(
        Math.pow(this.maxLengthPoints[0][0] - this.maxLengthPoints[1][0], 2) +
          Math.pow(this.maxLengthPoints[0][1] - this.maxLengthPoints[1][1], 2),
      );
      this.computed.maxLength = _;
    }
    return this.computed.maxLength;
  }
  get roundness() {
    return (4 * this.surface) / (Math.PI * this.feretDiameters.max ** 2);
  }
  get sphericity() {
    return (2 * Math.sqrt(this.surface * Math.PI)) / this.perimeter;
  }
  get solidity() {
    return this.surface / this.convexHull.surface;
  }
  get angle() {
    if (!this.computed.angle) {
      let _ = this.maxLengthPoints,
        A = (-Math.atan2(_[0][1] - _[1][1], _[0][0] - _[1][0]) * 180) / Math.PI;
      this.computed.angle = A;
    }
    return this.computed.angle;
  }
  toJSON() {
    return {
      id: this.id,
      minX: this.minX,
      maxX: this.maxX,
      minY: this.minY,
      maxY: this.maxY,
      meanX: this.meanX,
      meanY: this.meanY,
      height: this.height,
      width: this.width,
      surface: this.surface,
      mbrWidth: this.mbr.width,
      mbrHeight: this.mbr.height,
      mbrSurface: this.mbr.surface,
      eqpc: this.eqpc,
      ped: this.ped,
      feretDiameterMin: this.feretDiameters.min,
      feretDiameterMax: this.feretDiameters.max,
      aspectRatio: this.feretDiameters.aspectRatio,
      fillRatio: this.fillRatio,
      sphericity: this.sphericity,
      roundness: this.roundness,
      solidity: this.solidity,
      perimeter: this.perimeter,
    };
  }
}
function getBorders(E) {
  let _ = E.map,
    A = _.data,
    I = new Set(),
    D = new Map(),
    T = new Set(),
    C = [1, 0, -1, 0],
    R = [0, 1, 0, -1];
  for (let O = E.minX; O <= E.maxX; O++)
    for (let F = E.minY; F <= E.maxY; F++) {
      let L = O + F * _.width;
      if (A[L] === E.id)
        for (let U = 0; U < 4; U++) {
          let z = O + C[U],
            V = F + R[U];
          if (z >= 0 && V >= 0 && z < _.width && V < _.height) {
            let X = z + V * _.width;
            if (A[X] !== E.id && !T.has(X)) {
              T.add(X), I.add(A[X]);
              let G = D.get(A[X]);
              G ? D.set(A[X], ++G) : D.set(A[X], 1);
            }
          }
        }
    }
  let B = Array.from(I),
    P = B.map(function (O) {
      return D.get(O);
    });
  return { ids: B, lengths: P };
}
function getBoxIDs(E) {
  let _ = new Set(),
    A = E.map,
    I = A.data;
  for (let D of [0, E.height - 1])
    for (let T = 0; T < E.width; T++) {
      let C = (D + E.minY) * A.width + T + E.minX;
      if (T - E.minX > 0 && I[C] === E.id && I[C - 1] !== E.id) {
        let R = I[C - 1];
        _.add(R);
      }
      if (A.width - T - E.minX > 1 && I[C] === E.id && I[C + 1] !== E.id) {
        let R = I[C + 1];
        _.add(R);
      }
    }
  for (let D of [0, E.width - 1])
    for (let T = 0; T < E.height; T++) {
      let C = (T + E.minY) * A.width + D + E.minX;
      if (T - E.minY > 0 && I[C] === E.id && I[C - A.width] !== E.id) {
        let R = I[C - A.width];
        _.add(R);
      }
      if (A.height - T - E.minY > 1 && I[C] === E.id && I[C + A.width] !== E.id) {
        let R = I[C + A.width];
        _.add(R);
      }
    }
  return Array.from(_);
}
function getBox(E) {
  let _ = 0,
    A = E.map,
    I = A.data,
    D = [0];
  E.height > 1 && (D[1] = E.height - 1);
  for (let C of D)
    for (let R = 1; R < E.width - 1; R++) {
      let B = (C + E.minY) * A.width + R + E.minX;
      I[B] === E.id && _++;
    }
  let T = [0];
  E.width > 1 && (T[1] = E.width - 1);
  for (let C of T)
    for (let R = 0; R < E.height; R++) {
      let B = (R + E.minY) * A.width + C + E.minX;
      I[B] === E.id && _++;
    }
  return _;
}
function getBorder(E) {
  let _ = 0,
    A = E.map,
    I = A.data;
  for (let D = 1; D < E.width - 1; D++)
    for (let T = 1; T < E.height - 1; T++) {
      let C = (T + E.minY) * A.width + D + E.minX;
      I[C] === E.id &&
        (I[C - 1] !== E.id || I[C + 1] !== E.id || I[C - A.width] !== E.id || I[C + A.width] !== E.id) &&
        _++;
    }
  return _ + E.box;
}
function getPerimeterInfo(E) {
  let _ = E.map,
    A = _.data,
    I = 0,
    D = 0,
    T = 0,
    C = 0;
  for (let R = 0; R < E.width; R++)
    for (let B = 0; B < E.height; B++) {
      let P = (B + E.minY) * _.width + R + E.minX;
      if (A[P] === E.id) {
        let O = 0;
        switch (
          ((R === 0 || E.externalIDs.includes(A[P - 1])) && O++,
          (R === E.width - 1 || E.externalIDs.includes(A[P + 1])) && O++,
          (B === 0 || E.externalIDs.includes(A[P - _.width])) && O++,
          (B === E.height - 1 || E.externalIDs.includes(A[P + _.width])) && O++,
          O)
        ) {
          case 1:
            I++;
            break;
          case 2:
            D++;
            break;
          case 3:
            T++;
            break;
          case 4:
            C++;
            break;
        }
      }
    }
  return { one: I, two: D, three: T, four: C };
}
function getExternal(E) {
  let _ = 0,
    A = E.map,
    I = A.data;
  for (let D = 1; D < E.width - 1; D++)
    for (let T = 1; T < E.height - 1; T++) {
      let C = (T + E.minY) * A.width + D + E.minX;
      I[C] === E.id &&
        (E.externalIDs.includes(I[C - 1]) ||
          E.externalIDs.includes(I[C + 1]) ||
          E.externalIDs.includes(I[C - A.width]) ||
          E.externalIDs.includes(I[C + A.width])) &&
        _++;
    }
  return _ + E.box;
}
function getHolesInfo(E) {
  let _ = 0,
    A = E.map.width,
    I = E.map.data;
  for (let D = 1; D < E.width - 1; D++)
    for (let T = 1; T < E.height - 1; T++) {
      let C = (T + E.minY) * A + D + E.minX;
      E.internalIDs.includes(I[C]) && I[C] !== E.id && _++;
    }
  return { number: E.internalIDs.length - 1, surface: _ };
}
function getInternalIDs(E) {
  let _ = [E.id],
    A = E.map,
    I = A.data;
  if (E.height > 2)
    for (let T = 0; T < E.width; T++) {
      let C = E.minY * A.width + T + E.minX;
      if (_.includes(I[C])) {
        let R = I[C + A.width];
        !_.includes(R) && !E.boxIDs.includes(R) && _.push(R);
      }
    }
  let D = new Array(4);
  for (let T = 1; T < E.width - 1; T++)
    for (let C = 1; C < E.height - 1; C++) {
      let R = (C + E.minY) * A.width + T + E.minX;
      if (_.includes(I[R])) {
        (D[0] = I[R - 1]), (D[1] = I[R + 1]), (D[2] = I[R - A.width]), (D[3] = I[R + A.width]);
        for (let B = 0; B < 4; B++) {
          let P = D[B];
          !_.includes(P) && !E.boxIDs.includes(P) && _.push(P);
        }
      }
    }
  return _;
}
class RoiLayer {
  constructor(_, A) {
    (this.roiMap = _), (this.options = A), (this.roi = this.createRoi());
  }
  createRoi() {
    let _ = this.roiMap.data,
      A = {};
    (this.roiMap.positive = 0), (this.roiMap.negative = 0);
    for (let R = 0; R < _.length; R++)
      _[R] && !A[_[R]] && ((A[_[R]] = !0), _[R] > 0 ? this.roiMap.positive++ : this.roiMap.negative++);
    let I = {};
    for (let R in A) I[R] = new Roi(this.roiMap, R * 1);
    let D = this.roiMap.width,
      T = this.roiMap.height;
    for (let R = 0; R < T; R++)
      for (let B = 0; B < D; B++) {
        let P = R * D + B;
        if (_[P] !== 0) {
          const O = _[P],
            F = I[O];
          B < F.minX && (F.minX = B),
            B > F.maxX && (F.maxX = B),
            R < F.minY && (F.minY = R),
            R > F.maxY && (F.maxY = R),
            (F.meanX += B),
            (F.meanY += R),
            F.surface++;
        }
      }
    let C = [];
    for (let R in A) (I[R].meanX /= I[R].surface), (I[R].meanY /= I[R].surface), C.push(I[R]);
    return C;
  }
}
function commonBorderLength(E) {
  let _ = E.data,
    A = [1, 0, -1, 0],
    I = [0, 1, 0, -1],
    D = E.minMax,
    T = -D.min,
    C = D.max + T,
    R = [];
  for (let P = 0; P <= C; P++) R.push(Object.create(null));
  for (let P = 0; P < E.width; P++)
    for (let O = 0; O < E.height; O++) {
      let F = P + O * E.width,
        L = _[F];
      if (L !== 0) {
        let U = Object.create(null),
          z = !1;
        for (let V = 0; V < 4; V++) {
          let X = P + A[V],
            G = O + I[V];
          if (X >= 0 && G >= 0 && X < E.width && G < E.height) {
            let Z = _[X + G * E.width];
            L !== Z &&
              ((z = !0), Z !== 0 && U[Z] === void 0 && ((U[Z] = !0), R[Z + T][L] ? R[Z + T][L]++ : (R[Z + T][L] = 1)));
          } else z = !0;
        }
        z && (R[L + T][L] ? R[L + T][L]++ : (R[L + T][L] = 1));
      }
    }
  let B = {};
  for (let P = 0; P < R.length; P++) Object.keys(R[P]).length > 0 && (B[P - T] = R[P]);
  return B;
}
function mergeRoi(E = {}) {
  const {
    algorithm: _ = "commonBorderLength",
    minCommonBorderLength: A = 5,
    maxCommonBorderLength: I = 100,
    minCommonBorderRatio: D = 0.3,
    maxCommonBorderRatio: T = 1,
  } = E;
  let C = function (X, G, Z) {
    return X[Z] >= A && X[Z] <= I;
  };
  typeof _ == "function" && (C = _),
    _.toLowerCase() === "commonborderratio" &&
      (C = function (X, G, Z) {
        let Y = Math.min(X[Z] / X[G], 1);
        return Y >= D && Y <= T;
      });
  const R = this,
    B = R.commonBorderLength;
  let P = {},
    O = {};
  for (let X of Object.keys(B)) {
    let G = B[X],
      Z = Object.keys(G);
    for (let Y of Z)
      if (Y !== X && C(G, X, Y)) {
        let q = Y;
        O[Y] && (q = O[Y]);
        let W = X;
        if ((O[X] && (W = O[X]), Number(q) !== W)) {
          let ee = Math.min(q, W),
            te = Math.max(q, W);
          if ((P[ee] || (P[ee] = {}), (P[ee][te] = !0), (O[te] = ee), P[te])) {
            for (let Q of Object.keys(P[te])) (P[ee][Q] = !0), (O[Q] = ee);
            delete P[te];
          }
        }
      }
  }
  let F = R.minMax,
    L = -F.min,
    U = F.max + L,
    z = new Array(U + 1).fill(0);
  for (let X of Object.keys(O)) z[Number(X) + L] = O[X];
  let V = R.data;
  for (let X = 0; X < V.length; X++) {
    let G = V[X];
    if (G !== 0) {
      let Z = z[G + L];
      Z !== 0 && (V[X] = Z);
    }
  }
  return (R.computed = {}), R;
}
class RoiMap {
  constructor(_, A) {
    (this.parent = _),
      (this.width = _.width),
      (this.height = _.height),
      (this.data = A),
      (this.negative = 0),
      (this.positive = 0);
  }
  get total() {
    return this.negative + this.positive;
  }
  get minMax() {
    let _ = Number.MAX_SAFE_INTEGER,
      A = Number.MIN_SAFE_INTEGER;
    for (let I = 0; I < this.data.length; I++)
      this.data[I] < _ && (_ = this.data[I]), this.data[I] > A && (A = this.data[I]);
    return { min: _, max: A };
  }
  get commonBorderLength() {
    return commonBorderLength(this);
  }
  mergeRoi(_ = {}) {
    return mergeRoi.call(this, _);
  }
  mergeRois(_) {
    const A = _[0],
      I = _.slice(1);
    for (let D = 0; D < this.data.length; D++) I.includes(this.data[D]) && (this.data[D] = A);
  }
  rowsInfo() {
    let _ = new Array(this.height),
      A = 0;
    for (let I = 0; I < this.data.length; I += this.width) {
      let D = {
        row: A,
        positivePixel: 0,
        negativePixel: 0,
        zeroPixel: 0,
        positiveRoi: 0,
        negativeRoi: 0,
        medianChange: 0,
      };
      _[A++] = D;
      let T = {},
        C = {},
        R = [],
        B = this.data[I],
        P = 0;
      for (let O = I; O < I + this.width; O++) {
        let F = this.data[O];
        B !== F && ((B = F), R.push(P), (P = 0)),
          P++,
          F > 0
            ? (D.positivePixel++, T[F] || (T[F] = !0))
            : F < 0
              ? (D.negativePixel++, C[F] || (C[F] = !0))
              : D.zeroPixel++;
      }
      R.push(P),
        (D.medianChange = R.sort((O, F) => O - F)[Math.floor(R.length / 2)]),
        (D.positiveRoiIDs = Object.keys(T)),
        (D.negativeRoiIDs = Object.keys(C)),
        (D.positiveRoi = D.positiveRoiIDs.length),
        (D.negativeRoi = D.negativeRoiIDs.length);
    }
    return _;
  }
  colsInfo() {
    let _ = new Array(this.width),
      A = 0;
    for (let I = 0; I < this.width; I++) {
      let D = {
        col: A,
        positivePixel: 0,
        negativePixel: 0,
        zeroPixel: 0,
        positiveRoi: 0,
        negativeRoi: 0,
        medianChange: 0,
      };
      _[A++] = D;
      let T = {},
        C = {},
        R = [],
        B = this.data[I],
        P = 0;
      for (let O = I; O < I + this.data.length; O += this.width) {
        let F = this.data[O];
        B !== F && ((B = F), R.push(P), (P = 0)),
          P++,
          F > 0
            ? (D.positivePixel++, T[F] || (T[F] = !0))
            : F < 0
              ? (D.negativePixel++, C[F] || (C[F] = !0))
              : D.zeroPixel++;
      }
      R.push(P),
        (D.medianChange = R.sort((O, F) => O - F)[Math.floor(R.length / 2)]),
        (D.positiveRoiIDs = Object.keys(T)),
        (D.negativeRoiIDs = Object.keys(C)),
        (D.positiveRoi = D.positiveRoiIDs.length),
        (D.negativeRoi = D.negativeRoiIDs.length);
    }
    return _;
  }
}
function fromMask(E, _ = {}) {
  const { allowCorners: A = !1 } = _,
    I = 65535;
  let D = new Int16Array(E.size),
    T = 0,
    C = 0,
    R = new Uint16Array(I + 1),
    B = new Uint16Array(I + 1);
  for (let O = 0; O < E.width; O++) for (let F = 0; F < E.height; F++) D[F * E.width + O] === 0 && P(O, F);
  function P(O, F) {
    let L = 0,
      U = 0,
      z = E.getBitXY(O, F),
      V = z ? ++T : --C;
    if (T > 32767 || C < -32768) throw new Error("Too many regions of interest");
    for (R[0] = O, B[0] = F; L <= U; ) {
      let X = R[L & I],
        G = B[L & I];
      if (
        ((D[G * E.width + X] = V),
        X > 0 &&
          D[G * E.width + X - 1] === 0 &&
          E.getBitXY(X - 1, G) === z &&
          (U++, (R[U & I] = X - 1), (B[U & I] = G), (D[G * E.width + X - 1] = -32768)),
        G > 0 &&
          D[(G - 1) * E.width + X] === 0 &&
          E.getBitXY(X, G - 1) === z &&
          (U++, (R[U & I] = X), (B[U & I] = G - 1), (D[(G - 1) * E.width + X] = -32768)),
        X < E.width - 1 &&
          D[G * E.width + X + 1] === 0 &&
          E.getBitXY(X + 1, G) === z &&
          (U++, (R[U & I] = X + 1), (B[U & I] = G), (D[G * E.width + X + 1] = -32768)),
        G < E.height - 1 &&
          D[(G + 1) * E.width + X] === 0 &&
          E.getBitXY(X, G + 1) === z &&
          (U++, (R[U & I] = X), (B[U & I] = G + 1), (D[(G + 1) * E.width + X] = -32768)),
        A &&
          (X > 0 &&
            G > 0 &&
            D[(G - 1) * E.width + X - 1] === 0 &&
            E.getBitXY(X - 1, G - 1) === z &&
            (U++, (R[U & I] = X - 1), (B[U & I] = G - 1), (D[(G - 1) * E.width + X - 1] = -32768)),
          X < E.width - 1 &&
            G > 0 &&
            D[(G - 1) * E.width + X + 1] === 0 &&
            E.getBitXY(X + 1, G - 1) === z &&
            (U++, (R[U & I] = X + 1), (B[U & I] = G - 1), (D[(G - 1) * E.width + X + 1] = -32768)),
          X > 0 &&
            G < E.height - 1 &&
            D[(G + 1) * E.width + X - 1] === 0 &&
            E.getBitXY(X - 1, G + 1) === z &&
            (U++, (R[U & I] = X - 1), (B[U & I] = G + 1), (D[(G + 1) * E.width + X - 1] = -32768)),
          X < E.width - 1 &&
            G < E.height - 1 &&
            D[(G + 1) * E.width + X + 1] === 0 &&
            E.getBitXY(X + 1, G + 1) === z &&
            (U++, (R[U & I] = X + 1), (B[U & I] = G + 1), (D[(G + 1) * E.width + X + 1] = -32768))),
        L++,
        U - L > I)
      )
        throw new Error(
          "analyseMask can not finish, the array to manage internal data is not big enough.You could improve mask by changing MAX_ARRAY",
        );
    }
  }
  return new RoiMap(E, D);
}
class DisjointSet {
  constructor() {
    this.nodes = new Map();
  }
  add(_) {
    var A = this.nodes.get(_);
    return A || ((A = new DisjointSetNode(_)), this.nodes.set(_, A)), A;
  }
  union(_, A) {
    const I = this.find(_),
      D = this.find(A);
    I !== D && (I.rank < D.rank ? (I.parent = D) : I.rank > D.rank ? (D.parent = I) : ((D.parent = I), I.rank++));
  }
  find(_) {
    for (var A = _; A.parent !== null; ) A = A.parent;
    for (var I = _; I.parent !== null; ) {
      var D = I;
      (I = I.parent), (D.parent = A);
    }
    return A;
  }
  connected(_, A) {
    return this.find(_) === this.find(A);
  }
}
var DisjointSet_1 = DisjointSet;
function DisjointSetNode(E) {
  (this.value = E), (this.parent = null), (this.rank = 0);
}
const DisjointSet$1 = DisjointSet_1,
  direction4X = [-1, 0],
  direction4Y = [0, -1],
  neighbours4 = [null, null],
  direction8X = [-1, -1, 0, 1],
  direction8Y = [0, -1, -1, -1],
  neighbours8 = [null, null, null, null];
function fromMaskConnectedComponentLabelingAlgorithm(E, _ = {}) {
  const { allowCorners: A = !1 } = _;
  let I = 4;
  A && (I = 8);
  let D, T, C;
  if (I === 8) (D = direction8X), (T = direction8Y), (C = neighbours8);
  else if (I === 4) (D = direction4X), (T = direction4Y), (C = neighbours4);
  else throw new RangeError(`unsupported neighbours count: ${I}`);
  const R = E.size,
    B = E.width,
    P = E.height,
    O = new Array(R),
    F = new Uint32Array(R),
    L = new DisjointSet$1();
  let U = 1;
  for (let z = 0; z < P; z++)
    for (let V = 0; V < B; V++) {
      const X = V + z * B;
      if (E.getBit(X)) {
        let G = null;
        for (let Z = 0; Z < C.length; Z++) {
          const Y = V + D[Z],
            q = z + T[Z];
          if (Y >= 0 && q >= 0 && Y < B && q < P) {
            const W = Y + q * B;
            let ee = O[W];
            ee ? ((C[Z] = ee), (!G || C[Z].value < G.value) && (G = C[Z])) : (C[Z] = null);
          }
        }
        if (!G) O[X] = L.add(U++);
        else {
          O[X] = G;
          for (let Z = 0; Z < C.length; Z++) C[Z] && C[Z] !== G && L.union(G, C[Z]);
        }
      }
    }
  for (let z = 0; z < P; z++)
    for (let V = 0; V < B; V++) {
      const X = V + z * B;
      E.getBit(X) && (F[X] = L.find(O[X]).value);
    }
  return new RoiMap(E, F);
}
function fromMaxima(E = {}) {
  let { allowCorner: _ = !0, onlyTop: A = !1, invert: I = !1 } = E,
    D = this;
  D.checkProcessable("fromMaxima", { components: [1] });
  const T = 1,
    C = 2;
  let R = 0,
    B = 0,
    P = new Int16Array(D.size),
    O = new Int8Array(D.size),
    F = new Float32Array(D.size),
    L = 1048575,
    U = new Uint16Array(L + 1),
    z = new Uint16Array(L + 1),
    V = 0,
    X = 0,
    G = new Uint16Array(L + 1),
    Z = new Uint16Array(L + 1),
    Y = 0,
    q = 0;
  for (W(D); V < X; ) {
    let Q = U[V & L],
      J = z[V & L];
    te(Q, J, C), V++;
  }
  return new RoiMap(D, P);
  function W({ maxima: Q = !0 }) {
    for (let J = 1; J < D.height - 1; J++)
      for (let K = 1; K < D.width - 1; K++) {
        let ne = K + J * D.width;
        if (O[ne] === 0) {
          let re = Q ? D.data[ne] : -D.data[K + J * D.width];
          if (
            D.data[J * D.width + K - 1] > re ||
            D.data[J * D.width + K + 1] > re ||
            D.data[(J - 1) * D.width + K] > re ||
            D.data[(J + 1) * D.width + K] > re ||
            (_ &&
              (D.data[(J - 1) * D.width + K - 1] > re ||
                D.data[(J - 1) * D.width + K + 1] > re ||
                D.data[(J + 1) * D.width + K - 1] > re ||
                D.data[(J + 1) * D.width + K + 1] > re))
          )
            continue;
          (P[ne] = Q ? ++R : --B), ee(K, J) || (Q ? --R : ++B);
        }
      }
  }
  function ee(Q, J) {
    let K = X;
    (Y = 0), (q = 1), (G[0] = Q), (Z[0] = J);
    let ne = !0;
    for (; Y < q; ) {
      let re = G[Y & L],
        ie = Z[Y & L];
      (ne &= te(re, ie, T)), Y++;
    }
    if (!ne) {
      for (let re = 0; re < q; re++) {
        let ie = G[re & L],
          oe = Z[re & L] * D.width + ie;
        P[oe] = 0;
      }
      X = K;
    }
    return ne;
  }
  function te(Q, J, K) {
    let ne = P[J * D.width + Q],
      re = D.data[J * D.width + Q];
    for (let ie = J - 1; ie <= J + 1; ie++)
      for (let se = Q - 1; se <= Q + 1; se++) {
        let oe = ie * D.width + se;
        if (O[oe] === 0)
          switch (((O[oe] = 1), (F[oe] = D.data[oe] - re), K)) {
            case T:
              if (F[oe] === 0) {
                if (se === 0 || ie === 0 || se === D.width - 1 || ie === D.height - 1) return !1;
                (P[oe] = ne), (G[q & L] = se), (Z[q & L] = ie), q++;
              } else {
                if (F[oe] > 0) return !1;
                A || ((P[oe] = ne), (U[X & L] = se), (z[X & L] = ie), X++);
              }
              break;
            case C:
              F[oe] <= 0 && ((P[oe] = ne), (U[X & L] = se), (z[X & L] = ie), X++);
              break;
            default:
              throw new Error("unreachable");
          }
      }
    return !0;
  }
}
function fromPoints(E, _ = {}) {
  let A = new Shape(_),
    I = new Int16Array(this.size),
    D = 0,
    T = A.getPoints();
  for (let C = 0; C < E.length; C++) {
    D++;
    let R = E[C][0],
      B = E[C][1];
    for (let P = 0; P < T.length; P++) {
      let O = T[P][0],
        F = T[P][1];
      R + O >= 0 && B + F >= 0 && R + O < this.width && B + F < this.height && (I[R + O + (B + F) * this.width] = D);
    }
  }
  return new RoiMap(this, I);
}
function commonjsRequire(E) {
  throw new Error(
    'Could not dynamically require "' +
      E +
      '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.',
  );
}
var priorityQueueExports = {},
  priorityQueue = {
    get exports() {
      return priorityQueueExports;
    },
    set exports(E) {
      priorityQueueExports = E;
    },
  };
(function (E, _) {
  (function (A) {
    E.exports = A();
  })(function () {
    return (function A(I, D, T) {
      function C(P, O) {
        if (!D[P]) {
          if (!I[P]) {
            var F = typeof commonjsRequire == "function" && commonjsRequire;
            if (!O && F) return F(P, !0);
            if (R) return R(P, !0);
            var L = new Error("Cannot find module '" + P + "'");
            throw ((L.code = "MODULE_NOT_FOUND"), L);
          }
          var U = (D[P] = { exports: {} });
          I[P][0].call(
            U.exports,
            function (z) {
              var V = I[P][1][z];
              return C(V || z);
            },
            U,
            U.exports,
            A,
            I,
            D,
            T,
          );
        }
        return D[P].exports;
      }
      for (var R = typeof commonjsRequire == "function" && commonjsRequire, B = 0; B < T.length; B++) C(T[B]);
      return C;
    })(
      {
        1: [
          function (A, I, D) {
            var T,
              C,
              R,
              B,
              P,
              O = function (L, U) {
                for (var z in U) F.call(U, z) && (L[z] = U[z]);
                function V() {
                  this.constructor = L;
                }
                return (V.prototype = U.prototype), (L.prototype = new V()), (L.__super__ = U.prototype), L;
              },
              F = {}.hasOwnProperty;
            (T = A("./PriorityQueue/AbstractPriorityQueue")),
              (C = A("./PriorityQueue/ArrayStrategy")),
              (B = A("./PriorityQueue/BinaryHeapStrategy")),
              (R = A("./PriorityQueue/BHeapStrategy")),
              (P = (function (L) {
                O(U, L);
                function U(z) {
                  z || (z = {}),
                    z.strategy || (z.strategy = B),
                    z.comparator ||
                      (z.comparator = function (V, X) {
                        return (V || 0) - (X || 0);
                      }),
                    U.__super__.constructor.call(this, z);
                }
                return U;
              })(T)),
              (P.ArrayStrategy = C),
              (P.BinaryHeapStrategy = B),
              (P.BHeapStrategy = R),
              (I.exports = P);
          },
          {
            "./PriorityQueue/AbstractPriorityQueue": 2,
            "./PriorityQueue/ArrayStrategy": 3,
            "./PriorityQueue/BHeapStrategy": 4,
            "./PriorityQueue/BinaryHeapStrategy": 5,
          },
        ],
        2: [
          function (A, I, D) {
            I.exports = (function () {
              function T(C) {
                var R;
                if ((C != null ? C.strategy : void 0) == null) throw "Must pass options.strategy, a strategy";
                if ((C != null ? C.comparator : void 0) == null) throw "Must pass options.comparator, a comparator";
                (this.priv = new C.strategy(C)),
                  (this.length = (C != null && (R = C.initialValues) != null ? R.length : void 0) || 0);
              }
              return (
                (T.prototype.queue = function (C) {
                  this.length++, this.priv.queue(C);
                }),
                (T.prototype.dequeue = function (C) {
                  if (!this.length) throw "Empty queue";
                  return this.length--, this.priv.dequeue();
                }),
                (T.prototype.peek = function (C) {
                  if (!this.length) throw "Empty queue";
                  return this.priv.peek();
                }),
                (T.prototype.clear = function () {
                  return (this.length = 0), this.priv.clear();
                }),
                T
              );
            })();
          },
          {},
        ],
        3: [
          function (A, I, D) {
            var T;
            (T = function (C, R, B) {
              var P, O, F;
              for (O = 0, P = C.length; O < P; ) (F = (O + P) >>> 1), B(C[F], R) >= 0 ? (O = F + 1) : (P = F);
              return O;
            }),
              (I.exports = (function () {
                function C(R) {
                  var B;
                  (this.options = R),
                    (this.comparator = this.options.comparator),
                    (this.data = ((B = this.options.initialValues) != null ? B.slice(0) : void 0) || []),
                    this.data.sort(this.comparator).reverse();
                }
                return (
                  (C.prototype.queue = function (R) {
                    var B;
                    (B = T(this.data, R, this.comparator)), this.data.splice(B, 0, R);
                  }),
                  (C.prototype.dequeue = function () {
                    return this.data.pop();
                  }),
                  (C.prototype.peek = function () {
                    return this.data[this.data.length - 1];
                  }),
                  (C.prototype.clear = function () {
                    this.data.length = 0;
                  }),
                  C
                );
              })());
          },
          {},
        ],
        4: [
          function (A, I, D) {
            I.exports = (function () {
              function T(C) {
                var R, B, P, O, F, L, U, z;
                for (
                  this.comparator =
                    (C != null ? C.comparator : void 0) ||
                    function (V, X) {
                      return V - X;
                    },
                    this.pageSize = (C != null ? C.pageSize : void 0) || 512,
                    this.length = 0,
                    U = 0;
                  1 << U < this.pageSize;

                )
                  U += 1;
                if (1 << U !== this.pageSize) throw "pageSize must be a power of two";
                for (
                  this._shift = U, this._emptyMemoryPageTemplate = R = [], B = 0, F = this.pageSize;
                  0 <= F ? B < F : B > F;
                  0 <= F ? ++B : --B
                )
                  R.push(null);
                if (((this._memory = []), (this._mask = this.pageSize - 1), C.initialValues))
                  for (L = C.initialValues, P = 0, O = L.length; P < O; P++) (z = L[P]), this.queue(z);
              }
              return (
                (T.prototype.queue = function (C) {
                  (this.length += 1), this._write(this.length, C), this._bubbleUp(this.length, C);
                }),
                (T.prototype.dequeue = function () {
                  var C, R;
                  return (
                    (C = this._read(1)),
                    (R = this._read(this.length)),
                    (this.length -= 1),
                    this.length > 0 && (this._write(1, R), this._bubbleDown(1, R)),
                    C
                  );
                }),
                (T.prototype.peek = function () {
                  return this._read(1);
                }),
                (T.prototype.clear = function () {
                  (this.length = 0), (this._memory.length = 0);
                }),
                (T.prototype._write = function (C, R) {
                  var B;
                  for (B = C >> this._shift; B >= this._memory.length; )
                    this._memory.push(this._emptyMemoryPageTemplate.slice(0));
                  return (this._memory[B][C & this._mask] = R);
                }),
                (T.prototype._read = function (C) {
                  return this._memory[C >> this._shift][C & this._mask];
                }),
                (T.prototype._bubbleUp = function (C, R) {
                  var B, P, O, F;
                  for (
                    B = this.comparator;
                    C > 1 &&
                    ((P = C & this._mask),
                    C < this.pageSize || P > 3
                      ? (O = (C & ~this._mask) | (P >> 1))
                      : P < 2
                        ? ((O = (C - this.pageSize) >> this._shift),
                          (O += O & ~(this._mask >> 1)),
                          (O |= this.pageSize >> 1))
                        : (O = C - 2),
                    (F = this._read(O)),
                    !(B(F, R) < 0));

                  )
                    this._write(O, R), this._write(C, F), (C = O);
                }),
                (T.prototype._bubbleDown = function (C, R) {
                  var B, P, O, F, L;
                  for (L = this.comparator; C < this.length; )
                    if (
                      (C > this._mask && !(C & (this._mask - 1))
                        ? (B = P = C + 2)
                        : C & (this.pageSize >> 1)
                          ? ((B = (C & ~this._mask) >> 1),
                            (B |= C & (this._mask >> 1)),
                            (B = (B + 1) << this._shift),
                            (P = B + 1))
                          : ((B = C + (C & this._mask)), (P = B + 1)),
                      B !== P && P <= this.length)
                    )
                      if (((O = this._read(B)), (F = this._read(P)), L(O, R) < 0 && L(O, F) <= 0))
                        this._write(B, R), this._write(C, O), (C = B);
                      else if (L(F, R) < 0) this._write(P, R), this._write(C, F), (C = P);
                      else break;
                    else if (B <= this.length)
                      if (((O = this._read(B)), L(O, R) < 0)) this._write(B, R), this._write(C, O), (C = B);
                      else break;
                    else break;
                }),
                T
              );
            })();
          },
          {},
        ],
        5: [
          function (A, I, D) {
            I.exports = (function () {
              function T(C) {
                var R;
                (this.comparator =
                  (C != null ? C.comparator : void 0) ||
                  function (B, P) {
                    return B - P;
                  }),
                  (this.length = 0),
                  (this.data = ((R = C.initialValues) != null ? R.slice(0) : void 0) || []),
                  this._heapify();
              }
              return (
                (T.prototype._heapify = function () {
                  var C, R, B;
                  if (this.data.length > 0)
                    for (C = R = 1, B = this.data.length; 1 <= B ? R < B : R > B; C = 1 <= B ? ++R : --R)
                      this._bubbleUp(C);
                }),
                (T.prototype.queue = function (C) {
                  this.data.push(C), this._bubbleUp(this.data.length - 1);
                }),
                (T.prototype.dequeue = function () {
                  var C, R;
                  return (
                    (R = this.data[0]),
                    (C = this.data.pop()),
                    this.data.length > 0 && ((this.data[0] = C), this._bubbleDown(0)),
                    R
                  );
                }),
                (T.prototype.peek = function () {
                  return this.data[0];
                }),
                (T.prototype.clear = function () {
                  (this.length = 0), (this.data.length = 0);
                }),
                (T.prototype._bubbleUp = function (C) {
                  for (var R, B; C > 0 && ((R = (C - 1) >>> 1), this.comparator(this.data[C], this.data[R]) < 0); )
                    (B = this.data[R]), (this.data[R] = this.data[C]), (this.data[C] = B), (C = R);
                }),
                (T.prototype._bubbleDown = function (C) {
                  var R, B, P, O, F;
                  for (
                    R = this.data.length - 1;
                    (B = (C << 1) + 1),
                      (O = B + 1),
                      (P = C),
                      B <= R && this.comparator(this.data[B], this.data[P]) < 0 && (P = B),
                      O <= R && this.comparator(this.data[O], this.data[P]) < 0 && (P = O),
                      P !== C;

                  )
                    (F = this.data[P]), (this.data[P] = this.data[C]), (this.data[C] = F), (C = P);
                }),
                T
              );
            })();
          },
          {},
        ],
      },
      {},
      [1],
    )(1);
  });
})(priorityQueue);
const PriorityQueue = priorityQueueExports,
  dxs = [1, 0, -1, 0, 1, 1, -1, -1],
  dys = [0, 1, 0, -1, 1, -1, 1, -1];
function fromWaterShed(E = {}) {
  let { points: _, mask: A, image: I, fillMaxValue: D = this.maxValue, invert: T = !1 } = E,
    C = I || this;
  C.checkProcessable("fromWaterShed", { bitDepth: [8, 16], components: 1 }),
    (T = !T),
    _ || (_ = C.getLocalMaxima({ invert: T, mask: A }));
  let R = T ? 0 : 1,
    B = new Int16Array(C.size),
    P = C.width,
    O = C.height,
    F = new PriorityQueue({ comparator: (L, U) => L[2] - U[2], strategy: PriorityQueue.BinaryHeapStrategy });
  for (let L = 0; L < _.length; L++) {
    let U = _[L][0] + _[L][1] * P;
    B[U] = L + 1;
    let z = C.data[U];
    ((T && z <= D) || (!T && z >= D)) && F.queue([_[L][0], _[L][1], z]);
  }
  for (; F.length > 0; ) {
    let L = F.dequeue(),
      U = L[0] + L[1] * P;
    for (let z = 0; z < 4; z++) {
      let V = L[0] + dxs[z],
        X = L[1] + dys[z];
      if (V >= 0 && X >= 0 && V < P && X < O) {
        let G = V + X * P;
        if (!A || A.getBit(G) === R) {
          let Z = C.data[G];
          ((T && Z <= D) || (!T && Z >= D)) &&
            B[G] === 0 &&
            ((B[G] = B[U]), F.queue([L[0] + dxs[z], L[1] + dys[z], Z]));
        }
      }
    }
  }
  return new RoiMap(C, B);
}
class RoiManager {
  constructor(_, A = {}) {
    (this._image = _),
      (this._options = A),
      this._options.label || (this._options.label = "default"),
      (this._layers = {}),
      (this._painted = null);
  }
  fromMaxima(_ = {}) {
    let A = Object.assign({}, this._options, _),
      I = fromMaxima.call(this._image, _);
    this._layers[A.label] = new RoiLayer(I, A);
  }
  fromPoints(_, A = {}) {
    let I = Object.assign({}, this._options, A),
      D = fromPoints.call(this._image, _, A);
    return (this._layers[I.label] = new RoiLayer(D, I)), this;
  }
  putMap(_, A = {}) {
    let I = new RoiMap(this._image, _),
      D = Object.assign({}, this._options, A);
    return (this._layers[D.label] = new RoiLayer(I, D)), this;
  }
  fromWaterShed(_ = {}) {
    let A = Object.assign({}, this._options, _),
      I = fromWaterShed.call(this._image, _);
    this._layers[A.label] = new RoiLayer(I, A);
  }
  fromMask(_, A = {}) {
    let I = Object.assign({}, this._options, A),
      D = fromMask.call(this._image, _, A);
    return (this._layers[I.label] = new RoiLayer(D, I)), this;
  }
  fromMaskConnectedComponentLabelingAlgorithm(_, A = {}) {
    let I = Object.assign({}, this._options, A),
      D = fromMaskConnectedComponentLabelingAlgorithm.call(this._image, _, A);
    return (this._layers[I.label] = new RoiLayer(D, I)), this;
  }
  getMap(_ = {}) {
    let A = Object.assign({}, this._options, _);
    return this._assertLayerWithLabel(A.label), this._layers[A.label].roiMap;
  }
  rowsInfo(_ = {}) {
    return this.getMap(_).rowsInfo();
  }
  colsInfo(_ = {}) {
    return this.getMap(_).rowsInfo();
  }
  getRoiIds(_ = {}) {
    let A = this.getRois(_);
    if (A) {
      let I = new Array(A.length);
      for (let D = 0; D < A.length; D++) I[D] = A[D].id;
      return I;
    }
    throw new Error("ROIs not found");
  }
  getRois(_ = {}) {
    let {
      label: A = this._options.label,
      positive: I = !0,
      negative: D = !0,
      minSurface: T = 0,
      maxSurface: C = Number.POSITIVE_INFINITY,
      minWidth: R = 0,
      maxWidth: B = Number.POSITIVE_INFINITY,
      minHeight: P = 0,
      maxHeight: O = Number.POSITIVE_INFINITY,
      minRatio: F = 0,
      maxRatio: L = Number.POSITIVE_INFINITY,
    } = _;
    if (!this._layers[A]) throw new Error(`this Roi layer (${A}) does not exist`);
    const U = this._layers[A].roi,
      z = [];
    for (const V of U)
      ((V.id < 0 && D) || (V.id > 0 && I)) &&
        V.surface >= T &&
        V.surface <= C &&
        V.width >= R &&
        V.width <= B &&
        V.height >= P &&
        V.height <= O &&
        V.ratio >= F &&
        V.ratio <= L &&
        z.push(V);
    return z;
  }
  getRoi(_, A = {}) {
    const { label: I = this._options.label } = A;
    if (!this._layers[I]) throw new Error(`this Roi layer (${I}) does not exist`);
    const D = this._layers[I].roi.find((T) => T.id === _);
    if (!D) throw new Error(`found no Roi with id ${_}`);
    return D;
  }
  getMasks(_ = {}) {
    let A = this.getRois(_),
      I = new Array(A.length);
    for (let D = 0; D < A.length; D++) I[D] = A[D].getMask(_);
    return I;
  }
  getAnalysisMasks(_ = {}) {
    const { analysisProperty: A } = _;
    let I = `${A}Mask`,
      D = this.getRois(_);
    return D.length === 0 || !D[0][I] ? [] : D.map((T) => T[I]);
  }
  getData(_ = {}) {
    let A = Object.assign({}, this._options, _);
    return this._assertLayerWithLabel(A.label), this._layers[A.label].roiMap.data;
  }
  paint(_ = {}) {
    let { labelProperty: A, analysisProperty: I } = _;
    this._painted || (this._painted = this._image.rgba8());
    let D = this.getMasks(_);
    if (A) {
      const T = this.getRois(_);
      _.labels = T.map((P) => deepValue(P, A));
      const C = Math.max(..._.labels);
      let R = !1,
        B = !1;
      if (
        (A.includes("surface") ? (R = !0) : /(?:perimeter|min|max|external|width|height|length)/.test(A) && (B = !0),
        isFinite(C))
      ) {
        let P = "";
        if (_.unit !== "pixel" && _.pixelSize && (B || R)) {
          P = R ? `${_.unit}^2` : _.unit;
          let O = R ? "m^2" : "m",
            F = R ? _.pixelSize ** 2 : _.pixelSize;
          const L = Qty.swiftConverter(O, P);
          _.labels = _.labels.map((U) => L(F * U));
        }
        C > 50
          ? (_.labels = _.labels.map((O) => Math.round(O) + P))
          : C > 10
            ? (_.labels = _.labels.map((O) => O.toFixed(1) + P))
            : (_.labels = _.labels.map((O) => O.toFixed(2) + P));
      }
      _.labelsPosition = T.map((P) => [P.meanX, P.meanY]);
    }
    if ((this._painted.paintMasks(D, _), I)) {
      let T = this.getAnalysisMasks(_);
      this._painted.paintMasks(T, { color: _.analysisColor, alpha: _.analysisAlpha });
    }
    return this._painted;
  }
  getMask(_ = {}) {
    let A = new Image(this._image.width, this._image.height, { kind: "BINARY" }),
      I = this.getMasks(_);
    for (let D = 0; D < I.length; D++) {
      let T = I[D];
      for (let C = 0; C < T.width; C++)
        for (let R = 0; R < T.height; R++) T.getBitXY(C, R) && A.setBitXY(C + T.position[0], R + T.position[1]);
    }
    return A;
  }
  resetPainted(_ = {}) {
    const { image: A } = _;
    A ? (this._painted = this.image.rgba8()) : (this._painted = this._image.rgba8());
  }
  mergeRoi(_ = {}) {
    const A = this.getMap(_);
    return A.mergeRoi(_), this.putMap(A.data, _), this;
  }
  mergeRois(_, A = {}) {
    if (!Array.isArray(_) || _.some((D) => !Number.isInteger(D)))
      throw new Error("Roi ids must be an array of integers");
    if (_.length < 2) throw new Error("Roi ids must have at least two elements");
    if (new Set(_).size !== _.length) throw new Error("Roi ids must be all different");
    _.forEach((D) => this.getRoi(D));
    const I = this.getMap(A);
    return I.mergeRois(_), this.putMap(I.data, A), this;
  }
  findCorrespondingRoi(_, A = {}) {
    let I = this.getRois(A),
      D = [];
    for (let T = 0; T < I.length; T++) {
      let C = I[T],
        R = C.minX,
        B = C.minY,
        P = C.points,
        O = Math.sign(C.id),
        F = correspondingRoisInformation(R, B, P, _, O);
      D.push(F);
    }
    return D;
  }
  _assertLayerWithLabel(_) {
    if (!this._layers[_]) throw new Error(`no layer with label ${_}`);
  }
}
function correspondingRoisInformation(E, _, A, I, D) {
  let T = { id: [], surface: [], roiSurfaceCovered: [], same: 0, opposite: 0, total: 0 };
  for (let C = 0; C < A.length; C++) {
    let R = A[C],
      B = R[0],
      P = R[1],
      O = B + E + (P + _) * I.width,
      F = I.data[O];
    (F > 0 || F < 0) && (T.id.includes(F) ? (T.surface[T.id.indexOf(F)] += 1) : (T.id.push(F), T.surface.push(1)));
  }
  for (let C = 0; C < T.id.length; C++)
    Math.sign(T.id[C]) === D ? (T.same += T.surface[C]) : (T.opposite += T.surface[C]),
      (T.roiSurfaceCovered[C] = T.surface[C] / A.length);
  return (T.total = T.opposite + T.same), T;
}
const objectToString = Object.prototype.toString;
class Image {
  constructor(_, A, I, D) {
    if (
      (arguments.length === 1
        ? ((D = _), ({ width: _, height: A, data: I } = D))
        : I && !I.length && ((D = I), ({ data: I } = D)),
      _ === void 0 && (_ = 1),
      A === void 0 && (A = 1),
      D === void 0 && (D = {}),
      typeof D != "object" || D === null)
    )
      throw new TypeError("options must be an object");
    if (!Number.isInteger(_) || _ <= 0) throw new RangeError("width must be a positive integer");
    if (!Number.isInteger(A) || A <= 0) throw new RangeError("height must be a positive integer");
    const { kind: T = RGBA } = D;
    if (typeof T != "string") throw new TypeError("kind must be a string");
    const C = getKind(T),
      R = Object.assign({}, D);
    for (const V in C) R[V] === void 0 && (R[V] = C[V]);
    verifyKindDefinition(R);
    const { components: B, bitDepth: P, colorModel: O } = R,
      F = R.alpha + 0,
      L = _ * A,
      U = B + F,
      z = P === 32 ? Number.MAX_VALUE : 2 ** P - 1;
    if (I === void 0) I = createPixelArray(L, B, F, U, P, z);
    else {
      const V = getTheoreticalPixelArraySize(L, U, P);
      if (I.length !== V) throw new RangeError(`incorrect data size: ${I.length}. Should be ${V}`);
    }
    (this.width = _),
      (this.height = A),
      (this.data = I),
      (this.size = L),
      (this.components = B),
      (this.alpha = F),
      (this.bitDepth = P),
      (this.maxValue = z),
      (this.colorModel = O),
      (this.channels = U),
      (this.meta = D.meta || {}),
      Object.defineProperty(this, "parent", {
        enumerable: !1,
        writable: !0,
        configurable: !0,
        value: D.parent || null,
      }),
      (this.position = D.position || [0, 0]),
      (this.computed = null),
      (this.sizes = [this.width, this.height]),
      (this.multiplierX = this.channels),
      (this.multiplierY = this.channels * this.width),
      (this.isClamped = this.bitDepth < 32),
      (this.borderSizes = [0, 0]);
  }
  get [Symbol.toStringTag]() {
    return "IJSImage";
  }
  static isImage(_) {
    return objectToString.call(_) === "[object IJSImage]";
  }
  static fromCanvas(_) {
    const I = _.getContext("2d").getImageData(0, 0, _.width, _.height);
    return new Image(I.width, I.height, I.data);
  }
  static createFrom(_, A) {
    const I = getImageParameters(_);
    return Object.assign(I, { parent: _, position: [0, 0] }, A), new Image(I);
  }
  getRoiManager(_) {
    return new RoiManager(this, _);
  }
  clone() {
    const _ = this.data.slice();
    return new Image(this.width, this.height, _, this);
  }
  apply(_) {
    for (let A = 0; A < this.height; A++)
      for (let I = 0; I < this.width; I++) {
        let D = (A * this.width + I) * this.channels;
        _.call(this, D);
      }
  }
}
setValueMethods(Image);
setBitMethods(Image);
setExportMethods(Image);
Image.prototype.checkProcessable = checkProcessable;
Image.prototype.getRGBAData = getRGBAData;
Image.load = load;
Image.extendMethod = extendMethod;
Image.extendProperty = extendProperty;
extend$1(Image);
var workerTemplate$1 = {},
  worker$1 = function () {
    self.window = self;
    function E() {
      this._listeners = {};
    }
    (E.prototype.on = function (A, I) {
      if (this._listeners[A]) throw new RangeError("there is already a listener for " + A);
      if (typeof I != "function") throw new TypeError("callback argument must be a function");
      this._listeners[A] = I;
    }),
      (E.prototype._send = function (A, I, D) {
        D === void 0 ? (D = []) : Array.isArray(D) || (D = [D]), self.postMessage({ id: A, data: I }, D);
      }),
      (E.prototype._trigger = function (A, I) {
        if (!this._listeners[A]) throw new Error("event " + A + " is not defined");
        this._listeners[A].apply(null, I);
      });
    var _ = new E();
    self.onmessage = function (A) {
      switch (A.data.action) {
        case "exec":
          A.data.args.unshift(function (I, D) {
            _._send(A.data.id, I, D);
          }),
            _._trigger(A.data.event, A.data.args);
          break;
        case "ping":
          _._send(A.data.id, "pong");
          break;
        default:
          throw new Error("unexpected action: " + A.data.action);
      }
    };
  },
  workerStr = worker$1.toString().split('"CODE";');
workerTemplate$1.newWorkerURL = function E(_, A) {
  var I = new Blob(
    [
      "(",
      workerStr[0],
      "importScripts.apply(self, " +
        JSON.stringify(A) +
        `);
`,
      "(",
      _,
      ")();",
      workerStr[1],
      ")();",
    ],
    { type: "application/javascript" },
  );
  return URL.createObjectURL(I);
};
var workerTemplate = workerTemplate$1,
  CORES = navigator.hardwareConcurrency || 1;
function WorkerManager(E, _) {
  if (typeof E != "string" && typeof E != "function") throw new TypeError("func argument must be a function");
  if ((_ === void 0 && (_ = {}), typeof _ != "object" || _ === null))
    throw new TypeError("options argument must be an object");
  (this._workerCode = E.toString()),
    _.maxWorkers === void 0 || _.maxWorkers === "auto"
      ? (this._numWorkers = Math.min(CORES - 1, 1))
      : _.maxWorkers > 0
        ? (this._numWorkers = Math.min(_.maxWorkers, CORES))
        : (this._numWorkers = CORES),
    (this._workers = new Map()),
    (this._timeout = _.timeout || 0),
    (this._terminateOnError = !!_.terminateOnError);
  var A = _.deps;
  typeof A == "string" && (A = [A]),
    Array.isArray(A) || (A = void 0),
    (this._id = 0),
    (this._terminated = !1),
    (this._working = 0),
    (this._waiting = []),
    this._init(A);
}
WorkerManager.prototype._init = function (E) {
  for (var _ = workerTemplate.newWorkerURL(this._workerCode, E), A = 0; A < this._numWorkers; A++) {
    var I = new Worker(_);
    (I.onmessage = this._onmessage.bind(this, I)),
      (I.onerror = this._onerror.bind(this, I)),
      (I.running = !1),
      (I.id = A),
      this._workers.set(I, null);
  }
  URL.revokeObjectURL(_);
};
WorkerManager.prototype._onerror = function (E, _) {
  if (!this._terminated) {
    this._working--, (E.running = !1);
    var A = this._workers.get(E);
    A && A[1](_.message), this._workers.set(E, null), this._terminateOnError ? this.terminate() : this._exec();
  }
};
WorkerManager.prototype._onmessage = function (E, _) {
  if (!this._terminated) {
    this._working--, (E.running = !1);
    var A = this._workers.get(E);
    A && A[0](_.data.data), this._workers.set(E, null), this._exec();
  }
};
WorkerManager.prototype._exec = function () {
  for (var E of this._workers.keys()) {
    if (this._working === this._numWorkers || this._waiting.length === 0) return;
    if (!E.running)
      for (var _ = 0; _ < this._waiting.length; _++) {
        var A = this._waiting[_];
        if (!(typeof A[4] == "number" && A[4] !== E.id)) {
          this._waiting.splice(_, 1),
            E.postMessage({ action: "exec", event: A[0], args: A[1] }, A[2]),
            (E.running = !0),
            (E.time = Date.now()),
            this._workers.set(E, A[3]),
            this._working++;
          break;
        }
      }
  }
};
WorkerManager.prototype.terminate = function () {
  if (!this._terminated) {
    for (var E of this._workers) E[0].terminate(), E[1] && E[1][1](new Error("Terminated"));
    this._workers.clear(), (this._waiting = []), (this._working = 0), (this._terminated = !0);
  }
};
WorkerManager.prototype.postAll = function (E, _) {
  if (this._terminated) throw new Error("Cannot post (terminated)");
  var A = [];
  for (var I of this._workers.keys()) A.push(this.post(E, _, [], I.id));
  return Promise.all(A);
};
WorkerManager.prototype.post = function (E, _, A, I) {
  _ === void 0 && (_ = []), A === void 0 && (A = []), Array.isArray(_) || (_ = [_]), Array.isArray(A) || (A = [A]);
  var D = this;
  return new Promise(function (T, C) {
    if (D._terminated) throw new Error("Cannot post (terminated)");
    D._waiting.push([E, _, A, [T, C], I]), D._exec();
  });
};
var src = WorkerManager;
const defaultOptions = {
  regression: { kernelType: "polynomial", kernelOptions: { degree: 2, constant: 1 } },
  threshold: 0.02,
  roi: { minSurface: 100, positive: !1 },
  sampling: 20,
  include: [],
};
function run(E, _, A) {
  _ = Object.assign({}, defaultOptions, _);
  const I = this.manager;
  return Array.isArray(E)
    ? Promise.all(
        E.map(function (D) {
          const T = runOnce(I, D, _);
          return typeof A == "function" && T.then(A), T;
        }),
      )
    : runOnce(I, E, _);
}
function runOnce(E, _, A) {
  return E.post("data", [_, A]).then(function (I) {
    for (let D in I) I[D] = new Image(I[D]);
    return I;
  });
}
function work() {
  worker.on("data", function (E, _, A) {
    _ = new IJS(_);
    const I = {},
      D = [],
      T = _.grey(),
      C = T.sobelFilter();
    U("sobel", C);
    const R = C.level().mask({ threshold: A.threshold });
    U("mask", R);
    const B = C.getRoiManager();
    B.fromMask(R);
    const P = B.getMask(A.roi);
    U("realMask", P);
    const O = T.getPixelsGrid({ sampling: A.sampling, mask: P }),
      F = _.getBackground(O.xyS, O.zS, A.regression);
    U("background", F);
    const L = _.subtract(F);
    (I.result = L), D.push(L.data.buffer), E(I, D);
    function U(z, V) {
      A.include.includes(z) && ((I[z] = V), D.push(V.data.buffer));
    }
  });
}
const background = { run, work };
function extend(E) {
  E.extendMethod("background", background);
}
let Worker$1 = class {
  constructor() {
    (this._url = null), (this._deps = [null]);
  }
  checkUrl() {
    if (this._url === null) throw new Error("image worker must be initialized with an URL");
  }
  get url() {
    return this._url;
  }
  set url(_) {
    if (typeof _ != "string") throw new TypeError("worker URL must be a string");
    (this._url = _), (this._deps[0] = _);
  }
  static extendMethod(_, A) {
    let I,
      D,
      T = {};
    function C(...R) {
      return (
        I || (this.checkUrl(), (D = this.url), (I = new src(A.work, { deps: D })), (T.manager = I)), A.run.call(T, ...R)
      );
    }
    (C.reset = function () {
      I && (I.terminate(), (I = new src(A.work, { deps: D })), (T.manager = I));
    }),
      (Worker$1.prototype[_] = C);
  }
};
extend(Worker$1);
new Worker$1();
var r = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
  t$1 = function (E) {
    return typeof E == "string" ? E.length > 0 : typeof E == "number";
  },
  n = function (E, _, A) {
    return _ === void 0 && (_ = 0), A === void 0 && (A = Math.pow(10, _)), Math.round(A * E) / A + 0;
  },
  e = function (E, _, A) {
    return _ === void 0 && (_ = 0), A === void 0 && (A = 1), E > A ? A : E > _ ? E : _;
  },
  u = function (E) {
    return (E = isFinite(E) ? E % 360 : 0) > 0 ? E : E + 360;
  },
  a = function (E) {
    return { r: e(E.r, 0, 255), g: e(E.g, 0, 255), b: e(E.b, 0, 255), a: e(E.a) };
  },
  o$1 = function (E) {
    return { r: n(E.r), g: n(E.g), b: n(E.b), a: n(E.a, 3) };
  },
  i = /^#([0-9a-f]{3,8})$/i,
  s = function (E) {
    var _ = E.toString(16);
    return _.length < 2 ? "0" + _ : _;
  },
  h = function (E) {
    var _ = E.r,
      A = E.g,
      I = E.b,
      D = E.a,
      T = Math.max(_, A, I),
      C = T - Math.min(_, A, I),
      R = C ? (T === _ ? (A - I) / C : T === A ? 2 + (I - _) / C : 4 + (_ - A) / C) : 0;
    return { h: 60 * (R < 0 ? R + 6 : R), s: T ? (C / T) * 100 : 0, v: (T / 255) * 100, a: D };
  },
  b = function (E) {
    var _ = E.h,
      A = E.s,
      I = E.v,
      D = E.a;
    (_ = (_ / 360) * 6), (A /= 100), (I /= 100);
    var T = Math.floor(_),
      C = I * (1 - A),
      R = I * (1 - (_ - T) * A),
      B = I * (1 - (1 - _ + T) * A),
      P = T % 6;
    return { r: 255 * [I, R, C, C, B, I][P], g: 255 * [B, I, I, R, C, C][P], b: 255 * [C, C, B, I, I, R][P], a: D };
  },
  g = function (E) {
    return { h: u(E.h), s: e(E.s, 0, 100), l: e(E.l, 0, 100), a: e(E.a) };
  },
  d = function (E) {
    return { h: n(E.h), s: n(E.s), l: n(E.l), a: n(E.a, 3) };
  },
  f = function (E) {
    return b(
      ((A = (_ = E).s),
      { h: _.h, s: (A *= ((I = _.l) < 50 ? I : 100 - I) / 100) > 0 ? ((2 * A) / (I + A)) * 100 : 0, v: I + A, a: _.a }),
    );
    var _, A, I;
  },
  c = function (E) {
    return {
      h: (_ = h(E)).h,
      s:
        (D = ((200 - (A = _.s)) * (I = _.v)) / 100) > 0 && D < 200
          ? ((A * I) / 100 / (D <= 100 ? D : 200 - D)) * 100
          : 0,
      l: D / 2,
      a: _.a,
    };
    var _, A, I, D;
  },
  l =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  p =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  v =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  m =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  y = {
    string: [
      [
        function (E) {
          var _ = i.exec(E);
          return _
            ? (E = _[1]).length <= 4
              ? {
                  r: parseInt(E[0] + E[0], 16),
                  g: parseInt(E[1] + E[1], 16),
                  b: parseInt(E[2] + E[2], 16),
                  a: E.length === 4 ? n(parseInt(E[3] + E[3], 16) / 255, 2) : 1,
                }
              : E.length === 6 || E.length === 8
                ? {
                    r: parseInt(E.substr(0, 2), 16),
                    g: parseInt(E.substr(2, 2), 16),
                    b: parseInt(E.substr(4, 2), 16),
                    a: E.length === 8 ? n(parseInt(E.substr(6, 2), 16) / 255, 2) : 1,
                  }
                : null
            : null;
        },
        "hex",
      ],
      [
        function (E) {
          var _ = v.exec(E) || m.exec(E);
          return _
            ? _[2] !== _[4] || _[4] !== _[6]
              ? null
              : a({
                  r: Number(_[1]) / (_[2] ? 100 / 255 : 1),
                  g: Number(_[3]) / (_[4] ? 100 / 255 : 1),
                  b: Number(_[5]) / (_[6] ? 100 / 255 : 1),
                  a: _[7] === void 0 ? 1 : Number(_[7]) / (_[8] ? 100 : 1),
                })
            : null;
        },
        "rgb",
      ],
      [
        function (E) {
          var _ = l.exec(E) || p.exec(E);
          if (!_) return null;
          var A,
            I,
            D = g({
              h: ((A = _[1]), (I = _[2]), I === void 0 && (I = "deg"), Number(A) * (r[I] || 1)),
              s: Number(_[3]),
              l: Number(_[4]),
              a: _[5] === void 0 ? 1 : Number(_[5]) / (_[6] ? 100 : 1),
            });
          return f(D);
        },
        "hsl",
      ],
    ],
    object: [
      [
        function (E) {
          var _ = E.r,
            A = E.g,
            I = E.b,
            D = E.a,
            T = D === void 0 ? 1 : D;
          return t$1(_) && t$1(A) && t$1(I) ? a({ r: Number(_), g: Number(A), b: Number(I), a: Number(T) }) : null;
        },
        "rgb",
      ],
      [
        function (E) {
          var _ = E.h,
            A = E.s,
            I = E.l,
            D = E.a,
            T = D === void 0 ? 1 : D;
          if (!t$1(_) || !t$1(A) || !t$1(I)) return null;
          var C = g({ h: Number(_), s: Number(A), l: Number(I), a: Number(T) });
          return f(C);
        },
        "hsl",
      ],
      [
        function (E) {
          var _ = E.h,
            A = E.s,
            I = E.v,
            D = E.a,
            T = D === void 0 ? 1 : D;
          if (!t$1(_) || !t$1(A) || !t$1(I)) return null;
          var C = (function (R) {
            return { h: u(R.h), s: e(R.s, 0, 100), v: e(R.v, 0, 100), a: e(R.a) };
          })({ h: Number(_), s: Number(A), v: Number(I), a: Number(T) });
          return b(C);
        },
        "hsv",
      ],
    ],
  },
  N = function (E, _) {
    for (var A = 0; A < _.length; A++) {
      var I = _[A][0](E);
      if (I) return [I, _[A][1]];
    }
    return [null, void 0];
  },
  x = function (E) {
    return typeof E == "string"
      ? N(E.trim(), y.string)
      : typeof E == "object" && E !== null
        ? N(E, y.object)
        : [null, void 0];
  },
  M = function (E, _) {
    var A = c(E);
    return { h: A.h, s: e(A.s + 100 * _, 0, 100), l: A.l, a: A.a };
  },
  H = function (E) {
    return (299 * E.r + 587 * E.g + 114 * E.b) / 1e3 / 255;
  },
  $ = function (E, _) {
    var A = c(E);
    return { h: A.h, s: A.s, l: e(A.l + 100 * _, 0, 100), a: A.a };
  },
  j = (function () {
    function E(_) {
      (this.parsed = x(_)[0]), (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 });
    }
    return (
      (E.prototype.isValid = function () {
        return this.parsed !== null;
      }),
      (E.prototype.brightness = function () {
        return n(H(this.rgba), 2);
      }),
      (E.prototype.isDark = function () {
        return H(this.rgba) < 0.5;
      }),
      (E.prototype.isLight = function () {
        return H(this.rgba) >= 0.5;
      }),
      (E.prototype.toHex = function () {
        return (
          (_ = o$1(this.rgba)),
          (A = _.r),
          (I = _.g),
          (D = _.b),
          (C = (T = _.a) < 1 ? s(n(255 * T)) : ""),
          "#" + s(A) + s(I) + s(D) + C
        );
        var _, A, I, D, T, C;
      }),
      (E.prototype.toRgb = function () {
        return o$1(this.rgba);
      }),
      (E.prototype.toRgbString = function () {
        return (
          (_ = o$1(this.rgba)),
          (A = _.r),
          (I = _.g),
          (D = _.b),
          (T = _.a) < 1 ? "rgba(" + A + ", " + I + ", " + D + ", " + T + ")" : "rgb(" + A + ", " + I + ", " + D + ")"
        );
        var _, A, I, D, T;
      }),
      (E.prototype.toHsl = function () {
        return d(c(this.rgba));
      }),
      (E.prototype.toHslString = function () {
        return (
          (_ = d(c(this.rgba))),
          (A = _.h),
          (I = _.s),
          (D = _.l),
          (T = _.a) < 1
            ? "hsla(" + A + ", " + I + "%, " + D + "%, " + T + ")"
            : "hsl(" + A + ", " + I + "%, " + D + "%)"
        );
        var _, A, I, D, T;
      }),
      (E.prototype.toHsv = function () {
        return (_ = h(this.rgba)), { h: n(_.h), s: n(_.s), v: n(_.v), a: n(_.a, 3) };
        var _;
      }),
      (E.prototype.invert = function () {
        return w({ r: 255 - (_ = this.rgba).r, g: 255 - _.g, b: 255 - _.b, a: _.a });
        var _;
      }),
      (E.prototype.saturate = function (_) {
        return _ === void 0 && (_ = 0.1), w(M(this.rgba, _));
      }),
      (E.prototype.desaturate = function (_) {
        return _ === void 0 && (_ = 0.1), w(M(this.rgba, -_));
      }),
      (E.prototype.grayscale = function () {
        return w(M(this.rgba, -1));
      }),
      (E.prototype.lighten = function (_) {
        return _ === void 0 && (_ = 0.1), w($(this.rgba, _));
      }),
      (E.prototype.darken = function (_) {
        return _ === void 0 && (_ = 0.1), w($(this.rgba, -_));
      }),
      (E.prototype.rotate = function (_) {
        return _ === void 0 && (_ = 15), this.hue(this.hue() + _);
      }),
      (E.prototype.alpha = function (_) {
        return typeof _ == "number" ? w({ r: (A = this.rgba).r, g: A.g, b: A.b, a: _ }) : n(this.rgba.a, 3);
        var A;
      }),
      (E.prototype.hue = function (_) {
        var A = c(this.rgba);
        return typeof _ == "number" ? w({ h: _, s: A.s, l: A.l, a: A.a }) : n(A.h);
      }),
      (E.prototype.isEqual = function (_) {
        return this.toHex() === w(_).toHex();
      }),
      E
    );
  })(),
  w = function (E) {
    return E instanceof j ? E : new j(E);
  },
  S = [],
  k = function (E) {
    E.forEach(function (_) {
      S.indexOf(_) < 0 && (_(j, y), S.push(_));
    });
  },
  o = function (E) {
    var _ = E / 255;
    return _ < 0.04045 ? _ / 12.92 : Math.pow((_ + 0.055) / 1.055, 2.4);
  },
  t = function (E) {
    return 0.2126 * o(E.r) + 0.7152 * o(E.g) + 0.0722 * o(E.b);
  };
function a11yPlugin(E) {
  (E.prototype.luminance = function () {
    return (
      (_ = t(this.rgba)),
      (A = 2) === void 0 && (A = 0),
      I === void 0 && (I = Math.pow(10, A)),
      Math.round(I * _) / I + 0
    );
    var _, A, I;
  }),
    (E.prototype.contrast = function (_) {
      _ === void 0 && (_ = "#FFF");
      var A,
        I,
        D,
        T,
        C,
        R,
        B,
        P = _ instanceof E ? _ : new E(_);
      return (
        (T = this.rgba),
        (C = P.toRgb()),
        (R = t(T)),
        (B = t(C)),
        (A = R > B ? (R + 0.05) / (B + 0.05) : (B + 0.05) / (R + 0.05)),
        (I = 2) === void 0 && (I = 0),
        D === void 0 && (D = Math.pow(10, I)),
        Math.floor(D * A) / D + 0
      );
    }),
    (E.prototype.isReadable = function (_, A) {
      return (
        _ === void 0 && (_ = "#FFF"),
        A === void 0 && (A = {}),
        this.contrast(_) >=
          ((R = (C = (I = A).size) === void 0 ? "normal" : C),
          (T = (D = I.level) === void 0 ? "AA" : D) === "AAA" && R === "normal"
            ? 7
            : T === "AA" && R === "large"
              ? 3
              : 4.5)
      );
      var I, D, T, C, R;
    });
}
const keyPressed = writable({ ArrowLeft: 0, ArrowUp: 0, ArrowRight: 0, ArrowDown: 0 }),
  keyPressedCustom = derived(keyPressed, (E) => ({
    ...E,
    ArrowV: E.ArrowUp + E.ArrowDown,
    ArrowH: E.ArrowLeft + E.ArrowRight,
    ArrowVH: E.ArrowUp + E.ArrowDown + E.ArrowLeft + E.ArrowRight,
  }));
function easeInOutSin(E, _ = 0.001, A = 0.01) {
  const T = Math.min(1, Math.max(1, E - 50) / 50);
  return _ + ((A - _) / 2) * (1 - Math.cos(Math.PI * T));
}
const Picker_svelte_svelte_type_style_lang = "",
  { window: window_1$2 } = globals;
function create_default_slot$3(E) {
  let _, A, I, D, T, C;
  var R = E[2].pickerIndicator;
  function B(P) {
    return { props: { pos: P[9], isDark: P[5], hex: w({ h: P[3], s: P[0], v: P[1], a: 1 }).toHex() } };
  }
  return (
    R && (A = construct_svelte_component(R, B(E))),
    {
      c() {
        (_ = element("div")), A && create_component(A.$$.fragment), this.h();
      },
      l(P) {
        _ = claim_element(P, "DIV", {
          class: !0,
          tabindex: !0,
          style: !0,
          "aria-label": !0,
          "aria-valuemin": !0,
          "aria-valuemax": !0,
          "aria-valuetext": !0,
        });
        var O = children(_);
        A && claim_component(A.$$.fragment, O), O.forEach(detach), this.h();
      },
      h() {
        var P, O;
        attr(_, "class", "picker svelte-uiwgvv"),
          attr(_, "tabindex", "0"),
          set_style(_, "--color-bg", E[8]),
          attr(_, "aria-label", "saturation and brightness picker (arrow keyboard navigation)"),
          attr(_, "aria-valuemin", 0),
          attr(_, "aria-valuemax", 100),
          attr(
            _,
            "aria-valuetext",
            (I =
              "saturation " +
              ((P = E[9].x) == null ? void 0 : P.toFixed()) +
              "%, brightness " +
              ((O = E[9].y) == null ? void 0 : O.toFixed()) +
              "%"),
          );
      },
      m(P, O) {
        insert_hydration(P, _, O),
          A && mount_component(A, _, null),
          E[18](_),
          (D = !0),
          T ||
            ((C = [
              listen(_, "mousedown", stop_propagation(prevent_default(E[10]))),
              listen(_, "touchstart", E[16]),
              listen(_, "touchmove", stop_propagation(prevent_default(E[16]))),
              listen(_, "touchend", E[16]),
            ]),
            (T = !0));
      },
      p(P, O) {
        var L, U;
        const F = {};
        if (
          (O & 512 && (F.pos = P[9]),
          O & 32 && (F.isDark = P[5]),
          O & 11 && (F.hex = w({ h: P[3], s: P[0], v: P[1], a: 1 }).toHex()),
          R !== (R = P[2].pickerIndicator))
        ) {
          if (A) {
            group_outros();
            const z = A;
            transition_out(z.$$.fragment, 1, 0, () => {
              destroy_component(z, 1);
            }),
              check_outros();
          }
          R
            ? ((A = construct_svelte_component(R, B(P))),
              create_component(A.$$.fragment),
              transition_in(A.$$.fragment, 1),
              mount_component(A, _, null))
            : (A = null);
        } else R && A.$set(F);
        (!D || O & 256) && set_style(_, "--color-bg", P[8]),
          (!D ||
            (O & 512 &&
              I !==
                (I =
                  "saturation " +
                  ((L = P[9].x) == null ? void 0 : L.toFixed()) +
                  "%, brightness " +
                  ((U = P[9].y) == null ? void 0 : U.toFixed()) +
                  "%"))) &&
            attr(_, "aria-valuetext", I);
      },
      i(P) {
        D || (A && transition_in(A.$$.fragment, P), (D = !0));
      },
      o(P) {
        A && transition_out(A.$$.fragment, P), (D = !1);
      },
      d(P) {
        P && detach(_), A && destroy_component(A), E[18](null), (T = !1), run_all(C);
      },
    }
  );
}
function create_fragment$r(E) {
  let _, A, I, D, T;
  var C = E[2].pickerWrapper;
  function R(B) {
    return {
      props: { focused: B[7], toRight: B[4], $$slots: { default: [create_default_slot$3] }, $$scope: { ctx: B } },
    };
  }
  return (
    C && (_ = construct_svelte_component(C, R(E))),
    {
      c() {
        _ && create_component(_.$$.fragment), (A = empty$1());
      },
      l(B) {
        _ && claim_component(_.$$.fragment, B), (A = empty$1());
      },
      m(B, P) {
        _ && mount_component(_, B, P),
          insert_hydration(B, A, P),
          (I = !0),
          D ||
            ((T = [
              listen(window_1$2, "mouseup", E[11]),
              listen(window_1$2, "mousedown", E[13]),
              listen(window_1$2, "mousemove", E[12]),
              listen(window_1$2, "keyup", E[14]),
              listen(window_1$2, "keydown", E[15]),
            ]),
            (D = !0));
      },
      p(B, [P]) {
        const O = {};
        if (
          (P & 128 && (O.focused = B[7]),
          P & 16 && (O.toRight = B[4]),
          P & 67109743 && (O.$$scope = { dirty: P, ctx: B }),
          C !== (C = B[2].pickerWrapper))
        ) {
          if (_) {
            group_outros();
            const F = _;
            transition_out(F.$$.fragment, 1, 0, () => {
              destroy_component(F, 1);
            }),
              check_outros();
          }
          C
            ? ((_ = construct_svelte_component(C, R(B))),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, A.parentNode, A))
            : (_ = null);
        } else C && _.$set(O);
      },
      i(B) {
        I || (_ && transition_in(_.$$.fragment, B), (I = !0));
      },
      o(B) {
        _ && transition_out(_.$$.fragment, B), (I = !1);
      },
      d(B) {
        B && detach(A), _ && destroy_component(_, B), (D = !1), run_all(T);
      },
    }
  );
}
function clamp(E, _, A) {
  return Math.min(Math.max(_, E), A);
}
function instance$r(E, _, A) {
  let I, D;
  component_subscribe(E, keyPressed, (ie) => A(22, (I = ie))),
    component_subscribe(E, keyPressedCustom, (ie) => A(23, (D = ie)));
  let { components: T } = _,
    { h: C } = _,
    { s: R } = _,
    { v: B } = _,
    { isOpen: P } = _,
    { toRight: O } = _,
    { isDark: F } = _,
    L,
    U = !1,
    z = !1,
    V,
    X,
    G,
    Z = { x: 100, y: 0 };
  function Y(ie) {
    let se = { x: ie.offsetX, y: ie.offsetY },
      oe = L.getBoundingClientRect().width,
      _e = L.getBoundingClientRect().height;
    A(0, (R = clamp(se.x / oe, 0, 1) * 100)), A(1, (B = clamp((_e - se.y) / _e, 0, 1) * 100));
  }
  function q(ie) {
    ie.button === 0 && ((U = !0), Y(ie));
  }
  function W() {
    U = !1;
  }
  function ee(ie) {
    U &&
      Y({
        offsetX: Math.max(0, Math.min(L.getBoundingClientRect().width, ie.clientX - L.getBoundingClientRect().left)),
        offsetY: Math.max(0, Math.min(L.getBoundingClientRect().height, ie.clientY - L.getBoundingClientRect().top)),
      });
  }
  function te(ie) {
    ie.target.isSameNode(L) || A(7, (z = !1));
  }
  function Q(ie) {
    var se;
    ie.key === "Tab" && A(7, (z = !!((se = document.activeElement) != null && se.isSameNode(L)))),
      !ie.repeat && z && K();
  }
  function J(ie) {
    z && D.ArrowVH && (ie.preventDefault(), ie.repeat || K());
  }
  function K() {
    D.ArrowVH
      ? V ||
        ((X = 0),
        (V = window.setInterval(() => {
          let ie = easeInOutSin(++X);
          A(0, (R = Math.min(100, Math.max(0, R + (I.ArrowRight - I.ArrowLeft) * ie * 100)))),
            A(1, (B = Math.min(100, Math.max(0, B + (I.ArrowUp - I.ArrowDown) * ie * 100))));
        }, 10)))
      : V && (clearInterval(V), (V = void 0));
  }
  function ne(ie) {
    ie.preventDefault(),
      Y({
        offsetX: ie.changedTouches[0].clientX - L.getBoundingClientRect().left,
        offsetY: ie.changedTouches[0].clientY - L.getBoundingClientRect().top,
      });
  }
  function re(ie) {
    binding_callbacks[ie ? "unshift" : "push"](() => {
      (L = ie), A(6, L);
    });
  }
  return (
    (E.$$set = (ie) => {
      "components" in ie && A(2, (T = ie.components)),
        "h" in ie && A(3, (C = ie.h)),
        "s" in ie && A(0, (R = ie.s)),
        "v" in ie && A(1, (B = ie.v)),
        "isOpen" in ie && A(17, (P = ie.isOpen)),
        "toRight" in ie && A(4, (O = ie.toRight)),
        "isDark" in ie && A(5, (F = ie.isDark));
    }),
    (E.$$.update = () => {
      E.$$.dirty & 8 && typeof C == "number" && A(8, (G = w({ h: C, s: 100, v: 100, a: 1 }).toHex())),
        E.$$.dirty & 67 && typeof R == "number" && typeof B == "number" && L && A(9, (Z = { x: R, y: 100 - B }));
    }),
    [R, B, T, C, O, F, L, z, G, Z, q, W, ee, te, Q, J, ne, P, re]
  );
}
class Picker extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$r, create_fragment$r, safe_not_equal, {
        components: 2,
        h: 3,
        s: 0,
        v: 1,
        isOpen: 17,
        toRight: 4,
        isDark: 5,
      });
  }
}
const Slider_svelte_svelte_type_style_lang = "",
  { window: window_1$1 } = globals;
function create_default_slot$2(E) {
  let _, A, I, D, T, C;
  var R = E[1].sliderIndicator;
  function B(P) {
    return { props: { pos: P[4], toRight: P[2] } };
  }
  return (
    R && (A = construct_svelte_component(R, B(E))),
    {
      c() {
        (_ = element("div")), A && create_component(A.$$.fragment), this.h();
      },
      l(P) {
        _ = claim_element(P, "DIV", {
          class: !0,
          tabindex: !0,
          "aria-label": !0,
          "aria-valuemin": !0,
          "aria-valuemax": !0,
          "aria-valuenow": !0,
        });
        var O = children(_);
        A && claim_component(A.$$.fragment, O), O.forEach(detach), this.h();
      },
      h() {
        attr(_, "class", "slider svelte-14nweqy"),
          attr(_, "tabindex", "0"),
          attr(_, "aria-label", "hue picker (arrow keyboard navigation)"),
          attr(_, "aria-valuemin", 0),
          attr(_, "aria-valuemax", 360),
          attr(_, "aria-valuenow", (I = Math.round(E[0]))),
          toggle_class(_, "to-right", E[2]);
      },
      m(P, O) {
        insert_hydration(P, _, O),
          A && mount_component(A, _, null),
          E[12](_),
          (D = !0),
          T ||
            ((C = [
              listen(_, "mousedown", stop_propagation(prevent_default(E[6]))),
              listen(_, "touchstart", E[11]),
              listen(_, "touchmove", stop_propagation(prevent_default(E[11]))),
              listen(_, "touchend", E[11]),
            ]),
            (T = !0));
      },
      p(P, O) {
        const F = {};
        if ((O & 16 && (F.pos = P[4]), O & 4 && (F.toRight = P[2]), R !== (R = P[1].sliderIndicator))) {
          if (A) {
            group_outros();
            const L = A;
            transition_out(L.$$.fragment, 1, 0, () => {
              destroy_component(L, 1);
            }),
              check_outros();
          }
          R
            ? ((A = construct_svelte_component(R, B(P))),
              create_component(A.$$.fragment),
              transition_in(A.$$.fragment, 1),
              mount_component(A, _, null))
            : (A = null);
        } else R && A.$set(F);
        (!D || (O & 1 && I !== (I = Math.round(P[0])))) && attr(_, "aria-valuenow", I),
          (!D || O & 4) && toggle_class(_, "to-right", P[2]);
      },
      i(P) {
        D || (A && transition_in(A.$$.fragment, P), (D = !0));
      },
      o(P) {
        A && transition_out(A.$$.fragment, P), (D = !1);
      },
      d(P) {
        P && detach(_), A && destroy_component(A), E[12](null), (T = !1), run_all(C);
      },
    }
  );
}
function create_fragment$q(E) {
  let _, A, I, D, T;
  var C = E[1].sliderWrapper;
  function R(B) {
    return {
      props: { focused: B[5], toRight: B[2], $$slots: { default: [create_default_slot$2] }, $$scope: { ctx: B } },
    };
  }
  return (
    C && (_ = construct_svelte_component(C, R(E))),
    {
      c() {
        _ && create_component(_.$$.fragment), (A = empty$1());
      },
      l(B) {
        _ && claim_component(_.$$.fragment, B), (A = empty$1());
      },
      m(B, P) {
        _ && mount_component(_, B, P),
          insert_hydration(B, A, P),
          (I = !0),
          D ||
            ((T = [
              listen(window_1$1, "mouseup", E[7]),
              listen(window_1$1, "mousemove", E[8]),
              listen(window_1$1, "keyup", E[9]),
              listen(window_1$1, "keydown", E[10]),
            ]),
            (D = !0));
      },
      p(B, [P]) {
        const O = {};
        if (
          (P & 32 && (O.focused = B[5]),
          P & 4 && (O.toRight = B[2]),
          P & 1048607 && (O.$$scope = { dirty: P, ctx: B }),
          C !== (C = B[1].sliderWrapper))
        ) {
          if (_) {
            group_outros();
            const F = _;
            transition_out(F.$$.fragment, 1, 0, () => {
              destroy_component(F, 1);
            }),
              check_outros();
          }
          C
            ? ((_ = construct_svelte_component(C, R(B))),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, A.parentNode, A))
            : (_ = null);
        } else C && _.$set(O);
      },
      i(B) {
        I || (_ && transition_in(_.$$.fragment, B), (I = !0));
      },
      o(B) {
        _ && transition_out(_.$$.fragment, B), (I = !1);
      },
      d(B) {
        B && detach(A), _ && destroy_component(_, B), (D = !1), run_all(T);
      },
    }
  );
}
function instance$q(E, _, A) {
  let I, D;
  component_subscribe(E, keyPressed, (te) => A(16, (I = te))),
    component_subscribe(E, keyPressedCustom, (te) => A(17, (D = te)));
  let { components: T } = _,
    { toRight: C } = _,
    R,
    B = !1,
    { h: P } = _,
    O = 0,
    F = !1,
    L,
    U;
  function z(te) {
    const Q = C ? R.getBoundingClientRect().width : R.getBoundingClientRect().height,
      J = Math.max(0, Math.min(Q, te));
    A(0, (P = (J / Q) * 360));
  }
  function V(te) {
    te.button === 0 && ((B = !0), z(C ? te.offsetX : te.offsetY));
  }
  function X() {
    B = !1;
  }
  function G(te) {
    B && z(C ? te.clientX - R.getBoundingClientRect().left : te.clientY - R.getBoundingClientRect().top);
  }
  function Z(te) {
    var Q;
    te.key === "Tab" && A(5, (F = !!((Q = document.activeElement) != null && Q.isSameNode(R)))), !te.repeat && F && q();
  }
  function Y(te) {
    F && D.ArrowVH && (te.preventDefault(), te.repeat || q());
  }
  function q() {
    D.ArrowVH
      ? L ||
        ((U = 0),
        (L = window.setInterval(() => {
          const te = easeInOutSin(++U),
            Q = C ? I.ArrowRight - I.ArrowLeft : I.ArrowDown - I.ArrowUp;
          A(0, (P = Math.min(360, Math.max(0, P + Q * 360 * te))));
        }, 10)))
      : L && (clearInterval(L), (L = void 0));
  }
  function W(te) {
    te.preventDefault(),
      z(
        C
          ? te.changedTouches[0].clientX - R.getBoundingClientRect().left
          : te.changedTouches[0].clientY - R.getBoundingClientRect().top,
      );
  }
  function ee(te) {
    binding_callbacks[te ? "unshift" : "push"](() => {
      (R = te), A(3, R);
    });
  }
  return (
    (E.$$set = (te) => {
      "components" in te && A(1, (T = te.components)),
        "toRight" in te && A(2, (C = te.toRight)),
        "h" in te && A(0, (P = te.h));
    }),
    (E.$$.update = () => {
      E.$$.dirty & 9 && typeof P == "number" && R && A(4, (O = (100 * P) / 360));
    }),
    [P, T, C, R, O, F, V, X, G, Z, Y, W, ee]
  );
}
class Slider extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$q, create_fragment$q, safe_not_equal, { components: 1, toRight: 2, h: 0 });
  }
}
const Alpha_svelte_svelte_type_style_lang = "",
  { window: window_1 } = globals;
function create_default_slot$1(E) {
  let _, A, I, D, T, C, R;
  var B = E[0].alphaIndicator;
  function P(O) {
    return { props: { pos: O[5], toRight: O[2] } };
  }
  return (
    B && (A = construct_svelte_component(B, P(E))),
    {
      c() {
        (_ = element("div")), A && create_component(A.$$.fragment), this.h();
      },
      l(O) {
        _ = claim_element(O, "DIV", {
          class: !0,
          tabindex: !0,
          style: !0,
          "aria-label": !0,
          "aria-valuemin": !0,
          "aria-valuemax": !0,
          "aria-valuenow": !0,
          "aria-valuetext": !0,
        });
        var F = children(_);
        A && claim_component(A.$$.fragment, F), F.forEach(detach), this.h();
      },
      h() {
        var O, F;
        attr(_, "class", "alpha svelte-1526m2d"),
          attr(_, "tabindex", "0"),
          set_style(_, "--alpha-color", (O = E[1]) == null ? void 0 : O.substring(0, 7)),
          attr(_, "aria-label", "transparency picker (arrow keyboard navigation)"),
          attr(_, "aria-valuemin", 0),
          attr(_, "aria-valuemax", 100),
          attr(_, "aria-valuenow", (I = Math.round(E[5]))),
          attr(_, "aria-valuetext", (D = ((F = E[5]) == null ? void 0 : F.toFixed()) + "%")),
          toggle_class(_, "to-right", E[2]);
      },
      m(O, F) {
        insert_hydration(O, _, F),
          A && mount_component(A, _, null),
          E[14](_),
          (T = !0),
          C ||
            ((R = [
              listen(_, "mousedown", stop_propagation(prevent_default(E[6]))),
              listen(_, "touchstart", E[11]),
              listen(_, "touchmove", stop_propagation(prevent_default(E[11]))),
              listen(_, "touchend", E[11]),
            ]),
            (C = !0));
      },
      p(O, F) {
        var U, z;
        const L = {};
        if ((F & 32 && (L.pos = O[5]), F & 4 && (L.toRight = O[2]), B !== (B = O[0].alphaIndicator))) {
          if (A) {
            group_outros();
            const V = A;
            transition_out(V.$$.fragment, 1, 0, () => {
              destroy_component(V, 1);
            }),
              check_outros();
          }
          B
            ? ((A = construct_svelte_component(B, P(O))),
              create_component(A.$$.fragment),
              transition_in(A.$$.fragment, 1),
              mount_component(A, _, null))
            : (A = null);
        } else B && A.$set(L);
        (!T || F & 2) && set_style(_, "--alpha-color", (U = O[1]) == null ? void 0 : U.substring(0, 7)),
          (!T || (F & 32 && I !== (I = Math.round(O[5])))) && attr(_, "aria-valuenow", I),
          (!T || (F & 32 && D !== (D = ((z = O[5]) == null ? void 0 : z.toFixed()) + "%"))) &&
            attr(_, "aria-valuetext", D),
          (!T || F & 4) && toggle_class(_, "to-right", O[2]);
      },
      i(O) {
        T || (A && transition_in(A.$$.fragment, O), (T = !0));
      },
      o(O) {
        A && transition_out(A.$$.fragment, O), (T = !1);
      },
      d(O) {
        O && detach(_), A && destroy_component(A), E[14](null), (C = !1), run_all(R);
      },
    }
  );
}
function create_fragment$p(E) {
  let _, A, I, D, T;
  var C = E[0].alphaWrapper;
  function R(B) {
    return {
      props: { focused: B[4], toRight: B[2], $$slots: { default: [create_default_slot$1] }, $$scope: { ctx: B } },
    };
  }
  return (
    C && (_ = construct_svelte_component(C, R(E))),
    {
      c() {
        _ && create_component(_.$$.fragment), (A = empty$1());
      },
      l(B) {
        _ && claim_component(_.$$.fragment, B), (A = empty$1());
      },
      m(B, P) {
        _ && mount_component(_, B, P),
          insert_hydration(B, A, P),
          (I = !0),
          D ||
            ((T = [
              listen(window_1, "mouseup", E[7]),
              listen(window_1, "mousemove", E[8]),
              listen(window_1, "keyup", E[9]),
              listen(window_1, "keydown", E[10]),
            ]),
            (D = !0));
      },
      p(B, [P]) {
        const O = {};
        if (
          (P & 16 && (O.focused = B[4]),
          P & 4 && (O.toRight = B[2]),
          P & 4194351 && (O.$$scope = { dirty: P, ctx: B }),
          C !== (C = B[0].alphaWrapper))
        ) {
          if (_) {
            group_outros();
            const F = _;
            transition_out(F.$$.fragment, 1, 0, () => {
              destroy_component(F, 1);
            }),
              check_outros();
          }
          C
            ? ((_ = construct_svelte_component(C, R(B))),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, A.parentNode, A))
            : (_ = null);
        } else C && _.$set(O);
      },
      i(B) {
        I || (_ && transition_in(_.$$.fragment, B), (I = !0));
      },
      o(B) {
        _ && transition_out(_.$$.fragment, B), (I = !1);
      },
      d(B) {
        B && detach(A), _ && destroy_component(_, B), (D = !1), run_all(T);
      },
    }
  );
}
function instance$p(E, _, A) {
  let I, D;
  component_subscribe(E, keyPressed, (J) => A(18, (I = J))),
    component_subscribe(E, keyPressedCustom, (J) => A(19, (D = J)));
  let { components: T } = _,
    { isOpen: C } = _,
    { a: R = 1 } = _,
    { hex: B } = _,
    { toRight: P } = _,
    O,
    F = !1,
    L = !1,
    U,
    z,
    V;
  function X(J) {
    const K = P ? O.getBoundingClientRect().width : O.getBoundingClientRect().height,
      ne = Math.max(0, Math.min(K, J));
    A(12, (R = ne / K));
  }
  function G(J) {
    J.button === 0 && ((F = !0), X(P ? J.offsetX : J.offsetY));
  }
  function Z() {
    F = !1;
  }
  function Y(J) {
    F && X(P ? J.clientX - O.getBoundingClientRect().left : J.clientY - O.getBoundingClientRect().top);
  }
  function q(J) {
    var K;
    J.key === "Tab" && A(4, (L = !!((K = document.activeElement) != null && K.isSameNode(O)))), !J.repeat && L && ee();
  }
  function W(J) {
    L && D.ArrowVH && (J.preventDefault(), J.repeat || ee());
  }
  function ee() {
    D.ArrowVH
      ? U ||
        ((z = 0),
        (U = window.setInterval(() => {
          const J = easeInOutSin(++z),
            K = P ? I.ArrowRight - I.ArrowLeft : I.ArrowDown - I.ArrowUp;
          A(12, (R = Math.min(1, Math.max(0, R + K * J))));
        }, 10)))
      : U && (clearInterval(U), (U = void 0));
  }
  function te(J) {
    J.preventDefault(),
      X(
        P
          ? J.changedTouches[0].clientX - O.getBoundingClientRect().left
          : J.changedTouches[0].clientY - O.getBoundingClientRect().top,
      );
  }
  function Q(J) {
    binding_callbacks[J ? "unshift" : "push"](() => {
      (O = J), A(3, O);
    });
  }
  return (
    (E.$$set = (J) => {
      "components" in J && A(0, (T = J.components)),
        "isOpen" in J && A(13, (C = J.isOpen)),
        "a" in J && A(12, (R = J.a)),
        "hex" in J && A(1, (B = J.hex)),
        "toRight" in J && A(2, (P = J.toRight));
    }),
    (E.$$.update = () => {
      E.$$.dirty & 4104 && typeof R == "number" && O && A(5, (V = 100 * R));
    }),
    [T, B, P, O, L, V, G, Z, Y, q, W, te, R, C, Q]
  );
}
class Alpha extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$p, create_fragment$p, safe_not_equal, {
        components: 0,
        isOpen: 13,
        a: 12,
        hex: 1,
        toRight: 2,
      });
  }
}
const TextInput_svelte_svelte_type_style_lang = "";
function create_else_block$2(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O = E[2] && create_if_block_5$1(E);
  return {
    c() {
      (_ = element("div")),
        (A = element("input")),
        (I = space()),
        (D = element("input")),
        (T = space()),
        (C = element("input")),
        (R = space()),
        O && O.c(),
        this.h();
    },
    l(F) {
      _ = claim_element(F, "DIV", { class: !0 });
      var L = children(_);
      (A = claim_element(L, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, class: !0 })),
        (I = claim_space(L)),
        (D = claim_element(L, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, class: !0 })),
        (T = claim_space(L)),
        (C = claim_element(L, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, class: !0 })),
        (R = claim_space(L)),
        O && O.l(L),
        L.forEach(detach),
        this.h();
    },
    h() {
      attr(A, "aria-label", "hue chanel color"),
        (A.value = E[8]),
        attr(A, "type", "number"),
        attr(A, "min", "0"),
        attr(A, "max", "360"),
        attr(A, "class", "svelte-1b4xzyy"),
        attr(D, "aria-label", "saturation chanel color"),
        (D.value = E[7]),
        attr(D, "type", "number"),
        attr(D, "min", "0"),
        attr(D, "max", "100"),
        attr(D, "class", "svelte-1b4xzyy"),
        attr(C, "aria-label", "brightness chanel color"),
        (C.value = E[6]),
        attr(C, "type", "number"),
        attr(C, "min", "0"),
        attr(C, "max", "100"),
        attr(C, "class", "svelte-1b4xzyy"),
        attr(_, "class", "input-container svelte-1b4xzyy");
    },
    m(F, L) {
      insert_hydration(F, _, L),
        append_hydration(_, A),
        append_hydration(_, I),
        append_hydration(_, D),
        append_hydration(_, T),
        append_hydration(_, C),
        append_hydration(_, R),
        O && O.m(_, null),
        B ||
          ((P = [listen(A, "input", E[12]("h")), listen(D, "input", E[12]("s")), listen(C, "input", E[12]("v"))]),
          (B = !0));
    },
    p(F, L) {
      L & 256 && A.value !== F[8] && (A.value = F[8]),
        L & 128 && D.value !== F[7] && (D.value = F[7]),
        L & 64 && C.value !== F[6] && (C.value = F[6]),
        F[2] ? (O ? O.p(F, L) : ((O = create_if_block_5$1(F)), O.c(), O.m(_, null))) : O && (O.d(1), (O = null));
    },
    d(F) {
      F && detach(_), O && O.d(), (B = !1), run_all(P);
    },
  };
}
function create_if_block_3$2(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U = E[2] && create_if_block_4$1(E);
  return {
    c() {
      (_ = element("div")),
        (A = element("input")),
        (D = space()),
        (T = element("input")),
        (R = space()),
        (B = element("input")),
        (O = space()),
        U && U.c(),
        this.h();
    },
    l(z) {
      _ = claim_element(z, "DIV", { class: !0 });
      var V = children(_);
      (A = claim_element(V, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, class: !0 })),
        (D = claim_space(V)),
        (T = claim_element(V, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, class: !0 })),
        (R = claim_space(V)),
        (B = claim_element(V, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, class: !0 })),
        (O = claim_space(V)),
        U && U.l(V),
        V.forEach(detach),
        this.h();
    },
    h() {
      attr(A, "aria-label", "red chanel color"),
        (A.value = I = E[0].r),
        attr(A, "type", "number"),
        attr(A, "min", "0"),
        attr(A, "max", "255"),
        attr(A, "class", "svelte-1b4xzyy"),
        attr(T, "aria-label", "green chanel color"),
        (T.value = C = E[0].g),
        attr(T, "type", "number"),
        attr(T, "min", "0"),
        attr(T, "max", "255"),
        attr(T, "class", "svelte-1b4xzyy"),
        attr(B, "aria-label", "blue chanel color"),
        (B.value = P = E[0].b),
        attr(B, "type", "number"),
        attr(B, "min", "0"),
        attr(B, "max", "255"),
        attr(B, "class", "svelte-1b4xzyy"),
        attr(_, "class", "input-container svelte-1b4xzyy");
    },
    m(z, V) {
      insert_hydration(z, _, V),
        append_hydration(_, A),
        append_hydration(_, D),
        append_hydration(_, T),
        append_hydration(_, R),
        append_hydration(_, B),
        append_hydration(_, O),
        U && U.m(_, null),
        F ||
          ((L = [listen(A, "input", E[11]("r")), listen(T, "input", E[11]("g")), listen(B, "input", E[11]("b"))]),
          (F = !0));
    },
    p(z, V) {
      V & 1 && I !== (I = z[0].r) && A.value !== I && (A.value = I),
        V & 1 && C !== (C = z[0].g) && T.value !== C && (T.value = C),
        V & 1 && P !== (P = z[0].b) && B.value !== P && (B.value = P),
        z[2] ? (U ? U.p(z, V) : ((U = create_if_block_4$1(z)), U.c(), U.m(_, null))) : U && (U.d(1), (U = null));
    },
    d(z) {
      z && detach(_), U && U.d(), (F = !1), run_all(L);
    },
  };
}
function create_if_block_1$2(E) {
  let _,
    A,
    I,
    D,
    T,
    C = E[2] && create_if_block_2$2(E);
  return {
    c() {
      (_ = element("div")), (A = element("input")), (I = space()), C && C.c(), this.h();
    },
    l(R) {
      _ = claim_element(R, "DIV", { class: !0 });
      var B = children(_);
      (A = claim_element(B, "INPUT", { style: !0, class: !0 })),
        (I = claim_space(B)),
        C && C.l(B),
        B.forEach(detach),
        this.h();
    },
    h() {
      (A.value = E[1]),
        set_style(A, "flex", "3"),
        attr(A, "class", "svelte-1b4xzyy"),
        attr(_, "class", "input-container svelte-1b4xzyy");
    },
    m(R, B) {
      insert_hydration(R, _, B),
        append_hydration(_, A),
        append_hydration(_, I),
        C && C.m(_, null),
        D || ((T = listen(A, "input", E[10])), (D = !0));
    },
    p(R, B) {
      B & 2 && A.value !== R[1] && (A.value = R[1]),
        R[2] ? (C ? C.p(R, B) : ((C = create_if_block_2$2(R)), C.c(), C.m(_, null))) : C && (C.d(1), (C = null));
    },
    d(R) {
      R && detach(_), C && C.d(), (D = !1), T();
    },
  };
}
function create_if_block_5$1(E) {
  let _, A, I;
  return {
    c() {
      (_ = element("input")), this.h();
    },
    l(D) {
      (_ = claim_element(D, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, step: !0, class: !0 })), this.h();
    },
    h() {
      attr(_, "aria-label", "transparency chanel color"),
        (_.value = E[5]),
        attr(_, "type", "number"),
        attr(_, "min", "0"),
        attr(_, "max", "1"),
        attr(_, "step", "0.01"),
        attr(_, "class", "svelte-1b4xzyy");
    },
    m(D, T) {
      insert_hydration(D, _, T), A || ((I = listen(_, "input", E[12]("a"))), (A = !0));
    },
    p(D, T) {
      T & 32 && _.value !== D[5] && (_.value = D[5]);
    },
    d(D) {
      D && detach(_), (A = !1), I();
    },
  };
}
function create_if_block_4$1(E) {
  let _, A, I;
  return {
    c() {
      (_ = element("input")), this.h();
    },
    l(D) {
      (_ = claim_element(D, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, step: !0, class: !0 })), this.h();
    },
    h() {
      attr(_, "aria-label", "transparency chanel color"),
        (_.value = E[5]),
        attr(_, "type", "number"),
        attr(_, "min", "0"),
        attr(_, "max", "1"),
        attr(_, "step", "0.01"),
        attr(_, "class", "svelte-1b4xzyy");
    },
    m(D, T) {
      insert_hydration(D, _, T), A || ((I = listen(_, "input", E[11]("a"))), (A = !0));
    },
    p(D, T) {
      T & 32 && _.value !== D[5] && (_.value = D[5]);
    },
    d(D) {
      D && detach(_), (A = !1), I();
    },
  };
}
function create_if_block_2$2(E) {
  let _, A, I;
  return {
    c() {
      (_ = element("input")), this.h();
    },
    l(D) {
      (_ = claim_element(D, "INPUT", { "aria-label": !0, type: !0, min: !0, max: !0, step: !0, class: !0 })), this.h();
    },
    h() {
      attr(_, "aria-label", "hexadecimal color"),
        (_.value = E[5]),
        attr(_, "type", "number"),
        attr(_, "min", "0"),
        attr(_, "max", "1"),
        attr(_, "step", "0.01"),
        attr(_, "class", "svelte-1b4xzyy");
    },
    m(D, T) {
      insert_hydration(D, _, T), A || ((I = listen(_, "input", E[11]("a"))), (A = !0));
    },
    p(D, T) {
      T & 32 && _.value !== D[5] && (_.value = D[5]);
    },
    d(D) {
      D && detach(_), (A = !1), I();
    },
  };
}
function create_if_block$3(E) {
  let _,
    A = E[9][E[4]] + "",
    I,
    D,
    T,
    C;
  return {
    c() {
      (_ = element("button")), (I = text(A)), this.h();
    },
    l(R) {
      _ = claim_element(R, "BUTTON", { "aria-label": !0, class: !0 });
      var B = children(_);
      (I = claim_text(B, A)), B.forEach(detach), this.h();
    },
    h() {
      attr(_, "aria-label", (D = "change inputs to " + E[9][(E[4] + 1) % 3])), attr(_, "class", "svelte-1b4xzyy");
    },
    m(R, B) {
      insert_hydration(R, _, B), append_hydration(_, I), T || ((C = listen(_, "click", E[14])), (T = !0));
    },
    p(R, B) {
      B & 16 && A !== (A = R[9][R[4]] + "") && set_data(I, A),
        B & 16 && D !== (D = "change inputs to " + R[9][(R[4] + 1) % 3]) && attr(_, "aria-label", D);
    },
    d(R) {
      R && detach(_), (T = !1), C();
    },
  };
}
function create_fragment$o(E) {
  let _, A;
  function I(R, B) {
    return R[4] === 0 ? create_if_block_1$2 : R[4] === 1 ? create_if_block_3$2 : create_else_block$2;
  }
  let D = I(E),
    T = D(E),
    C = E[3] && create_if_block$3(E);
  return {
    c() {
      (_ = element("div")), T.c(), (A = space()), C && C.c(), this.h();
    },
    l(R) {
      _ = claim_element(R, "DIV", { class: !0 });
      var B = children(_);
      T.l(B), (A = claim_space(B)), C && C.l(B), B.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "text-input svelte-1b4xzyy");
    },
    m(R, B) {
      insert_hydration(R, _, B), T.m(_, null), append_hydration(_, A), C && C.m(_, null);
    },
    p(R, [B]) {
      D === (D = I(R)) && T ? T.p(R, B) : (T.d(1), (T = D(R)), T && (T.c(), T.m(_, A))),
        R[3] ? (C ? C.p(R, B) : ((C = create_if_block$3(R)), C.c(), C.m(_, null))) : C && (C.d(1), (C = null));
    },
    i: noop,
    o: noop,
    d(R) {
      R && detach(_), T.d(), C && C.d();
    },
  };
}
const HEX_COLOR_REGEX = /^#?([A-F0-9]{6}|[A-F0-9]{8})$/i;
function instance$o(E, _, A) {
  let I,
    D,
    T,
    C,
    { isAlpha: R } = _,
    { rgb: B } = _,
    { hsv: P } = _,
    { hex: O } = _,
    { canChangeMode: F } = _;
  const L = ["HEX", "RGB", "HSV"];
  let U = 0;
  function z(Z) {
    const Y = Z.target;
    HEX_COLOR_REGEX.test(Y.value) && A(1, (O = Y.value));
  }
  function V(Z) {
    return function (Y) {
      A(0, (B = { ...B, [Z]: parseFloat(Y.target.value) }));
    };
  }
  function X(Z) {
    return function (Y) {
      A(13, (P = { ...P, [Z]: parseFloat(Y.target.value) }));
    };
  }
  const G = () => A(4, (U = (U + 1) % 3));
  return (
    (E.$$set = (Z) => {
      "isAlpha" in Z && A(2, (R = Z.isAlpha)),
        "rgb" in Z && A(0, (B = Z.rgb)),
        "hsv" in Z && A(13, (P = Z.hsv)),
        "hex" in Z && A(1, (O = Z.hex)),
        "canChangeMode" in Z && A(3, (F = Z.canChangeMode));
    }),
    (E.$$.update = () => {
      E.$$.dirty & 8192 && A(8, (I = Math.round(P.h))),
        E.$$.dirty & 8192 && A(7, (D = Math.round(P.s))),
        E.$$.dirty & 8192 && A(6, (T = Math.round(P.v))),
        E.$$.dirty & 8192 && A(5, (C = P.a === void 0 ? 1 : Math.round(P.a * 100) / 100));
    }),
    [B, O, R, F, U, C, T, D, I, L, z, V, X, P, G]
  );
}
class TextInput extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$o, create_fragment$o, safe_not_equal, {
        isAlpha: 2,
        rgb: 0,
        hsv: 13,
        hex: 1,
        canChangeMode: 3,
      });
  }
}
const SliderIndicator_svelte_svelte_type_style_lang$1 = "";
function create_fragment$n(E) {
  let _, A;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(I) {
      (_ = claim_element(I, "DIV", { class: !0, style: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "slider-indicator svelte-116g3i1"),
        attr(_, "style", (A = `top: calc(${(E[0] / 200) * 186}% + 2px);`));
    },
    m(I, D) {
      insert_hydration(I, _, D);
    },
    p(I, [D]) {
      D & 1 && A !== (A = `top: calc(${(I[0] / 200) * 186}% + 2px);`) && attr(_, "style", A);
    },
    i: noop,
    o: noop,
    d(I) {
      I && detach(_);
    },
  };
}
function instance$n(E, _, A) {
  let { pos: I } = _,
    { toRight: D } = _;
  return (
    (E.$$set = (T) => {
      "pos" in T && A(0, (I = T.pos)), "toRight" in T && A(1, (D = T.toRight));
    }),
    [I, D]
  );
}
let SliderIndicator$1 = class extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$n, create_fragment$n, safe_not_equal, { pos: 0, toRight: 1 });
  }
};
const PickerIndicator_svelte_svelte_type_style_lang$1 = "";
function create_fragment$m(E) {
  let _, A;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(I) {
      (_ = claim_element(I, "DIV", { class: !0, style: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "picker-indicator svelte-1nw247x"),
        attr(
          _,
          "style",
          (A = `left: calc(${(E[0].x / 200) * 186}% + 2px); top: calc(${(E[0].y / 200) * 186}% + 2px); box-shadow: 0 0 4px ${E[1] ? "white" : "black"};`),
        );
    },
    m(I, D) {
      insert_hydration(I, _, D);
    },
    p(I, [D]) {
      D & 3 &&
        A !==
          (A = `left: calc(${(I[0].x / 200) * 186}% + 2px); top: calc(${(I[0].y / 200) * 186}% + 2px); box-shadow: 0 0 4px ${I[1] ? "white" : "black"};`) &&
        attr(_, "style", A);
    },
    i: noop,
    o: noop,
    d(I) {
      I && detach(_);
    },
  };
}
function instance$m(E, _, A) {
  let { pos: I } = _,
    { hex: D } = _,
    { isDark: T } = _;
  return (
    (E.$$set = (C) => {
      "pos" in C && A(0, (I = C.pos)), "hex" in C && A(2, (D = C.hex)), "isDark" in C && A(1, (T = C.isDark));
    }),
    [I, T, D]
  );
}
let PickerIndicator$1 = class extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$m, create_fragment$m, safe_not_equal, { pos: 0, hex: 2, isDark: 1 });
  }
};
function create_fragment$l(E) {
  let _, A;
  return {
    c: noop,
    l: noop,
    m(I, D) {
      _ || ((A = [listen(window, "keyup", E[0]), listen(window, "keydown", E[1])]), (_ = !0));
    },
    p: noop,
    i: noop,
    o: noop,
    d(I) {
      (_ = !1), run_all(A);
    },
  };
}
function instance$l(E, _, A) {
  let I;
  component_subscribe(E, keyPressed, (C) => A(2, (I = C)));
  function D(C) {
    ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(C.key) &&
      (set_store_value(keyPressed, (I[C.key] = 0), I), keyPressed.set(I));
  }
  function T(C) {
    ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(C.key) &&
      (C.repeat || (set_store_value(keyPressed, (I[C.key] = 1), I), keyPressed.set(I)));
  }
  return [D, T];
}
class ArrowKeyHandler extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$l, create_fragment$l, safe_not_equal, {});
  }
}
const PickerWrapper_svelte_svelte_type_style_lang$1 = "";
function create_fragment$k(E) {
  let _, A;
  const I = E[3].default,
    D = create_slot(I, E, E[2], null);
  return {
    c() {
      (_ = element("div")), D && D.c(), this.h();
    },
    l(T) {
      _ = claim_element(T, "DIV", { class: !0 });
      var C = children(_);
      D && D.l(C), C.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "picker-wrapper svelte-1isc651"), toggle_class(_, "focused", E[0]);
    },
    m(T, C) {
      insert_hydration(T, _, C), D && D.m(_, null), (A = !0);
    },
    p(T, [C]) {
      D &&
        D.p &&
        (!A || C & 4) &&
        update_slot_base(D, I, T, T[2], A ? get_slot_changes(I, T[2], C, null) : get_all_dirty_from_scope(T[2]), null),
        (!A || C & 1) && toggle_class(_, "focused", T[0]);
    },
    i(T) {
      A || (transition_in(D, T), (A = !0));
    },
    o(T) {
      transition_out(D, T), (A = !1);
    },
    d(T) {
      T && detach(_), D && D.d(T);
    },
  };
}
function instance$k(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { focused: T } = _,
    { toRight: C } = _;
  return (
    (E.$$set = (R) => {
      "focused" in R && A(0, (T = R.focused)),
        "toRight" in R && A(1, (C = R.toRight)),
        "$$scope" in R && A(2, (D = R.$$scope));
    }),
    [T, C, D, I]
  );
}
let PickerWrapper$1 = class extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$k, create_fragment$k, safe_not_equal, { focused: 0, toRight: 1 });
  }
};
const SliderWrapper_svelte_svelte_type_style_lang$1 = "";
function create_fragment$j(E) {
  let _, A;
  const I = E[3].default,
    D = create_slot(I, E, E[2], null);
  return {
    c() {
      (_ = element("div")), D && D.c(), this.h();
    },
    l(T) {
      _ = claim_element(T, "DIV", { class: !0 });
      var C = children(_);
      D && D.l(C), C.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "slider-wrapper svelte-1slf5n3"), toggle_class(_, "focused", E[0]);
    },
    m(T, C) {
      insert_hydration(T, _, C), D && D.m(_, null), (A = !0);
    },
    p(T, [C]) {
      D &&
        D.p &&
        (!A || C & 4) &&
        update_slot_base(D, I, T, T[2], A ? get_slot_changes(I, T[2], C, null) : get_all_dirty_from_scope(T[2]), null),
        (!A || C & 1) && toggle_class(_, "focused", T[0]);
    },
    i(T) {
      A || (transition_in(D, T), (A = !0));
    },
    o(T) {
      transition_out(D, T), (A = !1);
    },
    d(T) {
      T && detach(_), D && D.d(T);
    },
  };
}
function instance$j(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { focused: T } = _,
    { toRight: C } = _;
  return (
    (E.$$set = (R) => {
      "focused" in R && A(0, (T = R.focused)),
        "toRight" in R && A(1, (C = R.toRight)),
        "$$scope" in R && A(2, (D = R.$$scope));
    }),
    [T, C, D, I]
  );
}
let SliderWrapper$1 = class extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$j, create_fragment$j, safe_not_equal, { focused: 0, toRight: 1 });
  }
};
const Input_svelte_svelte_type_style_lang = "";
function create_fragment$i(E) {
  let _, A, I, D, T, C, R;
  return {
    c() {
      (_ = element("label")), (A = element("div")), (I = element("input")), (D = space()), (T = text(E[2])), this.h();
    },
    l(B) {
      _ = claim_element(B, "LABEL", { class: !0 });
      var P = children(_);
      A = claim_element(P, "DIV", { class: !0 });
      var O = children(A);
      (I = claim_element(O, "INPUT", { type: !0, "aria-haspopup": !0, class: !0 })),
        O.forEach(detach),
        (D = claim_space(P)),
        (T = claim_text(P, E[2])),
        P.forEach(detach),
        this.h();
    },
    h() {
      attr(I, "type", "color"),
        (I.value = E[1]),
        attr(I, "aria-haspopup", "dialog"),
        attr(I, "class", "svelte-f0pkh4"),
        attr(A, "class", "svelte-f0pkh4"),
        attr(_, "class", "svelte-f0pkh4");
    },
    m(B, P) {
      insert_hydration(B, _, P),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(_, D),
        append_hydration(_, T),
        E[4](_),
        C ||
          ((R = [
            listen(I, "click", prevent_default(click_handler)),
            listen(I, "mousedown", prevent_default(mousedown_handler)),
          ]),
          (C = !0));
    },
    p(B, [P]) {
      P & 2 && (I.value = B[1]), P & 4 && set_data(T, B[2]);
    },
    i: noop,
    o: noop,
    d(B) {
      B && detach(_), E[4](null), (C = !1), run_all(R);
    },
  };
}
const click_handler = () => {},
  mousedown_handler = () => {};
function instance$i(E, _, A) {
  let { labelWrapper: I } = _,
    { hex: D } = _,
    { label: T } = _,
    { isOpen: C } = _;
  function R(B) {
    binding_callbacks[B ? "unshift" : "push"](() => {
      (I = B), A(0, I);
    });
  }
  return (
    (E.$$set = (B) => {
      "labelWrapper" in B && A(0, (I = B.labelWrapper)),
        "hex" in B && A(1, (D = B.hex)),
        "label" in B && A(2, (T = B.label)),
        "isOpen" in B && A(3, (C = B.isOpen));
    }),
    [I, D, T, C, R]
  );
}
class Input extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$i, create_fragment$i, safe_not_equal, { labelWrapper: 0, hex: 1, label: 2, isOpen: 3 });
  }
}
const Wrapper_svelte_svelte_type_style_lang$1 = "";
function create_fragment$h(E) {
  let _, A, I;
  const D = E[5].default,
    T = create_slot(D, E, E[4], null);
  return {
    c() {
      (_ = element("div")), T && T.c(), this.h();
    },
    l(C) {
      _ = claim_element(C, "DIV", { class: !0, role: !0, "aria-label": !0 });
      var R = children(_);
      T && T.l(R), R.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "wrapper svelte-yeqal1"),
        attr(_, "role", (A = E[2] ? "dialog" : void 0)),
        attr(_, "aria-label", "color picker"),
        toggle_class(_, "isOpen", E[1]),
        toggle_class(_, "isPopup", E[2]);
    },
    m(C, R) {
      insert_hydration(C, _, R), T && T.m(_, null), E[6](_), (I = !0);
    },
    p(C, [R]) {
      T &&
        T.p &&
        (!I || R & 16) &&
        update_slot_base(T, D, C, C[4], I ? get_slot_changes(D, C[4], R, null) : get_all_dirty_from_scope(C[4]), null),
        (!I || (R & 4 && A !== (A = C[2] ? "dialog" : void 0))) && attr(_, "role", A),
        (!I || R & 2) && toggle_class(_, "isOpen", C[1]),
        (!I || R & 4) && toggle_class(_, "isPopup", C[2]);
    },
    i(C) {
      I || (transition_in(T, C), (I = !0));
    },
    o(C) {
      transition_out(T, C), (I = !1);
    },
    d(C) {
      C && detach(_), T && T.d(C), E[6](null);
    },
  };
}
function instance$h(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { wrapper: T } = _,
    { isOpen: C } = _,
    { isPopup: R } = _,
    { toRight: B } = _;
  function P(O) {
    binding_callbacks[O ? "unshift" : "push"](() => {
      (T = O), A(0, T);
    });
  }
  return (
    (E.$$set = (O) => {
      "wrapper" in O && A(0, (T = O.wrapper)),
        "isOpen" in O && A(1, (C = O.isOpen)),
        "isPopup" in O && A(2, (R = O.isPopup)),
        "toRight" in O && A(3, (B = O.toRight)),
        "$$scope" in O && A(4, (D = O.$$scope));
    }),
    [T, C, R, B, D, I, P]
  );
}
let Wrapper$1 = class extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$h, create_fragment$h, safe_not_equal, { wrapper: 0, isOpen: 1, isPopup: 2, toRight: 3 });
  }
};
const A11yNotice_svelte_svelte_type_style_lang = "";
function get_each_context$3(E, _, A) {
  const I = E.slice();
  return (I[8] = _[A].hex), (I[9] = _[A].placeholder), (I[10] = _[A].reverse), (I[11] = _[A].size), I;
}
function create_each_block$3(E) {
  let _, A, I;
  var D = E[0].a11ySingleNotice;
  function T(C) {
    var R;
    return {
      props: {
        contrast: (R = C[3]) == null ? void 0 : R.contrast(C[8]),
        textColor: C[10] ? C[8] : C[2],
        bgColor: C[10] ? C[2] : C[8],
        ph: C[9],
        size: C[11],
      },
    };
  }
  return (
    D && (_ = construct_svelte_component(D, T(E))),
    {
      c() {
        _ && create_component(_.$$.fragment), (A = empty$1());
      },
      l(C) {
        _ && claim_component(_.$$.fragment, C), (A = empty$1());
      },
      m(C, R) {
        _ && mount_component(_, C, R), insert_hydration(C, A, R), (I = !0);
      },
      p(C, R) {
        var P;
        const B = {};
        if (
          (R & 10 && (B.contrast = (P = C[3]) == null ? void 0 : P.contrast(C[8])),
          R & 6 && (B.textColor = C[10] ? C[8] : C[2]),
          R & 6 && (B.bgColor = C[10] ? C[2] : C[8]),
          R & 2 && (B.ph = C[9]),
          R & 2 && (B.size = C[11]),
          D !== (D = C[0].a11ySingleNotice))
        ) {
          if (_) {
            group_outros();
            const O = _;
            transition_out(O.$$.fragment, 1, 0, () => {
              destroy_component(O, 1);
            }),
              check_outros();
          }
          D
            ? ((_ = construct_svelte_component(D, T(C))),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, A.parentNode, A))
            : (_ = null);
        } else D && _.$set(B);
      },
      i(C) {
        I || (_ && transition_in(_.$$.fragment, C), (I = !0));
      },
      o(C) {
        _ && transition_out(_.$$.fragment, C), (I = !1);
      },
      d(C) {
        C && detach(A), _ && destroy_component(_, C);
      },
    }
  );
}
function create_if_block$2(E) {
  let _;
  return {
    c() {
      (_ = element("span")), this.h();
    },
    l(A) {
      _ = claim_element(A, "SPAN", { class: !0 });
      var I = children(_);
      I.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "svelte-sog6x2");
    },
    m(A, I) {
      insert_hydration(A, _, I), (_.innerHTML = E[4]);
    },
    p(A, I) {
      I & 16 && (_.innerHTML = A[4]);
    },
    d(A) {
      A && detach(_);
    },
  };
}
function create_fragment$g(E) {
  let _, A, I, D, T, C, R, B, P;
  var O = E[0].a11ySummary;
  function F(X) {
    return { props: { a11yColors: X[1], hex: X[2] } };
  }
  O && (I = construct_svelte_component(O, F(E)));
  let L = E[1],
    U = [];
  for (let X = 0; X < L.length; X += 1) U[X] = create_each_block$3(get_each_context$3(E, L, X));
  const z = (X) =>
    transition_out(U[X], 1, 1, () => {
      U[X] = null;
    });
  let V = E[4] && create_if_block$2(E);
  return {
    c() {
      (_ = element("details")),
        (A = element("summary")),
        I && create_component(I.$$.fragment),
        (T = space()),
        (C = element("div"));
      for (let X = 0; X < U.length; X += 1) U[X].c();
      (R = space()), V && V.c(), this.h();
    },
    l(X) {
      _ = claim_element(X, "DETAILS", { class: !0 });
      var G = children(_);
      A = claim_element(G, "SUMMARY", { tabindex: !0, class: !0 });
      var Z = children(A);
      I && claim_component(I.$$.fragment, Z),
        Z.forEach(detach),
        (T = claim_space(G)),
        (C = claim_element(G, "DIV", { class: !0 }));
      var Y = children(C);
      for (let q = 0; q < U.length; q += 1) U[q].l(Y);
      (R = claim_space(Y)), V && V.l(Y), Y.forEach(detach), G.forEach(detach), this.h();
    },
    h() {
      attr(A, "tabindex", (D = E[6] ? -1 : void 0)),
        attr(A, "class", "svelte-sog6x2"),
        attr(C, "class", "svelte-sog6x2"),
        attr(_, "class", (B = "a11y-notice " + (E[6] ? "not-closable" : "") + " svelte-sog6x2")),
        (_.open = E[5]);
    },
    m(X, G) {
      insert_hydration(X, _, G),
        append_hydration(_, A),
        I && mount_component(I, A, null),
        append_hydration(_, T),
        append_hydration(_, C);
      for (let Z = 0; Z < U.length; Z += 1) U[Z].m(C, null);
      append_hydration(C, R), V && V.m(C, null), (P = !0);
    },
    p(X, [G]) {
      const Z = {};
      if ((G & 2 && (Z.a11yColors = X[1]), G & 4 && (Z.hex = X[2]), O !== (O = X[0].a11ySummary))) {
        if (I) {
          group_outros();
          const Y = I;
          transition_out(Y.$$.fragment, 1, 0, () => {
            destroy_component(Y, 1);
          }),
            check_outros();
        }
        O
          ? ((I = construct_svelte_component(O, F(X))),
            create_component(I.$$.fragment),
            transition_in(I.$$.fragment, 1),
            mount_component(I, A, null))
          : (I = null);
      } else O && I.$set(Z);
      if (((!P || (G & 64 && D !== (D = X[6] ? -1 : void 0))) && attr(A, "tabindex", D), G & 15)) {
        L = X[1];
        let Y;
        for (Y = 0; Y < L.length; Y += 1) {
          const q = get_each_context$3(X, L, Y);
          U[Y]
            ? (U[Y].p(q, G), transition_in(U[Y], 1))
            : ((U[Y] = create_each_block$3(q)), U[Y].c(), transition_in(U[Y], 1), U[Y].m(C, R));
        }
        for (group_outros(), Y = L.length; Y < U.length; Y += 1) z(Y);
        check_outros();
      }
      X[4] ? (V ? V.p(X, G) : ((V = create_if_block$2(X)), V.c(), V.m(C, null))) : V && (V.d(1), (V = null)),
        (!P || (G & 64 && B !== (B = "a11y-notice " + (X[6] ? "not-closable" : "") + " svelte-sog6x2"))) &&
          attr(_, "class", B),
        (!P || G & 32) && (_.open = X[5]);
    },
    i(X) {
      if (!P) {
        I && transition_in(I.$$.fragment, X);
        for (let G = 0; G < L.length; G += 1) transition_in(U[G]);
        P = !0;
      }
    },
    o(X) {
      I && transition_out(I.$$.fragment, X), (U = U.filter(Boolean));
      for (let G = 0; G < U.length; G += 1) transition_out(U[G]);
      P = !1;
    },
    d(X) {
      X && detach(_), I && destroy_component(I), destroy_each(U, X), V && V.d();
    },
  };
}
function instance$g(E, _, A) {
  let I,
    { components: D } = _,
    { a11yColors: T } = _,
    { hex: C } = _,
    { color: R } = _,
    { a11yGuidelines: B } = _,
    { isA11yOpen: P } = _,
    { isA11yClosable: O } = _;
  return (
    (E.$$set = (F) => {
      "components" in F && A(0, (D = F.components)),
        "a11yColors" in F && A(1, (T = F.a11yColors)),
        "hex" in F && A(2, (C = F.hex)),
        "color" in F && A(3, (R = F.color)),
        "a11yGuidelines" in F && A(4, (B = F.a11yGuidelines)),
        "isA11yOpen" in F && A(5, (P = F.isA11yOpen)),
        "isA11yClosable" in F && A(7, (O = F.isA11yClosable));
    }),
    (E.$$.update = () => {
      E.$$.dirty & 160 && A(6, (I = P && !O));
    }),
    [D, T, C, R, B, P, I, O]
  );
}
class A11yNotice extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$g, create_fragment$g, safe_not_equal, {
        components: 0,
        a11yColors: 1,
        hex: 2,
        color: 3,
        a11yGuidelines: 4,
        isA11yOpen: 5,
        isA11yClosable: 7,
      });
  }
}
const A11ySingleNotice_svelte_svelte_type_style_lang = "";
function create_fragment$f(E) {
  let _,
    A,
    I = (E[2] || "Lorem Ipsum") + "",
    D,
    T,
    C,
    R,
    B,
    P,
    O = (E[3] >= 10 ? E[3].toFixed(1) : E[3]) + "",
    F,
    L,
    U,
    z,
    V,
    X,
    G;
  return {
    c() {
      (_ = element("div")),
        (A = element("p")),
        (D = text(I)),
        (C = space()),
        (R = element("div")),
        (B = element("p")),
        (P = text("contrast: ")),
        (F = text(O)),
        (L = space()),
        (U = element("span")),
        (z = text("AA")),
        (V = space()),
        (X = element("span")),
        (G = text("AAA")),
        this.h();
    },
    l(Z) {
      _ = claim_element(Z, "DIV", { class: !0 });
      var Y = children(_);
      A = claim_element(Y, "P", { class: !0, style: !0 });
      var q = children(A);
      (D = claim_text(q, I)), q.forEach(detach), (C = claim_space(Y)), (R = claim_element(Y, "DIV", { class: !0 }));
      var W = children(R);
      B = claim_element(W, "P", { class: !0 });
      var ee = children(B);
      (P = claim_text(ee, "contrast: ")),
        (F = claim_text(ee, O)),
        ee.forEach(detach),
        (L = claim_space(W)),
        (U = claim_element(W, "SPAN", { class: !0 }));
      var te = children(U);
      (z = claim_text(te, "AA")),
        te.forEach(detach),
        (V = claim_space(W)),
        (X = claim_element(W, "SPAN", { class: !0 }));
      var Q = children(X);
      (G = claim_text(Q, "AAA")), Q.forEach(detach), W.forEach(detach), Y.forEach(detach), this.h();
    },
    h() {
      attr(A, "class", (T = "lorem " + (E[4] === "large" && "large") + " svelte-obnxge")),
        set_style(A, "color", E[0]),
        set_style(A, "background-color", E[1]),
        attr(B, "class", "svelte-obnxge"),
        attr(U, "class", "grade svelte-obnxge"),
        toggle_class(U, "grade-ok", E[3] > (E[4] === "large" ? 3 : 4.5)),
        attr(X, "class", "grade svelte-obnxge"),
        toggle_class(X, "grade-ok", E[3] > (E[4] === "large" ? 4.5 : 7)),
        attr(R, "class", "score svelte-obnxge"),
        attr(_, "class", "a11y-single-notice svelte-obnxge");
    },
    m(Z, Y) {
      insert_hydration(Z, _, Y),
        append_hydration(_, A),
        append_hydration(A, D),
        append_hydration(_, C),
        append_hydration(_, R),
        append_hydration(R, B),
        append_hydration(B, P),
        append_hydration(B, F),
        append_hydration(R, L),
        append_hydration(R, U),
        append_hydration(U, z),
        append_hydration(R, V),
        append_hydration(R, X),
        append_hydration(X, G);
    },
    p(Z, [Y]) {
      Y & 4 && I !== (I = (Z[2] || "Lorem Ipsum") + "") && set_data(D, I),
        Y & 16 && T !== (T = "lorem " + (Z[4] === "large" && "large") + " svelte-obnxge") && attr(A, "class", T),
        Y & 1 && set_style(A, "color", Z[0]),
        Y & 2 && set_style(A, "background-color", Z[1]),
        Y & 8 && O !== (O = (Z[3] >= 10 ? Z[3].toFixed(1) : Z[3]) + "") && set_data(F, O),
        Y & 24 && toggle_class(U, "grade-ok", Z[3] > (Z[4] === "large" ? 3 : 4.5)),
        Y & 24 && toggle_class(X, "grade-ok", Z[3] > (Z[4] === "large" ? 4.5 : 7));
    },
    i: noop,
    o: noop,
    d(Z) {
      Z && detach(_);
    },
  };
}
function instance$f(E, _, A) {
  let { textColor: I } = _,
    { bgColor: D } = _,
    { ph: T = void 0 } = _,
    { contrast: C = 1 } = _,
    { size: R = void 0 } = _;
  return (
    (E.$$set = (B) => {
      "textColor" in B && A(0, (I = B.textColor)),
        "bgColor" in B && A(1, (D = B.bgColor)),
        "ph" in B && A(2, (T = B.ph)),
        "contrast" in B && A(3, (C = B.contrast)),
        "size" in B && A(4, (R = B.size));
    }),
    [I, D, T, C, R]
  );
}
class A11ySingleNotice extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$f, create_fragment$f, safe_not_equal, {
        textColor: 0,
        bgColor: 1,
        ph: 2,
        contrast: 3,
        size: 4,
      });
  }
}
function create_fragment$e(E) {
  let _;
  return {
    c() {
      _ = text(E[0]);
    },
    l(A) {
      _ = claim_text(A, E[0]);
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    p(A, [I]) {
      I & 1 && set_data(_, A[0]);
    },
    i: noop,
    o: noop,
    d(A) {
      A && detach(_);
    },
  };
}
function getNumberOfGradeFailed({ contrast: E, size: _ }) {
  return E ? (_ === "large" ? (E < 3 ? 2 : E < 4.5 ? 1 : 0) : E < 4.5 ? 2 : E < 7 ? 1 : 0) : 2;
}
function instance$e(E, _, A) {
  let I,
    D,
    { a11yColors: T } = _,
    { hex: C } = _;
  return (
    (E.$$set = (R) => {
      "a11yColors" in R && A(1, (T = R.a11yColors)), "hex" in R && A(2, (C = R.hex));
    }),
    (E.$$.update = () => {
      E.$$.dirty & 2 && A(3, (I = T.map(getNumberOfGradeFailed).reduce((R, B) => R + B))),
        E.$$.dirty & 8 && A(0, (D = I ? `⚠️ ${I} contrast grade${I && "s"} fail` : "Contrast grade information"));
    }),
    [D, T, C, I]
  );
}
class A11ySummary extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$e, create_fragment$e, safe_not_equal, { a11yColors: 1, hex: 2 });
  }
}
const ColorPicker_svelte_svelte_type_style_lang = "";
function create_else_block$1(E) {
  let _;
  return {
    c() {
      (_ = element("input")), this.h();
    },
    l(A) {
      (_ = claim_element(A, "INPUT", { type: !0 })), this.h();
    },
    h() {
      attr(_, "type", "hidden"), (_.value = E[2]);
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    p(A, I) {
      I[0] & 4 && (_.value = A[2]);
    },
    i: noop,
    o: noop,
    d(A) {
      A && detach(_);
    },
  };
}
function create_if_block_3$1(E) {
  let _, A, I, D, T;
  function C(O) {
    E[26](O);
  }
  function R(O) {
    E[27](O);
  }
  var B = E[21]().input;
  function P(O) {
    let F = { hex: O[2], label: O[6] };
    return O[19] !== void 0 && (F.labelWrapper = O[19]), O[3] !== void 0 && (F.isOpen = O[3]), { props: F };
  }
  return (
    B &&
      ((_ = construct_svelte_component(B, P(E))),
      binding_callbacks.push(() => bind(_, "labelWrapper", C, E[19])),
      binding_callbacks.push(() => bind(_, "isOpen", R, E[3]))),
    {
      c() {
        _ && create_component(_.$$.fragment), (D = empty$1());
      },
      l(O) {
        _ && claim_component(_.$$.fragment, O), (D = empty$1());
      },
      m(O, F) {
        _ && mount_component(_, O, F), insert_hydration(O, D, F), (T = !0);
      },
      p(O, F) {
        const L = {};
        if (
          (F[0] & 4 && (L.hex = O[2]),
          F[0] & 64 && (L.label = O[6]),
          !A && F[0] & 524288 && ((A = !0), (L.labelWrapper = O[19]), add_flush_callback(() => (A = !1))),
          !I && F[0] & 8 && ((I = !0), (L.isOpen = O[3]), add_flush_callback(() => (I = !1))),
          B !== (B = O[21]().input))
        ) {
          if (_) {
            group_outros();
            const U = _;
            transition_out(U.$$.fragment, 1, 0, () => {
              destroy_component(U, 1);
            }),
              check_outros();
          }
          B
            ? ((_ = construct_svelte_component(B, P(O))),
              binding_callbacks.push(() => bind(_, "labelWrapper", C, O[19])),
              binding_callbacks.push(() => bind(_, "isOpen", R, O[3])),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, D.parentNode, D))
            : (_ = null);
        } else B && _.$set(L);
      },
      i(O) {
        T || (_ && transition_in(_.$$.fragment, O), (T = !0));
      },
      o(O) {
        _ && transition_out(_.$$.fragment, O), (T = !1);
      },
      d(O) {
        O && detach(D), _ && destroy_component(_, O);
      },
    }
  );
}
function create_if_block_2$1(E) {
  let _, A, I, D;
  function T(B) {
    E[32](B);
  }
  function C(B) {
    E[33](B);
  }
  let R = { components: E[21](), hex: E[2], toRight: E[17] };
  return (
    E[1].a !== void 0 && (R.a = E[1].a),
    E[3] !== void 0 && (R.isOpen = E[3]),
    (_ = new Alpha({ props: R })),
    binding_callbacks.push(() => bind(_, "a", T, E[1].a)),
    binding_callbacks.push(() => bind(_, "isOpen", C, E[3])),
    {
      c() {
        create_component(_.$$.fragment);
      },
      l(B) {
        claim_component(_.$$.fragment, B);
      },
      m(B, P) {
        mount_component(_, B, P), (D = !0);
      },
      p(B, P) {
        const O = {};
        P[0] & 4 && (O.hex = B[2]),
          P[0] & 131072 && (O.toRight = B[17]),
          !A && P[0] & 2 && ((A = !0), (O.a = B[1].a), add_flush_callback(() => (A = !1))),
          !I && P[0] & 8 && ((I = !0), (O.isOpen = B[3]), add_flush_callback(() => (I = !1))),
          _.$set(O);
      },
      i(B) {
        D || (transition_in(_.$$.fragment, B), (D = !0));
      },
      o(B) {
        transition_out(_.$$.fragment, B), (D = !1);
      },
      d(B) {
        destroy_component(_, B);
      },
    }
  );
}
function create_if_block_1$1(E) {
  let _, A, I, D, T, C;
  function R(L) {
    E[34](L);
  }
  function B(L) {
    E[35](L);
  }
  function P(L) {
    E[36](L);
  }
  var O = E[21]().textInput;
  function F(L) {
    let U = { isAlpha: L[7], canChangeMode: L[10] };
    return (
      L[2] !== void 0 && (U.hex = L[2]),
      L[0] !== void 0 && (U.rgb = L[0]),
      L[1] !== void 0 && (U.hsv = L[1]),
      { props: U }
    );
  }
  return (
    O &&
      ((_ = construct_svelte_component(O, F(E))),
      binding_callbacks.push(() => bind(_, "hex", R, E[2])),
      binding_callbacks.push(() => bind(_, "rgb", B, E[0])),
      binding_callbacks.push(() => bind(_, "hsv", P, E[1]))),
    {
      c() {
        _ && create_component(_.$$.fragment), (T = empty$1());
      },
      l(L) {
        _ && claim_component(_.$$.fragment, L), (T = empty$1());
      },
      m(L, U) {
        _ && mount_component(_, L, U), insert_hydration(L, T, U), (C = !0);
      },
      p(L, U) {
        const z = {};
        if (
          (U[0] & 128 && (z.isAlpha = L[7]),
          U[0] & 1024 && (z.canChangeMode = L[10]),
          !A && U[0] & 4 && ((A = !0), (z.hex = L[2]), add_flush_callback(() => (A = !1))),
          !I && U[0] & 1 && ((I = !0), (z.rgb = L[0]), add_flush_callback(() => (I = !1))),
          !D && U[0] & 2 && ((D = !0), (z.hsv = L[1]), add_flush_callback(() => (D = !1))),
          O !== (O = L[21]().textInput))
        ) {
          if (_) {
            group_outros();
            const V = _;
            transition_out(V.$$.fragment, 1, 0, () => {
              destroy_component(V, 1);
            }),
              check_outros();
          }
          O
            ? ((_ = construct_svelte_component(O, F(L))),
              binding_callbacks.push(() => bind(_, "hex", R, L[2])),
              binding_callbacks.push(() => bind(_, "rgb", B, L[0])),
              binding_callbacks.push(() => bind(_, "hsv", P, L[1])),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, T.parentNode, T))
            : (_ = null);
        } else O && _.$set(z);
      },
      i(L) {
        C || (_ && transition_in(_.$$.fragment, L), (C = !0));
      },
      o(L) {
        _ && transition_out(_.$$.fragment, L), (C = !1);
      },
      d(L) {
        L && detach(T), _ && destroy_component(_, L);
      },
    }
  );
}
function create_if_block$1(E) {
  let _, A, I;
  var D = E[21]().a11yNotice;
  function T(C) {
    return {
      props: {
        components: C[21](),
        a11yColors: C[12],
        color: C[4],
        hex: C[2],
        a11yGuidelines: C[13],
        isA11yOpen: C[14],
        isA11yClosable: C[15],
      },
    };
  }
  return (
    D && (_ = construct_svelte_component(D, T(E))),
    {
      c() {
        _ && create_component(_.$$.fragment), (A = empty$1());
      },
      l(C) {
        _ && claim_component(_.$$.fragment, C), (A = empty$1());
      },
      m(C, R) {
        _ && mount_component(_, C, R), insert_hydration(C, A, R), (I = !0);
      },
      p(C, R) {
        const B = {};
        if (
          (R[0] & 4096 && (B.a11yColors = C[12]),
          R[0] & 16 && (B.color = C[4]),
          R[0] & 4 && (B.hex = C[2]),
          R[0] & 8192 && (B.a11yGuidelines = C[13]),
          R[0] & 16384 && (B.isA11yOpen = C[14]),
          R[0] & 32768 && (B.isA11yClosable = C[15]),
          D !== (D = C[21]().a11yNotice))
        ) {
          if (_) {
            group_outros();
            const P = _;
            transition_out(P.$$.fragment, 1, 0, () => {
              destroy_component(P, 1);
            }),
              check_outros();
          }
          D
            ? ((_ = construct_svelte_component(D, T(C))),
              create_component(_.$$.fragment),
              transition_in(_.$$.fragment, 1),
              mount_component(_, A.parentNode, A))
            : (_ = null);
        } else D && _.$set(B);
      },
      i(C) {
        I || (_ && transition_in(_.$$.fragment, C), (I = !0));
      },
      o(C) {
        _ && transition_out(_.$$.fragment, C), (I = !1);
      },
      d(C) {
        C && detach(A), _ && destroy_component(_, C);
      },
    }
  );
}
function create_default_slot(E) {
  let _, A, I, D, T, C, R, B, P, O, F, L;
  function U(ee) {
    E[28](ee);
  }
  function z(ee) {
    E[29](ee);
  }
  function V(ee) {
    E[30](ee);
  }
  let X = { components: E[21](), h: E[1].h, toRight: E[17], isDark: E[5] };
  E[1].s !== void 0 && (X.s = E[1].s),
    E[1].v !== void 0 && (X.v = E[1].v),
    E[3] !== void 0 && (X.isOpen = E[3]),
    (_ = new Picker({ props: X })),
    binding_callbacks.push(() => bind(_, "s", U, E[1].s)),
    binding_callbacks.push(() => bind(_, "v", z, E[1].v)),
    binding_callbacks.push(() => bind(_, "isOpen", V, E[3]));
  function G(ee) {
    E[31](ee);
  }
  let Z = { components: E[21](), toRight: E[17] };
  E[1].h !== void 0 && (Z.h = E[1].h),
    (C = new Slider({ props: Z })),
    binding_callbacks.push(() => bind(C, "h", G, E[1].h));
  let Y = E[7] && create_if_block_2$1(E),
    q = E[9] && create_if_block_1$1(E),
    W = E[11] && create_if_block$1(E);
  return {
    c() {
      create_component(_.$$.fragment),
        (T = space()),
        create_component(C.$$.fragment),
        (B = space()),
        Y && Y.c(),
        (P = space()),
        q && q.c(),
        (O = space()),
        W && W.c(),
        (F = empty$1());
    },
    l(ee) {
      claim_component(_.$$.fragment, ee),
        (T = claim_space(ee)),
        claim_component(C.$$.fragment, ee),
        (B = claim_space(ee)),
        Y && Y.l(ee),
        (P = claim_space(ee)),
        q && q.l(ee),
        (O = claim_space(ee)),
        W && W.l(ee),
        (F = empty$1());
    },
    m(ee, te) {
      mount_component(_, ee, te),
        insert_hydration(ee, T, te),
        mount_component(C, ee, te),
        insert_hydration(ee, B, te),
        Y && Y.m(ee, te),
        insert_hydration(ee, P, te),
        q && q.m(ee, te),
        insert_hydration(ee, O, te),
        W && W.m(ee, te),
        insert_hydration(ee, F, te),
        (L = !0);
    },
    p(ee, te) {
      const Q = {};
      te[0] & 2 && (Q.h = ee[1].h),
        te[0] & 131072 && (Q.toRight = ee[17]),
        te[0] & 32 && (Q.isDark = ee[5]),
        !A && te[0] & 2 && ((A = !0), (Q.s = ee[1].s), add_flush_callback(() => (A = !1))),
        !I && te[0] & 2 && ((I = !0), (Q.v = ee[1].v), add_flush_callback(() => (I = !1))),
        !D && te[0] & 8 && ((D = !0), (Q.isOpen = ee[3]), add_flush_callback(() => (D = !1))),
        _.$set(Q);
      const J = {};
      te[0] & 131072 && (J.toRight = ee[17]),
        !R && te[0] & 2 && ((R = !0), (J.h = ee[1].h), add_flush_callback(() => (R = !1))),
        C.$set(J),
        ee[7]
          ? Y
            ? (Y.p(ee, te), te[0] & 128 && transition_in(Y, 1))
            : ((Y = create_if_block_2$1(ee)), Y.c(), transition_in(Y, 1), Y.m(P.parentNode, P))
          : Y &&
            (group_outros(),
            transition_out(Y, 1, 1, () => {
              Y = null;
            }),
            check_outros()),
        ee[9]
          ? q
            ? (q.p(ee, te), te[0] & 512 && transition_in(q, 1))
            : ((q = create_if_block_1$1(ee)), q.c(), transition_in(q, 1), q.m(O.parentNode, O))
          : q &&
            (group_outros(),
            transition_out(q, 1, 1, () => {
              q = null;
            }),
            check_outros()),
        ee[11]
          ? W
            ? (W.p(ee, te), te[0] & 2048 && transition_in(W, 1))
            : ((W = create_if_block$1(ee)), W.c(), transition_in(W, 1), W.m(F.parentNode, F))
          : W &&
            (group_outros(),
            transition_out(W, 1, 1, () => {
              W = null;
            }),
            check_outros());
    },
    i(ee) {
      L ||
        (transition_in(_.$$.fragment, ee),
        transition_in(C.$$.fragment, ee),
        transition_in(Y),
        transition_in(q),
        transition_in(W),
        (L = !0));
    },
    o(ee) {
      transition_out(_.$$.fragment, ee),
        transition_out(C.$$.fragment, ee),
        transition_out(Y),
        transition_out(q),
        transition_out(W),
        (L = !1);
    },
    d(ee) {
      destroy_component(_, ee),
        ee && detach(T),
        destroy_component(C, ee),
        ee && detach(B),
        Y && Y.d(ee),
        ee && detach(P),
        q && q.d(ee),
        ee && detach(O),
        W && W.d(ee),
        ee && detach(F);
    },
  };
}
function create_fragment$d(E) {
  let _, A, I, D, T, C, R, B, P, O, F;
  _ = new ArrowKeyHandler({});
  const L = [create_if_block_3$1, create_else_block$1],
    U = [];
  function z(Z, Y) {
    return Z[8] ? 0 : 1;
  }
  (D = z(E)), (T = U[D] = L[D](E));
  function V(Z) {
    E[37](Z);
  }
  var X = E[21]().wrapper;
  function G(Z) {
    let Y = {
      isOpen: Z[3],
      isPopup: Z[16],
      toRight: Z[17],
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx: Z },
    };
    return Z[20] !== void 0 && (Y.wrapper = Z[20]), { props: Y };
  }
  return (
    X && ((R = construct_svelte_component(X, G(E))), binding_callbacks.push(() => bind(R, "wrapper", V, E[20]))),
    {
      c() {
        create_component(_.$$.fragment),
          (A = space()),
          (I = element("span")),
          T.c(),
          (C = space()),
          R && create_component(R.$$.fragment),
          this.h();
      },
      l(Z) {
        claim_component(_.$$.fragment, Z), (A = claim_space(Z)), (I = claim_element(Z, "SPAN", { class: !0 }));
        var Y = children(I);
        T.l(Y), (C = claim_space(Y)), R && claim_component(R.$$.fragment, Y), Y.forEach(detach), this.h();
      },
      h() {
        attr(I, "class", "color-picker svelte-7ntk55");
      },
      m(Z, Y) {
        mount_component(_, Z, Y),
          insert_hydration(Z, A, Y),
          insert_hydration(Z, I, Y),
          U[D].m(I, null),
          append_hydration(I, C),
          R && mount_component(R, I, null),
          E[38](I),
          (P = !0),
          O ||
            ((F = [
              listen(window, "mousedown", E[22]),
              listen(window, "keydown", E[24]),
              listen(window, "keyup", E[23]),
            ]),
            (O = !0));
      },
      p(Z, Y) {
        let q = D;
        (D = z(Z)),
          D === q
            ? U[D].p(Z, Y)
            : (group_outros(),
              transition_out(U[q], 1, 1, () => {
                U[q] = null;
              }),
              check_outros(),
              (T = U[D]),
              T ? T.p(Z, Y) : ((T = U[D] = L[D](Z)), T.c()),
              transition_in(T, 1),
              T.m(I, C));
        const W = {};
        if (
          (Y[0] & 8 && (W.isOpen = Z[3]),
          Y[0] & 65536 && (W.isPopup = Z[16]),
          Y[0] & 131072 && (W.toRight = Z[17]),
          (Y[0] & 196287) | (Y[1] & 16384) && (W.$$scope = { dirty: Y, ctx: Z }),
          !B && Y[0] & 1048576 && ((B = !0), (W.wrapper = Z[20]), add_flush_callback(() => (B = !1))),
          X !== (X = Z[21]().wrapper))
        ) {
          if (R) {
            group_outros();
            const ee = R;
            transition_out(ee.$$.fragment, 1, 0, () => {
              destroy_component(ee, 1);
            }),
              check_outros();
          }
          X
            ? ((R = construct_svelte_component(X, G(Z))),
              binding_callbacks.push(() => bind(R, "wrapper", V, Z[20])),
              create_component(R.$$.fragment),
              transition_in(R.$$.fragment, 1),
              mount_component(R, I, null))
            : (R = null);
        } else X && R.$set(W);
      },
      i(Z) {
        P || (transition_in(_.$$.fragment, Z), transition_in(T), R && transition_in(R.$$.fragment, Z), (P = !0));
      },
      o(Z) {
        transition_out(_.$$.fragment, Z), transition_out(T), R && transition_out(R.$$.fragment, Z), (P = !1);
      },
      d(Z) {
        destroy_component(_, Z),
          Z && detach(A),
          Z && detach(I),
          U[D].d(),
          R && destroy_component(R),
          E[38](null),
          (O = !1),
          run_all(F);
      },
    }
  );
}
function instance$d(E, _, A) {
  k([a11yPlugin]);
  let { components: I = {} } = _;
  const D = createEventDispatcher();
  let { label: T = "Choose a color" } = _,
    { isAlpha: C = !0 } = _,
    { isInput: R = !0 } = _,
    { isTextInput: B = !0 } = _,
    { canChangeMode: P = !0 } = _,
    { isA11y: O = !1 } = _,
    { a11yColors: F = [{ hex: "#ffffff" }] } = _,
    {
      a11yGuidelines:
        L = '<p style="margin: 0; font-size: 12px;">Learn more at <a href="https://webaim.org/articles/contrast/" target="_blank">WebAIM contrast guide</a></p>',
    } = _,
    { isA11yOpen: U = !1 } = _,
    { isA11yClosable: z = !0 } = _,
    { isPopup: V = R } = _,
    { isOpen: X = !R } = _,
    { toRight: G = !1 } = _,
    { rgb: Z = { r: 255, g: 0, b: 0, a: 1 } } = _,
    { hsv: Y = { h: 0, s: 1, v: 1, a: 1 } } = _,
    { hex: q = "#ff0000" } = _,
    { color: W = void 0 } = _,
    { isDark: ee = !1 } = _,
    te = { r: 255, g: 0, b: 0, a: 1 },
    Q = { h: 0, s: 1, v: 1, a: 1 },
    J = "#ff0000",
    K;
  const ne = {
    sliderIndicator: SliderIndicator$1,
    pickerIndicator: PickerIndicator$1,
    alphaIndicator: SliderIndicator$1,
    pickerWrapper: PickerWrapper$1,
    sliderWrapper: SliderWrapper$1,
    alphaWrapper: SliderWrapper$1,
    textInput: TextInput,
    a11yNotice: A11yNotice,
    a11ySingleNotice: A11ySingleNotice,
    a11ySummary: A11ySummary,
    input: Input,
    wrapper: Wrapper$1,
  };
  function re() {
    return { ...ne, ...I };
  }
  let ie, se;
  function oe({ target: ge }) {
    R && (ie.contains(ge) || ie.isSameNode(ge) ? A(3, (X = !X)) : X && !se.contains(ge) && A(3, (X = !1)));
  }
  function _e(ge) {
    ge.key === "Tab" && A(3, (X = K == null ? void 0 : K.contains(document.activeElement)));
  }
  function ve() {
    (Y.h === Q.h &&
      Y.s === Q.s &&
      Y.v === Q.v &&
      Y.a === Q.a &&
      Z.r === te.r &&
      Z.g === te.g &&
      Z.b === te.b &&
      Z.a === te.a &&
      q === J) ||
      (Y.a === void 0 && A(1, (Y.a = 1), Y),
      Q.a === void 0 && (Q.a = 1),
      Z.a === void 0 && A(0, (Z.a = 1), Z),
      te.a === void 0 && (te.a = 1),
      (q == null ? void 0 : q.substring(7)) === "ff" && A(2, (q = q.substring(0, 7))),
      (q == null ? void 0 : q.substring(7)) === "ff" && A(2, (q = q.substring(0, 7))),
      Y.h !== Q.h || Y.s !== Q.s || Y.v !== Q.v || Y.a !== Q.a
        ? (A(4, (W = w(Y))), A(0, (Z = W.toRgb())), A(2, (q = W.toHex())))
        : Z.r !== te.r || Z.g !== te.g || Z.b !== te.b || Z.a !== te.a
          ? (A(4, (W = w(Z))), A(2, (q = W.toHex())), A(1, (Y = W.toHsv())))
          : q !== J && (A(4, (W = w(q))), A(0, (Z = W.toRgb())), A(1, (Y = W.toHsv()))),
      W && A(5, (ee = W.isDark())),
      (Q = Object.assign({}, Y)),
      (te = Object.assign({}, Z)),
      (J = q),
      D("input", { color: W, hsv: Y, rgb: Z, hex: q }));
  }
  function fe(ge) {
    ge.key === "Tab" && K.classList.add("has-been-tabbed");
  }
  function ke(ge) {
    (ie = ge), A(19, ie);
  }
  function me(ge) {
    (X = ge), A(3, X);
  }
  function Ee(ge) {
    E.$$.not_equal(Y.s, ge) && ((Y.s = ge), A(1, Y));
  }
  function Se(ge) {
    E.$$.not_equal(Y.v, ge) && ((Y.v = ge), A(1, Y));
  }
  function ue(ge) {
    (X = ge), A(3, X);
  }
  function xe(ge) {
    E.$$.not_equal(Y.h, ge) && ((Y.h = ge), A(1, Y));
  }
  function pe(ge) {
    E.$$.not_equal(Y.a, ge) && ((Y.a = ge), A(1, Y));
  }
  function we(ge) {
    (X = ge), A(3, X);
  }
  function Ne(ge) {
    (q = ge), A(2, q);
  }
  function Ce(ge) {
    (Z = ge), A(0, Z);
  }
  function De(ge) {
    (Y = ge), A(1, Y);
  }
  function Ue(ge) {
    (se = ge), A(20, se);
  }
  function Oe(ge) {
    binding_callbacks[ge ? "unshift" : "push"](() => {
      (K = ge), A(18, K);
    });
  }
  return (
    (E.$$set = (ge) => {
      "components" in ge && A(25, (I = ge.components)),
        "label" in ge && A(6, (T = ge.label)),
        "isAlpha" in ge && A(7, (C = ge.isAlpha)),
        "isInput" in ge && A(8, (R = ge.isInput)),
        "isTextInput" in ge && A(9, (B = ge.isTextInput)),
        "canChangeMode" in ge && A(10, (P = ge.canChangeMode)),
        "isA11y" in ge && A(11, (O = ge.isA11y)),
        "a11yColors" in ge && A(12, (F = ge.a11yColors)),
        "a11yGuidelines" in ge && A(13, (L = ge.a11yGuidelines)),
        "isA11yOpen" in ge && A(14, (U = ge.isA11yOpen)),
        "isA11yClosable" in ge && A(15, (z = ge.isA11yClosable)),
        "isPopup" in ge && A(16, (V = ge.isPopup)),
        "isOpen" in ge && A(3, (X = ge.isOpen)),
        "toRight" in ge && A(17, (G = ge.toRight)),
        "rgb" in ge && A(0, (Z = ge.rgb)),
        "hsv" in ge && A(1, (Y = ge.hsv)),
        "hex" in ge && A(2, (q = ge.hex)),
        "color" in ge && A(4, (W = ge.color)),
        "isDark" in ge && A(5, (ee = ge.isDark));
    }),
    (E.$$.update = () => {
      E.$$.dirty[0] & 7 && (Y || Z || q) && ve();
    }),
    [
      Z,
      Y,
      q,
      X,
      W,
      ee,
      T,
      C,
      R,
      B,
      P,
      O,
      F,
      L,
      U,
      z,
      V,
      G,
      K,
      ie,
      se,
      re,
      oe,
      _e,
      fe,
      I,
      ke,
      me,
      Ee,
      Se,
      ue,
      xe,
      pe,
      we,
      Ne,
      Ce,
      De,
      Ue,
      Oe,
    ]
  );
}
class ColorPicker extends SvelteComponent {
  constructor(_) {
    super(),
      init(
        this,
        _,
        instance$d,
        create_fragment$d,
        safe_not_equal,
        {
          components: 25,
          label: 6,
          isAlpha: 7,
          isInput: 8,
          isTextInput: 9,
          canChangeMode: 10,
          isA11y: 11,
          a11yColors: 12,
          a11yGuidelines: 13,
          isA11yOpen: 14,
          isA11yClosable: 15,
          isPopup: 16,
          isOpen: 3,
          toRight: 17,
          rgb: 0,
          hsv: 1,
          hex: 2,
          color: 4,
          isDark: 5,
        },
        null,
        [-1, -1],
      );
  }
}
const PickerIndicator_svelte_svelte_type_style_lang = "";
function create_fragment$c(E) {
  let _, A;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(I) {
      (_ = claim_element(I, "DIV", { class: !0, style: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "picker-indicator svelte-1nw247x"),
        attr(
          _,
          "style",
          (A = `left: calc(${(E[0].x / 260) * 246}% + 2px); top: calc(${(E[0].y / 160) * 149}% + 2px); box-shadow: 0 0 4px ${E[1] ? "white" : "black"};`),
        );
    },
    m(I, D) {
      insert_hydration(I, _, D);
    },
    p(I, [D]) {
      D & 3 &&
        A !==
          (A = `left: calc(${(I[0].x / 260) * 246}% + 2px); top: calc(${(I[0].y / 160) * 149}% + 2px); box-shadow: 0 0 4px ${I[1] ? "white" : "black"};`) &&
        attr(_, "style", A);
    },
    i: noop,
    o: noop,
    d(I) {
      I && detach(_);
    },
  };
}
function instance$c(E, _, A) {
  let { pos: I } = _,
    { hex: D } = _,
    { isDark: T } = _;
  return (
    (E.$$set = (C) => {
      "pos" in C && A(0, (I = C.pos)), "hex" in C && A(2, (D = C.hex)), "isDark" in C && A(1, (T = C.isDark));
    }),
    [I, T, D]
  );
}
class PickerIndicator extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$c, create_fragment$c, safe_not_equal, { pos: 0, hex: 2, isDark: 1 });
  }
}
const PickerWrapper_svelte_svelte_type_style_lang = "";
function create_fragment$b(E) {
  let _, A;
  const I = E[3].default,
    D = create_slot(I, E, E[2], null);
  return {
    c() {
      (_ = element("div")), D && D.c(), this.h();
    },
    l(T) {
      _ = claim_element(T, "DIV", { class: !0 });
      var C = children(_);
      D && D.l(C), C.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "picker-wrapper svelte-1vd0r8g"), toggle_class(_, "focused", E[0]);
    },
    m(T, C) {
      insert_hydration(T, _, C), D && D.m(_, null), (A = !0);
    },
    p(T, [C]) {
      D &&
        D.p &&
        (!A || C & 4) &&
        update_slot_base(D, I, T, T[2], A ? get_slot_changes(I, T[2], C, null) : get_all_dirty_from_scope(T[2]), null),
        (!A || C & 1) && toggle_class(_, "focused", T[0]);
    },
    i(T) {
      A || (transition_in(D, T), (A = !0));
    },
    o(T) {
      transition_out(D, T), (A = !1);
    },
    d(T) {
      T && detach(_), D && D.d(T);
    },
  };
}
function instance$b(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { focused: T } = _,
    { toRight: C } = _;
  return (
    (E.$$set = (R) => {
      "focused" in R && A(0, (T = R.focused)),
        "toRight" in R && A(1, (C = R.toRight)),
        "$$scope" in R && A(2, (D = R.$$scope));
    }),
    [T, C, D, I]
  );
}
class PickerWrapper extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$b, create_fragment$b, safe_not_equal, { focused: 0, toRight: 1 });
  }
}
const SliderIndicator_svelte_svelte_type_style_lang = "";
function create_fragment$a(E) {
  let _, A;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(I) {
      (_ = claim_element(I, "DIV", { class: !0, style: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "slider-indicator svelte-188i277"),
        attr(_, "style", (A = `left: calc(${(E[0] / 200) * 192}% + 2px);`));
    },
    m(I, D) {
      insert_hydration(I, _, D);
    },
    p(I, [D]) {
      D & 1 && A !== (A = `left: calc(${(I[0] / 200) * 192}% + 2px);`) && attr(_, "style", A);
    },
    i: noop,
    o: noop,
    d(I) {
      I && detach(_);
    },
  };
}
function instance$a(E, _, A) {
  let { pos: I } = _,
    { toRight: D } = _;
  return (
    (E.$$set = (T) => {
      "pos" in T && A(0, (I = T.pos)), "toRight" in T && A(1, (D = T.toRight));
    }),
    [I, D]
  );
}
class SliderIndicator extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$a, create_fragment$a, safe_not_equal, { pos: 0, toRight: 1 });
  }
}
const SliderWrapper_svelte_svelte_type_style_lang = "";
function create_fragment$9(E) {
  let _, A;
  const I = E[3].default,
    D = create_slot(I, E, E[2], null);
  return {
    c() {
      (_ = element("div")), D && D.c(), this.h();
    },
    l(T) {
      _ = claim_element(T, "DIV", { class: !0 });
      var C = children(_);
      D && D.l(C), C.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "slider-wrapper svelte-ey1n92"), toggle_class(_, "focused", E[0]);
    },
    m(T, C) {
      insert_hydration(T, _, C), D && D.m(_, null), (A = !0);
    },
    p(T, [C]) {
      D &&
        D.p &&
        (!A || C & 4) &&
        update_slot_base(D, I, T, T[2], A ? get_slot_changes(I, T[2], C, null) : get_all_dirty_from_scope(T[2]), null),
        (!A || C & 1) && toggle_class(_, "focused", T[0]);
    },
    i(T) {
      A || (transition_in(D, T), (A = !0));
    },
    o(T) {
      transition_out(D, T), (A = !1);
    },
    d(T) {
      T && detach(_), D && D.d(T);
    },
  };
}
function instance$9(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { focused: T } = _,
    { toRight: C } = _;
  return (
    (E.$$set = (R) => {
      "focused" in R && A(0, (T = R.focused)),
        "toRight" in R && A(1, (C = R.toRight)),
        "$$scope" in R && A(2, (D = R.$$scope));
    }),
    [T, C, D, I]
  );
}
class SliderWrapper extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$9, create_fragment$9, safe_not_equal, { focused: 0, toRight: 1 });
  }
}
const Wrapper_svelte_svelte_type_style_lang = "";
function create_fragment$8(E) {
  let _, A, I;
  const D = E[5].default,
    T = create_slot(D, E, E[4], null);
  return {
    c() {
      (_ = element("div")), T && T.c(), this.h();
    },
    l(C) {
      _ = claim_element(C, "DIV", { class: !0, role: !0, "aria-label": !0 });
      var R = children(_);
      T && T.l(R), R.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "wrapper svelte-17dre7j"),
        attr(_, "role", (A = E[2] ? "dialog" : void 0)),
        attr(_, "aria-label", "color picker"),
        toggle_class(_, "isOpen", E[1]),
        toggle_class(_, "isPopup", E[2]);
    },
    m(C, R) {
      insert_hydration(C, _, R), T && T.m(_, null), E[6](_), (I = !0);
    },
    p(C, [R]) {
      T &&
        T.p &&
        (!I || R & 16) &&
        update_slot_base(T, D, C, C[4], I ? get_slot_changes(D, C[4], R, null) : get_all_dirty_from_scope(C[4]), null),
        (!I || (R & 4 && A !== (A = C[2] ? "dialog" : void 0))) && attr(_, "role", A),
        (!I || R & 2) && toggle_class(_, "isOpen", C[1]),
        (!I || R & 4) && toggle_class(_, "isPopup", C[2]);
    },
    i(C) {
      I || (transition_in(T, C), (I = !0));
    },
    o(C) {
      transition_out(T, C), (I = !1);
    },
    d(C) {
      C && detach(_), T && T.d(C), E[6](null);
    },
  };
}
function instance$8(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { wrapper: T } = _,
    { isOpen: C } = _,
    { isPopup: R } = _,
    { toRight: B } = _;
  function P(O) {
    binding_callbacks[O ? "unshift" : "push"](() => {
      (T = O), A(0, T);
    });
  }
  return (
    (E.$$set = (O) => {
      "wrapper" in O && A(0, (T = O.wrapper)),
        "isOpen" in O && A(1, (C = O.isOpen)),
        "isPopup" in O && A(2, (R = O.isPopup)),
        "toRight" in O && A(3, (B = O.toRight)),
        "$$scope" in O && A(4, (D = O.$$scope));
    }),
    [T, C, R, B, D, I, P]
  );
}
class Wrapper extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$8, create_fragment$8, safe_not_equal, { wrapper: 0, isOpen: 1, isPopup: 2, toRight: 3 });
  }
}
const A11yHorizontalWrapper_svelte_svelte_type_style_lang = "",
  ChromeVariant = {
    sliderIndicator: SliderIndicator,
    pickerIndicator: PickerIndicator,
    alphaIndicator: SliderIndicator,
    pickerWrapper: PickerWrapper,
    sliderWrapper: SliderWrapper,
    alphaWrapper: SliderWrapper,
    wrapper: Wrapper,
  };
var defaultInstanceSettings = {
    update: null,
    begin: null,
    loopBegin: null,
    changeBegin: null,
    change: null,
    changeComplete: null,
    loopComplete: null,
    complete: null,
    loop: 1,
    direction: "normal",
    autoplay: !0,
    timelineOffset: 0,
  },
  defaultTweenSettings = { duration: 1e3, delay: 0, endDelay: 0, easing: "easeOutElastic(1, .5)", round: 0 },
  validTransforms = [
    "translateX",
    "translateY",
    "translateZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "perspective",
    "matrix",
    "matrix3d",
  ],
  cache = { CSS: {}, springs: {} };
function minMax(E, _, A) {
  return Math.min(Math.max(E, _), A);
}
function stringContains(E, _) {
  return E.indexOf(_) > -1;
}
function applyArguments(E, _) {
  return E.apply(null, _);
}
var is = {
  arr: function (E) {
    return Array.isArray(E);
  },
  obj: function (E) {
    return stringContains(Object.prototype.toString.call(E), "Object");
  },
  pth: function (E) {
    return is.obj(E) && E.hasOwnProperty("totalLength");
  },
  svg: function (E) {
    return E instanceof SVGElement;
  },
  inp: function (E) {
    return E instanceof HTMLInputElement;
  },
  dom: function (E) {
    return E.nodeType || is.svg(E);
  },
  str: function (E) {
    return typeof E == "string";
  },
  fnc: function (E) {
    return typeof E == "function";
  },
  und: function (E) {
    return typeof E > "u";
  },
  nil: function (E) {
    return is.und(E) || E === null;
  },
  hex: function (E) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(E);
  },
  rgb: function (E) {
    return /^rgb/.test(E);
  },
  hsl: function (E) {
    return /^hsl/.test(E);
  },
  col: function (E) {
    return is.hex(E) || is.rgb(E) || is.hsl(E);
  },
  key: function (E) {
    return (
      !defaultInstanceSettings.hasOwnProperty(E) &&
      !defaultTweenSettings.hasOwnProperty(E) &&
      E !== "targets" &&
      E !== "keyframes"
    );
  },
};
function parseEasingParameters(E) {
  var _ = /\(([^)]+)\)/.exec(E);
  return _
    ? _[1].split(",").map(function (A) {
        return parseFloat(A);
      })
    : [];
}
function spring(E, _) {
  var A = parseEasingParameters(E),
    I = minMax(is.und(A[0]) ? 1 : A[0], 0.1, 100),
    D = minMax(is.und(A[1]) ? 100 : A[1], 0.1, 100),
    T = minMax(is.und(A[2]) ? 10 : A[2], 0.1, 100),
    C = minMax(is.und(A[3]) ? 0 : A[3], 0.1, 100),
    R = Math.sqrt(D / I),
    B = T / (2 * Math.sqrt(D * I)),
    P = B < 1 ? R * Math.sqrt(1 - B * B) : 0,
    O = 1,
    F = B < 1 ? (B * R + -C) / P : -C + R;
  function L(z) {
    var V = _ ? (_ * z) / 1e3 : z;
    return (
      B < 1
        ? (V = Math.exp(-V * B * R) * (O * Math.cos(P * V) + F * Math.sin(P * V)))
        : (V = (O + F * V) * Math.exp(-V * R)),
      z === 0 || z === 1 ? z : 1 - V
    );
  }
  function U() {
    var z = cache.springs[E];
    if (z) return z;
    for (var V = 1 / 6, X = 0, G = 0; ; )
      if (((X += V), L(X) === 1)) {
        if ((G++, G >= 16)) break;
      } else G = 0;
    var Z = X * V * 1e3;
    return (cache.springs[E] = Z), Z;
  }
  return _ ? L : U;
}
function steps(E) {
  return (
    E === void 0 && (E = 10),
    function (_) {
      return Math.ceil(minMax(_, 1e-6, 1) * E) * (1 / E);
    }
  );
}
var bezier = (function () {
    var E = 11,
      _ = 1 / (E - 1);
    function A(O, F) {
      return 1 - 3 * F + 3 * O;
    }
    function I(O, F) {
      return 3 * F - 6 * O;
    }
    function D(O) {
      return 3 * O;
    }
    function T(O, F, L) {
      return ((A(F, L) * O + I(F, L)) * O + D(F)) * O;
    }
    function C(O, F, L) {
      return 3 * A(F, L) * O * O + 2 * I(F, L) * O + D(F);
    }
    function R(O, F, L, U, z) {
      var V,
        X,
        G = 0;
      do (X = F + (L - F) / 2), (V = T(X, U, z) - O), V > 0 ? (L = X) : (F = X);
      while (Math.abs(V) > 1e-7 && ++G < 10);
      return X;
    }
    function B(O, F, L, U) {
      for (var z = 0; z < 4; ++z) {
        var V = C(F, L, U);
        if (V === 0) return F;
        var X = T(F, L, U) - O;
        F -= X / V;
      }
      return F;
    }
    function P(O, F, L, U) {
      if (!(0 <= O && O <= 1 && 0 <= L && L <= 1)) return;
      var z = new Float32Array(E);
      if (O !== F || L !== U) for (var V = 0; V < E; ++V) z[V] = T(V * _, O, L);
      function X(G) {
        for (var Z = 0, Y = 1, q = E - 1; Y !== q && z[Y] <= G; ++Y) Z += _;
        --Y;
        var W = (G - z[Y]) / (z[Y + 1] - z[Y]),
          ee = Z + W * _,
          te = C(ee, O, L);
        return te >= 0.001 ? B(G, ee, O, L) : te === 0 ? ee : R(G, Z, Z + _, O, L);
      }
      return function (G) {
        return (O === F && L === U) || G === 0 || G === 1 ? G : T(X(G), F, U);
      };
    }
    return P;
  })(),
  penner = (function () {
    var E = {
        linear: function () {
          return function (I) {
            return I;
          };
        },
      },
      _ = {
        Sine: function () {
          return function (I) {
            return 1 - Math.cos((I * Math.PI) / 2);
          };
        },
        Circ: function () {
          return function (I) {
            return 1 - Math.sqrt(1 - I * I);
          };
        },
        Back: function () {
          return function (I) {
            return I * I * (3 * I - 2);
          };
        },
        Bounce: function () {
          return function (I) {
            for (var D, T = 4; I < ((D = Math.pow(2, --T)) - 1) / 11; );
            return 1 / Math.pow(4, 3 - T) - 7.5625 * Math.pow((D * 3 - 2) / 22 - I, 2);
          };
        },
        Elastic: function (I, D) {
          I === void 0 && (I = 1), D === void 0 && (D = 0.5);
          var T = minMax(I, 1, 10),
            C = minMax(D, 0.1, 2);
          return function (R) {
            return R === 0 || R === 1
              ? R
              : -T *
                  Math.pow(2, 10 * (R - 1)) *
                  Math.sin(((R - 1 - (C / (Math.PI * 2)) * Math.asin(1 / T)) * (Math.PI * 2)) / C);
          };
        },
      },
      A = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
    return (
      A.forEach(function (I, D) {
        _[I] = function () {
          return function (T) {
            return Math.pow(T, D + 2);
          };
        };
      }),
      Object.keys(_).forEach(function (I) {
        var D = _[I];
        (E["easeIn" + I] = D),
          (E["easeOut" + I] = function (T, C) {
            return function (R) {
              return 1 - D(T, C)(1 - R);
            };
          }),
          (E["easeInOut" + I] = function (T, C) {
            return function (R) {
              return R < 0.5 ? D(T, C)(R * 2) / 2 : 1 - D(T, C)(R * -2 + 2) / 2;
            };
          }),
          (E["easeOutIn" + I] = function (T, C) {
            return function (R) {
              return R < 0.5 ? (1 - D(T, C)(1 - R * 2)) / 2 : (D(T, C)(R * 2 - 1) + 1) / 2;
            };
          });
      }),
      E
    );
  })();
function parseEasings(E, _) {
  if (is.fnc(E)) return E;
  var A = E.split("(")[0],
    I = penner[A],
    D = parseEasingParameters(E);
  switch (A) {
    case "spring":
      return spring(E, _);
    case "cubicBezier":
      return applyArguments(bezier, D);
    case "steps":
      return applyArguments(steps, D);
    default:
      return applyArguments(I, D);
  }
}
function selectString(E) {
  try {
    var _ = document.querySelectorAll(E);
    return _;
  } catch {
    return;
  }
}
function filterArray(E, _) {
  for (var A = E.length, I = arguments.length >= 2 ? arguments[1] : void 0, D = [], T = 0; T < A; T++)
    if (T in E) {
      var C = E[T];
      _.call(I, C, T, E) && D.push(C);
    }
  return D;
}
function flattenArray(E) {
  return E.reduce(function (_, A) {
    return _.concat(is.arr(A) ? flattenArray(A) : A);
  }, []);
}
function toArray(E) {
  return is.arr(E)
    ? E
    : (is.str(E) && (E = selectString(E) || E),
      E instanceof NodeList || E instanceof HTMLCollection ? [].slice.call(E) : [E]);
}
function arrayContains(E, _) {
  return E.some(function (A) {
    return A === _;
  });
}
function cloneObject(E) {
  var _ = {};
  for (var A in E) _[A] = E[A];
  return _;
}
function replaceObjectProps(E, _) {
  var A = cloneObject(E);
  for (var I in E) A[I] = _.hasOwnProperty(I) ? _[I] : E[I];
  return A;
}
function mergeObjects(E, _) {
  var A = cloneObject(E);
  for (var I in _) A[I] = is.und(E[I]) ? _[I] : E[I];
  return A;
}
function rgbToRgba(E) {
  var _ = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(E);
  return _ ? "rgba(" + _[1] + ",1)" : E;
}
function hexToRgba(E) {
  var _ = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    A = E.replace(_, function (R, B, P, O) {
      return B + B + P + P + O + O;
    }),
    I = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(A),
    D = parseInt(I[1], 16),
    T = parseInt(I[2], 16),
    C = parseInt(I[3], 16);
  return "rgba(" + D + "," + T + "," + C + ",1)";
}
function hslToRgba(E) {
  var _ =
      /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(E) ||
      /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(E),
    A = parseInt(_[1], 10) / 360,
    I = parseInt(_[2], 10) / 100,
    D = parseInt(_[3], 10) / 100,
    T = _[4] || 1;
  function C(L, U, z) {
    return (
      z < 0 && (z += 1),
      z > 1 && (z -= 1),
      z < 1 / 6 ? L + (U - L) * 6 * z : z < 1 / 2 ? U : z < 2 / 3 ? L + (U - L) * (2 / 3 - z) * 6 : L
    );
  }
  var R, B, P;
  if (I == 0) R = B = P = D;
  else {
    var O = D < 0.5 ? D * (1 + I) : D + I - D * I,
      F = 2 * D - O;
    (R = C(F, O, A + 1 / 3)), (B = C(F, O, A)), (P = C(F, O, A - 1 / 3));
  }
  return "rgba(" + R * 255 + "," + B * 255 + "," + P * 255 + "," + T + ")";
}
function colorToRgb(E) {
  if (is.rgb(E)) return rgbToRgba(E);
  if (is.hex(E)) return hexToRgba(E);
  if (is.hsl(E)) return hslToRgba(E);
}
function getUnit(E) {
  var _ =
    /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
      E,
    );
  if (_) return _[1];
}
function getTransformUnit(E) {
  if (stringContains(E, "translate") || E === "perspective") return "px";
  if (stringContains(E, "rotate") || stringContains(E, "skew")) return "deg";
}
function getFunctionValue(E, _) {
  return is.fnc(E) ? E(_.target, _.id, _.total) : E;
}
function getAttribute(E, _) {
  return E.getAttribute(_);
}
function convertPxToUnit(E, _, A) {
  var I = getUnit(_);
  if (arrayContains([A, "deg", "rad", "turn"], I)) return _;
  var D = cache.CSS[_ + A];
  if (!is.und(D)) return D;
  var T = 100,
    C = document.createElement(E.tagName),
    R = E.parentNode && E.parentNode !== document ? E.parentNode : document.body;
  R.appendChild(C), (C.style.position = "absolute"), (C.style.width = T + A);
  var B = T / C.offsetWidth;
  R.removeChild(C);
  var P = B * parseFloat(_);
  return (cache.CSS[_ + A] = P), P;
}
function getCSSValue(E, _, A) {
  if (_ in E.style) {
    var I = _.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
      D = E.style[_] || getComputedStyle(E).getPropertyValue(I) || "0";
    return A ? convertPxToUnit(E, D, A) : D;
  }
}
function getAnimationType(E, _) {
  if (is.dom(E) && !is.inp(E) && (!is.nil(getAttribute(E, _)) || (is.svg(E) && E[_]))) return "attribute";
  if (is.dom(E) && arrayContains(validTransforms, _)) return "transform";
  if (is.dom(E) && _ !== "transform" && getCSSValue(E, _)) return "css";
  if (E[_] != null) return "object";
}
function getElementTransforms(E) {
  if (is.dom(E)) {
    for (var _ = E.style.transform || "", A = /(\w+)\(([^)]*)\)/g, I = new Map(), D; (D = A.exec(_)); )
      I.set(D[1], D[2]);
    return I;
  }
}
function getTransformValue(E, _, A, I) {
  var D = stringContains(_, "scale") ? 1 : 0 + getTransformUnit(_),
    T = getElementTransforms(E).get(_) || D;
  return A && (A.transforms.list.set(_, T), (A.transforms.last = _)), I ? convertPxToUnit(E, T, I) : T;
}
function getOriginalTargetValue(E, _, A, I) {
  switch (getAnimationType(E, _)) {
    case "transform":
      return getTransformValue(E, _, I, A);
    case "css":
      return getCSSValue(E, _, A);
    case "attribute":
      return getAttribute(E, _);
    default:
      return E[_] || 0;
  }
}
function getRelativeValue(E, _) {
  var A = /^(\*=|\+=|-=)/.exec(E);
  if (!A) return E;
  var I = getUnit(E) || 0,
    D = parseFloat(_),
    T = parseFloat(E.replace(A[0], ""));
  switch (A[0][0]) {
    case "+":
      return D + T + I;
    case "-":
      return D - T + I;
    case "*":
      return D * T + I;
  }
}
function validateValue(E, _) {
  if (is.col(E)) return colorToRgb(E);
  if (/\s/g.test(E)) return E;
  var A = getUnit(E),
    I = A ? E.substr(0, E.length - A.length) : E;
  return _ ? I + _ : I;
}
function getDistance(E, _) {
  return Math.sqrt(Math.pow(_.x - E.x, 2) + Math.pow(_.y - E.y, 2));
}
function getCircleLength(E) {
  return Math.PI * 2 * getAttribute(E, "r");
}
function getRectLength(E) {
  return getAttribute(E, "width") * 2 + getAttribute(E, "height") * 2;
}
function getLineLength(E) {
  return getDistance(
    { x: getAttribute(E, "x1"), y: getAttribute(E, "y1") },
    { x: getAttribute(E, "x2"), y: getAttribute(E, "y2") },
  );
}
function getPolylineLength(E) {
  for (var _ = E.points, A = 0, I, D = 0; D < _.numberOfItems; D++) {
    var T = _.getItem(D);
    D > 0 && (A += getDistance(I, T)), (I = T);
  }
  return A;
}
function getPolygonLength(E) {
  var _ = E.points;
  return getPolylineLength(E) + getDistance(_.getItem(_.numberOfItems - 1), _.getItem(0));
}
function getTotalLength(E) {
  if (E.getTotalLength) return E.getTotalLength();
  switch (E.tagName.toLowerCase()) {
    case "circle":
      return getCircleLength(E);
    case "rect":
      return getRectLength(E);
    case "line":
      return getLineLength(E);
    case "polyline":
      return getPolylineLength(E);
    case "polygon":
      return getPolygonLength(E);
  }
}
function setDashoffset(E) {
  var _ = getTotalLength(E);
  return E.setAttribute("stroke-dasharray", _), _;
}
function getParentSvgEl(E) {
  for (var _ = E.parentNode; is.svg(_) && is.svg(_.parentNode); ) _ = _.parentNode;
  return _;
}
function getParentSvg(E, _) {
  var A = _ || {},
    I = A.el || getParentSvgEl(E),
    D = I.getBoundingClientRect(),
    T = getAttribute(I, "viewBox"),
    C = D.width,
    R = D.height,
    B = A.viewBox || (T ? T.split(" ") : [0, 0, C, R]);
  return { el: I, viewBox: B, x: B[0] / 1, y: B[1] / 1, w: C, h: R, vW: B[2], vH: B[3] };
}
function getPath(E, _) {
  var A = is.str(E) ? selectString(E)[0] : E,
    I = _ || 100;
  return function (D) {
    return { property: D, el: A, svg: getParentSvg(A), totalLength: getTotalLength(A) * (I / 100) };
  };
}
function getPathProgress(E, _, A) {
  function I(O) {
    O === void 0 && (O = 0);
    var F = _ + O >= 1 ? _ + O : 0;
    return E.el.getPointAtLength(F);
  }
  var D = getParentSvg(E.el, E.svg),
    T = I(),
    C = I(-1),
    R = I(1),
    B = A ? 1 : D.w / D.vW,
    P = A ? 1 : D.h / D.vH;
  switch (E.property) {
    case "x":
      return (T.x - D.x) * B;
    case "y":
      return (T.y - D.y) * P;
    case "angle":
      return (Math.atan2(R.y - C.y, R.x - C.x) * 180) / Math.PI;
  }
}
function decomposeValue(E, _) {
  var A = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,
    I = validateValue(is.pth(E) ? E.totalLength : E, _) + "";
  return { original: I, numbers: I.match(A) ? I.match(A).map(Number) : [0], strings: is.str(E) || _ ? I.split(A) : [] };
}
function parseTargets(E) {
  var _ = E ? flattenArray(is.arr(E) ? E.map(toArray) : toArray(E)) : [];
  return filterArray(_, function (A, I, D) {
    return D.indexOf(A) === I;
  });
}
function getAnimatables(E) {
  var _ = parseTargets(E);
  return _.map(function (A, I) {
    return { target: A, id: I, total: _.length, transforms: { list: getElementTransforms(A) } };
  });
}
function normalizePropertyTweens(E, _) {
  var A = cloneObject(_);
  if ((/^spring/.test(A.easing) && (A.duration = spring(A.easing)), is.arr(E))) {
    var I = E.length,
      D = I === 2 && !is.obj(E[0]);
    D ? (E = { value: E }) : is.fnc(_.duration) || (A.duration = _.duration / I);
  }
  var T = is.arr(E) ? E : [E];
  return T.map(function (C, R) {
    var B = is.obj(C) && !is.pth(C) ? C : { value: C };
    return (
      is.und(B.delay) && (B.delay = R ? 0 : _.delay),
      is.und(B.endDelay) && (B.endDelay = R === T.length - 1 ? _.endDelay : 0),
      B
    );
  }).map(function (C) {
    return mergeObjects(C, A);
  });
}
function flattenKeyframes(E) {
  for (
    var _ = filterArray(
        flattenArray(
          E.map(function (T) {
            return Object.keys(T);
          }),
        ),
        function (T) {
          return is.key(T);
        },
      ).reduce(function (T, C) {
        return T.indexOf(C) < 0 && T.push(C), T;
      }, []),
      A = {},
      I = function (T) {
        var C = _[T];
        A[C] = E.map(function (R) {
          var B = {};
          for (var P in R) is.key(P) ? P == C && (B.value = R[P]) : (B[P] = R[P]);
          return B;
        });
      },
      D = 0;
    D < _.length;
    D++
  )
    I(D);
  return A;
}
function getProperties(E, _) {
  var A = [],
    I = _.keyframes;
  I && (_ = mergeObjects(flattenKeyframes(I), _));
  for (var D in _) is.key(D) && A.push({ name: D, tweens: normalizePropertyTweens(_[D], E) });
  return A;
}
function normalizeTweenValues(E, _) {
  var A = {};
  for (var I in E) {
    var D = getFunctionValue(E[I], _);
    is.arr(D) &&
      ((D = D.map(function (T) {
        return getFunctionValue(T, _);
      })),
      D.length === 1 && (D = D[0])),
      (A[I] = D);
  }
  return (A.duration = parseFloat(A.duration)), (A.delay = parseFloat(A.delay)), A;
}
function normalizeTweens(E, _) {
  var A;
  return E.tweens.map(function (I) {
    var D = normalizeTweenValues(I, _),
      T = D.value,
      C = is.arr(T) ? T[1] : T,
      R = getUnit(C),
      B = getOriginalTargetValue(_.target, E.name, R, _),
      P = A ? A.to.original : B,
      O = is.arr(T) ? T[0] : P,
      F = getUnit(O) || getUnit(B),
      L = R || F;
    return (
      is.und(C) && (C = P),
      (D.from = decomposeValue(O, L)),
      (D.to = decomposeValue(getRelativeValue(C, O), L)),
      (D.start = A ? A.end : 0),
      (D.end = D.start + D.delay + D.duration + D.endDelay),
      (D.easing = parseEasings(D.easing, D.duration)),
      (D.isPath = is.pth(T)),
      (D.isPathTargetInsideSVG = D.isPath && is.svg(_.target)),
      (D.isColor = is.col(D.from.original)),
      D.isColor && (D.round = 1),
      (A = D),
      D
    );
  });
}
var setProgressValue = {
  css: function (E, _, A) {
    return (E.style[_] = A);
  },
  attribute: function (E, _, A) {
    return E.setAttribute(_, A);
  },
  object: function (E, _, A) {
    return (E[_] = A);
  },
  transform: function (E, _, A, I, D) {
    if ((I.list.set(_, A), _ === I.last || D)) {
      var T = "";
      I.list.forEach(function (C, R) {
        T += R + "(" + C + ") ";
      }),
        (E.style.transform = T);
    }
  },
};
function setTargetsValue(E, _) {
  var A = getAnimatables(E);
  A.forEach(function (I) {
    for (var D in _) {
      var T = getFunctionValue(_[D], I),
        C = I.target,
        R = getUnit(T),
        B = getOriginalTargetValue(C, D, R, I),
        P = R || getUnit(B),
        O = getRelativeValue(validateValue(T, P), B),
        F = getAnimationType(C, D);
      setProgressValue[F](C, D, O, I.transforms, !0);
    }
  });
}
function createAnimation(E, _) {
  var A = getAnimationType(E.target, _.name);
  if (A) {
    var I = normalizeTweens(_, E),
      D = I[I.length - 1];
    return {
      type: A,
      property: _.name,
      animatable: E,
      tweens: I,
      duration: D.end,
      delay: I[0].delay,
      endDelay: D.endDelay,
    };
  }
}
function getAnimations(E, _) {
  return filterArray(
    flattenArray(
      E.map(function (A) {
        return _.map(function (I) {
          return createAnimation(A, I);
        });
      }),
    ),
    function (A) {
      return !is.und(A);
    },
  );
}
function getInstanceTimings(E, _) {
  var A = E.length,
    I = function (T) {
      return T.timelineOffset ? T.timelineOffset : 0;
    },
    D = {};
  return (
    (D.duration = A
      ? Math.max.apply(
          Math,
          E.map(function (T) {
            return I(T) + T.duration;
          }),
        )
      : _.duration),
    (D.delay = A
      ? Math.min.apply(
          Math,
          E.map(function (T) {
            return I(T) + T.delay;
          }),
        )
      : _.delay),
    (D.endDelay = A
      ? D.duration -
        Math.max.apply(
          Math,
          E.map(function (T) {
            return I(T) + T.duration - T.endDelay;
          }),
        )
      : _.endDelay),
    D
  );
}
var instanceID = 0;
function createNewInstance(E) {
  var _ = replaceObjectProps(defaultInstanceSettings, E),
    A = replaceObjectProps(defaultTweenSettings, E),
    I = getProperties(A, E),
    D = getAnimatables(E.targets),
    T = getAnimations(D, I),
    C = getInstanceTimings(T, A),
    R = instanceID;
  return (
    instanceID++,
    mergeObjects(_, {
      id: R,
      children: [],
      animatables: D,
      animations: T,
      duration: C.duration,
      delay: C.delay,
      endDelay: C.endDelay,
    })
  );
}
var activeInstances = [],
  engine = (function () {
    var E;
    function _() {
      !E &&
        (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) &&
        activeInstances.length > 0 &&
        (E = requestAnimationFrame(A));
    }
    function A(D) {
      for (var T = activeInstances.length, C = 0; C < T; ) {
        var R = activeInstances[C];
        R.paused ? (activeInstances.splice(C, 1), T--) : (R.tick(D), C++);
      }
      E = C > 0 ? requestAnimationFrame(A) : void 0;
    }
    function I() {
      anime.suspendWhenDocumentHidden &&
        (isDocumentHidden()
          ? (E = cancelAnimationFrame(E))
          : (activeInstances.forEach(function (D) {
              return D._onDocumentVisibility();
            }),
            engine()));
    }
    return typeof document < "u" && document.addEventListener("visibilitychange", I), _;
  })();
function isDocumentHidden() {
  return !!document && document.hidden;
}
function anime(E) {
  E === void 0 && (E = {});
  var _ = 0,
    A = 0,
    I = 0,
    D,
    T = 0,
    C = null;
  function R(Z) {
    var Y =
      window.Promise &&
      new Promise(function (q) {
        return (C = q);
      });
    return (Z.finished = Y), Y;
  }
  var B = createNewInstance(E);
  R(B);
  function P() {
    var Z = B.direction;
    Z !== "alternate" && (B.direction = Z !== "normal" ? "normal" : "reverse"),
      (B.reversed = !B.reversed),
      D.forEach(function (Y) {
        return (Y.reversed = B.reversed);
      });
  }
  function O(Z) {
    return B.reversed ? B.duration - Z : Z;
  }
  function F() {
    (_ = 0), (A = O(B.currentTime) * (1 / anime.speed));
  }
  function L(Z, Y) {
    Y && Y.seek(Z - Y.timelineOffset);
  }
  function U(Z) {
    if (B.reversePlayback) for (var q = T; q--; ) L(Z, D[q]);
    else for (var Y = 0; Y < T; Y++) L(Z, D[Y]);
  }
  function z(Z) {
    for (var Y = 0, q = B.animations, W = q.length; Y < W; ) {
      var ee = q[Y],
        te = ee.animatable,
        Q = ee.tweens,
        J = Q.length - 1,
        K = Q[J];
      J &&
        (K =
          filterArray(Q, function (we) {
            return Z < we.end;
          })[0] || K);
      for (
        var ne = minMax(Z - K.start - K.delay, 0, K.duration) / K.duration,
          re = isNaN(ne) ? 1 : K.easing(ne),
          ie = K.to.strings,
          se = K.round,
          oe = [],
          _e = K.to.numbers.length,
          ve = void 0,
          fe = 0;
        fe < _e;
        fe++
      ) {
        var ke = void 0,
          me = K.to.numbers[fe],
          Ee = K.from.numbers[fe] || 0;
        K.isPath ? (ke = getPathProgress(K.value, re * me, K.isPathTargetInsideSVG)) : (ke = Ee + re * (me - Ee)),
          se && ((K.isColor && fe > 2) || (ke = Math.round(ke * se) / se)),
          oe.push(ke);
      }
      var Se = ie.length;
      if (!Se) ve = oe[0];
      else {
        ve = ie[0];
        for (var ue = 0; ue < Se; ue++) {
          ie[ue];
          var xe = ie[ue + 1],
            pe = oe[ue];
          isNaN(pe) || (xe ? (ve += pe + xe) : (ve += pe + " "));
        }
      }
      setProgressValue[ee.type](te.target, ee.property, ve, te.transforms), (ee.currentValue = ve), Y++;
    }
  }
  function V(Z) {
    B[Z] && !B.passThrough && B[Z](B);
  }
  function X() {
    B.remaining && B.remaining !== !0 && B.remaining--;
  }
  function G(Z) {
    var Y = B.duration,
      q = B.delay,
      W = Y - B.endDelay,
      ee = O(Z);
    (B.progress = minMax((ee / Y) * 100, 0, 100)),
      (B.reversePlayback = ee < B.currentTime),
      D && U(ee),
      !B.began && B.currentTime > 0 && ((B.began = !0), V("begin")),
      !B.loopBegan && B.currentTime > 0 && ((B.loopBegan = !0), V("loopBegin")),
      ee <= q && B.currentTime !== 0 && z(0),
      ((ee >= W && B.currentTime !== Y) || !Y) && z(Y),
      ee > q && ee < W
        ? (B.changeBegan || ((B.changeBegan = !0), (B.changeCompleted = !1), V("changeBegin")), V("change"), z(ee))
        : B.changeBegan && ((B.changeCompleted = !0), (B.changeBegan = !1), V("changeComplete")),
      (B.currentTime = minMax(ee, 0, Y)),
      B.began && V("update"),
      Z >= Y &&
        ((A = 0),
        X(),
        B.remaining
          ? ((_ = I), V("loopComplete"), (B.loopBegan = !1), B.direction === "alternate" && P())
          : ((B.paused = !0),
            B.completed ||
              ((B.completed = !0),
              V("loopComplete"),
              V("complete"),
              !B.passThrough && "Promise" in window && (C(), R(B)))));
  }
  return (
    (B.reset = function () {
      var Z = B.direction;
      (B.passThrough = !1),
        (B.currentTime = 0),
        (B.progress = 0),
        (B.paused = !0),
        (B.began = !1),
        (B.loopBegan = !1),
        (B.changeBegan = !1),
        (B.completed = !1),
        (B.changeCompleted = !1),
        (B.reversePlayback = !1),
        (B.reversed = Z === "reverse"),
        (B.remaining = B.loop),
        (D = B.children),
        (T = D.length);
      for (var Y = T; Y--; ) B.children[Y].reset();
      ((B.reversed && B.loop !== !0) || (Z === "alternate" && B.loop === 1)) && B.remaining++,
        z(B.reversed ? B.duration : 0);
    }),
    (B._onDocumentVisibility = F),
    (B.set = function (Z, Y) {
      return setTargetsValue(Z, Y), B;
    }),
    (B.tick = function (Z) {
      (I = Z), _ || (_ = I), G((I + (A - _)) * anime.speed);
    }),
    (B.seek = function (Z) {
      G(O(Z));
    }),
    (B.pause = function () {
      (B.paused = !0), F();
    }),
    (B.play = function () {
      B.paused && (B.completed && B.reset(), (B.paused = !1), activeInstances.push(B), F(), engine());
    }),
    (B.reverse = function () {
      P(), (B.completed = !B.reversed), F();
    }),
    (B.restart = function () {
      B.reset(), B.play();
    }),
    (B.remove = function (Z) {
      var Y = parseTargets(Z);
      removeTargetsFromInstance(Y, B);
    }),
    B.reset(),
    B.autoplay && B.play(),
    B
  );
}
function removeTargetsFromAnimations(E, _) {
  for (var A = _.length; A--; ) arrayContains(E, _[A].animatable.target) && _.splice(A, 1);
}
function removeTargetsFromInstance(E, _) {
  var A = _.animations,
    I = _.children;
  removeTargetsFromAnimations(E, A);
  for (var D = I.length; D--; ) {
    var T = I[D],
      C = T.animations;
    removeTargetsFromAnimations(E, C), !C.length && !T.children.length && I.splice(D, 1);
  }
  !A.length && !I.length && _.pause();
}
function removeTargetsFromActiveInstances(E) {
  for (var _ = parseTargets(E), A = activeInstances.length; A--; ) {
    var I = activeInstances[A];
    removeTargetsFromInstance(_, I);
  }
}
function stagger(E, _) {
  _ === void 0 && (_ = {});
  var A = _.direction || "normal",
    I = _.easing ? parseEasings(_.easing) : null,
    D = _.grid,
    T = _.axis,
    C = _.from || 0,
    R = C === "first",
    B = C === "center",
    P = C === "last",
    O = is.arr(E),
    F = parseFloat(O ? E[0] : E),
    L = O ? parseFloat(E[1]) : 0,
    U = getUnit(O ? E[1] : E) || 0,
    z = _.start || 0 + (O ? F : 0),
    V = [],
    X = 0;
  return function (G, Z, Y) {
    if ((R && (C = 0), B && (C = (Y - 1) / 2), P && (C = Y - 1), !V.length)) {
      for (var q = 0; q < Y; q++) {
        if (!D) V.push(Math.abs(C - q));
        else {
          var W = B ? (D[0] - 1) / 2 : C % D[0],
            ee = B ? (D[1] - 1) / 2 : Math.floor(C / D[0]),
            te = q % D[0],
            Q = Math.floor(q / D[0]),
            J = W - te,
            K = ee - Q,
            ne = Math.sqrt(J * J + K * K);
          T === "x" && (ne = -J), T === "y" && (ne = -K), V.push(ne);
        }
        X = Math.max.apply(Math, V);
      }
      I &&
        (V = V.map(function (ie) {
          return I(ie / X) * X;
        })),
        A === "reverse" &&
          (V = V.map(function (ie) {
            return T ? (ie < 0 ? ie * -1 : -ie) : Math.abs(X - ie);
          }));
    }
    var re = O ? (L - F) / X : F;
    return z + re * (Math.round(V[Z] * 100) / 100) + U;
  };
}
function timeline(E) {
  E === void 0 && (E = {});
  var _ = anime(E);
  return (
    (_.duration = 0),
    (_.add = function (A, I) {
      var D = activeInstances.indexOf(_),
        T = _.children;
      D > -1 && activeInstances.splice(D, 1);
      function C(L) {
        L.passThrough = !0;
      }
      for (var R = 0; R < T.length; R++) C(T[R]);
      var B = mergeObjects(A, replaceObjectProps(defaultTweenSettings, E));
      B.targets = B.targets || E.targets;
      var P = _.duration;
      (B.autoplay = !1),
        (B.direction = _.direction),
        (B.timelineOffset = is.und(I) ? P : getRelativeValue(I, P)),
        C(_),
        _.seek(B.timelineOffset);
      var O = anime(B);
      C(O), T.push(O);
      var F = getInstanceTimings(T, E);
      return (
        (_.delay = F.delay),
        (_.endDelay = F.endDelay),
        (_.duration = F.duration),
        _.seek(0),
        _.reset(),
        _.autoplay && _.play(),
        _
      );
    }),
    _
  );
}
anime.version = "3.2.1";
anime.speed = 1;
anime.suspendWhenDocumentHidden = !0;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (E, _) {
  return Math.floor(Math.random() * (_ - E + 1)) + E;
};
const colorPalette = writable([]),
  selectedColor = writable([0, 0, 0]),
  currentColorPick = writable([0, 0, 0]),
  defaultPalettes = readable([
    [
      [39, 39, 68],
      [139, 109, 156],
      [198, 159, 165],
      [242, 211, 171],
      [251, 245, 239],
    ],
    [
      [242, 240, 229],
      [184, 181, 185],
      [134, 129, 136],
      [100, 99, 101],
      [69, 68, 79],
      [58, 56, 88],
      [33, 33, 35],
      [53, 43, 66],
      [67, 67, 106],
      [75, 128, 202],
      [104, 194, 211],
      [162, 220, 199],
      [237, 225, 158],
      [211, 160, 104],
      [180, 82, 82],
      [106, 83, 110],
      [75, 65, 88],
      [128, 73, 58],
      [167, 123, 91],
      [229, 206, 180],
      [194, 211, 104],
      [138, 176, 96],
      [86, 123, 121],
      [78, 88, 74],
      [123, 114, 67],
      [178, 180, 126],
      [237, 200, 196],
      [207, 138, 203],
      [95, 85, 106],
    ],
    [
      [15, 15, 27],
      [86, 90, 117],
      [198, 183, 190],
      [250, 251, 246],
    ],
    [
      [0, 0, 0],
      [111, 103, 118],
      [154, 154, 151],
      [197, 204, 184],
      [139, 85, 128],
      [195, 136, 144],
      [165, 147, 165],
      [102, 96, 146],
      [154, 79, 80],
      [194, 141, 117],
      [124, 161, 192],
      [65, 106, 163],
      [141, 98, 104],
      [190, 149, 92],
      [104, 172, 169],
      [56, 112, 128],
      [110, 105, 98],
      [147, 161, 103],
      [110, 170, 120],
      [85, 112, 100],
      [157, 159, 127],
      [93, 104, 114],
      [67, 52, 85],
    ],
    [
      [140, 143, 174],
      [88, 69, 99],
      [62, 33, 55],
      [154, 99, 72],
      [215, 155, 125],
      [245, 237, 186],
      [192, 199, 65],
      [100, 125, 52],
      [228, 148, 58],
      [157, 48, 59],
      [210, 100, 113],
      [112, 55, 127],
      [126, 196, 193],
      [52, 133, 157],
      [23, 67, 75],
      [31, 14, 28],
    ],
    [
      [19, 2, 8],
      [31, 5, 16],
      [49, 5, 30],
      [70, 14, 43],
      [124, 24, 60],
      [213, 60, 106],
      [255, 130, 116],
    ],
    [
      [31, 36, 10],
      [57, 87, 28],
      [165, 140, 39],
      [239, 172, 40],
      [239, 216, 161],
      [171, 92, 28],
      [24, 63, 57],
      [239, 105, 47],
      [239, 183, 117],
      [165, 98, 67],
      [119, 52, 33],
      [114, 65, 19],
      [42, 29, 13],
      [57, 42, 28],
      [104, 76, 60],
      [146, 126, 106],
      [39, 100, 104],
      [239, 58, 12],
      [69, 35, 13],
      [60, 159, 156],
      [155, 26, 10],
      [54, 23, 12],
      [85, 15, 10],
      [48, 15, 10],
    ],
    [
      [26, 28, 44],
      [93, 39, 93],
      [177, 62, 83],
      [239, 125, 87],
      [255, 205, 117],
      [167, 240, 112],
      [56, 183, 100],
      [37, 113, 121],
      [41, 54, 111],
      [59, 93, 201],
      [65, 166, 246],
      [115, 239, 247],
      [244, 244, 244],
      [148, 176, 194],
      [86, 108, 134],
      [51, 60, 87],
    ],
    [
      [99, 102, 99],
      [135, 133, 124],
      [188, 173, 159],
      [242, 184, 136],
      [235, 150, 97],
      [181, 89, 69],
      [115, 76, 68],
      [61, 51, 51],
      [89, 62, 71],
      [122, 88, 89],
      [165, 120, 85],
      [222, 159, 71],
      [253, 209, 121],
      [254, 225, 184],
      [212, 198, 146],
      [166, 176, 79],
      [129, 148, 71],
      [68, 112, 45],
      [47, 77, 47],
      [84, 103, 86],
      [137, 164, 119],
      [164, 197, 175],
      [202, 230, 217],
      [241, 246, 240],
      [213, 214, 219],
      [187, 195, 208],
      [150, 169, 193],
      [108, 129, 161],
      [64, 82, 115],
      [48, 56, 67],
      [20, 35, 58],
    ],
    [
      [6, 6, 8],
      [20, 16, 19],
      [59, 23, 37],
      [115, 23, 45],
      [180, 32, 42],
      [223, 62, 35],
      [250, 106, 10],
      [249, 163, 27],
      [255, 213, 65],
      [255, 252, 64],
      [214, 242, 100],
      [156, 219, 67],
      [89, 193, 53],
      [20, 160, 46],
      [26, 122, 62],
      [36, 82, 59],
      [18, 32, 32],
      [20, 52, 100],
      [40, 92, 196],
      [36, 159, 222],
      [32, 214, 199],
      [166, 252, 219],
      [255, 255, 255],
      [254, 243, 192],
      [250, 214, 184],
      [245, 160, 151],
      [232, 106, 115],
      [188, 74, 155],
      [121, 58, 128],
      [64, 51, 83],
      [36, 34, 52],
      [34, 28, 26],
      [50, 43, 40],
      [113, 65, 59],
      [187, 117, 71],
      [219, 164, 99],
      [244, 210, 156],
      [218, 224, 234],
      [179, 185, 209],
      [139, 147, 175],
      [109, 117, 141],
      [74, 84, 98],
      [51, 57, 65],
      [66, 36, 51],
      [91, 49, 56],
      [142, 82, 82],
      [186, 117, 106],
      [233, 181, 163],
      [227, 230, 255],
      [185, 191, 251],
      [132, 155, 228],
      [88, 141, 190],
      [71, 125, 133],
      [35, 103, 78],
      [50, 132, 100],
      [93, 175, 141],
      [146, 220, 186],
      [205, 247, 226],
      [228, 210, 170],
      [199, 176, 139],
      [160, 134, 98],
      [121, 103, 85],
      [90, 78, 68],
      [66, 57, 52],
    ],
    [
      [33, 30, 32],
      [85, 85, 104],
      [160, 160, 139],
      [233, 239, 236],
    ],
    [
      [5, 31, 57],
      [74, 36, 128],
      [197, 58, 157],
      [255, 142, 128],
    ],
    [
      [19, 19, 19],
      [27, 27, 27],
      [39, 39, 39],
      [61, 61, 61],
      [93, 93, 93],
      [133, 133, 133],
      [180, 180, 180],
      [255, 255, 255],
      [199, 207, 221],
      [146, 161, 185],
      [101, 115, 146],
      [66, 76, 110],
      [42, 47, 78],
      [26, 25, 50],
      [14, 7, 27],
      [28, 18, 28],
      [57, 31, 33],
      [93, 44, 40],
      [138, 72, 54],
      [191, 111, 74],
      [230, 156, 105],
      [246, 202, 159],
      [249, 230, 207],
      [237, 171, 80],
      [224, 116, 56],
      [198, 69, 36],
      [142, 37, 29],
      [255, 80, 0],
      [237, 118, 20],
      [255, 162, 20],
      [255, 200, 37],
      [255, 235, 87],
      [211, 252, 126],
      [153, 230, 95],
      [90, 197, 79],
      [51, 152, 75],
      [30, 111, 80],
      [19, 76, 76],
      [12, 46, 68],
      [0, 57, 109],
      [0, 105, 170],
      [0, 152, 220],
      [0, 205, 249],
      [12, 241, 255],
      [148, 253, 255],
      [253, 210, 237],
      [243, 137, 245],
      [219, 63, 253],
      [122, 9, 250],
      [48, 3, 217],
      [12, 2, 147],
      [3, 25, 63],
      [59, 20, 67],
      [98, 36, 97],
      [147, 56, 143],
      [202, 82, 201],
      [200, 80, 134],
      [246, 129, 135],
      [245, 85, 93],
      [234, 50, 60],
      [196, 36, 48],
      [137, 30, 43],
      [87, 28, 39],
    ],
    [
      [91, 166, 117],
      [107, 201, 108],
      [171, 221, 100],
      [252, 239, 141],
      [255, 184, 121],
      [234, 98, 98],
      [204, 66, 94],
      [163, 40, 88],
      [117, 23, 86],
      [57, 9, 71],
      [97, 24, 81],
      [135, 53, 85],
      [166, 85, 95],
      [201, 115, 115],
      [242, 174, 153],
      [255, 195, 242],
      [238, 143, 203],
      [212, 110, 179],
      [135, 62, 132],
      [31, 16, 42],
      [74, 48, 82],
      [123, 84, 128],
      [166, 133, 159],
      [217, 189, 200],
      [255, 255, 255],
      [174, 226, 255],
      [141, 183, 255],
      [109, 128, 250],
      [132, 101, 236],
      [131, 77, 196],
      [125, 45, 160],
      [78, 24, 124],
    ],
    [
      [40, 40, 46],
      [108, 86, 113],
      [217, 200, 191],
      [249, 130, 132],
      [176, 169, 228],
      [172, 204, 228],
      [179, 227, 218],
      [254, 170, 228],
      [135, 168, 137],
      [176, 235, 147],
      [233, 245, 157],
      [255, 230, 198],
      [222, 163, 139],
      [255, 195, 132],
      [255, 247, 160],
      [255, 247, 228],
    ],
    [
      [203, 129, 117],
      [226, 169, 126],
      [240, 207, 142],
      [246, 237, 205],
      [168, 200, 166],
      [109, 141, 138],
      [101, 80, 87],
    ],
    [
      [0, 0, 0],
      [18, 23, 61],
      [41, 50, 104],
      [70, 75, 140],
      [107, 116, 178],
      [144, 158, 221],
      [193, 217, 242],
      [255, 255, 255],
      [162, 147, 196],
      [123, 106, 165],
      [83, 66, 127],
      [60, 44, 104],
      [67, 30, 102],
      [93, 47, 140],
      [133, 76, 191],
      [180, 131, 239],
      [140, 255, 155],
      [66, 188, 127],
      [34, 137, 110],
      [20, 102, 91],
      [15, 74, 76],
      [10, 42, 51],
      [29, 26, 89],
      [50, 45, 137],
      [53, 74, 178],
      [62, 131, 209],
      [80, 185, 235],
      [140, 218, 255],
      [83, 161, 173],
      [59, 118, 143],
      [33, 82, 107],
      [22, 55, 85],
      [0, 135, 130],
      [0, 170, 165],
      [39, 211, 203],
      [120, 250, 230],
      [205, 197, 153],
      [152, 143, 100],
      [92, 93, 65],
      [53, 63, 35],
      [145, 155, 69],
      [175, 211, 112],
      [255, 224, 145],
      [255, 170, 110],
      [255, 105, 90],
      [178, 60, 64],
      [255, 102, 117],
      [221, 55, 69],
      [165, 38, 57],
      [114, 28, 47],
      [178, 46, 105],
      [229, 66, 134],
      [255, 110, 175],
      [255, 165, 213],
      [255, 211, 173],
      [204, 129, 122],
      [137, 86, 84],
      [97, 57, 59],
      [63, 31, 60],
      [114, 51, 82],
      [153, 76, 105],
      [195, 114, 137],
      [242, 159, 170],
      [255, 204, 208],
    ],
    [
      [23, 32, 56],
      [37, 58, 94],
      [60, 94, 139],
      [79, 143, 186],
      [115, 190, 211],
      [164, 221, 219],
      [25, 51, 45],
      [37, 86, 46],
      [70, 130, 50],
      [117, 167, 67],
      [168, 202, 88],
      [208, 218, 145],
      [77, 43, 50],
      [122, 72, 65],
      [173, 119, 87],
      [192, 148, 115],
      [215, 181, 148],
      [231, 213, 179],
      [52, 28, 39],
      [96, 44, 44],
      [136, 75, 43],
      [190, 119, 44],
      [222, 158, 65],
      [232, 193, 112],
      [36, 21, 39],
      [65, 29, 49],
      [117, 36, 56],
      [165, 48, 48],
      [207, 87, 60],
      [218, 134, 62],
      [30, 29, 57],
      [64, 39, 81],
      [122, 54, 123],
      [162, 62, 140],
      [198, 81, 151],
      [9, 10, 20],
      [16, 20, 31],
      [21, 29, 40],
      [32, 46, 55],
      [57, 74, 80],
      [87, 114, 119],
      [129, 151, 150],
      [168, 181, 178],
      [235, 237, 233],
    ],
    [
      [110, 184, 168],
      [42, 88, 79],
      [116, 163, 63],
      [252, 255, 192],
      [198, 80, 90],
      [47, 20, 47],
      [119, 168, 72],
      [238, 156, 93],
    ],
    [
      [0, 0, 0],
      [29, 43, 83],
      [126, 37, 83],
      [0, 135, 81],
      [171, 82, 54],
      [95, 87, 79],
      [194, 195, 199],
      [255, 241, 232],
      [255, 0, 77],
      [255, 163, 0],
      [255, 236, 39],
      [0, 228, 54],
      [41, 173, 255],
      [131, 118, 156],
      [255, 119, 168],
      [255, 204, 170],
    ],
  ]);
var FileSaver_minExports = {},
  FileSaver_min = {
    get exports() {
      return FileSaver_minExports;
    },
    set exports(E) {
      FileSaver_minExports = E;
    },
  };
(function (E, _) {
  (function (A, I) {
    I();
  })(commonjsGlobal, function () {
    function A(P, O) {
      return (
        typeof O > "u"
          ? (O = { autoBom: !1 })
          : typeof O != "object" &&
            (console.warn("Deprecated: Expected third argument to be a object"), (O = { autoBom: !O })),
        O.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(P.type)
          ? new Blob(["\uFEFF", P], { type: P.type })
          : P
      );
    }
    function I(P, O, F) {
      var L = new XMLHttpRequest();
      L.open("GET", P),
        (L.responseType = "blob"),
        (L.onload = function () {
          B(L.response, O, F);
        }),
        (L.onerror = function () {
          console.error("could not download file");
        }),
        L.send();
    }
    function D(P) {
      var O = new XMLHttpRequest();
      O.open("HEAD", P, !1);
      try {
        O.send();
      } catch {}
      return 200 <= O.status && 299 >= O.status;
    }
    function T(P) {
      try {
        P.dispatchEvent(new MouseEvent("click"));
      } catch {
        var O = document.createEvent("MouseEvents");
        O.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), P.dispatchEvent(O);
      }
    }
    var C =
        typeof window == "object" && window.window === window
          ? window
          : typeof self == "object" && self.self === self
            ? self
            : typeof commonjsGlobal == "object" && commonjsGlobal.global === commonjsGlobal
              ? commonjsGlobal
              : void 0,
      R =
        C.navigator &&
        /Macintosh/.test(navigator.userAgent) &&
        /AppleWebKit/.test(navigator.userAgent) &&
        !/Safari/.test(navigator.userAgent),
      B =
        C.saveAs ||
        (typeof window != "object" || window !== C
          ? function () {}
          : "download" in HTMLAnchorElement.prototype && !R
            ? function (P, O, F) {
                var L = C.URL || C.webkitURL,
                  U = document.createElement("a");
                (O = O || P.name || "download"),
                  (U.download = O),
                  (U.rel = "noopener"),
                  typeof P == "string"
                    ? ((U.href = P),
                      U.origin === location.origin ? T(U) : D(U.href) ? I(P, O, F) : T(U, (U.target = "_blank")))
                    : ((U.href = L.createObjectURL(P)),
                      setTimeout(function () {
                        L.revokeObjectURL(U.href);
                      }, 4e4),
                      setTimeout(function () {
                        T(U);
                      }, 0));
              }
            : "msSaveOrOpenBlob" in navigator
              ? function (P, O, F) {
                  if (((O = O || P.name || "download"), typeof P != "string")) navigator.msSaveOrOpenBlob(A(P, F), O);
                  else if (D(P)) I(P, O, F);
                  else {
                    var L = document.createElement("a");
                    (L.href = P),
                      (L.target = "_blank"),
                      setTimeout(function () {
                        T(L);
                      });
                  }
                }
              : function (P, O, F, L) {
                  if (
                    ((L = L || open("", "_blank")),
                    L && (L.document.title = L.document.body.innerText = "downloading..."),
                    typeof P == "string")
                  )
                    return I(P, O, F);
                  var U = P.type === "application/octet-stream",
                    z = /constructor/i.test(C.HTMLElement) || C.safari,
                    V = /CriOS\/[\d]+/.test(navigator.userAgent);
                  if ((V || (U && z) || R) && typeof FileReader < "u") {
                    var X = new FileReader();
                    (X.onloadend = function () {
                      var Y = X.result;
                      (Y = V ? Y : Y.replace(/^data:[^;]*;/, "data:attachment/file;")),
                        L ? (L.location.href = Y) : (location = Y),
                        (L = null);
                    }),
                      X.readAsDataURL(P);
                  } else {
                    var G = C.URL || C.webkitURL,
                      Z = G.createObjectURL(P);
                    L ? (L.location = Z) : (location.href = Z),
                      (L = null),
                      setTimeout(function () {
                        G.revokeObjectURL(Z);
                      }, 4e4);
                  }
                });
    (C.saveAs = B.saveAs = B), (E.exports = B);
  });
})(FileSaver_min);
const ColorPickerWrapper_svelte_svelte_type_style_lang = "";
function create_fragment$7(E) {
  let _, A;
  const I = E[5].default,
    D = create_slot(I, E, E[4], null);
  return {
    c() {
      (_ = element("div")), D && D.c(), this.h();
    },
    l(T) {
      _ = claim_element(T, "DIV", { class: !0 });
      var C = children(_);
      D && D.l(C), C.forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "svelte-1qllarh"), toggle_class(_, "isOpen", E[1]), toggle_class(_, "isPopup", E[2]);
    },
    m(T, C) {
      insert_hydration(T, _, C), D && D.m(_, null), E[6](_), (A = !0);
    },
    p(T, [C]) {
      D &&
        D.p &&
        (!A || C & 16) &&
        update_slot_base(D, I, T, T[4], A ? get_slot_changes(I, T[4], C, null) : get_all_dirty_from_scope(T[4]), null),
        (!A || C & 2) && toggle_class(_, "isOpen", T[1]),
        (!A || C & 4) && toggle_class(_, "isPopup", T[2]);
    },
    i(T) {
      A || (transition_in(D, T), (A = !0));
    },
    o(T) {
      transition_out(D, T), (A = !1);
    },
    d(T) {
      T && detach(_), D && D.d(T), E[6](null);
    },
  };
}
function instance$7(E, _, A) {
  let { $$slots: I = {}, $$scope: D } = _,
    { wrapper: T } = _,
    { isOpen: C } = _,
    { isPopup: R } = _,
    { toRight: B } = _;
  function P(O) {
    binding_callbacks[O ? "unshift" : "push"](() => {
      (T = O), A(0, T);
    });
  }
  return (
    (E.$$set = (O) => {
      "wrapper" in O && A(0, (T = O.wrapper)),
        "isOpen" in O && A(1, (C = O.isOpen)),
        "isPopup" in O && A(2, (R = O.isPopup)),
        "toRight" in O && A(3, (B = O.toRight)),
        "$$scope" in O && A(4, (D = O.$$scope));
    }),
    [T, C, R, B, D, I, P]
  );
}
class ColorPickerWrapper extends SvelteComponent {
  constructor(_) {
    super(),
      init(this, _, instance$7, create_fragment$7, safe_not_equal, { wrapper: 0, isOpen: 1, isPopup: 2, toRight: 3 });
  }
}
const plusIcon = "" + new URL("../../assets/plusIconWhite-2b7dac96.svg", import.meta.url).href,
  trashIcon$1 = "" + new URL("../../assets/trashIconWhite-e5a01b6a.svg", import.meta.url).href;
function get_each_context$2(E, _, A) {
  const I = E.slice();
  return (I[15] = _[A]), (I[17] = A), I;
}
function create_key_block$1(E) {
  let _, A, I, D;
  function T() {
    return E[10](E[15]);
  }
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(C) {
      (_ = claim_element(C, "DIV", { class: !0, style: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(
        _,
        "class",
        "w-full aspect-square transition-all duration-200 relative flex flex-col justify-center items-center cursor-pointer",
      ),
        attr(_, "style", (A = computeRBGAColor$1(E[15])));
    },
    m(C, R) {
      insert_hydration(C, _, R),
        I || ((D = [listen(_, "click", T), listen(_, "keypress", keypress_handler$1)]), (I = !0));
    },
    p(C, R) {
      (E = C), R & 4 && A !== (A = computeRBGAColor$1(E[15])) && attr(_, "style", A);
    },
    d(C) {
      C && detach(_), (I = !1), run_all(D);
    },
  };
}
function create_each_block$2(E) {
  let _,
    A = E[3],
    I,
    D,
    T,
    C,
    R,
    B = create_key_block$1(E);
  return {
    c() {
      (_ = element("div")), B.c(), (I = space()), this.h();
    },
    l(P) {
      _ = claim_element(P, "DIV", { class: !0 });
      var O = children(_);
      B.l(O), (I = claim_space(O)), O.forEach(detach), this.h();
    },
    h() {
      attr(
        _,
        "class",
        (D =
          E[2][E[1]] === E[15]
            ? "transition-all duration-200 sm:hover:scale-125 sm:hover:z-20 flex flex-col outline outline-4 z-30 outline-violet-200"
            : "flex transition-all sm:hover:scale-125 sm:hover:z-20 duration-200 flex-col outline-none"),
      );
    },
    m(P, O) {
      insert_hydration(P, _, O), B.m(_, null), append_hydration(_, I), (R = !0);
    },
    p(P, O) {
      (E = P),
        O & 8 && safe_not_equal(A, (A = E[3])) ? (B.d(1), (B = create_key_block$1(E)), B.c(), B.m(_, I)) : B.p(E, O),
        (!R ||
          (O & 6 &&
            D !==
              (D =
                E[2][E[1]] === E[15]
                  ? "transition-all duration-200 sm:hover:scale-125 sm:hover:z-20 flex flex-col outline outline-4 z-30 outline-violet-200"
                  : "flex transition-all sm:hover:scale-125 sm:hover:z-20 duration-200 flex-col outline-none"))) &&
          attr(_, "class", D);
    },
    i(P) {
      R ||
        (add_render_callback(() => {
          C && C.end(1),
            (T = create_in_transition(_, scale, { delay: 5 * E[17], duration: 300, easing: quintOut })),
            T.start();
        }),
        (R = !0));
    },
    o(P) {
      T && T.invalidate(),
        (C = create_out_transition(_, scale, { delay: 5 * E[17], duration: 300, easing: quintOut })),
        (R = !1);
    },
    d(P) {
      P && detach(_), B.d(P), P && C && C.end();
    },
  };
}
function create_fragment$6(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q,
    J,
    K,
    ne,
    re,
    ie,
    se,
    oe,
    _e,
    ve,
    fe,
    ke,
    me,
    Ee,
    Se;
  function ue(Ce) {
    E[9](Ce);
  }
  let xe = { isOpen: !0, isInput: !1, toRight: !0, components: { ...ChromeVariant, wrapper: ColorPickerWrapper } };
  E[0] !== void 0 && (xe.rgb = E[0]),
    (B = new ColorPicker({ props: xe })),
    binding_callbacks.push(() => bind(B, "rgb", ue, E[0]));
  let pe = E[2],
    we = [];
  for (let Ce = 0; Ce < pe.length; Ce += 1) we[Ce] = create_each_block$2(get_each_context$2(E, pe, Ce));
  const Ne = (Ce) =>
    transition_out(we[Ce], 1, 1, () => {
      we[Ce] = null;
    });
  return {
    c() {
      (_ = element("div")),
        (A = element("div")),
        (I = element("p")),
        (D = text("My color palette")),
        (T = space()),
        (C = element("div")),
        (R = element("div")),
        create_component(B.$$.fragment),
        (O = space()),
        (F = element("div")),
        (L = element("div"));
      for (let Ce = 0; Ce < we.length; Ce += 1) we[Ce].c();
      (U = space()),
        (z = element("div")),
        (V = element("button")),
        (X = element("img")),
        (Z = space()),
        (Y = element("p")),
        (q = text("Add color")),
        (W = space()),
        (ee = element("button")),
        (te = element("img")),
        (J = space()),
        (K = element("p")),
        (ne = text("Delete selected")),
        (re = space()),
        (ie = element("button")),
        (se = element("p")),
        (oe = text("Delete all")),
        (_e = space()),
        (ve = element("button")),
        (fe = element("p")),
        (ke = text("Close")),
        this.h();
    },
    l(Ce) {
      _ = claim_element(Ce, "DIV", { class: !0, id: !0 });
      var De = children(_);
      A = claim_element(De, "DIV", { class: !0 });
      var Ue = children(A);
      I = claim_element(Ue, "P", { class: !0 });
      var Oe = children(I);
      (D = claim_text(Oe, "My color palette")),
        Oe.forEach(detach),
        (T = claim_space(Ue)),
        (C = claim_element(Ue, "DIV", { class: !0 }));
      var ge = children(C);
      R = claim_element(ge, "DIV", { class: !0 });
      var Ke = children(R);
      claim_component(B.$$.fragment, Ke),
        Ke.forEach(detach),
        ge.forEach(detach),
        Ue.forEach(detach),
        (O = claim_space(De)),
        (F = claim_element(De, "DIV", { class: !0 }));
      var Ie = children(F);
      L = claim_element(Ie, "DIV", { class: !0 });
      var ye = children(L);
      for (let He = 0; He < we.length; He += 1) we[He].l(ye);
      ye.forEach(detach), (U = claim_space(Ie)), (z = claim_element(Ie, "DIV", { class: !0 }));
      var Re = children(z);
      V = claim_element(Re, "BUTTON", { class: !0 });
      var Me = children(V);
      (X = claim_element(Me, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        (Z = claim_space(Me)),
        (Y = claim_element(Me, "P", {}));
      var Te = children(Y);
      (q = claim_text(Te, "Add color")),
        Te.forEach(detach),
        Me.forEach(detach),
        (W = claim_space(Re)),
        (ee = claim_element(Re, "BUTTON", { class: !0 }));
      var he = children(ee);
      (te = claim_element(he, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        (J = claim_space(he)),
        (K = claim_element(he, "P", {}));
      var Pe = children(K);
      (ne = claim_text(Pe, "Delete selected")),
        Pe.forEach(detach),
        he.forEach(detach),
        (re = claim_space(Re)),
        (ie = claim_element(Re, "BUTTON", { class: !0 }));
      var Ge = children(ie);
      se = claim_element(Ge, "P", {});
      var $e = children(se);
      (oe = claim_text($e, "Delete all")),
        $e.forEach(detach),
        Ge.forEach(detach),
        Re.forEach(detach),
        (_e = claim_space(Ie)),
        (ve = claim_element(Ie, "BUTTON", { class: !0 }));
      var be = children(ve);
      fe = claim_element(be, "P", {});
      var qe = children(fe);
      (ke = claim_text(qe, "Close")),
        qe.forEach(detach),
        be.forEach(detach),
        Ie.forEach(detach),
        De.forEach(detach),
        this.h();
    },
    h() {
      attr(I, "class", "w-full text-center text-xl"),
        attr(R, "class", "w-[278px]"),
        attr(C, "class", "flex flex-col justify-center items-center font-sans text-Grey-Dark w-full"),
        attr(A, "class", "flew flex-col justify-center items-center w-full space-y-6 mb-8"),
        attr(L, "class", "grid grid-cols-6 sm:grid-cols-8 gap-0 w-full items-center justify-center"),
        src_url_equal(X.src, (G = plusIcon)) || attr(X, "src", G),
        attr(X, "alt", "Add color"),
        attr(X, "height", "24"),
        attr(X, "width", "24"),
        attr(
          V,
          "class",
          "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-row space-x-2 justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md",
        ),
        src_url_equal(te.src, (Q = trashIcon$1)) || attr(te, "src", Q),
        attr(te, "alt", "Add color"),
        attr(te, "height", "24"),
        attr(te, "width", "24"),
        attr(
          ee,
          "class",
          "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-row space-x-2 justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md",
        ),
        attr(
          ie,
          "class",
          "w-full text-Grey relative disabled:cursor-not-allowed flex flex-col justify-center items-center px-6 py-3 z-10 rounded-md",
        ),
        attr(z, "class", "flex flex-col w-full space-y-3"),
        attr(
          ve,
          "class",
          "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-row space-x-2 justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md",
        ),
        attr(F, "class", "flex flex-col items-center justify-center w-full space-y-6"),
        attr(_, "class", "flex flex-col pb-32 pt-8 sm:pt-0 sm:pb-0 w-full sm:w-auto justify-center items-center"),
        attr(_, "id", "modal");
    },
    m(Ce, De) {
      insert_hydration(Ce, _, De),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(I, D),
        append_hydration(A, T),
        append_hydration(A, C),
        append_hydration(C, R),
        mount_component(B, R, null),
        append_hydration(_, O),
        append_hydration(_, F),
        append_hydration(F, L);
      for (let Ue = 0; Ue < we.length; Ue += 1) we[Ue].m(L, null);
      append_hydration(F, U),
        append_hydration(F, z),
        append_hydration(z, V),
        append_hydration(V, X),
        append_hydration(V, Z),
        append_hydration(V, Y),
        append_hydration(Y, q),
        append_hydration(z, W),
        append_hydration(z, ee),
        append_hydration(ee, te),
        append_hydration(ee, J),
        append_hydration(ee, K),
        append_hydration(K, ne),
        append_hydration(z, re),
        append_hydration(z, ie),
        append_hydration(ie, se),
        append_hydration(se, oe),
        append_hydration(F, _e),
        append_hydration(F, ve),
        append_hydration(ve, fe),
        append_hydration(fe, ke),
        (me = !0),
        Ee ||
          ((Se = [
            listen(V, "click", E[5]),
            listen(ee, "click", E[6]),
            listen(ie, "click", E[7]),
            listen(ve, "click", E[8]),
          ]),
          (Ee = !0));
    },
    p(Ce, [De]) {
      const Ue = {};
      if ((!P && De & 1 && ((P = !0), (Ue.rgb = Ce[0]), add_flush_callback(() => (P = !1))), B.$set(Ue), De & 30)) {
        pe = Ce[2];
        let Oe;
        for (Oe = 0; Oe < pe.length; Oe += 1) {
          const ge = get_each_context$2(Ce, pe, Oe);
          we[Oe]
            ? (we[Oe].p(ge, De), transition_in(we[Oe], 1))
            : ((we[Oe] = create_each_block$2(ge)), we[Oe].c(), transition_in(we[Oe], 1), we[Oe].m(L, null));
        }
        for (group_outros(), Oe = pe.length; Oe < we.length; Oe += 1) Ne(Oe);
        check_outros();
      }
    },
    i(Ce) {
      if (!me) {
        transition_in(B.$$.fragment, Ce);
        for (let De = 0; De < pe.length; De += 1) transition_in(we[De]);
        me = !0;
      }
    },
    o(Ce) {
      transition_out(B.$$.fragment, Ce), (we = we.filter(Boolean));
      for (let De = 0; De < we.length; De += 1) transition_out(we[De]);
      me = !1;
    },
    d(Ce) {
      Ce && detach(_), destroy_component(B), destroy_each(we, Ce), (Ee = !1), run_all(Se);
    },
  };
}
function computeRBGAColor$1(E) {
  return `background-color: rgba(${E[0]},${E[1]},${E[2]},1)`;
}
const keypress_handler$1 = () => {};
function instance$6(E, _, A) {
  let I, D, T;
  component_subscribe(E, colorPalette, (G) => A(2, (I = G))),
    component_subscribe(E, selectedColor, (G) => A(11, (D = G))),
    component_subscribe(E, currentColorPick, (G) => A(3, (T = G)));
  let C = { r: I.length > 0 ? I[0][0] : 0, g: I.length > 0 ? I[0][1] : 0, b: I.length > 0 ? I[0][2] : 0 },
    R = 0;
  const B = createEventDispatcher();
  function P(G, Z) {
    const { r: Y, g: q, b: W } = G;
    Z !== -1 && set_store_value(colorPalette, (I[Z] = [Y, q, W]), I);
  }
  function O(G) {
    const Z = I.findIndex((Y) => Y.every((q, W) => q === G[W]));
    A(0, (C.r = I[Z][0]), C),
      A(0, (C.g = I[Z][1]), C),
      A(0, (C.b = I[Z][2]), C),
      A(1, (R = Z)),
      set_store_value(selectedColor, (D = I[Z]), D);
  }
  function F() {
    let G = [0, 0, 0];
    do G = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    while (I.some((Z) => Z.every((Y, q) => Y === G[q])));
    I.push(G), O(I[I.length - 1]);
  }
  function L() {
    I.splice(R, 1), I.length === 0 && (I.push([0, 0, 0]), O([0, 0, 0])), O(R === 0 ? I[0] : I[R - 1]);
  }
  function U() {
    I.splice(0, I.length), I.push([0, 0, 0]), O([0, 0, 0]);
  }
  function z() {
    B("closeModal");
  }
  function V(G) {
    (C = G), A(0, C);
  }
  const X = (G) => {
    O(G);
  };
  return (
    (E.$$.update = () => {
      if ((E.$$.dirty & 3 && P(C, R), E.$$.dirty & 1)) {
        const { r: G, g: Z, b: Y } = C;
        set_store_value(currentColorPick, (T = [G, Z, Y]), T);
      }
    }),
    [C, R, I, T, O, F, L, U, z, V, X]
  );
}
class ColorEditingModal extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$6, create_fragment$6, safe_not_equal, {});
  }
}
function get_each_context$1(E, _, A) {
  const I = E.slice();
  return (I[9] = _[A]), I;
}
function get_each_context_1$1(E, _, A) {
  const I = E.slice();
  return (I[12] = _[A]), I;
}
function create_each_block_1$1(E) {
  let _;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(A) {
      (_ = claim_element(A, "DIV", { class: !0, style: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(_, "class", "w-full h-10 flex flex-col"),
        set_style(_, "background-color", "rgb(" + E[12][0] + ", " + E[12][1] + ", " + E[12][2] + ")");
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    p(A, I) {
      I & 1 && set_style(_, "background-color", "rgb(" + A[12][0] + ", " + A[12][1] + ", " + A[12][2] + ")");
    },
    d(A) {
      A && detach(_);
    },
  };
}
function create_each_block$1(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O = E[9],
    F = [];
  for (let U = 0; U < O.length; U += 1) F[U] = create_each_block_1$1(get_each_context_1$1(E, O, U));
  function L() {
    return E[3](E[9]);
  }
  return {
    c() {
      (_ = element("button")), (A = element("div"));
      for (let U = 0; U < F.length; U += 1) F[U].c();
      (I = space()), (D = element("button")), (T = element("p")), (C = text("Use")), (R = space()), this.h();
    },
    l(U) {
      _ = claim_element(U, "BUTTON", { class: !0 });
      var z = children(_);
      A = claim_element(z, "DIV", { class: !0 });
      var V = children(A);
      for (let Z = 0; Z < F.length; Z += 1) F[Z].l(V);
      V.forEach(detach), (I = claim_space(z)), (D = claim_element(z, "BUTTON", { class: !0 }));
      var X = children(D);
      T = claim_element(X, "P", {});
      var G = children(T);
      (C = claim_text(G, "Use")),
        G.forEach(detach),
        X.forEach(detach),
        (R = claim_space(z)),
        z.forEach(detach),
        this.h();
    },
    h() {
      attr(A, "class", "flex flex-row w-full overflow-hidden"),
        attr(
          D,
          "class",
          "w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] group-hover:bg-[#4E3E79] transition-all duration-200 flex flex-row space-x-2 justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-t-none",
        ),
        attr(
          _,
          "class",
          "group cursor-pointer flex flex-col rounded-md overflow-hidden justify-center items-center sm:w-56 w-full shadow-[0px_4px_0px_rgba(47,30,92,1)] relative disabled:cursor-not-allowed active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 z-10",
        );
    },
    m(U, z) {
      insert_hydration(U, _, z), append_hydration(_, A);
      for (let V = 0; V < F.length; V += 1) F[V].m(A, null);
      append_hydration(_, I),
        append_hydration(_, D),
        append_hydration(D, T),
        append_hydration(T, C),
        append_hydration(_, R),
        B || ((P = listen(_, "click", L)), (B = !0));
    },
    p(U, z) {
      if (((E = U), z & 1)) {
        O = E[9];
        let V;
        for (V = 0; V < O.length; V += 1) {
          const X = get_each_context_1$1(E, O, V);
          F[V] ? F[V].p(X, z) : ((F[V] = create_each_block_1$1(X)), F[V].c(), F[V].m(A, null));
        }
        for (; V < F.length; V += 1) F[V].d(1);
        F.length = O.length;
      }
    },
    d(U) {
      U && detach(_), destroy_each(F, U), (B = !1), P();
    },
  };
}
function create_fragment$5(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L = E[0],
    U = [];
  for (let z = 0; z < L.length; z += 1) U[z] = create_each_block$1(get_each_context$1(E, L, z));
  return {
    c() {
      (_ = element("div")), (A = element("p")), (I = text("Community palettes")), (D = space()), (T = element("div"));
      for (let z = 0; z < U.length; z += 1) U[z].c();
      (C = space()), (R = element("button")), (B = element("p")), (P = text("Close")), this.h();
    },
    l(z) {
      _ = claim_element(z, "DIV", { class: !0, id: !0 });
      var V = children(_);
      A = claim_element(V, "P", { class: !0 });
      var X = children(A);
      (I = claim_text(X, "Community palettes")),
        X.forEach(detach),
        (D = claim_space(V)),
        (T = claim_element(V, "DIV", { class: !0 }));
      var G = children(T);
      for (let q = 0; q < U.length; q += 1) U[q].l(G);
      G.forEach(detach), (C = claim_space(V)), (R = claim_element(V, "BUTTON", { class: !0 }));
      var Z = children(R);
      B = claim_element(Z, "P", {});
      var Y = children(B);
      (P = claim_text(Y, "Close")), Y.forEach(detach), Z.forEach(detach), V.forEach(detach), this.h();
    },
    h() {
      attr(A, "class", "w-full text-center text-xl"),
        attr(T, "class", "flex flex-col space-y-6 w-full"),
        attr(
          R,
          "class",
          "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-row space-x-2 justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md",
        ),
        attr(
          _,
          "class",
          "flex flex-col pb-32 sm:pb-0 w-full pt-8 sm:pt-0 sm:w-auto justify-center items-center space-y-6",
        ),
        attr(_, "id", "modal");
    },
    m(z, V) {
      insert_hydration(z, _, V),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(_, D),
        append_hydration(_, T);
      for (let X = 0; X < U.length; X += 1) U[X].m(T, null);
      append_hydration(_, C),
        append_hydration(_, R),
        append_hydration(R, B),
        append_hydration(B, P),
        O || ((F = listen(R, "click", E[1])), (O = !0));
    },
    p(z, [V]) {
      if (V & 5) {
        L = z[0];
        let X;
        for (X = 0; X < L.length; X += 1) {
          const G = get_each_context$1(z, L, X);
          U[X] ? U[X].p(G, V) : ((U[X] = create_each_block$1(G)), U[X].c(), U[X].m(T, null));
        }
        for (; X < U.length; X += 1) U[X].d(1);
        U.length = L.length;
      }
    },
    i: noop,
    o: noop,
    d(z) {
      z && detach(_), destroy_each(U, z), (O = !1), F();
    },
  };
}
function instance$5(E, _, A) {
  let I, D;
  component_subscribe(E, colorPalette, (L) => A(5, (I = L))),
    component_subscribe(E, defaultPalettes, (L) => A(6, (D = L)));
  const T = createEventDispatcher();
  let C = !1,
    R = [];
  onMount(() => {
    A(0, (R = JSON.parse(JSON.stringify(D)))), window.innerWidth < 768 && (C = !0);
  });
  function B() {
    T("closeModal");
  }
  function P() {
    T("checkPalette");
  }
  function O(L) {
    set_store_value(colorPalette, (I = L), I), P(), C && B();
  }
  return [
    R,
    B,
    O,
    (L) => {
      O(L);
    },
  ];
}
class CommunityPalettesModal extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$5, create_fragment$5, safe_not_equal, {});
  }
}
const closeIcon = "" + new URL("../../assets/closeIcon-0234a9bd.svg", import.meta.url).href;
function create_fragment$4(E) {
  let _, A, I, D, T, C, R, B, P, O, F, L, U, z, V, X, G, Z, Y, q, W, ee, te, Q, J, K, ne, re, ie, se;
  return {
    c() {
      (_ = element("div")),
        (A = element("div")),
        (I = element("p")),
        (D = text("Real size preview")),
        (T = space()),
        (C = element("p")),
        (R = text(E[0])),
        (B = text(" px width")),
        (F = space()),
        (L = element("div")),
        (U = element("div")),
        (z = element("div")),
        (V = space()),
        (X = element("div")),
        (G = space()),
        (Z = element("div")),
        (W = space()),
        (ee = element("img")),
        (Q = space()),
        (J = element("button")),
        (K = element("img")),
        this.h();
    },
    l(oe) {
      _ = claim_element(oe, "DIV", { class: !0 });
      var _e = children(_);
      A = claim_element(_e, "DIV", { class: !0 });
      var ve = children(A);
      I = claim_element(ve, "P", {});
      var fe = children(I);
      (D = claim_text(fe, "Real size preview")),
        fe.forEach(detach),
        (T = claim_space(ve)),
        (C = claim_element(ve, "P", { class: !0 }));
      var ke = children(C);
      (R = claim_text(ke, E[0])),
        (B = claim_text(ke, " px width")),
        ke.forEach(detach),
        ve.forEach(detach),
        (F = claim_space(_e)),
        (L = claim_element(_e, "DIV", { class: !0 }));
      var me = children(L);
      U = claim_element(me, "DIV", { class: !0 });
      var Ee = children(U);
      (z = claim_element(Ee, "DIV", { class: !0 })),
        children(z).forEach(detach),
        (V = claim_space(Ee)),
        (X = claim_element(Ee, "DIV", { class: !0 })),
        children(X).forEach(detach),
        (G = claim_space(Ee)),
        (Z = claim_element(Ee, "DIV", { class: !0 })),
        children(Z).forEach(detach),
        Ee.forEach(detach),
        (W = claim_space(me)),
        (ee = claim_element(me, "IMG", { style: !0, src: !0, alt: !0, width: !0, height: !0, class: !0 })),
        me.forEach(detach),
        (Q = claim_space(_e)),
        (J = claim_element(_e, "BUTTON", { class: !0 }));
      var Se = children(J);
      (K = claim_element(Se, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        Se.forEach(detach),
        _e.forEach(detach),
        this.h();
    },
    h() {
      attr(C, "class", "text-sm font-merriweather text-Grey"),
        attr(A, "class", "w-full space-y-6"),
        attr(z, "class", "h-3 w-[2px] rounded-md flex bg-Grey-Dark"),
        attr(X, "class", "h-[2px] w-full flex bg-Grey-Dark"),
        attr(Z, "class", "h-3 w-[2px] rounded-md flex bg-Grey-Dark"),
        attr(U, "class", "flex flex-row w-full items-center justify-between"),
        set_style(ee, "image-rendering", "pixelated"),
        set_style(ee, "image-rendering", "-moz-crisp-edges"),
        set_style(ee, "image-rendering", "crisp-edges"),
        src_url_equal(ee.src, (te = E[1])) || attr(ee, "src", te),
        attr(ee, "alt", "Preview"),
        attr(ee, "width", "24"),
        attr(ee, "height", "24"),
        attr(ee, "class", "flex flex-col w-fit max-w-5xl"),
        attr(L, "class", "w-fit mt-2 space-y-3"),
        src_url_equal(K.src, (ne = closeIcon)) || attr(K, "src", ne),
        attr(K, "alt", "Close"),
        attr(K, "height", "32"),
        attr(K, "width", "32"),
        attr(
          J,
          "class",
          "flex absolute -bottom-14 hover:scale-110 transition-all duration-200 cursor-pointer flex-col justify-center items-center",
        ),
        attr(
          _,
          "class",
          "fixed bg-Medium-Blue min-w-[256px] justify-center items-center flex flex-col border border-Light-Blue font-calistoga text-center text-Grey-White top-1/2 z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-md",
        );
    },
    m(oe, _e) {
      insert_hydration(oe, _, _e),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(I, D),
        append_hydration(A, T),
        append_hydration(A, C),
        append_hydration(C, R),
        append_hydration(C, B),
        append_hydration(_, F),
        append_hydration(_, L),
        append_hydration(L, U),
        append_hydration(U, z),
        append_hydration(U, V),
        append_hydration(U, X),
        append_hydration(U, G),
        append_hydration(U, Z),
        append_hydration(L, W),
        append_hydration(L, ee),
        append_hydration(_, Q),
        append_hydration(_, J),
        append_hydration(J, K),
        (re = !0),
        ie || ((se = listen(J, "click", E[2])), (ie = !0));
    },
    p(oe, [_e]) {
      (E = oe),
        (!re || _e & 1) && set_data(R, E[0]),
        (!re || (_e & 2 && !src_url_equal(ee.src, (te = E[1])))) && attr(ee, "src", te);
    },
    i(oe) {
      re ||
        (add_render_callback(() => {
          O && O.end(1),
            (P = create_in_transition(C, slide, { delay: 400, duration: 300, easing: quintOut })),
            P.start();
        }),
        add_render_callback(() => {
          q && q.end(1),
            (Y = create_in_transition(U, scale, { delay: 200, duration: 300, easing: quintOut })),
            Y.start();
        }),
        (re = !0));
    },
    o(oe) {
      P && P.invalidate(),
        (O = create_out_transition(C, slide, { delay: 400, duration: 300, easing: quintOut })),
        Y && Y.invalidate(),
        (q = create_out_transition(U, scale, { delay: 200, duration: 300, easing: quintOut })),
        (re = !1);
    },
    d(oe) {
      oe && detach(_), oe && O && O.end(), oe && q && q.end(), (ie = !1), se();
    },
  };
}
function instance$4(E, _, A) {
  let { resultImage: I } = _,
    { gridSize: D } = _;
  const T = createEventDispatcher();
  let C = "";
  onMount(() => {
    B(D);
  });
  function R() {
    T("close");
  }
  async function B(P) {
    const F = (await Image.load(I)).resize({ width: P });
    A(1, (C = F.toDataURL()));
  }
  return (
    (E.$$set = (P) => {
      "resultImage" in P && A(3, (I = P.resultImage)), "gridSize" in P && A(0, (D = P.gridSize));
    }),
    [D, C, R, I]
  );
}
class PreviewModal extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$4, create_fragment$4, safe_not_equal, { resultImage: 3, gridSize: 0 });
  }
}
const Switch_svelte_svelte_type_style_lang = "";
function create_fragment$3(E) {
  let _, A, I, D, T, C;
  return {
    c() {
      (_ = element("label")), (A = element("input")), (I = space()), (D = element("span")), this.h();
    },
    l(R) {
      _ = claim_element(R, "LABEL", { class: !0 });
      var B = children(_);
      (A = claim_element(B, "INPUT", { type: !0, class: !0 })),
        (I = claim_space(B)),
        (D = claim_element(B, "SPAN", { class: !0 })),
        children(D).forEach(detach),
        B.forEach(detach),
        this.h();
    },
    h() {
      attr(A, "type", "checkbox"),
        attr(A, "class", "svelte-1fs3d2i"),
        attr(D, "class", "slider svelte-1fs3d2i"),
        attr(_, "class", "switch svelte-1fs3d2i");
    },
    m(R, B) {
      insert_hydration(R, _, B),
        append_hydration(_, A),
        (A.checked = E[0]),
        append_hydration(_, I),
        append_hydration(_, D),
        T || ((C = listen(A, "change", E[1])), (T = !0));
    },
    p(R, [B]) {
      B & 1 && (A.checked = R[0]);
    },
    i: noop,
    o: noop,
    d(R) {
      R && detach(_), (T = !1), C();
    },
  };
}
function instance$3(E, _, A) {
  let { checked: I = !1 } = _;
  function D() {
    (I = this.checked), A(0, I);
  }
  return (
    (E.$$set = (T) => {
      "checked" in T && A(0, (I = T.checked));
    }),
    [I, D]
  );
}
class Switch extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$3, create_fragment$3, safe_not_equal, { checked: 0 });
  }
}
function create_fragment$2(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q,
    J,
    K,
    ne,
    re,
    ie,
    se,
    oe,
    _e,
    ve,
    fe,
    ke,
    me,
    Ee,
    Se;
  return {
    c() {
      (_ = element("div")),
        (A = element("div")),
        (I = element("div")),
        (D = element("p")),
        (T = text("Pro")),
        (C = space()),
        (R = element("p")),
        (B = text("Get all your asset ready to use with pixel-perfect background removal!")),
        (P = space()),
        (O = element("p")),
        (F = element("span")),
        (L = text("$12")),
        (U = text("$8")),
        (z = element("span")),
        (V = text("/month")),
        (X = space()),
        (G = element("div")),
        (Z = element("div")),
        (Y = element("img")),
        (W = space()),
        (ee = element("div")),
        (te = element("div")),
        (Q = element("img")),
        (K = space()),
        (ne = element("p")),
        (re = text("200 background removal/month")),
        (oe = space()),
        (_e = element("form")),
        (ve = element("button")),
        (fe = element("p")),
        (ke = text("Get Pro")),
        this.h();
    },
    l(ue) {
      _ = claim_element(ue, "DIV", { class: !0 });
      var xe = children(_);
      A = claim_element(xe, "DIV", { class: !0 });
      var pe = children(A);
      I = claim_element(pe, "DIV", { class: !0 });
      var we = children(I);
      D = claim_element(we, "P", { class: !0 });
      var Ne = children(D);
      (T = claim_text(Ne, "Pro")),
        Ne.forEach(detach),
        (C = claim_space(we)),
        (R = claim_element(we, "P", { class: !0 }));
      var Ce = children(R);
      (B = claim_text(Ce, "Get all your asset ready to use with pixel-perfect background removal!")),
        Ce.forEach(detach),
        we.forEach(detach),
        (P = claim_space(pe)),
        (O = claim_element(pe, "P", { class: !0 }));
      var De = children(O);
      F = claim_element(De, "SPAN", { class: !0 });
      var Ue = children(F);
      (L = claim_text(Ue, "$12")),
        Ue.forEach(detach),
        (U = claim_text(De, "$8")),
        (z = claim_element(De, "SPAN", { class: !0 }));
      var Oe = children(z);
      (V = claim_text(Oe, "/month")),
        Oe.forEach(detach),
        De.forEach(detach),
        (X = claim_space(pe)),
        (G = claim_element(pe, "DIV", { class: !0 }));
      var ge = children(G);
      Z = claim_element(ge, "DIV", { class: !0 });
      var Ke = children(Z);
      (Y = claim_element(Ke, "IMG", { src: !0, alt: !0, height: !0, width: !0, class: !0 })),
        Ke.forEach(detach),
        (W = claim_space(ge)),
        (ee = claim_element(ge, "DIV", { class: !0 }));
      var Ie = children(ee);
      te = claim_element(Ie, "DIV", { class: !0 });
      var ye = children(te);
      (Q = claim_element(ye, "IMG", { src: !0, alt: !0 })),
        (K = claim_space(ye)),
        (ne = claim_element(ye, "P", { class: !0 }));
      var Re = children(ne);
      (re = claim_text(Re, "200 background removal/month")),
        Re.forEach(detach),
        ye.forEach(detach),
        Ie.forEach(detach),
        ge.forEach(detach),
        (oe = claim_space(pe)),
        (_e = claim_element(pe, "FORM", { action: !0, method: !0, class: !0 }));
      var Me = children(_e);
      ve = claim_element(Me, "BUTTON", { type: !0, class: !0 });
      var Te = children(ve);
      fe = claim_element(Te, "P", {});
      var he = children(fe);
      (ke = claim_text(he, "Get Pro")),
        he.forEach(detach),
        Te.forEach(detach),
        Me.forEach(detach),
        pe.forEach(detach),
        xe.forEach(detach),
        this.h();
    },
    h() {
      attr(D, "class", "px-4 py-2 rounded-md border border-Orange"),
        attr(R, "class", "text-Grey"),
        attr(I, "class", "flex flex-col justify-center items-center space-y-4 max-w-xs text-center"),
        attr(F, "class", "line-through mr-2 text-Grey text-xl"),
        attr(z, "class", "text-sm"),
        attr(O, "class", "text-4xl"),
        src_url_equal(Y.src, (q = bgRemovalExample2)) || attr(Y, "src", q),
        attr(Y, "alt", "Example of background removal"),
        attr(Y, "height", "24"),
        attr(Y, "width", "24"),
        attr(Y, "class", "w-full"),
        attr(Z, "class", "flex flex-col space-y-4 items-center justify-center"),
        src_url_equal(Q.src, (J = checkIcon)) || attr(Q, "src", J),
        attr(Q, "alt", "Chekc icon"),
        attr(ne, "class", "text-Grey text-sm"),
        attr(te, "class", "flex flex-row justify-start items-center space-x-2"),
        attr(ee, "class", "flex flex-col space-y-2 font-merriweather w-full"),
        attr(G, "class", "flex flex-col space-y-6 items-center justify-center max-w-lg w-full"),
        attr(ve, "type", "submit"),
        attr(
          ve,
          "class",
          "shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-10 py-3 z-10 bg-Orange rounded-md",
        ),
        attr(_e, "action", "/api/stripe/payment"),
        attr(_e, "method", "POST"),
        attr(_e, "class", "w-full"),
        attr(
          A,
          "class",
          "bg-Medium-Blue w-full p-6 space-y-6 overflow-hidden max-w-[450px] border border-Light-Blue font-calistoga text-center text-Grey-White rounded-md justify-center items-center flex flex-col z-[100]",
        ),
        attr(_, "class", "flex flex-col items-center w-full justify-center px-4");
    },
    m(ue, xe) {
      insert_hydration(ue, _, xe),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(I, D),
        append_hydration(D, T),
        append_hydration(I, C),
        append_hydration(I, R),
        append_hydration(R, B),
        append_hydration(A, P),
        append_hydration(A, O),
        append_hydration(O, F),
        append_hydration(F, L),
        append_hydration(O, U),
        append_hydration(O, z),
        append_hydration(z, V),
        append_hydration(A, X),
        append_hydration(A, G),
        append_hydration(G, Z),
        append_hydration(Z, Y),
        append_hydration(G, W),
        append_hydration(G, ee),
        append_hydration(ee, te),
        append_hydration(te, Q),
        append_hydration(te, K),
        append_hydration(te, ne),
        append_hydration(ne, re),
        append_hydration(A, oe),
        append_hydration(A, _e),
        append_hydration(_e, ve),
        append_hydration(ve, fe),
        append_hydration(fe, ke),
        (Se = !0);
    },
    p(ue, [xe]) {},
    i(ue) {
      Se ||
        (add_render_callback(() => {
          se && se.end(1),
            (ie = create_in_transition(ee, slide, { delay: 200, duration: 500, easing: quintOut })),
            ie.start();
        }),
        add_render_callback(() => {
          Ee && Ee.end(1),
            (me = create_in_transition(A, scale, { delay: 0, duration: 300, easing: quintOut })),
            me.start();
        }),
        (Se = !0));
    },
    o(ue) {
      ie && ie.invalidate(),
        (se = create_out_transition(ee, slide, { delay: 200, duration: 500, easing: quintOut })),
        me && me.invalidate(),
        (Ee = create_out_transition(A, scale, { delay: 0, duration: 300, easing: quintOut })),
        (Se = !1);
    },
    d(ue) {
      ue && detach(_), ue && se && se.end(), ue && Ee && Ee.end();
    },
  };
}
function instance$2(E) {
  return createEventDispatcher(), [];
}
class PricingModal extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$2, create_fragment$2, safe_not_equal, {});
  }
}
const bgremovedSample = "" + new URL("../../assets/bgremovedSample-a34c9af1.png", import.meta.url).href;
function create_fragment$1(E) {
  let _, A, I, D, T, C, R, B, P, O, F, L, U, z, V, X, G, Z, Y, q, W, ee, te, Q, J, K, ne, re, ie, se, oe, _e, ve;
  return {
    c() {
      (_ = element("div")),
        (A = element("div")),
        (I = element("div")),
        (D = element("div")),
        (T = element("p")),
        (C = text("Remove the background on")),
        (R = space()),
        (B = element("span")),
        (P = element("img")),
        (F = space()),
        (L = element("p")),
        (U = text("Scenario")),
        (z = space()),
        (V = element("p")),
        (X = text("Background removal is only available on the ")),
        (G = element("a")),
        (Z = text("Scenario")),
        (Y = text(" app.")),
        (q = space()),
        (W = element("img")),
        (te = space()),
        (Q = element("div")),
        (J = element("a")),
        (K = element("p")),
        (ne = text("Go to Scenario")),
        (re = space()),
        (ie = element("button")),
        (se = element("img")),
        this.h();
    },
    l(fe) {
      _ = claim_element(fe, "DIV", { class: !0 });
      var ke = children(_);
      A = claim_element(ke, "DIV", { class: !0 });
      var me = children(A);
      I = claim_element(me, "DIV", { class: !0 });
      var Ee = children(I);
      D = claim_element(Ee, "DIV", { class: !0 });
      var Se = children(D);
      T = claim_element(Se, "P", {});
      var ue = children(T);
      (C = claim_text(ue, "Remove the background on")),
        ue.forEach(detach),
        (R = claim_space(Se)),
        (B = claim_element(Se, "SPAN", { class: !0 }));
      var xe = children(B);
      (P = claim_element(xe, "IMG", { src: !0, alt: !0, height: !0, width: !0, class: !0 })),
        (F = claim_space(xe)),
        (L = claim_element(xe, "P", {}));
      var pe = children(L);
      (U = claim_text(pe, "Scenario")),
        pe.forEach(detach),
        xe.forEach(detach),
        Se.forEach(detach),
        (z = claim_space(Ee)),
        (V = claim_element(Ee, "P", { class: !0 }));
      var we = children(V);
      (X = claim_text(we, "Background removal is only available on the ")),
        (G = claim_element(we, "A", { "data-splitbee-event": !0, href: !0, target: !0, class: !0 }));
      var Ne = children(G);
      (Z = claim_text(Ne, "Scenario")),
        Ne.forEach(detach),
        (Y = claim_text(we, " app.")),
        we.forEach(detach),
        Ee.forEach(detach),
        (q = claim_space(me)),
        (W = claim_element(me, "IMG", { src: !0, alt: !0, height: !0, width: !0, class: !0 })),
        me.forEach(detach),
        (te = claim_space(ke)),
        (Q = claim_element(ke, "DIV", { class: !0 }));
      var Ce = children(Q);
      J = claim_element(Ce, "A", { "data-splitbee-event": !0, href: !0, target: !0, class: !0 });
      var De = children(J);
      K = claim_element(De, "P", {});
      var Ue = children(K);
      (ne = claim_text(Ue, "Go to Scenario")),
        Ue.forEach(detach),
        De.forEach(detach),
        Ce.forEach(detach),
        (re = claim_space(ke)),
        (ie = claim_element(ke, "BUTTON", { class: !0 }));
      var Oe = children(ie);
      (se = claim_element(Oe, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        Oe.forEach(detach),
        ke.forEach(detach),
        this.h();
    },
    h() {
      src_url_equal(P.src, (O = scenarioLogo)) || attr(P, "src", O),
        attr(P, "alt", "Scenario logo"),
        attr(P, "height", "24"),
        attr(P, "width", "24"),
        attr(P, "class", "w-4 h-4"),
        attr(B, "class", "flex flex-row justify-center items-center space-x-1 w-fit"),
        attr(D, "class", "flex flex-col sm:flex-row justify-center items-center space-x-1"),
        attr(G, "data-splitbee-event", "Click 'Go to Scenario' button"),
        attr(G, "href", "https://www.scenario.com/"),
        attr(G, "target", "_blank"),
        attr(G, "class", "underline"),
        attr(V, "class", "text-sm font-merriweather text-Grey"),
        attr(I, "class", "flex flex-col justify-center items-center space-y-4"),
        src_url_equal(W.src, (ee = bgremovedSample)) || attr(W, "src", ee),
        attr(W, "alt", "BG removed sample example"),
        attr(W, "height", "64"),
        attr(W, "width", "64"),
        attr(W, "class", "w-full h-auto rounded-md"),
        attr(A, "class", "w-full space-y-8"),
        attr(J, "data-splitbee-event", "Click 'Go to Scenario' button"),
        attr(J, "href", "https://www.scenario.com/"),
        attr(J, "target", "_blank"),
        attr(
          J,
          "class",
          "shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Orange rounded-md",
        ),
        attr(Q, "class", "w-full mt-6 space-y-3"),
        src_url_equal(se.src, (oe = closeIcon)) || attr(se, "src", oe),
        attr(se, "alt", "Close"),
        attr(se, "height", "32"),
        attr(se, "width", "32"),
        attr(
          ie,
          "class",
          "flex absolute -bottom-14 hover:scale-110 transition-all duration-200 cursor-pointer flex-col justify-center items-center",
        ),
        attr(
          _,
          "class",
          "fixed bg-Medium-Blue min-w-[256px] sm:min-w-[356px] justify-center items-center flex flex-col border border-Light-Blue font-calistoga text-center text-Grey-White top-1/2 z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-md",
        );
    },
    m(fe, ke) {
      insert_hydration(fe, _, ke),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(I, D),
        append_hydration(D, T),
        append_hydration(T, C),
        append_hydration(D, R),
        append_hydration(D, B),
        append_hydration(B, P),
        append_hydration(B, F),
        append_hydration(B, L),
        append_hydration(L, U),
        append_hydration(I, z),
        append_hydration(I, V),
        append_hydration(V, X),
        append_hydration(V, G),
        append_hydration(G, Z),
        append_hydration(V, Y),
        append_hydration(A, q),
        append_hydration(A, W),
        append_hydration(_, te),
        append_hydration(_, Q),
        append_hydration(Q, J),
        append_hydration(J, K),
        append_hydration(K, ne),
        append_hydration(_, re),
        append_hydration(_, ie),
        append_hydration(ie, se),
        _e || ((ve = listen(ie, "click", E[0])), (_e = !0));
    },
    p: noop,
    i: noop,
    o: noop,
    d(fe) {
      fe && detach(_), (_e = !1), ve();
    },
  };
}
function instance$1(E) {
  const _ = createEventDispatcher();
  function A() {
    _("close");
  }
  return [A];
}
class BGremovalModal extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
const sampleImage = "" + new URL("../../assets/base-f8a74a87.png", import.meta.url).href,
  samplePixelArt = "" + new URL("../../assets/pixelart-a3439003.png", import.meta.url).href,
  loadingIcon = "" + new URL("../../assets/loadingIcon-094d3e8e.svg", import.meta.url).href,
  snowyDirectionIllustrationPixelArt =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAIa0lEQVR4Xu2dfYwcZR3H9wCN0R7k2t5RS5rUCIVKKNHEVoqipZxia1Muni9IxCjR1lZLq/jWRP2jEYwkAjEEUhWSS7RSxECMCInJ84chGjXRmLRIopVeS19ub+9uwb5c73YfP7/dnd3fzEL39uaZztzt88cnO8P2np39fp7f88zMzgy5XHd3zpNiBj78FMOXzu8FeAGd3Ql8BfgK8BXgqyDFKvDhpxi+3wtKOXwvwAvo7Al4jlbAO5m3noBfn4efzJm5bc5saO2cldl9+SDYOl/vs0Zhu7stlKALsl9hXkDKkrwAL0CGibfAatgBQ/AsPAk74e26k/ghqM1x1RZfzYWYKObsRLELFsGNZnziXjgI02BNYSxMfmzM5MdWQ67C9t5BsHW2sqzwc0BEkAr/bSzfRej74e+Qh3IldE2zAEvw43C1F9Bm75ehQwl4kGVL6CFmKEAkjMAKXwFtSiD0D8D98L+YAkTCn72AFgLMvnfnFNtNoVAGxvUax49boznGuib6/vARazQ7e/9odjLuB/z0ems0+9Zas29tCZbCAvPUuoshF2Cf+XBOYx67LhdiL+uKxPcSXX+ACn+A5elQ+CIhvoBG+CLh9QWIhCpPrZuGCRiGA4T/J/gDPA1DhP8w3Ae74SuE/zkYgJvgTa7zaWrP9QfUBNzI62lo9Hx3FdCuAJFQh9CthtBtiL2sN/gn+XwbFrvOqd6e64YJfSUUKuHPfQGWfITTsBeuc51X7HMl1mzKKXrNt/r+ArZOfpTJU3HkqDWao6xrjp9gmFK8fNgazecXW6PZwTCkiZwbMt9kWzT3sK6Jvn/+dRHxM7jUmYi4DanwL2X5t6HwRcT8EhBUhEiI3XkrbcRtqCZAwn8aGj0/qIL5KeDxuLk5mwMI/RJ4RMLvIAHufm+Ia9J8p28P2DrRMXRkxBrNo5+2RhM5l9M0ZP37kDWaO5gDNPq8kCzrYwRZjs4J0fXonNBivTYp3xc3N1cVsDoUvojoDAHfy4qA5Qg40YEV8LWsCMgR/kZ4rcOGoC2ZEVDbkK/yWpLxsWk3NDokbWNc1kT34/dcaY3G/MoaTXQOaNXeLoZFTas5ocUcUZsD7siagIvZoPs7SMDmrAkIjiee7JAKuCWrAhYg4MWQhPk5BL0/qwJy5qGlV0ERbIVW52I+s9Aazc2sa/pZ16xnXZPOccB7syxAJHwIyvNYgLuzos5MBleuPbRUBAhfnMcCrnKWm7OGmgWIhB8wBB2FcXgNznAqeCp0OnhuDkHLnOXmrKE3Pj3bx2e8A94F74G1sA4+CgNwO3wBvgx3wzfgu3Av/Bgehp/DL+A3ZsuyZ6EEtkL/ohC164Lk+tAKtf1216+9znJz1pCr8+OtfvTfsixH8JMtBJQJvxskKOmtMmSsArn67iboh03wCfgsfAnkYPKemnw52fYAPAKPwS9FPvwOHoWLnOXmrKFsCfBXRycllp4/kwrwAhITsH0514cunwSuD4UN/D6g8NeGJjwUEboXkFTvnkm7COiBkq+AhHv6G8kg+A/Ww/dDkKNLM9qQaTb3fhxsnQ0sK/wc0EaYMxlyov+G4Ae9gIRDPp8YLyDF8EWMF5C2gE19g2YTv/MGfIQ5QOHngIQFEbwXMJvJ09XfeAEJ9/BWoryAtAVsYAjawBwQsJ45QIFAOfcv1yh1tZKZifczsRFtSCV4LyBNaV5AG701CVEzFCDDkFzB/D6Q51DEvhElsTYSazihL21e+usg2ICmO+8L49yZGeIg6+shJ2Tu+2Zug1r9Jty+ABFyCm7xAhxUxSwqIKiI4whYkbkOl7kNal0Bn2pzCNJDkuH79mTqO2dqY+RkW2FLCPsqzxtqsNIWi8NgA8wrx2yIQy9bo/nvsDWafOH3Jl/oA54/VEh/TsiogJWIuB02E/4q6ILrYUSHL8uzEMC9y4UXvIDXH2puJfT/AMNGFUIX/gWFyrLq/TEEiIRVvgIaEi6hEn8Ikzp8JSAQ4VLAHgRcyWdeE+GKCzoqXNAPkzF+YleY0W05M7rtbihDI+hqz29+wtYYjzjTRPf78zxz7nwU5Ll0Fc5ByYyyrMmPnzX58R9BDyQ/R2RAwOUEf1LCv8ACqiKaBSCQA7n8+ItwQ+L5JP4BkbFeVcA6lh8n9BeC8DMmQCScJR95MMeCxHJKqGE5/yL7200Qeg/cBaeg0uszLCC4rP0w3+WTiRxDuBZgCsUu2A+HK4xOhMmznucZoXnKXxih3DUnGMM1x3jMmWY4zzPkFIdOst+veInjAs3BV6zRHOD5RCF4/4Ai+u/D7R0lr91OM3PaWOVAqrgaGF9rNI2xteDnpgCpiFOQnQc2RQUS/IPzXIBI2OWs4zprqDrZXkT4xzpAwD/4rm92kl3cRuzzN+QUy+xztxXhTI2z5pmPTYYYWjNpGkybB3g2RJUpOGe+f8UU2Do7+H8FaO7sLZk7e6fqDCyaMppbF06ZKmUI32Ms9xtH70O+eeE0/+1cjUnTvzjMxiWTpspZOGO2XnsaTkIPxD9OcCTgMiQchimCLynKhB9maE0ZAQFB+I1XHb4sNwuwhN9ggJv0NBK6Jnqjd7MAkVKu07+4jIQGG5eUCT6gROgBUyw/L1UfK8NYf8ywU+v9K3i1FZ67LQQCbIihNRYBDRoVUJWQjoBGZfRzx41m4xKLgAZbr+Vp7XVOkt9bY2UY648bAq72Amb5u3NcAbW/v4zXv8FwjSO8JoHsh7dDEtsQfEc5ONuf+hAUESjjoTw7SM5utkKey5xFWm23vC/fUb5r/Iu/HFVA/L0BB78Xz8nvMic3ej7J8gJmOXm66gRegBfQ2fOHrwBfAb4CfBWkWAU+/BTDlz0pL8AL6OxO4CvAV4CvAF8F6VXB/wF8xAveGn9AdAAAAABJRU5ErkJggg==",
  addImageIcon = "" + new URL("../../assets/addImageIcon-e1dac575.svg", import.meta.url).href,
  trashIcon = "" + new URL("../../assets/trashIcon-4cb27fbb.svg", import.meta.url).href,
  paletteIcon = "" + new URL("../../assets/paletteIcon-54f0b189.svg", import.meta.url).href,
  editIcon = "" + new URL("../../assets/editIcon-f5978e3b.svg", import.meta.url).href,
  eyeIcon = "" + new URL("../../assets/eyeIcon-3322ed24.svg", import.meta.url).href,
  chevronIcon = "" + new URL("../../assets/chevronIcon-281e076b.svg", import.meta.url).href,
  discordIcon = "" + new URL("../../assets/discordIcon-02da1f7c.svg", import.meta.url).href;
function get_each_context(E, _, A) {
  const I = E.slice();
  return (I[70] = _[A]), (I[72] = A), I;
}
function get_each_context_1(E, _, A) {
  const I = E.slice();
  return (I[73] = _[A]), (I[72] = A), I;
}
function create_if_block_18(E) {
  let _, A, I, D, T, C, R, B, P, O, F;
  return (
    (C = new PreviewModal({ props: { gridSize: E[10], resultImage: E[4] } })),
    C.$on("close", E[30]),
    {
      c() {
        (_ = element("div")), (D = space()), (T = element("div")), create_component(C.$$.fragment), this.h();
      },
      l(L) {
        (_ = claim_element(L, "DIV", { class: !0 })),
          children(_).forEach(detach),
          (D = claim_space(L)),
          (T = claim_element(L, "DIV", { class: !0 }));
        var U = children(T);
        claim_component(C.$$.fragment, U), U.forEach(detach), this.h();
      },
      h() {
        attr(
          _,
          "class",
          "fixed cursor-pointer top-0 left-0 z-[60] bg-Deep-blue/80 backdrop-blur-3xl w-screen h-screen",
        ),
          attr(
            T,
            "class",
            "fixed top-1/2 z-[70] left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center",
          );
      },
      m(L, U) {
        insert_hydration(L, _, U),
          insert_hydration(L, D, U),
          insert_hydration(L, T, U),
          mount_component(C, T, null),
          (P = !0),
          O || ((F = [listen(_, "keypress", keypress_handler), listen(_, "click", E[29])]), (O = !0));
      },
      p(L, U) {
        E = L;
        const z = {};
        U[0] & 1024 && (z.gridSize = E[10]), U[0] & 16 && (z.resultImage = E[4]), C.$set(z);
      },
      i(L) {
        P ||
          (add_render_callback(() => {
            I && I.end(1),
              (A = create_in_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
              A.start();
          }),
          transition_in(C.$$.fragment, L),
          add_render_callback(() => {
            B && B.end(1),
              (R = create_in_transition(T, scale, { delay: 0, duration: 300, easing: quintOut })),
              R.start();
          }),
          (P = !0));
      },
      o(L) {
        A && A.invalidate(),
          (I = create_out_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
          transition_out(C.$$.fragment, L),
          R && R.invalidate(),
          (B = create_out_transition(T, scale, { delay: 0, duration: 300, easing: quintOut })),
          (P = !1);
      },
      d(L) {
        L && detach(_),
          L && I && I.end(),
          L && detach(D),
          L && detach(T),
          destroy_component(C),
          L && B && B.end(),
          (O = !1),
          run_all(F);
      },
    }
  );
}
function create_if_block_17(E) {
  let _, A, I, D, T, C, R, B, P, O, F;
  return (
    (C = new BGremovalModal({})),
    C.$on("close", E[32]),
    {
      c() {
        (_ = element("div")), (D = space()), (T = element("div")), create_component(C.$$.fragment), this.h();
      },
      l(L) {
        (_ = claim_element(L, "DIV", { class: !0 })),
          children(_).forEach(detach),
          (D = claim_space(L)),
          (T = claim_element(L, "DIV", { class: !0 }));
        var U = children(T);
        claim_component(C.$$.fragment, U), U.forEach(detach), this.h();
      },
      h() {
        attr(
          _,
          "class",
          "fixed cursor-pointer top-0 left-0 z-[60] bg-Deep-blue/80 backdrop-blur-3xl w-screen h-screen",
        ),
          attr(
            T,
            "class",
            "fixed top-1/2 z-[70] left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center",
          );
      },
      m(L, U) {
        insert_hydration(L, _, U),
          insert_hydration(L, D, U),
          insert_hydration(L, T, U),
          mount_component(C, T, null),
          (P = !0),
          O || ((F = [listen(_, "keypress", keypress_handler_1), listen(_, "click", E[31])]), (O = !0));
      },
      p(L, U) {
        E = L;
      },
      i(L) {
        P ||
          (add_render_callback(() => {
            I && I.end(1),
              (A = create_in_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
              A.start();
          }),
          transition_in(C.$$.fragment, L),
          add_render_callback(() => {
            B && B.end(1),
              (R = create_in_transition(T, scale, { delay: 0, duration: 300, easing: quintOut })),
              R.start();
          }),
          (P = !0));
      },
      o(L) {
        A && A.invalidate(),
          (I = create_out_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
          transition_out(C.$$.fragment, L),
          R && R.invalidate(),
          (B = create_out_transition(T, scale, { delay: 0, duration: 300, easing: quintOut })),
          (P = !1);
      },
      d(L) {
        L && detach(_),
          L && I && I.end(),
          L && detach(D),
          L && detach(T),
          destroy_component(C),
          L && B && B.end(),
          (O = !1),
          run_all(F);
      },
    }
  );
}
function create_if_block_16(E) {
  let _, A, I, D, T, C, R, B, P;
  return (
    (C = new PricingModal({})),
    C.$on("closeModal", E[34]),
    {
      c() {
        (_ = element("div")), (D = space()), (T = element("div")), create_component(C.$$.fragment), this.h();
      },
      l(O) {
        (_ = claim_element(O, "DIV", { class: !0 })),
          children(_).forEach(detach),
          (D = claim_space(O)),
          (T = claim_element(O, "DIV", { class: !0 }));
        var F = children(T);
        claim_component(C.$$.fragment, F), F.forEach(detach), this.h();
      },
      h() {
        attr(
          _,
          "class",
          "fixed cursor-pointer top-0 left-0 z-[60] bg-Deep-blue/80 backdrop-blur-3xl w-screen h-screen",
        ),
          attr(T, "class", "top-1/2 left-1/2 -translate-x-1/2 z-[70] w-full sm:w-auto -translate-y-1/2 fixed");
      },
      m(O, F) {
        insert_hydration(O, _, F),
          insert_hydration(O, D, F),
          insert_hydration(O, T, F),
          mount_component(C, T, null),
          (R = !0),
          B || ((P = [listen(_, "keypress", keypress_handler_2), listen(_, "click", E[33])]), (B = !0));
      },
      p(O, F) {
        E = O;
      },
      i(O) {
        R ||
          (add_render_callback(() => {
            I && I.end(1),
              (A = create_in_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
              A.start();
          }),
          transition_in(C.$$.fragment, O),
          (R = !0));
      },
      o(O) {
        A && A.invalidate(),
          (I = create_out_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
          transition_out(C.$$.fragment, O),
          (R = !1);
      },
      d(O) {
        O && detach(_), O && I && I.end(), O && detach(D), O && detach(T), destroy_component(C), (B = !1), run_all(P);
      },
    }
  );
}
function create_if_block_15(E) {
  let _, A;
  return (
    (_ = new ColorEditingModal({})),
    _.$on("closeModal", E[35]),
    {
      c() {
        create_component(_.$$.fragment);
      },
      l(I) {
        claim_component(_.$$.fragment, I);
      },
      m(I, D) {
        mount_component(_, I, D), (A = !0);
      },
      p: noop,
      i(I) {
        A || (transition_in(_.$$.fragment, I), (A = !0));
      },
      o(I) {
        transition_out(_.$$.fragment, I), (A = !1);
      },
      d(I) {
        destroy_component(_, I);
      },
    }
  );
}
function create_if_block_14(E) {
  let _, A;
  return (
    (_ = new CommunityPalettesModal({})),
    _.$on("checkPalette", E[36]),
    _.$on("closeModal", E[37]),
    {
      c() {
        create_component(_.$$.fragment);
      },
      l(I) {
        claim_component(_.$$.fragment, I);
      },
      m(I, D) {
        mount_component(_, I, D), (A = !0);
      },
      p: noop,
      i(I) {
        A || (transition_in(_.$$.fragment, I), (A = !0));
      },
      o(I) {
        transition_out(_.$$.fragment, I), (A = !1);
      },
      d(I) {
        destroy_component(_, I);
      },
    }
  );
}
function create_each_block_1(E) {
  let _,
    A = E[73] + "",
    I;
  return {
    c() {
      (_ = element("span")), (I = text(A)), this.h();
    },
    l(D) {
      _ = claim_element(D, "SPAN", { style: !0, class: !0 });
      var T = children(_);
      (I = claim_text(T, A)), T.forEach(detach), this.h();
    },
    h() {
      set_style(_, "display", "inline-block"), attr(_, "class", "char-" + E[72]);
    },
    m(D, T) {
      insert_hydration(D, _, T), append_hydration(_, I);
    },
    p: noop,
    d(D) {
      D && detach(_);
    },
  };
}
function create_if_block_12(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F = E[3] && create_if_block_13();
  return {
    c() {
      (_ = element("div")),
        (A = element("img")),
        (D = space()),
        (T = element("img")),
        (R = space()),
        (B = element("div")),
        (P = space()),
        F && F.c(),
        this.h();
    },
    l(L) {
      _ = claim_element(L, "DIV", { class: !0 });
      var U = children(_);
      (A = claim_element(U, "IMG", { src: !0, alt: !0, class: !0, height: !0, width: !0 })),
        (D = claim_space(U)),
        (T = claim_element(U, "IMG", { src: !0, alt: !0, class: !0, height: !0, width: !0 })),
        (R = claim_space(U)),
        (B = claim_element(U, "DIV", { class: !0 })),
        children(B).forEach(detach),
        (P = claim_space(U)),
        F && F.l(U),
        U.forEach(detach),
        this.h();
    },
    h() {
      src_url_equal(A.src, (I = E[4] ? E[4] : samplePixelArt)) || attr(A, "src", I),
        attr(A, "alt", "Result"),
        attr(A, "class", "h-auto sm:w-[320px] w-full relative rounded-md z-10"),
        attr(A, "height", "24"),
        attr(A, "width", "24"),
        src_url_equal(T.src, (C = E[4] ? E[4] : samplePixelArt)) || attr(T, "src", C),
        attr(T, "alt", "Result"),
        attr(
          T,
          "class",
          "h-auto sm:w-[320px] hidden sm:flex w-full absolute top-0 left-0 scale-110 sm:blur-xl blur-lg sm:opacity-[0.12] opacity-10",
        ),
        attr(T, "height", "24"),
        attr(T, "width", "24"),
        attr(B, "class", "grid grid-cols-6 grid-rows-6 w-full h-full absolute top-0 left-0 rounded-md overflow-hidden"),
        attr(_, "class", "relative rounded-md");
    },
    m(L, U) {
      insert_hydration(L, _, U),
        append_hydration(_, A),
        append_hydration(_, D),
        append_hydration(_, T),
        append_hydration(_, R),
        append_hydration(_, B),
        E[38](B),
        append_hydration(_, P),
        F && F.m(_, null),
        (O = !0);
    },
    p(L, U) {
      (!O || (U[0] & 16 && !src_url_equal(A.src, (I = L[4] ? L[4] : samplePixelArt)))) && attr(A, "src", I),
        (!O || (U[0] & 16 && !src_url_equal(T.src, (C = L[4] ? L[4] : samplePixelArt)))) && attr(T, "src", C),
        L[3]
          ? F
            ? (F.p(L, U), U[0] & 8 && transition_in(F, 1))
            : ((F = create_if_block_13()), F.c(), transition_in(F, 1), F.m(_, null))
          : F &&
            (group_outros(),
            transition_out(F, 1, 1, () => {
              F = null;
            }),
            check_outros());
    },
    i(L) {
      O || (transition_in(F), (O = !0));
    },
    o(L) {
      transition_out(F), (O = !1);
    },
    d(L) {
      L && detach(_), E[38](null), F && F.d();
    },
  };
}
function create_if_block_13(E) {
  let _, A, I, D, T, C;
  return {
    c() {
      (_ = element("div")), (A = element("img")), this.h();
    },
    l(R) {
      _ = claim_element(R, "DIV", { class: !0 });
      var B = children(_);
      (A = claim_element(B, "IMG", { src: !0, height: !0, width: !0, class: !0, alt: !0 })),
        B.forEach(detach),
        this.h();
    },
    h() {
      src_url_equal(A.src, (I = loadingIcon)) || attr(A, "src", I),
        attr(A, "height", "24"),
        attr(A, "width", "24"),
        attr(A, "class", "animate-spin"),
        attr(A, "alt", "Loading icon"),
        attr(
          _,
          "class",
          "z-40 w-full h-full absolute top-0 left-0 bg-Deep-blue/50 backdrop-blur-xl rounded-md flex flex-col justify-center items-center",
        );
    },
    m(R, B) {
      insert_hydration(R, _, B), append_hydration(_, A), (C = !0);
    },
    p(R, B) {},
    i(R) {
      C ||
        (add_render_callback(() => {
          T && T.end(1), (D = create_in_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })), D.start();
        }),
        (C = !0));
    },
    o(R) {
      D && D.invalidate(),
        (T = create_out_transition(_, fade, { delay: 0, duration: 300, easing: quintOut })),
        (C = !1);
    },
    d(R) {
      R && detach(_), R && T && T.end();
    },
  };
}
function create_if_block_3(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q,
    J,
    K,
    ne,
    re,
    ie,
    se,
    oe,
    _e,
    ve,
    fe,
    ke,
    me,
    Ee,
    Se,
    ue,
    xe,
    pe,
    we,
    Ne,
    Ce,
    De,
    Ue,
    Oe;
  function ge(Me) {
    E[39](Me);
  }
  let Ke = {};
  E[1] !== void 0 && (Ke.checked = E[1]),
    (B = new Switch({ props: Ke })),
    binding_callbacks.push(() => bind(B, "checked", ge, E[1]));
  let Ie = E[12] && create_if_block_10(E),
    ye = E[13] && create_if_block_5(E),
    Re = E[14] && create_if_block_4(E);
  return {
    c() {
      (_ = element("div")),
        (A = element("div")),
        (I = element("div")),
        (D = element("p")),
        (T = text("Remove background ✨")),
        (C = space()),
        (R = element("div")),
        create_component(B.$$.fragment),
        (O = space()),
        (F = element("div")),
        (L = element("div")),
        (U = element("p")),
        (z = text("Color palette")),
        (V = space()),
        (X = element("img")),
        (Y = space()),
        Ie && Ie.c(),
        (q = space()),
        (W = element("div")),
        (ee = element("div")),
        (te = element("p")),
        (Q = text("Pixel grid size")),
        (J = space()),
        (K = element("img")),
        (ie = space()),
        ye && ye.c(),
        (se = space()),
        (oe = element("div")),
        (_e = element("div")),
        (ve = element("p")),
        (fe = text("Advanced settings")),
        (ke = space()),
        (me = element("img")),
        (ue = space()),
        Re && Re.c(),
        (xe = space()),
        (pe = element("div")),
        (we = element("button")),
        (Ne = element("p")),
        (Ce = text("Generate")),
        this.h();
    },
    l(Me) {
      _ = claim_element(Me, "DIV", { class: !0 });
      var Te = children(_);
      A = claim_element(Te, "DIV", { class: !0 });
      var he = children(A);
      I = claim_element(he, "DIV", { id: !0, class: !0 });
      var Pe = children(I);
      D = claim_element(Pe, "P", {});
      var Ge = children(D);
      (T = claim_text(Ge, "Remove background ✨")),
        Ge.forEach(detach),
        (C = claim_space(Pe)),
        (R = claim_element(Pe, "DIV", { class: !0 }));
      var $e = children(R);
      claim_component(B.$$.fragment, $e),
        $e.forEach(detach),
        Pe.forEach(detach),
        he.forEach(detach),
        (O = claim_space(Te)),
        (F = claim_element(Te, "DIV", { class: !0 }));
      var be = children(F);
      L = claim_element(be, "DIV", { class: !0 });
      var qe = children(L);
      U = claim_element(qe, "P", {});
      var He = children(U);
      (z = claim_text(He, "Color palette")),
        He.forEach(detach),
        (V = claim_space(qe)),
        (X = claim_element(qe, "IMG", { src: !0, alt: !0, class: !0 })),
        qe.forEach(detach),
        (Y = claim_space(be)),
        Ie && Ie.l(be),
        be.forEach(detach),
        (q = claim_space(Te)),
        (W = claim_element(Te, "DIV", { class: !0 }));
      var ze = children(W);
      ee = claim_element(ze, "DIV", { class: !0 });
      var je = children(ee);
      te = claim_element(je, "P", {});
      var Xe = children(te);
      (Q = claim_text(Xe, "Pixel grid size")),
        Xe.forEach(detach),
        (J = claim_space(je)),
        (K = claim_element(je, "IMG", { src: !0, alt: !0, class: !0 })),
        je.forEach(detach),
        (ie = claim_space(ze)),
        ye && ye.l(ze),
        ze.forEach(detach),
        (se = claim_space(Te)),
        (oe = claim_element(Te, "DIV", { class: !0 }));
      var Be = children(oe);
      _e = claim_element(Be, "DIV", { class: !0 });
      var de = children(_e);
      ve = claim_element(de, "P", {});
      var Le = children(ve);
      (fe = claim_text(Le, "Advanced settings")),
        Le.forEach(detach),
        (ke = claim_space(de)),
        (me = claim_element(de, "IMG", { src: !0, alt: !0, class: !0 })),
        de.forEach(detach),
        (ue = claim_space(Be)),
        Re && Re.l(Be),
        Be.forEach(detach),
        Te.forEach(detach),
        (xe = claim_space(Me)),
        (pe = claim_element(Me, "DIV", { class: !0 }));
      var Ye = children(pe);
      we = claim_element(Ye, "BUTTON", { "data-splitbee-event": !0, class: !0 });
      var Qe = children(we);
      Ne = claim_element(Qe, "P", {});
      var Je = children(Ne);
      (Ce = claim_text(Je, "Generate")), Je.forEach(detach), Qe.forEach(detach), Ye.forEach(detach), this.h();
    },
    h() {
      attr(R, "class", "flex flex-row justify-center items-center space-x-2"),
        attr(I, "id", "removeBackgroudSetting"),
        attr(I, "class", "flex flex-row justify-between w-full items-center"),
        attr(A, "class", "flex flex-col justify-center items-start w-full space-y-2"),
        src_url_equal(X.src, (G = chevronIcon)) || attr(X, "src", G),
        attr(X, "alt", "Chevron"),
        attr(X, "class", (Z = E[12] ? "rotate-180 transition-all duration-200" : "transition-all duration-200")),
        attr(L, "class", "flex cursor-pointer w-full flex-row justify-between items-center"),
        attr(F, "class", "flex flex-col justify-center w-full items-start space-y-4"),
        src_url_equal(K.src, (ne = chevronIcon)) || attr(K, "src", ne),
        attr(K, "alt", "Chevron"),
        attr(K, "class", (re = E[13] ? "rotate-180 transition-all duration-200" : "transition-all duration-200")),
        attr(ee, "class", "flex cursor-pointer w-full flex-row justify-between items-center"),
        attr(W, "class", "flex flex-col justify-center items-center w-full space-y-4"),
        src_url_equal(me.src, (Ee = chevronIcon)) || attr(me, "src", Ee),
        attr(me, "alt", "Chevron"),
        attr(me, "class", (Se = E[14] ? "rotate-180 transition-all duration-200" : "transition-all duration-200")),
        attr(_e, "class", "flex cursor-pointer w-full flex-row justify-between items-center"),
        attr(oe, "class", "flex flex-col justify-center items-center w-full space-y-4"),
        attr(_, "class", "flex flex-col space-y-6 w-full items-center sm:max-w-xs justify-center mt-10"),
        attr(we, "data-splitbee-event", "Click Generate"),
        (we.disabled = E[3]),
        attr(
          we,
          "class",
          "shadow-[0px_4px_0px_rgba(47,30,92,1)] mt-8 sm:max-w-xs w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md",
        ),
        attr(pe, "class", "flex flex-col justify-center items-center w-full space-y-3");
    },
    m(Me, Te) {
      insert_hydration(Me, _, Te),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(I, D),
        append_hydration(D, T),
        append_hydration(I, C),
        append_hydration(I, R),
        mount_component(B, R, null),
        append_hydration(_, O),
        append_hydration(_, F),
        append_hydration(F, L),
        append_hydration(L, U),
        append_hydration(U, z),
        append_hydration(L, V),
        append_hydration(L, X),
        append_hydration(F, Y),
        Ie && Ie.m(F, null),
        append_hydration(_, q),
        append_hydration(_, W),
        append_hydration(W, ee),
        append_hydration(ee, te),
        append_hydration(te, Q),
        append_hydration(ee, J),
        append_hydration(ee, K),
        append_hydration(W, ie),
        ye && ye.m(W, null),
        append_hydration(_, se),
        append_hydration(_, oe),
        append_hydration(oe, _e),
        append_hydration(_e, ve),
        append_hydration(ve, fe),
        append_hydration(_e, ke),
        append_hydration(_e, me),
        append_hydration(oe, ue),
        Re && Re.m(oe, null),
        insert_hydration(Me, xe, Te),
        insert_hydration(Me, pe, Te),
        append_hydration(pe, we),
        append_hydration(we, Ne),
        append_hydration(Ne, Ce),
        (De = !0),
        Ue ||
          ((Oe = [
            listen(L, "click", E[40]),
            listen(L, "keydown", keydown_handler),
            listen(ee, "click", E[46]),
            listen(ee, "keydown", keydown_handler_1),
            listen(_e, "click", E[51]),
            listen(_e, "keydown", keydown_handler_2),
            listen(we, "click", E[26]),
          ]),
          (Ue = !0));
    },
    p(Me, Te) {
      const he = {};
      !P && Te[0] & 2 && ((P = !0), (he.checked = Me[1]), add_flush_callback(() => (P = !1))),
        B.$set(he),
        (!De ||
          (Te[0] & 4096 &&
            Z !== (Z = Me[12] ? "rotate-180 transition-all duration-200" : "transition-all duration-200"))) &&
          attr(X, "class", Z),
        Me[12]
          ? Ie
            ? (Ie.p(Me, Te), Te[0] & 4096 && transition_in(Ie, 1))
            : ((Ie = create_if_block_10(Me)), Ie.c(), transition_in(Ie, 1), Ie.m(F, null))
          : Ie &&
            (group_outros(),
            transition_out(Ie, 1, 1, () => {
              Ie = null;
            }),
            check_outros()),
        (!De ||
          (Te[0] & 8192 &&
            re !== (re = Me[13] ? "rotate-180 transition-all duration-200" : "transition-all duration-200"))) &&
          attr(K, "class", re),
        Me[13]
          ? ye
            ? (ye.p(Me, Te), Te[0] & 8192 && transition_in(ye, 1))
            : ((ye = create_if_block_5(Me)), ye.c(), transition_in(ye, 1), ye.m(W, null))
          : ye &&
            (group_outros(),
            transition_out(ye, 1, 1, () => {
              ye = null;
            }),
            check_outros()),
        (!De ||
          (Te[0] & 16384 &&
            Se !== (Se = Me[14] ? "rotate-180 transition-all duration-200" : "transition-all duration-200"))) &&
          attr(me, "class", Se),
        Me[14]
          ? Re
            ? (Re.p(Me, Te), Te[0] & 16384 && transition_in(Re, 1))
            : ((Re = create_if_block_4(Me)), Re.c(), transition_in(Re, 1), Re.m(oe, null))
          : Re &&
            (group_outros(),
            transition_out(Re, 1, 1, () => {
              Re = null;
            }),
            check_outros()),
        (!De || Te[0] & 8) && (we.disabled = Me[3]);
    },
    i(Me) {
      De || (transition_in(B.$$.fragment, Me), transition_in(Ie), transition_in(ye), transition_in(Re), (De = !0));
    },
    o(Me) {
      transition_out(B.$$.fragment, Me), transition_out(Ie), transition_out(ye), transition_out(Re), (De = !1);
    },
    d(Me) {
      Me && detach(_),
        destroy_component(B),
        Ie && Ie.d(),
        ye && ye.d(),
        Re && Re.d(),
        Me && detach(xe),
        Me && detach(pe),
        (Ue = !1),
        run_all(Oe);
    },
  };
}
function create_if_block_10(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q = E[18],
    J = [];
  for (let re = 0; re < Q.length; re += 1) J[re] = create_each_block(get_each_context(E, Q, re));
  const K = (re) =>
    transition_out(J[re], 1, 1, () => {
      J[re] = null;
    });
  let ne = E[18].length > 0 && create_if_block_11(E);
  return {
    c() {
      (_ = element("div")), (A = element("div")), (I = element("div")), (D = element("div"));
      for (let re = 0; re < J.length; re += 1) J[re].c();
      (T = space()),
        (C = element("div")),
        (R = element("button")),
        (B = element("img")),
        (O = space()),
        (F = element("button")),
        (L = element("img")),
        (z = space()),
        (V = element("button")),
        (X = element("img")),
        (Z = space()),
        ne && ne.c(),
        this.h();
    },
    l(re) {
      _ = claim_element(re, "DIV", { class: !0 });
      var ie = children(_);
      A = claim_element(ie, "DIV", { class: !0 });
      var se = children(A);
      I = claim_element(se, "DIV", { class: !0 });
      var oe = children(I);
      D = claim_element(oe, "DIV", { class: !0 });
      var _e = children(D);
      for (let Ee = 0; Ee < J.length; Ee += 1) J[Ee].l(_e);
      _e.forEach(detach), (T = claim_space(oe)), (C = claim_element(oe, "DIV", { class: !0 }));
      var ve = children(C);
      R = claim_element(ve, "BUTTON", {});
      var fe = children(R);
      (B = claim_element(fe, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        fe.forEach(detach),
        (O = claim_space(ve)),
        (F = claim_element(ve, "BUTTON", {}));
      var ke = children(F);
      (L = claim_element(ke, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        ke.forEach(detach),
        (z = claim_space(ve)),
        (V = claim_element(ve, "BUTTON", {}));
      var me = children(V);
      (X = claim_element(me, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        me.forEach(detach),
        ve.forEach(detach),
        oe.forEach(detach),
        se.forEach(detach),
        (Z = claim_space(ie)),
        ne && ne.l(ie),
        ie.forEach(detach),
        this.h();
    },
    h() {
      attr(D, "class", "grid grid-cols-8 gap-0 items-center justify-center"),
        src_url_equal(B.src, (P = editIcon)) || attr(B, "src", P),
        attr(B, "alt", "Edit"),
        attr(B, "height", "24"),
        attr(B, "width", "24"),
        src_url_equal(L.src, (U = paletteIcon)) || attr(L, "src", U),
        attr(L, "alt", "Palette"),
        attr(L, "height", "24"),
        attr(L, "width", "24"),
        src_url_equal(X.src, (G = trashIcon)) || attr(X, "src", G),
        attr(X, "alt", "Trash"),
        attr(X, "height", "24"),
        attr(X, "width", "24"),
        attr(C, "class", "flex flex-row justify-center items-center space-x-2"),
        attr(I, "class", "flex flex-row justify-between items-start w-full"),
        attr(A, "class", "flex flex-col justify-center space-y-4 items-start w-full"),
        attr(
          _,
          "class",
          "flex flex-col justify-center p-3 border border-Light-Blue bg-Medium-Blue rounded-md items-center w-full space-y-2",
        );
    },
    m(re, ie) {
      insert_hydration(re, _, ie), append_hydration(_, A), append_hydration(A, I), append_hydration(I, D);
      for (let se = 0; se < J.length; se += 1) J[se].m(D, null);
      append_hydration(I, T),
        append_hydration(I, C),
        append_hydration(C, R),
        append_hydration(R, B),
        append_hydration(C, O),
        append_hydration(C, F),
        append_hydration(F, L),
        append_hydration(C, z),
        append_hydration(C, V),
        append_hydration(V, X),
        append_hydration(_, Z),
        ne && ne.m(_, null),
        (W = !0),
        ee || ((te = [listen(R, "click", E[42]), listen(F, "click", E[43]), listen(V, "click", E[44])]), (ee = !0));
    },
    p(re, ie) {
      if (((E = re), ie[0] & 786465)) {
        Q = E[18];
        let se;
        for (se = 0; se < Q.length; se += 1) {
          const oe = get_each_context(E, Q, se);
          J[se]
            ? (J[se].p(oe, ie), transition_in(J[se], 1))
            : ((J[se] = create_each_block(oe)), J[se].c(), transition_in(J[se], 1), J[se].m(D, null));
        }
        for (group_outros(), se = Q.length; se < J.length; se += 1) K(se);
        check_outros();
      }
      E[18].length > 0
        ? ne
          ? ne.p(E, ie)
          : ((ne = create_if_block_11(E)), ne.c(), ne.m(_, null))
        : ne && (ne.d(1), (ne = null));
    },
    i(re) {
      if (!W) {
        for (let ie = 0; ie < Q.length; ie += 1) transition_in(J[ie]);
        add_render_callback(() => {
          q && q.end(1), (Y = create_in_transition(_, slide, { delay: 0, duration: 200, easing: quintOut })), Y.start();
        }),
          (W = !0);
      }
    },
    o(re) {
      J = J.filter(Boolean);
      for (let ie = 0; ie < J.length; ie += 1) transition_out(J[ie]);
      Y && Y.invalidate(),
        (q = create_out_transition(_, slide, { delay: 0, duration: 200, easing: quintOut })),
        (W = !1);
    },
    d(re) {
      re && detach(_), destroy_each(J, re), ne && ne.d(), re && q && q.end(), (ee = !1), run_all(te);
    },
  };
}
function create_key_block(E) {
  let _, A, I, D;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(T) {
      (_ = claim_element(T, "DIV", { "data-splitbee-event": !0, class: !0, style: !0 })),
        children(_).forEach(detach),
        this.h();
    },
    h() {
      attr(_, "data-splitbee-event", "Click swatches palette"),
        attr(
          _,
          "class",
          "h-5 w-5 sm:hover:scale-125 sm:hover:z-40 transition-all duration-200 relative flex flex-col justify-center items-center cursor-pointer",
        ),
        attr(_, "style", (A = computeRBGAColor(E[70])));
    },
    m(T, C) {
      insert_hydration(T, _, C),
        I || ((D = [listen(_, "click", E[41]), listen(_, "keypress", keypress_handler_3)]), (I = !0));
    },
    p(T, C) {
      C[0] & 262144 && A !== (A = computeRBGAColor(T[70])) && attr(_, "style", A);
    },
    d(T) {
      T && detach(_), (I = !1), run_all(D);
    },
  };
}
function create_each_block(E) {
  let _,
    A = E[19],
    I,
    D,
    T,
    C,
    R = create_key_block(E);
  return {
    c() {
      (_ = element("div")), R.c(), (I = space());
    },
    l(B) {
      _ = claim_element(B, "DIV", {});
      var P = children(_);
      R.l(P), (I = claim_space(P)), P.forEach(detach);
    },
    m(B, P) {
      insert_hydration(B, _, P), R.m(_, null), append_hydration(_, I), (C = !0);
    },
    p(B, P) {
      (E = B),
        P[0] & 524288 && safe_not_equal(A, (A = E[19]))
          ? (R.d(1), (R = create_key_block(E)), R.c(), R.m(_, I))
          : R.p(E, P);
    },
    i(B) {
      C ||
        (add_render_callback(() => {
          T && T.end(1),
            (D = create_in_transition(_, scale, { delay: 5 * E[72], duration: 300, easing: quintOut })),
            D.start();
        }),
        (C = !0));
    },
    o(B) {
      D && D.invalidate(),
        (T = create_out_transition(_, scale, { delay: 5 * E[72], duration: 300, easing: quintOut })),
        (C = !1);
    },
    d(B) {
      B && detach(_), R.d(B), B && T && T.end();
    },
  };
}
function create_if_block_11(E) {
  let _, A, I, D, T, C, R, B;
  return {
    c() {
      (_ = element("div")),
        (A = element("label")),
        (I = element("input")),
        (D = space()),
        (T = element("p")),
        (C = text("Use this palette")),
        this.h();
    },
    l(P) {
      _ = claim_element(P, "DIV", { class: !0 });
      var O = children(_);
      A = claim_element(O, "LABEL", { class: !0 });
      var F = children(A);
      (I = claim_element(F, "INPUT", { "data-splitbee-event": !0, type: !0 })),
        (D = claim_space(F)),
        (T = claim_element(F, "P", {}));
      var L = children(T);
      (C = claim_text(L, "Use this palette")), L.forEach(detach), F.forEach(detach), O.forEach(detach), this.h();
    },
    h() {
      attr(I, "data-splitbee-event", "Click use this palette"),
        attr(I, "type", "checkbox"),
        attr(A, "class", "flex flex-row text-sm justify-center items-center space-x-2"),
        attr(_, "class", "flex flex-col justify-center items-start w-full");
    },
    m(P, O) {
      insert_hydration(P, _, O),
        append_hydration(_, A),
        append_hydration(A, I),
        (I.checked = E[11]),
        append_hydration(A, D),
        append_hydration(A, T),
        append_hydration(T, C),
        R || ((B = listen(I, "change", E[45])), (R = !0));
    },
    p(P, O) {
      O[0] & 2048 && (I.checked = P[11]);
    },
    d(P) {
      P && detach(_), (R = !1), B();
    },
  };
}
function create_if_block_5(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q,
    J,
    K,
    ne,
    re,
    ie,
    se,
    oe,
    _e,
    ve,
    fe = E[9] === 16 && create_if_block_9(),
    ke = E[9] === 8 && create_if_block_8(),
    me = E[9] === 4 && create_if_block_7(),
    Ee = E[9] === 2 && create_if_block_6();
  return {
    c() {
      (_ = element("div")),
        (A = element("button")),
        (I = element("p")),
        (D = text("32px")),
        (C = space()),
        fe && fe.c(),
        (B = space()),
        (P = element("button")),
        (O = element("p")),
        (F = text("64px")),
        (U = space()),
        ke && ke.c(),
        (V = space()),
        (X = element("button")),
        (G = element("p")),
        (Z = text("128px")),
        (q = space()),
        me && me.c(),
        (ee = space()),
        (te = element("button")),
        (Q = element("p")),
        (J = text("256px")),
        (ne = space()),
        Ee && Ee.c(),
        this.h();
    },
    l(Se) {
      _ = claim_element(Se, "DIV", { class: !0 });
      var ue = children(_);
      A = claim_element(ue, "BUTTON", { "data-splitbee-event": !0, class: !0 });
      var xe = children(A);
      I = claim_element(xe, "P", { class: !0 });
      var pe = children(I);
      (D = claim_text(pe, "32px")),
        pe.forEach(detach),
        (C = claim_space(xe)),
        fe && fe.l(xe),
        xe.forEach(detach),
        (B = claim_space(ue)),
        (P = claim_element(ue, "BUTTON", { "data-splitbee-event": !0, class: !0 }));
      var we = children(P);
      O = claim_element(we, "P", { class: !0 });
      var Ne = children(O);
      (F = claim_text(Ne, "64px")),
        Ne.forEach(detach),
        (U = claim_space(we)),
        ke && ke.l(we),
        we.forEach(detach),
        (V = claim_space(ue)),
        (X = claim_element(ue, "BUTTON", { "data-splitbee-event": !0, class: !0 }));
      var Ce = children(X);
      G = claim_element(Ce, "P", { class: !0 });
      var De = children(G);
      (Z = claim_text(De, "128px")),
        De.forEach(detach),
        (q = claim_space(Ce)),
        me && me.l(Ce),
        Ce.forEach(detach),
        (ee = claim_space(ue)),
        (te = claim_element(ue, "BUTTON", { "data-splitbee-event": !0, class: !0 }));
      var Ue = children(te);
      Q = claim_element(Ue, "P", { class: !0 });
      var Oe = children(Q);
      (J = claim_text(Oe, "256px")),
        Oe.forEach(detach),
        (ne = claim_space(Ue)),
        Ee && Ee.l(Ue),
        Ue.forEach(detach),
        ue.forEach(detach),
        this.h();
    },
    h() {
      attr(I, "class", (T = E[9] === 16 ? "z-10" : "z-10 text-[#978DBA]")),
        attr(A, "data-splitbee-event", "Click 32px size"),
        (A.disabled = E[3]),
        attr(
          A,
          "class",
          (R =
            E[9] === 16
              ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
              : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"),
        ),
        attr(O, "class", (L = E[9] === 8 ? "z-10" : "z-10 text-[#978DBA]")),
        attr(P, "data-splitbee-event", "Click 64px size"),
        (P.disabled = E[3]),
        attr(
          P,
          "class",
          (z =
            E[9] === 8
              ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
              : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"),
        ),
        attr(G, "class", (Y = E[9] === 4 ? "z-10" : "z-10 text-[#978DBA]")),
        attr(X, "data-splitbee-event", "Click 128px size"),
        (X.disabled = E[3]),
        attr(
          X,
          "class",
          (W =
            E[9] === 4
              ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
              : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"),
        ),
        attr(Q, "class", (K = E[9] === 2 ? "z-10" : "z-10 text-[#978DBA]")),
        attr(te, "data-splitbee-event", "Click 256px size"),
        (te.disabled = E[3]),
        attr(
          te,
          "class",
          (re =
            E[9] === 2
              ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
              : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"),
        ),
        attr(_, "class", "grid grid-cols-2 gap-3 justify-center items-center w-full");
    },
    m(Se, ue) {
      insert_hydration(Se, _, ue),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(I, D),
        append_hydration(A, C),
        fe && fe.m(A, null),
        append_hydration(_, B),
        append_hydration(_, P),
        append_hydration(P, O),
        append_hydration(O, F),
        append_hydration(P, U),
        ke && ke.m(P, null),
        append_hydration(_, V),
        append_hydration(_, X),
        append_hydration(X, G),
        append_hydration(G, Z),
        append_hydration(X, q),
        me && me.m(X, null),
        append_hydration(_, ee),
        append_hydration(_, te),
        append_hydration(te, Q),
        append_hydration(Q, J),
        append_hydration(te, ne),
        Ee && Ee.m(te, null),
        (oe = !0),
        _e ||
          ((ve = [
            listen(A, "click", E[47]),
            listen(P, "click", E[48]),
            listen(X, "click", E[49]),
            listen(te, "click", E[50]),
          ]),
          (_e = !0));
    },
    p(Se, ue) {
      (E = Se),
        (!oe || (ue[0] & 512 && T !== (T = E[9] === 16 ? "z-10" : "z-10 text-[#978DBA]"))) && attr(I, "class", T),
        E[9] === 16 ? fe || ((fe = create_if_block_9()), fe.c(), fe.m(A, null)) : fe && (fe.d(1), (fe = null)),
        (!oe || ue[0] & 8) && (A.disabled = E[3]),
        (!oe ||
          (ue[0] & 512 &&
            R !==
              (R =
                E[9] === 16
                  ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
                  : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"))) &&
          attr(A, "class", R),
        (!oe || (ue[0] & 512 && L !== (L = E[9] === 8 ? "z-10" : "z-10 text-[#978DBA]"))) && attr(O, "class", L),
        E[9] === 8 ? ke || ((ke = create_if_block_8()), ke.c(), ke.m(P, null)) : ke && (ke.d(1), (ke = null)),
        (!oe || ue[0] & 8) && (P.disabled = E[3]),
        (!oe ||
          (ue[0] & 512 &&
            z !==
              (z =
                E[9] === 8
                  ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
                  : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"))) &&
          attr(P, "class", z),
        (!oe || (ue[0] & 512 && Y !== (Y = E[9] === 4 ? "z-10" : "z-10 text-[#978DBA]"))) && attr(G, "class", Y),
        E[9] === 4 ? me || ((me = create_if_block_7()), me.c(), me.m(X, null)) : me && (me.d(1), (me = null)),
        (!oe || ue[0] & 8) && (X.disabled = E[3]),
        (!oe ||
          (ue[0] & 512 &&
            W !==
              (W =
                E[9] === 4
                  ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
                  : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"))) &&
          attr(X, "class", W),
        (!oe || (ue[0] & 512 && K !== (K = E[9] === 2 ? "z-10" : "z-10 text-[#978DBA]"))) && attr(Q, "class", K),
        E[9] === 2 ? Ee || ((Ee = create_if_block_6()), Ee.c(), Ee.m(te, null)) : Ee && (Ee.d(1), (Ee = null)),
        (!oe || ue[0] & 8) && (te.disabled = E[3]),
        (!oe ||
          (ue[0] & 512 &&
            re !==
              (re =
                E[9] === 2
                  ? "shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[inset_0px_0px_6px_rgba(183,183,183,0.25),0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"
                  : "shadow-[0px_4px_0px_rgba(47,30,92,1)] w-full relative disabled:cursor-not-allowed hover:bg-[#4E3E79] active:shadow-[0px_0px_0px_rgba(47,30,92,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Light-Blue rounded-md"))) &&
          attr(te, "class", re);
    },
    i(Se) {
      oe ||
        (add_render_callback(() => {
          se && se.end(1),
            (ie = create_in_transition(_, slide, { delay: 0, duration: 200, easing: quintOut })),
            ie.start();
        }),
        (oe = !0));
    },
    o(Se) {
      ie && ie.invalidate(),
        (se = create_out_transition(_, slide, { delay: 0, duration: 200, easing: quintOut })),
        (oe = !1);
    },
    d(Se) {
      Se && detach(_),
        fe && fe.d(),
        ke && ke.d(),
        me && me.d(),
        Ee && Ee.d(),
        Se && se && se.end(),
        (_e = !1),
        run_all(ve);
    },
  };
}
function create_if_block_9(E) {
  let _;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(A) {
      (_ = claim_element(A, "DIV", { class: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(
        _,
        "class",
        "w-16 h-6 rounded-[50%] blur-lg bg-[#7E6AB3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      );
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    d(A) {
      A && detach(_);
    },
  };
}
function create_if_block_8(E) {
  let _;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(A) {
      (_ = claim_element(A, "DIV", { class: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(
        _,
        "class",
        "w-16 h-6 rounded-[50%] blur-lg bg-[#7E6AB3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      );
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    d(A) {
      A && detach(_);
    },
  };
}
function create_if_block_7(E) {
  let _;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(A) {
      (_ = claim_element(A, "DIV", { class: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(
        _,
        "class",
        "w-16 h-6 rounded-[50%] blur-lg bg-[#7E6AB3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      );
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    d(A) {
      A && detach(_);
    },
  };
}
function create_if_block_6(E) {
  let _;
  return {
    c() {
      (_ = element("div")), this.h();
    },
    l(A) {
      (_ = claim_element(A, "DIV", { class: !0 })), children(_).forEach(detach), this.h();
    },
    h() {
      attr(
        _,
        "class",
        "w-16 h-6 rounded-[50%] blur-lg bg-[#7E6AB3] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      );
    },
    m(A, I) {
      insert_hydration(A, _, I);
    },
    d(A) {
      A && detach(_);
    },
  };
}
function create_if_block_4(E) {
  let _, A, I, D, T, C, R, B, P, O;
  function F(U) {
    E[52](U);
  }
  let L = {};
  return (
    E[16] !== void 0 && (L.checked = E[16]),
    (C = new Switch({ props: L })),
    binding_callbacks.push(() => bind(C, "checked", F, E[16])),
    {
      c() {
        (_ = element("div")),
          (A = element("div")),
          (I = element("p")),
          (D = text("Denoising (For 128px and lower grid size)")),
          (T = space()),
          create_component(C.$$.fragment),
          this.h();
      },
      l(U) {
        _ = claim_element(U, "DIV", { class: !0 });
        var z = children(_);
        A = claim_element(z, "DIV", { "data-splitbee-event": !0, class: !0 });
        var V = children(A);
        I = claim_element(V, "P", {});
        var X = children(I);
        (D = claim_text(X, "Denoising (For 128px and lower grid size)")),
          X.forEach(detach),
          (T = claim_space(V)),
          claim_component(C.$$.fragment, V),
          V.forEach(detach),
          z.forEach(detach),
          this.h();
      },
      h() {
        attr(A, "data-splitbee-event", "Click denoising"),
          attr(A, "class", "flex flex-row text-Grey text-sm justify-between w-full items-center space-x-2"),
          attr(_, "class", "flex flex-col justify-center items-start w-full");
      },
      m(U, z) {
        insert_hydration(U, _, z),
          append_hydration(_, A),
          append_hydration(A, I),
          append_hydration(I, D),
          append_hydration(A, T),
          mount_component(C, A, null),
          (O = !0);
      },
      p(U, z) {
        E = U;
        const V = {};
        !R && z[0] & 65536 && ((R = !0), (V.checked = E[16]), add_flush_callback(() => (R = !1))), C.$set(V);
      },
      i(U) {
        O ||
          (transition_in(C.$$.fragment, U),
          add_render_callback(() => {
            P && P.end(1),
              (B = create_in_transition(_, slide, { delay: 0, duration: 200, easing: quintOut })),
              B.start();
          }),
          (O = !0));
      },
      o(U) {
        transition_out(C.$$.fragment, U),
          B && B.invalidate(),
          (P = create_out_transition(_, slide, { delay: 0, duration: 200, easing: quintOut })),
          (O = !1);
      },
      d(U) {
        U && detach(_), destroy_component(C), U && P && P.end();
      },
    }
  );
}
function create_if_block_2(E) {
  let _, A, I, D, T, C, R, B, P, O, F, L, U, z, V, X, G, Z, Y, q, W, ee;
  function te(J) {
    E[53](J);
  }
  let Q = {};
  return (
    E[15] !== void 0 && (Q.checked = E[15]),
    (R = new Switch({ props: Q })),
    binding_callbacks.push(() => bind(R, "checked", te, E[15])),
    {
      c() {
        (_ = element("div")),
          (A = element("div")),
          (I = element("div")),
          (D = element("p")),
          (T = text("Reduce size")),
          (C = space()),
          create_component(R.$$.fragment),
          (P = space()),
          (O = element("button")),
          (F = element("img")),
          (U = space()),
          (z = element("p")),
          (V = text("Preview")),
          (X = space()),
          (G = element("div")),
          (Z = element("p")),
          (Y = text(`Enabling this option to download the image at the selected px
							size. (Ideal for sprites)`)),
          this.h();
      },
      l(J) {
        _ = claim_element(J, "DIV", { class: !0 });
        var K = children(_);
        A = claim_element(K, "DIV", { class: !0 });
        var ne = children(A);
        I = claim_element(ne, "DIV", { "data-splitbee-event": !0, class: !0 });
        var re = children(I);
        D = claim_element(re, "P", {});
        var ie = children(D);
        (T = claim_text(ie, "Reduce size")),
          ie.forEach(detach),
          (C = claim_space(re)),
          claim_component(R.$$.fragment, re),
          re.forEach(detach),
          (P = claim_space(ne)),
          (O = claim_element(ne, "BUTTON", { class: !0 }));
        var se = children(O);
        (F = claim_element(se, "IMG", { src: !0, alt: !0 })),
          (U = claim_space(se)),
          (z = claim_element(se, "P", { class: !0 }));
        var oe = children(z);
        (V = claim_text(oe, "Preview")),
          oe.forEach(detach),
          se.forEach(detach),
          ne.forEach(detach),
          (X = claim_space(K)),
          (G = claim_element(K, "DIV", { class: !0 }));
        var _e = children(G);
        Z = claim_element(_e, "P", { class: !0 });
        var ve = children(Z);
        (Y = claim_text(
          ve,
          `Enabling this option to download the image at the selected px
							size. (Ideal for sprites)`,
        )),
          ve.forEach(detach),
          _e.forEach(detach),
          K.forEach(detach),
          this.h();
      },
      h() {
        attr(I, "data-splitbee-event", "Click reduce size checkbox"),
          attr(I, "class", "flex flex-row justify-start items-center space-x-2"),
          src_url_equal(F.src, (L = eyeIcon)) || attr(F, "src", L),
          attr(F, "alt", "Inspect"),
          attr(z, "class", "text-Grey"),
          attr(O, "class", "flex flex-row justify-center items-center space-x-2"),
          attr(A, "class", "flex flex-row w-full justify-between items-center"),
          attr(Z, "class", "font-merriweather"),
          attr(G, "class", "text-Grey text-xs flex flex-row justify-center items-start space-x-1"),
          attr(_, "class", "flex flex-col justify-center items-start space-y-2 text-sm");
      },
      m(J, K) {
        insert_hydration(J, _, K),
          append_hydration(_, A),
          append_hydration(A, I),
          append_hydration(I, D),
          append_hydration(D, T),
          append_hydration(I, C),
          mount_component(R, I, null),
          append_hydration(A, P),
          append_hydration(A, O),
          append_hydration(O, F),
          append_hydration(O, U),
          append_hydration(O, z),
          append_hydration(z, V),
          append_hydration(_, X),
          append_hydration(_, G),
          append_hydration(G, Z),
          append_hydration(Z, Y),
          (q = !0),
          W || ((ee = listen(O, "click", E[24])), (W = !0));
      },
      p(J, K) {
        const ne = {};
        !B && K[0] & 32768 && ((B = !0), (ne.checked = J[15]), add_flush_callback(() => (B = !1))), R.$set(ne);
      },
      i(J) {
        q || (transition_in(R.$$.fragment, J), (q = !0));
      },
      o(J) {
        transition_out(R.$$.fragment, J), (q = !1);
      },
      d(J) {
        J && detach(_), destroy_component(R), (W = !1), ee();
      },
    }
  );
}
function create_else_block(E) {
  let _, A;
  return {
    c() {
      (_ = element("img")), this.h();
    },
    l(I) {
      (_ = claim_element(I, "IMG", { src: !0, height: !0, width: !0, class: !0, alt: !0 })), this.h();
    },
    h() {
      src_url_equal(_.src, (A = loadingIconWhite)) || attr(_, "src", A),
        attr(_, "height", "16"),
        attr(_, "width", "16"),
        attr(_, "class", "animate-spin pt-1 pb-1"),
        attr(_, "alt", "Loading icon");
    },
    m(I, D) {
      insert_hydration(I, _, D);
    },
    p: noop,
    d(I) {
      I && detach(_);
    },
  };
}
function create_if_block_1(E) {
  let _, A;
  return {
    c() {
      (_ = element("p")), (A = text("Download"));
    },
    l(I) {
      _ = claim_element(I, "P", {});
      var D = children(_);
      (A = claim_text(D, "Download")), D.forEach(detach);
    },
    m(I, D) {
      insert_hydration(I, _, D), append_hydration(_, A);
    },
    p: noop,
    d(I) {
      I && detach(_);
    },
  };
}
function create_if_block(E) {
  let _, A, I, D, T, C;
  return {
    c() {
      (_ = element("a")),
        (A = element("p")),
        (I = text("Share your results")),
        (D = space()),
        (T = element("img")),
        this.h();
    },
    l(R) {
      _ = claim_element(R, "A", { rel: !0, href: !0, target: !0, "data-splitbee-event": !0, class: !0 });
      var B = children(_);
      A = claim_element(B, "P", { class: !0 });
      var P = children(A);
      (I = claim_text(P, "Share your results")),
        P.forEach(detach),
        (D = claim_space(B)),
        (T = claim_element(B, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        B.forEach(detach),
        this.h();
    },
    h() {
      attr(A, "class", ""),
        src_url_equal(T.src, (C = discordIcon)) || attr(T, "src", C),
        attr(T, "alt", "Discord"),
        attr(T, "height", "20"),
        attr(T, "width", "20"),
        attr(_, "rel", "noreferrer"),
        attr(_, "href", "https://discord.gg/scenario"),
        attr(_, "target", "_blank"),
        attr(_, "data-splitbee-event", "Click Discord button"),
        attr(
          _,
          "class",
          "flex flex-row mt-6 justify-center font-calistoga space-x-2 text-sm text-Grey w-full items-center",
        );
    },
    m(R, B) {
      insert_hydration(R, _, B),
        append_hydration(_, A),
        append_hydration(A, I),
        append_hydration(_, D),
        append_hydration(_, T);
    },
    p: noop,
    d(R) {
      R && detach(_);
    },
  };
}
function create_fragment(E) {
  let _,
    A,
    I,
    D,
    T,
    C,
    R,
    B,
    P,
    O,
    F,
    L,
    U,
    z,
    V,
    X,
    G,
    Z,
    Y,
    q,
    W,
    ee,
    te,
    Q,
    J,
    K,
    ne,
    re,
    ie,
    se,
    oe,
    _e,
    ve,
    fe,
    ke,
    me,
    Ee,
    Se,
    ue,
    xe,
    pe,
    we,
    Ne,
    Ce,
    De,
    Ue,
    Oe,
    ge,
    Ke,
    Ie,
    ye,
    Re = E[6] && create_if_block_18(E),
    Me = E[7] && create_if_block_17(E),
    Te = E[8] && create_if_block_16(E),
    he = E[0] && create_if_block_15(E),
    Pe = E[5] && create_if_block_14(E),
    Ge = E[20],
    $e = [];
  for (let de = 0; de < Ge.length; de += 1) $e[de] = create_each_block_1(get_each_context_1(E, Ge, de));
  let be = (E[4] || !E[2]) && create_if_block_12(E),
    qe = E[4] && create_if_block_3(E),
    He = E[4] && create_if_block_2(E);
  function ze(de, Le) {
    return de[3] ? create_else_block : create_if_block_1;
  }
  let je = ze(E),
    Xe = je(E),
    Be = E[4] && create_if_block();
  return {
    c() {
      Re && Re.c(),
        (_ = space()),
        Me && Me.c(),
        (A = space()),
        Te && Te.c(),
        (I = space()),
        (D = element("div")),
        he && he.c(),
        (C = space()),
        (R = element("div")),
        Pe && Pe.c(),
        (P = space()),
        (O = element("main")),
        (F = element("div")),
        (L = element("div")),
        (U = element("p")),
        (z = text("New: Remove "));
      for (let de = 0; de < $e.length; de += 1) $e[de].c();
      (V = space()),
        (X = element("h1")),
        (G = text("Pixel Art Converter")),
        (Z = space()),
        (Y = element("p")),
        (q = text(`Convert Your Images into Pixel Art for Game Development with Our Online
			Image-to-Pixel Art Converter ⚔️`)),
        (W = space()),
        (ee = element("div")),
        (te = element("input")),
        (Q = space()),
        (J = element("label")),
        (K = space()),
        (ne = element("div")),
        (re = element("img")),
        (se = space()),
        (oe = element("p")),
        (_e = text("Click here or drag your image to start!")),
        (ve = space()),
        (fe = element("img")),
        (me = space()),
        (Ee = element("div")),
        (Se = element("div")),
        (ue = element("div")),
        (xe = element("img")),
        (we = space()),
        be && be.c(),
        (Ne = space()),
        qe && qe.c(),
        (Ce = space()),
        (De = element("div")),
        He && He.c(),
        (Ue = space()),
        (Oe = element("button")),
        Xe.c(),
        (ge = space()),
        Be && Be.c(),
        this.h();
    },
    l(de) {
      Re && Re.l(de),
        (_ = claim_space(de)),
        Me && Me.l(de),
        (A = claim_space(de)),
        Te && Te.l(de),
        (I = claim_space(de)),
        (D = claim_element(de, "DIV", { id: !0, class: !0 }));
      var Le = children(D);
      he && he.l(Le), Le.forEach(detach), (C = claim_space(de)), (R = claim_element(de, "DIV", { id: !0, class: !0 }));
      var Ye = children(R);
      Pe && Pe.l(Ye), Ye.forEach(detach), (P = claim_space(de)), (O = claim_element(de, "MAIN", { class: !0 }));
      var Qe = children(O);
      F = claim_element(Qe, "DIV", { class: !0 });
      var Je = children(F);
      L = claim_element(Je, "DIV", { class: !0 });
      var rt = children(L);
      U = claim_element(rt, "P", {});
      var Fe = children(U);
      z = claim_text(Fe, "New: Remove ");
      for (let ae = 0; ae < $e.length; ae += 1) $e[ae].l(Fe);
      Fe.forEach(detach), rt.forEach(detach), (V = claim_space(Je)), (X = claim_element(Je, "H1", { class: !0 }));
      var We = children(X);
      (G = claim_text(We, "Pixel Art Converter")),
        We.forEach(detach),
        (Z = claim_space(Je)),
        (Y = claim_element(Je, "P", { class: !0 }));
      var et = children(Y);
      (q = claim_text(
        et,
        `Convert Your Images into Pixel Art for Game Development with Our Online
			Image-to-Pixel Art Converter ⚔️`,
      )),
        et.forEach(detach),
        Je.forEach(detach),
        (W = claim_space(Qe)),
        (ee = claim_element(Qe, "DIV", { class: !0 }));
      var tt = children(ee);
      (te = claim_element(tt, "INPUT", { id: !0, type: !0, "aria-hidden": !0, placeholder: !0, class: !0 })),
        (Q = claim_space(tt)),
        (J = claim_element(tt, "LABEL", { class: !0, for: !0 })),
        children(J).forEach(detach),
        (K = claim_space(tt)),
        (ne = claim_element(tt, "DIV", { class: !0 }));
      var it = children(ne);
      (re = claim_element(it, "IMG", { src: !0, alt: !0, height: !0, width: !0 })),
        (se = claim_space(it)),
        (oe = claim_element(it, "P", {}));
      var nt = children(oe);
      (_e = claim_text(nt, "Click here or drag your image to start!")),
        nt.forEach(detach),
        it.forEach(detach),
        (ve = claim_space(tt)),
        (fe = claim_element(tt, "IMG", { src: !0, class: !0, height: !0, width: !0, alt: !0 })),
        tt.forEach(detach),
        (me = claim_space(Qe)),
        (Ee = claim_element(Qe, "DIV", { class: !0 }));
      var st = children(Ee);
      Se = claim_element(st, "DIV", { class: !0 });
      var ht = children(Se);
      ue = claim_element(ht, "DIV", { class: !0 });
      var ot = children(ue);
      (xe = claim_element(ot, "IMG", { src: !0, alt: !0, class: !0, height: !0, width: !0 })),
        ot.forEach(detach),
        (we = claim_space(ht)),
        be && be.l(ht),
        ht.forEach(detach),
        (Ne = claim_space(st)),
        qe && qe.l(st),
        (Ce = claim_space(st)),
        (De = claim_element(st, "DIV", { class: !0 }));
      var gt = children(De);
      He && He.l(gt),
        (Ue = claim_space(gt)),
        (Oe = claim_element(gt, "BUTTON", { "data-splitbee-event": !0, class: !0 }));
      var mt = children(Oe);
      Xe.l(mt),
        mt.forEach(detach),
        gt.forEach(detach),
        (ge = claim_space(st)),
        Be && Be.l(st),
        st.forEach(detach),
        Qe.forEach(detach),
        this.h();
    },
    h() {
      attr(D, "id", "modal"),
        attr(
          D,
          "class",
          (T = E[0]
            ? "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-lg flex flex-col transition-all duration-200 -translate-x-0 top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"
            : "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-none flex flex-col transition-all duration-200 translate-x-full top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"),
        ),
        attr(R, "id", "modal"),
        attr(
          R,
          "class",
          (B = E[5]
            ? "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-lg flex flex-col transition-all duration-200 -translate-x-0 top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"
            : "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-none flex flex-col transition-all duration-200 translate-x-full top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"),
        ),
        attr(L, "class", "text-sm font-merriweather p-2 rounded-md border border-Light-Blue text-Grey mb-3"),
        attr(X, "class", "text-4xl font-bold"),
        attr(Y, "class", "font-merriweather font-bold text-Grey"),
        attr(F, "class", "flex flex-col justify-center items-center space-y-4 text-center max-w-[656px]"),
        attr(te, "id", "file"),
        attr(te, "type", "file"),
        attr(te, "aria-hidden", "true"),
        attr(te, "placeholder", "Upload an image"),
        attr(te, "class", "hidden"),
        attr(
          J,
          "class",
          "cursor-pointer font-calistoga bg-Medium-Blue h-full w-full flex flex-col justify-center items-center border border-dashed border-Light-Blue rounded-md",
        ),
        attr(J, "for", "file"),
        src_url_equal(re.src, (ie = addImageIcon)) || attr(re, "src", ie),
        attr(re, "alt", "Add file"),
        attr(re, "height", "24"),
        attr(re, "width", "24"),
        attr(
          ne,
          "class",
          "absolute top-1/2 left-1/2 -translate-x-1/2 sm:space-x-2 space-x-0 space-y-2 sm:space-y-0 flex flex-col sm:flex-row justify-center items-center -translate-y-1/2 text-Grey pointer-events-none",
        ),
        src_url_equal(fe.src, (ke = snowyDirectionIllustrationPixelArt)) || attr(fe, "src", ke),
        attr(fe, "class", "absolute -top-[40px] right-2"),
        attr(fe, "height", "48"),
        attr(fe, "width", "48"),
        attr(fe, "alt", "Snowy direction!"),
        attr(
          ee,
          "class",
          "flex text-center relative flex-col justify-center items-center mt-14 w-full max-w-[656px] h-60",
        ),
        src_url_equal(xe.src, (pe = E[2] ? E[2] : sampleImage)) || attr(xe, "src", pe),
        attr(xe, "alt", "Uploaded"),
        attr(xe, "class", "h-auto sm:w-[320px] w-full rounded-md"),
        attr(xe, "height", "24"),
        attr(xe, "width", "24"),
        attr(ue, "class", "relative rounded-md overflow-hidden"),
        attr(
          Se,
          "class",
          "flex sm:flex-row flex-col space-y-6 sm:space-y-0 justify-center items-center sm:space-x-4 space-x-0 w-full",
        ),
        attr(Oe, "data-splitbee-event", "Click download button"),
        (Oe.disabled = E[3]),
        attr(
          Oe,
          "class",
          "shadow-[0px_4px_0px_rgba(167,26,1,1)] w-full disabled:cursor-not-allowed hover:bg-[#EC5B41] active:shadow-[0px_0px_0px_rgba(167,26,1,1)] active:translate-y-1 transition-all duration-200 flex flex-col justify-center items-center px-6 py-3 z-10 bg-Orange rounded-md",
        ),
        attr(De, "class", "flex sm:max-w-xs flex-col justify-center items-start space-y-3 mt-10 w-full"),
        attr(Ee, "class", "flex flex-col justify-center items-center mt-10"),
        attr(
          O,
          "class",
          "flex flex-col justify-center items-center px-4 mb-20 mt-8 sm:mt-16 font-calistoga text-Grey-White",
        );
    },
    m(de, Le) {
      Re && Re.m(de, Le),
        insert_hydration(de, _, Le),
        Me && Me.m(de, Le),
        insert_hydration(de, A, Le),
        Te && Te.m(de, Le),
        insert_hydration(de, I, Le),
        insert_hydration(de, D, Le),
        he && he.m(D, null),
        insert_hydration(de, C, Le),
        insert_hydration(de, R, Le),
        Pe && Pe.m(R, null),
        insert_hydration(de, P, Le),
        insert_hydration(de, O, Le),
        append_hydration(O, F),
        append_hydration(F, L),
        append_hydration(L, U),
        append_hydration(U, z);
      for (let Ye = 0; Ye < $e.length; Ye += 1) $e[Ye].m(U, null);
      append_hydration(F, V),
        append_hydration(F, X),
        append_hydration(X, G),
        append_hydration(F, Z),
        append_hydration(F, Y),
        append_hydration(Y, q),
        append_hydration(O, W),
        append_hydration(O, ee),
        append_hydration(ee, te),
        append_hydration(ee, Q),
        append_hydration(ee, J),
        append_hydration(ee, K),
        append_hydration(ee, ne),
        append_hydration(ne, re),
        append_hydration(ne, se),
        append_hydration(ne, oe),
        append_hydration(oe, _e),
        append_hydration(ee, ve),
        append_hydration(ee, fe),
        append_hydration(O, me),
        append_hydration(O, Ee),
        append_hydration(Ee, Se),
        append_hydration(Se, ue),
        append_hydration(ue, xe),
        append_hydration(Se, we),
        be && be.m(Se, null),
        append_hydration(Ee, Ne),
        qe && qe.m(Ee, null),
        append_hydration(Ee, Ce),
        append_hydration(Ee, De),
        He && He.m(De, null),
        append_hydration(De, Ue),
        append_hydration(De, Oe),
        Xe.m(Oe, null),
        append_hydration(Ee, ge),
        Be && Be.m(Ee, null),
        (Ke = !0),
        Ie ||
          ((ye = [
            listen(window, "keydown", E[25]),
            listen(te, "change", E[21]),
            listen(ee, "dragleave", prevent_default(handleDragLeave)),
            listen(ee, "drop", stop_propagation(prevent_default(E[27]))),
            listen(ee, "dragenter", prevent_default(handleDragEnter)),
            listen(ee, "dragover", prevent_default(dragover_handler)),
            listen(Oe, "click", E[22]),
          ]),
          (Ie = !0));
    },
    p(de, Le) {
      if (
        (de[6]
          ? Re
            ? (Re.p(de, Le), Le[0] & 64 && transition_in(Re, 1))
            : ((Re = create_if_block_18(de)), Re.c(), transition_in(Re, 1), Re.m(_.parentNode, _))
          : Re &&
            (group_outros(),
            transition_out(Re, 1, 1, () => {
              Re = null;
            }),
            check_outros()),
        de[7]
          ? Me
            ? (Me.p(de, Le), Le[0] & 128 && transition_in(Me, 1))
            : ((Me = create_if_block_17(de)), Me.c(), transition_in(Me, 1), Me.m(A.parentNode, A))
          : Me &&
            (group_outros(),
            transition_out(Me, 1, 1, () => {
              Me = null;
            }),
            check_outros()),
        de[8]
          ? Te
            ? (Te.p(de, Le), Le[0] & 256 && transition_in(Te, 1))
            : ((Te = create_if_block_16(de)), Te.c(), transition_in(Te, 1), Te.m(I.parentNode, I))
          : Te &&
            (group_outros(),
            transition_out(Te, 1, 1, () => {
              Te = null;
            }),
            check_outros()),
        de[0]
          ? he
            ? (he.p(de, Le), Le[0] & 1 && transition_in(he, 1))
            : ((he = create_if_block_15(de)), he.c(), transition_in(he, 1), he.m(D, null))
          : he &&
            (group_outros(),
            transition_out(he, 1, 1, () => {
              he = null;
            }),
            check_outros()),
        (!Ke ||
          (Le[0] & 1 &&
            T !==
              (T = de[0]
                ? "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-lg flex flex-col transition-all duration-200 -translate-x-0 top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"
                : "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-none flex flex-col transition-all duration-200 translate-x-full top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"))) &&
          attr(D, "class", T),
        de[5]
          ? Pe
            ? (Pe.p(de, Le), Le[0] & 32 && transition_in(Pe, 1))
            : ((Pe = create_if_block_14(de)), Pe.c(), transition_in(Pe, 1), Pe.m(R, null))
          : Pe &&
            (group_outros(),
            transition_out(Pe, 1, 1, () => {
              Pe = null;
            }),
            check_outros()),
        (!Ke ||
          (Le[0] & 32 &&
            B !==
              (B = de[5]
                ? "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-lg flex flex-col transition-all duration-200 -translate-x-0 top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"
                : "fixed h-screen w-screen sm:w-auto overflow-y-scroll z-50 p-6 shadow-none flex flex-col transition-all duration-200 translate-x-full top-0 right-0 bg-Medium-Blue sm:border-l sm:border-Light-Blue text-Grey-White font-calistoga"))) &&
          attr(R, "class", B),
        Le[0] & 1048576)
      ) {
        Ge = de[20];
        let Ye;
        for (Ye = 0; Ye < Ge.length; Ye += 1) {
          const Qe = get_each_context_1(de, Ge, Ye);
          $e[Ye] ? $e[Ye].p(Qe, Le) : (($e[Ye] = create_each_block_1(Qe)), $e[Ye].c(), $e[Ye].m(U, null));
        }
        for (; Ye < $e.length; Ye += 1) $e[Ye].d(1);
        $e.length = Ge.length;
      }
      (!Ke || (Le[0] & 4 && !src_url_equal(xe.src, (pe = de[2] ? de[2] : sampleImage)))) && attr(xe, "src", pe),
        de[4] || !de[2]
          ? be
            ? (be.p(de, Le), Le[0] & 20 && transition_in(be, 1))
            : ((be = create_if_block_12(de)), be.c(), transition_in(be, 1), be.m(Se, null))
          : be &&
            (group_outros(),
            transition_out(be, 1, 1, () => {
              be = null;
            }),
            check_outros()),
        de[4]
          ? qe
            ? (qe.p(de, Le), Le[0] & 16 && transition_in(qe, 1))
            : ((qe = create_if_block_3(de)), qe.c(), transition_in(qe, 1), qe.m(Ee, Ce))
          : qe &&
            (group_outros(),
            transition_out(qe, 1, 1, () => {
              qe = null;
            }),
            check_outros()),
        de[4]
          ? He
            ? (He.p(de, Le), Le[0] & 16 && transition_in(He, 1))
            : ((He = create_if_block_2(de)), He.c(), transition_in(He, 1), He.m(De, Ue))
          : He &&
            (group_outros(),
            transition_out(He, 1, 1, () => {
              He = null;
            }),
            check_outros()),
        je === (je = ze(de)) && Xe ? Xe.p(de, Le) : (Xe.d(1), (Xe = je(de)), Xe && (Xe.c(), Xe.m(Oe, null))),
        (!Ke || Le[0] & 8) && (Oe.disabled = de[3]),
        de[4] ? (Be ? Be.p(de, Le) : ((Be = create_if_block()), Be.c(), Be.m(Ee, null))) : Be && (Be.d(1), (Be = null));
    },
    i(de) {
      Ke ||
        (transition_in(Re),
        transition_in(Me),
        transition_in(Te),
        transition_in(he),
        transition_in(Pe),
        transition_in(be),
        transition_in(qe),
        transition_in(He),
        (Ke = !0));
    },
    o(de) {
      transition_out(Re),
        transition_out(Me),
        transition_out(Te),
        transition_out(he),
        transition_out(Pe),
        transition_out(be),
        transition_out(qe),
        transition_out(He),
        (Ke = !1);
    },
    d(de) {
      Re && Re.d(de),
        de && detach(_),
        Me && Me.d(de),
        de && detach(A),
        Te && Te.d(de),
        de && detach(I),
        de && detach(D),
        he && he.d(),
        de && detach(C),
        de && detach(R),
        Pe && Pe.d(),
        de && detach(P),
        de && detach(O),
        destroy_each($e, de),
        be && be.d(),
        qe && qe.d(),
        He && He.d(),
        Xe.d(),
        Be && Be.d(),
        (Ie = !1),
        run_all(ye);
    },
  };
}
const redimConstant = 512;
async function webpToPngBase64(E) {
  return new Promise((_, A) => {
    const I = document.createElement("img");
    I.src = E;
    const D = document.createElement("canvas"),
      T = D.getContext("2d");
    I.onload = function () {
      (D.width = I.width), (D.height = I.height), T == null || T.drawImage(I, 0, 0);
      const C = D.toDataURL("image/png");
      _(C);
    };
  });
}
function computeRBGAColor(E) {
  return `background-color: rgba(${E[0]},${E[1]},${E[2]},1)`;
}
function scrollOnTop() {
  const E = document.getElementById("modal");
  E && (E.scrollTop = 0);
}
function handleDragLeave(E) {
  E.target.classList.remove(
    "cursor-pointer",
    "font-calistoga",
    "bg-[#251849]",
    "h-full",
    "w-full",
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "border",
    "border-dashed",
    "border-Light-Blue",
    "rounded-md",
  ),
    E.target.classList.add(
      "cursor-pointer",
      "font-calistoga",
      "bg-Medium-Blue",
      "h-full",
      "w-full",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "border",
      "border-dashed",
      "border-Light-Blue",
      "rounded-md",
    );
}
function handleDragEnter(E) {
  E.target.classList.remove(
    "cursor-pointer",
    "font-calistoga",
    "bg-Medium-Blue",
    "h-full",
    "w-full",
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    "border",
    "border-dashed",
    "border-Light-Blue",
    "rounded-md",
  ),
    E.target.classList.add(
      "cursor-pointer",
      "font-calistoga",
      "bg-[#251849]",
      "h-full",
      "w-full",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "border",
      "border-dashed",
      "border-Light-Blue",
      "rounded-md",
    );
}
const keypress_handler = () => {},
  keypress_handler_1 = () => {},
  keypress_handler_2 = () => {},
  dragover_handler = () => {},
  keydown_handler = () => {},
  keypress_handler_3 = () => {},
  keydown_handler_1 = () => {},
  keydown_handler_2 = () => {};
function instance(E, _, A) {
  let I, D, T, C, R;
  component_subscribe(E, colorPalette, (Fe) => A(18, (I = Fe))),
    component_subscribe(E, userProfile, (Fe) => A(57, (D = Fe))),
    component_subscribe(E, defaultPalettes, (Fe) => A(58, (T = Fe))),
    component_subscribe(E, page, (Fe) => A(28, (C = Fe))),
    component_subscribe(E, currentColorPick, (Fe) => A(19, (R = Fe)));
  let B,
    P = !1,
    O,
    F = !1,
    L = !1,
    U = !1,
    z = !1,
    V = !1,
    X,
    G,
    Z;
  const Y = JSON.parse(JSON.stringify(T[4]));
  let q = !1,
    W = !1,
    ee = !1,
    te = !1,
    Q,
    J = !0,
    K = !1,
    ne = ["b", "a", "c", "k", "g", "r", "o", "u", "n", "d"],
    re = [],
    ie;
  onMount(() => {
    set_store_value(colorPalette, (I = Y), I), oe(), se();
  });
  function se() {
    for (let Fe = 0; Fe < 6; Fe++)
      for (let We = 0; We < 6; We++) {
        let et = document.createElement("div");
        et.classList.add((We + Fe) % 2 ? "bg-[#483E61]" : "bg-[#3A3053]"), ie.appendChild(et);
      }
  }
  function oe() {
    (re = ne.map((Fe, We) => `.char-${We}`)),
      re.forEach((Fe) => {
        const We = document.querySelector(Fe),
          tt = T[7].filter((ot) => ot[0] > 100 && ot[1] > 100 && ot[2] > 100),
          it = tt[Math.floor(Math.random() * tt.length)],
          nt = it[0],
          st = it[1],
          ht = it[2];
        We.style.color = `rgb(${nt}, ${st}, ${ht})`;
      }),
      anime({
        targets: re,
        translateY: [
          { value: -5, duration: 400 },
          { value: 2, duration: 400 },
          { value: 0, duration: 400 },
        ],
        rotate: [
          { value: -10, duration: 600 },
          { value: 7, duration: 600 },
          { value: 0, duration: 600 },
        ],
        delay: anime.stagger(200),
        loop: !0,
        easing: "easeInOutSine",
      });
  }
  function _e(Fe) {
    const et = Fe.target.files[0];
    Ue(et);
  }
  async function ve() {
    O ? await Se(O, `${Z}-pixelicious.png`) : await Se(samplePixelArt, `${Z}-pixelicious.png`);
  }
  async function fe(Fe) {
    try {
      const { user: We } = Fe,
        {
          data: et,
          error: tt,
          status: it,
        } = await supabaseClient
          .from("profiles")
          .select("username, is_premium, free_bg_removals, bg_removals, stripe_customer_id")
          .eq("id", We.id)
          .single();
      if (
        (et && set_store_value(userProfile, (D = { freeBgRemovals: et.free_bg_removals, isPremium: et.is_premium }), D),
        tt && it !== 406)
      )
        throw tt;
    } catch (We) {
      We instanceof Error && alert(We.message);
    }
  }
  async function ke(Fe, We, et, tt, it) {
    if (!B) {
      toast.error("Please upload an image 👺", {
        style:
          "border: 1px solid #483E66; font-size: 14px; padding: 16px; color: #F9F9FB; background-color: #1F143D; border-radius: 16px; font-family: 'merriweather', sans-serif;",
      });
      return;
    }
    if (tt) {
      A(7, (z = !0));
      return;
    }
    A(3, (P = !0));
    try {
      Fe = (await Image.load(Fe)).resize({ width: redimConstant }).toDataURL();
      const ot = await fetch("/api/computeImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: Fe,
          gridSize: G,
          colorPalette: q ? it : void 0,
          removeNoise: et,
          removeBackground: tt,
        }),
      });
      if (ot.status === 401) {
        const mt = await ot.json();
        throw new Error(mt.error);
      }
      if (ot.status === 400) {
        const mt = await ot.json();
        throw (console.log(mt), new Error("Server error: " + mt));
      }
      const { result: gt } = await ot.json();
      A(4, (O = gt)), tt && se();
    } catch (nt) {
      nt.message === "Non authorized without a login session"
        ? (me(), A(5, (L = !1)), A(0, (F = !1)))
        : nt.message === "Non authorized without a premium account"
          ? A(8, (V = !0))
          : nt.message === "Total usage limit reached"
            ? toast.error("Total usage limit reached this month, contact us for more usage", {
                style:
                  "border: 1px solid #483E66; font-size: 14px; padding: 16px; color: #F9F9FB; background-color: #1F143D; border-radius: 16px; font-family: 'calistoga', sans-serif;",
              })
            : toast.error("Server error :/", {
                style:
                  "border: 1px solid #483E66; font-size: 14px; padding: 16px; color: #F9F9FB; background-color: #1F143D; border-radius: 16px; font-family: 'calistoga', sans-serif;",
              });
    } finally {
      A(3, (P = !1));
    }
  }
  function me() {
    const Fe = document.getElementById("removeBackgroudSetting"),
      We = document.getElementById("loginMessage");
    Fe.scrollIntoView({ behavior: "smooth" }), Ee(We);
  }
  function Ee(Fe) {
    anime({
      targets: [Fe],
      translateX: [
        { value: -5, duration: 100 },
        { value: 5, duration: 100 },
        { value: -3, duration: 100 },
        { value: 3, duration: 100 },
        { value: 0, duration: 100 },
      ],
      easing: "easeInOutQuad",
    });
  }
  async function Se(Fe, We) {
    if (Q) {
      const it = (await Image.load(Fe)).resize({ width: redimConstant / X }).toDataURL(),
        nt = document.createElement("a");
      (nt.href = it), (nt.download = We), document.body.appendChild(nt), nt.click(), document.body.removeChild(nt);
    } else {
      const tt = await (await fetch(Fe)).blob(),
        it = URL.createObjectURL(tt),
        nt = document.createElement("a");
      (nt.href = it), (nt.download = We), document.body.appendChild(nt), nt.click(), document.body.removeChild(nt);
    }
  }
  async function ue(Fe) {
    const We = await Image.load(Fe),
      et = We.height,
      tt = We.width,
      it = et * tt;
    switch (!0) {
      case it <= 65536:
        A(9, (X = 2)), A(10, (G = 256));
        break;
      default:
        A(9, (X = 4)), A(10, (G = 128));
        break;
    }
  }
  async function xe(Fe) {
    let We = (await Image.load(Fe)).rgba8();
    const et = We.data;
    for (let tt = 0; tt < et.length; tt += 4)
      et[tt + 3] < 255 && ((et[tt] = 127), (et[tt + 1] = 127), (et[tt + 2] = 127), (et[tt + 3] = 255));
    return We.toDataURL();
  }
  function pe(Fe) {
    A(10, (G = Fe)), A(9, (X = redimConstant / G));
  }
  function we() {
    A(6, (U = !0));
  }
  function Ne(Fe) {
    Fe.key === "Escape" && (A(6, (U = !1)), A(7, (z = !1)));
  }
  async function Ce() {
    const Fe = await xe(B);
    q ? await ke(Fe, X, J, K, I) : await ke(Fe, X, J, K, void 0);
  }
  function De(Fe) {
    var et;
    const We = (et = Fe.dataTransfer) == null ? void 0 : et.files[0];
    We && Ue(We),
      Fe.target.classList.remove(
        "cursor-pointer",
        "font-calistoga",
        "bg-[#251849]",
        "h-full",
        "w-full",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "border",
        "border-dashed",
        "border-Light-Blue",
        "rounded-md",
      ),
      Fe.target.classList.add(
        "cursor-pointer",
        "font-calistoga",
        "bg-Medium-Blue",
        "h-full",
        "w-full",
        "flex",
        "flex-col",
        "justify-center",
        "items-center",
        "border",
        "border-dashed",
        "border-Light-Blue",
        "rounded-md",
      );
  }
  function Ue(Fe) {
    if (Fe.type !== "image/png" && Fe.type !== "image/webp" && Fe.type !== "image/jpeg") {
      toast.error("Please upload a PNG, WEBP, or JPG image 👺", {
        style:
          "border: 1px solid #483E66; padding: 16px; color: #F9F9FB; background-color: #1F143D; border-radius: 16px; font-family: 'merriweather', sans-serif;",
      });
      return;
    }
    A(16, (J = !0)), A(1, (K = !1)), A(11, (q = !0));
    const We = new FileReader();
    (We.onload = async (tt) => {
      var nt;
      const it = (nt = tt.target) == null ? void 0 : nt.result;
      fetch(it)
        .then(async (st) => {
          if ((A(4, (O = "")), st.headers.get("Content-Type") === "image/webp")) {
            A(2, (B = await webpToPngBase64(it))), await ue(B);
            const ht = await xe(B);
            await ke(ht, X, J, K, Y);
          } else {
            A(2, (B = it)), await ue(B);
            const ht = await xe(B);
            await ke(ht, X, J, K, Y);
          }
        })
        .catch((st) => {
          console.log(st);
        }),
        A(2, (B = it));
    }),
      We.readAsDataURL(Fe);
    const et = Fe.name;
    Z = et.substring(0, et.lastIndexOf("."));
  }
  const Oe = () => A(6, (U = !1)),
    ge = () => {
      A(6, (U = !1));
    },
    Ke = () => A(7, (z = !1)),
    Ie = () => {
      A(7, (z = !1));
    },
    ye = () => A(8, (V = !1)),
    Re = () => {
      A(8, (V = !1));
    },
    Me = () => {
      A(0, (F = !1));
    },
    Te = () => {
      A(11, (q = !0));
    },
    he = () => {
      A(5, (L = !1));
    };
  function Pe(Fe) {
    binding_callbacks[Fe ? "unshift" : "push"](() => {
      (ie = Fe), A(17, ie);
    });
  }
  function Ge(Fe) {
    (K = Fe), A(1, K);
  }
  const $e = () => {
      A(12, (W = !W));
    },
    be = () => {
      A(5, (L = !1)), F ? A(0, (F = !1)) : A(0, (F = !0));
    },
    qe = () => {
      A(5, (L = !1)), F ? A(0, (F = !1)) : A(0, (F = !0));
    },
    He = () => {
      A(0, (F = !1)), L ? A(5, (L = !1)) : A(5, (L = !0));
    },
    ze = () => {
      set_store_value(colorPalette, (I = []), I), A(11, (q = !1));
    };
  function je() {
    (q = this.checked), A(11, q);
  }
  const Xe = () => {
      A(13, (ee = !ee));
    },
    Be = async () => {
      await pe(32);
    },
    de = async () => {
      await pe(64);
    },
    Le = async () => {
      await pe(128);
    },
    Ye = async () => {
      await pe(256);
    },
    Qe = () => {
      A(14, (te = !te));
    };
  function Je(Fe) {
    (J = Fe), A(16, J);
  }
  function rt(Fe) {
    (Q = Fe), A(15, Q);
  }
  return (
    (E.$$.update = () => {
      E.$$.dirty[0] & 1 && F && scrollOnTop(),
        E.$$.dirty[0] & 268435456 && C.data.session && fe(C.data.session),
        E.$$.dirty[0] & 268435458 && K && C.data.session;
    }),
    [
      F,
      K,
      B,
      P,
      O,
      L,
      U,
      z,
      V,
      X,
      G,
      q,
      W,
      ee,
      te,
      Q,
      J,
      ie,
      I,
      R,
      ne,
      _e,
      ve,
      pe,
      we,
      Ne,
      Ce,
      De,
      C,
      Oe,
      ge,
      Ke,
      Ie,
      ye,
      Re,
      Me,
      Te,
      he,
      Pe,
      Ge,
      $e,
      be,
      qe,
      He,
      ze,
      je,
      Xe,
      Be,
      de,
      Le,
      Ye,
      Qe,
      Je,
      rt,
    ]
  );
}
class Page extends SvelteComponent {
  constructor(_) {
    super(), init(this, _, instance, create_fragment, safe_not_equal, {}, null, [-1, -1, -1]);
  }
}
export { Page as default };
