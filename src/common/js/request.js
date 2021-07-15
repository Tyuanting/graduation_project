// const baseUrl = 'http://192.168.1.244:3000';//接口域名
const baseUrl = 'http://localhost:3000';
let reqCount = 0,resCount = 0;//记录请求次数和响应次数

const request = (options) => {
    reqCount++;
    uni.showLoading();
    return new Promise((resolve, reject) => {
        uni.request({
            method: options.method,
            url: baseUrl + options.url,
            data: options.data,
            header: options.header//其他配置在此添加或先转换options.url，然后 ...options
        }).then((response) => {
            resCount++
            if(reqCount === resCount) uni.hideLoading();//防止连续请求多个接口时loading闪现
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            resCount++
            if(reqCount === resCount) uni.hideLoading();
            let [err, res] = error;
            reject(err)
        })
    });
}
export default request