import AnimationPlayer from 'art-kit/src/media/AnimationPlayer';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var _$1 = require('lodash');
var $ = require('jquery');
var Events = require('backbone-events-standalone');

var Base = function () {
	function Base(options) {
		classCallCheck(this, Base);

		this.options = Base.merge({
			// ---------------------------------------------------
			// Event Listeners

			events: [],

			// ---------------------------------------------------
			// Function Scope Binding

			bindFunctions: ['getLocalObject', 'makeBoundFunctions', 'delegateEvents', 'undelegateEvents']
		}, options);
		_$1.extend(this, this.options);
		this.makeBoundFunctions(this.options.bindFunctions, this);
	}

	// ---------------------------------------------------
	// Bind functions named in the 'bindFunctions' hash


	createClass(Base, [{
		key: 'makeBoundFunctions',
		value: function makeBoundFunctions(funcNames, context) {
			context = context || this;
			_$1.each(funcNames, function (funcName) {
				if (!context[funcName]) {
					console.error('You tried to bind "' + funcName + '", but it doesn\'t exist on ', context);
				}
				context[funcName] = context[funcName].bind(context);
			});
			return context;
		}

		// ---------------------------------------------------

	}, {
		key: 'delegateEvents',
		value: function delegateEvents() {
			var _this = this;

			_$1(this.options.events).each(function (e) {

				var handler = _this.getLocalObject(e.handler);
				var target = _this.getLocalObject(e.target);

				// use jquery for ui events
				if (target instanceof $) {
					target.on(e.eventName, handler);
				} else {
					// use backbone for all other events
					_this.listenTo(target, e.eventName, handler);
				}
			});
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'undelegateEvents',
		value: function undelegateEvents() {
			var _this2 = this;

			_$1(this.options.events).each(function (e) {
				// check to see if event has been delegated
				if (typeof e.target === 'string') return;
				var target = _this2.getLocalObject(e.target);
				if (target instanceof $) {
					target.off(e.eventName);
				} else {
					_this2.stopListening(target, e.eventName);
				}
			});
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'getLocalObject',
		value: function getLocalObject(name) {
			if (name === 'this') {
				return this;
			} else if (typeof name === 'string') {
				// try to resolve the name as an object on this
				var target = this[name];
				// var target = _.get( this, name );

				// if there is no object on this with that name, try to find it as selector in the a local jquery object
				if (!target && this.$) target = this.$(name);

				// consider it a global selector and use jquery to find it
				if ((!target || target instanceof $) && target.length === 0 && this.$) {
					target = $(name);
				}

				// Shaka. When the walls fell
				if (!target || target instanceof $ && target.length === 0) {
					console.warn('Peak was unable to delegate event to ' + name + ' on ' + this.name);
				}

				return target;
			} else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
				if (typeof name.on === 'function') {
					target = name;
				} else {
					// last ditch effort to catch window/document events;
					target = $(name);
				}
				return target;
			}

			return name;
		}

		// ---------------------------------------------------

	}], [{
		key: 'merge',
		value: function merge() {
			for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
				opts[_key] = arguments[_key];
			}

			opts.push(Base.mergeRules);
			return _$1.mergeWith.apply(this, opts);
		}

		// ---------------------------------------------------

	}, {
		key: 'mergeRules',
		value: function mergeRules(objValue, srcValue) {
			if (_$1.isArray(objValue)) {
				return objValue.concat(srcValue);
			} else if (typeof srcValue === 'string' || typeof srcValue === 'function') {
				return srcValue;
			} else if (objValue && (typeof objValue === 'undefined' ? 'undefined' : _typeof(objValue)) === 'object' && (typeof srcValue === 'undefined' ? 'undefined' : _typeof(srcValue)) === 'object') {
				return _$1.extend({}, objValue, srcValue);
			}
			return srcValue;
		}
	}]);
	return Base;
}();

Base.prototype.templates = [];
Events.mixin(Base.prototype);



var Base$2 = Object.freeze({
	default: Base
});

var _$2 = require('lodash');
var _$ = require('jquery');
var Base$3 = require('../Base');

