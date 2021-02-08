<template>
  <div>
    <a-button-group>
      <a-button
        :type="isMultiple ? 'primary' : ''"
        @click="isMultiple = !isMultiple"
      >
        {{ isMultiple ? '取消' : '批量删除' }}
      </a-button>
      <a-popconfirm
        v-if="isMultiple"
        title="确认删除？"
        ok-text="确认"
        cancel-text="取消"
        placement="topRight"
        @confirm="() => $refs.race.multipleDelete()"
      >
        <template #icon>
          <a-icon
            type="question-circle-o"
            style="color: orange"
          />
        </template>
        <a-button>确认删除</a-button>
      </a-popconfirm>
      <a-button
        type="primary"
        @click="addRace"
      >
        添加赛事
      </a-button>
      <a-button @click="exportExcel">
        导出Excel
      </a-button>
    </a-button-group>

    <a-divider style="margin-top: 10px" />

    <ShowRace
      ref="race"
      type="admin"
      :data="races"
      :multiple="isMultiple"
      @update-race="onUpdate"
      @delete-race="onDelete"
      @show-detail="onDetail"
    />

    <UpdateRace
      :visible.sync="updateRaceVisible"
      :race="curRace"
    />
    <a-drawer
      width="50%"
      :visible.sync="showDetailVisible"
      :title="`${curRace.title} 赛事详情`"
      :destroy-on-close="true"
      @close="showDetailVisible = false"
    >
      <RaceDetail :id="curRace._id" type="admin"/>
    </a-drawer>
  </div>
</template>

<script>
import { omit } from 'lodash';
import { makeExcel } from '@/utils/excel';
import ShowRace from '@/components/race/ShowRace';
import UpdateRace from '@/components/race/UpdateRace';
import RaceDetail from '@/components/race/RaceDetail';
import EditRace from '@/components/add-and-update/EditRace';

export default {
  name: 'AdminShowRace',
  components: {
    RaceDetail,
    ShowRace,
    UpdateRace,
  },
  data() {
    return {
      races: [],
      updateRaceVisible: false,
      showDetailVisible: false,
      isMultiple: false,
      curRace: {},
    };
  },
  methods: {
    onUpdate(race) {
      this.updateRaceVisible = true;
      this.curRace = race;
    },
    onDetail(race) {
      this.showDetailVisible = true;
      this.curRace = race;
    },
    onDelete(data) {

    },
    exportExcel() {
      makeExcel({
        races: this.races.map(item => {
          const temp = omit(item, ['_id']);
          temp.date = new Date(temp.date);
          return temp;
        }),
      });
    },
    addRace() {
      let vnode;
      this.$confirm({
        title: '新增赛事',
        content: h => (vnode = <EditRace />),
        onOk: async () => {
          const values = await vnode.componentInstance.confirm();
          values.date = values.date.valueOf(); // 转换为时间戳
          return this.$api.addRace(values).then(({ data }) => {
            if (data.code !== 200) throw data;
            this.$message.success(data.msg);
          }).catch(e => {
            this.$message.error(e.msg || '添加失败');
            throw e;
          });
        },
      });
    },
  },
};
</script>
