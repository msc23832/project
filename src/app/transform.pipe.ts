import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 'Log In'){
      value = 'Log Out';
      return value;
    }else{
      return value;
    }
      
  }

}
