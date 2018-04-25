'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = exports.TextBox = exports.Table = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _recompose = require('recompose');

var _reactRouterDom = require('react-router-dom');

var _ramda = require('ramda');

var _ = require('.');

var _selectors = require('./selectors');

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _Table = function _Table(_ref) {
  var data = _ref.data,
      name = _ref.name,
      filter = _ref.filter,
      setSort = _ref.setSort,
      children = _ref.children,
      history = _ref.history;

  var l = data || [];
  var keys = l.length > 0 ? Object.keys(l[0]) : [];
  //const sort = (filter[name] || {}).sort;
  //const sortby = sort && sort[0];
  //const sortDir = sort && sort[1];

  return _react2.default.createElement(
    'table',
    { 'class': 'ui celled striped table' },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        keys.map(function (k, i) {
          return _react2.default.createElement(
            'th',
            { key: 'th' + i
            },
            k
          );
        })
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      l.map(function (o, i) {
        return _react2.default.createElement(
          'tr',
          { key: 'tr' + i, 'class': 'cp', onClick: function onClick() {
              return history.push('/' + name + '/' + o.id);
            } },
          keys.map(function (k) {
            return col(i, k, o, children);
          })
        );
      })
    )
  );
};

var Table = exports.Table = (0, _recompose.compose)((0, _reactRedux.connect)(_selectors.filterSelector, {
  setSort: function setSort(name, prop, dir) {
    return {
      type: actionTypes.Set_Sort,
      name: name, prop: prop, dir: dir
    };
  }
}), _reactRouterDom.withRouter)(_Table);

var col = function col(idx, key, obj, children) {
  if (!(0, _ramda.is)(Array, children)) children = children ? [children] : [];
  var c = (0, _ramda.find)(function (x) {
    return x.key === key;
  }, children) || { props: {} };
  var p = c.props;

  var v = obj[key];
  var cls = '';

  return _react2.default.createElement(
    'td',
    { key: 'td' + (key + idx), 'class': cls },
    v
  );
};

var prop = function prop(_prop) {
  var val = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return function (key, children) {
    var child = (0, _ramda.find)(function (x) {
      return x.key === key;
    }, children);
    return child && child.props[_prop] || val;
  };
};

var title = function title(key, children) {
  return prop('title', (0, _.toTitleCase)(key))(key, children);
};

// class={sortby === k ? (sortDir === 1 ? '_asc' : '_desc') : ''}
// onClick={() => setSort(name, k, sortDir === 1 ? 2 : 1)}

var setForm = function setForm(n, v, i) {
  return { type: 'setForm', path: 'form.' + n, payload: v };
};

var withInput = function withInput(isCheck) {
  return function (comp) {
    return function (_ref2) {
      var name = _ref2.name,
          index = _ref2.index,
          form = _ref2.form,
          setForm = _ref2.setForm,
          args = _objectWithoutProperties(_ref2, ['name', 'index', 'form', 'setForm']);

      var _name$split = name.split('.'),
          _name$split2 = _slicedToArray(_name$split, 2),
          fn = _name$split2[0],
          n = _name$split2[1];

      var value = form && form[fn] && form[fn][n];
      if (!(0, _ramda.isNil)(index) && (0, _ramda.is)(Array, value)) value = value[index];
      var onChange = function onChange(e, i, v) {
        return setForm(name, getElemValue(e, i, v), index);
      };
      return comp(_extends({}, args, { id: fn + '_' + n, name: name, value: value, onChange: onChange, label: n }));
    };
  };
};

var getElemValue = function getElemValue(e, i, v) {
  var t = i || e.target;
  var val = t.value;
  if (t.type === 'checkbox') val = t.checked;
  if (typeof val === 'undefined') val = v;
  return val;
};

var withForm = (0, _reactRedux.connect)(function (s) {
  return { form: s.form };
}, { setForm: setForm });

var withAll = (0, _recompose.compose)(withForm, withInput(false));
var withCheck = (0, _recompose.compose)(withForm, withInput(true));

var textBox = function textBox(p) {
  return _react2.default.createElement(
    'div',
    { 'class': 'pv8' },
    _react2.default.createElement(_semanticUiReact.Input, p)
  );
};

var select = function select(p) {
  return _react2.default.createElement(
    'div',
    { 'class': 'pv8' },
    _react2.default.createElement(_semanticUiReact.Dropdown, _extends({ selection: true }, p))
  );
};

var TextBox = exports.TextBox = withAll(textBox);
var Select = exports.Select = withAll(select);