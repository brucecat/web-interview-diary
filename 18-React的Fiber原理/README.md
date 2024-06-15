React 的 Fiber 架构是其核心算法的一部分，用于协调和渲染组件。Fiber 节点代表了 React 组件的实例，每个 Fiber 节点都包含了一些关键属性，用于管理组件的生命周期、状态和渲染过程。以下是一些主要的 Fiber 节点属性及其作用：

tag:

表示节点的类型，例如函数组件、类组件、HostComponent（原生DOM节点）等。
key:

唯一标识符，用于帮助 React 识别哪些元素是不同的，从而进行正确的更新。
elementType:

表示组件的类型，可以是函数、类或者React内置的组件等。
type:

当前节点的组件类型，可能是函数组件、类组件等。
stateNode:

对应于组件实例，对于类组件，它指向的是类实例；对于函数组件，它可能指向一个 null 值或者关联的 context 对象。
return:

指向返回Fiber节点的引用，用于构建从子到父的链表。
child:

指向子Fiber节点的引用，用于构建从父到子的链表。
sibling:

指向兄弟Fiber节点的引用，用于构建同级节点的链表。
index:

在父数组中的位置索引。
props:

当前Fiber节点的props。
memoizedProps:

缓存的props，用于比较和避免不必要的重新渲染。
updateQueue:

存储状态更新和回调的队列。
memoizedState:

缓存的状态，用于比较和避免不必要的重新渲染。
ref:

相关的ref对象或函数。
alternate:

双缓冲机制中的另一个Fiber节点，用于实现高效的组件更新。
effectTag:

表示Fiber节点的副作用类型，例如更新、放置、删除等。
nextEffect:

指向下一个具有副作用的Fiber节点的引用。
firstEffect 和 lastEffect:

用于管理Fiber树中具有副作用的节点的链表。
expirationTime:

表示Fiber节点更新的优先级，用于协调并发渲染。
childExpirationTime:

子节点的过期时间。
onReconciliation:

用于调试目的，记录当前Fiber节点的协调状态。