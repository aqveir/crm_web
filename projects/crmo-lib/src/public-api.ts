/*
 * Public API Surface of crmo-lib
 */

export * from './lib/crmo-lib.service';
export * from './lib/crmo-lib.component';
export * from './lib/crmo-lib.module';

//Exported Interfaces
export * from './lib/interfaces/common/response.interface';
export * from './lib/interfaces/common/lookup.interface';
export * from './lib/interfaces/common/country.interface';
export * from './lib/interfaces/common/configuration.interface';
export * from './lib/interfaces/organization/organization.interface';
export * from './lib/interfaces/user/user.interface';
export * from './lib/interfaces/user/user-auth.interface';
export * from './lib/interfaces/user/user-status.interface';
export * from './lib/interfaces/contact/contact.interface';
export * from './lib/interfaces/note/note.interface';
export * from './lib/interfaces/document/document.interface';

//Exported Services
export * from './lib/services/common/lookup/lookup.service';
export * from './lib/services/organization/organization.service';
export * from './lib/services/user/user.service';
export * from './lib/services/user/user-auth.service';
export * from './lib/services/user/user-status.service';
export * from './lib/services/contact/contact.service';
export * from './lib/services/contact/contact-auth.service';
export * from './lib/services/contact/contact-communication.service';
export * from './lib/services/note/note.service';
export * from './lib/services/document/document.service';
//export * from './lib/services/catalogue/catalogue-category.service';
//export * from './lib/services/wallet/wallet.service';

//Exported Models
export * from './lib/models/common/common.model';
// export * from './lib/models/user/user.model';
// export * from './lib/models/user/user-auth.model';
// export * from './lib/models/contact/contact.model';
// export * from './lib/models/contact/contact-auth.model';
//export * from './lib/models/catalogue/category.model';
//export * from './lib/models/wallet/wallet.model';
