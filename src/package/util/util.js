/**
 *
 * @param {PointerEvent} e
 * @param {[{content: string, callback: function]} items
 */
export function createMenuContent(e, items) {
  e.preventDefault();
  const div = document.createElement("div");
  div.className = "menu-mask-wrap";
  const style = document.createElement("style");
  let menuItemStr = ``;
  items.forEach((item) => (menuItemStr += `<div class="menu-item">${item.content}</div>`));
  div.innerHTML = `
  <div class="menu-content">
    ${menuItemStr}  
  </div>
  `;
  style.innerHTML = `
  .menu-mask-wrap {
  position: fixed;
  z-index: 9999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.menu-content {
  position: fixed;
  top: ${e.pageY}px;
  left: ${e.pageX}px;
  width: 100px;
  background: #eeeeee;
  border: 1px solid #ddd;
  box-shadow: 4px 4px 7px 0px #999;
}

.menu-content .menu-item {
  padding: 2px 10px;
  cursor: pointer;
}

.menu-content .menu-item:hover {
  background: #e5f7ff;
}
  `;

  const close = () => {
    document.body.removeChild(div);
    document.body.removeChild(style);
  };
  div.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.getAttribute("class").includes("menu-mask-wrap")) {
      close();
    }
  });
  div.oncontextmenu = (e) => e.preventDefault();
  const menuItems = div.querySelectorAll(".menu-item");
  menuItems.forEach((v, i) => {
    v.onclick = (e) => {
      items[i].callback(e);
      close();
    };
  }, true);
  document.body.appendChild(style);
  document.body.appendChild(div);
}

export function dragInit(wrapCls) {
  let doc;
  const items = document.querySelectorAll(".drag-wrap .drag-item");
  const triggers = document.querySelectorAll(".drag-wrap .drag-trigger");
  let curDragNode = null;
  for (const trigger of triggers) {
    trigger.setAttribute("draggable", true);
    trigger.ondragleave = (e) => {
      let target = getAncestorDom(trigger, "drag-item", "drag-wrap");
      if (target) {
        target.style.opacity = "1";
      }
    };
    trigger.ondragover = (e) => {
      e.preventDefault();
      let target = getAncestorDom(trigger, "drag-item", "drag-wrap");
      if (target) {
        target.style.opacity = "0.5";
      }
    };
    trigger.ondragstart = (e) => {
      let target = getAncestorDom(trigger, "drag-item", "drag-wrap");
      if (target) {
        curDragNode = target;
        target.style.opacity = "0.5";
      }
    };
    trigger.ondragend = (e) => {
      let target = getAncestorDom(trigger, "drag-item", "drag-wrap");
      if (target) {
        curDragNode = trigger;
        target.style.opacity = "1";
      }
    };
    trigger.ondrop = (e) => {
      let target = getAncestorDom(trigger, "drag-item", "drag-wrap");
      let wrap = getAncestorDom(curDragNode, "drag-wrap");
      let children = wrap.querySelectorAll(".drag-trigger");
      let dropTrigger = getAncestorDom(e.target, "drag-trigger");
      let drop = false;
      children.forEach((v) => {
        if (v === dropTrigger) {
          drop = true;
        }
      });
      if (!drop) {
        console.log("不允许跃出最近的drag-wrap");
        return;
      }
      if (target) {
        // e.target 是 被放置的元素
        // curDragNode 是拖动的元素
        if (curDragNode !== null && curDragNode !== target) {
          target.style.opacity = "0.5";
          let div = document.createElement("div");
          curDragNode.parentNode.insertBefore(div, curDragNode);
          target.parentNode.insertBefore(curDragNode, target);
          div.parentNode.replaceChild(target, div);
          target.style.opacity = "1";
        }
      }
    };
  }
}

/**
 *
 * @param {DOM} dom 需要寻找祖先节点的DOM节点
 * @param {string} cls 祖先节点类名
 * @returns DOM || {}
 */
export function getAncestorDom(dom, cls, limit) {
  if (dom.parentNode) {
    let str = dom.parentNode.getAttribute("class") || "";
    if (str.includes(cls)) {
      return dom.parentNode;
    } else if (str.includes(limit)) {
      return null;
    } else {
      return getAncestorDom(dom.parentNode, cls, limit);
    }
  } else {
    return null;
  }
}

/**
 *
 * @returns string
 */
export function getUniqueId() {
  // 不严谨
  let id = new Date().getTime();
  let rand = Math.random().toString().substring(2, 5);
  return id + rand;
}

/**
 *
 * @param {*} state
 * @param {*} path
 * @returns
 */
export function pathToState(state, path) {
  let obj = {};
  let curState; // 根据path 取到 state 对象的数组值
  let length = 0;
  const p = path.split(".");
  p.forEach((v) => {
    curState = curState ? curState[v] : state[v];
  });
  for (const key in p) {
    if (Object.hasOwnProperty.call(p, key)) {
      const value = p[key];
      obj[key] = value;
      length++;
    }
  }
  return {
    ...obj,
    length: length,
    value: curState,
  };
}

export function updateFile(path, str) {
  // fs.access(path, (err) => {
  //   if (err) {
  //     throw "文件不存在";
  //   } else {
  //     fs.writeFile(path, str, (err) => {
  //       if (err) {
  //         throw "写入文件出错";
  //       } else {
  //         return "success";
  //       }
  //     });
  //   }
  // });
}
