"use strict";(self.webpackChunkPMS=self.webpackChunkPMS||[]).push([[122],{5122:(k,g,a)=>{a.r(g),a.d(g,{DashboardModule:()=>T});var c=a(6814),r=a(8642),t=a(5879),u=a(617),h=a(2296),l=a(4677);let f=(()=>{class e{constructor(i){this._Router=i}logout(){localStorage.clear(),this._Router.navigate(["/auth"])}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(r.F0))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-navbar"]],decls:34,vars:1,consts:[[1,"d-flex","justify-content-between","align-items-center","shadow","w-100","py-2","px-0"],[1,"w-25"],["src","../../../../assets/images/logo-dark.png","alt","logo",1,"w-50"],[1,"user-content","d-flex","align-items-center","gap-4"],[1,"fa-solid","fa-bell","fa-3x","main-text-color","border-end","px-4"],[1,"d-flex","align-items-center","gap-3"],[1,"w-25","mb-0","text-end"],["src","../../../../assets/images/profile.jpeg","alt","profile image",1,"rounded-circle","w-50"],[1,"user"],[1,"mb-0","fw-bold"],[1,"mb-0","text-secondary"],["mat-icon-button","","aria-label","Example icon-button with a menu",1,"text-white","position-relative","z-3",3,"matMenuTriggerFor"],[1,"text-black"],["menu","matMenu"],["mat-menu-item","",3,"click"],["mat-menu-item","","type","button"]],template:function(n,o){if(1&n&&(t.TgZ(0,"nav",0)(1,"figure",1),t._UZ(2,"img",2),t.qZA(),t.TgZ(3,"div",3),t._UZ(4,"i",4),t.TgZ(5,"div",5)(6,"figure",6),t._UZ(7,"img",7),t.qZA(),t.TgZ(8,"div",8)(9,"p",9),t._uU(10,"Upskilling"),t.qZA(),t.TgZ(11,"p",10),t._uU(12,"upskilling@gmail.com"),t.qZA()(),t.TgZ(13,"div")(14,"button",11)(15,"mat-icon",12),t._uU(16,"keyboard_arrow_down"),t.qZA()(),t.TgZ(17,"mat-menu",null,13)(19,"button",14),t.NdJ("click",function(){return o.logout()}),t.TgZ(20,"mat-icon"),t._uU(21,"logout"),t.qZA(),t.TgZ(22,"span"),t._uU(23,"Logout"),t.qZA()(),t.TgZ(24,"button",15)(25,"mat-icon"),t._uU(26,"lock"),t.qZA(),t.TgZ(27,"span"),t._uU(28,"Change Password"),t.qZA()(),t.TgZ(29,"button",15)(30,"mat-icon"),t._uU(31,"update"),t.qZA(),t.TgZ(32,"span"),t._uU(33,"Update Profile"),t.qZA()()()()()()()),2&n){const s=t.MAs(18);t.xp6(14),t.Q6J("matMenuTriggerFor",s)}},dependencies:[u.Hw,h.RK,l.VK,l.OP,l.p6]})}return e})();var b=a(2989);const C=["aside"];function x(e,p){if(1&e){const i=t.EpF();t.TgZ(0,"i",6),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.collapsing())}),t.qZA()}if(2&e){const i=t.oxw();t.Tol(i.collapsed?"fa-solid fa-chevron-right":"fa-solid fa-chevron-left")}}function M(e,p){if(1&e&&(t.TgZ(0,"li",8)(1,"a",9)(2,"span"),t._UZ(3,"i",10),t.qZA(),t.TgZ(4,"span",10),t._uU(5),t.qZA()()()),2&e){const i=t.oxw().$implicit,n=t.oxw();t.xp6(1),t.Q6J("routerLink",i.link),t.xp6(2),t.Tol(i.icon),t.xp6(1),t.Tol(n.collapsed||n.textLinkVisibility?"opacity-0 d-none":"opacity-100 d-inline"),t.xp6(1),t.Oqu(i.text)}}function _(e,p){if(1&e&&(t.ynx(0),t.YNc(1,M,6,6,"li",7),t.BQk()),2&e){const i=p.$implicit;t.xp6(1),t.Q6J("ngIf",i.isActive)}}let v=(()=>{class e{constructor(i){this._AuthService=i,this.sidebarCollapsed=new t.vpe,this.collapsed=!1,this.asideWidth=0,this.textLinkVisibility=!1,this.arrowVisibility=!1,this.menu=[{text:"Home",link:"/dashboard/home",icon:"fa-solid fa-house",isActive:this.isManager()||this.isEmployee()},{text:"Users",link:"/dashboard/manager/users",icon:"fa-solid fa-users",isActive:this.isManager()},{text:"Projects",link:"/dashboard/employee/projects",icon:"fa-solid fa-bars-progress",isActive:this.isEmployee()},{text:"Tasks",link:"/dashboard/employee/tasks",icon:"fa-solid fa-heart",isActive:this.isEmployee()},{text:"Projects",link:"/dashboard/manager/projects",icon:"fa-solid fa-list-check",isActive:this.isManager()},{text:"Tasks",link:"/dashboard/manager/tasks",icon:"fa-solid fa-layer-group",isActive:this.isManager()}]}ngOnInit(){}onResize(i){this.asideWidth=this.asideElement.nativeElement.offsetWidth,this.textLinkVisibility=this.asideWidth<=182,this.arrowVisibility=window.innerWidth<=767}isManager(){return"Manager"==this._AuthService.role}isEmployee(){return"Employee"==this._AuthService.role}collapsing(){this.collapsed=!this.collapsed,this.sidebarCollapsed.emit(this.collapsed)}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(b.e))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-sidebar"]],viewQuery:function(n,o){if(1&n&&t.Gf(C,5),2&n){let s;t.iGM(s=t.CRH())&&(o.asideElement=s.first)}},hostBindings:function(n,o){1&n&&t.NdJ("resize",function(m){return o.onResize(m)},!1,t.Jf7)},outputs:{sidebarCollapsed:"sidebarCollapsed"},decls:6,vars:4,consts:[[1,"overflow-hidden","py-4"],["aside",""],[1,"mt-md-5","py-2","py-md-0","px-4","px-md-0"],["class","position-absolute end-0 top-0 fa-2x bg-main-background p-2 text-white main-transition rounded-bottom-1","role","button",3,"class","click",4,"ngIf"],[1,"list-unstyled","d-flex","flex-md-column","justify-content-center","justify-content-md-start","gap-md-3","gap-2","mb-0"],[4,"ngFor","ngForOf"],["role","button",1,"position-absolute","end-0","top-0","fa-2x","bg-main-background","p-2","text-white","main-transition","rounded-bottom-1",3,"click"],["routerLinkActive","active-li",4,"ngIf"],["routerLinkActive","active-li"],[1,"text-decoration-none","d-flex","text-center",3,"routerLink"],[1,"main-transition"]],template:function(n,o){1&n&&(t.TgZ(0,"aside",0,1)(2,"div",2),t.YNc(3,x,1,2,"i",3),t.TgZ(4,"ul",4),t.YNc(5,_,2,1,"ng-container",5),t.qZA()()()),2&n&&(t.Tol(o.collapsed?"sidebar-collapsed":""),t.xp6(3),t.Q6J("ngIf",!o.arrowVisibility),t.xp6(2),t.Q6J("ngForOf",o.menu))},dependencies:[c.sg,c.O5,r.rH,r.Od],styles:["aside[_ngcontent-%COMP%]{top:0;left:0;background-color:#0e382f;transition:.3s linear;height:100vh;position:sticky}aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{position:relative;padding:10px 30px;cursor:pointer}aside[_ngcontent-%COMP%]   li.active-li[_ngcontent-%COMP%]{background-color:#ef9b2880;animation:_ngcontent-%COMP%_shakeAnimation .6s linear}aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;font-size:1.5rem}aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{transition:.5s linear}aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){margin:0 .9rem}@media (max-width: 991px){aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.5rem}}@media (max-width: 767px){aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:.2rem}aside[_ngcontent-%COMP%]   figure[_ngcontent-%COMP%]{display:none}}@keyframes _ngcontent-%COMP%_shakeAnimation{0%,to{transform:translate(8px)}50%{transform:translate(-8px)}}.icon[_ngcontent-%COMP%]{top:80%!important;transition:.5s linear}@media (max-width: 767px){.icon[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]{position:fixed!important;top:unset;bottom:0!important;padding:5px!important;width:100%!important;height:5vh!important;z-index:999999999}.icon[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{padding:5px 7px}.icon[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   li.active-li[_ngcontent-%COMP%]{background-color:#00924d30;transform:translateY(0);animation:_ngcontent-%COMP%_shakeAnimationHorizontal .6s linear}.icon[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   li.active-li[_ngcontent-%COMP%]:before{top:-15px;left:0;height:30%;width:100%}.icon[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1){margin:0 .4rem}}@keyframes _ngcontent-%COMP%_shakeAnimationHorizontal{0%,to{transform:translateY(0)}50%{transform:translateY(-5px)}}@media (max-width: 767px){aside[_ngcontent-%COMP%]{height:auto;position:absolute;top:unset;bottom:0;left:0;width:100%}}"]})}return e})(),P=(()=>{class e{constructor(){this.sidebarCollapsed=!1}onToggleSidebar(i){this.sidebarCollapsed=i}static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-dashboard"]],decls:7,vars:4,consts:[[1,"row"],[1,"col-12","p-0"],[1,"animatedToggle"],[3,"sidebarCollapsed"],[1,"animatedToggle","py-3"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"app-navbar"),t.qZA(),t.TgZ(3,"div",2)(4,"app-sidebar",3),t.NdJ("sidebarCollapsed",function(m){return o.onToggleSidebar(m)}),t.qZA()(),t.TgZ(5,"div",4),t._UZ(6,"router-outlet"),t.qZA()()),2&n&&(t.xp6(3),t.Tol(o.sidebarCollapsed?"col-md-1":"col-md-2"),t.xp6(2),t.Tol(o.sidebarCollapsed?"col-md-11 px-4":"col-md-10 px-5"))},dependencies:[r.lC,f,v],styles:[".animatedToggle[_ngcontent-%COMP%]{transition:.3s linear}"]})}return e})();var d=a(6469);const y=[{path:"",component:P,children:[{path:"home",component:(()=>{class e{constructor(){this.tasksChart=new d.kL({chart:{type:"pie",width:500,height:300},title:{text:"Tasks",floating:!0},credits:{enabled:!1},tooltip:{formatter:function(){return"<b>"+this.point.name+"</b>: "+this.point.y}},series:[{type:"pie",data:[{name:"Progress",y:7,color:"#000"},{name:"Tasks Number",y:3,color:"#393e64"},{name:"Project Number",y:1,color:"#00adb5"}]}]}),this.usersChart=new d.kL({chart:{type:"pie",width:500,height:300},title:{text:"Users",floating:!1},credits:{enabled:!1},tooltip:{formatter:function(){return"<b>"+this.point.name+"</b>: "+this.point.y}},series:[{type:"pie",data:[{name:"Active",y:7,color:"#000"},{name:"Inactive",y:2,color:"#393e64"}]}]})}static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-home"]],decls:25,vars:2,consts:[[1,"d-flex","flex-column","justify-content-between","gap-5"],[1,"top-section","rounded-3","overflow-hidden","px-5"],[1,"text-white"],[1,"bottom-section","d-flex","justify-content-between","align-items-center","px-5"],[1,"p-5","shadow","rounded-3"],[1,"title-content"],[1,"fw-bold"],[1,"w-100",3,"chart"]],template:function(n,o){1&n&&(t.TgZ(0,"section",0)(1,"article",1)(2,"h2",2),t._uU(3,"Welcome "),t.TgZ(4,"span"),t._uU(5,"UpSkilling"),t.qZA()(),t.TgZ(6,"p",2),t._uU(7,"You can add project and assign tasks to your team"),t.qZA()(),t.TgZ(8,"article",3)(9,"div",4)(10,"div",5)(11,"h3",6),t._uU(12,"Tasks"),t.qZA(),t.TgZ(13,"p"),t._uU(14,"Lorem ipsum dolor sit amet, consectetur"),t.qZA()(),t.TgZ(15,"div"),t._UZ(16,"div",7),t.qZA()(),t.TgZ(17,"div",4)(18,"div",5)(19,"h3",6),t._uU(20,"Users"),t.qZA(),t.TgZ(21,"p"),t._uU(22,"Lorem ipsum dolor sit amet, consectetur"),t.qZA()(),t.TgZ(23,"div"),t._UZ(24,"div",7),t.qZA()()()()),2&n&&(t.xp6(16),t.Q6J("chart",o.tasksChart),t.xp6(8),t.Q6J("chart",o.usersChart))},dependencies:[d.Dm],styles:["section[_ngcontent-%COMP%]{height:100%}section[_ngcontent-%COMP%]   .top-section[_ngcontent-%COMP%]{background-image:url(home-bg.6f2a5bea1f402843.png);background-position:center center;background-size:100% 100%;background-repeat:no-repeat;padding:15rem 0}section[_ngcontent-%COMP%]   .top-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#ef9b28;font-weight:400}section[_ngcontent-%COMP%]   .top-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.3rem}section[_ngcontent-%COMP%]   .bottom-section[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]{border-left:6px solid #ef9b28;padding-left:20px}"]})}return e})(),title:"home"}]},{path:"employee",loadChildren:()=>a.e(671).then(a.bind(a,9671)).then(e=>e.EmployeeModule)},{path:"manager",loadChildren:()=>a.e(68).then(a.bind(a,8532)).then(e=>e.ManagerModule)}];let O=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[r.Bz.forChild(y),r.Bz]})}return e})();var Z=a(6208);let T=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[c.ez,O,Z.m]})}return e})()}}]);