<template>
  <!--<div class="dashboard-container">-->
    <!--<div class="dashboard-text">name:{{ name }}</div>-->
    <!--<div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>-->
  <!--</div>-->
  <!--<div class="dashboard-container">-->
    <!--<component :is="currentRole"/>-->
  <!--</div>-->
  <div class="dashboard-container">
    <PanelGroup :newMemberNumber="newMemberNumber" :waitScoreNumber="waitScoreNumber" @switchTable="switchTable"/>
    <NewMember @updateNewMemberNumber="updateNewMemberNumber" v-show="tableShow == 1"/>
    <WaitScore @updateWaitScoreNumber="updateWaitScoreNumber" v-show="tableShow == 2"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import NewMember from './components/NewMember'
import WaitScore from './components/WaitScore'

export default {
  name: 'Dashboard',
  components: {
    PanelGroup,
    NewMember,
    WaitScore
  },
  data() {
    return {
      tableShow: 1,
      newMemberNumber: 0,
      waitScoreNumber: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    switchTable(table) {
      this.tableShow = table
    },
    updateNewMemberNumber(total) {
      this.newMemberNumber = total
    },
    updateWaitScoreNumber(total) {
      this.waitScoreNumber = total
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
