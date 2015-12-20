'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function valuefy(value) {
	if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
		return typeof value === 'string' ? '"' + value + '"' : value;
	}

	var values = [];

	if (Array.isArray(value)) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var v = _step.value;

				values.push(valuefy(v));
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		values = '[' + values.join(',') + ']';
	} else {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = Object.entries(value)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _step2$value = _slicedToArray(_step2.value, 2);

				var key = _step2$value[0];
				var v = _step2$value[1];

				values.push('"' + key + '":' + valuefy(v));
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		values = '{' + values.join(',') + '}';
	}

	return values;
}

function serialize(target) {
	if (!target || (typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
		throw new TypeError('Invalid type of target');
	}

	var values = [];

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = Object.entries(target)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var _step3$value = _slicedToArray(_step3.value, 2);

			var key = _step3$value[0];
			var value = _step3$value[1];

			values.push(key + '=' + valuefy(value));
		}
	} catch (err) {
		_didIteratorError3 = true;
		_iteratorError3 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion3 && _iterator3.return) {
				_iterator3.return();
			}
		} finally {
			if (_didIteratorError3) {
				throw _iteratorError3;
			}
		}
	}

	return values;
}

function extract(t, outter, onlyContent) {
	var start = onlyContent ? 1 : 0;
	var pad = onlyContent ? 0 : 1;
	return t.slice(start, t.lastIndexOf(outter) + pad);
}

function objectify(v) {
	if (v[0] === '{') {
		return JSON.parse(extract(v, '}'));
	} else if (v[0] === '[') {
		var set = [];
		var es = extract(v, ']', true);

		if (es[0] === '[' || es[0] === '{') {
			set.push(objectify(es));
		} else {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {
				for (var _iterator4 = es.split(',')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var e = _step4.value;

					set.push(objectify(e));
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}
		}

		return set;
	} else if (v[0] === '"') {
		v = extract(v, '"', true);
	}

	return v;
}

function deserialize(values) {
	if (!values) {
		throw new TypeError('Invalid type of values');
	} else if (!Array.isArray(values)) {
		values = [values];
	}

	var target = {};

	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var v = _step5.value;

			var fieldValue = v.split('=', 2);
			target[fieldValue[0]] = objectify(fieldValue[1]);
		}
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}

	return target;
}

module.exports = {
	pairify: serialize,
	parse: deserialize
};