###view

最基本的场景称为view

view有自己的数据，同时接收来自main的用户操作和socket连接数据并响应

view有gl和dom两种

gl为核心部分，dom view用于强化显示和部分选择交互

gl view有如下部分：

* base -> 负责基本场景的构建，以及摄影机的控制
* controller -> 负责用户操作的响应（操作与gl场景内物件的交互）
* objects -> 负责场景内物体的定义，包括各种状态下的显示，但不包含运行时信息
* game -> 储存当前view的数据
* network -> 负责连接至后端的socket通信

切换gl view时， main切换其当前持有的base、controller和network，renderer随之变更渲染的场景，由当前view处理输入信息。以及在必要时对objects和game的数据进行初始化

dom view用vue作为交互，views统一置于页面文档的一个容器中

构建domBus控制全部的dom view的显示和数据，以及统一的消息处理中心

（考虑分割实例的优劣，在更优的情况下对domBus方法进行替换）

dom view的渲染即html元素渲染，数据保存在vue实例的data中，network与gl一样在切换时传入，通过事件监听实现操作处理

### dom view与gl view之间的交互

两种view结构不同

通信交由main进行中转

gl view中各个单元除之间存在观察连接外，其父级（view本身）也存在观察连接

与gl view相关的dom view会在初始化时互相注册观察连接

当gl view需要在dom view中显示数据时，某个单元将事件传递至view，view随即转发至dom view，dom view处理并响应

当响应为socket回应时，dom直接操作network与后端通信

如响应需要gl view回显，则事件反向传播，gl view通知指定单元进行处理

### main

main为程序入口

加载类库后创建gl renderer，socket，以及在document上绑定输入事件

之后加载各个view并构建view之间的联系