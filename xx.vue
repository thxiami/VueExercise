<!--
  - 节段管理/过程管理
  - @copyright: ©2018 Guangdong Sun Railway Information Technology,Inc. All rights reserved.
  - @author: Liu Jiaqi <liujiaqi@sunengineering.cn>
  -->

<template>
    <su-layout v-loading="loading">
        <div
                slot="action"
                v-if="!$route.hash"
        >
            <su-button
                    content="新增"
                    icon="el-icon-circle-plus"
                    @click="add()"
            />
            <su-button
                    content="删除"
                    icon="el-icon-remove"
                    @click="del('segmentId')"
                    :disabled="selections.length === 0"
                    class="text-danger"
            />
        </div>

        <el-form
                inline
                :model="param"
                slot="filter"
        >
            <el-form-item label="桥">
                <el-select
                        filterable
                        v-model="param.bridgeId"
                >
                    <el-option
                            v-for="v of bridges"
                            :key="v.id"
                            :value="v.id"
                            :label="v.name"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="跨">
                <el-select
                        filterable
                        v-model="param.spanId"
                >
                    <el-option
                            v-for="v of spans"
                            :key="v.id"
                            :value="v.id"
                            :label="v.name"
                    />
                </el-select>
            </el-form-item>
        </el-form>

        <su-table
                ref="table"
                slot="main"
                :columns="columns"
                :data="data.pageDatas"
                :index="index"
                @selection-change="handleSelectionChange"
        />

        <su-pagination
                :current-page="data.pageIndex"
                :page-size="data.pageSize"
                :total="data.totalRecords"
                slot="footer"
                @change="handlePaginationChange"
        />

        <el-dialog
                :title="title"
                :visible.sync="visible"
                :close-on-click-modal="false"
                width="810px"
        >
            <su-form
                    :items="formItems"
                    ref="form"
                    :model="model"
                    labelWidth="120px"
            />
            <span slot="footer">
        <el-button
                type="primary"
                @click="handleSubmitClick"
        >提交</el-button>
      </span>
        </el-dialog>

        <segment-measure-dialog ref="SegmentMeasureDialog" />

        <el-dialog
                title="工序"
                width="850px"
                :visible.sync="procedureVisible"
        >
            <procedure-detail/>
        </el-dialog>
    </su-layout>
</template>

