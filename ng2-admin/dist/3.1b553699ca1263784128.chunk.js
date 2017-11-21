webpackJsonp([3],{1738:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=n(13),a=n(4),o=n(300),s=(n.n(o),n(1904)),c=n(1767),l=n(811),u=n(1757),p=n(301),d=n(1827),h=n(1825),f=n(1823),y=n(1826),m=n(1824),g=n(1821),v=n(1822),b=n(1819),w=n(1820);n.d(e,"MICROSERVICE_NAME",(function(){return _})),n.d(e,"DsInteractionModule",(function(){return x}));var _="interactions",x=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.getMicroserviceName=function(){return _},e})(u.a);x=__decorate([n.i(i.NgModule)({imports:[r.CommonModule,a.FormsModule,o.NgxDatatableModule,p.a,s.a],declarations:[d.a,h.a,y.a,f.a,m.a,g.a,v.a,b.a,w.a],providers:[c.a,l.a,l.c]})],x)},1749:function(t,e,n){"use strict";var i=n(305),r=n(78),a=n(1750),o=n(42),s=(n.n(o),n(1)),c=(n.n(s),n(815)),l=n.n(c),u=n(816),p=n.n(u),d=n(110),h=n.n(d),f=n(303),y=n.n(f);n.d(e,"a",(function(){return m}));var m=(function(t){function e(e,n){var a=t.call(this,e)||this;return a.injector=e,a.microserviceConfig=n,a.headerTitle="",a.headerSubtitle="",a.submitted=!1,a.formErrors={},a.entityMetadata={},a.active=!0,a.auth=e.get(r.a),a.staticTranslate=e.get(i.a),a}return __extends(e,t),e.prototype.ngOnInit=function(){var e=this;t.prototype.ngOnInit.call(this),this.loadEntityMetaData(),this.lang=this.translate.currentLang,this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(t){e.lang=e.translate.currentLang,e.prepareEntityParent()})),this.translate.getTranslation(this.translate.currentLang).subscribe((function(){e.formLang=e.translate.currentLang})),Object.keys(this.entityMetadata).forEach((function(t){e.formErrors[t]=""})),this.prepareEntity().subscribe()},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber&&this.languageChangeSubscriber.unsubscribe()},e.prototype.loadEntityMetaData=function(){this.entityMetadata=this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties},e.prototype.prepareEntity=function(){var t=this;return this.route.params.flatMap((function(e){var n=e.id,i=e[t.entityParentUrlParam];return t.isNew?t.createBlankEntity().flatMap((function(e){return t.entity=e,t.prepareEntityParent(t.entityParentUrlPrefix,i).flatMap((function(t){return s.Observable.of({entity:e,entityParent:t})}))})):t.entityApiService.getOne(t.entityUrlPrefix,n).flatMap((function(e){return t.entity=e,t.prepareEntityParent(t.entityParentUrlPrefix,i).flatMap((function(t){return s.Observable.of({entity:e,entityParent:t})}))}))}))},e.prototype.prepareEntityParent=function(t,e){var n=this;return this.entityParent?(this.generateBackLink(),s.Observable.of(this.entityParent)):t&&e?this.entityApiService.getOne(t,e).flatMap((function(t){return n.entityParent=t,n.generateBackLink(),s.Observable.of(t)})):s.Observable.of(null)},e.prototype.createBlankEntity=function(){var t=this,e=(this.auth.getAuthUser(),{owner:"BusinessUnit",ownerUuid:"8454c987-cbc5-4a24-ba1a-d420283caabd",weight:0,version:1});return Object.keys(this.entityMetadata).forEach((function(n,i){var r=t.entityMetadata[n],a=r.hasOwnProperty("default")?r.default:"";r.hasOwnProperty("translated")&&!0===r.translated?(e[n]={},t.translate.langs.forEach((function(t){e[n][t]=a}))):e[n]=a})),s.Observable.of(e)},e.prototype.displayFormErrors=function(t){if(void 0===t&&(t=!0),this.entityForm){var e=this.entityForm.form;for(var n in this.formErrors){this.formErrors[n]="";var i=e.get(n);if(i&&(i.dirty||t)&&!i.valid)for(var r in i.errors)this.setFormError(n,r)}}},e.prototype.onFormInit=function(t){this.currentForm=t},e.prototype.onFormChange=function(t){var e=this;this.currentForm!==this.entityForm&&(this.entityForm=this.currentForm,this.entityForm&&this.entityForm.valueChanges.subscribe((function(t){return e.onValueChanged(t)})))},e.prototype.onFormCancel=function(){this.location.back()},e.prototype.onFormLanguageChange=function(t){this.formLang=t.key},e.prototype.onFormSubmit=function(t){if(!t.valid)return this.displayFormErrors(),this.toastr.error(this.translate.instant("ds.messages.formInvalid")),!1;this.submitted=!0,this.isNew?this.saveNewEntity(t):this.saveExistingEntity(t)},e.prototype.onValueChanged=function(t){this.displayFormErrors(!1)},e.prototype.saveNewEntity=function(t){var e=this;try{var n=this.preSave(l()(this.entity));this.entityApiService.resource(this.entityUrlPrefix).post(n).subscribe((function(t){e.onEntitySave(t)}),(function(t){e.onEntitySaveError(t)}))}catch(t){console.warn("Error in saveNewEntity",t)}},e.prototype.saveExistingEntity=function(t){var e=this;try{var n=l()(this.entity.plain()),i=this.preSave(n),r=this.entityApiService.resource(this.entityUrlPrefix),a={"Content-Type":"application/json"};r.customPUT(i,this.entity.uuid,void 0,a).subscribe((function(t){e.onEntitySave(t)}),(function(t){e.onEntitySaveError(t)}))}catch(t){console.warn("Error in saveExistingEntity",t)}},e.prototype.preSave=function(t){var e=this,n=this.getPropertiesToRemoveOnSave();return t=p()(t,n),Object.keys(this.entityMetadata).forEach((function(i,r){var a=e.entityMetadata[i];n.indexOf(i)>-1||(a.hasOwnProperty("translated")&&!0===a.translated?e.translate.langs.forEach((function(n){if(t[i]&&y()(t[i][n])&&h()(t[i][n])&&delete t[i][n],a.hasOwnProperty("type")&&"json"===a.type)try{y()(t[i][n])&&(0===t[i][n].trim().length&&(t[i][n]="{}"),t[i][n]=JSON.parse(t[i][n]))}catch(t){throw e.setFormError(i,"json"),{type:"validation",property:i,field:a.type,language:n}}})):y()(t[i])&&a.hasOwnProperty("type")&&"json"===a.type&&(t[i]=JSON.parse(t[i])))})),console.log("sanitized entity",t),t},e.prototype.getPropertiesToRemoveOnSave=function(){return["@context","@id","@type","id","uuid","createdAt","updatedAt","deletedAt"]},e.prototype.setFormError=function(t,e){var n=this.entityMetadata[t].validation,i=n[e].hasOwnProperty("params")?n[e].params:null,r="ds.microservices.entity.validation."+n[e].message,a=this.staticTranslate.instant(this.formLang,r,i);this.formErrors[t]+=a+" "},e.prototype.getRoutingUrlOnSave=function(t){return[this.isNew?"../"+t.uuid:"../","show"]},e.prototype.onEntitySave=function(t){if(console.log("Entity saved successfully, server response: ",t),this.toastr.success(this.translate.instant("ds.messages.entitySaveSucceeded")),t.uuid){var e=this.getRoutingUrlOnSave(t);this.router.navigate(e,{relativeTo:this.route})}else this.toastr.error(this.translate.instant("ds.messages.unexpectedError"))},e.prototype.onEntitySaveError=function(t){console.error("There was an error saving entity",t);var e=this.translate.instant("ds.messages.entitySaveFailed"),n="";t.data&&"ConstraintViolationList"==t.data["@type"]&&t.data["hydra:description"]&&(n=t.data["hydra:description"]),this.toastr.error(n,e)},e})(a.a)},1750:function(t,e,n){"use strict";var i=n(29),r=n(13),a=n(30),o=n(201),s=(n.n(o),n(79)),c=n(35),l=n(143),u=n(42),p=(n.n(u),n(24)),d=n.n(p);n.d(e,"a",(function(){return h}));var h=(function(){function t(t){this.injector=t,this.router=t.get(i.c),this.route=t.get(i.b),this.globalState=this.injector.get(s.a),this.appState=this.injector.get(c.a),this.location=t.get(r.Location),this.translate=t.get(a.c),this.toastr=t.get(o.ToastsManager),this.config=this.appState.get("config")}return t.prototype.ngOnInit=function(){this.pageTitle&&this.applyPageTitle(),this.isInitialized=!0},t.prototype.applyPageTitle=function(t){var e=this,n=t||this.pageTitle;n&&setTimeout((function(){e.globalState.notifyDataChanged("menu.activeLink",{title:n})}))},t.prototype.generateBackLink=function(){return this.entityParent&&(this.backLink||(this.backLink=new l.a),this.backLink.routerLink=["/","pages",this.entityParentUrlPrefix,this.entityParent.uuid,"show"],this.entityParent.hasOwnProperty("title")&&(this.backLink.text=this.entityParent.title[this.translate.currentLang])),this.backLink},t.prototype.getEmptyBackLink=function(){return new l.a},t.prototype.getTranslatedPropertyValue=function(t,e){if(d()(t))return d()(t[e])&&t[e][this.translate.currentLang]?t[e][this.translate.currentLang]:t[e]},t})()},1751:function(t,e){t.exports='<ds-entity-list [headerTitle]="headerTitle"\n\t\t\t\t[headerSubtitle]="headerSubtitle"\n\t\t\t\t[actions]="actions"\n\t\t\t\t[headerActions]="headerActions"\n\t\t\t\t(headerActionEmitter)="handleHeaderEvent($event)">\n\n\t<div *ngIf="showCustomFilters" class="custom-filters">\n\t\t<form [formGroup]="customFiltersForm">\n\t\t</form>\n\t</div>\n\n\t<ngx-datatable #datatable\n\t\t\t\t   [loadingIndicator]="loading"\n\t\t\t\t   [sorts]="sorts"\n\t\t\t\t   [rows]="rows"\n\t\t\t\t   [columns]="columns"\n\t\t\t\t   [count]="pager.totalItems"\n\t\t\t\t   [offset]="pager.pageNumber"\n\t\t\t\t   [limit]="pager.size"\n\t\t\t\t   (page)="setPage($event)"\n\t\t\t\t   (sort)="onSort($event)"\n\t\t\t\t   (activate)="onRowActivation($event)"\n\t\t\t\t   class="material">\n\t</ngx-datatable>\n</ds-entity-list>\n\n<ng-template #headerTpl let-column="column" let-sorts="sorts" let-sortDir="sortDir" let-sort="sortFn">\n\t<ds-datatable-header sortType="single"\n\t\t\t\t\t\t sortAscendingIcon="datatable-icon-up"\n\t\t\t\t\t\t sortDescendingIcon="datatable-icon-down"\n\t\t\t\t\t\t [column]="column"\n\t\t\t\t\t\t [sort]="sort"\n\t\t\t\t\t\t [sortDir]="sortDir"\n\t\t\t\t\t\t (onFilterValueChange)="onFilterValueChange($event)"\n\t>\n\t</ds-datatable-header>\n</ng-template>\n\n<ng-template #textCellTpl let-column="column" let-row="row" let-value="value">\n\t<ds-datatable-cell [column]="column" [row]="row" [value]="value"></ds-datatable-cell>\n</ng-template>\n\n<ng-template #textCellUuidTpl let-column="column" let-row="row" let-value="value">\n\t<ds-datatable-cell-uuid [column]="column" [row]="row" [value]="value"></ds-datatable-cell-uuid>\n</ng-template>\n\n\x3c!--<ng-container *ngTemplateOutlet="actionsTpl; context: {actions: actions}"></ng-container>--\x3e\n<ng-template #actionsTpl let-column="column" let-row="row">\n\t<ds-datatable-cell-actions [row]="row" (rowActionEmitter)="handleRowEvent($event)"></ds-datatable-cell-actions>\n</ng-template>\n'},1752:function(t,e,n){"use strict";var i=n(29),r=n(36),a=n(202),o=n(201),s=(n.n(o),n(30)),c=n(814),l=n(1750),u=n(42),p=(n.n(u),n(1));n.n(p);n.d(e,"a",(function(){return d}));var d=(function(t){function e(e,n){var r=t.call(this,e)||this;return r.microserviceConfig=n,r.headerTitle="general.details",r.actions=[{name:"edit",title:"ds.microservices.entity.action.edit",class:"btn btn-primary btn-with-icon",iconClass:"ion-edit",visible:!0,routerLink:["../edit"],region:"header"},{name:"delete",title:"ds.microservices.entity.action.delete",class:"btn btn-danger btn-with-icon",iconClass:"ion-android-delete",visible:!0,region:"footer"}],r.entityMetadata={},r.entitySubscribed=!1,r.router=r.injector.get(i.c),r.route=r.injector.get(i.b),r.translate=r.injector.get(s.c),r.modal=r.injector.get(a.c),r.toastr=r.injector.get(o.ToastsManager),r.initialLang=r.translate.currentLang,r}return __extends(e,t),e.prototype.ngOnInit=function(){var e=this;t.prototype.ngOnInit.call(this),this.entityMetadata=this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties,this.lang=this.translate.currentLang,this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(t){if(e.initialLang===t.lang)return void(e.initialLang=null);e.lang=t.lang,e.initialLang=t.lang,e.prepareEntity().subscribe()})),this.prepareEntity().subscribe(),this.entitySubscribed=!0},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber&&this.languageChangeSubscriber.unsubscribe()},e.prototype.prepareEntity=function(){var t=this;return this.route.params.flatMap((function(e){if(t.entity)return p.Observable.of({entity:t.entity,entityParent:t.entityParent});var n=e.id,i=e[t.entityParentUrlParam];return t.entityApiService.getOne(t.entityUrlPrefix,n).flatMap((function(e){return t.entity=e,t.onEntityPrepared(),t.prepareEntityParent(t.entityParentUrlPrefix,i).flatMap((function(t){return p.Observable.of({entity:e,entityParent:t})}))})).catch((function(e){throw e instanceof r.Response?t.onPrepareEntityError(e):console.warn("Unexpected error occurred while fetching entity: "+e),e}))}))},e.prototype.prepareEntityParent=function(t,e){var n=this;return t&&e?this.entityApiService.getOne(t,e).flatMap((function(t){return n.entityParent=t,n.generateBackLink(),p.Observable.of(t)})):p.Observable.of(null)},e.prototype.onPrepareEntityError=function(t){var e=this.translate.instant("ds.messages.http."+t.status),n=t.json(),i=n&&n.error?n.error:"";this.toastr.error(i,e)},e.prototype.handleEntityEvent=function(t){switch(t.action.name){case"delete":this.onDelete();break;default:t.action.routerLink&&this.router.navigate(t.action.routerLink,{relativeTo:this.route})}},e.prototype.onDelete=function(){var t=this,e=this.modal.open(c.a,{size:"lg"});e.componentInstance.modalHeader="Confirm",e.componentInstance.modalContent="Are you sure you want to delete this entity?",e.componentInstance.actions=[{command:"yes",label:"Yes"},{command:"no",label:"No"}],e.result.then((function(e){console.log(e),"yes"===e.command&&t.entity.remove().subscribe((function(e){t.onEntityDeleteSuccess(e)}),(function(e){t.onEntityDeleteError(e)}))}),(function(t){}))},e.prototype.onEntityDeleteSuccess=function(t){console.log("Entity deleted successfully, server response: ",t),this.toastr.success(this.translate.instant("ds.messages.entityDeletionSucceeded")),this.router.navigate(["../../list"],{relativeTo:this.route})},e.prototype.onEntityDeleteError=function(t){console.error("Failed to delete entity",t),this.toastr.error(this.translate.instant("ds.messages.entityDeletionFailed"))},e.prototype.onEntityPrepared=function(){},e.prototype.setActionVisibility=function(t,e){this.actions=this.actions.map((function(n){switch(n.name){case t:n.visible=e}return n}))},e})(l.a)},1753:function(t,e){function n(t,e){var n=0,i=t.length;for(n;n<i&&!1!==e(t[n],n);n++);}function i(t){return"[object Array]"===Object.prototype.toString.apply(t)}function r(t){return"function"==typeof t}t.exports={isFunction:r,isArray:i,each:n}},1754:function(t,e,n){"use strict";var i=n(0),r=n(1761),a=n.n(r),o=n(4),s=n(300),c=(n.n(s),n(812)),l=n(1756),u=n(1750),p=n(42),d=(n.n(p),n(42)),h=(n.n(d),n(111));n.n(h);n.d(e,"a",(function(){return f}));var f=(function(t){function e(e,n){var i=t.call(this,e)||this;return i.microserviceConfig=n,i.rows=[],i.columns=[],i.sorts=[],i.pager=new c.a,i.showCustomFilters=!1,i.size=10,i.datatableAttributes={columnMode:"force",rowHeight:"auto",headerHeight:100,footerHeight:50,externalPaging:!0,externalSorting:!0},i.headerActions=[{name:"create",title:"ds.microservices.entity.action.create",class:"btn btn-primary btn-with-icon",iconClass:"ion-android-add-circle",visible:!0,routerLink:["../create"]},{name:"refresh",title:"ds.microservices.entity.action.refresh",class:"btn btn-secondary btn-with-icon",iconClass:"ion-android-refresh",visible:!0}],i.actions=[{name:"show",title:"ds.microservices.entity.action.show",class:"btn btn-default btn-with-icon",iconClass:"ion-eye",visible:!0},{name:"edit",title:"ds.microservices.entity.action.edit",class:"btn btn-default btn-with-icon",iconClass:"ion-edit",visible:!0}],i.filters={},i.filterStream=new d.Subject,i.entityMetadata={},i.mediaQueryHandlers={},i.formBuilder=e.get(o.FormBuilder),i}return __extends(e,t),e.prototype.ngOnInit=function(){var e=this;t.prototype.ngOnInit.call(this),this.lang=this.translate.currentLang,this.languageChangeSubscriber=this.translate.onLangChange.subscribe((function(t){e.lang=t.lang,e.updateTranslations(t.lang),e.refreshList()})),this.entityMetadata=this.microserviceConfig.settings.entities[this.entityUrlPrefix].properties,this.pager.size=this.size,this.setupUi(),this.setupList(),this.postSetupList(),this.setupQuery(),this.filterStream.distinctUntilChanged((function(t,e){return t.filterProperty===e.filterProperty&&t.filterValue===e.filterValue})).map((function(t){return e.assignFilterValue(t)})).debounceTime(500).subscribe((function(){return e.doFilter()})),this.setPage({offset:0})},e.prototype.ngOnDestroy=function(){this.languageChangeSubscriber&&this.languageChangeSubscriber.unsubscribe(),this.customFiltersFormChangeSubscription&&this.customFiltersFormChangeSubscription.unsubscribe(),this.destroyUi()},e.prototype.ngAfterViewInit=function(){},e.prototype.setupQuery=function(){this.query=l.a.forUrl(this.microserviceConfig.settings.entrypoint.url,this.entityUrlPrefix).withPager(this.pager)},e.prototype.setupUi=function(){var t=this;this.setupMediaQueries(),this.setupCustomFilters(),n.i(h.forEach)(this.datatableAttributes,(function(e,n){t.datatable[n]=e}))},e.prototype.destroyUi=function(){n.i(h.forEach)(this.mediaQueryHandlers,(function(t,e){a.a.unregister(e)}))},e.prototype.setupMediaQueries=function(){var t=this.appState.get("config"),e=this.datatable;this.mediaQueryHandlers[t.mediaQueryAliases.small]={match:function(){},unmatch:function(){},setup:function(){e.scrollbarH=!0},destroy:function(){}},n.i(h.forEach)(this.mediaQueryHandlers,(function(t,e){a.a.register(e,t)}))},e.prototype.setupCustomFilters=function(){this.customFiltersForm=this.formBuilder.group({})},e.prototype.setupList=function(){},e.prototype.postSetupList=function(){var t=this;this.columns.forEach((function(e){e.propertyMetadata=t.entityMetadata[e.prop]})),this.columns.push({id:"actions",name:"actions",label:"ds.microservices.entity.action.actions",cellTemplate:this.actionsCellTpl,headerTemplate:this.headerTpl,sortable:!1}),this.updateTranslations(this.translate.currentLang)},e.prototype.refreshList=function(){var t=this;this.loading=!0,this.entityApiService.getList(this.query).subscribe((function(e){t.pager=e.pager,t.rows=t.preprocessRowsData(e.data),t.loading=!1}))},e.prototype.handleHeaderEvent=function(t){var e=this.entityParentUrlPrefix?"../"+this.entityUrlPrefix:"../";switch(t.action.name){case"refresh":this.refreshList();break;case"create":this.router.navigate([e,"create"],{relativeTo:this.route});break;default:t.action.routerLink&&this.router.navigate(t.action.routerLink,{relativeTo:this.route})}},e.prototype.handleRowEvent=function(t){var e=this.entityParentUrlPrefix?"../"+this.entityUrlPrefix:"../";switch(t.action.name){case"show":this.router.navigate([e,t.row.uuid,"show"],{relativeTo:this.route});break;case"edit":this.router.navigate([e,t.row.uuid,"edit"],{relativeTo:this.route})}},e.prototype.preprocessRowsData=function(t){var e,n=this;return t&&(e=t.map((function(t){return t._={actions:n.actions},t}))),e},e.prototype.onFilterValueChange=function(t){var e=t.column.prop,n=t.event.target.value;this.filterStream.next({filterProperty:e,filterValue:n})},e.prototype.assignFilterValue=function(t){return console.log("assignFilterValue: ",t),this.filters[t.filterProperty]=t.filterValue,t},e.prototype.doFilter=function(){var t=this;Object.keys(this.filters).forEach((function(e){var i=t.filters[e];null==i||n.i(h.isString)(i)&&0===i.length?(delete t.filters[e],t.query.unsetFilter(e)):(t.filters[e]=i,t.query.setFilter(e,t.filters[e]))})),console.log(this.filters),this.query.pager.pageNumber=0,this.refreshList()},e.prototype.setPage=function(t){this.pager.pageNumber=t.offset,this.refreshList()},e.prototype.onSort=function(t){console.log("base-list.component::onSort",t),t.column.prop&&(this.query.unsetOrder(),this.query.setOrder(t.column.prop,t.newValue),this.refreshList())},e.prototype.onRowActivation=function(t){if("actions"!==t.column.id){var e={action:n.i(h.find)(this.actions,{name:"show"}),row:t.row};this.handleRowEvent(e)}},e.prototype.updateTranslations=function(t){var e=this;this.datatable.messages=this.translate.instant("datatable"),this.columns.forEach((function(t){var n=t.label?t.label:"ds.microservices.entity.property."+t.prop;e.translate.get(n).subscribe((function(e){t.name=e}))}))},e})(u.a);__decorate([n.i(i.ViewChild)(s.DatatableComponent),__metadata("design:type",s.DatatableComponent)],f.prototype,"datatable",void 0),__decorate([n.i(i.ViewChild)("headerTpl"),__metadata("design:type",i.TemplateRef)],f.prototype,"headerTpl",void 0),__decorate([n.i(i.ViewChild)("textCellTpl"),__metadata("design:type",i.TemplateRef)],f.prototype,"textCellTpl",void 0),__decorate([n.i(i.ViewChild)("textCellUuidTpl"),__metadata("design:type",i.TemplateRef)],f.prototype,"textCellUuidTpl",void 0),__decorate([n.i(i.ViewChild)("actionsTpl"),__metadata("design:type",i.TemplateRef)],f.prototype,"actionsCellTpl",void 0)},1755:function(t,e,n){"use strict";var i=n(0);n.d(e,"a",(function(){return r}));var r=(function(){function t(){}return t})();r=__decorate([n.i(i.Component)({selector:"ds-entity",template:"<router-outlet></router-outlet>"}),__metadata("design:paramtypes",[])],r)},1756:function(t,e,n){"use strict";var i=n(812);n.d(e,"a",(function(){return r}));var r=(function(){function t(t){this.pager=new i.a,this.filters={},this.orders={},this.enableParamItemsPerPage=!0,this.path=t}return t.forUrl=function(e,n){var i=new t(n);return i.urlPrefix=e,i},t.prototype.withPath=function(t){return this.path=t,this},t.prototype.withFilter=function(t,e){return this.setFilter(t,e)},t.prototype.setFilter=function(t,e){return this.filters[t]=e,this},t.prototype.unsetFilter=function(t){delete this.filters[t]},t.prototype.withOrder=function(t,e){return this.setOrder(t,e)},t.prototype.setOrder=function(t,e){return this.orders[t]=e,this},t.prototype.unsetOrder=function(t){if(t)delete this.orders[t];else for(var e in this.orders)delete this.orders[e]},t.prototype.withPager=function(t){return this.pager=t,this},t.prototype.getFullPath=function(){return this.urlPrefix+this.path},t.prototype.buildParameters=function(){var t={};if(this.pager&&(Object.assign(t,{page:this.pager.pageNumber+1}),this.enableParamItemsPerPage&&(t.limit=this.pager.size)),this.filters&&Object.assign(t,this.filters),this.orders)for(var e in this.orders)t["order["+e+"]"]=this.orders[e];return t},t})()},1757:function(t,e,n){"use strict";var i=n(0),r=n(13),a=n(4),o=n(35),s=n(302),c=n(300),l=(n.n(c),n(813)),u=n(811);n.d(e,"a",(function(){return p}));var p=(function(){function t(t,e){this.appState=t,this.msConfig=e,this.microserviceName=null,e.name=this.getMicroserviceName(),e.settings=this.appState.get("microservices")[e.name]}return t})();p=__decorate([n.i(i.NgModule)({imports:[r.CommonModule,a.FormsModule,s.a,l.a,c.NgxDatatableModule],declarations:[],providers:[u.a,u.c]}),__metadata("design:paramtypes",[o.a,u.a])],p)},1758:function(t,e,n){function i(t,e){this.query=t,this.isUnconditional=e,this.handlers=[],this.mql=window.matchMedia(t);var n=this;this.listener=function(t){n.mql=t.currentTarget||t,n.assess()},this.mql.addListener(this.listener)}var r=n(1760),a=n(1753).each;i.prototype={constuctor:i,addHandler:function(t){var e=new r(t);this.handlers.push(e),this.matches()&&e.on()},removeHandler:function(t){var e=this.handlers;a(e,(function(n,i){if(n.equals(t))return n.destroy(),!e.splice(i,1)}))},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){a(this.handlers,(function(t){t.destroy()})),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";a(this.handlers,(function(e){e[t]()}))}},t.exports=i},1759:function(t,e,n){function i(){if(!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!window.matchMedia("only all").matches}var r=n(1758),a=n(1753),o=a.each,s=a.isFunction,c=a.isArray;i.prototype={constructor:i,register:function(t,e,n){var i=this.queries,a=n&&this.browserIsIncapable;return i[t]||(i[t]=new r(t,a)),s(e)&&(e={match:e}),c(e)||(e=[e]),o(e,(function(e){s(e)&&(e={match:e}),i[t].addHandler(e)})),this},unregister:function(t,e){var n=this.queries[t];return n&&(e?n.removeHandler(e):(n.clear(),delete this.queries[t])),this}},t.exports=i},1760:function(t,e){function n(t){this.options=t,!t.deferSetup&&this.setup()}n.prototype={constructor:n,setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},t.exports=n},1761:function(t,e,n){var i=n(1759);t.exports=new i},1767:function(t,e,n){"use strict";var i=n(0),r=n(811),a=n(304),o=n(42);n.n(o);n.d(e,"a",(function(){return s}));var s=(function(t){function e(e,n){var i=t.call(this,e,n)||this;return i.restangular=e,i.injector=n,i}return __extends(e,t),e})(a.a);s=__decorate([n.i(i.Injectable)(),__param(0,n.i(i.Inject)(r.d)),__metadata("design:paramtypes",[Object,i.Injector])],s)},1819:function(t,e,n){"use strict";var i=n(0),r=n(29),a=n(13),o=n(201),s=(n.n(o),n(811)),c=n(1767),l=n(1749),u=n(42);n.n(u);n.d(e,"a",(function(){return p}));var p=(function(t){function e(e,n,i,r,a,o,s){var c=t.call(this,e,o)||this;return c.entityUrlPrefix="communications",c.headerTitle="Create Communication",c.isNew=!0,c.entityApiService=s,c}return __extends(e,t),e})(l.a);p=__decorate([n.i(i.Component)({selector:"ds-communication-create",template:n(1887)}),__metadata("design:paramtypes",[i.Injector,r.b,r.c,a.Location,o.ToastsManager,s.a,c.a])],p)},1820:function(t,e,n){"use strict";var i=n(0),r=n(29),a=n(13),o=n(201),s=(n.n(o),n(811)),c=n(1767),l=n(1749),u=n(42);n.n(u);n.d(e,"a",(function(){return p}));var p=(function(t){function e(e,n,i,r,a,o,s){var c=t.call(this,e,o)||this;return c.entityUrlPrefix="communications",c.headerTitle="Edit Communication",c.isNew=!1,c.entityApiService=s,c}return __extends(e,t),e})(l.a);p=__decorate([n.i(i.Component)({selector:"ds-communication-edit",template:n(1887)}),__metadata("design:paramtypes",[i.Injector,r.b,r.c,a.Location,o.ToastsManager,s.a,c.a])],p)},1821:function(t,e,n){"use strict";var i=n(0),r=n(42),a=(n.n(r),n(1767)),o=n(1754),s=n(811);n.d(e,"a",(function(){return c}));var c=(function(t){function e(e,n,i){var r=t.call(this,e,n)||this;return r.entityUrlPrefix="communications",r.entityApiService=i,r}return __extends(e,t),e.prototype.setupList=function(){t.prototype.setupList.call(this),this.columns=[{prop:"title",cellTemplate:this.textCellTpl,headerTemplate:this.headerTpl,filterable:!0}]},e})(o.a);c=__decorate([n.i(i.Component)({selector:"ds-communication-list",template:n(1751)}),__metadata("design:paramtypes",[i.Injector,s.a,a.a])],c)},1822:function(t,e,n){"use strict";var i=n(0),r=n(1752),a=n(811),o=n(1767),s=n(42);n.n(s);n.d(e,"a",(function(){return c}));var c=(function(t){function e(e,n,i){var r=t.call(this,e,n)||this;return r.entityUrlPrefix="communications",r.entityApiService=i,r}return __extends(e,t),e})(r.a);c=__decorate([n.i(i.Component)({selector:"ds-communication-show",template:n(1945)}),__metadata("design:paramtypes",[i.Injector,a.a,o.a])],c)},1823:function(t,e,n){"use strict";var i=n(0),r=n(29),a=n(13),o=n(201),s=(n.n(o),n(811)),c=n(1767),l=n(1749),u=n(42);n.n(u);n.d(e,"a",(function(){return p}));var p=(function(t){function e(e,n,i,r,a,o,s){var c=t.call(this,e,o)||this;return c.entityUrlPrefix="interactions",c.headerTitle="Create Interaction",c.isNew=!0,c.entityApiService=s,c}return __extends(e,t),e})(l.a);p=__decorate([n.i(i.Component)({selector:"ds-interaction-create",template:n(1888)}),__metadata("design:paramtypes",[i.Injector,r.b,r.c,a.Location,o.ToastsManager,s.a,c.a])],p)},1824:function(t,e,n){"use strict";var i=n(0),r=n(29),a=n(13),o=n(201),s=(n.n(o),n(811)),c=n(1767),l=n(1749),u=n(42);n.n(u);n.d(e,"a",(function(){return p}));var p=(function(t){function e(e,n,i,r,a,o,s){var c=t.call(this,e,o)||this;return c.entityUrlPrefix="interactions",c.headerTitle="Edit Interaction",c.isNew=!1,c.entityApiService=s,c}return __extends(e,t),e})(l.a);p=__decorate([n.i(i.Component)({selector:"ds-interaction-edit",template:n(1888)}),__metadata("design:paramtypes",[i.Injector,r.b,r.c,a.Location,o.ToastsManager,s.a,c.a])],p)},1825:function(t,e,n){"use strict";var i=n(0),r=n(42),a=(n.n(r),n(1767)),o=n(1754),s=n(811);n.d(e,"a",(function(){return c}));var c=(function(t){function e(e,n,i){var r=t.call(this,e,n)||this;return r.entityUrlPrefix="interactions",r.entityApiService=i,r}return __extends(e,t),e.prototype.setupList=function(){t.prototype.setupList.call(this),this.columns=[{prop:"title",cellTemplate:this.textCellTpl,headerTemplate:this.headerTpl,filterable:!0},{prop:"channel",cellTemplate:this.textCellTpl,headerTemplate:this.headerTpl,filterable:!0}]},e})(o.a);c=__decorate([n.i(i.Component)({selector:"ds-interaction-list",template:n(1751)}),__metadata("design:paramtypes",[i.Injector,s.a,a.a])],c)},1826:function(t,e,n){"use strict";var i=n(0),r=n(1752),a=n(811),o=n(1767),s=n(42);n.n(s);n.d(e,"a",(function(){return c}));var c=(function(t){function e(e,n,i){var r=t.call(this,e,n)||this;return r.entityUrlPrefix="interactions",r.entityApiService=i,r}return __extends(e,t),e})(r.a);c=__decorate([n.i(i.Component)({selector:"ds-interaction-show",template:n(1946)}),__metadata("design:paramtypes",[i.Injector,a.a,o.a])],c)},1827:function(t,e,n){"use strict";var i=n(0),r=n(1755);n.d(e,"a",(function(){return a}));var a=(function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e})(r.a);a=__decorate([n.i(i.Component)({selector:"ds-interaction",template:"<router-outlet></router-outlet>"})],a)},1887:function(t,e){t.exports='<ds-entity-form *ngIf="entity && formLang"\n\t\t\t\t[entity]="entity"\n\t\t\t\t[headerTitle]="headerTitle"\n\t\t\t\t[isNew]="isNew"\n\t\t\t\t(onFormInit)="onFormInit($event)"\n\t\t\t\t(onFormChange)="onFormChange($event)"\n\t\t\t\t(onFormSubmit)="onFormSubmit($event)"\n\t\t\t\t(onFormCancel)="onFormCancel($event)"\n>\n\t<div class="card-block">\n\t\t<div class="row">\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label for="title">{{ \'ds.microservices.entity.property.title\' | translate }}</label>\n\t\t\t\t\t<input id="title" name="title" type="text" [(ngModel)]="entity.title" class="form-control" placeholder="" required>\n\t\t\t\t\t<div *ngIf="formErrors.title" class="alert alert-danger">\n\t\t\t\t\t\t{{ formErrors.title }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</ds-entity-form>\n'},1888:function(t,e){t.exports='<ds-entity-form *ngIf="entity && formLang"\n\t\t\t\t[entity]="entity"\n\t\t\t\t[headerTitle]="headerTitle"\n\t\t\t\t[isNew]="isNew"\n\t\t\t\t(onFormInit)="onFormInit($event)"\n\t\t\t\t(onFormChange)="onFormChange($event)"\n\t\t\t\t(onFormSubmit)="onFormSubmit($event)"\n\t\t\t\t(onFormCancel)="onFormCancel($event)"\n>\n\t<div class="card-block">\n\t\t<div class="row">\n\t\t\t<div class="col-sm-6">\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label for="title">{{ \'ds.microservices.entity.property.title\' | translate }}</label>\n\t\t\t\t\t<input id="title" name="title" type="text" [(ngModel)]="entity.title" class="form-control" placeholder="" required>\n\t\t\t\t\t<div *ngIf="formErrors.title" class="alert alert-danger">\n\t\t\t\t\t\t{{ formErrors.title }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="form-group">\n\t\t\t\t\t<label for="channel">{{ \'ds.microservices.entity.property.channel\' | translate }}</label>\n\t\t\t\t\t<select id="channel" name="channel" [(ngModel)]="entity.channel" class="form-control" required>\n\t\t\t\t\t\t<option *ngFor="let item of entityMetadata[\'channel\'].field.options | keyValue" [value]="item.key">\n\t\t\t\t\t\t\t{{item.value}}\n\t\t\t\t\t\t</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t<div *ngIf="formErrors.channel" class="alert alert-danger">\n\t\t\t\t\t\t{{ formErrors.channel }}\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</ds-entity-form>\n'},1904:function(t,e,n){"use strict";var i=n(29),r=n(1827),a=n(1821),o=n(1825),s=n(1823),c=n(1826),l=n(1824),u=n(1822),p=n(1819),d=n(1820);n.d(e,"a",(function(){return f}));var h=[{path:"",component:r.a,children:[{path:"",redirectTo:"/pages/communications/list",pathMatch:"full"},{path:"communications/list",component:a.a},{path:"communications/create",component:p.a},{path:"communications/:id/show",component:u.a},{path:"communications/:id/edit",component:d.a},{path:"interactions/list",component:o.a},{path:"interactions/create",component:s.a},{path:"interactions/:id/show",component:c.a},{path:"interactions/:id/edit",component:l.a}]}],f=i.a.forChild(h)},1945:function(t,e){t.exports='<ds-entity-show *ngIf="entity" [entity]="entity" (onDelete)="onDelete($event)">\n\n\t\x3c!-- begin: ng-content[select="button.entity-action"] --\x3e\n\t\x3c!-- end: ng-content[select="button.entity-action"] --\x3e\n\n\t\x3c!-- begin: ng-content[select=".entity-body"] --\x3e\n\t<div class="card-block entity-body entity-data">\n\t\t<div class="row">\n\t\t\t<div class="col-sm-4 col-sm-offset-3">\n\t\t\t\t<dl>\n\t\t\t\t\t<dt>{{ \'ds.microservices.entity.property.title\' | translate }}</dt>\n\t\t\t\t\t<dd>{{entity.title}}</dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\x3c!-- end: ng-content[select=".entity-body"] --\x3e\n\n</ds-entity-show>\n'},1946:function(t,e){t.exports='<ds-entity-show *ngIf="entity" [entity]="entity" (onDelete)="onDelete($event)">\n\n\t\x3c!-- begin: ng-content[select="button.entity-action"] --\x3e\n\t\x3c!-- end: ng-content[select="button.entity-action"] --\x3e\n\n\t\x3c!-- begin: ng-content[select=".entity-body"] --\x3e\n\t<div class="card-block entity-body entity-data">\n\t\t<div class="row">\n\t\t\t<div class="col-sm-4 col-sm-offset-3">\n\t\t\t\t<dl>\n\t\t\t\t\t<dt>{{ \'ds.microservices.entity.property.title\' | translate }}</dt>\n\t\t\t\t\t<dd>{{entity.title}}</dd>\n\t\t\t\t</dl>\n\t\t\t\t<dl>\n\t\t\t\t\t<dt>{{ \'ds.microservices.entity.property.channel\' | translate }}</dt>\n\t\t\t\t\t<dd>{{entityMetadata[\'channel\'].field.options[entity.channel]}}</dd>\n\t\t\t\t</dl>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\x3c!-- end: ng-content[select=".entity-body"] --\x3e\n\n</ds-entity-show>\n'}});