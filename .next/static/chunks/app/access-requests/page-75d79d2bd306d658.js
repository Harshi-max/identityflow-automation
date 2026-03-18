(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[734],{92457:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]])},24808:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("Box",[["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]])},13008:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},65883:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]])},68004:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]])},2882:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]])},25750:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]])},82549:function(e,t,s){"use strict";s.d(t,{Z:function(){return n}});var r=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let n=(0,r.Z)("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]])},86343:function(e,t,s){Promise.resolve().then(s.bind(s,83868))},83868:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return AccessRequests}});var r=s(57437),n=s(2265),a=s(51344),c=s(76843),l=s(924);function AccessRequests(){let{user:e}=(0,a.useAuth)(),[t,s]=(0,n.useState)(""),[i,u]=(0,n.useState)(""),handleSubmit=async r=>{if(r.preventDefault(),e)try{let r=await fetch("/api/access-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({employeeId:e.id,resource:t,duration:parseInt(i)})});r.ok&&(alert("Access request submitted successfully!"),s(""),u(""))}catch(e){console.error("Error submitting request:",e)}};return e?(0,r.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,r.jsx)(c.Z,{}),(0,r.jsxs)("div",{className:"max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8",children:[(0,r.jsx)(l.Z,{}),(0,r.jsx)("h1",{className:"text-3xl font-bold text-gray-900 mb-8",children:"Access Requests"}),(0,r.jsxs)("div",{className:"bg-white p-6 rounded-lg shadow",children:[(0,r.jsx)("h2",{className:"text-lg font-medium text-gray-900 mb-4",children:"Request Access"}),(0,r.jsxs)("form",{onSubmit:handleSubmit,className:"space-y-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"resource",className:"block text-sm font-medium text-gray-700",children:"Resource"}),(0,r.jsxs)("select",{id:"resource",value:t,onChange:e=>s(e.target.value),className:"mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",required:!0,children:[(0,r.jsx)("option",{value:"",children:"Select a resource"}),(0,r.jsx)("option",{value:"GitHub Repository",children:"GitHub Repository"}),(0,r.jsx)("option",{value:"AWS Console",children:"AWS Console"}),(0,r.jsx)("option",{value:"Database Access",children:"Database Access"}),(0,r.jsx)("option",{value:"DevOps Tools",children:"DevOps Tools"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"duration",className:"block text-sm font-medium text-gray-700",children:"Duration (days)"}),(0,r.jsx)("input",{type:"number",id:"duration",value:i,onChange:e=>u(e.target.value),className:"mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500",placeholder:"30",required:!0})]}),(0,r.jsx)("button",{type:"submit",className:"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700",children:"Submit Request"})]})]})]})]}):(0,r.jsx)("div",{className:"min-h-screen bg-gray-50 flex items-center justify-center",children:(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("h2",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Access Denied"}),(0,r.jsx)("p",{className:"text-gray-600",children:"Please log in to access this page."})]})})}},924:function(e,t,s){"use strict";s.d(t,{Z:function(){return BackButton}});var r=s(57437),n=s(61396),a=s.n(n),c=s(62898);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=(0,c.Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);function BackButton(e){let{href:t="/",label:s="Back"}=e;return(0,r.jsxs)(a(),{href:t,className:"inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors",children:[(0,r.jsx)(l,{className:"w-4 h-4 mr-2"}),s]})}}},function(e){e.O(0,[42,843,971,472,744],function(){return e(e.s=86343)}),_N_E=e.O()}]);