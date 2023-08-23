import { Component, OnInit } from '@angular/core';

//Application Files
import { Globals, ILanguage } from 'projects/crmo-backend/src/app/app.global';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {

  public boolShowLangSelection: boolean = false;
  public arrActiveLanguages: ILanguage[];
  public objDefaultLanguage: ILanguage;


  /**
   * Default Constructor
   */
  constructor(
    private _globals: Globals
  ) { } //Function ends


  /**
   * Lifecycle Hook's
   */
  ngOnInit() {

    //Initilaize component
    this.fnInitialize();

    // //Get languages available
    // this.language = this._globals.getActiveLanguages();

    // this.setSelectedLanguage();
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationStart))
    //   .subscribe((event) => {
    //     this.setSelectedLanguage();
    //   });
  }


  /**
   * Initialize
   */
  private fnInitialize(): void {
    let langSelected: string = Globals._LANGUAGE_ENV_DEFAULT; //(this.appParams)?this.appParams.lang:Globals._LANGUAGE_ENV_DEFAULT;
    this.boolShowLangSelection = true; //this.appParams.allowLangSelection;

    //Load language options 
    if (this.boolShowLangSelection) {
      //Get Active Languages
      this.arrActiveLanguages = this._globals.getActiveLanguages();

      //Get Default Language
      if (this.arrActiveLanguages && (this.arrActiveLanguages instanceof Array) && (this.arrActiveLanguages.length>0)) {
        this.objDefaultLanguage = this.arrActiveLanguages.find((x: any) => {return x.code==langSelected; });
      } //End if      
    } //End if
    
  } //Function ends


  /**
   * Call the function to change the language preference
   * 
   * @param _lang 
   */
  public fnLangSelectionChanged(_lang: string): void {
    this._globals.setLanguage(_lang, true);

    //Display the selected language
    if (this.arrActiveLanguages && (this.arrActiveLanguages instanceof Array) && (this.arrActiveLanguages.length>0)) {
      this.objDefaultLanguage = this.arrActiveLanguages.find((x: any) => {return x.code==_lang; });
    } //End if
  } //Function ends


  // TODO: Clean Up
  // setLanguageWithRefresh(lang: any) {
  //   this.setLanguage(lang);
  //   window.location.reload();
  // }

  // setLanguage(lang: any) {
  //   this.languages.forEach((language: LanguageFlag) => {
  //     if (language.lang === lang) {
  //       language.active = true;
  //       //this.language = language;
  //     } else {
  //       language.active = false;
  //     }
  //   });
  //   //this.translationService.setLanguage(lang);
  // }

  // setSelectedLanguage(): any {
  //   //this.setLanguage(this.translationService.getSelectedLanguage());
  // }


  // /**
  //  * Set the Language based on user selection
  //  * 
  //  * @param code 
  //  */
  // public fnSetLanguage(code: string) {
  //   this._translateService.use(code);
  // } //Function ends

} //Class ends
