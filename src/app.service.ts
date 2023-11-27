import { Injectable } from '@nestjs/common';
import { PassSpec } from './dataTypes';

@Injectable()
export class AppService {
  generatePass(PassSpec: PassSpec): string {
    const CHARSET =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/&*-+#?!$=';
    let passwordCharSet = '';
    let specificationCount = 0;
    Object.values(PassSpec).forEach((item) => {
      if (item === true) {
        specificationCount = specificationCount + 1;
      }
    });
    const FilteredCharset = this.filterCharSet(
      CHARSET,
      PassSpec,
      specificationCount,
    );
    for (let i = 0, n = FilteredCharset.length; i < PassSpec.passLength; ++i) {
      passwordCharSet += FilteredCharset.charAt(Math.floor(Math.random() * n));
    }
    return passwordCharSet;
  }

  filterCharSet(
    charset: string,
    passspec: PassSpec,
    specCount: number,
  ): string {
    //All case
    switch (specCount) {
      //CASE 1 : ONLY ONE SPECIFICATION CHECKED
      case 1:
        if (
          // ONLY SYMBOL
          !passspec.enableUpperCase &&
          !passspec.enableLowerCase &&
          !passspec.enableNumber
        ) {
          return charset.replace(/[a-zA-Z0-9]/g, '');
        } else if (
          // ONLY NUMBER
          !passspec.enableUpperCase &&
          !passspec.enableLowerCase &&
          !passspec.enableSymbol
        ) {
          return charset.replace(/[a-zA-Z/*+&#?!$=-]/g, '');
        } else if (
          // ONLY LOWERCASE
          !passspec.enableUpperCase &&
          !passspec.enableNumber &&
          !passspec.enableSymbol
        ) {
          return charset.replace(/[0-9A-Z/*+&#?!$=-]/g, '');
        } else if (
          // ONLY UPPERCASE
          !passspec.enableLowerCase &&
          !passspec.enableNumber &&
          !passspec.enableSymbol
        ) {
          return charset.replace(/[0-9a-z/*+&#?!$=-]/g, '');
        }

        break;

      //CASE 2 : ONLY 2 SPECIFICATIONS CHECKED
      case 2:
        if (!passspec.enableUpperCase && !passspec.enableLowerCase) {
          return charset.replace(/[a-zA-Z]/g, '');
        } else if (!passspec.enableUpperCase && !passspec.enableNumber) {
          return charset.replace(/[A-Z0-9]/g, '');
        } else if (!passspec.enableUpperCase && !passspec.enableSymbol) {
          return charset.replace(/[A-Z/*+&#?!$=-]/g, '');
        } else if (!passspec.enableLowerCase && !passspec.enableNumber) {
          return charset.replace(/[a-z0-9]/g, '');
        } else if (!passspec.enableLowerCase && !passspec.enableSymbol) {
          return charset.replace(/[a-z/*+&#?!$=-]/g, '');
        } else if (!passspec.enableNumber && !passspec.enableSymbol) {
          return charset.replace(/[0-9/*+&#?!$=-]/g, '');
        }
        break;

      // CASE 3: ONLY 3 SPECIFICATIONS CHECKED
      case 3:
        if (!passspec.enableUpperCase) {
          return charset.replace(/[A-Z]/g, '');
        } else if (!passspec.enableLowerCase) {
          return charset.replace(/[a-z]/g, '');
        } else if (!passspec.enableNumber) {
          return charset.replace(/[0-9]/g, '');
        } else if (!passspec.enableSymbol) {
          return charset.replace(/[/*+&#?!$=-]/g, '');
        }

        break;

      // CASE 4: ALL OF SPECIFICATION HAVE BEEN CHECKED
      case 4:
        return charset;

      // NONE HAVE THE SPECIFICATION HAVE BEEN CHECKED
      default:
        return '';
    }
  }
}
