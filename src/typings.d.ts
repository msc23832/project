/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// declare function $(arr: string): JQuery;
// interface Jquery {  
//   length:number;
//   //sideNav(): JQuery;
// }

declare let Materialize : {
  toast(text, time): any;
  updateTextFields(): any;
}