var View = function (_Base) {
	inherits(View, _Base);

	function View(options) {
		classCallCheck(this, View);

		// ---------------------------------------------------
		// Finish setup

		var _this = possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, Base$3.merge({
			// ---------------------------------------------------
			// Local Properties

			el: undefined,
			model: undefined,
			template: '',
			id: '',
			tagname: 'div',
			classname: '',
			keep: false,
			insert: true,
			domUpdates: [],
			// hasRendered: false,
			loadPromise: undefined,
			parentView: undefined,
			hasRendered: false,

			// ---------------------------------------------------
			// Child Views

			views: {
				/*
    	'childView0': new ChildView0({
    		el: '#child-id-0',
    		model: this.model.widgets.at(0)
    	}),
    	'childView1': new ChildView1({
    		el: '#child-id-1',
    		model: this.model.widgets.at(1)
    	}), ...
    */
			},

			// ---------------------------------------------------
			// Event Listeners

			events: [{
				target: 'APP',
				eventName: 'resize',
				handler: 'onResize'
			}],

			// ---------------------------------------------------
			// Data Binding

			dataBindings: [
				/*
    {
    	element: '.selector',
    	attributeName: 'attr',
    	model: 'model',
    	elementChangeEventName: 'change',
    	mode: 'get' || 'send'
    }
    */
			],

			// ---------------------------------------------------
			// Function Scope Binding

			bindFunctions: ['bindData', 'unbindData', 'delegateEvents', 'createDataBinding', 'destroy', 'undelegateEvents', 'updateDOM', 'render', 'setupElement', 'onResize', 'beforeRender', 'afterRender']
		}, options)));

		_this.parseName(_this.options);
		_this.dates = [];
		return _this;
	}

	// ---------------------------------------------------

	createClass(View, [{
		key: 'parseName',


		// ---------------------------------------------------

		value: function parseName(options) {
			if (options.name) {
				if (!options.el) this.el = options.el = '.' + options.name;
			}
			return options;
		}

		// ---------------------------------------------------

	}, {
		key: 'getView',
		value: function getView(name) {
			return _$2.find(this.views, {
				name: name
			});
		}

		// ---------------------------------------------------

	}, {
		key: 'onResize',
		value: function onResize() {}
		// override me


		// ---------------------------------------------------

	}, {
		key: 'beforeRender',
		value: function beforeRender() {}
		// override me

		// ---------------------------------------------------

	}, {
		key: 'afterRender',
		value: function afterRender() {}
		// override me


		// ---------------------------------------------------

	}, {
		key: 'setupElement',
		value: function setupElement() {
			// use a template if defined
			// only render it if it hasn't been rendered before && it's not marked for keeping
			if (!this.hasRendered || !this.keep) {

				if (this.el) {
					// try to find it locally
					this.el = this.parentView.$(this.el).first()[0] ||
					// try to find it globally
					_$(this.el).first()[0] ||
					// create one
					_$('<' + this.tagname + ' class=\'' + this.classname + '\' id=\'' + this.id + '\' />').first()[0];
					this.$el = _$(this.el);
				}

				if (this.template) {
					var $prev = void 0,
					    $next = void 0;
					if (this.$el && this.$el.parent()) {
						$prev = this.$el.prev();
						$next = this.$el.next();
						this.$el.remove();
						this.insert = true;
					}

					var templateFn = View.getTemplate(this.template);
					if (!templateFn) {
						console.warn('PEAK: Could not find template named ' + this.template + '.');
					}
					var html = templateFn(this.serialize());
					this.$el = _$(html);
					// if it was already in the view, attempt to put the new element where the old one was
					if (this.insert) {
						if ($prev && $prev.length) {
							$prev.after(this.$el);
						} else if ($prev && $next.length) {
							$next.before(this.$el);
						} else {
							this.parentView.$el.append(this.$el);
						}
					}
				}
				// save the primary element
				this.el = this.$el[0];
				// setup helper find function
				this.$ = this.$el.find.bind(this.$el);
			}
			return this.$el;
		}

		// ---------------------------------------------------

	}, {
		key: 'render',
		value: function render(parentView) {
			var _this2 = this;

			this.parentView = parentView instanceof View ? parentView : this.parentView || window;
			this.undelegateEvents();
			this.unbindData();
			this.setupElement();
			this.beforeRender();
			this.trigger('beforeRender', this);

			// render child views
			_$2.each(this.views, function (v) {
				return v.render(_this2);
			});

			this.delegateEvents();
			this.bindData();
			this.afterRender();
			this.trigger('afterRender', this);
			this.onResize();
			this.hasRendered = true;
		}

		// ---------------------------------------------------
		// bind the value of an HTMLElement to a model or collection

	}, {
		key: 'createDataBinding',
		value: function createDataBinding(hash) {
			var attributeName = hash.attributeName;
			var element = hash.element;
			var model = hash.model;
			var elementChangeEventName = hash.elementChangeEventName || 'change';
			var mode = hash.mode;
			// TODO document get/setElementData
			var setElementData = hash.setElementData;
			var getElementData = hash.getElementData;

			// parse argument options
			var $element = this.getLocalObject(element);
			model = typeof model === 'string' ? this[model] : this.model || model;

			// hack to handle radio button groups
			var isRadio = $element.attr('type') === 'radio';
			// handle <input>s differently than regular elements
			var updateMethod = $element.is('input') ? 'val' : 'text';

			// set listeners
			if (mode !== 'send') this.listenTo(model, 'change:' + attributeName, updateElement) && updateElement.call(this, { value: model[attributeName], model: model });
			if (mode !== 'get') $element.on(elementChangeEventName, updateModel);

			// assign a destroy function for convenient destruction
			hash.unbindData = unbindData.bind(hash);

			return hash;

			function updateElement(event) {
				var _this3 = this;

				var val = event.value;
				var fn = setElementData ? function () {
					return _this3.getLocalObject(setElementData)(val, $element);
				} : function () {
					return $element[updateMethod]([val], $element);
				};
				this.domUpdates.push(fn);
				if (!this.domUpdateRequest) {
					this.domUpdateRequest = requestAnimationFrame(this.updateDOM);
				}
			}

			function updateModel(event) {
				var $activeEl = !isRadio ? $element : $element.filter(':checked');
				model[attributeName] = getElementData && getElementData($activeEl) || $activeEl.val();
			}

			function unbindData() {
				this.stopListening(model, 'change:' + attributeName, updateElement);
				$element.off(elementChangeEventName, updateModel);
				delete this.unbindData;
			}
		}

		// ---------------------------------------------------

	}, {
		key: 'bindData',
		value: function bindData() {
			_$2.each(this.dataBindings, this.createDataBinding);
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'unbindData',
		value: function unbindData() {
			_$2.each(this.dataBindings, function (hash) {
				return hash.unbindData && hash.unbindData();
			});
			return this;
		}

		// ---------------------------------------------------
		// batch DOM updates

	}, {
		key: 'updateDOM',
		value: function updateDOM() {
			this.domUpdateRequest = null;
			this.domUpdates.forEach(function (fn) {
				fn();
			});
			this.domUpdates = [];
		}

		// ---------------------------------------------------

	}, {
		key: 'delegateEvents',
		value: function delegateEvents() {
			// FIXME: this is a pass-through to translate old code from using selector to use target
			_$2(this.options.events).filter(function (e) {
				return e.selector;
			}).each(function (e) {
				e.target = e.selector;
			});
			get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'delegateEvents', this).call(this);
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'undelegateEvents',
		value: function undelegateEvents() {
			_$2(this.options.events).filter(function (e) {
				return e.selector;
			}).each(function (e) {
				e.target = e.selector;
			});
			get(View.prototype.__proto__ || Object.getPrototypeOf(View.prototype), 'undelegateEvents', this).call(this);
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'destroy',
		value: function destroy() {
			this.unbindData();
			this.undelegateEvents();
			this.stopListening();
			_$2.each(this.views, function (v) {
				return v.destroy();
			});
		}

		// ---------------------------------------------------

	}, {
		key: 'serialize',
		value: function serialize() {
			var model = this.model ? this.model.attributes : {};
			return _$2.extend({
				// "this.ENV" is a prototype property of all Base objects
				env: this.ENV
			}, model);
		}

		// ---------------------------------------------------

	}, {
		key: '$',
		value: function $(selector) {
			return this.$el ? this.$el.find(selector) : _$(selector);
		}

		// ---------------------------------------------------

	}], [{
		key: 'getTemplate',
		value: function getTemplate(name) {
			// TEMPLATES is a global object on window
			return name ? Base$3.prototype.TEMPLATES[name] : function () {
				return '';
			};
		}
	}, {
		key: 'mergeRules',
		value: function mergeRules(objValue, srcValue) {
			if (_$2.isArray(objValue)) {
				if (objValue.length && objValue[0] instanceof View) return objValue;
				return objValue.concat(srcValue);
			}
		}
	}]);
	return View;
}(Base$3);

module.exports = View;



var View$1 = Object.freeze({

});

var _$3 = require('lodash');
var View$2 = require('../View');
var THREE = require('three');

var ThreeView = function (_View) {
	inherits(ThreeView, _View);

	function ThreeView(options) {
		classCallCheck(this, ThreeView);
		return possibleConstructorReturn(this, (ThreeView.__proto__ || Object.getPrototypeOf(ThreeView)).call(this, ThreeView.merge({

			// ---------------------------------------------------
			// Class Properties

			name: 'three-holder',
			el: '.three-holder',

			// ---------------------------------------------------
			// Local Properties

			rendererOptions: undefined,
			scenes: undefined,

			// ---------------------------------------------------
			// Event Listeners

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: ['update', 'draw', 'setup', 'onResize']
		}, options)));
	}

	// ---------------------------------------------------
	// Setup Threejs
	// setup() is called by peak/js/pages/ThreejsPage.js :: setupThreeView()
	// which is called by peak/js/pages/ThreejsPage.js :: afterRender()


	createClass(ThreeView, [{
		key: 'setup',
		value: function setup() {
			var _this2 = this;

			// Renderer
			this.renderer = new THREE.WebGLRenderer({
				alpha: true
			});
			this.renderer.setClearColor(0x000000, 0);
			this.renderer.setSize(this.el.innerWidth, this.el.innerHeight);
			this.$el.append(this.renderer.domElement);

			// Setup Scenes
			this.scenes = _$3.mapValues(this.scenes, function (SceneClass, id) {
				return new SceneClass({
					el: _this2.el,
					renderer: _this2.renderer
				});
			});

			var sceneNames = _$3.keys(this.scenes);

			if (sceneNames.length) this.changeScene(sceneNames[0]);

			return this;
		}
	}, {
		key: 'changeScene',
		value: function changeScene(name) {
			var _this3 = this;

			// console.log( 'Three-View changeScene to:', name, this.activeScene ? `from: ${this.activeScene.name}` : '' );
			// TODO: fade out
			this.activeScene = this.scenes[name];
			var loadPromise = this.activeScene.setup({
				renderer: this.renderer
			});

			// TODO: Show Loader
			loadPromise.then(function () {
				// TODO: hide Loader
				_this3.onResize();
			});

			// TODO: fade up
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			var _this4 = this;

			this.width = this.$el.width();
			this.height = this.$el.height();
			this.halfWidth = this.width * 0.5;
			this.halfHeight = this.height * 0.5;

			_$3.each(this.scenes, function (s) {
				s.width = _this4.width;
				s.height = _this4.height;
				s.halfWidth = _this4.halfWidth;
				s.halfHeight = _this4.halfHeight;
			});
			if (this.renderer) this.renderer.setSize(this.width, this.height);
			if (this.activeScene) this.activeScene.onResize();
		}
	}, {
		key: 'update',
		value: function update(data) {
			data.time = Date.now();
			if (this.activeScene && this.activeScene.isLoaded) {
				this.activeScene.update(data);
			}
			this.trigger('update', data);
		}
	}, {
		key: 'draw',
		value: function draw() {
			var data = {
				time: Date.now()
			};
			if (this.activeScene && this.activeScene.isLoaded) {
				this.activeScene.render(data);
			}
			this.trigger('draw', data);
		}
	}, {
		key: 'serialize',
		value: function serialize() {
			return _$3.extend(get(ThreeView.prototype.__proto__ || Object.getPrototypeOf(ThreeView.prototype), 'serialize', this).call(this), {
				sceneNames: _$3.keys(this.scenes)
			});
		}
	}]);
	return ThreeView;
}(View$2);

module.exports = ThreeView;



var ThreeView$1 = Object.freeze({

});

var _$4 = require('lodash');
var $$1 = require('jquery');
var View$3 = require('../View');

var Page = function (_View) {
	inherits(Page, _View);

	function Page(options) {
		classCallCheck(this, Page);
		return possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, View$3.merge({

			// ---------------------------------------------------
			// Class Properties

			name: '',
			type: 'page',

			// ---------------------------------------------------
			// Local Properties

			// ---------------------------------------------------
			// Event Listeners

			events: [{
				target: 'this',
				eventName: 'transitionInComplete',
				handler: 'transitionInComplete'
			}, {
				target: 'this',
				eventName: 'transitionOutComplete',
				handler: 'transitionOutComplete'
			}],
			bindFunctions: ['fetch', 'onRoute', 'transitionIn', 'transitionOut', 'transitionInComplete', 'transitionOutComplete']
		}, options)));
	}

	// ---------------------------------------------------

	createClass(Page, [{
		key: 'loadAssets',
		value: function loadAssets() {
			var deferred = $$1.Deferred();
			// load stuff in here
			// resolve the deferred when load is complete
			deferred.resolve();
			return deferred.promise();
		}

		// ---------------------------------------------------

	}, {
		key: 'parseName',
		value: function parseName(options) {
			if (options.name) {
				if (!options.el) this.el = options.el = '#' + options.name;
			}
			return options;
		}

		// ---------------------------------------------------

	}, {
		key: 'fetch',
		value: function fetch(params, promise) {
			var _this2 = this;

			promise = promise || $$1.Deferred();

			var recallFetch = function recallFetch() {
				_this2.fetch(params, promise);
				return promise;
			};

			var fetchModel = function fetchModel() {
				console.log(_this2.name + ' fetching the model');
				_this2.loadPromise = _this2.model.fetch().done(recallFetch);
			};

			var renderView = function renderView() {
				console.log(_this2.name + ' render');
				_this2.render();
				recallFetch();
			};

			var loadAssets = function loadAssets() {
				console.log(_this2.name + ' waiting for load');
				_this2.trigger('loadStart', {
					type: _this2.type,
					id: _this2.route
				});

				_this2.loadAssets();
				_this2.loadPromise.then(recallFetch);
			};

			var finishRender = function finishRender() {
				// console.log( this );
				console.log(_this2.name + ' finished fetching view');
				if (_this2.loadPromise) {
					console.log(_this2.name, 'loadpromise state:', _this2.loadPromise.state());
				}
				_$4.defer(function () {
					promise.resolve();
				});
				_this2.trigger('fetchComplete', _this2);
				_this2.trigger('loadComplete', {
					type: 'page',
					id: _this2.name
				});
			};

			// first load the model if there is one
			// TODO Reenable loading the model if needed
			if (false && this.model && this.model.url) {
				fetchModel();
				// then render
			} else if (!this.hasRendered) {
				renderView();
				// then wait for the components to load
			} else if (this.loadPromise && this.loadPromise.state() === 'pending') {
				loadAssets();
				// then you're good to go
			} else {
				finishRender();
			}

			return promise;
		}
	}, {
		key: 'onRoute',
		value: function onRoute(route) {
			var _this3 = this;

			var prevRoute = route.prevRoute;

			var currentPage = this.page;
			var newPage = null;

			// console.log( this, route, prevRoute );

			// only change pages if new base-route is different from the last
			if (route.parts.length > 0 && route.parts[0] !== prevRoute.parts[0]) {

				// remove the old page
				$$1('html').removeClass(prevRoute.parts[0] + '-page');

				if (route) {
					$$1('html').addClass(route.parts[0] + '-page');

					// determine new page
					newPage = _$4.find(this.views, {
						name: route.parts[0]
					});
				}

				// if the route doesn't match any pages, do nothing
				if (!newPage) return;

				newPage.fetch(route).done(function () {
					_this3.trigger('loadEnd');

					if (currentPage) {
						currentPage.transitionOut(newPage);
					}

					var subRoute = _$4.cloneDeep(route);
					subRoute.parts.slice(1);
					subRoute.prevRoute.parts.slice(1);

					newPage.transitionIn(currentPage, subRoute);

					if (subRoute.parts.length > 0) {
						// this means it's a sub-route, recurse child pages
						newPage.onRoute(subRoute);
					}
				});

				this.page = newPage;
			} else if (route.parts.length === 0 && currentPage) {
				// currentPage.transitionOut();

			} else if (route.parts.length > 0 && currentPage) {
				// it's probably a sub-page
				// tell the current page to display the new info
				currentPage.onRoute(route);
			}
		}
	}, {
		key: 'clearSubPage',
		value: function clearSubPage() {}
	}, {
		key: 'transitionIn',
		value: function transitionIn() {
			var deferred = $$1.Deferred();
			this.trigger('transitionIn');
			this.$el.show({
				complete: deferred.resolve
			});
			return deferred.promise().then(this.transitionInComplete);
		}
	}, {
		key: 'transitionOut',
		value: function transitionOut() {
			var deferred = $$1.Deferred();
			// override me
			this.trigger('transitionOut');
			this.$el.hide({
				complete: deferred.resolve
			});
			return deferred.promise().then(this.transitionOutComplete);
		}
	}, {
		key: 'transitionInComplete',
		value: function transitionInComplete() {
			// override me
			this.trigger('transitionInComplete');
		}
	}, {
		key: 'transitionOutComplete',
		value: function transitionOutComplete() {
			// override me
			this.trigger('transitionOutComplete');
		}
	}]);
	return Page;
}(View$3);

