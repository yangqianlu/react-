export default class PerformanceModel {
  constructor(id) {
    this.id = id;
  }

  static collect=[
    {
      "id": 1,
      "project_id": 4,
      "name": "一次采集",
      "start_time": "0001-01-01T00:00:00+08:00",
      "end_time": "0001-01-01T00:00:00+08:00",
      "status": 1,
      "is_deleted": 0,
      "updated_at": "2019-06-11T19:22:50+08:00",
      "created_at": "2019-06-10T16:31:57+08:00"
    },
    {
      "id": 2,
      "project_id": 4,
      "name": "一次采集",
      "start_time": "0001-01-01T00:00:00+08:00",
      "end_time": "0001-01-01T00:00:00+08:00",
      "status": 2,
      "is_deleted": 0,
      "updated_at": "2019-06-11T19:22:50+08:00",
      "created_at": "2019-06-10T16:31:57+08:00"
    },    
    {
      "id": 3,
      "project_id": 4,
      "name": "一次采集",
      "start_time": "0001-01-01T00:00:00+08:00",
      "end_time": "0001-01-01T00:00:00+08:00",
      "status": 3,
      "is_deleted": 0,
      "updated_at": "2019-06-11T19:22:50+08:00",
      "created_at": "2019-06-10T16:31:57+08:00"
    },
    {
      "id": 4,
      "project_id": 4,
      "name": "一次采集",
      "start_time": "0001-01-01T00:00:00+08:00",
      "end_time": "0001-01-01T00:00:00+08:00",
      "status": 4,
      "is_deleted": 0,
      "updated_at": "2019-06-11T19:22:50+08:00",
      "created_at": "2019-06-10T16:31:57+08:00"
    }
  ]
  static statusMap = {
    1: {
      name: '待启动',
      tagClassnames: "red"
    },
    2: {
      name: "进行中",
      tagClassnames:'green'
    },
    3: {
      name: "已完成",
      tagClassnames:'green'
    },
    4: {
      name: "暂停",
      tagClassnames:'red'
    },
    5: {
      name: "结束",
      tagClassnames:'red'
    },
    default: { name: '未知', tagClassName: 'grey' },
  }
  static getCollect =(collect=[])=>{
    let {statusMap}=PerformanceModel;
    if(!collect){
      return []
    }
    return collect.map(item=>{
      const { id, name, status } = item;
      return {
        id,
        name,
        status:statusMap[status] || statusMap.default
      }
    })
  }


}