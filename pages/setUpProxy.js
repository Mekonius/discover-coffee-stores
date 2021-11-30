const { createProxyMiddleware } = require('http-proxy-middleware');

// restream parsed body before proxying
var restream = function(proxyReq, req, res, options) {
if (req.body) {
let bodyData = JSON.stringify(req.body);
// incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
proxyReq.setHeader('Content-Type','application/json');
proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
// stream the content
proxyReq.write(bodyData);
}
};
module.exports = function(app) {
app.use(
createProxyMiddleware("/v3/places/search?query=coffee%20store&ll=56.15443,10.20531&radius=1000&sort=RATING&limit=10",{
target:"https://api.foursquare.com",
secure:false,
changeOrigin:true,
onProxyReq:restream
})
);

//if you have more than one url, add app.use as much as you want as shown below
app.use(
createProxyMiddleware("/(your targetted path)",{
target:" (your targetted domain name)",
secure:false,
changeOrigin:true,
onProxyReq:restream
})
);
};