module.exports = Page;



var Page$1 = Object.freeze({

});

var _$5 = require('lodash');
var $$2 = require('jquery');
var Page$2 = require('./Page');
var TweenLite = require('gsap/src/uncompressed/TweenLite');
var CSSPlugin = require('gsap/src/uncompressed/plugins/CSSPlugin');
var Easing = require('gsap/src/uncompressed/easing/EasePack');

var PAGE_TRANSITION_DURATION = 1.5;

var GridPage = function (_Page) {
	inherits(GridPage, _Page);

	function GridPage(options) {
		classCallCheck(this, GridPage);
		return possibleConstructorReturn(this, (GridPage.__proto__ || Object.getPrototypeOf(GridPage)).call(this, Page$2.merge({

			// ---------------------------------------------------
			// Class Properties

			name: '',

			// ---------------------------------------------------
			// Local Properties

			col: 0,
			row: 0,
			page: null,
			layerAnimationOffset: 0.25,

			// ---------------------------------------------------
			// Event Listeners

			events: [],
			bindFunctions: []
		}, options)));
	}

	// ---------------------------------------------------

	createClass(GridPage, [{
		key: 'loadAssets',
		value: function loadAssets() {
			var deferred = $$2.Deferred();
			// load stuff in here
			// resolve the deferred when load is complete
			deferred.resolve();
			return deferred.promise();
		}

		// ---------------------------------------------------

	}, {
		key: 'transitionIn',
		value: function transitionIn(prev) {
			var _this2 = this;

			this.$('.cover').on('mousewheel', function (e) {
				e.preventDefault();
			});

			this.$el.addClass('active');
			this.$el.find('>.content').scrollTop(0);

			this.$el.show();
			this.onResize();

			if (!prev) {
				// console.log('No Previous Page');
				TweenLite.to(this.$('.cover'), 0, {
					autoAlpha: 0
				});
				this.trigger('transitionInComplete');
				return this;
			}

			// hide the cover
			TweenLite.fromTo(this.$('.cover'), PAGE_TRANSITION_DURATION, {
				autoAlpha: 1
			}, {
				autoAlpha: 0,
				ease: Easing.Power4.easeOut,
				overwrite: true
			});

			var startX = 0,
			    startY = 0;

			if (this.col < prev.col) {
				startX = '-100';
				// this.app.media.playSound( 'page-forward' );
			} else if (this.col > prev.col) {
				startX = '100';
				// this.app.media.playSound( 'page-back' );
			} else if (this.row < prev.row) {
				startY = '100';
			} else if (this.row > prev.row) {
				startY = '-100';
			}

			// animate page layer
			TweenLite.fromTo(this.$el, PAGE_TRANSITION_DURATION, {
				display: 'block',
				x: startX + '%',
				y: startY + '%'
			}, {
				x: '0%',
				y: '0%',
				ease: Easing.Power4.easeOut,
				onComplete: function onComplete() {
					_this2.$el.css({
						transform: ''
					});
					_this2.trigger('transitionInComplete');
				},
				overwrite: true
			});

			// animate content layer
			console.log('Page::transitionIn', this.$('> .content'));
			TweenLite.fromTo(this.$('> .content'), PAGE_TRANSITION_DURATION, {
				x: startX * this.layerAnimationOffset + '%',
				y: startY * this.layerAnimationOffset + '%'
			}, {
				x: '0%',
				y: '0%',
				ease: Easing.Power4.easeOut,
				overwrite: true
			});

			return [startX, startY];
		}
	}, {
		key: 'transitionOut',
		value: function transitionOut(next) {
			var _this3 = this;

			this.$el.removeClass('active');
			this.$('.cover').off('mousewheel');
			TweenLite.fromTo(this.$('.cover'), PAGE_TRANSITION_DURATION, {
				autoAlpha: 0
			}, {
				autoAlpha: 1,
				ease: Easing.Power4.easeOut,
				overwrite: true
			});

			var endX = 0,
			    endY = 0;

			// transition out to the right by default
			if (!next || this.col > next.col) {
				endX = '100';
			} else if (this.col < next.col) {
				endX = '-100';
			} else if (this.row < next.row) {
				endY = '100';
			} else if (this.row > next.row) {
				endY = '-100';
			}

			// animate page layer
			TweenLite.fromTo(this.$el, PAGE_TRANSITION_DURATION, {
				// display: 'block',
				x: '0%',
				y: '0%'
			}, {
				x: endX + '%',
				y: endY + '%',
				ease: Easing.Power4.easeOut,
				onComplete: function onComplete() {
					_this3.$el.hide();
					_this3.trigger('transitionOutComplete');
				},
				overwrite: true
			});

			// animate content layer
			TweenLite.fromTo(this.$el.find('> .content'), PAGE_TRANSITION_DURATION, {
				// display: 'block',
				x: '0%',
				y: '0%'
			}, {
				x: endX * this.layerAnimationOffset + '%',
				y: endY * this.layerAnimationOffset + '%',
				ease: Easing.Power4.easeOut,
				overwrite: true
			});

			return [endX, endY];
		}
	}, {
		key: 'transitionInComplete',
		value: function transitionInComplete() {}
	}, {
		key: 'transitionOutComplete',
		value: function transitionOutComplete() {

			this.$el.css({
				transform: ''
			});
			this.$el.find('>.content').scrollTop(0);

			this.$('.cover').off('mousewheel');
		}
	}]);
	return GridPage;
}(Page$2);

module.exports = GridPage;



var GridPage$1 = Object.freeze({

});

var _$6 = require('lodash');
var AnimationPlayerPage = require('./Animation-Player-Page');

