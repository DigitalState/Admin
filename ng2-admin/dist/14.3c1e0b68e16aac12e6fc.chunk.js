webpackJsonp([14],{1772:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),i=n(10),s=n(4),r=n(315),o=(n.n(r),n(834)),c=(n.n(o),n(1951)),l=n(1871),d=n(314),u=n(317),p=n(1870);n.d(e,"DsProfileModule",(function(){return m}));var m=(function(){function t(){}return t})();m=__decorate([n.i(a.NgModule)({imports:[i.CommonModule,s.FormsModule,r.NgxDatatableModule,o.LaddaModule,u.a,c.a],declarations:[p.a],providers:[l.a,l.b,d.a,d.c]})],m)},1788:function(t,e,n){"use strict";var a=n(0),i=n(29),s=n(10),r=n(316),o=n(206),c=n(46);n.d(e,"a",(function(){return l}));var l=(function(){function t(t){this.injector=t,this.pageBreadcrumbData={},this.route=this.injector.get(i.b),this.location=this.injector.get(s.Location),this.staticTranslate=this.injector.get(r.a),this.globalState=this.injector.get(c.a),this.breadcrumbService=this.injector.get(o.a)}return t.prototype.ngOnInit=function(){this.pageTitle&&this.applyPageTitle(),this.setBreadcrumbData()},t.prototype.applyPageTitle=function(t){var e=this,n=t||this.pageTitle;n&&setTimeout((function(){e.globalState.notifyDataChanged("menu.activeLink",{title:n})}))},t.prototype.setBreadcrumbData=function(){this.pageTitle&&(this.pageBreadcrumbData.title=this.pageTitle)},t.prototype.buildBreadcrumb=function(){var t=this.location.path().split("/").slice(2,3).map((function(t){return"path-"+t}));return{title:"string"==typeof this.pageBreadcrumbData.title?this.staticTranslate.instantAll(this.pageBreadcrumbData.title):this.pageBreadcrumbData.title,subtitle:"string"==typeof this.pageBreadcrumbData.subtitle?this.staticTranslate.instantAll(this.pageBreadcrumbData.subtitle):this.pageBreadcrumbData.subtitle,link:this.location.path(),tags:[].concat(t,this.pageBreadcrumbData.tags),routeData:this.route.snapshot.data}},t.prototype.commitBreadcrumb=function(t,e){t||(t=this.buildBreadcrumb()),this.breadcrumbService.push(t,e)},t})();l=__decorate([n.i(a.Component)({}),__metadata("design:paramtypes",[a.Injector])],l)},1870:function(t,e,n){"use strict";var a=n(0),i=n(21),s=n(146),r=(n.n(s),n(147)),o=n(52),c=n(314),l=n(209),d=n(840),u=n(1788),p=n(1871),m=n(46),h=n(25),b=n(211),g=n.n(b);n.d(e,"a",(function(){return v}));var v=(function(t){function e(e,n,a,i,s,r,o,c,l){var d=t.call(this,e)||this;return d.injector=e,d.globalState=n,d.appState=a,d.translate=i,d.modal=s,d.auth=r,d.identityApiService=o,d.microserviceConfig=c,d.toastr=l,d.pageTitle="general.menu.profile",d.personaSaveInProgress=!1,d.user=d.auth.getAuthUser(),d.userFormData={email:""},d.authEndpoint=d.appState.get("microservices").authentication.paths[d.user.identity.toLowerCase()],d}return __extends(e,t),e.prototype.ngOnInit=function(){var e=this;t.prototype.ngOnInit.call(this),this.commitBreadcrumb(),this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(t){e.init()})),this.init()},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber.unsubscribe()},e.prototype.init=function(){var t=this;setTimeout((function(){t.globalState.notifyDataChanged("menu.activeLink",{title:"general.menu.profile"})})),this.auth.fetchUser().subscribe((function(e){t.user&&(t.user.email=e.email,t.userFormData.email=t.user.email)})),this.user&&this.loadPersona()},e.prototype.loadPersona=function(){var t=this,e=l.a.getPersonaUrlPrefix(this.user.identity),n=l.a.getSingular(this.user.identity),a={};a[n+".uuid"]=this.user.identityUuid,this.identityApiService.resource(e).getList(a).subscribe((function(e){e.length>0&&(t.persona=e[0],t.persona.route+="/"+t.persona.uuid)}))},e.prototype.savePersona=function(){var t=this;this.personaSaveInProgress=!0,this.persona.put().subscribe((function(e){g()(t.persona,e),t.toastr.success(t.translate.instant("ds.messages.personaSaveSucceeded"))}),(function(e){t.toastr.error(t.translate.instant("ds.messages.personaSaveFailed"))}),(function(){t.personaSaveInProgress=!1}))},e.prototype.saveUser=function(t){var e=this;this.auth.updateUser(this.userFormData).subscribe((function(n){e.toastr.success(e.translate.instant("ds.messages.identitySaveSucceeded")),e.auth.login(e.authEndpoint,e.user.username,t).finally((function(){})).subscribe((function(t){t&&e.toastr.success(e.translate.instant("ds.messages.tokenUpdateSucceeded"))}),(function(t){e.toastr.error(e.translate.instant("ds.messages.tokenUpdateFailed")+" "+t.message)}))}),(function(t){e.toastr.error(e.translate.instant("ds.messages.identitySaveFailed"))}))},e.prototype.openCredentialsModal=function(){var t=this,e={size:"sm",windowClass:"credentials-modal"};this.credentialsModal=this.modal.open(d.a,e),this.credentialsModal.componentInstance.authEndpoint=this.authEndpoint,this.credentialsModal.componentInstance.username=this.user.username,this.credentialsModal.result.then((function(e){e&&"success"===e.status&&t.saveUser(e.password)}),(function(t){}))},e})(u.a);v=__decorate([n.i(a.Component)({selector:"ds-profile",template:n(2e3)}),__metadata("design:paramtypes",[a.Injector,m.a,h.a,i.c,r.c,o.a,p.b,c.a,s.ToastsManager])],v)},1871:function(t,e,n){"use strict";var a=n(0),i=n(148),s=(n.n(i),n(314)),r=n(25),o=n(52),c=n(208),l=n(37);n.n(l);n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return u}));var d=(function(t){function e(e,n){var a=t.call(this,e,n)||this;return a.restangular=e,a.injector=n,a}return __extends(e,t),e})(c.a);d=__decorate([n.i(a.Injectable)(),__param(0,n.i(a.Inject)(s.d)),__metadata("design:paramtypes",[Object,a.Injector])],d);var u=(function(t){function e(e,a,i){var r=t.call(this)||this;r.restangular=e,r.appState=a,r.auth=i;var o=new s.a;return o.name="identities",o.settings=r.appState.get("microservices")[o.name],r.restangular=n.i(s.b)(e,i,o),r}return __extends(e,t),e})(c.a);u=__decorate([n.i(a.Injectable)(),__metadata("design:paramtypes",[i.Restangular,r.a,o.a])],u)},1951:function(t,e,n){"use strict";var a=n(29),i=n(320),s=n(1870);n.d(e,"a",(function(){return o}));var r=[{path:"",component:s.a,canActivate:[i.a],children:[]}],o=a.a.forChild(r)},2e3:function(t,e){t.exports='\n<div class="">\n\t<div class="row">\n\t\t<div class="col">\n\t\t\t<form class="card entity-card animated fadeIn">\n\t\t\t\t<div class="card-header">\n\t\t\t\t\t<div class="row justify-content-between">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<h3 class="card-title" translate>{{\'ds.microservices.entity.property.identity\'}}</h3>\n\t\t\t\t\t\t\t<h4 class="card-subtitle">{{user.username}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6 mt-3 mt-sm-0">\n\t\t\t\t\t\t\t<ul class="btn-list clearfix">\n\t\t\t\t\t\t\t\t<li class="float-right">\n\t\t\t\t\t\t\t\t\t<button (click)="openCredentialsModal($event)" type="button" class="btn btn-primary btn-with-icon"><i class="ion-edit">{{\'ds.microservices.entity.action.save\' | translate}}</i></button>\n\t\t\t\t\t\t\t\t\t<ng-content select="button.entity-action"></ng-content>\n\t\t\t\t\t\t\t\t\t\x3c!--<button (click)="" type="button" class="btn btn-danger btn-with-icon"><i class="ion-android-delete">{{\'ds.microservices.entity.action.delete\' | translate}}</i></button>--\x3e\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="card-block entity-body entity-data">\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="username">{{ \'ds.microservices.entity.property.username\' | translate }}</label>\n\t\t\t\t\t\t<input disabled id="username" name="username" type="text" [(ngModel)]="user.username" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="identity">{{ \'ds.microservices.entity.property.identity\' | translate }}</label>\n\t\t\t\t\t\t<input disabled id="identity" name="identity" type="text" [(ngModel)]="user.identity" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="identityUuid">{{ \'ds.microservices.entity.property.identityUuid\' | translate }}</label>\n\t\t\t\t\t\t<input disabled id="identityUuid" name="identityUuid" type="text" [(ngModel)]="user.identityUuid" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="email">{{ \'login.email\' | translate }}</label>\n\t\t\t\t\t\t<input id="email" name="email" type="email" [(ngModel)]="userFormData.email" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t\x3c!--<div class="form-group">--\x3e\n\t\t\t\t\t\t\x3c!--<label for="plainPassword">{{ \'login.password\' | translate }}</label>--\x3e\n\t\t\t\t\t\t\x3c!--<input iuserFormData" name="plainPassword" type="password" [(ngModel)]="identityFormData.plainPassword" class="form-control">--\x3e\n\t\t\t\t\t\x3c!--</div>--\x3e\n\t\t\t\t</div>\n\t\t\t</form>\n\n\t\t\t<div *ngIf="!persona" class="card entity-card animated fadeIn">\n\t\t\t\t<div class="card-block entity-body entity-data">\n\t\t\t\t\t{{ \'ds.messages.noPersonasFound\' | translate }}\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<form *ngIf="persona" class="card entity-card animated fadeIn">\n\t\t\t\t<div class="card-header">\n\t\t\t\t\t<div class="row justify-content-between">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<h3 class="card-title" translate>Persona</h3>\n\t\t\t\t\t\t\t<h4 class="card-subtitle">{{persona.title | entityTranslate}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6 mt-3 mt-sm-0">\n\t\t\t\t\t\t\t<ul class="btn-list clearfix">\n\t\t\t\t\t\t\t\t<li class="float-right">\n\t\t\t\t\t\t\t\t\t<button (click)="savePersona($event)" type="button" [disabled]="personaSaveInProgress" [ladda]="personaSaveInProgress" class="btn btn-primary btn-with-icon"><i class="ion-edit">{{\'ds.microservices.entity.action.save\' | translate}}</i></button>\n\t\t\t\t\t\t\t\t\t<ng-content select="button.entity-action"></ng-content>\n\t\t\t\t\t\t\t\t\t\x3c!--<button (click)="" type="button" class="btn btn-danger btn-with-icon"><i class="ion-android-delete">{{\'ds.microservices.entity.action.delete\' | translate}}</i></button>--\x3e\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="card-block entity-body entity-data">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col">\n\t\t\t\t\t\t\t<div class="form-group" *ngFor="let item of persona.data | keyValue" [ngSwitch]="item.key">\n\t\t\t\t\t\t\t\t<label [for]="\'data-\' + item.key">{{ (\'ds.microservices.entity.property.\' + item.key) | translate }}</label>\n\t\t\t\t\t\t\t\t<input *ngSwitchDefault [id]="\'data-\' + item.key" [name]="item.key" type="text" [(ngModel)]="persona.data[item.key]" class="form-control" placeholder="">\n\t\t\t\t\t\t\t\t<textarea *ngSwitchCase="\'address\'" [id]="\'data-\' + item.key" [name]="item.key" [(ngModel)]="persona.data[item.key]" class="form-control" placeholder=""></textarea>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>'}});