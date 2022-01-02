import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'niceDateFormat',
})
export class NiceDateFormatPipe implements PipeTransform {
    transform(value: string) {
       let _value = Number(value);
       let dif = Math.floor( ( (Date.now() - _value) / 1000 ) / 86400 );
       
       if ( dif < 30 ){
            return fnConvertToNiceDate(value);
       }else{
           let datePipe = new DatePipe("en-US");
           value = datePipe.transform(value, 'MMM-dd-yyyy');
           value = 'Older';
           return value;
       }
    }
} //Class ends

function fnConvertToNiceDate(time: string) {
    let date = new Date(time),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        daydiff = Math.floor(diff / 86400);

    if (isNaN(daydiff) || daydiff < 0 || daydiff >= 31)
        return '';

    return daydiff == 0 && (
        diff < 60 && "Just Now" ||
        diff < 120 && "1 minute ago" ||
        diff < 3600 && Math.floor(diff / 60) + " minutes ago" ||
        diff < 7200 && "1 hour ago" ||
        diff < 86400 && "Today") ||
        daydiff == 1 && "Yesterday" ||
        daydiff < 7 && daydiff + " days ago" ||
        daydiff < 31 && Math.ceil(daydiff / 7) + " week(s) ago";
} //Function ends