var ThreejsPage = function (_AnimationPlayerPage) {
	inherits(ThreejsPage, _AnimationPlayerPage);

	function ThreejsPage(options) {
		classCallCheck(this, ThreejsPage);
		return possibleConstructorReturn(this, (ThreejsPage.__proto__ || Object.getPrototypeOf(ThreejsPage)).call(this, AnimationPlayerPage.merge({

			// ---------------------------------------------------
			// Class Properties

			name: 'Threejs',
			autoPlay: true,
			autoStop: true,

			// ---------------------------------------------------
			// local Properties

			threeView: null,

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: ['afterRender', 'play', 'stop', 'update', 'draw', 'setupThreeView'],

			// ---------------------------------------------------
			// Event Listeners

			events: [],

			// ---------------------------------------------------
			// Data Binding

			dataBindings: []
		}, options)));

		// ---------------------------------------------------
		// Finish setup
	}

	// ---------------------------------------------------

	createClass(ThreejsPage, [{
		key: 'setupThreeView',
		value: function setupThreeView() {
			if (!this.threeView || !this.threeView.setup()) {
				throw new Error('threeView must be set by Page that subclasses Threejs-Page');
			}
			return this;
		}

		// ---------------------------------------------------
		// Event Handlers

	}, {
		key: 'onResize',
		value: function onResize() {
			if (this.threeView) this.threeView.onResize();
		}

		// ---------------------------------------------------

		// ---------------------------------------------------
		// PEAK/Page Overrides

		// transitionIn() {
		// 	super.transitionIn();
		// 	}
		//
		// transitionInComplete() {
		// 	super.transitionInComplete();
		// }
		//
		// // ---------------------------------------------------
		//
		// transitionOut() {
		// 	super.transitionOut();
		// }
		//
		// // ---------------------------------------------------
		//
		// beforeRender() {
		// 	super.beforeRender();
		// }

		// ---------------------------------------------------

	}, {
		key: 'afterRender',
		value: function afterRender() {
			get(ThreejsPage.prototype.__proto__ || Object.getPrototypeOf(ThreejsPage.prototype), 'afterRender', this).call(this);
			this.setupThreeView();
		}
	}, {
		key: 'play',


		// ---------------------------------------------------
		// PEAK/AnimationPlayerPage Overrides

		value: function play() {
			get(ThreejsPage.prototype.__proto__ || Object.getPrototypeOf(ThreejsPage.prototype), 'play', this).call(this);
			return this;
		}
	}, {
		key: 'stop',


		// ---------------------------------------------------

		value: function stop() {
			get(ThreejsPage.prototype.__proto__ || Object.getPrototypeOf(ThreejsPage.prototype), 'stop', this).call(this);
			return this;
		}
	}, {
		key: 'update',
		value: function update(data) {
			// console.log( 'update' )
			this.threeView.update(_$6.extend({
				mouseTelemetrics: this.mouseTelemetrics
			}, data));
			return this;
		}
	}, {
		key: 'draw',
		value: function draw() {
			// console.log( 'draw' )
			this.threeView.draw();
			return this;
		}
	}]);
	return ThreejsPage;
}(AnimationPlayerPage);

module.exports = ThreejsPage;

var _$7 = require('lodash');
var Page$3 = require('./Page');
var AnimationPlayerPage$1 = function (_Page) {
	inherits(AnimationPlayerPage, _Page);

	function AnimationPlayerPage(options) {
		classCallCheck(this, AnimationPlayerPage);

		var _this = possibleConstructorReturn(this, (AnimationPlayerPage.__proto__ || Object.getPrototypeOf(AnimationPlayerPage)).call(this, Page$3.merge({

			// ---------------------------------------------------
			// Classs Properties

			name: 'Animation-Player',

			// ---------------------------------------------------
			// Local Properties

			autoPlay: false,
			autoStop: true,

			// ---------------------------------------------------
			// Bind Functions

			bindFunctions: ['play', 'stop', 'update', 'draw', 'transitionInComplete', 'transitionOut']
		}, options)));

		_this.player = new AnimationPlayer(_this.update, _this.draw);
		return _this;
	}

	createClass(AnimationPlayerPage, [{
		key: 'transitionInComplete',
		value: function transitionInComplete() {
			get(AnimationPlayerPage.prototype.__proto__ || Object.getPrototypeOf(AnimationPlayerPage.prototype), 'transitionInComplete', this).call(this);
			if (this.autoPlay) this.play();
		}

		// transitionIn() {
		// 	super.transitionIn();
		// }

	}, {
		key: 'transitionOut',
		value: function transitionOut() {
			get(AnimationPlayerPage.prototype.__proto__ || Object.getPrototypeOf(AnimationPlayerPage.prototype), 'transitionOut', this).call(this);
			if (this.autoStop) this.stop();
		}
	}, {
		key: 'play',
		value: function play() {
			this.player.play();
			this.trigger('play');
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.player.stop();
			this.trigger('stop');
		}
	}, {
		key: 'update',
		value: function update(data) {}
	}, {
		key: 'draw',
		value: function draw() {}
	}, {
		key: 'currentTime',
		get: function get$$1() {
			return this.player.currentTime;
		},
		set: function set$$1(val) {
			this.player.currentTime = val;
			return val;
		}
	}]);
	return AnimationPlayerPage;
}(Page$3);

module.exports = AnimationPlayerPage$1;

var _$8 = require('lodash');
var $$3 = require('jquery');
var Base$4 = require('../Base');
var Collection = require('../collections/Collection');

