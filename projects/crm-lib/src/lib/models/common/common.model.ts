export class Common {
}

export class ApplicationParams {
    oHash: string|null=null;
    oName: string|null=null;
    sHash: string|null=null;
    sName: string|null=null;
        
    source: string|null='site';
    type: string|null='tbfl_fo';

    //Language properties
    lang: string|null='en';
    allowLangSelection: boolean=false;
}
