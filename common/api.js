export let baseUrl = uni.getStorageSync("baseUrl");

export function setBaseUrl(url){
	baseUrl = url;
}

// 登录
export function Login(username,password){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/login`,
			method:"POST",
			sslVerify:false,
			data:{
				username:username,
				password:password,
				},
			success: (res) => {
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 轮播图
export function Banner(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/rotation/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 新闻列表
export function HomeNewsList(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/press/press/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				result.length = 4;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 新闻类型
export function HomeNewsType(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/press/category/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 各类型新闻列表
export function HomeNewsListBottom( type ){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/press/press/list?type=${type}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 获取新闻详情
export function NewsDetailedInformation( id ){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/press/press/${id}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 停车场列表
export function HomeStopList(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/park/lot/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 停车场信息
export function HomeStopMsg(id){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/park/lot/${id}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 获取停车信息
export function ParkingRecordList(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/park/lot/record/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 地铁全览
export function HomeDiTie(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/metro/city`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 地铁信息
export function HomeDiTieMsg(load){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/metro/list?currentName=${load}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 地铁站信息
export function HomeDiTieLoad(lineId){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/metro/line/${lineId}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 全部服务
export function AllServerList(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/service/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 新闻评论列表
export function AllPressCommentsList(newsId){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/park/press/comments/list?newsId=${newsId}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 发表评论
export function putPressComment(newsId,content){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/park/press/pressComment`,
			method:"POST",
			header:{
				'Authorization':uni.getStorageSync('token','')
			},
			sslVerify:false,
			data:{
				"newsId":newsId,
				"content":content
			},
			success: (res) => {
				// console.log(res);
				let result = res;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 用户信息
export function GetUesrMessage(token){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/common/user/getInfo`,
			method:"GET",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.user;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 文件上传
export function UpFile(token,file){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/common/upload`,
			method:"post",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				'file':file,
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 修改用户信息
export function UpdateUesrMessage(token,body){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/common/user`,
			method:"PUT",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				'avatar':body.avatar,
				'email':body.email,
				'idCard':body.idCard,
				'nickName':body.nickName,
				'phonenumber':body.phonenumber,
				'sex':body.sex
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 订单信息
export function getGoods(token){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/allorder/list`,
			method:"GET",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询巴士订单
export function selectBusGoods(token){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/bus/order/list`,
			method:"GET",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 支付巴士订单
export function payGoods(token,orderNum,paymentType){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/bus/pay`,
			method:"POST",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"orderNum":orderNum,
				"paymentType":paymentType
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 修改密码
export function UpdatePassword(token,oldPwd,newPwd){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/common/user/resetPwd`,
			method:"PUT",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"newPassword":newPwd,
				"oldPassword":oldPwd
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 意见反馈
export function PutIdea(token,content){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/common/feedback`,
			method:"POST",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"content":content
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}


// 查询巴士路线信息
export function getBusLine(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/bus/line/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 使用Id查询巴士路线信息
export function getBusIdLine(id){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/bus/line/${id}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询巴士站点信息
export function getBusStop(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/bus/stop/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 新增巴士订单
export function insertBusGoods(token,body){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/bus/order`,
			method:"POST",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"start":body.start,
				"end":body.end,
				"price":body.price,
				"path":body.path,
				"status":body.status
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询门诊列表
export function selectHos(){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/hospital/list`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询医院轮播图
export function selectHosImg(id){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/banner/list?hospitalId=${id}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询医院详情
export function selectHosMsg(id){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/hospital/${id}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 添加就诊卡
export function insertHosCard(token,body){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/patient`,
			method:"POST",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"address":body.address,
				"birthday":body.birthday,
				"cardId":body.cardId,
				"name":body.name,
				"sex":body.sex,
				"tel":body.tel
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 修改就诊卡
export function updateHosCard(token,body){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/patient`,
			method:"PUT",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"id":body.id,
				"address":body.address,
				"birthday":body.birthday,
				"cardId":body.cardId,
				"name":body.name,
				"sex":body.sex,
				"tel":body.tel
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询就诊卡
export function selectHosCard(token){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/patient/list`,
			method:"GET",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询挂号服务
export function selectAppointment(type){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/category/list?type=${type}`,
			method:"GET",
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 生成挂号单
export function insertAppointmentPage(token,body){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital`,
			method:"POST",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			data:{
				"categoryId": body.categoryId,
				"money": body.money,
				"patientName": body.patientName,
				"reserveTime": body.reserveTime,
				"type": body.type
			},
			success: (res) => {
				// console.log(res);
				let result = res.data;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}

// 查询挂号列表
export function selectAppointmentPage(token){
	return new Promise(function(reslove,reject){
		uni.request({
			url:`${baseUrl}/prod-api/api/hospital/reservation/list`,
			method:"GET",
			header:{
				'Authorization':token
			},
			sslVerify:false,
			success: (res) => {
				// console.log(res);
				let result = res.data.rows;
				reslove(result);
			},
			fail: (err_msg) => {
				console.error(err_msg);
			}
		})
	})
}