webpackJsonp([16],{1424:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n(10),r=n(21),s=n(267),o=(n.n(s),n(638)),c=n(1614),l=n(1515),d=n(1439),u=n(270),p=n(1514);n.d(e,"DsProfileModule",(function(){return f}));var f=(function(){function t(){}return t})();f=__decorate([n.i(i.NgModule)({imports:[a.CommonModule,r.FormsModule,s.NgxDatatableModule,o.a,u.a,c.a],declarations:[p.a],providers:[l.a,l.b,d.a,d.b]})],f)},1439:function(t,e,n){"use strict";var i=n(634),a=(n.n(i),n(1)),r=n(173);n.d(e,"a",(function(){return s})),n.d(e,"d",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return l}));var s=(function(){function t(){}return t})(),o=function(t,e,n){return t.withConfig((function(t){t.setBaseUrl(n.settings.entrypoint.url),t.addFullRequestInterceptor((function(t,n,i,a,r,s){var o={},c=e.getToken();return o.headers=Object.assign({},r,{Authorization:"Bearer "+c}),"put"==n&&console.log(t),o}))}))},c=new a.InjectionToken("MicroserviceRestangular"),l={provide:c,useFactory:o,deps:[i.Restangular,r.a,s]}},1440:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var i=(function(){function t(){this.size=20,this.totalItems=0,this.totalPages=0,this.pageNumber=0}return t})()},1446:function(t,e,n){"use strict";var i=n(1440);n.d(e,"a",(function(){return a}));var a=(function(){function t(){this.data=new Array,this.pager=new i.a}return t})()},1447:function(t,e,n){"use strict";var i=n(1446),a=n(62);n.n(a);n.d(e,"a",(function(){return r}));var r=(function(){function t(t){this.restangular=t}return t.prototype.resource=function(t){return this.restangular.all(t)},t.prototype.one=function(t,e){return this.restangular.one(t,e)},t.prototype.getOne=function(t,e){return this.restangular.one(t,e).get()},t.prototype.getList=function(t){var e=this;return this.restangular.all(t.path).getList(t.buildParameters()).reduce((function(n,i){return t.pager.totalItems=i.metadata["hydra:totalItems"],t.pager.totalPages=Math.ceil(t.pager.totalItems/t.pager.size),n.pager=t.pager,n.data=i.map(e.mapToEntity),n}),new i.a)},t.prototype.mapToEntity=function(t){return t},t})()},1514:function(t,e,n){"use strict";var i=n(1),a=n(63),r=n(266),s=(n.n(r),n(85)),o=n(173),c=n(1439),l=n(1515);n.d(e,"a",(function(){return d}));var d=(function(){function t(t,e,n,i,a,r,s){this.injector=t,this.globalState=e,this.translate=n,this.auth=i,this.identityApiService=a,this.microserviceConfig=r,this.toastr=s,this.user=this.auth.getAuthUser(),this.identityFormData={email:this.user.username}}return t.prototype.ngOnInit=function(){var t=this;this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(e){t.init()})),this.init()},t.prototype.ngOnDestroy=function(){this.languageChangeSubscriber.unsubscribe()},t.prototype.init=function(){var t=this;setTimeout((function(){t.globalState.notifyDataChanged("menu.activeLink",{title:"general.menu.profile"})})),this.user&&this.loadPersona()},t.prototype.loadPersona=function(){var t=this;this.identityApiService.resource("individual-personas").getList({"individual.uuid":this.user.identityUuid}).subscribe((function(e){e.length>0&&(t.persona=e[0],console.log(t.persona))}))},t.prototype.savePersona=function(){var t=this;console.log(this.persona),this.persona.put().subscribe((function(e){t.toastr.success("Persona information saved successfully")}),(function(e){t.toastr.error("Failed to save persona information")}))},t.prototype.saveUser=function(){this.toastr.success("Sample success response!")},t})();d=__decorate([n.i(i.Component)({selector:"ds-profile",template:n(1789)}),__metadata("design:paramtypes",[i.Injector,s.a,a.c,o.a,l.b,c.a,r.ToastsManager])],d)},1515:function(t,e,n){"use strict";var i=n(1),a=n(634),r=(n.n(a),n(1439)),s=n(101),o=n(173),c=n(1447),l=n(62);n.n(l);n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return u}));var d=(function(t){function e(e){var n=t.call(this,e)||this;return n.restangular=e,n}return __extends(e,t),e})(c.a);d=__decorate([n.i(i.Injectable)(),__param(0,n.i(i.Inject)(r.c)),__metadata("design:paramtypes",[Object])],d);var u=(function(t){function e(e,i,a){var s=t.call(this)||this;s.restangular=e,s.appState=i,s.auth=a;var o=new r.a;return o.name="identities",o.settings=s.appState.get("microservices")[o.name],s.restangular=n.i(r.d)(e,a,o),s}return __extends(e,t),e})(c.a);u=__decorate([n.i(i.Injectable)(),__metadata("design:paramtypes",[a.Restangular,s.a,o.a])],u)},1614:function(t,e,n){"use strict";var i=n(32),a=n(1514);n.d(e,"a",(function(){return s}));var r=[{path:"",component:a.a,children:[]}],s=i.a.forChild(r)},1789:function(t,e){t.exports='\n<div class="">\n\t<div class="row">\n\t\t<div [ngClass]="{\'col-sm-12\': !persona, \'col-sm-6\': persona}">\n\t\t\t<form class="card entity-card animated fadeIn">\n\t\t\t\t<div class="card-header">\n\t\t\t\t\t<div class="row justify-content-between">\n\t\t\t\t\t\t<div class="col-6">\n\t\t\t\t\t\t\t<h3 class="card-title" translate>{{\'ds.microservices.entity.property.identity\'}}</h3>\n\t\t\t\t\t\t\t<h4 class="card-subtitle">{{user.username}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-6">\n\t\t\t\t\t\t\t<ul class="btn-list clearfix">\n\t\t\t\t\t\t\t\t<li class="float-right">\n\t\t\t\t\t\t\t\t\t<button disabled (click)="saveUser($event)" type="button" class="btn btn-primary btn-with-icon"><i class="ion-edit">{{\'ds.microservices.entity.action.save\' | translate}}</i></button>\n\t\t\t\t\t\t\t\t\t<ng-content select="button.entity-action"></ng-content>\n\t\t\t\t\t\t\t\t\t\x3c!--<button (click)="" type="button" class="btn btn-danger btn-with-icon"><i class="ion-android-delete">{{\'ds.microservices.entity.action.delete\' | translate}}</i></button>--\x3e\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="card-block entity-body entity-data">\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="username">{{ \'ds.microservices.entity.property.username\' | translate }}</label>\n\t\t\t\t\t\t<input disabled id="username" name="username" type="text" [(ngModel)]="user.username" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="identity">{{ \'ds.microservices.entity.property.identity\' | translate }}</label>\n\t\t\t\t\t\t<input disabled id="identity" name="identity" type="text" [(ngModel)]="user.identity" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="identityUuid">{{ \'ds.microservices.entity.property.identityUuid\' | translate }}</label>\n\t\t\t\t\t\t<input disabled id="identityUuid" name="identityUuid" type="text" [(ngModel)]="user.identityUuid" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="email">{{ \'login.email\' | translate }}</label>\n\t\t\t\t\t\t<input id="email" name="email" type="email" [(ngModel)]="identityFormData.email" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<label for="plainPassword">{{ \'login.password\' | translate }}</label>\n\t\t\t\t\t\t<input id="plainPassword" name="plainPassword" type="password" [(ngModel)]="identityFormData.plainPassword" class="form-control">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\n\t\t<div *ngIf="persona" class="col-sm-6">\n\t\t\t<form class="card entity-card animated fadeIn">\n\t\t\t\t<div class="card-header">\n\t\t\t\t\t<div class="row justify-content-between">\n\t\t\t\t\t\t<div class="col-6">\n\t\t\t\t\t\t\t<h3 class="card-title" translate>Persona</h3>\n\t\t\t\t\t\t\t<h4 class="card-subtitle">{{persona.title | entityTranslate}}</h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-6">\n\t\t\t\t\t\t\t<ul class="btn-list clearfix">\n\t\t\t\t\t\t\t\t<li class="float-right">\n\t\t\t\t\t\t\t\t\t<button (click)="savePersona($event)" type="button" class="btn btn-primary btn-with-icon"><i class="ion-edit">{{\'ds.microservices.entity.action.save\' | translate}}</i></button>\n\t\t\t\t\t\t\t\t\t<ng-content select="button.entity-action"></ng-content>\n\t\t\t\t\t\t\t\t\t\x3c!--<button (click)="" type="button" class="btn btn-danger btn-with-icon"><i class="ion-android-delete">{{\'ds.microservices.entity.action.delete\' | translate}}</i></button>--\x3e\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="card-block entity-body entity-data">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col">\n\t\t\t\t\t\t\t<div class="form-group" *ngFor="let item of persona.data | keyValue">\n\t\t\t\t\t\t\t\t<label [for]="item.key">{{ (\'ds.microservices.entity.property.\' + item.key) | translate }}</label>\n\t\t\t\t\t\t\t\t<input [id]="item.key" [name]="item.key" type="text" [(ngModel)]="persona.data[item.key]" class="form-control" placeholder="" required>\n\t\t\t\t\t\t\t\t\x3c!--<label for="title">{{ \'ds.microservices.entity.property.title\' | translate }}  [{{formLang}}]</label>--\x3e\n\t\t\t\t\t\t\t\t\x3c!--<input id="title" name="title" type="text" [(ngModel)]="persona.title[formLang]" class="form-control" placeholder="" required>--\x3e\n\t\t\t\t\t\t\t\t\x3c!--<div *ngIf="formErrors.title" class="alert alert-danger">--\x3e\n\t\t\t\t\t\t\t\t\x3c!--{{ formErrors.title }}--\x3e\n\t\t\t\t\t\t\t\t\x3c!--</div>--\x3e\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\x3c!--<div class="col-sm-6">--\x3e\n\t\t\t\t\t\t\x3c!--<div class="form-group">--\x3e\n\t\t\t\t\t\t\x3c!--<label for="identity">{{ \'ds.microservices.entity.property.identity\' | translate }}</label>--\x3e\n\t\t\t\t\t\t\x3c!--<input disabled id="identity" name="identity" type="text" [(ngModel)]="user.identity" class="form-control">--\x3e\n\t\t\t\t\t\t\x3c!--</div>--\x3e\n\t\t\t\t\t\t\x3c!--<div class="form-group">--\x3e\n\t\t\t\t\t\t\x3c!--<label for="identityUuid">{{ \'ds.microservices.entity.property.identityUuid\' | translate }}</label>--\x3e\n\t\t\t\t\t\t\x3c!--<input disabled id="identityUuid" name="identityUuid" type="text" [(ngModel)]="user.identityUuid" class="form-control">--\x3e\n\t\t\t\t\t\t\x3c!--</div>--\x3e\n\t\t\t\t\t\t\x3c!--</div>--\x3e\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t</div>\n</div>'}});