var Model = function (_Base) {
	inherits(Model, _Base);

	function Model(attributes, options) {
		classCallCheck(this, Model);

		// ---------------------------------------------------
		// Non-attribute Properties

		var _this = possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this, Base$4.merge({

			// ---------------------------------------------------
			// Local Properties
			url: '',
			idField: 'id',

			// Whether or not to convert attributes that are collections to a list of model ids rather than saving the complete model
			'toJSONRefs': false,

			// List Attribute names you don't want to save when converting to json
			// useful when you have a property that you want to monitor changes on
			// but that doesn't need to be saved to the server
			'omitAttributes': [],

			// ---------------------------------------------------
			// Event Listeners
			events: [],
			ignoreEvents: [],
			// ---------------------------------------------------
			// Bind functions

			bindFunctions: ['addToCollection', 'destroy', 'fetch', 'save', 'forwardEvent', 'makeAttribute', 'removeFromCollection', 'set']
		}, options)));

		_this._collections = [];

		// ---------------------------------------------------
		// Record Attributes
		var defaultAttributes = {};
		defaultAttributes[_this.idField] = _$8.uniqueId();
		_this._attributes = _$8.extend(defaultAttributes, attributes);

		// ---------------------------------------------------
		// Make Attribute getters & setters

		_$8.each(_this._attributes, _this.makeAttribute);
		_this.delegateEvents();
		return _this;
	}

	createClass(Model, [{
		key: Symbol.iterator,
		value: function value() {
			return this._attributes.values();
		}

		// ---------------------------------------------------

	}, {
		key: 'fetch',
		value: function fetch() {
			var _this2 = this;

			// load stuff in here
			// resolve the deferred when load is complete

			if (this.url) {
				// get the data at the url
				return $$3.get(this.url, {
					id: this[this.idField]
				}).then(function (data) {
					data = _this2.parse(data);
					_$8.each(data, _this2.makeAttribute);
				});
			} else {
				// we're all set!
				var deferred = $$3.Deferred();
				deferred.resolve(this);
				return deferred;
			}
		}

		// ---------------------------------------------------

	}, {
		key: 'parse',
		value: function parse(data) {
			return data;
		}

		// ---------------------------------------------------

	}, {
		key: 'save',
		value: function save() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			if (this.options.url) {
				// set the data at the url
				return $$3.ajax(_$8.defaults(options, {
					type: 'POST',
					url: this.options.url,
					data: JSON.stringify(this.toJSON()),
					crossDomain: true,
					contentType: 'application/json',
					dataType: 'JSON'
				}));
			} else {
				// we're all set!
				var deferred = $$3.Deferred();
				deferred.resolve(this);
				return deferred;
			}
		}

		// ---------------------------------------------------

	}, {
		key: 'toJSON',
		value: function toJSON(justId) {
			var _this3 = this;

			if (justId) return this._attributes.id;

			return _$8(this._attributes).omit(this.options.omitAttributes).cloneDeepWith(function (a) {
				// pass toJSONRefs to tell collections that may be children of this model whether to
				// save their children as objects or just IDs that can be picked up as references from a master collection when rebuilding
				if (a.toJSON) {
					return a.toJSON(_this3.options.toJSONRefs);
				}
				if (_this3.token) a.token = _this3.token;
				return a;
			});
		}

		// ---------------------------------------------------

	}, {
		key: 'addToCollection',


		// ---------------------------------------------------

		value: function addToCollection(collection, options) {
			var _this4 = this;

			if (this._collections.indexOf(collection) === -1) {
				this._collections.push(collection);

				// create listeners on collection for attribute changes
				_$8.each(this._attributes, function (val, key) {
					collection.listenTo(_this4, 'change:' + key, collection.forwardEvent);
				});

				// only trigger if model is not already a member
				if (!options.silent) {
					this.trigger('addToCollection', {
						collection: collection,
						model: this
					});
				}
			}
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'removeFromCollection',
		value: function removeFromCollection(collection, options) {
			if (this._collections.indexOf(collection) > -1) {
				_$8.remove(this._collections, collection);
				// only trigger if model is a member
				if (!options.silent) {
					this.trigger('removeFromCollection', {
						collection: collection,
						model: this
					});
				}
			}
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'destroy',
		value: function destroy() {
			var _this5 = this;

			this.undelegateEvents();
			this.stopListening();
			_$8.each(this._collections, function (c) {
				// create forwarder on collection for attribute
				c.remove(_this5);
			});
			this._collections = [];
			this._attributes = [];
			this.trigger('destroy', this);
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'makeAttribute',
		value: function makeAttribute(value, name) {
			var _this6 = this;

			var desc = Object.getOwnPropertyDescriptor(this, name);
			if (desc && desc.get !== undefined) {
				this[name] = value;
				return this;
			}

			// // if it's already defined, just set the new value
			_$8.each(this._collections, function (c) {
				// create forwarder on collection for attribute
				c.listenTo(_this6, 'change:' + name, c.forwardEvent);
			});
			Object.defineProperty(this, name, {
				set: function set$$1(val) {
					_this6._attributes[name] = val;
					var event = {
						model: _this6,
						name: name,
						value: val,
						type: 'change:' + name + ' change'
					};
					_this6.trigger(event.type, event, val);

					// if it is an emitter, listen for change events
					if (val && _$8.isFunction(val.trigger)) {
						_this6.listenTo(val, 'change', _this6.forwardEvent);
					}
				},
				get: function get$$1() {
					return _this6._attributes[name];
				}
			});
			this._attributes[name] = value;
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'forwardEvent',
		value: function forwardEvent(data) {
			if (data.forward === false) return this;
			if (this.ignoreEvents.indexOf(data.type) > -1) return this;
			data.parents = data.parents || [];
			data.parents = data.parents || [];
			data.parents.push(this);
			this.trigger(data.type, data, data.value);
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'set',
		value: function set$$1(data, name) {
			if (name) {
				data = defineProperty({}, name, data);
			}
			_$8.each(data, this.makeAttribute);
		}

		// ---------------------------------------------------

	}, {
		key: 'attributes',
		get: function get$$1() {
			return this._attributes;
		}
	}], [{
		key: 'deRef',
		value: function deRef(sourceCollection, idList) {
			return new Collection(sourceCollection.get(idList));
		}
	}]);
	return Model;
}(Base$4);

module.exports = Model;



var Model$2 = Object.freeze({
	default: Model
});

var _$9 = require('lodash');
var Model$3 = require('./Model');
var io = require('socket.io/client');

var SocketModel = function (_Model) {
	inherits(SocketModel, _Model);

	function SocketModel(attributes, options) {
		classCallCheck(this, SocketModel);

		// ---------------------------------------------------
		// Local Properties

		var _this = possibleConstructorReturn(this, (SocketModel.__proto__ || Object.getPrototypeOf(SocketModel)).call(this, Model$3.merge({
			// default attributes
		}, attributes), Model$3.merge({
			events: {
				target: 'io',
				eventName: 'connect',
				handler: 'onConnect'
			},
			bindFunctions: ['onConnect']
		}, options)));

		_this.socket = io.socket(_this.url);
		return _this;
	}

	createClass(SocketModel, [{
		key: 'onConnect',
		value: function onConnect() {
			var _this2 = this;

			_$9.each(this._attributes, function (val, name) {
				_this2.socket.on('change:' + name, function (data) {
					return _this2[name] = data;
				});
			});
		}
	}]);
	return SocketModel;
}(Model$3);



var SocketModel$2 = Object.freeze({
	default: SocketModel
});

var _$10 = require('lodash');
var $$4 = require('jquery');
var Base$5 = require('../Base');
var Model$4 = require('../models/Model');

var Collection$1 = function (_Base) {
	inherits(Collection, _Base);

	function Collection(models, options) {
		classCallCheck(this, Collection);

		// make models array optional
		if (!_$10.isArray(models) && (typeof models === 'undefined' ? 'undefined' : _typeof(models)) === 'object' && typeof options === 'undefined') {
			options = models;
			models = [];
		}

		var _this = possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, _$10.mergeWith({
			model: Model$4,
			url: null,
			idField: 'id',
			ignoreEvents: [],
			bindFunctions: ['reset', 'get', 'set', 'add', 'remove', 'empty', 'parse', 'fetch', 'getRefs', 'forwardEvent', 'toJSON']
		}, options, Base$5.mergeRules)));

		_this.sort = _this.getLocalObject(_this.sort);

		_this._models = [];
		_this.reset(models, {
			silent: true
		});
		return _this;
	}

	// ---------------------------------------------------

	createClass(Collection, [{
		key: Symbol.iterator,
		value: function value() {
			return this._models.values();
		}

		// ---------------------------------------------------

	}, {
		key: 'reset',
		value: function reset(models, options) {
			var _this2 = this;

			options = options || {};
			// kill existing models
			this.empty();
			// create new models
			_$10.each(models, function (m) {
				return _this2.add(m, options);
			});
			if (!options.silent) {
				this.trigger('reset', this);
			}
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'set',
		value: function set$$1(models, options) {
			var _this3 = this;

			options = options || {};
			if (options.reset === true) this.empty();
			models = _$10.isArray(models) ? models : [models];
			_$10.each(models, function (attributes) {
				var found = _this3.get(attributes.id);
				if (found[0]) {
					// if the model exists, update it's attributes
					_$10.extend(found[0], attributes);
				} else {
					// otherwise, add it
					_this3.add(attributes);
				}
			});
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'add',
		value: function add(models, options) {
			var _this4 = this;

			options = options || {};
			// if models isn't an array, make it one
			models = _$10.isArray(models) ? models : [models];
			var updated = _$10.map(models, function (attributes) {
				// create new models
				if (attributes[_this4.idField]) {
					var existingModels = _this4.get(attributes[_this4.idField]);
					if (existingModels.length) {
						if (options.merge) {
							// update other model
							existingModels[0].set(attributes);
							// we're done here
							return existingModels;
						} else {
							// remove other model
							_this4.remove(existingModels[0]);
						}
					}
				} else {
					// create a unique id
					attributes[_this4.idField] = _$10.uniqueId();
				}
				// create new model
				var Model = _this4.model;
				var m = new Model(attributes);

				// register in list only once
				// already check above to see if it exists
				_this4._models.push(m);
				// tell the model it's a member here
				m.addToCollection(_this4, options);
				// listen to them
				_this4.listenTo(m, 'change', _this4.forwardEvent);
				if (!options.silent) {
					_this4.trigger('add', m);
				}

				return m;
			});
			// sort the models
			if (this.sort) {
				this._models = this._models.sort(this.sort);
				updated = updated.sort(this.sort);
			}
			return updated;
		}

		// ---------------------------------------------------

	}, {
		key: 'remove',
		value: function remove(models, options) {
			var _this5 = this;

			options = options || {};
			// if models isn't an array, make it one
			// create an internal copy of the models array to iterate on
			models = _$10.isArray(models) ? models.slice() : [models];
			_$10.each(models, function (model) {
				// allow ids to be passed
				if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) !== 'object') {
					model = _this5.get(model);
				}
				var index = _this5._models.indexOf(model);

				if (index > -1) {
					_this5.stopListening(model);
					_this5._models.splice(index, 1);
					model.removeFromCollection(_this5, options);
					if (!options.silent) {
						_this5.trigger('remove', {
							collection: _this5,
							model: model
						});
					}
				} else {
					console.error('couldnt find model', model);
				}
			});
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'empty',
		value: function empty(options) {
			this.remove(this._models, options);
		}

		// ---------------------------------------------------

	}, {
		key: 'get',
		value: function get$$1(matchConditions) {
			var _this6 = this;

			// make sure match conditions is an array
			matchConditions = _$10.isArray(matchConditions) ? matchConditions : [matchConditions];

			// an array of objects is assumed to be a list of match condition objects
			// an array of non-objects is assumed to be a list of ids
			if (_typeof(matchConditions[0]) !== 'object') {
				// convert to match condition objects
				matchConditions = _$10.map(matchConditions, function (_id) {
					var cond = {};
					cond[_this6.idField] = _id;
					return cond;
				});
			}

			var models = _$10.chain(matchConditions)
			// for each condition, find a list of models that matches
			.map(function (condition) {
				return _$10.filter(_this6._models, condition);
			}).flatten()
			// only include models once in list
			.uniq().value();
			return models;
		}

		// ---------------------------------------------------

	}, {
		key: 'at',
		value: function at(index) {
			return this._models[Math.abs(index % this.length)];
		}

		// ---------------------------------------------------

	}, {
		key: 'fetch',
		value: function fetch(options) {
			var _this7 = this;

			options = _$10.defaults(options, {
				reset: true,
				merge: false,
				parse: this.parse,
				url: this.url,
				query: this.query
			});
			// default fetch action is to replace from json api

			if (options.url) {
				// get the data at the url
				return $$4.get(options.url, options.query).then(options.reset ? function (data) {
					return _this7.reset(options.parse(data), options);
				} : function (data) {
					return _$10.each(options.parse(data), options.merge ? _this7.add : _this7.set);
				});
			} else {
				// we're all set!
				var deferred = $$4.Deferred();
				deferred.resolve(this);
				return deferred;
			}
		}

		// ---------------------------------------------------

	}, {
		key: 'parse',
		value: function parse(data) {
			return data;
		}

		// ---------------------------------------------------

	}, {
		key: 'forwardEvent',
		value: function forwardEvent(data) {
			if (data.forward === false) return this;
			if (this.ignoreEvents.indexOf(data.type) > -1) return this;
			data.parents = data.parents || [];
			data.parents.push(this);
			this.trigger(data.type, data, data.value);
			return this;
		}

		// ---------------------------------------------------

	}, {
		key: 'toJSON',
		value: function toJSON(refs) {
			return _$10.map(this._models, function (m) {
				return m.toJSON(refs);
			});
		}

		// ---------------------------------------------------

	}, {
		key: 'getRefs',
		value: function getRefs() {
			return _$10.map(this._models, function (m) {
				return m.id;
			});
		}

		// ---------------------------------------------------

		// TODO: create wrapped convenience accessor functions from lodash

	}, {
		key: 'map',
		value: function map(fn) {
			return _$10.map(this.models, fn);
		}
	}, {
		key: 'each',
		value: function each(fn) {
			_$10.each(this.models, fn);
			return this;
		}
	}, {
		key: 'where',
		value: function where(fn) {
			return _$10.filter(this.models, fn);
		}
	}, {
		key: 'find',
		value: function find(fn) {
			return _$10.find(this.models, fn);
		}
	}, {
		key: 'filter',
		value: function filter(fn) {
			return _$10.filter(this.models, fn);
		}
	}, {
		key: 'reduce',
		value: function reduce(fn, init) {
			return _$10.reduce(this.models, fn, init);
		}

		// ---------------------------------------------------

	}, {
		key: 'length',
		get: function get$$1() {
			return this._models.length;
		}
	}, {
		key: 'models',
		get: function get$$1() {
			return this._models;
		}

		// ---------------------------------------------------

	}, {
		key: 'sortBy',
		set: function set$$1(attr) {
			this._options.sort = function (a, b) {
				return b[attr] - a[attr];
			};
			return attr;
		}
	}]);
	return Collection;
}(Base$5);

module.exports = Collection$1;



var Collection$2 = Object.freeze({

});

var uiEventNames = ['mousemove', 'mouseleave', 'mouseenter', 'mouseover', 'mouseout', 'mousedown', 'mouseup', 'keydown', 'keyup', 'touchstart', 'touchend', 'touchmove', 'click', 'focus', 'blur'];

var keycodes = {
	'Backspace': 8,
	'Tab': 9,
	'Enter': 13,
	'Shift': 16,
	'Ctrl': 17,
	'Alt': 18,
	'Break': 19,
	'CapsLock': 20,
	'Esc': 27,
	'Space': 32,
	'PageUp': 33,
	'PageDown': 34,
	'End': 35,
	'Home': 36,
	'Left': 37,
	'Up': 38,
	'Right': 39,
	'Down': 40,
	'Insert': 45,
	'Delete': 46,
	'0': 48,
	'1': 49,
	'2': 50,
	'3': 51,
	'4': 52,
	'5': 53,
	'6': 54,
	'7': 55,
	'8': 56,
	'9': 57,
	'A': 65,
	'B': 66,
	'C': 67,
	'D': 68,
	'E': 69,
	'F': 70,
	'G': 71,
	'H': 72,
	'I': 73,
	'J': 74,
	'K': 75,
	'L': 76,
	'M': 77,
	'N': 78,
	'O': 79,
	'P': 80,
	'Q': 81,
	'R': 82,
	'S': 83,
	'T': 84,
	'U': 85,
	'V': 86,
	'W': 87,
	'X': 88,
	'Y': 89,
	'Z': 90,
	'Windows': 91,
	'RightClick': 93,
	'Numpad0': 96,
	'Numpad1': 97,
	'Numpad2': 98,
	'Numpad3': 99,
	'Numpad4': 100,
	'Numpad5': 101,
	'Numpad6': 102,
	'Numpad7': 103,
	'Numpad8': 104,
	'Numpad9': 105,
	'Numpad*': 106,
	'Numpad+': 107,
	'Numpad-': 109,
	'Numpad.': 110,
	'Numpad/': 111,
	'F1': 112,
	'F2': 113,
	'F3': 114,
	'F4': 115,
	'F5': 116,
	'F6': 117,
	'F7': 118,
	'F8': 119,
	'F9': 120,
	'F10': 121,
	'F11': 122,
	'F12': 123,
	'NumLock': 144,
	'ScrollLock': 145,
	'MyComputer': 182,
	'MyCalculator': 183,
	';': 186,
	'=': 187,
	',': 188,
	'-': 189,
	'.': 190,
	'/': 191,
	'`': 192,
	'[': 219,
	'\\': 220,
	']': 221,
	'"': 222
};

var Constants = Object.freeze({
	uiEventNames: uiEventNames,
	keycodes: keycodes
});

function validate(data, type, minLength, maxLength) {
	// TODO: allow type to be a string that acts as a global type
	if (typeof type === 'string') {
		return validate(data, type);
	}
	var invalid = [];
	for (var key in data) {
		invalid.push(validateItem(data[key], type[key], key, minLength, maxLength));
	}
	return invalid;
}

function validateItem(data, type, key, minLength, maxLength) {
	// any piece of data that doesn't have an expectation is deemed not invalid
	if (type === undefined) return [];
	if (minLength && data.length < minLength) {
		return [{
			code: 0,
			key: key,
			message: key + ' needs to be at least ' + minLength + ' characters.'
		}];
	}
	if (maxLength && data.length < minLength) {
		return [{
			code: 0,
			key: key,
			message: key + ' cannot be longer than ' + maxLength + ' characters.'
		}];
	}
	return validateType[type](data, key);
}

var validateType = {
	true: function _true(data, key) {
		key = key || 'data';
		var invalid = [];
		if (!data) {
			invalid.push({
				code: 0,
				key: key,
				message: key + ' needs true'
			});
		}
		return invalid;
	},
	false: function _false(data, key) {
		key = key || 'data';
		var invalid = [];
		if (data) {
			invalid.push({
				code: 0,
				key: key,
				message: key + ' needs to be false'
			});
		}
		return invalid;
	},
	array: function array(data, key) {
		key = key || 'data';
		var invalid = [];
		if (!Array.isArray(data)) {
			invalid.push({
				code: 0,
				key: key,
				message: key + ' needs to be an Array'
			});
		}
		return invalid;
	},
	string: function string(data, key) {
		key = key || 'data';
		var invalid = [];
		// TODO: run through naughty word filter
		return invalid;
	},
	email: function email(data, key) {
		key = key || 'data';
		var invalid = [];
		// run through email validator
		var parts = data.split('@');
		if (parts.length < 2) {
			// no @ sign
			invalid.push({
				code: 0,
				key: key,
				data: data,
				message: 'Invalid Email Address.'
			});
			return invalid;
		}
		parts = parts[1].split('.');
		if (parts.length < 2) {
			// no dot
			invalid.push({
				code: 0,
				key: key,
				data: data,
				message: 'Invalid Email Address'
			});
		}
		return invalid;
	},
	zip: function zip(data, key) {
		key = key || 'data';
		var invalid = [];
		if (!parseInt(data)) {
			invalid.push({
				code: 0,
				key: key,
				data: data,
				message: key + ' needs to be a number'
			});
		}
		if (parseInt(data) < 10000) {
			invalid.push({
				code: 1,
				key: key,
				data: data,
				message: key + ' needs at least 5 digits'
			});
		}
		return invalid;
	}
};

module.exports = {
	validate: validate,
	validateItem: validateItem
};

var Validator = Object.freeze({

});

function prefixMethod(methodName, options) {
	options = options || {};
	if (!options.uncapitalized) {
		methodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);
	}
	var parent = options.parent || window;
	var prefixes = options.prefixes || ["webkit", "moz", "o", "ms"];

	var i = 0;
	while (!parent[methodName]) {
		parent[methodName] = parent[prefixes[i++] + methodName];
	}
	return parent[methodName];
}

module.exports = prefixMethod;

var prefixmethod = Object.freeze({

});

var SocialService = {

	// this should only be used for main site share
	shareFacebook: function shareFacebook(options) {
		// console.log('shareFacebook', options);
		options = _.extend({
			url: location.href

		}, options);
		var site = encodeURIComponent(options.url);

		var shareURL = 'http://www.facebook.com/sharer.php?u=' + site;
		openWindow(shareURL, 'Facebook');
	},

	shareGooglePlus: function shareGooglePlus(options) {
		// console.log('shareGooglePlus', options);
		options = _.extend({
			url: location.href
		}, options);
		var site = encodeURIComponent(options.url);

		var shareURL = 'https://plus.google.com/share?url=' + site;
		openWindow(shareURL, 'GooglePlus');
	},

	shareTwitter: function shareTwitter(options) {
		// console.log('shareTwitter', options);
		options = _.extend({
			url: '',
			message: undefined
		}, options);

		if (options.url.length + options.message.length > 140) {
			console.warn("tweet characters >140: ", options.url.length + options.message.length);
		}

		var message = encodeURIComponent(options.message);
		var shareURL;
		if (options.url.length > 1) {
			var site = encodeURIComponent(options.url);
			shareURL = 'http://twitter.com/share?text=' + message + '&url=' + site;
		} else {
			shareURL = 'http://twitter.com/share?text=' + message;
		}
		openWindow(shareURL, 'Twitter');
	},

	shareTumblr: function shareTumblr(options) {
		// console.log('shareTumblr', options);
		options = _.extend({
			img: "",
			url: window.location.href,
			title: undefined,
			message: ""
		}, options);

		//var site = '&u=' + encodeURIComponent(options.url);
		//var title = options.title ? '&t=' + encodeURIComponent(options.title) : '';
		//var shareURL = 'http://tumblr.com/share?s=&v=3' + title + site;
		// var site =  encodeURIComponent(options.url);
		var site = encodeURIComponent(options.url);
		var photo = encodeURIComponent(options.img);
		var title = encodeURIComponent(options.title);
		var message = encodeURIComponent(options.message);
		var shareURL_p = "//www.tumblr.com/share/photo?source=" + photo + "&caption=" + message + "&click_thru=" + site;
		// var shareURL= 'http://www.tumblr.com/share/link?url=' + site + '&name=' + title + '&description='+ desc;

		openWindow(shareURL_p, 'Tumblr');
	},

	sharePinterest: function sharePinterest(options) {
		console.log('sharePinterest', options);
		options = _.extend({
			url: window.location.href,
			message: undefined,
			media: undefined,
			isVideo: false
		}, options);

		//            img = 'http://media.giphy.com/media/iP8hhgIczK56U/giphy.gif';
		var media = options.media ? '&media=' + encodeURIComponent(options.media) : '';
		var isVideo = options.isVideo ? '&isVideo=true' : '';
		var site = encodeURIComponent(options.url);
		var message = options.message ? '&description=' + encodeURIComponent(options.message) : '';
		var shareURL = 'http://pinterest.com/pin/create/button/?url=' + site + message + media + isVideo;
		openWindow(shareURL, 'Pinterest');
	}

};

function openWindow(url, title) {
	// console.log('openWindow', url, title);
	var width = 575,
	    height = 425,
	    opts = ',width=' + width + ',height=' + height;
	window.open(url, title, opts);
}

module.exports = SocialService;

var Social = Object.freeze({

});

var _$11 = require('lodash');
var $$5 = require('jquery');
var log = require('../utils/log');

var GA_ACCOUNTS = ["UA-xxxxxxxx-1"];
var GTM_ACCOUNT = "GTM-xxxxxx";
var OMNNITURE_IDS = {
	pageid: '',
	pagesite: ''
};

var GoogleTagManager = function GoogleTagManager(document, window) {
	this.id = null;
	var _this = this;
	this.init = function (id) {
		this.id = id || "a";
		(function (w, d, s, l, i) {
			w[l] = w[l] || [];
			w[l].push({
				'gtm.start': new Date().getTime(),
				event: 'gtm.js'
			});
			var f = d.getElementsByTagName(s)[0],
			    j = d.createElement(s),
			    dl = l != 'dataLayer' ? '&l=' + l : '';
			j.async = true;
			j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
			f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', id);
		return this;
	};
	this.trackPageview = function (data) {

		return this;
	};
	this.trackEvent = function (data) {
		window.dataLayer.push(data);
		return this;
	};
	return this;
};

var trackers = {};
var initialized = false;

var Analytics = function () {
	function Analytics() {
		classCallCheck(this, Analytics);
	}

	createClass(Analytics, null, [{
		key: 'init',
		value: function init(options) {
			if (initialized) {
				log('Analytics already initialized');
				return this;
			}
			GA_ACCOUNTS = options.GA_ACCOUNTS || GA_ACCOUNTS;
			GTM_ACCOUNT = options.GTM_ACCOUNT || GTM_ACCOUNT;
			OMNNITURE_IDS = options.OMNNITURE_IDS || OMNNITURE_IDS;
			// console.log("Tracking."+"init()", arguments);
			// trackers.ga = new GoogleAnalytics(document, window);
			trackers.gtm = new GoogleTagManager(document, window);
			// trackers.o = new Omniture($)
			// window.env == "dev" ? id += "2" : id += "1";
			// trackers.ga.setAccounts(GA_ACCOUNTS);
			trackers.gtm.init(GTM_ACCOUNT);
			Analytics.trackPageview();
			initialized = true;
		}
	}, {
		key: 'trackPageview',
		value: function trackPageview(data) {
			_$11.each(this.trackers, function (tracker) {
				tracker.trackPageview(data);
			});
			Analytics.report(data);
			return this;
		}
	}, {
		key: 'trackEvent',
		value: function trackEvent(data) {
			_$11.each(this.trackers, function (tracker) {
				try {
					tracker.trackEvent(data);
				} catch (e) {}
			});
			Analytics.report(data);
			return this;
		}
	}, {
		key: 'report',
		value: function report(data) {
			log('-- Tracking Report', data);
			return this;
		}
	}]);
	return Analytics;
}();


module.exports = Analytics;



var Analytics$1 = Object.freeze({

});

/**
 * The *AudioSource object creates an analyzer node, sets up a repeating function with setInterval
 * which samples the input and turns it into an FFT array. The object has two properties:
 * streamData - this is the Uint8Array containing the FFT data
 * volume - cumulative value of all the bins of the streaData.
 *
 * The MicrophoneAudioSource uses the getUserMedia interface to get real-time data from the user's microphone. Not used currently but included for possible future use.
 */

var DataSource = function () {
	function DataSource(options) {
		classCallCheck(this, DataSource);

		this.dataSize = options.dataSize || 2048;
		this.startTime = Date.now();
	}

	createClass(DataSource, [{
		key: "update",
		value: function update() {}
	}, {
		key: "onUpdate",
		value: function onUpdate() {
			this.update();
		}
	}, {
		key: "stopSampling",
		value: function stopSampling() {}
	}, {
		key: "destroy",
		value: function destroy() {}
	}, {
		key: "currentTime",
		get: function get$$1() {
			return Date.now() - this.startTime;
		}
	}]);
	return DataSource;
}();

module.exports = DataSource;



var DataSource$1 = Object.freeze({

});

/**
 * The *AudioSource object creates an analyzer node, sets up a repeating function with setInterval
 * which samples the input and turns it into an FFT array. The object has two properties:
 * streamData - this is the Uint8Array containing the FFT data
 * volume - cumulative value of all the bins of the streaData.
 *
 * The MicrophoneAudioSource uses the getUserMedia interface to get real-time data from the user's microphone. Not used currently but included for possible future use.
 */

var DataSource$2 = require('../Data-Source');
var prefixMethod$1 = require('../../utils/prefixmethod');

prefixMethod$1('getUserMedia', {
	parent: navigator
});
prefixMethod$1('AudioContext');

var MicrophoneDataSource = function (_DataSource) {
	inherits(MicrophoneDataSource, _DataSource);

	function MicrophoneDataSource(options) {
		classCallCheck(this, MicrophoneDataSource);

		var _this = possibleConstructorReturn(this, (MicrophoneDataSource.__proto__ || Object.getPrototypeOf(MicrophoneDataSource)).call(this, options));

		_this.startTime = Date.now();
		_this.fftsize = 2048;
		_this.volume = 0;
		_this.analyser;

		navigator.getUserMedia({
			audio: true
		}, function (stream) {
			_this.audioCtx = new window.AudioContext();
			_this.mic = _this.audioCtx.createMediaStreamSource(stream);
			_this.analyser = _this.audioCtx.createAnalyser();
			_this.analyser.fftSize = _this.fftsize;
			_this.mic.connect(_this.analyser);
			_this.streamData = new Uint8Array(_this.analyser.frequencyBinCount);
			_this.intervalId = setInterval(_this.sampleAudioStream, 1000 / 60);
		}, function () {
			alert('error getting microphone input.');
		});
		return _this;
	}

	createClass(MicrophoneDataSource, [{
		key: 'sampleAudioStream',
		value: function sampleAudioStream() {
			this.analyser.getByteFrequencyData(this.streamData);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.stopSampling();
			this.mic.disconnect();
			this.analyser.disconnect();
		}
	}, {
		key: 'currentTime',
		get: function get$$1() {
			return (Date.now() - this.startTime) / 1000;
		}
	}]);
	return MicrophoneDataSource;
}(DataSource$2);

module.exports = MicrophoneDataSource;



var MicrophoneDataSource$1 = Object.freeze({

});

/**
 * The *AudioSource object creates an analyzer node, sets up a repeating function with setInterval
 * which samples the input and turns it into an FFT array. The object has two properties:
 * streamData - this is the Uint8Array containing the FFT data
 * volume - cumulative value of all the bins of the streaData.
 *
 * The MicrophoneAudioSource uses the getUserMedia interface to get real-time data from the user's microphone. Not used currently but included for possible future use.
 */

var DataSource$3 = require('../Data-Source');
var prefixMethod$2 = require('../../utils/prefixmethod');

prefixMethod$2('getUserMedia', {
	parent: navigator
});
prefixMethod$2('AudioContext');

var AudioPlayerDataSource = function (_DataSource) {
	inherits(AudioPlayerDataSource, _DataSource);

	function AudioPlayerDataSource(player, options) {
		classCallCheck(this, AudioPlayerDataSource);

		var _this = possibleConstructorReturn(this, (AudioPlayerDataSource.__proto__ || Object.getPrototypeOf(AudioPlayerDataSource)).call(this));

		_this.player = player;
		_this.fftsize = 2048;
		_this.audioCtx = new window.AudioContext();
		_this.analyser = _this.audioCtx.createAnalyser();
		_this.analyser.fftSize = _this.fftsize;
		_this.source = _this.audioCtx.createMediaElementSource(_this.player);
		_this.source.connect(_this.analyser);
		_this.analyser.connect(_this.audioCtx.destination);
		_this.analyser.smoothingTimeConstant = 0.1;

		_this.intervalId = setInterval(_this.sampleAudioStream, 1000 / 60);
		_this.streamData = new Uint8Array(_this.analyser.frequencyBinCount);
		return _this;
	}

	createClass(AudioPlayerDataSource, [{
		key: 'sampleAudioStream',
		value: function sampleAudioStream() {
			this.analyser.getByteFrequencyData(this.streamData);
		}
	}, {
		key: 'playStream',
		value: function playStream(streamUrl) {
			// console.log( streamUrl );
			// get the input stream from the audio element
			this.player.addEventListener('ended', function () {
				this.directStream('coasting');
			});
			this.player.setAttribute('src', this.streamUrl);
			this.player.play();
		}
	}, {
		key: 'stopSampling',
		value: function stopSampling() {
			clearInterval(this.intervalId);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.stopSampling();
			this.source.disconnect();
			this.analyser.disconnect();
		}
	}, {
		key: 'currentTime',
		get: function get$$1() {
			return this.player.currentTime;
		}
	}]);
	return AudioPlayerDataSource;
}(DataSource$3);

module.exports = AudioPlayerDataSource;



var AudioPlayerDataSource$1 = Object.freeze({

});

var View$4 = require('../../View');
var _$12 = require('lodash');
var $$6 = require('jquery');
var THREE$1 = require('three');

var Scene = function (_View) {
	inherits(Scene, _View);

	function Scene(options) {
		classCallCheck(this, Scene);
		return possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, View$4.merge({

			// ---------------------------------------------------
			// Local Properties

			camera: {
				fov: 75,
				near: 1,
				far: 100000
			},
			clearColor: 0xffffff,
			clearAlpha: 1,
			geometry: {},
			materials: {},
			meshes: {},
			lights: {},
			shaders: {},
			textures: {},
			isLoaded: false
		}, options)));
	}

	createClass(Scene, [{
		key: 'setup',
		value: function setup() {
			var _this2 = this;

			// console.log( 'Scene::setup' );
			// setup the framework
			this.setupScene(this.options);
			this.setupCamera(this.options);

			// wait until assets are loaded to render the scene
			return this.loadAssets().then(function () {
				_this2.isLoaded = true;
				_this2.trigger('loaded');
				_this2.setupShaders(_this2.options);
				_this2.setupMaterials(_this2.options);
				_this2.setupGeometry(_this2.options);
				_this2.setupMeshes(_this2.options);
				_this2.setupLights(_this2.options);
				_this2.layoutScene(_this2.options);
			});
			// .then( this.onResize );
		}

		// setup scene

	}, {
		key: 'loadAssets',
		value: function loadAssets() {
			var deferred = $$6.Deferred();
			// load stuff in here
			// resolve the deferred when load is complete
			deferred.notify(1);
			deferred.resolve();
			return deferred.promise();
		}
	}, {
		key: 'setupScene',
		value: function setupScene(options) {
			this.scene = new THREE$1.Scene();
			return this;
		}

		// setup camera

	}, {
		key: 'setupCamera',
		value: function setupCamera(options) {
			this.camera = new THREE$1.PerspectiveCamera(options.camera.fov, options.el.innerWidth / options.el.innerHeight, options.camera.near, options.camera.far);
			return this;
		}

		// setup elements

	}, {
		key: 'setupGeometry',
		value: function setupGeometry(options) {
			return this;
		}
	}, {
		key: 'setupMaterials',
		value: function setupMaterials(options) {
			return this;
		}
	}, {
		key: 'setupShaders',
		value: function setupShaders(options) {
			return this;
		}
	}, {
		key: 'setupMeshes',
		value: function setupMeshes(options) {
			return this;
		}
	}, {
		key: 'setupLights',
		value: function setupLights(options) {
			return this;
		}
	}, {
		key: 'layoutScene',
		value: function layoutScene(options) {
			var _this3 = this;

			_$12.each(this.meshes, function (m) {
				return _this3.scene.add(m);
			});
			_$12.each(this.lights, function (l) {
				return _this3.scene.add(l);
			});
			this.camera.position.x = options.camera.position.x;
			this.camera.position.y = options.camera.position.y;
			this.camera.position.z = options.camera.position.z;
			this.camera.lookAt(options.camera.lookAt || this.scene.position);
			return this;
		}
	}, {
		key: 'render',
		value: function render() {
			this.renderer.render();
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			// console.trace( 'Scene onResize' );
			this.renderer.setPixelRatio(window.devicePixelRatio);
			this.camera.aspect = this.width / this.height;
			this.camera.updateProjectionMatrix();
		}
	}, {
		key: 'update',
		value: function update(data) {}
	}]);
	return Scene;
}(View$4);

module.exports = Scene;



var Scene$1 = Object.freeze({

});

var Scene$2 = require('./Scene');
var _$13 = require('lodash');
var THREE$2 = require('three');

var OrthographicScene = function (_Scene) {
	inherits(OrthographicScene, _Scene);

	function OrthographicScene(options) {
		classCallCheck(this, OrthographicScene);
		return possibleConstructorReturn(this, (OrthographicScene.__proto__ || Object.getPrototypeOf(OrthographicScene)).call(this, _$13.merge({
			// ---------------------------------------------------
			// Class Properties

			camera: {
				near: 1,
				far: 10000,
				zoom: 5,
				position: new THREE$2.Vector3(0, 1, -1)
			}
		}, options)));
	}

	createClass(OrthographicScene, [{
		key: 'setupCamera',
		value: function setupCamera(options) {
			this.camera = new THREE$2.OrthographicCamera(options.camera.zoom * -this.halfWidth, // left
			options.camera.zoom * this.halfWidth, // right
			options.camera.zoom * this.halfHeight, // top
			options.camera.zoom * -this.halfHeight, // bottom
			options.camera.near, options.camera.far);

			this.camera.position.x = options.camera.position.x;
			this.camera.position.y = options.camera.position.y;
			this.camera.position.z = options.camera.position.z;
			this.camera.lookAt(options.lookAt || this.scene.position);
			return this;
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			this.camera.left = this.options.camera.zoom * -this.halfWidth;
			this.camera.right = this.options.camera.zoom * this.halfWidth;
			this.camera.top = this.options.camera.zoom * this.halfHeight;
			this.camera.bottom = this.options.camera.zoom * -this.halfHeight;
			this.camera.updateProjectionMatrix();
			return this;
		}
	}]);
	return OrthographicScene;
}(Scene$2);

module.exports = OrthographicScene;



var OrthographicScene$1 = Object.freeze({

});

var OrthographicScene$2 = require('./Orthographic-Scene');
var EffectComposer = require('postprocessing').EffectComposer;
var RenderPass = require('postprocessing').RenderPass;
var _$14 = require('lodash');
var THREE$3 = require('three');

window.THREE = THREE$3;

var PostProcessedOrthographicScene = function (_OrthographicScene) {
	inherits(PostProcessedOrthographicScene, _OrthographicScene);

	function PostProcessedOrthographicScene(options) {
		classCallCheck(this, PostProcessedOrthographicScene);
		return possibleConstructorReturn(this, (PostProcessedOrthographicScene.__proto__ || Object.getPrototypeOf(PostProcessedOrthographicScene)).call(this, OrthographicScene$2.merge({
			// ---------------------------------------------------
			// Class Properties

			camera: {
				fov: 10,
				near: 1,
				far: 100000,
				zoom: 1,
				position: new THREE$3.Vector3(0, 1, -1)
			}
		}, options)));
	}

	createClass(PostProcessedOrthographicScene, [{
		key: 'setup',
		value: function setup() {
			var promise = get(PostProcessedOrthographicScene.prototype.__proto__ || Object.getPrototypeOf(PostProcessedOrthographicScene.prototype), 'setup', this).call(this);
			this.setupRenderChain(this.options);
			return promise;
		}
	}, {
		key: 'setupRenderChain',
		value: function setupRenderChain(options) {
			this.postProcessingPasses = {
				render: new RenderPass(this.scene, this.camera)
			};
			this.composer = new EffectComposer(this.renderer);
			// INITIALIZE COMPOSER w/ RENDER PASS
			this.composer.addPass(this.postProcessingPasses.render);
			return this;
		}
	}, {
		key: 'render',
		value: function render() {
			this.composer.render();
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			get(PostProcessedOrthographicScene.prototype.__proto__ || Object.getPrototypeOf(PostProcessedOrthographicScene.prototype), 'onResize', this).call(this);
			this.composer.setSize(this.width, this.height);
		}
	}]);
	return PostProcessedOrthographicScene;
}(OrthographicScene$2);

module.exports = PostProcessedOrthographicScene;



var PostProcessedOrthographicScene$1 = Object.freeze({

});

var Scene$3 = require('./Scene');
var EffectComposer$1 = require('postprocessing').EffectComposer;
var RenderPass$1 = require('postprocessing').RenderPass;
var _$15 = require('lodash');
var THREE$4 = require('three');

window.THREE = THREE$4;

var PostProcessedScene = function (_Scene) {
	inherits(PostProcessedScene, _Scene);

	function PostProcessedScene(options) {
		classCallCheck(this, PostProcessedScene);
		return possibleConstructorReturn(this, (PostProcessedScene.__proto__ || Object.getPrototypeOf(PostProcessedScene)).call(this, Scene$3.merge({
			// ---------------------------------------------------
			// Class Properties

			camera: {
				fov: 10,
				near: 1,
				far: 100000,
				zoom: 1,
				position: new THREE$4.Vector3(0, 1, -1)
			}
		}, options)));
	}

	createClass(PostProcessedScene, [{
		key: 'setup',
		value: function setup() {
			var promise = get(PostProcessedScene.prototype.__proto__ || Object.getPrototypeOf(PostProcessedScene.prototype), 'setup', this).call(this);
			this.setupRenderChain(this.options);
			return promise;
		}
	}, {
		key: 'setupRenderChain',
		value: function setupRenderChain(options) {
			this.postProcessingPasses = {
				renderPass: new RenderPass$1(this.scene, this.camera, {
					renderToScreen: true
				})
			};
			this.composer = new EffectComposer$1(this.renderer);
			// INITIALIZE COMPOSER w/ RENDER PASS
			this.composer.addPass(this.postProcessingPasses.renderPass);
			return this;
		}
	}, {
		key: 'activatePass',
		value: function activatePass(name) {}
	}, {
		key: 'deactivatePass',
		value: function deactivatePass(name) {}
	}, {
		key: 'render',
		value: function render() {
			this.composer.render();
		}
	}, {
		key: 'onResize',
		value: function onResize() {
			get(PostProcessedScene.prototype.__proto__ || Object.getPrototypeOf(PostProcessedScene.prototype), 'onResize', this).call(this);
			this.composer.setSize(this.width, this.height);
		}
	}]);
	return PostProcessedScene;
}(Scene$3);

module.exports = PostProcessedScene;



var PostProcessedScene$1 = Object.freeze({

});

export { Base$2 as Base, View$1 as View, Page$1 as Page, Model$2 as Model, SocketModel$2 as SocketModel, Collection$2 as Collection, Constants, Validator, prefixmethod, Social, Analytics$1 as Analytics, DataSource$1 as DataSource, MicrophoneDataSource$1 as MicrophoneDataSource, AudioPlayerDataSource$1 as AudioPlayerDataSource, ThreePage, GridPage$1 as GridPage, ThreeView$1 as ThreeView, Scene$1 as Scene, OrthographicScene$1 as OrthographicScene, PostProcessedOrthographicScene$1 as PostprocessedOrthographicScene, PostProcessedScene$1 as PostprocessedScene };
//# sourceMappingURL=index.js.map
