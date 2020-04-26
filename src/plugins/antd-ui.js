import Vue from 'vue'
import {
  Form, Button, Input, Icon, Checkbox, Radio,
  Menu, Layout, Table, Modal
} from 'ant-design-vue'

const components = [
  Modal,
  Table,
  Layout,
  Layout.Header,
  Layout.Content,
  Layout.Footer,
  Menu,
  Menu.Item,
  Radio,
  Radio.Group,
  Checkbox,
  Icon,
  Input,
  Form,
  Form.Item,
  Button,
  Button.Group
]

components.forEach((c) => {
  Vue.use(c)
})
