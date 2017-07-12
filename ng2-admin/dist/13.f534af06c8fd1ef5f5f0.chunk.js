webpackJsonp([13],{1420:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(10),a=n(21),o=n(267),s=(n.n(o),n(1610)),c=n(1458),u=n(1439),l=n(1450),p=n(270),h=n(1490),f=n(1493),d=n(1494),y=n(1491),g=n(1492),m=n(638);n.d(e,"MICROSERVICE_NAME",(function(){return v})),n.d(e,"DsCaseModule",(function(){return b}));var v="cases",b=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.getMicroserviceName=function(){return v},e})(l.a);b=__decorate([n.i(r.NgModule)({imports:[i.CommonModule,a.FormsModule,o.NgxDatatableModule,m.a,p.a,s.a],declarations:[h.a,f.a,d.a,y.a,g.a],providers:[c.a,u.a,u.b]})],b)},1439:function(t,e,n){"use strict";var r=n(634),i=(n.n(r),n(1)),a=n(173);n.d(e,"a",(function(){return o})),n.d(e,"d",(function(){return s})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return u}));var o=(function(){function t(){}return t})(),s=function(t,e,n){return t.withConfig((function(t){t.setBaseUrl(n.settings.entrypoint.url),t.addFullRequestInterceptor((function(t,n,r,i,a,o){var s={},c=e.getToken();return s.headers=Object.assign({},a,{Authorization:"Bearer "+c}),"put"==n&&console.log(t),s}))}))},c=new i.InjectionToken("MicroserviceRestangular"),u={provide:c,useFactory:s,deps:[r.Restangular,a.a,o]}},1440:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var r=(function(){function t(){this.size=20,this.totalItems=0,this.totalPages=0,this.pageNumber=0}return t})()},1441:function(t,e,n){"use strict";var r=n(32),i=n(10),a=n(63),o=n(266),s=(n.n(o),n(128)),c=n(62);n.n(c);n.d(e,"a",(function(){return u}));var u=(function(){function t(t){this.injector=t,this.router=t.get(r.c),this.route=t.get(r.b),this.location=t.get(i.Location),this.translate=t.get(a.c),this.toastr=t.get(o.ToastsManager)}return t.prototype.generateBackLink=function(){this.entityParent&&this.entityParent.hasOwnProperty("title")&&this.entityParent.title.hasOwnProperty(this.translate.currentLang)&&(this.backLink=new s.a,this.backLink.routerLink=["/","pages",this.entityParentUrlPrefix,this.entityParent.uuid,"show"],this.backLink.text=this.entityParent.title[this.translate.currentLang])},t.prototype.getEmptyBackLink=function(){return new s.a},t})()},1442:function(t,e,n){"use strict";var r=n(173),i=n(1441),a=n(62),o=(n.n(a),n(0)),s=(n.n(o),n(74)),c=n.n(s),u=n(271),l=n.n(u),p=n(637),h=n.n(p);n.d(e,"a",(function(){return f}));var f=(function(t){function e(e,n){var i=t.call(this,e)||this;return i.injector=e,i.microserviceConfig=n,i.headerTitle="",i.headerSubtitle="",i.submitted=!1,i.formErrors={},i.entityMetadata={},i.active=!0,i.auth=e.get(r.a),i}return __extends(e,t),e.prototype.ngOnInit=function(){var t=this;this.entityMetadata=this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties,this.lang=this.translate.currentLang,this.formLang=this.translate.currentLang,this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(e){t.lang=t.translate.currentLang})),Object.keys(this.entityMetadata).forEach((function(e){t.formErrors[e]=""})),this.prepareEntity().subscribe()},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber.unsubscribe()},e.prototype.prepareEntity=function(){var t=this;return this.route.params.flatMap((function(e){var n=e.id,r=e[t.entityParentUrlParam];return t.isNew?t.createBlankEntity().flatMap((function(e){return t.entity=e,t.prepareEntityParent(t.entityParentUrlPrefix,r).flatMap((function(t){return o.Observable.of({entity:e,entityParent:t})}))})):t.entityApiService.getOne(t.entityUrlPrefix,n).flatMap((function(e){return t.entity=e,t.prepareEntityParent(t.entityParentUrlPrefix,r).flatMap((function(t){return o.Observable.of({entity:e,entityParent:t})}))}))}))},e.prototype.prepareEntityParent=function(t,e){var n=this;return t&&e?this.entityApiService.getOne(t,e).flatMap((function(t){return n.entityParent=t,n.generateBackLink(),o.Observable.of(t)})):o.Observable.empty()},e.prototype.createBlankEntity=function(){var t=this,e=(this.auth.getAuthUser(),{owner:"BusinessUnit",ownerUuid:"8454c987-cbc5-4a24-ba1a-d420283caabd",weight:0,version:0});return Object.keys(this.entityMetadata).forEach((function(n,r){var i=t.entityMetadata[n],a=i.hasOwnProperty("default")?i.default:"";i.hasOwnProperty("translated")&&!0===i.translated?(e[n]={},t.translate.langs.forEach((function(t){e[n][t]=a}))):e[n]=a})),o.Observable.of(e)},e.prototype.onFormInit=function(t){this.currentForm=t},e.prototype.onFormChange=function(t){var e=this;this.currentForm!==this.entityForm&&(this.entityForm=this.currentForm,this.entityForm&&this.entityForm.valueChanges.subscribe((function(t){return e.onValueChanged(t)})))},e.prototype.onFormCancel=function(){this.location.back()},e.prototype.onFormLanguageChange=function(t){this.formLang=t.key},e.prototype.onFormSubmit=function(t){this.submitted=!0,this.isNew?this.saveNewEntity(t):this.saveExistingEntity(t)},e.prototype.onValueChanged=function(t){if(this.entityForm){var e=this.entityForm.form;for(var n in this.formErrors){this.formErrors[n]="";var r=e.get(n);if(r&&r.dirty&&!r.valid){var i=this.entityMetadata[n].validation;for(var a in r.errors){var o=i[a].hasOwnProperty("params")?i[a].params:null,s=this.translate.instant("ds.microservices.entity.validation."+i[a].message,o);this.formErrors[n]+=s+" "}}}}},e.prototype.saveNewEntity=function(t){var e=this;console.log("entity",this.entity);var n=this.preSave(c()(this.entity));this.entityApiService.resource(this.entityUrlPrefix).post(n).subscribe((function(t){e.onEntitySave(t)}),(function(t){e.onEntitySaveError(t)}))},e.prototype.saveExistingEntity=function(t){var e=this;this.preSave(c()(this.entity)).put().subscribe((function(t){e.onEntitySave(t)}),(function(t){e.onEntitySaveError(t)}))},e.prototype.preSave=function(t){var e=this;return Object.keys(this.entityMetadata).forEach((function(n,r){var i=e.entityMetadata[n];i.hasOwnProperty("translated")&&!0===i.translated&&e.translate.langs.forEach((function(e){h()(t[n][e])&&l()(t[n][e])&&delete t[n][e]}))})),console.log("sanitized entity",t),t},e.prototype.onEntitySave=function(t){console.log("Entity saved successfully, server response: ",t),this.toastr.success("Entity saved successfully");var e=this.isNew?"../list":"../show";this.router.navigate([e],{relativeTo:this.route})},e.prototype.onEntitySaveError=function(t){console.error("There was an error saving entity",t),this.toastr.error("Failed to save the entity")},e})(i.a)},1443:function(t,e,n){"use strict";var r=n(32),i=n(269),a=n(266),o=(n.n(a),n(63)),s=n(635),c=n(1441),u=n(62),l=(n.n(u),n(0));n.n(l);n.d(e,"a",(function(){return p}));var p=(function(t){function e(e,n){var s=t.call(this,e)||this;return s.microserviceConfig=n,s.actions={edit:!0,delete:!0},s.entityMetadata={},s.router=s.injector.get(r.c),s.route=s.injector.get(r.b),s.translate=s.injector.get(o.c),s.modal=s.injector.get(i.f),s.toastr=s.injector.get(a.ToastsManager),s}return __extends(e,t),e.prototype.ngOnInit=function(){var t=this;this.entityMetadata=this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties,this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(e){return t.prepareEntity().subscribe()})),this.prepareEntity().subscribe()},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber.unsubscribe()},e.prototype.prepareEntity=function(){var t=this;return this.route.params.flatMap((function(e){var n=e.id,r=e[t.entityParentUrlParam];return t.entityApiService.getOne(t.entityUrlPrefix,n).flatMap((function(e){return t.entity=e,t.prepareEntityParent(t.entityParentUrlPrefix,r).flatMap((function(t){return l.Observable.of({entity:e,entityParent:t})}))}))}))},e.prototype.prepareEntityParent=function(t,e){var n=this;return t&&e?this.entityApiService.getOne(t,e).flatMap((function(t){return n.entityParent=t,n.generateBackLink(),l.Observable.of(t)})):l.Observable.empty()},e.prototype.onDelete=function(t){var e=this,n=this.modal.open(s.a,{size:"lg"});n.componentInstance.modalHeader="Confirm",n.componentInstance.modalContent="Are you sure you want to delete this entity?",n.componentInstance.actions=[{command:"yes",label:"Yes"},{command:"no",label:"No"}],n.result.then((function(t){console.log(t),"yes"===t.command&&e.entity.remove().subscribe((function(t){e.onEntityDeleteSuccess(t)}),(function(t){e.onEntityDeleteError(t)}))}),(function(t){}))},e.prototype.onEntityDeleteSuccess=function(t){console.log("Entity deleted successfully, server response: ",t),this.toastr.success("Entity deleted successfully"),this.router.navigate(["../../list"],{relativeTo:this.route})},e.prototype.onEntityDeleteError=function(t){console.error("Failed to delete entity",t),this.toastr.error("Failed to delete entity")},e})(c.a)},1444:function(t,e,n){"use strict";var r=n(1),i=n(267),a=(n.n(i),n(1440)),o=n(1449),s=n(1441),c=n(62),u=(n.n(c),n(62)),l=(n.n(u),n(100));n.n(l);n.d(e,"a",(function(){return p}));var p=(function(t){function e(e,n){var r=t.call(this,e)||this;return r.microserviceConfig=n,r.rows=[],r.columns=[],r.sorts=[],r.pager=new a.a,r.size=10,r.datatableAttributes={columnMode:"force",rowHeight:"auto",headerHeight:90,footerHeight:50,externalPaging:!0,externalSorting:!0},r.actions={show:!0,refresh:!0,create:!0,edit:!0},r.filters={},r.filterStream=new u.Subject,r.entityMetadata={},r}return __extends(e,t),e.prototype.ngOnInit=function(){var t=this;this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(e){t.updateTranslations(e.lang),t.refreshList()})),this.entityMetadata=this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties,this.pager.size=this.size,this.setupUi(),this.setupList(),this.postSetupList(),this.setupQuery(),this.filterStream.distinctUntilChanged((function(t,e){return t.filterProperty===e.filterProperty&&t.filterValue===e.filterValue})).map((function(e){return t.assignFilterValue(e)})).debounceTime(500).subscribe((function(){return t.doFilter()})),this.setPage({offset:0})},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber.unsubscribe()},e.prototype.ngAfterViewInit=function(){},e.prototype.setupQuery=function(){this.query=o.a.forUrl(this.microserviceConfig.settings.entrypoint.url,this.entityUrlPrefix).withPager(this.pager)},e.prototype.setupUi=function(){var t=this;n.i(l.forEach)(this.datatableAttributes,(function(e,n){t.datatable[n]=e}))},e.prototype.setupList=function(){},e.prototype.postSetupList=function(){var t=this;this.columns.forEach((function(e){e.propertyMetadata=t.entityMetadata[e.prop]})),this.columns.push({name:"ds.microservices.entity.action.actions",cellTemplate:this.actionsCellTpl,headerTemplate:this.headerTpl,sortable:!1}),this.updateTranslations(this.translate.currentLang)},e.prototype.refreshList=function(){var t=this;this.loading=!0,this.entityApiService.getList(this.query).subscribe((function(e){t.pager=e.pager,t.rows=t.preprocessRowsData(e.data),t.loading=!1}))},e.prototype.preprocessRowsData=function(t){var e,n=this;return t&&(e=t.map((function(t){return t._={actions:n.actions},t}))),e},e.prototype.onFilterValueChange=function(t){var e=t.column.prop,n=t.event.target.value;this.filterStream.next({filterProperty:e,filterValue:n})},e.prototype.assignFilterValue=function(t){return console.log("assignFilterValue: ",t),this.filters[t.filterProperty]=t.filterValue,t},e.prototype.doFilter=function(){var t=this;Object.keys(this.filters).forEach((function(e){var r=t.filters[e];null==r||n.i(l.isString)(r)&&0===r.length?(delete t.filters[e],t.query.unsetFilter(e)):(t.filters[e]=r,t.query.setFilter(e,t.filters[e]))})),console.log(this.filters),this.query.pager.pageNumber=0,this.refreshList()},e.prototype.setPage=function(t){this.pager.pageNumber=t.offset,this.refreshList()},e.prototype.onSort=function(t){console.log("base-list.component::onSort",t),t.column.prop&&(this.query.unsetOrder(),this.query.setOrder(t.column.prop,t.newValue),this.refreshList())},e.prototype.updateTranslations=function(t){var e=this;this.datatable.messages=this.translate.instant("datatable"),this.columns.forEach((function(t){var n=t.name?t.name:"ds.microservices.entity.property."+t.prop;e.translate.get(n).subscribe((function(e){t.name=e}))}))},e})(s.a);__decorate([n.i(r.ViewChild)(i.DatatableComponent),__metadata("design:type",i.DatatableComponent)],p.prototype,"datatable",void 0),__decorate([n.i(r.ViewChild)("headerTpl"),__metadata("design:type",r.TemplateRef)],p.prototype,"headerTpl",void 0),__decorate([n.i(r.ViewChild)("textCellTpl"),__metadata("design:type",r.TemplateRef)],p.prototype,"textCellTpl",void 0),__decorate([n.i(r.ViewChild)("actionsTpl"),__metadata("design:type",r.TemplateRef)],p.prototype,"actionsCellTpl",void 0)},1445:function(t,e){t.exports='<ds-entity-list [headerTitle]="headerTitle"\n\t\t\t\t[headerSubtitle]="headerSubtitle"\n\t\t\t\t[actions]="actions"\n\t\t\t\t(onRefreshList)="refreshList($event)">\n\n\t<ngx-datatable #datatable\n\t\t\t\t   [loadingIndicator]="loading"\n\t\t\t\t   [sorts]="sorts"\n\t\t\t\t   [rows]="rows"\n\t\t\t\t   [columns]="columns"\n\t\t\t\t   [count]="pager.totalItems"\n\t\t\t\t   [offset]="pager.pageNumber"\n\t\t\t\t   [limit]="pager.size"\n\t\t\t\t   (page)="setPage($event)"\n\t\t\t\t   (sort)="onSort($event)"\n\t\t\t\t   class="material">\n\t</ngx-datatable>\n</ds-entity-list>\n\n<ng-template #headerTpl let-column="column" let-sorts="sorts" let-sortDir="sortDir" let-sort="sortFn">\n\t<ds-datatable-header sortType="single"\n\t\t\t\t\t\t sortAscendingIcon="datatable-icon-up"\n\t\t\t\t\t\t sortDescendingIcon="datatable-icon-down"\n\t\t\t\t\t\t [column]="column"\n\t\t\t\t\t\t [sort]="sort"\n\t\t\t\t\t\t [sortDir]="sortDir"\n\t\t\t\t\t\t (onFilterValueChange)="onFilterValueChange($event)"\n\t>\n\t</ds-datatable-header>\n</ng-template>\n\n<ng-template #textCellTpl let-column="column" let-row="row" let-value="value">\n\t<ds-datatable-cell [column]="column" [row]="row" [value]="value"></ds-datatable-cell>\n</ng-template>\n\n\x3c!--<ng-container *ngTemplateOutlet="actionsTpl; context: {actions: actions}"></ng-container>--\x3e\n<ng-template #actionsTpl let-column="column" let-row="row">\n\t<ds-datatable-cell-actions [row]="row"></ds-datatable-cell-actions>\n</ng-template>\n'},1446:function(t,e,n){"use strict";var r=n(1440);n.d(e,"a",(function(){return i}));var i=(function(){function t(){this.data=new Array,this.pager=new r.a}return t})()},1447:function(t,e,n){"use strict";var r=n(1446),i=n(62);n.n(i);n.d(e,"a",(function(){return a}));var a=(function(){function t(t){this.restangular=t}return t.prototype.resource=function(t){return this.restangular.all(t)},t.prototype.one=function(t,e){return this.restangular.one(t,e)},t.prototype.getOne=function(t,e){return this.restangular.one(t,e).get()},t.prototype.getList=function(t){var e=this;return this.restangular.all(t.path).getList(t.buildParameters()).reduce((function(n,r){return t.pager.totalItems=r.metadata["hydra:totalItems"],t.pager.totalPages=Math.ceil(t.pager.totalItems/t.pager.size),n.pager=t.pager,n.data=r.map(e.mapToEntity),n}),new r.a)},t.prototype.mapToEntity=function(t){return t},t})()},1448:function(t,e,n){"use strict";var r=n(1);n.d(e,"a",(function(){return i}));var i=(function(){function t(){}return t})();i=__decorate([n.i(r.Component)({selector:"ds-entity",template:"<router-outlet></router-outlet>"}),__metadata("design:paramtypes",[])],i)},1449:function(t,e,n){"use strict";var r=n(1440);n.d(e,"a",(function(){return i}));var i=(function(){function t(t){this.pager=new r.a,this.filters={},this.orders={},this.path=t}return t.forUrl=function(e,n){var r=new t(n);return r.urlPrefix=e,r},t.prototype.withPath=function(t){return this.path=t,this},t.prototype.withFilter=function(t,e){return this.setFilter(t,e)},t.prototype.setFilter=function(t,e){return this.filters[t]=e,this},t.prototype.unsetFilter=function(t){delete this.filters[t]},t.prototype.withOrder=function(t,e){return this.setOrder(t,e)},t.prototype.setOrder=function(t,e){return this.orders[t]=e,this},t.prototype.unsetOrder=function(t){if(t)delete this.orders[t];else for(var e in this.orders)delete this.orders[e]},t.prototype.withPager=function(t){return this.pager=t,this},t.prototype.getFullPath=function(){return this.urlPrefix+this.path},t.prototype.buildParameters=function(){var t={};if(this.pager&&Object.assign(t,{page:this.pager.pageNumber+1,itemsPerPage:this.pager.size}),this.filters&&Object.assign(t,this.filters),this.orders)for(var e in this.orders)t["order["+e+"]"]=this.orders[e];return t},t})()},1450:function(t,e,n){"use strict";var r=n(1),i=n(10),a=n(21),o=n(101),s=n(268),c=n(267),u=(n.n(c),n(636)),l=(n.n(u),n(1439));n.d(e,"a",(function(){return p}));var p=(function(){function t(t,e){this.appState=t,this.msConfig=e,this.microserviceName=null,e.name=this.getMicroserviceName(),e.settings=this.appState.get("microservices")[e.name]}return t})();p=__decorate([n.i(r.NgModule)({imports:[i.CommonModule,a.FormsModule,s.a,u.FormioModule,c.NgxDatatableModule],declarations:[],providers:[l.a,l.b]}),__metadata("design:paramtypes",[o.a,l.a])],p)},1458:function(t,e,n){"use strict";var r=n(1),i=n(1439),a=n(1447),o=n(62);n.n(o);n.d(e,"a",(function(){return s}));var s=(function(t){function e(e){var n=t.call(this,e)||this;return n.restangular=e,n}return __extends(e,t),e})(a.a);s=__decorate([n.i(r.Injectable)(),__param(0,n.i(r.Inject)(i.c)),__metadata("design:paramtypes",[Object])],s)},1490:function(t,e,n){"use strict";var r=n(1),i=n(1448);n.d(e,"a",(function(){return a}));var a=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e})(i.a);a=__decorate([n.i(r.Component)({selector:"ds-case",template:"<router-outlet></router-outlet>"})],a)},1491:function(t,e,n){"use strict";var r=n(1),i=n(32),a=n(10),o=n(266),s=(n.n(o),n(63)),c=n(1439),u=n(1458),l=n(1442),p=n(62);n.n(p);n.d(e,"a",(function(){return h}));var h=(function(t){function e(e,n,r,i,a,o,s,c){var u=t.call(this,e,s)||this;return u.entityUrlPrefix="cases",u.headerTitle="Create Case",u.isNew=!0,u.translate=a,u.entityApiService=c,u}return __extends(e,t),e})(l.a);h=__decorate([n.i(r.Component)({selector:"ds-case-create",template:n(1599)}),__metadata("design:paramtypes",[r.Injector,i.b,i.c,a.Location,s.c,o.ToastsManager,c.a,u.a])],h)},1492:function(t,e,n){"use strict";var r=n(1),i=n(32),a=n(10),o=n(266),s=(n.n(o),n(63)),c=n(1439),u=n(1458),l=n(1442),p=n(62);n.n(p);n.d(e,"a",(function(){return h}));var h=(function(t){function e(e,n,r,i,a,o,s,c){var u=t.call(this,e,s)||this;return u.entityUrlPrefix="cases",u.headerTitle="Edit Case",u.isNew=!1,u.translate=a,u.entityApiService=c,u}return __extends(e,t),e})(l.a);h=__decorate([n.i(r.Component)({selector:"ds-case-edit",template:n(1599)}),__metadata("design:paramtypes",[r.Injector,i.b,i.c,a.Location,s.c,o.ToastsManager,c.a,u.a])],h)},1493:function(t,e,n){"use strict";var r=n(1),i=n(1439),a=n(1458),o=n(1444),s=n(62);n.n(s);n.d(e,"a",(function(){return c}));var c=(function(t){function e(e,n,r){var i=t.call(this,e,n)||this;return i.entityUrlPrefix="cases",i.entityApiService=r,i}return __extends(e,t),e.prototype.setupList=function(){t.prototype.setupList.call(this),this.columns=[{prop:"title",cellTemplate:this.textCellTpl,headerTemplate:this.headerTpl,filterable:!0}]},e})(o.a);c=__decorate([n.i(r.Component)({selector:"ds-case-list",template:n(1445)}),__metadata("design:paramtypes",[r.Injector,i.a,a.a])],c)},1494:function(t,e,n){"use strict";var r=n(1),i=n(1443),a=n(1439),o=n(1458),s=n(62);n.n(s);n.d(e,"a",(function(){return c}));var c=(function(t){function e(e,n,r){var i=t.call(this,e,n)||this;return i.injector=e,i.microserviceConfig=n,i.entityApiService=r,i.entityUrlPrefix="cases",i.headerTitle="Case Details",i.entityApiService=r,i}return __extends(e,t),e})(i.a);c=__decorate([n.i(r.Component)({selector:"ds-case-show",template:n(1784)}),__metadata("design:paramtypes",[r.Injector,a.a,o.a])],c)},1599:function(t,e){t.exports='<ds-entity-form *ngIf="entity"\n\t\t\t\t[entity]="entity"\n\t\t\t\t[headerTitle]="headerTitle"\n\t\t\t\t[isNew]="isNew"\n\t\t\t\t(onFormInit)="onFormInit($event)"\n\t\t\t\t(onFormChange)="onFormChange($event)"\n\t\t\t\t(onFormSubmit)="onFormSubmit($event)"\n\t\t\t\t(onFormCancel)="onFormCancel($event)"\n>\n\t<div class="card-block">\n\t\t<div class="row">\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label for="title">{{ \'ds.microservices.entity.property.title\' | translate }}</label>\n\t\t\t\t\t<input id="title" name="title" type="text" [(ngModel)]="entity.title[lang]" class="form-control" placeholder="" required minlength="4">\n\t\t\t\t\t<div *ngIf="formErrors.title" class="alert alert-danger">\n\t\t\t\t\t\t{{ formErrors.title }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</ds-entity-form>\n'},1610:function(t,e,n){"use strict";var r=n(32),i=n(274),a=n(1490),o=n(1493),s=n(1494),c=n(1491),u=n(1492);n.d(e,"a",(function(){return p}));var l=[{path:"",component:a.a,canActivate:[i.a],children:[{path:"",redirectTo:"/pages/cases/list",pathMatch:"full"},{path:"list",component:o.a},{path:"create",component:c.a},{path:":id/show",component:s.a},{path:":id/edit",component:u.a}]}],p=r.a.forChild(l)},1784:function(t,e){t.exports='<ds-entity-show *ngIf="entity"\n\t\t\t\t[entity]="entity"\n\t\t\t\t[backLink]="backLink"\n\t\t\t\t[headerTitle]="headerTitle"\n\t\t\t\t[headerSubtitle]="headerSubtitle"\n\t\t\t\t[actions]="actions"\n\t\t\t\t(onDelete)="onDelete($event)">\n\n\t\x3c!-- begin: ng-content[select="button.entity-action"] --\x3e\n\t\x3c!-- end: ng-content[select="button.entity-action"] --\x3e\n\n\t\x3c!-- begin: ng-content[select=".entity-body"] --\x3e\n\t<div class="card-block entity-body entity-data">\n\t\t<div class="row">\n\t\t\t<div class="col-sm-4 col-sm-offset-3">\n\t\t\t\t<dl>\n\t\t\t\t\t<dt>{{ \'ds.microservices.entity.property.title\' | translate }}</dt>\n\t\t\t\t\t<dd>{{entity.title | entityTranslate}}</dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\x3c!-- end: ng-content[select=".entity-body"] --\x3e\n\n</ds-entity-show>\n'}});