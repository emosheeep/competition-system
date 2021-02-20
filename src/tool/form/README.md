# SearchForm 搜索表单

当前业务中，搜索框出现频率极高，几乎和表格同时出现。很多时候多页面复用同一个搜索框，因此需要一套方案来管理搜索框，以便代码可以高效复用。`SearchForm`提供了配置化的表单创建方式。

## 表格信息

### 参数

| 参数      | 说明                                     | 默认值 |
| --------- | ---------------------------------------- | ------ |
| options   | OptionSchema[] (必选) 表格核心配置       | 无     |
| immediate | Boolean 为true时会在初始化完毕后立即触发一次search事件，并且当options变化时仍然会触发 | false  |
| loading   | Boolean 搜索按钮的loading效果            | false  |
| matcher  | Function 用于匹配组件                    | noop |

### OptionSchema

为了方便称呼，label、key、default、mapper、rules、toQuery、component这些称为表单配置项；props、attrs、on、nativeOn等等这些称为组件配置项。
实际上除表单配置项外全部为组件配置项，它们将作为第二个参数被传入createElement。

| 参数      | 说明                                                         | 默认值 |
| --------- | ------------------------------------------------------------ | ------ |
| label     | (必填)String｜Object，为Object时，其结构也为OptionSchema，其他见备注 | 无     |
| key       | (必填)String                                                 | false  |
| default   | (必填)当前字段的初始化值，如果为函数将会传入$route.query, 如果当前环境不存在$route则传一个空对象。这意味着你可以通过query来初始化。 | false  |
| rules     | async-validator的选项，支持校验，如果为一个函数，则直接视为validator函数 | 无  |
| mapper    | Boolean｜Function 表单数据formData的转化规则，如果返回对象则将其键值展开到最终的结果中。为false时对应的key值从结果中排除 | 无     |
| toQuery   | Boolean｜Function，表单数据同步至Url时的转化规则，为true时复用mapper。返回值中如果包含 undefined、null 或 '' 将会被忽略 | 无     |
| component | (必填)String｜Function 详见下方：响应式与表单项联动          | 无     |
| props     | 组件的props                                                     | 无     |
| attrs     | 组件的attrs                                                     | 无     |
| on        | 组件的on                                                       | 无     |
| nativeOn  | 组件的nativeOn                                                 | 无     |

备注：

1. on & nativeOn：参数经过了特殊处理，每个函数的首个参数为setState函数，关于setState函数，下方有说明。其余参数依次取用即可。
   主要是为了方便实现一些特殊情况下需要手动绑定函数来实现的表单联动。例如绑定change事件在切换标签后根据标签类型设置对应的默认值。
2. props & attrs：**props和attrs在内部会被合并，统一作为attrs**。建议使用时做到**全局统一**：即要用props就全用props，否则就全用attrs。
3. 由于除过表单配置项全部视为组件配置项，所以除了上面列出的组件配置项，还支持其他如class和style等等
   其他参数参考[官方文档](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)。

### 事件

| 事件名 | 参数                                                         |
| ------ | ------------------------------------------------------------ |
| search | (result, formData): result是mapper转化后的数据，formData是原始数据 |
| reset  | (formData): formData为重置后的默认数据。需要注意的是，reset实际上是一次调用OptionsSchema中的default函数并传入一个空对象 |
| change | (formData)：最新的formData                                   |

### 方法

组件提供了几个方法供给外部调用

- getResult、getFormData 获取对应的数据。
- reset：重置表单数据
- toQuery: 根据toQuery中配置的规则转化formData，并返回一个query对象
- setState：设置formData值，传入一个对象或返回对象的函数，函数接受原始formData作为参数。
- validate：校验formData，返回promise，校验成功resolve值为getResult()获取的最终值。

## 响应式和表单项联动

当组件的配置项是固定项时，可以将表单配置项和组件配置项写在一个层级，但如果组件的数据**涉及异步获取，或者表单项目之间存在联动效果**，需要将组件的配置项以函数的方式返回，这样才能正确更新。其中：

**当component选项为字符串的时候，读取同层级的组件配置项，并传递给该字符串对应的组件**。匹配方式如下：

1. 使用matcher匹配组件
3. 如果没有匹配到就直接返回component字符串

**当component选项为函数时，该表单项具备响应式、可以和其他表单项之间通过formData进行联动，轻松实现复杂交互**。其参数有三个

1. h：$createElement函数的引用
2. formData: 组件内部的数据
3. setState：函数，用来设置formData，传入一个对象或者函数，如果是函数，则该函数接受formData作为唯一参数，并返回一个对象。

component为函数时以返回值为准，忽略外部的组件配置项。你可以直接使用jsx返回VNode。也可以返回组件配置项，只不过当你返回组建配置项时，需要额外加上component选项，其值为string类型，指明需要渲染的组件。

## matcher

matcher用于匹配组件，如果matcher返回为空，则直接以name作为组件，否则以matcher返回的组件为准。

可以直接使用SearchForm组件，也可以使用插件的方式全局注册。

上面对input组件做了封装，添加了两个默认属性，placeholder和clearable。
