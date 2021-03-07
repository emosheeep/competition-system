import Vue from 'vue';

const ConfirmModal = {
  name: 'ConfirmModal',
  data() {
    return {
      title: undefined,
      okText: '确定',
      cancelText: '取消',
      content: undefined,
      maskClosable: false,
      visible: false,
      loading: false,
      onOk() {},
      onCancel() {},
    };
  },
  methods: {
    async ok() {
      try {
        this.loading = true;
        await this.onOk();
        this.visible = false;
      } catch (e) {
        console.warn(e.message || '模态框关闭失败');
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.onCancel();
      this.visible = false;
    },
    remove() {
      this.$el.remove();
      this.$destroy();
    },
  },
  render(h) {
    return (
      <a-modal
        afterClose={this.remove}
        maskClosable={this.maskClosable}
        title={this.title}
        okText={this.okText}
        cancelText={this.cancelText}
        visible={this.visible}
        onOk={this.ok}
        onCancel={this.cancel}
        confirmLoading={this.loading}
      >
        {
          typeof this.content === 'function'
            ? this.content(h)
            : <div>{ this.content }</div>
        }
      </a-modal>
    );
  },
};

/**
 * $confirm的扩展
 * @param{modalOptions} data
 */
export default function(data) {
  const instance = new Vue(ConfirmModal);
  Object.assign(instance.$data, data);
  const { $el } = instance.$mount();
  document.body.appendChild($el);
  instance.visible = true;
};
