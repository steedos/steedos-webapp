import React from 'react';
import styled from 'styled-components'

// require('./wrap.css');
// require('./style.css');

const STATS = {
  init: '',
  pulling: 'pulling',
  enough: 'pulling enough',
  refreshing: 'refreshing',
  refreshed: 'refreshed',
  reset: 'reset',

  loading: 'loading', // loading more
};

// 拖拽的缓动公式 - easeOutSine
function easing(distance) {
  // t: current time, b: begInnIng value, c: change In value, d: duration
  const t = distance;
  const b = 0;
  const d = window.screen.availHeight; // 允许拖拽的最大距离
  const c = d / 2.5; // 提示标签最大有效拖拽距离

  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}


let PullableContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  background-color: #efeff4;
  display: flex;
  flex-direction: column;

  .tloader-msg:after {
    content: "下拉刷新";
  }
  .state-pulling.enough .tloader-msg:after {
    content: "松开刷新";
  }
  .state-refreshed .tloader-msg:after {
    content: "刷新成功";
  }
  .tloader-loading:after {
    content: "正在加载...";
  }
  .tloader-symbol .tloader-loading:after {
    content: "正在刷新...";
  }
  .tloader-btn:after {
    content: "点击加载更多";
  }
  .tloader {
    position: relative;
    font-size: 14px;
  }
  .state-pulling {
    overflow-y: hidden !important;
  }
  .tloader-symbol {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    color: #7676a1;
    text-align: center;
    height: 48px;
    overflow: hidden;
  }
  .state- .tloader-symbol,
  .state-reset .tloader-symbol {
    height: 0;
  }
  .state-reset .tloader-symbol {
    transition: height 0s 0.2s;
  }
  .state-loading .tloader-symbol {
    display: none;
  }
  .tloader-msg {
    line-height: 48px;
  }
  .state-pulling .tloader-msg i,
  .state-reset .tloader-msg i {
    display: inline-block;
    font-size: 2em;
    margin-right: 0.6em;
    vertical-align: middle;
    height: 1em;
    border-left: 1px solid;
    position: relative;
    transition: transform 0.3s ease;
  }
  .state-pulling .tloader-msg i:before,
  .state-reset .tloader-msg i:before,
  .state-pulling .tloader-msg i:after,
  .state-reset .tloader-msg i:after {
    content: "";
    position: absolute;
    font-size: 0.5em;
    width: 1em;
    bottom: 0px;
    border-top: 1px solid;
  }
  .state-pulling .tloader-msg i:before,
  .state-reset .tloader-msg i:before {
    right: 1px;
    transform: rotate(50deg);
    transform-origin: right;
  }
  .state-pulling .tloader-msg i:after,
  .state-reset .tloader-msg i:after {
    left: 0px;
    transform: rotate(-50deg);
    transform-origin: left;
  }
  .state-pulling.enough .tloader-msg i {
    transform: rotate(180deg);
  }
  .state-refreshing .tloader-msg {
    height: 0;
    opacity: 0;
  }
  .state-refreshed .tloader-msg {
    opacity: 1;
    transition: opacity 1s;
  }
  .state-refreshed .tloader-msg i {
    display: inline-block;
    box-sizing: content-box;
    vertical-align: middle;
    margin-right: 10px;
    font-size: 20px;
    height: 1em;
    width: 1em;
    border: 1px solid;
    border-radius: 100%;
    position: relative;
  }
  .state-refreshed .tloader-msg i:before {
    content: "";
    position: absolute;
    top: 3px;
    left: 7px;
    height: 11px;
    width: 5px;
    border: solid;
    border-width: 0 1px 1px 0;
    transform: rotate(40deg);
  }
  .tloader-body {
    margin-top: -1px;
    padding-top: 1px;
  }
  .state-refreshing .tloader-body {
    transform: translate3d(0, 48px, 0);
    transition: transform 0.2s;
  }
  .state-refreshed .tloader-body {
    animation: refreshed 0.4s;
  }
  .state-reset .tloader-body {
    transition: transform 0.2s;
  }
  @keyframes refreshed {
    0% {
      transform: translate3d(0, 48px, 0);
    }
    50% {
      transform: translate3d(0, 48px, 0);
    }
  }
  .state-refreshing .tloader-footer {
    display: none;
  }
  .tloader-footer .tloader-btn {
    color: #484869;
    text-align: center;
    line-height: 48px;
  }
  .state-loading .tloader-footer .tloader-btn {
    display: none;
  }
  .tloader-loading {
    display: none;
    text-align: center;
    line-height: 48px;
    color: #7676a1;
  }
  .tloader-loading .ui-loading {
    font-size: 20px;
    margin-right: 9px;
  }
  .state-refreshing .tloader-symbol .tloader-loading,
  .state-loading .tloader-footer .tloader-loading {
    display: block;
  }
  @keyframes circle {
    100% {
      transform: rotate(360deg);
    }
  }
  .ui-loading {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    width: 1em;
    height: 1em;
    border: 2px solid #9494b6;
    border-top-color: rgba(255, 255, 255, 0.4);
    border-radius: 100%;
    animation: circle 0.8s infinite linear;
  }
  #ui-waiting .ui-loading {
    border: 2px solid #fff;
    border-top-color: #9494b6;
  }
  @keyframes tloader-progressing {
    0% {
      width: 0;
    }
    10% {
      width: 40%;
    }
    20% {
      width: 75%;
    }
    30% {
      width: 95%;
    }
  }
  @keyframes tloader-progressed {
    0% {
      opacity: 1;
    }
  }
  .tloader-progress {
    position: relative;
  }
  .tloader-progress:before {
    content: "";
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    background-color: #08bf06;
    width: 99%;
    animation: tloader-progressing 9s ease-out;
  }
  .ed.tloader-progress:before {
    opacity: 0;
    width: 100%;
    animation: tloader-progressed 1s;
  }
