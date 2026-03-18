"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/send-verification/route";
exports.ids = ["app/api/send-verification/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsend-verification%2Froute&page=%2Fapi%2Fsend-verification%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-verification%2Froute.ts&appDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsend-verification%2Froute&page=%2Fapi%2Fsend-verification%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-verification%2Froute.ts&appDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var C_Users_subra_contribution_identityflow_automation_app_api_send_verification_route_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/api/send-verification/route.ts */ \"(rsc)/./app/api/send-verification/route.ts\");\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/send-verification/route\",\n        pathname: \"/api/send-verification\",\n        filename: \"route\",\n        bundlePath: \"app/api/send-verification/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\subra\\\\contribution\\\\identityflow-automation\\\\app\\\\api\\\\send-verification\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_subra_contribution_identityflow_automation_app_api_send_verification_route_ts__WEBPACK_IMPORTED_MODULE_2__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/send-verification/route\";\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZzZW5kLXZlcmlmaWNhdGlvbiUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGc2VuZC12ZXJpZmljYXRpb24lMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZzZW5kLXZlcmlmaWNhdGlvbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNzdWJyYSU1Q2NvbnRyaWJ1dGlvbiU1Q2lkZW50aXR5Zmxvdy1hdXRvbWF0aW9uJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNzdWJyYSU1Q2NvbnRyaWJ1dGlvbiU1Q2lkZW50aXR5Zmxvdy1hdXRvbWF0aW9uJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUM0RDtBQUMzSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVHQUF1RztBQUMvRztBQUNpSjs7QUFFakoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pZGVudGl0eWZsb3ctYXV0b21hdGlvbi8/MWE3MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxzdWJyYVxcXFxjb250cmlidXRpb25cXFxcaWRlbnRpdHlmbG93LWF1dG9tYXRpb25cXFxcYXBwXFxcXGFwaVxcXFxzZW5kLXZlcmlmaWNhdGlvblxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc2VuZC12ZXJpZmljYXRpb24vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zZW5kLXZlcmlmaWNhdGlvblwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc2VuZC12ZXJpZmljYXRpb24vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxzdWJyYVxcXFxjb250cmlidXRpb25cXFxcaWRlbnRpdHlmbG93LWF1dG9tYXRpb25cXFxcYXBwXFxcXGFwaVxcXFxzZW5kLXZlcmlmaWNhdGlvblxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9zZW5kLXZlcmlmaWNhdGlvbi9yb3V0ZVwiO1xuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsend-verification%2Froute&page=%2Fapi%2Fsend-verification%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-verification%2Froute.ts&appDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/send-verification/route.ts":
/*!********************************************!*\
  !*** ./app/api/send-verification/route.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var _lib_serverEmailService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/serverEmailService */ \"(rsc)/./lib/serverEmailService.ts\");\n\n\nasync function POST(request) {\n    try {\n        const { email, code } = await request.json();\n        if (!email || !code) {\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                success: false,\n                error: \"Missing email or code\"\n            }, {\n                status: 400\n            });\n        }\n        const body = `\r\nHello,\r\n\r\nPlease use the following verification code to complete your IdentityFlow sign up:\r\n\r\nCode: ${code}\r\n\r\nIf you did not request this, you can ignore this message.\r\n\r\nBest regards,\r\nIdentityFlow Team\r\n    `;\n        await (0,_lib_serverEmailService__WEBPACK_IMPORTED_MODULE_1__.sendEmail)({\n            to: email,\n            subject: \"Verify your IdentityFlow account\",\n            body\n        });\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            success: true\n        });\n    } catch (error) {\n        console.error(\"Failed to send verification email\", error);\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            success: false,\n            error: \"Failed to send email\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlbmQtdmVyaWZpY2F0aW9uL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RDtBQUNIO0FBRTdDLGVBQWVFLEtBQUtDLE9BQW9CO0lBQzdDLElBQUk7UUFDRixNQUFNLEVBQUVDLEtBQUssRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTUYsUUFBUUcsSUFBSTtRQUUxQyxJQUFJLENBQUNGLFNBQVMsQ0FBQ0MsTUFBTTtZQUNuQixPQUFPTCxrRkFBWUEsQ0FBQ00sSUFBSSxDQUFDO2dCQUFFQyxTQUFTO2dCQUFPQyxPQUFPO1lBQXdCLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUM3RjtRQUVBLE1BQU1DLE9BQU8sQ0FBQzs7Ozs7TUFLWixFQUFFTCxLQUFLOzs7Ozs7SUFNVCxDQUFDO1FBRUQsTUFBTUosa0VBQVNBLENBQUM7WUFBRVUsSUFBSVA7WUFBT1EsU0FBUztZQUFvQ0Y7UUFBSztRQUUvRSxPQUFPVixrRkFBWUEsQ0FBQ00sSUFBSSxDQUFDO1lBQUVDLFNBQVM7UUFBSztJQUMzQyxFQUFFLE9BQU9DLE9BQU87UUFDZEssUUFBUUwsS0FBSyxDQUFDLHFDQUFxQ0E7UUFDbkQsT0FBT1Isa0ZBQVlBLENBQUNNLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU9DLE9BQU87UUFBdUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDNUY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2lkZW50aXR5Zmxvdy1hdXRvbWF0aW9uLy4vYXBwL2FwaS9zZW5kLXZlcmlmaWNhdGlvbi9yb3V0ZS50cz84Njc4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcclxuaW1wb3J0IHsgc2VuZEVtYWlsIH0gZnJvbSAnQC9saWIvc2VydmVyRW1haWxTZXJ2aWNlJ1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBlbWFpbCwgY29kZSB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKClcclxuXHJcbiAgICBpZiAoIWVtYWlsIHx8ICFjb2RlKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ01pc3NpbmcgZW1haWwgb3IgY29kZScgfSwgeyBzdGF0dXM6IDQwMCB9KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBgXHJcbkhlbGxvLFxyXG5cclxuUGxlYXNlIHVzZSB0aGUgZm9sbG93aW5nIHZlcmlmaWNhdGlvbiBjb2RlIHRvIGNvbXBsZXRlIHlvdXIgSWRlbnRpdHlGbG93IHNpZ24gdXA6XHJcblxyXG5Db2RlOiAke2NvZGV9XHJcblxyXG5JZiB5b3UgZGlkIG5vdCByZXF1ZXN0IHRoaXMsIHlvdSBjYW4gaWdub3JlIHRoaXMgbWVzc2FnZS5cclxuXHJcbkJlc3QgcmVnYXJkcyxcclxuSWRlbnRpdHlGbG93IFRlYW1cclxuICAgIGBcclxuXHJcbiAgICBhd2FpdCBzZW5kRW1haWwoeyB0bzogZW1haWwsIHN1YmplY3Q6ICdWZXJpZnkgeW91ciBJZGVudGl0eUZsb3cgYWNjb3VudCcsIGJvZHkgfSlcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBzZW5kIHZlcmlmaWNhdGlvbiBlbWFpbCcsIGVycm9yKVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnRmFpbGVkIHRvIHNlbmQgZW1haWwnIH0sIHsgc3RhdHVzOiA1MDAgfSlcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInNlbmRFbWFpbCIsIlBPU1QiLCJyZXF1ZXN0IiwiZW1haWwiLCJjb2RlIiwianNvbiIsInN1Y2Nlc3MiLCJlcnJvciIsInN0YXR1cyIsImJvZHkiLCJ0byIsInN1YmplY3QiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/send-verification/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/serverEmailService.ts":
/*!***********************************!*\
  !*** ./lib/serverEmailService.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sendEmail: () => (/* binding */ sendEmail)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"(rsc)/./node_modules/nodemailer/lib/nodemailer.js\");\n\nconst { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;\nconst isSMTPConfigured = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS);\nasync function sendEmail(options) {\n    const { to, subject, body } = options;\n    if (!isSMTPConfigured) {\n        console.log(\"\\uD83D\\uDCE7 (mock) Email not sent because SMTP is not configured:\", {\n            to,\n            subject,\n            body\n        });\n        return;\n    }\n    const transport = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({\n        host: SMTP_HOST,\n        port: Number(SMTP_PORT),\n        secure: Number(SMTP_PORT) === 465,\n        auth: {\n            user: SMTP_USER,\n            pass: SMTP_PASS\n        }\n    });\n    const from = SMTP_FROM || SMTP_USER;\n    await transport.sendMail({\n        from,\n        to,\n        subject,\n        text: body\n    });\n    console.log(`✅ Email sent to ${to}: ${subject}`);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2VydmVyRW1haWxTZXJ2aWNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQW1DO0FBRW5DLE1BQU0sRUFDSkMsU0FBUyxFQUNUQyxTQUFTLEVBQ1RDLFNBQVMsRUFDVEMsU0FBUyxFQUNUQyxTQUFTLEVBQ1YsR0FBR0MsUUFBUUMsR0FBRztBQUVmLE1BQU1DLG1CQUFtQkMsUUFBUVIsYUFBYUMsYUFBYUMsYUFBYUM7QUFFakUsZUFBZU0sVUFBVUMsT0FJL0I7SUFDQyxNQUFNLEVBQUVDLEVBQUUsRUFBRUMsT0FBTyxFQUFFQyxJQUFJLEVBQUUsR0FBR0g7SUFFOUIsSUFBSSxDQUFDSCxrQkFBa0I7UUFDckJPLFFBQVFDLEdBQUcsQ0FBQyxzRUFBNEQ7WUFBRUo7WUFBSUM7WUFBU0M7UUFBSztRQUM1RjtJQUNGO0lBRUEsTUFBTUcsWUFBWWpCLHVEQUEwQixDQUFDO1FBQzNDbUIsTUFBTWxCO1FBQ05tQixNQUFNQyxPQUFPbkI7UUFDYm9CLFFBQVFELE9BQU9uQixlQUFlO1FBQzlCcUIsTUFBTTtZQUNKQyxNQUFNckI7WUFDTnNCLE1BQU1yQjtRQUNSO0lBQ0Y7SUFFQSxNQUFNc0IsT0FBT3JCLGFBQWFGO0lBRTFCLE1BQU1jLFVBQVVVLFFBQVEsQ0FBQztRQUN2QkQ7UUFDQWQ7UUFDQUM7UUFDQWUsTUFBTWQ7SUFDUjtJQUVBQyxRQUFRQyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRUosR0FBRyxFQUFFLEVBQUVDLFFBQVEsQ0FBQztBQUNqRCIsInNvdXJjZXMiOlsid2VicGFjazovL2lkZW50aXR5Zmxvdy1hdXRvbWF0aW9uLy4vbGliL3NlcnZlckVtYWlsU2VydmljZS50cz9iOTg5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBub2RlbWFpbGVyIGZyb20gJ25vZGVtYWlsZXInXHJcblxyXG5jb25zdCB7XHJcbiAgU01UUF9IT1NULFxyXG4gIFNNVFBfUE9SVCxcclxuICBTTVRQX1VTRVIsXHJcbiAgU01UUF9QQVNTLFxyXG4gIFNNVFBfRlJPTSxcclxufSA9IHByb2Nlc3MuZW52XHJcblxyXG5jb25zdCBpc1NNVFBDb25maWd1cmVkID0gQm9vbGVhbihTTVRQX0hPU1QgJiYgU01UUF9QT1JUICYmIFNNVFBfVVNFUiAmJiBTTVRQX1BBU1MpXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZEVtYWlsKG9wdGlvbnM6IHtcclxuICB0bzogc3RyaW5nXHJcbiAgc3ViamVjdDogc3RyaW5nXHJcbiAgYm9keTogc3RyaW5nXHJcbn0pIHtcclxuICBjb25zdCB7IHRvLCBzdWJqZWN0LCBib2R5IH0gPSBvcHRpb25zXHJcblxyXG4gIGlmICghaXNTTVRQQ29uZmlndXJlZCkge1xyXG4gICAgY29uc29sZS5sb2coJ/Cfk6cgKG1vY2spIEVtYWlsIG5vdCBzZW50IGJlY2F1c2UgU01UUCBpcyBub3QgY29uZmlndXJlZDonLCB7IHRvLCBzdWJqZWN0LCBib2R5IH0pXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGNvbnN0IHRyYW5zcG9ydCA9IG5vZGVtYWlsZXIuY3JlYXRlVHJhbnNwb3J0KHtcclxuICAgIGhvc3Q6IFNNVFBfSE9TVCxcclxuICAgIHBvcnQ6IE51bWJlcihTTVRQX1BPUlQpLFxyXG4gICAgc2VjdXJlOiBOdW1iZXIoU01UUF9QT1JUKSA9PT0gNDY1LCAvLyB0cnVlIGZvciA0NjUsIGZhbHNlIGZvciBvdGhlciBwb3J0c1xyXG4gICAgYXV0aDoge1xyXG4gICAgICB1c2VyOiBTTVRQX1VTRVIsXHJcbiAgICAgIHBhc3M6IFNNVFBfUEFTUyxcclxuICAgIH0sXHJcbiAgfSlcclxuXHJcbiAgY29uc3QgZnJvbSA9IFNNVFBfRlJPTSB8fCBTTVRQX1VTRVJcclxuXHJcbiAgYXdhaXQgdHJhbnNwb3J0LnNlbmRNYWlsKHtcclxuICAgIGZyb20sXHJcbiAgICB0byxcclxuICAgIHN1YmplY3QsXHJcbiAgICB0ZXh0OiBib2R5LFxyXG4gIH0pXHJcblxyXG4gIGNvbnNvbGUubG9nKGDinIUgRW1haWwgc2VudCB0byAke3RvfTogJHtzdWJqZWN0fWApXHJcbn1cclxuIl0sIm5hbWVzIjpbIm5vZGVtYWlsZXIiLCJTTVRQX0hPU1QiLCJTTVRQX1BPUlQiLCJTTVRQX1VTRVIiLCJTTVRQX1BBU1MiLCJTTVRQX0ZST00iLCJwcm9jZXNzIiwiZW52IiwiaXNTTVRQQ29uZmlndXJlZCIsIkJvb2xlYW4iLCJzZW5kRW1haWwiLCJvcHRpb25zIiwidG8iLCJzdWJqZWN0IiwiYm9keSIsImNvbnNvbGUiLCJsb2ciLCJ0cmFuc3BvcnQiLCJjcmVhdGVUcmFuc3BvcnQiLCJob3N0IiwicG9ydCIsIk51bWJlciIsInNlY3VyZSIsImF1dGgiLCJ1c2VyIiwicGFzcyIsImZyb20iLCJzZW5kTWFpbCIsInRleHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/serverEmailService.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/nodemailer"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fsend-verification%2Froute&page=%2Fapi%2Fsend-verification%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-verification%2Froute.ts&appDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Csubra%5Ccontribution%5Cidentityflow-automation&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();