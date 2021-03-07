<script>
export default {
  name: 'Drawer',
  data() {
    return {
      getContainer: 'body',
      title: undefined,
      okText: '确定',
      cancelText: '取消',
      content: undefined,
      maskClosable: false,
      width: 500,
      height: 500,
      placement: 'right',
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
        console.warn(e.message || '抽屉关闭失败');
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.onCancel();
      this.visible = false;
    },
    visibleChange(visible) {
      if (!visible) {
        this.$el.remove();
        this.$destroy();
      }
    },
  },
  mounted() {
    // hack: 将footer向上移动一个层级便于布局
    const move = () => {
      const footer = this.$refs.footer;
      if (footer) {
        const container = footer.parentElement.parentElement;
        container.appendChild(footer);
      } else {
        setTimeout(move);
      }
    };
    move();
  },
  render(h) {
    return (
      <a-drawer
        class="custom-drawer"
        getContainer={this.getContainer}
        afterVisibleChange={this.visibleChange}
        maskClosable={this.maskClosable}
        title={this.title}
        visible={this.visible}
        width={this.width}
        height={this.height}
        placement={this.placement}
        onClose={this.cancel}
      >
        {
          typeof this.content === 'function'
            ? this.content(h)
            : <div>{ this.content }</div>
        }
        <div id="drawer-footer" ref="footer">
          <a-button onClick={this.cancel}>{this.cancelText}</a-button>
          <a-button
            type="primary"
            loading={this.loading}
            onClick={this.ok}
          >
            {this.okText}
          </a-button>
        </div>
      </a-drawer>
    );
  },
};
</script>

<style scoped lang="stylus">
.custom-drawer >>>
  .ant-drawer-wrapper-body
    display flex
    flex-direction column
  .ant-drawer-body
    flex-grow 1
    overflow auto
    padding 16px 24px
#drawer-footer
  padding 16px 24px
  text-align right
  border-top 1px solid #e8e8e8
  button:first-child
    margin-right 10px
</style>
