let mongoose = require("mongoose")

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/system', { useNewUrlParser: true })
    .then((res) => {
        console.log('数据库连接成功');
    })
    .catch((err) => {
        console.log('数据库连接失败');
    })

// 用户列表
const UserSchema = mongoose.Schema({
    username: String, 
    password: String, 
    headImgUrl: String,
    roleState: Boolean,
    default: Boolean,
    region: String,
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: "Roles"}
},{
    timestamps: true,
})
// 权限列表
const RolesSchema = mongoose.Schema({
    roleName: String,
    roleType: Number,
    rights: Array
})
// 分类表
const CategoriesSchema = mongoose.Schema({
    type: Number,
    title: String,
    value: String
})
// 部门表
const RegionsSchema = mongoose.Schema({
    title: String,
    value: String
})
// 左侧栏表
const RightsSchema = mongoose.Schema({
    type:Number,
    title: String,
    key: String,
    pagepermisson: Boolean,
    grade: Number
})
// 左侧栏孩子列表
const ChildrenSchema = mongoose.Schema({
    title: String,
    right_type: Number,//关联左侧栏表
    pagepermisson: Boolean,
    // rightId: {type: mongoose.Schema.Types.ObjectId, ref: "Rights"},
    key: String,
    grade: Number
})
// 文章列表
const ArtclesSchema = mongoose.Schema({
    // 从文章表关联用户表id
    author: String,
    title: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Categories"},
    content: String,
    region: String,
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: "Roles"},//关联权限表
    auditState: Number, //草稿箱：0 审核中：1 已通过：2 未通过：
    view:{ //阅读量
        type: Number,
        default: 0
    },
    createTime: String,
})
// 打卡记录表
const RecordSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date:String,//打卡日期
    workon: String,//打卡时间
    workoff: String,//签退时间
    workonState:{ //打卡状态 1为打卡成功，2为迟到，3为打卡失败，0为还未打卡
        type: Number,
        default: 0
    },
    workoffState:{ //签退状态 1为签退成功，0为还未签退
        type: Number,
        default: 0
    },
    // reason:String,
})
// 请假记录表
const LeaveSchema = mongoose.Schema({
    roleId: {type: mongoose.Schema.Types.ObjectId, ref: "Roles"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    username:String,
    region:String,
    reason:String,
    auditState: Number,
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: "Categories"},
    leaveon: String,
    leaveoff: String,
})

const User = mongoose.model('User', UserSchema)
const Roles = mongoose.model('Roles', RolesSchema)
const Artcles = mongoose.model('Artcles', ArtclesSchema)
const Categories = mongoose.model('Categories', CategoriesSchema)
const Regions = mongoose.model('Regions', RegionsSchema)
const Rights = mongoose.model('Rights', RightsSchema)
const Children = mongoose.model('Children', ChildrenSchema)
const Record = mongoose.model('Record', RecordSchema)
const Leave = mongoose.model('Leave', LeaveSchema)

module.exports = {User, Roles, Artcles, Categories, Regions, Rights, Children, Record, Leave}