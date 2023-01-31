import "./checkbox-list.scss";
import { Checkbox, Col, Row, Input, Popover, Button, Pagination } from "antd";
import React from "react";
const CheckboxGroup = Checkbox.Group;
class CheckboxList extends React.Component {
  constructor(props) {
    super(props);
    this.label = props.label;
    this.options = props.options.map((v, i) => {
      return {
        ...v,
        showInPage: i < this.PAGE_SIZE,
        showIsSearch: false,
      };
    });
    this.before = props.before;
    this.after = props.after;
    this.state = {
      checkList: props.value,
      pageIndex: 0,
      searchText: "",
      showTotal: this.options.length,
    };
  }
  static getDerivedStateFromProps(props, state) {
    // console.log(props, state);
    return null;
    // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
  }
  PAGE_SIZE = 40;
  options = [];
  searchResult = [];
  componentDidMount() {
    // 组件已经被渲染到 DOM 中后运行
    console.log("mounted");
  }
  onChange = (value) => {
    console.log(value);
    this.setState({ checkList: value });
    this.props.onChange(value); // 不要把this.state.checkList 发送出去，因为它不是实时的。
  };
  clearSelected() {
    this.onChange([]);
  }
  searchInput(value, index) {
    const searchText = value.trim().toLowerCase();
    this.searchResult = this.options.filter((v) => {
      v.showIsSearch = false;
      return v.label.includes(searchText);
    });
    this.searchResult.forEach((v, i) => {
      if (this.PAGE_SIZE * index <= i && i < (index + 1) * this.PAGE_SIZE) {
        v.showIsSearch = true;
      } else {
        v.showIsSearch = false;
      }
    });
    this.setState({ searchText: value, showTotal: this.searchResult.length });
  }
  selectedCurrentPage() {
    let searchMode = this.state.searchText.trim() ? true : false;
    let currentPageFirstIndex = this.state.pageIndex * this.PAGE_SIZE;
    let currentPageLastIndex = (this.state.pageIndex + 1) * this.PAGE_SIZE;
    const selected = [];
    if (searchMode) {
      this.searchResult.forEach((v, i) => {
        if (currentPageFirstIndex <= i && i < currentPageLastIndex) {
          if (v) {
            selected.push(v.value);
          }
        }
      });
    } else {
      for (let index = currentPageFirstIndex; index < this.PAGE_SIZE * (this.state.pageIndex + 1); index++) {
        if (this.options[index]) {
          selected.push(this.options[index].value);
        }
      }
    }
    this.onChange(Array.from(new Set([...this.state.checkList, ...selected])));
  }
  jumpToPage(newIndex) {
    let prevStartIndex = this.state.pageIndex * this.PAGE_SIZE;
    for (let index = prevStartIndex; index < this.PAGE_SIZE * (this.state.pageIndex + 1); index++) {
      if (this.options[index]) {
        this.options[index].showInPage = false;
      }
    }
    let nextStartIndex = newIndex * this.PAGE_SIZE;
    for (let index = nextStartIndex; index < this.PAGE_SIZE * (newIndex + 1); index++) {
      if (this.options[index]) {
        this.options[index].showInPage = true;
      }
    }
  }
  getCheckboxGroup() {
    let pageCount = 0;
    let searchMode = this.state.searchText.trim() ? true : false;
    return (
      <div>
        <div className="tps-checkbox-header">
          <Input
            allowClear
            placeholder="请输入搜索内容"
            style={{ width: "240px" }}
            value={this.state.searchText}
            onChange={(e) => {
              this.jumpToPage(1);
              this.searchInput(e.target.value, 0);
            }}
          ></Input>
          <Button onClick={() => this.clearSelected()}>清除</Button>
          <Button type="primary" onClick={() => this.selectedCurrentPage()}>
            全选当前页
          </Button>
        </div>
        <CheckboxGroup style={{ width: "500px" }} value={this.state.checkList} onChange={this.onChange}>
          <Row>
            {this.options.map((v) => {
              let display = "";
              if (searchMode) {
                display = v.showIsSearch ? "block" : "none";
              } else {
                display = v.showInPage ? "block" : "none";
              }
              if (display === "block") {
                pageCount++;
              }
              if (pageCount > this.PAGE_SIZE) {
                display = "none";
              }
              return (
                <Col key={v.value} span={6} style={{ display: display }}>
                  <Checkbox value={v.value}>{v.label}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </CheckboxGroup>
        <Pagination
          size="small"
          pageSize={this.PAGE_SIZE}
          showSizeChanger={false}
          total={this.state.showTotal}
          onChange={(current) => {
            this.setState({ pageIndex: current - 1 });
            if (searchMode) {
              this.searchInput(null, current - 1);
            } else {
              this.jumpToPage(current - 1);
            }
          }}
        />
      </div>
    );
  }

  selectBefore = () => {
    return null;
  };
  selectAfter = () => {
    return null;
  };
  render() {
    // 为什么react会运行两次render
    const content = this.getCheckboxGroup();
    console.log(this.options);
    return (
      <Popover content={content} trigger="click" overlayClassName="tps-popover">
        <Input
          className="tps-checkbox"
          style={{ width: "300px" }}
          addonBefore={this.before ? this.selectBefore : this.label}
          addonAfter={this.after ? this.selectAfter : this.state.checkList.length + "项"}
          value={this.state.checkList}
        />
      </Popover>
    );
  }
}

export default CheckboxList;
