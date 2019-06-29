const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(
		proxy("/api", {
			//target: "http://172.32.2.61:5000/",
			target: "http://Ensemble-NLB-b125ba92bb371a53.elb.ap-northeast-2.amazonaws.com:5000",
			changeOrigin: true
		})
	);
	app.use(
		proxy("/auth", {
			//target: "http://172.32.2.61:5000/",
			target: "http://Ensemble-NLB-b125ba92bb371a53.elb.ap-northeast-2.amazonaws.com:5000",
			changeOrigin: true
		})
	);
	app.use(
		proxy("/img", {
			//target: "http://172.32.2.61:5000/",
			target: "http://Ensemble-NLB-b125ba92bb371a53.elb.ap-northeast-2.amazonaws.com:5000",
			changeOrigin: true
		})
	);
};
