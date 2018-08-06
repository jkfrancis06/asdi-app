import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizeFirstPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'capitalizeFirst',
})
export class CapitalizeFirstPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args: any[]): string {
    if (value === null) return 'Not assigned';
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
    // return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
