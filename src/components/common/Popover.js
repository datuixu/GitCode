'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Animated,
    Text,
    TouchableWithoutFeedback,
    View,
    Easing,
    ViewPropTypes
} from 'react-native';

import PropTypes from 'prop-types';

var noop = () => {};

var {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
var DEFAULT_ARROW_SIZE = new Size(10, 5);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}
let self
export default class Popover extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func,
    contentStyle:ViewPropTypes.style,
  }
  constructor(props) {
    super(props);
    this.state = {
      contentSize: {},
      anchorPoint: {},
      popoverOrigin: {},
      placement: 'auto',
      isTransitioning: false,
      defaultAnimatedValues: {
        scale: new Animated.Value(0),
        translate: new Animated.ValueXY(),
        fade: new Animated.Value(0),
      }
    };
    self = this
  }
  static defaultProps = {
    isVisible: false,
    displayArea: new Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT),
    arrowSize: DEFAULT_ARROW_SIZE,
    placement: 'auto',
    onClose: noop,
  }
  measureContent(x) {
    var {width, height} = x.nativeEvent.layout;
    var contentSize = {width, height};
    var geom = self.computeGeometry({contentSize});

    var isAwaitingShow = self.state.isAwaitingShow;
    self.setState(Object.assign(geom,
        {contentSize, isAwaitingShow: undefined}), () => {
      // Once state is set, call the showHandler so it can access all the geometry
      // from the state
      isAwaitingShow && self._startAnimation({show: true});
    });
  }
  computeGeometry({contentSize, placement}) {
    placement = placement || self.props.placement;

    var options = {
      displayArea: self.props.displayArea,
      fromRect: self.props.fromRect,
      arrowSize: self.getArrowSize(placement),
      contentSize,
    }

    switch (placement) {
      case 'top':
        return self.computeTopGeometry(options);
      case 'bottom':
        return self.computeBottomGeometry(options);
      case 'left':
        return self.computeLeftGeometry(options);
      case 'right':
        return self.computeRightGeometry(options);
      default:
        return self.computeAutoGeometry(options);
    }
  }
  computeTopGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    var popoverOrigin = new Point(
        Math.min(displayArea.x + displayArea.width - contentSize.width,
            Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
        fromRect.y - contentSize.height - arrowSize.height);
    var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'top',
    }
  }
  computeBottomGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    var popoverOrigin = new Point(
        Math.min(displayArea.x + displayArea.width - contentSize.width,
            Math.max(displayArea.x, fromRect.x + (fromRect.width - contentSize.width) / 2)),
        fromRect.y + fromRect.height + arrowSize.height);
    var anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'bottom',
    }
  }
  computeLeftGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    var popoverOrigin = new Point(fromRect.x - contentSize.width - arrowSize.width,
        Math.min(displayArea.y + displayArea.height - contentSize.height,
            Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)));
    var anchorPoint = new Point(fromRect.x, fromRect.y + fromRect.height / 2.0);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'left',
    }
  }
  computeRightGeometry({displayArea, fromRect, contentSize, arrowSize}) {
    var popoverOrigin = new Point(fromRect.x + fromRect.width + arrowSize.width,
        Math.min(displayArea.y + displayArea.height - contentSize.height,
            Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)));
    var anchorPoint = new Point(fromRect.x + fromRect.width, fromRect.y + fromRect.height / 2.0);

    return {
      popoverOrigin,
      anchorPoint,
      placement: 'right',
    }
  }
  computeAutoGeometry({displayArea, contentSize}) {
    var placementsToTry = ['left', 'right', 'bottom', 'top'];

    for (var i = 0; i < placementsToTry.length; i++) {
      var placement = placementsToTry[i];
      var geom = self.computeGeometry({contentSize: contentSize, placement: placement});
      var {popoverOrigin} = geom;

      if (popoverOrigin.x >= displayArea.x
          && popoverOrigin.x <= displayArea.x + displayArea.width - contentSize.width
          && popoverOrigin.y >= displayArea.y
          && popoverOrigin.y <= displayArea.y + displayArea.height - contentSize.height) {
        break;
      }
    }

    return geom;
  }
  getArrowSize(placement) {
    var size = self.props.arrowSize;
    switch(placement) {
      case 'left':
      case 'right':
        return new Size(size.height, size.width);
      default:
        return size;
    }
  }
  getArrowColorStyle(color) {
    return { borderTopColor: color };
  }
  getArrowRotation(placement) {
    switch (placement) {
      case 'bottom':
        return '180deg';
      case 'left':
        return '-90deg';
      case 'right':
        return '90deg';
      default:
        return '0deg';
    }
  }
  getArrowDynamicStyle() {
    var {anchorPoint, popoverOrigin} = self.state;
    var arrowSize = self.props.arrowSize;

    // Create the arrow from a rectangle with the appropriate borderXWidth set
    // A rotation is then applied dependending on the placement
    // Also make it slightly bigger
    // to fix a visual artifact when the popover is animated with a scale
    var width = arrowSize.width + 2;
    var height = arrowSize.height * 2 + 2;

    return {
      left: anchorPoint.x - popoverOrigin.x - width / 2,
      top: anchorPoint.y - popoverOrigin.y - height / 2,
      width: width,
      height: height,
      borderTopWidth: height / 2,
      borderRightWidth: width / 2,
      borderBottomWidth: height / 2,
      borderLeftWidth: width / 2,
    }
  }
  getTranslateOrigin() {
    var {contentSize, popoverOrigin, anchorPoint} = self.state;
    var popoverCenter = new Point(popoverOrigin.x + contentSize.width / 2,
        popoverOrigin.y + contentSize.height / 2);
    return new Point(anchorPoint.x - popoverCenter.x, anchorPoint.y - popoverCenter.y);
  }
  componentWillReceiveProps(nextProps) {
    var willBeVisible = nextProps.isVisible;
    var {
        isVisible,
    } = self.props;

    if (willBeVisible !== isVisible) {
      if (willBeVisible) {
        // We want to start the show animation only when contentSize is known
        // so that we can have some logic depending on the geometry
        self.setState({contentSize: {}, isAwaitingShow: true});
      } else {
        self._startAnimation({show: false});
      }
    }
  }
  _startAnimation({show}) {
    var handler = self.props.startCustomAnimation || self._startDefaultAnimation;
    handler({show, doneCallback: () => self.setState({isTransitioning: false})});
    self.setState({isTransitioning: true});
  }
  _startDefaultAnimation({show, doneCallback}) {
    var animDuration = 300;
    var values = self.state.defaultAnimatedValues;
    var translateOrigin = self.getTranslateOrigin();

    if (show) {
      values.translate.setValue(translateOrigin);
    }

    var commonConfig = {
      duration: animDuration,
      easing: show ? Easing.out(Easing.back()) : Easing.inOut(Easing.quad),
    }

    Animated.parallel([
      Animated.timing(values.fade, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      }),
      Animated.timing(values.translate, {
        toValue: show ? new Point(0, 0) : translateOrigin,
        ...commonConfig,
      }),
      Animated.timing(values.scale, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      })
    ]).start(doneCallback);
  }
  _getDefaultAnimatedStyles() {
    // If there's a custom animation handler,
    // we don't return the default animated styles
    if (typeof self.props.startCustomAnimation !== 'undefined') {
      return null;
    }

    var animatedValues = self.state.defaultAnimatedValues;

    return {
      backgroundStyle: {
        opacity: animatedValues.fade,
      },
      arrowStyle: {
        transform: [
          {
            scale: animatedValues.scale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }
        ],
      },
      contentStyle: {
        transform: [
          {translateX: animatedValues.translate.x},
          {translateY: animatedValues.translate.y},
          {scale: animatedValues.scale},
        ],
      }
    };
  }
  _getExtendedStyles() {
    var background = [];
    var popover = [];
    var arrow = [];
    var content = [];

    [self._getDefaultAnimatedStyles(), self.props].forEach((source) => {
      if (source) {
        background.push(source.backgroundStyle);
        popover.push(source.popoverStyle);
        arrow.push(source.arrowStyle);
        content.push(source.contentStyle);
      }
    });

    return {
      background,
      popover,
      arrow,
      content,
    }
  }
  render() {
    if (!self.props.isVisible && !self.state.isTransitioning) {
      return null;
    }

    var {popoverOrigin, placement} = self.state;
    var extendedStyles = self._getExtendedStyles();
    var contentStyle = [styles.content, ...extendedStyles.content];
    var arrowColor = StyleSheet.flatten(contentStyle).backgroundColor;
    var arrowColorStyle = self.getArrowColorStyle(arrowColor);
    var arrowDynamicStyle = self.getArrowDynamicStyle();
    var contentSizeAvailable = self.state.contentSize.width;

    // Special case, force the arrow rotation even if it was overriden
    var arrowStyle = [styles.arrow, arrowDynamicStyle, arrowColorStyle, ...extendedStyles.arrow];
    var arrowTransform = (StyleSheet.flatten(arrowStyle).transform || []).slice(0);
    arrowTransform.unshift({rotate: self.getArrowRotation(placement)});
    arrowStyle = [...arrowStyle, {transform: arrowTransform}];
    var contentMarginRight=self.props.contentMarginRight? self.props.contentMarginRight:0;
    return (
        <TouchableWithoutFeedback onPress={self.props.onClose}>
          <View style={[styles.container, contentSizeAvailable && styles.containerVisible ]}>
            <Animated.View style={[styles.background, ...extendedStyles.background]}/>
            <Animated.View style={[styles.popover, {
              top: popoverOrigin.y,
              left: popoverOrigin.x-contentMarginRight,
            }, ...extendedStyles.popover]}>
              <Animated.View style={arrowStyle}/> 
              <Animated.View ref='content' onLayout={self.measureContent} style={[contentStyle,self.props.contentStyle,]}>
                {this.props.children}
              </Animated.View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
    );
  }
};


var styles = StyleSheet.create({
  container: {
    opacity: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  containerVisible: {
    opacity: 1,
  },
  background: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    //隐藏背景 backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popover: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  content: {
    borderRadius: 3,
    padding: 6,
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  arrow: {
    position: 'absolute',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});