`;

let PullableScroller = styled.div`
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  
`;

// pull to refresh
// tap bottom to load more
class Tloader extends React.Component {
  state = {
    loaderState: STATS.init,
    pullHeight: 0,
    progressed: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initializing < 2) {
      this.setState({
        progressed: 0, // reset progress animation state
      });
    }
  }

  setInitialTouch(touch) {
    this.initialTouch = {
      clientY: touch.clientY,
    };
  }

  touchStart = (e) => {
    if (!this.canRefresh()) return;
    if (e.touches.length === 1) {
      const { panel } = this;
      this.initialTouch = {
        clientY: e.touches[0].clientY,
        scrollTop: panel.scrollTop,
      };
    }
  }

  touchMove = (e) => {
    if (!this.canRefresh()) return;
    const { panel } = this;
    const { distanceToRefresh } = this.props;
    const { scrollTop } = panel;
    const distance = this.calculateDistance(e.touches[0]);

    if (distance > 0 && scrollTop <= 0) {
      let pullDistance = distance - this.initialTouch.scrollTop;
      if (pullDistance < 0) {
        // 修复 webview 滚动过程中 touchstart 时计算panel.scrollTop不准
        pullDistance = 0;
        this.initialTouch.scrollTop = distance;
      }
      const pullHeight = easing(pullDistance);
      if (pullHeight) e.preventDefault();// 减弱滚动

      this.setState({
        loaderState: pullHeight > distanceToRefresh ? STATS.enough : STATS.pulling,
        pullHeight,
      });
    }
  }

  touchEnd = () => {
    if (!this.canRefresh()) return;
    const endState = {
      loaderState: STATS.reset,
      pullHeight: 0,
    };

    if (this.state.loaderState === STATS.enough) {
      // refreshing
      this.setState({
        loaderState: STATS.refreshing,
        pullHeight: 0,
      });

      // trigger refresh action
      this.props.onRefresh(() => {
        // resolve
        this.setState({
          loaderState: STATS.refreshed,
          pullHeight: 0,
        });
      }, () => {
        // reject
        this.setState(endState);// reset
      });
    } else this.setState(endState);// reset
  }

  loadMore = () => {
    this.setState({ loaderState: STATS.loading });
    this.props.onLoadMore(() => {
      // resolve
      this.setState({ loaderState: STATS.init });
    });
  }

  scroll = (e) => {
    if (
      this.props.autoLoadMore
      && this.props.hasMore
      && this.state.loaderState !== STATS.loading
    ) {
      const panel = e.currentTarget;
      const scrollBottom = panel.scrollHeight - panel.clientHeight - panel.scrollTop;

      if (scrollBottom < 5) this.loadMore();
    }
  }

  animationEnd = () => {
    const newState = {};

    if (this.state.loaderState === STATS.refreshed) newState.loaderState = STATS.init;
    if (this.props.initializing > 1) newState.progressed = 1;

    this.setState(newState);
  }

  calculateDistance(touch) {
    return touch.clientY - this.initialTouch.clientY;
  }

  canRefresh() {
    const { onRefresh } = this.props;
    const { loaderState } = this.state;
    return onRefresh && [STATS.refreshing, STATS.loading].indexOf(loaderState) < 0;
  }

  initialTouch

  render() {
    const {
      children, className, hasMore, initializing,
    } = this.props;
    const { loaderState, pullHeight, progressed } = this.state;

    const footer = hasMore ? (
      <div className="tloader-footer">
        <div className="tloader-btn" onClick={this.loadMore} />
        <div className="tloader-loading"><i className="ui-loading" /></div>
      </div>
    ) : null;

    const style = pullHeight ? {
      WebkitTransform: `translate3d(0,${pullHeight}px,0)`,
    } : null;

    let progressClassName = '';
    if (!progressed) {
      if (initializing > 0) progressClassName += ' tloader-progress';
      if (initializing > 1) progressClassName += ' ed';
    }

    return (
      <PullableContainer>
        <PullableScroller
          ref={(el) => { this.panel = el; }}
          className={`tloader state-${loaderState} ${className}${progressClassName}`}
          onScroll={this.scroll}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          onAnimationEnd={this.animationEnd}
        >

          <div className="tloader-symbol">
            <div className="tloader-msg"><i /></div>
            <div className="tloader-loading"><i className="ui-loading" /></div>
          </div>
          <div className="tloader-body" style={style}>{children}</div>
          {footer}
        </PullableScroller>
      </PullableContainer>
    );
  }
}

Tloader.defaultProps = {
  distanceToRefresh: 60,
  autoLoadMore: 1,
};

export default Tloader;
