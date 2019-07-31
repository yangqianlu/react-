// 导航配置
export default [
  {
    name: '人才盘点',
    path: '/talent',
    dom: null, //模块
    child: [
      {
        name: '人才盘点列表',
        path: '/talent/review-list',
        hasSilde: false, //当前页是否展示 侧边栏
        showNav:true     //是否在列表里展示
      },
      {
        name: '盘点详情',
        path: '/talent/review-detail',
        hasSilde: false,
        showNav:true     //是否在列表里展示
      },
    ],
  },
  {
    name: '信息采集',
    path: '/information',
    dom: null,
    child: [
      {
        name: '信息采集列表',
        path: '/information/collection-list',
        hasSilde: false,
        showNav:true     //是否在列表里展示
      },
      {
        name: '采集详情',
        path: '/information/collection-detail',
        hasSilde: false,
        showNav:true     //是否在列表里展示
      },
    ],
  },
  {
    name: '自学',
    path: '/staff',
    dom: null,
    child: [
      {
        name: "LeetCode",
        path: '/staff/staff-list',
        hasSilde: true,
        showNav:true     //是否在列表里展示
      },
      {
        name: '员工详情',
        path: '/staff/staff-detail',
        hasSilde: false,
        showNav:false     //是否在列表里展示
      },
      {   
        name: '部门管理',
        path: '/staff/depart', 
        hasSilde: true,
        showNav:true     //是否在列表里展示
      },
      {
        name: '岗位管理',
        path: '/staff/post',
        hasSilde: true,
        showNav:true     //是否在列表里展示
      }
    ],
  },

 
  {
    name: '账号设置',
    path: '/account',
    dom: null,
    child: [
      {
        name: '我的账号',
        path: '/account/mine',
        hasSilde: true,
        showNav:true     //是否在列表里展示
      },
    ],
  },
];

// 查询配置
export const queryLayout = {
  content: {
    '1280': 930,
    '1440': 1090,
    '1920': 1280,
  },
  side: {
    '1440': 250,
    '1920': 340,
  },
};
