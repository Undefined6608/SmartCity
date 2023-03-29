// 判断字符串中含有几个特定字符
export function sGetCharCount(sChar:string , sStr:string){
	let count:number, i:number;
	count = 0;
	for (i = 0; i < sStr.length-1; i++) {
		if (sStr.substring(i, i+1) == sChar) {
		count = count + 1;
		}
	}file:///C:/Users/15506/Downloads/zbvc.fun_apache/zbvc.fun_apache
  return count;
}

// 普通页面跳转
/*
	 // pageA
		wx.navigateTo({
			url: '/pages/pageB/pageB?froms=1',
		});
	 // pageB
		onLoad: function(options) {
			console.table(options)
		},
*/
export function navigateTo(local_url:string){
	uni.navigateTo({
		url:local_url
	})
}

export function navigateBack(){
	uni.navigateBack({
	})
}

// 翻页跳转
export function switchTab(local_url:string){
	uni.switchTab({
		url:local_url
	})
}