<script>
    import Base from '@/res/base'
    import options from '@/res/options'
    import SegmentMeasureDialog from '@/components/SegmentMeasureDialog'
    import ProcedureDetail from '@/components/ProcedureDetail'

    export default {
        name: 'SegmentConfig',
        components: {
            SegmentMeasureDialog,
            ProcedureDetail,
        },
        data () {
            return {
                data: [],
                selections: [],
                model: {},
                param: {
                    bridgeId: '',
                    spanId: ''
                },
                title: '',
                visible: false,
                url: {
                    add: this.$api.segmentAdd,
                    del: this.$api.segmentDelete,
                    edit: this.$api.segmentUpdate,
                    query: this.$api.segmentList
                },
                bridges: [],
                spans: [],
                procedureVisible: false,
                loading: true,
            }
        },
        computed: {
            columns () {
                const ret = [{
                    prop: 'bridgeName',
                    minWidth: 200,
                }, {
                    prop: 'spanName',
                    minWidth: 150,
                }, {
                    prop: 'uniqueCode',
                    minWidth: 250,
                }, {
                    prop: 'segTypeId',
                    minWidth: 110,
                    formatter (row, col, val) {
                        return Base.getLabel(options.segmentType, val)
                    }
                }, {
                    prop: 'precutSid',
                    minWidth: 120
                }, {
                    prop: 'length',
                    minWidth: 120,
                }, {
                    prop: 'width',
                    minWidth: 120,
                }, {
                    prop: 'lengthLeft',
                    minWidth: 120
                }, {
                    prop: 'lengthRight',
                    minWidth: 120
                }, {
                    prop: 'acMileage',
                    minWidth: 140
                }, {
                    prop: 'bdMileage',
                    minWidth: 140
                }]
                if (!this.$route.hash) {
                    ret.push({
                        buttons: [{
                            content: '编辑',
                            icon: 'el-icon-edit-outline',
                            onClick: this.edit,
                        }]
                    })
                } else {
                    ret.push({
                        width: 100,
                        buttons: [{
                            content: '查看测量数量',
                            icon: 'el-icon-view',
                            onClick: this.showMeasureData,
                        }, {
                            content: '工序',
                            fa: 'fas fa-tasks',
                            onClick: this.handleProcedureClick,
                        }]
                    })
                }

                return ret
            },
            formItems () {
                return [{
                    type: 'cascader',
                    field: 'spanId',
                    validate: 'required',
                    options: [],
                    activeItemChange: this.handleItemChange,
                    change () {}
                }, {
                    type: 'select',
                    field: 'segTypeId',
                    validate: 'required',
                    options: options.segmentType
                }, {
                    field: 'uniqueCode',
                    validate: 'required'
                }, {
                    type: 'number',
                    field: 'precutSid',
                    validate: 'required',
                    label: '预制序号',
                    min: -100,
                    max: 100
                }, {
                    type: 'number',
                    field: 'length',
                    validate: 'required',
                    min: 0.1,
                    max: 100
                }, {
                    type: 'number',
                    field: 'width',
                    validate: 'required',
                    min: 0.1,
                    max: 100
                }, {
                    field: 'pierCode'
                }, {
                    type: 'select',
                    field: 'isGearBlock',
                    options: options.isGearBlock
                }, {
                    type: 'number',
                    field: 'lengthLeft',
                    validate: 'required',
                    min: 0,
                }, {
                    type: 'number',
                    field: 'lengthRight',
                    validate: 'required',
                    min: 0,
                }, {
                    field: 'acMileage',
                    validate: 'required',
                }, {
                    field: 'bdMileage',
                    validate: 'required',
                }]
            }
        },
        watch: {
            bridges (val) {
                if (val.length > 0) {
                    this.param.bridgeId = val[0].id
                }
            },
            'param.bridgeId': function (val) {
                this.spans = this.$su.find(this.bridges, v => v.id === val).children
                this.param.spanId = ''
            },
            spans (val) {
                if (val.length > 0) {
                    this.param.spanId = val[0].id
                }
            },
            'param.spanId': function (val) {
                if (!val) {
                    return
                }

                this.query()
            }
        },
        methods: {
            ...window.$su.methods,
            async edit (row) {
                this.visible = true
                this.title = '编辑'
                if (this.$refs.form) this.$refs.form.resetFields()
                this.submitUrl = this.url.edit
                row = Object.assign({}, row)
                await this.setSpanOptions(row.bridgeId)
                row.spanId = [row.bridgeId, row.spanId]
                this.model = row
            },
            handleItemChange (value) {
                this.setSpanOptions(value[0])
            },
            async setSpanOptions (bridgeId) {
                await this.$su.ajax({
                    url: this.$api.spanAll,
                    param: {bridgeId}
                }).then((data) => {
                    const options = Base.getOptions(data.data, 'spanId', 'spanName')
                    const root = this.formItems[0].options
                    const index = this.$su.findIndex(root, (v) => v.value === bridgeId)
                    root[index].children = options
                })
            },
            showMeasureData (row) {
                this.$refs.SegmentMeasureDialog.show(row)
            },
            getAllBridge () {
                this.$su.ajax({
                    url: this.$api.bridgeAll
                }).then((data) => {
                    const options = Base.getOptions(data.data, 'bridgeId', 'bridgeName', true)
                    this.formItems[0].options = options
                })
            },
            handleProcedureClick (row) {
                this.procedureVisible = true
            },
            handleSubmitClick () {
                let spanId = ''
                if (this.model.spanId) {
                    spanId = this.model.spanId[1]
                }

                for (let k in this.model) {
                    if (this.model[k] === '') {
                        delete this.model[k]
                    }
                }

                this.submit({
                    includes: {
                        spanId
                    },
                    excludes: [
                        'workingProcedure'
                    ],
                    queryParam: {
                        spanId: spanId
                    }
                })
            },
            getSpans () {
                this.$su.ajax({
                    url: this.$api.spanListCascaded
                }).then(res => {
                    this.bridges = res.data
                })
            },
            handlePaginationChange (param) {
                if (this.param.spanId) {
                    param.spanId = this.param.spanId[1]
                }

                this.query(param)
            },
        },
        created () {
            this.getSpans()
            this.getAllBridge()
        }
    }
</script>

<style scoped>
</style>
