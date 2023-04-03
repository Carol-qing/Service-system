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


// 关联表--一对一查询
// XX.find().populate('articles','username')
// User.find({roleId: '63f0c9689b41be58a43f4228'},function(err,doc){
//     if(err){
//         console.log(err);
//         return 
//     }
//     console.log(doc);
// })
// .populate("roleId")

const User = mongoose.model('User', UserSchema)
const Roles = mongoose.model('Roles', RolesSchema)
const Artcles = mongoose.model('Artcles', ArtclesSchema)
const Categories = mongoose.model('Categories', CategoriesSchema)
const Regions = mongoose.model('Regions', RegionsSchema)
const Rights = mongoose.model('Rights', RightsSchema)
const Children = mongoose.model('Children', ChildrenSchema)
const Record = mongoose.model('Record', RecordSchema)
const Leave = mongoose.model('Leave', LeaveSchema)


// User.create({
//     username: 'xxq', 
//     password: '123', 
//     roleState: true,
//     default: true,
//     region: '总部',
//     roleId: '63f0c9689b41be58a43f4228'
// }).then((r) => {
//     console.log(r);
// })
// Artcles.create({
//     title: "Introducing JSX",
//     categoryId: "63fa113f5aabe5b354ae4b82",
//     content: "<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">This funny tag syntax is neither a string nor HTML.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">JSX produces React “elements”. We will explore rendering them to the DOM in the</span> <a href=\"https://reactjs.org/docs/rendering-elements.html\" target=\"_self\"><span style=\"color: rgb(26,26,26);background-color: rgba(187,239,253,0.3);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">next section</span></a><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">. Below, you can find the basics of JSX necessary to get you started.</span></p>\n<h3 style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">Why JSX?</span></h3>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">Instead of artificially separating</span> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\"><em>technologies</em></span> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">by putting markup and logic in separate files, React</span> <a href=\"https://en.wikipedia.org/wiki/Separation_of_concerns\" target=\"_blank\"><span style=\"color: rgb(26,26,26);background-color: rgba(187,239,253,0.3);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">separates</span> <span style=\"color: rgb(26,26,26);background-color: rgba(187,239,253,0.3);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\"><em>concerns</em></span></a> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">with loosely coupled units called “components” that contain both. We will come back to components in a</span> <a href=\"https://reactjs.org/docs/components-and-props.html\" target=\"_self\"><span style=\"color: rgb(26,26,26);background-color: rgba(187,239,253,0.3);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">further section</span></a><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">, but if you’re not yet comfortable putting markup in JS,</span> <a href=\"https://www.youtube.com/watch?v=x7cQ3mrcKaY\" target=\"_blank\"><span style=\"color: rgb(26,26,26);background-color: rgba(187,239,253,0.3);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">this talk</span></a> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">might convince you otherwise.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">React</span> <a href=\"https://reactjs.org/docs/react-without-jsx.html\" target=\"_self\"><span style=\"color: rgb(26,26,26);background-color: rgba(187,239,253,0.3);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">doesn’t require</span></a> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.</span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">With that out of the way, let’s get started!</span></p>\n<h3 style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">Embedding Expressions in JSX</span></h3>\n<p style=\"text-align:start;\"><span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">In the example below, we declare a variable called</span> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\"><code>name</code></span> <span style=\"color: rgb(0,0,0);font-size: 17px;font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\">and then use it inside JSX by wrapping it in curly braces:</span></p>\n<p style=\"text-align:start;\"></p>\n<pre style=\"margin-left:1rem;\"><br>&nbsp;</pre>\n",
//     region: "技术部",
//     author: "小小晴",
//     roleId: "63f0c9689b41be58a43f4229",
//     auditState: 2,
//     createTime: 1615778715619,
//     view: 984
// }).then((r) => {
//     console.log(r);
// })
// Children.create({
//     title: "申请请假",
//     right_Id: 2,
//     key: "/work-manage/leave",
//     pagepermisson: 1,
//     grade: 2
// })
// Categories.create({
//     type: 1,
//     title: '信息公告',
//     value: '信息公告'
// }).then((r) => {
//     console.log(r);
// })


module.exports = {User, Roles, Artcles, Categories, Regions, Rights, Children, Record, Leave}