/*
生命周期：
挂载
constructor
static getDerivedStateFromProps(props, state) // 是一个静态方法，需要 static, 可直接替代 componentWillMount
// componentWillMount （unsafe）
render
componentDidMount

更新
static getDerivedStateFromProps
// componentWillReceiveProps （unsafe）
shouldComponentUpdate
// componentWillUpdate （unsafe）
render
getSnapshotBeforeUpdate
componentDidUpdate

卸载
componentWillUnmount
*/

import { Input } from "antd";
import React from "react";

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    // 建议使用 constructor() 来初始化 state
    this.state = { value: "" };
  }

  // componentWillMount 因为有可能导致重复执行，在16版本丢弃，改用getDerivedStateFromProps
  static getDerivedStateFromProps(props, state) {
    // 在render之前调用。
    // getDerivedStateFromProps 的存在只有一个目的：让组件在 props 变化时更新 state。
    // 静态方法，不应该再这里访问this。
    // 该函数应该是纯函数，不应该改变外部状态。
    return {
      value: props.value.join(),
    };
    // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
  }

  render() {
    return (
      <input
        value={this.state.value}
        // react 若要实现 vue 的 v-model，需要绑定value值为state的值，更新value需要手动setState，发送value给父组件需要借助props
        onChange={(e) => {
          // this.setState({ value: e.target.value });
          // this.props.onChange(e.target.value.split(","));
        }}
      />
    );
  }
  componentDidMount() {
    // 会在组件挂载后（插入 DOM 树中）立即调用。
    // 如需通过网络请求获取数据，此处是实例化请求的好地方。
  }

  shouldComponentUpdate(newProps, newState) {
    /*
    此方法仅作为性能优化的方式而存在。
    不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。
    你应该考虑使用内置的 PureComponent 组件，而不是手动编写 shouldComponentUpdate()
    */

    // 两个参数是新修改的props和state
    console.log(this.props, this.state); // 旧值
    console.log(newProps, newState); // 新值
    // 不建议在 shouldComponentUpdate() 中进行深层比较或使用 JSON.stringify()。这样非常影响效率，且会损害性能。

    // 根据返回值决定，true表示需要更新组件。false表示不需要更新组件，但是不能阻止子组件更新。
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 该函数可以读取DOM的一些信息（例如滚动位置）
    // 应返回 snapshot 的值（或 null）,将作为参数传递给 componentDidUpdate()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
}

export default MyInput;
