/*! For license information please see queue-manager.js.LICENSE.txt */
new Vue({el:"#main",delimiters:["[[","]]"],data:function(){return{loading:!1,indexTimeout:null,jobs:[],totalJobs:null,totalJobsFormatted:null,activeJobId:null,activeJob:null,limit:50}},mounted:function(){var t=this;document.getElementById("queue-manager-utility").removeAttribute("class"),Craft.cp.on("setJobInfo",(function(){t.jobs=Craft.cp.jobInfo.slice(0),t.totalJobs=Craft.cp.totalJobs,t.totalJobsFormatted=Craft.formatNumber(t.totalJobs),t.loading||t.refreshActiveJob()})),window.onpopstate=function(e){e.state&&e.state.jobId?t.setActiveJob(e.state.jobId,!1):t.clearActiveJob(!1)};var e=Craft.path.match(/utilities\/queue-manager\/([^\/]+)/);if(e){var r=e[1];history.replaceState({jobId:r},"",this.url(r)),this.setActiveJob(r,!1)}},methods:{updateJobProgress:function(){Craft.cp.trackJobProgress(!1,!0)},setActiveJob:function(t,e){var r=this;return new Promise((function(a,o){window.clearTimeout(r.indexTimeout),r.loading=!0,r.activeJobId=t,e&&history.pushState({jobId:t},"",r.url(t)),axios.get(Craft.getActionUrl("queue/get-job-details?id="+t,{})).then((function(t){t.data.id==r.activeJobId?(r.activeJob=t.data,r.loading=!1,a(!0)):a(!1)}),(function(t){var e;Craft.cp.displayError(null==t||null===(e=t.response)||void 0===e||null===(e=e.data)||void 0===e?void 0:e.message),o(t)}))}))},refreshActiveJob:function(){var t=this;return new Promise((function(e,r){if(t.activeJobId){var a=t.activeJob;t.setActiveJob(t.activeJobId,!1).then((function(r){r&&a&&3==t.activeJob.status&&($.extend(a,{progress:100,status:3}),delete a.error,delete a.progressLabel,t.activeJob=a),e(r)})).catch(r)}else e(!1)}))},retryAll:function(){var t=this;return new Promise((function(e,r){window.clearTimeout(t.indexTimeout),Craft.sendActionRequest("POST","queue/retry-all").then((function(r){Craft.cp.displayNotice(Craft.t("app","Retrying all failed jobs.")),t.updateJobProgress(),e()})).catch(r)}))},releaseAll:function(){var t=this;return new Promise((function(e,r){confirm(Craft.t("app","Are you sure you want to release all jobs in the queue?"))?Craft.sendActionRequest("POST","queue/release-all").then((function(r){Craft.cp.displayNotice(Craft.t("app","All jobs released.")),t.clearActiveJob(!0),t.updateJobProgress(),e(!0)})).catch(r):e(!1)}))},retryJob:function(t){var e=this;return new Promise((function(r,a){if(2==t.status){var o=Craft.t("app","Are you sure you want to restart the job “{description}”? Any progress could be lost.",{description:t.description});if(!confirm(o))return void r(!1)}window.clearTimeout(e.indexTimeout),Craft.sendActionRequest("POST","queue/retry",{data:{id:t.id}}).then((function(a){2==t.status?Craft.cp.displayNotice(Craft.t("app","Job restarted.")):Craft.cp.displayNotice(Craft.t("app","Job retried.")),e.updateJobProgress(),r(!0)})).catch(a)}))},retryActiveJob:function(){var t=this;return new Promise((function(e,r){t.retryJob(t.activeJob).then(e).catch(r)}))},releaseJob:function(t){var e=this;return new Promise((function(r,a){var o=Craft.t("app","Are you sure you want to release the job “{description}”?",{description:t.description});confirm(o)?Craft.sendActionRequest("POST","queue/release",{data:{id:t.id}}).then((function(t){Craft.cp.displayNotice(Craft.t("app","Job released.")),e.updateJobProgress(),r(!0)})).catch((function(t){return t.response,a})):r(!1)}))},releaseActiveJob:function(){var t=this;return new Promise((function(e,r){t.releaseJob(t.activeJob).then((function(r){r&&t.clearActiveJob(!0),e(r)})).catch(r)}))},clearActiveJob:function(t){this.activeJob&&(this.activeJob=null,this.activeJobId=null,t&&history.pushState({},"",this.url()))},url:function(t){return Craft.getUrl("utilities/queue-manager"+(t?"/"+t:""))},isRetryable:function(t){return 2==t.status||4==t.status},jobStatusClass:function(t){return 4==t?"error":""},jobStatusLabel:function(t,e){if(e)return Craft.t("app","Delayed");switch(t){case 1:return Craft.t("app","Pending");case 2:return Craft.t("app","Reserved");case 3:return Craft.t("app","Finished");case 4:return Craft.t("app","Failed");default:return""}},jobStatusIconClass:function(t){var e="status";switch(t){case 1:e+=" orange";break;case 2:e+=" green";break;case 4:e+=" red"}return e},jobAttributeName:function(t){switch(t){case"id":return Craft.t("app","ID");case"status":return Craft.t("app","Status");case"progress":return Craft.t("app","Progress");case"description":return Craft.t("app","Description");case"ttr":return Craft.t("app","Time to reserve");case"error":return Craft.t("app","Error");default:return t}},ttrValue:function(t){return Craft.t("app","{num, number} {num, plural, =1{second} other{seconds}}",{num:t})}}});
//# sourceMappingURL=queue-manager.js.map